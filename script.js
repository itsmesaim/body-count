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
        "Mumbai mein rehke bhi tumhara love life local train jaisa slow hai",
        "Bandra ke clubs mein jaake bhi kuch nahi mila? Pathetic!",
        "Marine Drive pe dates karte the ya sirf selfies lete the?",
        "Mumbai ki traffic se bhi zyada confusing hai tumhari dating life"
    ],
    'delhi': [
        "Delhi NCR mein rehke bhi tumhari bodycount itni kam? Kya kar rahe the bhai?",
        "CP mein hangout karte the ya bas metro mein ladkiyon ko dekhte the?",
        "Delhi ki pollution se zyada toxic tum ho relationships mein",
        "Gurgaon ke clubs mein bhi koi nahi pati? Sed lyf!"
    ],
    'bangalore': [
        "Bangalore ke IT hub mein rehke bhi debugging nahi kar sake apni love life?",
        "Koramangala ki pubs mein jaake bhi single? Kya baat hai!",
        "Bangalore traffic mein stuck rehte ho ya relationships mein bhi?",
        "Tech capital mein rehke bhi love algorithm crack nahi kar sake?"
    ],
    'hyderabad': [
        "Hyderabad ki biryani se zyada spicy tumhare red flags hain",
        "HITEC City mein job hai but dating skills zero? Classic!",
        "Charminar dekh kar romantic feel aayi ya bas selfie li?",
        "Telangana formation se pehle ka lagta hai tumhara last relationship"
    ],
    'pune': [
        "Pune ke colleges mein padhke bhi kuch nahi seekha dating ke baare mein?",
        "FC Road pe roaming karte the ya bas books leke ghar jaate the?",
        "Pune ki weather jaisi boring hai tumhari love life bhi",
        "IT parks mein kaam karte ho but love life mein permanent bug hai"
    ],
    'chennai': [
        "Chennai mein Marina Beach pe jaake bhi waves nahi aaye love life mein?",
        "Filter coffee se zyada bitter ho tumhare relationships",
        "Tamil cinema dekh dekh kar expectations zyada ho gayi kya?",
        "IT corridor mein kaam hai but love corridor mein traffic jam?"
    ],
    'kolkata': [
        "Kolkata ki adda culture mein participate karte ho ya bas single adda maarte ho?",
        "Park Street pe jaake bhi koi park nahi mili? Sad!",
        "Fish market jaisi smell aa rahi hai tumhari dating history se",
        "Durga Puja mein celebration karte ho ya celebration ka wait karte rehte ho?"
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

// Enhanced brutal roast messages with extreme variety
const BRUTAL_ROASTS = {
    virgin: [
        "Dekho {name}, tumhara bodycount Google search history se bhi kam hai. 18+ content dekh dekh kar experience gain kar rahe ho kya? Real life mein try karo kabhi!",
        "{name}, tumhari virginity itni sacred hai ki museum mein rakh deni chahiye. Archaeological department ko donate kar do - rare specimen hai!",
        "Bhai {name}, tumhara love life desert se bhi dry hai. Last time koi touch kiya tha doctor ne injection lagane ke liye? Therapy lelo yaar!",
        "{name}, tumhara social anxiety itna high hai ki mirror mein dekh kar bhi blush kar jaate ho. Dating apps download karo, kam se kam rejection ka practice toh ho!"
    ],
    innocent: [
        "{name}, tumhari innocence dekh kar kindergarten ke bachhe bhi experienced lag rahe hain. Thoda reality mein aao beta!",
        "Yaar {name}, tumhari dating timeline snail ki speed se bhi slow hai. Koi time machine hai kya jo past mein stuck ho?",
        "{name}, tumhara romantic experience negative numbers mein hai. Calculator crash ho jata hai tumhara score calculate karte time!",
        "Dekho {name}, tumhari love story nursery rhymes se bhi simple hai. Jack and Jill se inspiration leke dating try karo!"
    ],
    normal: [
        "{name}, tumhara track record dekh kar lag raha hai life mein autopilot mode on hai. Kuch exciting karo yaar!",
        "Bhai {name}, tumhari dating life Excel spreadsheet jaisi organized aur boring hai. Thoda chaos add karo!",
        "{name}, tumhara bodycount dekh kar mathematician bhi bore ho jaye. Average of averages ho tum!",
        "Yaar {name}, tumhari love life Wikipedia article jaisi factual aur emotionless hai. Thoda masala add karo!"
    ],
    experienced: [
        "{name}, tumhara experience certificate ready hai kya? CV mein dating skills mention kar sakte ho ab!",
        "Dekho {name}, tumhari reputation city mein famous hai. WhatsApp groups mein warning messages aa rahe honge tumhare liye!",
        "{name}, tumhara track record dekh kar lag raha hai professional player ho. Olympics mein participate karo dating mein!",
        "Bhai {name}, tumhari dating history novel ban sakti hai - '50 Shades of {name}' - bestseller guaranteed!"
    ],
    player: [
        "{name}, tumhara bodycount dekh kar census department confuse ho gaya hai. Population survey mein separate category banana padega!",
        "Yaar {name}, tumhari dating apps subscription Amazon Prime se zyada expensive hogi. Bulk discount milta hai kya?",
        "{name}, tumhara collection dekh kar Pokemon trainers bhi jealous ho jaye - 'Gotta catch em all' ki definition badal di tumne!",
        "Bhai {name}, tumhari love life reality show ban sakti hai - 'Bigg Boss: {name} Edition' - TRP guaranteed!"
    ],
    legend: [
        "{name}, tumhara naam dating hall of fame mein gold letters mein likha hona chahiye. Legend status achieve kar liya!",
        "Dekho {name}, tumhara bodycount dekh kar mathematicians ne new number system invent karna pada. '{name} numbers' kehte hain ab!",
        "Yaar {name}, tumhari dating strategy Harvard Business School mein case study ban sakti hai - 'How to scale in love market'!",
        "{name}, tumhara track record dekh kar Guinness Book of World Records walon ne phone kiya hai kya? Application submit karo!"
    ],
    menace: [
        "{name}, tumhara naam sun kar therapists ki salary double ho jaati hai. Mental health industry ka GDP tumhari wajah se badh raha hai!",
        "Bhai {name}, tumhari dating history horror movie se zyada scary hai. Stephen King bhi inspired ho jaye tumhari story se!",
        "{name}, tumhara bodycount dekh kar calculator ne suicide note likh diya. Mathematics ke principles ko challenge kar diya tumne!",
        "Yaar {name}, tumhari love life disaster management course mein syllabus ban sakti hai. Emergency protocols ki zarurat hai tumhare saath!"
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
}

function startAnalysis() {
    showPage('formPage');
    updateFormProgress();
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
        has_photo: document.getElementById('photo').files.length > 0,
        timestamp: new Date().toISOString()
    };
}

// Enhanced Local Analysis with extreme variety
function generateLocalAnalysis(formData) {
    let score = 0;
    let redFlags = [];
    let scoreModifier = Math.floor(Math.random() * 8) - 4; // Random -4 to +4

    // Age calculation with brutal reality check
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    if (age > 25) score += Math.floor((age - 18) / 1.5);
    if (age > 30) score += Math.floor((age - 25) / 1.2);
    if (age > 35) score += Math.floor((age - 30) / 1.1);

    // Relationship history (main factor) - enhanced scoring
    const historyScores = {
        'virgin': Math.random() < 0.3 ? 1 : 0, // Sometimes even virgins get points for lying
        'one_long': Math.floor(Math.random() * 3) + 1,
        'few_serious': Math.floor(Math.random() * 5) + 2,
        'multiple_casual': Math.floor(Math.random() * 8) + 5,
        'serial_dating': Math.floor(Math.random() * 10) + 8,
        'player_mode': Math.floor(Math.random() * 15) + 15
    };
    score += historyScores[formData.history_pattern] || 0;

    // Dating apps with enhanced brutality
    const appScores = {
        'never': Math.random() < 0.2 ? 2 : 0, // Sometimes liars
        'tried_once': Math.floor(Math.random() * 3) + 1,
        'occasional': Math.floor(Math.random() * 5) + 2,
        'regular': Math.floor(Math.random() * 8) + 4,
        'addicted': Math.floor(Math.random() * 12) + 8
    };
    score += appScores[formData.dating_apps] || 0;

    // Red flags analysis with brutal multipliers
    const flagMultipliers = {
        'jealous': Math.floor(Math.random() * 6) + 3,
        'clingy': Math.floor(Math.random() * 4) + 2,
        'player': Math.floor(Math.random() * 12) + 8,
        'commitment_issues': Math.floor(Math.random() * 8) + 5,
        'trust_issues': Math.floor(Math.random() * 6) + 3,
        'emotional_unavailable': Math.floor(Math.random() * 8) + 6,
        'no_boundaries': Math.floor(Math.random() * 7) + 4,
        'perfect': Math.floor(Math.random() * 5) + 2 // "Perfect" people are usually hiding something
    };
    score += flagMultipliers[formData.red_flag] || 0;

    // Scenario responses with enhanced toxicity detection
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

    // Additional brutal factors
    if (formData.has_photo) {
        score += Math.floor(Math.random() * 4) + 1; // Confident enough to upload = more experience
    } else {
        redFlags.push("camera shy insecurity");
    }

    // Height factors with brutal honesty
    const heightModifiers = {
        'very_tall': Math.floor(Math.random() * 5) + 2,
        'tall': Math.floor(Math.random() * 3) + 1,
        'average': Math.floor(Math.random() * 2),
        'short': -Math.floor(Math.random() * 2),
        'very_short': -Math.floor(Math.random() * 3) - 1
    };
    score += heightModifiers[formData.height] || 0;

    // Location factor - city life = more opportunities
    const cityBonus = Math.floor(Math.random() * 4) + 1;
    score += cityBonus;

    // Random life events modifier
    score += scoreModifier;

    // Sometimes brutal reduction for shock value
    if (Math.random() < 0.15) {
        score = Math.floor(score * 0.3); // Brutal reality check
        redFlags.push("secret virgin pretending to be experienced");
    }

    // Sometimes massive inflation for shock value
    if (Math.random() < 0.1) {
        score = Math.floor(score * 2.5); // Expose the hidden player
        redFlags.push("closet player hiding true nature");
    }

    // Ensure realistic but varied range
    score = Math.max(0, Math.min(50, score));

    return generateBrutalRoast(formData, score, redFlags);
}

function generateBrutalRoast(formData, score, redFlags) {
    const name = formData.name.split(' ')[0]; // First name only
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    const location = formData.location.toLowerCase();
    const height = formData.height;

    let category, roast, emoji;
    let cityRoast = "";
    let heightRoast = "";

    // Add city-specific roast if major city detected
    for (let city in CITY_ROASTS) {
        if (location.includes(city)) {
            cityRoast = " " + getRandomElement(CITY_ROASTS[city]);
            break;
        }
    }

    // Add height-specific roast
    if (HEIGHT_ROASTS[height]) {
        heightRoast = " " + getRandomElement(HEIGHT_ROASTS[height]);
    }

    // Determine category and roast based on score
    if (score === 0) {
        category = "Virgin Territory 🙏";
        roast = getRandomElement(BRUTAL_ROASTS.virgin).replace('{name}', name);
        emoji = "😇";
    } else if (score <= 2) {
        category = "Innocent Angel 👼";
        roast = getRandomElement(BRUTAL_ROASTS.innocent).replace('{name}', name);
        emoji = "😊";
    } else if (score <= 5) {
        category = "Normal Human Being 🙂";
        roast = getRandomElement(BRUTAL_ROASTS.normal).replace('{name}', name);
        emoji = "😐";
    } else if (score <= 10) {
        category = "Getting Experience 😏";
        roast = getRandomElement(BRUTAL_ROASTS.experienced).replace('{name}', name);
        emoji = "😏";
    } else if (score <= 15) {
        category = "Experienced Player 🔥";
        roast = getRandomElement(BRUTAL_ROASTS.experienced).replace('{name}', name);
        emoji = "😈";
    } else if (score <= 25) {
        category = "Certified F*ckboy/girl 👑";
        roast = getRandomElement(BRUTAL_ROASTS.player).replace('{name}', name);
        emoji = "😱";
    } else if (score <= 35) {
        category = "Street Legend 🚀";
        roast = getRandomElement(BRUTAL_ROASTS.legend).replace('{name}', name);
        emoji = "🤯";
    } else {
        category = "Absolute Menace 💀";
        roast = getRandomElement(BRUTAL_ROASTS.menace).replace('{name}', name);
        emoji = "💀";
    }

    // Combine roasts for maximum impact
    const finalRoast = roast + cityRoast + heightRoast;

    // Add brutal red flag descriptions
    let enhancedRedFlags = [];
    redFlags.forEach(flag => {
        enhancedRedFlags.push(flag);
        // Add brutal descriptions for specific red flags
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

// Main Analysis Function - removed OpenAI dependency
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

    // Clear previous console output
    consoleOutput.innerHTML = '';

    for (let i = 0; i < LOADING_TEXTS.length; i++) {
        loadingText.textContent = LOADING_TEXTS[i];

        const progress = ((i + 1) / LOADING_TEXTS.length) * 100;
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = formatPercentage(progress);

        // Add console log
        const logEntry = document.createElement('div');
        logEntry.textContent = CONSOLE_LOGS[i];

        // Add some styling based on log type
        if (CONSOLE_LOGS[i].includes('ERROR')) logEntry.className = 'error';
        else if (CONSOLE_LOGS[i].includes('WARNING')) logEntry.className = 'warning';
        else if (CONSOLE_LOGS[i].includes('SUCCESS')) logEntry.className = 'success';

        consoleOutput.appendChild(logEntry);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, getRandomDelay(1200, 1800)));
    }

    // Final dramatic pause
    loadingText.textContent = "AI thinking really hard... 🤔";
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate and display results
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

    // Handle red flags section with enhanced brutality
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

    // Validate form
    const form = document.getElementById('analysisForm');
    if (!form.checkValidity()) {
        showToast('❌ Please fill in all required fields');
        return;
    }

    // Collect form data
    currentFormData = collectFormData();

    // Validate age (must be 18+)
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
        // Show loading page and start analysis
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
    // Form submission
    const analysisForm = document.getElementById('analysisForm');
    if (analysisForm) {
        analysisForm.addEventListener('submit', handleFormSubmission);
    }

    // Form progress tracking
    const form = document.getElementById('analysisForm');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('change', updateFormProgress);
        input.addEventListener('input', updateFormProgress);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // ESC key to go home
        if (e.key === 'Escape') {
            goHome();
        }

        // Enter key on home page to start analysis
        if (e.key === 'Enter' && !document.getElementById('homePage').classList.contains('hidden')) {
            startAnalysis();
        }
    });

    // Prevent form submission with Enter key in form fields
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

// Error Handler
window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);

    if (analysisInProgress) {
        showToast('❌ Something went wrong. Please try again.');
        analysisInProgress = false;
        goHome();
    }
});

// Unhandled Promise Rejection Handler
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

// Expose functions to global scope for HTML onclick handlers
window.startAnalysis = startAnalysis;
window.goHome = goHome;
window.handlePhotoUpload = handlePhotoUpload;
window.shareResult = shareResult;

// Debug functions (remove in production)
window.debugInfo = function () {
    return {
        currentFormData,
        analysisInProgress,
        currentPage: document.querySelector('div:not(.hidden)').id
    };
};

// Analytics placeholder (add your analytics code here)
function trackEvent(eventName, eventData = {}) {
    // Example: Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
function trackPageView(pageName) {
    trackEvent('page_view', { page: pageName });
}

// Add tracking to navigation functions
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