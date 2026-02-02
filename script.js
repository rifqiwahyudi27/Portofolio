// Toggle mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements to animate
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.skill-card, .education-card, .experience-card, .about-text p'
    );
    animatedElements.forEach(el => {
        el.classList.add('animate-init');
        observer.observe(el);
    });
});

// Add animation classes
const style = document.createElement('style');
style.innerHTML = `
    .animate-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Floating animation for profile circle */
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0px);
        }
    }

    .profile-circle {
        animation: float 6s ease-in-out infinite;
    }

    /* Highlight animation */
    @keyframes highlightEffect {
        0% {
            transform: scaleY(0.5);
        }
        100% {
            transform: scaleY(1);
        }
    }

    .highlight::after {
        animation: highlightEffect 2s infinite alternate;
    }

    /* Pulse animation for buttons */
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(78, 84, 200, 0.4);
        }
        70% {
            box-shadow: 0 0 0 15px rgba(78, 84, 200, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(78, 84, 200, 0);
        }
    }

    .btn-primary {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Function to send message to WhatsApp
function sendToWhatsApp() {
    // Get form values
    const name = document.getElementById('nama-lengkap').value;
    const email = document.getElementById('email-address').value;
    const message = document.getElementById('pesan-deskripsi').value;

    // Simple validation
    if (!name || !email || !message) {
        alert('Mohon lengkapi semua field formulir.');
        return;
    }

    // Format the message
    const whatsappMessage = `Halo Rifqi, saya ${name} (${email}).\n\n${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp with the pre-filled message
    // Using Indonesian phone number format without '+' or '00'
    window.open(`https://wa.me/6289662614044?text=${encodedMessage}`, '_blank');
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Call the WhatsApp function
        sendToWhatsApp();
    });
}

// Typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        typeWriter(heroTitle, originalText, 100);
    }
});

// Add particle background effect
function createParticles() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';

    // Create multiple particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
    }

    heroSection.appendChild(particleContainer);
}

// Add particle styles
const particleStyles = document.createElement('style');
particleStyles.innerHTML = `
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(78, 84, 200, 0.5);
        border-radius: 50%;
        animation: floatParticle 6s infinite ease-in-out;
    }

    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(20px, 20px);
        }
        50% {
            transform: translate(-20px, 20px);
        }
        75% {
            transform: translate(20px, -20px);
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles after DOM loads
document.addEventListener('DOMContentLoaded', createParticles);

// Add scroll progress indicator
function addScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    const progressStyle = document.createElement('style');
    progressStyle.innerHTML = `
        #progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #4e54c8, #8f94fb);
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyle);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });
}

// Initialize scroll progress indicator
document.addEventListener('DOMContentLoaded', addScrollProgressIndicator);