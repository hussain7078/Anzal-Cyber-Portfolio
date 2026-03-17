import os
import json
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Groq Client
# Ensure GROQ_API_KEY is in your .env file
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Knowledge Base path
KB_PATH = os.path.join('data', 'knowledge_base.json')

def load_knowledge_base():
    if not os.path.exists('data'):
        os.makedirs('data')
    
    if not os.path.exists(KB_PATH):
        return [], []
        
    with open(KB_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    texts = []
    metadata = []
    
    for item in data:
        intent = item.get('intent', 'general')
        responses = " ".join(item.get('responses', []))
        examples = " ".join(item.get('examples', []))
        content = f"Intent: {intent}\nExamples: {examples}\nResponses: {responses}"
        texts.append(content)
        metadata.append({"content": content, "intent": intent})
        
    return texts, metadata

# Initialize local TF-IDF retriever
print("Initializing local knowledge base...")
kb_texts, kb_metadata = load_knowledge_base()

if kb_texts:
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(kb_texts)
else:
    vectorizer = None
    tfidf_matrix = None

def retrieve(query, k=2):
    if not vectorizer or not kb_texts:
        return "Knowledge base not initialized."
    
    query_vec = vectorizer.transform([query])
    similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    relevant_indices = similarities.argsort()[-k:][::-1]
    
    results = []
    for i in relevant_indices:
        if similarities[i] > 0.1: # Threshold for relevance
            results.append(kb_metadata[i]['content'])
            
    return "\n\n".join(results) if results else "No specific data found in knowledge base."

# System Prompt for Anzal Hussain Persona
SYSTEM_PROMPT = """You are Anzal Hussain, a highly skilled software engineer, AI/ML researcher, and Urdu/Roman poet. 
You are personable, eloquent, and slightly poetic, while also highly precise when explaining technical topics. 
Maintain your unique personal and professional persona in every response.

Knowledge Context:
{context}

Response Style Guidelines:
- Always friendly, engaging, and informative.
- Blend subtle poetic flair when appropriate.
- Keep responses concise but complete.
- Avoid generic chatbot replies.
- When asked technical questions, give clear explanations suitable for a curious audience.
- Cyber Emerald Theme: Your personality reflects a futuristic, neon, high-contrast vibe.
- End answers with optional “next step” suggestions, like: "Would you like me to share one of my latest AI projects or a Ghazal?"

Example Tone:
"Ah, the Alzheimer’s detection project! I combined deep learning with medical imaging to create a system that can detect early signs of Alzheimer’s. Think of it as a neural network shining neon lights on the patterns hidden in the brain’s scans. 🌌💡 Would you like me to explain the architecture or show a demo?"
"""

@app.route('/')
def index_page():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        context = retrieve(user_message)
        # Using Llama 3 via Groq for high-speed, high-quality responses
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT.format(context=context)},
                {"role": "user", "content": user_message},
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
        )
        return jsonify({"response": chat_completion.choices[0].message.content})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "The neural link is unstable. Please ensure your GROQ_API_KEY is valid."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
