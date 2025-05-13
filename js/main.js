// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navmenu');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.parentElement.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
            }
        }
    });
}

// Mobile menu toggle animation
const navbarToggler = document.querySelector('.navbar-toggler');
const hamburger = document.querySelector('.hamburger');

if (navbarToggler && hamburger) {
    navbarToggler.addEventListener('click', function() {
        hamburger.classList.toggle('active');
    });
}

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
});

// Navbar toggle for mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('navmenu-links');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = document.getElementById('nav-toggle-icon');
    if (icon.classList.contains('fa-ellipsis-v')) {
        icon.classList.remove('fa-ellipsis-v');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-ellipsis-v');
    }
});

// Close mobile menu when clicking outside
window.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        const icon = document.getElementById('nav-toggle-icon');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-ellipsis-v');
    }
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[type="text"]').value;
        const message = this.querySelector('textarea').value;

        if (name && email && subject && message) {
            // Simulate form submission
            this.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                this.querySelector('button').innerHTML = 'Send Message';
            }, 2000);
        } else {
            alert('Please fill in all fields before submitting.');
        }
    });
}

// Add animation to section headings
const sectionHeadings = document.querySelectorAll('.section-headings');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

sectionHeadings.forEach(heading => {
    observer.observe(heading);
});

// Add scroll animation to team members
const teamMembers = document.querySelectorAll('.team-member');
const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

teamMembers.forEach(member => {
    member.style.opacity = '0';
    member.style.transform = 'translateY(20px)';
    member.style.transition = 'all 0.6s ease-out';
    teamObserver.observe(member);
});

// Add hover effect to achievement cards
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Add scroll animation to downloads cards
const downloadCards = document.querySelectorAll('.card');
const downloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

downloadCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    downloadObserver.observe(card);
});

// Hero Section Interactive Effect
const heroSection = document.querySelector('.hero-section');
const bgLayer1 = document.querySelector('.bg-layer-1');
const bgLayer2 = document.querySelector('.bg-layer-2');
const magnifyingGlass = document.getElementById('magnifyingGlass');
let isMagnifying = false;

if (heroSection && bgLayer1 && bgLayer2 && magnifyingGlass) {
    // Toggle magnifying glass on click
    heroSection.addEventListener('click', (e) => {
        isMagnifying = !isMagnifying;
        magnifyingGlass.classList.toggle('active', isMagnifying);
        
        // Toggle cursor style
        if (isMagnifying) {
            document.body.style.cursor = 'none';
        } else {
            document.body.style.cursor = 'default';
        }
    });
    
    // Move magnifying glass with mouse
    heroSection.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroSection.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        // Update magnifying glass position
        magnifyingGlass.style.left = `${x}px`;
        magnifyingGlass.style.top = `${y}px`;
        
        // Update background position for parallax effect
        if (!isMagnifying) {
            const moveX1 = (x - width / 2) * 0.01;
            const moveY1 = (y - height / 2) * 0.01;
            bgLayer1.style.transform = `translate(${moveX1}px, ${moveY1}px) scale(1.05)`;
        } else {
            // When magnifying, update the clip-path position
            document.documentElement.style.setProperty('--mouse-x', `${x}px`);
            document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        }
    });
    
    // Reset position when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
        if (!isMagnifying) {
            bgLayer1.style.transform = 'translate(0, 0) scale(1.05)';
        }
    });
    
    // Hide default cursor when over the hero section
    heroSection.style.cursor = 'none';
}

// Add scroll progress indicator
const progressIndicator = document.createElement('div');
progressIndicator.className = 'scroll-progress';
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollPosition / windowHeight) * 100;
    progressIndicator.style.width = `${progress}%`;
});
