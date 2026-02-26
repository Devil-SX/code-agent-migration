// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.hero, .project-card, .comparison-table, .architecture, .metrics, .use-case');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                const text = statNumber.textContent;
                
                // Extract number from text like "110K+" or "2.5M+"
                let targetNum = 0;
                if (text.includes('M+')) {
                    targetNum = parseFloat(text) * 1000000;
                } else if (text.includes('K+')) {
                    targetNum = parseFloat(text) * 1000;
                } else {
                    targetNum = parseInt(text.replace(/\D/g, ''));
                }
                
                if (targetNum > 0) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, targetNum);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Parallax effect for hero section
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add stagger effect to feature items
document.addEventListener('DOMContentLoaded', () => {
    const featureLists = document.querySelectorAll('.features ul');
    featureLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
});

// Interactive comparison table
document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.comparison-table');
    if (table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            row.style.animationDelay = `${index * 0.05}s`;
            row.addEventListener('mouseenter', () => {
                row.style.transform = 'scale(1.02)';
                row.style.transition = 'transform 0.2s ease';
            });
            row.addEventListener('mouseleave', () => {
                row.style.transform = 'scale(1)';
            });
        });
    }
});

// Comparison dimension filter
document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.compare-filter');
    const rows = document.querySelectorAll('.comparison-table tbody tr[data-group]');
    const counter = document.getElementById('visible-dimension-count');

    if (filters.length === 0 || rows.length === 0) {
        return;
    }

    const updateVisibleCount = () => {
        if (!counter) {
            return;
        }
        const visible = Array.from(rows).filter((row) => !row.classList.contains('is-hidden')).length;
        counter.textContent = String(visible);
    };

    const applyFilter = (group) => {
        rows.forEach((row) => {
            if (group === 'all' || row.dataset.group === group) {
                row.classList.remove('is-hidden');
            } else {
                row.classList.add('is-hidden');
            }
        });
        updateVisibleCount();
    };

    filters.forEach((button) => {
        button.addEventListener('click', () => {
            filters.forEach((item) => item.classList.remove('is-active'));
            button.classList.add('is-active');
            applyFilter(button.dataset.filter || 'all');
        });
    });

    applyFilter('all');
});

// Copy code functionality (if code blocks exist)
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.onclick = () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        };
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance metrics chart animation (using CSS animations)
document.addEventListener('DOMContentLoaded', () => {
    const metricBars = document.querySelectorAll('.metric-bar');
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'growBar 1s ease-out forwards';
                metricsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    metricBars.forEach(bar => {
        metricsObserver.observe(bar);
    });
});

// Add hover effect to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .use-case');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Theme toggle (optional enhancement)
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '🌙';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1) rotate(20deg)';
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1) rotate(0deg)';
    });
    
    document.body.appendChild(toggle);
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', createThemeToggle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

function injectCitationStyles() {
    if (document.getElementById('citation-inline-style')) {
        return;
    }
    const style = document.createElement('style');
    style.id = 'citation-inline-style';
    style.textContent = `
        .citation-sup {
            margin-left: 0.25rem;
            font-size: 0.72em;
            line-height: 1;
            vertical-align: super;
            white-space: nowrap;
        }
        .citation-link {
            color: #1f4bd8;
            text-decoration: none;
            margin-left: 0.12rem;
            font-weight: 600;
        }
        .citation-link:hover {
            text-decoration: underline;
        }
        .citation-link.citation-unverified,
        .citation-link.citation-conflicted {
            color: #cc5500;
        }
    `;
    document.head.appendChild(style);
}

function parseClaimIds(attributeValue) {
    if (!attributeValue || typeof attributeValue !== 'string') {
        return [];
    }
    return attributeValue
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
}

function createSourceCitationAnchor(source, status) {
    const anchor = document.createElement('a');
    anchor.className = `citation-link citation-${status}`;
    anchor.href = source.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = `[${source.citation_number}]`;
    anchor.title = `${source.title} | ${source.publisher} | ${status}`;
    return anchor;
}

function createUnverifiedCitationAnchor(claim) {
    const anchor = document.createElement('a');
    anchor.className = `citation-link citation-${claim.verification_status || 'unverified'}`;
    anchor.href = `pages/verification-report.html#${claim.claim_id.toLowerCase()}`;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = '[?]';
    anchor.title = `${claim.claim_id} | ${claim.verification_status || 'unverified'}`;
    return anchor;
}

async function initCitations() {
    injectCitationStyles();

    let claimsPayload;
    let sourcesPayload;
    try {
        const [claimsResponse, sourcesResponse] = await Promise.all([
            fetch('citations/claims.json', { cache: 'no-cache' }),
            fetch('citations/sources.json', { cache: 'no-cache' })
        ]);

        if (!claimsResponse.ok || !sourcesResponse.ok) {
            throw new Error('failed to load citation data');
        }

        [claimsPayload, sourcesPayload] = await Promise.all([
            claimsResponse.json(),
            sourcesResponse.json()
        ]);
    } catch (error) {
        console.warn('[citations] unable to load citation files:', error);
        return;
    }

    const claims = new Map();
    (claimsPayload.claims || []).forEach((claim) => {
        claims.set(claim.claim_id, claim);
    });

    const sourcesById = new Map();
    (sourcesPayload.sources || []).forEach((source) => {
        sourcesById.set(source.source_id, source);
    });

    document.querySelectorAll('[data-claim-id]').forEach((node) => {
        const claimIds = parseClaimIds(node.getAttribute('data-claim-id'));
        if (claimIds.length === 0) {
            return;
        }

        node.querySelectorAll(':scope > .citation-sup').forEach((existingSup) => {
            existingSup.remove();
        });

        const sup = document.createElement('sup');
        sup.className = 'citation-sup';

        const appendedTokens = new Set();
        claimIds.forEach((claimId) => {
            const claim = claims.get(claimId);
            if (!claim) {
                return;
            }

            const sourceIds = Array.isArray(claim.source_ids) ? claim.source_ids : [];
            const resolvedSources = sourceIds
                .map((sourceId) => sourcesById.get(sourceId))
                .filter(Boolean)
                .sort((a, b) => a.citation_number - b.citation_number);

            if (resolvedSources.length === 0) {
                const token = `${claimId}:?`;
                if (!appendedTokens.has(token)) {
                    sup.appendChild(createUnverifiedCitationAnchor(claim));
                    appendedTokens.add(token);
                }
                return;
            }

            resolvedSources.forEach((source) => {
                const token = `source:${source.source_id}`;
                if (appendedTokens.has(token)) {
                    return;
                }
                sup.appendChild(createSourceCitationAnchor(source, claim.verification_status || 'verified'));
                appendedTokens.add(token);
            });
        });

        if (sup.childElementCount > 0) {
            node.appendChild(sup);
        }
    });
}

document.addEventListener('DOMContentLoaded', initCitations);
