/* ==========================================================================
   YEAH MAN CARIBBEAN — Production React 18 Application
   Authentic Jamaican Soul Food & Jerk Grill · Stretford, Manchester
   63 Norway Street, M32 0JN · 0161 864 3259
   ========================================================================== */

(function () {
  'use strict';

  // Fallback data resolution for browser and test environments
  var DATA = (typeof window !== 'undefined' && window.YEAHMAN_DATA)
    ? window.YEAHMAN_DATA
    : (typeof require !== 'undefined' ? require('./data.js') : {});

  // Browser React 18 or lightweight Node test mock
  var React = (typeof window !== 'undefined' && window.React)
    ? window.React
    : {
        createElement: function (type, props) {
          var children = Array.prototype.slice.call(arguments, 2);
          return { type: type, props: Object.assign({}, props, { children: children }) };
        },
        Fragment: 'React.Fragment',
        useState: function (init) { return [init, function () {}]; },
        useEffect: function () {},
        useCallback: function (fn) { return fn; },
        useMemo: function (fn) { return fn(); }
      };

  var ReactDOM = (typeof window !== 'undefined' && window.ReactDOM) ? window.ReactDOM : null;

  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useCallback = React.useCallback;
  var useMemo = React.useMemo;

  /* ==========================================================================
     HELPER: UK / Manchester Opening Hours Calculator
     ========================================================================== */
  function getLiveOpeningStatus(hoursData) {
    try {
      var now = new Date();
      // UTC to UK / London time
      var ukTimeString = now.toLocaleString('en-GB', { timeZone: 'Europe/London' });
      var parts = ukTimeString.split(', ');
      var timeParts = parts[1].split(':');
      var hours = parseInt(timeParts[0], 10);
      var minutes = parseInt(timeParts[1], 10);
      var decimalTime = hours + (minutes / 60);

      // Day of week: 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
      var day = now.getDay();

      if (day === 1) { // Monday
        return {
          isOpen: false,
          statusText: 'Closed Today (Monday)',
          subText: 'Kitchen opens Tuesday at 11:00 for collection',
          badgeClass: 'closed'
        };
      }

      if (day === 0) { // Sunday: collection 13:00 - 21:00, delivery 17:00 - 21:00
        if (decimalTime >= 13.0 && decimalTime < 21.0) {
          var isDel = decimalTime >= 17.0;
          return {
            isOpen: true,
            statusText: isDel ? 'Open Now · Collection & Delivery' : 'Open Now · Collection Only (Delivery from 17:00)',
            subText: 'Sunday service until 21:00',
            badgeClass: 'open'
          };
        }
        return {
          isOpen: false,
          statusText: 'Closed Now',
          subText: 'Sunday opening: 13:00 – 21:00',
          badgeClass: 'closed'
        };
      }

      // Tuesday to Saturday: collection 11:00 - 22:30, delivery 17:00 - 22:30
      if (decimalTime >= 11.0 && decimalTime < 22.5) {
        var isDeliveryOpen = decimalTime >= 17.0;
        return {
          isOpen: true,
          statusText: isDeliveryOpen ? 'Open Now · Collection & Delivery' : 'Open Now · Collection (Delivery from 17:00)',
          subText: 'Piping hot fresh jerk & curries until 22:30',
          badgeClass: 'open'
        };
      }

      return {
        isOpen: false,
        statusText: 'Kitchen Closed for the Night',
        subText: 'Reopens tomorrow at 11:00 AM · Pre-orders welcome!',
        badgeClass: 'closed'
      };
    } catch (e) {
      return {
        isOpen: true,
        statusText: 'Open for Orders',
        subText: 'Tuesday–Saturday 11:00–22:30 · Sunday 13:00–21:00',
        badgeClass: 'open'
      };
    }
  }

  /* ==========================================================================
     1. COMPONENT: NAVBAR (Sticky Header, Brand Lockup, Desktop Links, Basket)
     ========================================================================== */
  function Navbar(props) {
    var brand = props.brand || {};
    var onToggleDrawer = props.onToggleDrawer;
    var onOpenCart = props.onOpenCart;
    var cartCount = props.cartCount || 0;
    var cartTotal = props.cartTotal || 0;
    var activeSection = props.activeSection;

    var navItems = [
      { id: 'hero', label: 'Home', href: '#hero' },
      { id: 'menu', label: 'Our Menu (80)', href: '#menu' },
      { id: 'spotlight', label: 'Signatures', href: '#spotlight' },
      { id: 'story', label: 'Jamie\'s Story', href: '#story' },
      { id: 'catering', label: 'Catering', href: '#catering' },
      { id: 'reviews', label: 'Reviews', href: '#reviews' },
      { id: 'location', label: 'Hours & Location', href: '#location' }
    ];

    return h('header', { className: 'site-header', role: 'banner' },
      h('div', { className: 'container nav-container' },
        // Brand Lockup
        h('a', { href: '#hero', className: 'brand-lockup', 'aria-label': brand.name + ' Home' },
          h('div', { className: 'brand-badge', 'aria-hidden': 'true' }, brand.monogram || 'YM'),
          h('div', { className: 'brand-text-group' },
            h('span', { className: 'brand-title' }, brand.name || 'YEAH MAN CARIBBEAN'),
            h('span', { className: 'brand-subtitle' }, 'Authentic Jamaican Kitchen')
          )
        ),

        // Desktop Navigation Links
        h('nav', { className: 'desktop-nav-links', 'aria-label': 'Main Navigation' },
          navItems.map(function (item) {
            var isActive = activeSection === item.id;
            return h('a', {
              key: item.id,
              href: item.href,
              className: 'nav-link' + (isActive ? ' active' : '')
            }, item.label);
          })
        ),

        // Right Actions: Call CTA, Basket Button & Mobile Hamburger
        h('div', { className: 'header-actions' },
          h('a', {
            href: 'tel:' + (brand.phoneDialer || '+441618643259'),
            className: 'btn-header-call',
            'aria-label': 'Call Yeah Man directly at ' + (brand.phone || '0161 864 3259')
          },
            h('span', null, '📞 ' + (brand.phone || '0161 864 3259'))
          ),

          // Basket Trigger Button
          h('button', {
            type: 'button',
            className: 'btn-header-basket',
            onClick: onOpenCart,
            'aria-label': 'View Order Basket, ' + cartCount + ' items'
          },
            h('span', null, '🛒 Basket'),
            cartCount > 0 ? h('span', { className: 'basket-count-badge' }, cartCount) : null,
            cartCount > 0 ? h('span', null, '· £' + cartTotal.toFixed(2)) : null
          ),

          // Mobile Hamburger Button
          h('button', {
            type: 'button',
            className: 'hamburger-btn',
            onClick: onToggleDrawer,
            'aria-label': 'Open navigation drawer',
            'aria-expanded': props.drawerOpen ? 'true' : 'false'
          },
            h('div', { className: 'hamburger-bars' },
              h('span', null),
              h('span', null),
              h('span', null)
            )
          )
        )
      )
    );
  }

  /* ==========================================================================
     2. COMPONENT: MOBILE DRAWER (Mounted Outside Header in React.Fragment)
     ========================================================================== */
  function MobileDrawer(props) {
    var isOpen = props.isOpen;
    var onClose = props.onClose;
    var brand = props.brand || {};
    var onOpenCart = props.onOpenCart;

    var drawerNavItems = [
      { id: 'hero', label: '🏠 Home', href: '#hero' },
      { id: 'menu', label: '🍗 Our 80-Item Jamaican Menu', href: '#menu' },
      { id: 'spotlight', label: '🔥 Chef\'s Signature Dishes', href: '#spotlight' },
      { id: 'story', label: '🇯🇲 Jamie\'s 12-Year Heritage', href: '#story' },
      { id: 'catering', label: '🎉 Catering & Party Platters', href: '#catering' },
      { id: 'reviews', label: '⭐ 4.8★ Verified Customer Reviews', href: '#reviews' },
      { id: 'location', label: '📍 Hours & Location (M32 0JN)', href: '#location' }
    ];

    // Escape key listener for accessibility
    useEffect(function () {
      function handleKeyDown(e) {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      }
      if (isOpen && typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
      }
      return function () {
        if (typeof window !== 'undefined') {
          window.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, [isOpen, onClose]);

    return h(React.Fragment, null,
      // Backdrop
      h('div', {
        className: 'drawer-backdrop' + (isOpen ? ' open' : ''),
        onClick: onClose,
        'aria-hidden': !isOpen
      }),

      // Slide-in Drawer Panel
      h('aside', {
        className: 'mobile-drawer' + (isOpen ? ' open' : ''),
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Mobile Navigation Menu'
      },
        h('div', { className: 'drawer-header' },
          h('div', { className: 'brand-lockup' },
            h('div', { className: 'brand-badge' }, brand.monogram || 'YM'),
            h('div', { className: 'brand-text-group' },
              h('span', { className: 'brand-title' }, brand.name || 'YEAH MAN CARIBBEAN'),
              h('span', { className: 'brand-subtitle' }, 'Stretford · Manchester')
            )
          ),
          h('button', {
            type: 'button',
            className: 'drawer-close-btn',
            onClick: onClose,
            'aria-label': 'Close navigation menu'
          }, '✕')
        ),

        h('nav', { className: 'drawer-nav-list' },
          drawerNavItems.map(function (item) {
            return h('a', {
              key: item.id,
              href: item.href,
              className: 'drawer-link',
              onClick: onClose
            }, item.label);
          })
        ),

        h('div', { className: 'drawer-actions-box' },
          h('button', {
            type: 'button',
            className: 'btn-drawer-whatsapp',
            onClick: function () {
              onClose();
              if (onOpenCart) onOpenCart();
            }
          }, '🛒 View Basket & Order Online'),

          h('a', {
            href: 'https://wa.me/' + (brand.whatsappNumber || '441618643259') + '?text=Hi%20Yeah%20Man%20Caribbean,%20I%20would%20like%20to%20place%20an%20order',
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'btn-drawer-whatsapp'
          }, '💬 Order via WhatsApp (0161 864 3259)'),

          h('a', {
            href: 'tel:' + (brand.phoneDialer || '+441618643259'),
            className: 'btn-drawer-phone'
          }, '📞 Call Shop: ' + (brand.phone || '0161 864 3259'))
        )
      )
    );
  }

  /* ==========================================================================
     3. COMPONENT: HERO SECTION
     ========================================================================== */
  function Hero(props) {
    var brand = props.brand || {};
    var onOpenCart = props.onOpenCart;
    var onAddToCart = props.onAddToCart;
    var liveStatus = props.liveStatus || {};

    var signatureDish = {
      id: 'ym_1',
      name: 'Legendary Jerk Chicken',
      category: 'Main Dishes',
      price: '£10.00',
      priceNum: 10.00,
      description: 'Marinated 48 hours in authentic Scotch bonnet, pimento & thyme jerk rub, slow-smoked over charcoal. Served with rice & peas and sweet plantain.',
      isSignature: true
    };

    return h('section', { id: 'hero', className: 'hero-section' },
      h('div', { className: 'container' },
        h('div', { className: 'hero-layout' },
          // Left Column: Copy & CTAs
          h('div', { className: 'hero-content' },
            h('div', { className: 'hero-badge-row' },
              h('div', { className: 'hero-rating-badge' },
                h('span', { className: 'hero-stars' }, '★★★★★'),
                h('span', null, '4.8 Rating (2,150+ Reviews)'),
                h('span', null, '· 12+ Yrs in Stretford')
              )
            ),

            h('h1', { className: 'hero-title' },
              'Authentic ',
              h('span', { className: 'highlight-gold' }, 'Jamaican Soul Food'),
              ' & Charcoal ',
              h('span', { className: 'highlight-green' }, 'Jerk Grill')
            ),

            h('p', { className: 'hero-lead' },
              'Handcrafted on Norway Street by Chef Jamie for over 12 years. Freshly smoked jerk quarter-chicken, slow-simmered curry goat, tender braised oxtail, and piping-hot fried dumpling splits.'
            ),

            h('div', { className: 'hero-cta-group' },
              h('a', { href: '#menu', className: 'btn-primary-order' },
                '🍗 Explore 80-Item Menu'
              ),
              h('a', {
                href: 'https://wa.me/' + (brand.whatsappNumber || '441618643259') + '?text=Hi%20Yeah%20Man%20Caribbean,%20I%20would%20like%20to%20place%20an%20order',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'btn-whatsapp-order'
              },
                '💬 WhatsApp Order'
              )
            ),

            h('div', { className: 'hero-trust-row' },
              h('div', { className: 'hero-trust-item' },
                h('span', { className: 'trust-number' }, '12+ Years'),
                h('span', { className: 'trust-label' }, 'Norway Street Flagship')
              ),
              h('div', { className: 'hero-trust-item' },
                h('span', { className: 'trust-number' }, '100% Halal'),
                h('span', { className: 'trust-label' }, 'All Poultry & Meats')
              ),
              h('div', { className: 'hero-trust-item' },
                h('span', { className: 'trust-number' }, 'FREE'),
                h('span', { className: 'trust-label' }, 'Collection in 15–20 Mins')
              )
            )
          ),

          // Right Column: Visual Showcase Card
          h('div', { className: 'hero-visual' },
            h('div', { className: 'hero-visual-card' },
              h('div', { className: 'hero-card-banner' },
                h('span', { className: 'hero-card-tag' }, '🔥 TODAY\'S TOP DISH'),
                h('h3', { className: 'hero-card-dish-name' }, signatureDish.name),
                h('p', { className: 'hero-card-dish-desc' }, signatureDish.description)
              ),
              h('div', { className: 'hero-card-price-row' },
                h('div', null,
                  h('span', { className: 'hero-card-price' }, '£10.00'),
                  h('span', { style: { display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' } }, 'Served with choice of rice & peas or chips')
                ),
                h('button', {
                  type: 'button',
                  className: 'btn-card-add',
                  onClick: function () {
                    onAddToCart(signatureDish);
                    if (onOpenCart) onOpenCart();
                  }
                }, '+ Add to Order')
              )
            )
          )
        )
      )
    );
  }

  /* ==========================================================================
     4. COMPONENT: QUICK INFO BAR (Live Status, Address & Direct Phone)
     ========================================================================== */
  function QuickInfoBar(props) {
    var brand = props.brand || {};
    var liveStatus = props.liveStatus || {};

    return h('div', { className: 'quick-info-bar' },
      h('div', { className: 'container' },
        h('div', { className: 'info-bar-grid' },
          // Live status
          h('div', { className: 'info-status-group' },
            h('span', { className: 'status-dot ' + (liveStatus.badgeClass || 'open') }),
            h('div', null,
              h('span', { className: 'info-status-text' }, liveStatus.statusText || 'Open for Orders'),
              h('span', { className: 'info-status-subtext' }, ' · ' + (liveStatus.subText || 'Stretford Collection & Delivery'))
            )
          ),

          // Quick Links
          h('div', { className: 'info-links-group' },
            h('a', {
              href: brand.googleMapsUrl || 'https://maps.google.com/?q=63+Norway+Street,+Stretford,+Manchester+M32+0JN',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'info-link-item'
            },
              h('span', null, '📍 63 Norway Street, Stretford, M32 0JN')
            ),

            h('a', {
              href: 'tel:' + (brand.phoneDialer || '+441618643259'),
              className: 'info-link-item'
            },
              h('span', null, '📞 0161 864 3259')
            ),

            h('span', { className: 'info-link-item', style: { color: 'var(--color-palm-green-light)' } },
              '🛵 Delivery: M32, M16, M21, M17, M41, M33, M15, M5, M50'
            )
          )
        )
      )
    );
  }

  /* ==========================================================================
     5. COMPONENT: MENU CATALOG (Search Form, Compact UX, Category Tabs, Cards)
     ========================================================================== */
  function MenuCatalog(props) {
    var categories = props.categories || [];
    var items = props.items || [];
    var cart = props.cart || {};
    var onAddToCart = props.onAddToCart;
    var onUpdateQuantity = props.onUpdateQuantity;

    // Search and filter state
    var searchQuery = props.searchQuery || '';
    var setSearchQuery = props.setSearchQuery;
    var selectedCategory = props.selectedCategory || 'all';
    var setSelectedCategory = props.setSelectedCategory;
    var dietaryFilter = props.dietaryFilter || 'all';
    var setDietaryFilter = props.setDietaryFilter;
    var isCompactMode = props.isCompactMode !== undefined ? props.isCompactMode : true;
    var setIsCompactMode = props.setIsCompactMode;

    // Quick tag suggestions for instant searching
    var quickTags = [
      { label: '🔥 Jerk Chicken', query: 'Jerk Chicken' },
      { label: '🐐 Curry Goat', query: 'Curry Goat' },
      { label: '🥩 Oxtail', query: 'Oxtail' },
      { label: '🥟 Dumplings / Splits', query: 'split' },
      { label: '🌱 Veg & Callaloo', query: 'callaloo' },
      { label: '🥤 Tropical Drinks', query: 'drink' },
      { label: '🍰 Rum Cake', query: 'cake' }
    ];

    // Filter items based on Category, Search Query, and Dietary filters
    var filteredItems = useMemo(function () {
      var q = (searchQuery || '').trim().toLowerCase();

      return items.filter(function (item) {
        // Category filter
        if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
          return false;
        }

        // Dietary filter
        if (dietaryFilter === 'halal' && !item.isHalal) return false;
        if (dietaryFilter === 'veg' && !item.isVeg) return false;
        if (dietaryFilter === 'spicy' && !item.isSpicy) return false;

        // Search query filter (matches name, description, category, allergen)
        if (q) {
          var matchName = item.name.toLowerCase().indexOf(q) !== -1;
          var matchDesc = (item.description || '').toLowerCase().indexOf(q) !== -1;
          var matchCat = (item.categoryName || '').toLowerCase().indexOf(q) !== -1;
          var matchAllergen = (item.allergen || '').toLowerCase().indexOf(q) !== -1;
          if (!matchName && !matchDesc && !matchCat && !matchAllergen) {
            return false;
          }
        }

        return true;
      });
    }, [items, selectedCategory, dietaryFilter, searchQuery]);

    // Handle Compact Mode
    var isShowingCompact = isCompactMode && selectedCategory === 'all' && !searchQuery.trim();
    var displayedItems = isShowingCompact ? filteredItems.slice(0, 12) : filteredItems;

    return h('section', { id: 'menu', className: 'section menu-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-header' },
          h('span', { className: 'section-tag' }, 'Authentic Jamaican Kitchen'),
          h('h2', { className: 'section-title' }, 'Our Traditional Island Menu'),
          h('p', { className: 'section-subtitle' },
            '80 authentic Jamaican dishes, sides, refreshing tropical juices and homemade desserts cooked fresh every single day.'
          )
        ),

        // Controls Wrapper: Search Form, Quick Chips, Category Tabs & Compact Banner
        h('div', { className: 'menu-controls-wrapper' },
          // Dedicated Search Form Row
          h('div', { className: 'search-form-row' },
            h('span', { className: 'search-icon-left', 'aria-hidden': 'true' }, '🔍'),
            h('input', {
              type: 'text',
              className: 'search-input-field',
              placeholder: 'Search 80 dishes, curries, sides, tropical drinks, allergens...',
              value: searchQuery,
              onChange: function (e) {
                if (setSearchQuery) setSearchQuery(e.target.value);
              },
              'aria-label': 'Search Menu Items'
            }),
            searchQuery ? h('button', {
              type: 'button',
              className: 'search-clear-btn',
              onClick: function () { if (setSearchQuery) setSearchQuery(''); },
              'aria-label': 'Clear search'
            }, '✕') : null
          ),

          // Quick Filter Tag Chips
          h('div', { className: 'quick-tags-container', 'aria-label': 'Quick Search Tags' },
            h('span', { className: 'quick-tag-label' }, 'Popular:'),
            quickTags.map(function (tag, idx) {
              var isActive = searchQuery.toLowerCase() === tag.query.toLowerCase();
              return h('button', {
                key: idx,
                type: 'button',
                className: 'quick-tag-chip' + (isActive ? ' active' : ''),
                onClick: function () {
                  if (isActive) {
                    if (setSearchQuery) setSearchQuery('');
                  } else {
                    if (setSearchQuery) setSearchQuery(tag.query);
                    if (setSelectedCategory) setSelectedCategory('all');
                  }
                }
              }, tag.label);
            })
          ),

          // Category Pills Scroll Row
          h('div', { className: 'category-tabs-scroll', role: 'tablist', 'aria-label': 'Menu Categories' },
            h('button', {
              type: 'button',
              role: 'tab',
              className: 'category-pill-btn' + (selectedCategory === 'all' ? ' active' : ''),
              'aria-selected': selectedCategory === 'all',
              onClick: function () { if (setSelectedCategory) setSelectedCategory('all'); }
            },
              h('span', null, '🍽️ All Dishes'),
              h('span', { className: 'pill-count' }, items.length)
            ),
            categories.map(function (cat) {
              var count = items.filter(function (it) { return it.categoryId === cat.id; }).length;
              var isCatActive = selectedCategory === cat.id;
              return h('button', {
                key: cat.id,
                type: 'button',
                role: 'tab',
                className: 'category-pill-btn' + (isCatActive ? ' active' : ''),
                'aria-selected': isCatActive,
                onClick: function () { if (setSelectedCategory) setSelectedCategory(cat.id); }
              },
                h('span', null, cat.icon + ' ' + cat.name),
                h('span', { className: 'pill-count' }, count)
              );
            })
          ),

          // Dietary Filter Row and Results Summary
          h('div', { className: 'filter-summary-row' },
            h('div', { className: 'dietary-chips-group' },
              h('button', {
                type: 'button',
                className: 'dietary-chip' + (dietaryFilter === 'all' ? ' active' : ''),
                onClick: function () { if (setDietaryFilter) setDietaryFilter('all'); }
              }, 'All Items'),
              h('button', {
                type: 'button',
                className: 'dietary-chip' + (dietaryFilter === 'halal' ? ' active' : ''),
                onClick: function () { if (setDietaryFilter) setDietaryFilter(dietaryFilter === 'halal' ? 'all' : 'halal'); }
              }, '✓ Halal Friendly'),
              h('button', {
                type: 'button',
                className: 'dietary-chip' + (dietaryFilter === 'veg' ? ' active' : ''),
                onClick: function () { if (setDietaryFilter) setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg'); }
              }, '🌱 Vegetarian / Vegan'),
              h('button', {
                type: 'button',
                className: 'dietary-chip' + (dietaryFilter === 'spicy' ? ' active' : ''),
                onClick: function () { if (setDietaryFilter) setDietaryFilter(dietaryFilter === 'spicy' ? 'all' : 'spicy'); }
              }, '🔥 Spicy Heat')
            ),

            h('div', { className: 'results-count-text' },
              'Showing ' + displayedItems.length + ' of ' + filteredItems.length + ' dishes'
            )
          ),

          // Compact Mode Banner
          selectedCategory === 'all' && !searchQuery.trim() ? h('div', { className: 'compact-toggle-banner' },
            h('div', { className: 'compact-banner-text' },
              isCompactMode
                ? h('span', null, 'Showing ', h('strong', null, '12 Popular Featured Dishes'), ' to keep menu browsing fast & clean.')
                : h('span', null, 'Showing ', h('strong', null, 'All 80 Menu Items'), ' across all categories.')
            ),
            h('button', {
              type: 'button',
              className: 'btn-toggle-compact',
              onClick: function () { if (setIsCompactMode) setIsCompactMode(!isCompactMode); }
            },
              isCompactMode ? 'Show All 80 Dishes ▾' : 'Show Top 12 Dishes ▴'
            )
          ) : null
        ),

        // Menu Cards Grid
        displayedItems.length > 0 ? h('div', { className: 'menu-grid' },
          displayedItems.map(function (item) {
            var cartEntry = cart[item.id];
            var currentQty = cartEntry ? cartEntry.qty : 0;

            return h('div', { key: item.id, className: 'menu-item-card' },
              h('div', null,
                h('div', { className: 'card-top-row' },
                  h('span', { className: 'card-category-badge' }, item.categoryName),
                  item.isSignature ? h('span', { className: 'card-signature-badge' }, 'Chef Signature') : null
                ),
                h('h3', { className: 'card-title' }, item.name),
                h('p', { className: 'card-desc' }, item.description),
                item.allergen ? h('p', { className: 'card-allergens' },
                  '⚠️ Contains: ' + item.allergen
                ) : null
              ),

              h('div', { className: 'card-bottom-row' },
                h('span', { className: 'card-price-value' }, item.price),

                // Interactive Add button or Stepper
                currentQty === 0
                  ? h('button', {
                      type: 'button',
                      className: 'btn-card-add',
                      onClick: function () { if (onAddToCart) onAddToCart(item); },
                      'aria-label': 'Add ' + item.name + ' to order'
                    }, '+ Add · ' + item.price)
                  : h('div', { className: 'card-stepper-box' },
                      h('button', {
                        type: 'button',
                        className: 'stepper-btn',
                        onClick: function () { if (onUpdateQuantity) onUpdateQuantity(item.id, -1); },
                        'aria-label': 'Decrease quantity'
                      }, '−'),
                      h('span', { className: 'stepper-qty' }, currentQty),
                      h('button', {
                        type: 'button',
                        className: 'stepper-btn',
                        onClick: function () { if (onUpdateQuantity) onUpdateQuantity(item.id, 1); },
                        'aria-label': 'Increase quantity'
                      }, '+')
                    )
              )
            );
          })
        ) : h('div', { className: 'empty-menu-state' },
          h('div', { className: 'empty-state-icon' }, '🔍'),
          h('h3', { className: 'empty-state-title' }, 'No dishes found matching your search'),
          h('p', { className: 'empty-state-text' }, 'Try searching for Jerk Chicken, Curry Goat, Dumplings, or clear your filters.'),
          h('button', {
            type: 'button',
            className: 'btn-primary-order',
            onClick: function () {
              if (setSearchQuery) setSearchQuery('');
              if (setSelectedCategory) setSelectedCategory('all');
              if (setDietaryFilter) setDietaryFilter('all');
            }
          }, 'Reset All Filters')
        ),

        // Bottom expander if in compact mode
        isShowingCompact && filteredItems.length > 12 ? h('div', { style: { textAlign: 'center', marginTop: '2.5rem' } },
          h('button', {
            type: 'button',
            className: 'btn-primary-order',
            onClick: function () { if (setIsCompactMode) setIsCompactMode(false); }
          }, '🍗 View All 80 Dishes & Drinks')
        ) : null
      )
    );
  }

  /* ==========================================================================
     6. COMPONENT: SIGNATURE SPOTLIGHT (Chef Jamie's 4 Specialties)
     ========================================================================== */
  function SignatureSpotlight(props) {
    var signatures = props.signatures || [];
    var cart = props.cart || {};
    var onAddToCart = props.onAddToCart;
    var onUpdateQuantity = props.onUpdateQuantity;

    return h('section', { id: 'spotlight', className: 'section spotlight-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-header' },
          h('span', { className: 'section-tag' }, 'House Specialties'),
          h('h2', { className: 'section-title' }, 'Chef Jamie\'s Signature Dishes'),
          h('p', { className: 'section-subtitle' },
            'The four pillars of Yeah Man Caribbean that keep Manchester foodies traveling to Norway Street.'
          )
        ),

        h('div', { className: 'signature-grid' },
          signatures.map(function (dish) {
            var cartEntry = cart[dish.id];
            var qty = cartEntry ? cartEntry.qty : 0;

            return h('div', { key: dish.id, className: 'spotlight-card' },
              h('div', null,
                h('span', { className: 'spotlight-badge' }, dish.tag || 'Signature'),
                h('h3', { className: 'spotlight-name' }, dish.name),
                h('p', { className: 'spotlight-desc' }, dish.description),
                h('div', { className: 'spotlight-meta-box' },
                  h('div', { style: { fontWeight: 700, color: 'var(--color-gold)' } }, dish.heatLevel),
                  h('div', null, dish.prepNote)
                )
              ),

              h('div', { className: 'card-bottom-row' },
                h('span', { className: 'card-price-value' }, dish.price),
                qty === 0
                  ? h('button', {
                      type: 'button',
                      className: 'btn-card-add',
                      onClick: function () { if (onAddToCart) onAddToCart(dish); }
                    }, '+ Add to Order')
                  : h('div', { className: 'card-stepper-box' },
                      h('button', {
                        type: 'button',
                        className: 'stepper-btn',
                        onClick: function () { if (onUpdateQuantity) onUpdateQuantity(dish.id, -1); }
                      }, '−'),
                      h('span', { className: 'stepper-qty' }, qty),
                      h('button', {
                        type: 'button',
                        className: 'stepper-btn',
                        onClick: function () { if (onUpdateQuantity) onUpdateQuantity(dish.id, 1); }
                      }, '+')
                    )
              )
            );
          })
        )
      )
    );
  }

  /* ==========================================================================
     7. COMPONENT: STORY SECTION (12+ Years Heritage & Authentic Ethos)
     ========================================================================== */
  function StorySection(props) {
    var brand = props.brand || {};

    return h('section', { id: 'story', className: 'section story-section' },
      h('div', { className: 'container' },
        h('div', { className: 'story-layout' },
          h('div', { className: 'story-text' },
            h('span', { className: 'section-tag' }, 'Our Heritage'),
            h('h2', { className: 'section-title' }, '12 Years of Uncompromising Jamaican Tradition'),
            h('p', { className: 'story-lead-p' },
              'When Chef Jamie founded Yeah Man Caribbean on Norway Street in 2012, he had one unwavering mission: to serve authentic Jamaican comfort food exactly as it is prepared across the parishes of Jamaica.'
            ),
            h('p', { className: 'story-p' },
              'We do not cut corners. Our jerk marinade is ground from fresh Scotch bonnet peppers, pimento berries, scallions, and mountain thyme, then cured into fresh poultry for 48 hours before kissing the glowing charcoal drums.'
            ),
            h('p', { className: 'story-p' },
              'Our oxtail and mutton are simmered low and slow for four hours until they melt off the bone into a luxurious, glossy gravy with plump butter beans. When you eat with us, you are part of our family.'
            ),

            h('div', { className: 'story-features-list' },
              h('div', { className: 'story-feature-item' },
                h('div', { className: 'story-feature-icon' }, '✓'),
                h('span', null, 'Traditional Jamaican charcoal smoking drums')
              ),
              h('div', { className: 'story-feature-item' },
                h('div', { className: 'story-feature-icon' }, '✓'),
                h('span', null, '100% Halal certified meats cooked in scratch-made marinades')
              ),
              h('div', { className: 'story-feature-item' },
                h('div', { className: 'story-feature-icon' }, '✓'),
                h('span', null, 'Fresh handmade dumplings and fried splits prepared daily')
              )
            )
          ),

          h('div', { className: 'story-visual' },
            h('div', { className: 'pitch-item', style: { padding: '2rem', border: '1px solid var(--border-gold)' } },
              h('h3', { className: 'pitch-item-title', style: { fontSize: '1.4rem', marginBottom: '1rem' } }, '🏆 Stretford\'s Community Anchor'),
              h('p', { className: 'story-p' },
                'For over a decade, we have proudly fed local families, Manchester United matchday travelers, nurses, teachers, and Caribbean food enthusiasts from across Greater Manchester.'
              ),
              h('p', { className: 'story-p', style: { color: 'var(--color-gold)', fontWeight: 700 } },
                '"No shortcuts, no pre-made jars. Just genuine Caribbean warmth and fire."'
              ),
              h('p', { style: { fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' } },
                '— Chef Jamie, Head Chef & Founder'
              )
            )
          )
        )
      )
    );
  }

  /* ==========================================================================
     8. COMPONENT: CATERING & POSTCODE CHECKER SECTION
     ========================================================================== */
  function CateringSection(props) {
    var packages = props.packages || [];
    var onOpenInquiry = props.onOpenInquiry;
    var fulfillment = props.fulfillment || {};
    var postcodes = fulfillment.postcodes || [];

    var enteredPostcodeState = useState('');
    var enteredPostcode = enteredPostcodeState[0];
    var setEnteredPostcode = enteredPostcodeState[1];

    var checkResultState = useState(null);
    var checkResult = checkResultState[0];
    var setCheckResult = checkResultState[1];

    function handleCheckPostcode(e) {
      if (e && e.preventDefault) e.preventDefault();
      var clean = (enteredPostcode || '').trim().toUpperCase().replace(/\s+/g, '');
      if (!clean) return;

      var match = postcodes.find(function (p) {
        var pCode = p.code.replace(/\s+/g, '');
        return clean.indexOf(pCode) === 0;
      });

      if (match) {
        setCheckResult({
          valid: true,
          message: '✓ Great news! We deliver to ' + match.code + ' (' + match.area + ') with £3.00 delivery fee (Min order £15).'
        });
      } else {
        setCheckResult({
          valid: false,
          message: 'We deliver directly to M15, M16, M17, M21, M32, M33, M41, M5, M50. You are welcome to collect your order for free in 15–20 mins!'
        });
      }
    }

    return h('section', { id: 'catering', className: 'section catering-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-header' },
          h('span', { className: 'section-tag' }, 'Events & Group Feasts'),
          h('h2', { className: 'section-title' }, 'Party Platters & Event Catering'),
          h('p', { className: 'section-subtitle' },
            'Bring the warmth and flavors of Yeah Man Caribbean to your birthday, corporate lunch, or celebration.'
          )
        ),

        // Catering Packages
        h('div', { className: 'catering-cards-grid' },
          packages.map(function (pkg, index) {
            var isFeatured = index === 1;
            return h('div', {
              key: pkg.id,
              className: 'catering-card' + (isFeatured ? ' featured' : '')
            },
              h('div', null,
                h('div', { className: 'catering-card-header' },
                  h('div', { className: 'catering-serves' }, pkg.serves),
                  h('h3', { className: 'catering-name' }, pkg.name),
                  h('div', { className: 'catering-price' }, pkg.price)
                ),
                h('p', { className: 'story-p', style: { fontSize: '0.88rem', marginBottom: '1rem' } }, pkg.description),
                h('ul', { className: 'catering-items-list' },
                  pkg.items.map(function (item, i) {
                    return h('li', { key: i, className: 'catering-item' }, item);
                  })
                )
              ),

              h('button', {
                type: 'button',
                className: 'btn-catering-inquire',
                onClick: function () { if (onOpenInquiry) onOpenInquiry(pkg.name); }
              }, 'Inquire for Catering')
            );
          })
        ),

        // Postcode Delivery Validator Box
        h('div', { className: 'postcode-checker-box' },
          h('h3', { style: { fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' } },
            '🛵 Check If We Deliver To Your Manchester Postcode'
          ),
          h('p', { style: { color: 'var(--color-text-secondary)', fontSize: '0.95rem' } },
            'Enter your postcode below to verify direct delivery availability in seconds.'
          ),

          h('form', { onSubmit: handleCheckPostcode, className: 'checker-input-row' },
            h('input', {
              type: 'text',
              className: 'checker-input',
              placeholder: 'e.g. M32 0JN or M16',
              value: enteredPostcode,
              onChange: function (e) { setEnteredPostcode(e.target.value); },
              'aria-label': 'Enter Postcode'
            }),
            h('button', { type: 'submit', className: 'btn-check-postcode' }, 'Check Postcode')
          ),

          checkResult ? h('div', {
            className: 'postcode-result-badge ' + (checkResult.valid ? 'success' : 'warning')
          }, checkResult.message) : null,

          h('div', { style: { marginTop: '1rem' } },
            h('span', { style: { fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' } },
              'Direct Delivery Districts Supported:'
            ),
            h('div', { className: 'supported-districts-list' },
              postcodes.map(function (p) {
                return h('span', { key: p.code, className: 'district-chip' }, p.code + ' (' + p.area + ')');
              })
            )
          )
        )
      )
    );
  }

  /* ==========================================================================
     9. COMPONENT: REVIEWS SECTION
     ========================================================================== */
  function ReviewsSection(props) {
    var reviews = props.reviews || [];

    return h('section', { id: 'reviews', className: 'section reviews-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-header' },
          h('span', { className: 'section-tag' }, 'Verified Testimonials'),
          h('h2', { className: 'section-title' }, 'What Manchester Says About Us'),
          h('p', { className: 'section-subtitle' },
            'Over 2,150 genuine 5-star reviews from Stretford neighbors and food critics.'
          )
        ),

        h('div', { className: 'reviews-grid' },
          reviews.map(function (rev) {
            return h('div', { key: rev.id, className: 'review-card' },
              h('div', null,
                h('div', { className: 'review-rating-stars' }, '★★★★★'),
                h('p', { className: 'review-text' }, '“' + rev.text + '”')
              ),
              h('div', { className: 'review-author-row' },
                h('div', null,
                  h('span', { className: 'review-author-name' }, rev.author),
                  h('span', { style: { fontSize: '0.78rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' } }, rev.location)
                ),
                h('span', { className: 'review-source-tag' }, rev.source)
              )
            );
          })
        )
      )
    );
  }

  /* ==========================================================================
     10. COMPONENT: LOCATION & HOURS SCHEDULE
     ========================================================================== */
  function LocationHours(props) {
    var brand = props.brand || {};
    var hours = props.hours || {};
    var schedule = hours.schedule || [];

    var todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];

    return h('section', { id: 'location', className: 'section location-section' },
      h('div', { className: 'container' },
        h('div', { className: 'section-header' },
          h('span', { className: 'section-tag' }, 'Visit Us In Stretford'),
          h('h2', { className: 'section-title' }, 'Hours & Collection Point'),
          h('p', { className: 'section-subtitle' },
            'Fresh batches cooked continuously throughout the day on Norway Street.'
          )
        ),

        h('div', { className: 'location-layout' },
          // Schedule Card
          h('div', { className: 'schedule-card' },
            h('h3', { style: { fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)' } },
              '⏰ Weekly Operating Hours'
            ),
            h('div', { className: 'hours-table' },
              schedule.map(function (row) {
                var isToday = row.day === todayName;
                return h('div', {
                  key: row.day,
                  className: 'hours-row' + (isToday ? ' today' : '')
                },
                  h('span', { className: 'hours-day' }, row.day + (isToday ? ' (Today)' : '')),
                  h('span', { className: 'hours-times' },
                    row.isOpen ? ('Coll: ' + row.collection + ' | Del: ' + row.delivery) : 'Closed'
                  )
                );
              })
            ),
            h('p', { style: { fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '1rem' } },
              hours.notice || 'Pre-orders welcome via phone or WhatsApp!'
            )
          ),

          // Map & Contact Card
          h('div', { className: 'map-card' },
            h('div', { className: 'map-address-box' },
              h('h3', { className: 'address-headline' }, '📍 ' + (brand.name || 'Yeah Man Caribbean')),
              h('p', { className: 'address-subtext' }, brand.address || '63 Norway Street, Stretford, Manchester, M32 0JN'),
              h('p', { className: 'address-subtext', style: { marginTop: '0.5rem', fontWeight: 700 } },
                '📞 Telephone: ' + (brand.phone || '0161 864 3259')
              ),
              h('p', { className: 'address-subtext', style: { color: 'var(--color-palm-green-light)', fontWeight: 600 } },
                '🏆 ' + (brand.hygieneRating || 'Food Hygiene Rating: 5 (Very Good)')
              )
            ),

            h('a', {
              href: brand.googleMapsUrl || 'https://maps.google.com/?q=63+Norway+Street,+Stretford,+Manchester+M32+0JN',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'btn-open-maps'
            }, '🗺️ Open in Google Maps Directions')
          )
        ),

        // Direct Pitch Banner
        h('div', { className: 'pitch-banner' },
          h('h3', { style: { fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', color: 'var(--color-text-primary)' } },
            'Why Order Directly from Yeah Man?'
          ),
          h('p', { style: { textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '0.35rem' } },
            'Save Money, Support Local Independent Hospitality & Get Hotter Food Faster'
          ),

          h('div', { className: 'pitch-grid' },
            h('div', { className: 'pitch-item' },
              h('h4', { className: 'pitch-item-title' }, 'Direct Kitchen Priority'),
              h('p', { className: 'pitch-item-desc' }, 'Cooked fresh on Norway Street and packaged immediately without waiting for aggregator couriers.')
            ),
            h('div', { className: 'pitch-item' },
              h('h4', { className: 'pitch-item-title' }, 'Save Local Commission'),
              h('p', { className: 'pitch-item-desc' }, 'Apps take 15% to 30% from every order. Ordering direct keeps 100% of your spend supporting Jamie & staff.')
            ),
            h('div', { className: 'pitch-item' },
              h('h4', { className: 'pitch-item-title' }, 'Custom Gravy & Spices'),
              h('p', { className: 'pitch-item-desc' }, 'Ask for extra sauce, crispy skin, or custom rice choices directly via WhatsApp or phone call.')
            ),
            h('div', { className: 'pitch-item' },
              h('h4', { className: 'pitch-item-title' }, 'Zero Hidden Surcharges'),
              h('p', { className: 'pitch-item-desc' }, 'No inflated menu prices, small order penalty fees, or third-party service markups.')
            )
          )
        )
      )
    );
  }

  /* ==========================================================================
     11. COMPONENT: INTERACTIVE CART DRAWER
     ========================================================================== */
  function CartDrawer(props) {
    var isOpen = props.isOpen;
    var onClose = props.onClose;
    var cart = props.cart || {};
    var onUpdateQuantity = props.onUpdateQuantity;
    var onClearCart = props.onClearCart;
    var brand = props.brand || {};
    var fulfillment = props.fulfillment || {};

    var orderType = props.orderType || 'collection';
    var setOrderType = props.setOrderType;
    var orderNotes = props.orderNotes || '';
    var setOrderNotes = props.setOrderNotes;

    var cartItems = Object.values(cart);
    var subtotal = cartItems.reduce(function (sum, entry) {
      return sum + (entry.item.priceNum * entry.qty);
    }, 0);

    var deliveryFee = orderType === 'delivery' ? 3.00 : 0.00;
    var isMinOrderSatisfied = orderType === 'collection' || subtotal >= 15.00;
    var grandTotal = subtotal + deliveryFee;

    // Estimated aggregator markup saving (~20%)
    var estimatedSavings = (subtotal * 0.20).toFixed(2);

    // Format WhatsApp order text
    function getWhatsAppUrl() {
      var lines = [];
      lines.push('*YEAH MAN CARIBBEAN — DIRECT ORDER*');
      lines.push('Fulfillment: ' + (orderType === 'delivery' ? 'Local Delivery (£3.00)' : 'Collection Takeaway (FREE)'));
      lines.push('--------------------------------');
      cartItems.forEach(function (e) {
        lines.push(e.qty + 'x ' + e.item.name + ' (£' + (e.item.priceNum * e.qty).toFixed(2) + ')');
      });
      lines.push('--------------------------------');
      lines.push('Food Subtotal: £' + subtotal.toFixed(2));
      if (orderType === 'delivery') {
        lines.push('Delivery Fee: £3.00');
      }
      lines.push('*Total Due: £' + grandTotal.toFixed(2) + '*');
      if (orderNotes) {
        lines.push('Notes: ' + orderNotes);
      }
      lines.push('--------------------------------');
      lines.push('Please confirm order acceptance and estimated ready time.');

      var fullText = encodeURIComponent(lines.join('\n'));
      return 'https://wa.me/' + (brand.whatsappNumber || '441618643259') + '?text=' + fullText;
    }

    return h(React.Fragment, null,
      // Backdrop
      h('div', {
        className: 'cart-backdrop' + (isOpen ? ' open' : ''),
        onClick: onClose,
        'aria-hidden': !isOpen
      }),

      // Drawer panel
      h('aside', {
        className: 'cart-drawer' + (isOpen ? ' open' : ''),
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Your Order Basket'
      },
        // Header
        h('div', { className: 'cart-header' },
          h('h3', { className: 'cart-header-title' },
            '🛒 Your Basket (' + cartItems.reduce(function (c, i) { return c + i.qty; }, 0) + ')'
          ),
          h('button', {
            type: 'button',
            className: 'cart-close-btn',
            onClick: onClose,
            'aria-label': 'Close basket'
          }, '✕')
        ),

        // Fulfillment Type Toggle
        h('div', { className: 'fulfillment-segmented-toggle' },
          h('button', {
            type: 'button',
            className: 'toggle-option-btn' + (orderType === 'collection' ? ' active' : ''),
            onClick: function () { if (setOrderType) setOrderType('collection'); }
          },
            h('span', null, '🚶 Free Collection'),
            h('span', { className: 'toggle-sub' }, 'Ready in 15–20 Mins')
          ),
          h('button', {
            type: 'button',
            className: 'toggle-option-btn' + (orderType === 'delivery' ? ' active' : ''),
            onClick: function () { if (setOrderType) setOrderType('delivery'); }
          },
            h('span', null, '🛵 Local Delivery'),
            h('span', { className: 'toggle-sub' }, '£3.00 · Min £15.00')
          )
        ),

        // Cart Items List
        h('div', { className: 'cart-items-container' },
          cartItems.length === 0 ? h('div', { className: 'cart-empty-message' },
            h('div', { className: 'cart-empty-icon' }, '🍗'),
            h('h4', { style: { color: 'var(--color-text-primary)', marginBottom: '0.5rem' } }, 'Your basket is empty'),
            h('p', null, 'Explore our authentic 80-item menu and add your favorite jerk chicken, curry goat, or dumplings.')
          ) : cartItems.map(function (entry) {
            var item = entry.item;
            var itemTotal = (item.priceNum * entry.qty).toFixed(2);

            return h('div', { key: item.id, className: 'cart-item-row' },
              h('div', { className: 'cart-item-details' },
                h('div', { className: 'cart-item-name' }, item.name),
                h('div', { className: 'cart-item-price-unit' }, item.price + ' each')
              ),
              h('div', { className: 'cart-item-stepper' },
                h('button', {
                  type: 'button',
                  className: 'cart-stepper-btn',
                  onClick: function () { if (onUpdateQuantity) onUpdateQuantity(item.id, -1); },
                  'aria-label': 'Decrease ' + item.name
                }, '−'),
                h('span', { className: 'cart-stepper-qty' }, entry.qty),
                h('button', {
                  type: 'button',
                  className: 'cart-stepper-btn',
                  onClick: function () { if (onUpdateQuantity) onUpdateQuantity(item.id, 1); },
                  'aria-label': 'Increase ' + item.name
                }, '+')
              ),
              h('div', { className: 'cart-item-total' }, '£' + itemTotal)
            );
          }),

          // Special Instructions textarea
          cartItems.length > 0 ? h('div', { style: { marginTop: '1rem' } },
            h('label', { className: 'form-label' }, 'Special Instructions / Delivery Notes:'),
            h('textarea', {
              rows: 2,
              placeholder: 'e.g. Extra jerk gravy, no onions, delivery address details...',
              value: orderNotes,
              onChange: function (e) { if (setOrderNotes) setOrderNotes(e.target.value); }
            })
          ) : null
        ),

        // Cart Footer & Checkout CTAs
        cartItems.length > 0 ? h('div', { className: 'cart-footer' },
          h('div', { className: 'cart-calc-row' },
            h('span', null, 'Food Subtotal:'),
            h('span', null, '£' + subtotal.toFixed(2))
          ),
          h('div', { className: 'cart-calc-row' },
            h('span', null, orderType === 'delivery' ? 'Delivery Fee (M32 & Local):' : 'Collection Fee:'),
            h('span', null, orderType === 'delivery' ? '£3.00' : 'FREE')
          ),
          h('div', { className: 'cart-calc-row total-row' },
            h('span', null, 'Order Total:'),
            h('span', { className: 'total-amount' }, '£' + grandTotal.toFixed(2))
          ),

          // Savings notice
          h('div', { className: 'cart-savings-notice' },
            '🎉 You save ~£' + estimatedSavings + ' by ordering direct without Just Eat app markups!'
          ),

          // Min delivery warning if needed
          !isMinOrderSatisfied ? h('div', { style: { color: 'var(--color-spice-coral)', fontSize: '0.82rem', textAlign: 'center', fontWeight: 700 } },
            '⚠️ Minimum delivery order is £15.00. Please add £' + (15.00 - subtotal).toFixed(2) + ' more or select Free Collection.'
          ) : null,

          // Primary WhatsApp Dispatch
          h('a', {
            href: isMinOrderSatisfied ? getWhatsAppUrl() : '#',
            target: isMinOrderSatisfied ? '_blank' : '_self',
            rel: 'noopener noreferrer',
            className: 'btn-cart-whatsapp',
            style: { opacity: isMinOrderSatisfied ? 1 : 0.5, pointerEvents: isMinOrderSatisfied ? 'auto' : 'none' }
          }, '💬 Send Order via WhatsApp'),

          // Direct Phone Call
          h('a', {
            href: 'tel:' + (brand.phoneDialer || '+441618643259'),
            className: 'btn-cart-phone'
          }, '📞 Call Shop to Dictate Order (' + (brand.phone || '0161 864 3259') + ')'),

          // Clear cart link
          h('button', {
            type: 'button',
            style: { fontSize: '0.78rem', color: 'var(--color-text-muted)', textDecoration: 'underline', marginTop: '0.2rem', cursor: 'pointer' },
            onClick: onClearCart
          }, 'Empty Basket')
        ) : null
      )
    );
  }

  /* ==========================================================================
     12. COMPONENT: FLOATING CART PILL
     ========================================================================== */
  function FloatingCartPill(props) {
    var cartCount = props.cartCount || 0;
    var cartTotal = props.cartTotal || 0;
    var onOpenCart = props.onOpenCart;

    if (cartCount === 0) return null;

    return h('button', {
      type: 'button',
      className: 'floating-cart-pill',
      onClick: onOpenCart,
      'aria-label': 'View Order Basket, ' + cartCount + ' items, £' + cartTotal.toFixed(2)
    },
      h('span', null, '🛒 ' + cartCount + ' item' + (cartCount > 1 ? 's' : '')),
      h('span', null, '· £' + cartTotal.toFixed(2)),
      h('span', { style: { marginLeft: '0.25rem' } }, 'View Basket →')
    );
  }

  /* ==========================================================================
     13. COMPONENT: MOBILE STICKY QUICK BAR (<= 768px)
     ========================================================================== */
  function MobileQuickBar(props) {
    var brand = props.brand || {};
    var cartCount = props.cartCount || 0;
    var onOpenCart = props.onOpenCart;

    return h('div', { className: 'mobile-quick-bar', role: 'navigation', 'aria-label': 'Mobile Bottom Bar' },
      h('a', {
        href: 'tel:' + (brand.phoneDialer || '+441618643259'),
        className: 'mobile-bar-action'
      },
        h('span', { className: 'action-icon' }, '📞'),
        h('span', null, 'Call Shop')
      ),

      h('a', {
        href: '#menu',
        className: 'mobile-bar-action'
      },
        h('span', { className: 'action-icon' }, '🍗'),
        h('span', null, 'Menu (80)')
      ),

      h('a', {
        href: 'https://wa.me/' + (brand.whatsappNumber || '441618643259') + '?text=Hi%20Yeah%20Man%20Caribbean,%20I%20would%20like%20to%20place%20an%20order',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'mobile-bar-action'
      },
        h('span', { className: 'action-icon' }, '💬'),
        h('span', null, 'WhatsApp')
      ),

      h('button', {
        type: 'button',
        className: 'mobile-bar-action',
        onClick: onOpenCart
      },
        h('span', { className: 'action-icon' }, '🛒'),
        h('span', null, 'Basket'),
        cartCount > 0 ? h('span', { className: 'mobile-bar-badge' }, cartCount) : null
      )
    );
  }

  /* ==========================================================================
     14. COMPONENT: INQUIRY MODAL (Catering Requests)
     ========================================================================== */
  function InquiryModal(props) {
    var isOpen = props.isOpen;
    var onClose = props.onClose;
    var packageName = props.packageName || 'General Catering Inquiry';

    var nameState = useState('');
    var name = nameState[0];
    var setName = nameState[1];

    var phoneState = useState('');
    var phone = phoneState[0];
    var setPhone = phoneState[1];

    var dateState = useState('');
    var date = dateState[0];
    var setDate = dateState[1];

    var guestsState = useState('15');
    var guests = guestsState[0];
    var setGuests = guestsState[1];

    var submittedState = useState(false);
    var submitted = submittedState[0];
    var setSubmitted = submittedState[1];

    function handleSubmit(e) {
      if (e && e.preventDefault) e.preventDefault();
      setSubmitted(true);
      setTimeout(function () {
        setSubmitted(false);
        if (onClose) onClose();
      }, 2500);
    }

    if (!isOpen) return null;

    return h('div', {
      className: 'modal-backdrop open',
      onClick: onClose,
      role: 'dialog',
      'aria-modal': 'true'
    },
      h('div', {
        className: 'modal-dialog',
        onClick: function (e) { e.stopPropagation(); }
      },
        h('div', { className: 'modal-header' },
          h('h3', { className: 'modal-title' }, '🎉 Catering Inquiry: ' + packageName),
          h('button', {
            type: 'button',
            className: 'drawer-close-btn',
            onClick: onClose
          }, '✕')
        ),

        submitted ? h('div', { style: { textAlign: 'center', padding: '2rem 1rem' } },
          h('div', { style: { fontSize: '3rem', marginBottom: '1rem' } }, '✅'),
          h('h4', { style: { color: 'var(--color-palm-green-light)', fontSize: '1.25rem', marginBottom: '0.5rem' } },
            'Inquiry Received!'
          ),
          h('p', null, 'Chef Jamie will contact you shortly to confirm your booking and menu choices.')
        ) : h('form', { onSubmit: handleSubmit },
          h('div', { className: 'form-group' },
            h('label', { className: 'form-label' }, 'Your Name:'),
            h('input', {
              type: 'text',
              required: true,
              value: name,
              onChange: function (e) { setName(e.target.value); }
            })
          ),
          h('div', { className: 'form-group' },
            h('label', { className: 'form-label' }, 'Phone Number:'),
            h('input', {
              type: 'tel',
              required: true,
              value: phone,
              onChange: function (e) { setPhone(e.target.value); }
            })
          ),
          h('div', { className: 'form-group' },
            h('label', { className: 'form-label' }, 'Event Date:'),
            h('input', {
              type: 'date',
              required: true,
              value: date,
              onChange: function (e) { setDate(e.target.value); }
            })
          ),
          h('div', { className: 'form-group' },
            h('label', { className: 'form-label' }, 'Estimated Number of Guests:'),
            h('select', {
              value: guests,
              onChange: function (e) { setGuests(e.target.value); }
            },
              h('option', { value: '6-10' }, '6 – 10 Guests (The Lime Platter)'),
              h('option', { value: '12-20' }, '12 – 20 Guests (Kingston Feast)'),
              h('option', { value: '25-50' }, '25 – 50 Guests (Carnival Spread)'),
              h('option', { value: '50+' }, '50+ Guests (Custom Event)')
            )
          ),
          h('button', { type: 'submit', className: 'btn-submit-inquiry' },
            'Submit Catering Request'
          )
        )
      )
    );
  }

  /* ==========================================================================
     15. COMPONENT: FOOTER
     ========================================================================== */
  function Footer(props) {
    var brand = props.brand || {};

    return h('footer', { className: 'site-footer', role: 'contentinfo' },
      h('div', { className: 'container' },
        h('div', { className: 'footer-grid' },
          // Col 1: Brand
          h('div', null,
            h('div', { className: 'brand-lockup', style: { marginBottom: '1rem' } },
              h('div', { className: 'brand-badge' }, brand.monogram || 'YM'),
              h('div', { className: 'brand-text-group' },
                h('span', { className: 'brand-title' }, brand.name || 'YEAH MAN CARIBBEAN'),
                h('span', { className: 'brand-subtitle' }, 'Stretford · Manchester')
              )
            ),
            h('p', { style: { fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' } },
              brand.valueProp || 'Authentic Jamaican soul food cooked fresh daily in Stretford for over 12 years.'
            )
          ),

          // Col 2: Navigation
          h('div', null,
            h('h4', { className: 'footer-col-title' }, 'Quick Navigation'),
            h('ul', { className: 'footer-links-list' },
              h('li', null, h('a', { href: '#hero', className: 'footer-link' }, 'Home')),
              h('li', null, h('a', { href: '#menu', className: 'footer-link' }, 'Our 80-Item Menu')),
              h('li', null, h('a', { href: '#spotlight', className: 'footer-link' }, 'Signature Dishes')),
              h('li', null, h('a', { href: '#catering', className: 'footer-link' }, 'Catering Packages')),
              h('li', null, h('a', { href: '#location', className: 'footer-link' }, 'Hours & Directions'))
            )
          ),

          // Col 3: Delivery Districts
          h('div', null,
            h('h4', { className: 'footer-col-title' }, 'Delivery Areas'),
            h('p', { style: { fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' } },
              'Direct local delivery to M15, M16, M17, M21, M32, M33, M41, M5, M50. Delivery fee £3.00, minimum order £15.00.'
            ),
            h('p', { style: { fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--color-gold)' } },
              'Free Collection for all orders (ready in 15–20 mins).'
            )
          ),

          // Col 4: Contact & Direct Ordering
          h('div', null,
            h('h4', { className: 'footer-col-title' }, 'Direct Contact'),
            h('p', { style: { fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' } },
              '📍 ' + (brand.address || '63 Norway Street, Stretford, Manchester, M32 0JN')
            ),
            h('p', { style: { fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' } },
              '📞 Telephone: ' + (brand.phone || '0161 864 3259')
            ),
            h('p', { style: { fontSize: '0.88rem', color: 'var(--color-whatsapp)', fontWeight: 700 } },
              '💬 WhatsApp: 0161 864 3259'
            )
          )
        ),

        h('div', { className: 'footer-bottom-row' },
          h('span', null,
            '© ' + new Date().getFullYear() + ' Yeah Man Caribbean. All rights reserved. Registered in England.'
          ),
          h('span', null,
            'Food Allergies Notice: Please inform us of any dietary requirements before ordering.'
          )
        )
      )
    );
  }

  /* ==========================================================================
     16. ROOT APP COMPONENT (State Orchestrator)
     ========================================================================== */
  function App() {
    var brand = DATA.brand || {};
    var hours = DATA.hours || {};
    var fulfillment = DATA.fulfillment || {};
    var menuCategories = DATA.menuCategories || [];
    var menuItems = DATA.menuItems || [];
    var signatures = DATA.signatureSpotlight || [];
    var cateringPackages = DATA.cateringPackages || [];
    var reviews = DATA.reviews || [];

    // App state
    var drawerOpenState = useState(false);
    var drawerOpen = drawerOpenState[0];
    var setDrawerOpen = drawerOpenState[1];

    var cartOpenState = useState(false);
    var cartOpen = cartOpenState[0];
    var setCartOpen = cartOpenState[1];

    var cartState = useState({});
    var cart = cartState[0];
    var setCart = cartState[1];

    var searchQueryState = useState('');
    var searchQuery = searchQueryState[0];
    var setSearchQuery = searchQueryState[1];

    var selectedCategoryState = useState('all');
    var selectedCategory = selectedCategoryState[0];
    var setSelectedCategory = selectedCategoryState[1];

    var dietaryFilterState = useState('all');
    var dietaryFilter = dietaryFilterState[0];
    var setDietaryFilter = dietaryFilterState[1];

    var isCompactModeState = useState(true);
    var isCompactMode = isCompactModeState[0];
    var setIsCompactMode = isCompactModeState[1];

    var orderTypeState = useState('collection');
    var orderType = orderTypeState[0];
    var setOrderType = orderTypeState[1];

    var orderNotesState = useState('');
    var orderNotes = orderNotesState[0];
    var setOrderNotes = orderNotesState[1];

    var inquiryModalOpenState = useState(false);
    var inquiryModalOpen = inquiryModalOpenState[0];
    var setInquiryModalOpen = inquiryModalOpenState[1];

    var inquiryPackageState = useState('');
    var inquiryPackage = inquiryPackageState[0];
    var setInquiryPackage = inquiryPackageState[1];

    var activeSectionState = useState('hero');
    var activeSection = activeSectionState[0];
    var setActiveSection = activeSectionState[1];

    // Live opening status
    var liveStatus = useMemo(function () {
      return getLiveOpeningStatus(hours);
    }, [hours]);

    // Cart calculations
    var cartEntries = Object.values(cart);
    var cartCount = cartEntries.reduce(function (sum, e) { return sum + e.qty; }, 0);
    var cartTotal = cartEntries.reduce(function (sum, e) { return sum + (e.item.priceNum * e.qty); }, 0);

    // Cart actions
    var handleAddToCart = useCallback(function (item) {
      setCart(function (prev) {
        var updated = Object.assign({}, prev);
        if (updated[item.id]) {
          updated[item.id] = {
            item: item,
            qty: updated[item.id].qty + 1
          };
        } else {
          updated[item.id] = {
            item: item,
            qty: 1
          };
        }
        return updated;
      });
    }, []);

    var handleUpdateQuantity = useCallback(function (itemId, delta) {
      setCart(function (prev) {
        var updated = Object.assign({}, prev);
        if (!updated[itemId]) return prev;
        var newQty = updated[itemId].qty + delta;
        if (newQty <= 0) {
          delete updated[itemId];
        } else {
          updated[itemId] = {
            item: updated[itemId].item,
            qty: newQty
          };
        }
        return updated;
      });
    }, []);

    var handleClearCart = useCallback(function () {
      setCart({});
    }, []);

    var handleOpenInquiry = useCallback(function (pkgName) {
      setInquiryPackage(pkgName);
      setInquiryModalOpen(true);
    }, []);

    // Prevent body scroll when drawer or cart is open
    useEffect(function () {
      if (typeof document === 'undefined') return;
      if (drawerOpen) {
        document.body.classList.add('drawer-open');
      } else {
        document.body.classList.remove('drawer-open');
      }
      if (cartOpen) {
        document.body.classList.add('cart-open');
      } else {
        document.body.classList.remove('cart-open');
      }
      return function () {
        document.body.classList.remove('drawer-open');
        document.body.classList.remove('cart-open');
      };
    }, [drawerOpen, cartOpen]);

    return h('div', { className: 'site-wrapper' },
      // 1. Sticky Navbar
      h(Navbar, {
        brand: brand,
        cartCount: cartCount,
        cartTotal: cartTotal,
        drawerOpen: drawerOpen,
        activeSection: activeSection,
        onToggleDrawer: function () { setDrawerOpen(!drawerOpen); },
        onOpenCart: function () { setCartOpen(true); }
      }),

      // 2. Mobile Drawer (Outside header via React.Fragment to fix squashed bug)
      h(MobileDrawer, {
        isOpen: drawerOpen,
        onClose: function () { setDrawerOpen(false); },
        brand: brand,
        onOpenCart: function () { setCartOpen(true); }
      }),

      // 3. Hero Section
      h(Hero, {
        brand: brand,
        liveStatus: liveStatus,
        onAddToCart: handleAddToCart,
        onOpenCart: function () { setCartOpen(true); }
      }),

      // 4. Quick Info Bar
      h(QuickInfoBar, {
        brand: brand,
        liveStatus: liveStatus
      }),

      // 5. Menu Catalog with Dedicated Search & Compact Mode
      h(MenuCatalog, {
        categories: menuCategories,
        items: menuItems,
        cart: cart,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        dietaryFilter: dietaryFilter,
        setDietaryFilter: setDietaryFilter,
        isCompactMode: isCompactMode,
        setIsCompactMode: setIsCompactMode,
        onAddToCart: handleAddToCart,
        onUpdateQuantity: handleUpdateQuantity
      }),

      // 6. Signature Spotlight
      h(SignatureSpotlight, {
        signatures: signatures,
        cart: cart,
        onAddToCart: handleAddToCart,
        onUpdateQuantity: handleUpdateQuantity
      }),

      // 7. Heritage Story
      h(StorySection, {
        brand: brand
      }),

      // 8. Catering & Postcode Validator
      h(CateringSection, {
        packages: cateringPackages,
        fulfillment: fulfillment,
        onOpenInquiry: handleOpenInquiry
      }),

      // 9. Verified Customer Reviews
      h(ReviewsSection, {
        reviews: reviews
      }),

      // 10. Location, Schedule & Pitch Banner
      h(LocationHours, {
        brand: brand,
        hours: hours
      }),

      // 11. Interactive Cart Drawer
      h(CartDrawer, {
        isOpen: cartOpen,
        onClose: function () { setCartOpen(false); },
        cart: cart,
        onUpdateQuantity: handleUpdateQuantity,
        onClearCart: handleClearCart,
        brand: brand,
        fulfillment: fulfillment,
        orderType: orderType,
        setOrderType: setOrderType,
        orderNotes: orderNotes,
        setOrderNotes: setOrderNotes
      }),

      // 12. Floating Basket Pill
      h(FloatingCartPill, {
        cartCount: cartCount,
        cartTotal: cartTotal,
        onOpenCart: function () { setCartOpen(true); }
      }),

      // 13. Mobile Bottom Quick Bar
      h(MobileQuickBar, {
        brand: brand,
        cartCount: cartCount,
        onOpenCart: function () { setCartOpen(true); }
      }),

      // 14. Catering Inquiry Modal
      h(InquiryModal, {
        isOpen: inquiryModalOpen,
        packageName: inquiryPackage,
        onClose: function () { setInquiryModalOpen(false); }
      }),

      // 15. Footer
      h(Footer, {
        brand: brand
      })
    );
  }

  // Mount React 18 Application in Browser
  if (typeof document !== 'undefined') {
    var mountNode = document.getElementById('root');
    if (mountNode && ReactDOM && ReactDOM.createRoot) {
      var root = ReactDOM.createRoot(mountNode);
      root.render(h(App, null));
    } else if (mountNode && ReactDOM && ReactDOM.render) {
      ReactDOM.render(h(App, null), mountNode);
    }
  }

  // Export module for testing suites
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      Navbar: Navbar,
      MobileDrawer: MobileDrawer,
      Hero: Hero,
      QuickInfoBar: QuickInfoBar,
      MenuCatalog: MenuCatalog,
      SignatureSpotlight: SignatureSpotlight,
      StorySection: StorySection,
      CateringSection: CateringSection,
      ReviewsSection: ReviewsSection,
      LocationHours: LocationHours,
      CartDrawer: CartDrawer,
      FloatingCartPill: FloatingCartPill,
      MobileQuickBar: MobileQuickBar,
      InquiryModal: InquiryModal,
      Footer: Footer,
      App: App
    };
  }
})();
