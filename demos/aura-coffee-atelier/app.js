/* ==========================================================================
   AURA COFFEE ATELIER — Professional Cafe Flagship Application (React 18)
   Inspired by Caffè Nero, Blue Bottle Coffee, WatchHouse & Ralph's Coffee
   Features: Drink Customizer, Live Search, Dietary Filters, Cart Persistence,
   Location Pickup Selector, Interactive 9-Stamp Simulator, and Mobile Drawer.
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
  var useRef = React.useRef;

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
      case 'search':
        return h('svg', svgProps,
          h('circle', { cx: 11, cy: 11, r: 8 }),
          h('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 })
        );
      case 'sliders':
        return h('svg', svgProps,
          h('line', { x1: 4, y1: 21, x2: 4, y2: 14 }),
          h('line', { x1: 4, y1: 10, x2: 4, y2: 3 }),
          h('line', { x1: 12, y1: 21, x2: 12, y2: 12 }),
          h('line', { x1: 12, y1: 8, x2: 12, y2: 3 }),
          h('line', { x1: 20, y1: 21, x2: 20, y2: 16 }),
          h('line', { x1: 20, y1: 12, x2: 20, y2: 3 }),
          h('line', { x1: 1, y1: 14, x2: 7, y2: 14 }),
          h('line', { x1: 9, y1: 8, x2: 15, y2: 8 }),
          h('line', { x1: 17, y1: 16, x2: 23, y2: 16 })
        );
      case 'plus':
        return h('svg', svgProps,
          h('line', { x1: 12, y1: 5, x2: 12, y2: 19 }),
          h('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
        );
      case 'minus':
        return h('svg', svgProps,
          h('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
        );
      case 'sparkles':
        return h('svg', svgProps,
          h('path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' })
        );
      case 'clock':
        return h('svg', svgProps,
          h('circle', { cx: 12, cy: 12, r: 10 }),
          h('polyline', { points: '12 6 12 12 16 14' })
        );
      default:
        return h('svg', svgProps, h('circle', { cx: 12, cy: 12, r: 8 }));
    }
  }

  // --------------------------------------------------------------------------
  // TOP ANNOUNCEMENT BAR
  // --------------------------------------------------------------------------
  function AnnouncementBar() {
    return h('div', { className: 'top-announcement-bar', role: 'region', 'aria-label': 'Announcement' },
      h('span', null, '✦ Fresh Micro-Lot Alert: Colombia Huila Pink Bourbon Honey lot now on bar · Complimentary UK delivery on fresh beans over £25'),
      h('a', { href: '#subscription' }, 'Order Fresh Beans →')
    );
  }

  // --------------------------------------------------------------------------
  // SITE NAVBAR WITH MOBILE DRAWER TRIGGER
  // --------------------------------------------------------------------------
  function SiteNavbar(props) {
    var brand = DATA.brand || {};
    var cartCount = props.cartCount || 0;
    var onOpenCart = props.onOpenCart;
    var theme = props.theme;
    var onToggleTheme = props.onToggleTheme;
    var onToggleMobileNav = props.onToggleMobileNav;

    var navLinks = [
      { id: 'menu', label: 'Menu & Drinks', href: '#menu' },
      { id: 'craft', label: 'Our Roastery Craft', href: '#craft' },
      { id: 'loyalty', label: 'Atelier Coffee Club', href: '#loyalty' },
      { id: 'locations', label: 'Locations & Hours', href: '#locations' },
      { id: 'subscription', label: 'Coffee at Home', href: '#subscription' }
    ];

    return h('header', { className: 'site-navbar', role: 'banner' },
      h('div', { className: 'container navbar-container' },
        // Mobile Hamburger Trigger
        h('button', {
          type: 'button',
          className: 'mobile-hamburger-btn',
          onClick: onToggleMobileNav,
          'aria-label': 'Open mobile navigation menu'
        },
          h(Icon, { name: 'menu', size: 22 })
        ),

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
            cartCount > 0 && h('span', {
              className: 'cart-pill-count',
              'aria-live': 'polite'
            }, cartCount)
          ),

          // Store Finder Anchor Button
          h('a', {
            href: '#locations',
            className: 'btn btn-secondary btn-sm nav-store-btn'
          },
            h(Icon, { name: 'map-pin', size: 14 }),
            h('span', null, 'Find a Cafe')
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  function MobileNavDrawer(props) {
    var isOpen = props.isOpen;
    var onClose = props.onClose;
    var theme = props.theme;
    var onToggleTheme = props.onToggleTheme;

    var navLinks = [
      { id: 'menu', label: 'Handcrafted Drinks & Menu', href: '#menu' },
      { id: 'craft', label: 'Our Roastery Craft', href: '#craft' },
      { id: 'loyalty', label: 'Atelier Coffee Club (9 Stamps)', href: '#loyalty' },
      { id: 'locations', label: 'Locations & Opening Times', href: '#locations' },
      { id: 'subscription', label: 'Coffee at Home Subscriptions', href: '#subscription' }
    ];

    return h(React.Fragment, null,
      h('div', {
        className: 'mobile-nav-backdrop' + (isOpen ? ' open' : ''),
        onClick: onClose,
        'aria-hidden': !isOpen
      }),
      h('nav', {
        className: 'mobile-nav-drawer' + (isOpen ? ' open' : ''),
        'aria-label': 'Mobile Navigation'
      },
        h('div', { className: 'mobile-nav-head' },
          h('div', { className: 'brand-lockup' },
            h('div', { className: 'brand-emblem' }, 'A'),
            h('span', { className: 'brand-name' }, 'AURA Atelier')
          ),
          h('button', {
            type: 'button',
            className: 'modal-close-button',
            onClick: onClose,
            'aria-label': 'Close menu'
          }, h(Icon, { name: 'close', size: 18 }))
        ),

        h('div', { className: 'mobile-nav-links' },
          navLinks.map(function (item) {
            return h('a', {
              key: item.id,
              href: item.href,
              className: 'mobile-nav-link-item',
              onClick: onClose
            }, item.label);
          })
        ),

        h('div', { className: 'mobile-nav-footer' },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
            h('span', { style: { fontSize: '13px', color: 'var(--cafe-text-muted)' } }, 'Appearance:'),
            h('button', {
              type: 'button',
              className: 'theme-toggle-btn',
              onClick: onToggleTheme,
              style: { width: 'auto', padding: '6px 14px', borderRadius: '20px', gap: '6px' }
            },
              h(Icon, { name: theme === 'dark' ? 'sun' : 'moon', size: 16 }),
              h('span', { style: { fontSize: '12px' } }, theme === 'dark' ? 'Obsidian' : 'Warm Linen')
            )
          ),
          h('p', { style: { fontSize: '12px', color: 'var(--cafe-text-muted)', margin: '0 0 10px' } },
            'Flagship: 42 Cutting Room Square, Ancoats'
          ),
          h('a', {
            href: 'tel:+441617928400',
            className: 'btn btn-secondary btn-sm',
            style: { width: '100%', justifyContent: 'center' }
          }, 'Call Ancoats Flagship')
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
  // BEVERAGE & ITEM CUSTOMIZATION MODAL (The Specialty Configurator)
  // --------------------------------------------------------------------------
  function CustomizationModal(props) {
    var item = props.item;
    var onClose = props.onClose;
    var onAddConfiguredItem = props.onAddConfiguredItem;

    if (!item) return null;

    var opts = DATA.customizationOptions || {};
    var isFood = item.categoryId === 'bakery-brunch';

    // Options state
    var selectedSizeState = useState('reg');
    var selectedSize = selectedSizeState[0];
    var setSelectedSize = selectedSizeState[1];

    var selectedMilkState = useState('semiSkimmed');
    var selectedMilk = selectedMilkState[0];
    var setSelectedMilk = selectedMilkState[1];

    var selectedBeanState = useState('classico');
    var selectedBean = selectedBeanState[0];
    var setSelectedBean = selectedBeanState[1];

    var selectedTempState = useState('steamed');
    var selectedTemp = selectedTempState[0];
    var setSelectedTemp = selectedTempState[1];

    var selectedSyrupState = useState('none');
    var selectedSyrup = selectedSyrupState[0];
    var setSelectedSyrup = selectedSyrupState[1];

    var isExtraShotState = useState(false);
    var isExtraShot = isExtraShotState[0];
    var setIsExtraShot = isExtraShotState[1];

    var isWarmedState = useState(true);
    var isWarmed = isWarmedState[0];
    var setIsWarmed = isWarmedState[1];

    var baristaNotesState = useState('');
    var baristaNotes = baristaNotesState[0];
    var setBaristaNotes = baristaNotesState[1];

    // Compute live price & kcal
    var calculated = useMemo(function () {
      var price = item.price || 0;
      var kcal = item.kcal || 0;

      if (!isFood && item.hasMilkOptions) {
        // Size
        var sizeObj = (opts.sizes || []).find(function (s) { return s.id === selectedSize; });
        if (sizeObj) {
          price += sizeObj.extraPrice;
          kcal += sizeObj.extraKcal;
        }

        // Milk
        var milkObj = (opts.milks || []).find(function (m) { return m.id === selectedMilk; });
        if (milkObj) {
          price += milkObj.extraPrice;
          kcal += milkObj.extraKcal;
        }

        // Beans
        var beanObj = (opts.beans || []).find(function (b) { return b.id === selectedBean; });
        if (beanObj) {
          price += beanObj.extraPrice;
        }

        // Temp
        var tempObj = (opts.temperatures || []).find(function (t) { return t.id === selectedTemp; });
        if (tempObj && tempObj.extraPrice) {
          price += tempObj.extraPrice;
        }

        // Syrup
        var syrupObj = (opts.syrups || []).find(function (sy) { return sy.id === selectedSyrup; });
        if (syrupObj) {
          price += syrupObj.extraPrice;
          kcal += syrupObj.extraKcal;
        }

        // Extra shot
        if (isExtraShot) {
          price += 0.80;
          kcal += 4;
        }
      }

      return {
        price: Math.max(0, price),
        priceDisplay: '£' + price.toFixed(2),
        kcal: Math.max(2, kcal)
      };
    }, [item, isFood, selectedSize, selectedMilk, selectedBean, selectedTemp, selectedSyrup, isExtraShot]);

    function handleConfirm() {
      var milkObj = (opts.milks || []).find(function (m) { return m.id === selectedMilk; });
      var sizeObj = (opts.sizes || []).find(function (s) { return s.id === selectedSize; });
      var beanObj = (opts.beans || []).find(function (b) { return b.id === selectedBean; });
      var tempObj = (opts.temperatures || []).find(function (t) { return t.id === selectedTemp; });
      var syrupObj = (opts.syrups || []).find(function (sy) { return sy.id === selectedSyrup; });

      var customizationSummary = [];
      if (!isFood && item.hasMilkOptions) {
        if (sizeObj) customizationSummary.push(sizeObj.id === 'large' ? 'Large 12oz' : 'Regular 8oz');
        if (milkObj) customizationSummary.push(milkObj.label.split(' ')[0] + ' ' + (milkObj.label.split(' ')[1] || ''));
        if (beanObj && beanObj.id !== 'classico') customizationSummary.push(beanObj.id === 'guest' ? 'Single-Origin Guest' : 'Decaf');
        if (tempObj && tempObj.id === 'iced') customizationSummary.push('Iced');
        if (syrupObj && syrupObj.id !== 'none') customizationSummary.push(syrupObj.label.split(' ')[0] + ' Syrup');
        if (isExtraShot) customizationSummary.push('+Extra Shot');
      } else if (isFood) {
        customizationSummary.push(isWarmed ? 'Served Warm' : 'Room Temp');
      }

      var configuredRecord = {
        id: item.id + '_' + Date.now(),
        baseId: item.id,
        name: item.name,
        subtitle: customizationSummary.length > 0 ? customizationSummary.join(' · ') : (item.subtitle || 'Handcrafted order'),
        price: calculated.price,
        priceDisplay: calculated.priceDisplay,
        kcal: calculated.kcal,
        image: item.image,
        notes: baristaNotes.trim(),
        customization: {
          size: selectedSize,
          milk: selectedMilk,
          bean: selectedBean,
          temperature: selectedTemp,
          syrup: selectedSyrup,
          extraShot: isExtraShot,
          isWarmed: isWarmed,
          notes: baristaNotes.trim()
        }
      };

      onAddConfiguredItem(configuredRecord);
      onClose();
    }

    return h('div', {
      className: 'nutrition-modal-backdrop',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'customizer-modal-title'
    },
      h('div', { className: 'customizer-modal-box' },
        // Header
        h('div', { className: 'customizer-modal-head' },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
            h('img', { src: item.image, alt: item.name, className: 'customizer-head-thumb' }),
            h('div', null,
              h('h3', { id: 'customizer-modal-title', className: 'customizer-title' }, item.name),
              h('div', { className: 'customizer-subtitle' }, item.subtitle)
            )
          ),
          h('button', {
            type: 'button',
            className: 'modal-close-button',
            onClick: onClose,
            'aria-label': 'Close customizer'
          }, h(Icon, { name: 'close', size: 18 }))
        ),

        // Scrollable Options Body
        h('div', { className: 'customizer-scroll-body' },
          // If Food: Warm option
          isFood ? h('div', { className: 'config-group' },
            h('label', { className: 'config-label' }, 'Serving Style:'),
            h('div', { className: 'config-pills-row' },
              h('button', {
                type: 'button',
                className: 'config-pill' + (isWarmed ? ' active' : ''),
                onClick: function () { setIsWarmed(true); }
              }, '🔥 Warm from Bakehouse Oven'),
              h('button', {
                type: 'button',
                className: 'config-pill' + (!isWarmed ? ' active' : ''),
                onClick: function () { setIsWarmed(false); }
              }, 'Room Temperature')
            )
          ) : null,

          // Size Option (For Drinks)
          !isFood && item.hasMilkOptions ? h('div', { className: 'config-group' },
            h('label', { className: 'config-label' }, 'Select Cup Size:'),
            h('div', { className: 'config-pills-row' },
              (opts.sizes || []).map(function (s) {
                var isSel = selectedSize === s.id;
                return h('button', {
                  key: s.id,
                  type: 'button',
                  className: 'config-pill' + (isSel ? ' active' : ''),
                  onClick: function () { setSelectedSize(s.id); }
                },
                  h('span', null, s.label),
                  s.extraPrice > 0 && h('span', { className: 'pill-addon-price' }, '+£' + s.extraPrice.toFixed(2))
                );
              })
            )
          ) : null,

          // Milk Options (For Drinks)
          !isFood && item.hasMilkOptions ? h('div', { className: 'config-group' },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
              h('label', { className: 'config-label', style: { margin: 0 } }, 'Choose Milk:'),
              h('span', { style: { fontSize: '11.5px', color: 'var(--cafe-bronze)' } }, 'Minor Figures & Organic Dairy')
            ),
            h('div', { className: 'config-milks-grid' },
              (opts.milks || []).map(function (m) {
                var isSel = selectedMilk === m.id;
                return h('button', {
                  key: m.id,
                  type: 'button',
                  className: 'config-milk-card' + (isSel ? ' active' : ''),
                  onClick: function () { setSelectedMilk(m.id); }
                },
                  h('div', { className: 'milk-card-name' }, m.label),
                  h('div', { className: 'milk-card-meta' },
                    h('span', { className: 'milk-badge' }, m.badge),
                    m.extraPrice > 0 && h('span', { className: 'milk-price' }, '+£' + m.extraPrice.toFixed(2))
                  )
                );
              })
            )
          ) : null,

          // Bean Roast Profile
          !isFood ? h('div', { className: 'config-group' },
            h('label', { className: 'config-label' }, 'Roast / Bean Extraction:'),
            h('div', { className: 'config-pills-row vertical' },
              (opts.beans || []).map(function (b) {
                var isSel = selectedBean === b.id;
                return h('button', {
                  key: b.id,
                  type: 'button',
                  className: 'config-pill-wide' + (isSel ? ' active' : ''),
                  onClick: function () { setSelectedBean(b.id); }
                },
                  h('div', null,
                    h('strong', null, b.label),
                    h('span', { className: 'bean-badge' }, b.badge)
                  ),
                  b.extraPrice > 0 && h('span', { className: 'pill-addon-price' }, '+£' + b.extraPrice.toFixed(2))
                );
              })
            )
          ) : null,

          // Temperature & Ice
          !isFood && item.categoryId !== 'iced-coldbrew' ? h('div', { className: 'config-group' },
            h('label', { className: 'config-label' }, 'Drink Temperature:'),
            h('div', { className: 'config-pills-row' },
              (opts.temperatures || []).map(function (t) {
                var isSel = selectedTemp === t.id;
                return h('button', {
                  key: t.id,
                  type: 'button',
                  className: 'config-pill' + (isSel ? ' active' : ''),
                  onClick: function () { setSelectedTemp(t.id); }
                },
                  h('span', null, t.label),
                  t.extraPrice > 0 && h('span', { className: 'pill-addon-price' }, '+£' + t.extraPrice.toFixed(2))
                );
              })
            )
          ) : null,

          // Organic Syrups & Extra Shot
          !isFood && item.hasMilkOptions ? h('div', { className: 'config-group' },
            h('label', { className: 'config-label' }, 'House Made Syrups:'),
            h('div', { className: 'config-pills-row' },
              (opts.syrups || []).map(function (sy) {
                var isSel = selectedSyrup === sy.id;
                return h('button', {
                  key: sy.id,
                  type: 'button',
                  className: 'config-pill' + (isSel ? ' active' : ''),
                  onClick: function () { setSelectedSyrup(sy.id); }
                }, sy.label);
              })
            ),
            h('div', { style: { marginTop: '12px' } },
              h('label', { className: 'checkbox-pill-label' },
                h('input', {
                  type: 'checkbox',
                  checked: isExtraShot,
                  onChange: function (e) { setIsExtraShot(e.target.checked); }
                }),
                h('span', null, 'Add Extra Short Ristretto Shot (+£0.80 · 70mg caffeine)')
              )
            )
          ) : null,

          // Barista Instructions
          h('div', { className: 'config-group', style: { marginBottom: 0 } },
            h('label', { className: 'config-label' }, 'Special Request for Barista (Optional):'),
            h('input', {
              type: 'text',
              className: 'config-input',
              placeholder: 'e.g., Extra hot microfoam, light cocoa dust, no lid...',
              value: baristaNotes,
              onChange: function (e) { setBaristaNotes(e.target.value); },
              maxLength: 120
            })
          )
        ),

        // Live Total & Add CTA Footer
        h('div', { className: 'customizer-modal-foot' },
          h('div', { className: 'customizer-summary-col' },
            h('div', { className: 'customizer-live-price' }, calculated.priceDisplay),
            h('div', { className: 'customizer-live-kcal' },
              calculated.kcal + ' kcal · UK Calorie Compliant'
            )
          ),
          h('button', {
            type: 'button',
            className: 'btn btn-primary btn-add-customized',
            onClick: handleConfirm
          },
            h(Icon, { name: 'bag', size: 16 }),
            h('span', null, 'Add to Bag — ' + calculated.priceDisplay)
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE MENU EXPLORER WITH SEARCH & DIETARY FILTERS
  // --------------------------------------------------------------------------
  function MenuExplorerSection(props) {
    var onOpenNutrition = props.onOpenNutrition;
    var onOpenCustomizer = props.onOpenCustomizer;
    var onAddToCart = props.onAddToCart;

    var activeCatState = useState('all');
    var activeCat = activeCatState[0];
    var setActiveCat = activeCatState[1];

    var searchQueryState = useState('');
    var searchQuery = searchQueryState[0];
    var setSearchQuery = searchQueryState[1];

    var activeDietState = useState('all');
    var activeDiet = activeDietState[0];
    var setActiveDiet = activeDietState[1];

    var searchInputRef = useRef(null);

    var categories = DATA.categories || [];
    var items = DATA.items || [];

    // Keyboard shortcut '/' to focus search
    useEffect(function () {
      function handleKeyDown(e) {
        if (e.key === '/' && document.activeElement !== searchInputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }
      }
      window.addEventListener('keydown', handleKeyDown);
      return function () { window.removeEventListener('keydown', handleKeyDown); };
    }, []);

    // Filter logic
    var filteredItems = useMemo(function () {
      var q = searchQuery.trim().toLowerCase();
      return items.filter(function (it) {
        // Category check
        if (activeCat !== 'all' && it.categoryId !== activeCat) return false;

        // Dietary check
        if (activeDiet === 'vegan') {
          if (!it.dietary || !it.dietary.includes('Vegan')) return false;
        } else if (activeDiet === 'gluten-free') {
          if (!it.dietary || !it.dietary.includes('Gluten-Free')) return false;
        } else if (activeDiet === 'dairy-free') {
          if (!it.dietary || !it.dietary.includes('Dairy-Free')) return false;
        } else if (activeDiet === 'specialty') {
          if (!it.dietary || !it.dietary.includes('88+ Specialty')) return false;
        } else if (activeDiet === 'under-100') {
          if ((it.kcal || 0) >= 100) return false;
        } else if (activeDiet === 'popular') {
          if (!it.isPopular) return false;
        }

        // Search query check
        if (q.length > 0) {
          var nameMatch = (it.name || '').toLowerCase().includes(q);
          var subMatch = (it.subtitle || '').toLowerCase().includes(q);
          var descMatch = (it.description || '').toLowerCase().includes(q);
          var notesMatch = (it.flavorNotes || []).some(function (fn) { return fn.toLowerCase().includes(q); });
          if (!nameMatch && !subMatch && !descMatch && !notesMatch) return false;
        }

        return true;
      });
    }, [items, activeCat, activeDiet, searchQuery]);

    var dietaryOptions = [
      { id: 'all', label: 'All Items' },
      { id: 'popular', label: 'Popular 🔥' },
      { id: 'vegan', label: 'Vegan 🌱' },
      { id: 'gluten-free', label: 'Gluten-Free 🌾' },
      { id: 'dairy-free', label: 'Dairy-Free 🥛' },
      { id: 'specialty', label: '88+ Specialty ⭐' },
      { id: 'under-100', label: '< 100 kcal 🥗' }
    ];

    return h('section', { id: 'menu', className: 'menu-section-container' },
      h('div', { className: 'container' },
        h('div', { className: 'section-head-wrap' },
          h('span', { className: 'section-eyebrow' }, 'Daily Fresh Offerings'),
          h('h2', { className: 'section-main-title' }, 'Our Handcrafted Menu'),
          h('p', { className: 'section-lead-paragraph' },
            'Precision extracted espresso, single-origin filter carafes, draft nitro cold brews, and morning sourdough bakes. Energy declarations comply with UK Calorie Labelling Regulations.'
          )
        ),

        // Live Search Bar with Shortcut
        h('div', { className: 'menu-search-wrapper' },
          h('div', { className: 'search-input-box' },
            h(Icon, { name: 'search', size: 18, color: 'var(--cafe-bronze)' }),
            h('input', {
              ref: searchInputRef,
              type: 'search',
              className: 'menu-search-field',
              placeholder: "Search drinks, single origins, flavor notes, or pastries (Press '/' to focus)...",
              value: searchQuery,
              onChange: function (e) { setSearchQuery(e.target.value); },
              'aria-label': 'Search menu items'
            }),
            searchQuery.length > 0
              ? h('button', {
                type: 'button',
                className: 'search-clear-btn',
                onClick: function () { setSearchQuery(''); },
                'aria-label': 'Clear search'
              }, h(Icon, { name: 'close', size: 14 }))
              : h('kbd', { className: 'search-kbd-badge' }, '/')
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

        // Dietary Quick Filters
        h('div', { className: 'dietary-filters-row' },
          dietaryOptions.map(function (d) {
            var isSel = activeDiet === d.id;
            return h('button', {
              key: d.id,
              type: 'button',
              className: 'diet-filter-pill' + (isSel ? ' active' : ''),
              onClick: function () { setActiveDiet(d.id); }
            }, d.label);
          })
        ),

        // Search Results Notice
        (searchQuery.length > 0 || activeDiet !== 'all') && h('div', { className: 'search-results-indicator' },
          h('span', null, 'Showing ' + filteredItems.length + ' item' + (filteredItems.length === 1 ? '' : 's') + ' matching your preferences'),
          (searchQuery.length > 0 || activeDiet !== 'all') && h('button', {
            type: 'button',
            className: 'reset-filters-btn',
            onClick: function () {
              setSearchQuery('');
              setActiveDiet('all');
              setActiveCat('all');
            }
          }, 'Reset Filters ✕')
        ),

        // Menu Grid
        filteredItems.length === 0
          ? h('div', { className: 'no-results-box' },
            h(Icon, { name: 'coffee', size: 36, color: 'var(--cafe-bronze)' }),
            h('h4', null, 'No coffee or bakehouse offerings found'),
            h('p', null, "Try adjusting your search terms or clearing the dietary filters."),
            h('button', {
              type: 'button',
              className: 'btn btn-secondary btn-sm',
              onClick: function () {
                setSearchQuery('');
                setActiveDiet('all');
                setActiveCat('all');
              }
            }, 'View All Offerings')
          )
          : h('div', { className: 'menu-products-grid' },
            filteredItems.map(function (item) {
              return h('article', { key: item.id, className: 'product-card' },
                h('div', { className: 'product-img-wrap' },
                  h('img', {
                    src: item.image,
                    alt: item.name,
                    className: 'product-photo',
                    loading: 'lazy'
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
                      return h('span', {
                        key: idx,
                        className: 'flavor-pill',
                        title: "Filter by '" + fn + "'",
                        onClick: function () { setSearchQuery(fn); }
                      }, fn);
                    })
                  ),

                  // Card Footer Actions
                  h('div', { className: 'product-card-actions' },
                    h('button', {
                      type: 'button',
                      className: 'btn-nutrition-info',
                      onClick: function () { onOpenNutrition(item); },
                      title: 'View UK nutritional table & allergens'
                    },
                      h(Icon, { name: 'clipboard', size: 14 }),
                      'Nutrition'
                    ),
                    h('button', {
                      type: 'button',
                      className: 'btn-add-order',
                      onClick: function () { onOpenCustomizer(item); },
                      title: 'Customize milk, size & roast before adding'
                    },
                      h(Icon, { name: 'sliders', size: 14 }),
                      'Customize & Add'
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
    var onAddConfiguredItem = props.onAddConfiguredItem;

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

    function handleQuickAddWithMilk() {
      var extra = (selectedMilk === 'oatMilk' || selectedMilk === 'almondMilk' || selectedMilk === 'coconutMilk') ? 0.50 : (selectedMilk === 'soyaMilk' ? 0.40 : 0);
      var configured = {
        id: item.id + '_' + Date.now(),
        baseId: item.id,
        name: item.name,
        subtitle: currentMilk.label.split(' ')[0] + ' ' + (currentMilk.label.split(' ')[1] || ''),
        price: item.price + extra,
        priceDisplay: '£' + (item.price + extra).toFixed(2),
        kcal: displayKcal,
        image: item.image,
        customization: { milk: selectedMilk }
      };
      onAddConfiguredItem(configured);
      onClose();
    }

    return h('div', {
      className: 'nutrition-modal-backdrop',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'nutrition-title'
    },
      h('div', { className: 'nutrition-modal-box' },
        // Header
        h('div', { className: 'nutrition-modal-header' },
          h('div', null,
            h('h3', { id: 'nutrition-title', className: 'nutrition-modal-title' }, item.name),
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

        // Action: Add directly with selected milk
        item.hasMilkOptions && h('div', { style: { marginTop: '16px', display: 'flex', justifyContent: 'flex-end' } },
          h('button', {
            type: 'button',
            className: 'btn btn-primary',
            onClick: handleQuickAddWithMilk,
            style: { width: '100%', minHeight: '44px' }
          }, 'Add to Bag with ' + currentMilk.label.split(' ')[0] + ' (' + displayKcal + ' kcal)')
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

        h('div', { className: 'craft-pillars-grid' },
          // Pillar 1
          h('div', { className: 'craft-pillar-card' },
            h('div', { className: 'craft-icon-box' },
              h(Icon, { name: 'coffee', size: 24 })
            ),
            h('h3', { className: 'craft-pillar-title' }, '1. Direct-Trade Specialty Lots'),
            h('p', { className: 'craft-pillar-desc' },
              'We buy directly from smallholder producer cooperatives in Huila, Yirgacheffe, and Chiriquí. We pay an average of 3.2x Fairtrade minimums to guarantee regenerative farming and world-class 88+ cupping lots.'
            )
          ),

          // Pillar 2
          h('div', { className: 'craft-pillar-card' },
            h('div', { className: 'craft-icon-box' },
              h(Icon, { name: 'flame', size: 24 })
            ),
            h('h3', { className: 'craft-pillar-title' }, '2. Small-Batch Convection Roasting'),
            h('p', { className: 'craft-pillar-desc' },
              'Roasted fresh weekly in Manchester and London. Using modern closed-loop convection roasters, we roast with 80% lower emissions while developing natural sweetness and delicate floral clarity with zero scorched defect.'
            )
          ),

          // Pillar 3
          h('div', { className: 'craft-pillar-card' },
            h('div', { className: 'craft-icon-box' },
              h(Icon, { name: 'clipboard', size: 24 })
            ),
            h('h3', { className: 'craft-pillar-title' }, '3. The 48-Hour Bakehouse'),
            h('p', { className: 'craft-pillar-desc' },
              'Every croissant, cardamom knot, and sourdough loaf is hand-laminated with Normandy cultured butter and Wildfarmed regenerative flour, undergoing 48 hours of slow cold fermentation for exquisite flakiness and digestion.'
            )
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // ATELIER COFFEE CLUB WITH INTERACTIVE 9-STAMP SIMULATOR & VOUCHER UNLOCK
  // --------------------------------------------------------------------------
  function LoyaltyClubSection(props) {
    var loyalty = DATA.loyalty || {};

    var stampsState = useState(7);
    var stamps = stampsState[0];
    var setStamps = stampsState[1];

    var showRewardState = useState(false);
    var showReward = showRewardState[0];
    var setShowReward = showRewardState[1];

    var confettiTriggerState = useState(false);
    var confettiTrigger = confettiTriggerState[0];
    var setConfettiTrigger = confettiTriggerState[1];

    function handleStampClick(num) {
      if (num === stamps + 1 && stamps < 9) {
        var next = stamps + 1;
        setStamps(next);
        if (next === 9) {
          setConfettiTrigger(true);
          setTimeout(function () { setShowReward(true); }, 600);
        }
      }
    }

    function handleResetStamps() {
      setStamps(7);
      setShowReward(false);
      setConfettiTrigger(false);
    }

    return h('section', { id: 'loyalty', className: 'loyalty-section' },
      h('div', { className: 'container' },
        h('div', { className: 'loyalty-card-grid' },
          // Left: Interactive Digital 9-Stamp Card
          h('div', { className: 'stamp-card-frame' + (stamps === 9 ? ' completed-card' : '') },
            h('div', { className: 'stamp-card-top' },
              h('span', { className: 'stamp-card-brand' }, 'AURA Atelier Pass'),
              h('span', { className: 'stamp-card-status' },
                stamps === 9 ? '🎉 9 / 9 COMPLETE · 10th FREE!' : stamps + ' / 9 STAMPS COLLECTED'
              )
            ),

            // 9 Stamp Grid
            h('div', { className: 'stamp-grid-9' },
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
                var isStamped = num <= stamps;
                var isNext = num === stamps + 1;
                return h('button', {
                  key: num,
                  type: 'button',
                  className: 'stamp-slot' + (isStamped ? ' stamped' : '') + (isNext ? ' next-tap' : ''),
                  onClick: function () { handleStampClick(num); },
                  title: isStamped ? 'Stamp #' + num + ' collected' : (isNext ? 'Tap to stamp your coffee!' : 'Stamp #' + num),
                  disabled: !isNext && num > stamps
                },
                  isStamped ? h(Icon, { name: 'check', size: 18 }) : (isNext ? '+ Tap' : num)
                );
              }),
              h('div', {
                className: 'stamp-slot free-cup' + (stamps === 9 ? ' unlocked' : ''),
                onClick: function () { if (stamps === 9) setShowReward(true); }
              },
                h(Icon, { name: 'sparkles', size: 18, color: stamps === 9 ? '#FAF6F0' : 'var(--cafe-bronze)' }),
                h('span', { style: { fontSize: '9px', marginTop: '2px', fontWeight: 700 } },
                  stamps === 9 ? 'CLAIM' : '10th FREE'
                )
              )
            ),

            h('div', { className: 'stamp-card-bottom' },
              h('div', null,
                h('span', null, 'Patron: Alex Chen'),
                h('span', { style: { display: 'block', fontSize: '11px', color: 'var(--cafe-bronze)', marginTop: '2px' } },
                  stamps < 9
                    ? (9 - stamps) + ' more stamp' + (9 - stamps === 1 ? '' : 's') + ' to complimentary reward'
                    : 'Complimentary beverage ready for collection!'
                )
              ),
              stamps > 7 && h('button', {
                type: 'button',
                className: 'btn-reset-demo-stamps',
                onClick: handleResetStamps
              }, 'Reset Pass')
            )
          ),

          // Right: Club Details & Interactive Wallet Pass
          h('div', null,
            h('span', { className: 'section-eyebrow' }, 'Digital Membership'),
            h('h2', { className: 'section-main-title', style: { textAlign: 'left' } },
              loyalty.tagline || 'Buy 9 Handcrafted Coffees, Enjoy Your 10th on Us'
            ),
            h('p', { className: 'section-lead-paragraph', style: { textAlign: 'left', marginBottom: '24px' } },
              loyalty.subtitle || 'Scan your digital stamp pass at any bar. Plus enjoy complimentary birthday pastries, queue-skip mobile ordering, and seasonal nano-lot tastings.'
            ),

            h('ul', { className: 'loyalty-benefits-list' },
              (loyalty.benefits || []).map(function (b, idx) {
                return h('li', { key: idx },
                  h('span', { className: 'benefit-check' }, '✓'),
                  b
                );
              })
            ),

            h('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } },
              h('button', {
                type: 'button',
                className: 'btn btn-primary',
                onClick: function () { setShowReward(true); }
              },
                h(Icon, { name: 'star', size: 16, color: '#FAF6F0' }),
                stamps === 9 ? 'View Free Coffee Reward Voucher' : 'Preview Apple / Google Wallet Pass'
              ),
              stamps < 9 && h('button', {
                type: 'button',
                className: 'btn btn-secondary',
                onClick: function () { handleStampClick(stamps + 1); }
              }, 'Tap Stamp #' + (stamps + 1) + ' (Simulate Order)')
            )
          )
        )
      ),

      // Reward Modal
      showReward && h('div', {
        className: 'nutrition-modal-backdrop',
        role: 'dialog',
        'aria-modal': 'true'
      },
        h('div', { className: 'loyalty-reward-modal-box' },
          h('div', { className: 'reward-stamp-header' },
            h('div', { className: 'reward-gold-badge' }, '✦ AURA REWARD PASS'),
            h('button', {
              type: 'button',
              className: 'modal-close-button',
              onClick: function () { setShowReward(false); }
            }, h(Icon, { name: 'close', size: 16 }))
          ),
          h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '14px 0 6px' } },
            stamps === 9 ? '10th Complimentary Beverage' : 'Atelier Digital Membership Card'
          ),
          h('p', { style: { fontSize: '13.5px', color: 'var(--cafe-text-secondary)', marginBottom: '20px' } },
            stamps === 9
              ? 'Congratulations! Present this pass to your barista at Ancoats, Marylebone, or Soho for any handcrafted drink of your choice on the house.'
              : 'Add this pass to your Apple Wallet or Google Wallet for contactless NFC stamping at all AURA bars.'
          ),
          // Barcode Simulation
          h('div', { className: 'simulated-barcode-card' },
            h('div', { className: 'barcode-bars' },
              '||| | |||| | ||| |||| | || | |||| ||| | ||'
            ),
            h('div', { className: 'barcode-code-text' },
              'PASS: AURA-REWARD-2026-CH77'
            )
          ),
          h('button', {
            type: 'button',
            className: 'btn btn-primary',
            style: { width: '100%', minHeight: '46px', marginTop: '16px' },
            onClick: function () { setShowReward(false); }
          }, 'Done & Return to Cafe')
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // CAFE LOCATIONS FINDER WITH CITY FILTER & LIVE STATUS
  // --------------------------------------------------------------------------
  function LocationsSection() {
    var locations = DATA.locations || [];

    var cityFilterState = useState('all');
    var cityFilter = cityFilterState[0];
    var setCityFilter = cityFilterState[1];

    var filteredLocations = useMemo(function () {
      if (cityFilter === 'all') return locations;
      return locations.filter(function (l) { return l.city.toLowerCase() === cityFilter; });
    }, [locations, cityFilter]);

    return h('section', { id: 'locations', className: 'locations-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-head-wrap' },
          h('span', { className: 'section-eyebrow' }, 'Find Your Local Atelier'),
          h('h2', { className: 'section-main-title' }, 'Our Neighborhood Sanctuaries'),
          h('p', { className: 'section-lead-paragraph' },
            'Open seven days a week across Manchester and London. Featuring acoustic calm, outdoor heated piazzas, and dedicated pour-over filter bars.'
          )
        ),

        // City Filter Tabs
        h('div', { className: 'locations-city-filter' },
          [
            { id: 'all', label: 'All Sanctuaries (3)' },
            { id: 'manchester', label: 'Manchester (1)' },
            { id: 'london', label: 'London (2)' }
          ].map(function (c) {
            var isSel = cityFilter === c.id;
            return h('button', {
              key: c.id,
              type: 'button',
              className: 'city-filter-btn' + (isSel ? ' active' : ''),
              onClick: function () { setCityFilter(c.id); }
            }, c.label);
          })
        ),

        h('div', { className: 'locations-cards-grid' },
          filteredLocations.map(function (loc) {
            return h('div', { key: loc.id, className: 'location-card' },
              h('div', { className: 'location-img-wrap' },
                h('img', { src: loc.image, alt: loc.name, className: 'location-img', loading: 'lazy' }),
                h('span', { className: 'live-open-badge' },
                  h('span', { className: 'live-pulse-dot' }),
                  'Open Today · 07:00 – 18:00'
                )
              ),
              h('div', { className: 'location-body' },
                h('span', { className: 'location-city-tag' }, loc.city),
                h('h3', { className: 'location-title' }, loc.name),
                h('div', { className: 'location-address' },
                  h(Icon, { name: 'map-pin', size: 14, color: 'var(--cafe-bronze)' }),
                  ' ' + loc.address
                ),
                h('div', { className: 'location-hours' },
                  h(Icon, { name: 'clock', size: 13, color: 'var(--cafe-text-muted)' }),
                  ' ' + loc.hours
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
                    style: { flex: 1, justifyContent: 'center' }
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
        subtitle: 'Grind: ' + selectedGrind + ' · Fortnightly Fresh Dispatch',
        priceDisplay: sub.priceDisplay,
        price: sub.id === 'sub_curator' ? 11.50 : 10.00,
        image: sub.image,
        customization: { grind: selectedGrind }
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
  // SLIDE-OVER ORDER BAG & MULTI-LOCATION CHECKOUT DRAWER
  // --------------------------------------------------------------------------
  function CartDrawer(props) {
    var isOpen = props.isOpen;
    var onClose = props.onClose;
    var cart = props.cart || [];
    var onRemove = props.onRemove;
    var onUpdateQty = props.onUpdateQty;
    var onCheckout = props.onCheckout;

    var selectedLocationState = useState('ancoats');
    var selectedLocation = selectedLocationState[0];
    var setSelectedLocation = selectedLocationState[1];

    var pickupTimeState = useState('asap');
    var pickupTime = pickupTimeState[0];
    var setPickupTime = pickupTimeState[1];

    var subtotal = cart.reduce(function (sum, it) {
      var q = it.qty || 1;
      return sum + (it.price || 0) * q;
    }, 0);

    var vatAmount = subtotal * (20 / 120); // UK 20% VAT included in prices

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
        // Panel Header
        h('div', { className: 'cart-panel-head' },
          h('div', null,
            h('h4', { className: 'cart-panel-title' }, 'Your Order Bag (' + cart.reduce(function (c, it) { return c + (it.qty || 1); }, 0) + ')'),
            h('span', { style: { fontSize: '11.5px', color: 'var(--cafe-text-muted)' } }, 'Handcrafted for Express Counter Pickup')
          ),
          h('button', {
            type: 'button',
            className: 'modal-close-button',
            onClick: onClose,
            'aria-label': 'Close bag'
          }, h(Icon, { name: 'close', size: 16 }))
        ),

        // Pickup Location & Schedule Selector
        cart.length > 0 && h('div', { className: 'cart-pickup-selectors-box' },
          h('div', { className: 'cart-selector-row' },
            h('label', { className: 'cart-sel-label' }, 'Collect from Bar:'),
            h('select', {
              className: 'cart-dropdown-select',
              value: selectedLocation,
              onChange: function (e) { setSelectedLocation(e.target.value); }
            },
              h('option', { value: 'ancoats' }, 'Ancoats Flagship, Manchester (M4 5BF)'),
              h('option', { value: 'marylebone' }, 'Marylebone Atelier, London (W1U 7QA)'),
              h('option', { value: 'soho' }, 'Soho Espresso Bar, London (W1F 8HS)')
            )
          ),
          h('div', { className: 'cart-selector-row' },
            h('label', { className: 'cart-sel-label' }, 'Pickup Time:'),
            h('select', {
              className: 'cart-dropdown-select',
              value: pickupTime,
              onChange: function (e) { setPickupTime(e.target.value); }
            },
              h('option', { value: 'asap' }, '⚡ ASAP (Ready in ~6 minutes)'),
              h('option', { value: '15m' }, 'In 15 minutes'),
              h('option', { value: '30m' }, 'In 30 minutes'),
              h('option', { value: '45m' }, 'In 45 minutes')
            )
          )
        ),

        // Scrollable Items List
        h('div', { className: 'cart-items-scroll' },
          cart.length === 0
            ? h('div', { className: 'cart-empty-state' },
              h(Icon, { name: 'coffee', size: 40, color: 'var(--cafe-bronze)' }),
              h('h4', null, 'Your bag is empty'),
              h('p', null, 'Add an artisan flat white, single-origin pour-over, or cardamom bun to order.')
            )
            : cart.map(function (item, idx) {
              var q = item.qty || 1;
              var lineTotal = (item.price || 0) * q;
              return h('div', { key: item.id || idx, className: 'cart-item-card' },
                h('div', { className: 'cart-item-info' },
                  h('h5', null, item.name),
                  h('p', null, item.subtitle || 'Handcrafted order'),
                  item.notes && h('span', { className: 'cart-item-note' }, 'Note: ' + item.notes)
                ),
                h('div', { className: 'cart-item-actions-col' },
                  h('span', { className: 'cart-item-price' }, '£' + lineTotal.toFixed(2)),
                  // Quantity Stepper
                  h('div', { className: 'qty-stepper' },
                    h('button', {
                      type: 'button',
                      className: 'qty-btn',
                      onClick: function () { onUpdateQty(idx, q - 1); },
                      'aria-label': 'Decrease quantity'
                    }, h(Icon, { name: 'minus', size: 12 })),
                    h('span', { className: 'qty-display' }, q),
                    h('button', {
                      type: 'button',
                      className: 'qty-btn',
                      onClick: function () { onUpdateQty(idx, q + 1); },
                      'aria-label': 'Increase quantity'
                    }, h(Icon, { name: 'plus', size: 12 }))
                  )
                )
              );
            })
        ),

        // Drawer Footer
        cart.length > 0 && h('div', { className: 'cart-panel-foot' },
          h('div', { className: 'cart-subtotal-line' },
            h('span', null, 'Order Subtotal:'),
            h('span', { style: { color: 'var(--cafe-bronze)', fontSize: '18px', fontWeight: 700 } }, '£' + subtotal.toFixed(2))
          ),
          h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--cafe-text-muted)', marginBottom: '12px' } },
            h('span', null, 'Includes UK 20% VAT:'),
            h('span', null, '£' + vatAmount.toFixed(2))
          ),
          h('p', { style: { fontSize: '12px', color: 'var(--cafe-text-muted)', margin: '0 0 16px' } },
            '🕒 Ready in ~6 mins. Collect at your selected counter with your digital pass.'
          ),
          h('button', {
            type: 'button',
            className: 'btn btn-primary',
            style: { width: '100%', minHeight: '48px' },
            onClick: function () {
              onCheckout({
                location: selectedLocation === 'ancoats' ? 'Ancoats Flagship' : (selectedLocation === 'marylebone' ? 'Marylebone Atelier' : 'Soho Espresso Bar'),
                pickupTime: pickupTime === 'asap' ? 'ASAP (~6 minutes)' : 'Scheduled (' + pickupTime + ')'
              });
            }
          }, 'Confirm Pickup Order — £' + subtotal.toFixed(2) + ' →')
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
        h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--cafe-bronze)', fontWeight: 700, marginBottom: '14px' } },
          'COLLECTION PASS: ' + order.code
        ),
        h('p', { style: { fontSize: '14px', color: 'var(--cafe-text-secondary)', lineHeight: 1.5, marginBottom: '20px' } },
          'Our baristas have received your order at our ',
          h('strong', null, order.location || 'Ancoats Flagship'),
          ' bar. Ready for collection ',
          h('strong', null, order.pickupTime || 'in ~6 minutes'),
          '.'
        ),
        h('div', { style: { background: 'var(--cafe-bg-surface)', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' } },
          h('span', null, 'Total Paid:'),
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
  // MOBILE STICKY FLOATING ORDER BAR
  // --------------------------------------------------------------------------
  function MobileStickyOrderBar(props) {
    var cartCount = props.cartCount;
    var cartTotal = props.cartTotal;
    var onOpenCart = props.onOpenCart;

    if (cartCount === 0) return null;

    return h('div', { className: 'mobile-sticky-order-bar' },
      h('button', {
        type: 'button',
        className: 'mobile-sticky-inner-btn',
        onClick: onOpenCart,
        'aria-label': 'View Order Bag, ' + cartCount + ' items for £' + cartTotal.toFixed(2)
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          h(Icon, { name: 'bag', size: 18 }),
          h('span', { style: { fontWeight: 700 } }, 'View Order Bag (' + cartCount + ')')
        ),
        h('span', { className: 'mobile-sticky-price' }, '£' + cartTotal.toFixed(2) + ' →')
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

    // Cart state with localStorage persistence
    var cartState = useState(function () {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          var saved = window.localStorage.getItem('aura_cart');
          if (saved) return JSON.parse(saved);
        } catch (e) { }
      }
      return [];
    });
    var cart = cartState[0];
    var setCart = cartState[1];

    useEffect(function () {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem('aura_cart', JSON.stringify(cart));
        } catch (e) { }
      }
    }, [cart]);

    var isCartOpenState = useState(false);
    var isCartOpen = isCartOpenState[0];
    var setIsCartOpen = isCartOpenState[1];

    var isMobileNavOpenState = useState(false);
    var isMobileNavOpen = isMobileNavOpenState[0];
    var setIsMobileNavOpen = isMobileNavOpenState[1];

    var customizerItemState = useState(null);
    var activeCustomizerItem = customizerItemState[0];
    var setActiveCustomizerItem = customizerItemState[1];

    var nutritionItemState = useState(null);
    var activeNutritionItem = nutritionItemState[0];
    var setActiveNutritionItem = nutritionItemState[1];

    var orderSuccessState = useState(null);
    var activeOrderSuccess = orderSuccessState[0];
    var setActiveOrderSuccess = orderSuccessState[1];

    // Keyboard ESC to close any open modal
    useEffect(function () {
      function handleKeyDown(e) {
        if (e.key === 'Escape') {
          setActiveCustomizerItem(null);
          setActiveNutritionItem(null);
          setIsCartOpen(false);
          setIsMobileNavOpen(false);
          setActiveOrderSuccess(null);
        }
      }
      window.addEventListener('keydown', handleKeyDown);
      return function () { window.removeEventListener('keydown', handleKeyDown); };
    }, []);

    // Prevent body scroll when modal open
    useEffect(function () {
      var isAnyModalOpen = isCartOpen || isMobileNavOpen || Boolean(activeCustomizerItem) || Boolean(activeNutritionItem) || Boolean(activeOrderSuccess);
      if (isAnyModalOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }, [isCartOpen, isMobileNavOpen, activeCustomizerItem, activeNutritionItem, activeOrderSuccess]);

    function handleAddConfiguredItem(configuredItem) {
      setCart(function (prev) {
        var existingIdx = prev.findIndex(function (it) {
          return it.baseId === configuredItem.baseId && it.subtitle === configuredItem.subtitle;
        });
        if (existingIdx >= 0) {
          var copy = prev.slice();
          copy[existingIdx].qty = (copy[existingIdx].qty || 1) + 1;
          return copy;
        }
        configuredItem.qty = 1;
        return [configuredItem].concat(prev);
      });
      setIsCartOpen(true);
    }

    function handleUpdateCartQty(idx, newQty) {
      setCart(function (prev) {
        if (newQty <= 0) {
          var copy = prev.slice();
          copy.splice(idx, 1);
          return copy;
        }
        var copy = prev.slice();
        copy[idx].qty = newQty;
        return copy;
      });
    }

    function handleRemoveCart(idx) {
      setCart(function (prev) {
        var copy = prev.slice();
        copy.splice(idx, 1);
        return copy;
      });
    }

    function handleCheckout(meta) {
      if (cart.length === 0) return;
      var subtotal = cart.reduce(function (sum, it) { return sum + (it.price || 0) * (it.qty || 1); }, 0);
      var newOrder = {
        code: 'AURA-' + Math.floor(1000 + Math.random() * 9000),
        items: cart,
        total: subtotal,
        location: meta.location,
        pickupTime: meta.pickupTime
      };
      setCart([]);
      setIsCartOpen(false);
      setActiveOrderSuccess(newOrder);
    }

    var totalCount = cart.reduce(function (sum, it) { return sum + (it.qty || 1); }, 0);
    var totalPrice = cart.reduce(function (sum, it) { return sum + (it.price || 0) * (it.qty || 1); }, 0);

    return h('div', { className: 'aura-cafe-app' },
      h(AnnouncementBar, null),
      h(SiteNavbar, {
        cartCount: totalCount,
        onOpenCart: function () { setIsCartOpen(true); },
        theme: theme,
        onToggleTheme: toggleTheme,
        onToggleMobileNav: function () { setIsMobileNavOpen(true); }
      }),
      h(MobileNavDrawer, {
        isOpen: isMobileNavOpen,
        onClose: function () { setIsMobileNavOpen(false); },
        theme: theme,
        onToggleTheme: toggleTheme
      }),
      h('main', null,
        h(HeroSection, { onOpenCart: function () { setIsCartOpen(true); } }),
        h(MenuExplorerSection, {
          onAddToCart: handleAddConfiguredItem,
          onOpenCustomizer: function (item) { setActiveCustomizerItem(item); },
          onOpenNutrition: function (item) { setActiveNutritionItem(item); }
        }),
        h(CraftStorySection, null),
        h(LoyaltyClubSection, null),
        h(LocationsSection, null),
        h(SubscriptionSection, { onAddToCart: handleAddConfiguredItem })
      ),
      h(SiteFooter, null),

      // Beverage & Item Customization Configurator Modal
      h(CustomizationModal, {
        item: activeCustomizerItem,
        onClose: function () { setActiveCustomizerItem(null); },
        onAddConfiguredItem: handleAddConfiguredItem
      }),

      // Nutrition Specification Sheet Modal
      h(NutritionModal, {
        item: activeNutritionItem,
        onClose: function () { setActiveNutritionItem(null); },
        onAddConfiguredItem: handleAddConfiguredItem
      }),

      // Cart Slide-Over Drawer
      h(CartDrawer, {
        isOpen: isCartOpen,
        onClose: function () { setIsCartOpen(false); },
        cart: cart,
        onRemove: handleRemoveCart,
        onUpdateQty: handleUpdateCartQty,
        onCheckout: handleCheckout
      }),

      // Order Success Modal
      h(OrderSuccessModal, {
        order: activeOrderSuccess,
        onClose: function () { setActiveOrderSuccess(null); }
      }),

      // Mobile Sticky Bottom Order Bar
      h(MobileStickyOrderBar, {
        cartCount: totalCount,
        cartTotal: totalPrice,
        onOpenCart: function () { setIsCartOpen(true); }
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
