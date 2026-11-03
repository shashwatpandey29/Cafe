/* ==========================================================================
   AURA COFFEE ATELIER — Professional Cafe Flagship Application (React 18)
   Inspired by Caffè Nero, Blue Bottle Coffee, WatchHouse & Ralph's Coffee
   ========================================================================== */

(function () {
  'use strict';

  var React = (typeof window !== 'undefined' && window.React) ? window.React : null;
  var ReactDOM = (typeof window !== 'undefined' && window.ReactDOM) ? window.ReactDOM : null;
  var DATA = (typeof window !== 'undefined' && window.AURA_DATA)
    ? window.AURA_DATA
    : (typeof require !== 'undefined' ? require('./data.js') : {});

  if (!React || !ReactDOM) {
    console.error('React 18 runtime not loaded.');
    return;
  }

  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useMemo = React.useMemo;

  // --------------------------------------------------------------------------
  // VECTOR SVG ICONS
  // --------------------------------------------------------------------------
  function Icon(props) {
    var name = props.name;
    var size = props.size || 16;
    var color = props.color || 'currentColor';
    var svgProps = {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'icon-svg',
      'aria-hidden': 'true'
    };

    switch (name) {
      case 'coffee':
        return h('svg', svgProps,
          h('path', { d: 'M17 8h1a4 4 0 1 1 0 8h-1' }),
          h('path', { d: 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z' }),
          h('line', { x1: 6, y1: 2, x2: 6, y2: 4 }),
          h('line', { x1: 10, y1: 2, x2: 10, y2: 4 }),
          h('line', { x1: 14, y1: 2, x2: 14, y2: 4 })
        );
      case 'flame':
        return h('svg', svgProps,
          h('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z' })
        );
      case 'bag':
        return h('svg', svgProps,
          h('path', { d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' }),
          h('line', { x1: 3, y1: 6, x2: 21, y2: 6 }),
          h('path', { d: 'M16 10a4 4 0 0 1-8 0' })
        );
      case 'map-pin':
        return h('svg', svgProps,
          h('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
          h('circle', { cx: 12, cy: 10, r: 3 })
        );
      case 'clipboard':
        return h('svg', svgProps,
          h('rect', { width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 }),
          h('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' })
        );
      case 'check':
        return h('svg', svgProps,
          h('polyline', { points: '20 6 9 17 4 12' })
        );
      case 'close':
        return h('svg', svgProps,
          h('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
          h('line', { x1: 6, y1: 6, x2: 18, y2: 18 })
        );
      case 'sun':
        return h('svg', svgProps,
          h('circle', { cx: 12, cy: 12, r: 4 }),
          h('path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' })
        );
      case 'moon':
        return h('svg', svgProps,
          h('path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' })
        );
      case 'star':
        return h('svg', svgProps,
          h('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
        );
      case 'menu':
        return h('svg', svgProps,
          h('line', { x1: 4, y1: 12, x2: 20, y2: 12 }),
          h('line', { x1: 4, y1: 6, x2: 20, y2: 6 }),
          h('line', { x1: 4, y1: 18, x2: 20, y2: 18 })
        );
      default:
        return h('svg', svgProps, h('circle', { cx: 12, cy: 12, r: 8 }));
    }
  }

  // --------------------------------------------------------------------------
  // TOP ANNOUNCEMENT BAR
  // --------------------------------------------------------------------------
  function AnnouncementBar() {
    return h('div', { className: 'top-announcement-bar' },
      h('span', null, '✦ Fresh Roast Alert: Colombia Huila Pink Bourbon Honey lot now on bar · Complimentary UK delivery on beans over £25'),
      h('a', { href: '#subscription' }, 'Order Fresh Beans →')
    );
  }

  // --------------------------------------------------------------------------
  // SITE NAVBAR
  // --------------------------------------------------------------------------
  function SiteNavbar(props) {
    var brand = DATA.brand || {};
    var cartCount = props.cartCount || 0;
    var onOpenCart = props.onOpenCart;
    var theme = props.theme;
    var onToggleTheme = props.onToggleTheme;

    var navLinks = [
      { id: 'menu', label: 'Menu & Drinks', href: '#menu' },
      { id: 'craft', label: 'Our Roastery Craft', href: '#craft' },
      { id: 'loyalty', label: 'Atelier Coffee Club', href: '#loyalty' },
      { id: 'locations', label: 'Locations & Hours', href: '#locations' },
      { id: 'subscription', label: 'Coffee at Home', href: '#subscription' }
    ];

    return h('header', { className: 'site-navbar', role: 'banner' },
      h('div', { className: 'container navbar-container' },
        // Brand Lockup
        h('a', { href: '#', className: 'brand-lockup', 'aria-label': brand.name + ' Home' },
          h('div', { className: 'brand-emblem' }, 'A'),
          h('div', { className: 'brand-text-col' },
            h('span', { className: 'brand-name' }, brand.name || 'AURA Coffee Atelier'),
            h('span', { className: 'brand-sub' }, 'Artisan Roastery & Cafe')
          )
        ),

        // Desktop Nav Links
        h('nav', { className: 'nav-links-desktop', 'aria-label': 'Main Navigation' },
          navLinks.map(function (item) {
            return h('a', {
              key: item.id,
              href: item.href,
              className: 'nav-item-link'
            }, item.label);
          })
        ),

        // Right Actions (Theme, Cart, Store Finder)
        h('div', { className: 'nav-actions-group' },
          // Theme Toggle
          h('button', {
            type: 'button',
            className: 'theme-toggle-btn',
            onClick: onToggleTheme,
            title: 'Toggle theme (Current: ' + (theme === 'dark' ? 'Obsidian Evening' : 'Warm Linen') + ')',
            'aria-label': 'Toggle theme'
          },
            h(Icon, { name: theme === 'dark' ? 'sun' : 'moon', size: 18 })
          ),

          // Order Bag Button
          h('button', {
            type: 'button',
            className: 'cart-button',
            onClick: onOpenCart,
            'aria-label': 'View Order Bag, ' + cartCount + ' items'
          },
            h(Icon, { name: 'bag', size: 16 }),
            h('span', null, 'Order Bag'),
            cartCount > 0 && h('span', { className: 'cart-pill-count' }, cartCount)
          ),

          // Store Finder Anchor Button
          h('a', {
            href: '#locations',
            className: 'btn btn-secondary btn-sm',
            style: { display: 'inline-flex' }
          },
            h(Icon, { name: 'map-pin', size: 14 }),
            h('span', null, 'Find a Cafe')
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // EDITORIAL HERO SECTION
  // --------------------------------------------------------------------------
  function HeroSection(props) {
    var brand = DATA.brand || {};
    var onOpenCart = props.onOpenCart;

    return h('section', { className: 'cafe-hero-section' },
      h('div', { className: 'container' },
        h('div', { className: 'hero-editorial-grid' },
          // Left Content
          h('div', null,
            h('div', { className: 'hero-pill-badge' },
              h(Icon, { name: 'coffee', size: 14, color: 'var(--cafe-bronze)' }),
              'Specialty Coffee Association · 88+ Cupping Standard'
            ),
            h('h1', { className: 'hero-heading' },
              'Artisan Roasting. ',
              h('br', null),
              h('em', null, 'Neighborhood Calm.')
            ),
            h('p', { className: 'hero-lead-text' },
              brand.subheading || 'Ethically sourced single-origin coffees, slow-fermented bakery goods, and welcoming neighborhood spaces crafted for calm and connection.'
            ),
            h('div', { className: 'hero-cta-group' },
              h('a', { href: '#menu', className: 'btn btn-primary' },
                'Explore Menu & Order Ahead'
              ),
              h('a', { href: '#loyalty', className: 'btn btn-secondary' },
                h(Icon, { name: 'star', size: 15, color: 'var(--cafe-bronze)' }),
                'Join 9-Stamp Coffee Club'
              ),
              h('a', { href: '#locations', className: 'btn btn-secondary' },
                h(Icon, { name: 'map-pin', size: 15 }),
                'Our 3 Locations'
              )
            )
          ),

          // Right Visual Frame
          h('div', { className: 'hero-visual-frame' },
            h('img', {
              src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85',
              alt: 'AURA Coffee Atelier Barista pouring latte art',
              className: 'hero-main-img'
            }),
            h('div', { className: 'hero-floating-card' },
              h('div', { className: 'floating-card-info' },
                h('h4', null, 'Ethiopia Yirgacheffe G1 Washed'),
                h('p', null, 'Jasmine flower, bergamot tea, nectarine · Freshly roasted')
              ),
              h('div', { className: 'floating-card-rating' },
                h(Icon, { name: 'star', size: 14, color: '#F59E0B' }),
                '89.5 Pts'
              )
            )
          )
        ),

        // Trust Commitments Bar
        h('div', { className: 'trust-commitments-bar' },
          (brand.commitments || []).map(function (item, idx) {
            return h('div', { key: idx, className: 'trust-item' },
              h('div', { className: 'trust-icon-box' },
                h(Icon, { name: item.icon || 'check', size: 18 })
              ),
              h('div', null,
                h('h4', null, item.title),
                h('p', null, item.desc)
              )
            );
          })
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE MENU EXPLORER WITH KCAL/KJ LABELLING
  // --------------------------------------------------------------------------
  function MenuExplorerSection(props) {
    var onOpenNutrition = props.onOpenNutrition;
    var onAddToCart = props.onAddToCart;

    var activeCatState = useState('all');
    var activeCat = activeCatState[0];
    var setActiveCat = activeCatState[1];

    var categories = DATA.categories || [];
    var items = DATA.items || [];

    var filteredItems = useMemo(function () {
      if (activeCat === 'all') return items;
      return items.filter(function (it) { return it.categoryId === activeCat; });
    }, [activeCat, items]);

    return h('section', { id: 'menu', className: 'menu-section-container' },
      h('div', { className: 'container' },
        h('div', { className: 'section-head-wrap' },
          h('span', { className: 'section-eyebrow' }, 'Daily Fresh Offerings'),
          h('h2', { className: 'section-main-title' }, 'Our Handcrafted Menu'),
          h('p', { className: 'section-lead-paragraph' },
            'Precision extracted espresso, single-origin filter carafes, draft nitro cold brews, and morning sourdough bakes. Energy declarations comply with UK Calorie Labelling Regulations.'
          )
        ),

        // Category Pills
        h('div', { className: 'menu-category-pills' },
          categories.map(function (cat) {
            var isSel = activeCat === cat.id;
            return h('button', {
              key: cat.id,
              type: 'button',
              className: 'category-tab-btn' + (isSel ? ' active' : ''),
              onClick: function () { setActiveCat(cat.id); }
            }, cat.name);
          })
        ),

        // Menu Grid
        h('div', { className: 'menu-products-grid' },
          filteredItems.map(function (item) {
            return h('article', { key: item.id, className: 'product-card' },
              h('div', { className: 'product-img-wrap' },
                h('img', {
                  src: item.image,
                  alt: item.name,
                  className: 'product-photo'
                }),
                item.isPopular && h('span', { className: 'popular-tag' }, 'Popular'),
                h('span', { className: 'kcal-top-badge' }, item.kcal + ' kcal')
              ),
              h('div', { className: 'product-body' },
                h('div', { className: 'product-header-row' },
                  h('h3', { className: 'product-title' }, item.name),
                  h('span', { className: 'product-price' }, item.priceDisplay)
                ),
                h('p', { className: 'product-subtitle' }, item.subtitle),
                h('p', { className: 'product-desc' }, item.description),

                // Flavor Notes
                item.flavorNotes && h('div', { className: 'flavor-notes-row' },
                  item.flavorNotes.map(function (fn, idx) {
                    return h('span', { key: idx, className: 'flavor-pill' }, fn);
                  })
                ),

                // Card Footer
                h('div', { className: 'product-card-actions' },
                  h('button', {
                    type: 'button',
                    className: 'btn-nutrition-info',
                    onClick: function () { onOpenNutrition(item); },
                    title: 'View UK nutritional table & allergens'
                  },
                    h(Icon, { name: 'clipboard', size: 14 }),
                    'Nutrition & Kcals'
                  ),
                  h('button', {
                    type: 'button',
                    className: 'btn-add-order',
                    onClick: function () { onAddToCart(item); }
                  },
                    '+ Add to Bag'
                  )
                )
              )
            );
          })
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // CAFFÈ NERO-STYLE NUTRITIONAL & ALLERGEN SPECIFICATION MODAL
  // --------------------------------------------------------------------------
  function NutritionModal(props) {
    var item = props.item;
    var onClose = props.onClose;

    var selectedMilkState = useState('semiSkimmed');
    var selectedMilk = selectedMilkState[0];
    var setSelectedMilk = selectedMilkState[1];

    if (!item) return null;

    var milkMatrix = DATA.milkMatrix || {};
    var currentMilk = milkMatrix[selectedMilk] || milkMatrix.semiSkimmed || {};

    // Dynamic macros if item takes milk
    var displayKcal = item.hasMilkOptions ? currentMilk.kcal : item.kcal;
    var displayKj = item.hasMilkOptions ? currentMilk.kj : (item.kj || Math.round(item.kcal * 4.184));
    var displayFat = item.hasMilkOptions ? (currentMilk.fat + 'g') : '0.1g';
    var displaySatFat = item.hasMilkOptions ? (currentMilk.satFat + 'g') : '0.0g';
    var displayCarbs = item.hasMilkOptions ? (currentMilk.carbs + 'g') : '0.8g';
    var displaySugars = item.hasMilkOptions ? (currentMilk.sugars + 'g') : '0.1g';
    var displayProtein = item.hasMilkOptions ? (currentMilk.protein + 'g') : '0.4g';
    var displaySalt = item.hasMilkOptions ? (currentMilk.salt + 'g') : '0.01g';

    return h('div', { className: 'nutrition-modal-backdrop', role: 'dialog', 'aria-modal': 'true' },
      h('div', { className: 'nutrition-modal-box' },
        // Header
        h('div', { className: 'nutrition-modal-header' },
          h('div', null,
            h('h3', { className: 'nutrition-modal-title' }, item.name),
            h('div', { className: 'nutrition-modal-serving' },
              'Serving Size: ' + (item.servingSize || 'Standard 12oz (355ml)')
            )
          ),
          h('button', {
            type: 'button',
            className: 'modal-close-button',
            onClick: onClose,
            'aria-label': 'Close nutrition modal'
          }, h(Icon, { name: 'close', size: 18 }))
        ),

        // Milk Comparative Matrix Tabs (Caffè Nero Signature)
        item.hasMilkOptions && h('div', { className: 'milk-matrix-box' },
          h('div', { className: 'milk-matrix-title' },
            h('span', null, 'Compare Nutritional Breakdown by Milk:'),
            h('span', { style: { fontSize: '11px', color: 'var(--cafe-text-muted)' } }, 'UK Calorie Labelling Standard')
          ),
          h('div', { className: 'milk-tabs-scroll' },
            Object.keys(milkMatrix).map(function (k) {
              var m = milkMatrix[k];
              var isSel = selectedMilk === k;
              return h('button', {
                key: k,
                type: 'button',
                className: 'milk-choice-pill' + (isSel ? ' active' : ''),
                onClick: function () { setSelectedMilk(k); }
              }, m.label + ' (' + m.kcal + ' kcal)');
            })
          )
        ),

        // Macro Tiles Grid
        h('div', { className: 'macro-tiles-grid' },
          h('div', { className: 'macro-tile' },
            h('div', { className: 'macro-tile-label' }, 'ENERGY'),
            h('div', { className: 'macro-tile-val gold' }, displayKcal + ' kcal'),
            h('div', { className: 'macro-tile-sub' }, displayKj + ' kJ')
          ),
          h('div', { className: 'macro-tile' },
            h('div', { className: 'macro-tile-label' }, 'FAT'),
            h('div', { className: 'macro-tile-val' }, displayFat),
            h('div', { className: 'macro-tile-sub' }, 'Sat: ' + displaySatFat)
          ),
          h('div', { className: 'macro-tile' },
            h('div', { className: 'macro-tile-label' }, 'CARBOHYDRATE'),
            h('div', { className: 'macro-tile-val' }, displayCarbs),
            h('div', { className: 'macro-tile-sub' }, 'Sugars: ' + displaySugars)
          ),
          h('div', { className: 'macro-tile' },
            h('div', { className: 'macro-tile-label' }, 'PROTEIN'),
            h('div', { className: 'macro-tile-val' }, displayProtein),
            h('div', { className: 'macro-tile-sub' }, 'Natural')
          ),
          h('div', { className: 'macro-tile' },
            h('div', { className: 'macro-tile-label' }, 'SALT'),
            h('div', { className: 'macro-tile-val' }, displaySalt),
            h('div', { className: 'macro-tile-sub' }, 'Sodium equivalent')
          ),
          h('div', { className: 'macro-tile' },
            h('div', { className: 'macro-tile-label' }, 'CAFFEINE'),
            h('div', { className: 'macro-tile-val', style: { color: 'var(--cafe-terracotta)' } }, item.caffeine || '140mg'),
            h('div', { className: 'macro-tile-sub' }, 'Standard extraction')
          )
        ),

        // Allergen Declarations
        h('div', { className: 'allergen-box' },
          h('strong', { style: { fontSize: '13px', color: 'var(--cafe-text-primary)' } },
            'Allergen Declarations (EU / UK 14 Standard):'
          ),
          h('div', { className: 'allergen-pills-list' },
            (item.allergens && item.allergens.length > 0 && item.allergens[0] !== 'None')
              ? item.allergens.map(function (al, i) {
                return h('span', { key: i, className: 'allergen-badge' }, '⚠️ Contains: ' + al);
              })
              : h('span', { className: 'allergen-badge safe' }, '✓ No Major Declared Allergens')
          )
        ),

        // Regulation Notice
        h('p', { className: 'nutrition-disclaimer' },
          DATA.nutritionGuidelineNotice || 'Calorie information complies with the UK Calorie Labelling Regulations 2021. Adults need around 2,000 kcal a day.'
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // OUR ROASTERY CRAFT & SOURCING PILLARS
  // --------------------------------------------------------------------------
  function CraftStorySection() {
    return h('section', { id: 'craft', style: { padding: '80px 0', backgroundColor: 'var(--cafe-bg)' } },
      h('div', { className: 'container' },
        h('div', { className: 'section-head-wrap' },
          h('span', { className: 'section-eyebrow' }, 'Behind The Cup'),
          h('h2', { className: 'section-main-title' }, 'Our Roasting & Baking Craft'),
          h('p', { className: 'section-lead-paragraph' },
            'We believe true hospitality begins at the farm gate and ends in an unhurried, beautiful space where every sip is crafted with intention.'
          )
        ),

        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' } },
          // Pillar 1
          h('div', { style: { background: 'var(--cafe-bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--cafe-border-subtle)', boxShadow: 'var(--cafe-shadow-sm)' } },
            h('div', { style: { width: '48px', height: '48px', borderRadius: '12px', background: 'var(--cafe-bronze-dim)', color: 'var(--cafe-bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' } },
              h(Icon, { name: 'coffee', size: 24 })
            ),
            h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '20px', margin: '0 0 10px' } }, '1. Direct-Trade Specialty Lots'),
            h('p', { style: { color: 'var(--cafe-text-secondary)', lineHeight: 1.6, fontSize: '14px' } },
              'We buy directly from smallholder producer cooperatives in Huila, Yirgacheffe, and Chiriquí. We pay an average of 3.2x Fairtrade minimums to guarantee regenerative farming and world-class 88+ cupping lots.'
            )
          ),

          // Pillar 2
          h('div', { style: { background: 'var(--cafe-bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--cafe-border-subtle)', boxShadow: 'var(--cafe-shadow-sm)' } },
            h('div', { style: { width: '48px', height: '48px', borderRadius: '12px', background: 'var(--cafe-bronze-dim)', color: 'var(--cafe-bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' } },
              h(Icon, { name: 'flame', size: 24 })
            ),
            h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '20px', margin: '0 0 10px' } }, '2. Small-Batch Convection Roasting'),
            h('p', { style: { color: 'var(--cafe-text-secondary)', lineHeight: 1.6, fontSize: '14px' } },
              'Roasted fresh weekly in Manchester and London. Using modern closed-loop convection roasters, we roast with 80% lower emissions while developing natural sweetness and delicate floral clarity with zero scorched defect.'
            )
          ),

          // Pillar 3
          h('div', { style: { background: 'var(--cafe-bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--cafe-border-subtle)', boxShadow: 'var(--cafe-shadow-sm)' } },
            h('div', { style: { width: '48px', height: '48px', borderRadius: '12px', background: 'var(--cafe-bronze-dim)', color: 'var(--cafe-bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' } },
              h(Icon, { name: 'clipboard', size: 24 })
            ),
            h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '20px', margin: '0 0 10px' } }, '3. The 48-Hour Bakehouse'),
            h('p', { style: { color: 'var(--cafe-text-secondary)', lineHeight: 1.6, fontSize: '14px' } },
              'Every croissant, cardamom knot, and sourdough loaf is hand-laminated with Normandy cultured butter and Wildfarmed regenerative flour, undergoing 48 hours of slow cold fermentation for exquisite flakiness and digestion.'
            )
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // ATELIER COFFEE CLUB (Inspired by Caffè Nero 9 Stamps)
  // --------------------------------------------------------------------------
  function LoyaltyClubSection(props) {
    var loyalty = DATA.loyalty || {};
    var onJoin = props.onJoin;

    return h('section', { id: 'loyalty', className: 'loyalty-section' },
      h('div', { className: 'container' },
        h('div', { className: 'loyalty-card-grid' },
          // Left: Interactive Digital 9-Stamp Card
          h('div', { className: 'stamp-card-frame' },
            h('div', { className: 'stamp-card-top' },
              h('span', { className: 'stamp-card-brand' }, 'AURA Atelier Pass'),
              h('span', { className: 'stamp-card-status' }, '7 / 9 STAMPS COLLECTED')
            ),

            // 9 Stamp Grid
            h('div', { className: 'stamp-grid-9' },
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
                var isStamped = num <= 7;
                return h('div', {
                  key: num,
                  className: 'stamp-slot' + (isStamped ? ' stamped' : '')
                },
                  isStamped ? h(Icon, { name: 'check', size: 16 }) : num
                );
              }),
              h('div', { className: 'stamp-slot free-cup' },
                h(Icon, { name: 'coffee', size: 16 }),
                h('span', { style: { fontSize: '9px', marginTop: '2px' } }, '10th FREE')
              )
            ),

            h('div', { className: 'stamp-card-bottom' },
              h('span', null, 'Patron: Alex Chen'),
              h('span', null, '2 more stamps to your complimentary coffee')
            )
          ),

          // Right: Club Details & Sign Up
          h('div', null,
            h('span', { className: 'section-eyebrow' }, 'Digital Membership'),
            h('h2', { className: 'section-main-title', style: { textAlign: 'left' } },
              loyalty.tagline || 'Buy 9 Handcrafted Coffees, Enjoy Your 10th on Us'
            ),
            h('p', { className: 'section-lead-paragraph', style: { textAlign: 'left', marginBottom: '24px' } },
              loyalty.subtitle || 'Scan your digital stamp pass at any bar. Plus enjoy complimentary birthday pastries, queue-skip mobile ordering, and seasonal nano-lot tastings.'
            ),

            h('ul', { style: { listStyle: 'none', padding: 0, margin: '0 0 28px' } },
              (loyalty.benefits || []).map(function (b, idx) {
                return h('li', { key: idx, style: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', marginBottom: '10px', color: 'var(--cafe-text-secondary)' } },
                  h('span', { style: { color: 'var(--cafe-bronze)', fontWeight: 700 } }, '✓'),
                  b
                );
              })
            ),

            h('button', {
              type: 'button',
              className: 'btn btn-primary',
              onClick: onJoin
            },
              h(Icon, { name: 'star', size: 16, color: '#FAF6F0' }),
              'Add Digital Pass to Apple / Google Wallet'
            )
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // CAFE LOCATIONS FINDER
  // --------------------------------------------------------------------------
  function LocationsSection() {
    var locations = DATA.locations || [];

    return h('section', { id: 'locations', className: 'locations-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-head-wrap' },
          h('span', { className: 'section-eyebrow' }, 'Find Your Local Atelier'),
          h('h2', { className: 'section-main-title' }, 'Our Neighborhood Sanctuaries'),
          h('p', { className: 'section-lead-paragraph' },
            'Open seven days a week across Manchester and London. Featuring acoustic calm, outdoor terraces, and filter bars.'
          )
        ),

        h('div', { className: 'locations-cards-grid' },
          locations.map(function (loc) {
            return h('div', { key: loc.id, className: 'location-card' },
              h('div', { className: 'location-img-wrap' },
                h('img', { src: loc.image, alt: loc.name, className: 'location-img' })
              ),
              h('div', { className: 'location-body' },
                h('span', { className: 'location-city-tag' }, loc.city),
                h('h3', { className: 'location-title' }, loc.name),
                h('div', { className: 'location-address' },
                  h(Icon, { name: 'map-pin', size: 14, color: 'var(--cafe-bronze)' }),
                  ' ' + loc.address
                ),
                h('div', { className: 'location-hours' },
                  '🕒 ' + loc.hours
                ),
                h('div', { className: 'location-features-list' },
                  loc.features.map(function (f, idx) {
                    return h('span', { key: idx, className: 'feature-pill' }, f);
                  })
                ),
                h('div', { style: { display: 'flex', gap: '10px', marginTop: 'auto' } },
                  h('a', {
                    href: 'https://maps.google.com/?q=' + encodeURIComponent(loc.address),
                    target: '_blank',
                    rel: 'noreferrer',
                    className: 'btn btn-secondary btn-sm',
                    style: { flex: 1 }
                  }, 'Get Directions ↗'),
                  h('a', {
                    href: 'tel:' + loc.phone.replace(/\\s/g, ''),
                    className: 'btn btn-secondary btn-sm'
                  }, 'Call Cafe')
                )
              )
            );
          })
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // COFFEE AT HOME SUBSCRIPTIONS
  // --------------------------------------------------------------------------
  function SubscriptionSection(props) {
    var onAddToCart = props.onAddToCart;
    var subscriptions = DATA.subscriptions || [];

    var grindSelectionsState = useState({});
    var grindSelections = grindSelectionsState[0];
    var setGrindSelections = grindSelectionsState[1];

    function handleGrindChange(id, grind) {
      setGrindSelections(function (prev) {
        var copy = Object.assign({}, prev);
        copy[id] = grind;
        return copy;
      });
    }

    function handleSubscribe(sub) {
      var selectedGrind = grindSelections[sub.id] || sub.grindOptions[0];
      onAddToCart({
        id: sub.id + '_' + Date.now(),
        name: sub.name,
        subtitle: 'Grind: ' + selectedGrind + ' · ' + sub.cadence,
        priceDisplay: sub.priceDisplay,
        price: sub.id === 'sub_curator' ? 11.50 : 10.00,
        image: sub.image
      });
    }

    return h('section', { id: 'subscription', className: 'subscription-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-head-wrap' },
          h('span', { className: 'section-eyebrow' }, 'Fresh Roast Dispatch'),
          h('h2', { className: 'section-main-title' }, 'Coffee at Home Subscriptions'),
          h('p', { className: 'section-lead-paragraph' },
            'Never run out of extraordinary coffee. Roasted fresh to order, ground for your brewing setup, and posted carbon-neutral through your letterbox.'
          )
        ),

        h('div', { className: 'subscriptions-grid' },
          subscriptions.map(function (sub) {
            var currentGrind = grindSelections[sub.id] || sub.grindOptions[0];
            return h('div', { key: sub.id, className: 'sub-card' },
              h('h3', { className: 'sub-card-title' }, sub.name),
              h('div', { className: 'sub-price-tag' }, sub.priceDisplay),
              h('div', { className: 'sub-cadence' }, sub.cadence),
              h('p', { className: 'sub-desc' }, sub.description),

              h('div', { className: 'grind-selector-row' },
                h('label', { className: 'grind-label' }, 'Choose Your Grind:'),
                h('select', {
                  className: 'grind-select',
                  value: currentGrind,
                  onChange: function (e) { handleGrindChange(sub.id, e.target.value); }
                },
                  sub.grindOptions.map(function (opt, i) {
                    return h('option', { key: i, value: opt }, opt);
                  })
                )
              ),

              h('button', {
                type: 'button',
                className: 'btn btn-primary',
                style: { width: '100%', minHeight: '46px' },
                onClick: function () { handleSubscribe(sub); }
              }, 'Subscribe & Dispatch Fresh →')
            );
          })
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE-OVER ORDER BAG & CHECKOUT DRAWER
  // --------------------------------------------------------------------------
  function CartDrawer(props) {
    var isOpen = props.isOpen;
    var onClose = props.onClose;
    var cart = props.cart || [];
    var onRemove = props.onRemove;
    var onCheckout = props.onCheckout;

    var subtotal = cart.reduce(function (sum, it) { return sum + (it.price || 0); }, 0);

    return h(React.Fragment, null,
      h('div', {
        className: 'cart-drawer-backdrop' + (isOpen ? ' open' : ''),
        onClick: onClose,
        'aria-hidden': !isOpen
      }),
      h('aside', {
        className: 'cart-drawer-panel' + (isOpen ? ' open' : ''),
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Your Order Bag'
      },
        h('div', { className: 'cart-panel-head' },
          h('h4', { className: 'cart-panel-title' }, 'Your Order Bag (' + cart.length + ')'),
          h('button', {
            type: 'button',
            className: 'modal-close-button',
            onClick: onClose,
            'aria-label': 'Close bag'
          }, h(Icon, { name: 'close', size: 16 }))
        ),

        h('div', { className: 'cart-items-scroll' },
          cart.length === 0
            ? h('div', { style: { textAlign: 'center', padding: '60px 20px', color: 'var(--cafe-text-muted)' } },
              h(Icon, { name: 'coffee', size: 40, color: 'var(--cafe-bronze)' }),
              h('h4', { style: { margin: '16px 0 6px', color: 'var(--cafe-text-primary)' } }, 'Your bag is empty'),
              h('p', { style: { fontSize: '13px' } }, 'Add an artisan flat white, single-origin pour-over, or cardamom bun to order.')
            )
            : cart.map(function (item, idx) {
              return h('div', { key: idx, className: 'cart-item-card' },
                h('div', { className: 'cart-item-info' },
                  h('h5', null, item.name),
                  h('p', null, item.subtitle || 'Handcrafted order')
                ),
                h('div', { style: { display: 'flex', alignItems: 'center' } },
                  h('span', { className: 'cart-item-price' }, item.priceDisplay || '£' + item.price.toFixed(2)),
                  h('button', {
                    type: 'button',
                    onClick: function () { onRemove(idx); },
                    style: { background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' },
                    'aria-label': 'Remove item'
                  }, h(Icon, { name: 'close', size: 14 }))
                )
              );
            })
        ),

        cart.length > 0 && h('div', { className: 'cart-panel-foot' },
          h('div', { className: 'cart-subtotal-line' },
            h('span', null, 'Order Total:'),
            h('span', { style: { color: 'var(--cafe-bronze)', fontSize: '18px' } }, '£' + subtotal.toFixed(2))
          ),
          h('p', { style: { fontSize: '12px', color: 'var(--cafe-text-muted)', margin: '0 0 16px' } },
            '🕒 Ready in ~6 minutes at our Ancoats counter. Collect with your digital pass.'
          ),
          h('button', {
            type: 'button',
            className: 'btn btn-primary',
            style: { width: '100%', minHeight: '48px' },
            onClick: onCheckout
          }, 'Confirm Pickup Order →')
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // ORDER SUCCESS PICKUP MODAL
  // --------------------------------------------------------------------------
  function OrderSuccessModal(props) {
    var order = props.order;
    var onClose = props.onClose;

    if (!order) return null;

    return h('div', { className: 'nutrition-modal-backdrop', role: 'dialog', 'aria-modal': 'true' },
      h('div', { className: 'nutrition-modal-box', style: { maxWidth: '480px', textAlign: 'center', padding: '40px 28px' } },
        h('div', { style: { width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(63, 104, 77, 0.12)', border: '2px solid var(--cafe-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: 'var(--cafe-sage)' } },
          h(Icon, { name: 'check', size: 30 })
        ),
        h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '0 0 8px' } },
          'Pickup Order Queued'
        ),
        h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--cafe-bronze)', fontWeight: 700, marginBottom: '16px' } },
          'COLLECTION PASS: ' + order.code
        ),
        h('p', { style: { fontSize: '14px', color: 'var(--cafe-text-secondary)', lineHeight: 1.5, marginBottom: '24px' } },
          'Our baristas have received your order. We are handcrafting it now with freshly ground lots at our Ancoats Flagship bar.'
        ),
        h('div', { style: { background: 'var(--cafe-bg-surface)', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' } },
          h('span', null, 'Total Charged:'),
          h('strong', null, '£' + order.total.toFixed(2))
        ),
        h('button', {
          type: 'button',
          className: 'btn btn-primary',
          style: { width: '100%', minHeight: '44px' },
          onClick: onClose
        }, 'Done & Return to Cafe')
      )
    );
  }

  // --------------------------------------------------------------------------
  // PROFESSIONAL FOOTER
  // --------------------------------------------------------------------------
  function SiteFooter() {
    var brand = DATA.brand || {};

    return h('footer', { className: 'site-footer' },
      h('div', { className: 'container' },
        h('div', { className: 'footer-top-grid' },
          // Col 1: Brand Bio
          h('div', { className: 'footer-brand-col' },
            h('h3', null, brand.name || 'AURA Coffee Atelier'),
            h('p', null,
              brand.subheading || 'Ethically sourced single-origin coffees, slow-fermented bakery goods, and welcoming neighborhood spaces crafted for calm and connection.'
            ),
            h('div', { style: { fontSize: '13px', color: '#CBD5E1', marginTop: '16px' } },
              'Flagship: 42 Cutting Room Square, Ancoats, M4 5BF'
            )
          ),

          // Col 2: Navigation
          h('div', { className: 'footer-nav-col' },
            h('h4', null, 'Discover'),
            h('ul', null,
              h('li', null, h('a', { href: '#menu' }, 'Handcrafted Drinks')),
              h('li', null, h('a', { href: '#menu' }, 'Artisan Bakery')),
              h('li', null, h('a', { href: '#craft' }, 'Roasting Craft')),
              h('li', null, h('a', { href: '#loyalty' }, 'Atelier Coffee Club')),
              h('li', null, h('a', { href: '#subscription' }, 'Coffee at Home'))
            )
          ),

          // Col 3: Locations
          h('div', { className: 'footer-nav-col' },
            h('h4', null, 'Our Cafes'),
            h('ul', null,
              h('li', null, h('a', { href: '#locations' }, 'Ancoats Flagship, Manchester')),
              h('li', null, h('a', { href: '#locations' }, 'Marylebone Atelier, London')),
              h('li', null, h('a', { href: '#locations' }, 'Soho Espresso Bar, London'))
            )
          ),

          // Col 4: Hours & Compliance
          h('div', { className: 'footer-nav-col' },
            h('h4', null, 'Information'),
            h('p', { style: { fontSize: '13px', color: '#A89F91', lineHeight: 1.6, margin: '0 0 12px' } },
              'Monday – Friday: 07:00 – 18:00',
              h('br', null),
              'Saturday – Sunday: 08:00 – 18:00'
            ),
            h('p', { style: { fontSize: '11.5px', color: '#7E7066', lineHeight: 1.5, margin: 0 } },
              'Full nutritional & allergen matrix provided in accordance with UK Calorie Labelling Regulations 2021.'
            )
          )
        ),

        // Bottom Bar
        h('div', { className: 'footer-bottom-bar' },
          h('span', null, '© 2026 AURA Coffee Atelier Ltd. All rights reserved.'),
          h('div', { style: { display: 'flex', gap: '16px' } },
            h('span', null, 'Direct Trade Certified'),
            h('span', null, '·'),
            h('span', null, '100% Recyclable Packaging'),
            h('span', null, '·'),
            h('span', null, 'Carbon Neutral Deliveries')
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // MAIN APP ROOT
  // --------------------------------------------------------------------------
  function App() {
    var themeState = useState(function () {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('aura_theme') || 'light';
      }
      return 'light';
    });
    var theme = themeState[0];
    var setTheme = themeState[1];

    useEffect(function () {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') document.body.classList.add('theme-dark');
        else document.body.classList.remove('theme-dark');
        if (window.localStorage) {
          window.localStorage.setItem('aura_theme', theme);
        }
      }
    }, [theme]);

    function toggleTheme() {
      setTheme(function (prev) { return prev === 'dark' ? 'light' : 'dark'; });
    }

    var cartState = useState([]);
    var cart = cartState[0];
    var setCart = cartState[1];

    var isCartOpenState = useState(false);
    var isCartOpen = isCartOpenState[0];
    var setIsCartOpen = isCartOpenState[1];

    var nutritionItemState = useState(null);
    var activeNutritionItem = nutritionItemState[0];
    var setActiveNutritionItem = nutritionItemState[1];

    var orderSuccessState = useState(null);
    var activeOrderSuccess = orderSuccessState[0];
    var setActiveOrderSuccess = orderSuccessState[1];

    function handleAddToCart(item) {
      setCart(function (prev) { return [item].concat(prev); });
      setIsCartOpen(true);
    }

    function handleRemoveCart(idx) {
      setCart(function (prev) {
        var copy = prev.slice();
        copy.splice(idx, 1);
        return copy;
      });
    }

    function handleCheckout() {
      if (cart.length === 0) return;
      var subtotal = cart.reduce(function (sum, it) { return sum + (it.price || 0); }, 0);
      var newOrder = {
        code: 'AURA-' + Math.floor(1000 + Math.random() * 9000),
        items: cart,
        total: subtotal
      };
      setCart([]);
      setIsCartOpen(false);
      setActiveOrderSuccess(newOrder);
    }

    return h('div', { className: 'aura-cafe-app' },
      h(AnnouncementBar, null),
      h(SiteNavbar, {
        cartCount: cart.length,
        onOpenCart: function () { setIsCartOpen(true); },
        theme: theme,
        onToggleTheme: toggleTheme
      }),
      h('main', null,
        h(HeroSection, { onOpenCart: function () { setIsCartOpen(true); } }),
        h(MenuExplorerSection, {
          onAddToCart: handleAddToCart,
          onOpenNutrition: function (item) { setActiveNutritionItem(item); }
        }),
        h(CraftStorySection, null),
        h(LoyaltyClubSection, {
          onJoin: function () {
            alert('Atelier Pass added to your digital wallet! You have 7 stamps collected.');
          }
        }),
        h(LocationsSection, null),
        h(SubscriptionSection, { onAddToCart: handleAddToCart })
      ),
      h(SiteFooter, null),

      // Nutrition Specification Sheet Modal
      h(NutritionModal, {
        item: activeNutritionItem,
        onClose: function () { setActiveNutritionItem(null); }
      }),

      // Cart Slide-Over Drawer
      h(CartDrawer, {
        isOpen: isCartOpen,
        onClose: function () { setIsCartOpen(false); },
        cart: cart,
        onRemove: handleRemoveCart,
        onCheckout: handleCheckout
      }),

      // Order Success Modal
      h(OrderSuccessModal, {
        order: activeOrderSuccess,
        onClose: function () { setActiveOrderSuccess(null); }
      })
    );
  }

  // Mount cleanly
  function mount() {
    var rootEl = document.getElementById('root');
    if (rootEl) {
      ReactDOM.createRoot(rootEl).render(h(App, null));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
