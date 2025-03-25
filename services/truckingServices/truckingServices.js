document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (if you want to include it in your trucking page)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle with animation
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeButton = document.querySelector('.close-mobile');
    
    if (mobileToggle && mobileNav && closeButton) {
        function toggleMobileNav(e) {
            if (e) e.stopPropagation(); // Prevent event bubbling
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Add staggered animations for mobile menu items
            const menuItems = document.querySelectorAll('.mobile-menu li');
            if (mobileNav.classList.contains('active')) {
                menuItems.forEach((item, index) => {
                    item.style.transitionDelay = `${0.1 * (index + 1)}s`;
                });
            } else {
                menuItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                });
            }
        }
        
        mobileToggle.addEventListener('click', toggleMobileNav);
        closeButton.addEventListener('click', toggleMobileNav);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                toggleMobileNav();
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMobileNav();
        });
    });
    
    // Service card icon animation
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(180deg) scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }
    
    // Fleet image hover effect
    const fleetCards = document.querySelectorAll('.fleet-card');
    fleetCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.fleet-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.fleet-image img');
            if (img) {
                img.style.transform = '';
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission with animation
    const contactForm = document.getElementById('quote-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Add loading state
                const submitBtn = contactForm.querySelector('.submit-button');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX request)
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Thank You!</h3>
                            <p>Your quote request has been submitted successfully. We'll get back to you shortly.</p>
                        </div>
                    `;
                    
                    // Add animation to success message
                    const successMessage = contactForm.querySelector('.success-message');
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        successMessage.style.transition = 'all 0.6s ease';
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'translateY(0)';
                    }, 100);
                    
                }, 2000);
            }
        });
        
        // Immediate feedback on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
    
    // Preloader animation
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                document.body.classList.add('loaded');
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 800);
        }
    });
    
    // Add entrance animations to sections when they come into view
    const addAppearAnimation = () => {
        const sections = document.querySelectorAll('.services, .fleet, .pricing, .contact');
        
        if (sections.length > 0) {
            const windowHeight = window.innerHeight;
            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.getBoundingClientRect().top;
                    if (sectionTop < windowHeight - 100) {
                        section.classList.add('animate-in');
                    }
                }
            });
        }
    };
    
    // Run once on load and then on scroll
    addAppearAnimation();
    window.addEventListener('scroll', addAppearAnimation);
    
    // Add CSS class to style sections when they come into view
    const style = document.createElement('style');
    style.textContent = `
        .services, .fleet, .pricing, .contact {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            text-align: center;
            padding: 40px;
        }
        
        .success-icon {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .error {
            border-color: #f44336 !important;
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1) !important;
        }
        
        .focused {
            position: relative;
        }
        
        .focused label {
            color: var(--primary-color);
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const toggle = item.querySelector('.faq-toggle i');
                    if (toggle) toggle.className = 'fas fa-plus';
                });
                
                // If the clicked FAQ wasn't already active, open it
                if (!isActive) {
                    faqItem.classList.add('active');
                    const toggle = faqItem.querySelector('.faq-toggle i');
                    if (toggle) toggle.className = 'fas fa-minus';
                }
            });
        });
    }
});
