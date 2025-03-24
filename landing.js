document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    function toggleMobileNav() {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    burger.addEventListener('click', toggleMobileNav);
    closeMenu.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', toggleMobileNav);

    // Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.parentElement;
            const dropdownContent = parent.querySelector('.mobile-dropdown-content');
            dropdownContent.classList.toggle('active');
            toggle.querySelector('i').classList.toggle('fa-chevron-down');
            toggle.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    function stickyHeader() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', stickyHeader);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileNav.classList.contains('active')) {
                        toggleMobileNav();
                    }
                    
                    // Calculate position with header offset
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let counted = false;

    function animateStats() {
        if (counted) return;
        
        const statsSection = document.querySelector('.stats');
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight - 100) {
            counted = true;
            
            statNumbers.forEach(stat => {
                const targetCount = parseInt(stat.getAttribute('data-count'));
                let currentCount = 0;
                const duration = 2000; // 2 seconds
                const increment = targetCount / (duration / 16); // 60fps
                
                const counter = setInterval(() => {
                    currentCount += increment;
                    
                    if (currentCount >= targetCount) {
                        stat.textContent = targetCount;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(currentCount);
                    }
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    
    // Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Show success message (in real implementation, you would send the form data to a server)
                const formElement = contactForm;
                const submitBtn = formElement.querySelector('.submit-btn');
                const originalBtnText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX request in production)
                setTimeout(() => {
                    formElement.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('form-success');
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We\'ll get back to you soon.';
                    
                    formElement.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.remove();
                        }, 300);
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.classList.add('error-message');
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('input-error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('input-error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Add active class to current nav item based on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + headerHeight + 100;
        
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
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Image Lazy Loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    function lazyLoad() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight + 300) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        });
    }
    
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('load', lazyLoad);
    
    // Add fade effects for testimonials on hover
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            testimonialCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.5';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            testimonialCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // Add CSS variables for theme customization
    function setThemeColors() {
        const root = document.documentElement;
        
        // Get saved theme from localStorage if available
        const savedPrimaryColor = localStorage.getItem('primaryColor');
        const savedAccentColor = localStorage.getItem('accentColor');
        
        if (savedPrimaryColor) {
            root.style.setProperty('--primary-color', savedPrimaryColor);
            root.style.setProperty('--primary-dark', adjustColorBrightness(savedPrimaryColor, -20));
        }
        
        if (savedAccentColor) {
            root.style.setProperty('--accent-color', savedAccentColor);
            root.style.setProperty('--accent-dark', adjustColorBrightness(savedAccentColor, -20));
        }
    }
    
    function adjustColorBrightness(hex, percent) {
        // Convert hex to RGB
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        
        // Adjust brightness
        r = Math.max(0, Math.min(255, r + percent));
        g = Math.max(0, Math.min(255, g + percent));
        b = Math.max(0, Math.min(255, b + percent));
        
        // Convert back to hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    setThemeColors();
    
    // Add resize handler for responsive adjustments
    function handleResize() {
        const windowWidth = window.innerWidth;
        const servicesGrid = document.querySelector('.services-grid');
        
        if (windowWidth < 768) {
            if (servicesGrid) {
                // On mobile, ensure only two cards per row for better readability
                servicesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            }
        } else {
            if (servicesGrid) {
                // On desktop, allow three or more cards per row
                servicesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load
    
    // Add preloader
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });

    // Add some CSS for the preloader and form validation
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            position: relative;
        }
        
        .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: var(--primary-color);
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            animation: sk-bounce 2.0s infinite ease-in-out;
        }
        
        .double-bounce2 {
            animation-delay: -1.0s;
        }
        
        @keyframes sk-bounce {
            0%, 100% { transform: scale(0.0); }
            50% { transform: scale(1.0); }
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 5px;
        }
        
        .input-error {
            border-color: #dc3545 !important;
        }
        
        .form-success {
            background-color: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: opacity 0.3s ease;
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        .nav-links a.active, .mobile-links a.active {
            color: var(--primary-color);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});
