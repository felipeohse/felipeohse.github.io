document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    menuToggle.addEventListener('click', function () {
        navbarLinks.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (nome === '' || email === '' || mensagem === '') {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        alert('Formulário enviado com sucesso!');
        form.submit();
    });
});