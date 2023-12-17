document.addEventListener('DOMContentLoaded', function () {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    let botResponses = {};

    fetch('respostes.json')
        .then(response => response.json())
        .then(data => {
            botResponses = data;
            displayMessage('bot', "Hola! Sóc l'assistent virtual de SexED+. En que puc ajudar-te avui?", 'bold');
        })
        .catch(error => console.error('Error al cargar las respuestas del bot:', error));
    
    // Evento para enviar mensaje al hacer click
        document.querySelector('button').addEventListener('click', function () {
        sendMessage();
    });
    // Evento para enviar mensaje al presionar Enter
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;
        userInput.value = '';

        displayMessage('user', userMessage, 'normal');

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            displayMessage('bot', botResponse, 'bold');
            userInput.value = '';
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }, 1000); // Ajuste del tiempo de espera
    }

    function displayMessage(sender, message, fontWeight) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender, 'message-animation');
        messageElement.style.fontWeight = fontWeight;
        messageElement.textContent = message;
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function getBotResponse(userMessage) {
        for (const entry of botResponses.preguntes_frequents) {
            if (entry.paraules_clau.some(keyword => userMessage.includes(keyword))) {
                return entry.resposta;
            }
        }
        return "Perdona no entenc la teva pregunta. Recorda que res és més fiable que la resposta d'un expert. Pots trobar els centres especialitzats més pròxims en la web.";
    }
});

// Estilo para la animación
const style = document.createElement('style');
style.innerHTML = `
    .message-animation {
        opacity: 0;
        animation: fadeIn 0.5s forwards;
    }

    @keyframes fadeIn {
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);