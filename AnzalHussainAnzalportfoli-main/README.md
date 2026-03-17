# Anzal — Premium Personal Portfolio & Resume Template

**Anzal** is a state-of-the-art, interactive personal portfolio designed for AI researchers, software engineers, and creative technologists. It blends a "Cyber Emerald" aesthetic with high-performance animations and advanced interactive components to create a lasting professional impression.

---

## 🚀 Key Features

- **Cyber Emerald Aesthetic:** A premium dark theme using Deep Onyx gradients, Emerald Green accents, and sophisticated glassmorphism.
- **Interactive AI Chatbot:** A draggable, custom-styled chatbot widget providing real-time engagement.
- **3D Interactive Project Cards:** Dynamic mouse-tracking tilt and glare effects for an immersive showcase.
- **Deep Technical Showcase:** Dedicated sections for complex AI and software engineering case studies.
- **Modular Design:** Highly customizable sections built with semantic HTML5 and modern CSS3.
- **Optimized Performance:** Lightweight codebase with smooth AOS (Animate On Scroll) transitions.

---

## 🎨 Design System

The visual identity of this portfolio is built on a high-contrast, tech-forward palette:

### Color Palette
- **Primary:** `Emerald Green` (#10b981) — Used for core accents, buttons, and tech highlights.
- **Secondary:** `Cyan/Cyber Blue` (#06b6d4) — Used for highlights and typewriter text.
- **Background:** `Deep Onyx` (#050505) — Balanced with `Deep Purple` (#1a0f2c) glassmorphism layers.
- **Accents:** `Gold` (#ffd700) — Used for legacy sections and interactive hover states.

### Typography
- **Headings:** `Orbitron` — A geometric typeface designed for a futuristic, tech-centric feel.
- **Secondary Headings:** `Syne` — Bold, expressive accents.
- **Body Text:** `Outfit` — A clean, geometric sans-serif for high readability.

---

## 🛠️ Technical Deep Dive

### 🤖 Interactive Chatbot Logic
The chatbot is a custom-built widget located at the bottom-right. It features:
- **Draggable Interface:** Users can reposition the chat window by grabbing the header.
- **Backend Integration:** Communicates with a local server (`http://127.0.0.1:8000/chat`) via the Fetch API.
- **Dynamic UX:** Includes typing indicators and auto-scrolling message bubbles.

### 📐 3D Tilt & Glare Effects
Project cards utilize advanced JavaScript to calculate cursor position relative to the element center:
- **Perspective Tilt:** Rotates cards on X and Y axes based on mouse movement.
- **Dynamic Glare:** Synchronizes a glare overlay position with the cursor to simulate light reflection.
- **CSS Variables:** Real-time property updates (`--x`, `--y`) power the interactive glow.

### 🎭 Animation Framework
- **AOS (Animate On Scroll):** Powers the reveal animations for every section, providing a polished flow as the user scrolls.
- **CSS Transitions:** Cubic-bezier curves ensure all hover states and transitions feel smooth and organic.

---

## 📁 Project Structure

```text
├── index.html          # Main structure with semantic HTML5
├── style.css           # Comprehensive design system and layout logic
├── script.js           # Interactive UX, Chatbot, and 3D effects
├── chatbot.css         # Dedicated styling for the chat widget
├── assets/             # Project images and personal branding (root level)
└── README.md           # Documentation
```

---

## ⚙️ Local Development & Setup

### Prerequisites
- A modern web browser.
- (Optional) A backend server running on `port 8000` to handle chatbot queries.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Anzal-hussain-Anzal/AnzalHussainAnzalportfoli-main.git
   ```
2. Open `index.html` in your browser.

### Chatbot Configuration
To make the chatbot functional, ensure your backend provides a POST endpoint at `/chat` that accepts and returns JSON:
```json
{ "message": "user input" }
```
Returns:
```json
{ "reply": "AI response" }
```

---

## 🌟 Showcase Projects
- **MRI Alzheimer’s Classifier:** Vision Transformers for medical diagnosis (96.3% accuracy).
- **Sentiment-Aware Topical Chatbot:** NLP-driven empathetic response system.
- **Smart Road Turn Detector:** YOLOv8 real-time object detection.
- **Facial Emotion Detector:** CNN-based expression recognition.

---

## 📜 Credits & Resources
- **Icons:** FontAwesome v6.5.1
- **Animations:** [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- **Fonts:** Google Fonts (Orbitron, Outfit, Syne)
- **Design Inspiration:** Modern SaaS and AI product landing pages.

---

© 2024 Anzal Hussain Anzal. Built with passion for technology and art.