const chatBtn = document.getElementById("chatBtn");
const chatWidget = document.getElementById("chat-widget");
const closeChat = document.getElementById("close-chat");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("userInput");
const typing = document.getElementById("typing");
const chatHeader = document.getElementById("chat-header");

/* ========== OPEN / CLOSE CHAT ========== */
chatBtn.onclick = () => {
    chatWidget.style.display = "flex";
    chatBtn.style.display = "none";
};

closeChat.onclick = () => {
    chatWidget.style.display = "none";
    chatBtn.style.display = "block";
};

/* ========== SEND MESSAGE ========== */
function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user-msg");
    userInput.value = "";

    typing.style.display = "block";

    fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    })
    .then(res => res.json())
    .then(data => {
        typing.style.display = "none";
        addMessage(data.reply, "ai-msg");
    })
    .catch(() => {
        typing.style.display = "none";
        addMessage("Sorry, something went wrong.", "ai-msg");
    });
}

/* ========== ADD MESSAGE ========== */
function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = `bubble ${className}`;
    div.textContent = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") handleSend();
});

/* ========== DRAGGABLE CHATBOT ========== */
let isDragging = false, offsetX, offsetY;

chatHeader.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - chatWidget.offsetLeft;
    offsetY = e.clientY - chatWidget.offsetTop;
});

document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    chatWidget.style.left = e.clientX - offsetX + "px";
    chatWidget.style.top = e.clientY - offsetY + "px";
    chatWidget.style.right = "auto";
    chatWidget.style.bottom = "auto";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

/* ========== PROJECT MODAL LOGIC ========== */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");
const projectCards = document.querySelectorAll(".recent-project-card");

projectCards.forEach(card => {
    card.addEventListener("click", (e) => {
        // Don't trigger modal if GitHub link is clicked
        if (e.target.closest(".github-btn")) return;
        
        const title = card.getAttribute("data-title");
        const desc = card.getAttribute("data-desc");
        
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.style.display = "flex";
    });
});

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/* ========== ADVANCED 3D TILT EFFECT ========== */
const tiltCards = document.querySelectorAll(".recent-project-card");

tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; // Range: -15 to +15 deg
        const rotateY = ((x - centerX) / centerX) * 15; // Range: -15 to +15 deg
        
        // Apply tilt and lift
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateZ(30px)`;
        
        // Dynamic Glow / Glare Position (Optional sync with CSS)
        const glare = card.querySelector("::after");
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
    });
});

/* ========== NAVBAR SCROLL EFFECT ========== */
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});