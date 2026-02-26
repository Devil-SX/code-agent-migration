(function () {
  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function applyInline(text, linkMode) {
    let out = escapeHtml(text);

    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_m, label, href) {
      const safeLabel = escapeHtml(label);
      const safeHref = escapeHtml(href);
      const isHttp = /^https?:\/\//i.test(href);
      if (linkMode === 'all') {
        const target = isHttp ? ' target="_blank" rel="noopener noreferrer"' : '';
        return '<a href="' + safeHref + '"' + target + '>' + safeLabel + '</a>';
      }
      if (linkMode === 'internal' && !isHttp) {
        return '<a href="' + safeHref + '">' + safeLabel + '</a>';
      }
      return '<span class="disabled-link">' + safeLabel + '</span>';
    });

    return out;
  }

  function isTableSeparator(line) {
    const raw = line.trim();
    return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(raw);
  }

  function renderTable(lines, linkMode) {
    if (lines.length < 2) {
      return '<p>' + applyInline(lines.join(' '), linkMode) + '</p>';
    }

    const parseRow = (line) => line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

    const header = parseRow(lines[0]);
    let bodyStart = 1;
    if (lines[1] && isTableSeparator(lines[1])) {
      bodyStart = 2;
    }

    const bodyRows = lines.slice(bodyStart).map(parseRow);

    let html = '<table><thead><tr>';
    header.forEach((cell) => {
      html += '<th>' + applyInline(cell, linkMode) + '</th>';
    });
    html += '</tr></thead><tbody>';

    bodyRows.forEach((row) => {
      if (row.length === 1 && row[0] === '') {
        return;
      }
      html += '<tr>';
      row.forEach((cell) => {
        html += '<td>' + applyInline(cell, linkMode) + '</td>';
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
  }

  function renderMarkdown(markdown, linkMode) {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const chunks = [];

    let inCode = false;
    let codeFence = '```';
    let codeBuffer = [];
    let paragraphBuffer = [];
    let listType = null;
    let tableBuffer = [];

    function flushParagraph() {
      if (paragraphBuffer.length === 0) return;
      chunks.push('<p>' + applyInline(paragraphBuffer.join(' '), linkMode) + '</p>');
      paragraphBuffer = [];
    }

    function flushList() {
      if (!listType) return;
      chunks.push('</' + listType + '>');
      listType = null;
    }

    function flushTable() {
      if (tableBuffer.length === 0) return;
      chunks.push(renderTable(tableBuffer, linkMode));
      tableBuffer = [];
    }

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const trimmed = line.trim();

      if (inCode) {
        if (trimmed.startsWith(codeFence)) {
          chunks.push('<pre><code>' + escapeHtml(codeBuffer.join('\n')) + '</code></pre>');
          inCode = false;
          codeBuffer = [];
          codeFence = '```';
        } else {
          codeBuffer.push(line);
        }
        continue;
      }

      if (trimmed.startsWith('```')) {
        flushParagraph();
        flushList();
        flushTable();
        inCode = true;
        codeFence = trimmed.slice(0, 3);
        codeBuffer = [];
        continue;
      }

      const isTableLine = /^\|.+\|$/.test(trimmed);
      if (isTableLine) {
        flushParagraph();
        flushList();
        tableBuffer.push(trimmed);
        continue;
      }

      if (!isTableLine && tableBuffer.length > 0) {
        flushTable();
      }

      if (!trimmed) {
        flushParagraph();
        flushList();
        continue;
      }

      const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
      if (headingMatch) {
        flushParagraph();
        flushList();
        const level = headingMatch[1].length;
        chunks.push('<h' + level + '>' + applyInline(headingMatch[2], linkMode) + '</h' + level + '>');
        continue;
      }

      const ulMatch = /^[-*]\s+(.+)$/.exec(trimmed);
      if (ulMatch) {
        flushParagraph();
        if (listType !== 'ul') {
          flushList();
          chunks.push('<ul>');
          listType = 'ul';
        }
        chunks.push('<li>' + applyInline(ulMatch[1], linkMode) + '</li>');
        continue;
      }

      const olMatch = /^\d+\.\s+(.+)$/.exec(trimmed);
      if (olMatch) {
        flushParagraph();
        if (listType !== 'ol') {
          flushList();
          chunks.push('<ol>');
          listType = 'ol';
        }
        chunks.push('<li>' + applyInline(olMatch[1], linkMode) + '</li>');
        continue;
      }

      flushList();
      paragraphBuffer.push(trimmed);
    }

    if (inCode) {
      chunks.push('<pre><code>' + escapeHtml(codeBuffer.join('\n')) + '</code></pre>');
    }
    flushParagraph();
    flushList();
    flushTable();

    return chunks.join('\n');
  }

  async function init() {
    const mount = document.querySelector('[data-markdown-src]');
    if (!mount) return;

    const source = mount.getAttribute('data-markdown-src');
    const linkMode = mount.getAttribute('data-link-mode') || 'none';

    if (!source) {
      mount.innerHTML = '<p class="warning">No markdown source configured.</p>';
      return;
    }

    try {
      const response = await fetch(source, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      const markdown = await response.text();
      mount.innerHTML = renderMarkdown(markdown, linkMode);
    } catch (error) {
      mount.innerHTML = '<p class="warning">Unable to load source: ' + escapeHtml(source) + ' (' + escapeHtml(String(error)) + ')</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
