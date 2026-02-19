// Online counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// Initialize counters on page load
window.addEventListener('DOMContentLoaded', () => {
    const onlineElement = document.getElementById('onlinePlayers');
    const opsElement = document.getElementById('activeOps');
    
    if (onlineElement) animateCounter(onlineElement, 847);
    if (opsElement) animateCounter(opsElement, 12);
});

// Copy server IP to clipboard
function copyIP(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        alert('Адрес сервера скопирован: ' + ip);
    }).catch(err => {
        console.error('Ошибка копирования:', err);
    });
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// Faction selection
function selectFaction(faction) {
    alert('Вы выбрали фракцию: ' + faction.toUpperCase() + '\n\nСкачайте лаунчер и начните службу!');
}

// Smooth scrolling for anchor links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(45, 80, 22, 0.5)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(10, 14, 10, 0.95) 0%, rgba(20, 26, 20, 0.9) 100%)';
        navbar.style.boxShadow = '0 4px 20px rgba(45, 80, 22, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .faction-card, .pricing-card, .step-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});