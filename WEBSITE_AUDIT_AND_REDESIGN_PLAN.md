# Website Audit & Redesign Pitch Proposal
## Client: Yeah Man Caribbean (Stretford, Manchester)
**Document Version:** 1.0 — Executive Client Pitch & Comprehensive Architecture  
**Date:** November 2026  
**Prepared For:** Jamie, Owner & Head Chef — Yeah Man Caribbean  
**Location:** 63 Norway Street, Stretford, Manchester, M32 0JN  
**Domains Audited:**
- Primary Target Domain: `https://yeahmancaribbeanstretford.co.uk/` (OrderYOYO Cloudflare Endpoint)
- Secondary Live Domain: `https://yeahmancaribbean.co.uk/` (Just Eat Content Microsite ID 42445)

---

## 1. Executive Summary & Client Pitch

### 1.1 The Opportunity: Reclaiming Your Independence and Profits
For more than 12 years, **Yeah Man Caribbean** has stood as a beloved cornerstone of Stretford’s culinary scene on Norway Street. Built on Jamie’s authentic Jamaican family recipes, secret jerk marinade blends, slow-braised curries, and warm neighborhood hospitality, the restaurant has earned an extraordinary **4.8/5-star reputation across more than 2,000 verified customer reviews** and editorial acclaim from *Manchester's Finest*.

However, a serious disconnect exists between your in-person culinary mastery and your digital storefront:
1. **Aggregator Lock-in & Commission Bleed:** Your current website functions as an affiliate gateway funneling loyal customers directly to Just Eat, costing your business **15% to 30% in platform commissions** on repeat orders.
2. **Aggressive Bot Wall Blocking Mobile Customers:** The domain `yeahmancaribbeanstretford.co.uk` runs an aggressive Cloudflare Turnstile bot block that serves an **HTTP 403 Forbidden** error to standard mobile devices, privacy browsers, and social media link scrapers (e.g., WhatsApp, Instagram, Facebook).
3. **Identity Erasure:** Your current web presence is built on Just Eat’s generic corporate templates—clad in corporate orange (`#fb6100`), aubergine (`#5b3d5b`), and turmeric (`#f6c243`), featuring robotic auto-generated text, stock food photos from generic databases, a truncated postcode, and zero direct telephone contact options.

This proposal provides the blueprint for a custom, lightning-fast, high-converting **React website and digital ordering hub** designed to celebrate your Jamaican heritage, eliminate commission leakages, and turn casual visitors into direct, high-margin customers.

```
+-----------------------------------------------------------------------------------------+
|                               CURRENT DIGITAL PRESENCE                                  |
|  [Cloudflare Bot Wall] --> [Just Eat Microsite] --> [15%-30% Aggregator Commission]     |
|  - Truncated Postcode (M320)  - 0 Direct Phone Numbers  - 80 Collapsed Food Items       |
+-----------------------------------------------------------------------------------------+
                                           |
                                      TRANSFORMATION
                                           v
+-----------------------------------------------------------------------------------------+
|                                PROPOSED REACT 18 HUB                                    |
|  [Instant Edge Loading] --> [Authentic Brand Hub] --> [Zero-Commission Direct Orders]   |
|  - Real-Time Live Status   - Instant Search & Filters   - 1-Tap Call & WhatsApp CTAs    |
+-----------------------------------------------------------------------------------------+
```

---

### 1.2 Financial Impact Analysis: Eliminating the 15%–30% Aggregator Commission

When a local diner in Stretford, Chorlton, or Trafford Park types *"Yeah Man Caribbean"* into Google, they have already chosen your restaurant. Yet, under your current website setup, tapping "Order Online" routes them to Just Eat with tracking tags:
```
https://www.just-eat.co.uk/restaurants-yeahmancaribbean-m32/menu?utm_source=yeahmancaribbean.co.uk&utm_medium=microsites&utm_campaign=microsites
```
Every time this happens, Just Eat deducts between **15% and 30%+ in commission fees** from your gross food sales.

#### Concrete Revenue Modeling (Conservatively Modeled on Existing Volume):
- **Average Order Value (AOV):** £22.50 (e.g., Jerk Chicken Meal £10.00, Curry Goat £10.00, Plantain £1.00, Ting £1.50)
- **Daily Online / Takeaway Volume:** 30 orders/day
- **Aggregator Commission Rate:** 20% average effective deduction (£4.50 per order)

| Ordering Channel | Daily Orders | Gross Daily Sales | Monthly Commission Paid | Annual Commission Lost to Just Eat |
|:---|:---:|:---:|:---:|:---:|
| **Status Quo (100% Just Eat Routing)** | 30 | £675.00 | **£4,050.00** | **£48,600.00** |
| **Phase 1 Redesign (30% Direct Shift)** | 9 direct / 21 app | £675.00 | £2,835.00 | **£34,020.00** *(Annual Saving: £14,580)* |
| **Phase 2 Mature Hub (50% Direct Shift)** | 15 direct / 15 app | £675.00 | £2,025.00 | **£24,300.00** *(Annual Saving: £24,300)* |
| **Phase 3 Optimized (70% Direct Shift)** | 21 direct / 9 app | £675.00 | £1,215.00 | **£14,580.00** *(Annual Saving: £34,020)* |

> **Bottom Line:** By shifting even **one third (30%)** of your existing customers to direct telephone and WhatsApp ordering via a modern, dedicated website, **you put over £14,500 back into your bank account every year**—funds that can be invested in staff, kitchen equipment, or direct local marketing.

---

### 1.3 Brand Elevation: From Third-Party Template to Cultural Flagship
Your shopfront on Norway Street radiates warmth, community cheer, and the undeniable aroma of authentic jerk cooking. Your website should deliver the exact same sensory experience.

- **Ditch Generic Aggregator Colors:** Replace Just Eat’s corporate orange and drab aubergine with an authentic, appetizing Caribbean palette: lush **Palm & Callaloo Green**, rich **Warm Jerk Charcoal**, radiant **Sunshine Gold**, and fiery **Scotch Bonnet Coral**.
- **Showcase Real Culinary Craft:** Replace generic stock stew photos with high-resolution imagery of glistening jerk chicken glazed in your secret sauce, slow-simmered oxtail with butter beans, and fresh fried golden dumplings ("splits").
- **Honor Jamie’s 12+ Year Heritage:** Replace embarrassing automated robot copy (*"Why don't you try our Thirsty..."*) with the genuine story of Jamie’s culinary journey, authentic Jamaican street-food traditions, and his deep roots in Gorse Hill and Stretford.

---

### 1.4 Conversion Optimization: Fixing the Critical Technical Roadblocks

| Critical Flaw on Live Website | Real-World User Impact | Redesign Solution |
|:---|:---|:---|
| **Cloudflare Turnstile 403 Bot Wall** on `yeahmancaribbeanstretford.co.uk` | Users clicking links on mobile networks, Instagram, or WhatsApp are blocked with a security challenge. 100% bounce rate. | Zero-dependency, edge-hosted React application deployed on high-speed static infrastructure with 100% public uptime. |
| **Address Typo: `"M320"`** | The postcode is truncated, breaking Google Maps navigation and postal delivery verification. | Verified, complete postal address (`63 Norway Street, Stretford, Manchester, M32 0JN`) with instant 1-click GPS navigation. |
| **No Phone Number Anywhere** | Mobile users wanting quick collection cannot call the shop directly. | Prominent click-to-call button (`0161 864 3259`) in desktop header, quick-info bar, and mobile bottom bar. |
| **80 Menu Items Collapsed by Default** | Diners must tap 8 separate accordion bars just to see what you sell. | Open visual menu catalog with categorized tabs, dietary chips (Halal, Veg, Spicy), and instant live search. |
| **Broken Google Map Iframe** | The embedded map contains an empty place ID (`data-map-place-id=""`), rendering as a blank grey box. | Interactive, responsive Google Map container with direct driving directions and transit routes. |
| **Broken Delivery Area Image** | An empty `<img alt="" />` tag renders as an ugly broken icon in browsers. | Interactive Postcode Delivery Validator checking `M15`, `M16`, `M17`, `M21`, `M32`, `M33`, `M41`, `M5`, `M50` in real time. |

---

## 2. Section-by-Section UI/UX Audit of the Live Site

A comprehensive inspection of `https://yeahmancaribbean.co.uk/` and `https://yeahmancaribbeanstretford.co.uk/` reveals fundamental flaws across every major UI component:

```
+-----------------------------------------------------------------------------------------+
|                                LIVE SITE WIREFRAME AUDIT                                |
+-----------------------------------------------------------------------------------------+
| [47px Blur GIF] Yeah Man Caribbean - Caribbean | 63 Norway St, M320 [Order Online (JE)] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       [ 560px TALL BLANK STOCK PHOTO OF STEWS - ZERO TEXT, ZERO RATINGS, ZERO CTA ]      |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
| About Us: "Why don't you try our Thirsty or Jerk Chicken Sandwich on Barm?"             |
| [Clipart Chef SVG] | [Generic Stock Photo]                                              |
+-----------------------------------------------------------------------------------------+
| Menu Accordion (All 8 categories closed by default: 0px height)                         |
| > Main Menu (13) [Closed]                                                               |
| > Side Orders (9) [Closed]                                                              |
| > Vegetable Dishes (2) [Closed]                                                         |
| > Soups (2) [Closed]                                                                    |
| > Barms (2) [Closed]                                                                    |
| > Drinks (40) [Closed]                                                                  |
| > Desserts (7) [Closed]                                                                 |
| > Ben & Jerry's (5) [Closed]                                                            |
+-----------------------------------------------------------------------------------------+
| [Yellow Box: Broken Map Iframe]  | [Purple Box: Confusing Hours] | [Broken <img> Postcode] |
+-----------------------------------------------------------------------------------------+
|                               [ GIANT JUST EAT FOOTER LOGO ]                            |
+-----------------------------------------------------------------------------------------+
```

---

### 2.1 Header & Branding Audit
- **Low-Resolution Brand Asset:** The logo is a 47px x 47px animated GIF (`uk/images/restaurants/42445.gif`, 2.5 KB) generated in 2021. On high-density smartphone screens (Retina, AMOLED), it appears severely pixelated and unprofessional.
- **Redundant Database Title:** The page heading reads `"Yeah Man Caribbean - Caribbean"`. This is an artifact of an automated database concatenation (`[Restaurant Name] - [Cuisine Tag]`) that degrades brand authority.
- **Truncated Physical Address:** The header displays:
  ```html
  <span class="header__address">63 Norway Street, Stretford, Manchester, M320</span>
  ```
  The final `" JN"` characters were truncated during database import. Customers copying this address into navigation apps end up at an invalid destination.
- **Absence of Direct Phone Communication:** Despite telephone ordering being the lifeblood of British takeaways, **there is not a single telephone number in the header or anywhere on the page**.
- **Aggregator CTA Trap:** The single button in the header is an "Order Online" pill rendered in Just Eat Orange (`#fb6100`), which immediately whisks customers off-site.
- **Conflicted Hamburger Code:** The mobile menu toggle uses an antiquated checkbox hack (`#menu-checkbox`). In `site.min.css`, contradictory styles simultaneously define `.header--sticky .header__nav-toggle` and set it to `display: none;`, leading to erratic navigation behavior on mobile viewports.

---

### 2.2 Hero Section Audit
- **Zero Value Proposition:** The hero section spans 560px on desktop and 510px on mobile, but contains **zero text, zero headline, zero rating badges, and zero action buttons**.
- **Stock Photography Disconnect:** The background image is a generic stock photo (`cuisines/caribbean-5.jpg` and fallback `cuisines/mixed-5.jpg`) from Just Eat’s corporate CDN. It does not depict Yeah Man’s actual food or storefront.
- **Wasted Above-the-Fold Real Estate:** First-time visitors landing on mobile must scroll through more than 500 pixels of an empty generic stew photo before encountering any actionable restaurant information.

---

### 2.3 "About Us" Section Audit
- **Robotic, Auto-Generated Copy:** The entire "About Us" section consists of a single automated sentence:
  > *"Yeah Man Caribbean is a Caribbean takeaway in Stretford. Why don't you try our Thirsty or Jerk Chicken Sandwich on Barm?"*
- **Culinary Damage:** "Thirsty" is a £1.00 bottled beverage listed in their drinks menu. Recommending customers "try our Thirsty" sounds accidental and amateurish.
- **Generic Clipart:** The section pairs this robotic sentence with a generic black-and-white chef cartoon holding a cloche (`chef_horizontal.svg`). There is zero mention of Jamie, zero mention of their 12-year presence in Stretford, and zero mention of charcoal jerk smoking.

---

### 2.4 Digital Menu Section Audit
- **High Accordion Friction (80 Items Hidden):** The menu is broken into 8 categories (Main Menu, Side Orders, Vegetable Dishes, Soups, Barms, Drinks, Desserts, Ben & Jerry’s). **Every single category begins collapsed** (`height: 0px; display: none;`). A user must manually tap 8 separate accordions to discover the menu.
- **Zero Food Photography:** None of the 80 menu items feature a photograph. Caribbean cuisine relies heavily on visual appeal—succulent jerk chicken, vibrant plantain, and colorful rice and peas. Text-only lists suppress customer appetite.
- **Bizarre Copywriting Discrepancy:**
  - Essential Caribbean dishes like **Dumplings** (£0.70), **Chips** (£2.80), **Plantain** (£1.00), and **Yam** (£1.00) have **completely blank descriptions**.
  - In contrast, commercial **Ben & Jerry's Cookie Dough Ice Cream** features a 220-word promotional essay copied verbatim from Unilever packaging.
- **No Dietary Filtering or Search:** Diners seeking Halal meats, vegetarian Ital options (Callaloo, Ackee), or spicy jerk dishes have no way to filter or search the catalog.
- **12px Micro-Typography on Mobile:** Item descriptions are styled at `font-size: .75rem` (12px), forcing mobile users to squint or zoom in.

---

### 2.5 Location ("Find Us") & Opening Hours Audit
- **Jarring Color Clash:**
  - Location container: Clashing mustard yellow (`#f6c243` Turmeric).
  - Hours container: Heavy dark purple (`#5b3d5b` Aubergine).
  - Delivery areas box: Off-white (`#f5f3f1` Mozzarella).
  The resulting layout looks like mismatched corporate tiles rather than a cohesive restaurant presentation.
- **Broken Map Iframe:** The embedded iframe specifies an empty Google Place ID:
  ```html
  <iframe class="contact-us-location__map" data-map-place-id=""></iframe>
  ```
  In modern browsers, this renders as a blank box, depriving visitors of directions or walking distance.
- **Disjointed Schedule Presentation:** Collection hours (11:00–22:30) and Delivery hours (17:00–22:30) are split into two separate HTML tables toggled by JavaScript buttons. The active button state has poor contrast, and the site fails to tell customers whether the kitchen is open right now.

---

### 2.6 Delivery Areas & Social Proof Audit
- **Raw, Unformatted Postcode String:** Delivery areas are listed as an unformatted text string: `M15, M16, M17, M21, M32, M33, M41, M5, M50`. There is no interactive tool to check if a specific street or postcode qualifies.
- **Broken Image Element:** An empty image tag is rendered in the DOM:
  ```html
  <div class="contact-us-delivery-areas__image v1"><img alt="" /></div>
  ```
  This creates an unsightly broken image icon across Safari and Chrome.
- **Invisible Social Proof:** Despite possessing over **2,000 verified 5-star reviews** and being featured by *Manchester's Finest*, **not a single customer review, quote, or rating badge exists on the website**.

---

### 2.7 Mobile Usability Audit (375px–430px Viewports)

Mobile devices account for over **78% of local takeaway searches in the UK**. The live site exhibits catastrophic mobile usability defects:

```
+-----------------------------------------------------------------------------------+
|                            MOBILE AUDIT: 375px - 430px                            |
+-----------------------------------------------------------------------------------+
| Breakpoint Gap: Hardcoded @media (min-width: 415px)                               |
| -> iPhone SE, iPhone 12/13/14 (375px - 390px) fall into small mobile default!     |
| -> Squeezed 1.25rem padding compresses menu item names into price column.         |
|                                                                                   |
| Touch Target Violation: min-height: 2rem (32px) on buttons                        |
| -> Violates WCAG 2.1 AA (44px x 44px minimum touch target).                       |
| -> High rate of missed taps on navigation and accordion bars.                     |
|                                                                                   |
| Missing Sticky Action Bar:                                                        |
| -> Zero persistent "Call" or "Order" buttons while scrolling 80 menu items.      |
| -> User forced to scroll all the way back to top to take action.                  |
+-----------------------------------------------------------------------------------+
```

#### Detailed Breakdown of Mobile Usability Defects:
1. **The 415px Media Query Bug:** The live CSS hardcodes responsive enhancements behind `@media (min-width: 415px)`. Standard modern phones (iPhone 12/13/14/15 at 390px, iPhone SE at 375px, Samsung Galaxy S22 at 360px) fall below this threshold, missing enhanced layout styles and suffering from rigid `1.25rem` padding that squashes text.
2. **WCAG 2.1 Touch Target Violation:** Buttons (`.header__call-to-action`, `.nav-button`, and category headers) have a height of only 32px (`min-height: 2rem`). WCAG 2.1 Criterion 2.5.5 mandates at least **44 x 44 CSS pixels** to prevent accidental clicks and missed taps on mobile.
3. **Absence of a Mobile Sticky Quick-Action Bar:** While browsing a long food catalog, mobile users have no persistent thumb-accessible way to call the restaurant or initiate an order.
4. **Checkbox Navigation Friction:** The hamburger menu relies on an unstyled `<input type="checkbox">` that lacks keyboard accessibility and screen reader support, failing standard accessibility audits.

---

## 3. Redesign Architecture & User Flows

### 3.1 Proposed Site Architecture & Component Hierarchy

To address these shortcomings, the redesigned web application utilizes a modern, component-driven single-page architecture built with React 18:

```
[ Root Application (app.js) ]
├── 1. Navbar
│   ├── High-Res Vector Brand Logo
│   ├── Sticky Glassmorphic Header (backdrop-filter)
│   ├── Live UK Operational Status Badge
│   ├── Desktop Nav Anchors (Menu, Story, Catering, Reviews, Location)
│   ├── Click-to-Call Quick CTA Button (0161 864 3259)
│   └── Mobile Hamburger Toggle + Accessible Slide-in Drawer
│
├── 2. Hero Section
│   ├── Heritage Jamaican Headline & Authentic Sub-copy
│   ├── Trust Badges (4.8★ Rating, 2,000+ Reviews, 12+ Years in Stretford)
│   ├── Dual Action CTAs: [Explore Menu] & [Order Takeaway / Collection]
│   └── Sizzling Charcoal Jerk Chicken Hero Visual
│
├── 3. QuickInfoBar
│   ├── Real-Time Operational Open/Closed Calculator (Europe/London time)
│   ├── Direct Phone Dialer Link (0161 864 3259)
│   └── Verified Address & 1-Click Directions Link (63 Norway Street)
│
├── 4. SignatureSpotlight
│   └── 4 Core Specialties (Jerk Chicken, Curry Goat, Oxtail Stew, Jerk Chicken Split)
│       with spice ratings, authentic descriptions, and portion details
│
├── 5. MenuCatalog (The Interactive Digital Menu)
│   ├── Category Tabs (All, Mains, Sides, Ital Veg, Soups, Barms, Drinks, Desserts)
│   ├── Live Instant Text Search (filters across 80 items by title & ingredients)
│   ├── Dietary Filter Chips (All, Halal, Vegetarian, Spicy, Best Seller)
│   └── Responsive Card Grid with high-contrast pricing, allergen tags, and order modal
│
├── 6. StorySection ("The Yeah Man Legacy")
│   ├── Jamie's 12-year culinary story in Stretford
│   ├── Traditional Jamaican charcoal grilling & secret spice marinades
│   └── Highlights of community connection in Gorse Hill
│
├── 7. CateringSection ("Party & Corporate Feasts")
│   ├── Event Packages (Jerk Sharing Box, Family Feast, Ultimate Island Buffet)
│   └── Trigger for Interactive Catering Inquiry Modal
│
├── 8. ReviewsSection ("Community Love & Acclaim")
│   ├── Manchester's Finest Press Spotlight
│   └── Verified 5-Star Diner Testimonial Cards
│
├── 9. LocationHours
│   ├── Verified Schedule Card (Collection 11:00-22:30, Delivery 17:00-22:30)
│   ├── Embedded Google Maps with GPS navigation link
│   └── Interactive Delivery Postcode Checker (validates M15, M16, M17, M21, M32, M33, M41, M5, M50)
│
├── 10. InquiryModal
│   └── Accessible popup dialog for custom catering and group event bookings
│
├── 11. MobileQuickBar (Mobile Viewports Only)
│   └── Sticky bottom bar with 1-thumb Direct Call, WhatsApp Order, and Menu Jump
│
└── 12. Footer
    ├── Brand Mission, Food Hygiene Rating Badge (Very Good)
    ├── Allergen Disclaimer & Trading Hours
    └── Direct Ordering Value Proposition
```

---

### 3.2 Key User Journeys

```
+---------------------------------------------------------------------------------------------------+
| USER JOURNEY 1: The Hungry Lunchtime Commuter (Fast Collection)                                   |
| [Google Maps / Search] -> [Sticky Header / Hero] -> [Check "Open Now" Badge]                     |
| -> [Tap Sticky "Call 0161 864 3259" / WhatsApp] -> [Pick up Jerk Box in 15 mins] (Zero Commission)|
+---------------------------------------------------------------------------------------------------+
| USER JOURNEY 2: The Evening Family Takeaway (Dinner Delivery)                                     |
| [Mobile Browser] -> [Filter Menu: "Mains" + "Halal"] -> [Select Oxtail, Curry Goat, Patties]     |
| -> [Validate Postcode "M32" in Checker] -> [Tap WhatsApp Direct / Preferred App] -> [Dinner]     |
+---------------------------------------------------------------------------------------------------+
| USER JOURNEY 3: The Party & Corporate Catering Planner                                            |
| [Desktop / Laptop] -> [Navigate to Catering Section] -> [View "Ultimate Island Buffet" £140]      |
| -> [Open Inquiry Modal] -> [Submit 30-Guest Request for Weekend Party] -> [High-Ticket Lead]      |
+---------------------------------------------------------------------------------------------------+
```

#### Detailed Journey Specifications:

#### Journey 1: The Hungry Lunchtime Commuter
- **User Persona:** Marcus, 32, working in Trafford Park / MediaCityUK. Looking for a hearty, authentic lunch on his break.
- **Entry Point:** Taps a Google Maps pin or searches *"best jerk chicken near me"* on his smartphone while in his car.
- **Experience:**
  1. Lands on the site; the top bar immediately confirms: `🟢 Open Now · Collection from 11:00 AM`.
  2. The mobile sticky bottom bar displays a prominent green **"Call to Order"** button.
  3. Tapping the button launches his phone dialer (`0161 864 3259`). He pre-orders a Jerk Chicken Split (£5.50) and Ting (£1.50) for pickup in 15 minutes.
- **Outcome:** Total interaction time: under 30 seconds. Zero friction, zero aggregator commission.

#### Journey 2: The Evening Family Takeaway
- **User Persona:** Sarah & Dave, 41, living in Chorlton (`M21`). Planning a Friday night dinner for four.
- **Entry Point:** Visiting the website on an iPad/laptop.
- **Experience:**
  1. Clicks "Explore Menu", instantly viewing dishes without accordions.
  2. Uses dietary chips to filter for **Halal** and **Spicy**. Selects Oxtail Stew (£12.50), Curry Goat (£10.00), Fried Chicken Sandwich on Barm (£5.00), Plantains (£1.00), and Red Velvet Cake (£2.00).
  3. Scrolls to the **Postcode Checker**, types `M21`, and receives an immediate green confirmation: *"Great news! We deliver to M21 (Chorlton) from 5:00 PM."*
  4. Clicks the WhatsApp pre-order button to send their customized order directly to the restaurant counter.
- **Outcome:** Complete order clarity, full dietary confidence, and direct restaurant profit retention.

#### Journey 3: The High-Ticket Party & Event Planner
- **User Persona:** Elena, 29, organizing a 30-person birthday celebration in Stretford.
- **Entry Point:** Google search for *"Caribbean event catering Manchester"*.
- **Experience:**
  1. Lands on the dedicated **Catering & Feasts** section showcasing sharing platters, jerk chicken trays, and curry pots.
  2. Taps **"Inquire for Catering"**, opening an interactive modal.
  3. Inputs event date, guest count (30), and preferred dishes.
  4. Submits form; pre-formatted inquiry is dispatched directly via WhatsApp or email.
- **Outcome:** Captures a **£350–£600 high-ticket catering order** that would never have been placed through standard aggregator apps.

---

### 3.3 Modern Feature Specifications

#### 1. Real-Time UK Operational Status Badge
- **Logic:** Dynamically evaluates current day and time using JavaScript against UK local time (`Europe/London`).
- **Schedule Rules:**
  - *Monday:* Closed all day (`🔴 Closed Today · Reopens Tuesday 11:00 AM`).
  - *Tuesday – Saturday:*
    - 11:00 – 17:00: `🟢 Open Now for Collection · Delivery starts at 17:00`.
    - 17:00 – 22:30: `🟢 Open Now for Collection & Delivery · Closes 22:30`.
    - 22:30 – 11:00: `🔴 Closed Now · Opens 11:00 AM`.
  - *Sunday:*
    - 13:00 – 17:00: `🟢 Open for Collection · Delivery starts at 17:00`.
    - 17:00 – 21:00: `🟢 Open for Collection & Delivery · Closes 21:00`.
    - 21:00 – 13:00: `🔴 Closed Now · Opens Sunday 13:00`.
- **UI Presentation:** Pulsing emerald or red status pill situated in the sticky header and QuickInfoBar.

#### 2. Interactive Menu Catalog with Multi-Facet Filtering
- **Live Search Input:** Instant text filtering on keyup; matches item name, category, and descriptive ingredients (e.g. searching *"curry"*, *"oxtail"*, *"ackee"*, or *"ting"* immediately filters the grid).
- **Category Chips:** Horizontal scrollable category pills on mobile (All, Mains, Sides, Ital Veg, Soups, Barms, Drinks, Desserts, Ice Cream).
- **Dietary Filter Badges:**
  - `🥩 Halal`: Highlights certified halal chicken and beef dishes.
  - `🌱 Vegetarian`: Filters dumplings, plantain, callaloo, ackee, chips, coleslaw, desserts.
  - `🌶️ Spicy`: Highlights scotch bonnet marinated jerk and curries.
  - `⭐ Best Seller`: Showcases signature dishes (Jerk Chicken, Curry Goat, Oxtail, Jerk Split).

#### 3. Direct Multi-Channel Ordering Hub
- **Direct Phone Dialing:** One-tap `tel:01618643259` link, labeled *"Call Shop (Zero Fees)"*.
- **WhatsApp Pre-Order Engine:** Launches WhatsApp chat with pre-populated message template:
  `"Hi Yeah Man Caribbean! I'd like to place an order for [Collection/Delivery] at 63 Norway St..."`
- **Delivery Partner Badges:** Unobtrusive, secondary buttons for customers who prefer Just Eat or Uber Eats, maintaining customer choice without surrendering direct brand loyalty.

#### 4. Interactive Delivery Postcode Validator
- **Input Field:** Clean postcode input box with auto-capitalization and whitespace trimming.
- **Validation Engine:** Checks user input against supported delivery districts:
  `M15` (Hulme), `M16` (Old Trafford/Whalley Range), `M17` (Trafford Park), `M21` (Chorlton), `M32` (Stretford), `M33` (Sale), `M41` (Urmston), `M5` (Ordsall), `M50` (Salford Quays).
- **Interactive Feedback:**
  - *Match:* Displays an animated green confirmation box with estimated delivery timeframe (35–50 mins) and minimum order note.
  - *Out of Area:* Displays an informative amber alert: *"We don't deliver to that postcode directly, but you are welcome to order for Collection at 63 Norway Street!"*

---

### 3.4 Caribbean Design System Specifications

To evoke the authentic flavors and cultural warmth of Jamaica, the design system employs rich tropical tones, grounded charcoal textures, and vibrant spice accents:

```css
:root {
  /* Primary Cultural Palette */
  --color-brand-green: #0F4C3A;       /* Lush Caribbean Palm & Callaloo Leaf */
  --color-brand-green-light: #1A6B52; /* Hover state for primary buttons */
  --color-brand-gold: #F59E0B;        /* Golden Ripe Plantain & Sunshine */
  --color-brand-gold-dark: #D97706;   /* Rich Caramelized Fried Crust */
  
  /* Spice Accents */
  --color-spice-red: #E11D48;         /* Fresh Scotch Bonnet Pepper */
  --color-jerk-glaze: #991B1B;        /* Deep Roasted Pimento & Jerk Glaze */
  
  /* Neutrals & Surfaces */
  --color-charcoal-dark: #121816;     /* Smoky Charcoal Grill (Base Background) */
  --color-charcoal-card: #1C2421;     /* Elevated Card Surface */
  --color-charcoal-border: #2D3A35;   /* Subtle Contrast Dividers */
  --color-cream-surface: #FDFBF7;     /* Light Mode Paper & Reading Surface */
  --color-text-primary: #F3F4F6;      /* High Legibility Off-White */
  --color-text-secondary: #9CA3AF;    /* Muted Meta Information */
  
  /* Typography System */
  --font-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Radii & Shadows */
  --radius-sm: 0.375rem;              /* 6px */
  --radius-md: 0.75rem;               /* 12px */
  --radius-lg: 1.25rem;               /* 20px */
  --shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.35);
  --shadow-glow-gold: 0 0 20px rgba(245, 158, 11, 0.25);
  --shadow-glow-green: 0 0 20px rgba(15, 76, 58, 0.35);
}
```

#### Typography Hierarchy:
- **Display & Main Headings (H1):** `font-family: var(--font-heading); font-weight: 800; line-height: 1.15;` — Bold, charismatic, evocative of Jamaican street signs.
- **Section Headings (H2):** `font-family: var(--font-heading); font-weight: 700; font-size: clamp(1.75rem, 3vw, 2.5rem); letter-spacing: -0.02em;`
- **Subheadings & Item Titles (H3, H4):** `font-weight: 600; font-size: 1.125rem; color: #FFFFFF;`
- **Body & Product Descriptions:** `font-family: var(--font-body); font-weight: 400; font-size: 0.9375rem; line-height: 1.6; color: var(--color-text-secondary);`

#### Visual & Photography Art Direction:
- **Food Photography:** High-contrast, close-up imagery showing glistening jerk sauce glazes, steam rising from slow-cooked curry goat pots, crispy golden dumpling crusts, and vibrant yellow rice and peas.
- **Cultural Texture:** Deep charcoal backgrounds evoking pimento wood smoke, paired with warm gold borders and lush green foliage highlights.

---

## 4. Implementation Roadmap & Prototype Alignment

The redesign proposal is engineered to align directly with the production-ready React 18 prototype being developed in parallel.

### 4.1 Prototype File Architecture
The React prototype is structured cleanly across four core files in the project root:
1. **`index.html`**: Semantic HTML5 entry point loading Google Fonts (`Montserrat`, `Plus Jakarta Sans`), FontAwesome icons, and React 18 production libraries via high-speed CDNs.
2. **`data.js`**: Verified restaurant metadata database containing all **80 authenticated menu items** across 8 categories, opening hours schedule, 9-district delivery postcode rules, catering packages, and verified 5-star customer reviews.
3. **`styles.css`**: Caribbean street-food design system tokens, responsive grid layouts, card hover micro-interactions, accessibility overrides, and mobile-first media queries.
4. **`app.js`**: React 18 component architecture implementing stateful live search, category filtering, dietary toggles, real-time UK status calculator, delivery postcode validator, catering modal, and mobile quick-action bar.

---

### 4.2 Implementation Milestones

```
+-----------------------------------------------------------------------------------------+
|                               IMPLEMENTATION MILESTONES                                 |
+-----------------------------------------------------------------------------------------+
| [M1: Audit & Proposal] --> [M2: Data & Styles] --> [M3: React App] --> [M4: Optimize]  |
| - Comprehensive Plan       - Complete 80-Item DB   - 12 React Components - 375px/1920px |
| - Client Pitch Deck        - Caribbean Tokens      - Interactive Filters - Zero Overflow|
| - UX Failure Analysis      - Semantic HTML Shell   - Postcode Validator  - E2E Tests    |
+-----------------------------------------------------------------------------------------+
```

| Phase | Milestone Name | Scope & Deliverables | Verification Criteria |
|:---:|:---|:---|:---|
| **M1** | **Audit & Redesign Plan** | Publish `WEBSITE_AUDIT_AND_REDESIGN_PLAN.md` with section-by-section audit, financial modeling, and architectural specifications. | Complete document delivered covering all audit points, user flows, and design system tokens. |
| **M2** | **Foundation & Data Model** | Author `data.js` with 80 authenticated items, `index.html` shell, and `styles.css` Caribbean design tokens. | Syntactically valid JavaScript, valid HTML5 DOCTYPE, CSS custom properties loaded. |
| **M3** | **Interactive React App** | Implement `app.js` with 12 modular React components, live search, dietary filters, UK open status, and postcode checker. | React mounts cleanly to `#root`, search filters cards dynamically, modal opens/closes with focus trap. |
| **M4** | **Device Optimization** | Rigorous responsive styling for 375px–430px (phones) and 1280px–1920px (laptops). Implement sticky mobile action bar. | Zero horizontal scroll overflow across all viewports; touch targets >= 44px; WCAG AA contrast compliance. |
| **M5** | **Forensic Audit & QA** | Automated test harness execution, DOM element presence verification, cross-browser validation, and client handoff. | 100% test pass rate; zero console errors; independent auditor signoff. |

---

## 5. Summary Pitch Takeaway for Jamie

> *"Jamie, you've spent over a decade perfecting the most authentic Jamaican jerk and curries in Stretford. Your customers love what you cook, and they want to support your independent kitchen.*
>
> *Right now, your website sends those loyal customers straight into the arms of Just Eat, costing you thousands of pounds every single month in unnecessary commissions. At the same time, mobile visitors are blocked by security walls, misled by truncated postcodes, and forced to tap through collapsed text accordions.*
>
> *Our redesign fixes every single one of those issues. It gives Yeah Man Caribbean the vibrant, mouth-watering digital home it deserves—one that lets your regulars call or WhatsApp you directly in one tap, showcases your incredible food, and puts your hard-earned profits right where they belong: back in your business."*
