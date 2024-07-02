document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const profileImageInput = document.getElementById('profileImage');
    const coverImage = document.getElementById('coverImage');
    
    profileImageInput.onchange = function() {
        coverImage.src = URL.createObjectURL(profileImageInput.files[0]);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('registerUsername').value;
            const phone = document.getElementById('registerPhone').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas !");
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const profileImage = e.target.result;

                const userData = {
                    username,
                    phone,
                    password,
                    profileImage,
                    infos
                };

                localStorage.setItem('userData', JSON.stringify(userData));
                window.location.href = 'chat.html';
            };

            if (profileImageInput.files[0]) {
                reader.readAsDataURL(profileImageInput.files[0]);
            } else {
                alert("Veuillez ajouter une photo de profil !");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const phone = document.getElementById('loginPhone').value;
            const password = document.getElementById('loginPassword').value;

            const userData = JSON.parse(localStorage.getItem('userData'));

            if (userData && userData.phone === phone && userData.password === password) {
                window.location.href = 'chat.html';
            } else {
                alert("Numéro de téléphone ou mot de passe incorrect !");
            }
        });
    }
});

changeCover = () => {
    document.getElementById('profileImage').click();
}
