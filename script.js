// Wait for the DOM (HTML structure) to be fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    /* ======================= */
    /* MOBILE NAV (BURGER)   */
    /* ======================= */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // When hamburger is clicked, toggle 'active' class on both
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ======================= */
    /* THEME TOGGLER       */
    /* ======================= */
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme'); // Check local storage

    // Apply saved theme on load
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        // Toggle the .dark-mode class on the <body>
        document.body.classList.toggle('dark-mode');
        
        // Save the user's preference to local storage
        let theme = 'light-mode'; // Default
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
    });

    /* ======================= */
    /* TYPING TEXT EFFECT    */
    /* ======================= */
    const typingText = document.querySelector('.typing-text');
    // Add your roles or descriptors here
    const words = ['Developer', 'Designer', 'Creator', 'Problem Solver'];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        typingText.textContent = currentChar;
        typingText.classList.add('stop-blinking');

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing forward
            charIndex++;
            setTimeout(typeEffect, 150);
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            charIndex--;
            setTimeout(typeEffect, 100);
        } else {
            // Word is fully typed or fully deleted
            isDeleting = !isDeleting;
            typingText.classList.remove('stop-blinking');
            
            if (!isDeleting) {
                // Move to the next word
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(typeEffect, 1200); // Pause before next action
        }
    }
    
    // Start the typing effect
    typeEffect();


    /* ======================= */
    /* REVEAL ON SCROLL ANIM  */
    /* ======================= */
    
    // Select all sections to be animated
    const sections = document.querySelectorAll('.content-section');

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the section is in the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    
    /* ======================= */
    /* ACTIVE NAV LINK      */
    /* ======================= */
    // Highlight the nav link corresponding to the section in view
    const allSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        allSections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // A bit of offset
            const sectionId = current.getAttribute('id');

            const navLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active from all others
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active to the current one
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
