// ===================================
// KITAMARU-INSPIRED INTERACTIVE FEATURES
// Modern Portfolio Enhancements - 2024
// ===================================

// ===================================
// 1. Custom Magnetic Cursor
// ===================================
(function initCursor() {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth following for dot
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;

        // Smooth following for ring (slower)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('link-hover');
            cursorRing.classList.add('link-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('link-hover');
            cursorRing.classList.remove('link-hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('active');
        cursorRing.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('active');
        cursorRing.classList.remove('active');
    });
})();

// ===================================
// 2. Magnetic Buttons
// ===================================
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic, .btn-magnetic, .btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);

            if (distance < maxDistance) {
                const angle = Math.atan2(y, x);
                const strength = Math.min(distance / maxDistance, 0.3);
                const offsetX = Math.cos(angle) * strength * 20;
                const offsetY = Math.sin(angle) * strength * 20;

                this.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// ===================================
// 3. 3D Tilt Effect
// ===================================
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card, .service-card, .portfolio-item, .pricing-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.setProperty('--tilt-x', `${rotateX}deg`);
            this.style.setProperty('--tilt-y', `${rotateY}deg`);
            this.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            this.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            if (!this.classList.contains('tilt-card')) {
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--tilt-x', '0deg');
            this.style.setProperty('--tilt-y', '0deg');
            if (!this.classList.contains('tilt-card')) {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            }
        });
    });
}

// ===================================
// 4. Scroll Reveal Animations
// ===================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .service-card, .portfolio-item, .pricing-card, .testimonial-card, .skill-item');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ===================================
// 5. Parallax Effect
// ===================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .morph-shape, .hero-gradient-blob');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===================================
// 6. Smooth Scroll with Offset
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 7. Animated Counter
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCountersOnScroll = () => {
        if (animated) return;

        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                animated = true;
            }
        });
    };

    window.addEventListener('scroll', animateCountersOnScroll);
    animateCountersOnScroll();
}

// ===================================
// 8. Split Text Animation
// ===================================
function initSplitText() {
    const splitTexts = document.querySelectorAll('.split-text');

    splitTexts.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.03}s`;
            element.appendChild(span);
        });

        // Trigger animation
        setTimeout(() => {
            element.classList.add('animate');
        }, 100);
    });
}

// ===================================
// 9. Enhanced Portfolio Filter
// ===================================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// 10. Intersection Observer for Animations
// ===================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .testimonial-card, .pricing-card, .achievement-card, .blog-card, .resource-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// 11. Page Load Animation
// ===================================
function initPageLoadAnimation() {
    // Add entrance animations to key elements
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }

    // Stagger animation for nav items
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// ===================================
// 12. Form Enhancement
// ===================================
function enhanceForms() {
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Ripple effect on click
        input.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.parentElement.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===================================
// 13. Scroll Progress Indicator
// ===================================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10000;
        transition: width 0.1s ease;
        width: 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===================================
// 14. Card Hover Sound (Optional)
// ===================================
function initHoverSounds() {
    // You can add subtle sounds on hover for enhanced UX
    // This is optional and requires audio files
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Optional: Play subtle hover sound
            // const audio = new Audio('path/to/hover-sound.mp3');
            // audio.volume = 0.1;
            // audio.play();
        });
    });
}

// ===================================
// 15. Image Lazy Loading Enhancement
// ===================================
function enhanceLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// 16. Dynamic Background Gradient
// ===================================
function initDynamicGradient() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let mouseX = 0;
    let mouseY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        hero.style.background = `
            radial-gradient(
                circle at ${mouseX}% ${mouseY}%,
                rgba(59, 130, 246, 0.1),
                transparent 50%
            )
        `;
    });
}

// ===================================
// 17. Typing Effect
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.getAttribute('data-typing');
                typeWriter(entry.target, text);
                typingObserver.unobserve(entry.target);
            }
        });
    });

    typingElements.forEach(el => typingObserver.observe(el));
}

// ===================================
// Initialize All Features
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Kitamaru-inspired features...');

    // Initialize all features
    initMagneticButtons();
    init3DTilt();
    initScrollReveal();
    initParallax();
    initSmoothScroll();
    initCounters();
    initIntersectionObserver();
    initPageLoadAnimation();
    enhanceForms();
    initScrollProgress();
    enhanceLazyLoading();
    initTypingEffect();

    // Initialize portfolio filter if it exists
    if (document.querySelector('.filter-btn')) {
        initPortfolioFilter();
    }

    console.log('✅ All features initialized successfully!');
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
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

// Optimize scroll listeners
const optimizedScrollHandler = debounce(() => {
    // Your scroll handlers here
}, 10);
