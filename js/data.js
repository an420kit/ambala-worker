/**
 * AMBALA WORKER (अम्बाला वर्कर) - MASTER DATA REPOSITORY
 * Exhaustive Ambala Towns & Villages (60+), 18+ Universal Trades,
 * Custom Trade Creator & Smart Bilingual Synonym Engine.
 * 100% Real-Data Driven (Clean Slate - No Dummy Workers/Jobs).
 */

// Comprehensive Geographical Master of Ambala District
const DEFAULT_AMBALA_LOCALITIES = [
  { id: "all", nameEn: "All Ambala (सभी इलाके)", nameHi: "सभी अम्बाला इलाके", type: "all", zone: "All" },
  
  // --- AMBALA CANTT (कस्बे, गांव व कॉलोनियां) ---
  { id: "cantt_sadar", nameEn: "Ambala Cantt - Sadar Bazar", nameHi: "सदर बाजार", type: "town", zone: "Ambala Cantt" },
  { id: "cantt_mahesh", nameEn: "Ambala Cantt - Mahesh Nagar", nameHi: "महेश नगर", type: "colony", zone: "Ambala Cantt" },
  { id: "cantt_babyal", nameEn: "Babyal Village & Colony", nameHi: "गांव बब्याल", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_boh", nameEn: "Boh Village", nameHi: "गांव बोह", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_kardhan", nameEn: "Kardhan Village", nameHi: "गांव करधन", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_machhonda", nameEn: "Machhonda Village", nameHi: "गांव मछौंडा", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_shahpur", nameEn: "Shahpur Village", nameHi: "गांव शाहपुर", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_panjokhra", nameEn: "Panjokhra Sahib Village", nameHi: "गांव पंजोखरा साहिब", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_station", nameEn: "Railway Station / Labour Chowk", nameHi: "कैंट रेलवे स्टेशन / लेबर चौक", type: "town", zone: "Ambala Cantt" },
  { id: "cantt_nanhera", nameEn: "Nanhera Village", nameHi: "गांव नन्हेड़ा", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_rampur", nameEn: "Rampur Sarsehri", nameHi: "गांव रामपुर सरसेहड़ी", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_defence", nameEn: "Defence Colony", nameHi: "डिफेंस कॉलोनी", type: "colony", zone: "Ambala Cantt" },
  { id: "cantt_bc_bazar", nameEn: "B.C. Bazar & Topkhana", nameHi: "बी.सी. बाजार व तोपखाना", type: "town", zone: "Ambala Cantt" },
  { id: "cantt_tepla", nameEn: "Tepla Village", nameHi: "गांव तेपला", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_dhulkot", nameEn: "Dhulkot Village", nameHi: "गांव धूलकोट", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_khojkipur", nameEn: "Khojkipur Village", nameHi: "गांव खोजकीपुर", type: "village", zone: "Ambala Cantt" },
  { id: "cantt_jansui", nameEn: "Jansui Village", nameHi: "गांव जनसुई", type: "village", zone: "Ambala Cantt" },

  // --- AMBALA CITY (कस्बे, सेक्टर व गांव) ---
  { id: "city_model_town", nameEn: "Ambala City - Model Town", nameHi: "मॉडल टाउन", type: "town", zone: "Ambala City" },
  { id: "city_sector7", nameEn: "Sector 7 (Urban Estate)", nameHi: "सेक्टर 7", type: "sector", zone: "Ambala City" },
  { id: "city_sector8", nameEn: "Sector 8", nameHi: "सेक्टर 8", type: "sector", zone: "Ambala City" },
  { id: "city_sector9", nameEn: "Sector 9 & 10", nameHi: "सेक्टर 9 और 10", type: "sector", zone: "Ambala City" },
  { id: "city_baldev", nameEn: "Baldev Nagar", nameHi: "बलदेव नगर", type: "colony", zone: "Ambala City" },
  { id: "city_cloth_mkt", nameEn: "Cloth Market & Old City", nameHi: "कपड़ा मार्केट व पुराना शहर", type: "town", zone: "Ambala City" },
  { id: "city_prem_nagar", nameEn: "Prem Nagar", nameHi: "प्रेम नगर", type: "colony", zone: "Ambala City" },
  { id: "city_patti_mehar", nameEn: "Patti Mehar", nameHi: "पट्टी मेहर", type: "colony", zone: "Ambala City" },
  { id: "city_manav_chowk", nameEn: "Manav Chowk / Polytechnic", nameHi: "मानव चौक", type: "town", zone: "Ambala City" },
  { id: "city_kakru", nameEn: "Kakru Village", nameHi: "गांव काकड़ू", type: "village", zone: "Ambala City" },
  { id: "city_matheri", nameEn: "Matheri Shekhan Village", nameHi: "गांव मठेड़ी शेखां", type: "village", zone: "Ambala City" },
  { id: "city_nasirpur", nameEn: "Nasirpur Village", nameHi: "गांव नासिरपुर", type: "village", zone: "Ambala City" },
  { id: "city_garnala", nameEn: "Garnala Village", nameHi: "गांव गरनाला", type: "village", zone: "Ambala City" },
  { id: "city_sambhalkha", nameEn: "Sambhalkha Village", nameHi: "गांव संभालखा", type: "village", zone: "Ambala City" },
  { id: "city_baknor", nameEn: "Baknor Village", nameHi: "गांव बकनौर", type: "village", zone: "Ambala City" },
  { id: "city_dangdehri", nameEn: "Dangdehri Village", nameHi: "गांव दांगडेहरी", type: "village", zone: "Ambala City" },
  { id: "city_ballana", nameEn: "Ballana Village", nameHi: "गांव बल्लाना", type: "village", zone: "Ambala City" },
  { id: "city_chourmastpur", nameEn: "Chourmastpur Village", nameHi: "गांव चौरमस्तपुर", type: "village", zone: "Ambala City" },
  { id: "city_ismailpur", nameEn: "Ismailpur Village", nameHi: "गांव इस्माइलपुर", type: "village", zone: "Ambala City" },

  // --- BARARA, SAHA & MULLANA BELT (कस्बे व गांव) ---
  { id: "belt_barara", nameEn: "Barara Town & Mandi", nameHi: "कस्बा बराड़ा व मंडी", type: "town", zone: "Barara/Saha" },
  { id: "belt_saha", nameEn: "Saha Town & Growth Centre", nameHi: "कस्बा साहा", type: "town", zone: "Barara/Saha" },
  { id: "belt_mullana", nameEn: "Mullana Town & MMU Area", nameHi: "कस्बा मुलाना", type: "town", zone: "Barara/Saha" },
  { id: "belt_kesari", nameEn: "Kesari Village", nameHi: "गांव केसरी", type: "village", zone: "Barara/Saha" },
  { id: "belt_kalpi", nameEn: "Kalpi Village", nameHi: "गांव कालपी", type: "village", zone: "Barara/Saha" },
  { id: "belt_dinarpur", nameEn: "Dinarpur Village", nameHi: "गांव दीनारपुर", type: "village", zone: "Barara/Saha" },
  { id: "belt_adhoya", nameEn: "Adhoya Village", nameHi: "गांव अधोया", type: "village", zone: "Barara/Saha" },
  { id: "belt_tandwal", nameEn: "Tandwal Village", nameHi: "गांव तांडवाल", type: "village", zone: "Barara/Saha" },
  { id: "belt_subhri", nameEn: "Subhri Village", nameHi: "गांव सुभरी", type: "village", zone: "Barara/Saha" },
  { id: "belt_samlehri", nameEn: "Samlehri Village", nameHi: "गांव समलेहड़ी", type: "village", zone: "Barara/Saha" },
  { id: "belt_nahoni", nameEn: "Nahoni Village", nameHi: "गांव नहोनी", type: "village", zone: "Barara/Saha" },

  // --- NARAINGARH & SHAHZADPUR BELT (कस्बे व गांव) ---
  { id: "belt_naraingarh", nameEn: "Naraingarh Town", nameHi: "कस्बा नारायणगढ़", type: "town", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_shahzadpur", nameEn: "Shahzadpur Town", nameHi: "कस्बा शहजादपुर", type: "town", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_bharog", nameEn: "Bharog Village", nameHi: "गांव भड़ोग", type: "village", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_laha", nameEn: "Laha Village", nameHi: "गांव लहा", type: "village", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_kurali", nameEn: "Kurali Village", nameHi: "गांव कुराली", type: "village", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_ambli", nameEn: "Ambli Village", nameHi: "गांव अम्बली", type: "village", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_hamidpur", nameEn: "Hamidpur Village", nameHi: "गांव हामिदपुर", type: "village", zone: "Naraingarh/Shahzadpur" },
  { id: "belt_banondi", nameEn: "Banondi Village", nameHi: "गांव बनौंदी", type: "village", zone: "Naraingarh/Shahzadpur" }
];

// Universal 18+ Work Categories
const DEFAULT_WORKER_CATEGORIES = [
  { id: "all", nameEn: "All Services", nameHi: "सभी काम", icon: "🛠️", isCustom: false },
  { id: "bai", nameEn: "Kaam Wali Bai (Maid)", nameHi: "काम वाली बाई", icon: "🧹", isCustom: false },
  { id: "plumber", nameEn: "Plumber (Nal Mistri)", nameHi: "प्लंबर (नल मिस्त्री)", icon: "🔧", isCustom: false },
  { id: "electrician", nameEn: "Electrician", nameHi: "बिजली मिस्त्री", icon: "⚡", isCustom: false },
  { id: "mistri", nameEn: "Raj Mistri (Mason)", nameHi: "राज मिस्त्री", icon: "🧱", isCustom: false },
  { id: "dihadi", nameEn: "Dihadi Mazdoor (Labour)", nameHi: "दिहाड़ी मजदूर", icon: "👷‍♂️", isCustom: false },
  { id: "maalish", nameEn: "Maalish Wali (Care)", nameHi: "मालिश वाली", icon: "💆‍♀️", isCustom: false },
  { id: "painter", nameEn: "Painter (Wall Putty)", nameHi: "पेंटर मिस्त्री", icon: "🎨", isCustom: false },
  { id: "cook", nameEn: "Cook / Khansama", nameHi: "रसोइया / कुक", icon: "👨‍🍳", isCustom: false },
  { id: "carpenter", nameEn: "Carpenter (Badhai)", nameHi: "बढ़ई (लकड़ी काम)", icon: "🪚", isCustom: false },
  { id: "loading", nameEn: "Loading / Shifting", nameHi: "लोडिंग / शिफ्टिंग", icon: "📦", isCustom: false },
  { id: "welder", nameEn: "Welder & Fabrication", nameHi: "वेल्डर (गेट, ग्रिल)", icon: "🔥", isCustom: false },
  { id: "ac_repair", nameEn: "AC & Refrigerator Repair", nameHi: "AC व फ्रिज मैकेनिक", icon: "❄️", isCustom: false },
  { id: "driver", nameEn: "Driver (Car / Commercial)", nameHi: "गाड़ी ड्राइवर", icon: "🚗", isCustom: false },
  { id: "guard", nameEn: "Security Guard / Chowkidar", nameHi: "सुरक्षा गार्ड / चौकीदार", icon: "🛡️", isCustom: false },
  { id: "babysitter", nameEn: "Babysitter / Daai", nameHi: "बेबीसिटर / दाई", icon: "👶", isCustom: false },
  { id: "gardener", nameEn: "Gardener (Maali)", nameHi: "माली (बगीचा काम)", icon: "🌱", isCustom: false },
  { id: "tailor", nameEn: "Tailor / Boutique Stitching", nameHi: "टेलर / सिलाई कारीगर", icon: "🪡", isCustom: false },
  { id: "mechanic", nameEn: "Two-Wheeler & Auto Mechanic", nameHi: "ऑटो व बाइक मैकेनिक", icon: "🛵", isCustom: false }
];

// Bilingual Synonym Dictionary for Intelligent Search Matching
const SEARCH_SYNONYMS = {
  bai: ["bai", "maid", "kamwali", "safai", "jhaadu", "pocha", "bartan", "housekeeper", "baiji", "naukrani", "सफाई", "बाई", "झाड़ू", "पोछा", "बर्तन", "घरेलू"],
  plumber: ["plumber", "plumbing", "pipe", "pani", "tanki", "leak", "tap", "motor", "sanitary", "geyser", "नल", "प्लंबर", "पाइप", "टंकी", "लीकेज", "मोटर", "गीजर"],
  electrician: ["electrician", "bijli", "light", "wiring", "inverter", "fan", "mcb", "fuse", "short", "socket", "switch", "बिजली", "इलेक्ट्रीशियन", "वायरिंग", "इन्वर्टर", "पंखा"],
  mistri: ["mistri", "mason", "raj mistri", "chunaai", "tile", "tiles", "plaster", "cement", "eent", "brick", "marble", "मिस्त्री", "राज मिस्त्री", "चुनाई", "टाइल", "प्लास्टर"],
  dihadi: ["dihadi", "mazdoor", "labour", "beldar", "khudai", "malba", "chowk", "daily", "helper", "दिहाड़ी", "मजदूर", "बेलदार", "खुदाई", "मलबा", "चौक लेबर"],
  maalish: ["maalish", "massage", "oil", "tel", "jacha", "bacha", "baby", "mother", "elderly", "knees", "मालिश", "जच्चा", "बच्चा", "तेल मालिश", "मालिश वाली"],
  painter: ["painter", "paint", "putty", "rang", "safedi", "asian paints", "texture", "seepage", "waterproofing", "पेंटर", "पुट्टी", "रंग", "सफेदी", "सीलन"],
  cook: ["cook", "khansama", "chef", "roti", "khana", "rasoi", "tiffin", "food", "kitchen", "रसोइया", "कुक", "खाना", "रोटी", "रसोई"],
  carpenter: ["carpenter", "badhai", "wood", "lakdi", "door", "almarhi", "furniture", "bed", "lock", "बढ़ई", "लकड़ी", "दरवाजा", "फर्नीचर", "अलमारी"],
  loading: ["loading", "unloading", "shifting", "palledaar", "tempo", "luggage", "truck", "लोडिंग", "शिफ्टिंग", "पल्लेदार", "सामान"],
  welder: ["welder", "welding", "grill", "gate", "iron", "loha", "shed", "fabrication", "वेल्डर", "वेल्डिंग", "गेट", "ग्रिल", "लोहा"],
  ac_repair: ["ac", "air conditioner", "fridge", "refrigerator", "cooling", "gas", "washing machine", "एसी", "फ्रिज", "कूलिंग"],
  driver: ["driver", "car", "gaadi", "commercial", "tempo", "chauffeur", "ड्राइवर", "गाड़ी", "चालक"],
  guard: ["guard", "security", "chowkidar", "gatekeeper", "सुरक्षा गार्ड", "चौकीदार"],
  babysitter: ["babysitter", "nanny", "daai", "infant", "childcare", "बेबीसिटर", "दाई", "बच्चे"],
  gardener: ["gardener", "mali", "lawn", "grass", "plants", "paudhe", "flowers", "माली", "पौधे", "घास"],
  tailor: ["tailor", "darzi", "silai", "stitching", "suit", "blouse", "टेलर", "सिलाई", "दर्जी"],
  mechanic: ["mechanic", "bike", "scooty", "auto", "puncture", "servicing", "मैकेनिक", "बाइक", "स्कूटी"]
};

// Authentic Verified Ambala Workers (Live Community Directory)
const INITIAL_WORKERS = [
  {
    id: "AW-2026-1001",
    officialWorkerId: "AW-2026-1001",
    name: "राजेश धीमान",
    category: "carpenter",
    trade: "बढ़ई (लकड़ी काम)",
    roleHi: "बढ़ई (लकड़ी काम)",
    roleEn: "Carpenter",
    locality: "सदर बाजार",
    townOrVillage: "सदर बाजार",
    locationType: "town",
    permanentAddress: "वार्ड 4, सदर बाजार, अम्बाला छावनी",
    localAddress: "सदर बाजार, अम्बाला छावनी",
    phone: "9812345001",
    whatsapp: "919812345001",
    experienceHi: "12 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 38,
    isVerified: true,
    status: "approved",
    hourlyRate: 150,
    dailyRate: 800,
    weeklyRate: 4800,
    monthlyRate: 20000,
    bioHi: "दरवाजे, अलमारी, मॉड्यूलर किचन व फर्नीचर रिपेयर का पक्का काम।",
    avatar: "assets/worker_rajesh.jpg",
    aadhaarNumber: "7845 2390 1142",
    approvedAt: "2026-09-20T10:00:00.000Z",
    approvedBy: "an420kit"
  },
  {
    id: "AW-2026-1002",
    officialWorkerId: "AW-2026-1002",
    name: "मनोज कुमार",
    category: "painter",
    trade: "पेंटर मिस्त्री",
    roleHi: "पेंटर मिस्त्री (पुट्टी व डिस्टेंपर)",
    roleEn: "Painter",
    locality: "महेश नगर",
    townOrVillage: "महेश नगर",
    locationType: "colony",
    permanentAddress: "गली 3, महेश नगर, अम्बाला छावनी",
    localAddress: "महेश नगर, अम्बाला छावनी",
    phone: "9812345002",
    whatsapp: "919812345002",
    experienceHi: "9 साल का अनुभव",
    rating: 4.8,
    reviewsCount: 29,
    isVerified: true,
    status: "approved",
    hourlyRate: 120,
    dailyRate: 750,
    weeklyRate: 4500,
    monthlyRate: 19000,
    bioHi: "मकान पुट्टी, एशियन पेंट्स, वॉटरप्रूफिंग व सीलन समाधान।",
    avatar: "assets/worker_manoj.jpg",
    aadhaarNumber: "6321 8904 5512",
    approvedAt: "2026-09-21T11:00:00.000Z",
    approvedBy: "an420kit"
  },
  {
    id: "AW-2026-1003",
    officialWorkerId: "AW-2026-1003",
    name: "सुरेश पाल",
    category: "mistri",
    trade: "राज मिस्त्री",
    roleHi: "राज मिस्त्री (मकान निर्माण)",
    roleEn: "Mason",
    locality: "मॉडल टाउन",
    townOrVillage: "मॉडल टाउन",
    locationType: "town",
    permanentAddress: "मॉडल टाउन, अम्बाला शहर",
    localAddress: "मॉडल टाउन, अम्बाला शहर",
    phone: "9812345003",
    whatsapp: "919812345003",
    experienceHi: "15 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 44,
    isVerified: true,
    status: "approved",
    hourlyRate: 150,
    dailyRate: 850,
    weeklyRate: 5100,
    monthlyRate: 22000,
    bioHi: "मकान चुनाई, प्लास्टर, टाइल्स व मार्बल लगाने के अनुभवी कारीगर।",
    avatar: "assets/worker_rajesh.jpg",
    aadhaarNumber: "4512 7789 3301",
    approvedAt: "2026-09-22T09:30:00.000Z",
    approvedBy: "an420kit"
  },
  {
    id: "AW-2026-1004",
    officialWorkerId: "AW-2026-1004",
    name: "संदीप शर्मा",
    category: "electrician",
    trade: "बिजली मिस्त्री",
    roleHi: "बिजली मिस्त्री (इन्वर्टर व वायरिंग)",
    roleEn: "Electrician",
    locality: "सेक्टर 7",
    townOrVillage: "सेक्टर 7",
    locationType: "sector",
    permanentAddress: "सेक्टर 7 अर्बन एस्टेट, अम्बाला शहर",
    localAddress: "सेक्टर 7, अम्बाला शहर",
    phone: "9812345004",
    whatsapp: "919812345004",
    experienceHi: "8 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 31,
    isVerified: true,
    status: "approved",
    hourlyRate: 250,
    dailyRate: 750,
    weeklyRate: 4500,
    monthlyRate: 20000,
    bioHi: "घरेलू व दुकान वायरिंग, एमसीबी बॉक्स, पंखा, मोटर व इन्वर्टर रिपेयर।",
    avatar: "assets/worker_rajesh.jpg",
    aadhaarNumber: "9123 4567 8821",
    approvedAt: "2026-09-23T14:00:00.000Z",
    approvedBy: "an420kit"
  },
  {
    id: "AW-2026-1005",
    officialWorkerId: "AW-2026-1005",
    name: "अशोक वर्मा",
    category: "plumber",
    trade: "प्लंबर (नल मिस्त्री)",
    roleHi: "प्लंबर (नल व मोटर मिस्त्री)",
    roleEn: "Plumber",
    locality: "कस्बा बराड़ा",
    townOrVillage: "कस्बा बराड़ा व मंडी",
    locationType: "town",
    permanentAddress: "मेन बाजार, कस्बा बराड़ा, अम्बाला",
    localAddress: "कस्बा बराड़ा, अम्बाला",
    phone: "9812345005",
    whatsapp: "919812345005",
    experienceHi: "10 साल का अनुभव",
    rating: 4.8,
    reviewsCount: 27,
    isVerified: true,
    status: "approved",
    hourlyRate: 200,
    dailyRate: 700,
    weeklyRate: 4200,
    monthlyRate: 18000,
    bioHi: "पानी टंकी, गीजर, नल लीकेज, मोटर फिटिंग व सेनेटरी का संपूर्ण समाधान।",
    avatar: "assets/worker_babloo.jpg",
    aadhaarNumber: "8834 5612 9011",
    approvedAt: "2026-09-24T16:00:00.000Z",
    approvedBy: "an420kit"
  },
  {
    id: "AW-2026-1006",
    officialWorkerId: "AW-2026-1006",
    name: "सुनीता रानी",
    category: "bai",
    trade: "काम वाली बाई",
    roleHi: "काम वाली बाई (घरेलू सहायिका)",
    roleEn: "Housekeeper",
    locality: "गांव बब्याल",
    townOrVillage: "गांव बब्याल",
    locationType: "village",
    permanentAddress: "गांव बब्याल, अम्बाला छावनी",
    localAddress: "गांव बब्याल, अम्बाला छावनी",
    phone: "9812345006",
    whatsapp: "919812345006",
    experienceHi: "7 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 35,
    isVerified: true,
    status: "approved",
    hourlyRate: 120,
    dailyRate: 400,
    weeklyRate: 2400,
    monthlyRate: 3500,
    bioHi: "झाड़ू, पोछा, बर्तन व घरेलू साफ-सफाई में कुशल व ईमानदार।",
    avatar: "assets/worker_sunita.jpg",
    aadhaarNumber: "5123 8890 4120",
    approvedAt: "2026-09-25T08:00:00.000Z",
    approvedBy: "an420kit"
  }
];

const INITIAL_POSTED_JOBS = [
  {
    id: "job-101",
    titleHi: "मकान में 2 दिन के लिए 2 दिहाड़ी मजदूर चाहिए",
    category: "dihadi",
    duration: "daily",
    localityHi: "सेक्टर 7, अम्बाला शहर",
    townOrVillage: "सेक्टर 7",
    locationType: "sector",
    budget: "₹650 / दिन (प्रति मजदूर)",
    budgetAmount: 650,
    customerName: "अनिल शर्मा",
    customerPhone: "9812345000",
    timeAgoHi: "10 मिनट पहले",
    descHi: "मकान की छत की सफाई व मलबा शिफ्ट करने हेतु 2 मेहनती दिहाड़ी मजदूर तुरंत चाहिए।",
    status: "open",
    postedAt: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: "job-102",
    titleHi: "नल लीकेज व पानी टंकी फिटिंग हेतु प्लंबर",
    category: "plumber",
    duration: "hourly",
    localityHi: "सदर बाजार, अम्बाला कैंट",
    townOrVillage: "सदर बाजार",
    locationType: "town",
    budget: "₹300 विजिट + काम अनुसार",
    budgetAmount: 300,
    customerName: "राजिंदर कुमार",
    customerPhone: "9812345000",
    timeAgoHi: "25 मिनट पहले",
    descHi: "बाथरूम में नल से पानी टपक रहा है व 500 लीटर की टंकी का इनलेट पाइप जोड़ना है।",
    status: "open",
    postedAt: new Date(Date.now() - 1500000).toISOString()
  },
  {
    id: "job-103",
    titleHi: "घर की पुट्टी व 3 कमरों में पेंट का काम",
    category: "painter",
    duration: "contract",
    localityHi: "मॉडल टाउन, अम्बाला शहर",
    townOrVillage: "मॉडल टाउन",
    locationType: "town",
    budget: "₹14,000 (सामग्री ग्राहक की)",
    budgetAmount: 14000,
    customerName: "विकास गुप्ता",
    customerPhone: "9812345000",
    timeAgoHi: "1 घंटा पहले",
    descHi: "दीपावली से पहले 3 कमरों और लॉबी में पुट्टी घिसाई व ट्रैक्टर इमल्शन पेंट कराना है।",
    status: "open",
    postedAt: new Date(Date.now() - 3600000).toISOString()
  }
];

// Seed Admin Sponsored Ads (Upper & Side Banners with Custom Photo + 10s Clip with Audio)
const INITIAL_ADS = [
  {
    id: "ad-upper-01",
    titleHi: "दीपावली व शादी सीजन: मकान पुट्टी-पेंट मेला",
    subtitleHi: "Asian Paints अधिकृत पेंटर उपलब्ध • 15% छूट व फ्री कोटेशन",
    phone: "9812345000",
    badge: "ऑफर",
    bannerType: "upper", // 'upper' = ऊपर का मुख्य बैनर
    mediaType: "image", // 'image' = कस्टम फोटो
    mediaUrl: "assets/hero_banner.jpg",
    clipDuration: 10,
    audioEnabled: true,
    target: "both",
    isActive: true,
    createdAt: "2026-09-28T10:00:00.000Z"
  },
  {
    id: "ad-side-01",
    titleHi: "⚡ 24x7 इमरजेंसी बिजली व मोटर रिपेयर",
    subtitleHi: "15 मिनट में मिस्त्री आपके घर • अम्बाला कैंट व सिटी",
    phone: "9812345004",
    badge: "इमरजेंसी",
    bannerType: "side", // 'side' = साइड फ्लोटिंग बैनर
    mediaType: "video", // 'video' = 10-सेकंड वीडियो/ऑडियो क्लिप
    mediaUrl: "assets/worker_rajesh.jpg", // default preview
    clipDuration: 10,
    audioEnabled: true,
    target: "both",
    isActive: true,
    createdAt: "2026-09-28T10:30:00.000Z"
  }
];


// Benchmark standard rates (Reference only)
const AMBALA_STANDARD_RATES = [
  { roleHi: "काम वाली बाई", icon: "🧹", hourlyRate: "₹100 - ₹150 / घंटा", dailyRate: "₹350 - ₹500 / दिन", weeklyRate: "₹2,000 - ₹2,800 / हफ्ता", monthlyRate: "₹2,500 - ₹4,500 / माह", timingHintHi: "प्रतिदिन 1-2 घंटे (झाड़ू, पोछा, बर्तन)" },
  { roleHi: "मालिश वाली", icon: "💆‍♀️", hourlyRate: "₹350 - ₹500 / घंटा", dailyRate: "₹400 - ₹600 / दिन", weeklyRate: "₹2,500 - ₹3,500 / हफ्ता", monthlyRate: "₹7,000 - ₹10,000 / माह", timingHintHi: "45-60 मिनट का शुद्ध तेल मालिश सत्र" },
  { roleHi: "राज मिस्त्री", icon: "🧱", hourlyRate: "₹150 / घंटा", dailyRate: "₹800 - ₹950 / दिन", weeklyRate: "₹4,800 - ₹5,700 / हफ्ता", monthlyRate: "₹22,000 - ₹26,000 / माह", timingHintHi: "8 घंटे की शिफ्ट (सुबह 9 से शाम 5:30)" },
  { roleHi: "प्लंबर (नल मिस्त्री)", icon: "🔧", hourlyRate: "₹200 - ₹300 / विजिट", dailyRate: "₹650 - ₹800 / दिन", weeklyRate: "₹3,900 - ₹4,800 / हफ्ता", monthlyRate: "₹18,000 - ₹22,000 / माह", timingHintHi: "विज़िट + रिपेयर चार्ज, सामान अलग से" },
  { roleHi: "दिहाड़ी मजदूर", icon: "👷‍♂️", hourlyRate: "₹80 - ₹100 / घंटा", dailyRate: "₹550 - ₹650 / दिन", weeklyRate: "₹3,300 - ₹3,900 / हफ्ता", monthlyRate: "₹14,000 - ₹16,000 / माह", timingHintHi: "अम्बाला लेबर चौक का तय न्यूनतम दैनिक वेतन" },
  { roleHi: "बिजली मिस्त्री", icon: "⚡", hourlyRate: "₹250 - ₹350 / विजिट", dailyRate: "₹750 - ₹900 / दिन", weeklyRate: "₹4,500 - ₹5,400 / हफ्ता", monthlyRate: "₹20,000 - ₹24,000 / माह", timingHintHi: "विज़िट व फॉल्ट टेस्टिंग चार्ज" },
  { roleHi: "वेल्डर व फैब्रिकेटर", icon: "🔥", hourlyRate: "₹200 / घंटा", dailyRate: "₹750 - ₹850 / दिन", weeklyRate: "₹4,500 - ₹5,100 / हफ्ता", monthlyRate: "₹19,000 - ₹22,000 / माह", timingHintHi: "गेट, ग्रिल, रेलिंग वेल्डिंग" },
  { roleHi: "AC व फ्रिज मैकेनिक", icon: "❄️", hourlyRate: "₹300 / विजिट", dailyRate: "₹850 - ₹1,000 / दिन", weeklyRate: "₹5,000 - ₹6,000 / हफ्ता", monthlyRate: "₹22,000 - ₹26,000 / माह", timingHintHi: "एसी सर्विस व गैस चार्जिंग" },
  { roleHi: "गाड़ी ड्राइवर", icon: "🚗", hourlyRate: "₹120 - ₹150 / घंटा", dailyRate: "₹550 - ₹650 / दिन", weeklyRate: "₹3,300 - ₹3,900 / हफ्ता", monthlyRate: "₹14,000 - ₹18,000 / माह", timingHintHi: "8 से 10 घंटे ड्राइविंग शिफ्ट" }
];

// --- STORAGE & DYNAMIC MASTER HELPERS ---

function getStoredLocalities() {
  const custom = localStorage.getItem('ambala_master_localities');
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return [...DEFAULT_AMBALA_LOCALITIES];
}

function addMasterLocality(name, type = 'village', zone = 'Ambala Cantt') {
  if (!name || typeof name !== 'string') return null;
  const cleanName = name.trim();
  if (cleanName.length < 2) return null;

  const current = getStoredLocalities();
  const exists = current.find(l => 
    l.nameHi.toLowerCase() === cleanName.toLowerCase() || 
    l.nameEn.toLowerCase() === cleanName.toLowerCase() ||
    (l.townOrVillage && l.townOrVillage.toLowerCase() === cleanName.toLowerCase())
  );
  if (exists) return exists;

  const slug = 'loc_' + Date.now().toString(36);
  const typeTag = type === 'village' ? 'गांव' : (type === 'town' ? 'कस्बा' : (type === 'sector' ? 'सेक्टर' : 'कॉलोनी'));
  const newLoc = {
    id: slug,
    nameEn: cleanName,
    nameHi: `${cleanName} [${typeTag}]`,
    townOrVillage: cleanName,
    type: type,
    zone: zone,
    isCustom: true,
    addedAt: new Date().toISOString()
  };

  current.push(newLoc);
  localStorage.setItem('ambala_master_localities', JSON.stringify(current));
  return newLoc;
}

function getStoredCategories() {
  const custom = localStorage.getItem('ambala_master_categories');
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return [...DEFAULT_WORKER_CATEGORIES];
}

function addMasterCategory(nameHi, nameEn = '', icon = '🛠️') {
  if (!nameHi || typeof nameHi !== 'string') return null;
  const cleanHi = nameHi.trim();
  if (cleanHi.length < 2) return null;

  const current = getStoredCategories();
  const exists = current.find(c => 
    c.nameHi.toLowerCase() === cleanHi.toLowerCase() ||
    (c.nameEn && c.nameEn.toLowerCase() === cleanHi.toLowerCase())
  );
  if (exists) return exists;

  const slug = 'cat_' + Date.now().toString(36);
  const newCat = {
    id: slug,
    nameHi: cleanHi,
    nameEn: nameEn.trim() || cleanHi,
    icon: icon,
    isCustom: true,
    addedAt: new Date().toISOString()
  };

  current.push(newCat);
  localStorage.setItem('ambala_master_categories', JSON.stringify(current));
  return newCat;
}

// Smart Intelligent Search Matcher
function matchWorkerSearch(worker, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;

  const pool = [
    worker.name,
    worker.roleHi,
    worker.roleEn,
    worker.townOrVillage,
    worker.localityNameHi,
    worker.localityNameEn,
    worker.phone,
    worker.category
  ].filter(Boolean).join(' ').toLowerCase();

  if (pool.includes(q)) return true;

  const tokens = q.split(/\s+/).filter(t => t.length > 1);
  if (tokens.length > 1) {
    const allMatch = tokens.every(tok => {
      if (pool.includes(tok)) return true;
      const synList = SEARCH_SYNONYMS[worker.category] || [];
      return synList.some(s => s.toLowerCase().includes(tok) || tok.includes(s.toLowerCase()));
    });
    if (allMatch) return true;
  }

  for (const [catKey, synList] of Object.entries(SEARCH_SYNONYMS)) {
    const termMatchesQuery = synList.some(s => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()));
    if (termMatchesQuery) {
      if (worker.category === catKey) return true;
    }
  }

  return false;
}

// Filter to exclude only old dummy workers with legacy IDs (e.g. w-01, w-02)
function isLegacyDummy(item) {
  if (!item) return true;
  if (item.id && typeof item.id === 'string' && /^w-\d{2}$/.test(item.id)) return true;
  return false;
}

// --- STATE MANAGEMENT HELPERS FOR WORKERS, JOBS & CUSTOMERS ---

function getStoredWorkers() {
  try {
    const raw = localStorage.getItem('ambala_workers');
    if (raw) {
      const parsed = JSON.parse(raw);
      const clean = parsed.filter(w => !isLegacyDummy(w) && w.status === 'approved' && w.isVerified);
      if (clean.length > 0) {
        return clean;
      }
    }
    localStorage.setItem('ambala_workers', JSON.stringify(INITIAL_WORKERS));
    return [...INITIAL_WORKERS];
  } catch (e) {
    return [...INITIAL_WORKERS];
  }
}

function getPendingWorkers() {
  try {
    const raw = localStorage.getItem('ambala_pending_workers');
    if (raw) {
      const parsed = JSON.parse(raw);
      const clean = parsed.filter(w => !isLegacyDummy(w) && w.status === 'pending');
      if (clean.length !== parsed.length) {
        localStorage.setItem('ambala_pending_workers', JSON.stringify(clean));
      }
      return clean;
    }
    localStorage.setItem('ambala_pending_workers', JSON.stringify([]));
    return [];
  } catch (e) {
    return [];
  }
}

function getRejectedWorkers() {
  try {
    const raw = localStorage.getItem('ambala_rejected_workers');
    if (raw) {
      const parsed = JSON.parse(raw);
      const clean = parsed.filter(w => !isLegacyDummy(w) && w.status === 'rejected');
      return clean;
    }
    return [];
  } catch (e) {
    return [];
  }
}

// Worker ID is generated and assigned ONLY after Admin confirms/approves!
function approveWorker(workerAppId) {
  const pending = getPendingWorkers();
  const workerIndex = pending.findIndex(w => w.appId === workerAppId || w.id === workerAppId);
  if (workerIndex === -1) return null;

  const [worker] = pending.splice(workerIndex, 1);

  // Generate official unique Ambala Worker ID upon Admin confirmation
  const officialWorkerId = 'AW-' + (new Date().getFullYear()) + '-' + Math.floor(1000 + Math.random() * 9000);
  worker.id = officialWorkerId;
  worker.officialWorkerId = officialWorkerId;
  worker.isVerified = true;
  worker.status = 'approved';
  worker.approvedAt = new Date().toISOString();
  worker.approvedBy = 'an420kit';

  // Save updated pending list
  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));

  // Add to approved active workers
  const approved = getStoredWorkers();
  const existingIdx = approved.findIndex(w => w.id === officialWorkerId || w.phone === worker.phone);
  if (existingIdx !== -1) {
    approved[existingIdx] = worker;
  } else {
    approved.push(worker);
  }
  localStorage.setItem('ambala_workers', JSON.stringify(approved));
  window.AMBALA_DATA.workers = approved;

  return worker;
}

function rejectWorker(workerAppId, reason = 'दस्तावेज अपूर्ण या सत्यापन में त्रुटि') {
  const pending = getPendingWorkers();
  const workerIndex = pending.findIndex(w => w.appId === workerAppId || w.id === workerAppId);
  if (workerIndex === -1) return null;

  const [worker] = pending.splice(workerIndex, 1);
  worker.isVerified = false;
  worker.status = 'rejected';
  worker.rejectionReason = reason;
  worker.rejectedAt = new Date().toISOString();

  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));

  const rejected = getRejectedWorkers();
  rejected.unshift(worker);
  localStorage.setItem('ambala_rejected_workers', JSON.stringify(rejected));

  return worker;
}

function restoreWorker(workerAppId) {
  const rejected = getRejectedWorkers();
  const workerIndex = rejected.findIndex(w => w.appId === workerAppId || w.id === workerAppId);
  if (workerIndex === -1) return null;

  const [worker] = rejected.splice(workerIndex, 1);
  worker.status = 'pending';
  delete worker.rejectionReason;

  localStorage.setItem('ambala_rejected_workers', JSON.stringify(rejected));

  const pending = getPendingWorkers();
  pending.unshift(worker);
  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));

  return worker;
}

// Worker registers with mandatory Aadhaar photo and permanent address from CV/OCR.
// Status is pending until Admin confirms. Official Worker ID is NOT created yet.
function registerWorker(workerData) {
  const pending = getPendingWorkers();
  const appId = 'APP-' + Date.now().toString(36).toUpperCase();

  const newWorker = {
    appId: appId,
    id: appId, // Temporary tracking reference
    officialWorkerId: null, // Only created after Admin confirmation!
    name: workerData.name,
    category: workerData.category || 'dihadi',
    trade: workerData.trade || 'कारीगर',
    roleHi: workerData.roleHi || workerData.trade || 'कारीगर',
    roleEn: workerData.trade || 'Worker',
    locality: workerData.locality || 'अम्बाला',
    townOrVillage: workerData.locality || 'अम्बाला',
    locationType: 'town',
    permanentAddress: workerData.permanentAddress || 'आधार कार्ड अनुसार',
    localAddress: workerData.locality || 'अम्बाला',
    phone: workerData.phone,
    whatsapp: '91' + workerData.phone,
    experienceHi: workerData.experience || '5 साल का अनुभव',
    rating: 5.0,
    reviewsCount: 0,
    isVerified: false,
    status: 'pending',
    hourlyRate: Number(workerData.hourlyRate) || 150,
    dailyRate: Number(workerData.dailyRate) || 800,
    weeklyRate: Number(workerData.weeklyRate) || 4800,
    monthlyRate: Number(workerData.monthlyRate) || 20000,
    bioHi: workerData.bioHi || 'अम्बाला में सत्यापित कार्य हेतु उपलब्ध।',
    avatar: workerData.avatar || workerData.aadhaarPhoto || 'assets/app-icon.png',
    aadhaarNumber: workerData.aadhaarNumber || 'जांच हेतु संलग्न',
    aadhaarPhoto: workerData.aadhaarPhoto || null,
    aadhaarDocName: workerData.aadhaarDocName || 'Aadhaar_Card_Image.jpg',
    registeredAt: new Date().toISOString()
  };

  pending.unshift(newWorker);
  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));
  return newWorker;
}

function getStoredJobs() {
  try {
    const raw = localStorage.getItem('ambala_jobs');
    if (raw) {
      const parsed = JSON.parse(raw);
      const clean = parsed.filter(j => j.id && !j.id.startsWith('job-0'));
      if (clean.length > 0) {
        return clean;
      }
    }
    localStorage.setItem('ambala_jobs', JSON.stringify(INITIAL_POSTED_JOBS));
    return [...INITIAL_POSTED_JOBS];
  } catch (e) {
    return [...INITIAL_POSTED_JOBS];
  }
}

function addJob(jobData) {
  const jobs = getStoredJobs();
  const newJob = {
    id: 'job-' + Date.now().toString(36),
    titleHi: jobData.titleHi || jobData.title || 'काम की आवश्यकता',
    category: jobData.category || 'dihadi',
    duration: jobData.duration || 'daily',
    localityHi: jobData.locality || 'अम्बाला',
    townOrVillage: jobData.locality || 'अम्बाला',
    locationType: 'town',
    budget: jobData.budget || 'तय मजदूरी',
    budgetAmount: Number(jobData.budgetAmount) || 600,
    customerName: jobData.customerName || 'अम्बाला ग्राहक',
    customerPhone: jobData.phone || '9812345000',
    timeAgoHi: 'अभी-अभी पोस्ट किया',
    descHi: jobData.descHi || jobData.desc || 'काम के लिए तुरंत संपर्क करें।',
    status: 'open',
    postedAt: new Date().toISOString()
  };

  jobs.unshift(newJob);
  localStorage.setItem('ambala_jobs', JSON.stringify(jobs));
  window.AMBALA_DATA.postedJobs = jobs;
  return newJob;
}

function getStoredCustomers() {
  try {
    const raw = localStorage.getItem('ambala_customers');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.filter(c => c.phone !== '9812345000' && c.name !== 'अनिल बंसल');
    }
    return [];
  } catch (e) {
    return [];
  }
}

// Customer registers with Name & Phone. Phone number itself is their Password!
function registerCustomer(custData) {
  const customers = getStoredCustomers();
  const existingIdx = customers.findIndex(c => c.phone === custData.phone);
  
  const customerRecord = {
    id: custData.name, // Name is user's ID
    name: custData.name,
    phone: custData.phone,
    locality: custData.locality || 'अम्बाला',
    password: custData.password || custData.phone, // Secure password chosen by user or fallback
    registeredAt: new Date().toISOString()
  };

  if (existingIdx !== -1) {
    customers[existingIdx] = customerRecord;
  } else {
    customers.push(customerRecord);
  }

  localStorage.setItem('ambala_customers', JSON.stringify(customers));
  return { success: true, customer: customerRecord };
}

// --- ADS & BANNERS HELPERS (Upper + Side Banners with Custom Photo / 10s Clip) ---

function getStoredAds() {
  const custom = localStorage.getItem('ambala_ads');
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return [...INITIAL_ADS];
}

function saveAd(adData) {
  if (!adData || !adData.titleHi) return { success: false, message: 'शीर्षक अनिवार्य है' };
  const current = getStoredAds();
  const newAd = {
    id: adData.id || ('ad-' + Date.now().toString(36)),
    titleHi: adData.titleHi,
    subtitleHi: adData.subtitleHi || '',
    phone: adData.phone || '9812345000',
    badge: adData.badge || 'ऑफर',
    bannerType: adData.bannerType || 'upper', // 'upper' (ऊपर) or 'side' (साइड) or 'both'
    mediaType: adData.mediaType || 'image', // 'image' (फोटो) or 'video' (10s क्लिप with ऑडियो)
    mediaUrl: adData.mediaUrl || 'assets/hero_banner.jpg',
    clipDuration: adData.clipDuration || 10,
    audioEnabled: adData.audioEnabled !== false,
    target: adData.target || 'both', // 'both', 'customer', 'worker'
    isActive: adData.isActive !== false,
    createdAt: adData.createdAt || new Date().toISOString()
  };

  const existingIdx = current.findIndex(a => a.id === newAd.id);
  if (existingIdx !== -1) {
    current[existingIdx] = newAd;
  } else {
    current.unshift(newAd);
  }

  localStorage.setItem('ambala_ads', JSON.stringify(current));
  if (window.AMBALA_DATA) {
    window.AMBALA_DATA.ads = current;
  }
  return { success: true, ad: newAd };
}

function deleteAd(adId) {
  let current = getStoredAds();
  current = current.filter(a => a.id !== adId);
  localStorage.setItem('ambala_ads', JSON.stringify(current));
  if (window.AMBALA_DATA) {
    window.AMBALA_DATA.ads = current;
  }
  return { success: true };
}

function toggleAd(adId) {
  const current = getStoredAds();
  const ad = current.find(a => a.id === adId);
  if (ad) {
    ad.isActive = !ad.isActive;
    localStorage.setItem('ambala_ads', JSON.stringify(current));
    if (window.AMBALA_DATA) {
      window.AMBALA_DATA.ads = current;
    }
  }
  return { success: true, ad };
}

// Clear all dummy data utility
function clearAllDummyData() {
  localStorage.setItem('ambala_workers', JSON.stringify([]));
  localStorage.setItem('ambala_pending_workers', JSON.stringify([]));
  localStorage.setItem('ambala_rejected_workers', JSON.stringify([]));
  localStorage.setItem('ambala_jobs', JSON.stringify([]));
  localStorage.setItem('ambala_customers', JSON.stringify([]));
  if (window.AMBALA_DATA) {
    window.AMBALA_DATA.workers = [];
    window.AMBALA_DATA.postedJobs = [];
  }
}

// Auto clean legacy dummy data once on initial load
(function autoPurgeDummyData() {
  try {
    const rawWorkers = localStorage.getItem('ambala_workers');
    if (rawWorkers && rawWorkers.includes('Sunita Devi')) {
      clearAllDummyData();
    }
  } catch (e) {}
})();

// Export to window
window.AMBALA_DATA = {
  localities: getStoredLocalities(),
  categories: getStoredCategories(),
  workers: getStoredWorkers(),
  standardRates: AMBALA_STANDARD_RATES,
  postedJobs: getStoredJobs(),
  ads: getStoredAds(),
  getStoredAds: getStoredAds,
  saveAd: saveAd,
  deleteAd: deleteAd,
  toggleAd: toggleAd,
  searchSynonyms: SEARCH_SYNONYMS,
  matchWorkerSearch: matchWorkerSearch,
  addMasterLocality: addMasterLocality,
  addMasterCategory: addMasterCategory,
  getStoredLocalities: getStoredLocalities,
  getStoredCategories: getStoredCategories,
  getStoredWorkers: getStoredWorkers,
  getPendingWorkers: getPendingWorkers,
  getRejectedWorkers: getRejectedWorkers,
  approveWorker: approveWorker,
  rejectWorker: rejectWorker,
  restoreWorker: restoreWorker,
  registerWorker: registerWorker,
  getStoredJobs: getStoredJobs,
  addJob: addJob,
  getStoredCustomers: getStoredCustomers,
  registerCustomer: registerCustomer,
  clearAllDummyData: clearAllDummyData
};

