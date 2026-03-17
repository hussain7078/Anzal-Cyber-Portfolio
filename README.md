# Anzal Hussain - Cyber Emerald Portfolio & AI Interface 🌌

A premium, high-performance personal portfolio built with **Flask**, **Groq AI (Llama 3.3)**, and **RAG (Retrieval Augmented Generation)**.

## 🚀 Key Features
- **Cyber Emerald Theme**: Modern UI with glassmorphism, 3D tilt effects, and neon glows.
- **AI Neural Interface**: A full-page and mini-widget chatbot with memory, markdown support, and RAG.
- **Project Showcase**: Advanced 3D interaction cards linked to GitHub.
- **Contact System**: Built-in neural contact form with SMTP email and terminal logging fallbacks.

## 📁 Project Structure
- `app.py`: Flask backend with AI and Mail logic.
- `static/`: All CSS, JS, and image assets.
- `templates/`: HTML structures for portfolio and chat.
- `data/`: Local Knowledge Base for RAG.

## 🛠️ Setup
1. Clone the repository.
2. Install requirements: `pip install -r requirements.txt`.
3. Add your `GROQ_API_KEY` to a `.env` file.
4. Run the engine: `python app.py`.

## 📡 Deployment
Connect your SMTP credentials in `.env` for real-time email alerts from the contact form.
