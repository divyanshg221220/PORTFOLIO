// Minimal JavaScript for Portfolio Website
// Only essential functionality as requested

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                // Scrolling down
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                // Scrolling up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }

    // Contact form basic handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (name && email && subject && message) {
                // Show success message (in real implementation, you would send the data to a server)
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Download Resume functionality - Fixed to target the correct button
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        if (button.textContent.includes('Download Resume')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would download a PDF file
                alert('Resume download would start here. Please contact me directly for my resume at alex.johnson@email.com');
            });
        }
    });

    // Project detail buttons - Fixed to ensure proper event attachment
    setTimeout(() => {
        const projectButtons = document.querySelectorAll('.project-card .btn--outline');
        console.log('Found project buttons:', projectButtons.length); // Debug log
        
        projectButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Project button clicked:', index); // Debug log
                
                const projectCard = this.closest('.project-card');
                const projectTitle = projectCard ? projectCard.querySelector('h3').textContent : 'Unknown Project';
                const projectDescription = projectCard ? projectCard.querySelector('p').textContent : '';
                
                alert(`Project Details:\n\nTitle: ${projectTitle}\n\nDescription: ${projectDescription}\n\nFor more detailed information, please contact me at alex.johnson@email.com`);
            });
        });
    }, 100); // Small delay to ensure DOM is ready

    // Animate skill bars when they come into view
    const observeSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fillSkill 2s ease-in-out forwards';
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        observeSkillBars();
    }

    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background-color: var(--color-portfolio-secondary);
            color: white !important;
        }
        
        .btn--outline:hover {
            cursor: pointer;
        }
        
        .project-card .btn--outline {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .project-card .btn--outline:hover {
            background-color: var(--color-portfolio-secondary);
            color: white;
            border-color: var(--color-portfolio-secondary);
        }
    `;
    document.head.appendChild(style);

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Handle external links (LinkedIn, GitHub)
    const externalLinks = document.querySelectorAll('.social-link');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            alert(`This would open my ${linkText} profile in a new tab. Please contact me at alex.johnson@email.com for my actual ${linkText} profile link.`);
        });
    });

    // Add click feedback to all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Simple utility function for smooth animations
function animateOnScroll() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
}

// Debug function to check if DOM is loaded correctly
console.log('Portfolio JavaScript loaded successfully');

// Additional event delegation for dynamically added elements
document.addEventListener('click', function(e) {
    // Handle project detail buttons with event delegation
    if (e.target.matches('.project-card .btn--outline') || e.target.closest('.project-card .btn--outline')) {
        e.preventDefault();
        const button = e.target.closest('.btn--outline');
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        const projectDescription = projectCard.querySelector('p').textContent;
        
        alert(`Project Details:\n\nTitle: ${projectTitle}\n\nDescription: ${projectDescription}\n\nFor more detailed information about this project, please contact me at alex.johnson@email.com`);
    }
    
    // Handle download resume button with event delegation
    if (e.target.matches('.hero-buttons .btn--outline') && e.target.textContent.includes('Download Resume')) {
        e.preventDefault();
        alert('Resume download would start here. Please contact me directly for my resume at alex.johnson@email.com');
    }
});
