// ===========================
// Mobile Navigation Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===========================
// Sticky Navbar on Scroll
// ===========================
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (navbar) navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        if (navbar) navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ===========================
// Animated Counter for Stats
// ===========================
const observerOptions = {
    threshold: 0.1, // Trigger when 10% visible (lower threshold)
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    if (target === 0) return;
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startValue + (target - startValue) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    requestAnimationFrame(updateCounter);
};

// Initialize counter animation
const initCounterAnimation = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Check if already animated (has data-animated attribute)
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    // Get text content and trim whitespace
                    const currentValue = parseInt(entry.target.textContent.trim()) || 0;
                    if (currentValue === 0) {
                        // Mark as animated to prevent re-animation
                        entry.target.setAttribute('data-animated', 'true');
                        animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
};

// Initialize counters when DOM is ready
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounterAnimation);
    } else {
        initCounterAnimation();
    }
    
    // Fallback: try again after page fully loads
    window.addEventListener('load', initCounterAnimation);
    
    // Additional fallback with delay
    setTimeout(initCounterAnimation, 200);
})();

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Project Filter Functionality
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-full');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (categories && categories.includes(filterValue)) {
                        card.style.display = 'grid';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===========================
// FAQ Accordion
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// ===========================
// CAPTCHA Functionality
// ===========================
let captchaAnswer = 0;

const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let question = '';
    switch(operator) {
        case '+':
            captchaAnswer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
        case '-':
            captchaAnswer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
        case '*':
            captchaAnswer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
    }
    
    const captchaQuestion = document.getElementById('captchaQuestion');
    if (captchaQuestion) {
        captchaQuestion.textContent = question;
        captchaQuestion.style.display = 'inline';
    }
};

const validateCaptcha = (userAnswer) => {
    return parseInt(userAnswer) === captchaAnswer;
};

// Initialize captcha when page loads
const initCaptcha = () => {
    const captchaQuestion = document.getElementById('captchaQuestion');
    if (captchaQuestion) {
        generateCaptcha();
        
        const refreshButton = document.getElementById('refreshCaptcha');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                generateCaptcha();
                const captchaInput = document.getElementById('captcha');
                if (captchaInput) {
                    captchaInput.value = '';
                }
            });
        }
    }
};

// Run when DOM is ready - with multiple checks
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCaptcha);
    } else {
        // DOM already loaded
        initCaptcha();
    }
    
    // Fallback: try again after page fully loads
    window.addEventListener('load', initCaptcha);
    
    // Additional fallback with delay
    setTimeout(initCaptcha, 200);
})();

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate Math CAPTCHA first
        const captchaInput = document.getElementById('captcha');
        if (captchaInput && !validateCaptcha(captchaInput.value)) {
            if (formMessage) {
                formMessage.textContent = 'Incorrect security answer. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
            
            // Regenerate captcha on failure
            generateCaptcha();
            if (captchaInput) captchaInput.value = '';
            
            if (formMessage) {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
            return;
        }

        // Get reCAPTCHA v3 token
        let recaptchaResponse = '';
        try {
            // Wait for reCAPTCHA to be ready
            if (typeof grecaptcha === 'undefined') {
                throw new Error('reCAPTCHA not loaded');
            }
            
            // Execute reCAPTCHA v3
            recaptchaResponse = await grecaptcha.execute('6LdYr_4rAAAAAEMcW6BwGJK7kh67JgASYBEhVjBK', { action: 'submit' });
            if (!recaptchaResponse) {
                throw new Error('Failed to get reCAPTCHA token');
            }
        } catch (error) {
            if (formMessage) {
                formMessage.textContent = 'reCAPTCHA verification failed. Please refresh the page and try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const btnText = submitButton ? submitButton.querySelector('.btn-text') : null;
        const btnLoader = submitButton ? submitButton.querySelector('.btn-loader') : null;

        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';
        if (submitButton) submitButton.disabled = true;

        // Send form to API
        try {
            // Prepare form data
            const formData = {
                name: contactForm.querySelector('#name')?.value || '',
                email: contactForm.querySelector('#email')?.value || '',
                phone: contactForm.querySelector('#phone')?.value || '',
                subject: contactForm.querySelector('#subject')?.value || '',
                projectType: contactForm.querySelector('#project-type')?.value || '',
                budget: contactForm.querySelector('#budget')?.value || '',
                message: contactForm.querySelector('#message')?.value || '',
                captcha: captchaInput?.value || '',
                recaptchaResponse: recaptchaResponse
            };

            // Determine API endpoint (Netlify Function in production, local API in development)
            const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
            const apiEndpoint = isProduction 
                ? '/.netlify/functions/contact' 
                : 'http://localhost:5106/api/contact';
            
            // Send to API
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message
                if (formMessage) {
                    formMessage.textContent = result.message || 'Thank you for your message! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                }

                // Reset form
                contactForm.reset();
                
                // Regenerate captcha after successful submission
                generateCaptcha();
                
                // Note: reCAPTCHA v3 doesn't need reset (it's token-based)

                if (formMessage) {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            } else {
                throw new Error(result.error || 'Submission failed');
            }

        } catch (error) {
            if (formMessage) {
                formMessage.textContent = error.message || 'Oops! Something went wrong. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        } finally {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
            if (submitButton) submitButton.disabled = false;
        }
    });
}

// ===========================
// Animate on Scroll (AOS)
// ===========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const delay = element.getAttribute('data-aos-delay');
        if (delay) {
            element.style.transitionDelay = `${delay}ms`;
        }
        
        observer.observe(element);
    });
};

// Initialize AOS when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ===========================
// Scroll to Top Button
// ===========================
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #512BD4, #68217A);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(81, 43, 212, 0.3);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    document.body.appendChild(button);
};

// Initialize scroll to top button
createScrollToTopButton();

// ===========================
// Parallax Effect for Hero Background
// ===========================
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ===========================
// Force Download for CV Button
// ===========================
(function() {
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    if (downloadCvBtn && !downloadCvBtn.hasAttribute('data-cv-listener')) {
        downloadCvBtn.setAttribute('data-cv-listener', 'true');
        downloadCvBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const filePath = downloadCvBtn.getAttribute('href') || '../AsadKhan_CV.pdf';
            try {
                const response = await fetch(filePath, { cache: 'no-cache' });
                if (!response.ok) throw new Error('File not found');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'AsadKhan_CV.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } catch (err) {
                // Fallback: navigate to file if fetch fails
                window.location.href = filePath;
            }
        });
    }
})();

// ===========================
// Keyboard Navigation Enhancement
// ===========================
document.addEventListener('keydown', (e) => {
    // Check if user is typing in an input field
    const isTyping = e.target.tagName === 'INPUT' || 
                     e.target.tagName === 'TEXTAREA' || 
                     e.target.isContentEditable;
    
    // Press 'H' to go to home (only if not typing)
    if ((e.key === 'h' || e.key === 'H') && !isTyping) {
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        if (navLinks && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// ===========================
// Performance: Lazy Loading Images
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Print Friendly Styles
// ===========================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c👋 Welcome to my Portfolio!', 'color: #512BD4; font-size: 20px; font-weight: bold;');
console.log('%c💻 Built with HTML, CSS, and JavaScript', 'color: #68217A; font-size: 14px;');
console.log('%c🚀 Interested in working together? Visit the contact page!', 'color: #00D4FF; font-size: 14px;');
