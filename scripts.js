document.addEventListener('DOMContentLoaded', function () {
    const toggleDarkModeButton = document.querySelectorAll('#toggle-dark-mode, #toggle-dark-mode-chat');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const micButton = document.getElementById('mic-button');
    const chatBody = document.getElementById('chat-body');
    const deconnecterButton = document.getElementById('deconnexion');
    const sidebarMenuToggle = document.getElementById('sidebar-menu-toggle');
    const chatMenuToggle = document.getElementById('chat-menu-toggle');
    const profileImage = document.getElementById('myProfileImage');
    const openProfileIcon = document.getElementById('myProfileImageChat');
    const openStatusIcon = document.getElementById('open-status');
    const openMessageIcon = document.getElementById('open-message');
    const retourProfileIcon = document.getElementById('retour-profile');
    const retourStatusIcon = document.getElementById('retour-status');
    const retourMessageIcon = document.getElementById('retour-message');
    const penNomButton = document.getElementById('penNom');
    const checkNomButton = document.getElementById('checkNom');
    const penInfosButton = document.getElementById('penInfos');
    const checkInfosButton = document.getElementById('checkInfos');
    const usernameInput = document.getElementById('username');
    const infosInput = document.getElementById('infos');
    const profileImageInput = document.getElementById('profileImageInput');
    const myProfileImageContacts = document.getElementById('myProfileImageContacts');
    const myProfileImageInput = document.getElementById('myProfileImageInput');
    const myProfileImageNewMessage = document.getElementById('myProfileImageNewMessage');

    // Activer / désactiver dark mode
    toggleDarkModeButton.forEach(button => {
        button.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
        });
    });

    // Deconnexion
    deconnecterButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // Envoie message par click
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

    // Envoie message par entrer
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    // Permuter bouton micro / envoyer
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

    // Creer un message
    function createMessageElement(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.innerHTML = `<p>${text}<br><span>${getCurrentTime()}</span></p>`;
        return messageElement;
    }

    // Obtenir l'heure actuelle
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Mettre à jour le dernier message dans le sidebar
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

            // Marquer comme lu
            timeElement.style.color = 'var(--txtColor2)';
            if (unreadBadge) {
                unreadBadge.remove();
            }
        }
    }

    // Sidebar menu permutation
    sidebarMenuToggle.addEventListener('click', function () {
        document.getElementById('sidebar-menu').classList.toggle('visible');
    });

    // Chat menu permutation
    chatMenuToggle.addEventListener('click', function () {
        document.getElementById('chat-menu').classList.toggle('visible');
    });

    // Masquer le menu en cliquant en dehors
    document.addEventListener('click', function (event) {
        if (!event.target.closest('#sidebar-menu') && !event.target.closest('#sidebar-menu-toggle')) {
            document.getElementById('sidebar-menu').classList.remove('visible');
        }
        if (!event.target.closest('#chat-menu') && !event.target.closest('#chat-menu-toggle')) {
            document.getElementById('chat-menu').classList.remove('visible');
        }
    });

    // Afficher le message de bienvenue
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

    // Afficher le message de bienvenue au chargement
    displayWelcomeMessage();

    // Profile Modification
    profileImageInput.addEventListener('change', function () {
        const reader = new FileReader();
        reader.onload = function(e) {
            myProfileImageInput.src = e.target.result;
            profileImage.src = e.target.result;
            myProfileImageContacts.src = e.target.result;
            openProfileIcon.src = e.target.result;
            myProfileImageNewMessage.src = e.target.result;

            let userData = JSON.parse(localStorage.getItem('userData')) || {};
            userData.profileImage = e.target.result;
            localStorage.setItem('userData', JSON.stringify(userData));
        };
        reader.readAsDataURL(this.files[0]);
    });

    usernameInput.addEventListener('input', function () {
        let userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData.username = this.value;
        document.querySelector('.contact-message .nom').textContent = this.value + ' (Moi)';
        document.querySelector('.profil-contact .nom').textContent = this.value + ' (Moi)';
        document.querySelector('.contact-infos .nom').textContent = this.value + ' (Moi)';
        localStorage.setItem('userData', JSON.stringify(userData));
        updateCharCount(usernameInput);
    });

    infosInput.addEventListener('input', function () {
        let userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData.infos = this.value;
        document.querySelector('.contact-infos .infos').textContent = this.value;
        localStorage.setItem('userData', JSON.stringify(userData));
        updateCharCount(infosInput);
    });

    // Ouvrir / fermer les onglets
    openProfileIcon.addEventListener('click', openProfile);
    profileImage.addEventListener('click', openProfile);
    openStatusIcon.addEventListener('click', openStatus);
    openMessageIcon.addEventListener('click', openMessage);
    retourProfileIcon.addEventListener('click', retour);
    retourStatusIcon.addEventListener('click', retour);
    retourMessageIcon.addEventListener('click', retour);

    function openProfile() {
        document.querySelector('.contacts').style.display = 'none';
        document.querySelector('.profile').style.display = 'block';
    }

    function openStatus() {
        document.querySelector('.contacts').style.display = 'none';
        document.querySelector('.statuts').style.display = 'block';
    }

    function openMessage() {
        document.querySelector('.contacts').style.display = 'none';
        document.querySelector('.nouveau-message').style.display = 'block';
    }

    function retour() {
        const inputNom = document.getElementById('username');
        inputNom.disabled = true;
        const inputInfos = document.getElementById('infos');
        inputInfos.disabled = true;
        document.querySelector('.contacts').style.display = 'block';
        document.querySelector('.profile').style.display = 'none';
        document.querySelector('.statuts').style.display = 'none';
        document.querySelector('.nouveau-message').style.display = 'none';
        checkNomButton.style.display = 'none';
        penNomButton.style.display = 'block';
        checkInfosButton.style.display = 'none';
        penInfosButton.style.display = 'block';
        document.querySelector('.char-count-nom').style.display = 'none';
        document.querySelector('.char-count-infos').style.display = 'none';
    }

    // Modifier Nom and Infos
    penNomButton.addEventListener('click', function() {
        modifierNom(usernameInput, penNomButton, checkNomButton);
    });

    checkNomButton.addEventListener('click', function() {
        desactiverNom();
    });

    penInfosButton.addEventListener('click', function() {
        modifierInfos(infosInput, penInfosButton, checkInfosButton);
    });

    checkInfosButton.addEventListener('click', function() {
        desactiverInfos();
    });

    usernameInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            desactiverNom();
        }
    });

    infosInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            desactiverInfos();
        }
    });

    function modifierNom(inputElement, penButton, checkButton) {
        inputElement.disabled = false;
        inputElement.focus();
        penButton.style.display = 'none';
        checkButton.style.display = 'block';
        document.querySelector('.char-count-nom').style.display = 'block';
        updateCharCount(inputElement);
    }

    function desactiverNom() {
        usernameInput.disabled = true;
        checkNomButton.style.display = 'none';
        penNomButton.style.display = 'block';
        document.querySelector('.char-count-nom').style.display = 'none';
    }

    function modifierInfos(inputElement, penButton, checkButton) {
        inputElement.disabled = false;
        inputElement.focus();
        penButton.style.display = 'none';
        checkButton.style.display = 'block';
        document.querySelector('.char-count-infos').style.display = 'block';
        updateCharCount(inputElement);
    }

    function desactiverInfos() {
        infosInput.disabled = true;
        checkInfosButton.style.display = 'none';
        penInfosButton.style.display = 'block';
        document.querySelector('.char-count-infos').style.display = 'none';
    }

    // Mettre à jour le compteur de caractères
    function updateCharCount(inputElement) {
        const maxLength = inputElement.maxLength;
        const currentLength = inputElement.value.length;
        const charCountElement = inputElement.nextElementSibling;
        if (charCountElement) {
            charCountElement.textContent = `${currentLength} / ${maxLength}`;
        }
    }
});
