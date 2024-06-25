document.addEventListener('DOMContentLoaded', function () {
    const themeLink = document.getElementById('theme-link');
    const toggleDarkModeButtons = document.querySelectorAll('#toggle-dark-mode, #toggle-dark-mode-chat');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const micButton = document.getElementById('mic-button');
    const chatBody = document.getElementById('chat-body');

    // Toggle dark mode
    toggleDarkModeButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (themeLink.getAttribute('href') === 'light-mode.css') {
                themeLink.setAttribute('href', 'dark-mode.css');
            } else {
                themeLink.setAttribute('href', 'light-mode.css');
            }
        });
    });

    // Send message on button click
    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value;
        if (messageText.trim() !== '') {
            const messageElement = createMessageElement(messageText, 'envoye');
            chatBody.appendChild(messageElement);
            updateLastMessage('Contact 1', messageText, getCurrentTime());
            messageInput.value = '';
            messageElement.scrollIntoView({ behavior: 'smooth' });
            toggleMicSendButton();
        }
    });

    // Send message on Enter key press
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    // Toggle mic/send button
    messageInput.addEventListener('input', function () {
        toggleMicSendButton();
    });

    function toggleMicSendButton() {
        if (messageInput.value.trim() !== '') {
            micButton.style.display = 'none';
            sendButton.style.display = 'inline';
        } else {
            micButton.style.display = 'inline';
            sendButton.style.display = 'none';
        }
    }

    // Create a message element
    function createMessageElement(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.innerHTML = `<p>${text}<br><span>${getCurrentTime()}</span></p>`;
        return messageElement;
    }

    // Get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Update last message in sidebar
    function updateLastMessage(contactName, messageText, time) {
        const contactElement = Array.from(document.querySelectorAll('.contact')).find(contact => 
            contact.querySelector('.nom').textContent.trim() === contactName
        );
        if (contactElement) {
            const lastMessageElement = contactElement.querySelector('.dernier-message p');
            const timeElement = contactElement.querySelector('.nom-heure .heure');
            const unreadBadge = contactElement.querySelector('.dernier-message b');

            lastMessageElement.textContent = messageText;
            timeElement.textContent = time;

            // Mark as read
            timeElement.style.color = '#7f7f7f';
            if (unreadBadge) {
                unreadBadge.remove();
            }
        }
    }

    // Sidebar menu toggle
    document.getElementById('sidebar-menu-toggle').addEventListener('click', function () {
        document.getElementById('sidebar-menu').classList.toggle('visible');
    });

    // Chat menu toggle
    document.getElementById('chat-menu-toggle').addEventListener('click', function () {
        document.getElementById('chat-menu').classList.toggle('visible');
    });

    // Hide menus when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('#sidebar-menu') && !event.target.closest('#sidebar-menu-toggle')) {
            document.getElementById('sidebar-menu').classList.remove('visible');
        }
        if (!event.target.closest('#chat-menu') && !event.target.closest('#chat-menu-toggle')) {
            document.getElementById('chat-menu').classList.remove('visible');
        }
    });

    // Display welcome message on page load
    function displayWelcomeMessage() {
        const hours = new Date().getHours();
        const isDayTime = hours >= 6 && hours < 18;
        const welcomeText = isDayTime 
            ? "Bonjour, bienvenue dans Whatsapp Web 2.0 !" 
            : "Bonsoir, bienvenue dans Whatsapp Web 2.0 !";
        const messageElement = createMessageElement(welcomeText, 'recu');
        chatBody.appendChild(messageElement);
        updateLastMessage('Contact 1', welcomeText, getCurrentTime());
        messageElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Show welcome message on load
    displayWelcomeMessage();
});
