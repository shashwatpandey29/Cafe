/* ==========================================================================
   AURA COFFEE ATELIER — Professional Cafe Data Architecture
   Inspired by Caffè Nero, Blue Bottle Coffee, WatchHouse & Starbucks Reserve
   ========================================================================== */

(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    root.AURA_DATA = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  return {
    brand: {
      name: 'AURA Coffee Atelier',
      shortName: 'AURA',
      tagline: 'Artisan Roastery & Neighborhood Sanctuary',
      subheading: 'Ethically sourced single-origin coffees, slow-fermented bakery goods, and welcoming neighborhood spaces crafted for calm and connection.',
      founded: 2022,
      locationsCount: 3,
      flagshipCity: 'Manchester & London',
      phone: '+44 161 792 8400',
      email: 'hello@auracoffeeatelier.com',
      instagram: '@auracoffeeatelier',
      commitments: [
        { title: 'Direct Trade 88+ Specialty Lots', desc: 'Directly sourced from smallholder cooperatives paying 3.2x Fairtrade minimums.', icon: 'coffee' },
        { title: 'Roasted in Small Batches', desc: 'Daily small-batch roasting in Manchester & London for maximum aromatic sweetness.', icon: 'flame' },
        { title: 'Wildfarmed Flour Bakehouse', desc: 'Sourdough pastries and morning bakes made with regenerative heritage grains.', icon: 'croissant' },
        { title: 'UK Calorie Labelling Transparent', desc: 'Full nutritional and allergen disclosure in compliance with UK food regulations.', icon: 'clipboard' }
      ]
    },

    // ------------------------------------------------------------------------
    // MENU CATEGORIES & ITEMS (With Caffè Nero-Grade Kcals & Allergens)
    // ------------------------------------------------------------------------
    categories: [
      { id: 'all', name: 'All Offerings' },
      { id: 'espresso-classics', name: 'Espresso & Handcrafted Drinks' },
      { id: 'single-origin', name: 'Single-Origin Pour-Overs' },
      { id: 'iced-coldbrew', name: 'Cold Brew & Iced Refreshers' },
      { id: 'botanicals-tea', name: 'Artisan Teas & Botanicals' },
      { id: 'bakery-brunch', name: 'Artisan Bakery & Brunch' }
    ],

    items: [
      // 1. Espresso & Classics
      {
        id: 'drink_flat_white',
        categoryId: 'espresso-classics',
        name: 'Velvet Flat White',
        subtitle: 'Signature double ristretto & glossy micro-foam',
        price: 4.20,
        priceDisplay: '£4.20',
        kcal: 118,
        kj: 494,
        servingSize: '8oz (240ml)',
        caffeine: '140mg',
        allergens: ['Milk (Oat / Soya / Almond available)'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Toasted Macadamia', 'Milk Chocolate', 'Honeycomb'],
        description: 'Our house espresso pulled as a short double ristretto, harmonized with velvety, steamed organic milk poured with delicate latte art.',
        image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: true
      },
      {
        id: 'drink_caffe_latte',
        categoryId: 'espresso-classics',
        name: 'Artisan Caffè Latte',
        subtitle: 'Smooth espresso with a light milk foam collar',
        price: 4.40,
        priceDisplay: '£4.40',
        kcal: 145,
        kj: 607,
        servingSize: '12oz (355ml)',
        caffeine: '140mg',
        allergens: ['Milk (Alt-milks available)'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Sweet Biscuit', 'Caramel Crema', 'Golden Syrup'],
        description: 'A comforting, silky classic made with our signature Classico blend and gently steamed milk finished with a light layer of foam.',
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: true
      },
      {
        id: 'drink_cappuccino',
        categoryId: 'espresso-classics',
        name: 'Traditional Fluffy Cappuccino',
        subtitle: 'Equal thirds espresso, steamed milk & aerated foam',
        price: 4.40,
        priceDisplay: '£4.40',
        kcal: 122,
        kj: 510,
        servingSize: '10oz (300ml)',
        caffeine: '140mg',
        allergens: ['Milk'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Dark Cocoa Dust', 'Sweet Milk', 'Roasted Hazelnut'],
        description: 'Deep espresso topped with dense, velvety aerated foam and lightly dusted with single-origin Venezuelan dark cocoa powder.',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: true
      },
      {
        id: 'drink_cortado',
        categoryId: 'espresso-classics',
        name: 'Spanish Cortado',
        subtitle: 'Equal parts double shot & warm textured milk',
        price: 3.90,
        priceDisplay: '£3.90',
        kcal: 65,
        kj: 272,
        servingSize: '4.5oz (135ml)',
        caffeine: '140mg',
        allergens: ['Milk'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Praline', 'Rich Espresso', 'Brown Sugar'],
        description: 'Served in a traditional faceted glass tumbler. Perfectly cuts the espresso acidity without diluting its rich origin character.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: true
      },
      {
        id: 'drink_doppio_espresso',
        categoryId: 'espresso-classics',
        name: 'Doppio Espresso Classico',
        subtitle: 'Double shot extracted under 9 bars of pressure',
        price: 3.20,
        priceDisplay: '£3.20',
        kcal: 4,
        kj: 17,
        servingSize: '2oz (60ml)',
        caffeine: '150mg',
        allergens: ['None'],
        dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
        flavorNotes: ['Dark Chocolate', 'Ripe Cherry', 'Nutmeg Crema'],
        description: 'Thick hazelnut-toned crema with intense cocoa depth and a natural caramel sweetness from slow roasted high-altitude Arabica.',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: false
      },
      {
        id: 'drink_mocha',
        categoryId: 'espresso-classics',
        name: 'Single-Origin Dark Mocha',
        subtitle: 'Double espresso blended with 70% melted chocolate',
        price: 4.80,
        priceDisplay: '£4.80',
        kcal: 235,
        kj: 983,
        servingSize: '12oz (355ml)',
        caffeine: '145mg',
        allergens: ['Milk', 'Soya (in chocolate)'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Dark Truffle', 'Molasses', 'Silky Crema'],
        description: 'A decadent harmony of freshly extracted espresso and single-estate 70% Colombian melted dark chocolate with micro-textured milk.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: true
      },

      // 2. Single-Origin Pour-Overs
      {
        id: 'pour_ethiopia',
        categoryId: 'single-origin',
        name: 'Ethiopia Yirgacheffe G1 Washed',
        subtitle: 'Direct-Trade Micro-Lot · Adado Cooperative',
        price: 5.20,
        priceDisplay: '£5.20',
        kcal: 5,
        kj: 21,
        servingSize: '12oz (355ml) Carafe',
        caffeine: '140mg',
        allergens: ['None'],
        dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free', '88+ Specialty'],
        flavorNotes: ['Jasmine Flower', 'Bergamot Tea', 'White Nectarine'],
        description: 'Hand-brewed on Kalita Wave drippers. Elegant tea-like clarity with sparkling citrus acidity and fragrant bergamot finish.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: false
      },
      {
        id: 'pour_colombia',
        categoryId: 'single-origin',
        name: 'Colombia Huila Pink Bourbon',
        subtitle: 'Honey Process · Rodrigo Sanchez Valencia',
        price: 5.40,
        priceDisplay: '£5.40',
        kcal: 6,
        kj: 25,
        servingSize: '12oz (355ml) Carafe',
        caffeine: '145mg',
        allergens: ['None'],
        dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free', '88+ Specialty'],
        flavorNotes: ['Caramelized Fig', 'Papaya', 'Toasted Hazelnut'],
        description: 'Naturally sweet and juicy with extended fermentation that unlocks tropical stone fruit sweetness and a honey-coated finish.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: false
      },

      // 3. Cold Brew & Iced Drinks
      {
        id: 'iced_nitro_cold_brew',
        categoryId: 'iced-coldbrew',
        name: 'Draft Nitro Cold Brew',
        subtitle: 'Cascading 16-hour slow steep with creamy head',
        price: 4.80,
        priceDisplay: '£4.80',
        kcal: 8,
        kj: 33,
        servingSize: '12oz (355ml)',
        caffeine: '190mg',
        allergens: ['None'],
        dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
        flavorNotes: ['Dark Cocoa', 'Creamy Guinness Head', 'Vanilla Bean'],
        description: 'Infused with nitrogen on tap to create a velvety, micro-bubble cascade with natural sweetness and zero dairy required.',
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: false
      },
      {
        id: 'iced_vanilla_latte',
        categoryId: 'iced-coldbrew',
        name: 'Iced Madagascar Vanilla Latte',
        subtitle: 'Espresso over cold milk, ice & organic vanilla pod',
        price: 5.10,
        priceDisplay: '£5.10',
        kcal: 182,
        kj: 761,
        servingSize: '16oz (473ml)',
        caffeine: '140mg',
        allergens: ['Milk'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Real Vanilla Caviar', 'Sweet Cream', 'Smooth Espresso'],
        description: 'Double espresso poured over ice and your choice of milk, infused with our house syrup made from real Madagascar vanilla pods.',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: true
      },
      {
        id: 'iced_espresso_tonic',
        categoryId: 'iced-coldbrew',
        name: 'Sparkling Espresso Tonic',
        subtitle: 'Fever-Tree Mediterranean Tonic & floating double shot',
        price: 4.90,
        priceDisplay: '£4.90',
        kcal: 68,
        kj: 285,
        servingSize: '14oz (415ml)',
        caffeine: '140mg',
        allergens: ['None'],
        dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
        flavorNotes: ['Crisp Juniper', 'Meyer Lemon', 'Espresso Foam'],
        description: 'Bright, refreshing and effervescent. Crisp botanical tonic poured over ice and crowned with a floating shot of vibrant espresso.',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: false
      },

      // 4. Botanicals & Teas
      {
        id: 'tea_uji_matcha_latte',
        categoryId: 'botanicals-tea',
        name: 'Ceremonial Uji Matcha Latte',
        subtitle: 'First-harvest shade-grown green tea from Kyoto',
        price: 5.20,
        priceDisplay: '£5.20',
        kcal: 112,
        kj: 468,
        servingSize: '12oz (355ml)',
        caffeine: '65mg (Sustained)',
        allergens: ['Milk (Oat recommended)'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Umami Cream', 'Young Bamboo', 'Sweet Pistachio'],
        description: 'Whisked with traditional bamboo chasen and steamed with silky milk. Rich in natural L-theanine for calm, sustained focus.',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: true
      },
      {
        id: 'tea_golden_turmeric_chai',
        categoryId: 'botanicals-tea',
        name: 'Golden Spiced Chai Elixir',
        subtitle: 'Slow-simmered whole spices, fresh ginger & raw honey',
        price: 4.80,
        priceDisplay: '£4.80',
        kcal: 140,
        kj: 586,
        servingSize: '12oz (355ml)',
        caffeine: '25mg (Gentle Black Tea)',
        allergens: ['Milk'],
        dietary: ['Vegetarian', 'Gluten-Free'],
        flavorNotes: ['Cardamom Pods', 'Fiery Ginger', 'Ceylon Cinnamon'],
        description: 'Freshly brewed whole spices simmered with wild blossom honey and steamed milk for an authentic, deeply warming chai experience.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: true
      },

      // 5. Artisan Bakery & Brunch
      {
        id: 'food_cardamom_knot',
        categoryId: 'bakery-brunch',
        name: 'Swedish Cardamom Knot',
        subtitle: 'Slow-fermented sourdough pastry baked fresh at 6:00 AM',
        price: 3.90,
        priceDisplay: '£3.90',
        kcal: 348,
        kj: 1456,
        servingSize: '1 Bun (110g)',
        caffeine: '0mg',
        allergens: ['Gluten (Wheat)', 'Milk', 'Eggs'],
        dietary: ['Vegetarian'],
        flavorNotes: ['Crushed Green Cardamom', 'Normandy Butter', 'Pearl Sugar'],
        description: 'Our iconic bake. Hand-knotted pastry laminated with cultured butter and studded with freshly mortar-ground fragrant cardamom.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: false
      },
      {
        id: 'food_pistachio_croissant',
        categoryId: 'bakery-brunch',
        name: 'Sicilian Pistachio Croissant',
        subtitle: 'Twice-baked croissant with Bronte pistachio frangipane',
        price: 4.60,
        priceDisplay: '£4.60',
        kcal: 415,
        kj: 1736,
        servingSize: '1 Pastry (130g)',
        caffeine: '0mg',
        allergens: ['Gluten (Wheat)', 'Tree Nuts (Pistachio)', 'Milk', 'Eggs'],
        dietary: ['Vegetarian'],
        flavorNotes: ['Roasted Pistachio', 'Flaky Golden Layers', 'Powdered Sugar'],
        description: 'Generously filled with luscious pistachio frangipane, topped with toasted chopped pistachios and baked until golden and crisp.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: false
      },
      {
        id: 'food_sourdough_tartine',
        categoryId: 'bakery-brunch',
        name: 'Avocado & Whipped Ricotta Tartine',
        subtitle: 'Heritage sourdough, smashed avocado, chilli flakes & seeds',
        price: 7.20,
        priceDisplay: '£7.20',
        kcal: 385,
        kj: 1610,
        servingSize: '1 Plate (210g)',
        caffeine: '0mg',
        allergens: ['Gluten (Wheat)', 'Milk', 'Sesame'],
        dietary: ['Vegetarian'],
        flavorNotes: ['Ripe Hass Avocado', 'Creamy Ricotta', 'Maldon Flaky Salt'],
        description: 'Toasted seeded heritage sourdough topped with house-whipped ricotta, smashed Hass avocado, lemon zest, Aleppo chilli, and toasted seeds.',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
        isPopular: false,
        hasMilkOptions: false
      },
      {
        id: 'food_prosciutto_toastie',
        categoryId: 'bakery-brunch',
        name: 'Truffled Prosciutto & Gruyère Toastie',
        subtitle: 'Hot artisan sourdough melt with Dijon & cornichons',
        price: 7.80,
        priceDisplay: '£7.80',
        kcal: 540,
        kj: 2259,
        servingSize: '1 Sandwich (220g)',
        caffeine: '0mg',
        allergens: ['Gluten (Wheat)', 'Milk', 'Mustard'],
        dietary: [],
        flavorNotes: ['Aged Gruyère', 'Prosciutto di Parma', 'White Truffle Butter'],
        description: 'Pressed hot to order. Aged Gruyère and Fontina cheeses melted over 24-month prosciutto di Parma with truffle butter on sourdough.',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
        isPopular: true,
        hasMilkOptions: false
      }
    ],

    // ------------------------------------------------------------------------
    // MILK COMPARATIVE MATRIX (Caffè Nero Regulatory Standard)
    // ------------------------------------------------------------------------
    milkMatrix: {
      semiSkimmed: { label: 'Organic Semi-Skimmed Dairy', kcal: 118, kj: 494, fat: 4.2, satFat: 2.6, carbs: 11.2, sugars: 11.2, protein: 8.4, salt: 0.22 },
      wholeMilk: { label: 'Organic Whole Dairy Milk', kcal: 165, kj: 690, fat: 9.2, satFat: 5.8, carbs: 11.0, sugars: 11.0, protein: 8.2, salt: 0.20 },
      skimmedMilk: { label: 'Organic Skimmed Milk', kcal: 84, kj: 351, fat: 0.4, satFat: 0.2, carbs: 11.6, sugars: 11.6, protein: 8.6, salt: 0.24 },
      oatMilk: { label: 'Minor Figures Oat Milk', kcal: 138, kj: 577, fat: 5.2, satFat: 0.6, carbs: 20.4, sugars: 8.8, protein: 1.8, salt: 0.18 },
      soyaMilk: { label: 'Organic Soya Milk', kcal: 98, kj: 410, fat: 4.2, satFat: 0.6, carbs: 5.8, sugars: 5.0, protein: 8.0, salt: 0.16 },
      almondMilk: { label: 'Roasted Almond Milk', kcal: 58, kj: 243, fat: 3.2, satFat: 0.4, carbs: 5.6, sugars: 5.4, protein: 1.2, salt: 0.14 },
      coconutMilk: { label: 'Organic Coconut Milk', kcal: 64, kj: 268, fat: 3.8, satFat: 3.4, carbs: 6.2, sugars: 5.2, protein: 0.6, salt: 0.12 }
    },

    nutritionGuidelineNotice: 'Calorie information complies with the UK Calorie Labelling Regulations 2021. Adults need around 2,000 kcal a day.',

    // ------------------------------------------------------------------------
    // ATELIER CLUB LOYALTY PROGRAM (Inspired by Caffè Nero's 9-Stamp Card)
    // ------------------------------------------------------------------------
    loyalty: {
      title: 'The Atelier Coffee Club',
      tagline: 'Buy 9 Handcrafted Coffees, Enjoy Your 10th on Us',
      subtitle: 'Scan your digital stamp pass at any bar. Plus enjoy complimentary birthday pastries, queue-skip mobile ordering, and seasonal nano-lot tastings.',
      stampsRequired: 9,
      currentStamps: 7, // Demo patron has 7 stamps collected
      benefits: [
        'Collect 1 stamp per handcrafted beverage purchased',
        'Your 10th drink is completely on the house — any size, any milk',
        'Complimentary handcrafted pastry on your birthday',
        'Order ahead on mobile for express bar collection',
        'Exclusive invitations to monthly coffee cupping mornings'
      ]
    },

    // ------------------------------------------------------------------------
    // CAFE LOCATIONS & NEIGHBORHOOD SANCTUARIES (Store Locator)
    // ------------------------------------------------------------------------
    locations: [
      {
        id: 'loc_ancoats',
        name: 'Ancoats Roastery & Flagship',
        city: 'Manchester',
        address: '42 Cutting Room Square, Ancoats, M4 5BF',
        hours: 'Monday – Friday: 07:00 – 18:00 · Saturday – Sunday: 08:00 – 18:00',
        phone: '+44 161 792 8400',
        isOpenNow: true,
        features: ['Loring Convection Roastery', 'Outdoor Heated Piazza', 'High-Speed Wi-Fi', 'Dog Friendly', 'Filter Pour-Over Bar'],
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'loc_marylebone',
        name: 'Marylebone Atelier',
        city: 'London',
        address: '18 Chiltern Street, Marylebone, W1U 7QA',
        hours: 'Monday – Saturday: 07:30 – 18:30 · Sunday: 08:30 – 17:30',
        phone: '+44 20 7486 3200',
        isOpenNow: true,
        features: ['Artisan Bakery Counter', 'Acoustic Calm Seating', 'Brew Bar', 'Express Order Pickup'],
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'loc_soho',
        name: 'Soho Espresso Bar',
        city: 'London',
        address: '34 Broadwick Street, Soho, W1F 8HS',
        hours: 'Monday – Sunday: 07:00 – 19:00',
        phone: '+44 20 7946 0880',
        isOpenNow: true,
        features: ['Draft Nitro Tap Bar', 'Fast Express Lane', 'Curated Vinyl Soundscape', 'Standing Bar'],
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
      }
    ],

    // ------------------------------------------------------------------------
    // COFFEE AT HOME SUBSCRIPTIONS (Retail Whole Beans)
    // ------------------------------------------------------------------------
    subscriptions: [
      {
        id: 'sub_curator',
        name: 'The Roaster’s Single-Origin Reserve',
        priceDisplay: '£11.50 / bag',
        cadence: 'Fortnightly or Monthly Delivery',
        description: 'A curated rotation of freshly roasted 88+ single-origin lots with tasting notes, brew cards, and farm transparency stories.',
        grindOptions: ['Whole Bean (Recommended)', 'Cafetiere / French Press', 'Espresso Grind', 'Pour-Over (Filter)'],
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'sub_classico',
        name: 'Atelier Signature Classico Blend',
        priceDisplay: '£10.00 / bag',
        cadence: 'Weekly or Bi-Weekly Delivery',
        description: 'Our rich, chocolatey house espresso blend. Sourced from Colombia and Brazil for a smooth, sweet, and comforting everyday cup.',
        grindOptions: ['Whole Bean (Recommended)', 'Stovetop Moka Pot', 'Espresso Grind', 'Aeropress'],
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
      }
    ]
  };
});
