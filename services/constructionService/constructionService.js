document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        } catch (e) {
            console.warn('AOS initialization error:', e);
        }
    }
    
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (burger && closeMenu && mobileNav) {
        burger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking a navigation link
        const mobileLinks = document.querySelectorAll('.mobile-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(event.target) && 
                !burger.contains(event.target)) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
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
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon i');
                if (icon) {
                    icon.style.animation = 'iconSpin 0.5s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 500);
                }
            });
        });
    }
    
    // Project image zoom effect
    const projectItems = document.querySelectorAll('.project-item');
    if (projectItems.length > 0) {
        projectItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('construction-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission success
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            contactForm.innerHTML = `
                <div class="form-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Thank You!</h3>
                    <p>Your inquiry has been sent successfully. Our team will contact you shortly to discuss your construction project.</p>
                </div>
            `;
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip links that don't actually scroll to something
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate service icons on scroll
    const animateServiceIcons = () => {
        const serviceIcons = document.querySelectorAll('.service-icon');
        serviceIcons.forEach((icon, index) => {
            const delay = index * 100;
            setTimeout(() => {
                icon.style.animation = 'bounceIn 0.8s ease';
            }, delay);
        });
    };
    
    // Delayed animation for step numbers
    const animateStepNumbers = () => {
        const stepNumbers = document.querySelectorAll('.step-number');
        stepNumbers.forEach((number, index) => {
            const delay = index * 200;
            setTimeout(() => {
                number.style.animation = 'pulse 0.8s ease';
            }, delay);
        });
    };
    
    // Animate elements on scroll
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length > 0) {
        const checkFadeInElements = () => {
            fadeInElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.8) {
                    element.classList.add('show');
                }
            });
        };
        
        window.addEventListener('scroll', checkFadeInElements);
        checkFadeInElements(); // Check on page load
    }
    
    // Run animations after small delay
    setTimeout(() => {
        animateServiceIcons();
        animateStepNumbers();
    }, 800);
});

// Fix preloader to ensure it disappears properly
document.addEventListener('DOMContentLoaded', function() {
    // Force body to be visible immediately
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    // Remove preloader immediately 
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 300);
        }, 400); // Reduced time to make page appear faster
    }
    
    // Rest of your DOMContentLoaded event handler
    // ... existing code ...
});

// Remove the separate load event handler that was causing issues
// and replace with a simpler version that forces preloader removal
window.addEventListener('load', function() {
    // Force preloader to be removed
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }
    
    // Force all sections to be visible
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });
});

// Emergency timeout - will force preloader removal after 2 seconds no matter what
setTimeout(function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }
    
    // Force body and all sections to be visible
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });
}, 2000);