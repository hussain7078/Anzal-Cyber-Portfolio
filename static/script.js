// Premium Portfolio Logic & Cyber Neural Interface
const chatBtn = document.getElementById("chatBtn");
const chatWidget = document.getElementById("chat-widget");
const closeChat = document.getElementById("close-chat");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("userInput");
const typingIndicator = document.getElementById("typing");
const chatHeader = document.getElementById("chat-header");

// Configure Marked.js for markdown-in-chat
if (typeof marked !== 'undefined') {
    marked.setOptions({
        highlight: function(code, lang) {
            if (typeof hljs !== 'undefined') {
                return hljs.highlightAuto(code).value;
            }
            return code;
        },
        breaks: true
    });
}

/* ========== OPEN / CLOSE CHAT ========== */
chatBtn.onclick = () => {
    chatWidget.style.display = "flex";
    chatBtn.style.opacity = "0";
    chatBtn.style.pointerEvents = "none";
    userInput.focus();
};

closeChat.onclick = () => {
    chatWidget.style.display = "none";
    chatBtn.style.opacity = "1";
    chatBtn.style.pointerEvents = "auto";
};

/* ========== SEND MESSAGE ========== */
async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMiniMessage(text, "user-msg");
    userInput.value = "";
    userInput.style.height = "auto";

    typingIndicator.style.display = "block";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        typingIndicator.style.display = "none";

        if (data.response) {
            appendMiniMessage(data.response, "ai-msg");
        } else {
            appendMiniMessage("Neural connection error. Status: Offline.", "ai-msg");
        }
    } catch (error) {
        typingIndicator.style.display = "none";
        appendMiniMessage("System failure. Neural link unstable.", "ai-msg");
    }
}

/* ========== ADD MESSAGE (MINI) ========== */
function appendMiniMessage(text, className) {
    const div = document.createElement("div");
    div.className = `bubble ${className}`;
    
    // Support Markdown
    if (typeof marked !== 'undefined' && className === "ai-msg") {
        div.innerHTML = marked.parse(text);
    } else {
        div.textContent = text;
    }
    
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Syntax Highlighting
    if (typeof hljs !== 'undefined') {
        div.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el);
        });
    }
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
    chatWidget.style.transition = "none";
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
    chatWidget.style.transition = "all 0.4s ease-out";
});

/* ========== PROJECT MODAL LOGIC ========== */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");
const projectCards = document.querySelectorAll(".recent-project-card");

projectCards.forEach(card => {
    card.addEventListener("click", (e) => {
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
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateZ(30px)`;
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

/* ========== CONTACT FORM SUBMISSION ========== */
const contactForm = document.getElementById("portfolio-contact");
if(contactForm) {
    contactForm.onsubmit = async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector("button");
        const originalText = btn.textContent;
        btn.textContent = "SENDING...";
        btn.disabled = true;

        const formData = {
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value
        };

        try {
            const res = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if(data.status === 'success') {
                alert("Neural signal sent! Anzal will respond shortly. 📡");
                contactForm.reset();
            } else {
                alert(`Interface Error: ${data.message || "Unknown error"}. 📡`);
            }
        } catch(err) {
            alert("System error. Connection unstable. Use my social links below! 📡");
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    };
}

/* ========== INITIAL GREETING TIMEOUT ========== */
console.log("Neural Interface Loaded. Diagnostics: Optimal.");