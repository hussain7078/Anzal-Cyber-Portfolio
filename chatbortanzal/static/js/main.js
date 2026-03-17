document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const suggestions = document.getElementById('suggestions');

    // Smooth scroll to bottom
    const scrollToBottom = () => {
        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Add message to window
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`, 'floating-card');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);
        scrollToBottom();
        
        // Add tilt effect on mouse move
        messageDiv.addEventListener('mousemove', (e) => {
            const rect = messageDiv.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            messageDiv.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        messageDiv.addEventListener('mouseleave', () => {
            messageDiv.style.transform = '';
        });
    };

    // Show typing indicator
    const showTyping = () => {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.classList.add('message', 'assistant-message', 'typing-indicator');
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatWindow.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    };

    // Send message to server
    const sendMessage = async (message) => {
        if (!message.trim()) return;

        addMessage(message, 'user');
        userInput.value = '';
        
        const typingIndicator = showTyping();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            const data = await response.json();
            typingIndicator.remove();

            if (data.response) {
                addMessage(data.response, 'assistant');
            } else {
                addMessage("Neural link disrupted. Error: " + (data.error || "Unknown"), 'assistant');
            }
        } catch (error) {
            typingIndicator.remove();
            addMessage("Neural link failure. Connection lost to the Cyber Emerald grid.", 'assistant');
        }
    };

    // Event Listeners
    sendBtn.addEventListener('click', () => sendMessage(userInput.value));

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(userInput.value);
    });

    suggestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-chip')) {
            sendMessage(e.target.textContent);
        }
    });

    // Initial greeting animation delay
    setTimeout(() => {
        scrollToBottom();
    }, 500);
});
