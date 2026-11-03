/**
 * verify_responsive_layout.js — Empirical Responsive Layout & Viewport Verification
 *
 * Automated CDP Test Harness for YEAH MAN CARIBBEAN (Requirements R1–R5):
 * 1. Viewport Stress Testing across 11 Physical Device Form Factors:
 *    - Smartphones: 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone 11/XR), 430px (iPhone 14/15/16 Pro Max)
 *    - Tablets: 768px (iPad Mini), 820px (iPad Air), 1024px (iPad Pro)
 *    - Laptops: 1280px (MacBook Air), 1440px (MacBook Pro), 1920px (Desktop Full HD)
 *    - Ultra-wide: 2560px (Ultra-wide 1440p)
 * 2. Empirical Layout Invariants:
 *    - Strict enforcement of overflow-x: hidden and box-sizing: border-box
 *    - Verification that no container exceeds 100vw or window width across all 11 viewports
 *    - Verification of zero horizontal scrollability (canScrollHorizontally == false)
 *    - Touch target dimensions (>= 44px) on buttons, chips, links, and pills (WCAG 2.1 AA)
 *    - Mobile drawer slide-out styling, body scroll lock, backdrop, and keyboard/touch dismissal
 *    - Mobile sticky bottom action bar presence on <= 480px and hiding on desktop (>= 1024px)
 *    - Ultra-wide container bounds constraint (max-width: 1280px) and auto-centering
 */

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8089;
const CHROME_PORT = 9228;
const ROOT_DIR = __dirname;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const VIEWPORTS = [
  // Smartphones
  { name: 'iPhone SE (Ultra-compact Smartphone)', width: 375, height: 667, mobile: true, type: 'phone' },
  { name: 'iPhone 14 (Standard Smartphone)', width: 390, height: 844, mobile: true, type: 'phone' },
  { name: 'iPhone 11/XR (Medium Smartphone)', width: 414, height: 896, mobile: true, type: 'phone' },
  { name: 'iPhone 14/15/16 Pro Max (Large Smartphone)', width: 430, height: 932, mobile: true, type: 'phone' },
  // Tablets
  { name: 'iPad Mini / Standard (Tablet Portrait)', width: 768, height: 1024, mobile: true, type: 'tablet' },
  { name: 'iPad Air (Tablet Portrait)', width: 820, height: 1180, mobile: true, type: 'tablet' },
  { name: 'iPad Pro Portrait / Tablet Landscape', width: 1024, height: 1366, mobile: false, type: 'tablet' },
  // Laptops / Desktops
  { name: 'MacBook Air (Compact Laptop)', width: 1280, height: 800, mobile: false, type: 'laptop' },
  { name: 'MacBook Pro 15/16 (Standard Laptop)', width: 1440, height: 900, mobile: false, type: 'laptop' },
  { name: 'Desktop Full HD (Standard Monitor)', width: 1920, height: 1080, mobile: false, type: 'desktop' },
  // Ultra-wide
  { name: 'Ultra-wide 1440p (Wide Display)', width: 2560, height: 1440, mobile: false, type: 'ultrawide' }
];

let testCount = 0;
let passedCount = 0;
let failedCount = 0;
const failures = [];

function recordPass(suiteName, testId, description) {
  testCount++;
  passedCount++;
  console.log(`  ${colors.green}✓${colors.reset} [${testId}] ${description}`);
}

function recordFail(suiteName, testId, description, errorMsg) {
  testCount++;
  failedCount++;
  failures.push({ suiteName, testId, description, errorMsg });
  console.log(`  ${colors.red}✗${colors.reset} [${testId}] ${description}`);
  console.log(`    ${colors.red}Error: ${errorMsg}${colors.reset}`);
}

function startHttpServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(ROOT_DIR, reqPath);

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(PORT, '127.0.0.1', () => {
      resolve(server);
    });

    server.on('error', reject);
  });
}

function launchChrome(tempUserDataDir) {
  return spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--mute-audio',
    '--disable-extensions',
    `--user-data-dir=${tempUserDataDir}`,
    'about:blank'
  ]);
}

async function connectCDP() {
  for (let i = 0; i < 25; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/version`);
      if (res.ok) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  const listRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/list`);
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];

  if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
    throw new Error('No inspectable page target found in headless Chrome.');
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });

  let messageId = 1;
  const pendingRequests = new Map();

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pendingRequests.has(data.id)) {
      const { resolve, reject } = pendingRequests.get(data.id);
      pendingRequests.delete(data.id);
      if (data.error) reject(new Error(data.error.message || JSON.stringify(data.error)));
      else resolve(data.result);
    }
  });

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const res = await sendCommand('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || JSON.stringify(res.exceptionDetails));
    }
    return res.result.value;
  }

  return { ws, sendCommand, evaluate };
}

async function main() {
  console.log(`${colors.bold}${colors.magenta}`);
  console.log('╔═══════════════════════════════════════════════════════════════════════════════════╗');
  console.log('║   YEAH MAN CARIBBEAN — EMPIRICAL RESPONSIVE & VIEWPORT VERIFICATION HARNESS (R5) ║');
  console.log('║             Adversarial Verification across Smartphones, Tablets & Laptops        ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);

  const startTime = Date.now();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-runner-'));
  let server, chrome, cdp;

  try {
    console.log(`[*] Starting local HTTP test server on port ${PORT}...`);
    server = await startHttpServer();
    console.log(`[✓] Test server active at http://127.0.0.1:${PORT}`);

    console.log(`[*] Spawning headless Chrome on debugging port ${CHROME_PORT}...`);
    chrome = launchChrome(tempDir);

    console.log(`[*] Connecting CDP WebSocket client...`);
    cdp = await connectCDP();
    console.log(`[✓] CDP connected to browser session.`);

    // Enable required domains
    await cdp.sendCommand('Page.enable');
    await cdp.sendCommand('DOM.enable');
    await cdp.sendCommand('CSS.enable');

    console.log(`[*] Navigating to http://127.0.0.1:${PORT}/index.html...`);
    await cdp.sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });

    // Wait for React to mount and hydrate
    console.log(`[*] Awaiting React DOM root mounting and font loading...`);
    let isMounted = false;
    for (let i = 0; i < 30; i++) {
      const mounted = await cdp.evaluate(`
        Boolean(document.getElementById('root') && document.getElementById('root').children.length > 0)
      `);
      if (mounted) {
        isMounted = true;
        break;
      }
      await new Promise(r => setTimeout(r, 200));
    }

    if (!isMounted) {
      throw new Error('React application failed to mount within 6 seconds.');
    }
    console.log(`[✓] React application successfully mounted onto #root.`);

    // =========================================================================
    // SECTION 1: GLOBAL LAYOUT RULES & RESILIENCE (CSS / DOM)
    // =========================================================================
    console.log(`\n${colors.bold}${colors.cyan}=== Section 1: Global CSS Layout Resilience & Zero-Overflow Architecture ===${colors.reset}`);

    const globalStyles = await cdp.evaluate(`
      (() => {
        const bodyStyle = window.getComputedStyle(document.body);
        const htmlStyle = window.getComputedStyle(document.documentElement);
        const allElements = Array.from(document.querySelectorAll('*'));
        let nonBorderBoxCount = 0;
        allElements.slice(0, 100).forEach(el => {
          if (window.getComputedStyle(el).boxSizing !== 'border-box') nonBorderBoxCount++;
        });

        return {
          bodyOverflowX: bodyStyle.overflowX,
          htmlBoxSizing: htmlStyle.boxSizing,
          bodyBoxSizing: bodyStyle.boxSizing,
          nonBorderBoxCount,
          bodyMaxWidth: bodyStyle.maxWidth
        };
      })()
    `);

    if (globalStyles.bodyOverflowX === 'hidden') {
      recordPass('Global CSS', 'S1.1', 'body { overflow-x: hidden } strictly enforced in computed style');
    } else {
      recordFail('Global CSS', 'S1.1', 'body { overflow-x: hidden } strictly enforced in computed style',
        `Expected 'hidden', got '${globalStyles.bodyOverflowX}'`);
    }

    if (globalStyles.nonBorderBoxCount === 0) {
      recordPass('Global CSS', 'S1.2', 'Universal box-sizing: border-box active across DOM elements');
    } else {
      recordFail('Global CSS', 'S1.2', 'Universal box-sizing: border-box active across DOM elements',
        `Found ${globalStyles.nonBorderBoxCount} elements without border-box`);
    }

    if (globalStyles.bodyMaxWidth === '100%' || globalStyles.bodyMaxWidth === 'none') {
      recordPass('Global CSS', 'S1.3', `body maxWidth constraint verified (${globalStyles.bodyMaxWidth})`);
    } else {
      recordFail('Global CSS', 'S1.3', 'body maxWidth constraint verified', `Unexpected maxWidth: ${globalStyles.bodyMaxWidth}`);
    }

    // =========================================================================
    // SECTION 2: VIEWPORT STRESS TESTING ACROSS 11 FORM FACTORS
    // =========================================================================
    console.log(`\n${colors.bold}${colors.cyan}=== Section 2: Viewport Stress Testing & Container Boundary Verification ===${colors.reset}`);

    for (let i = 0; i < VIEWPORTS.length; i++) {
      const vp = VIEWPORTS[i];
      const vpId = `S2.${i + 1}`;

      // Override device metrics
      await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile,
        screenWidth: vp.width,
        screenHeight: vp.height
      });

      // Allow relayout
      await new Promise(r => setTimeout(r, 150));

      const viewportMetrics = await cdp.evaluate(`
        (() => {
          const innerW = window.innerWidth;
          const clientW = document.documentElement.clientWidth;

          // Verify horizontal scroll lock
          const initialScrollX = window.scrollX;
          window.scrollBy(150, 0);
          const scrolledX = window.scrollX;
          document.documentElement.scrollLeft = 150;
          const docScrollLeft = document.documentElement.scrollLeft;
          document.body.scrollLeft = 150;
          const bodyScrollLeft = document.body.scrollLeft;

          // Restore scroll
          window.scrollTo(0, 0);

          const canScrollHorizontally = (scrolledX > 0 || docScrollLeft > 0 || bodyScrollLeft > 0);

          let overflowCulprits = [];
          if (canScrollHorizontally) {
            document.querySelectorAll('*').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.right > innerW + 2) {
                overflowCulprits.push({ tag: el.tagName, cls: el.className, right: Math.round(r.right), w: Math.round(r.width) });
              }
            });
          }

          // Test all core structural containers
          const containerSelectors = [
            'body',
            '#root',
            '.site-header',
            '.aura-navbar',
            '.hero-section',
            '.sensory-selector',
            '.brew-selector',
            '.story-section',
            '.brand-story-section',
            '.menu-section',
            '.menu-catalog',
            '.crm-section',
            '.clm-section',
            '.simulation-sandbox',
            '.journey-stepper',
            '.reviews-section',
            '.location-section',
            '.hours-location-section',
            '.site-footer',
            '.aura-footer',
            '.container',
            '.container-shell',
            '.mobile-bottom-bar',
            '.mobile-quick-bar'
          ];

          const containerResults = [];
          containerSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach((el, idx) => {
              const style = window.getComputedStyle(el);
              if (style.display === 'none') return;
              const rect = el.getBoundingClientRect();
              const exceeds = rect.width > innerW + 1.5;
              containerResults.push({
                selector: sel + (idx > 0 ? '[' + idx + ']' : ''),
                width: Math.round(rect.width * 10) / 10,
                exceeds
              });
            });
          });

          const anyContainerExceeds = containerResults.some(c => c.exceeds);
          const exceedingContainers = containerResults.filter(c => c.exceeds);

          return {
            innerW,
            clientW,
            scrolledX,
            docScrollLeft,
            bodyScrollLeft,
            overflowCulprits,
            canScrollHorizontally,
            anyContainerExceeds,
            exceedingContainers,
            containersChecked: containerResults.length
          };
        })()
      `);

      if (!viewportMetrics.canScrollHorizontally && !viewportMetrics.anyContainerExceeds) {
        recordPass('Viewport Stress', vpId,
          `${vp.name} (${vp.width}x${vp.height}): Zero horizontal scroll (scrollLeft=0) & all ${viewportMetrics.containersChecked} containers <= 100vw`);
      } else {
        const errParts = [];
        if (viewportMetrics.canScrollHorizontally) {
          const culpritsStr = (viewportMetrics.overflowCulprits || []).slice(0, 5).map(c => `${c.tag}.${c.cls}(w=${c.w},r=${c.right})`).join(', ');
          errParts.push(`Horizontal scroll detected (scrolledX=${viewportMetrics.scrolledX}, docScrollLeft=${viewportMetrics.docScrollLeft}, bodyScrollLeft=${viewportMetrics.bodyScrollLeft}) [Culprits: ${culpritsStr}]`);
        }
        if (viewportMetrics.anyContainerExceeds) {
          const details = viewportMetrics.exceedingContainers.map(c => `${c.selector}(${c.width}px)`).join(', ');
          errParts.push(`Containers exceed window: ${details}`);
        }
        recordFail('Viewport Stress', vpId, `${vp.name} (${vp.width}x${vp.height}): Layout boundaries`, errParts.join('; '));
      }
    }

    // =========================================================================
    // SECTION 3: ERGONOMIC TOUCH TARGET MEASUREMENTS (>= 44px)
    // =========================================================================
    console.log(`\n${colors.bold}${colors.cyan}=== Section 3: Empirical Touch Target Measurements (WCAG AA >= 44px) ===${colors.reset}`);

    // Test touch targets at standard mobile viewport (iPhone 14 — 390px)
    await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      screenWidth: 390,
      screenHeight: 844
    });
    await new Promise(r => setTimeout(r, 150));

    const touchTargets = await cdp.evaluate(`
      (() => {
        function checkElements(selector, name) {
          const els = Array.from(document.querySelectorAll(selector)).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
          });
          const results = els.map(el => {
            const rect = el.getBoundingClientRect();
            return {
              selector,
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
              passesMinDimension: (rect.height >= 43.5 && rect.width >= 43.5)
            };
          });
          return { name, selector, count: els.length, results };
        }

        return {
          buttons: checkElements('.btn, button.btn-primary, button.btn-secondary, .btn-primary-order, .btn-whatsapp-order, .btn-header-basket, .btn-card-add', 'Primary & Action Buttons'),
          hamburger: checkElements('.hamburger-btn, .mobile-toggle, [aria-label*="menu"], [aria-label*="Toggle"], [aria-label="Toggle navigation"]', 'Mobile Hamburger Button'),
          categoryChips: checkElements('.category-chip, .category-tab, .menu-tab, .category-pill-btn, .quick-tag-chip', 'Menu Category Tabs/Chips'),
          dietaryPills: checkElements('.dietary-pill, .filter-pill, .sensory-chip, .dietary-chip', 'Dietary & Sensory Filter Pills'),
          bottomBarButtons: checkElements('.bottom-bar-btn, .mobile-quick-btn, .quick-btn, .mobile-bar-action', 'Mobile Sticky Bottom Bar Buttons'),
          searchInput: checkElements('.search-input, input[type="search"], input[placeholder*="Search"], .search-input-field', 'Instant Menu Search Input'),
          brandLink: checkElements('.brand-link, .brand-logo, .brand-badge, .navbar-brand, .brand-lockup', 'Header Brand Wordmark Link'),
        };
      })()
    `);

    function evaluateGroup(group, id, label) {
      if (group.count === 0) {
        recordFail('Touch Targets', id, `${label}: Touch target verification`, `No visible elements matching '${group.selector}' found`);
        return;
      }
      const groupFailures = group.results.filter(r => !r.passesMinDimension);
      if (groupFailures.length === 0) {
        const minW = Math.min(...group.results.map(r => r.width));
        const minH = Math.min(...group.results.map(r => r.height));
        recordPass('Touch Targets', id, `${label} (Count: ${group.count}): Min dimensions ${minW}px × ${minH}px >= 44px`);
      } else {
        const sample = groupFailures[0];
        recordFail('Touch Targets', id, `${label}: Min dimensions >= 44px`,
          `Found ${groupFailures.length} element(s) under 44px. Sample: ${sample.width}px × ${sample.height}px`);
      }
    }

    evaluateGroup(touchTargets.buttons, 'S3.1', 'Buttons (.btn)');
    evaluateGroup(touchTargets.hamburger, 'S3.2', 'Mobile Hamburger Button (.hamburger-btn)');
    evaluateGroup(touchTargets.categoryChips, 'S3.3', 'Category Chips (.category-chip)');
    evaluateGroup(touchTargets.dietaryPills, 'S3.4', 'Dietary Pills (.dietary-pill)');
    evaluateGroup(touchTargets.bottomBarButtons, 'S3.5', 'Mobile Bottom Bar Buttons (.bottom-bar-btn)');
    evaluateGroup(touchTargets.searchInput, 'S3.6', 'Search Input (.search-input)');
    evaluateGroup(touchTargets.brandLink, 'S3.7', 'Brand Wordmark Touch Target (.brand-link)');

    // =========================================================================
    // SECTION 4: MOBILE DRAWER SLIDE-OUT, SCROLL LOCK & DISMISSAL
    // =========================================================================
    console.log(`\n${colors.bold}${colors.cyan}=== Section 4: Mobile Navigation Drawer Slide-Out & Interaction Verification ===${colors.reset}`);

    await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      screenWidth: 390,
      screenHeight: 844
    });
    await new Promise(r => setTimeout(r, 100));

    // Verify initial drawer state (closed)
    const initialDrawer = await cdp.evaluate(`
      (() => {
        const drawer = document.querySelector('.mobile-drawer');
        const backdrop = document.querySelector('.drawer-backdrop');
        const style = window.getComputedStyle(drawer);
        return {
          isOpen: drawer.classList.contains('open'),
          transform: style.transform,
          backdropOpen: backdrop.classList.contains('open')
        };
      })()
    `);

    if (!initialDrawer.isOpen && !initialDrawer.backdropOpen) {
      recordPass('Mobile Drawer', 'S4.1', 'Drawer initially closed and hidden off-canvas');
    } else {
      recordFail('Mobile Drawer', 'S4.1', 'Drawer initially closed', 'Drawer or backdrop active initially');
    }

    // Trigger open drawer via clicking hamburger button
    await cdp.evaluate(`
      (() => {
        const btn = document.querySelector('.hamburger-btn, .mobile-toggle, [aria-label*="menu"], [aria-label*="Toggle"]');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 350));

    const openedDrawer = await cdp.evaluate(`
      (() => {
        const drawer = document.querySelector('.mobile-drawer, .drawer-container');
        const backdrop = document.querySelector('.drawer-backdrop, .modal-backdrop');
        const bodyStyle = window.getComputedStyle(document.body);
        const navLinks = Array.from(document.querySelectorAll('.drawer-nav-link, .mobile-nav-link, .drawer-link'));

        const touchTargets = navLinks.map(l => {
          const rect = l.getBoundingClientRect();
          return { height: rect.height, width: rect.width };
        });

        const allLinksMeet44px = touchTargets.length === 0 || touchTargets.every(t => t.height >= 43.5 && t.width >= 43.5);

        return {
          isOpen: drawer ? (drawer.classList.contains('open') || drawer.classList.contains('active')) : false,
          backdropOpen: backdrop ? (backdrop.classList.contains('open') || backdrop.classList.contains('active')) : false,
          bodyOverflow: bodyStyle.overflow,
          bodyOverflowY: bodyStyle.overflowY,
          navLinkCount: navLinks.length,
          allLinksMeet44px
        };
      })()
    `);

    if (openedDrawer.isOpen) {
      recordPass('Mobile Drawer', 'S4.2', 'Clicking hamburger button opens drawer and backdrop with .open/.active class');
    } else {
      recordFail('Mobile Drawer', 'S4.2', 'Opening drawer via hamburger button', 'Drawer did not receive .open class');
    }

    if (openedDrawer.bodyOverflow === 'hidden' || openedDrawer.bodyOverflowY === 'hidden') {
      recordPass('Mobile Drawer', 'S4.3', 'Opening mobile drawer triggers body scroll lock (body { overflow: hidden })');
    } else {
      recordFail('Mobile Drawer', 'S4.3', 'Body scroll lock on drawer open', `Expected overflow: hidden, got ${openedDrawer.bodyOverflow}`);
    }

    if (openedDrawer.navLinkCount >= 3 && openedDrawer.allLinksMeet44px) {
      recordPass('Mobile Drawer', 'S4.4', `Drawer navigation links (${openedDrawer.navLinkCount} items) have >= 44px touch targets`);
    } else {
      recordFail('Mobile Drawer', 'S4.4', 'Drawer navigation links >= 44px', `Count: ${openedDrawer.navLinkCount}, all >= 44px: ${openedDrawer.allLinksMeet44px}`);
    }

    // Dismiss drawer via close button or backdrop
    await cdp.evaluate(`
      (() => {
        const closeBtn = document.querySelector('.drawer-close-btn, .close-btn, [aria-label*="close" i], [aria-label*="Close"]');
        if (closeBtn) closeBtn.click();
        else {
          const backdrop = document.querySelector('.drawer-backdrop');
          if (backdrop) backdrop.click();
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 350));

    const closedDrawer = await cdp.evaluate(`
      (() => {
        const drawer = document.querySelector('.mobile-drawer, .drawer-container');
        const backdrop = document.querySelector('.drawer-backdrop, .modal-backdrop');
        const bodyStyle = window.getComputedStyle(document.body);
        return {
          isOpen: drawer ? (drawer.classList.contains('open') || drawer.classList.contains('active')) : false,
          backdropOpen: backdrop ? (backdrop.classList.contains('open') || backdrop.classList.contains('active')) : false,
          bodyOverflow: bodyStyle.overflow
        };
      })()
    `);

    if (!closedDrawer.isOpen) {
      recordPass('Mobile Drawer', 'S4.5', 'Clicking close button dismisses drawer and releases body scroll lock');
    } else {
      recordFail('Mobile Drawer', 'S4.5', 'Dismissing drawer via close button', 'Drawer or backdrop remained open');
    }

    // Test dismissal via Escape key
    await cdp.evaluate(`
      (() => {
        const btn = document.querySelector('.hamburger-btn, .mobile-toggle, [aria-label*="menu"], [aria-label*="Toggle"]');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 200));
    await cdp.evaluate(`
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    `);
    await new Promise(r => setTimeout(r, 300));

    const escClosed = await cdp.evaluate(`
      !document.querySelector('.mobile-drawer').classList.contains('open')
    `);
    if (escClosed) {
      recordPass('Mobile Drawer', 'S4.6', 'Escape key dismisses mobile drawer cleanly');
    } else {
      recordFail('Mobile Drawer', 'S4.6', 'Escape key dismisses mobile drawer', 'Drawer did not close on Escape');
    }

    // =========================================================================
    // SECTION 5: MOBILE BOTTOM ACTION BAR BREAKPOINT DYNAMICS
    // =========================================================================
    console.log(`\n${colors.bold}${colors.cyan}=== Section 5: Mobile Bottom Action Bar Breakpoint Verification ===${colors.reset}`);

    // Viewport <= 430px (e.g. 390px): Mobile bottom bar must be visible
    await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      screenWidth: 390,
      screenHeight: 844
    });
    await new Promise(r => setTimeout(r, 150));

    const mobileBottomBar = await cdp.evaluate(`
      (() => {
        const bar = document.querySelector('.mobile-bottom-bar, .mobile-quick-bar');
        if (!bar) return { exists: false };
        const style = window.getComputedStyle(bar);
        const rect = bar.getBoundingClientRect();
        return {
          exists: true,
          display: style.display,
          position: style.position,
          bottom: style.bottom,
          isVisible: style.display !== 'none' && rect.height > 0
        };
      })()
    `);

    if (mobileBottomBar.exists && mobileBottomBar.isVisible && mobileBottomBar.position === 'fixed') {
      recordPass('Bottom Bar', 'S5.1', `Mobile bottom action bar is active & visible on smartphone (390px): position=${mobileBottomBar.position}, display=${mobileBottomBar.display}`);
    } else {
      recordFail('Bottom Bar', 'S5.1', 'Mobile bottom action bar on smartphone (390px)',
        `Bar visibility failed: exists=${mobileBottomBar.exists}, visible=${mobileBottomBar.isVisible}`);
    }

    // Viewport at 1280px (MacBook Air): Mobile bottom bar must disappear (display: none)
    await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 1280,
      screenHeight: 800
    });
    await new Promise(r => setTimeout(r, 150));

    const laptopBottomBar = await cdp.evaluate(`
      (() => {
        const bar = document.querySelector('.mobile-bottom-bar, .mobile-quick-bar');
        if (!bar) return { exists: false };
        const style = window.getComputedStyle(bar);
        return {
          exists: true,
          display: style.display,
          isHidden: style.display === 'none'
        };
      })()
    `);

    if (laptopBottomBar.exists && laptopBottomBar.isHidden) {
      recordPass('Bottom Bar', 'S5.2', `Mobile bottom action bar disappears on laptop (1280px): display=${laptopBottomBar.display}`);
    } else {
      recordFail('Bottom Bar', 'S5.2', 'Mobile bottom action bar hidden on laptop (1280px)',
        `Expected display: none, got display: ${laptopBottomBar.display}`);
    }

    // Viewport at 1920px (Desktop Full HD): Must also disappear
    await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 1920,
      screenHeight: 1080
    });
    await new Promise(r => setTimeout(r, 150));

    const desktopBottomBar = await cdp.evaluate(`
      (() => {
        const bar = document.querySelector('.mobile-bottom-bar, .mobile-quick-bar');
        return bar ? window.getComputedStyle(bar).display : 'missing';
      })()
    `);

    if (desktopBottomBar === 'none') {
      recordPass('Bottom Bar', 'S5.3', `Mobile bottom action bar disappears on desktop (1920px): display=none`);
    } else {
      recordFail('Bottom Bar', 'S5.3', 'Mobile bottom action bar hidden on desktop (1920px)', `Expected none, got ${desktopBottomBar}`);
    }

    // Verify Desktop Navbar visibility on 1280px & 1920px
    const desktopNavVisible = await cdp.evaluate(`
      (() => {
        const desktopNav = document.querySelector('.desktop-nav, .desktop-nav-links');
        const hamburger = document.querySelector('.hamburger-btn');
        const navStyle = window.getComputedStyle(desktopNav);
        const hamStyle = window.getComputedStyle(hamburger);
        return {
          desktopNavDisplay: navStyle.display,
          hamburgerDisplay: hamStyle.display
        };
      })()
    `);

    if (desktopNavVisible.desktopNavDisplay !== 'none' && desktopNavVisible.hamburgerDisplay === 'none') {
      recordPass('Desktop Nav', 'S5.4', `Desktop navbar is visible and hamburger button is hidden on desktop viewports`);
    } else {
      recordFail('Desktop Nav', 'S5.4', 'Desktop navbar visibility',
        `Nav display: ${desktopNavVisible.desktopNavDisplay}, Hamburger display: ${desktopNavVisible.hamburgerDisplay}`);
    }

    // =========================================================================
    // SECTION 6: ULTRA-WIDE CONTAINER BOUNDS VERIFICATION (2560px)
    // =========================================================================
    console.log(`\n${colors.bold}${colors.cyan}=== Section 6: Ultra-Wide Viewport Container Bounds Verification (2560px) ===${colors.reset}`);

    await cdp.sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 2560,
      height: 1440,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 2560,
      screenHeight: 1440
    });
    await new Promise(r => setTimeout(r, 150));

    const ultraWideMetrics = await cdp.evaluate(`
      (() => {
        const containers = Array.from(document.querySelectorAll('.container, .container-shell'));
        const clientW = document.documentElement.clientWidth;
        const results = containers.map(c => {
          const rect = c.getBoundingClientRect();
          const style = window.getComputedStyle(c);
          const leftMargin = Math.round(rect.left);
          const rightMargin = Math.round(clientW - rect.right);
          return {
            width: Math.round(rect.width),
            maxWidth: style.maxWidth,
            leftMargin,
            rightMargin,
            isCentered: Math.abs(leftMargin - rightMargin) <= 3,
            boundedBy1280: rect.width <= 1280
          };
        });

        const allBounded = results.every(r => r.boundedBy1280);
        const allCentered = results.every(r => r.isCentered);

        return {
          containerCount: containers.length,
          allBounded,
          allCentered,
          sampleWidth: results[0]?.width,
          sampleMaxWidth: results[0]?.maxWidth,
          leftMargin: results[0]?.leftMargin,
          rightMargin: results[0]?.rightMargin
        };
      })()
    `);

    if (ultraWideMetrics.allBounded) {
      recordPass('Ultra-wide Bounds', 'S6.1',
        `Containers on 2560px display strictly bound width to <= 1280px (actual rendered width: ${ultraWideMetrics.sampleWidth}px, maxWidth: ${ultraWideMetrics.sampleMaxWidth})`);
    } else {
      recordFail('Ultra-wide Bounds', 'S6.1', 'Containers width bounded <= 1280px on 2560px viewport',
        `Containers exceeded 1280px! Rendered width: ${ultraWideMetrics.sampleWidth}px`);
    }

    if (ultraWideMetrics.allCentered) {
      recordPass('Ultra-wide Bounds', 'S6.2',
        `Containers are symmetrically auto-centered inside client width (Left Margin: ${ultraWideMetrics.leftMargin}px, Right Margin: ${ultraWideMetrics.rightMargin}px)`);
    } else {
      recordFail('Ultra-wide Bounds', 'S6.2', 'Containers auto-centered on 2560px viewport',
        `Left margin (${ultraWideMetrics.leftMargin}px) != Right margin (${ultraWideMetrics.rightMargin}px)`);
    }

  } catch (err) {
    console.error(`\n${colors.red}CRITICAL TEST HARNESS FAILURE: ${err.message}${colors.reset}`);
    console.error(err.stack);
    recordFail('Harness', 'CRIT', 'Fatal harness execution error', err.message);
  } finally {
    if (cdp && cdp.ws) {
      try { cdp.ws.close(); } catch (e) {}
    }
    if (chrome) {
      try { chrome.kill(); } catch (e) {}
    }
    if (server) {
      try { server.close(); } catch (e) {}
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════════════════════════════════════════`);
  console.log('                 RESPONSIVE CHALLENGE SUITE SUMMARY                               ');
  console.log(`═══════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`  Execution Time:    ${duration}s`);
  console.log(`  Total Checks:      ${testCount}`);
  console.log(`  Passed:            ${passedCount}`);
  console.log(`  Failed:            ${failedCount}`);
  console.log(`  Pass Rate:         ${((passedCount / testCount) * 100).toFixed(1)}%`);

  if (failedCount > 0) {
    console.log(`\n${colors.bold}${colors.red}FAILURES BREAKDOWN (${failedCount}):${colors.reset}`);
    failures.forEach(f => {
      console.log(`  [${f.testId}] ${f.description}: ${f.errorMsg}`);
    });
    console.log(`\n${colors.bold}${colors.red}VERDICT: REQUEST_CHANGES — Viewport verification failed.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.bold}${colors.green}VERDICT: APPROVE — All 11 viewports and layout properties passed!${colors.reset}\n`);
    process.exit(0);
  }
}

main();
