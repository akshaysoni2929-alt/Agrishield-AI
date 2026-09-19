/* =====================================
   AgriShield AI - Professional Analysis
   Demo Version
   ===================================== */

// Sample crop information
const cropData = {

    tomato: {
        cropName: "Tomato",
        disease: "Possible Early Blight",
        risk: "Medium",
        confidence: "82%",
        description:
            "The selected crop matches a sample pattern associated with early blight symptoms.",
        symptoms: [
            "Brown spots on leaves",
            "Yellowing of leaves",
            "Weak plant growth"
        ],
        suggestions: [
            "Remove severely affected leaves if appropriate",
            "Avoid unnecessary overhead watering",
            "Maintain proper field hygiene",
            "Monitor nearby plants regularly",
            "Consult a local agriculture expert"
        ]
    },

    potato: {
        cropName: "Potato",
        disease: "Possible Late Blight",
        risk: "High",
        confidence: "79%",
        description:
            "The selected crop matches a sample pattern associated with late blight symptoms.",
        symptoms: [
            "Dark patches on leaves",
            "Leaf damage in humid conditions",
            "Brown marks on plant parts"
        ],
        suggestions: [
            "Inspect nearby plants carefully",
            "Avoid excessive moisture",
            "Maintain field hygiene",
            "Monitor the crop regularly",
            "Seek expert advice before treatment"
        ]
    },

    wheat: {
        cropName: "Wheat",
        disease: "Possible Leaf Rust",
        risk: "Medium",
        confidence: "76%",
        description:
            "The selected crop matches a sample pattern associated with leaf rust symptoms.",
        symptoms: [
            "Orange or brown spots on leaves",
            "Reduced leaf health",
            "Visible discoloration"
        ],
        suggestions: [
            "Inspect the complete field",
            "Monitor crop growth regularly",
            "Remove affected plant material if appropriate",
            "Maintain proper field management",
            "Consult an agriculture expert"
        ]
    },

    rice: {
        cropName: "Rice",
        disease: "Possible Rice Blast",
        risk: "High",
        confidence: "81%",
        description:
            "The selected crop matches a sample pattern associated with rice blast symptoms.",
        symptoms: [
            "Spindle-shaped spots on leaves",
            "Leaf discoloration",
            "Reduced plant health"
        ],
        suggestions: [
            "Monitor affected areas regularly",
            "Avoid excessive nitrogen application",
            "Maintain proper field management",
            "Inspect nearby plants",
            "Consult a local agriculture expert"
        ]
    }

};


// Get HTML elements
const cropSelect = document.getElementById("cropSelect");
const cropImage = document.getElementById("cropImage");
const imagePreview = document.getElementById("imagePreview");
const analyzeBtn = document.getElementById("analyzeBtn");

const analysisMessage = document.getElementById("analysisMessage");
const resultBox = document.getElementById("resultBox");

const resultCrop = document.getElementById("resultCrop");
const riskLevel = document.getElementById("riskLevel");
const confidenceScore = document.getElementById("confidenceScore");

const diseaseName = document.getElementById("diseaseName");
const resultDescription = document.getElementById("resultDescription");

const symptomsList = document.getElementById("symptomsList");
const suggestionsList = document.getElementById("suggestionsList");

const analysisTime = document.getElementById("analysisTime");
const reportId = document.getElementById("reportId");


// Image preview
cropImage.addEventListener("change", function () {

    const file = cropImage.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        analysisMessage.textContent =
            tr("Please select a valid image file.");

        cropImage.value = "";
        imagePreview.style.display = "none";

        return;
    }

    const imageURL = URL.createObjectURL(file);

    imagePreview.src = imageURL;
    imagePreview.style.display = "block";

    analysisMessage.textContent =
        tr("Image uploaded successfully. Now click Analyze Crop.");

    resultBox.style.display = "none";

});


// Analyze button
analyzeBtn.addEventListener("click", function () {

    const selectedCrop = cropSelect.value;
    const selectedImage = cropImage.files[0];

    // Validate crop
    if (selectedCrop === "") {

        analysisMessage.textContent =
            tr("Please select a crop first.");

        resultBox.style.display = "none";

        return;
    }

    // Validate image
    if (!selectedImage) {

        analysisMessage.textContent =
            tr("Please upload a crop image first.");

        resultBox.style.display = "none";

        return;
    }

    // Get sample result
    const data = cropData[selectedCrop];

    // Basic result information
    resultCrop.textContent = data.cropName;
    riskLevel.textContent = data.risk;
    confidenceScore.textContent = data.confidence;

    diseaseName.textContent = data.disease;
    resultDescription.textContent = data.description;

    // Clear previous lists
    symptomsList.innerHTML = "";
    suggestionsList.innerHTML = "";

    // Add symptoms
    data.symptoms.forEach(function (symptom) {

        const listItem = document.createElement("li");

        listItem.textContent = symptom;

        symptomsList.appendChild(listItem);

    });

    // Add suggestions
    data.suggestions.forEach(function (suggestion) {

        const listItem = document.createElement("li");

        listItem.textContent = suggestion;

        suggestionsList.appendChild(listItem);

    });

    // Add current date and time
    const currentTime = new Date();

    analysisTime.textContent = currentTime.toLocaleString(({ hi: "hi-IN", mr: "mr-IN" })[currentLang()]);

    // Generate demo report ID
    const generatedReportId =
        "AGRI-" + Date.now().toString().slice(-6);

    reportId.textContent = generatedReportId;

    // Show result
    resultBox.style.display = "block";

    analysisMessage.textContent =
        tr("Demo analysis completed successfully!");

    // Scroll smoothly to report
    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});
/* =================================
   AGRIBUDDY CHATBOT
   Frontend Demo
   ================================= */

const chatbotContainer = document.getElementById("chatbotContainer");
const openChatbot = document.getElementById("openChatbot");
const closeChatbot = document.getElementById("closeChatbot");

const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");
const chatMessages = document.getElementById("chatMessages");


// Open chatbot
openChatbot.addEventListener("click", function () {
    chatbotContainer.style.display = "block";
    chatInput.focus();
});


// Close chatbot
closeChatbot.addEventListener("click", function () {
    chatbotContainer.style.display = "none";
});


// Add a message to chat
function addChatMessage(message, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
        sender === "bot" ? "bot-message" : "user-message"
    );

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Generate a demo response
function getBotResponse(question) {

    const text = question.toLowerCase();

    if (currentLang() === "hi") {
        return getBotResponseHi(text);
    }
    if (currentLang() === "mr") {
        return getBotResponseMr(text);
    }

    if (
        text.includes("hello") ||
        /\bhi\b/.test(text) ||
        text.includes("namaste") ||
        text.includes("नमस्ते")
    ) {
        return "Namaste bhai! 🌱 Batao, tumhari crop ke baare mein kya help chahiye?";
    }

    if (
        text.includes("tomato") ||
        text.includes("टमाटर")
    ) {
        return "Tomato ke leaves par spots hain? 🌿 Image upload karke sample analysis dekho. Real treatment ke liye agriculture expert se confirm karna.";
    }

    if (
        text.includes("disease") ||
        text.includes("रोग") ||
        text.includes("बीमारी")
    ) {
        return "Crop disease ke liye affected leaves ki clear photo lo, crop select karo aur Analyze Crop par click karo.";
    }

    if (
        text.includes("weather") ||
        text.includes("मौसम")
    ) {
        return "High humidity aur continuous rain se kuch crop diseases ka risk badh sakta hai. Weather Alert section check karo.";
    }

    if (
        text.includes("water") ||
        text.includes("पानी")
    ) {
        return "Bhai, crop ko zaroorat ke hisaab se paani do. Overwatering se roots aur leaves ko problem ho sakti hai.";
    }

    if (
        text.includes("help") ||
        text.includes("madad") ||
        text.includes("मदद")
    ) {
        return "Main crop selection, sample analysis, weather risk aur basic crop-care information mein help kar sakta hoon. 🌾";
    }

    return "Bhai, main abhi demo assistant hoon. Tum crop ka naam, disease, weather ya farming care ke baare mein pooch sakte ho. 🌱";
}


// Send message
function sendChatMessage() {

    const question = chatInput.value.trim();

    if (question === "") {
        return;
    }

    addChatMessage(question, "user");

    const response = getBotResponse(question);

    setTimeout(function () {
        addChatMessage(response, "bot");
        if (speakNextReply) {
            speakText(response, null);
            speakNextReply = false;
        }
    }, 300);

    chatInput.value = "";
}


// Send on button click
sendChatBtn.addEventListener("click", sendChatMessage);


// Send on Enter key
chatInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendChatMessage();
    }

});


/* =====================================
   LOCAL REPORT HISTORY + DEMO SIGN-IN
===================================== */

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const openLoginBtn = document.getElementById("openLoginBtn");
const closeLoginBtn = document.getElementById("closeLoginBtn");
const loginModal = document.getElementById("loginModal");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const loginStatus = document.getElementById("loginStatus");

function getSavedReports() {
    try { return JSON.parse(localStorage.getItem("agrishieldReports") || "[]"); }
    catch (error) { return []; }
}

function renderHistory() {
    if (!historyList) return;
    const reports = getSavedReports();
    historyList.innerHTML = "";
    if (!reports.length) {
        historyList.innerHTML = '<p class="empty-history">' + tr("No analysis reports saved yet.") + '</p>';
        return;
    }
    reports.slice(0, 8).forEach(function (report) {
        const item = document.createElement("div");
        item.className = "history-item";
        const left = document.createElement("div");
        const title = document.createElement("strong");
        title.textContent = tr(report.crop) + " — " + tr(report.disease);
        const meta = document.createElement("span");
        meta.textContent = report.time + " · " + tr("Report ID") + ": " + report.id;
        left.append(title, meta);
        const risk = document.createElement("strong");
        risk.textContent = tr(report.risk) + " " + tr("Risk");
        item.append(left, risk);
        historyList.appendChild(item);
    });
}

function saveReport(report) {
    const reports = getSavedReports();
    reports.unshift(report);
    localStorage.setItem("agrishieldReports", JSON.stringify(reports.slice(0, 20)));
    renderHistory();
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", function () {
        localStorage.removeItem("agrishieldReports");
        renderHistory();
    });
}

const originalAnalyzeButton = document.getElementById("analyzeBtn");
if (originalAnalyzeButton) {
    originalAnalyzeButton.addEventListener("click", function () {
        setTimeout(function () {
            const crop = document.getElementById("resultCrop");
            const disease = document.getElementById("diseaseName");
            const risk = document.getElementById("riskLevel");
            const time = document.getElementById("analysisTime");
            const id = document.getElementById("reportId");
            if (crop && crop.textContent !== "-") {
                saveReport({ crop: crop.textContent, disease: disease.textContent, risk: risk.textContent, time: time.textContent, id: id.textContent });
            }
        }, 0);
    });
}

function openLoginModal() {
    if (!loginModal) return;
    loginModal.classList.add("active");
    loginModal.setAttribute("aria-hidden", "false");
}
function closeLoginModal() {
    if (!loginModal) return;
    loginModal.classList.remove("active");
    loginModal.setAttribute("aria-hidden", "true");
}
if (openLoginBtn) openLoginBtn.addEventListener("click", openLoginModal);
if (closeLoginBtn) closeLoginBtn.addEventListener("click", closeLoginModal);
if (loginModal) loginModal.addEventListener("click", function (event) { if (event.target === loginModal) closeLoginModal(); });
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", function () {
        localStorage.setItem("agrishieldDemoUser", "Farmer Demo User");
        if (loginStatus) loginStatus.textContent = tr("Demo sign-in successful! Real Google login can be enabled by connecting Firebase Authentication.");
        googleLoginBtn.textContent = tr("✓ Signed in (Demo)");
    });
}
renderHistory();


/* =====================================
   PERSONALISED GUIDANCE
   Plan changes with farmer name, land size, crop stage and watering method
===================================== */

const PROFILE_KEY = "agrishieldProfile";
const profileIds = { name: "farmerName", land: "farmLand", stage: "cropStage", water: "waterSource" };

const stageTips = {
    sowing: "Seedlings are delicate and infection spreads fast, so check them every 2 to 3 days.",
    growing: "Leaves are your early warning. Check the underside of leaves too, not just the top.",
    flowering: "Flowering is a sensitive stage. Acting early protects your flowers and fruit.",
    harvest: "You are close to harvest. Check the waiting period on any spray label before picking."
};

const waterTips = {
    rainfed: "Rain-fed field: after rain, wet leaves raise disease risk, so inspect the crop the next morning.",
    canal: "Canal water: avoid flooding the field and irrigate in the morning so leaves dry by evening.",
    borewell: "Borewell: water in the morning and avoid over-irrigation. Wet soil helps disease spread.",
    drip: "Drip irrigation: you already keep leaves dry, so keep it that way and check for leaks near affected plants."
};

function readProfile() {
    const profile = {};
    Object.keys(profileIds).forEach(function (key) {
        const el = document.getElementById(profileIds[key]);
        profile[key] = el ? el.value.trim() : "";
    });
    return profile;
}

function saveProfile() {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(readProfile())); } catch (e) {}
    updateGreeting();
}

function loadProfile() {
    try {
        const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
        Object.keys(profileIds).forEach(function (key) {
            const el = document.getElementById(profileIds[key]);
            if (el && saved[key]) el.value = saved[key];
        });
    } catch (e) {}
    updateGreeting();
}

let lastAnalyzedCrop = "";

function localizedCrop(key) {
    const en = cropData[key];
    if (!en) return null;
    const t = CROP_TR[currentLang()];
    return t ? Object.assign({}, en, t[key]) : en;
}

function updateGreeting() {
    const greeting = document.getElementById("personalGreeting");
    if (!greeting) return;
    const name = readProfile().name;
    if (name) {
        greeting.textContent = pick(
            "Namaste, " + name + " ji. Your advice is set for your farm.",
            "नमस्ते, " + name + " जी। आपकी सलाह आपके खेत के हिसाब से तैयार है।",
            "नमस्कार, " + name + " जी. तुमचा सल्ला तुमच्या शेतानुसार तयार आहे."
        );
    } else {
        greeting.textContent = tr("Your advice will be shaped around these answers.");
    }
}

function renderPlan() {
    const box = document.getElementById("planList");
    const data = localizedCrop(lastAnalyzedCrop);
    if (!box || !data || resultBox.style.display !== "block") return;

    const p = readProfile();
    const acres = parseFloat(p.land) || 1;
    const spots = Math.min(20, Math.max(5, Math.round(acres * 5)));
    const s = data.suggestions;
    const crop = data.cropName;

    document.getElementById("planTitle").textContent = pick(
        p.name ? "Plan for " + p.name + " ji's " + crop.toLowerCase() : "Your " + crop.toLowerCase() + " plan",
        p.name ? p.name + " जी के लिए " + crop + " की योजना" : "आपकी " + crop + " की योजना",
        p.name ? p.name + " जी यांच्यासाठी " + crop + " योजना" : "तुमची " + crop + " योजना"
    );

    const scout = pick(
        "Walk your field in a zigzag and check about " + spots + " spots" + (p.land ? " across your " + p.land + " acres" : "") + ". Note where the damage is spreading.",
        "खेत में ज़िगज़ैग चलिए और लगभग " + spots + " जगह देखिए" + (p.land ? " (आपके " + p.land + " एकड़ में)" : "") + "। देखिए कि नुकसान कहाँ फैल रहा है।",
        "शेतात नागमोडी चाला आणि सुमारे " + spots + " ठिकाणी पाहणी करा" + (p.land ? " (तुमच्या " + p.land + " एकरात)" : "") + ". नुकसान कुठे पसरत आहे ते नोंदवा."
    );

    const groups = [
        [tr("Today"), [s[0], tr(waterTips[p.water])]],
        [tr("This week"), [scout, tr(stageTips[p.stage]), s[s.length - 1]]],
        [tr("To prevent it coming back"), [s[1], s[2]]]
    ];

    box.innerHTML = "";
    groups.forEach(function (group) {
        const wrap = document.createElement("div");
        wrap.className = "plan-group";
        const title = document.createElement("h5");
        title.textContent = group[0];
        const list = document.createElement("ul");
        group[1].filter(Boolean).forEach(function (tip) {
            const li = document.createElement("li");
            li.textContent = tip;
            list.appendChild(li);
        });
        wrap.append(title, list);
        box.appendChild(wrap);
    });
}

// Show the analysis text in the selected language
function localizeResult() {
    const d = localizedCrop(lastAnalyzedCrop);
    if (!d || resultBox.style.display !== "block") return;
    resultCrop.textContent = d.cropName;
    riskLevel.textContent = tr(cropData[lastAnalyzedCrop].risk);
    diseaseName.textContent = d.disease;
    resultDescription.textContent = d.description;
    symptomsList.innerHTML = "";
    suggestionsList.innerHTML = "";
    d.symptoms.forEach(function (t) { const li = document.createElement("li"); li.textContent = t; symptomsList.appendChild(li); });
    d.suggestions.forEach(function (t) { const li = document.createElement("li"); li.textContent = t; suggestionsList.appendChild(li); });
}

Object.values(profileIds).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", saveProfile);
});

analyzeBtn.addEventListener("click", function () {
    saveProfile();
    setTimeout(function () {
        if (resultBox.style.display === "block") {
            lastAnalyzedCrop = cropSelect.value;
            localizeResult();
            renderPlan();
        }
    }, 0);
});

loadProfile();


/* =====================================
   CAMERA CAPTURE
   Live camera where the browser allows it, phone camera app as fallback
===================================== */

const openCameraBtn = document.getElementById("openCameraBtn");
const cameraModal = document.getElementById("cameraModal");
const cameraVideo = document.getElementById("cameraVideo");
const cameraCanvas = document.getElementById("cameraCanvas");
const captureBtn = document.getElementById("captureBtn");
const closeCameraBtn = document.getElementById("closeCameraBtn");
const cameraFallback = document.getElementById("cameraFallback");

let cameraStream = null;

// Put a captured or picked image into the main upload input, so the existing preview and analysis work unchanged
function setCropImage(file) {
    const transfer = new DataTransfer();
    transfer.items.add(file);
    cropImage.files = transfer.files;
    cropImage.dispatchEvent(new Event("change"));
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(function (track) { track.stop(); });
        cameraStream = null;
    }
    cameraVideo.srcObject = null;
    cameraModal.classList.remove("active");
    cameraModal.setAttribute("aria-hidden", "true");
}

async function openCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        cameraFallback.click();
        return;
    }
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
            audio: false
        });
        cameraVideo.srcObject = cameraStream;
        cameraModal.classList.add("active");
        cameraModal.setAttribute("aria-hidden", "false");
    } catch (error) {
        analysisMessage.textContent =
            tr("Camera could not start. Allow camera access in your browser, or use the upload option.");
    }
}

function capturePhoto() {
    if (!cameraVideo.videoWidth) return;
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    cameraCanvas.getContext("2d").drawImage(cameraVideo, 0, 0);
    cameraCanvas.toBlob(function (blob) {
        if (!blob) return;
        setCropImage(new File([blob], "crop-photo-" + Date.now() + ".jpg", { type: "image/jpeg" }));
        stopCamera();
    }, "image/jpeg", 0.92);
}

openCameraBtn.addEventListener("click", openCamera);
captureBtn.addEventListener("click", capturePhoto);
closeCameraBtn.addEventListener("click", stopCamera);
cameraModal.addEventListener("click", function (event) { if (event.target === cameraModal) stopCamera(); });
document.addEventListener("keydown", function (event) { if (event.key === "Escape") stopCamera(); });
cameraFallback.addEventListener("change", function () {
    if (cameraFallback.files[0]) setCropImage(cameraFallback.files[0]);
});


/* =====================================
   LANGUAGE SWITCH, RISK DETAILS, HINDI CHATBOT
===================================== */

const languageSelect = document.getElementById("languageSelect");
const riskDetailsBtn = document.getElementById("riskDetailsBtn");
const riskDetails = document.getElementById("riskDetails");
const RISK_TEXT = "High humidity helps fungal diseases spread. Avoid overhead watering and check leaves every day.";

if (riskDetailsBtn && riskDetails) {
    riskDetailsBtn.addEventListener("click", function () {
        const open = riskDetails.dataset.open === "1";
        riskDetails.dataset.open = open ? "0" : "1";
        riskDetails.textContent = open ? "" : tr(RISK_TEXT);
    });
}

window.onLanguageChange = function () {
    updateGreeting();
    localizeResult();
    renderPlan();
    renderHistory();
    if (riskDetails && riskDetails.dataset.open === "1") riskDetails.textContent = tr(RISK_TEXT);
};

languageSelect.addEventListener("change", function () {
    setLanguage(languageSelect.value);
});

function getBotResponseHi(text) {
    if (/\bhi\b|hello|namaste|नमस्ते|नमस्कार/.test(text)) return "नमस्ते भाई! 🌱 बताइए, आपकी फसल के बारे में क्या मदद चाहिए?";
    if (/tomato|टमाटर/.test(text)) return "टमाटर के पत्तों पर धब्बे हैं? 🌿 फोटो अपलोड करके नमूना जाँच देखिए। असली इलाज से पहले कृषि विशेषज्ञ से पक्का कर लीजिए।";
    if (/disease|रोग|बीमारी/.test(text)) return "फसल के रोग के लिए प्रभावित पत्ते की साफ़ फोटो लीजिए, फसल चुनिए और 'फसल की जाँच करें' दबाइए।";
    if (/weather|मौसम/.test(text)) return "ज़्यादा नमी और लगातार बारिश से कुछ फसल रोगों का खतरा बढ़ सकता है। डैशबोर्ड में जोखिम अलर्ट देखिए।";
    if (/water|पानी/.test(text)) return "फसल को ज़रूरत के हिसाब से ही पानी दीजिए। ज़्यादा पानी से जड़ और पत्तों को नुकसान हो सकता है।";
    if (/help|madad|मदद/.test(text)) return "मैं फसल चुनने, नमूना जाँच, मौसम के जोखिम और फसल की देखभाल की बुनियादी जानकारी में मदद कर सकता हूँ। 🌾";
    return "भाई, मैं अभी डेमो सहायक हूँ। आप फसल का नाम, रोग, मौसम या खेती की देखभाल के बारे में पूछ सकते हैं। 🌱";
}

languageSelect.value = currentLang();
setLanguage(currentLang());


/* =====================================
   MOBILE MENU + NEON TAP GLOW
===================================== */

const siteNav = document.querySelector(".navbar");
const siteNavToggle = document.getElementById("navToggle");

function setMenu(open) {
    siteNav.classList.toggle("open", open);
    siteNavToggle.setAttribute("aria-expanded", String(open));
}

siteNavToggle.addEventListener("click", function () {
    setMenu(!siteNav.classList.contains("open"));
});
siteNav.querySelectorAll(".nav-links a, .login-btn").forEach(function (el) {
    el.addEventListener("click", function () { setMenu(false); });
});
document.addEventListener("click", function (event) {
    if (!siteNav.contains(event.target)) setMenu(false);
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
});
window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
});

// Tap or click on an icon (or its card) gives a short neon green glow
const NEON_TARGETS = ".feature-icon, .dashboard-icon, .login-icon, .brand-icon, .chatbot-toggle";
document.addEventListener("pointerdown", function (event) {
    const hit = event.target.closest(NEON_TARGETS + ", .feature-card, .dashboard-card");
    if (!hit) return;
    const icon = hit.matches(NEON_TARGETS) ? hit : hit.querySelector(NEON_TARGETS);
    if (!icon) return;
    icon.classList.add("glow-pulse");
    clearTimeout(icon._glowTimer);
    icon._glowTimer = setTimeout(function () { icon.classList.remove("glow-pulse"); }, 900);
});



/* =====================================
   MARATHI CHATBOT
===================================== */

function getBotResponseMr(text) {
    if (/\bhi\b|hello|namaste|नमस्कार|नमस्ते/.test(text)) return "नमस्कार भाऊ! 🌱 सांगा, तुमच्या पिकाबद्दल काय मदत हवी आहे?";
    if (/tomato|टोमॅटो/.test(text)) return "टोमॅटोच्या पानांवर डाग दिसत आहेत का? 🌿 फोटो अपलोड करून नमुना तपासणी पहा. खऱ्या उपचारापूर्वी कृषी तज्ज्ञांकडून खात्री करून घ्या.";
    if (/disease|रोग|बीमारी/.test(text)) return "पिकाच्या रोगासाठी प्रभावित पानाचा स्पष्ट फोटो घ्या, पीक निवडा आणि 'पिकाची तपासणी करा' दाबा.";
    if (/weather|हवामान|मौसम/.test(text)) return "जास्त आर्द्रता आणि सततच्या पावसामुळे काही पिकांच्या रोगांचा धोका वाढू शकतो. डॅशबोर्डवर धोक्याचा इशारा पहा.";
    if (/water|पाणी/.test(text)) return "पिकाला गरजेनुसारच पाणी द्या. जास्त पाण्यामुळे मुळांना आणि पानांना नुकसान होऊ शकते.";
    if (/help|madad|मदत/.test(text)) return "मी पीक निवडणे, नमुना तपासणी, हवामानाचा धोका आणि पिकाची काळजी याबद्दल मूलभूत माहिती देऊन मदत करू शकतो. 🌾";
    return "भाऊ, मी सध्या डेमो सहाय्यक आहे. तुम्ही पिकाचे नाव, रोग, हवामान किंवा शेतीच्या काळजीबद्दल विचारू शकता. 🌱";
}


/* =====================================
   LIVE WEATHER (Open-Meteo, no API key needed)
   Shows Pune by default. "Use my location" asks the browser for the farmer's location.
===================================== */

const weatherBadge = document.getElementById("weatherBadge");
const weatherTemp = document.getElementById("weatherTemp");
const weatherDesc = document.getElementById("weatherDesc");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");
const weatherPlace = document.getElementById("weatherPlace");
const weatherActivity = document.getElementById("weatherActivity");
const riskBadge = document.getElementById("riskBadge");
const riskValue = document.getElementById("riskValue");
const riskText = document.getElementById("riskText");
const useLocationBtn = document.getElementById("useLocationBtn");

const DEFAULT_PLACE = { lat: 18.5204, lon: 73.8567 };
const GEO_KEY = "agrishieldGeo";
let lastWeather = null;
let geoPlace = "";

const WEATHER_TEXT = {
    clear:   ["Clear sky", "साफ़ आसमान", "निरभ्र आकाश"],
    partly:  ["Partly cloudy", "आंशिक रूप से बादल", "अंशतः ढगाळ"],
    cloudy:  ["Cloudy", "बादल छाए हैं", "ढगाळ"],
    fog:     ["Foggy", "कोहरा", "धुके"],
    drizzle: ["Light drizzle", "हल्की बूंदाबांदी", "हलकी रिमझिम"],
    rain:    ["Rain", "बारिश", "पाऊस"],
    storm:   ["Thunderstorm", "आंधी और बिजली के साथ बारिश", "वादळी पाऊस"]
};

function weatherGroup(code) {
    if (code === 0) return "clear";
    if (code <= 2) return "partly";
    if (code === 3) return "cloudy";
    if (code === 45 || code === 48) return "fog";
    if (code >= 51 && code <= 57) return "drizzle";
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
    if (code >= 95) return "storm";
    return "cloudy";
}

// Simple risk rule: wet and humid weather helps crop diseases spread
function weatherRiskLevel(w) {
    const wet = ["drizzle", "rain", "storm"].indexOf(weatherGroup(w.code)) !== -1;
    if (w.humidity >= 80 || (wet && w.humidity >= 65)) return "High";
    if (w.humidity >= 65 || wet) return "Medium";
    return "Low";
}

function renderWeather() {
    if (!lastWeather) return;
    const w = lastWeather;
    const idx = { en: 0, hi: 1, mr: 2 }[currentLang()];

    weatherBadge.textContent = pick("Live", "लाइव", "थेट");
    weatherBadge.classList.add("healthy");
    weatherTemp.textContent = Math.round(w.temp) + "°C";
    weatherDesc.textContent = WEATHER_TEXT[weatherGroup(w.code)][idx];
    weatherHumidity.textContent = pick("💧 Humidity: ", "💧 नमी: ", "💧 आर्द्रता: ") + Math.round(w.humidity) + "%";
    weatherWind.textContent = pick("💨 Wind: ", "💨 हवा: ", "💨 वारा: ") + Math.round(w.wind) + pick(" km/h", " किमी/घंटा", " किमी/तास");

    if (w.isDefault) {
        weatherPlace.textContent = "📍 " + pick("Pune (default)", "पुणे (डिफ़ॉल्ट)", "पुणे (डिफॉल्ट)");
        weatherActivity.textContent = pick(
            "Live weather for Pune. Tap 'Use my location' for your area.",
            "पुणे का लाइव मौसम। अपने इलाके के लिए 'मेरी लोकेशन इस्तेमाल करें' दबाइए।",
            "पुण्याचे थेट हवामान. तुमच्या भागासाठी 'माझे ठिकाण वापरा' दाबा."
        );
    } else {
        weatherPlace.textContent = "📍 " + (geoPlace || pick("Your location", "आपकी लोकेशन", "तुमचे ठिकाण"));
        weatherActivity.textContent = tr("Live weather from your location.");
    }

    const level = weatherRiskLevel(w);
    riskValue.textContent = tr(level);
    riskBadge.className = "status-badge " + (level === "Low" ? "healthy" : level === "Medium" ? "warning" : "danger");
    riskBadge.textContent = level === "Low" ? pick("Low", "कम", "कमी") : level === "Medium" ? pick("Moderate", "मध्यम", "मध्यम") : pick("High", "उच्च", "जास्त");
    riskText.textContent = level === "High"
        ? pick("High humidity or rain. Diseases can spread fast.", "ज़्यादा नमी या बारिश। रोग तेज़ी से फैल सकते हैं।", "जास्त आर्द्रता किंवा पाऊस. रोग वेगाने पसरू शकतात.")
        : level === "Medium"
            ? tr("Humidity may increase disease risk.")
            : pick("Dry weather. Disease risk is low today.", "मौसम सूखा है। आज रोग का खतरा कम है।", "हवामान कोरडे आहे. आज रोगाचा धोका कमी आहे.");
}

function fetchWeather(lat, lon, isDefault) {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon +
        "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";
    fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
            const c = data.current;
            if (!c) return;
            lastWeather = { temp: c.temperature_2m, humidity: c.relative_humidity_2m, wind: c.wind_speed_10m, code: c.weather_code, isDefault: isDefault };
            renderWeather();
        })
        .catch(function () { /* offline: the sample data stays on the page */ });
}

function reverseGeocode(lat, lon) {
    fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude=" + lon + "&localityLanguage=en")
        .then(function (r) { return r.json(); })
        .then(function (d) {
            geoPlace = d.city || d.locality || d.principalSubdivision || "";
            renderWeather();
        })
        .catch(function () {});
}

function requestLocation() {
    if (!navigator.geolocation) {
        weatherActivity.textContent = pick("Location is not supported in this browser.", "इस ब्राउज़र में लोकेशन की सुविधा नहीं है।", "या ब्राउझरमध्ये ठिकाणाची सुविधा नाही.");
        return;
    }
    navigator.geolocation.getCurrentPosition(function (pos) {
        try { localStorage.setItem(GEO_KEY, "1"); } catch (e) {}
        fetchWeather(pos.coords.latitude, pos.coords.longitude, false);
        reverseGeocode(pos.coords.latitude, pos.coords.longitude);
    }, function () {
        weatherActivity.textContent = pick(
            "Location permission was not given. Showing Pune weather.",
            "लोकेशन की अनुमति नहीं मिली। पुणे का मौसम दिखा रहे हैं।",
            "ठिकाणाची परवानगी मिळाली नाही. पुण्याचे हवामान दाखवत आहोत."
        );
        if (!lastWeather) fetchWeather(DEFAULT_PLACE.lat, DEFAULT_PLACE.lon, true);
    }, { timeout: 10000, maximumAge: 600000 });
}

useLocationBtn.addEventListener("click", requestLocation);

// Start: Pune first (no permission popup). If the farmer allowed location before, use it.
fetchWeather(DEFAULT_PLACE.lat, DEFAULT_PLACE.lon, true);
try { if (localStorage.getItem(GEO_KEY) === "1") requestLocation(); } catch (e) {}


/* =====================================
   VOICE: speak to the chatbot, listen to the report
   Uses the browser's built-in speech features (works best in Chrome)
===================================== */

const micBtn = document.getElementById("micBtn");
const listenBtn = document.getElementById("listenBtn");
const voiceNote = document.getElementById("voiceNote");
const VOICE_LANG = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognizer = null;
let speakNextReply = false;

function speakText(text, button) {
    if (!("speechSynthesis" in window)) return false;
    const lang = VOICE_LANG[currentLang()];
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(function (v) { return v.lang.replace("_", "-") === lang; }) ||
                  voices.find(function (v) { return v.lang.toLowerCase().indexOf(lang.slice(0, 2)) === 0; });

    if (voices.length && !voice && lang !== "en-IN") {
        voiceNote.textContent = pick("", "इस डिवाइस पर हिंदी आवाज़ उपलब्ध नहीं है।", "या डिव्हाइसवर मराठी आवाज उपलब्ध नाही.");
        return false;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    if (button) {
        button.classList.add("speaking");
        utterance.onend = utterance.onerror = function () { button.classList.remove("speaking"); };
    }
    voiceNote.textContent = "";
    window.speechSynthesis.speak(utterance);
    return true;
}

function reportSpeech() {
    const d = localizedCrop(lastAnalyzedCrop);
    if (!d || resultBox.style.display !== "block") return "";
    const risk = tr(cropData[lastAnalyzedCrop].risk);
    return pick(
        d.cropName + ". Possible problem: " + d.disease + ". Risk level: " + risk + ". What to do: " + d.suggestions[0] + ". " + d.suggestions[1] + ". Please also check with an agriculture expert.",
        d.cropName + "। संभावित समस्या: " + d.disease + "। जोखिम स्तर: " + risk + "। क्या करें: " + d.suggestions[0] + "। " + d.suggestions[1] + "। कृपया कृषि विशेषज्ञ से भी सलाह लीजिए।",
        d.cropName + ". संभाव्य समस्या: " + d.disease + ". धोक्याची पातळी: " + risk + ". काय करावे: " + d.suggestions[0] + ". " + d.suggestions[1] + ". कृपया कृषी तज्ज्ञांचाही सल्ला घ्या."
    );
}

listenBtn.addEventListener("click", function () {
    if (!("speechSynthesis" in window)) {
        voiceNote.textContent = pick("Voice is not supported in this browser.", "इस ब्राउज़र में आवाज़ की सुविधा नहीं है।", "या ब्राउझरमध्ये आवाजाची सुविधा नाही.");
        return;
    }
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        listenBtn.classList.remove("speaking");
        return;
    }
    const text = reportSpeech();
    if (text) speakText(text, listenBtn);
});

if (!SpeechRec) {
    micBtn.style.display = "none";
} else {
    micBtn.addEventListener("click", function () {
        if (recognizer) { recognizer.stop(); return; }
        recognizer = new SpeechRec();
        recognizer.lang = VOICE_LANG[currentLang()];
        recognizer.interimResults = false;
        recognizer.maxAlternatives = 1;
        micBtn.classList.add("listening");
        recognizer.onresult = function (event) {
            chatInput.value = event.results[0][0].transcript;
            speakNextReply = true;
            sendChatMessage();
        };
        recognizer.onerror = function () {
            addChatMessage(pick(
                "Could not hear you. Please try again.",
                "आवाज़ सुनाई नहीं दी। कृपया फिर से बोलिए।",
                "आवाज ऐकू आला नाही. कृपया पुन्हा बोला."
            ), "bot");
        };
        recognizer.onend = function () {
            micBtn.classList.remove("listening");
            recognizer = null;
        };
        recognizer.start();
    });
}


/* =====================================
   LANGUAGE CHANGE: refresh weather and stop any speech
===================================== */

const baseLanguageChange = window.onLanguageChange;
window.onLanguageChange = function (lang) {
    if (baseLanguageChange) baseLanguageChange(lang);
    renderWeather();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    listenBtn.classList.remove("speaking");
    voiceNote.textContent = "";
};