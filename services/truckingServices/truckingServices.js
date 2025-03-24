document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-mobile');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu li a');

    function toggleMobileMenu(show) {
        if (show) {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Add animation delay to menu items
            document.querySelectorAll('.mobile-menu li').forEach((item, index) => {
                item.style.transitionDelay = `${0.1 * index}s`;
            });
        } else {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
            // Remove animation delay
            document.querySelectorAll('.mobile-menu li').forEach(item => {
                item.style.transitionDelay = '';
            });
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => toggleMobileMenu(true));
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => toggleMobileMenu(false));
    }

    // Close mobile menu when clicking menu items
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            toggleMobileMenu(false);
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
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

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Submission
    const quoteForm = document.getElementById('quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Quote Request Sent!';
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h3>Thank You!</h3>
                    <p>Your quote request has been received. Our team will contact you shortly with pricing details.</p>
                `;
                
                // Add success message to form
                quoteForm.appendChild(successMessage);
                
                // Reset form
                quoteForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Remove success message
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            if (quoteForm.contains(successMessage)) {
                                quoteForm.removeChild(successMessage);
                            }
                        }, 300);
                    }, 5000);
                }, 3000);
            }, 2000);
        });
    }

    // Add animation class to elements on scroll
    function animateOnScroll(elements, className) {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add(className);
            }
        });
    }

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    window.addEventListener('scroll', () => {
        animateOnScroll(serviceCards, 'fade-in');
    });

    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }

        .fade-in.active {
            opacity: 1;
            transform: translateY(0);
        }

        .success-message {
            background-color: #d4edda;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        .success-icon {
            font-size: 3rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);

    // Add fade-in animation to elements
    function addFadeInAnimation() {
        const elements = document.querySelectorAll('.service-card, .fleet-card, .pricing-card, .info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'active');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    addFadeInAnimation();
});
