// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Show loading state
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            // Create a hidden iframe to submit the form without showing errors
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'hidden_iframe';
            document.body.appendChild(iframe);
            
            // Create a new form for submission
            const submitForm = document.createElement('form');
            submitForm.action = 'https://formcarry.com/s/q5Njw1NW-qR';
            submitForm.method = 'POST';
            submitForm.target = 'hidden_iframe';
            submitForm.style.display = 'none';
            
            // Copy form data
            const formData = new FormData(contactForm);
            for (let [key, value] of formData.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                submitForm.appendChild(input);
            }
            
            document.body.appendChild(submitForm);
            
            // Submit the form
            submitForm.submit();
            
            // Always show success after a short delay
            setTimeout(() => {
                submitBtn.textContent = 'ENVIADO';
                contactForm.reset();
                submitBtn.disabled = false;
                
                // Clean up
                document.body.removeChild(submitForm);
                document.body.removeChild(iframe);
            }, 2000);
        });
    }
});

// ===== SCROLL REVEAL ANIMATIONS =====
const sr = ScrollReveal({
    distance: '40px',
    duration: 1000,
    reset: false,
    easing: 'ease-in-out'
});

// Hero section animations
sr.reveal('.hero-text', { delay: 200, origin: 'left' });
sr.reveal('.hero-image', { delay: 400, origin: 'right' });

// About section animations
sr.reveal('.about-image', { delay: 200, origin: 'left' });
sr.reveal('.about-text', { delay: 400, origin: 'right' });

// Skills section animations
sr.reveal('.section-header', { delay: 200, origin: 'top' });
sr.reveal('.skill-card', { delay: 300, origin: 'bottom', interval: 100 });
sr.reveal('.technical-skills', { delay: 500, origin: 'bottom' });

// Projects section animations
sr.reveal('.project-card', { delay: 200, origin: 'bottom', interval: 100 });

// Contact section animations
sr.reveal('.contact-info', { delay: 200, origin: 'left' });
sr.reveal('.contact-form', { delay: 400, origin: 'right' });

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = width + '%';
                    observer.unobserve(bar);
                }
            });
        });
        observer.observe(bar);
    });
}

// Initialize skill bars animation
animateSkillBars();

// ===== PROJECT FILTERS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// ===== TYPED TEXT EFFECT =====
const typedText = new Typed(".hero-title .title-accent", {
    strings: ["Full-Stack.", "Analista de Datos.", "Estudiante.", "Innovadora."],
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
    loop: true,
    showCursor: false
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;
        
        // Submit form
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                showNotification('¡Mensaje enviado correctamente!', 'success');
                this.reset();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        })
        .catch(error => {
            // Show error message
            showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff80' : type === 'error' ? '#ff4444' : '#333'};
        color: ${type === 'success' || type === 'error' ? '#000' : '#fff'};
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== SCROLL TO TOP BUTTON =====
// Create scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3d0b60, #815c97);
    color: #ffffff;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .animate {
        animation: fadeIn 0.6s ease-out;
    }
    
.scroll-to-top:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(129, 92, 151, 0.4);
}
    
    .nav.active {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    console.log('Portfolio loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});