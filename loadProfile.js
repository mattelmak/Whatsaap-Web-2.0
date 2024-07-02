document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        const profileImageElements = document.querySelectorAll('#myProfileImage, #myProfileImageContacts, #myProfileImageInput, #myProfileImageNewMessage, #myProfileImageChat');
        
        profileImageElements.forEach(element => {
            element.src = userData.profileImage;
        });

        document.querySelector('.contact-message .nom').textContent = userData.username + ' (Moi)';
        document.querySelector('.profil-contact .nom').textContent = userData.username + ' (Moi)';
        document.getElementById('username').value = userData.username;
        document.getElementById('phoneNumber').value = userData.phone;
        document.querySelector('.contact-infos .nom').textContent = userData.username + ' (Moi)';
        document.getElementById('infos').value = userData.infos;
        document.querySelector('.contact-infos .infos').textContent = userData.infos;
    }
});
