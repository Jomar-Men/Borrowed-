(() => {
  const IMG = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
  const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’."]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // ---------------------------------------------------------------- FULL LOOKS (Shop the Collection)
  // g: "him" | "her" | "uni"   c: occasion
  const L = (name, g, c, img, retail, rent, desc, parts) => ({ type: "look", name, g, c, img, retail, rent, desc, parts });
  const LOOKS = [
    // For Him
    L("The Midnight Tuxedo", "him", "Formal", "1785336872763-d05035e4a72f", 1100, 70, "Black peak-lapel tuxedo with satin facing and bow tie.", [["Tux jacket", "jacket"], ["Tux trousers", "pants"]]),
    L("The After Hours Suit", "him", "Formal", "1617113930975-f9c7243ae527", 950, 65, "Slim black two-piece, worn with an open collar.", [["Suit jacket", "jacket"], ["Suit trousers", "pants"]]),
    L("The Navy Statement", "him", "Interview-Ready", "1617137984095-74e4e5e3613f", 720, 45, "Navy two-piece in Italian wool, cut slim.", [["Suit jacket", "jacket"], ["Suit trousers", "pants"]]),
    L("The Charcoal Edit", "him", "Interview-Ready", "1622497170185-5d668f816a56", 640, 40, "Charcoal jacket, black trousers, black knit tie.", [["Suit jacket", "jacket"], ["Trousers", "pants"]]),
    L("The Boardroom Blue", "him", "Interview-Ready", "1623880840102-7df0a9f3545b", 690, 45, "Mid-blue suit with a crisp white shirt.", [["Suit jacket", "jacket"], ["Suit trousers", "pants"]]),
    L("The Sand Three-Piece", "him", "Grad Photos", "1655745665650-6a58282a0cfa", 860, 55, "Sand-toned three-piece suit with a waistcoat.", [["Jacket + waistcoat", "jacket"], ["Trousers", "pants"]]),
    L("The Stone Suit", "him", "Grad Photos", "1788462538369-856a4b79d692", 780, 50, "Light stone suit, relaxed and sunlit.", [["Suit jacket", "jacket"], ["Suit trousers", "pants"]]),
    L("The Heavyweight Hoodie", "him", "Streetwear", "1790009719835-e72e2d84c13b", 1450, 55, "Designer heavyweight hoodie in washed grey, oversized.", [["Hoodie", "apparel"]]),
    L("The Shearling Bomber", "him", "Streetwear", "1532332248682-206cc786359f", 2100, 85, "Oversized shearling-collared bomber jacket.", [["Bomber jacket", "apparel"]]),
    L("The Moto Leather", "uni", "Streetwear", "1521223890158-f9f7c3d5d504", 3200, 95, "Black lambskin moto jacket with silver hardware.", [["Leather jacket", "apparel"]]),
    L("The Sterling Stack", "uni", "Streetwear", "1767392060431-7fed645cd81b", 2400, 85, "A full set of designer sterling silver rings, adjusted to fit.", [["Ring set", "one"]]),
    L("The Chain Drop", "uni", "Streetwear", "1790644896002-d226c1da933a", 1800, 65, "Statement sterling silver chain and pendant.", [["Chain + pendant", "one"]]),
    // For Her
    L("The Noir Column", "her", "Formal", "1783013953018-348f6eccef0c", 1250, 75, "Floor-length black column gown with a sculpted bodice.", [["Gown", "dress"]]),
    L("The Emerald Hour", "her", "Formal", "1765871421513-452fe03d15cc", 890, 65, "Deep-green shimmer gown with a fitted waist and full skirt.", [["Gown", "dress"]]),
    L("The Split Second", "her", "Formal", "1623580674393-edf6eb7090f8", 780, 60, "Sleeveless black gown with a high side slit.", [["Gown", "dress"]]),
    L("The Bordeaux Bloom", "her", "Formal", "1568252542512-9fe8fe9c87bb", 1600, 85, "Strapless bordeaux gown with a floral-embellished tulle skirt.", [["Gown", "dress"]]),
    L("The Silver Hour", "her", "Formal", "1547697933-66bcb20f114a", 1900, 95, "Fully embellished silver gown with a sweep train.", [["Gown", "dress"]]),
    L("The Sculpted Sleeve", "her", "Formal", "1764998112464-f293be747d84", 2400, 110, "Black couture gown with dramatic sculpted sleeves.", [["Gown", "dress"]]),
    L("The Lace Noir", "her", "Formal", "1761574028720-8872dc5fe412", 980, 60, "Black cocktail dress with sheer floral lace overlay.", [["Dress", "dress"]]),
    L("The Emerald Velvet", "her", "Formal", "1746813628279-0c69ea56c9fc", 1450, 70, "Emerald velvet tailored blazer with matching trousers.", [["Blazer", "wjacket"], ["Trousers", "wpants"]]),
    L("The Onyx Pantsuit", "her", "Interview-Ready", "1584273143981-41c073dfe8f8", 680, 45, "Black tailored blazer with matching wide trousers.", [["Blazer", "wjacket"], ["Trousers", "wpants"]]),
    L("The Sharp Line", "her", "Interview-Ready", "1616065297556-f05bc00c9a3e", 590, 40, "Single-button black blazer and cigarette trouser.", [["Blazer", "wjacket"], ["Trousers", "wpants"]]),
    L("The Plum Velvet", "her", "Interview-Ready", "1610189586156-6296fdaed6f1", 1450, 70, "Plum velvet blazer with tailored trousers — interview-ready with an edge.", [["Blazer", "wjacket"], ["Trousers", "wpants"]]),
    L("The All-Black Edit", "her", "Interview-Ready", "1614786269829-d24616faf56d", 720, 45, "Fine-knit black top with high-waisted tailored trousers.", [["Top", "apparel"], ["Trousers", "wpants"]]),
    L("The Ivory Sculpt", "her", "Grad Photos", "1553076699-6b6250481bd1", 420, 35, "White fitted midi with fluted sleeves.", [["Dress", "dress"]]),
    L("The Garden White", "her", "Grad Photos", "1791214938047-b6f5644c0a9e", 480, 35, "Flowing white maxi made for outdoor photos.", [["Dress", "dress"]]),
    L("The Ivory Cutout", "her", "Grad Photos", "1763131778325-d70dc75c92aa", 520, 40, "Ivory column dress with a sculpted cutout waist.", [["Dress", "dress"]]),
    L("The Open Back", "her", "Grad Photos", "1601859574492-8658b6f7f990", 620, 40, "White long-sleeve dress with an open back.", [["Dress", "dress"]]),
    L("The Moonlit White", "her", "Grad Photos", "1791215302956-fa2c33533b09", 680, 45, "Draped white one-shoulder evening dress.", [["Dress", "dress"]]),
  ];

  // ---------------------------------------------------------------- SINGLE PIECES (Shop by Piece)
  // value = approx. retail / resale (USD). sizes: kind used for the size picker
  const P = (brand, name, g, cat, retail, rent, sizes, desc) => ({ type: "piece", brand, short: name, name: brand ? brand + " " + name : name, g, cat, retail, rent, sizes, desc });
  const J = (name, color, retail, rent, light) => ({ type: "piece", brand: "Designer tailoring", short: name, name, g: "him", cat: "Suit Jackets", swatch: color, light: !!light, retail, rent, sizes: "jacket", desc: name + ", fully lined, cut slim." });
  const PIECES = [
    // Suit jackets (him)
    J("Navy Velvet Dinner Jacket", "1F2A44", 2450, 65),
    J("Burgundy Velvet Dinner Jacket", "5E1A24", 2450, 65),
    J("Emerald Velvet Blazer", "0F4D3A", 2300, 60),
    J("Ivory Dinner Jacket", "EDE6D6", 2100, 60, true),
    J("Royal Purple Velvet Blazer", "3E1F5C", 2300, 60),
    J("Camel Double-Breasted Blazer", "B08A5E", 1950, 55, true),
    J("Black Silk-Lapel Tux Jacket", "111111", 2600, 70),
    J("Powder Blue Blazer", "9DB4CC", 1800, 50, true),

    // Chrome Hearts (For Him — keeps all your photos)
    P("Chrome Hearts", "Cross Patch Jeans", "him", "Denim & Bottoms", 3200, 95, "pants", "Leather cross patches on washed denim — the grail of the collection."),
    P("Chrome Hearts", "Cross Patch Flare Jeans", "her", "Denim & Bottoms", 2800, 90, "wjeans", "Flared jeans with leather cross patches down the leg."),
    P("Chrome Hearts", "Horseshoe Hoodie", "him", "Tops & Outerwear", 1400, 60, "apparel", "Heavyweight hoodie with horseshoe print."),
    P("Chrome Hearts", "Horseshoe Baby Tee", "her", "Tops & Outerwear", 650, 35, "apparel", "Cropped fitted tee with the horseshoe logo."),
    P("Chrome Hearts", "Cemetery Cross Belt", "him", "Jewelry & Accessories", 2200, 75, "belt", "Black leather with sterling silver cemetery cross hardware."),
    P("Chrome Hearts", "Paper Chain Necklace", "him", "Jewelry & Accessories", 2600, 80, "one", "Heavy sterling silver paper chain, 20 inches."),
    P("Chrome Hearts", "Floral Cross Pendant", "him", "Jewelry & Accessories", 1800, 65, "one", "Sterling floral cross on a ball chain."),
    P("Chrome Hearts", "Dagger Pendant", "him", "Jewelry & Accessories", 1200, 50, "one", "Sterling silver dagger pendant on a fine chain."),
    P("Chrome Hearts", "Spacer Ring Stack", "him", "Jewelry & Accessories", 1500, 60, "ring", "Three sterling spacer rings, worn stacked."),
    P("Chrome Hearts", "Forever Ring", "her", "Jewelry & Accessories", 650, 35, "ring", "Slim sterling band engraved with crosses."),
    P("Chrome Hearts", "Plus Stud Earrings", "her", "Jewelry & Accessories", 900, 40, "one", "Pair of sterling silver CH plus studs."),
    P("Chrome Hearts", "Paper Chain Bracelet", "him", "Jewelry & Accessories", 1400, 55, "one", "Sterling silver paper chain bracelet."),
    P("Chrome Hearts", "Trucker Hat", "him", "Jewelry & Accessories", 750, 35, "one", "Mesh trucker with leather cross patch."),

    // Sp5der / Denim Tears / Amiri
    P("Sp5der", "Rhinestone Web Zip Hoodie", "him", "Tops & Outerwear", 900, 45, "apparel", "Full-zip hoodie with rhinestone web graphic."),
    P("Sp5der", "Pink Web Hoodie", "him", "Tops & Outerwear", 650, 40, "apparel", "The signature pink puff-print web hoodie."),
    P("Sp5der", "Web Sweatpants", "him", "Denim & Bottoms", 550, 35, "apparel", "Matching puff-print web sweatpants."),
    P("Denim Tears", "Cotton Wreath Jeans", "him", "Denim & Bottoms", 650, 40, "pants", "Light-wash jeans with the all-over cotton wreath print."),
    P("Denim Tears", "Cotton Wreath Denim Jacket", "him", "Tops & Outerwear", 800, 45, "apparel", "Trucker jacket in cotton wreath denim."),
    P("Denim Tears", "Cotton Wreath Hoodie", "him", "Tops & Outerwear", 450, 35, "apparel", "Heavyweight hoodie with cotton wreath print."),
    P("Amiri", "MX1 Jeans", "him", "Denim & Bottoms", 1450, 55, "pants", "Distressed skinny jeans with leather knee panels."),
    P("Amiri", "Shearling Trucker Jacket", "him", "Tops & Outerwear", 3800, 95, "apparel", "Denim trucker lined in shearling."),
    P("Amiri", "Bandana Jacquard Shirt", "him", "Tops & Outerwear", 1200, 50, "apparel", "Silk-blend camp shirt in bandana jacquard."),

    // Streetwear — For Her
    P("Chrome Hearts", "Heart Pendant", "her", "Jewelry & Accessories", 1100, 45, "one", "Sterling silver heart pendant on a fine chain."),
    P("Chrome Hearts", "Baby Fat Cross Pendant", "her", "Jewelry & Accessories", 1300, 50, "one", "Chunky sterling baby fat cross on a ball chain."),
    P("Chrome Hearts", "Bubblegum Necklace", "her", "Jewelry & Accessories", 1600, 60, "one", "Sterling silver bubblegum-link necklace."),
    P("Chrome Hearts", "Cross Patch Mini Skirt", "her", "Dresses & Skirts", 2400, 85, "dress", "Denim mini skirt with leather cross patches."),
    P("Chrome Hearts", "Horseshoe Zip Hoodie", "her", "Tops & Outerwear", 1500, 60, "apparel", "Women's-fit zip hoodie with the horseshoe logo."),
    P("Sp5der", "Legacy Web Hoodie", "her", "Tops & Outerwear", 700, 40, "apparel", "Puff-print web hoodie in a women's fit."),
    P("Sp5der", "Web Sweatpants (Women's)", "her", "Denim & Bottoms", 550, 35, "apparel", "Puff-print web sweatpants in a women's fit."),
    P("Denim Tears", "Cotton Wreath Sweatpants", "her", "Denim & Bottoms", 400, 30, "apparel", "Heavyweight sweatpants with the cotton wreath print."),
    P("Denim Tears", "Cotton Wreath Jeans (Women's)", "her", "Denim & Bottoms", 650, 40, "wjeans", "Cotton wreath denim in women's waist sizing."),
    P("Amiri", "Bandana Silk Shirt", "her", "Tops & Outerwear", 1300, 50, "apparel", "Oversized silk shirt in bandana print."),

    // Designer womenswear
    P("Miu Miu", "Pleated Mini Skirt", "her", "Dresses & Skirts", 1350, 55, "dress", "Low-rise pleated gabardine mini skirt."),
    P("Alaïa", "Knit Mini Dress", "her", "Dresses & Skirts", 2900, 95, "dress", "Body-sculpting stretch-knit mini dress."),
    P("Versace", "Safety Pin Mini Dress", "her", "Dresses & Skirts", 3500, 110, "dress", "Black mini dress with gold Medusa safety-pin details."),
    P("Saint Laurent", "Le Smoking Tuxedo Jacket", "her", "Tops & Outerwear", 4200, 120, "wjacket", "The iconic satin-lapel tuxedo jacket."),
    P("Balenciaga", "Hourglass Blazer", "her", "Tops & Outerwear", 3900, 115, "wjacket", "Sharp-shouldered blazer with a cinched hourglass waist."),

    // Footwear — him
    P("Nike x Off-White", "Air Jordan 1 \"Chicago\"", "him", "Footwear", 4800, 150, "shoe_m", "The 2017 \"The Ten\" collaboration — a modern grail."),
    P("Travis Scott x Jordan", "Air Jordan 1 Low \"Reverse Mocha\"", "him", "Footwear", 1200, 55, "shoe_m", "Reverse-swoosh low top in sail and mocha suede."),
    P("Louis Vuitton", "LV Trainer Sneaker", "him", "Footwear", 1350, 55, "shoe_m", "Basketball-inspired leather sneaker with Monogram detail."),
    P("Dior", "B23 High-Top Sneaker", "him", "Footwear", 1350, 55, "shoe_m", "Dior Oblique transparent canvas high-top."),
    P("Rick Owens", "Geobasket Sneakers", "him", "Footwear", 1400, 55, "shoe_m", "The original oversized-tongue leather high-top."),
    P("Rick Owens", "Bozo Tractor Boots", "him", "Footwear", 1900, 65, "shoe_m", "Platform leather boots on the chunky tractor sole."),
    P("Amiri", "Skel Top Sneakers", "him", "Footwear", 650, 35, "shoe_m", "Low-top leather sneakers with the bone appliqué."),
    // Footwear — unisex
    P("Prada", "Monolith Brushed Leather Loafers", "uni", "Footwear", 1350, 50, "shoe", "Glossy brushed-leather loafers on a lug platform sole."),
    P("Balenciaga", "Triple S Sneakers", "uni", "Footwear", 1150, 45, "shoe", "The original chunky triple-stacked sole sneaker."),
    P("Bottega Veneta", "Lug Boots", "uni", "Footwear", 1600, 55, "shoe", "Leather Chelsea boots on a sculpted lug sole."),
    // Footwear — her
    P("Christian Louboutin", "So Kate 120 Pumps", "her", "Footwear", 795, 35, "shoe_w", "The signature 120mm pointed pump with the red sole."),
    P("Manolo Blahnik", "Hangisi 105 Pumps", "her", "Footwear", 1195, 45, "shoe_w", "Satin pump with the jeweled buckle."),
    P("Jimmy Choo", "Bing 100 Mules", "her", "Footwear", 1050, 40, "shoe_w", "Crystal-strap pointed mule, 100mm heel."),
    P("Versace", "Medusa Aevitas Platform Pumps", "her", "Footwear", 1450, 55, "shoe_w", "Towering platform pump with the gold Medusa."),
    P("Prada", "Monolith Brushed Leather Boots", "her", "Footwear", 1750, 60, "shoe_w", "Brushed-leather combat boots on the Monolith sole."),
    P("Golden Goose", "Super-Star Sneakers", "her", "Footwear", 595, 30, "shoe_w", "Hand-distressed leather sneakers with the star patch."),
    P("Alexander McQueen", "Oversized Sneakers", "her", "Footwear", 690, 30, "shoe_w", "Clean white leather sneakers on the oversized sole."),
  ];

  // ---------------------------------------------------------------- WATCHES
  const W = (brand, model, ref, g, retail, rent, desc) => ({ type: "watch", brand, short: model, ref, name: brand + " " + model, g, cat: "Watches", retail, rent, sizes: "watch", desc });
  const WATCHES = [
    W("Rolex", "Submariner Date", "126610LN", "uni", 14500, 175, "41mm Oystersteel, black Cerachrom bezel."),
    W("Rolex", "Cosmograph Daytona", "126500LN", "him", 31000, 295, "40mm Oystersteel, white dial with black subdials."),
    W("Rolex", "GMT-Master II \"Pepsi\"", "126710BLRO", "him", 22000, 225, "40mm, red and blue Cerachrom bezel, Jubilee bracelet."),
    W("Rolex", "Datejust 41", "126334", "him", 13000, 150, "41mm Oystersteel and white gold, fluted bezel."),
    W("Rolex", "Day-Date 40", "228238", "him", 45000, 395, "40mm 18k yellow gold, President bracelet."),
    W("Rolex", "Explorer 36", "124270", "uni", 9500, 125, "36mm Oystersteel, black dial."),
    W("Rolex", "Oyster Perpetual 36", "126000", "uni", 8500, 110, "36mm Oystersteel, colored dial."),
    W("Rolex", "Datejust 31", "278274", "her", 13000, 150, "31mm Oystersteel and white gold, Jubilee bracelet."),
    W("Rolex", "Lady-Datejust 28", "279174", "her", 12500, 150, "28mm Oystersteel and white gold, fluted bezel."),
    W("Audemars Piguet", "Royal Oak Selfwinding 41mm", "15510ST", "him", 42000, 375, "Stainless steel, \"Grande Tapisserie\" dial."),
    W("Audemars Piguet", "Royal Oak Selfwinding 37mm", "15450ST", "uni", 35000, 325, "Stainless steel, \"Grande Tapisserie\" dial."),
    W("Audemars Piguet", "Royal Oak Offshore Chronograph 42mm", "", "him", 40000, 350, "The bold sport chronograph, \"Méga Tapisserie\" dial."),
    W("Audemars Piguet", "Royal Oak Mini Frosted Gold 23mm", "", "her", 45000, 395, "18k frosted gold, hammered finish."),
    W("Patek Philippe", "Nautilus", "5711/1A", "him", 120000, 850, "The discontinued steel icon, blue gradient dial."),
    W("Patek Philippe", "Aquanaut", "5167A", "him", 60000, 550, "40mm steel, tropical strap."),
    W("Patek Philippe", "Twenty~4", "4910/1200A", "her", 15000, 175, "Steel manchette-style ladies' watch."),
    W("Cartier", "Santos de Cartier Medium", "WSSA0029", "uni", 7800, 110, "35mm steel, interchangeable bracelet."),
    W("Cartier", "Tank Française", "", "her", 5000, 80, "Steel, the classic rectangular case."),
    W("Cartier", "Panthère de Cartier Small", "", "her", 5600, 85, "Steel, the supple panther-link bracelet."),
    W("Cartier", "Ballon Bleu 33mm", "", "her", 6000, 90, "Steel, blue synthetic spinel crown."),
    W("Omega", "Speedmaster Moonwatch Professional", "310.30.42.50.01.001", "him", 7600, 95, "42mm steel, the watch that went to the Moon."),
    W("Omega", "Seamaster Diver 300M", "210.30.42.20.01.001", "him", 5900, 85, "42mm steel, black wave dial."),
    W("Vacheron Constantin", "Overseas Self-Winding", "4500V/110A-B128", "him", 35000, 325, "41mm steel, blue dial."),
    W("Hublot", "Big Bang Unico 42mm", "", "him", 24000, 250, "Skeleton chronograph, titanium case."),
    W("Richard Mille", "RM 011 Felipe Massa", "", "him", 250000, 1950, "Titanium flyback chronograph. By application only."),
  ];

  // ---------------------------------------------------------------- PHOTOS
  // Drop a photo in /images named <slug>.jpg (e.g. images/rolex-submariner-date.jpg) and it shows automatically.
  const PRODUCT_PHOTOS = {
    "Navy Velvet Dinner Jacket": "images/navy-velvet-dinner-jacket.jpg",
    "Burgundy Velvet Dinner Jacket": "images/burgundy-velvet-dinner-jacket.jpg",
    "Emerald Velvet Blazer": "images/emerald-velvet-blazer.jpg",
    "Ivory Dinner Jacket": "images/ivory-dinner-jacket.jpg",
    "Royal Purple Velvet Blazer": "images/royal-purple-velvet-blazer.jpg",
    "Camel Double-Breasted Blazer": "images/camel-double-breasted-blazer.jpg",
    "Black Silk-Lapel Tux Jacket": "images/black-silk-lapel-tux-jacket.jpg",
    "Powder Blue Blazer": "images/powder-blue-blazer.jpg",
    "Chrome Hearts Cross Patch Jeans": "images/chrome-hearts-cross-patch-jeans.jpg",
    "Chrome Hearts Cemetery Cross Belt": "images/chrome-hearts-cemetery-cross-belt.jpg",
    "Chrome Hearts Paper Chain Necklace": "images/chrome-hearts-paper-chain-necklace.jpg",
    "Chrome Hearts Floral Cross Pendant": "images/chrome-hearts-floral-cross-pendant.jpg",
    "Chrome Hearts Spacer Ring Stack": ["images/chrome-hearts-spacer-0.jpg", "images/chrome-hearts-spacer-1.jpg", "images/chrome-hearts-spacer-2.jpg"],
    "Chrome Hearts Paper Chain Bracelet": "images/chrome-hearts-paper-chain-bracelet.jpg",
    "Chrome Hearts Horseshoe Hoodie": "images/chrome-hearts-horseshoe-hoodie.jpg",
    "Chrome Hearts Trucker Hat": "images/chrome-hearts-trucker-hat.jpg",
    "Sp5der Rhinestone Web Zip Hoodie": "images/sp5der-rhinestone-web-zip-hoodie.jpg",
    "Sp5der Pink Web Hoodie": "images/sp5der-pink-web-hoodie.jpg",
    "Sp5der Web Sweatpants": "images/sp5der-web-sweatpants.jpg",
    "Denim Tears Cotton Wreath Jeans": "images/denim-tears-cotton-wreath-jeans.jpg",
    "Denim Tears Cotton Wreath Denim Jacket": "images/denim-tears-cotton-wreath-denim-jacket.jpg",
    "Denim Tears Cotton Wreath Hoodie": "images/denim-tears-cotton-wreath-hoodie.jpg",
    "Amiri MX1 Jeans": "images/amiri-mx1-jeans.jpg",
    "Amiri Shearling Trucker Jacket": "images/amiri-shearling-trucker-jacket.jpg",
    "Amiri Bandana Jacquard Shirt": "images/amiri-bandana-jacquard-shirt.jpg",
    "Amiri Skel Top Sneakers": "images/amiri-skel-top-sneakers.jpg",
  };
  PIECES.concat(WATCHES).forEach((it) => { it.photo = PRODUCT_PHOTOS[it.name] || `images/${slug(it.name)}.jpg`; it.auto = !PRODUCT_PHOTOS[it.name]; });

  const fmt = (n) => "$" + n.toLocaleString("en-US");
  const $ = (s, el = document) => el.querySelector(s);
  const track = (name, params = {}) => { try { window.gtag && gtag("event", name, params); } catch (e) {} };

  // UTM capture
  const qp = new URLSearchParams(location.search);
  if (qp.get("utm_source")) sessionStorage.setItem("utm", [qp.get("utm_source"), qp.get("utm_medium"), qp.get("utm_campaign")].filter(Boolean).join(" / "));
  const utm = () => sessionStorage.getItem("utm") || (document.referrer ? "referral: " + new URL(document.referrer).hostname : "direct");

  // ---------------------------------------------------------------- CARD ART
  const textArt = (it) => it.swatch
    ? `<div class="piece-art swatch${it.light ? " light" : ""}" style="background:#${it.swatch}"><span class="pa-brand">${it.cat}</span><span class="pa-name">${it.name}</span><span class="pa-value"><small>Retail value</small><b>${fmt(it.retail)}</b></span></div>`
    : `<div class="piece-art${it.type === "watch" ? " watch-art" : ""}"><span class="pa-cat">${it.type === "watch" ? (it.ref ? "Ref. " + it.ref : "Timepiece") : it.cat}</span><span class="pa-brand">${it.brand}</span><span class="pa-name">${it.short}</span><span class="pa-value"><small>${it.type === "watch" ? "Market value, approx." : "Value, approx."}</small><b>${fmt(it.retail)}</b></span></div>`;
  const art = (it) => {
    if (!it.photo) return textArt(it);
    const list = Array.isArray(it.photo) ? it.photo : [it.photo];
    return `<div class="product-photo${list.length > 1 ? " ring-set" : ""}" data-fallback="1">${list.map((src, i) => `<img src="${src}" alt="${it.name}${list.length > 1 ? " " + (i + 1) : ""}" loading="lazy" decoding="async">`).join("")}</div>`;
  };
  // Missing photo -> swap in the text card
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG") return;
    const box = img.closest(".product-photo[data-fallback]");
    if (!box) return;
    const card = box.closest("[data-key]");
    const it = card ? ITEMS[card.dataset.key] : (box.closest("#rArt") ? current : null);
    if (it) { it.photo = null; box.outerHTML = textArt(it); }
  }, true);

  const ITEMS = {};
  LOOKS.concat(PIECES, WATCHES).forEach((it, i) => { it.key = "i" + i; ITEMS[it.key] = it; });

  const lookCard = (l) => `
    <button class="card" type="button" data-key="${l.key}" aria-label="${l.name}, ${fmt(l.rent)} for 4 days. Reserve">
      <div class="card-img"><img src="${IMG(l.img, 700)}" alt="${l.desc}" loading="lazy"><span class="card-tag">${l.c}</span><span class="card-cta">Reserve this look</span></div>
      <div class="card-meta"><span class="card-name">${l.name}</span><span class="card-price">${fmt(l.rent)}<s>${fmt(l.retail)}</s></span></div>
      <p class="card-desc">${l.desc}</p>
    </button>`;
  const pieceCard = (it) => `
    <button class="card" type="button" data-key="${it.key}" aria-label="${it.name}, ${fmt(it.rent)} for 4 days. Reserve">
      <div class="card-img">${art(it)}<span class="card-cta">Reserve</span></div>
      <span class="card-brand">${it.swatch ? "Suit jacket" : it.brand}${it.ref ? ` <em class="ref">${it.ref}</em>` : ""}</span>
      <div class="card-meta"><span class="card-name">${it.short || it.name}</span><span class="card-price">${fmt(it.rent)}<s>${fmt(it.retail)}</s></span></div>
    </button>`;

  // ---------------------------------------------------------------- SHOPS (For Him / For Her)
  const OCCASIONS = ["Formal", "Interview-Ready", "Grad Photos", "Streetwear"];
  const CATS = {
    him: ["Suit Jackets", "Tops & Outerwear", "Denim & Bottoms", "Footwear", "Jewelry & Accessories"],
    her: ["Dresses & Skirts", "Tops & Outerwear", "Denim & Bottoms", "Footwear", "Jewelry & Accessories"],
  };
  const forG = (arr, g) => arr.filter((x) => x.g === g || x.g === "uni");
  const shops = {};

  const mountShop = (g) => {
    const root = document.getElementById(g);
    if (!root) return;
    const st = { mode: "looks", filter: "all", brand: null };
    shops[g] = st;
    const tabs = $("[data-role=tabs]", root), brands = $("[data-role=brands]", root), grid = $("[data-role=grid]", root);
    const looks = forG(LOOKS, g).filter((l) => g === "him" ? true : l.c !== "Streetwear");
    const pieces = forG(PIECES, g);

    const render = () => {
      root.querySelectorAll("[data-mode]").forEach((b) => { const on = b.dataset.mode === st.mode; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
      const opts = st.mode === "looks" ? OCCASIONS.filter((o) => looks.some((l) => l.c === o)) : CATS[g];
      tabs.innerHTML = [`<button class="tab${st.filter === "all" ? " is-active" : ""}" data-f="all">${st.mode === "looks" ? "All looks" : "All pieces"}</button>`]
        .concat(opts.map((o) => `<button class="tab${st.filter === o ? " is-active" : ""}" data-f="${o}">${o}</button>`)).join("");
      if (st.mode === "pieces") {
        const bs = [...new Set(pieces.filter((p) => p.brand !== "Designer tailoring").map((p) => p.brand))];
        brands.hidden = false;
        brands.innerHTML = bs.map((b) => `<button class="brand-chip${st.brand === b ? " is-active" : ""}" type="button" data-b="${b}">${b}</button>`).join("");
      } else { brands.hidden = true; brands.innerHTML = ""; }
      const list = st.mode === "looks"
        ? looks.filter((l) => st.filter === "all" || l.c === st.filter)
        : pieces.filter((p) => (st.filter === "all" || p.cat === st.filter) && (!st.brand || p.brand === st.brand));
      grid.innerHTML = list.length ? list.map(st.mode === "looks" ? lookCard : pieceCard).join("") : `<p class="empty">Nothing here yet — try another filter.</p>`;
    };
    root.addEventListener("click", (e) => {
      const m = e.target.closest("[data-mode]"); if (m) { st.mode = m.dataset.mode; st.filter = "all"; st.brand = null; render(); track("view_collection", { collection: g + ": " + st.mode }); return; }
      const t = e.target.closest("[data-f]"); if (t) { st.filter = t.dataset.f; render(); track("view_collection", { collection: g + ": " + st.filter }); return; }
      const b = e.target.closest("[data-b]"); if (b) { st.brand = st.brand === b.dataset.b ? null : b.dataset.b; render(); return; }
      const c = e.target.closest(".card"); if (c) open(ITEMS[c.dataset.key], g);
    });
    st.render = render;
    render();
  };
  mountShop("him");
  mountShop("her");

  // ---------------------------------------------------------------- WATCHES
  const wRoot = document.getElementById("watches");
  if (wRoot) {
    const ws = { who: "all", brand: null };
    const wTabs = $("[data-role=tabs]", wRoot), wBrands = $("[data-role=brands]", wRoot), wGrid = $("[data-role=grid]", wRoot);
    const wRender = () => {
      wTabs.innerHTML = [["all", "All watches"], ["him", "His"], ["her", "Hers"]].map(([k, t]) => `<button class="tab${ws.who === k ? " is-active" : ""}" data-w="${k}">${t}</button>`).join("");
      wBrands.innerHTML = [...new Set(WATCHES.map((w) => w.brand))].map((b) => `<button class="brand-chip${ws.brand === b ? " is-active" : ""}" type="button" data-b="${b}">${b}</button>`).join("");
      const list = WATCHES.filter((w) => (ws.who === "all" || w.g === ws.who || w.g === "uni") && (!ws.brand || w.brand === ws.brand));
      wGrid.innerHTML = list.map(pieceCard).join("");
    };
    wRoot.addEventListener("click", (e) => {
      const t = e.target.closest("[data-w]"); if (t) { ws.who = t.dataset.w; wRender(); return; }
      const b = e.target.closest("[data-b]"); if (b) { ws.brand = ws.brand === b.dataset.b ? null : b.dataset.b; wRender(); track("view_collection", { collection: "Watches: " + (ws.brand || "all") }); return; }
      const c = e.target.closest(".card"); if (c) open(ITEMS[c.dataset.key], "uni");
    });
    wRender();
  }

  // Links like data-goto="him:looks:Streetwear"
  const applyGoto = (g, mode, f) => { const s = shops[g]; if (s) { s.mode = mode || "looks"; s.filter = f || "all"; s.brand = null; s.render(); } };
  document.querySelectorAll("[data-goto]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const [g, mode, f] = a.dataset.goto.split(":");
    if (!document.getElementById(g)) { location.href = "/" + g + "#" + (mode || "looks") + (f ? ":" + f : ""); return; }
    applyGoto(g, mode, f);
    document.getElementById(g).scrollIntoView({ behavior: "smooth" });
  }));
  // Deep links like /him#pieces:Footwear
  const deep = decodeURIComponent(location.hash.slice(1)).split(":");
  if (deep[0] === "looks" || deep[0] === "pieces") Object.keys(shops).forEach((g) => applyGoto(g, deep[0], deep[1]));
  document.querySelectorAll("[data-track]").forEach((a) => a.addEventListener("click", () => track("cta_click", { cta: a.dataset.track })));

  // ---------------------------------------------------------------- SIZES
  const range = (a, b, step = 1) => { const o = []; for (let n = a; n <= b; n += step) o.push(String(n)); return o; };
  const US_WOMEN = ["0","2","4","6","8","10","12","14","16"];
  const SIZE_SYSTEMS = {
    jacket: { label: "Jacket size", hint: "Chest size + length: S (under 5'8\"), R (5'8\"–6'0\"), L (over 6'0\"). Most people are R.", opts: [].concat(...range(36, 48, 2).map((c) => ["S", "R", "L"].map((l) => c + l))) },
    pants:  { label: "Waist × inseam", hint: "Same as the tag on your jeans, e.g. 32x30.", pair: { a: ["Waist", range(28, 40)], b: ["Inseam", ["28","29","30","31","32","33","34"]] } },
    wjeans: { label: "Waist × inseam", hint: "Women's denim sizing, e.g. 26x30.", pair: { a: ["Waist", range(23, 33)], b: ["Inseam", ["28","29","30","31","32","33","34"]] } },
    dress:  { label: "Size (US)", hint: "", opts: US_WOMEN },
    wjacket:{ label: "Blazer size (US)", hint: "", opts: US_WOMEN },
    wpants: { label: "Trouser size (US)", hint: "", opts: US_WOMEN },
    apparel:{ label: "Size", hint: "", opts: ["XS","S","M","L","XL","XXL"] },
    ring:   { label: "Ring size (US)", hint: "Not sure? We email you a printable ring sizer.", opts: range(5, 13) },
    shoe_m: { label: "Shoe size (US men's)", hint: "", opts: ["7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12","13","14"] },
    shoe_w: { label: "Shoe size (US women's)", hint: "", opts: ["5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","11"] },
    belt:   { label: "Belt size (your waist, inches)", hint: "", opts: range(26, 40) },
  };
  const resolveKind = (kind, g) => kind === "shoe" ? (g === "her" ? "shoe_w" : "shoe_m") : kind;
  const partsFor = (item, g) => {
    if (item.parts) return item.parts;
    if (item.type === "watch") return [[item.short, "watch"]];
    return [[item.short || item.name, resolveKind(item.sizes || "apparel", g)]];
  };
  const sel = (name, opts, label) => `<select name="${name}" aria-label="${label}" required><option value="">${label}…</option>${opts.map((v) => `<option>${v}</option>`).join("")}</select>`;
  const renderSizes = (parts) => {
    $("#sizeFields").innerHTML = parts.map(([part, kind], i) => {
      if (kind === "one") return `<div class="part"><p class="hint"><b>${part}:</b> one size, adjustable. No size needed.</p></div>`;
      if (kind === "watch") return `<div class="part"><p class="hint">Bracelet is sized to your wrist before it ships — no size needed. Watches require a refundable security hold at pickup.</p></div>`;
      const S = SIZE_SYSTEMS[kind];
      const controls = S.pair
        ? `<div class="pair">${sel("p" + i + "a", S.pair.a[1], S.pair.a[0])}<span class="x">×</span>${sel("p" + i + "b", S.pair.b[1], S.pair.b[0])}</div>`
        : sel("p" + i + "a", S.opts, "Choose");
      const head = parts.length > 1 ? `<p class="part-name">${part}</p>` : "";
      return `<div class="part field" data-part="${part}" data-pair="${S.pair ? 1 : 0}">${head}<label>${S.label}</label>${controls}${S.hint ? `<small class="hint">${S.hint}</small>` : ""}</div>`;
    }).join("");
  };
  let currentParts = [];
  const sizeValue = () => [...document.querySelectorAll("#sizeFields .part")].map((d) => {
    const s = [...d.querySelectorAll("select")].map((x) => x.value);
    if (!s.length) return null;
    const v = d.dataset.pair === "1" ? s[0] + "x" + s[1] : s[0];
    return (currentParts.length > 1 ? d.dataset.part + " " : "") + v;
  }).filter(Boolean).join(" · ") || "One size";

  // ---------------------------------------------------------------- RESERVE DIALOG
  const dlg = $("#reserveDialog");
  const form = $("#reserveForm");
  let current = null, currentG = "uni";
  const SECTION = { him: "For Him", her: "For Her", uni: "" };

  const open = (item, g) => {
    current = item; currentG = g;
    const img = $("#rImg"), rArt = $("#rArt");
    if (item.img) { img.hidden = false; rArt.hidden = true; img.src = IMG(item.img, 900); img.alt = item.desc; }
    else { img.hidden = true; rArt.hidden = false; rArt.innerHTML = art(item); }
    const where = item.type === "watch" ? "Watches" : [SECTION[g], item.type === "look" ? item.c : item.cat].filter(Boolean).join(" · ");
    $("#rCollection").textContent = where;
    $("#reserveTitle").textContent = item.name;
    $("#rDesc").textContent = item.desc + (item.ref ? " Ref. " + item.ref + "." : "");
    $("#rRent").textContent = fmt(item.rent);
    $("#rRetail").textContent = (item.type === "look" || item.swatch ? "Retail " : "Value ") + fmt(item.retail);
    $("#reserveFormWrap").hidden = false;
    $("#reserveDone").hidden = true;
    $("#reserveMsg").textContent = "";
    form.reset();
    currentParts = partsFor(item, g);
    $("#rType").innerHTML = item.type === "look"
      ? (currentParts.length > 1 ? "<b>Full look</b> — includes: " + currentParts.map((p) => p[0]).join(" + ") + ". Pick a size for each." : "<b>Full look</b> — everything shown in the photo is included.")
      : "<b>Single piece</b> — you get just this item.";
    renderSizes(currentParts);
    const ev = $("#fEvent");
    if (item.type === "look") ev.value = { Formal: "Formal / Gala", "Interview-Ready": "Interview", "Grad Photos": "Graduation Photos", Streetwear: "Concert / Night Out" }[item.c] || "";
    else if (item.swatch || item.type === "watch") ev.value = "Formal / Gala";
    else ev.value = "Concert / Night Out";
    dlg.showModal();
    track("view_item", { item_name: item.name, item_category: item.type === "look" ? item.c : item.cat, item_brand: item.brand || "", value: item.rent, currency: "USD" });
  };
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });

  const send = async (data) => {
    const r = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!r.ok) throw new Error("submit failed");
    return r.json();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = ["fName", "fEmail", "fDate", "fEvent"].map((id) => $("#" + id)).concat([...document.querySelectorAll("#sizeFields select")]);
    let ok = true;
    fields.forEach((f) => { const bad = !f.value || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)); f.classList.toggle("invalid", bad); if (bad) ok = false; });
    if (!ok) { $("#reserveMsg").textContent = "Please complete the highlighted fields."; return; }
    const btn = $("#reserveBtn"); btn.disabled = true; btn.textContent = "Reserving…";
    const fd = new FormData(form);
    const collection = current.type === "look" ? current.c : "By the Piece";
    const label = (current.type === "watch" ? "Watch — " : SECTION[currentG] ? SECTION[currentG] + " — " : "") + current.name + (current.ref ? " (" + current.ref + ")" : "");
    try {
      await send({
        type: "reservation", name: fd.get("name"), email: fd.get("email"), size: sizeValue(),
        eventDate: fd.get("eventDate"), eventType: fd.get("eventType"), heardAbout: fd.get("heardAbout"),
        look: label, collection, utm: utm(), website: fd.get("website"),
      });
      track("generate_lead", { item_name: current.name, item_category: collection, value: current.rent, currency: "USD" });
      track("reserve_look", { item_name: current.name, item_category: collection });
      $("#dLook").textContent = current.name;
      $("#reserveFormWrap").hidden = true;
      $("#reserveDone").hidden = false;
    } catch (err) {
      $("#reserveMsg").textContent = "Something went wrong. Please try again in a moment.";
    } finally { btn.disabled = false; btn.textContent = "Reserve — free"; }
  });

  // Email signup
  $("#signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("#signupEmail").value.trim();
    const msg = $("#signupMsg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = "Please enter a valid email."; return; }
    msg.textContent = "Adding you…";
    try {
      await send({ type: "signup", email, utm: utm(), website: e.target.website.value });
      track("sign_up", { method: "email_list" });
      msg.textContent = "You're on the list. Watch for Collection 01.";
      e.target.reset();
    } catch { msg.textContent = "Something went wrong. Please try again."; }
  });
})();
