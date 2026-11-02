/* ==========================================================================
   CAFFÈ NERO — ENTERPRISE REACT 18 APPLICATION (POST-UX AUDIT EDITION)
   Components:
     - <Icon /> (Architectural Vector SVG System)
     - <UtilityBar /> & <Header />
     - <HeroSection /> + <QuickOrderExpressBar />
     - <MenuExplorerSection /> (with Allergen Exclusion Matrix & Dietary Filters)
     - <CoffeeMatchmakerSection /> (Interactive 3-Step Barista Recommender)
     - <LoyaltyWalletSection /> (9-Stamp Card + Flippable In-Store QR Pass)
     - <StoreLocatorSection /> (Interactive SVG Radar Map + Workspace Telemetry)
     - <RoasterySubscriptionSection /> (Grind Configurator + Per-Cup Costing)
     - <CustomizerModal />, <PitchAuditModal />, <OrderSuccessModal />, <CartDrawer />
   ========================================================================== */

(function () {
  const { useState, useMemo, useEffect, createElement: h, Fragment } = window.React;
  const { createRoot } = window.ReactDOM;
  const DATA = window.NERO_DATA;

  // ==========================================================================
  // 1. ARCHITECTURAL SVG ICON COMPONENT (<Icon />)
  // ==========================================================================
  function Icon({ name, size = 16, color = 'currentColor' }) {
    const props = {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: 1.85,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'icon-svg',
      'aria-hidden': 'true'
    };

    switch (name) {
      case 'coffee':
        return h('svg', props,
          h('path', { d: 'M17 8h1a4 4 0 1 1 0 8h-1' }),
          h('path', { d: 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z' }),
          h('line', { x1: 6, y1: 2, x2: 6, y2: 4 }),
          h('line', { x1: 10, y1: 2, x2: 10, y2: 4 }),
          h('line', { x1: 14, y1: 2, x2: 14, y2: 4 })
        );
      case 'pin':
        return h('svg', props,
          h('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
          h('circle', { cx: 12, cy: 10, r: 3 })
        );
      case 'bag':
        return h('svg', props,
          h('path', { d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' }),
          h('path', { d: 'M3 6h18' }),
          h('path', { d: 'M16 10a4 4 0 0 1-8 0' })
        );
      case 'stamp':
      case 'award':
        return h('svg', props,
          h('circle', { cx: 12, cy: 8, r: 6 }),
          h('path', { d: 'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11' })
        );
      case 'sparkle':
        return h('svg', props,
          h('path', { d: 'm12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z' })
        );
      case 'leaf':
        return h('svg', props,
          h('path', { d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' }),
          h('path', { d: 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' })
        );
      case 'wifi':
        return h('svg', props,
          h('path', { d: 'M12 20h.01' }),
          h('path', { d: 'M2 8.82a15 15 0 0 1 20 0' }),
          h('path', { d: 'M5 12.859a10 10 0 0 1 14 0' }),
          h('path', { d: 'M8.5 16.429a5 5 0 0 1 7 0' })
        );
      case 'sun':
        return h('svg', props,
          h('circle', { cx: 12, cy: 12, r: 4 }),
          h('path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' })
        );
      case 'search':
        return h('svg', props,
          h('circle', { cx: 11, cy: 11, r: 8 }),
          h('path', { d: 'm21 21-4.3-4.3' })
        );
      case 'check':
        return h('svg', props,
          h('path', { d: 'M20 6 9 17l-5-5' })
        );
      case 'close':
        return h('svg', props,
          h('path', { d: 'M18 6 6 18M6 6l12 12' })
        );
      case 'sliders':
        return h('svg', props,
          h('line', { x1: 4, y1: 21, x2: 4, y2: 14 }),
          h('line', { x1: 4, y1: 10, x2: 4, y2: 3 }),
          h('line', { x1: 12, y1: 21, x2: 12, y2: 12 }),
          h('line', { x1: 12, y1: 8, x2: 12, y2: 3 }),
          h('line', { x1: 20, y1: 21, x2: 20, y2: 16 }),
          h('line', { x1: 20, y1: 12, x2: 20, y2: 3 }),
          h('line', { x1: 2, y1: 14, x2: 6, y2: 14 }),
          h('line', { x1: 10, y1: 8, x2: 14, y2: 8 }),
          h('line', { x1: 18, y1: 16, x2: 22, y2: 16 })
        );
      case 'shield':
        return h('svg', props,
          h('path', { d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' })
        );
      case 'qr':
        return h('svg', props,
          h('rect', { width: 5, height: 5, x: 3, y: 3, rx: 1 }),
          h('rect', { width: 5, height: 5, x: 16, y: 3, rx: 1 }),
          h('rect', { width: 5, height: 5, x: 3, y: 16, rx: 1 }),
          h('path', { d: 'M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1' })
        );
      case 'clock':
        return h('svg', props,
          h('circle', { cx: 12, cy: 12, r: 10 }),
          h('polyline', { points: '12 6 12 12 16 14' })
        );
      case 'chart':
        return h('svg', props,
          h('line', { x1: 18, y1: 20, x2: 18, y2: 10 }),
          h('line', { x1: 12, y1: 20, x2: 12, y2: 4 }),
          h('line', { x1: 6, y1: 20, x2: 6, y2: 14 })
        );
      case 'arrowRight':
        return h('svg', props,
          h('path', { d: 'M5 12h14' }),
          h('path', { d: 'm12 5 7 7-7 7' })
        );
      default:
        return h('svg', props, h('circle', { cx: 12, cy: 12, r: 8 }));
    }
  }

  // ==========================================================================
  // 2. PITCH INSIGHTS CALLOUT BANNER (<PitchCallout />)
  // ==========================================================================
  function PitchCallout({ visible, badge, problem, advantage }) {
    if (!visible) return null;
    return h('div', { className: 'pitch-callout' },
      h('span', { className: 'pitch-callout-badge' }, badge),
      h('div', null,
        h('div', { style: { marginBottom: '0.2rem' } },
          h('strong', null, 'Audit Finding on Current caffenero.com: '),
          problem
        ),
        h('div', null,
          h('strong', null, 'Our React Platform Solution: '),
          advantage
        )
      )
    );
  }

  // ==========================================================================
  // 3. MAIN REACT APPLICATION (<CaffeNeroApp />)
  // ==========================================================================
  function CaffeNeroApp() {
    // Global State
    const [region, setRegion] = useState('UK');
    const [selectedStoreId, setSelectedStoreId] = useState('st-covent');
    const [spotlightIdx, setSpotlightIdx] = useState(0);

    // Quick-Order Hero Express State
    const [expressDrinkId, setExpressDrinkId] = useState('m-flat-white');
    const [expressMilk, setExpressMilk] = useState('Barista Oat (Free)');
    const [expressSlot, setExpressSlot] = useState('ASAP (~4 mins)');

    // Menu & Allergen State
    const [menuCat, setMenuCat] = useState('all');
    const [menuSearch, setMenuSearch] = useState('');
    const [activeDietary, setActiveDietary] = useState([]);
    const [excludedAllergens, setExcludedAllergens] = useState([]);

    // Interactive Barista Taste Matchmaker State (Post-Audit Addition)
    const [quizStyle, setQuizStyle] = useState('milky');
    const [quizNote, setQuizNote] = useState('chocolate');
    const [quizMoment, setQuizMoment] = useState('cafe');

    // Loyalty 9-Stamp Card & Wallet Pass Flip State
    const [stamps, setStamps] = useState(7);
    const [walletFlipped, setWalletFlipped] = useState(false);
    const [freeDrinkApplied, setFreeDrinkApplied] = useState(false);

    // Store Locator State
    const [storeAmenity, setStoreAmenity] = useState('all');
    const [storeSearch, setStoreSearch] = useState('');

    // Coffee At Home Roastery State
    const [retailFormat, setRetailFormat] = useState('all');
    const [isSubscription, setIsSubscription] = useState(true);
    const [selectedGrinds, setSelectedGrinds] = useState({});

    // Cart & Modals State
    const [cart, setCart] = useState([
      {
        uid: 'init-1',
        id: 'm-flat-white',
        name: 'Classico Flat White',
        details: 'Regular (12oz) · Signature Classico · Barista Oat (Free)',
        unitPriceGBP: 3.65,
        qty: 1,
        type: 'cafe'
      }
    ]);
    const [cartOpen, setCartOpen] = useState(false);
    const [pickupSlot, setPickupSlot] = useState('ASAP (In ~4 mins)');
    const [customizerItem, setCustomizerItem] = useState(null);
    const [custSize, setCustSize] = useState({ label: 'Regular (12oz)', priceMod: 0, calMod: 1.0 });
    const [custBean, setCustBean] = useState({ label: 'Signature Classico', priceMod: 0 });
    const [custMilk, setCustMilk] = useState({ label: 'Barista Oat (Free)', calMod: -12 });
    const [custExtraShot, setCustExtraShot] = useState(false);
    const [custSyrup, setCustSyrup] = useState('None');

    const [pitchMode, setPitchMode] = useState(false);
    const [pitchModalOpen, setPitchModalOpen] = useState(false);
    const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    // Currency Helper
    const formatPrice = (gbp) => {
      const reg = DATA.regions[region] || DATA.regions.UK;
      return `${reg.symbol}${(gbp * reg.rate).toFixed(2)}`;
    };

    const pushToast = (text) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, text }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    };

    const currentStore = useMemo(
      () => DATA.stores.find((s) => s.id === selectedStoreId) || DATA.stores[0],
      [selectedStoreId]
    );

    // Filtered Menu Items (with Post-Audit Allergen Exclusion!)
    const filteredMenu = useMemo(() => {
      return DATA.menuItems.filter((item) => {
        if (menuCat !== 'all' && item.category !== menuCat) return false;
        if (menuSearch.trim() !== '') {
          const q = menuSearch.toLowerCase();
          const match =
            item.name.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.notes.some((n) => n.toLowerCase().includes(q));
          if (!match) return false;
        }
        for (const d of activeDietary) {
          if (!item.dietary.includes(d)) return false;
        }
        for (const alg of excludedAllergens) {
          if (item.allergens && item.allergens.includes(alg)) return false;
        }
        return true;
      });
    }, [menuCat, menuSearch, activeDietary, excludedAllergens]);

    // Barista Matchmaker Computed Recommendation
    const matchedRecommendation = useMemo(() => {
      if (quizMoment === 'home') {
        const homeProd =
          quizNote === 'fruity'
            ? DATA.retailProducts.find((r) => r.id === 'r-colombia-origin')
            : DATA.retailProducts[0];
        return {
          isRetail: true,
          title: homeProd.name,
          tag: '98% Roastery Palate Match · At-Home Subscription',
          desc: homeProd.desc,
          notes: homeProd.notes,
          priceGBP: homeProd.basePrice * 0.85,
          image: homeProd.image,
          item: homeProd
        };
      }
      let targetId = 'm-flat-white';
      if (quizStyle === 'black' && quizNote === 'fruity') targetId = 'm-cold-brew';
      else if (quizStyle === 'black') targetId = 'm-cortado';
      else if (quizStyle === 'iced' && quizNote === 'nutty') targetId = 'm-pistachio-iced';
      else if (quizStyle === 'iced') targetId = 'm-frappe-mocha';
      else if (quizNote === 'nutty') targetId = 'm-caramel-latte';

      const drink = DATA.menuItems.find((m) => m.id === targetId) || DATA.menuItems[0];
      return {
        isRetail: false,
        title: drink.name,
        tag: `99% Barista Palate Match · Ready in ${currentStore.waitMins} mins`,
        desc: drink.desc,
        notes: drink.notes.join(' · '),
        priceGBP: drink.basePrice,
        image: drink.image,
        item: drink
      };
    }, [quizStyle, quizNote, quizMoment, currentStore]);

    // Filtered Stores
    const filteredStores = useMemo(() => {
      return DATA.stores.filter((st) => {
        if (storeAmenity !== 'all' && !st.amenities.includes(storeAmenity)) return false;
        if (storeSearch.trim() !== '') {
          const q = storeSearch.toLowerCase();
          return (
            st.name.toLowerCase().includes(q) ||
            st.city.toLowerCase().includes(q) ||
            st.address.toLowerCase().includes(q)
          );
        }
        return true;
      });
    }, [storeAmenity, storeSearch]);

    // Filtered Retail
    const filteredRetail = useMemo(() => {
      return DATA.retailProducts.filter((r) => retailFormat === 'all' || r.format === retailFormat);
    }, [retailFormat]);

    // Open Customizer Helper
    const openDrinkCustomizer = (item) => {
      setCustomizerItem(item);
      setCustSize({ label: 'Regular (12oz)', priceMod: 0, calMod: 1.0 });
      setCustBean({ label: 'Signature Classico', priceMod: 0 });
      setCustMilk({ label: 'Barista Oat (Free)', calMod: -12 });
      setCustExtraShot(false);
      setCustSyrup('None');
    };

    // Add to Cart Helpers
    const addToCart = (newItem, earnStamp = false) => {
      setCart((prev) => {
        const existingIdx = prev.findIndex(
          (c) => c.id === newItem.id && c.details === newItem.details
        );
        if (existingIdx > -1) {
          const copy = [...prev];
          copy[existingIdx] = { ...copy[existingIdx], qty: copy[existingIdx].qty + 1 };
          return copy;
        }
        return [...prev, { ...newItem, uid: 'uid-' + Date.now() + '-' + Math.random() }];
      });
      if (earnStamp && stamps < 9) {
        setStamps((s) => Math.min(9, s + 1));
      }
    };

    const totalCartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotalGBP = cart.reduce((sum, i) => sum + i.unitPriceGBP * i.qty, 0);
    const discountGBP = useMemo(() => {
      if (freeDrinkApplied || stamps >= 9) {
        const cafeDrink = cart.find((c) => c.type === 'cafe');
        return cafeDrink ? cafeDrink.unitPriceGBP : 0;
      }
      return 0;
    }, [cart, freeDrinkApplied, stamps]);
    const finalTotalGBP = Math.max(0, subtotalGBP - discountGBP);

    const activeSpot = DATA.heroSpotlights[spotlightIdx] || DATA.heroSpotlights[0];

    return h(Fragment, null,
      // ======================================================================
      // 1. SMART GEO-AWARE UTILITY BAR
      // ======================================================================
      h('div', { className: 'utility-bar' },
        h('div', { className: 'container utility-inner' },
          h('a', { href: '#storeSection', className: 'live-store-pill' },
            h('span', { className: 'status-dot' }),
            h(Icon, { name: 'pin', size: 14, color: '#D4A359' }),
            h('span', null,
              h('strong', null, currentStore.name),
              ` (${currentStore.distance}) · Express Pickup in ~${currentStore.waitMins} mins`
            )
          ),
          h('div', { className: 'utility-right' },
            h('button', {
              type: 'button',
              className: `pitch-toggle-btn ${pitchMode ? 'active' : ''}`,
              onClick: () => {
                setPitchMode((p) => !p);
                pushToast(!pitchMode
                  ? 'Pitch Audit Annotations enabled across all sections.'
                  : 'Pitch annotations hidden — viewing clean customer UI.');
              }
            },
              h(Icon, { name: 'sliders', size: 13 }),
              pitchMode ? 'UX Audit Annotations: ON' : 'UX Audit Annotations: OFF'
            ),
            h('button', {
              type: 'button',
              className: 'pitch-deck-btn',
              onClick: () => setPitchModalOpen(true)
            },
              h(Icon, { name: 'chart', size: 13 }),
              'Executive UX Audit & ROI'
            ),
            h('select', {
              className: 'region-select',
              value: region,
              'aria-label': 'Select Region and Currency',
              onChange: (e) => {
                setRegion(e.target.value);
                pushToast(`Region & pricing switched to ${DATA.regions[e.target.value].label}`);
              }
            },
              Object.keys(DATA.regions).map((k) =>
                h('option', { key: k, value: k }, DATA.regions[k].label)
              )
            )
          )
        )
      ),

      // ======================================================================
      // 2. STICKY GLASS HEADER
      // ======================================================================
      h('header', { className: 'site-header' },
        h('div', { className: 'container header-inner' },
          h('a', { href: '#', className: 'brand-logo' },
            h('span', { className: 'brand-wordmark' }, 'CAFFÈ NERO'),
            h('span', { className: 'brand-sub' }, 'Società Italiana · Est. 1997')
          ),
          h('nav', { className: 'main-nav', 'aria-label': 'Primary Navigation' },
            h('a', { href: '#menuSection', className: 'nav-link' }, '01 Menu & Allergens'),
            h('a', { href: '#matchmakerSection', className: 'nav-link' }, '02 Taste Matchmaker'),
            h('a', { href: '#loyaltySection', className: 'nav-link' }, '03 Digital Stamp Card'),
            h('a', { href: '#storeSection', className: 'nav-link' }, '04 Store Radar'),
            h('a', { href: '#roasterySection', className: 'nav-link' }, '05 Coffee at Home')
          ),
          h('div', { className: 'header-actions' },
            h('a', { href: '#loyaltySection', className: 'stamp-header-pill' },
              h(Icon, { name: 'award', size: 15, color: '#D4A359' }),
              h('span', null, `${stamps}/9 Stamps`)
            ),
            h('button', {
              type: 'button',
              className: 'cart-trigger-btn',
              onClick: () => setCartOpen(true)
            },
              h(Icon, { name: 'bag', size: 15 }),
              h('span', null, 'Click & Collect'),
              h('span', { className: 'cart-count-badge' }, totalCartCount)
            )
          )
        )
      ),

      // ======================================================================
      // 3. HERO SECTION + QUICK-ORDER EXPRESS BAR
      // ======================================================================
      h('section', { className: 'hero-section' },
        h('div', { className: 'container' },
          h(PitchCallout, {
            visible: pitchMode,
            badge: 'Audit Fix #1 · Entry & Conversion',
            problem: 'caffenero.com forces a static country splash gate and lacks above-the-fold ordering.',
            advantage: 'Geo-aware header + 10-second Quick-Order Express Strip right inside the hero for repeat commuters.'
          }),

          h('div', { className: 'hero-grid' },
            h('div', null,
              h('div', { className: 'eyebrow-tag' },
                h(Icon, { name: 'award', size: 14 }),
                h('span', null, 'Award-Winning Master Italian Roasters · React Flagship')
              ),
              h('h1', { className: 'hero-title' },
                'Your Home Away From Home, ',
                h('em', null, 'Handcrafted'),
                ' to Order.'
              ),
              h('p', { className: 'hero-subtitle' },
                'Rich dark-roasted Classico espresso, warm leather booths, and freshly baked pastries—now with instant allergen transparency, customizable plant milks, and 4-minute Web Click & Collect.'
              ),
              h('div', { className: 'hero-cta-group' },
                h('a', { href: '#menuSection', className: 'btn-primary' },
                  h(Icon, { name: 'coffee', size: 17 }),
                  h('span', null, 'Order Click & Collect'),
                  h(Icon, { name: 'arrowRight', size: 16 })
                ),
                h('a', { href: '#matchmakerSection', className: 'btn-secondary-light' },
                  h(Icon, { name: 'sparkle', size: 16 }),
                  h('span', null, 'Take 15s Coffee Taste Quiz')
                )
              ),
              h('div', { className: 'hero-trust-row' },
                h('div', { className: 'trust-metric' },
                  h('strong', null, '~4 Mins'),
                  h('span', null, 'Express In-Store Pickup Queue Bypass')
                ),
                h('div', { className: 'trust-metric' },
                  h('strong', null, '£0.00'),
                  h('span', null, 'Free Barista Oat & Plant Milk Upgrade')
                ),
                h('div', { className: 'trust-metric' },
                  h('strong', null, '9 Stamps'),
                  h('span', null, '10th Handcrafted Drink Always Free')
                )
              )
            ),

            // Right: Interactive Hero Spotlight Card
            h('div', { className: 'hero-showcase-card' },
              h('div', { className: 'hero-feature-img-wrap' },
                h('img', { src: activeSpot.image, alt: activeSpot.name }),
                h('span', { className: 'hero-badge-overlay' }, activeSpot.tag)
              ),
              h('div', { className: 'hero-drink-meta' },
                h('div', null,
                  h('h3', null, activeSpot.name),
                  h('p', null, activeSpot.subtitle),
                  h('div', {
                    style: {
                      marginTop: '0.45rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.73rem',
                      color: 'var(--gold)'
                    }
                  }, `${activeSpot.kcal} kcal · ${activeSpot.caffeine} caffeine · ${activeSpot.roastLevel}`)
                ),
                h('div', { style: { textAlign: 'right' } },
                  h('div', { className: 'hero-price-tag' }, formatPrice(activeSpot.basePrice)),
                  h('button', {
                    type: 'button',
                    className: 'btn-primary',
                    style: { marginTop: '0.5rem', padding: '0.5rem 0.95rem', fontSize: '0.78rem' },
                    onClick: () => {
                      const target = DATA.menuItems.find((m) => m.id === activeSpot.menuId);
                      if (target) openDrinkCustomizer(target);
                    }
                  }, 'Customize')
                )
              ),
              h('div', { className: 'hero-spotlight-tabs' },
                DATA.heroSpotlights.map((sp, idx) =>
                  h('button', {
                    key: sp.id,
                    type: 'button',
                    className: `spotlight-tab ${idx === spotlightIdx ? 'active' : ''}`,
                    onClick: () => setSpotlightIdx(idx)
                  }, sp.name)
                )
              )
            )
          ),

          // Post-Audit Addition: 10-Second Commuter Express Order Bar
          h('div', { className: 'quick-order-bar' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.6rem' } },
              h(Icon, { name: 'clock', size: 20, color: '#D4A359' }),
              h('div', null,
                h('div', { style: { fontWeight: 700, fontSize: '0.88rem', color: '#fff' } }, '10-Second Commuter Reorder'),
                h('div', { style: { fontSize: '0.73rem', color: 'var(--text-on-dark-muted)' } }, `Pickup at ${currentStore.name.split('—')[0]}`)
              )
            ),
            h('div', { className: 'quick-order-field' },
              h('label', null, '1. Select Handcrafted Drink'),
              h('select', {
                className: 'quick-order-select',
                value: expressDrinkId,
                onChange: (e) => setExpressDrinkId(e.target.value)
              },
                DATA.menuItems.slice(0, 7).map((m) =>
                  h('option', { key: m.id, value: m.id }, `${m.name} (${formatPrice(m.basePrice)})`)
                )
              )
            ),
            h('div', { className: 'quick-order-field' },
              h('label', null, '2. Milk Choice (Free Plant Milk)'),
              h('select', {
                className: 'quick-order-select',
                value: expressMilk,
                onChange: (e) => setExpressMilk(e.target.value)
              },
                ['Barista Oat (Free)', 'Whole Estate Milk', 'Skimmed Milk', 'Coconut Milk (Free)', 'Black / No Milk'].map((mk) =>
                  h('option', { key: mk, value: mk }, mk)
                )
              )
            ),
            h('div', { className: 'quick-order-field' },
              h('label', null, '3. Collection Window'),
              h('select', {
                className: 'quick-order-select',
                value: expressSlot,
                onChange: (e) => setExpressSlot(e.target.value)
              },
                ['ASAP (~4 mins)', 'In 10 mins', 'In 20 mins'].map((sl) =>
                  h('option', { key: sl, value: sl }, sl)
                )
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-primary',
              style: { padding: '0.75rem 1.25rem', fontSize: '0.82rem', whiteSpace: 'nowrap' },
              onClick: () => {
                const drink = DATA.menuItems.find((m) => m.id === expressDrinkId) || DATA.menuItems[0];
                addToCart({
                  id: drink.id,
                  name: drink.name,
                  details: `Regular · ${expressMilk} · Pickup ${expressSlot}`,
                  unitPriceGBP: drink.basePrice,
                  qty: 1,
                  type: 'cafe'
                }, true);
                pushToast(`Express added ${drink.name} (${expressMilk}) + 1 Nero Stamp!`);
              }
            }, '+ Express Bag')
          )
        )
      ),

      // ======================================================================
      // 4. INTERACTIVE MENU + POST-AUDIT ALLERGEN EXCLUSION MATRIX
      // ======================================================================
      h('section', { id: 'menuSection', className: 'section-pad' },
        h('div', { className: 'container' },
          h(PitchCallout, {
            visible: pitchMode,
            badge: 'Audit Fix #2 · Allergen & Nutrition Matrix',
            problem: 'Customers with allergies or dietary goals must leave the menu page and read static tables.',
            advantage: 'Real-time React Allergen Exclusion Toggles (Dairy-Free, Gluten-Free, Nut-Free) + live calorie/caffeine recalculation.'
          }),

          h('div', { className: 'section-header' },
            h('div', null,
              h('span', { className: 'section-kicker' }, '01 · Interactive Digital Menu & Allergen Guard'),
              h('h2', { className: 'section-title' }, 'Handcrafted Drinks & Artisanal Bakery')
            ),
            h('p', { className: 'section-desc' },
              'Filter by category, toggle positive dietary badges, or exclude specific allergens with zero page reloads.'
            )
          ),

          h('div', { className: 'menu-controls-bar' },
            h('div', { className: 'menu-top-controls' },
              h('div', { className: 'category-pills' },
                [
                  { id: 'all', label: 'All Offerings (12)' },
                  { id: 'coffee', label: '01 Espresso & Hot Coffee' },
                  { id: 'iced', label: '02 Iced & Cold Brew' },
                  { id: 'pastry', label: '03 Morning Bakery' },
                  { id: 'savoury', label: '04 Toasted Ciabattas' }
                ].map((cat) =>
                  h('button', {
                    key: cat.id,
                    type: 'button',
                    className: `cat-pill ${menuCat === cat.id ? 'active' : ''}`,
                    onClick: () => setMenuCat(cat.id)
                  }, cat.label)
                )
              ),
              h('div', { className: 'menu-search-wrap' },
                h('span', { className: 'menu-search-icon' }, h(Icon, { name: 'search', size: 15 })),
                h('input', {
                  type: 'search',
                  className: 'menu-search-input',
                  placeholder: 'Search Cortado, Pistachio, Truffle, Vegan...',
                  value: menuSearch,
                  onChange: (e) => setMenuSearch(e.target.value)
                })
              )
            ),

            // Row 1: Dietary Lifestyle Filters
            h('div', { className: 'dietary-filter-row' },
              h('span', { className: 'dietary-label' }, 'Dietary Preferences:'),
              [
                { id: 'vegan', label: '100% Vegan' },
                { id: 'oat-friendly', label: 'Free Barista Oat' },
                { id: 'seasonal', label: 'Seasonal Limited' },
                { id: 'low-cal', label: 'Under 200 kcal' },
                { id: 'high-protein', label: 'High Protein (18g+)' }
              ].map((d) => {
                const isOn = activeDietary.includes(d.id);
                return h('button', {
                  key: d.id,
                  type: 'button',
                  className: `diet-chip ${isOn ? 'active' : ''}`,
                  onClick: () =>
                    setActiveDietary((prev) =>
                      prev.includes(d.id) ? prev.filter((x) => x !== d.id) : [...prev, d.id]
                    )
                },
                  h(Icon, { name: isOn ? 'check' : 'leaf', size: 12 }),
                  d.label
                );
              }),

              h('span', { className: 'dietary-label', style: { marginLeft: '1rem' } }, 'Exclude Allergens:'),
              [
                { id: 'milk', label: 'No Dairy' },
                { id: 'gluten', label: 'No Gluten' },
                { id: 'nuts', label: 'No Tree Nuts' },
                { id: 'eggs', label: 'No Eggs' }
              ].map((alg) => {
                const isEx = excludedAllergens.includes(alg.id);
                return h('button', {
                  key: alg.id,
                  type: 'button',
                  className: `allergen-chip ${isEx ? 'active' : ''}`,
                  onClick: () =>
                    setExcludedAllergens((prev) =>
                      prev.includes(alg.id) ? prev.filter((x) => x !== alg.id) : [...prev, alg.id]
                    )
                },
                  h(Icon, { name: 'shield', size: 12 }),
                  alg.label
                );
              }),

              h('span', {
                style: { marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }
              }, `${filteredMenu.length} items match`)
            )
          ),

          filteredMenu.length === 0
            ? h('div', {
                style: {
                  textAlign: 'center',
                  padding: '3rem',
                  background: 'var(--bg-oat)',
                  borderRadius: 'var(--radius-md)'
                }
              },
                h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.4rem' } },
                  'No menu items match all active filters'
                ),
                h('p', { style: { color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' } },
                  'Try relaxing an allergen or dietary filter to view more handcrafted options.'
                ),
                h('button', {
                  type: 'button',
                  className: 'btn-primary',
                  onClick: () => {
                    setMenuCat('all');
                    setMenuSearch('');
                    setActiveDietary([]);
                    setExcludedAllergens([]);
                  }
                }, 'Reset All Filters')
              )
            : h('div', { className: 'menu-grid' },
                filteredMenu.map((item) =>
                  h('article', { key: item.id, className: 'menu-card' },
                    h('div', { className: 'menu-card-img' },
                      h('img', { src: item.image, alt: item.name, loading: 'lazy' }),
                      h('div', { className: 'card-badges' },
                        item.badges.map((b) => {
                          let cls = 'badge-signature';
                          if (b.toLowerCase().includes('vegan') || b.toLowerCase().includes('oat')) cls = 'badge-vegan';
                          if (b.toLowerCase().includes('seasonal')) cls = 'badge-seasonal';
                          return h('span', { key: b, className: `badge-pill ${cls}` }, b);
                        })
                      ),
                      h('span', { className: 'macro-pill' },
                        item.caffeine > 0
                          ? `${item.kcal} kcal · ${item.caffeine}mg caf`
                          : `${item.kcal} kcal · ${item.protein}g protein`
                      )
                    ),
                    h('div', { className: 'menu-card-body' },
                      h('div', { className: 'menu-card-top' },
                        h('h3', { className: 'menu-card-title' }, item.name),
                        h('span', { className: 'menu-card-price' }, formatPrice(item.basePrice))
                      ),
                      h('p', { className: 'menu-card-desc' }, item.desc),
                      h('div', { className: 'menu-card-notes' },
                        item.notes.map((n) => h('span', { key: n, className: 'note-tag' }, n))
                      ),
                      h('div', { className: 'menu-card-actions' },
                        h('button', {
                          type: 'button',
                          className: 'btn-customize',
                          onClick: () => openDrinkCustomizer(item)
                        },
                          h(Icon, { name: 'sliders', size: 14 }),
                          item.category === 'coffee' || item.category === 'iced' ? 'Customize Drink' : 'Warm / Options'
                        ),
                        h('button', {
                          type: 'button',
                          className: 'btn-quick-add',
                          onClick: () => {
                            addToCart({
                              id: item.id,
                              name: item.name,
                              details: 'Standard Barista Recipe',
                              unitPriceGBP: item.basePrice,
                              qty: 1,
                              type: 'cafe'
                            }, item.category === 'coffee' || item.category === 'iced');
                            pushToast(`Added ${item.name} to Click & Collect bag!`);
                          }
                        }, '+ Add')
                      )
                    )
                  )
                )
              )
        )
      ),

      // ======================================================================
      // 5. POST-AUDIT SECTION: INTERACTIVE BARISTA TASTE MATCHMAKER
      // ======================================================================
      h('section', { id: 'matchmakerSection', className: 'section-pad', style: { paddingTop: '1rem' } },
        h('div', { className: 'container' },
          h(PitchCallout, {
            visible: pitchMode,
            badge: 'Audit Fix #3 · Guided Product Discovery',
            problem: 'New visitors are overwhelmed by espresso terminology and roast intensities.',
            advantage: 'Interactive 3-step React Barista Matchmaker Quiz that pairs palate preferences with either an in-store drink or at-home bean subscription.'
          }),

          h('div', { className: 'matchmaker-card' },
            h('div', null,
              h('span', { className: 'eyebrow-tag' },
                h(Icon, { name: 'sparkle', size: 13 }),
                h('span', null, '02 · Interactive Barista Sommelier')
              ),
              h('h2', { style: { fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '0.5rem' } },
                'Not Sure What to Order? Find Your Signature Nero Match.'
              ),
              h('p', { style: { color: 'var(--text-on-dark-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' } },
                'Select your texture, flavour profile, and setting below—our React sommelier engine computes your ideal beverage or roast in real time.'
              ),

              h('div', { style: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)' } }, 'Step 1 · Texture & Style'),
              h('div', { className: 'quiz-options-row' },
                [
                  { id: 'milky', label: 'Velvety & Textured Milk' },
                  { id: 'black', label: 'Pure & Intense Espresso' },
                  { id: 'iced', label: 'Chilled & Over Ice' }
                ].map((opt) =>
                  h('button', {
                    key: opt.id,
                    type: 'button',
                    className: `quiz-pill ${quizStyle === opt.id ? 'selected' : ''}`,
                    onClick: () => setQuizStyle(opt.id)
                  }, opt.label)
                )
              ),

              h('div', { style: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)' } }, 'Step 2 · Flavour Notes'),
              h('div', { className: 'quiz-options-row' },
                [
                  { id: 'chocolate', label: 'Dark Chocolate & Caramel' },
                  { id: 'nutty', label: 'Roasted Pistachio, Hazelnut & Sea Salt' },
                  { id: 'fruity', label: 'Single Origin Berry & Citrus' }
                ].map((opt) =>
                  h('button', {
                    key: opt.id,
                    type: 'button',
                    className: `quiz-pill ${quizNote === opt.id ? 'selected' : ''}`,
                    onClick: () => setQuizNote(opt.id)
                  }, opt.label)
                )
              ),

              h('div', { style: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)' } }, 'Step 3 · Where Are You Enjoying It?'),
              h('div', { className: 'quiz-options-row', style: { marginBottom: 0 } },
                [
                  { id: 'cafe', label: 'In-Store Click & Collect (Now)' },
                  { id: 'home', label: 'Brewing at Home (Beans / Pods)' }
                ].map((opt) =>
                  h('button', {
                    key: opt.id,
                    type: 'button',
                    className: `quiz-pill ${quizMoment === opt.id ? 'selected' : ''}`,
                    onClick: () => setQuizMoment(opt.id)
                  }, opt.label)
                )
              )
            ),

            // Computed Match Card
            h('div', { className: 'match-result-box' },
              h('div', { style: { fontSize: '0.72rem', fontWeight: 700, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' } },
                matchedRecommendation.tag
              ),
              h('div', { style: { height: '165px', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.9rem' } },
                h('img', { src: matchedRecommendation.image, alt: matchedRecommendation.title, style: { width: '100%', height: '100%', objectFit: 'cover' } })
              ),
              h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.55rem', marginBottom: '0.25rem' } },
                matchedRecommendation.title
              ),
              h('div', { style: { fontSize: '0.76rem', color: 'var(--gold)', marginBottom: '0.45rem' } },
                matchedRecommendation.notes
              ),
              h('p', { style: { fontSize: '0.83rem', color: 'var(--text-on-dark-muted)', marginBottom: '1rem' } },
                matchedRecommendation.desc
              ),
              h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                h('strong', { style: { fontSize: '1.3rem', color: 'var(--gold)' } }, formatPrice(matchedRecommendation.priceGBP)),
                h('button', {
                  type: 'button',
                  className: 'btn-primary',
                  style: { padding: '0.6rem 1.15rem', fontSize: '0.82rem' },
                  onClick: () => {
                    if (matchedRecommendation.isRetail) {
                      addToCart({
                        id: matchedRecommendation.item.id,
                        name: matchedRecommendation.item.name,
                        details: 'Matched Roastery Subscription (15% Off)',
                        unitPriceGBP: matchedRecommendation.priceGBP,
                        qty: 1,
                        type: 'retail'
                      }, false);
                      pushToast(`Added ${matchedRecommendation.title} to your bag!`);
                    } else {
                      openDrinkCustomizer(matchedRecommendation.item);
                    }
                  }
                }, matchedRecommendation.isRetail ? '+ Add Matched Roast' : 'Customize Match →')
              )
            )
          )
        )
      ),

      // ======================================================================
      // 6. INTERACTIVE 9-STAMP DIGITAL WALLET + IN-STORE QR PASS FLIP
      // ======================================================================
      h('section', { id: 'loyaltySection', className: 'section-pad loyalty-section' },
        h('div', { className: 'container' },
          h(PitchCallout, {
            visible: pitchMode,
            badge: 'Audit Fix #4 · Interactive Wallet & QR Pass',
            problem: 'caffenero.com only shows a static image of the loyalty app.',
            advantage: 'Interactive 9-Stamp Digital Wallet that flips between the Stamp Card and an In-Store Payment QR Scanner, syncing free drink rewards directly into the web checkout.'
          }),

          h('div', { className: 'loyalty-grid' },
            h('div', null,
              h('span', { className: 'eyebrow-tag' },
                h(Icon, { name: 'award', size: 14 }),
                h('span', null, '03 · The Famous Caffè Nero Stamp Card')
              ),
              h('h2', { className: 'section-title', style: { color: '#fff', marginBottom: '1rem' } },
                'Collect 9 Stamps. Your 10th Barista Drink is Always Free.'
              ),
              h('p', { style: { color: 'var(--text-on-dark-muted)', marginBottom: '1.35rem', fontSize: '0.96rem' } },
                'Every coffee ordered on the web or scanned in-store adds an artisanal gold stamp to your pass. Bring a reusable cup for +1 bonus stamp, or link your myWaitrose and Octopus Electroverse accounts for partner treats.'
              ),
              h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem' } },
                h('button', {
                  type: 'button',
                  className: 'btn-primary',
                  onClick: () => {
                    if (stamps < 9) {
                      const next = stamps + 1;
                      setStamps(next);
                      pushToast(next === 9
                        ? '9/9 Stamps Collected! Free Barista Drink unlocked in your bag!'
                        : `Stamp #${next} pressed! Only ${9 - next} more for a free drink.`);
                    } else {
                      setCartOpen(true);
                    }
                  }
                },
                  h(Icon, { name: 'coffee', size: 16 }),
                  stamps < 9 ? 'Simulate Buying a Coffee (+1 Stamp)' : 'Redeem Free 10th Drink in Bag →'
                ),
                h('button', {
                  type: 'button',
                  className: 'btn-secondary-light',
                  onClick: () => setWalletFlipped((f) => !f)
                },
                  h(Icon, { name: 'qr', size: 16 }),
                  walletFlipped ? 'Show 9-Stamp Card View' : 'Flip to In-Store QR Payment Pass'
                ),
                stamps > 7 && h('button', {
                  type: 'button',
                  className: 'btn-secondary-light',
                  onClick: () => {
                    setStamps(7);
                    setFreeDrinkApplied(false);
                  }
                }, 'Reset Demo (7/9)')
              )
            ),

            // Right: Interactive Wallet Card (Stamp View OR QR Scanner View)
            h('div', { className: 'stamp-card-widget' },
              h('div', { className: 'stamp-card-header' },
                h('div', null,
                  h('div', { className: 'stamp-card-brand' }, 'CAFFÈ NERO · DIGITAL WALLET'),
                  h('div', { style: { fontSize: '0.78rem', color: 'var(--text-on-dark-muted)' } },
                    stamps >= 9
                      ? '9/9 Stamps Collected — Free Barista Drink Unlocked!'
                      : `${stamps}/9 Stamps Collected — ${9 - stamps} more until your free drink`
                  )
                ),
                h('button', {
                  type: 'button',
                  className: 'pitch-toggle-btn',
                  onClick: () => setWalletFlipped((f) => !f)
                },
                  h(Icon, { name: 'qr', size: 13 }),
                  walletFlipped ? 'View Stamps' : 'In-Store QR'
                )
              ),

              !walletFlipped
                ? h(Fragment, null,
                    h('div', { className: 'stamp-slots-grid' },
                      [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                        const isStamped = num <= stamps;
                        return h('div', {
                          key: num,
                          className: `stamp-slot ${isStamped ? 'stamped' : ''}`,
                          onClick: () => setStamps(num),
                          title: `Set stamps to ${num}/9`
                        },
                          h(Icon, { name: isStamped ? 'coffee' : 'award', size: 20 }),
                          h('span', { className: 'stamp-slot-num' }, `STAMP ${num}`)
                        );
                      }),
                      h('div', {
                        className: `stamp-slot reward-slot ${stamps >= 9 ? 'unlocked' : ''}`,
                        onClick: () => {
                          if (stamps >= 9) {
                            setFreeDrinkApplied(true);
                            setCartOpen(true);
                          }
                        }
                      },
                        h(Icon, { name: 'sparkle', size: 20 }),
                        h('span', { className: 'stamp-slot-num' }, '10TH FREE')
                      )
                    ),
                    stamps >= 9 && h('div', { className: 'reward-banner' },
                      h('div', null,
                        h('strong', null, 'Free Handcrafted Barista Drink Unlocked!'),
                        h('div', { style: { fontSize: '0.76rem', opacity: 0.9 } }, 'Automatically deducts 1 drink from your Click & Collect bag.')
                      ),
                      h('button', {
                        type: 'button',
                        className: 'pitch-deck-btn',
                        onClick: () => {
                          setFreeDrinkApplied(true);
                          setCartOpen(true);
                        }
                      }, 'Open Bag →')
                    )
                  )
                : h('div', {
                    style: {
                      background: 'rgba(11, 9, 8, 0.55)',
                      padding: '1.5rem',
                      borderRadius: '14px',
                      textAlign: 'center',
                      border: '1px solid rgba(212, 163, 89, 0.3)'
                    }
                  },
                    h('div', { style: { fontSize: '0.74rem', color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem' } },
                      'SINGLE-SCAN PAYMENT & LOYALTY PASS · VISA •••• 4821'
                    ),
                    h('div', {
                      style: {
                        background: '#fff',
                        color: '#110D0B',
                        padding: '1.1rem',
                        borderRadius: '10px',
                        maxWidth: '240px',
                        margin: '0 auto 0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        letterSpacing: '0.15em'
                      }
                    }, '[ ▀▄▀ NERO-PAY-8492 ▄▀▄ ]'),
                    h('p', { style: { fontSize: '0.8rem', color: 'var(--text-on-dark-muted)' } },
                      'Scan at any Caffè Nero till to pay and collect your stamp in a single tap.'
                    )
                  )
            )
          )
        )
      ),

      // ======================================================================
      // 7. STORE LOCATOR + ARCHITECTURAL SVG RADAR MAP
      // ======================================================================
      h('section', { id: 'storeSection', className: 'section-pad' },
        h('div', { className: 'container' },
          h(PitchCallout, {
            visible: pitchMode,
            badge: 'Audit Fix #5 · Workspace & Amenity Telemetry',
            problem: 'caffenero.com store pages only show static opening hours without Wi-Fi speed, plug sockets, or booth availability.',
            advantage: 'Interactive SVG Radar Map with live booth occupancy %, Wi-Fi Mbps, power socket counts, and 1-click pickup store selection.'
          }),

          h('div', { className: 'section-header' },
            h('div', null,
              h('span', { className: 'section-kicker' }, '04 · Live Store Telemetry & Co-Working Finder'),
              h('h2', { className: 'section-title' }, 'Find Your Local Coffee House')
            ),
            h('p', { className: 'section-desc' },
              'Filter over 1,000 coffee houses by high-speed Wi-Fi, heated outdoor terraces, dog hospitality, and live seating availability.'
            )
          ),

          h('div', { className: 'store-locator-wrap' },
            h('div', { className: 'store-filter-bar' },
              h('div', { className: 'menu-search-wrap', style: { maxWidth: '320px' } },
                h('span', { className: 'menu-search-icon' }, h(Icon, { name: 'pin', size: 15 })),
                h('input', {
                  type: 'search',
                  className: 'menu-search-input',
                  placeholder: 'Search London, Soho, Manchester, Boston, Dublin...',
                  value: storeSearch,
                  onChange: (e) => setStoreSearch(e.target.value)
                })
              ),
              h('div', { className: 'store-amenity-chips' },
                [
                  { id: 'all', label: 'All Flagships', icon: 'pin' },
                  { id: 'open-now', label: 'Open Now', icon: 'clock' },
                  { id: 'wifi', label: 'Fast Co-Working Wi-Fi', icon: 'wifi' },
                  { id: 'outdoor', label: 'Outdoor Terrace', icon: 'sun' },
                  { id: 'dog-friendly', label: 'Dog Friendly', icon: 'check' },
                  { id: 'step-free', label: 'Step-Free Access', icon: 'shield' }
                ].map((am) =>
                  h('button', {
                    key: am.id,
                    type: 'button',
                    className: `amenity-chip ${storeAmenity === am.id ? 'active' : ''}`,
                    onClick: () => setStoreAmenity(am.id)
                  },
                    h(Icon, { name: am.icon, size: 13 }),
                    am.label
                  )
                )
              )
            ),

            h('div', { className: 'store-split-grid' },
              // Left: Store Cards List
              h('div', { className: 'store-list-pane' },
                filteredStores.map((st) => {
                  const isSel = st.id === currentStore.id;
                  return h('div', {
                    key: st.id,
                    className: `store-item-card ${isSel ? 'selected' : ''}`,
                    onClick: () => setSelectedStoreId(st.id)
                  },
                    h('div', { className: 'store-item-top' },
                      h('h4', { className: 'store-item-name' }, st.name),
                      h('span', { className: 'store-distance-badge' }, st.distance)
                    ),
                    h('p', { style: { fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.45rem' } }, st.address),
                    h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' } },
                      h('span', { style: { color: 'var(--green-vegan)', fontWeight: 700 } }, `● Open (${st.hours})`),
                      h('span', { style: { color: 'var(--text-muted)' } }, `${st.occupancyPct}% Full · ${st.wifiSpeed}`)
                    )
                  );
                })
              ),

              // Right: Interactive Architectural SVG Radar Map + Store Telemetry Card
              h('div', { className: 'store-visual-pane' },
                h('div', { className: 'svg-radar-canvas' },
                  h('svg', { width: '100%', height: '100%', viewBox: '0 0 600 220', preserveAspectRatio: 'xMidYMid slice' },
                    // Architectural Grid & Thames / Street Vector Lines
                    h('defs', null,
                      h('pattern', { id: 'neroGrid', width: 40, height: 40, patternUnits: 'userSpaceOnUse' },
                        h('path', { d: 'M 40 0 L 0 0 0 40', fill: 'none', stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 })
                      )
                    ),
                    h('rect', { width: 600, height: 220, fill: 'url(#neroGrid)' }),
                    h('path', { d: 'M 0 155 Q 180 120 340 165 T 600 130', fill: 'none', stroke: 'rgba(27, 54, 93, 0.55)', strokeWidth: 14 }),
                    h('circle', { cx: 300, cy: 110, r: 85, fill: 'none', stroke: 'rgba(212, 163, 89, 0.16)', strokeDasharray: '4 4' }),
                    h('circle', { cx: 300, cy: 110, r: 145, fill: 'none', stroke: 'rgba(212, 163, 89, 0.1)', strokeDasharray: '4 4' }),

                    // Interactive Store Pins
                    filteredStores.map((st) => {
                      const cx = (st.mapX / 100) * 540 + 30;
                      const cy = (st.mapY / 100) * 170 + 25;
                      const active = st.id === currentStore.id;
                      return h('g', {
                        key: st.id,
                        style: { cursor: 'pointer' },
                        onClick: () => setSelectedStoreId(st.id)
                      },
                        active && h('circle', { cx, cy, r: 18, fill: 'rgba(196, 125, 78, 0.3)' }),
                        h('circle', {
                          cx,
                          cy,
                          r: active ? 8 : 6,
                          fill: active ? '#D4A359' : '#C47D4E',
                          stroke: '#fff',
                          strokeWidth: 2
                        }),
                        h('text', {
                          x: cx + 12,
                          y: cy + 4,
                          fill: active ? '#D4A359' : 'rgba(255,255,255,0.78)',
                          fontSize: active ? '12' : '10',
                          fontWeight: active ? '700' : '500',
                          fontFamily: 'Plus Jakarta Sans, sans-serif'
                        }, st.name.split('—')[0].trim())
                      );
                    })
                  )
                ),

                h('div', { className: 'store-detail-card' },
                  h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.65rem' } },
                    h('div', null,
                      h('span', { style: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)', fontWeight: 700 } },
                        'Selected Flagship Coffee House'
                      ),
                      h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: '#fff' } }, currentStore.name)
                    ),
                    h('span', {
                      style: {
                        background: 'rgba(74, 222, 128, 0.18)',
                        border: '1px solid #4ADE80',
                        color: '#86EFAC',
                        padding: '0.28rem 0.75rem',
                        borderRadius: '99px',
                        fontSize: '0.74rem',
                        fontWeight: 700
                      }
                    }, `Express Pickup ~${currentStore.waitMins} mins`)
                  ),

                  h('p', { style: { fontSize: '0.84rem', color: 'var(--text-on-dark-muted)', marginBottom: '0.8rem' } },
                    `${currentStore.address} · Hours: ${currentStore.hours}`
                  ),

                  // Workspace & Occupancy Telemetry Strip
                  h('div', {
                    style: {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.6rem',
                      background: 'rgba(0,0,0,0.28)',
                      padding: '0.7rem',
                      borderRadius: '8px',
                      marginBottom: '0.85rem',
                      fontSize: '0.76rem'
                    }
                  },
                    h('div', null,
                      h('span', { style: { color: 'var(--text-on-dark-muted)', display: 'block' } }, 'Live Occupancy'),
                      h('strong', { style: { color: '#4ADE80' } }, `${currentStore.occupancyPct}% (${currentStore.occupancy.split('·')[0]})`)
                    ),
                    h('div', null,
                      h('span', { style: { color: 'var(--text-on-dark-muted)', display: 'block' } }, 'Co-Working Wi-Fi'),
                      h('strong', { style: { color: '#fff' } }, currentStore.wifiSpeed)
                    ),
                    h('div', null,
                      h('span', { style: { color: 'var(--text-on-dark-muted)', display: 'block' } }, 'Power Outlets'),
                      h('strong', { style: { color: 'var(--gold)' } }, `${currentStore.powerSockets} Booth Sockets`)
                    )
                  ),

                  h('p', { style: { fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-on-dark-muted)', marginBottom: '1rem' } },
                    `"${currentStore.baristaNote}"`
                  ),

                  h('div', { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' } },
                    h('button', {
                      type: 'button',
                      className: 'btn-primary',
                      style: { padding: '0.65rem 1.25rem', fontSize: '0.82rem' },
                      onClick: () => pushToast(`Pickup location confirmed: ${currentStore.name}`)
                    },
                      h(Icon, { name: 'check', size: 15 }),
                      'Confirmed as Pickup Store'
                    ),
                    h('a', {
                      href: '#menuSection',
                      className: 'btn-secondary-light',
                      style: { padding: '0.65rem 1.15rem', fontSize: '0.82rem' }
                    }, 'Order From This Store →')
                  )
                )
              )
            )
          )
        )
      ),

      // ======================================================================
      // 8. "COFFEE AT HOME" ROASTERY & SUBSCRIPTION CONFIGURATOR
      // ======================================================================
      h('section', { id: 'roasterySection', className: 'section-pad roastery-section' },
        h('div', { className: 'container' },
          h(PitchCallout, {
            visible: pitchMode,
            badge: 'Audit Fix #6 · D2C Subscription Configurator',
            problem: 'Coffee at Home pages lack grind customization, per-cup cost framing, and native subscription toggles.',
            advantage: 'Interactive Grind Selector + Subscribe & Save 15% calculator showing exact cost-per-cup (from £0.31/cup).'
          }),

          h('div', { className: 'section-header' },
            h('div', null,
              h('span', { className: 'section-kicker' }, '05 · Master Roastery Direct to Your Door'),
              h('h2', { className: 'section-title' }, 'Coffee At Home Subscriptions')
            ),
            h('p', { className: 'section-desc' },
              'Freshly roasted at our London & Milan master roasteries. Subscribe to save 15%, enjoy free doorstep delivery, and earn Double App Stamps on every bag.'
            )
          ),

          h('div', { className: 'roast-toolbar' },
            h('div', { className: 'category-pills' },
              [
                { id: 'all', label: 'All Roastery Formats' },
                { id: 'beans', label: 'Whole Coffee Beans' },
                { id: 'ground', label: 'Cafetière & Filter Ground' },
                { id: 'pods', label: 'Nespresso® Compatible Pods' }
              ].map((rf) =>
                h('button', {
                  key: rf.id,
                  type: 'button',
                  className: `cat-pill ${retailFormat === rf.id ? 'active' : ''}`,
                  onClick: () => setRetailFormat(rf.id)
                }, rf.label)
              )
            ),

            h('label', { className: 'sub-toggle-box', style: { cursor: 'pointer' } },
              h('input', {
                type: 'checkbox',
                checked: isSubscription,
                onChange: (e) => setIsSubscription(e.target.checked),
                style: { width: '17px', height: '17px', accentColor: 'var(--copper)' }
              }),
              h('span', { style: { fontSize: '0.84rem', fontWeight: 700, color: 'var(--gold)' } },
                'Subscribe & Save 15% (Free Delivery + +2 Bonus Stamps)'
              )
            )
          ),

          h('div', { className: 'retail-grid' },
            filteredRetail.map((prod) => {
              const finalGBP = isSubscription ? prod.basePrice * 0.85 : prod.basePrice;
              const perCupGBP = finalGBP / (prod.cupsPerPack || 18);
              const grindChoice = selectedGrinds[prod.id] || (prod.format === 'pods' ? 'Nespresso® Original Capsules' : 'Whole Beans');

              return h('article', { key: prod.id, className: 'retail-card' },
                h('div', { className: 'retail-img-wrap' },
                  h('img', { src: prod.image, alt: prod.name, loading: 'lazy' }),
                  h('span', { className: 'badge-pill badge-signature', style: { position: 'absolute', top: '0.65rem', left: '0.65rem' } },
                    prod.formatLabel
                  ),
                  isSubscription && h('span', { className: 'badge-pill badge-vegan', style: { position: 'absolute', top: '0.65rem', right: '0.65rem' } },
                    `${formatPrice(perCupGBP)} / cup`
                  )
                ),
                h('div', { style: { fontSize: '0.74rem', color: 'var(--gold)', fontWeight: 600 } }, prod.notes),
                h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff', margin: '0.25rem 0' } }, prod.name),
                h('p', { style: { fontSize: '0.82rem', color: 'var(--text-on-dark-muted)', marginBottom: '0.6rem', flex: 1 } }, prod.desc),

                h('div', { style: { fontSize: '0.74rem', color: 'var(--text-on-dark-muted)' } },
                  `Roast Intensity: ${prod.intensity}/10`,
                  h('div', { className: 'intensity-bar' },
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dot) =>
                      h('span', { key: dot, className: `intensity-dot ${dot <= prod.intensity ? 'filled' : ''}` })
                    )
                  )
                ),

                prod.format !== 'pods' && h('select', {
                  className: 'grind-select',
                  value: grindChoice,
                  onChange: (e) => setSelectedGrinds((prev) => ({ ...prev, [prod.id]: e.target.value }))
                },
                  ['Whole Beans', 'Espresso Fine Grind', 'Cafetière Coarse Grind', 'V60 / Filter Medium Grind', 'Moka Pot Stovetop'].map((g) =>
                    h('option', { key: g, value: g }, `Brew Preparation: ${g}`)
                  )
                ),

                h('div', {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-dark)'
                  }
                },
                  h('div', null,
                    h('span', { style: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' } }, formatPrice(finalGBP)),
                    isSubscription && h('span', {
                      style: { fontSize: '0.76rem', textDecoration: 'line-through', color: 'var(--text-on-dark-muted)', marginLeft: '0.35rem' }
                    }, formatPrice(prod.basePrice)),
                    h('span', { style: { display: 'block', fontSize: '0.68rem', color: 'var(--text-on-dark-muted)' } },
                      isSubscription ? 'Delivered every 2 weeks · Cancel anytime' : 'One-time home delivery'
                    )
                  ),
                  h('button', {
                    type: 'button',
                    className: 'btn-primary',
                    style: { padding: '0.58rem 1.05rem', fontSize: '0.8rem' },
                    onClick: () => {
                      addToCart({
                        id: prod.id,
                        name: prod.name,
                        details: `${grindChoice} · ${isSubscription ? 'Subscribe & Save (15% Off)' : 'One-Time Purchase'}`,
                        unitPriceGBP: finalGBP,
                        qty: 1,
                        type: 'retail'
                      }, isSubscription);
                      pushToast(`Added ${prod.name} (${grindChoice}) to your bag!`);
                    }
                  }, '+ Add to Bag')
                )
              );
            })
          )
        )
      ),

      // ======================================================================
      // 9. FOOTER
      // ======================================================================
      h('footer', { className: 'site-footer' },
        h('div', { className: 'container' },
          h('div', { className: 'footer-grid' },
            h('div', null,
              h('div', { className: 'brand-wordmark', style: { color: '#fff', marginBottom: '0.4rem' } }, 'CAFFÈ NERO'),
              h('p', { style: { fontSize: '0.85rem', maxWidth: '330px', marginBottom: '1.25rem' } },
                'Award-winning Italian coffee, warm neighbourhood coffee houses, and seamless React-powered Click & Collect ordering.'
              ),
              h('button', {
                type: 'button',
                className: 'pitch-deck-btn',
                onClick: () => setPitchModalOpen(true)
              },
                h(Icon, { name: 'chart', size: 14 }),
                'Open Executive UX Audit Scorecard'
              )
            ),
            h('div', { className: 'footer-col' },
              h('h4', null, 'Our Menus & Shop'),
              h('ul', null,
                h('li', null, h('a', { href: '#menuSection' }, 'Espresso & Hot Coffee')),
                h('li', null, h('a', { href: '#menuSection' }, 'Iced Latte & Cold Brew')),
                h('li', null, h('a', { href: '#menuSection' }, 'Interactive Allergen Guard')),
                h('li', null, h('a', { href: '#roasterySection' }, 'Coffee At Home Subscriptions'))
              )
            ),
            h('div', { className: 'footer-col' },
              h('h4', null, 'Digital Experience'),
              h('ul', null,
                h('li', null, h('a', { href: '#loyaltySection' }, '9-Stamp Digital Wallet')),
                h('li', null, h('a', { href: '#matchmakerSection' }, 'Barista Taste Matchmaker')),
                h('li', null, h('a', { href: '#storeSection' }, 'Store Occupancy & Wi-Fi Radar'))
              )
            ),
            h('div', { className: 'footer-col' },
              h('h4', null, 'Ethical Sourcing'),
              h('ul', null,
                h('li', null, h('a', { href: '#roasterySection' }, '100% Rainforest Alliance Certified')),
                h('li', null, h('a', { href: '#roasterySection' }, 'Master Roastery Heritage')),
                h('li', null, h('a', { href: '#storeSection' }, 'Sustainability & Reusable Cup Perks'))
              )
            )
          ),
          h('div', {
            style: {
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-dark)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.78rem'
            }
          },
            h('span', null, '© 2026 The Nero Group Ltd · Built with React 18 Component Architecture.'),
            h('span', null, 'Designed for High Conversion, Allergen Transparency & Omnichannel Loyalty.')
          )
        )
      ),

      // ======================================================================
      // FLOATING PITCH CONTROLS
      // ======================================================================
      h('div', { className: 'pitch-floating-bar' },
        h('span', null, h('strong', null, 'Client Pitch Mode:')),
        h('button', {
          type: 'button',
          className: `pitch-toggle-btn ${pitchMode ? 'active' : ''}`,
          onClick: () => setPitchMode((p) => !p)
        },
          h(Icon, { name: 'sliders', size: 13 }),
          pitchMode ? 'Audit Callouts: ON' : 'Audit Callouts: OFF'
        ),
        h('button', {
          type: 'button',
          className: 'pitch-deck-btn',
          onClick: () => setPitchModalOpen(true)
        },
          h(Icon, { name: 'chart', size: 13 }),
          'UX Audit Scorecard'
        )
      ),

      // ======================================================================
      // MODAL 1: BARISTA DRINK CUSTOMIZER
      // ======================================================================
      customizerItem && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setCustomizerItem(null); }
      },
        h('div', { className: 'modal-dialog' },
          h('div', { className: 'modal-header' },
            h('div', null,
              h('span', { className: 'section-kicker' }, 'React Barista Customizer · Live Macros'),
              h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.75rem' } }, customizerItem.name),
              h('p', { style: { fontSize: '0.84rem', color: 'var(--text-secondary)' } }, customizerItem.desc)
            ),
            h('button', {
              type: 'button',
              className: 'close-btn',
              onClick: () => setCustomizerItem(null)
            }, h(Icon, { name: 'close', size: 16 }))
          ),

          (() => {
            const isDrink = customizerItem.category === 'coffee' || customizerItem.category === 'iced';
            const totalGBP =
              customizerItem.basePrice +
              custSize.priceMod +
              custBean.priceMod +
              (custExtraShot ? 0.65 : 0) +
              (custSyrup !== 'None' ? 0.55 : 0);
            const kcal = Math.max(5, Math.round(customizerItem.kcal * custSize.calMod + (isDrink ? custMilk.calMod : 0) + (custSyrup !== 'None' ? 42 : 0)));
            const caf = Math.round((customizerItem.caffeine + (custExtraShot ? 75 : 0)) * (custBean.label.includes('Decaf') ? 0.05 : 1));
            const prot = (customizerItem.protein * custSize.calMod).toFixed(1);
            const sug = (customizerItem.sugar * custSize.calMod + (custSyrup !== 'None' ? 9.5 : 0)).toFixed(1);

            return h(Fragment, null,
              h('div', { className: 'nutrition-live-box' },
                h('div', null, h('strong', null, `${kcal} kcal`), h('span', null, 'Energy')),
                h('div', null, h('strong', null, `${caf} mg`), h('span', null, 'Caffeine')),
                h('div', null, h('strong', null, `${prot} g`), h('span', null, 'Protein')),
                h('div', null, h('strong', null, `${sug} g`), h('span', null, 'Sugar'))
              ),

              isDrink && h(Fragment, null,
                h('div', { className: 'customizer-group' },
                  h('label', null, '1. Cup Size'),
                  h('div', { className: 'option-grid' },
                    [
                      { label: 'Piccolo (8oz)', priceMod: -0.25, calMod: 0.75 },
                      { label: 'Regular (12oz)', priceMod: 0, calMod: 1.0 },
                      { label: 'Grande (16oz)', priceMod: 0.40, calMod: 1.3 }
                    ].map((sz) =>
                      h('button', {
                        key: sz.label,
                        type: 'button',
                        className: `opt-btn ${custSize.label === sz.label ? 'selected' : ''}`,
                        onClick: () => setCustSize(sz)
                      }, sz.label)
                    )
                  )
                ),

                h('div', { className: 'customizer-group' },
                  h('label', null, '2. Espresso Roast Selection'),
                  h('div', { className: 'option-grid' },
                    [
                      { label: 'Signature Classico', priceMod: 0 },
                      { label: 'Single Origin Colombia (+40p)', priceMod: 0.40 },
                      { label: 'Swiss Water Decaf', priceMod: 0 }
                    ].map((bn) =>
                      h('button', {
                        key: bn.label,
                        type: 'button',
                        className: `opt-btn ${custBean.label === bn.label ? 'selected' : ''}`,
                        onClick: () => setCustBean(bn)
                      }, bn.label)
                    )
                  )
                ),

                h('div', { className: 'customizer-group' },
                  h('label', null, '3. Milk & Plant Alternatives (Zero Plant Surcharge)'),
                  h('div', { className: 'option-grid' },
                    [
                      { label: 'Barista Oat (Free)', calMod: -12 },
                      { label: 'Whole Estate Milk', calMod: 0 },
                      { label: 'Skimmed Milk', calMod: -35 },
                      { label: 'Coconut Milk (Free)', calMod: -25 }
                    ].map((mk) =>
                      h('button', {
                        key: mk.label,
                        type: 'button',
                        className: `opt-btn ${custMilk.label === mk.label ? 'selected' : ''}`,
                        onClick: () => setCustMilk(mk)
                      }, mk.label)
                    )
                  )
                ),

                h('div', { className: 'customizer-group' },
                  h('label', null, '4. Extra Espresso Shot & Syrups'),
                  h('div', { className: 'option-grid' },
                    h('button', {
                      type: 'button',
                      className: `opt-btn ${custExtraShot ? 'selected' : ''}`,
                      onClick: () => setCustExtraShot((s) => !s)
                    }, '+1 Ristretto Shot (+65p)'),
                    ['None', 'Madagascan Vanilla', 'Roasted Hazelnut'].map((syr) =>
                      h('button', {
                        key: syr,
                        type: 'button',
                        className: `opt-btn ${custSyrup === syr ? 'selected' : ''}`,
                        onClick: () => setCustSyrup(syr)
                      }, syr === 'None' ? 'No Syrup' : `${syr} (+55p)`)
                    )
                  )
                )
              ),

              h('button', {
                type: 'button',
                className: 'btn-primary',
                style: { width: '100%', justifyContent: 'space-between' },
                onClick: () => {
                  const details = isDrink
                    ? `${custSize.label} · ${custBean.label} · ${custMilk.label}${custExtraShot ? ' · +1 Shot' : ''}${custSyrup !== 'None' ? ' · ' + custSyrup : ''}`
                    : 'Warmed in Stone Deck Oven · Express Pickup';
                  addToCart({
                    id: customizerItem.id,
                    name: customizerItem.name,
                    details,
                    unitPriceGBP: totalGBP,
                    qty: 1,
                    type: 'cafe'
                  }, isDrink);
                  setCustomizerItem(null);
                  pushToast(`Added customized ${customizerItem.name} to your Click & Collect bag!`);
                }
              },
                h('span', null, 'Add to Click & Collect Order (+1 Stamp)'),
                h('strong', null, formatPrice(totalGBP))
              )
            );
          })()
        )
      ),

      // ======================================================================
      // MODAL 2: EXECUTIVE UX AUDIT SCORECARD & PITCH MODAL
      // ======================================================================
      pitchModalOpen && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setPitchModalOpen(false); }
      },
        h('div', { className: 'modal-dialog', style: { maxWidth: '840px' } },
          h('div', { className: 'modal-header' },
            h('div', null,
              h('span', { className: 'section-kicker', style: { color: '#4F46E5' } },
                'Post-Audit Executive Proposal · React 18 Architecture'
              ),
              h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.9rem' } },
                'UX Audit Scorecard: Current caffenero.com vs. Our React Product'
              )
            ),
            h('button', {
              type: 'button',
              className: 'close-btn',
              onClick: () => setPitchModalOpen(false)
            }, h(Icon, { name: 'close', size: 16 }))
          ),

          h('div', { style: { display: 'grid', gap: '0.75rem', marginBottom: '1.25rem' } },
            DATA.auditFindings.map((af) =>
              h('div', {
                key: af.id,
                style: {
                  background: '#fff',
                  border: '1px solid var(--border-warm)',
                  borderRadius: '10px',
                  padding: '0.95rem 1.1rem'
                }
              },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' } },
                  h('strong', { style: { fontSize: '0.92rem' } }, af.area),
                  h('div', { style: { display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700 } },
                    h('span', { style: { background: '#FEE2E2', color: '#991B1B', padding: '0.18rem 0.55rem', borderRadius: '99px' } }, `Current Site: ${af.currentScore}`),
                    h('span', { style: { background: '#DCFCE7', color: '#166534', padding: '0.18rem 0.55rem', borderRadius: '99px' } }, `Our React Build: ${af.remakeScore}`),
                    h('span', { style: { background: '#EEF2FF', color: '#4F46E5', padding: '0.18rem 0.6rem', borderRadius: '99px' } }, af.impact)
                  )
                ),
                h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' } },
                  h('div', null, h('strong', { style: { color: '#991B1B' } }, 'Bottleneck: '), af.problem),
                  h('div', null, h('strong', { style: { color: '#166534' } }, 'React Solution: '), af.solution)
                )
              )
            )
          ),

          h('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-oat)',
              padding: '0.9rem 1.15rem',
              borderRadius: '10px'
            }
          },
            h('span', { style: { fontSize: '0.82rem', fontWeight: 600 } },
              'Toggle Audit Callouts ON to highlight each of these 6 revenue drivers directly on the page during your demo.'
            ),
            h('button', {
              type: 'button',
              className: 'btn-primary',
              style: { padding: '0.55rem 1.1rem', fontSize: '0.8rem' },
              onClick: () => {
                setPitchMode(true);
                setPitchModalOpen(false);
              }
            }, 'Enable Live On-Page Callouts')
          )
        )
      ),

      // ======================================================================
      // MODAL 3: ORDER CONFIRMATION & EXPRESS PICKUP PASS
      // ======================================================================
      orderSuccessOpen && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setOrderSuccessOpen(false); }
      },
        h('div', { className: 'modal-dialog', style: { maxWidth: '470px', textAlign: 'center' } },
          h('div', {
            style: {
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--green-bg)',
              color: 'var(--green-vegan)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.85rem'
            }
          }, h(Icon, { name: 'check', size: 28 })),
          h('span', { className: 'section-kicker' }, 'Express Click & Collect Confirmed'),
          h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.9rem', marginBottom: '0.4rem' } },
            'Order #CN-8492 Sent to Espresso Bar!'
          ),
          h('p', { style: { fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.15rem' } },
            `Skip the queue at ${currentStore.name}. Pickup slot: ${pickupSlot}.`
          ),
          h('div', {
            style: {
              background: 'var(--bg-espresso)',
              color: '#fff',
              padding: '1.2rem',
              borderRadius: '12px',
              marginBottom: '1.2rem'
            }
          },
            h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--gold)', marginBottom: '0.5rem' } },
              'EXPRESS COLLECTION QR PASS · +1 STAMP EARNED'
            ),
            h('div', {
              style: {
                background: '#fff',
                color: '#000',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.18em',
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '0.45rem'
              }
            }, '[ ▀▄▀ CN-8492-NERO ▄▀▄ ]'),
            h('div', { style: { fontSize: '0.75rem', color: 'var(--text-on-dark-muted)' } },
              `Barista Status: Grinding fresh Classico beans (${currentStore.waitMins} mins)`
            )
          ),
          h('button', {
            type: 'button',
            className: 'btn-primary',
            style: { width: '100%' },
            onClick: () => setOrderSuccessOpen(false)
          }, 'Return to Caffè Nero')
        )
      ),

      // ======================================================================
      // SLIDE-OVER CLICK & COLLECT CART DRAWER
      // ======================================================================
      cartOpen && h('div', {
        className: 'cart-drawer-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setCartOpen(false); }
      },
        h('aside', { className: 'cart-drawer' },
          h('div', { className: 'cart-drawer-header' },
            h('div', null,
              h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700 } }, 'Click & Collect Bag'),
              h('div', { style: { fontSize: '0.75rem', color: 'var(--gold)' } },
                `${currentStore.name} (~${currentStore.waitMins} mins)`
              )
            ),
            h('button', {
              type: 'button',
              className: 'close-btn',
              style: { background: 'rgba(255,255,255,0.14)', color: '#fff' },
              onClick: () => setCartOpen(false)
            }, h(Icon, { name: 'close', size: 16 }))
          ),

          h('div', {
            style: {
              background: 'var(--savoy-blue)',
              color: '#fff',
              padding: '0.6rem 1.5rem',
              fontSize: '0.78rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }
          },
            h('span', null, 'Collection Window:'),
            h('select', {
              value: pickupSlot,
              onChange: (e) => setPickupSlot(e.target.value),
              style: {
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                padding: '0.2rem 0.5rem',
                fontSize: '0.75rem'
              }
            },
              ['ASAP (In ~4 mins)', 'In 15 minutes', 'In 30 minutes'].map((s) =>
                h('option', { key: s, value: s, style: { color: '#000' } }, s)
              )
            )
          ),

          h('div', { className: 'cart-drawer-body' },
            cart.length === 0
              ? h('div', { style: { textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' } },
                  h(Icon, { name: 'coffee', size: 32, color: '#C47D4E' }),
                  h('h4', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '0.5rem 0 0.3rem' } }, 'Your Bag is Empty'),
                  h('p', { style: { fontSize: '0.84rem' } }, 'Add handcrafted espresso drinks, warm pastries, or Coffee at Home blends.')
                )
              : cart.map((item) =>
                  h('div', { key: item.uid, className: 'cart-item' },
                    h('div', { style: { flex: 1 } },
                      h('div', { style: { fontWeight: 700, fontSize: '0.9rem' } }, item.name),
                      h('div', { style: { fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0.5rem' } }, item.details),
                      h('div', {
                        style: {
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.55rem',
                          background: 'var(--bg-oat)',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '6px'
                        }
                      },
                        h('button', {
                          type: 'button',
                          style: { border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700 },
                          onClick: () =>
                            setCart((prev) =>
                              prev
                                .map((c) => (c.uid === item.uid ? { ...c, qty: c.qty - 1 } : c))
                                .filter((c) => c.qty > 0)
                            )
                        }, '−'),
                        h('span', { style: { fontSize: '0.78rem', fontWeight: 700 } }, item.qty),
                        h('button', {
                          type: 'button',
                          style: { border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700 },
                          onClick: () =>
                            setCart((prev) =>
                              prev.map((c) => (c.uid === item.uid ? { ...c, qty: c.qty + 1 } : c))
                            )
                        }, '+')
                      )
                    ),
                    h('div', { style: { textAlign: 'right' } },
                      h('div', { style: { fontWeight: 700, color: 'var(--copper)' } }, formatPrice(item.unitPriceGBP * item.qty)),
                      h('button', {
                        type: 'button',
                        style: { border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.72rem', cursor: 'pointer', marginTop: '0.4rem' },
                        onClick: () => setCart((prev) => prev.filter((c) => c.uid !== item.uid))
                      }, 'Remove')
                    )
                  )
                )
          ),

          h('div', { className: 'cart-drawer-footer' },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.35rem' } },
              h('span', null, 'Subtotal'),
              h('strong', null, formatPrice(subtotalGBP))
            ),
            discountGBP > 0 && h('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.84rem',
                color: 'var(--green-vegan)',
                fontWeight: 700,
                marginBottom: '0.35rem'
              }
            },
              h('span', null, '9-Stamp Free Barista Drink Reward'),
              h('span', null, `-${formatPrice(discountGBP)}`)
            ),
            h('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.12rem',
                fontWeight: 700,
                paddingTop: '0.55rem',
                borderTop: '1px solid var(--border-warm)',
                marginBottom: '0.95rem'
              }
            },
              h('span', null, 'Total to Pay'),
              h('span', { style: { color: 'var(--copper)' } }, formatPrice(finalTotalGBP))
            ),
            h('button', {
              type: 'button',
              className: 'btn-primary',
              style: { width: '100%' },
              onClick: () => {
                if (cart.length === 0) {
                  pushToast('Add a drink or pastry first to complete checkout.');
                  return;
                }
                setCartOpen(false);
                setOrderSuccessOpen(true);
              }
            }, 'Complete Express Checkout (Apple Pay / Card)')
          )
        )
      ),

      // Toast Stack
      h('div', { className: 'toast-container', 'aria-live': 'polite' },
        toasts.map((t) => h('div', { key: t.id, className: 'toast' }, t.text))
      )
    );
  }

  // Mount React 18 Root
  document.addEventListener('DOMContentLoaded', function () {
    const rootEl = document.getElementById('root');
    if (rootEl && createRoot) {
      const root = createRoot(rootEl);
      root.render(h(CaffeNeroApp));
    }
  });
})();
