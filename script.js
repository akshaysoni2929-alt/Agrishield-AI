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
            "Please select a valid image file.";

        cropImage.value = "";
        imagePreview.style.display = "none";

        return;
    }

    const imageURL = URL.createObjectURL(file);

    imagePreview.src = imageURL;
    imagePreview.style.display = "block";

    analysisMessage.textContent =
        "Image uploaded successfully. Now click Analyze Crop.";

    resultBox.style.display = "none";

});


// Analyze button
analyzeBtn.addEventListener("click", function () {

    const selectedCrop = cropSelect.value;
    const selectedImage = cropImage.files[0];

    // Validate crop
    if (selectedCrop === "") {

        analysisMessage.textContent =
            "Please select a crop first.";

        resultBox.style.display = "none";

        return;
    }

    // Validate image
    if (!selectedImage) {

        analysisMessage.textContent =
            "Please upload a crop image first.";

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

    analysisTime.textContent = currentTime.toLocaleString();

    // Generate demo report ID
    const generatedReportId =
        "AGRI-" + Date.now().toString().slice(-6);

    reportId.textContent = generatedReportId;

    // Show result
    resultBox.style.display = "block";

    analysisMessage.textContent =
        "Demo analysis completed successfully!";

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

    if (
        text.includes("hello") ||
        text.includes("hi") ||
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


/* =================================
   ENGLISH / HINDI TOGGLE
   ================================= */

const languageSelect = document.getElementById("languageSelect");

const translations = {

    en: {
        home: "Home",
        features: "Features",
        analyze: "Analyze",
        about: "About"
    },

    hi: {
        home: "होम",
        features: "फीचर्स",
        analyze: "विश्लेषण",
        about: "हमारे बारे में"
    }

};


// Add data-language attributes to your navbar links
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {

    const linkText = link.textContent.trim().toLowerCase();

    if (linkText === "home") {
        link.dataset.languageKey = "home";
    }

    if (linkText === "features") {
        link.dataset.languageKey = "features";
    }

    if (linkText === "analyze") {
        link.dataset.languageKey = "analyze";
    }

    if (linkText === "about") {
        link.dataset.languageKey = "about";
    }

});


// Change navbar language
languageSelect.addEventListener("change", function () {

    const selectedLanguage = languageSelect.value;

    navLinks.forEach(function (link) {

        const key = link.dataset.languageKey;

        if (
            key &&
            translations[selectedLanguage][key]
        ) {
            link.textContent = translations[selectedLanguage][key];
        }

    });

});