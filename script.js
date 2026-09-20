document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. NAVEGACIÓN ACTIVA AL HACER SCROLL
    =================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    });

    /* ===================================================
       2. MANEJO INTERACTIVO DEL FORMULARIO DE CONTACTO
    =================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const btnSubmit = document.getElementById('btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Enviando...';
            formStatus.textContent = '';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = 'var(--green)';
                    formStatus.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar');
                }
            } catch (error) {
                formStatus.style.color = '#ef4444';
                formStatus.textContent = 'Ocurrió un problema al enviar. Intenta nuevamente.';
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.textContent = 'Enviar mensaje';
            }
        });
    }

});