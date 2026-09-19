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

    analysisTime.textContent = currentTime.toLocaleString(currentLang() === "hi" ? "hi-IN" : undefined);

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
    return currentLang() === "hi" ? Object.assign({}, en, CROP_HI[key]) : en;
}

function updateGreeting() {
    const greeting = document.getElementById("personalGreeting");
    if (!greeting) return;
    const name = readProfile().name;
    if (name) {
        greeting.textContent = currentLang() === "hi"
            ? "नमस्ते, " + name + " जी। आपकी सलाह आपके खेत के हिसाब से तैयार है।"
            : "Namaste, " + name + " ji. Your advice is set for your farm.";
    } else {
        greeting.textContent = tr("Your advice will be shaped around these answers.");
    }
}

function renderPlan() {
    const box = document.getElementById("planList");
    const data = localizedCrop(lastAnalyzedCrop);
    if (!box || !data || resultBox.style.display !== "block") return;

    const hi = currentLang() === "hi";
    const p = readProfile();
    const acres = parseFloat(p.land) || 1;
    const spots = Math.min(20, Math.max(5, Math.round(acres * 5)));
    const s = data.suggestions;

    document.getElementById("planTitle").textContent = hi
        ? (p.name ? p.name + " जी के लिए " + data.cropName + " की योजना" : "आपकी " + data.cropName + " की योजना")
        : (p.name ? "Plan for " + p.name + " ji's " + data.cropName.toLowerCase() : "Your " + data.cropName.toLowerCase() + " plan");

    const scout = hi
        ? "खेत में ज़िगज़ैग चलिए और लगभग " + spots + " जगह देखिए" + (p.land ? " (आपके " + p.land + " एकड़ में)" : "") + "। देखिए कि नुकसान कहाँ फैल रहा है।"
        : "Walk your field in a zigzag and check about " + spots + " spots" + (p.land ? " across your " + p.land + " acres" : "") + ". Note where the damage is spreading.";

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