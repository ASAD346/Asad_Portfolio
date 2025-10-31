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
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ===========================
// Animated Counter for Stats
// ===========================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

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
                    if (categories.includes(filterValue)) {
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
    }
};

const validateCaptcha = (userAnswer) => {
    return parseInt(userAnswer) === captchaAnswer;
};

// Initialize captcha when page loads
if (document.getElementById('captchaQuestion')) {
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

// ===========================
// Contact Form Handling
// ===========================
// ===========================
// Contact Form Handling (with EmailJS)
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate Math CAPTCHA first
        const captchaInput = document.getElementById('captcha');
        if (captchaInput && !validateCaptcha(captchaInput.value)) {
            formMessage.textContent = 'Incorrect security answer. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            // Regenerate captcha on failure
            generateCaptcha();
            captchaInput.value = '';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            return;
        }

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            formMessage.textContent = 'Please complete the reCAPTCHA verification.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoader = submitButton.querySelector('.btn-loader');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitButton.disabled = true;

        // Send form to ASP.NET API
        try {
            // Prepare form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                phone: contactForm.querySelector('#phone').value,
                subject: contactForm.querySelector('#subject').value,
                projectType: contactForm.querySelector('#project-type').value,
                budget: contactForm.querySelector('#budget').value,
                message: contactForm.querySelector('#message').value,
                captcha: captchaInput.value,
                recaptchaResponse: recaptchaResponse
            };

            // Send to API
            const response = await fetch('http://localhost:5106/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message
                formMessage.textContent = result.message || 'Thank you for your message! I will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();
                
                // Regenerate captcha after successful submission
                generateCaptcha();
                
                // Reset reCAPTCHA
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }

                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(result.error || 'Submission failed');
            }

        } catch (error) {
            formMessage.textContent = error.message || 'Oops! Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } finally {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitButton.disabled = false;
        }
    });
}

//const contactForm = document.getElementById('contactForm');
//const formMessage = document.getElementById('formMessage');

//if (contactForm) {
//    contactForm.addEventListener('submit', async (e) => {
//        e.preventDefault();

//        // Get form data
//        const formData = new FormData(contactForm);
//        const data = Object.fromEntries(formData);

//        // Show loading state
//        const submitButton = contactForm.querySelector('.btn-submit');
//        const btnText = submitButton.querySelector('.btn-text');
//        const btnLoader = submitButton.querySelector('.btn-loader');
        
//        btnText.style.display = 'none';
//        btnLoader.style.display = 'inline-block';
//        submitButton.disabled = true;

//        // Simulate form submission (replace with actual API call)
//        try {
//            // Simulate API delay
//            await new Promise(resolve => setTimeout(resolve, 1500));

//            // Show success message
//            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
//            formMessage.className = 'form-message success';
//            formMessage.style.display = 'block';

//            // Reset form
//            contactForm.reset();

//            // Hide message after 5 seconds
//            setTimeout(() => {
//                formMessage.style.display = 'none';
//            }, 5000);

//        } catch (error) {
//            // Show error message
//            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
//            formMessage.className = 'form-message error';
//            formMessage.style.display = 'block';

//            setTimeout(() => {
//                formMessage.style.display = 'none';
//            }, 5000);
//        } finally {
//            // Reset button state
//            btnText.style.display = 'inline';
//            btnLoader.style.display = 'none';
//            submitButton.disabled = false;
//        }
//    });
//}

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
// Typing Effect for Hero Section (Optional Enhancement)
// ===========================
const createTypingEffect = (element, texts, speed = 100, deleteSpeed = 50, delay = 2000) => {
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deleteSpeed : speed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeed);
    };
    
    // Uncomment the line below to enable typing effect on hero name
    // type();
};

// Example usage (uncomment to enable):
// const nameElement = document.querySelector('.name');
// if (nameElement) {
//     createTypingEffect(nameElement, ['Your Name', 'Software Developer', '.NET Expert'], 150, 100, 2000);
// }

// ===========================
// Progress Bar Animation
// ===========================
const progressBars = document.querySelectorAll('.progress');
if (progressBars.length > 0) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===========================
// Scroll to Top Button (Optional)
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
// Console Welcome Message
// ===========================
console.log('%c👋 Welcome to my Portfolio!', 'color: #512BD4; font-size: 20px; font-weight: bold;');
console.log('%c💻 Built with HTML, CSS, and JavaScript', 'color: #68217A; font-size: 14px;');
console.log('%c🚀 Interested in working together? Visit the contact page!', 'color: #00D4FF; font-size: 14px;');

// ===========================
// Prevent Context Menu on Production (Optional)
// ===========================
// Uncomment to disable right-click on production
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ===========================
// Force Download for CV Button
// ===========================
const downloadCvBtn = document.getElementById('downloadCvBtn');
if (downloadCvBtn) {
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
        img.src = img.dataset.src;
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
// Force Download for CV Button
// ===========================
const downloadCvBtn = document.getElementById('downloadCvBtn');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('../AsadKhan_CV.pdf');
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
            // Fallback: navigate to file if fetch blocked
            window.location.href = '../AsadKhan_CV.pdf';
        }
    });
}