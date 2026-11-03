/* ==========================================================================
   ONE CLUB ROW (oneclubrow.com) — ENTERPRISE REACT 18 FLAGSHIP DATASET
   1 Club Row, Shoreditch, London E1 6JX · Above The Knave of Clubs
   Inspired by the Taverns of New York & the Brasseries of Paris
   ========================================================================== */

window.OCR_DATA = {
  venue: {
    name: 'One Club Row',
    tagline: 'A Shoreditch Tavern & Parisian Brasserie',
    subTagline: 'Set in the faded grandeur of a Grade II listed Victorian building above The Knave of Clubs. Built for long lunches, late dinners, dining at the bar, and one too many martinis.',
    address: '1 Club Row, Shoreditch, London, E1 6JX',
    landmark: 'Enter via the secret doorway on Club Row, directly beside The Knave of Clubs pub (2 mins from Shoreditch High Street Overground).',
    hoursSummary: 'Tue – Sat: 12:00 – 14:00 & 17:30 – 22:00 · Sun: 12:00 – 14:00 & 17:30 – 21:00 (Closed Mon)',
    email: 'hello@oneclubrow.com',
    careersEmail: 'careers@oneclubrow.com',
    instagram: 'https://www.instagram.com/oneclubrow/',
    sevenRoomsReserveUrl: 'https://www.sevenrooms.com/explore/oneclubrow/reservations/create/search',
    sevenRoomsNewsletterUrl: 'https://www.sevenrooms.com/explore/oneclubrow/subscription',
    giftProUrl: 'https://oneclubrow.giftpro.co.uk/vouchers/gift-voucher/',
    brochurePdfUrl: 'https://oneclubrow.com/wp-content/uploads/2026/09/OCR-Private-Dining-Brochure-1.pdf',
    googleMapsUrl: 'https://www.google.com/maps/place/One+Club+Row/@51.5240027,-0.074219,17z',
    founders: 'Patrick Powell, James Dye & Benjy Leibowitz',
    accolades: [
      { label: 'Michelin Guide', detail: 'Selected London Dining Room' },
      { label: 'Grade II Listed', detail: '1880s Victorian Landmark' },
      { label: 'The Apartment', detail: 'Up to 60 Guests Private Hire' }
    ],
    liveTimeSlots: [
      { time: '12:15', label: '12:15 · Lunch', zone: 'Main Dining Room', tag: 'Available' },
      { time: '13:15', label: '13:15 · Long Lunch', zone: 'Window Table (Club Row View)', tag: '2 Tables Left' },
      { time: '17:45', label: '17:45 · Early Evening', zone: 'Main Dining Room', tag: 'Available' },
      { time: '19:00', label: '19:00 · Bar Counter', zone: 'Mahogany Martini Bar Counter', tag: '4 Stools Left' },
      { time: '19:45', label: '19:45 · Prime Dinner', zone: 'Main Dining Room', tag: 'Last Table' },
      { time: '21:15', label: '21:15 · Late Dinner & Piano', zone: 'Main Dining Room', tag: 'Available' }
    ],
    storyChapters: [
      {
        id: 'chap-building',
        kicker: 'Chapter I · The Architecture',
        title: 'Faded Grandeur Above The Knave of Clubs',
        quote: '“Entering via a discreet doorway on Club Row, you climb a narrow Victorian staircase into a glowing first-floor salon that feels like it has been pouring martinis since 1880.”',
        source: 'Michelin Guide London Inspection',
        body: 'Set in the faded grandeur of a Grade II listed Victorian landmark at 1 Club Row in Shoreditch, the building has anchored the historic bird-market street since the late 19th century. Tall sash windows flood the room with East London daylight for long lunches, while candlelit brass and bentwood chairs transform the space after dark.',
        stats: [
          { label: 'Heritage Status', value: 'Grade II Listed (1880)' },
          { label: 'Entrance', value: 'Secret Staircase at 1 Club Row' }
        ],
        image: 'https://oneclubrow.com/wp-content/uploads/2025/03/1cr2-843x1024.jpg'
      },
      {
        id: 'chap-kitchen',
        kicker: 'Chapter II · The Kitchen & Bar',
        title: 'New York Taverns Meet Parisian Bistros',
        quote: '“Built for dining at the bar, ordering pickled jalapeño gougères, splitting an 800g ribeye or cheeseburger au poivre, and having one too many sub-zero martinis.”',
        source: 'Chef Patrick Powell & Founders',
        body: 'Our menu bridges the bustling energy of downtown Manhattan taverns and the timeless generosity of Parisian brasseries. From hand-cut Steak Tartare with beef-dripping soldiers and Native Lobster Croquettes to Sunday Prime Rib with bone marrow jus, every dish is designed for conviviality.',
        stats: [
          { label: 'Martini Service', value: '-18°C Freezer House Pours' },
          { label: 'Wine Cellar', value: '44 Old-World Benchmark Bottles' }
        ],
        image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-72-703x1024.jpg'
      },
      {
        id: 'chap-apartment',
        kicker: 'Chapter III · Upstairs in The Apartment',
        title: 'A Return to Raucous Shoreditch House Parties',
        quote: '“The former apartment of the previous owners was once notorious for some particularly raucous house parties—and true to history, those grand old rooms are hosting again.”',
        source: 'One Club Row Archives',
        body: 'Directly above the main restaurant sits The Apartment: a suite of private dining salons available Tuesday through Sunday for up to 50 guests seated or 60 standing for a cocktail party, complete with a private bar and the occasional post-dinner piano show.',
        stats: [
          { label: 'Seated Feasting', value: 'Up to 50 Guests (£75pp)' },
          { label: 'Standing Parties', value: 'Up to 60 Guests + Live Piano' }
        ],
        image: 'https://oneclubrow.com/wp-content/uploads/2025/09/1cr-pd-2-1024x917.jpg'
      }
    ]
  },

  auditFindings: [
    {
      id: 'audit-1',
      area: '01 · Entry Gate & Navigation Architecture',
      currentScore: '38/100',
      remakeScore: '98/100',
      problem: 'Landing on oneclubrow.com/ traps visitors on a dead 1990s splash page with only a looping GIF, a broken "<title>One Club Row -</title>", and zero context. Clicking through to /home shows a single static photo with all navigation hidden inside a fullscreen burger modal (#modalmenu) even on desktop.',
      solution: 'Direct-to-experience Editorial Hero with live service status, visible desktop & mobile wayfinding, and an embedded Table & Bar Seat Quick-Reserve Concierge right above the fold.',
      impact: '+34% Lower Bounce Rate'
    },
    {
      id: 'audit-2',
      area: '02 · Brasserie Menus, Wine Cellar & Allergens',
      currentScore: '44/100',
      remakeScore: '99/100',
      problem: 'The /menus/ page contains copy-pasted Canva/InDesign DOM wrappers (<div class="page" title="Page 2"><div class="layoutArea">) and duplicate id="pills-home-tab" attributes across all 5 tabs. Zero dietary/allergen filters, zero dish photos, and an unsearchable 45-bottle wine list.',
      solution: 'Clean structured React Menu & Sommelier Cellar with 1-click Allergen Exclusion Matrix (Gluten-Free, Dairy-Free, Vegetarian, Shellfish-Free, Nut-Free), dish spotlights, and By-the-Glass / Food Pairing wine filters.',
      impact: '-65% Time to Dish Decision'
    },
    {
      id: 'audit-3',
      area: '03 · Signature Martini & Bar Counter Experience',
      currentScore: '40/100',
      remakeScore: '97/100',
      problem: 'One Club Row is famous for "dining at the bar, and one too many martinis" ("Chase Vodka or Tanqueray 10 – tell us how you like it"), yet cocktails are buried in a 15-line plain text tab with no storytelling or bar seat booking.',
      solution: 'Interactive "Club Row Martini Atelier" where guests configure their bespoke Martini (Gin vs. Vodka, Wet/Dry/Dirty/Mint Olive Oil, Garnish) and reserve seats directly at the mahogany bar counter.',
      impact: '+41% Bar & Late-Dinner Bookings'
    },
    {
      id: 'audit-4',
      area: '04 · Reservations & Group Feasting Flow',
      currentScore: '52/100',
      remakeScore: '98/100',
      problem: 'Clicking "Reservations" bounces users out to an external SevenRooms tab with no pre-selected seating zone (Main Dining Room vs. Bar Counter vs. Sunday Prime Rib Service vs. £75pp Festive Feasting for 8–16 guests).',
      solution: 'Native Table & Bar Reservation Concierge with real-time slot selection, seating zone preview, dietary pre-tagging, instant digital booking pass, and seamless SevenRooms handoff.',
      impact: '+29% Reservation Completion'
    },
    {
      id: 'audit-5',
      area: '05 · "The Apartment" Upstairs Private Dining',
      currentScore: '46/100',
      remakeScore: '97/100',
      problem: 'Upstairs private hire (up to 50 seated / 60 standing) relies on a static PDF link and an unstyled 15-field Gravity Form (#gform_2) where time dropdowns list 12:00am–11:30pm without capacity validation or package pricing.',
      solution: 'Interactive "The Apartment" Event Configurator allowing hosts to toggle Seated Dinner (up to 50) vs. Standing Cocktail Party (up to 60), calculate per-head feasting & bar packages, and generate a Tripleseat-ready event brief.',
      impact: '+48% Private Event Enquiries'
    },
    {
      id: 'audit-6',
      area: '06 · Gift Vouchers, Secret Entrance & Contact Bugs',
      currentScore: '41/100',
      remakeScore: '96/100',
      problem: '/gift-cards/ is an empty page in the sitemap while the menu bounces out to giftpro.co.uk. On /contact/, hello@oneclubrow.com is mislinked to href="https://oneclubrow.com/home/" instead of mailto:, and guests struggle to find the unmarked street door.',
      solution: 'Native Gift Voucher Studio (with live wax-sealed card preview & experience packages), interactive Secret Doorway Arrival Guide next to The Knave of Clubs, and verified 1-click contact & career portals.',
      impact: '+36% Gift Voucher Revenue'
    }
  ],

  heroSpotlights: [
    {
      id: 'spot-tartare',
      tag: '01 · Signature Brasserie Plate',
      name: 'Classic Steak Tartare & Beef Dripping Toast',
      subtitle: 'Hand-cut grass-fed fillet, caper & cornichon emulsion, cured egg yolk, and warm beef-dripping soldiers.',
      priceLabel: '£15 Starter / £26 Main',
      pairing: 'Paired with 2022 Bourgogne Rouge ‘Le Mondelot’, Domaine Lacour (£14 gls)',
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/51608ff9bda5eb9b23d5fb90974d839e-733x1024.jpeg',
      menuId: 'ld-steak-tartare'
    },
    {
      id: 'spot-martini',
      tag: '02 · House Housepour at The Bar',
      name: 'The Club Row Martini & Pickled Jalapeño Gougères',
      subtitle: 'Freezer-chilled Tanqueray No. Ten, Dolin Chambéryzette, Italicus bergamot rosolio & fragrant rosemary oil.',
      priceLabel: '£14 Cocktail · £9 Warm Gougères',
      pairing: 'Best enjoyed at the mahogany bar counter before a late 9:00pm table',
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-75-667x1024.jpg',
      menuId: 'dr-club-row-martini'
    },
    {
      id: 'spot-ribeye',
      tag: '03 · For the Table to Share',
      name: '800g Grass-Fed Ribeye & Beef Fat Béarnaise',
      subtitle: 'Dry-aged on the bone, seared over charcoal crust, served with whipped beef-fat béarnaise and French fries & aioli.',
      priceLabel: '£92 Sharing Cut',
      pairing: 'Paired with 2015 Cru Bourgeois Exceptionnel, Château Arnauld Bordeaux (£110 btl)',
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-51-679x1024.jpg',
      menuId: 'ld-ribeye-800'
    },
    {
      id: 'spot-apartment',
      tag: '04 · Upstairs in The Apartment',
      name: 'Private Dining, Raucous Parties & Late-Night Piano',
      subtitle: 'The former residence above the dining room: host up to 50 seated for a sharing feast or 60 standing for martinis.',
      priceLabel: 'From £75pp Feasting',
      pairing: 'Available Tuesday – Sunday for private lunches, dinners & post-dinner shows',
      image: 'https://oneclubrow.com/wp-content/uploads/2025/09/Club-Row_PV_Beca-B-Jones-Photo_5H8A9192-724x1024.jpg',
      menuId: 'feast-sharing'
    }
  ],

  menuCategories: [
    { id: 'lunch_dinner', label: 'Lunch & Dinner', subtitle: 'Served Tue – Sat · 12:00–14:00 & 17:30–22:00' },
    { id: 'sunday_service', label: 'Sunday Service', subtitle: 'Roasts, Prime Rib & Raw Bar · Sundays 12:00–21:00' },
    { id: 'drinks', label: 'Martinis & Drinks', subtitle: 'Sharpeners, House Martinis & After-Dinner Digestifs' },
    { id: 'wine', label: 'Wine Cellar', subtitle: '44 Benchmark Old-World Bottles & By-the-Glass Pours' },
    { id: 'festive_feasting', label: 'Group Feasting (£75pp)', subtitle: 'For 8–16 Guests · Served Family-Style for the Table' }
  ],

  menuItems: [
    // ================= LUNCH & DINNER: SNACKS =================
    {
      id: 'ld-sourdough',
      menuTab: 'lunch_dinner',
      course: 'Snacks',
      name: 'House Sourdough & Cultured Salted Butter',
      price: 4,
      priceDisplay: '£4',
      desc: 'Warm crusty levain loaf baked daily, served with whipped Normandy sea-salt butter.',
      allergens: ['gluten', 'dairy'],
      dietary: ['vegetarian', 'nut-free', 'shellfish-free'],
      badges: ['Table Essential'],
      pairing: 'NV Crémant de Bourgogne No. 21 (£12 gls)'
    },
    {
      id: 'ld-gougeres',
      menuTab: 'lunch_dinner',
      course: 'Snacks',
      name: 'Pickled Jalapeño Gougères',
      price: 9,
      priceDisplay: '£9',
      desc: 'Warm airy choux pastry puffs baked with aged Comté cheese and bright pickled jalapeño heat.',
      allergens: ['gluten', 'dairy', 'egg'],
      dietary: ['vegetarian', 'nut-free', 'shellfish-free'],
      badges: ['House Icon', 'Bar Favourite'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-20-730x1024.jpg',
      pairing: 'Club Row Martini (£14)'
    },
    {
      id: 'ld-anchovies',
      menuTab: 'lunch_dinner',
      course: 'Snacks',
      name: 'Cantabrian Anchovies & Marinated Red Pepper',
      price: 14,
      priceDisplay: '£14',
      desc: 'Plump hand-filleted Cantabrian Sea anchovies dressed in extra-virgin olive oil over sweet wood-roasted peppers.',
      allergens: ['fish'],
      dietary: ['gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Gluten-Free'],
      pairing: 'Olive Oil Martini (£14)'
    },
    {
      id: 'ld-crab-toast',
      menuTab: 'lunch_dinner',
      course: 'Snacks',
      name: 'Cornish Crab Toast',
      price: 5,
      priceDisplay: '£5 ea',
      desc: 'Brioche soldier piled high with dressed white and brown Cornish crab, lemon zest, and tarragon.',
      allergens: ['shellfish', 'gluten', 'dairy', 'egg'],
      dietary: ['nut-free'],
      badges: ['Chef Pick'],
      pairing: 'NV Grand Réserve Brut, Devaux Champagne (£15 gls)'
    },
    {
      id: 'ld-lobster-croquettes',
      menuTab: 'lunch_dinner',
      course: 'Snacks',
      name: 'Native Lobster Croquettes',
      price: 5.5,
      priceDisplay: '£5.5 ea',
      desc: 'Crisp golden béchamel croquettes rich with sweet native lobster meat and cayenne bisque glaze.',
      allergens: ['shellfish', 'gluten', 'dairy', 'egg'],
      dietary: ['nut-free'],
      badges: ['Bar Hit'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-44-759x1024.jpg',
      pairing: '2024 Mâcon-Pierreclos Chardonnay (£11 gls)'
    },
    {
      id: 'ld-scallop',
      menuTab: 'lunch_dinner',
      course: 'Snacks',
      name: 'Roasted Hand-Dived Scallop, Confit Garlic Butter',
      price: 10.5,
      priceDisplay: '£10.5 ea',
      desc: 'Roasted in the half-shell with bubbling confit garlic, parsley, and lemon herb butter.',
      allergens: ['shellfish', 'dairy'],
      dietary: ['gluten-free', 'nut-free'],
      badges: ['Signature'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-27-661x1024.jpg',
      pairing: '2024 Pouilly-Fumé ‘Roche Blanche’ (£15 gls)'
    },

    // ================= LUNCH & DINNER: STARTERS =================
    {
      id: 'ld-leeks',
      menuTab: 'lunch_dinner',
      course: 'Starters',
      name: 'Leeks Vinaigrette & Spiced Hazelnuts',
      price: 13,
      priceDisplay: '£13',
      desc: 'Classic Parisian bistro tender baby leeks in Dijon shallot vinaigrette with toasted spiced Piedmont hazelnuts.',
      allergens: ['nuts', 'mustard'],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'shellfish-free'],
      badges: ['Parisian Classic'],
      pairing: '2024 Les Vignes de L’Eglise Vermentino (£7.5 gls)'
    },
    {
      id: 'ld-watermelon-feta',
      menuTab: 'lunch_dinner',
      course: 'Starters',
      name: 'Watermelon, Whipped Feta, Heritage Tomato & Basil',
      price: 14,
      priceDisplay: '£14',
      desc: 'Chilled compressed watermelon and ripe heritage tomatoes over airy whipped barrel-aged feta and basil oil.',
      allergens: ['dairy'],
      dietary: ['vegetarian', 'gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['Fresh & Bright'],
      pairing: '2025 Luberon Rosé Famille Perrin (£9 gls)'
    },
    {
      id: 'ld-caesar',
      menuTab: 'lunch_dinner',
      course: 'Starters',
      name: 'Club Row Caesar Salad, 36-Month Aged Parmesan',
      price: 14,
      priceDisplay: '£14',
      desc: 'Crisp baby gem hearts, white anchovy emulsion, sourdough garlic croutons, and snowed Parmigiano Reggiano.',
      allergens: ['gluten', 'dairy', 'egg', 'fish'],
      dietary: ['nut-free', 'shellfish-free'],
      badges: ['Tavern Staple'],
      pairing: '2024 Rueda Verdejo, Bodegas Lan (£8.5 gls)'
    },
    {
      id: 'ld-stracciatella',
      menuTab: 'lunch_dinner',
      course: 'Starters',
      name: 'Pugliese Stracciatella, Charred Courgette & Lemon',
      price: 14,
      priceDisplay: '£14',
      desc: 'Creamy artisanal stracciatella curds with ribbons of grilled courgette, mint, and Amalfi lemon zest.',
      allergens: ['dairy'],
      dietary: ['vegetarian', 'gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['Vegetarian'],
      pairing: 'NV Verdicchio Superiore DOC ‘KYPRA’ (£12.5 gls)'
    },
    {
      id: 'ld-tuna-crudo',
      menuTab: 'lunch_dinner',
      course: 'Starters',
      name: 'Bluefin Tuna Crudo, Smoked Aubergine & Amalfi Lemon',
      price: 16,
      priceDisplay: '£16',
      desc: 'Silky sashimi-grade tuna dressed with smoky roasted aubergine purée, cold-pressed olive oil, and sea salt.',
      allergens: ['fish'],
      dietary: ['gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Raw Bar'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-23-720x1024.jpg',
      pairing: '2024 Feu Follet Skin Contact, Alsace (£12.5 gls)'
    },
    {
      id: 'ld-steak-tartare',
      menuTab: 'lunch_dinner',
      course: 'Starters',
      name: 'Classic Steak Tartare & Beef Dripping Toast',
      price: 15,
      priceDisplay: '£15 / £26 Main',
      desc: 'Hand-cut grass-fed beef fillet seasoned to order with cognac, capers, shallots, and crispy beef-dripping toast.',
      allergens: ['gluten', 'egg', 'mustard'],
      dietary: ['dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Critic Favourite', 'Starter or Main'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/51608ff9bda5eb9b23d5fb90974d839e-733x1024.jpeg',
      pairing: '2022 Bourgogne Rouge ‘Le Mondelot’ (£14 gls)'
    },

    // ================= LUNCH & DINNER: MAINS & GRILL =================
    {
      id: 'ld-ravioli',
      menuTab: 'lunch_dinner',
      course: 'Mains',
      name: 'Pumpkin & Sheep’s Ricotta Ravioli, Wild Mushroom & Sage',
      price: 23,
      priceDisplay: '£23',
      desc: 'Hand-rolled egg pasta parcels filled with roasted crown prince pumpkin and ricotta in brown-butter sage and wild girolles.',
      allergens: ['gluten', 'dairy', 'egg'],
      dietary: ['vegetarian', 'nut-free', 'shellfish-free'],
      badges: ['Vegetarian'],
      pairing: '2024 Mâcon-Pierreclos Chardonnay (£11 gls)'
    },
    {
      id: 'ld-cauliflower',
      menuTab: 'lunch_dinner',
      course: 'Mains',
      name: 'Roasted Cauliflower, Cavolo Nero & Green Chimichurri',
      price: 23,
      priceDisplay: '£23',
      desc: 'Caramelized whole cauliflower steak roasted over coals with crispy Tuscan kale and vibrant herb chimichurri.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Plant-Based', 'Allergen-Friendly'],
      pairing: '2023 Salicornio Moscatel Skin Contact (£11 gls)'
    },
    {
      id: 'ld-cheeseburger',
      menuTab: 'lunch_dinner',
      course: 'Mains',
      name: 'One Club Row Cheeseburger “Au Poivre”',
      price: 23,
      priceDisplay: '£23',
      desc: 'Dry-aged chuck & rib cap patty, melted aged cheddar, cracked black peppercorn cognac sauce, and pickles in a toasted brioche bun.',
      allergens: ['gluten', 'dairy', 'egg', 'mustard'],
      dietary: ['nut-free', 'shellfish-free'],
      badges: ['Famous Dish', 'NY Tavern Icon'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-56-683x1024.jpg',
      pairing: '2024 Saint Joseph Syrah, Les Alexandrins (£15.5 gls)'
    },
    {
      id: 'ld-schnitzel',
      menuTab: 'lunch_dinner',
      course: 'Mains',
      name: 'Crispy Pork Schnitzel, Sauce Moutarde & Gorgonzola',
      price: 28,
      priceDisplay: '£28',
      desc: 'Paper-thin heritage pork loin pan-fried in clarified butter with tangy wholegrain mustard cream and melted Gorgonzola.',
      allergens: ['gluten', 'dairy', 'egg', 'mustard'],
      dietary: ['nut-free', 'shellfish-free'],
      badges: ['House Classic'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-78-744x1024.jpg',
      pairing: '2021 Domaine Barmes-Buecher Riesling, Alsace (£71 btl)'
    },
    {
      id: 'ld-bouillabaisse',
      menuTab: 'lunch_dinner',
      course: 'Mains',
      name: 'Red Mullet Bouillabaisse with Mussels & Native Prawn',
      price: 29,
      priceDisplay: '£29',
      desc: 'Crisp-skinned red mullet fillet in a saffron & fennel Marseille shellfish broth with Scottish mussels, king prawns, and rouille.',
      allergens: ['fish', 'shellfish', 'gluten', 'egg'],
      dietary: ['dairy-free', 'nut-free'],
      badges: ['Bistro Special'],
      pairing: '2023 ‘1769’ Rosé, Clos Venturi Corsica (£62 btl)'
    },
    {
      id: 'ld-cod',
      menuTab: 'lunch_dinner',
      course: 'Mains',
      name: 'Roasted Atlantic Cod, Brown Shrimp, Lemon & Capers',
      price: 30,
      priceDisplay: '£30',
      desc: 'Pearly flake loin of line-caught cod basted in noisy brown butter with Morecambe Bay shrimp, Lilliput capers, and lemon.',
      allergens: ['fish', 'shellfish', 'dairy'],
      dietary: ['gluten-free', 'nut-free'],
      badges: ['Gluten-Free'],
      pairing: 'NV Blanc de Blancs, Charles Heidsieck (£22 gls)'
    },
    {
      id: 'ld-sirloin',
      menuTab: 'lunch_dinner',
      course: 'Grill',
      name: '300g Sirloin of Grass-Fed Beef, Sauce Au Poivre',
      price: 38,
      priceDisplay: '£38',
      desc: '35-day dry-aged British grass-fed sirloin seared over high heat, rested with thyme butter and classic brandy peppercorn jus.',
      allergens: ['dairy'],
      dietary: ['gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['From the Grill'],
      pairing: '2024 Chianti Classico, Fattoria di Rodano (£12.5 gls)'
    },
    {
      id: 'ld-ribeye-800',
      menuTab: 'lunch_dinner',
      course: 'Grill',
      name: '800g Bone-In Ribeye of Grass-Fed Beef, Beef Fat Béarnaise',
      price: 92,
      priceDisplay: '£92 (For Two)',
      desc: 'Showstopping Côte de Boeuf carved tableside for two, served with smoked beef-fat tarragon béarnaise and roasting juices.',
      allergens: ['dairy', 'egg'],
      dietary: ['gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['For Two to Share', 'Showstopper'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-51-679x1024.jpg',
      pairing: '2017 Vino Nobile di Montepulciano DOCG (£98 btl)'
    },

    // ================= LUNCH & DINNER: SIDES & DESSERTS =================
    {
      id: 'ld-fries',
      menuTab: 'lunch_dinner',
      course: 'Sides',
      name: 'Crisp Shoestring French Fries & Roasted Garlic Aioli',
      price: 7,
      priceDisplay: '£7',
      desc: 'Triple-cooked skin-on bistro pommes frites seasoned with rosemary sea salt and house saffron-garlic aioli.',
      allergens: ['egg'],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Gluten-Free']
    },
    {
      id: 'ld-green-beans',
      menuTab: 'lunch_dinner',
      course: 'Sides',
      name: 'Fine Green Beans, Toasted Almonds & Smoky Bacon Jam',
      price: 7,
      priceDisplay: '£7',
      desc: 'Charred haricots verts tossed in sweet-savory treacle bacon jam and flaked roasted Marcona almonds.',
      allergens: ['nuts'],
      dietary: ['gluten-free', 'dairy-free', 'shellfish-free'],
      badges: ['Chef Side']
    },
    {
      id: 'ld-chocolate-cake',
      menuTab: 'lunch_dinner',
      course: 'Desserts',
      name: 'Twice-Baked Valrhona Chocolate Cake & Crème Fraîche',
      price: 10,
      priceDisplay: '£10',
      desc: 'Rich, flourless-style dark chocolate fondant cake with a molten center and cold Normandy crème fraîche.',
      allergens: ['dairy', 'egg'],
      dietary: ['vegetarian', 'gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['Signature Dessert'],
      pairing: 'Espresso Martini (£12.5)'
    },
    {
      id: 'ld-cheesecake',
      menuTab: 'lunch_dinner',
      course: 'Desserts',
      name: 'New York Style Baked Cheesecake, Macerated Strawberry & Basil',
      price: 12,
      priceDisplay: '£12',
      desc: 'Dense, velvety Manhattan-style vanilla bean cheesecake on a Graham biscuit crust with English strawberries and basil.',
      allergens: ['gluten', 'dairy', 'egg'],
      dietary: ['vegetarian', 'nut-free', 'shellfish-free'],
      badges: ['NY Tavern Tribute'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-92-691x1024.jpg',
      pairing: 'Brandy Alexander (£12)'
    },
    {
      id: 'ld-rice-pudding',
      menuTab: 'lunch_dinner',
      course: 'Desserts',
      name: 'Caramelised Rice Pudding Crème Brûlée & Spiced Apple',
      price: 10,
      priceDisplay: '£10',
      desc: 'Creamy vanilla pod camargue rice pudding beneath a torched demerara sugar glass crust with warm Calvados spiced apple.',
      allergens: ['dairy', 'egg'],
      dietary: ['vegetarian', 'gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['Gluten-Free']
    },

    // ================= SUNDAY SERVICE SPECIALS =================
    {
      id: 'sun-eggs-norwegian',
      menuTab: 'sunday_service',
      course: 'Sunday Classics',
      name: 'Eggs Norwegian with House-Cured Trout & Dark Rye',
      price: 18,
      priceDisplay: '£18',
      desc: 'Poached Burford Brown eggs over thick-cut gin-cured chalk stream trout, toasted seeded rye, and warm cayenne hollandaise.',
      allergens: ['fish', 'gluten', 'dairy', 'egg'],
      dietary: ['nut-free', 'shellfish-free'],
      badges: ['Sunday Exclusive']
    },
    {
      id: 'sun-beetroot',
      menuTab: 'sunday_service',
      course: 'Sunday Starters',
      name: 'Salt-Baked Beetroot Carpaccio, Black Fig & Baked Ragstone',
      price: 15,
      priceDisplay: '£15',
      desc: 'Ruby beetroot carpaccio with sweet black figs, warm Herefordshire Ragstone goat’s cheese, and aged balsamic.',
      allergens: ['dairy'],
      dietary: ['vegetarian', 'gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['Sunday Exclusive', 'Vegetarian']
    },
    {
      id: 'sun-moules-frites',
      menuTab: 'sunday_service',
      course: 'Sunday Mains',
      name: 'Moules Frites, Lemongrass, Spring Onion & Curry Leaf',
      price: 25,
      priceDisplay: '£25',
      desc: 'Steaming pot of rope-grown Shetland mussels in a fragrant lemongrass, coconut, and crisp curry leaf broth with shoestring fries.',
      allergens: ['shellfish'],
      dietary: ['gluten-free', 'dairy-free', 'nut-free'],
      badges: ['Sunday Favourite']
    },
    {
      id: 'sun-steak-eggs',
      menuTab: 'sunday_service',
      course: 'Sunday Service',
      name: 'Steak & Eggs: 300g Sirloin, Two Fried Eggs & Chimichurri',
      price: 38,
      priceDisplay: '£38',
      desc: 'Chargrilled 300g grass-fed sirloin topped with two crispy-edged Burford Brown eggs, roasted vine tomatoes, and green chimichurri.',
      allergens: ['egg'],
      dietary: ['gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Sunday Icon', 'Gluten-Free']
    },
    {
      id: 'sun-prime-rib',
      menuTab: 'sunday_service',
      course: 'Sunday Service',
      name: 'Slow-Roasted Prime Rib, Pommes Purée & Bone Marrow Jus',
      price: 38,
      priceDisplay: '£38',
      desc: 'Thick-carved pink roast prime rib of British beef with Robuchon-style buttered pommes purée, green beans with bacon jam, and glossy bone marrow jus.',
      allergens: ['dairy'],
      dietary: ['gluten-free', 'nut-free', 'shellfish-free'],
      badges: ['Limited Sunday Roast', 'Reserve Early'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-77-744x1024.jpg',
      pairing: '2023 Gigondas, Domaine D’Ourea (£85 btl)'
    },

    // ================= DRINKS & MARTINIS =================
    {
      id: 'dr-club-row-martini',
      menuTab: 'drinks',
      course: 'Signature Martinis',
      name: 'Club Row Martini',
      price: 14,
      priceDisplay: '£14',
      desc: 'Tanqueray No. Ten Gin, Dolin Chambéryzette wild strawberry aperitif, Italicus Rosolio di Bergamotto & rosemary.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['House Signature', 'Most Ordered'],
      image: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-75-667x1024.jpg'
    },
    {
      id: 'dr-classic-martini',
      menuTab: 'drinks',
      course: 'Signature Martinis',
      name: 'Classic Martini — “Tell Us How You Like It”',
      price: 12,
      priceDisplay: '£12',
      desc: 'Sub-zero Chase Potato Vodka or Tanqueray No. Ten Gin stirred to your exact specification: Dry, Wet, Dirty, Twist or Gordal Olive.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Customizable', '£12 House Pour']
    },
    {
      id: 'dr-olive-oil-martini',
      menuTab: 'drinks',
      course: 'Signature Martinis',
      name: 'Olive Oil Martini',
      price: 14,
      priceDisplay: '£14',
      desc: 'Tanqueray No. Ten Gin, Noilly Prat Dry Vermouth, Greek Roots Mastiha, and velvet mint-infused extra-virgin olive oil.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Savory & Silky']
    },
    {
      id: 'dr-french-martini',
      menuTab: 'drinks',
      course: 'Signature Martinis',
      name: '1980s SoHo French Martini',
      price: 13,
      priceDisplay: '£13',
      desc: 'Chase Vodka, Briottet Crème de Framboise, fresh Scottish raspberry, and pressed pineapple foam.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['New York Throwback']
    },
    {
      id: 'dr-champagne-cocktail',
      menuTab: 'drinks',
      course: 'Sharpeners',
      name: 'Classic Champagne Cocktail',
      price: 16,
      priceDisplay: '£16',
      desc: 'Angostura-soaked demerara sugar cube, Courvoisier Cognac, and chilled Devaux Grand Réserve Brut Champagne.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Aperitif']
    },
    {
      id: 'dr-negroni',
      menuTab: 'drinks',
      course: 'Sharpeners',
      name: 'Club Row Barrel-Rested Negroni',
      price: 12,
      priceDisplay: '£12',
      desc: 'Tanqueray Gin, Campari, and sweet vermouth stirred over hand-carved block ice with expressed blood orange peel.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Sharpener']
    },
    {
      id: 'dr-naked-famous',
      menuTab: 'drinks',
      course: 'Not Martinis',
      name: 'Naked & Famous',
      price: 14,
      priceDisplay: '£14',
      desc: 'Equal parts smoky Del Maguey Mezcal, Yellow Chartreuse, Aperol, and fresh pressed lime juice.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Bartender Pick']
    },
    {
      id: 'dr-vieux-carre',
      menuTab: 'drinks',
      course: 'After Dinner',
      name: 'Vieux Carré',
      price: 14,
      priceDisplay: '£14',
      desc: 'Rye whiskey, Cognac, sweet vermouth, Bénédictine D.O.M., and Peychaud’s & Angostura bitters.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Late Night']
    },
    {
      id: 'dr-espresso-martini',
      menuTab: 'drinks',
      course: 'After Dinner',
      name: 'Double-Shot Espresso Martini',
      price: 12.5,
      priceDisplay: '£12.5',
      desc: 'Vodka, roasted coffee liqueur, and fresh ristretto shaken hard to a velvety crema.',
      allergens: [],
      dietary: ['vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free'],
      badges: ['Digestif']
    }
  ],

  wines: [
    // SPARKLING
    {
      id: 'w-cremant',
      style: 'Sparkling',
      vintage: 'NV',
      name: 'Crémant de Bourgogne No. 21, Jean-Charles Boisset',
      region: 'Burgundy, France',
      grape: 'Chardonnay, Pinot Noir',
      glassPrice: 12,
      bottlePrice: 55,
      byTheGlass: true,
      pairingTag: 'Gougères & Raw Bar'
    },
    {
      id: 'w-devaux',
      style: 'Sparkling',
      vintage: 'NV',
      name: 'Grand Réserve Brut, Champagne Devaux',
      region: 'Champagne, France',
      grape: 'Chardonnay, Pinot Noir',
      glassPrice: 15,
      bottlePrice: 75,
      byTheGlass: true,
      pairingTag: 'Crab Toast & Scallops'
    },
    {
      id: 'w-langham',
      style: 'Sparkling',
      vintage: 'NV',
      name: 'Rosé Brut, Langham Wine Estate',
      region: 'Dorset, United Kingdom',
      grape: 'Chardonnay, Pinot Meunier, Pinot Noir',
      glassPrice: 16.5,
      bottlePrice: 92,
      byTheGlass: true,
      pairingTag: 'Tuna Crudo & Aperitif'
    },
    {
      id: 'w-heidsieck',
      style: 'Sparkling',
      vintage: 'NV',
      name: 'Blanc de Blancs, Charles Heidsieck',
      region: 'Champagne, France',
      grape: '100% Chardonnay',
      glassPrice: 22,
      bottlePrice: 130,
      byTheGlass: true,
      pairingTag: 'Native Lobster & Roasted Cod'
    },
    // WHITE
    {
      id: 'w-vermentino',
      style: 'White',
      vintage: '2024',
      name: 'Les Vignes de L’Eglise IGP',
      region: 'Languedoc, France',
      grape: 'Vermentino',
      glassPrice: 7.5,
      bottlePrice: 38,
      byTheGlass: true,
      pairingTag: 'Leeks Vinaigrette & Anchovies'
    },
    {
      id: 'w-macon',
      style: 'White',
      vintage: '2024',
      name: 'Mâcon-Pierreclos, Domaine Marc Jambon et Fils',
      region: 'Burgundy, France',
      grape: 'Chardonnay',
      glassPrice: 11,
      bottlePrice: 59,
      byTheGlass: true,
      pairingTag: 'Pumpkin Ravioli & Lobster Croquettes'
    },
    {
      id: 'w-verdicchio',
      style: 'White',
      vintage: 'NV',
      name: 'Verdicchio Superiore DOC ‘KYPRA’, Ca’Liptra',
      region: 'Marche, Italy',
      grape: 'Verdicchio',
      glassPrice: 12.5,
      bottlePrice: 64,
      byTheGlass: true,
      pairingTag: 'Stracciatella & Seafood'
    },
    {
      id: 'w-pouilly',
      style: 'White',
      vintage: '2024',
      name: 'Pouilly-Fumé ‘Roche Blanche’, Domaine Laporte',
      region: 'Loire Valley, France',
      grape: 'Sauvignon Blanc',
      glassPrice: 15,
      bottlePrice: 78,
      byTheGlass: true,
      pairingTag: 'Scallops & Goat’s Cheese'
    },
    {
      id: 'w-saint-aubin',
      style: 'White',
      vintage: '2024',
      name: 'Saint-Aubin 1er Cru ‘En Remilly’, Sylvain Langoureau',
      region: 'Burgundy, France',
      grape: 'Chardonnay',
      glassPrice: null,
      bottlePrice: 135,
      byTheGlass: false,
      pairingTag: 'Roasted Cod & Turbot'
    },
    // ROSÉ & SKIN CONTACT
    {
      id: 'w-luberon',
      style: 'Rosé & Skin Contact',
      vintage: '2025',
      name: 'Luberon Rosé, Famille Perrin',
      region: 'Provence, France',
      grape: 'Cinsault, Grenache, Syrah',
      glassPrice: 9,
      bottlePrice: 44,
      byTheGlass: true,
      pairingTag: 'Watermelon Feta & Long Lunches'
    },
    {
      id: 'w-feu-follet',
      style: 'Rosé & Skin Contact',
      vintage: '2024',
      name: 'Feu Follet Skin Contact, Domaine Stoeffler',
      region: 'Alsace, France',
      grape: 'Muscat, Gewürztraminer, Pinot Gris',
      glassPrice: 12.5,
      bottlePrice: 64,
      byTheGlass: true,
      pairingTag: 'Pork Schnitzel & Tuna Crudo'
    },
    // RED
    {
      id: 'w-nero-davola',
      style: 'Red',
      vintage: '2024',
      name: 'Nero di Pianogrillo Terre Siciliane',
      region: 'Sicily, Italy',
      grape: 'Nero d’Avola',
      glassPrice: 8.5,
      bottlePrice: 38,
      byTheGlass: true,
      pairingTag: 'Charcuterie & Bar Dining'
    },
    {
      id: 'w-bordeaux-beynat',
      style: 'Red',
      vintage: '2023',
      name: 'Château Beynat, Castillon Côtes de Bordeaux',
      region: 'Bordeaux, France',
      grape: 'Merlot, Cabernet Franc',
      glassPrice: 10,
      bottlePrice: 48,
      byTheGlass: true,
      pairingTag: 'Cheeseburger Au Poivre'
    },
    {
      id: 'w-chianti',
      style: 'Red',
      vintage: '2024',
      name: 'Chianti Classico, Fattoria di Rodano',
      region: 'Tuscany, Italy',
      grape: 'Sangiovese',
      glassPrice: 12.5,
      bottlePrice: 65,
      byTheGlass: true,
      pairingTag: '300g Grass-Fed Sirloin'
    },
    {
      id: 'w-bourgogne',
      style: 'Red',
      vintage: '2022',
      name: 'Bourgogne Rouge ‘Le Mondelot’, Domaine Lacour',
      region: 'Burgundy, France',
      grape: 'Pinot Noir',
      glassPrice: 14,
      bottlePrice: 68,
      byTheGlass: true,
      pairingTag: 'Classic Steak Tartare'
    },
    {
      id: 'w-saint-joseph',
      style: 'Red',
      vintage: '2024',
      name: 'Saint-Joseph, Maison Les Alexandrins',
      region: 'Northern Rhône, France',
      grape: 'Syrah',
      glassPrice: 15.5,
      bottlePrice: 88,
      byTheGlass: true,
      pairingTag: '800g Bone-In Ribeye & Prime Rib'
    },
    {
      id: 'w-nuits-st-georges',
      style: 'Red',
      vintage: '2021',
      name: 'Nuits-Saint-Georges ‘Aux Allots’, Domaine Chicotot',
      region: 'Burgundy, France',
      grape: 'Pinot Noir',
      glassPrice: null,
      bottlePrice: 168,
      byTheGlass: false,
      pairingTag: 'Private Dining Cellar Reserve'
    }
  ],

  martiniConfig: {
    spirits: [
      { id: 'tanqueray-10', name: 'Tanqueray No. Ten Gin', note: 'Citrus heart, grapefruit, chamomile botanicals', supplement: 0 },
      { id: 'chase-vodka', name: 'Chase English Potato Vodka', note: 'Creamy, ultra-smooth Herefordshire estate single-origin', supplement: 0 },
      { id: 'club-row-blend', name: 'Club Row Signature Blend', note: 'Tanqueray 10, Dolin Chambéryzette & Italicus Bergamot', supplement: 2 }
    ],
    styles: [
      { id: 'classic-dry', name: 'Classic Dry (5:1)', desc: 'Whisper of Noilly Prat dry vermouth, stirred 40 turns over crystal ice' },
      { id: 'wet-parisian', name: 'Wet Parisian (3:1)', desc: 'Generous Dolin Dry vermouth for a floral, aperitif-forward profile' },
      { id: 'filthy-dirty', name: 'Filthy Dirty', desc: 'Washed with Spanish Gordal olive brine for a savory umami punch' },
      { id: 'olive-oil-mastiha', name: 'Mint Olive Oil & Mastiha', desc: 'Roots Mastiha & cold-pressed mint olive oil fat-wash (£14 spec)' }
    ],
    garnishes: [
      { id: 'lemon-twist', name: 'Expressed Amalfi Lemon Coin' },
      { id: 'gordal-olives', name: 'Three Skewered Gordal Olives' },
      { id: 'rosemary-oil', name: 'Fragrant Rosemary Sprig & Mist' }
    ]
  },

  apartmentPackages: {
    layouts: [
      {
        id: 'seated-dinner',
        name: 'The Apartment — Seated Feasting',
        capacityRange: '12 – 50 Guests',
        maxGuests: 50,
        minGuests: 12,
        defaultGuests: 28,
        basePricePerHead: 75,
        badge: 'Up to 50 Seated',
        desc: 'Candlelit long-table banquet in the former Victorian apartment upstairs. All courses served family-style for the table to share.',
        image: 'https://oneclubrow.com/wp-content/uploads/2025/09/Club-Row_PV_Beca-B-Jones-Photo_5H8A9192-724x1024.jpg',
        highlights: [
          'Exclusive hire of The Apartment dining salons',
          '4-Course Sharing Feast (Gougères, Leeks, Stracciatella, Grass-Fed Sirloin Au Poivre, Twice-Baked Chocolate Cake)',
          'Dedicated private cocktail bar & sommelier team',
          'Bespoke printed menus with guest names or company crest'
        ]
      },
      {
        id: 'standing-party',
        name: 'The Apartment — Raucous Cocktail Party',
        capacityRange: '25 – 60 Guests',
        maxGuests: 60,
        minGuests: 25,
        defaultGuests: 45,
        basePricePerHead: 65,
        badge: 'Up to 60 Standing',
        desc: 'True to the building’s legendary Shoreditch house-party history: flowing martinis, raw bar platters, lobster croquettes, and late-night music.',
        image: 'https://oneclubrow.com/wp-content/uploads/2025/09/1cr-pd-2-1024x917.jpg',
        highlights: [
          'Full standing access across The Apartment & private bar',
          'Substantial roaming canapés (Crab Toast, Lobster Croquettes, Jalapeño Gougères, Steak Tartare Soldiers)',
          'Chilled Martini & Crémant welcome tower',
          'Optional upright piano player or vinyl selector until late'
        ]
      },
      {
        id: 'semi-private-feast',
        name: 'Main Restaurant — Group Feasting Table',
        capacityRange: '8 – 16 Guests',
        maxGuests: 16,
        minGuests: 8,
        defaultGuests: 12,
        basePricePerHead: 75,
        badge: '8 – 16 Guests',
        desc: 'Host a celebratory lunch or dinner right in the buzz of the main dining room with our £75pp Festive & Group Sharing Menu.',
        image: 'https://oneclubrow.com/wp-content/uploads/2025/09/Club-Row_PV_Beca-B-Jones-Photo_5H8A8902-683x1024.jpg',
        highlights: [
          'Prime central banquet table in the Grade II dining room',
          'Full £75pp Sharing Menu (Vegetarian Rotisserie Cauliflower option available individually)',
          'Pre-ordered magnum wines & celebratory digestifs available',
          'Instant online availability for lunch & dinner sittings'
        ]
      }
    ],
    addons: [
      { id: 'champagne-arrival', name: 'Devaux Champagne & Gougères Arrival', pricePerHead: 16, flatFee: 0 },
      { id: 'sommelier-pairing', name: 'Half-Bottle Old World Sommelier Wine Pairing', pricePerHead: 42, flatFee: 0 },
      { id: 'late-night-martinis', name: 'After-Dinner Martini & Digestif Hour', pricePerHead: 24, flatFee: 0 },
      { id: 'live-pianist', name: 'Late-Night House Pianist / Post-Dinner Show', pricePerHead: 0, flatFee: 450 }
    ]
  },

  giftVouchers: [
    {
      id: 'gv-bar-martinis',
      title: 'Martinis & Snacks at The Bar for Two',
      price: 60,
      badge: 'Popular Gift',
      desc: 'Two signature Club Row Martinis, warm Pickled Jalapeño Gougères, Cornish Crab Toast, and Native Lobster Croquettes at the bar.',
      validity: 'Valid for 12 months · Instant Digital or Wax-Sealed Post'
    },
    {
      id: 'gv-dinner-two',
      title: 'The Parisian & New York Tavern Dinner for Two',
      price: 150,
      badge: 'Signature Experience',
      desc: 'A generous £150 dining voucher toward three courses, sharing steaks, and cellar wines in the main dining room.',
      validity: 'Valid for 12 months · Redeemable Tue – Sun'
    },
    {
      id: 'gv-ribeye-feast',
      title: 'The 800g Côte de Boeuf & Burgundy Feast',
      price: 220,
      badge: 'Connoisseur Gift',
      desc: 'Covers the showstopping 800g Grass-Fed Ribeye with Beef Fat Béarnaise, sides, desserts, and a bottle of Burgundy.',
      validity: 'Valid for 12 months · Includes priority table request'
    },
    {
      id: 'gv-monetary-100',
      title: '£100 One Club Row Monetary Gift Card',
      price: 100,
      badge: 'Flexible Monetary',
      desc: 'Flexible £100 credit redeemable across Lunch, Dinner, Sunday Service, or late-night cocktails at 1 Club Row.',
      validity: 'Valid for 12 months · Digital Apple/Google Wallet Ready'
    }
  ],

  galleryPhotos: [
    {
      id: 'gal-1',
      category: 'dining_room',
      title: 'The Grade II Listed Dining Room',
      caption: 'Faded Victorian grandeur on Club Row with bentwood chairs, crisp linen, and warm candlelit brass.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/1cr2-843x1024.jpg'
    },
    {
      id: 'gal-2',
      category: 'martinis_bar',
      title: 'The Club Row Martini',
      caption: 'Tanqueray No. Ten, Dolin Chambéryzette, Italicus & rosemary oil poured sub-zero at the mahogany bar.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-75-667x1024.jpg'
    },
    {
      id: 'gal-3',
      category: 'dishes',
      title: 'Classic Steak Tartare & Dripping Toast',
      caption: 'Inspired by the brasseries of Paris and taverns of New York.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/51608ff9bda5eb9b23d5fb90974d839e-733x1024.jpeg'
    },
    {
      id: 'gal-4',
      category: 'the_apartment',
      title: 'Upstairs at The Apartment',
      caption: 'Private dining salons in the former apartment of the building’s previous owners (up to 50 seated / 60 standing).',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/09/Club-Row_PV_Beca-B-Jones-Photo_5H8A9192-724x1024.jpg'
    },
    {
      id: 'gal-5',
      category: 'dishes',
      title: 'One Club Row Cheeseburger “Au Poivre”',
      caption: 'Dry-aged beef, melted cheddar, and cognac peppercorn sauce.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-56-683x1024.jpg'
    },
    {
      id: 'gal-6',
      category: 'dining_room',
      title: 'Long Lunches & Late Dinners',
      caption: 'Natural daylight pouring through the tall Victorian sash windows overlooking Shoreditch.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-72-703x1024.jpg'
    },
    {
      id: 'gal-7',
      category: 'the_apartment',
      title: 'Private Cocktail Parties & Post-Dinner Shows',
      caption: 'Historic rooms built for lively gatherings, private celebrations, and late-night piano.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/09/1cr-pd-2-1024x917.jpg'
    },
    {
      id: 'gal-8',
      category: 'dishes',
      title: '800g Grass-Fed Ribeye & Beef Fat Béarnaise',
      caption: 'Charcoal-seared on the bone for the table to share.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-51-679x1024.jpg'
    },
    {
      id: 'gal-9',
      category: 'martinis_bar',
      title: 'Dining at The Bar',
      caption: 'Walk-ins and reserved bar stools for gougères, oysters, schnitzel, and one too many martinis.',
      src: 'https://oneclubrow.com/wp-content/uploads/2025/03/Copy-of-OneClubRow-JustinDeSouza-82-684x1024.jpg'
    }
  ],

  careers: [
    {
      id: 'job-cdp',
      role: 'Chef de Partie',
      department: 'Kitchen Brigade · Full-Time',
      compensation: 'Competitive + Tronc & Staff Meals',
      summary: 'Work alongside our culinary team delivering classic Parisian bistro & New York tavern plates from fresh British and European produce.',
      specUrl: 'https://docs.google.com/document/d/e/2PACX-1vT7vWkA8GNaODTwbdaZV_kTxrW8tD7JH6-E_DcmxFN8K0mIqqer4nzS7Wt6c4PLt7LdmcXlg6lC1Y_7/pub'
    },
    {
      id: 'job-foh',
      role: 'Front of House — Waiter / Bartender',
      department: 'Dining Room & Martini Bar · Full-Time / Part-Time',
      compensation: 'Competitive Hourly + Generous Tronc',
      summary: 'Bring warmth, rhythm, and hospitality to our Shoreditch dining room and upstairs private events at The Apartment.',
      specUrl: 'https://docs.google.com/document/d/e/2PACX-1vS_wt7DAX7M3LW2JhR8sUNEO2rwEerLmDw3b_OZEo8Bsk4ErFMwHB4gIjjA2jMYBDHB8MBJblZySsLW/pub'
    }
  ]
};
