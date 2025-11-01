// --- JAVASCRIPT FOR INTERACTIVITY ---

// 1. Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}
document.getElementById('mobile-menu-button').addEventListener('click', toggleMenu);


// 2. Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu on click (only applies if the menu is open)
        if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
            toggleMenu();
        }
    });
});

// 3. Simple Form Submission Simulation (Triggered after native HTML validation passes)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check form validity before proceeding with simulation (though 'required' handles most of it)
    if (!this.checkValidity()) {
        return;
    }

    const formStatus = document.getElementById('formStatus');
    formStatus.classList.remove('hidden');
    
    // Show a "Sending" message
    formStatus.textContent = 'Sending message...';
    formStatus.classList.remove('text-red-500', 'text-green-500');
    formStatus.classList.add('text-gray-500');

    // Simulate API latency (1.5 seconds)
    setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.remove('text-gray-500');
        formStatus.classList.add('text-green-500');
        // Clear the form fields
        document.getElementById('contactForm').reset();
    }, 1500); 
});
// --- JAVASCRIPT FOR SINGLE PAGE APPLICATION (SPA) BEHAVIOR ---
// --- JAVASCRIPT FOR SINGLE PAGE APPLICATION (SPA) BEHAVIOR ---

// 1. Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}
document.getElementById('mobile-menu-button').addEventListener('click', toggleMenu);

// Function to handle showing the correct content section
function showSection(sectionId) {
    // 1. Hide all content sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Show the requested section
    const targetSection = document.getElementById(`content-${sectionId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        // Scroll to the top of the main content area (below the navbar)
        window.scrollTo(0, 0); 
    }
}

// Function to update the active state of navigation links
function updateActiveLink(sectionId) {
    // Reset non-active links first
    document.querySelectorAll('.tab-button').forEach(link => {
        link.classList.remove('active', 'text-accent');
        link.classList.add('text-gray-600');
    });
    
    // Reset the logo/name link active state (it's not a tab-button, but should not look 'active' unless on home)
    document.querySelector('.text-gray-900[data-section="home"]').classList.remove('active');

    // Find and set the active link(s) for the current section
    document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(link => {
        // If it's a primary nav item (tab-button), use accent colors
        if (link.classList.contains('tab-button')) {
            link.classList.add('active', 'text-accent');
            link.classList.remove('text-gray-600');
        } 
    });
    
    // Ensure the logo gets the active look when on the home section
    if (sectionId === 'home') {
        document.querySelector('.text-gray-900[data-section="home"]').classList.add('active');
    }
}

// 3. Tab Navigation Event Listener
// This listener targets all elements with data-section, including the logo and section buttons
document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        
        const sectionId = this.getAttribute('data-section');
        
        showSection(sectionId);
        updateActiveLink(sectionId);

        // Close mobile menu after clicking a link
        if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
            toggleMenu();
        }
    });
});

// 4. Simple Form Submission Simulation (Triggered after native HTML validation passes)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check form validity (using HTML 'required')
    if (!this.checkValidity()) {
        return;
    }

    const formStatus = document.getElementById('formStatus');
    formStatus.classList.remove('hidden');
    
    formStatus.textContent = 'Sending message...';
    formStatus.classList.remove('text-red-500', 'text-green-500');
    formStatus.classList.add('text-gray-500');

    // Simulate API latency (1.5 seconds)
    setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.remove('text-gray-500');
        formStatus.classList.add('text-green-500');
        // Clear the form fields
        document.getElementById('contactForm').reset();
    }, 1500); 
});


// 5. Initialize the app: Show the 'home' section when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    updateActiveLink('home');
});
// --- JAVASCRIPT FOR SINGLE PAGE APPLICATION (SPA) BEHAVIOR ---