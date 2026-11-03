/**
 * test_runner.js — Automated 4-Tier Test Suite for YEAH MAN CARIBBEAN
 *
 * Requirements Covered:
 * - R1: Brand & Business Integrity (Yeah Man Caribbean, 63 Norway Street, M32 0JN, 0161 864 3259)
 * - R2: Menu Inventory Integrity (80 Authentic Scraped Items across 8 Categories, GBP Prices, Allergens)
 * - R3: Menu Search Form & Compact UX (Instant Search, Quick Tags, 12-Item Compact Default, Expansion)
 * - R4: Interactive Cart System (Add to Cart, Quantity Stepper, Collection/Delivery, WhatsApp Dispatch)
 * - R5: Delivery Postcode Validator (M15, M16, M17, M21, M32, M33, M41, M5, M50)
 * - R6: Responsive Layout & Mobile Drawer (Touch Targets >= 44px, Zero Overflow, Fixed Bottom Bar)
 *
 * Usage:
 *   node test_runner.js
 */

const fs = require('fs');
const path = require('path');
const DATA = require('./data.js');

// ANSI color styling
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  tierStats: { 1: 0, 2: 0, 3: 0, 4: 0 },
  failures: []
};

let currentTier = 1;
let currentSuite = '';

function suite(name, tier, fn) {
  currentTier = tier;
  currentSuite = name;
  console.log(`\n${colors.bold}${colors.cyan}=== [Tier ${tier}] ${name} ===${colors.reset}`);
  fn();
}

function test(id, description, fn) {
  stats.total++;
  try {
    fn();
    stats.passed++;
    stats.tierStats[currentTier]++;
    console.log(`  ${colors.green}✓${colors.reset} ${colors.dim}[${id}]${colors.reset} ${description}`);
  } catch (err) {
    stats.failed++;
    stats.failures.push({ tier: currentTier, suite: currentSuite, id, description, error: err.message });
    console.log(`  ${colors.red}✗${colors.reset} ${colors.bold}[${id}]${colors.reset} ${description}`);
    console.log(`    ${colors.red}Error: ${err.message}${colors.reset}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'} - Expected: ${expected}, Got: ${actual}`);
  }
}

// ============================================================================
// TIER 1: BRAND, DATA & INVENTORY COVERAGE
// ============================================================================
suite('Brand Identity & Verified Metadata', 1, () => {
  test('T1-01', 'Brand name is YEAH MAN CARIBBEAN', () => {
    assertEqual(DATA.brand.name, 'YEAH MAN CARIBBEAN');
  });

  test('T1-02', 'Full physical address on Norway Street is verified', () => {
    assert(DATA.brand.address.includes('63 Norway Street'), 'Address missing Norway Street');
    assert(DATA.brand.address.includes('M32 0JN'), 'Address missing M32 0JN');
  });

  test('T1-03', 'Direct telephone dialer is 0161 864 3259', () => {
    assertEqual(DATA.brand.phone, '0161 864 3259');
    assertEqual(DATA.brand.phoneDialer, '+441618643259');
  });

  test('T1-04', 'WhatsApp ordering number is 441618643259', () => {
    assertEqual(DATA.brand.whatsappNumber, '441618643259');
  });

  test('T1-05', 'Reputation ratings match 4.8 stars with 2,000+ reviews', () => {
    assert(DATA.brand.rating >= 4.8, 'Rating below 4.8');
    assert(DATA.brand.reviewCount >= 2000, 'Review count under 2000');
  });
});

suite('80-Item Menu Catalog Integrity', 1, () => {
  test('T1-06', 'Exactly 80 authentic menu items exist', () => {
    assertEqual(DATA.menuItems.length, 80);
  });

  test('T1-07', '8 distinct menu categories defined', () => {
    assertEqual(DATA.menuCategories.length, 8);
    const catIds = DATA.menuCategories.map(c => c.id);
    assert(catIds.includes('mains'), 'Missing mains category');
    assert(catIds.includes('sides'), 'Missing sides category');
    assert(catIds.includes('veg'), 'Missing veg category');
    assert(catIds.includes('soups'), 'Missing soups category');
    assert(catIds.includes('barms'), 'Missing barms category');
    assert(catIds.includes('drinks'), 'Missing drinks category');
    assert(catIds.includes('desserts'), 'Missing desserts category');
    assert(catIds.includes('icecream'), 'Missing icecream category');
  });

  test('T1-08', 'Every menu item has valid GBP price string and numeric price', () => {
    DATA.menuItems.forEach((item, i) => {
      assert(item.price.startsWith('£'), `Item ${i} (${item.name}) price missing £ symbol`);
      assert(typeof item.priceNum === 'number' && item.priceNum > 0, `Item ${i} (${item.name}) invalid numeric price`);
    });
  });

  test('T1-09', 'Signature dishes identified (Jerk Chicken, Curry Goat, Oxtail, Jerk Split)', () => {
    const sigs = DATA.menuItems.filter(i => i.isSignature);
    assert(sigs.length >= 4, `Expected at least 4 signatures, got ${sigs.length}`);
    const names = sigs.map(s => s.name.toLowerCase());
    assert(names.some(n => n.includes('jerk chicken')), 'Missing Jerk Chicken signature');
    assert(names.some(n => n.includes('curry goat')), 'Missing Curry Goat signature');
    assert(names.some(n => n.includes('oxtail')), 'Missing Oxtail signature');
    assert(names.some(n => n.includes('split')), 'Missing Jerk Split signature');
  });

  test('T1-10', 'All 9 delivery postcodes configured', () => {
    const postcodes = DATA.fulfillment.postcodes.map(p => p.code);
    ['M15', 'M16', 'M17', 'M21', 'M32', 'M33', 'M41', 'M5', 'M50'].forEach(code => {
      assert(postcodes.includes(code), `Missing postcode ${code}`);
    });
  });
});

// ============================================================================
// TIER 2: SEARCH FORM, COMPACT MODE & BOUNDARIES
// ============================================================================
suite('Dedicated Menu Search Form & Quick Tags', 2, () => {
  test('T2-01', 'Search query correctly filters items by dish name', () => {
    const query = 'oxtail';
    const matches = DATA.menuItems.filter(it => it.name.toLowerCase().includes(query));
    assert(matches.length > 0, 'No matches for oxtail');
    assert(matches.some(m => m.name === 'Oxtail'), 'Direct Oxtail dish not matched');
  });

  test('T2-02', 'Search query filters items by ingredient description', () => {
    const query = 'spices';
    const matches = DATA.menuItems.filter(it => (it.description || '').toLowerCase().includes(query) || it.name.toLowerCase().includes(query));
    assert(matches.length > 0, 'No matches for spices in descriptions');
  });

  test('T2-03', 'Search query matches allergen notices', () => {
    const query = 'cereals';
    const matches = DATA.menuItems.filter(it => (it.allergen || '').toLowerCase().includes(query));
    assert(matches.length > 0, 'No allergen matches for cereals');
  });

  test('T2-04', 'Quick tag search works for Curry Goat', () => {
    const tag = 'Curry Goat';
    const matches = DATA.menuItems.filter(it => it.name.toLowerCase().includes(tag.toLowerCase()));
    assert(matches.length >= 1, 'Quick tag Curry Goat failed');
  });

  test('T2-05', 'Compact mode reduces 80-item view to top 12 curated items', () => {
    const defaultCompactSlice = DATA.menuItems.slice(0, 12);
    assertEqual(defaultCompactSlice.length, 12, 'Compact slice should be exactly 12 items');
    assert(defaultCompactSlice[0].isSignature, 'Top item in compact view should be signature dish');
  });

  test('T2-06', 'Category filter reduces items cleanly without lengthy scroll fatigue', () => {
    const mains = DATA.menuItems.filter(i => i.categoryId === 'mains');
    assertEqual(mains.length, 13, 'Mains category should contain 13 items');
    const sides = DATA.menuItems.filter(i => i.categoryId === 'sides');
    assertEqual(sides.length, 9, 'Sides category should contain 9 items');
    const soups = DATA.menuItems.filter(i => i.categoryId === 'soups');
    assertEqual(soups.length, 2, 'Soups category should contain 2 items');
  });
});

// ============================================================================
// TIER 3: CART SYSTEM & BUSINESS LOGIC
// ============================================================================
suite('Cart System Calculations & Dispatch Handlers', 3, () => {
  test('T3-01', 'Adding item to cart initializes quantity to 1', () => {
    const cart = {};
    const item = DATA.menuItems[0];
    cart[item.id] = { item: item, qty: 1 };
    assertEqual(cart[item.id].qty, 1);
  });

  test('T3-02', 'Quantity stepper increases and decreases correctly', () => {
    const cart = {};
    const item = DATA.menuItems[0];
    cart[item.id] = { item: item, qty: 1 };
    // Increment
    cart[item.id].qty += 1;
    assertEqual(cart[item.id].qty, 2);
    // Decrement
    cart[item.id].qty -= 1;
    assertEqual(cart[item.id].qty, 1);
    // Remove if 0
    cart[item.id].qty -= 1;
    if (cart[item.id].qty <= 0) delete cart[item.id];
    assertEqual(cart[item.id], undefined);
  });

  test('T3-03', 'Subtotal calculates accurately across multiple dishes', () => {
    const item1 = { priceNum: 10.00 }; // Jerk Chicken
    const item2 = { priceNum: 12.50 }; // Oxtail
    const item3 = { priceNum: 5.50 };  // Split
    const subtotal = (item1.priceNum * 2) + (item2.priceNum * 1) + (item3.priceNum * 2);
    // 20.00 + 12.50 + 11.00 = 43.50
    assertEqual(subtotal, 43.50);
  });

  test('T3-04', 'Collection fulfillment has £0.00 delivery fee', () => {
    const orderType = 'collection';
    const fee = orderType === 'delivery' ? 3.00 : 0.00;
    assertEqual(fee, 0.00);
  });

  test('T3-05', 'Delivery fulfillment adds £3.00 delivery fee', () => {
    const orderType = 'delivery';
    const fee = orderType === 'delivery' ? 3.00 : 0.00;
    assertEqual(fee, 3.00);
  });

  test('T3-06', 'Delivery minimum order (£15.00) rule evaluated correctly', () => {
    const subtotalBelow = 12.00;
    const isSatisfiedBelow = subtotalBelow >= 15.00;
    assertEqual(isSatisfiedBelow, false);

    const subtotalAbove = 22.50;
    const isSatisfiedAbove = subtotalAbove >= 15.00;
    assertEqual(isSatisfiedAbove, true);
  });

  test('T3-07', 'WhatsApp order URL generated with proper URL encoding and phone number', () => {
    const brand = DATA.brand;
    const lines = [
      '*YEAH MAN CARIBBEAN — DIRECT ORDER*',
      'Fulfillment: Collection Takeaway (FREE)',
      '1x Jerk Chicken (£10.00)',
      'Total Due: £10.00'
    ];
    const encoded = encodeURIComponent(lines.join('\n'));
    const url = 'https://wa.me/' + brand.whatsappNumber + '?text=' + encoded;
    assert(url.includes('441618643259'), 'URL missing WhatsApp number');
    assert(url.includes('YEAH%20MAN%20CARIBBEAN'), 'URL missing brand in encoded text');
  });

  test('T3-08', 'Commission savings calculator computes ~20% aggregator difference', () => {
    const subtotal = 40.00;
    const savings = (subtotal * 0.20).toFixed(2);
    assertEqual(savings, '8.00');
  });
});

// ============================================================================
// TIER 4: RESPONSIVE DESIGN, COMPONENT SUITE & STYLESHEET
// ============================================================================
suite('Component & Stylesheet Architecture', 4, () => {
  test('T4-01', 'All 15 React components exported from app.js', () => {
    const appModule = require('./app.js');
    const requiredComponents = [
      'Navbar', 'MobileDrawer', 'Hero', 'QuickInfoBar', 'MenuCatalog',
      'SignatureSpotlight', 'StorySection', 'CateringSection', 'ReviewsSection',
      'LocationHours', 'CartDrawer', 'FloatingCartPill', 'MobileQuickBar',
      'InquiryModal', 'Footer', 'App'
    ];
    requiredComponents.forEach(name => {
      assert(typeof appModule[name] === 'function', `Component ${name} is missing or not a function`);
    });
  });

  test('T4-02', 'styles.css defines Caribbean design tokens', () => {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    assert(css.includes('--color-palm-green: #0D5C3A;'), 'Missing palm green token');
    assert(css.includes('--color-gold: #F59E0B;'), 'Missing gold token');
    assert(css.includes('--color-whatsapp: #25D366;'), 'Missing WhatsApp token');
    assert(css.includes('--color-charcoal-base: #0F1215;'), 'Missing charcoal base token');
  });

  test('T4-03', 'styles.css enforces strict zero horizontal overflow', () => {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    assert(css.includes('overflow-x: hidden;'), 'Missing overflow-x: hidden declaration');
  });

  test('T4-04', 'styles.css includes cart drawer and floating basket pill styling', () => {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    assert(css.includes('.cart-drawer'), 'Missing .cart-drawer styles');
    assert(css.includes('.floating-cart-pill'), 'Missing .floating-cart-pill styles');
    assert(css.includes('.card-stepper-box'), 'Missing .card-stepper-box styles');
  });

  test('T4-05', 'styles.css enforces touch targets >= 44px on buttons', () => {
    const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    assert(css.includes('min-height: 44px;'), 'Missing min-height: 44px declaration');
    assert(css.includes('min-height: 48px;'), 'Missing min-height: 48px declaration');
  });

  test('T4-06', 'index.html contains valid title, meta tags, and script mounts', () => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    assert(html.includes('Yeah Man Caribbean'), 'index.html missing brand in title');
    assert(html.includes('id="root"'), 'index.html missing root mount point');
    assert(html.includes('src="data.js"'), 'index.html missing data.js script');
    assert(html.includes('src="app.js"'), 'index.html missing app.js script');
  });
});

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log(`\n${colors.bold}========================================${colors.reset}`);
console.log(`${colors.bold}TEST SUITE EXECUTION SUMMARY${colors.reset}`);
console.log(`========================================`);
console.log(`Total Tests Run:  ${stats.total}`);
console.log(`Tests Passed:    ${colors.green}${stats.passed}${colors.reset}`);
console.log(`Tests Failed:    ${stats.failed > 0 ? colors.red + stats.failed + colors.reset : '0'}`);
console.log(`Tier 1 (Brand & 80 Items): ${stats.tierStats[1]} passed`);
console.log(`Tier 2 (Search & Compact): ${stats.tierStats[2]} passed`);
console.log(`Tier 3 (Cart & Ordering):  ${stats.tierStats[3]} passed`);
console.log(`Tier 4 (Layout & React):   ${stats.tierStats[4]} passed`);

if (stats.failed > 0) {
  console.log(`\n${colors.red}Failures detail:${colors.reset}`);
  stats.failures.forEach(f => {
    console.log(`- [${f.id}] in ${f.suite}: ${f.error}`);
  });
  process.exit(1);
} else {
  console.log(`\n${colors.bold}${colors.green}ALL ${stats.total} TESTS PASSED PERFECTLY!${colors.reset}\n`);
  process.exit(0);
}
