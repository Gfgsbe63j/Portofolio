// ===================================
// Preloader
// ===================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// ===================================
// Dark Mode Toggle
// ===================================

const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        localStorage.setItem('darkMode', null);
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
});

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Sticky CTA Bar
// ===================================

const stickyCtaBar = document.getElementById('sticky-cta-bar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 1500 && window.pageYOffset < document.body.scrollHeight - 1500) {
        stickyCtaBar.classList.add('show');
    } else {
        stickyCtaBar.classList.remove('show');
    }
});

// ===================================
// Active Navigation Link
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// Hero Stats Counter
// ===================================

const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const updateCounter = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(updateCounter);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, stepTime);
    });

    countersAnimated = true;
}

// Trigger counter animation when hero is visible
const hero = document.querySelector('.hero');
if (hero) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(hero);
}

// ===================================
// Skills Progress Bars Animation
// ===================================

const skillsSection = document.getElementById('skills');

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
}

// ===================================
// Portfolio Filter
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===================================
// Portfolio Modal
// ===================================

const modal = document.getElementById('portfolio-modal');
const modalClose = document.getElementById('modal-close');
const viewDetailsButtons = document.querySelectorAll('.view-details');

const projectData = {
    restaurant: {
        title: 'Local Restaurant Website',
        description: 'A complete redesign and development of a local restaurant\'s online presence with integrated online ordering system.',
        client: 'The Local Bistro',
        industry: 'Food & Beverage',
        tech: 'HTML, CSS, JavaScript, PHP',
        timeline: '6 weeks',
        results: [
            '40% increase in online orders',
            '50% improvement in page load speed',
            'Mobile-friendly responsive design',
            'Integrated payment system',
            'Real-time order tracking'
        ]
    },
    fitness: {
        title: 'Fitness Center Website',
        description: 'Modern website with class booking system and membership management for a local fitness center.',
        client: 'PowerFit Gym',
        industry: 'Health & Fitness',
        tech: 'React, Node.js, MongoDB',
        timeline: '8 weeks',
        results: [
            '100% increase in online bookings',
            'Streamlined membership management',
            'Integrated class scheduling',
            'Member portal with progress tracking',
            'Mobile app integration'
        ]
    },
    salon: {
        title: 'Salon & Spa Website',
        description: 'Elegant website with appointment scheduling system for a premium salon and spa.',
        client: 'Serenity Spa',
        industry: 'Beauty & Wellness',
        tech: 'WordPress, WooCommerce',
        timeline: '4 weeks',
        results: [
            '60% reduction in phone bookings',
            'Automated appointment reminders',
            'Online product sales increased',
            'Customer loyalty program integration',
            'Social media integration'
        ]
    },
    contractor: {
        title: 'Contractor Services Website',
        description: 'Professional website showcasing completed projects with an interactive gallery and quote request system.',
        client: 'Thompson Construction',
        industry: 'Construction',
        tech: 'HTML, CSS, JavaScript',
        timeline: '5 weeks',
        results: [
            '75% more quote requests',
            'Professional project showcase',
            'Customer testimonials integration',
            'Before/after photo gallery',
            'Service area mapping'
        ]
    },
    boutique: {
        title: 'Boutique E-Commerce Site',
        description: 'Full-featured e-commerce solution with inventory management and secure checkout.',
        client: 'Chic Boutique',
        industry: 'Retail Fashion',
        tech: 'Shopify, Liquid, JavaScript',
        timeline: '10 weeks',
        results: [
            '200% increase in online sales',
            'Real-time inventory sync',
            'Abandoned cart recovery',
            'Customer wishlist feature',
            'Multi-channel selling integration'
        ]
    },
    dental: {
        title: 'Dental Practice Website',
        description: 'Clean, modern website for a dental practice with patient portal and online appointment booking.',
        client: 'Smile Dental Care',
        industry: 'Healthcare',
        tech: 'HTML, CSS, JavaScript, PHP',
        timeline: '6 weeks',
        results: [
            '45% more new patient bookings',
            'Secure patient portal',
            'Insurance verification system',
            'Educational content library',
            'HIPAA-compliant forms'
        ]
    }
};

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const project = button.getAttribute('data-project');
        const data = projectData[project];

        if (data) {
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-description').textContent = data.description;
            document.getElementById('modal-client').textContent = data.client;
            document.getElementById('modal-industry').textContent = data.industry;
            document.getElementById('modal-tech').textContent = data.tech;
            document.getElementById('modal-timeline').textContent = data.timeline;

            const resultsList = document.getElementById('modal-results');
            resultsList.innerHTML = data.results.map(result => `<li>${result}</li>`).join('');

            modal.classList.add('active');
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// ===================================
// Testimonial Carousel
// ===================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselDots = document.getElementById('carousel-dots');

let currentTestimonial = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    carouselDots.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

carouselNext.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
});

carouselPrev.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ===================================
// FAQ Accordion
// ===================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// Back to Top Button
// ===================================

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Floating Contact Button & Chat Widget
// ===================================

const floatingContactBtn = document.getElementById('floating-contact');
const chatWidget = document.getElementById('chat-widget');
const chatClose = document.getElementById('chat-close');

floatingContactBtn.addEventListener('click', () => {
    chatWidget.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('active');
});

// Chat option buttons
const chatOptions = document.querySelectorAll('.chat-option');
chatOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Handle chat option click - in production, this would trigger appropriate action
        const optionText = option.textContent;
        if (optionText.includes('quote')) {
            chatWidget.classList.remove('active');
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        } else if (optionText.includes('services')) {
            chatWidget.classList.remove('active');
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// Cookie Consent Banner
// ===================================

const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
const declineCookies = document.getElementById('decline-cookies');

// Check if user has already made a choice
const cookieConsent = localStorage.getItem('cookieConsent');

if (!cookieConsent) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.remove('show');
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.classList.remove('show');
});

// ===================================
// Newsletter Form
// ===================================

const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const submitBtn = newsletterForm.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert('Thank you for subscribing! Check your email for confirmation.');
    newsletterForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Subscribe';

    console.log('Newsletter subscription:', email);
});

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // Validate form
    if (!data.name || !data.email || !data.service || !data.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    try {
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        showMessage('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        console.log('Form submitted:', data);

    } catch (error) {
        showMessage('Oops! Something went wrong. Please try again later.', 'error');

        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===================================
// Scroll Animations
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

const animateOnScroll = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-content, .pricing-card, .achievement-card, .case-study-card, .blog-card, .resource-card');

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Stats Counter Animation
// ===================================

const stats = document.querySelectorAll('.stat h4');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const aboutSection = document.getElementById('about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (aboutPosition < screenPosition) {
        stats.forEach(stat => {
            const originalText = stat.textContent;
            const hasPlus = originalText.includes('+');
            const target = parseInt(originalText);
            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = originalText;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }
            }, stepTime);
        });

        statsAnimated = true;
    }
}

window.addEventListener('scroll', animateStats);

// ===================================
// Scroll Progress Indicator
// ===================================

const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
    z-index: 9999;
    transition: width 0.2s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===================================
// Service Cards Hover Effect Enhancement
// ===================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Initialize
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');

    // Set first nav link as active on load
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    // Dynamic year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});

// ===================================
// Performance: Lazy Loading Images
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Portfolio Item Animation on Load
// ===================================

const portfolioItemsList = document.querySelectorAll('.portfolio-item');

portfolioItemsList.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// Form Field Validation Indicators
// ===================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = 'var(--success-color)';
        } else if (input.hasAttribute('required')) {
            input.style.borderColor = 'var(--error-color)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});
