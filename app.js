/* ==========================================================================
   ONE CLUB ROW (oneclubrow.com) — ENTERPRISE REACT 18 DIGITAL FLAGSHIP
   Customer Pitch Remake · 1 Club Row, Shoreditch, London E1 6JX
   ========================================================================== */

(function () {
  const { useState, useMemo, useEffect, createElement: h, Fragment } = window.React;
  const { createRoot } = window.ReactDOM;
  const DATA = window.OCR_DATA;

  // ==========================================================================
  // 1. ARCHITECTURAL VECTOR SVG ICON & CREST SYSTEM
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
      case 'martini':
        return h('svg', props,
          h('path', { d: 'M8 22h8' }),
          h('path', { d: 'M12 15v7' }),
          h('path', { d: 'm19 3-7 8-7-8Z' }),
          h('path', { d: 'm5.5 6.5 13 0' })
        );
      case 'bag':
        return h('svg', props,
          h('path', { d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' }),
          h('line', { x1: 3, y1: 6, x2: 21, y2: 6 }),
          h('path', { d: 'M16 10a4 4 0 0 1-8 0' })
        );
      case 'menu':
        return h('svg', props,
          h('line', { x1: 3, y1: 7, x2: 21, y2: 7 }),
          h('line', { x1: 3, y1: 17, x2: 21, y2: 17 })
        );
      case 'arrowRight':
        return h('svg', props,
          h('path', { d: 'M5 12h14' }),
          h('path', { d: 'm12 5 7 7-7 7' })
        );
      case 'clock':
        return h('svg', props,
          h('circle', { cx: 12, cy: 12, r: 10 }),
          h('polyline', { points: '12 6 12 12 16 14' })
        );
      case 'utensils':
        return h('svg', props,
          h('path', { d: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' }),
          h('path', { d: 'M7 2v20' }),
          h('path', { d: 'M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' })
        );
      case 'wine':
        return h('svg', props,
          h('path', { d: 'M8 22h8' }),
          h('path', { d: 'M7 10h10' }),
          h('path', { d: 'M12 15v7' }),
          h('path', { d: 'M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z' })
        );
      case 'calendar':
        return h('svg', props,
          h('rect', { width: 18, height: 18, x: 3, y: 4, rx: 2 }),
          h('line', { x1: 16, y1: 2, x2: 16, y2: 6 }),
          h('line', { x1: 8, y1: 2, x2: 8, y2: 6 }),
          h('line', { x1: 3, y1: 10, x2: 21, y2: 10 })
        );
      case 'users':
        return h('svg', props,
          h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
          h('circle', { cx: 9, cy: 7, r: 4 }),
          h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
          h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
        );
      case 'gift':
        return h('svg', props,
          h('rect', { x: 3, y: 8, width: 18, height: 4, rx: 1 }),
          h('path', { d: 'M12 8v13' }),
          h('path', { d: 'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' }),
          h('path', { d: 'M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5' })
        );
      case 'pin':
        return h('svg', props,
          h('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
          h('circle', { cx: 12, cy: 10, r: 3 })
        );
      case 'sparkle':
        return h('svg', props,
          h('path', { d: 'm12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z' })
        );
      case 'check':
        return h('svg', props,
          h('path', { d: 'M20 6 9 17l-5-5' })
        );
      case 'close':
        return h('svg', props,
          h('path', { d: 'M18 6 6 18M6 6l12 12' })
        );
      case 'search':
        return h('svg', props,
          h('circle', { cx: 11, cy: 11, r: 8 }),
          h('path', { d: 'm21 21-4.3-4.3' })
        );
      case 'shield':
        return h('svg', props,
          h('path', { d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' })
        );
      case 'key':
        return h('svg', props,
          h('circle', { cx: 7.5, cy: 15.5, r: 5.5 }),
          h('path', { d: 'm21 2-9.6 9.6' }),
          h('path', { d: 'm15.5 7.5 3 3L22 7l-3-3' })
        );
      case 'mail':
        return h('svg', props,
          h('rect', { width: 20, height: 16, x: 2, y: 4, rx: 2 }),
          h('path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' })
        );
      case 'external':
        return h('svg', props,
          h('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
          h('polyline', { points: '15 3 21 3 21 9' }),
          h('line', { x1: 10, y1: 14, x2: 21, y2: 3 })
        );
      default:
        return h('svg', props, h('circle', { cx: 12, cy: 12, r: 8 }));
    }
  }

  // Victorian Bird Crest Ornament (Echoing One Club Row's signature illustration)
  function BirdCrest({ size = 26, color = 'currentColor' }) {
    return h('svg', {
      width: size,
      height: size,
      viewBox: '0 0 32 32',
      fill: 'none',
      stroke: color,
      strokeWidth: 1.7,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'icon-svg'
    },
      h('path', { d: 'M22 7c-2.5 0-4.5 1.8-5 4.2-.8 3.5-4.2 5.8-8 5.8-1.5 0-3-.4-4-1.2 1.2 4.2 5 7.2 9.5 7.2 5.5 0 9.5-4 9.5-9.5 0-1.5.5-3 2-4-1.2-.5-2.6-2.5-4-2.5Z' }),
      h('path', { d: 'M24 9.5h3.5l-2 2' }),
      h('path', { d: 'M14 23v5m-3 0h6' }),
      h('circle', { cx: 21.5, cy: 9.5, r: 0.8, fill: color })
    );
  }

  // Interactive Architectural Floorplan SVG for "The Apartment" Private Dining
  function ApartmentFloorplanSvg({ layoutId, guests }) {
    return h('svg', {
      viewBox: '0 0 360 130',
      style: { width: '100%', height: 'auto', display: 'block', borderRadius: '4px', background: '#131333', border: '1px solid rgba(201,164,97,0.35)' },
      'aria-label': 'Architectural Floorplan Preview'
    },
      // Outer Victorian Salon Walls & Sash Windows
      h('rect', { x: 8, y: 8, width: 344, height: 114, rx: 4, fill: 'none', stroke: '#C9A461', strokeWidth: 1.5, strokeDasharray: '4 2' }),
      h('text', { x: 18, y: 22, fill: '#DFB973', fontSize: '8', fontFamily: 'JetBrains Mono, monospace' }, 'CLUB ROW SASH WINDOWS (NATURAL DAYLIGHT / CANDLELIGHT)'),
      // Private Mahogany Bar Station
      h('rect', { x: 282, y: 28, width: 58, height: 82, rx: 3, fill: 'rgba(197,54,39,0.28)', stroke: '#C53627', strokeWidth: 1.5 }),
      h('text', { x: 291, y: 66, fill: '#F6F3E3', fontSize: '8', fontWeight: 'bold' }, 'PRIVATE'),
      h('text', { x: 291, y: 77, fill: '#F6F3E3', fontSize: '8', fontWeight: 'bold' }, 'BAR'),

      layoutId === 'seated-dinner' && h(Fragment, null,
        h('rect', { x: 28, y: 40, width: 234, height: 26, rx: 3, fill: 'rgba(201,164,97,0.22)', stroke: '#DFB973', strokeWidth: 1.5 }),
        h('rect', { x: 28, y: 78, width: 234, height: 26, rx: 3, fill: 'rgba(201,164,97,0.22)', stroke: '#DFB973', strokeWidth: 1.5 }),
        h('text', { x: 64, y: 56, fill: '#F6F3E3', fontSize: '8.5', fontFamily: 'JetBrains Mono, monospace' }, `LONG BANQUET SALON · ${guests} SEATED`),
        h('text', { x: 64, y: 94, fill: '#F6F3E3', fontSize: '8.5', fontFamily: 'JetBrains Mono, monospace' }, 'FAMILY-STYLE SHARING FEAST TABLES')
      ),

      layoutId === 'standing-party' && h(Fragment, null,
        h('circle', { cx: 65, cy: 68, r: 24, fill: 'rgba(197,54,39,0.25)', stroke: '#DFB973', strokeWidth: 1.4 }),
        h('text', { x: 47, y: 71, fill: '#F6F3E3', fontSize: '7.5', fontWeight: 'bold' }, 'PIANO SHOW'),
        h('circle', { cx: 145, cy: 55, r: 18, fill: 'rgba(246,243,227,0.1)', stroke: '#C9A461', strokeWidth: 1.2 }),
        h('circle', { cx: 195, cy: 84, r: 18, fill: 'rgba(246,243,227,0.1)', stroke: '#C9A461', strokeWidth: 1.2 }),
        h('circle', { cx: 235, cy: 52, r: 16, fill: 'rgba(246,243,227,0.1)', stroke: '#C9A461', strokeWidth: 1.2 }),
        h('text', { x: 112, y: 112, fill: '#DFB973', fontSize: '8', fontFamily: 'JetBrains Mono, monospace' }, `STANDING COCKTAIL FLOW · ${guests} GUESTS`)
      ),

      layoutId === 'semi-private-feast' && h(Fragment, null,
        h('rect', { x: 52, y: 46, width: 190, height: 48, rx: 6, fill: 'rgba(197,54,39,0.28)', stroke: '#DFB973', strokeWidth: 1.8 }),
        h('text', { x: 75, y: 68, fill: '#F6F3E3', fontSize: '8.5', fontWeight: 'bold' }, `CENTRAL FEASTING TABLE (${guests}P)`),
        h('text', { x: 75, y: 81, fill: '#DFB973', fontSize: '7.5', fontFamily: 'JetBrains Mono, monospace' }, 'MAIN GRADE II DINING ROOM')
      )
    );
  }

  // ==========================================================================
  // 2. MAIN APPLICATION COMPONENT (<OneClubRowApp />)
  // ==========================================================================
  function OneClubRowApp() {
    // Pitch Audit Mode (Default to false for a clean, pristine, uncluttered presentation)
    const [pitchAnnotationsOn, setPitchAnnotationsOn] = useState(false);
    const [pitchModalOpen, setPitchModalOpen] = useState(false);

    // Responsive Tablet/Smartphone Slide-Over Navigation
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    // Hero Spotlight Carousel
    const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);

    // Post-Audit Heritage Story Chapter Switcher (/about upgrade)
    const [activeStoryId, setActiveStoryId] = useState('chap-building');

    // Quick-Reserve Concierge State
    const [resGuests, setResGuests] = useState('2 Guests');
    const [resDate, setResDate] = useState('2026-11-06');
    const [resSession, setResSession] = useState('Prime Dinner · 19:45');
    const [resZone, setResZone] = useState('Main Dining Room');
    const [resSpecialNotes, setResSpecialNotes] = useState('');
    const [resGuestName, setResGuestName] = useState('');
    const [resGuestEmail, setResGuestEmail] = useState('');
    const [reservationModalOpen, setReservationModalOpen] = useState(false);
    const [confirmedReservation, setConfirmedReservation] = useState(null);

    // Menu, Dish Allergen Inspector & Cellar State
    const [activeMenuTab, setActiveMenuTab] = useState('lunch_dinner');
    const [menuSearch, setMenuSearch] = useState('');
    const [activeDietaryFilters, setActiveDietaryFilters] = useState([]);
    const [wineStyleFilter, setWineStyleFilter] = useState('All');
    const [wineByGlassOnly, setWineByGlassOnly] = useState(false);
    const [feastGuestCount, setFeastGuestCount] = useState(12);
    const [inspectedDish, setInspectedDish] = useState(null);

    // Newsletter & VIP Club Row Society Modal (Upgrading 820px SevenRooms iframe)
    const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterName, setNewsletterName] = useState('');
    const [newsletterDone, setNewsletterDone] = useState(false);

    // Martini Atelier State ("Tell Us How You Like It")
    const [martiniSpiritId, setMartiniSpiritId] = useState('tanqueray-10');
    const [martiniStyleId, setMartiniStyleId] = useState('classic-dry');
    const [martiniGarnishId, setMartiniGarnishId] = useState('lemon-twist');

    // "The Apartment" Private Dining Configurator State
    const [activeLayoutId, setActiveLayoutId] = useState('seated-dinner');
    const [eventGuests, setEventGuests] = useState(28);
    const [selectedEventAddons, setSelectedEventAddons] = useState(['champagne-arrival']);
    const [eventDate, setEventDate] = useState('2026-11-20');
    const [eventTimeWindow, setEventTimeWindow] = useState('Evening Reception & Dinner (18:30 – 23:30)');
    const [eventHostName, setEventHostName] = useState('');
    const [eventCompany, setEventCompany] = useState('');
    const [eventEmail, setEventEmail] = useState('');
    const [eventBriefSubmitted, setEventBriefSubmitted] = useState(false);

    // Gift Voucher Studio State
    const [voucherRecipient, setVoucherRecipient] = useState('Alex & Sam');
    const [voucherMessage, setVoucherMessage] = useState('For long lunches, late dinners, and one too many martinis on Club Row.');
    const [voucherDelivery, setVoucherDelivery] = useState('Digital Apple/Google Wallet Pass');

    // Gallery Lightbox State
    const [galleryFilter, setGalleryFilter] = useState('all');
    const [lightboxPhoto, setLightboxPhoto] = useState(null);

    // Evening Plan / Pre-Order & Voucher Bag Drawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [bagItems, setBagItems] = useState([
      {
        uid: 'init-martini',
        name: 'Club Row Martini (Bar Arrival Pour)',
        category: 'Martini Bar',
        details: 'Tanqueray No. Ten, Dolin Chambéryzette, Italicus, Rosemary',
        unitPrice: 14,
        qty: 2
      },
      {
        uid: 'init-gougeres',
        name: 'Pickled Jalapeño Gougères',
        category: 'Snacks',
        details: 'Warm choux pastry & aged Comté for the table',
        unitPrice: 9,
        qty: 1
      }
    ]);

    // Toast Stack
    const [toasts, setToasts] = useState([]);

    function pushToast(text) {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, text }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3600);
    }

    function addToBag(item) {
      setBagItems((prev) => {
        const existing = prev.find((p) => p.uid === item.uid);
        if (existing) {
          return prev.map((p) => (p.uid === item.uid ? { ...p, qty: p.qty + 1 } : p));
        }
        return [...prev, { ...item, qty: 1 }];
      });
      pushToast(`Added "${item.name}" to your One Club Row Evening Plan & Bag.`);
    }

    function toggleDietaryFilter(filterKey) {
      setActiveDietaryFilters((prev) =>
        prev.includes(filterKey) ? prev.filter((k) => k !== filterKey) : [...prev, filterKey]
      );
    }

    // Filtered Menu Items
    const filteredMenuItems = useMemo(() => {
      return DATA.menuItems.filter((item) => {
        if (item.menuTab !== activeMenuTab) return false;
        if (menuSearch.trim() !== '') {
          const q = menuSearch.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.desc.toLowerCase().includes(q);
          const matchCourse = item.course.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCourse) return false;
        }
        for (const req of activeDietaryFilters) {
          if (!item.dietary || !item.dietary.includes(req)) return false;
        }
        return true;
      });
    }, [activeMenuTab, menuSearch, activeDietaryFilters]);

    // Group dishes by course
    const groupedCourses = useMemo(() => {
      const map = new Map();
      filteredMenuItems.forEach((item) => {
        if (!map.has(item.course)) map.set(item.course, []);
        map.get(item.course).push(item);
      });
      return Array.from(map.entries());
    }, [filteredMenuItems]);

    // Filtered Wines
    const filteredWines = useMemo(() => {
      return DATA.wines.filter((w) => {
        if (wineStyleFilter !== 'All' && w.style !== wineStyleFilter) return false;
        if (wineByGlassOnly && !w.byTheGlass) return false;
        if (menuSearch.trim() !== '') {
          const q = menuSearch.toLowerCase();
          if (
            !w.name.toLowerCase().includes(q) &&
            !w.region.toLowerCase().includes(q) &&
            !w.grape.toLowerCase().includes(q) &&
            !w.pairingTag.toLowerCase().includes(q)
          ) {
            return false;
          }
        }
        return true;
      });
    }, [wineStyleFilter, wineByGlassOnly, menuSearch]);

    // Current Martini Atelier Selection
    const selectedSpirit = DATA.martiniConfig.spirits.find((s) => s.id === martiniSpiritId) || DATA.martiniConfig.spirits[0];
    const selectedStyle = DATA.martiniConfig.styles.find((s) => s.id === martiniStyleId) || DATA.martiniConfig.styles[0];
    const selectedGarnish = DATA.martiniConfig.garnishes.find((g) => g.id === martiniGarnishId) || DATA.martiniConfig.garnishes[0];
    const customMartiniPrice = 12 + selectedSpirit.supplement + (martiniStyleId === 'olive-oil-mastiha' ? 2 : 0);

    // Current Apartment Layout Selection
    const activeApartmentLayout = DATA.apartmentPackages.layouts.find((l) => l.id === activeLayoutId) || DATA.apartmentPackages.layouts[0];

    const apartmentTotalEstimate = useMemo(() => {
      const clampedGuests = Math.min(Math.max(eventGuests, activeApartmentLayout.minGuests), activeApartmentLayout.maxGuests);
      let perHead = activeApartmentLayout.basePricePerHead;
      let flat = 0;
      selectedEventAddons.forEach((addId) => {
        const addon = DATA.apartmentPackages.addons.find((a) => a.id === addId);
        if (addon) {
          perHead += addon.pricePerHead;
          flat += addon.flatFee;
        }
      });
      return {
        guests: clampedGuests,
        perHead,
        flat,
        total: clampedGuests * perHead + flat
      };
    }, [activeApartmentLayout, eventGuests, selectedEventAddons]);

    // Filtered Gallery
    const visibleGallery = useMemo(() => {
      if (galleryFilter === 'all') return DATA.galleryPhotos;
      return DATA.galleryPhotos.filter((p) => p.category === galleryFilter);
    }, [galleryFilter]);

    // Bag Totals
    const totalBagCount = bagItems.reduce((acc, item) => acc + item.qty, 0);
    const totalBagValue = bagItems.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);

    const activeSpotlight = DATA.heroSpotlights[activeSpotlightIdx] || DATA.heroSpotlights[0];

    return h(Fragment, null,
      // ======================================================================
      // TOP UTILITY TELEMETRY BAR
      // ======================================================================
      h('div', { className: 'utility-bar' },
        h('div', { className: 'container utility-inner' },
          h('div', { className: 'utility-left' },
            h('span', { className: 'live-pill' },
              h('span', { className: 'pulse-dot' }),
              'Shoreditch Dining Room & Martini Bar · Open Tue–Sun'
            ),
            h('span', null, '1 Club Row, London E1 6JX (Above The Knave of Clubs)')
          ),
          h('div', { className: 'utility-right' },
            h('a', {
              href: DATA.venue.googleMapsUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { textDecoration: 'underline', color: 'var(--brass-bright)' }
            }, 'Secret Doorway Directions'),
            h('button', {
              type: 'button',
              className: 'audit-trigger-btn',
              onClick: () => setPitchModalOpen(true)
            },
              h(Icon, { name: 'sparkle', size: 13 }),
              'Customer Pitch Audit (38 → 98/100)'
            )
          )
        )
      ),

      // ======================================================================
      // STICKY HEADER (Replaces hidden #modalmenu-only desktop nav)
      // ======================================================================
      h('header', { className: 'site-header' },
        h('div', { className: 'container header-inner' },
          h('a', { href: '#top', className: 'brand-logo' },
            h('div', { className: 'brand-crest-badge' },
              h(BirdCrest, { size: 24, color: '#F6F3E3' })
            ),
            h('div', { className: 'brand-wordmark' },
              h('span', { className: 'brand-title' }, 'One Club Row'),
              h('span', { className: 'brand-subtitle' }, 'Shoreditch · Est. 1 Club Row')
            )
          ),

          h('nav', { className: 'main-nav', 'aria-label': 'Primary Navigation' },
            h('a', { href: '#storySection', className: 'nav-link' }, 'The Story'),
            h('a', { href: '#menuSection', className: 'nav-link' }, 'Menus & Cellar'),
            h('a', { href: '#martiniSection', className: 'nav-link' }, 'Martini Atelier'),
            h('a', { href: '#apartmentSection', className: 'nav-link' }, 'The Apartment'),
            h('a', { href: '#vouchersSection', className: 'nav-link' }, 'Gift Vouchers'),
            h('a', { href: '#gallerySection', className: 'nav-link' }, 'Gallery'),
            h('a', { href: '#visitSection', className: 'nav-link' }, 'Find The Door')
          ),

          h('div', { className: 'header-actions' },
            h('button', {
              type: 'button',
              className: 'btn-outline-cream header-plan-btn',
              onClick: () => setDrawerOpen(true),
              'aria-label': `View Evening Plan (${totalBagCount} items)`
            },
              h(Icon, { name: 'bag', size: 16 }),
              h('span', { className: 'header-plan-label' }, 'Evening Plan'),
              totalBagCount > 0 && h('span', { className: 'bag-counter-pill' }, totalBagCount)
            ),
            h('button', {
              type: 'button',
              className: 'btn-primary header-reserve-btn',
              onClick: () => setReservationModalOpen(true)
            },
              h(Icon, { name: 'calendar', size: 15 }),
              h('span', null, 'Reserve Table')
            ),
            h('button', {
              type: 'button',
              className: `mobile-burger-btn ${mobileNavOpen ? 'active' : ''}`,
              'aria-label': mobileNavOpen ? 'Close Menu' : 'Open Navigation Menu',
              onClick: () => setMobileNavOpen(!mobileNavOpen)
            },
              h(Icon, { name: mobileNavOpen ? 'close' : 'menu', size: 18 })
            )
          )
        )
      ),

      // ======================================================================
      // HERO SECTION (Replaces Dead '/' GIF Splash Gate & Empty '/home' Page)
      // ======================================================================
      h('section', { id: 'top', className: 'hero-section' },
        h('div', { className: 'container' },
          pitchAnnotationsOn && h('div', { className: 'pitch-callout' },
            h('span', { className: 'pitch-callout-badge' }, 'UX Audit Fix #01'),
            h('div', null,
              h('strong', null, 'Eliminated Dead GIF Splash Gate ("/") & Empty "/home" Screen: '),
              'On the live WordPress site, visitors land on an unlabeled GIF with a broken "<title>One Club Row -</title>" and must click "Enter Site" only to see a single photo with hidden navigation. Our remake welcomes guests immediately with the Victorian tavern story, dish spotlights, and a 1-click Table & Bar Seat Booking Bar.'
            )
          ),

          h('div', { className: 'hero-squiggle-top', 'aria-hidden': 'true' },
            h('span', { className: 'squiggle-line' }),
            h(BirdCrest, { size: 28, color: '#C53627' }),
            h('span', { style: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--brass-bright)', fontSize: '0.95rem' } },
              'New York Tavern Energy · Parisian Brasserie Soul'
            ),
            h(BirdCrest, { size: 28, color: '#C53627' }),
            h('span', { className: 'squiggle-line' })
          ),

          h('div', { className: 'hero-grid' },
            // Left Column: Editorial Story
            h('div', null,
              h('div', { className: 'hero-eyebrow' },
                h(Icon, { name: 'martini', size: 14, color: '#DFB973' }),
                'Grade II Listed Victorian Dining Room · Above The Knave of Clubs'
              ),
              h('h1', { className: 'hero-headline' },
                'For Long Lunches, Late Dinners & ',
                h('em', null, 'One Too Many Martinis.')
              ),
              h('p', { className: 'hero-lead' },
                'Set in the faded grandeur of 1 Club Row in Shoreditch, our dining room draws inspiration from the lively taverns of New York and the timeless bistros of Paris—with raucous private dining & post-dinner shows upstairs in The Apartment.'
              ),

              h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1.8rem' } },
                h('button', {
                  type: 'button',
                  className: 'btn-primary',
                  onClick: () => setReservationModalOpen(true)
                },
                  h(Icon, { name: 'calendar', size: 16 }),
                  'Book Dining Room or Bar Stool'
                ),
                h('a', { href: '#menuSection', className: 'btn-outline-cream' },
                  h(Icon, { name: 'wine', size: 16 }),
                  'Explore Menus & Wine Cellar'
                ),
                h('a', { href: '#apartmentSection', className: 'btn-outline-cream' },
                  h(Icon, { name: 'users', size: 16 }),
                  'Hire The Apartment (Up to 60p)'
                )
              ),

              h('div', { className: 'hero-accolades' },
                DATA.venue.accolades.map((acc, i) =>
                  h('div', { key: i, className: 'accolade-card' },
                    h('div', { className: 'accolade-title' }, acc.label),
                    h('div', { className: 'accolade-sub' }, acc.detail)
                  )
                )
              )
            ),

            // Right Column: Authentic One Club Row Framed Spotlight
            h('div', null,
              h('div', { className: 'ocr-art-frame' },
                h('div', { className: 'ocr-art-inner' },
                  h('img', {
                    src: activeSpotlight.image,
                    alt: activeSpotlight.name
                  }),
                  h('div', { className: 'spotlight-overlay' },
                    h('div', {
                      style: {
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--brass-bright)',
                        marginBottom: '0.25rem'
                      }
                    }, activeSpotlight.tag),
                    h('h2', {
                      style: {
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.65rem',
                        fontWeight: 700,
                        lineHeight: 1.15,
                        color: 'var(--parchment)',
                        marginBottom: '0.35rem'
                      }
                    }, activeSpotlight.name),
                    h('p', {
                      style: {
                        fontSize: '0.84rem',
                        color: 'var(--text-cream-muted)',
                        marginBottom: '0.65rem'
                      }
                    }, activeSpotlight.subtitle),
                    h('div', {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        paddingTop: '0.55rem',
                        borderTop: '1px solid rgba(246,243,227,0.18)'
                      }
                    },
                      h('span', {
                        style: {
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: 'var(--brass-bright)'
                        }
                      }, activeSpotlight.priceLabel),
                      h('span', {
                        style: {
                          fontSize: '0.74rem',
                          color: 'var(--parchment)'
                        }
                      }, activeSpotlight.pairing)
                    ),
                    h('div', { className: 'spotlight-tabs', role: 'tablist', 'aria-label': 'Hero Spotlights' },
                      DATA.heroSpotlights.map((sp, idx) =>
                        h('button', {
                          key: sp.id,
                          type: 'button',
                          className: `spotlight-dot ${idx === activeSpotlightIdx ? 'active' : ''}`,
                          onClick: () => setActiveSpotlightIdx(idx),
                          title: sp.name,
                          'aria-label': sp.name
                        })
                      )
                    )
                  )
                )
              ),
              h('div', {
                style: {
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  flexWrap: 'wrap'
                }
              },
                DATA.heroSpotlights.map((sp, idx) =>
                  h('button', {
                    key: sp.id,
                    type: 'button',
                    onClick: () => setActiveSpotlightIdx(idx),
                    style: {
                      background: idx === activeSpotlightIdx ? 'var(--crimson)' : 'rgba(246,243,227,0.1)',
                      color: 'var(--parchment)',
                      border: '1px solid rgba(246,243,227,0.22)',
                      padding: '0.28rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }
                  }, sp.name.split('&')[0].trim())
                )
              )
            )
          )
        )
      ),

      // ======================================================================
      // EMBEDDED TABLE & BAR SEAT QUICK-RESERVE CONCIERGE BAR
      // ======================================================================
      h('div', { className: 'container booking-bar-wrapper' },
        h('div', { className: 'booking-bar' },
          h('div', { className: 'booking-bar-header' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.6rem' } },
              h(Icon, { name: 'calendar', size: 18, color: '#C53627' }),
              h('strong', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.3rem', textTransform: 'uppercase' } },
                'Instant Table & Martini Bar Reservations'
              ),
              h('span', { className: 'badge-pill navy' }, 'SevenRooms Synchronised')
            ),
            h('span', { style: { fontSize: '0.78rem', color: 'var(--ink-secondary)' } },
              'Walk-ins always welcome at the bar · Reservations up to 16 guests online'
            )
          ),

          h('div', { className: 'booking-bar-grid' },
            h('div', { className: 'field-group' },
              h('label', { className: 'field-label', htmlFor: 'res-guests' }, 'Party Size'),
              h('select', {
                id: 'res-guests',
                className: 'field-control',
                value: resGuests,
                onChange: (e) => setResGuests(e.target.value)
              },
                [
                  '1 Guest (Bar Counter)',
                  '2 Guests',
                  '3 Guests',
                  '4 Guests',
                  '5 Guests',
                  '6 Guests',
                  '7 Guests',
                  '8–16 Guests (£75pp Feasting)'
                ].map((opt) => h('option', { key: opt, value: opt }, opt))
              )
            ),

            h('div', { className: 'field-group' },
              h('label', { className: 'field-label', htmlFor: 'res-date' }, 'Preferred Date'),
              h('input', {
                id: 'res-date',
                type: 'date',
                className: 'field-control',
                value: resDate,
                onChange: (e) => setResDate(e.target.value)
              })
            ),

            h('div', { className: 'field-group' },
              h('label', { className: 'field-label', htmlFor: 'res-session' }, 'Sitting & Time'),
              h('select', {
                id: 'res-session',
                className: 'field-control',
                value: resSession,
                onChange: (e) => setResSession(e.target.value)
              },
                [
                  'Lunch · 12:15',
                  'Lunch · 13:15',
                  'Early Dinner · 17:45',
                  'Prime Dinner · 19:45',
                  'Late Dinner & Martinis · 21:15',
                  'Sunday Service Prime Rib · 14:00'
                ].map((opt) => h('option', { key: opt, value: opt }, opt))
              )
            ),

            h('div', { className: 'field-group' },
              h('label', { className: 'field-label', htmlFor: 'res-zone' }, 'Seating Experience'),
              h('select', {
                id: 'res-zone',
                className: 'field-control',
                value: resZone,
                onChange: (e) => setResZone(e.target.value)
              },
                [
                  'Main Dining Room',
                  'Mahogany Martini Bar Counter',
                  'Window Table (Club Row View)',
                  'Group Sharing Table (8–16pp)'
                ].map((opt) => h('option', { key: opt, value: opt }, opt))
              )
            ),

            h('button', {
              type: 'button',
              className: 'btn-primary',
              style: { height: '43px' },
              onClick: () => setReservationModalOpen(true)
            },
              h(Icon, { name: 'check', size: 15 }),
              'Lock Table Pass'
            )
          ),

          // Live SevenRooms Time-Slot Pill Selector (1-Tap Mobile & Desktop Booking)
          h('div', { className: 'slot-pills-row', role: 'group', 'aria-label': 'Instant Available Time Slots' },
            h('span', { style: { fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-secondary)', marginRight: '0.25rem', flexShrink: 0 } },
              'Live Sitting Slots:'
            ),
            (DATA.venue.liveTimeSlots || []).map((slot) =>
              h('button', {
                key: slot.time,
                type: 'button',
                className: `slot-pill-btn ${resSession === slot.label ? 'active' : ''}`,
                onClick: () => {
                  setResSession(slot.label);
                  setResZone(slot.zone);
                  setReservationModalOpen(true);
                }
              },
                h('span', null, slot.label),
                h('span', { className: 'slot-pill-tag' }, slot.tag)
              )
            )
          )
        )
      ),

      // ======================================================================
      // POST-AUDIT SECTION 0: THE STORY & HERITAGE OF 1 CLUB ROW (/about Upgrade)
      // ======================================================================
      h('section', { id: 'storySection', className: 'section-block warm-theme', style: { paddingTop: '2.5rem' } },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('span', { className: 'section-kicker' }, 'The Story of 1 Club Row'),
            h('h2', { className: 'section-title' }, 'Victorian Grandeur, Reborn for Shoreditch Nights'),
            h('p', { className: 'section-subtitle' },
              'Replacing the bare 3-sentence "/about/" page with an interactive three-chapter chronicle of our Grade II listed building, our kitchen, and the legendary upstairs apartment.'
            )
          ),

          h('div', { className: 'story-chapter-tabs', role: 'tablist', 'aria-label': 'Venue Story Chapters' },
            (DATA.venue.storyChapters || []).map((chap) =>
              h('button', {
                key: chap.id,
                type: 'button',
                role: 'tab',
                'aria-selected': activeStoryId === chap.id,
                className: `story-tab-btn ${activeStoryId === chap.id ? 'active' : ''}`,
                onClick: () => setActiveStoryId(chap.id)
              },
                h('div', { style: { fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--crimson)', marginBottom: '0.2rem' } },
                  chap.kicker
                ),
                h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-primary)' } },
                  chap.title
                )
              )
            )
          ),

          (() => {
            const chap = (DATA.venue.storyChapters || []).find((c) => c.id === activeStoryId) || DATA.venue.storyChapters[0];
            if (!chap) return null;
            return h('div', { className: 'story-grid' },
              h('div', {
                style: {
                  background: 'var(--parchment-card)',
                  border: '1px solid var(--border-parchment)',
                  borderLeft: '4px solid var(--crimson)',
                  padding: '2rem',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-sm)'
                }
              },
                h('span', { className: 'badge-pill', style: { marginBottom: '0.6rem', display: 'inline-block' } }, chap.kicker),
                h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, lineHeight: 1.12, marginBottom: '0.85rem' } },
                  chap.title
                ),
                h('blockquote', {
                  style: {
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.22rem',
                    color: 'var(--club-navy-surface)',
                    background: 'var(--parchment-warm)',
                    padding: '1rem 1.2rem',
                    borderRadius: '6px',
                    marginBottom: '1rem'
                  }
                },
                  chap.quote,
                  h('footer', { style: { fontFamily: 'var(--font-sans)', fontStyle: 'normal', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--crimson)', marginTop: '0.4rem' } },
                    `— ${chap.source}`
                  )
                ),
                h('p', { style: { fontSize: '0.94rem', color: 'var(--ink-secondary)', marginBottom: '1.35rem', lineHeight: 1.7 } },
                  chap.body
                ),
                h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--border-parchment)' } },
                  (chap.stats || []).map((st) =>
                    h('div', { key: st.label },
                      h('div', { style: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', fontWeight: 700 } }, st.label),
                      h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--club-navy-surface)' } }, st.value)
                    )
                  )
                )
              ),

              h('div', { className: 'ocr-art-frame', style: { background: 'var(--club-navy-surface)' } },
                h('div', { className: 'ocr-art-inner', style: { aspectRatio: '4 / 3.4' } },
                  h('img', { src: chap.image, alt: chap.title, loading: 'lazy' })
                )
              )
            );
          })()
        )
      ),

      // ======================================================================
      // SECTION 1: INTERACTIVE BRASSERIE MENUS, ALLERGEN MATRIX & WINE CELLAR
      // ======================================================================
      h('section', { id: 'menuSection', className: 'section-block' },
        h('div', { className: 'container' },
          pitchAnnotationsOn && h('div', { className: 'pitch-callout' },
            h('span', { className: 'pitch-callout-badge' }, 'UX Audit Fix #02'),
            h('div', null,
              h('strong', null, 'Cleaned Canva/PDF HTML Pollution + Added Live Allergen Exclusion Matrix & Sommelier Filters: '),
              'On oneclubrow.com/menus/, all 5 Bootstrap tabs share duplicate id="pills-home-tab" attributes and the wine list contains raw <div class="page" title="Page 2"><div class="layoutArea"> wrappers pasted from a PDF. Below is the complete, authentic One Club Row menu with 1-click dietary filtering, sommelier pairings, and pre-order planning.'
            )
          ),

          h('div', { className: 'section-header' },
            h('span', { className: 'section-kicker' }, '01 · Culinary & Cellar Programme'),
            h('h2', { className: 'section-title' }, 'Menus, Martinis & Old-World Cellar'),
            h('p', { className: 'section-subtitle' },
              'Inspired by the brasseries of Paris and the taverns of New York. Filter any menu by dietary requirement or explore sommelier wine pairings.'
            )
          ),

          // Menu Category Tabs
          h('div', { className: 'menu-tabs-bar', role: 'tablist', 'aria-label': 'One Club Row Menus' },
            DATA.menuCategories.map((cat) =>
              h('button', {
                key: cat.id,
                type: 'button',
                role: 'tab',
                'aria-selected': activeMenuTab === cat.id,
                className: `menu-tab-btn ${activeMenuTab === cat.id ? 'active' : ''}`,
                onClick: () => setActiveMenuTab(cat.id)
              }, cat.label)
            )
          ),

          // Allergen & Dietary Exclusion Matrix + Search Bar
          activeMenuTab !== 'festive_feasting' && h('div', { className: 'allergen-matrix-bar' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' } },
              h('span', {
                style: {
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--club-navy-surface)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }
              },
                h(Icon, { name: 'shield', size: 15, color: '#236B42' }),
                'Dietary & Allergen Filter:'
              ),
              activeMenuTab !== 'wine'
                ? h('div', { className: 'dietary-chips' },
                    [
                      { key: 'vegetarian', label: 'Vegetarian' },
                      { key: 'gluten-free', label: 'Gluten-Free' },
                      { key: 'dairy-free', label: 'Dairy-Free' },
                      { key: 'nut-free', label: 'Nut-Free' },
                      { key: 'shellfish-free', label: 'Shellfish-Free' }
                    ].map((f) =>
                      h('button', {
                        key: f.key,
                        type: 'button',
                        className: `dietary-chip ${activeDietaryFilters.includes(f.key) ? 'active' : ''}`,
                        onClick: () => toggleDietaryFilter(f.key)
                      },
                        activeDietaryFilters.includes(f.key) && h(Icon, { name: 'check', size: 12 }),
                        f.label
                      )
                    ),
                    activeDietaryFilters.length > 0 && h('button', {
                      type: 'button',
                      className: 'dietary-chip',
                      style: { color: 'var(--crimson)', borderColor: 'var(--crimson)' },
                      onClick: () => setActiveDietaryFilters([])
                    }, 'Reset Filters')
                  )
                : h('div', { className: 'dietary-chips' },
                    ['All', 'Sparkling', 'White', 'Rosé & Skin Contact', 'Red'].map((st) =>
                      h('button', {
                        key: st,
                        type: 'button',
                        className: `dietary-chip ${wineStyleFilter === st ? 'active' : ''}`,
                        onClick: () => setWineStyleFilter(st)
                      }, st)
                    ),
                    h('button', {
                      type: 'button',
                      className: `dietary-chip ${wineByGlassOnly ? 'active' : ''}`,
                      onClick: () => setWineByGlassOnly(!wineByGlassOnly)
                    }, 'By The Glass Only')
                  )
            ),

            h('div', { style: { position: 'relative', minWidth: '250px' } },
              h('input', {
                type: 'search',
                className: 'field-control',
                placeholder: activeMenuTab === 'wine' ? 'Search Burgundy, Champagne, grape...' : 'Search steak tartare, schnitzel, martini...',
                value: menuSearch,
                onChange: (e) => setMenuSearch(e.target.value),
                style: { paddingLeft: '2.1rem' }
              }),
              h('span', { style: { position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' } },
                h(Icon, { name: 'search', size: 15 })
              )
            )
          ),

          // TAB VIEW A: LUNCH & DINNER / SUNDAY SERVICE / DRINKS
          (activeMenuTab === 'lunch_dinner' || activeMenuTab === 'sunday_service' || activeMenuTab === 'drinks') && (
            groupedCourses.length === 0
              ? h('div', {
                  style: {
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    background: 'var(--parchment-card)',
                    border: '1px solid var(--border-parchment)',
                    borderRadius: '8px'
                  }
                },
                  h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' } },
                    'No dishes match all selected dietary exclusions'
                  ),
                  h('p', { style: { fontSize: '0.88rem', color: 'var(--ink-secondary)', marginBottom: '1rem' } },
                    'Our kitchen prepares every plate fresh to order and can adapt sauces on request.'
                  ),
                  h('button', {
                    type: 'button',
                    className: 'btn-outline-navy',
                    onClick: () => { setActiveDietaryFilters([]); setMenuSearch(''); }
                  }, 'Show Full Menu')
                )
              : groupedCourses.map(([courseName, items]) =>
                  h('div', { key: courseName, className: 'menu-course-group' },
                    h('div', { className: 'course-heading' },
                      h('span', null, courseName),
                      h('span', { style: { fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-secondary)' } },
                        `${items.length} ${items.length === 1 ? 'Plate' : 'Plates'}`
                      )
                    ),
                    h('div', { className: 'menu-grid' },
                      items.map((item) =>
                        h('article', { key: item.id, className: 'dish-card' },
                          item.image && h('img', {
                            src: item.image,
                            alt: item.name,
                            className: 'dish-thumb',
                            loading: 'lazy'
                          }),
                          h('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
                            h('div', null,
                              h('div', { className: 'dish-title-row' },
                                h('h3', { className: 'dish-name' }, item.name),
                                h('span', { className: 'dish-price' }, item.priceDisplay)
                              ),
                              h('p', { className: 'dish-desc' }, item.desc)
                            ),
                            h('div', { className: 'dish-meta-row' },
                              h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.35rem' } },
                                (item.badges || []).map((b) =>
                                  h('span', { key: b, className: 'badge-pill' }, b)
                                ),
                                item.pairing && h('span', { className: 'badge-pill navy', title: 'Sommelier Recommendation' },
                                  `🍷 ${item.pairing}`
                                )
                              ),
                              h('div', { style: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' } },
                                h('button', {
                                  type: 'button',
                                  className: 'btn-outline-navy',
                                  style: { padding: '0.3rem 0.6rem', fontSize: '0.68rem', borderColor: 'var(--border-parchment)' },
                                  onClick: () => setInspectedDish(item)
                                }, 'Allergens & Info'),
                                h('button', {
                                  type: 'button',
                                  className: 'btn-outline-navy',
                                  style: { padding: '0.3rem 0.65rem', fontSize: '0.7rem' },
                                  onClick: () =>
                                    addToBag({
                                      uid: item.id,
                                      name: item.name,
                                      category: item.course,
                                      details: item.pairing ? `Sommelier note: ${item.pairing}` : item.course,
                                      unitPrice: item.price
                                    })
                                }, '+ Table Plan')
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
          ),

          // TAB VIEW B: CURATED WINE CELLAR
          activeMenuTab === 'wine' && h('div', { className: 'wine-grid' },
            filteredWines.map((wine) =>
              h('div', { key: wine.id, className: 'wine-card' },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' } },
                  h('div', null,
                    h('span', { className: 'badge-pill navy', style: { marginBottom: '0.3rem', display: 'inline-block' } },
                      `${wine.style} · ${wine.vintage}`
                    ),
                    h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.22rem', fontWeight: 700 } }, wine.name),
                    h('div', { style: { fontSize: '0.8rem', color: 'var(--ink-secondary)' } },
                      `${wine.region} — ${wine.grape}`
                    )
                  ),
                  h('div', { style: { textAlign: 'right', fontFamily: 'var(--font-mono)', flexShrink: 0 } },
                    wine.glassPrice && h('div', { style: { fontSize: '0.82rem', color: 'var(--crimson)', fontWeight: 700 } },
                      `£${wine.glassPrice} Glass`
                    ),
                    h('div', { style: { fontSize: '0.88rem', fontWeight: 700, color: 'var(--club-navy-surface)' } },
                      `£${wine.bottlePrice} Bottle`
                    )
                  )
                ),
                h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.55rem',
                    borderTop: '1px dashed var(--border-parchment)',
                    marginTop: '0.35rem'
                  }
                },
                  h('span', { style: { fontSize: '0.76rem', color: 'var(--emerald-ok)', fontWeight: 600 } },
                    `Best Paired With: ${wine.pairingTag}`
                  ),
                  h('button', {
                    type: 'button',
                    className: 'btn-outline-navy',
                    style: { padding: '0.26rem 0.6rem', fontSize: '0.68rem' },
                    onClick: () =>
                      addToBag({
                        uid: wine.id,
                        name: `${wine.vintage} ${wine.name} (Bottle)`,
                        category: `Wine Cellar · ${wine.style}`,
                        details: `${wine.region} (${wine.grape})`,
                        unitPrice: wine.bottlePrice
                      })
                  }, '+ Reserve Bottle')
                )
              )
            )
          ),

          // TAB VIEW C: £75pp GROUP & FESTIVE FEASTING CALCULATOR
          activeMenuTab === 'festive_feasting' && h('div', {
            style: {
              background: 'var(--parchment-card)',
              border: '2px solid var(--crimson)',
              borderRadius: '10px',
              padding: '2rem',
              maxWidth: '880px',
              margin: '0 auto'
            }
          },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-parchment)' } },
              h('div', null,
                h('span', { className: 'badge-pill' }, '8 – 16 Guests · Served Family-Style'),
                h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, marginTop: '0.3rem' } },
                  'The One Club Row Sharing Feast (£75pp)'
                ),
                h('p', { style: { fontSize: '0.88rem', color: 'var(--ink-secondary)' } },
                  'Designed for celebratory long lunches and group tables of 8 to 16 guests. Every dish arrives generous and family-style for the table to share.'
                )
              ),
              h('div', { style: { textAlign: 'right', background: 'var(--club-navy-surface)', color: 'var(--parchment)', padding: '0.9rem 1.25rem', borderRadius: '6px' } },
                h('div', { style: { fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--brass-bright)' } }, 'Table Estimate'),
                h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '1.55rem', fontWeight: 700 } }, `£${feastGuestCount * 75}`),
                h('div', { style: { fontSize: '0.74rem' } }, `${feastGuestCount} Guests × £75pp`)
              )
            ),

            h('div', { style: { marginBottom: '1.5rem' } },
              h('label', { className: 'field-label', style: { display: 'block', marginBottom: '0.4rem' } },
                `Select Group Party Size: ${feastGuestCount} Guests`
              ),
              h('input', {
                type: 'range',
                min: 8,
                max: 16,
                value: feastGuestCount,
                onChange: (e) => setFeastGuestCount(Number(e.target.value)),
                style: { width: '100%', accentColor: 'var(--crimson)' }
              })
            ),

            h('div', { className: 'menu-grid', style: { marginBottom: '1.5rem' } },
              [
                { course: '01 · Arrival Snacks', items: 'Warm Pickled Jalapeño Gougères & House Sourdough with Cultured Salted Butter' },
                { course: '02 · Table Starters', items: 'Leeks Vinaigrette with Spiced Hazelnuts · Pugliese Stracciatella & Delicata Squash' },
                { course: '03 · Feasting Mains & Sides', items: 'Grass-Fed Sirloin of Beef with Sauce Au Poivre, Shoestring Fries & Club Row Aged Parmesan Caesar Salad (Vegetarian Rotisserie Cauliflower Chimichurri available individually)' },
                { course: '04 · Finishing Dessert', items: 'Twice-Baked Valrhona Chocolate Cake with Cold Normandy Crème Fraîche' }
              ].map((step) =>
                h('div', { key: step.course, style: { background: '#fff', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-parchment)' } },
                  h('div', { style: { fontWeight: 700, color: 'var(--crimson)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' } }, step.course),
                  h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.12rem', fontWeight: 600 } }, step.items)
                )
              )
            ),

            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' } },
              h('span', { style: { fontSize: '0.8rem', color: 'var(--ink-secondary)' } },
                'Need more than 16 guests? Hire "The Apartment" upstairs for up to 50 seated.'
              ),
              h('button', {
                type: 'button',
                className: 'btn-primary',
                onClick: () => {
                  setResGuests('8–16 Guests (£75pp Feasting)');
                  setResZone('Group Sharing Table (8–16pp)');
                  setReservationModalOpen(true);
                }
              }, `Book ${feastGuestCount}-Guest Feasting Table (£${feastGuestCount * 75})`)
            )
          )
        )
      ),

      // ======================================================================
      // SECTION 2: THE CLUB ROW MARTINI ATELIER ("TELL US HOW YOU LIKE IT")
      // ======================================================================
      h('section', { id: 'martiniSection', className: 'section-block navy-theme' },
        h('div', { className: 'container' },
          pitchAnnotationsOn && h('div', { className: 'pitch-callout', style: { background: 'rgba(19, 19, 51, 0.85)', borderColor: 'var(--brass-bright)' } },
            h('span', { className: 'pitch-callout-badge' }, 'UX Audit Fix #03'),
            h('div', null,
              h('strong', null, 'Turned "Chase Vodka or Tanqueray 10 – Tell Us How You Like It" Into an Interactive Bar Conversion Engine: '),
              'One Club Row’s biggest press hook is its sub-zero martinis and mahogany bar counter, yet their current website buries cocktails in plain text. This interactive Martini Atelier lets guests dial in their exact pour and lock in bar seating.'
            )
          ),

          h('div', { className: 'section-header' },
            h('span', { className: 'section-kicker' }, '02 · “Tell Us How You Like It”'),
            h('h2', { className: 'section-title' }, 'The Club Row Martini Atelier'),
            h('p', { className: 'section-subtitle' },
              'Kept at -18°C in our bar freezers and stirred over crystal block ice. Configure your bespoke house pour and reserve a stool at the mahogany bar.'
            )
          ),

          h('div', { className: 'martini-atelier-grid' },
            // Left: 3-Step Interactive Builder
            h('div', { className: 'atelier-steps-card' },
              h('div', { style: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brass-bright)', marginBottom: '0.6rem' } },
                'Step 01 · Choose Your Freezer-Chilled Base Spirit'
              ),
              h('div', { className: 'option-cards-grid' },
                DATA.martiniConfig.spirits.map((sp) =>
                  h('button', {
                    key: sp.id,
                    type: 'button',
                    className: `atelier-option-btn ${martiniSpiritId === sp.id ? 'active' : ''}`,
                    onClick: () => setMartiniSpiritId(sp.id)
                  },
                    h('div', { style: { fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.2rem' } }, sp.name),
                    h('div', { style: { fontSize: '0.75rem', color: 'var(--text-cream-muted)' } }, sp.note)
                  )
                )
              ),

              h('div', { style: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brass-bright)', marginBottom: '0.6rem' } },
                'Step 02 · Select Vermouth & Dilution Style'
              ),
              h('div', { className: 'option-cards-grid' },
                DATA.martiniConfig.styles.map((st) =>
                  h('button', {
                    key: st.id,
                    type: 'button',
                    className: `atelier-option-btn ${martiniStyleId === st.id ? 'active' : ''}`,
                    onClick: () => setMartiniStyleId(st.id)
                  },
                    h('div', { style: { fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.2rem' } }, st.name),
                    h('div', { style: { fontSize: '0.75rem', color: 'var(--text-cream-muted)' } }, st.desc)
                  )
                )
              ),

              h('div', { style: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brass-bright)', marginBottom: '0.6rem' } },
                'Step 03 · Finishing Garnish'
              ),
              h('div', { className: 'option-cards-grid', style: { marginBottom: 0 } },
                DATA.martiniConfig.garnishes.map((gar) =>
                  h('button', {
                    key: gar.id,
                    type: 'button',
                    className: `atelier-option-btn ${martiniGarnishId === gar.id ? 'active' : ''}`,
                    onClick: () => setMartiniGarnishId(gar.id)
                  },
                    h('div', { style: { fontWeight: 700, fontSize: '0.9rem' } }, gar.name)
                  )
                )
              )
            ),

            // Right: Live Bartender Spec Ticket
            h('div', { className: 'martini-preview-card' },
              h('div', null,
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--club-navy-surface)', paddingBottom: '0.75rem', marginBottom: '1rem' } },
                  h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
                    h(Icon, { name: 'martini', size: 20, color: '#C53627' }),
                    h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase' } },
                      '1CR Bar Docket · -18°C Service'
                    )
                  ),
                  h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--crimson)' } },
                    `£${customMartiniPrice}`
                  )
                ),

                h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.5rem' } },
                  `${selectedSpirit.name.split(' ')[0]} ${selectedStyle.name.split('(')[0].trim()} Martini`
                ),
                h('p', { style: { fontSize: '0.86rem', color: 'var(--ink-secondary)', marginBottom: '1.15rem' } },
                  `${selectedSpirit.name} · ${selectedStyle.desc} · Finished with ${selectedGarnish.name}.`
                ),

                h('div', { style: { background: 'var(--parchment-warm)', padding: '0.95rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.82rem' } },
                  h('div', { style: { fontWeight: 700, color: 'var(--club-navy-surface)', marginBottom: '0.3rem' } },
                    'Recommended Bar Pairing:'
                  ),
                  h('div', null, 'Warm Pickled Jalapeño Gougères (£9) + Cornish Crab Toast (£5 ea)')
                )
              ),

              h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.65rem' } },
                h('button', {
                  type: 'button',
                  className: 'btn-primary',
                  style: { width: '100%' },
                  onClick: () => {
                    addToBag({
                      uid: `martini-${martiniSpiritId}-${martiniStyleId}-${martiniGarnishId}`,
                      name: `Bespoke ${selectedStyle.name.split('(')[0].trim()} Martini`,
                      category: 'Martini Bar Docket',
                      details: `${selectedSpirit.name} · ${selectedGarnish.name}`,
                      unitPrice: customMartiniPrice
                    });
                  }
                }, `Add Bespoke Martini to Evening Plan (£${customMartiniPrice})`),

                h('button', {
                  type: 'button',
                  className: 'btn-outline-navy',
                  style: { width: '100%' },
                  onClick: () => {
                    setResZone('Mahogany Martini Bar Counter');
                    setResSpecialNotes(`Martini Spec on Arrival: ${selectedSpirit.name}, ${selectedStyle.name}, ${selectedGarnish.name}`);
                    setReservationModalOpen(true);
                  }
                }, 'Reserve Mahogany Bar Stool With This Pour')
              )
            )
          )
        )
      ),

      // ======================================================================
      // SECTION 3: "THE APARTMENT" UPSTAIRS PRIVATE DINING & PARTY CONFIGURATOR
      // ======================================================================
      h('section', { id: 'apartmentSection', className: 'section-block warm-theme' },
        h('div', { className: 'container' },
          pitchAnnotationsOn && h('div', { className: 'pitch-callout' },
            h('span', { className: 'pitch-callout-badge' }, 'UX Audit Fix #05'),
            h('div', null,
              h('strong', null, 'Replaced Static PDF + Clunky 15-Field Gravity Form With an Interactive Event Configurator: '),
              'On oneclubrow.com/private-dining/, hosts face an unstyled 15-field form where time dropdowns start at "12:00am", "12:30am", "1:00am" with zero room capacity or package pricing guidance. Our configurator lets corporate & private hosts compare 50-seat dinners vs. 60-guest cocktail parties and calculate budgets instantaneously.'
            )
          ),

          h('div', { className: 'section-header' },
            h('span', { className: 'section-kicker' }, '03 · Upstairs at 1 Club Row'),
            h('h2', { className: 'section-title' }, '“The Apartment” Private Dining & Parties'),
            h('p', { className: 'section-subtitle' },
              'Above our restaurant are a series of grand private rooms in the former apartment of the previous owners—once known for particularly raucous Shoreditch house parties, now hosting private feasts, cocktail receptions, and post-dinner shows.'
            )
          ),

          // 3 Room Layout Mode Cards
          h('div', { className: 'layout-selector-grid' },
            DATA.apartmentPackages.layouts.map((lay) =>
              h('button', {
                key: lay.id,
                type: 'button',
                className: `layout-tab-card ${activeLayoutId === lay.id ? 'active' : ''}`,
                onClick: () => {
                  setActiveLayoutId(lay.id);
                  setEventGuests(lay.defaultGuests);
                }
              },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' } },
                  h('span', { className: 'badge-pill' }, lay.badge),
                  h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--club-navy-surface)' } },
                    `From £${lay.basePricePerHead}pp`
                  )
                ),
                h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.25rem' } },
                  lay.name
                ),
                h('p', { style: { fontSize: '0.8rem', color: 'var(--ink-secondary)' } }, lay.capacityRange)
              )
            )
          ),

          h('div', { className: 'apartment-grid' },
            // Left: Room Preview + Guest & Add-on Controls
            h('div', {
              style: {
                background: 'var(--parchment-card)',
                border: '1px solid var(--border-parchment)',
                borderRadius: '8px',
                padding: '1.6rem'
              }
            },
              h('div', { style: { display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1.2rem', alignItems: 'center', marginBottom: '1.35rem' } },
                h('img', {
                  src: activeApartmentLayout.image,
                  alt: activeApartmentLayout.name,
                  style: { width: '140px', height: '165px', objectFit: 'cover', borderRadius: '4px', border: '2px solid var(--crimson)' }
                }),
                h('div', null,
                  h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 700, marginBottom: '0.35rem' } },
                    activeApartmentLayout.name
                  ),
                  h('p', { style: { fontSize: '0.86rem', color: 'var(--ink-secondary)', marginBottom: '0.7rem' } },
                    activeApartmentLayout.desc
                  ),
                  h('ul', { style: { listStyle: 'none', display: 'grid', gap: '0.3rem', fontSize: '0.8rem' } },
                    activeApartmentLayout.highlights.map((hl) =>
                      h('li', { key: hl, style: { display: 'flex', alignItems: 'center', gap: '0.45rem' } },
                        h(Icon, { name: 'check', size: 14, color: '#236B42' }),
                        hl
                      )
                    )
                  )
                )
              ),

              h('div', { style: { marginBottom: '1.3rem', paddingTop: '1rem', borderTop: '1px solid var(--border-parchment)' } },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' } },
                  h('label', { className: 'field-label' }, 'Number of Guests'),
                  h('span', { style: { fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--crimson)' } },
                    `${apartmentTotalEstimate.guests} Guests (${activeApartmentLayout.capacityRange})`
                  )
                ),
                h('input', {
                  type: 'range',
                  min: activeApartmentLayout.minGuests,
                  max: activeApartmentLayout.maxGuests,
                  value: apartmentTotalEstimate.guests,
                  onChange: (e) => setEventGuests(Number(e.target.value)),
                  style: { width: '100%', accentColor: 'var(--crimson)' }
                })
              ),

              h('div', null,
                h('div', { className: 'field-label', style: { marginBottom: '0.55rem' } },
                  'Curated Enhancements & Post-Dinner Entertainment'
                ),
                h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' } },
                  DATA.apartmentPackages.addons.map((addon) => {
                    const checked = selectedEventAddons.includes(addon.id);
                    return h('button', {
                      key: addon.id,
                      type: 'button',
                      onClick: () =>
                        setSelectedEventAddons((prev) =>
                          prev.includes(addon.id) ? prev.filter((x) => x !== addon.id) : [...prev, addon.id]
                        ),
                      style: {
                        textAlign: 'left',
                        padding: '0.7rem 0.85rem',
                        borderRadius: '6px',
                        border: checked ? '1.5px solid var(--crimson)' : '1px solid var(--border-parchment)',
                        background: checked ? 'var(--crimson-soft)' : '#fff',
                        cursor: 'pointer'
                      }
                    },
                      h('div', { style: { fontWeight: 700, fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' } },
                        h('span', null, addon.name),
                        h('span', { style: { fontFamily: 'var(--font-mono)', color: 'var(--crimson)' } },
                          addon.pricePerHead > 0 ? `+£${addon.pricePerHead}pp` : `+£${addon.flatFee}`
                        )
                      )
                    );
                  })
                )
              )
            ),

            // Right: Live Event Brief & Tripleseat Express Submission
            h('div', { className: 'event-summary-box' },
              h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-navy-light)' } },
                h('div', null,
                  h('div', { style: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brass-bright)' } },
                    'Instant Tripleseat Event Estimate'
                  ),
                  h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.55rem' } }, 'Private Hire Proposal')
                ),
                h('a', {
                  href: DATA.venue.brochurePdfUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'btn-outline-cream',
                  style: { padding: '0.38rem 0.7rem', fontSize: '0.7rem' }
                },
                  h(Icon, { name: 'external', size: 13 }),
                  'Official PDF Brochure'
                )
              ),

              h('div', { className: 'floorplan-card' },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--brass-bright)' } },
                  h('span', null, 'LIVE ARCHITECTURAL FLOORPLAN'),
                  h('span', null, `${apartmentTotalEstimate.guests} GUESTS CONFIGURED`)
                ),
                h(ApartmentFloorplanSvg, { layoutId: activeLayoutId, guests: apartmentTotalEstimate.guests })
              ),

              h('div', { style: { background: 'rgba(19, 19, 51, 0.55)', padding: '1rem', borderRadius: '6px', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' } },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' } },
                  h('span', null, `${apartmentTotalEstimate.guests} Guests × £${apartmentTotalEstimate.perHead}/head`),
                  h('span', null, `£${(apartmentTotalEstimate.guests * apartmentTotalEstimate.perHead).toLocaleString()}`)
                ),
                apartmentTotalEstimate.flat > 0 && h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: 'var(--brass-bright)' } },
                  h('span', null, 'Late-Night Pianist / Entertainment'),
                  h('span', null, `+£${apartmentTotalEstimate.flat}`)
                ),
                h('div', { style: { display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-navy-light)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--brass-bright)' } },
                  h('span', null, 'Estimated Event Total'),
                  h('span', null, `£${apartmentTotalEstimate.total.toLocaleString()}`)
                )
              ),

              eventBriefSubmitted
                ? h('div', { style: { background: 'rgba(52, 211, 153, 0.14)', border: '1px solid #34D399', padding: '1.1rem', borderRadius: '6px', textAlign: 'center' } },
                    h('strong', { style: { color: '#34D399', display: 'block', marginBottom: '0.3rem' } },
                      '✓ Private Event Brief Logged for The Apartment'
                    ),
                    h('p', { style: { fontSize: '0.8rem', color: 'var(--parchment)', marginBottom: '0.75rem' } },
                      `Our Events Manager will reply to ${eventEmail || 'your email'} within 2 business hours with date holds for ${eventDate}.`
                    ),
                    h('button', {
                      type: 'button',
                      className: 'btn-outline-cream',
                      onClick: () => setEventBriefSubmitted(false)
                    }, 'Modify Event Configuration')
                  )
                : h('form', {
                    onSubmit: (e) => {
                      e.preventDefault();
                      setEventBriefSubmitted(true);
                      pushToast('Private Dining & Events enquiry sent to One Club Row Events Team.');
                    },
                    style: { display: 'grid', gap: '0.7rem' }
                  },
                    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' } },
                      h('input', {
                        type: 'date',
                        className: 'field-control',
                        value: eventDate,
                        onChange: (e) => setEventDate(e.target.value),
                        required: true
                      }),
                      h('select', {
                        className: 'field-control',
                        value: eventTimeWindow,
                        onChange: (e) => setEventTimeWindow(e.target.value)
                      },
                        [
                          'Long Lunch Hire (12:00 – 16:30)',
                          'Evening Reception & Dinner (18:30 – 23:30)',
                          'Late Cocktail Party & Piano (19:30 – 01:00)'
                        ].map((w) => h('option', { key: w, value: w }, w))
                      )
                    ),
                    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' } },
                      h('input', {
                        type: 'text',
                        className: 'field-control',
                        placeholder: 'Your Name *',
                        value: eventHostName,
                        onChange: (e) => setEventHostName(e.target.value),
                        required: true
                      }),
                      h('input', {
                        type: 'text',
                        className: 'field-control',
                        placeholder: 'Company / Occasion *',
                        value: eventCompany,
                        onChange: (e) => setEventCompany(e.target.value),
                        required: true
                      })
                    ),
                    h('input', {
                      type: 'email',
                      className: 'field-control',
                      placeholder: 'Work or Personal Email *',
                      value: eventEmail,
                      onChange: (e) => setEventEmail(e.target.value),
                      required: true
                    }),
                    h('button', { type: 'submit', className: 'btn-primary', style: { width: '100%' } },
                      'Request Hold for The Apartment'
                    )
                  )
            )
          )
        )
      ),

      // ======================================================================
      // SECTION 4: NATIVE GIFT VOUCHER STUDIO (Replaces Empty /gift-cards/)
      // ======================================================================
      h('section', { id: 'vouchersSection', className: 'section-block' },
        h('div', { className: 'container' },
          pitchAnnotationsOn && h('div', { className: 'pitch-callout' },
            h('span', { className: 'pitch-callout-badge' }, 'UX Audit Fix #06A'),
            h('div', null,
              h('strong', null, 'Turned Empty "/gift-cards/" Sitemap Page Into a Native Experience Voucher Studio: '),
              'Currently, oneclubrow.com/gift-cards/ is an empty page while the menu bounces users to an external giftpro.co.uk subdomain. Our native studio lets guests personalize a wax-sealed One Club Row gift card and check out without leaving the site.'
            )
          ),

          h('div', { className: 'section-header' },
            h('span', { className: 'section-kicker' }, '04 · Give The Gift of Club Row'),
            h('h2', { className: 'section-title' }, 'Dining & Martini Gift Vouchers'),
            h('p', { className: 'section-subtitle' },
              'Treat friends, colleagues, or fellow martini lovers to a long lunch, an 800g Côte de Boeuf feast, or late-night cocktails in Shoreditch.'
            )
          ),

          h('div', { className: 'apartment-grid' },
            h('div', { className: 'vouchers-grid' },
              DATA.giftVouchers.map((gv) =>
                h('div', { key: gv.id, className: 'voucher-card' },
                  h('div', null,
                    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' } },
                      h('span', { className: 'badge-pill' }, gv.badge),
                      h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--crimson)' } },
                        `£${gv.price}`
                      )
                    ),
                    h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.35rem' } },
                      gv.title
                    ),
                    h('p', { style: { fontSize: '0.84rem', color: 'var(--ink-secondary)', marginBottom: '0.75rem' } },
                      gv.desc
                    )
                  ),
                  h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid var(--border-parchment)' } },
                    h('span', { style: { fontSize: '0.72rem', color: 'var(--ink-muted)' } }, gv.validity),
                    h('button', {
                      type: 'button',
                      className: 'btn-outline-navy',
                      style: { padding: '0.38rem 0.75rem', fontSize: '0.72rem' },
                      onClick: () =>
                        addToBag({
                          uid: `${gv.id}-${voucherRecipient}`,
                          name: `Gift Voucher: ${gv.title}`,
                          category: `For: ${voucherRecipient} (${voucherDelivery})`,
                          details: `Note: "${voucherMessage}"`,
                          unitPrice: gv.price
                        })
                    }, '+ Add Gift Card')
                  )
                )
              )
            ),

            // Live Wax-Sealed Gift Card Personalizer
            h('div', {
              style: {
                background: 'var(--club-navy-surface)',
                color: 'var(--parchment)',
                border: '3px double var(--brass)',
                borderRadius: '10px',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-lg)'
              }
            },
              h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' } },
                h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.55rem' } },
                  h(BirdCrest, { size: 22, color: '#DFB973' }),
                  h('span', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.06em', textTransform: 'uppercase' } },
                    'One Club Row · Gift Bespoke Preview'
                  )
                ),
                h('span', { className: 'badge-pill', style: { background: 'var(--crimson)', color: '#fff' } }, 'Wax-Sealed')
              ),

              h('div', {
                style: {
                  background: 'var(--parchment-card)',
                  color: 'var(--ink-primary)',
                  padding: '1.25rem',
                  borderRadius: '6px',
                  border: '1.5px solid var(--crimson)',
                  marginBottom: '1.15rem'
                }
              },
                h('div', { style: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--crimson)', fontWeight: 700 } },
                  `Presented To: ${voucherRecipient || 'Your Guest'}`
                ),
                h('p', { style: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.18rem', margin: '0.45rem 0' } },
                  `“${voucherMessage}”`
                ),
                h('div', { style: { fontSize: '0.72rem', color: 'var(--ink-secondary)', display: 'flex', justifyContent: 'space-between' } },
                  h('span', null, '1 Club Row, Shoreditch, E1 6JX'),
                  h('span', null, voucherDelivery)
                )
              ),

              h('div', { style: { display: 'grid', gap: '0.65rem' } },
                h('div', null,
                  h('label', { className: 'field-label', style: { color: 'var(--brass-bright)', display: 'block', marginBottom: '0.25rem' } }, 'Recipient Name'),
                  h('input', {
                    type: 'text',
                    className: 'field-control',
                    value: voucherRecipient,
                    onChange: (e) => setVoucherRecipient(e.target.value)
                  })
                ),
                h('div', null,
                  h('label', { className: 'field-label', style: { color: 'var(--brass-bright)', display: 'block', marginBottom: '0.25rem' } }, 'Personal Card Message'),
                  h('input', {
                    type: 'text',
                    className: 'field-control',
                    value: voucherMessage,
                    onChange: (e) => setVoucherMessage(e.target.value)
                  })
                ),
                h('div', null,
                  h('label', { className: 'field-label', style: { color: 'var(--brass-bright)', display: 'block', marginBottom: '0.25rem' } }, 'Delivery Format'),
                  h('select', {
                    className: 'field-control',
                    value: voucherDelivery,
                    onChange: (e) => setVoucherDelivery(e.target.value)
                  },
                    [
                      'Digital Apple/Google Wallet Pass (Instant Email)',
                      'Heavyweight Cream Card with Crimson Wax Seal (+£4 Post)'
                    ].map((d) => h('option', { key: d, value: d }, d))
                  )
                )
              )
            )
          )
        )
      ),

      // ======================================================================
      // SECTION 5: CATEGORIZED PHOTOGRAPHY GALLERY (Justin De Souza & Beca B. Jones)
      // ======================================================================
      h('section', { id: 'gallerySection', className: 'section-block warm-theme' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('span', { className: 'section-kicker' }, '05 · Inside 1 Club Row'),
            h('h2', { className: 'section-title' }, 'The Dining Room, The Bar & The Apartment'),
            h('p', { className: 'section-subtitle' },
              'Photography by Justin De Souza and Beca B. Jones. Filter by space or click any frame to inspect in full resolution.'
            )
          ),

          h('div', { className: 'menu-tabs-bar' },
            [
              { id: 'all', label: 'All Spaces & Plates' },
              { id: 'dining_room', label: 'The Dining Room' },
              { id: 'martinis_bar', label: 'The Martini Bar' },
              { id: 'dishes', label: 'Brasserie Plates' },
              { id: 'the_apartment', label: 'Upstairs at The Apartment' }
            ].map((tab) =>
              h('button', {
                key: tab.id,
                type: 'button',
                className: `menu-tab-btn ${galleryFilter === tab.id ? 'active' : ''}`,
                onClick: () => setGalleryFilter(tab.id)
              }, tab.label)
            )
          ),

          h('div', { className: 'gallery-grid' },
            visibleGallery.map((photo) =>
              h('div', {
                key: photo.id,
                className: 'gallery-item',
                onClick: () => setLightboxPhoto(photo)
              },
                h('div', { className: 'gallery-img-wrap' },
                  h('img', { src: photo.src, alt: photo.title, loading: 'lazy' }),
                  h('div', {
                    style: {
                      position: 'absolute',
                      inset: 'auto 0 0 0',
                      background: 'linear-gradient(to top, rgba(19,19,51,0.92), transparent)',
                      color: 'var(--parchment)',
                      padding: '1.2rem 0.9rem 0.75rem'
                    }
                  },
                    h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700 } }, photo.title),
                    h('div', { style: { fontSize: '0.74rem', color: 'var(--text-cream-muted)' } }, photo.caption)
                  )
                )
              )
            )
          )
        )
      ),

      // ======================================================================
      // SECTION 6: SECRET DOORWAY ARRIVAL GUIDE, FIXED CONTACT & CAREERS
      // ======================================================================
      h('section', { id: 'visitSection', className: 'section-block' },
        h('div', { className: 'container' },
          pitchAnnotationsOn && h('div', { className: 'pitch-callout' },
            h('span', { className: 'pitch-callout-badge' }, 'UX Audit Fix #06B'),
            h('div', null,
              h('strong', null, 'Fixed Broken Contact Link + Added "Secret Staircase" Arrival Wayfinding: '),
              'On oneclubrow.com/contact/, clicking hello@oneclubrow.com mistakenly links back to href="https://oneclubrow.com/home/" instead of opening an email client! First-time guests also frequently walk into The Knave of Clubs pub downstairs by mistake. Our arrival card solves both.'
            )
          ),

          h('div', { className: 'wayfinding-grid' },
            // Left: How to Find the Secret Doorway
            h('div', {
              style: {
                background: 'var(--club-navy-surface)',
                color: 'var(--parchment)',
                border: '2px solid var(--crimson)',
                borderRadius: '10px',
                padding: '2rem'
              }
            },
              h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--brass-bright)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' } },
                h(Icon, { name: 'key', size: 15 }),
                'Arrival & Wayfinding Guide'
              ),
              h('h2', { style: { fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '0.75rem' } },
                'How to Find Our Door on Club Row'
              ),
              h('p', { style: { fontSize: '0.92rem', color: 'var(--text-cream-muted)', marginBottom: '1.25rem' } },
                'We sit on the first floor above The Knave of Clubs pub on the corner of Bethnal Green Road and Club Row. Look for the discreet entrance doorway at 1 Club Row—climb the Victorian staircase straight up into the dining room and bar.'
              ),

              h('div', { style: { display: 'grid', gap: '0.75rem', background: 'rgba(19,19,51,0.55)', padding: '1.15rem', borderRadius: '6px', marginBottom: '1.35rem', fontSize: '0.85rem' } },
                h('div', null,
                  h('strong', { style: { color: 'var(--brass-bright)' } }, 'Address: '),
                  '1 Club Row, Shoreditch, London E1 6JX (2 mins from Shoreditch High Street Overground / 8 mins from Liverpool Street)'
                ),
                h('div', null,
                  h('strong', { style: { color: 'var(--brass-bright)' } }, 'Lunch & Dinner Hours: '),
                  'Tuesday – Saturday: 12:00pm – 2:00pm & 5:30pm – 10:00pm · Sunday: 12:00pm – 2:00pm & 5:30pm – 9:00pm'
                ),
                h('div', null,
                  h('strong', { style: { color: 'var(--brass-bright)' } }, 'Direct Concierge Email (Fixed mailto:): '),
                  h('a', {
                    href: `mailto:${DATA.venue.email}`,
                    style: { textDecoration: 'underline', color: '#fff', fontWeight: 700 }
                  }, DATA.venue.email)
                )
              ),

              h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem' } },
                h('a', {
                  href: DATA.venue.googleMapsUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'btn-primary'
                },
                  h(Icon, { name: 'pin', size: 15 }),
                  'Open in Google Maps'
                ),
                h('a', {
                  href: `mailto:${DATA.venue.email}?subject=Enquiry%20for%20One%20Club%20Row`,
                  className: 'btn-outline-cream'
                },
                  h(Icon, { name: 'mail', size: 15 }),
                  'Email hello@oneclubrow.com'
                )
              )
            ),

            // Right: Careers & Join Our Brigade
            h('div', {
              style: {
                background: 'var(--parchment-card)',
                border: '1.5px solid var(--border-parchment)',
                borderRadius: '10px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }
            },
              h('div', null,
                h('span', { className: 'section-kicker' }, 'Join The Brigade'),
                h('h2', { style: { fontFamily: 'var(--font-serif)', fontSize: '2.1rem', marginBottom: '0.5rem' } },
                  'Careers at One Club Row'
                ),
                h('p', { style: { fontSize: '0.9rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' } },
                  'Our team is the most important part of our restaurant and we are always looking for fun, enthusiastic, and hard-working hospitality professionals to join us.'
                ),

                h('div', { style: { display: 'grid', gap: '0.85rem', marginBottom: '1.35rem' } },
                  DATA.careers.map((job) =>
                    h('div', {
                      key: job.id,
                      style: {
                        background: '#fff',
                        border: '1px solid var(--border-parchment)',
                        borderLeft: '4px solid var(--crimson)',
                        padding: '1rem 1.15rem',
                        borderRadius: '6px'
                      }
                    },
                      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' } },
                        h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700 } }, job.role),
                        h('span', { className: 'badge-pill navy' }, job.department)
                      ),
                      h('p', { style: { fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '0.6rem' } }, job.summary),
                      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                        h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--emerald-ok)' } },
                          job.compensation
                        ),
                        h('a', {
                          href: job.specUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          style: { fontSize: '0.76rem', fontWeight: 700, color: 'var(--crimson)', textDecoration: 'underline' }
                        }, 'Read Role Specification →')
                      )
                    )
                  )
                )
              ),

              h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-parchment)' } },
                h('span', { style: { fontSize: '0.82rem', color: 'var(--ink-secondary)' } },
                  'Send your CV directly to ',
                  h('a', { href: `mailto:${DATA.venue.careersEmail}`, style: { fontWeight: 700, textDecoration: 'underline' } }, DATA.venue.careersEmail)
                ),
                h('a', {
                  href: `mailto:${DATA.venue.careersEmail}?subject=Application%20—%20One%20Club%20Row`,
                  className: 'btn-outline-navy'
                }, 'Apply in 1 Click')
              )
            )
          )
        )
      ),

      // ======================================================================
      // FOOTER
      // ======================================================================
      h('footer', { className: 'site-footer' },
        h('div', { className: 'container', style: { textAlign: 'center' } },
          h('div', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'var(--crimson)', border: '2px solid var(--brass)', marginBottom: '1rem' } },
            h(BirdCrest, { size: 30, color: '#F6F3E3' })
          ),
          h('h2', { style: { fontFamily: 'var(--font-serif)', fontSize: '2.2rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.35rem' } },
            'One Club Row'
          ),
          h('p', { style: { fontSize: '0.88rem', color: 'var(--text-cream-muted)', maxWidth: '520px', margin: '0 auto 1.5rem' } },
            '1 Club Row, Shoreditch, London E1 6JX · Inspired by the taverns of New York and the bistros of Paris.'
          ),
          h('div', { style: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em' } },
            h('a', { href: DATA.venue.instagram, target: '_blank', rel: 'noopener noreferrer', style: { color: 'var(--brass-bright)' } }, 'Instagram (@oneclubrow)'),
            h('a', { href: DATA.venue.sevenRoomsReserveUrl, target: '_blank', rel: 'noopener noreferrer' }, 'SevenRooms Reservations'),
            h('a', { href: DATA.venue.brochurePdfUrl, target: '_blank', rel: 'noopener noreferrer' }, 'Private Dining Brochure'),
            h('a', { href: `mailto:${DATA.venue.email}` }, 'hello@oneclubrow.com'),
            h('button', {
              type: 'button',
              onClick: () => setNewsletterModalOpen(true),
              style: { background: 'none', border: 'none', color: 'var(--brass-bright)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.09em', cursor: 'pointer', textDecoration: 'underline' }
            }, 'Join Club Row Society (Newsletter)')
          ),
          h('div', { style: { fontSize: '0.74rem', color: 'var(--text-cream-muted)', opacity: 0.75 } },
            '© One Club Row Shoreditch · Post-UX Audit Digital Flagship Remake'
          )
        )
      ),

      // ======================================================================
      // FLOATING PITCH INSIGHTS SWITCH (Bottom Left)
      // ======================================================================
      h('div', { className: 'pitch-floating-bar' },
        h('div', {
          className: 'pitch-toggle-switch',
          onClick: () => setPitchAnnotationsOn(!pitchAnnotationsOn)
        },
          h('span', { className: `pitch-toggle-dot ${pitchAnnotationsOn ? 'active' : ''}` }),
          h('span', null, pitchAnnotationsOn ? 'Pitch Callouts: ON' : 'Pitch Callouts: OFF')
        ),
        h('span', { style: { opacity: 0.3 } }, '|'),
        h('button', {
          type: 'button',
          onClick: () => setPitchModalOpen(true),
          style: { background: 'none', border: 'none', color: 'var(--brass-bright)', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }
        }, 'Open Full 6-Point Audit')
      ),

      // ======================================================================
      // MODAL 1: EXECUTIVE UX AUDIT PITCH MODAL (For Presenting to Customer)
      // ======================================================================
      pitchModalOpen && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setPitchModalOpen(false); }
      },
        h('div', { className: 'modal-card wide' },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid var(--club-navy-surface)' } },
            h('div', null,
              h('span', { className: 'badge-pill' }, 'Customer Pitch Deck · Forensic Code Audit'),
              h('h2', { style: { fontFamily: 'var(--font-serif)', fontSize: '2.1rem', fontWeight: 700, marginTop: '0.25rem' } },
                'Why Replace oneclubrow.com With This Flagship?'
              ),
              h('p', { style: { fontSize: '0.88rem', color: 'var(--ink-secondary)' } },
                'We audited the live WordPress/Pinegrow website across all 8 pages. Here are the 6 high-impact conversion & UX upgrades built into this new product:'
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-outline-navy',
              onClick: () => setPitchModalOpen(false)
            }, h(Icon, { name: 'close', size: 16 }))
          ),

          h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' } },
            DATA.auditFindings.map((f) =>
              h('div', {
                key: f.id,
                style: {
                  background: '#fff',
                  border: '1px solid var(--border-parchment)',
                  borderTop: '4px solid var(--crimson)',
                  borderRadius: '6px',
                  padding: '1.1rem'
                }
              },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' } },
                  h('strong', { style: { fontSize: '0.82rem', color: 'var(--club-navy-surface)' } }, f.area),
                  h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, background: 'var(--emerald-bg)', color: 'var(--emerald-ok)', padding: '0.15rem 0.45rem', borderRadius: '4px' } },
                    `${f.currentScore} → ${f.remakeScore}`
                  )
                ),
                h('p', { style: { fontSize: '0.78rem', color: 'var(--ink-secondary)', marginBottom: '0.5rem' } },
                  h('strong', { style: { color: 'var(--crimson)' } }, 'Live Defect: '),
                  f.problem
                ),
                h('p', { style: { fontSize: '0.78rem', color: 'var(--ink-primary)', marginBottom: '0.55rem' } },
                  h('strong', { style: { color: 'var(--emerald-ok)' } }, 'Our Solution: '),
                  f.solution
                ),
                h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--club-navy-surface)' } },
                  `Projected Impact: ${f.impact}`
                )
              )
            )
          ),

          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' } },
            h('span', { style: { fontSize: '0.8rem', color: 'var(--ink-secondary)' } },
              'Tip: Toggle "Pitch Callouts" in the bottom-left bar when demonstrating live to the client.'
            ),
            h('button', {
              type: 'button',
              className: 'btn-primary',
              onClick: () => setPitchModalOpen(false)
            }, 'Return to Interactive Product Demo')
          )
        )
      ),

      // ======================================================================
      // MODAL 2: NATIVE TABLE & BAR RESERVATION CONCIERGE PASS
      // ======================================================================
      reservationModalOpen && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setReservationModalOpen(false); }
      },
        h('div', { className: 'modal-card' },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--club-navy-surface)' } },
            h('div', null,
              h('span', { className: 'badge-pill' }, '1 Club Row, Shoreditch · E1 6JX'),
              h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700 } },
                confirmedReservation ? 'Table & Bar Pass Confirmed' : 'Complete Your Reservation'
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-outline-navy',
              onClick: () => {
                setReservationModalOpen(false);
                setConfirmedReservation(null);
              }
            }, h(Icon, { name: 'close', size: 16 }))
          ),

          confirmedReservation
            ? h('div', null,
                h('div', {
                  style: {
                    background: 'var(--club-navy-surface)',
                    color: 'var(--parchment)',
                    padding: '1.35rem',
                    borderRadius: '8px',
                    border: '2px solid var(--brass)',
                    marginBottom: '1.25rem'
                  }
                },
                  h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--brass-bright)' } },
                    h('span', null, `REF: ${confirmedReservation.code}`),
                    h('span', null, 'STATUS: CONFIRMED')
                  ),
                  h('h4', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.55rem', marginBottom: '0.35rem' } },
                    `${confirmedReservation.guests} · ${confirmedReservation.zone}`
                  ),
                  h('div', { style: { fontSize: '0.86rem', marginBottom: '0.65rem' } },
                    `Date: ${confirmedReservation.date} · Sitting: ${confirmedReservation.session}`
                  ),
                  confirmedReservation.notes && h('div', { style: { fontSize: '0.78rem', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 0.75rem', borderRadius: '4px' } },
                    `Concierge Note: ${confirmedReservation.notes}`
                  )
                ),
                h('p', { style: { fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '1rem' } },
                  'Arrival Note: Enter via the street doorway at 1 Club Row directly beside The Knave of Clubs pub and head up the stairs.'
                ),
                h('div', { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' } },
                  h('button', {
                    type: 'button',
                    className: 'btn-primary',
                    onClick: () => {
                      setReservationModalOpen(false);
                      setConfirmedReservation(null);
                    }
                  }, 'Done'),
                  h('a', {
                    href: DATA.venue.sevenRoomsReserveUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'btn-outline-navy'
                  }, 'Also Open Live SevenRooms Portal ↗')
                )
              )
            : h('form', {
                onSubmit: (e) => {
                  e.preventDefault();
                  setConfirmedReservation({
                    code: '1CR-' + Math.floor(100000 + Math.random() * 900000),
                    guests: resGuests,
                    date: resDate,
                    session: resSession,
                    zone: resZone,
                    name: resGuestName || 'VIP Guest',
                    notes: resSpecialNotes
                  });
                  pushToast(`Reservation Pass issued for ${resGuests} (${resZone}).`);
                },
                style: { display: 'grid', gap: '0.85rem' }
              },
                h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' } },
                  h('div', { className: 'field-group' },
                    h('label', { className: 'field-label' }, 'Party Size'),
                    h('input', { type: 'text', className: 'field-control', value: resGuests, onChange: (e) => setResGuests(e.target.value) })
                  ),
                  h('div', { className: 'field-group' },
                    h('label', { className: 'field-label' }, 'Seating Zone'),
                    h('input', { type: 'text', className: 'field-control', value: resZone, onChange: (e) => setResZone(e.target.value) })
                  )
                ),
                h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' } },
                  h('div', { className: 'field-group' },
                    h('label', { className: 'field-label' }, 'Guest Full Name *'),
                    h('input', {
                      type: 'text',
                      className: 'field-control',
                      placeholder: 'e.g. Eleanor Vance',
                      value: resGuestName,
                      onChange: (e) => setResGuestName(e.target.value),
                      required: true
                    })
                  ),
                  h('div', { className: 'field-group' },
                    h('label', { className: 'field-label' }, 'Email for Pass *'),
                    h('input', {
                      type: 'email',
                      className: 'field-control',
                      placeholder: 'guest@domain.com',
                      value: resGuestEmail,
                      onChange: (e) => setResGuestEmail(e.target.value),
                      required: true
                    })
                  )
                ),
                h('div', { className: 'field-group' },
                  h('label', { className: 'field-label' }, 'Dietary Notes or Martini Arrival Spec'),
                  h('input', {
                    type: 'text',
                    className: 'field-control',
                    placeholder: 'e.g. Two sub-zero Tanqueray 10 Dry Martinis on arrival, 1 gluten-free guest',
                    value: resSpecialNotes,
                    onChange: (e) => setResSpecialNotes(e.target.value)
                  })
                ),
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' } },
                  h('a', {
                    href: DATA.venue.sevenRoomsReserveUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    style: { fontSize: '0.78rem', color: 'var(--club-navy-surface)', textDecoration: 'underline', fontWeight: 600 }
                  }, 'Or continue on SevenRooms ↗'),
                  h('button', { type: 'submit', className: 'btn-primary' }, 'Confirm Instant Booking Pass')
                )
              )
        )
      ),

      // ======================================================================
      // MODAL 3: GALLERY HIGH-RES LIGHTBOX
      // ======================================================================
      lightboxPhoto && h('div', {
        className: 'modal-backdrop',
        onClick: () => setLightboxPhoto(null)
      },
        h('div', {
          className: 'modal-card',
          style: { maxWidth: '580px', textAlign: 'center' },
          onClick: (e) => e.stopPropagation()
        },
          h('img', {
            src: lightboxPhoto.src,
            alt: lightboxPhoto.title,
            style: { width: '100%', maxHeight: '68vh', objectFit: 'cover', borderRadius: '4px', border: '2px solid var(--crimson)', marginBottom: '0.9rem' }
          }),
          h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700 } }, lightboxPhoto.title),
          h('p', { style: { fontSize: '0.86rem', color: 'var(--ink-secondary)', marginBottom: '1rem' } }, lightboxPhoto.caption),
          h('button', { type: 'button', className: 'btn-outline-navy', onClick: () => setLightboxPhoto(null) }, 'Close Frame')
        )
      ),

      // ======================================================================
      // MODAL 4: DISH & 14-ALLERGEN MATRIX INSPECTOR MODAL (Post-Audit Section)
      // ======================================================================
      inspectedDish && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setInspectedDish(null); }
      },
        h('div', { className: 'modal-card' },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', paddingBottom: '0.85rem', borderBottom: '2px solid var(--club-navy-surface)' } },
            h('div', null,
              h('span', { className: 'badge-pill' }, `${inspectedDish.section} · Allergen & Sommelier Guide`),
              h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 700, marginTop: '0.2rem' } },
                inspectedDish.name
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-outline-navy',
              onClick: () => setInspectedDish(null)
            }, h(Icon, { name: 'close', size: 16 }))
          ),

          h('p', { style: { fontSize: '0.9rem', color: 'var(--ink-secondary)', marginBottom: '1rem' } },
            inspectedDish.desc
          ),

          h('div', { style: { marginBottom: '1.15rem' } },
            h('div', { style: { fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--club-navy-surface)', marginBottom: '0.45rem' } },
              'Kitchen Allergen Matrix (Live Audit Upgrade — Replaces Unindexed Menu Text)'
            ),
            h('div', { className: 'allergen-grid-14' },
              ['gluten', 'dairy', 'egg', 'fish', 'shellfish', 'molluscs', 'nuts', 'mustard', 'sulphites'].map((alg) => {
                const present = (inspectedDish.allergens || []).includes(alg);
                return h('div', {
                  key: alg,
                  className: `allergen-status-cell ${present ? 'contains' : 'free'}`
                },
                  h('span', null, present ? '●' : '✓'),
                  h('span', { style: { textTransform: 'capitalize' } }, `${alg}: ${present ? 'Contains' : 'Free'}`)
                );
              })
            )
          ),

          h('div', {
            style: {
              background: 'var(--parchment-warm)',
              border: '1px solid var(--border-parchment)',
              borderLeft: '3px solid var(--crimson)',
              borderRadius: '6px',
              padding: '0.85rem 1rem',
              marginBottom: '1.2rem',
              fontSize: '0.82rem'
            }
          },
            h('strong', { style: { color: 'var(--club-navy-surface)', display: 'block', marginBottom: '0.2rem' } },
              'Sommelier & Bar Pairing Note:'
            ),
            inspectedDish.category === 'raw-snacks' || inspectedDish.allergens?.includes('shellfish') || inspectedDish.allergens?.includes('fish')
              ? 'Pairs with Jacquesson Cuvée No. 746 (£24 gls) or Txakoli Ameztoi Getariako (£10 gls) for crisp mineral acidity.'
              : inspectedDish.category === 'mains'
                ? 'Pairs with Bachelet-Monnot Maranges 1er Cru La Fussière 2022 (£22 gls) or ask our sommelier for our Coravin rare pours.'
                : 'Pairs with our House Sub-Zero Tanqueray 10 Dry Martini (£14) or ratafia service.'
          ),

          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' } },
            h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--crimson)' } },
              `£${inspectedDish.price}`
            ),
            h('div', { style: { display: 'flex', gap: '0.6rem' } },
              h('button', {
                type: 'button',
                className: 'btn-outline-navy',
                onClick: () => setInspectedDish(null)
              }, 'Close'),
              h('button', {
                type: 'button',
                className: 'btn-primary',
                onClick: () => {
                  addToEveningBag({
                    uid: `dish-${inspectedDish.id}`,
                    name: inspectedDish.name,
                    category: inspectedDish.section,
                    unitPrice: inspectedDish.price,
                    details: inspectedDish.desc
                  });
                  setInspectedDish(null);
                }
              }, '+ Add to Evening Plan')
            )
          )
        )
      ),

      // ======================================================================
      // MODAL 5: CLUB ROW SOCIETY & NEWSLETTER MODAL (Replaces 820px iframe)
      // ======================================================================
      newsletterModalOpen && h('div', {
        className: 'modal-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setNewsletterModalOpen(false); }
      },
        h('div', { className: 'modal-card' },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--club-navy-surface)' } },
            h('div', null,
              h('span', { className: 'badge-pill' }, 'Post-Audit Fix · Native React Society Card'),
              h('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700 } },
                'Join the One Club Row Society'
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-outline-navy',
              onClick: () => setNewsletterModalOpen(false)
            }, h(Icon, { name: 'close', size: 16 }))
          ),
          newsletterDone
            ? h('div', { style: { textAlign: 'center', padding: '1.25rem 0' } },
                h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--emerald-ok)', marginBottom: '0.4rem' } },
                  'Welcome to 1 Club Row'
                ),
                h('p', { style: { fontSize: '0.88rem', color: 'var(--ink-secondary)', marginBottom: '1rem' } },
                  'You are on the priority list for live pianist nights, seasonal menus by Chef Patrick Powell, and private dining invitations.'
                ),
                h('button', {
                  type: 'button',
                  className: 'btn-primary',
                  onClick: () => {
                    setNewsletterDone(false);
                    setNewsletterModalOpen(false);
                  }
                }, 'Done')
              )
            : h('form', {
                onSubmit: (e) => {
                  e.preventDefault();
                  setNewsletterDone(true);
                  pushToast('Subscribed to the One Club Row Society.');
                },
                style: { display: 'grid', gap: '0.85rem' }
              },
                h('p', { style: { fontSize: '0.86rem', color: 'var(--ink-secondary)' } },
                  'Receive priority invitations to late-night piano lock-ins, rare wine cellars, and seasonal menu launches above The Knave of Clubs.'
                ),
                h('div', { className: 'field-group' },
                  h('label', { className: 'field-label' }, 'Full Name *'),
                  h('input', {
                    type: 'text',
                    className: 'field-control',
                    placeholder: 'Your Name',
                    value: newsletterName,
                    onChange: (e) => setNewsletterName(e.target.value),
                    required: true
                  })
                ),
                h('div', { className: 'field-group' },
                  h('label', { className: 'field-label' }, 'Email Address *'),
                  h('input', {
                    type: 'email',
                    className: 'field-control',
                    placeholder: 'guest@domain.com',
                    value: newsletterEmail,
                    onChange: (e) => setNewsletterEmail(e.target.value),
                    required: true
                  })
                ),
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.35rem' } },
                  h('a', {
                    href: DATA.venue.sevenRoomsSubscriptionUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    style: { fontSize: '0.76rem', color: 'var(--club-navy-surface)', textDecoration: 'underline', fontWeight: 600 }
                  }, 'Official SevenRooms List ↗'),
                  h('button', { type: 'submit', className: 'btn-primary' }, 'Join the Society')
                )
              )
        )
      ),

      // ======================================================================
      // MOBILE & TABLET SLIDE-OVER NAVIGATION DRAWER (Multi-Device UX)
      // ======================================================================
      mobileNavOpen && h('div', {
        className: 'drawer-backdrop mobile-nav-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setMobileNavOpen(false); }
      },
        h('aside', { className: 'mobile-nav-drawer' },
          h('div', { className: 'mobile-nav-header' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
              h('div', { className: 'brand-crest-badge', style: { width: '38px', height: '38px' } },
                h(BirdCrest, { size: 20, color: '#F6F3E3' })
              ),
              h('div', null,
                h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--parchment)' } },
                  'One Club Row'
                ),
                h('div', { style: { fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--brass-bright)' } },
                  'Shoreditch · Est. 1 Club Row'
                )
              )
            ),
            h('button', {
              type: 'button',
              className: 'mobile-nav-close',
              'aria-label': 'Close Menu',
              onClick: () => setMobileNavOpen(false)
            }, h(Icon, { name: 'close', size: 18, color: '#F6F3E3' }))
          ),
          h('div', { className: 'mobile-nav-body' },
            h('nav', { className: 'mobile-nav-links' },
              [
                { href: '#storySection', num: '01', label: 'The Story & The Trio' },
                { href: '#menuSection', num: '02', label: 'Culinary Menus & Cellar' },
                { href: '#martiniSection', num: '03', label: 'Bespoke Martini Ritual' },
                { href: '#apartmentSection', num: '04', label: 'The Apartment (Private Dining)' },
                { href: '#vouchersSection', num: '05', label: 'Personalized Gift Vouchers' },
                { href: '#gallerySection', num: '06', label: 'Editorial Gallery' },
                { href: '#visitSection', num: '07', label: 'Hours, Location & Entrance' }
              ].map((nav) =>
                h('a', {
                  key: nav.href,
                  href: nav.href,
                  className: 'mobile-nav-item',
                  onClick: () => setMobileNavOpen(false)
                },
                  h('span', { className: 'mobile-nav-num' }, nav.num),
                  h('span', { className: 'mobile-nav-text' }, nav.label),
                  h(Icon, { name: 'arrowRight', size: 14, color: 'var(--brass-bright)' })
                )
              )
            ),
            h('div', { className: 'mobile-nav-actions' },
              h('button', {
                type: 'button',
                className: 'btn-primary',
                style: { width: '100%', height: '46px', fontSize: '0.84rem' },
                onClick: () => {
                  setMobileNavOpen(false);
                  setReservationModalOpen(true);
                }
              },
                h(Icon, { name: 'calendar', size: 16 }),
                'Reserve a Table (SevenRooms)'
              ),
              h('button', {
                type: 'button',
                className: 'btn-outline-cream',
                style: { width: '100%', height: '44px', fontSize: '0.82rem' },
                onClick: () => {
                  setMobileNavOpen(false);
                  setDrawerOpen(true);
                }
              },
                h(Icon, { name: 'bag', size: 16 }),
                `Your Evening Plan (${totalBagCount} items)`
              )
            ),
            h('div', { className: 'mobile-nav-info' },
              h('div', { className: 'mobile-info-row' },
                h('strong', null, 'Address: '),
                '1 Club Row, London E1 6JX (Above The Knave of Clubs)'
              ),
              h('div', { className: 'mobile-info-row' },
                h('strong', null, 'Hours: '),
                'Tue–Sun · 12:00pm – Late (Closed Mon)'
              ),
              h('div', { style: { display: 'flex', gap: '0.6rem', marginTop: '0.65rem' } },
                h('button', {
                  type: 'button',
                  className: 'mobile-audit-btn',
                  onClick: () => {
                    setMobileNavOpen(false);
                    setPitchModalOpen(true);
                  }
                },
                  h(Icon, { name: 'sparkle', size: 13, color: '#DFB973' }),
                  'Open 6-Point UX Audit Pitch Deck'
                )
              )
            )
          )
        )
      ),

      // ======================================================================
      // SLIDE-OVER EVENING PLAN & GIFT VOUCHER CONCIERGE DRAWER
      // ======================================================================
      drawerOpen && h('div', {
        className: 'drawer-backdrop',
        onClick: (e) => { if (e.target === e.currentTarget) setDrawerOpen(false); }
      },
        h('aside', { className: 'concierge-drawer' },
          h('div', { className: 'drawer-header' },
            h('div', null,
              h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700 } },
                'One Club Row Evening Plan'
              ),
              h('div', { style: { fontSize: '0.75rem', color: 'var(--brass-bright)' } },
                'Table Pre-Orders, Bespoke Martinis & Gift Vouchers'
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-outline-cream',
              style: { padding: '0.35rem 0.6rem' },
              onClick: () => setDrawerOpen(false)
            }, h(Icon, { name: 'close', size: 15 }))
          ),

          h('div', { className: 'drawer-body' },
            bagItems.length === 0
              ? h('div', { style: { textAlign: 'center', padding: '3rem 1rem', color: 'var(--ink-secondary)' } },
                  h(Icon, { name: 'martini', size: 32, color: '#C53627' }),
                  h('h4', { style: { fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '0.5rem 0' } },
                    'Your Evening Plan is Empty'
                  ),
                  h('p', { style: { fontSize: '0.84rem' } },
                    'Add plates from Lunch & Dinner, configure a bespoke Martini, or personalize a Gift Voucher.'
                  )
                )
              : bagItems.map((item) =>
                  h('div', {
                    key: item.uid,
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '0.85rem',
                      padding: '0.9rem 0',
                      borderBottom: '1px solid var(--border-parchment)'
                    }
                  },
                    h('div', null,
                      h('span', { className: 'badge-pill navy', style: { marginBottom: '0.2rem', display: 'inline-block' } }, item.category),
                      h('div', { style: { fontWeight: 700, fontSize: '0.92rem' } }, item.name),
                      h('div', { style: { fontSize: '0.76rem', color: 'var(--ink-secondary)', marginBottom: '0.4rem' } }, item.details),
                      h('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--parchment-warm)', padding: '0.15rem 0.55rem', borderRadius: '4px' } },
                        h('button', {
                          type: 'button',
                          style: { border: 'none', background: 'none', fontWeight: 700, cursor: 'pointer' },
                          onClick: () =>
                            setBagItems((prev) =>
                              prev
                                .map((p) => (p.uid === item.uid ? { ...p, qty: p.qty - 1 } : p))
                                .filter((p) => p.qty > 0)
                            )
                        }, '−'),
                        h('span', { style: { fontSize: '0.78rem', fontWeight: 700 } }, item.qty),
                        h('button', {
                          type: 'button',
                          style: { border: 'none', background: 'none', fontWeight: 700, cursor: 'pointer' },
                          onClick: () =>
                            setBagItems((prev) =>
                              prev.map((p) => (p.uid === item.uid ? { ...p, qty: p.qty + 1 } : p))
                            )
                        }, '+')
                      )
                    ),
                    h('div', { style: { textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--crimson)' } },
                      `£${(item.unitPrice * item.qty).toFixed(2).replace(/\.00$/, '')}`
                    )
                  )
                )
          ),

          h('div', { className: 'drawer-footer' },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.85rem' } },
              h('span', null, 'Estimated Total'),
              h('span', { style: { fontFamily: 'var(--font-mono)', color: 'var(--crimson)' } },
                `£${totalBagValue.toFixed(2).replace(/\.00$/, '')}`
              )
            ),
            h('button', {
              type: 'button',
              className: 'btn-primary',
              style: { width: '100%' },
              onClick: () => {
                setDrawerOpen(false);
                setResSpecialNotes(
                  `Pre-selected items (${totalBagCount}): ` +
                    bagItems.map((b) => `${b.qty}x ${b.name}`).join(', ')
                );
                setReservationModalOpen(true);
              }
            }, 'Attach to Table Reservation / Checkout')
          )
        )
      ),

      // ======================================================================
      // SMARTPHONE STICKY BOTTOM TAB BAR (Fixes hidden knave.js mobile footer)
      // ======================================================================
      h('nav', { className: 'mobile-bottom-nav', 'aria-label': 'Mobile Quick Actions' },
        h('a', { href: '#menuSection', className: 'mobile-tab-item' },
          h(Icon, { name: 'utensils', size: 18 }),
          h('span', null, 'Menus')
        ),
        h('a', { href: '#martiniSection', className: 'mobile-tab-item' },
          h(Icon, { name: 'martini', size: 18 }),
          h('span', null, 'Martinis')
        ),
        h('a', { href: '#apartmentSection', className: 'mobile-tab-item' },
          h(Icon, { name: 'users', size: 18 }),
          h('span', null, 'Apartment')
        ),
        h('button', {
          type: 'button',
          className: 'mobile-tab-item',
          onClick: () => setDrawerOpen(true),
          'aria-label': 'Open Evening Plan'
        },
          h(Icon, { name: 'bag', size: 18 }),
          h('span', null, 'Plan'),
          totalBagCount > 0 && h('span', { className: 'mobile-tab-badge' }, totalBagCount)
        ),
        h('button', {
          type: 'button',
          className: 'mobile-tab-item highlight-tab',
          onClick: () => setReservationModalOpen(true),
          'aria-label': 'Reserve a Table'
        },
          h('span', { className: 'highlight-tab-inner' },
            h(Icon, { name: 'calendar', size: 16 }),
            h('span', null, 'Reserve')
          )
        )
      ),

      // Toast Notifications
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
      root.render(h(OneClubRowApp));
    }
  });
})();
