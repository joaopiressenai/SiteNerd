document.addEventListener('DOMContentLoaded', function () {
    const darkThemeButton = document.querySelector('.dark-theme');
    const lightThemeButton = document.querySelector('.light-theme');
    const userButton = document.querySelector('.theme-toggle a');
    const footer = document.querySelector('footer');
    const cards = document.querySelectorAll('.card');
    const faqItems = document.querySelectorAll('.accordion-item');
    const sobreNerdGoal = document.querySelector('.sobre-nerdgoal');

    function changeTheme(theme) {
        // Altera a cor dos cards
        cards.forEach(card => {
            if (theme === 'dark') {
                card.classList.add('dark-mode');
                card.classList.remove('light-mode');
            } else {
                card.classList.add('light-mode');
                card.classList.remove('dark-mode');
            }
        });

        // Altera a cor do segundo navbar
        if (theme === 'dark') {
            filterNavbar.classList.add('bg-dark');
            filterNavbar.classList.remove('bg-light');
        } else {
            filterNavbar.classList.add('bg-light');
            filterNavbar.classList.remove('bg-dark');
        }

        // Altera a cor dos cards
        cards.forEach(card => {
            if (theme === 'dark') {
                card.classList.add('dark-theme');
                card.classList.remove('light-theme');
                card.style.color = 'white'; // Define a cor da fonte para branco
            } else {
                card.classList.add('light-theme');
                card.classList.remove('dark-theme');
                card.style.color = 'black'; // Define a cor da fonte para preto
            }
        });

        // Altera a cor do segundo navbar
        if (theme === 'dark') {
            filterNavbar.classList.add('bg-dark');
            filterNavbar.classList.remove('bg-light');
        } else {
            filterNavbar.classList.add('bg-light');
            filterNavbar.classList.remove('bg-dark');
        }
    }

    darkThemeButton.addEventListener('click', function () {
        const navbar = document.querySelector('.navbar');
        navbar.setAttribute('data-bs-theme', 'dark');
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
        navbar.style.backgroundColor = '#000'; // Define a cor de fundo para preto
        navbar.style.color = 'white'; // Define a cor do texto para branco
        userButton.innerHTML = '<img src="assets/img/userDark.png" width="30px" height="30px" alt="User">';
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        footer.classList.add('dark-mode');
        footer.classList.remove('light-mode');
        sobreNerdGoal.classList.add('dark-mode');
        sobreNerdGoal.classList.remove('light-mode');
        changeTheme('dark');
    });

    lightThemeButton.addEventListener('click', function () {
        const navbar = document.querySelector('.navbar');
        navbar.setAttribute('data-bs-theme', 'light');
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
        navbar.style.backgroundColor = '#fff'; // Define a cor de fundo para branco
        navbar.style.color = 'black'; // Define a cor do texto para preto
        userButton.innerHTML = '<img src="assets/img/userLight.png" width="30px" height="30px" alt="User">';
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        footer.classList.add('light-mode');
        footer.classList.remove('dark-mode');
        sobreNerdGoal.classList.add('light-mode');
        sobreNerdGoal.classList.remove('dark-mode');
        changeTheme('light');
    });
});