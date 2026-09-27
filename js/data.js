/**
 * AMBALA WORKER (अम्बाला वर्कर) - MASTER DATA REPOSITORY
 * Exhaustive Ambala Towns & Villages (60+), 18+ Universal Trades,
 * Custom Trade Creator & Smart Bilingual Synonym Engine.
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

// Seed workers representing authentic Ambala locations
const INITIAL_WORKERS = [
  {
    id: "w-01",
    name: "Sunita Devi",
    category: "bai",
    roleEn: "Kaam Wali Bai (Jhaadu, Pocha, Bartan)",
    roleHi: "काम वाली बाई (सफाई, बर्तन, पोछा)",
    townOrVillage: "मॉडल टाउन",
    locationType: "town",
    localityId: "city_model_town",
    localityNameHi: "मॉडल टाउन [कस्बा]",
    phone: "9812345001",
    whatsapp: "919812345001",
    experienceHi: "7 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 38,
    isVerified: true,
    status: "approved",
    hourlyRate: 150,
    dailyRate: 400,
    weeklyRate: 2400,
    monthlyRate: 3500,
    bioHi: "रसोई की पूरी सफाई, झाड़ू-पोछा और बर्तनों की धुलाई में 7 साल का अनुभव। मॉडल टाउन व सेक्टर 7 में उपलब्ध।",
    avatar: "assets/worker_sunita.jpg",
    aadhaarNumber: "7841 9023 4512",
    aadhaarDocName: "Aadhaar_Sunita_Devi.jpg",
    secondDocType: "voter_id",
    secondDocTypeName: "वोटर पहचान पत्र (Voter ID)",
    secondDocNumber: "HR/04/023/184920",
    secondDocName: "Voter_ID_Card.jpg",
    reviews: [
      { id: "rev-101", author: "अनीता बंसल", locality: "मॉडल टाउन", rating: 5, date: "2 दिन पहले", comment: "सुनीता जी बहुत ही ईमानदार और समय की पाबंद हैं। बर्तन और पोछा बिल्कुल चमका देती हैं।" },
      { id: "rev-102", author: "राजीव गुप्ता", locality: "सेक्टर 7", rating: 5, date: "1 हफ्ता पहले", comment: "घर के काम में बहुत फुर्तीली हैं। किसी काम के लिए बार-बार बोलना नहीं पड़ता।" },
      { id: "rev-103", author: "मीनाक्षी शर्मा", locality: "मॉडल टाउन", rating: 4, date: "2 हफ्ते पहले", comment: "अच्छा काम करती हैं और स्वभाव भी बहुत शांत है। उचित दरें।" }
    ]
  },
  {
    id: "w-02",
    name: "Geeta Rani",
    category: "maalish",
    roleEn: "Traditional Maalish Wali (Mother & Baby)",
    roleHi: "मालिश वाली (जच्चा-बच्चा व बुजुर्ग मालिश)",
    townOrVillage: "महेश नगर",
    locationType: "colony",
    localityId: "cantt_mahesh",
    localityNameHi: "महेश नगर [कॉलोनी]",
    phone: "9812345002",
    whatsapp: "919812345002",
    experienceHi: "12 साल का अनुभव",
    rating: 5.0,
    reviewsCount: 52,
    isVerified: true,
    status: "approved",
    hourlyRate: 350,
    dailyRate: 500,
    weeklyRate: 3200,
    monthlyRate: 8500,
    bioHi: "नवजात शिशु और नई माता (जच्चा-बच्चा) की शुद्ध सरसों के तेल से मालिश। घुटनों और कमर दर्द की माहिर।",
    avatar: "assets/worker_geeta.jpg",
    aadhaarNumber: "6512 8819 3302",
    aadhaarDocName: "Aadhaar_Geeta_Rani.jpg",
    secondDocType: "pan",
    secondDocTypeName: "पैन कार्ड (PAN Card)",
    secondDocNumber: "ABCDE1234F",
    secondDocName: "PAN_Geeta.jpg",
    reviews: [
      { id: "rev-201", author: "शालिनी कपूर", locality: "महेश नगर", rating: 5, date: "3 दिन पहले", comment: "नवजात शिशु और नई माता की मालिश का बहुत गहरा अनुभव है। बहुत आरामदायक मालिश की।" },
      { id: "rev-202", author: "दादी तारावती", locality: "डिफेंस कॉलोनी", rating: 5, date: "10 दिन पहले", comment: "घुटनों के दर्द में इनके सरसों तेल की मालिश से बहुत आराम मिला।" }
    ]
  },
  {
    id: "w-03",
    name: "Ramesh Raj Mistri",
    category: "mistri",
    roleEn: "Master Mason / Raj Mistri (Tiles & Wall)",
    roleHi: "राज मिस्त्री (ईंट चुनाई, टाइल, प्लास्टर)",
    townOrVillage: "बलदेव नगर",
    locationType: "colony",
    localityId: "city_baldev",
    localityNameHi: "बलदेव नगर [कॉलोनी]",
    phone: "9812345003",
    whatsapp: "919812345003",
    experienceHi: "15 साल का अनुभव",
    rating: 4.8,
    reviewsCount: 44,
    isVerified: true,
    status: "approved",
    hourlyRate: 150,
    dailyRate: 850,
    weeklyRate: 5100,
    monthlyRate: 22000,
    bioHi: "मकान की चुनाई, प्लास्टर, टाइलें लगाने और छत वाटरप्रूफिंग के पक्के कारीगर। अपनी लेबर साथ रखते हैं।",
    avatar: "assets/worker_ramesh.jpg",
    aadhaarNumber: "8821 5019 3341",
    aadhaarDocName: "Aadhaar_Ramesh.jpg",
    secondDocType: "ration_card",
    secondDocTypeName: "राशन कार्ड (Ration Card)",
    secondDocNumber: "RC-HR-AMB-8910",
    secondDocName: "Ration_Card_Ramesh.jpg",
    reviews: [
      { id: "rev-301", author: "दीपक सैनी", locality: "बलदेव नगर", rating: 5, date: "5 दिन पहले", comment: "मकान की दीवार चुनाई और प्लास्टर बिल्कुल गुनिया में किया। पक्के कारीगर हैं।" },
      { id: "rev-302", author: "सुरेश वर्मा", locality: "प्रेम नगर", rating: 4, date: "3 हफ्ते पहले", comment: "अपनी लेबर साथ लाए थे, काम तेजी से निपटाया।" }
    ]
  },
  {
    id: "w-04",
    name: "Babloo Sharma",
    category: "plumber",
    roleEn: "Sanitary Plumber & Water Tank Fitting",
    roleHi: "प्लंबर (नल, टंकी, मोटर, लीकेज)",
    townOrVillage: "सेक्टर 7",
    locationType: "sector",
    localityId: "city_sector7",
    localityNameHi: "सेक्टर 7 [सेक्टर]",
    phone: "9812345004",
    whatsapp: "919812345004",
    experienceHi: "8 साल का अनुभव",
    rating: 4.7,
    reviewsCount: 65,
    isVerified: true,
    status: "approved",
    hourlyRate: 250,
    dailyRate: 700,
    weeklyRate: 4200,
    monthlyRate: 18000,
    bioHi: "पानी की मोटर फिटिंग, गीजर लीकेज, पीवीसी पाइप और रूफ टैंक का त्वरित समाधान।",
    avatar: "assets/worker_babloo.jpg",
    aadhaarNumber: "9021 3412 7789",
    aadhaarDocName: "Aadhaar_Babloo.jpg",
    secondDocType: "driving_license",
    secondDocTypeName: "ड्राइविंग लाइसेंस (Driving License)",
    secondDocNumber: "HR-04-2016-00481",
    secondDocName: "DL_Babloo.jpg",
    reviews: [
      { id: "rev-401", author: "राजेश मल्होत्रा", locality: "सेक्टर 7", rating: 5, date: "1 दिन पहले", comment: "छत की टंकी की लीकेज 30 मिनट में ठीक कर दी। विजिट चार्ज भी सही लिया।" }
    ]
  },
  {
    id: "w-05",
    name: "Mohan Lal Beldar",
    category: "dihadi",
    roleEn: "Dihadi Mazdoor (Construction & Digging)",
    roleHi: "दिहाड़ी मजदूर (खुदाई, मलबा उठाना, ईंटें)",
    townOrVillage: "गांव बब्याल",
    locationType: "village",
    localityId: "cantt_babyal",
    localityNameHi: "गांव बब्याल [गांव]",
    phone: "9812345005",
    whatsapp: "919812345005",
    experienceHi: "6 साल का अनुभव",
    rating: 4.6,
    reviewsCount: 29,
    isVerified: true,
    status: "approved",
    hourlyRate: 90,
    dailyRate: 550,
    weeklyRate: 3300,
    monthlyRate: 14000,
    bioHi: "मेहनती दिहाड़ी मजदूर। नींव खुदाई, सीमेंट मिलाना, ईंट चढ़ाना और मकान का मलबा उठाने में माहिर।",
    avatar: "assets/worker_mohan.jpg",
    aadhaarNumber: "5512 8841 0021",
    aadhaarDocName: "Aadhaar_Mohan.jpg",
    secondDocType: "voter_id",
    secondDocTypeName: "वोटर पहचान पत्र (Voter ID)",
    secondDocNumber: "HR/04/021/771029",
    secondDocName: "Voter_Mohan.jpg",
    reviews: [
      { id: "rev-501", author: "गुरमीत सिंह", locality: "गांव बब्याल", rating: 5, date: "1 हफ्ता पहले", comment: "बहुत मेहनती भाई हैं। पूरे 8 घंटे बिना रुके काम करते हैं।" }
    ]
  },
  {
    id: "w-06",
    name: "Rajesh Kumar",
    category: "electrician",
    roleEn: "Senior Electrician & Inverter Specialist",
    roleHi: "बिजली मिस्त्री (वायरिंग, इन्वर्टर, पंखा, MCB)",
    townOrVillage: "सदर बाजार",
    locationType: "town",
    localityId: "cantt_sadar",
    localityNameHi: "सदर बाजार [कस्बा]",
    phone: "9812345006",
    whatsapp: "919812345006",
    experienceHi: "12 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 140,
    isVerified: true,
    status: "approved",
    hourlyRate: 250,
    dailyRate: 800,
    weeklyRate: 4800,
    monthlyRate: 20000,
    bioHi: "ITI सर्टिफाइड इलेक्ट्रीशियन। शॉर्ट सर्किट, इन्वर्टर फिटिंग और नई कोठी की पूरी बिजली वायरिंग।",
    avatar: "assets/worker_rajesh.jpg",
    aadhaarNumber: "6612 9043 1129",
    aadhaarDocName: "Aadhaar_Rajesh_Kumar.jpg",
    secondDocType: "trade_cert",
    secondDocTypeName: "आईटीआई / इलेक्ट्रिकल सर्टिफिकेट",
    secondDocNumber: "ITI-HAR-2015-882",
    secondDocName: "ITI_Electrician_Cert.jpg",
    reviews: [
      { id: "rev-601", author: "विकास जैन", locality: "सदर बाजार", rating: 5, date: "कल", comment: "इन्वर्टर और एमसीबी ट्रिपिंग की समस्या तुरंत पकड़ ली। बहुत ज्ञानी इलेक्ट्रीशियन हैं।" },
      { id: "rev-602", author: "संजय धीमान", locality: "महेश नगर", rating: 5, date: "4 दिन पहले", comment: "पूरी कोठी की वायरिंग का काम इन्हीं से करवाया, बहुत संतोषजनक।" }
    ]
  },
  {
    id: "w-07",
    name: "Anita Bai Cook",
    category: "cook",
    roleEn: "Home Cook / Khansama (Veg Meals)",
    roleHi: "रसोइया / कुक (स्वादिष्ट शाकाहारी भोजन)",
    townOrVillage: "सेक्टर 8",
    locationType: "sector",
    localityId: "city_sector8",
    localityNameHi: "सेक्टर 8 [सेक्टर]",
    phone: "9812345007",
    whatsapp: "919812345007",
    experienceHi: "10 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 33,
    isVerified: true,
    status: "approved",
    hourlyRate: 200,
    dailyRate: 500,
    weeklyRate: 3000,
    monthlyRate: 4500,
    bioHi: "गरमागरम रोटियां, पंजाबी दाल, पनीर, परांठे और सात्विक भोजन बनाने में निपुण। सुबह व शाम उपलब्ध।",
    avatar: "assets/worker_sunita.jpg"
  },
  {
    id: "w-08",
    name: "Mukesh Carpenter",
    category: "carpenter",
    roleEn: "Badhai / Carpenter (Woodwork Repair)",
    roleHi: "बढ़ई (दरवाजे, अलमारी, लॉक, बेड)",
    townOrVillage: "कस्बा बराड़ा",
    locationType: "town",
    localityId: "belt_barara",
    localityNameHi: "कस्बा बराड़ा [कस्बा]",
    phone: "9812345008",
    whatsapp: "919812345008",
    experienceHi: "14 साल का अनुभव",
    rating: 4.7,
    reviewsCount: 39,
    isVerified: true,
    status: "approved",
    hourlyRate: 350,
    dailyRate: 850,
    weeklyRate: 5000,
    monthlyRate: 22000,
    bioHi: "लकड़ी के जाम दरवाजे ठीक करना, नई अलमारी व बेड बनाना, मॉड्युलर किचन रिपेयर और गोदरेज लॉक।",
    avatar: "assets/worker_jaswinder.jpg"
  },
  {
    id: "w-09",
    name: "Suresh Palledaar",
    category: "loading",
    roleEn: "Loading / Shifting Labour",
    roleHi: "लोडिंग व मकान शिफ्टिंग लेबर",
    townOrVillage: "कैंट रेलवे स्टेशन",
    locationType: "town",
    localityId: "cantt_station",
    localityNameHi: "कैंट स्टेशन [कस्बा]",
    phone: "9812345009",
    whatsapp: "919812345009",
    experienceHi: "11 साल का अनुभव",
    rating: 4.8,
    reviewsCount: 57,
    isVerified: true,
    status: "approved",
    hourlyRate: 150,
    dailyRate: 600,
    weeklyRate: 3600,
    monthlyRate: 15000,
    bioHi: "ट्रक व टेंपो से माल उतारना, मकान बदलने पर भारी सामान सोफा, फ्रिज, अलमारी चढ़ाना।",
    avatar: "assets/worker_mohan.jpg"
  },
  {
    id: "w-10",
    name: "Satnam Singh Painter",
    category: "painter",
    roleEn: "Wall Painter & Putty Expert",
    roleHi: "पेंटर मिस्त्री (दीवार पेंट, पुट्टी, सीलन)",
    townOrVillage: "कपड़ा मार्केट",
    locationType: "town",
    localityId: "city_cloth_mkt",
    localityNameHi: "कपड़ा मार्केट [कस्बा]",
    phone: "9812345011",
    whatsapp: "919812345011",
    experienceHi: "13 साल का अनुभव",
    rating: 4.8,
    reviewsCount: 41,
    isVerified: true,
    status: "approved",
    hourlyRate: 140,
    dailyRate: 750,
    weeklyRate: 4500,
    monthlyRate: 20000,
    bioHi: "दीवारों की पुट्टी, सीलन का पक्का इलाज, प्लास्टिक पेंट और बाहरी दीवारों पर वेदर-शील्ड।",
    avatar: "assets/worker_manoj.jpg"
  },
  {
    id: "w-11",
    name: "Harpreet Welder",
    category: "welder",
    roleEn: "Welder & Iron Fabrication",
    roleHi: "वेल्डर (गेट, ग्रिल, रेलिंग, शेड)",
    townOrVillage: "कस्बा साहा",
    locationType: "town",
    localityId: "belt_saha",
    localityNameHi: "कस्बा साहा [कस्बा]",
    phone: "9812345014",
    whatsapp: "919812345014",
    experienceHi: "10 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 27,
    isVerified: true,
    status: "approved",
    hourlyRate: 200,
    dailyRate: 800,
    weeklyRate: 4800,
    monthlyRate: 20000,
    bioHi: "मकान के मुख्य गेट, खिड़की ग्रिल, सीढ़ी रेलिंग और टिन शेड की मजबूत वेल्डिंग।",
    avatar: "assets/worker_jaswinder.jpg"
  },
  {
    id: "w-12",
    name: "Karan AC Tech",
    category: "ac_repair",
    roleEn: "AC, Fridge & Washing Machine Repair",
    roleHi: "AC व फ्रिज मैकेनिक (कूलिंग, गैस, रिपेयर)",
    townOrVillage: "मानव चौक",
    locationType: "town",
    localityId: "city_manav_chowk",
    localityNameHi: "मानव चौक [कस्बा]",
    phone: "9812345015",
    whatsapp: "919812345015",
    experienceHi: "8 साल का अनुभव",
    rating: 4.8,
    reviewsCount: 49,
    isVerified: true,
    status: "approved",
    hourlyRate: 300,
    dailyRate: 900,
    weeklyRate: 5400,
    monthlyRate: 24000,
    bioHi: "स्प्लिट व विंडो एसी सर्विस, गैस चार्जिंग, इन्वर्टर पीसीबी रिपेयर और फ्रिज कूलिंग फॉल्ट।",
    avatar: "assets/worker_babloo.jpg"
  },
  {
    id: "w-13",
    name: "Jasbir Singh Driver",
    category: "driver",
    roleEn: "Personal & Commercial Driver",
    roleHi: "गाड़ी ड्राइवर (लोकल व आउटस्टेशन)",
    townOrVillage: "गांव केसरी",
    locationType: "village",
    localityId: "belt_kesari",
    localityNameHi: "गांव केसरी [गांव]",
    phone: "9812345016",
    whatsapp: "919812345016",
    experienceHi: "12 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 34,
    isVerified: true,
    status: "approved",
    hourlyRate: 150,
    dailyRate: 600,
    weeklyRate: 3600,
    monthlyRate: 16000,
    bioHi: "मैनुअल और ऑटोमैटिक दोनों गाड़ियां चलाने का 12 वर्ष का अनुभव। शांत व सुरक्षित ड्राइविंग।",
    avatar: "assets/worker_rajesh.jpg"
  },
  {
    id: "w-14",
    name: "Vikram Mistri",
    category: "mistri",
    roleEn: "Tile Fitting & Flooring Mistri",
    roleHi: "टाइल्स व फर्श मिस्त्री",
    townOrVillage: "गांव पंजोखरा साहिब",
    locationType: "village",
    localityId: "cantt_panjokhra",
    localityNameHi: "गांव पंजोखरा साहिब [गांव]",
    phone: "9812345013",
    whatsapp: "919812345013",
    experienceHi: "9 साल का अनुभव",
    rating: 4.9,
    reviewsCount: 18,
    isVerified: false,
    status: "pending", // Sample pending worker for admin approval test
    hourlyRate: 160,
    dailyRate: 900,
    weeklyRate: 5400,
    monthlyRate: 23000,
    bioHi: "बाथरूम और किचन में विट्रीफाइड टाइलें लगाना, मार्बल घिसाई और कोटा स्टोन का काम।",
    avatar: "assets/worker_ramesh.jpg",
    aadhaarNumber: "4820 1934 8821",
    aadhaarDocName: "Aadhaar_Vikram_Mistri.jpg",
    secondDocType: "trade_cert",
    secondDocTypeName: "कारीगर / ITI प्रमाण पत्र (Skill Certificate)",
    secondDocNumber: "ITI-AMB-2018-492",
    secondDocName: "Mason_Trade_Certificate.jpg",
    reviews: []
  }
];

// Seed job leads with category, location & budgetAmount for filtering & negotiation
const INITIAL_POSTED_JOBS = [
  {
    id: "job-01",
    titleHi: "छत पर ईंटें व रेत चढ़ाने के लिए 2 दिहाड़ी मजदूर चाहिए",
    category: "dihadi",
    duration: "daily",
    localityHi: "सेक्टर 7 [सेक्टर]",
    townOrVillage: "सेक्टर 7",
    locationType: "sector",
    budget: "₹650 / दिन प्रति मजदूर",
    budgetAmount: 650,
    customerName: "अनिल बंसल",
    customerPhone: "9896011111",
    timeAgoHi: "15 मिनट पहले",
    descHi: "आज ही दूसरी मंजिल पर 500 ईंटें चढ़ाने और मलबा साफ करने के लिए 2 मेहनती मजदूर चाहिए। दोपहर की चाय मिलेगी।",
    status: "open"
  },
  {
    id: "job-02",
    titleHi: "3BHK कोठी के लिए पक्की महीनेवार काम वाली बाई",
    category: "bai",
    duration: "monthly",
    localityHi: "मॉडल टाउन [कस्बा]",
    townOrVillage: "मॉडल टाउन",
    locationType: "town",
    budget: "₹3,500 / माह",
    budgetAmount: 3500,
    customerName: "श्रीमती मीनाक्षी",
    customerPhone: "9896022222",
    timeAgoHi: "1 घंटा पहले",
    descHi: "रोजाना सुबह 8:30 बजे झाड़ू-पोछा और बर्तन सफाई। विश्वसनीय व साफ काम करने वाली बाई चाहिए।",
    status: "open"
  },
  {
    id: "job-03",
    titleHi: "पानी की टंकी का पाइप लीकेज, तुरंत प्लंबर चाहिए",
    category: "plumber",
    duration: "hourly",
    localityHi: "महेश नगर [कॉलोनी]",
    townOrVillage: "महेश नगर",
    locationType: "colony",
    budget: "₹300 विजिट दर",
    budgetAmount: 300,
    customerName: "राजेश मल्होत्रा",
    customerPhone: "9896033333",
    timeAgoHi: "2 घंटे पहले",
    descHi: "छत पर PVC पाइप का जॉइंट टूट गया है, पानी बह रहा है। तुरंत आने वाला प्लंबर चाहिए।",
    status: "open"
  },
  {
    id: "job-04",
    titleHi: "खिड़की व बालकनी ग्रिल वेल्डिंग का काम",
    category: "welder",
    duration: "daily",
    localityHi: "गांव बब्याल [गांव]",
    townOrVillage: "गांव बब्याल",
    locationType: "village",
    budget: "₹1,800 ठेका",
    budgetAmount: 1800,
    customerName: "सरदार कुलदीप सिंह",
    customerPhone: "9896044444",
    timeAgoHi: "3 घंटे पहले",
    descHi: "2 खिड़कियों पर लोहे की ग्रिल मजबूत वेल्डिंग करवानी है। बिजली व वेल्डिंग मशीन उपलब्ध है।",
    status: "open"
  },
  {
    id: "job-05",
    titleHi: "नई दुकान में इन्वर्टर और 6 पंखे लगाने हेतु इलेक्ट्रीशियन",
    category: "electrician",
    duration: "daily",
    localityHi: "सदर बाजार [कस्बा]",
    townOrVillage: "सदर बाजार",
    locationType: "town",
    budget: "₹850 / दिन",
    budgetAmount: 850,
    customerName: "विशाल गर्ग",
    customerPhone: "9896055555",
    timeAgoHi: "4 घंटे पहले",
    descHi: "सदर बाजार में कपड़े की नई दुकान में इन्वर्टर वायरिंग और सीलिंग फैन फिटिंग करवानी है।",
    status: "open"
  },
  {
    id: "job-06",
    titleHi: "बाथरूम में नई दीवार टाइलें लगाने हेतु राज मिस्त्री",
    category: "mistri",
    duration: "daily",
    localityHi: "कस्बा साहा [कस्बा]",
    townOrVillage: "कस्बा साहा",
    locationType: "town",
    budget: "₹900 / दिन",
    budgetAmount: 900,
    customerName: "सुनील राणा",
    customerPhone: "9896066666",
    timeAgoHi: "5 घंटे पहले",
    descHi: "साहा चौक के पास मकान के 2 बाथरूम में विट्रीफाइड टाइलें और सीमेंट प्लास्टर का काम।",
    status: "open"
  },
  {
    id: "job-07",
    titleHi: "पूरे मकान में पुट्टी व 2 कोट प्लास्टिक पेंट का काम",
    category: "painter",
    duration: "weekly",
    localityHi: "बलदेव नगर [कॉलोनी]",
    townOrVillage: "बलदेव नगर",
    locationType: "colony",
    budget: "₹6,000 ठेका",
    budgetAmount: 6000,
    customerName: "पवन सैनी",
    customerPhone: "9896077777",
    timeAgoHi: "6 घंटे पहले",
    descHi: "शादी के उपलक्ष्य में 2 कमरों और लॉबी में एशियन पेंट्स प्लास्टिक पेंट व पुट्टी। सामग्री हमारी है।",
    status: "open"
  },
  {
    id: "job-08",
    titleHi: "जाम लकड़ी के दरवाजे व 2 अलमारी लॉक रिपेयर",
    category: "carpenter",
    duration: "hourly",
    localityHi: "कस्बा बराड़ा [कस्बा]",
    townOrVillage: "कस्बा बराड़ा",
    locationType: "town",
    budget: "₹400 विजिट",
    budgetAmount: 400,
    customerName: "हरप्रीत सिंह",
    customerPhone: "9896088888",
    timeAgoHi: "8 घंटे पहले",
    descHi: "बारिश के कारण मुख्य दरवाजा जाम हो गया है और गोदरेज लॉक बदलना है।",
    status: "open"
  }
];

// Seed Admin Sponsored Ads
const INITIAL_ADS = [
  {
    id: "ad-01",
    titleHi: "दीपावली व शादी सीजन: मकान पुट्टी-पेंट मेला",
    subtitleHi: "Asian Paints अधिकृत पेंटर उपलब्ध • 15% छूट • तुरंत कोटेशन पाएं",
    phone: "9812345099",
    badge: "ऑफर",
    isActive: true
  },
  {
    id: "ad-02",
    titleHi: "अम्बाला कैंट लेबर चौक सुपर एक्सप्रेस",
    subtitleHi: "सुबह 7 से 10 बजे तक मात्र 30 मिनट में दिहाड़ी मजदूर आपके घर",
    phone: "9812345000",
    badge: "फास्ट सर्विस",
    isActive: true
  }
];

// Benchmark rate cards
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

// User/Worker/Admin can create any new type of work by typing!
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

  // 1. Direct match with name, role, town, phone, bio
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

  // 2. Tokenized multi-word search (e.g. "electrician babyal" or "bai model town")
  const tokens = q.split(/\s+/).filter(t => t.length > 1);
  if (tokens.length > 1) {
    const allMatch = tokens.every(tok => {
      if (pool.includes(tok)) return true;
      // Check if token matches synonyms of the worker category
      const synList = SEARCH_SYNONYMS[worker.category] || [];
      return synList.some(s => s.toLowerCase().includes(tok) || tok.includes(s.toLowerCase()));
    });
    if (allMatch) return true;
  }

  // 3. Synonym dictionary matching
  for (const [catKey, synList] of Object.entries(SEARCH_SYNONYMS)) {
    const termMatchesQuery = synList.some(s => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()));
    if (termMatchesQuery) {
      if (worker.category === catKey) return true;
    }
  }

  return false;
}

// --- STATE MANAGEMENT HELPERS FOR WORKERS, JOBS & CUSTOMERS ---

function getStoredWorkers() {
  try {
    const raw = localStorage.getItem('ambala_workers');
    if (raw) return JSON.parse(raw);
    const initialApproved = INITIAL_WORKERS.filter(w => w.status !== 'pending' && w.isVerified);
    localStorage.setItem('ambala_workers', JSON.stringify(initialApproved));
    return initialApproved;
  } catch (e) {
    return INITIAL_WORKERS.filter(w => w.status !== 'pending' && w.isVerified);
  }
}

function getPendingWorkers() {
  try {
    const raw = localStorage.getItem('ambala_pending_workers');
    if (raw) return JSON.parse(raw);
    const initialPending = INITIAL_WORKERS.filter(w => w.status === 'pending' || !w.isVerified);
    localStorage.setItem('ambala_pending_workers', JSON.stringify(initialPending));
    return initialPending;
  } catch (e) {
    return INITIAL_WORKERS.filter(w => w.status === 'pending' || !w.isVerified);
  }
}

function getRejectedWorkers() {
  try {
    const raw = localStorage.getItem('ambala_rejected_workers');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function approveWorker(workerId) {
  const pending = getPendingWorkers();
  const workerIndex = pending.findIndex(w => w.id === workerId);
  if (workerIndex === -1) return null;

  const [worker] = pending.splice(workerIndex, 1);
  worker.isVerified = true;
  worker.status = 'approved';
  worker.approvedAt = new Date().toISOString();

  // Save updated pending
  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));

  // Add to approved
  const approved = getStoredWorkers();
  const existingIdx = approved.findIndex(w => w.id === workerId);
  if (existingIdx !== -1) {
    approved[existingIdx] = worker;
  } else {
    approved.push(worker);
  }
  localStorage.setItem('ambala_workers', JSON.stringify(approved));
  window.AMBALA_DATA.workers = approved;

  return worker;
}

function rejectWorker(workerId, reason = 'दस्तावेज अपूर्ण या सत्यापन में त्रुटि') {
  const pending = getPendingWorkers();
  const workerIndex = pending.findIndex(w => w.id === workerId);
  if (workerIndex === -1) return null;

  const [worker] = pending.splice(workerIndex, 1);
  worker.isVerified = false;
  worker.status = 'rejected';
  worker.rejectionReason = reason;
  worker.rejectedAt = new Date().toISOString();

  // Save updated pending
  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));

  // Add to rejected
  const rejected = getRejectedWorkers();
  rejected.unshift(worker);
  localStorage.setItem('ambala_rejected_workers', JSON.stringify(rejected));

  return worker;
}

function restoreWorker(workerId) {
  const rejected = getRejectedWorkers();
  const workerIndex = rejected.findIndex(w => w.id === workerId);
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

function registerWorker(workerData) {
  const pending = getPendingWorkers();
  const newWorker = {
    id: 'w-' + Date.now().toString(36),
    name: workerData.name,
    category: workerData.category || 'dihadi',
    roleHi: workerData.roleHi || workerData.trade || 'कारीगर',
    roleEn: workerData.trade || 'Worker',
    townOrVillage: workerData.locality || workerData.townOrVillage || 'अम्बाला',
    locationType: 'town',
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
    bioHi: workerData.bioHi || 'अम्बाला में विश्वसनीय व अनुभवी कामगार।',
    avatar: workerData.avatar || 'assets/app-icon.png',
    aadhaarNumber: workerData.aadhaarNumber || 'सत्यापन हेतु जमा',
    aadhaarDocName: workerData.aadhaarDocName || 'Aadhaar_Document.jpg',
    registeredAt: new Date().toISOString()
  };

  pending.unshift(newWorker);
  localStorage.setItem('ambala_pending_workers', JSON.stringify(pending));
  return newWorker;
}

function getStoredJobs() {
  try {
    const raw = localStorage.getItem('ambala_jobs');
    if (raw) return JSON.parse(raw);
    localStorage.setItem('ambala_jobs', JSON.stringify(INITIAL_POSTED_JOBS));
    return INITIAL_POSTED_JOBS;
  } catch (e) {
    return INITIAL_POSTED_JOBS;
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
    return raw ? JSON.parse(raw) : [
      { id: 'c-01', name: 'अनिल बंसल', phone: '9812345000', locality: 'सेक्टर 7', password: '123' }
    ];
  } catch (e) {
    return [];
  }
}

function registerCustomer(custData) {
  const customers = getStoredCustomers();
  const existing = customers.find(c => c.phone === custData.phone);
  if (existing) {
    return { success: false, message: 'यह मोबाइल नंबर पहले से पंजीकृत है।' };
  }

  const newCust = {
    id: 'cust-' + Date.now().toString(36),
    name: custData.name,
    phone: custData.phone,
    locality: custData.locality || 'अम्बाला',
    password: custData.password || '1234',
    registeredAt: new Date().toISOString()
  };

  customers.push(newCust);
  localStorage.setItem('ambala_customers', JSON.stringify(customers));
  return { success: true, customer: newCust };
}

// Export to window
window.AMBALA_DATA = {
  localities: getStoredLocalities(),
  categories: getStoredCategories(),
  workers: getStoredWorkers(),
  standardRates: AMBALA_STANDARD_RATES,
  postedJobs: getStoredJobs(),
  ads: INITIAL_ADS,
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
  registerCustomer: registerCustomer
};
