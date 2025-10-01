// Global variables
let currentFormData = {};
let analysisInProgress = false;

// Loading texts and console logs
const LOADING_TEXTS = [
    "Initializing neural networks...",
    "Analyzing behavioral patterns...",
    "Scanning relationship history...",
    "Processing red flag indicators...",
    "Cross-referencing dating patterns...",
    "Calculating confidence metrics...",
    "Running psychological profiling...",
    "Accessing relationship database...",
    "Computing final bodycount...",
    "Preparing brutal analysis..."
];

const CONSOLE_LOGS = [
    "> [INFO] AI systems online",
    "> [SUCCESS] User data collected",
    "> [WARNING] Multiple red flags detected",
    "> [PROCESS] Analyzing dating app behavior...",
    "> [ERROR] Confidence levels suspicious",
    "> [SCAN] Cross-referencing with player database...",
    "> [INFO] Behavioral patterns identified",
    "> [CALC] Running final calculations...",
    "> [WARNING] Preparing savage roast...",
    "> [SUCCESS] Analysis complete"
];

// City-specific roasts
const CITY_ROASTS = {
    'mumbai': [
        "{name}, Mumbai mein rehke bhi tera love life local train se slow hai. Bandra ke hipster cafes mein chai piyega ya date pe jaayega?",
        "Marine Drive pe couple dekhkar tujhe motivation milti hai ya depression? Tere bodycount se toh cutting chai ka bill bhi zyada hai!",
        "Bhai {name}, Juhu beach pe sandcastles banata hai ya bas Tinder pe swipe karta hai? Result toh dono mein zero hi hai!",
        "Mumbai ki crowd mein bhi tera love life itna khali? Bhai, CST station ka platform bhi tujhse zyada busy hai!"
    ],
    'delhi': [
        "{name}, Delhi mein rehke bhi tera bodycount DTC bus ke passengers se kam? Gurgaon ke clubs mein jaake kya selfie hi khinchta hai?",
        "CP ke gol chakkar jaisa hai tera dating life, {name} - ghumta rehta hai, par kahin pohchta nahi!",
        "Delhi ki winters mein bhi tera love life itna cold? Bhai, thodi si sharam toh banta hai!",
        "{name}, Rajouri Garden ke momos se zyada spicy toh tera ego hai, lekin dates kahan hai?"
    ],
    'bangalore': [
        "Bangalore mein IT job aur tera bodycount dono mein same vibe hai, {name} - 'Under Maintenance'. Koramangala pubs mein kya code debug karta hai?",
        "{name}, Bangalore traffic mein stuck hone ka excuse chhod de, tera dating game toh permanently jammed hai!",
        "MG Road pe designer coffee peeta hai ya bas single life ka dukh? {name}, thodi personality bhi develop kar le!",
        "Bhai {name}, Bangalore ke startups se zyada crash tera love life karta hai. Funding mil gayi kya?"
    ],
    'hyderabad': [
        "{name}, Hyderabad ki biryani se zyada spicy tera attitude hai, lekin dating mein toh plain rice jaisa hai tu!",
        "Charminar ke chaar minar dekhkar romantic feel aaya ya bas Instagram ke liye pose kiya, {name}? Love life toh wahi ka wahi hai!",
        "HITEC City mein job hai, lekin dating skills kahan hai, {name}? Bhai, thodi training le le!",
        "{name}, Hyderabad ke haleem jaisa rich tera confidence hai, par bodycount kyun itna khokhla hai?"
    ],
    'pune': [
        "Pune ke colleges mein party karta hai ya bas single life ka syllabus padhta hai, {name}? Result toh fail hi hai!",
        "{name}, FC Road pe vibe check karta hai ya bas vibe kharab karta hai? Dating mein toh zero marks!",
        "Pune ki chill weather mein bhi tera love life itna dry? Bhai, Osho ashram mein meditation try kar le!",
        "{name}, IT parks mein code likhta hai, lekin love life ka code kabhi compile hi nahi hota!"
    ],
    'chennai': [
        "{name}, Chennai ke beaches pe sunset dekhkar romantic vibe aati hai ya bas filter coffee ke saath dukh bhulta hai?",
        "Marina Beach ka sand tera love life se zyada stable hai, {name}. Thodi effort toh banta hai!",
        "Chennai ke auto walon se zyada attitude tera hai, {name}, lekin dates kahan hain? Zero negotiation skills!",
        "{name}, Tamil movies ke dialogues seekh liye, par dating ka script kyun nahi likha ab tak?"
    ],
    'kolkata': [
        "Kolkata ki mishti kha kar bhi tera love life itna kadwa kyun, {name}? Rosogulla se thodi sweetness seekh le!",
        "{name}, Park Street ke bars mein party karta hai ya bas tram mein single life ka safar? Bhai, kuch progress kar!",
        "Durga Puja ke pandals mein vibe check karta hai ya bas crowd mein khada rehta hai, {name}? Love life toh empty hai!",
        "{name}, Kolkata ke intellectuals ke saath adda maar, par dating mein kyun itna backward hai?"
    ],
    'ahmedabad': [
        "{name}, Ahmedabad mein rehke bhi tera bodycount itna dry? Sabarmati riverfront pe dates ke bajaye selfies hi li kya?",
        "Gujju thali jaisa variety tera attitude mein hai, {name}, lekin dating mein toh sirf khichdi hai!",
        "{name}, Manek Chowk ke midnight snacks se zyada spicy toh tera ego hai, par love life kyun itna sada?",
        "Bhai {name}, IIM Ahmedabad ke students se dating tips le le, tera game toh local kite festival se bhi low hai!"
    ],
    'jaipur': [
        "{name}, Jaipur ke forts dekhkar history seekha, lekin apna dating history kyun blank hai? Thodi sharam kar le!",
        "Hawa Mahal ke jharokhon jaisa transparent hai tera love life, {name} - bilkul khali aur hawa hi hawa!",
        "Pink City mein bhi tera dating game itna pale? {name}, thodi color add kar apne moves mein!",
        "{name}, Jaipur ke bazaars mein shopping karta hai ya bas single life ka stock khareedta hai?"
    ],
    'goa': [
        "Goa mein beaches aur parties ke bawajood tera bodycount zero, {name}? Bhai, trance music se dating skills nahi aati!",
        "{name}, Baga beach pe party karta hai ya bas single life ka dukh drown karta hai coconut water mein?",
        "Goa ke vibes itne chill hain, lekin tera love life kyun itna still hai, {name}? Thodi movement toh banta hai!",
        "{name}, Goa mein sunsets dekhkar romantic feel aaya ya bas Instagram ke liye reels banaye? Love life toh wahi ka wahi!"
    ],
    'lucknow': [
        "{name}, Lucknow ke nawabi andaaz mein toh tu shahenshah hai, par tera love life kyun gali ke kutto se bhi sad hai?",
        "Bhai {name}, Hazratganj mein tashan maarne ka time hai, lekin dates kaun dega? Tera bodycount toh kebab ka bill bhi nahi cross karta!",
        "Lucknow ki tehzeeb se seekha kya, {name}? Tera dating game toh Chikankari se bhi zyada outdated hai!",
        "{name}, Gomti river pe evening walk karta hai ya bas single life ka dukh sahta hai? Thodi shayari toh banta hai!"
    ],
    'kanpur': [
        "{name}, Kanpur mein leather jacket pehen ke swag dikhata hai, par tera love life kyun local daaru jaisa sasta hai?",
        "Bhai {name}, Kanpur ke malls mein shopping karta hai ya bas Tinder pe window shopping? Tera bodycount toh zero stock hai!",
        "{name}, Kanpur ka industrial vibe hai, lekin tera dating game kyun closed factory jaisa hai? Restart kar bhai!",
        "Arre {name}, Kanpur ke chaat stalls se zyada spicy toh tera ego hai, par love life kyun itna bekaar hai?"
    ],
    'patna': [
        "{name}, Patna mein Ganga ke paas romance sochta hai, par tera bodycount toh Gandhi Maidan ke crowd se bhi kam hai!",
        "Bhai {name}, Patna ke litti-chokha kha kar bhi tera love life itna bland kyun? Thodi spice add kar na!",
        "{name}, Patna ke coaching classes mein padhta hai ya bas single life ka syllabus? Bhai, dating mein bhi topper ban!",
        "Arre {name}, Patna ke traffic jaisa chaotic toh tera dating history hai, par action kahan hai?"
    ],
    'gaya': [
        "{name}, Gaya mein Bodh Gaya ke peace vibe ke bawajood tera love life kyun war zone jaisa hai? Zen mode on kar!",
        "Bhai {name}, Gaya ke pind daan karne aata hai ya bas apne dating game ka daan karta hai? Zero results, bro!",
        "{name}, Gaya ke temples mein dua maangta hai, par love life ke liye bhi dua karni padegi lagta hai!",
        "Arre {name}, Gaya ka spiritual vibe hai, lekin tera bodycount kyun ghost town jaisa khali hai?"
    ],
    'amritsar': [
        "{name}, Amritsar ke Golden Temple ke saamne selfie kheenchta hai, par tera love life kyun langar ke plate jaisa khali hai?",
        "Bhai {name}, Punjabi swag toh hai, lekin dating mein kyun zero bhangra? Thodi rhythm la bhai!",
        "{name}, Amritsar ke jalebi kha kar bhi tera love life itna kadwa? Thodi sweetness toh banta hai!",
        "Arre {name}, Wagah border pe attitude dikhata hai, par dating mein kyun retreat karta hai?"
    ],
    'ludhiana': [
        "{name}, Ludhiana ke Punjabi vibes ke saath bhi tera bodycount itna low? Bhai, thodi sharam kar le!",
        "Bhai {name}, Ludhiana ke malls mein swag dikhata hai, par dates kahan hai? Tera love life toh local dhaba jaisa sasta hai!",
        "{name}, Ludhiana ka tashan toh hai, lekin dating game kyun local bus ke jaisa slow hai?",
        "Arre {name}, Ludhiana ke suit-salwar ke bazaar mein vibe hai, par tera love life kyun tailor ke bina ka kapda hai?"
    ],
    'srinagar': [
        "{name}, Srinagar ke Dal Lake pe shikara ride sochta hai, par tera love life kyun dry land jaisa hai?",
        "Bhai {name}, Kashmir ke apples se zyada red toh tera face hai rejection ke baad! Thodi himmat rakh!",
        "{name}, Srinagar ke gardens mein romance dhundta hai, par tera bodycount kyun barren valley jaisa hai?",
        "Arre {name}, Kashmir ka paradise vibe hai, lekin tera dating game kyun hell jaisa feel hota hai?"
    ],
    'coimbatore': [
        "{name}, Coimbatore ke IT hubs mein kaam karta hai, par tera love life kyun 90s ke dial-up jaisa slow hai?",
        "Bhai {name}, Coimbatore ke temples mein dua maangta hai, par dating ke liye bhi dua chahiye lagta hai!",
        "{name}, Coimbatore ka coconut water pita hai, par tera love life kyun itna dry hai? Thodi hydration toh banta hai!",
        "Arre {name}, Coimbatore ke chill vibes ke bawajood tera dating game kyun freezer mein stuck hai?"
    ],
    'madurai': [
        "{name}, Madurai ke Meenakshi Temple ke darshan karta hai, par tera love life kyun darshan ke layak nahi?",
        "Bhai {name}, Madurai ke jigar thanda pita hai, par tera dating game kyun itna thanda hai? Heat up kar bhai!",
        "{name}, Madurai ke vibrant markets mein vibe hai, par tera bodycount kyun empty cart jaisa hai?",
        "Arre {name}, Madurai ka spicy food kha kar bhi tera love life kyun plain dosa jaisa boring hai?"
    ],
    'mysore': [
        "{name}, Mysore ke palaces mein royalty ka sapna dekhta hai, par tera love life kyun roadside stall jaisa hai?",
        "Bhai {name}, Mysore ke Dasara festival mein vibe karta hai, par dating mein kyun zero celebration?",
        "{name}, Mysore ka sandalwood scent hai, par tera love life kyun badboo jaisa feel hota hai?",
        "Arre {name}, Mysore ke yoga vibes ke bawajood tera dating game kyun out of balance hai?"
    ],
    'hubli': [
        "{name}, Hubli ke bazar mein tashan dikhata hai, par tera love life kyun local bus stand jaisa khali hai?",
        "Bhai {name}, Hubli-Dharwad ke twin city vibe mein bhi tera bodycount single kyun hai? Thodi hustle kar!",
        "{name}, Hubli ka spicy food kha kar bhi tera dating game kyun itna bland? Thodi masala add kar na!",
        "Arre {name}, Hubli ke chill vibes ke saath bhi tera love life kyun stuck in traffic jaisa hai?"
    ],
    'thiruvananthapuram': [
        "{name}, Thiruvananthapuram ke backwaters mein romance sochta hai, par tera love life kyun dry canal jaisa hai?",
        "Bhai {name}, Kerala ke coconut trees ke neeche chill karta hai, par dates kahan hai? Tera bodycount toh nariyal paani ka stock bhi nahi!",
        "{name}, Trivandrum ka laid-back vibe hai, lekin tera dating game kyun coma mein chala gaya? Wake up, bro!",
        "Arre {name}, Thiruvananthapuram ke beaches pe pose karta hai, par tera love life kyun tsunami ke baad ka khali beach hai?"
    ],
    'kochi': [
        "{name}, Kochi ke hip cafes mein coffee peeta hai, par tera love life kyun filter coffee se bhi zyada kadwa hai?",
        "Bhai {name}, Kochi ke Chinese fishing nets ke saamne photo kheenchta hai, par dates catch kyun nahi karta?",
        "{name}, Kochi ka port city vibe hai, lekin tera dating game kyun sinking ship jaisa hai? Thodi sailing kar!",
        "Arre {name}, Kochi ke spice markets se inspiration le, par tera love life kyun plain sadam jaisa boring hai?"
    ],
    'surat': [
        "{name}, Surat ke diamond markets mein shine karta hai, par tera love life kyun fake jewellery jaisa dull hai?",
        "Bhai {name}, Surat ke street food kha kar bhi tera dating game kyun khichdi jaisa bland? Thodi spice daal na!",
        "{name}, Surat ka business hustle toh hai, lekin tera bodycount kyun zero profit jaisa hai? Invest kar, bro!",
        "Arre {name}, Surat ke textile bazaar mein swag hai, par tera love life kyun unstitched kapda jaisa hai?"
    ],
    'siliguri': [
        "{name}, Siliguri ke Northeast gateway vibe mein bhi tera love life kyun dead-end road jaisa hai?",
        "Bhai {name}, Siliguri ke tea gardens mein chill karta hai, par tera bodycount kyun chai ke kettle se bhi chhota hai?",
        "{name}, Siliguri ka vibrant market hai, lekin tera dating game kyun empty stall jaisa khali hai?",
        "Arre {name}, Siliguri ke border vibes ke bawajood tera love life kyun no-entry zone mein stuck hai?"
    ],
    'udaipur': [
        "{name}, Udaipur ke romantic lakes ke saamne bhi tera love life kyun dry desert jaisa hai? Thodi romance try kar!",
        "Bhai {name}, Udaipur ke palaces mein royalty ka sapna dekhta hai, par tera bodycount kyun beggar jaisa zero hai?",
        "{name}, Udaipur ka love city vibe hai, lekin tera dating game kyun arranged marriage ke rishte jaisa fail hai?",
        "Arre {name}, Udaipur ke sunset views ke bawajood tera love life kyun black-and-white movie jaisa boring hai?"
    ],
    'new york': [
        "{name}, New York ke skyscrapers ke beech bhi tera bodycount ground floor pe hai? Bhai, Times Square mein bhi date nahi milta?",
        "Arre {name}, NYC ka hustle vibe hai, par tera dating game kyun subway ke delay jaisa hai? Thodi speed la!",
        "{name}, New York ke coffee shops mein vibe karta hai, par tera love life kyun Starbucks ke queue jaisa stuck hai?",
        "Bhai {name}, NYC ke Tinder scene mein bhi tera profile unnoticed? Empire State Building se bhi low hai tera game!"
    ],
    'london': [
        "{name}, London ke foggy vibes mein bhi tera love life itna unclear kyun? Bhai, Big Ben ke time pe toh match kar le!",
        "Arre {name}, London ke pubs mein pint peeta hai, par dates kahan hai? Tera bodycount toh Thames ke paani jaisa flat hai!",
        "{name}, London ke royal vibes ke bawajood tera dating game kyun commoner jaisa hai? Thodi class add kar!",
        "Bhai {name}, London Underground mein travel karta hai, par tera love life kyun underground hi reh gaya?"
    ],
    'dubai': [
        "{name}, Dubai ke skyscrapers ke saath bhi tera bodycount desert jaisa khali hai? Bhai, Burj Khalifa se bhi upar soch!",
        "Arre {name}, Dubai ke malls mein shopping karta hai, par dates kyun nahi shop kar paaya? Tera game toh souk se bhi sasta hai!",
        "{name}, Dubai ka luxury vibe hai, par tera love life kyun camel ride jaisa bumpy hai? Smooth kar na!",
        "Bhai {name}, Dubai ke gold souk mein shine karta hai, par tera dating game kyun fake jewellery jaisa hai?"
    ],
    'sydney': [
        "{name}, Sydney ke beaches pe surf karta hai, par tera love life kyun deep ocean mein doob gaya? Bhai, swim kar na!",
        "Arre {name}, Sydney Opera House ke saamne pose karta hai, par tera dating game kyun off-tune hai?",
        "{name}, Sydney ke chill vibes ke bawajood tera bodycount kyun kangaroo jaisa jump nahi karta? Thodi energy la!",
        "Bhai {name}, Sydney ke nightlife mein party karta hai, par tera love life kyun outback jaisa deserted hai?"
    ],
    'tokyo': [
        "{name}, Tokyo ke neon lights mein bhi tera love life itna dark kyun? Bhai, Shibuya crossing pe koi toh match kar le!",
        "Arre {name}, Tokyo ke anime vibes ke saath bhi tera dating game kyun 2D cartoon jaisa flat hai?",
        "{name}, Tokyo ke sushi kha kar bhi tera bodycount kyun raw fish jaisa tasteless hai? Thodi spice add kar!",
        "Bhai {name}, Tokyo ka high-tech vibe hai, par tera love life kyun old Nokia phone jaisa stuck hai?"
    ],
    'paris': [
        "{name}, Paris ke Eiffel Tower ke neeche romance sochta hai, par tera love life kyun roadside crepe jaisa flat hai?",
        "Bhai {name}, Paris ka romance capital vibe hai, lekin tera bodycount kyun French baguette jaisa dry hai?",
        "{name}, Paris ke cafes mein coffee peeta hai, par tera dating game kyun overpriced croissant jaisa bekaar hai?",
        "Arre {name}, Paris ke love locks ke bawajood tera love life kyun unlocked aur khali hai? Thodi spark toh la!"
    ],
    'singapore': [
        "{name}, Singapore ke clean streets mein bhi tera love life kyun messy breakup jaisa hai? Bhai, thodi safai kar!",
        "Bhai {name}, Marina Bay Sands ke saamne pose karta hai, par tera bodycount kyun zero balance jaisa hai?",
        "{name}, Singapore ka high-tech vibe hai, lekin tera dating game kyun 90s ke pager jaisa outdated hai?",
        "Arre {name}, Singapore ke Gardens by the Bay mein vibe karta hai, par tera love life kyun wilting plant jaisa hai?"
    ]
};

// Height-specific brutal roasts
const HEIGHT_ROASTS = {
    'very_tall': [
        "Itne tall ho lekin personality ka height zero? Ironic!",
        "Basketball player jaisa height hai but game sirf court mein hai, dating mein nahi",
        "Giraffe jaisa lamba but neck pe dimag nahi? Classic tall guy!",
        "Height advantage hai but still single? Kya kar rahe ho bhai upar se?"
    ],
    'tall': [
        "Average se tall ho but dating skills average se bhi neeche? Nice!",
        "6 foot height hai but 2 foot ka confidence? Mathematics weak hai kya?",
        "Tall, dark and... single? Third quality missing hai clearly",
        "Height good hai but personality height chart mein show nahi hoti"
    ],
    'average': [
        "Average height, average looks, below average dating skills - perfectly balanced!",
        "5'7\" mein khush ho ya aur height chahiye thi growth ke saath saath?",
        "Average height walon ka competition tough hai, tumhara game weak hai",
        "Height average hai but efforts bhi average? Double negative = single life"
    ],
    'short': [
        "Short height se koi problem nahi, short temper se problem hai dating mein",
        "Napoleon complex hai ya bas height complex? Both lagta hai!",
        "Pocket-size personality ke saath pocket-size dating success? Makes sense!",
        "Height kam hai but standards zyada? Reality check ki zarurat hai bro"
    ],
    'very_short': [
        "Bhai height itni kam hai ki ladder chahiye hoga dating apps pe reach karne ke liye",
        "Tom Cruise ki height hai but uski charm nahi? Tough luck!",
        "Short kings rule kahte hain but tum toh subject bane baithe ho",
        "Height 5'4\" se kam hai but ego 6 foot? Maths samjhao yaar"
    ]
};

// Vibe-specific roasts
const VIBE_ROASTS = {
    'chill': [
        "{name}, chill vibe ka tag laga hai, lekin dating mein itna ice kyun? Antarctica relocate kar gaya kya?",
        "Chill vibes bolta hai, {name}, par tera love life toh deep freezer mein hai! Thaw karo thodi der!",
        "{name}, Netflix and chill tera motto hai, lekin Netflix ke alawa koi chill karta hi nahi tujhse!",
        "Bhai {name}, itna chill vibe hai ki glaciers bhi jealous hain, par dating mein koi heat kyun nahi?"
    ],
    'party': [
        "{name}, party vibe hai, par har party mein tu stage pe nahi, bar counter pe akela kyun? Shots hi lete reh gaya!",
        "Party animal bolta hai, {name}, lekin dance floor pe koi partner kyun nahi? Solo dance king hai kya?",
        "{name}, har weekend party karta hai, par tera bodycount club ke entry fee se bhi kam hai!",
        "Bhai {name}, party vibe toh thik hai, lekin dating mein kyun disco ball jaisa spin karta rehta hai?"
    ],
    'introvert': [
        "{name}, introvert vibe bolta hai, par itna shy kyun? Dating app pe bhi mute button daba rakha hai kya?",
        "Introvert hai, {name}, lekin tera love life toh library ke silent zone jaisa hai! Thodi awaaz karo!",
        "{name}, books aur coffee ke saath vibe thik hai, par dating mein kyun blank page jaisa hai tu?",
        "Bhai {name}, introvert vibe ka excuse band kar, tera social battery toh dating ke liye kabhi charge hi nahi hota!"
    ],
    'extrovert': [
        "{name}, extrovert vibe mein sabko baatein karta hai, par dating mein kyun silent movie chal rahi hai?",
        "Extrovert bolta hai, {name}, lekin har party mein sirf dost banata hai, girlfriend/boyfriend kahan?",
        "{name}, tera extrovert vibe toh social media pe dikhayi deta hai, real life mein dates kyun cancel hote hain?",
        "Bhai {name}, itna extrovert vibe hai ki mic chahiye, lekin dating mein kyun speaker mute hai?"
    ],
    'mysterious': [
        "{name}, mysterious vibe ka dikhawa karta hai, par tera love life itna mysterious kyun ki koi samajh hi nahi paata?",
        "Mysterious vibe bolta hai, {name}, lekin tera bodycount toh Bermuda Triangle mein gayab ho gaya!",
        "{name}, itna mystery rakhta hai ki Sherlock Holmes bhi tera dating history nahi solve kar sakta!",
        "Bhai {name}, mysterious vibe toh thik hai, par dating mein kyun alien invasion jaisa silence hai?"
    ]
};

// New Scenario-specific roasts
const SCENARIO_ROASTS = {
    'scenario5': {
        'own_it': [
            "{name}, galat DM bheja aur fir bhi flirt karta hai? Bhai, tera confidence toh Elon Musk ko bhi sharminda kar de!",
            "Arre {name}, wrong DM ke baad bhi flirt? Ye toh Bollywood ke hero wala overconfidence hai, par love life kahan?",
            "{name}, galat insaan ko DM karke bhi game chala raha hai? Respect, lekin thoda dimag bhi laga le next time!"
        ],
        'apologize': [
            "{name}, galat DM ke liye maafi maangta hai? Bhai, itna polite toh customer care wale bhi nahi hote!",
            "Arre {name}, sorry bolke scene clear karta hai? Tera love life toh apology letter jaisa hi hai - boring aur repetitive!",
            "{name}, maafi maang ke DM ka scene band kiya? Bhai, thodi himmat dikha, warna single hi rahega!"
        ],
        'ghost': [
            "{name}, galat DM bheja aur ghost kar diya? Bhai, tera love life toh WhatsApp ke 'last seen' jaisa vanish ho jata hai!",
            "Arre {name}, DM galat gaya toh ghost mode on? Tera dating game toh horror movie ka sequel hai!",
            "{name}, ghost karke problem solve karta hai? Bhai, tera bodycount bhi tujhse ghosted ho chuka hai!"
        ],
        'delete': [
            "{name}, DM delete karke socha sab set hai? Bhai, tera love life bhi delete button ke layak hai!",
            "Arre {name}, galat DM delete kiya aur pray karta hai? Tera dating game toh Instagram ke archived posts jaisa hai!",
            "{name}, delete karke bhagwan pe chhod diya? Bhai, dating mein thodi strategy bhi laga le!"
        ],
        'blame': [
            "{name}, galat DM ke liye dost ya autocorrect ko blame karta hai? Bhai, tera excuse game toh Oscar worthy hai!",
            "Arre {name}, blame game khelta hai DM ke baad? Tera love life bhi kisi aur ke wajah se kharab hai kya?",
            "{name}, autocorrect ka bahana banaya? Bhai, tera dating history bhi autocorrect nahi kar sakta!"
        ],
        'escalate': [
            "{name}, galat DM ke baad aur ek bhej diya? Bhai, tera confidence toh Avengers level ka hai, par brain kahan gaya?",
            "Arre {name}, ek galat DM ke baad doosra? Ye toh dating mein nuclear war chhedne wala move hai!",
            "{name}, escalate karke DM ka scene banaya? Bhai, tera love life toh action movie ka climax hai!"
        ]
    },
    'scenario6': {
        'play_cool': [
            "{name}, date ka profile pic fake nikla aur tu cool bana raha? Bhai, tera patience toh Dalai Lama ko bhi impress kar de!",
            "Arre {name}, fake pic wale date ke saath cool rehna? Tera love life toh Photoshop se bhi fix nahi ho sakta!",
            "{name}, play it cool karta hai fake date ke saath? Bhai, tera vibe toh meme template ban sakta hai!"
        ],
        'call_out': [
            "{name}, fake pic wale ko politely call out kiya? Bhai, itna decent toh UPSC aspirants bhi nahi hote!",
            "Arre {name}, polite call out karke kya fayda? Tera dating game toh debate competition jaisa hai - no action!",
            "{name}, fake pic pe politely bol diya? Bhai, thodi spice add kar, warna love life bland hi rahega!"
        ],
        'bail': [
            "{name}, fake pic dekhkar date se bhaag gaya? Bhai, tera escape game toh Mission Impossible se bhi fast hai!",
            "Arre {name}, excuse banake date chhod diya? Tera love life toh Uber cancel button jaisa hai!",
            "{name}, bail karke scene clear kiya? Bhai, tera bodycount bhi tujhse bail maar chuka hai!"
        ],
        'savage': [
            "{name}, fake pic pe savage comment maara? Bhai, tera roast game toh Comedy Nights se bhi better hai!",
            "Arre {name}, savage ban ke date pe comment kiya? Tera love life toh Twitter war jaisa hai - full drama!",
            "{name}, savage comment karke date pe raha? Bhai, tera confidence toh meme lord level ka hai!"
        ],
        'ghost_date': [
            "{name}, date ke beech mein ghost kiya? Bhai, tera love life toh horror movie ka plot twist hai!",
            "Arre {name}, fake pic dekhkar mid-date ghost? Tera dating game toh Snapchat streaks jaisa temporary hai!",
            "{name}, ghost karke date se gayab? Bhai, tera bodycount bhi tujhse ghosted ho chuka hai!"
        ],
        'rate': [
            "{name}, date ko vibe check karke rate kiya? Bhai, tera love life toh Zomato review section jaisa hai!",
            "Arre {name}, vibe rate karke date ka faisla? Tera dating game toh Google Forms ka survey lagta hai!",
            "{name}, fake pic wale ko rating diya? Bhai, thodi reality check bhi kar le, warna single hi rahega!"
        ]
    }
};

// Brutal roast messages
const BRUTAL_ROASTS = {
    virgin: [
        "Arre {name}, tera bodycount itna clean hai ki Durex wale tujhe brand ambassador bana denge! {age} saal mein bhi koi action nahi? Bhai, ab toh Netflix bhi bore ho gaya hoga!",
        "{name}, tera love life itna pure hai ki Himalaya ka mineral water bhi jealous hai. Kabhi Tinder pe swipe karke paap toh kar le!",
        "Bhai {name}, tera dating history blank Google Doc jaisa hai. {age} saal aur kitna wait karega? Ctrl+S toh kar life mein!",
        "{name}, tera bodycount zero hai aur confidence 100? Bhai, ye optimism TED Talk mein le ja, dating mein nahi chalega!"
    ],
    innocent: [
        "{name}, tera love life itna innocent hai ki nursery rhymes bhi blush kar dein. {age} saal mein ek bhi date? Bhai, cartoon network band kar!",
        "Arre {name}, tera dating game itna slow hai ki 2G network bhi fast lagta hai. Thodi speed badhao, ya WhatsApp forward hi karte rehna hai?",
        "{name}, tera bodycount itna low hai ki calculator error de raha hai. {age} saal aur abhi bhi 'first kiss' ka wait? Disney princess banega kya?",
        "Bhai {name}, tera love life itna innocent hai ki DDLJ ke dialogues bhi outdated lagte hain. Thodi reality mein aa, yaar!"
    ],
    normal: [
        "{name}, tera bodycount itna average hai ki Excel sheet mein bhi highlight nahi hota. {age} saal mein thodi excitement toh banta hai!",
        "Arre {name}, tera dating life middle-class budget jaisa hai - safe aur boring. Kabhi risk leke dekh, ya bas {relationship_status} mode mein hi rehna hai?",
        "{name}, tera love life itna normal hai ki Zomato ke 3-star reviews bhi zyada interesting hain. {age} saal aur bas itna? Thodi masala add kar!",
        "Bhai {name}, tera bodycount itna standard hai ki CBSE ke marksheet jaisa lagta hai. Thodi extra-curricular activity try kar na!"
    ],
    experienced: [
        "{name}, tera bodycount dekh kar lagta hai tu dating ka LinkedIn profile bana rakha hai. {age} saal mein itna experience? HR se promotion le le!",
        "Arre {name}, tera dating history Netflix series jaisa hai - har season mein naya drama! {relationship_status} status kab change hoga?",
        "{name}, tera love life itna spicy hai ki Swiggy ke 'hot' filter mein top pe aayega. Par {red_flag} wala vibe thoda control kar na!",
        "Bhai {name}, tera bodycount dekh kar lagta hai tu Tinder ka beta-tester tha. {age} saal mein itna game? Respect, lekin thoda break le le!"
    ],
    player: [
        "{name}, tera bodycount itna high hai ki Census wale tujhe population survey mein include karna chahte hain. {age} saal aur itna game? Thoda chill kar!",
        "Arre {name}, tera dating life IPL auction jaisa hai - har season naya player! {red_flag} wala attitude thoda kam kar, warna red card mil jayega!",
        "{name}, tera bodycount dekh kar lagta hai tu dating apps ka CEO hai. {relationship_status} status mein bhi itna action? Bhai, masterclass de de!",
        "Bhai {name}, tera love life Bollywood blockbuster jaisa hai - full drama, zero commitment. {age} saal mein kitna run maara, yaar?"
    ],
    legend: [
        "{name}, tera bodycount itna legendary hai ki historians tera case study likh rahe hain. {age} saal mein ye kaise kar liya, bhai? Secrets share kar!",
        "Arre {name}, tera dating history Game of Thrones se bhi epic hai. {relationship_status} status mein bhi itna game? Iron Throne mangwa do!",
        "{name}, tera bodycount dekh kar NASA wale bhi shock mein hain - ye toh intergalactic level ka hai! {red_flag} wala vibe thoda hide kar na!",
        "Bhai {name}, tera love life Avengers movie jaisa hai - har scene mein naya hero/heroine! {age} saal mein ye sab kaise manage kiya?"
    ],
    menace: [
        "{name}, tera bodycount itna wild hai ki therapists ke liye new branch khul gaya. {age} saal aur itna chaos? Bhai, dating apocalypse band kar!",
        "Arre {name}, tera dating history horror movie se zyada scary hai. {red_flag} wala vibe dekhkar toh Netflix ne 'thriller' category banayi!",
        "{name}, tera bodycount dekhkar mathematicians ne new infinity symbol invent kiya. {relationship_status} status mein bhi ye sab? Bhai, calm down!",
        "Bhai {name}, tera love life itna chaotic hai ki Marvel ke multiverse mein bhi tera mention hai. {age} saal mein ye sab kaise ho gaya?"
    ]
};

// Enhanced red flags with brutal descriptions
const RED_FLAG_DESCRIPTIONS = {
    'jealous': [
        "Jealousy level itni high hai ki Google Maps bhi confused ho jata hai tumhara location track karte time",
        "Possessiveness mein PhD kar liya hai tumne - dissertation title: 'How to ruin relationships in 24 hours'",
        "Green-eyed monster tumhara permanent roommate hai - rent bhi split karte ho kya?"
    ],
    'clingy': [
        "Clingy level dekh kar superglue company tumhe brand ambassador banana chahti hai",
        "Attachment issues itne severe hain ki velcro bhi seekh jaye tumse technique",
        "Personal space ka concept tumhare liye alien language hai - NASA se contact karo translation ke liye"
    ],
    'player': [
        "Player certificate pe gold medal deserve karte ho - Olympics mein new category add karwao",
        "Multiple relationships handle karne mein circus performer se zyada talent hai tumme",
        "Juggling skills mein world record hai tumhara - balls ki jagah hearts juggle karte ho"
    ],
    'commitment_issues': [
        "Commitment phobia itna severe hai ki marriage word sun kar allergy ho jaati hai",
        "Long-term relationship tumhare liye mythology hai - myth bana kar rakha hai",
        "Future planning mein tumhara contribution zero - present mein bhi doubtful presence hai"
    ],
    'trust_issues': [
        "Trust issues itne deep hain ki FBI investigation bhi incomplete lagti hai tumhe",
        "Paranoia level dekh kar conspiracy theorists bhi inspired ho jaye",
        "Doubt tumhara middle name hai - birth certificate mein mention hai kya?"
    ],
    'emotional_unavailable': [
        "Emotional availability tumhare liye out of stock item hai - restock kab hoga?",
        "Feelings express karne mein mute button permanently on hai tumhara",
        "Emotional intelligence mein negative marks hain - remedial classes join karo"
    ],
    'no_boundaries': [
        "Boundaries tumhare liye suggestion hain, rule nahi - anarchy prefer karte ho kya?",
        "Personal space invade karne mein alien species se competition hai tumhara",
        "Limits cross karne mein Olympic athlete ho - gold medal guaranteed!"
    ],
    'perfect': [
        "Perfect hone ka claim kar rahe ho? Delusion level maximum hai tumhara clearly",
        "Perfection ka mask itna tight hai ki real personality suffocate ho rahi hai",
        "Fake perfect image maintain karne mein acting career start kar sakte ho"
    ]
};

// Utility Functions
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, duration);
}

function showPromoToast() {
    const promoToast = document.getElementById('promoToast');
    promoToast.classList.remove('hidden');

    setTimeout(() => {
        promoToast.classList.add('hidden');
    }, 5000);
}

function formatPercentage(value) {
    return Math.round(value) + '%';
}

function getRandomDelay(min = 1000, max = 2000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Navigation Functions
function showPage(pageId) {
    const pages = ['homePage', 'formPage', 'loadingPage', 'resultPage'];
    pages.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    trackPageView(pageId);
}

function startAnalysis() {
    showPage('formPage');
    updateFormProgress();
    setTimeout(showPromoToast, 1500);
}

function goHome() {
    showPage('homePage');
    resetForm();
}

function resetForm() {
    document.getElementById('analysisForm').reset();
    document.getElementById('photoText').textContent = 'Click to upload your best photo';
    document.getElementById('imagePreview').classList.add('hidden');
    updateFormProgress();

    // Clear any existing red flags section
    const existingRedFlags = document.querySelector('.extra-roast-section');
    if (existingRedFlags) {
        existingRedFlags.remove();
    }
}

// Form Progress Tracking
function updateFormProgress() {
    const form = document.getElementById('analysisForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let filled = 0;

    inputs.forEach(input => {
        if (input.value.trim() !== '') filled++;
    });

    const progress = (filled / inputs.length) * 100;
    document.getElementById('formProgress').style.width = progress + '%';
    document.getElementById('progressText').textContent = formatPercentage(progress) + ' Complete';
}

// Photo Upload Handler
function handlePhotoUpload(input) {
    const photoText = document.getElementById('photoText');
    const imagePreview = document.getElementById('imagePreview');

    if (input.files && input.files[0]) {
        const file = input.files[0];

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showToast(' File too large. Please select an image under 5MB.');
            input.value = '';
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast(' Please select a valid image file.');
            input.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            photoText.innerHTML = ' Photo uploaded successfully';
            photoText.style.color = '#4ecdc4';
            updateFormProgress();
        }
        reader.readAsDataURL(file);

        showToast(' Photo uploaded successfully!');
    }
}

// Form Data Collection
function collectFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        location: document.getElementById('location').value.trim(),
        height: document.getElementById('height').value,
        dob: document.getElementById('dob').value,
        relationship_status: document.getElementById('relationship_status').value,
        history_pattern: document.getElementById('history_pattern').value,
        dating_apps: document.getElementById('dating_apps').value,
        red_flag: document.getElementById('red_flag').value,
        scenario1: document.getElementById('scenario1').value,
        scenario2: document.getElementById('scenario2').value,
        scenario3: document.getElementById('scenario3').value,
        scenario4: document.getElementById('scenario4').value,
        scenario5: document.getElementById('scenario5').value,
        scenario6: document.getElementById('scenario6').value,
        vibe: document.getElementById('vibe').value,
        has_photo: document.getElementById('photo').files.length > 0,
        timestamp: new Date().toISOString()
    };
}

// Enhanced Local Analysis with extreme variety
function generateLocalAnalysis(formData) {
    let score = 0;
    let redFlags = [];
    let scoreModifier = Math.floor(Math.random() * 8) - 4;  // Random -4 to +4


    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    if (age > 25) score += Math.floor((age - 18) / 1.5);
    if (age > 30) score += Math.floor((age - 25) / 1.2);
    if (age > 35) score += Math.floor((age - 30) / 1.1);

    const historyScores = {
        'virgin': Math.random() < 0.3 ? 1 : 0,
        'one_long': Math.floor(Math.random() * 3) + 1,
        'few_serious': Math.floor(Math.random() * 5) + 2,
        'multiple_casual': Math.floor(Math.random() * 8) + 5,
        'serial_dating': Math.floor(Math.random() * 10) + 8,
        'player_mode': Math.floor(Math.random() * 15) + 15
    };
    score += historyScores[formData.history_pattern] || 0;

    const appScores = {
        'never': Math.random() < 0.2 ? 2 : 0,
        'tried_once': Math.floor(Math.random() * 3) + 1,
        'occasional': Math.floor(Math.random() * 5) + 2,
        'regular': Math.floor(Math.random() * 8) + 4,
        'addicted': Math.floor(Math.random() * 12) + 8
    };
    score += appScores[formData.dating_apps] || 0;

    const flagMultipliers = {
        'jealous': Math.floor(Math.random() * 6) + 3,
        'clingy': Math.floor(Math.random() * 4) + 2,
        'player': Math.floor(Math.random() * 12) + 8,
        'commitment_issues': Math.floor(Math.random() * 8) + 5,
        'trust_issues': Math.floor(Math.random() * 6) + 3,
        'emotional_unavailable': Math.floor(Math.random() * 8) + 6,
        'no_boundaries': Math.floor(Math.random() * 7) + 4,
        'perfect': Math.floor(Math.random() * 5) + 2
    };
    score += flagMultipliers[formData.red_flag] || 0;

    // Existing scenario responses
    if (['jealous', 'drama', 'stalk'].includes(formData.scenario1)) {
        score += Math.floor(Math.random() * 8) + 3;
        redFlags.push(getRandomElement(["toxic ex stalker", "drama queen/king", "jealousy monster"]));
    }
    if (['call_them', 'confront'].includes(formData.scenario2)) {
        score += Math.floor(Math.random() * 6) + 2;
        redFlags.push(getRandomElement(["clingy desperado", "needy nightmare", "attention seeker"]));
    }
    if (['persist', 'manipulate'].includes(formData.scenario3)) {
        score += Math.floor(Math.random() * 8) + 4;
        redFlags.push(getRandomElement(["boundary violator", "consent ignorer", "manipulation expert"]));
    }
    if (['stalk_ex', 'revenge', 'break_up'].includes(formData.scenario4)) {
        score += Math.floor(Math.random() * 7) + 3;
        redFlags.push(getRandomElement(["psycho ex stalker", "revenge fantasizer", "trust destroyer"]));
    }

    // New scenario responses
    if (['own_it', 'escalate'].includes(formData.scenario5)) {
        score += Math.floor(Math.random() * 6) + 3;
        redFlags.push(getRandomElement(["overconfident flirt", "DM disaster", "chaotic texter"]));
    }
    if (['ghost', 'delete', 'blame'].includes(formData.scenario5)) {
        score += Math.floor(Math.random() * 4) + 1;
        redFlags.push(getRandomElement(["cowardly texter", "excuse generator", "ghosting guru"]));
    }
    if (['savage', 'ghost_date'].includes(formData.scenario6)) {
        score += Math.floor(Math.random() * 7) + 4;
        redFlags.push(getRandomElement(["savage dater", "ghosting pro", "vibe destroyer"]));
    }
    if (['bail', 'rate'].includes(formData.scenario6)) {
        score += Math.floor(Math.random() * 5) + 2;
        redFlags.push(getRandomElement(["judgmental dater", "escape artist", "vibe checker"]));
    }

    // Vibe factor
    const vibeScores = {
        'chill': Math.floor(Math.random() * 3) + 1,
        'party': Math.floor(Math.random() * 6) + 3,
        'introvert': Math.random() < 0.5 ? 0 : 1,
        'extrovert': Math.floor(Math.random() * 5) + 2,
        'mysterious': Math.floor(Math.random() * 4) + 2
    };
    score += vibeScores[formData.vibe] || 0;

    if (formData.has_photo) {
        score += Math.floor(Math.random() * 4) + 1;
    } else {
        redFlags.push("camera shy insecurity");
    }

    const heightModifiers = {
        'very_tall': Math.floor(Math.random() * 5) + 2,
        'tall': Math.floor(Math.random() * 3) + 1,
        'average': Math.floor(Math.random() * 2),
        'short': -Math.floor(Math.random() * 2),
        'very_short': -Math.floor(Math.random() * 3) - 1
    };
    score += heightModifiers[formData.height] || 0;

    const cityBonus = Math.floor(Math.random() * 4) + 1;
    score += cityBonus;

    score += scoreModifier;

    if (Math.random() < 0.15) {
        score = Math.floor(score * 0.3);
        redFlags.push("secret virgin pretending to be experienced");
    }
    if (Math.random() < 0.1) {
        score = Math.floor(score * 2.5);
        redFlags.push("closet player hiding true nature");
    }

    score = Math.max(0, Math.min(50, score));

    return generateBrutalRoast(formData, score, redFlags);
}

// Updated Brutal Roast Generation
function generateBrutalRoast(formData, score, redFlags) {
    const name = formData.name.split(' ')[0];
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    const location = formData.location.toLowerCase();
    const height = formData.height;
    const relationship_status = formData.relationship_status;
    const red_flag = formData.red_flag;
    const vibe = formData.vibe;
    const scenario5 = formData.scenario5;
    const scenario6 = formData.scenario6;

    let category, roast, emoji;
    let cityRoast = "";
    let heightRoast = "";
    let vibeRoast = "";
    let scenarioRoast = "";

    for (let city in CITY_ROASTS) {
        if (location.includes(city)) {
            cityRoast = " " + getRandomElement(CITY_ROASTS[city]).replace('{name}', name);
            break;
        }
    }

    if (HEIGHT_ROASTS[height]) {
        heightRoast = " " + getRandomElement(HEIGHT_ROASTS[height]);
    }

    if (VIBE_ROASTS[vibe]) {
        vibeRoast = " " + getRandomElement(VIBE_ROASTS[vibe]).replace('{name}', name);
    }

    if (SCENARIO_ROASTS.scenario5[scenario5]) {
        scenarioRoast += " " + getRandomElement(SCENARIO_ROASTS.scenario5[scenario5]).replace('{name}', name);
    }
    if (SCENARIO_ROASTS.scenario6[scenario6]) {
        scenarioRoast += " " + getRandomElement(SCENARIO_ROASTS.scenario6[scenario6]).replace('{name}', name);
    }

    if (score === 0) {
        category = "Virgin Territory 🙏";
        roast = getRandomElement(BRUTAL_ROASTS.virgin).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "😇";
    } else if (score <= 2) {
        category = "Innocent Angel 👼";
        roast = getRandomElement(BRUTAL_ROASTS.innocent).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "😊";
    } else if (score <= 5) {
        category = "Normal Human Being 🙂";
        roast = getRandomElement(BRUTAL_ROASTS.normal).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "😐";
    } else if (score <= 10) {
        category = "Getting Experience 😏";
        roast = getRandomElement(BRUTAL_ROASTS.experienced).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "😏";
    } else if (score <= 15) {
        category = "Experienced Player 🔥";
        roast = getRandomElement(BRUTAL_ROASTS.experienced).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "😈";
    } else if (score <= 25) {
        category = "Certified F*ckboy/girl 👑";
        roast = getRandomElement(BRUTAL_ROASTS.player).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "😱";
    } else if (score <= 35) {
        category = "Street Legend 🚀";
        roast = getRandomElement(BRUTAL_ROASTS.legend).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "🤯";
    } else {
        category = "Absolute Menace 💀";
        roast = getRandomElement(BRUTAL_ROASTS.menace).replace('{name}', name).replace('{age}', age).replace('{relationship_status}', relationship_status).replace('{red_flag}', red_flag);
        emoji = "💀";
    }

    const finalRoast = roast + cityRoast + heightRoast + vibeRoast + scenarioRoast;

    let enhancedRedFlags = [];
    redFlags.forEach(flag => {
        enhancedRedFlags.push(flag);
        Object.keys(RED_FLAG_DESCRIPTIONS).forEach(key => {
            if (formData.red_flag === key) {
                enhancedRedFlags.push(getRandomElement(RED_FLAG_DESCRIPTIONS[key]));
            }
        });
    });

    return {
        bodycount: score,
        category: category,
        roast: finalRoast,
        emoji: emoji,
        redFlags: enhancedRedFlags
    };
}

// Main Analysis Function
async function generateBrutalAnalysis(formData) {
    console.log('Generating brutal local analysis');
    return generateLocalAnalysis(formData);
}

// Loading Animation
async function simulateAIAnalysis(formData) {
    const progressBar = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const loadingText = document.getElementById('loadingText');
    const consoleOutput = document.getElementById('consoleOutput');

    consoleOutput.innerHTML = '';

    for (let i = 0; i < LOADING_TEXTS.length; i++) {
        loadingText.textContent = LOADING_TEXTS[i];

        const progress = ((i + 1) / LOADING_TEXTS.length) * 100;
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = formatPercentage(progress);

        const logEntry = document.createElement('div');
        logEntry.textContent = CONSOLE_LOGS[i];

        if (CONSOLE_LOGS[i].includes('ERROR')) logEntry.className = 'error';
        else if (CONSOLE_LOGS[i].includes('WARNING')) logEntry.className = 'warning';
        else if (CONSOLE_LOGS[i].includes('SUCCESS')) logEntry.className = 'success';

        consoleOutput.appendChild(logEntry);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, getRandomDelay(1200, 1800)));
    }

    loadingText.textContent = "AI thinking really hard... 🤔";
    await new Promise(resolve => setTimeout(resolve, 2500));

    const result = await generateBrutalAnalysis(formData);
    displayResults(result);
}

// Display Results
function displayResults(result) {
    showPage('resultPage');

    document.getElementById('bodycountNumber').textContent = result.bodycount;
    document.getElementById('categoryBadge').textContent = result.category;
    document.getElementById('roastText').innerHTML = result.roast;
    document.getElementById('reactionEmoji').textContent = result.emoji;

    const redFlagsSection = document.getElementById('redFlagsSection');
    const redFlagsContent = document.getElementById('redFlagsContent');

    if (result.redFlags && result.redFlags.length > 0) {
        redFlagsContent.innerHTML = `
            <p><strong>🚩 RED FLAGS DETECTED:</strong></p>
            <ul>
                ${result.redFlags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
            <p><strong>⚠️ WARNING:</strong> Agar koi tumse date karne ko bole toh pehle therapist se consultation lena chahiye. Ye red flags nahi, whole carnival of red balloons hai!</p>
        `;
        redFlagsSection.classList.remove('hidden');
    } else {
        redFlagsSection.classList.add('hidden');
    }
}

// Share Result Function
function shareResult() {
    const bodycount = document.getElementById('bodycountNumber').textContent;
    const category = document.getElementById('categoryBadge').textContent;

    const shareText = `I just got my bodycount analyzed! 🔥\n\nResult: ${bodycount}\nCategory: ${category}\n\nTry it yourself at: ${window.location.href}`;

    if (navigator.share) {
        navigator.share({
            title: 'My Bodycount Analysis Result',
            text: shareText,
            url: window.location.href
        }).then(() => {
            showToast(' Shared successfully!');
        }).catch(() => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(' Result copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast(' Result copied to clipboard!');
    } catch (err) {
        showToast(' Unable to copy. Please copy manually.');
    }

    document.body.removeChild(textArea);
}

// Form Submission Handler
async function handleFormSubmission(e) {
    e.preventDefault();

    if (analysisInProgress) {
        showToast('⏳ Analysis already in progress...');
        return;
    }

    const form = document.getElementById('analysisForm');
    if (!form.checkValidity()) {
        showToast('❌ Please fill in all required fields');
        return;
    }

    currentFormData = collectFormData();

    const age = new Date().getFullYear() - new Date(currentFormData.dob).getFullYear();
    if (age < 18) {
        showToast('❌ You must be 18 or older to use this service');
        return;
    }

    if (age > 80) {
        showToast('❌ Please enter a valid birth date');
        return;
    }

    analysisInProgress = true;

    try {
        showPage('loadingPage');
        await simulateAIAnalysis(currentFormData);
    } catch (error) {
        console.error('Analysis failed:', error);
        showToast('❌ Analysis failed. Please try again.');
        goHome();
    } finally {
        analysisInProgress = false;
    }
}

// Event Listeners Setup
function setupEventListeners() {
    const analysisForm = document.getElementById('analysisForm');
    if (analysisForm) {
        analysisForm.addEventListener('submit', handleFormSubmission);
    }

    const form = document.getElementById('analysisForm');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('change', updateFormProgress);
        input.addEventListener('input', updateFormProgress);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            goHome();
        }

        if (e.key === 'Enter' && !document.getElementById('homePage').classList.contains('hidden')) {
            startAnalysis();
        }
    });

    form.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
        }
    });
}

// Initialize App
function initializeApp() {
    // Setup event listeners
    setupEventListeners();

    // Initialize form progress
    updateFormProgress();

    // Add some easter eggs
    console.log('🔥 Bodycount Analyzer Pro initialized');
    console.log('👨‍💻 Built with love and brutal honesty');
    console.log('💀 OpenAI API removed - pure local brutality now!');

    // Performance optimization
    if ('serviceWorker' in navigator) {
        // You can add a service worker here for offline functionality
    }
}

// Error Handlers
window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);

    if (analysisInProgress) {
        showToast('❌ Something went wrong. Please try again.');
        analysisInProgress = false;
        goHome();
    }
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled promise rejection:', e.reason);

    if (analysisInProgress) {
        showToast('❌ Analysis failed. Please try again.');
        analysisInProgress = false;
        goHome();
    }
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Expose functions to global scope
window.startAnalysis = startAnalysis;
window.goHome = goHome;
window.handlePhotoUpload = handlePhotoUpload;
window.shareResult = shareResult;

// Debug functions
window.debugInfo = function () {
    return {
        currentFormData,
        analysisInProgress,
        currentPage: document.querySelector('div:not(.hidden)').id
    };
};

// Analytics placeholder
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
}

function trackPageView(pageName) {
    trackEvent('page_view', { page: pageName });
}

const originalShowPage = showPage;
showPage = function (pageId) {
    originalShowPage(pageId);
    trackPageView(pageId);
};

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
        }
    }
});

performanceObserver.observe({ entryTypes: ['navigation'] });