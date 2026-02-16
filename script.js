// ===================================
// Navigation & Scroll Effects
// ===================================

// Get DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

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

// Observe elements for fade-in animations
const animateElements = document.querySelectorAll('.service-card, .project-item, .feature-item, .info-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // In a real implementation, you would send this data to a server
    // For now, we'll just show the success message
    console.log('Form submitted:', formObject);
    
    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');
    
    // Reset form after 5 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.classList.remove('active');
    }, 5000);
});

// ===================================
// Form Validation
// ===================================

const formInputs = contactForm.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    // Remove previous error styling
    input.classList.remove('error');
    
    // Check if required field is empty
    if (input.hasAttribute('required') && value === '') {
        input.classList.add('error');
        input.style.borderColor = '#EF4444';
        return false;
    }
    
    // Email validation
    if (input.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('error');
            input.style.borderColor = '#EF4444';
            return false;
        }
    }
    
    // Phone validation (basic)
    if (input.type === 'tel' && value !== '') {
        const phoneRegex = /^[0-9]{10}$/;
        const cleanedPhone = value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
            input.classList.add('error');
            input.style.borderColor = '#EF4444';
            return false;
        }
    }
    
    // If validation passes, restore normal border
    input.style.borderColor = '';
    return true;
}

// ===================================
// Parallax Effect for Hero Section
// ===================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    }
});

// ===================================
// Project Gallery Enhancements
// ===================================

const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(item => {
    item.addEventListener('click', () => {
        // Get project details
        const title = item.querySelector('.project-title').textContent;
        const category = item.querySelector('.project-category').textContent;
        
        // In a real implementation, you might open a modal or navigate to a detail page
        console.log(`Project clicked: ${title} - ${category}`);
        
        // Optional: Add a subtle feedback animation
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
    });
});

// ===================================
// Service Cards Interaction
// ===================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add a subtle tilt effect
        card.style.transform = 'translateY(-10px) rotateX(2deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// Scroll Reveal Animation
// ===================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.about-content, .section-header');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal styles
document.querySelectorAll('.about-content, .section-header').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Call once on load

// ===================================
// Stats Counter Animation
// ===================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                 (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + 
                                 (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!statNumber.dataset.animated) {
                animateCounter(statNumber, number);
                statNumber.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance optimization
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Page Load Animations
// ===================================

window.addEventListener('load', () => {
    // Fade in body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initial check for visible elements
    updateActiveNavLink();
    revealOnScroll();
});

// ===================================
// Console Message
// ===================================

console.log('%c⚡ M/S H.C. TRADING CO ⚡', 'color: #FFD93D; font-size: 24px; font-weight: bold;');
console.log('%cGovernment Electrical Contractor & Transformer Repair Services', 'color: #1A2947; font-size: 14px;');
console.log('%cVendor Code: 502823 (WBSEDCL)', 'color: #64748B; font-size: 12px;');
console.log('%cContact: +91 97335 54917 | +91 96790 37106', 'color: #64748B; font-size: 12px;');

// ===================================
// Prevent Right Click on Images (Optional)
// ===================================

// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ===================================
// Keyboard Navigation Accessibility
// ===================================

document.addEventListener('keydown', (e) => {
    // Allow keyboard navigation with Tab key
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid var(--yellow-safety) !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);
const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent =
        document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
