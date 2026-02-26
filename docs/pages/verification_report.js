(function () {
  function formatDate(value) {
    if (!value || typeof value !== 'string') return 'unknown';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toISOString().slice(0, 10);
  }

  function statusClass(status) {
    return 'status-' + (status || 'unverified');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderSummary(claims) {
    const bucket = {
      verified: 0,
      partially_verified: 0,
      conflicted: 0,
      unverified: 0
    };

    claims.forEach((claim) => {
      const key = claim.verification_status || 'unverified';
      if (Object.prototype.hasOwnProperty.call(bucket, key)) {
        bucket[key] += 1;
      } else {
        bucket.unverified += 1;
      }
    });

    const rows = [
      ['Verified', bucket.verified],
      ['Partially Verified', bucket.partially_verified],
      ['Conflicted', bucket.conflicted],
      ['Unverified', bucket.unverified]
    ];

    return rows
      .map(([label, value]) => {
        return '<div class="summary-item"><div class="summary-label">' + label + '</div><div class="summary-value">' + value + '</div></div>';
      })
      .join('');
  }

  function renderClaim(claim, sourcesById) {
    const status = claim.verification_status || 'unverified';
    const sourceIds = Array.isArray(claim.source_ids) ? claim.source_ids : [];
    const sourceRows = sourceIds
      .map((sourceId) => sourcesById.get(sourceId))
      .filter(Boolean)
      .sort((a, b) => a.citation_number - b.citation_number)
      .map((source) => {
        const title = escapeHtml(source.title || source.source_id || 'Unknown source');
        const publisher = escapeHtml(source.publisher || 'Unknown publisher');
        const snippet = escapeHtml(source.evidence_snippet || 'No snippet captured');
        const url = escapeHtml(source.url || '#');
        const sourceDate = formatDate(source.accessed_at);
        const citation = source.citation_number ? '[' + source.citation_number + ']' : source.source_id;
        return (
          '<div class="source-row">' +
          '<div><strong>' + citation + '</strong> <a href="' + url + '" target="_blank" rel="noopener noreferrer">' + title + '</a> · ' + publisher + '</div>' +
          '<div>Evidence: ' + snippet + '</div>' +
          '<div>Accessed: ' + sourceDate + '</div>' +
          '</div>'
        );
      })
      .join('');

    const emptySource = sourceRows || '<div class="source-row">No source bound. This claim is pending verification.</div>';

    return (
      '<article id="' + claim.claim_id.toLowerCase() + '" class="claim-card">' +
      '<div class="claim-head">' +
      '<span class="claim-id">' + escapeHtml(claim.claim_id) + '</span>' +
      '<span class="status-badge ' + statusClass(status) + '">' + escapeHtml(status) + '</span>' +
      '</div>' +
      '<div class="claim-meta">Last verified: ' + formatDate(claim.last_verified_at) + '</div>' +
      '<div class="sources-list">' + emptySource + '</div>' +
      '</article>'
    );
  }

  async function init() {
    const summary = document.getElementById('verification-summary');
    const list = document.getElementById('claim-list');

    if (!summary || !list) {
      return;
    }

    try {
      const [claimsResp, sourcesResp] = await Promise.all([
        fetch('../citations/claims.json', { cache: 'no-cache' }),
        fetch('../citations/sources.json', { cache: 'no-cache' })
      ]);

      if (!claimsResp.ok || !sourcesResp.ok) {
        throw new Error('failed to load citation data');
      }

      const [claimsPayload, sourcesPayload] = await Promise.all([
        claimsResp.json(),
        sourcesResp.json()
      ]);

      const claims = Array.isArray(claimsPayload.claims) ? claimsPayload.claims : [];
      const sources = Array.isArray(sourcesPayload.sources) ? sourcesPayload.sources : [];
      const sourcesById = new Map();
      sources.forEach((source) => {
        sourcesById.set(source.source_id, source);
      });

      summary.innerHTML = renderSummary(claims);

      const orderedClaims = claims.slice().sort((a, b) => {
        const statusOrder = {
          conflicted: 0,
          unverified: 1,
          partially_verified: 2,
          verified: 3
        };
        const left = statusOrder[a.verification_status] ?? 4;
        const right = statusOrder[b.verification_status] ?? 4;
        if (left !== right) return left - right;
        return a.claim_id.localeCompare(b.claim_id);
      });

      list.innerHTML = orderedClaims.map((claim) => renderClaim(claim, sourcesById)).join('');
    } catch (error) {
      summary.innerHTML = '<div class="warning">Unable to load verification data.</div>';
      list.innerHTML = '<div class="warning">' + escapeHtml(String(error)) + '</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
