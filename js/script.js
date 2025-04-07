// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create star background
    createStars();
    
    // Initialize animations
    initRevealAnimations();
    
    // Set up navigation highlighting
    setupNavHighlighting();
    
    // Load artwork from folders
    loadArtwork('digital', 'art/digital');
    loadArtwork('traditional', 'art/traditional');
    
    // Handle form submission
    setupContactForm();
    
    // Add floating animation to some elements (except header)
    setupFloatingElements();
    
    // Setup image popup functionality
    setupImagePopup();
    
    // Setup theme toggle functionality
    setupThemeToggle();
    
    // Setup mobile touch optimizations
    setupMobileOptimizations();
    
    // Setup social links hover effects
    setupSocialIntro();
    
    // Setup profile picture upload
    setupProfileUpload();
});

// Create star background
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);
    
    // Create stars with random positions and animation delays
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${3 + Math.random() * 4}s;
        `;
        
        starsContainer.appendChild(star);
    }
}

// Reveal elements when they come into view
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Update active navigation based on scroll position
function setupNavHighlighting() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    const navCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    const navObserver = new IntersectionObserver(navCallback, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Add floating animation to some elements (except header)
function setupFloatingElements() {
    // Only animate buttons and social links, not header elements
    const heroButtons = document.querySelectorAll('.cta-buttons .btn');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Add staggered floating to hero buttons
    heroButtons.forEach((btn, index) => {
        btn.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite ${index * 0.2}s`;
    });
    
    // Add staggered floating to social links
    socialLinks.forEach((link, index) => {
        link.style.animation = `float ${3 + index * 0.3}s ease-in-out infinite ${index * 0.15}s`;
    });
}

// Setup image popup functionality
function setupImagePopup() {
    // Create popup elements
    const popup = document.createElement('div');
    popup.className = 'image-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <img class="popup-image" src="" alt="">
            <div class="popup-info">
                <h3 class="popup-title"></h3>
                <p class="popup-description"></p>
                <div class="popup-social-links">
                    <a href="#" class="popup-social-link instagram" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="popup-social-link youtube" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Get popup elements
    const popupContent = popup.querySelector('.popup-content');
    const closePopup = popup.querySelector('.close-popup');
    const popupImage = popup.querySelector('.popup-image');
    const popupTitle = popup.querySelector('.popup-title');
    const popupDescription = popup.querySelector('.popup-description');
    const instagramLink = popup.querySelector('.popup-social-link.instagram');
    const youtubeLink = popup.querySelector('.popup-social-link.youtube');
    
    // Close popup on clicking the X or outside the popup
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Escape key to close popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Load artwork from the specified folder
function loadArtwork(type, folderPath) {
    // In a real website, you would use an API or backend to get the files
    // For this demo, we'll create sample artwork items
    
    const galleryContainer = document.querySelector(`#${type} .gallery-container`);
    
    // First, create the scrolling gallery structure
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'gallery-scroll-container';
    
    const galleryTrack = document.createElement('div');
    galleryTrack.className = 'gallery-track animate';
    scrollContainer.appendChild(galleryTrack);
    
    // Add controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'gallery-controls';
    controlsDiv.innerHTML = `
        <div class="gallery-control-btn prev-btn"><i class="fas fa-chevron-left"></i></div>
        <div class="gallery-control-btn pause-btn"><i class="fas fa-pause"></i></div>
        <div class="gallery-control-btn next-btn"><i class="fas fa-chevron-right"></i></div>
    `;
    
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(scrollContainer);
    galleryContainer.appendChild(controlsDiv);
    
    // Artwork data for demo purposes
    const artworkData = getArtworkData(type);
    
    // Add type property to each artwork for better ID generation
    artworkData.forEach(artwork => {
        artwork.type = type;
    });
    
    // Store artwork data in a global object for easier lookup by ID
    window.artworkDatabase = window.artworkDatabase || {};
    artworkData.forEach((artwork, index) => {
        // Generate numeric IDs starting from 1
        const numericId = index + 1;
        artwork.id = `${type}-${numericId}`;
        
        // Store in global lookup object
        window.artworkDatabase[artwork.id] = artwork;
    });
    
    // Create gallery items
    const originalItems = createGalleryItems(artworkData, galleryTrack);
    
    // Clone the items to create the looping effect
    const clonedItems = originalItems.map(item => {
        const clone = item.cloneNode(true);
        galleryTrack.appendChild(clone);
        return clone;
    });
    
    // Add click event listeners to all gallery items
    attachClickHandlers(galleryTrack);
    
    // Setup gallery controls
    setupGalleryControls(type, galleryTrack, scrollContainer);
    
    // Setup dragging functionality
    setupGalleryDragging(galleryTrack, scrollContainer);
}

// Create gallery items and attach click events
function createGalleryItems(artworkData, container) {
    const items = [];
    
    artworkData.forEach((artwork, index) => {
        // Gallery item gets numeric ID
        const numericId = index + 1;
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-artwork-id', artwork.id);
        galleryItem.setAttribute('data-number', numericId); // Add numeric identifier
        
        // Image element
        const image = document.createElement('img');
        image.src = artwork.imagePath;
        image.alt = artwork.title;
        
        // Overlay with info
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <span class="item-number">#${numericId}</span>
            <h3 class="title">${artwork.title}</h3>
            <p class="description">${artwork.description}</p>
        `;
        
        // Append elements to the gallery item
        galleryItem.appendChild(image);
        galleryItem.appendChild(overlay);
        
        // Add to container and items array
        container.appendChild(galleryItem);
        items.push(galleryItem);
    });
    
    return items;
}

// Function to attach click handlers to all gallery items
function attachClickHandlers(container) {
    container.querySelectorAll('.gallery-item').forEach(item => {
        // Clear any existing event listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Add click event using the artwork ID stored in the data attribute
        newItem.addEventListener('click', () => {
            const artworkId = newItem.getAttribute('data-artwork-id');
            if (artworkId && window.artworkDatabase[artworkId]) {
                openPopup(window.artworkDatabase[artworkId]);
            }
        });
    });
}

// Function to open popup with artwork details
function openPopup(artwork) {
    const popup = document.querySelector('.image-popup');
    const popupContent = popup.querySelector('.popup-content');
    const popupImage = popup.querySelector('.popup-image');
    const popupTitle = popup.querySelector('.popup-title');
    const popupDescription = popup.querySelector('.popup-description');
    const instagramLink = popup.querySelector('.popup-social-link.instagram');
    const youtubeLink = popup.querySelector('.popup-social-link.youtube');
    
    // Extract the number from the ID
    const idParts = artwork.id.split('-');
    const artworkNumber = idParts[1]; // Gets the number part
    
    // Reset popup content sizing
    popupContent.style.width = 'auto';
    popupContent.style.height = 'auto';
    
    // Set popup content
    popupImage.src = artwork.imagePath;
    popupTitle.textContent = `#${artworkNumber}: ${artwork.title}`;
    popupDescription.textContent = artwork.description;
    
    // Set social media links
    instagramLink.href = artwork.instagramUrl || 'https://www.instagram.com/yourusername/';
    youtubeLink.href = artwork.youtubeUrl || 'https://www.youtube.com/yourchannel';
    
    // Show/hide social links based on availability
    instagramLink.style.display = artwork.instagramUrl ? 'flex' : 'none';
    youtubeLink.style.display = artwork.youtubeUrl ? 'flex' : 'none';
    
    // Show popup
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind the popup
    
    // Once the image loads, adjust the popup size
    popupImage.onload = () => {
        // Get the natural dimensions of the image
        const imgWidth = popupImage.naturalWidth;
        const imgHeight = popupImage.naturalHeight;
        
        // Calculate aspect ratio
        const aspectRatio = imgWidth / imgHeight;
        
        // Get viewport dimensions
        const viewportWidth = window.innerWidth * 0.9; // 90% of viewport width
        const viewportHeight = window.innerHeight * 0.9; // 90% of viewport height
        
        // Determine if we should constrain by width or height
        let contentWidth, contentHeight;
        
        if (imgWidth > imgHeight) {
            // Landscape image
            if (imgWidth > viewportWidth) {
                contentWidth = Math.min(viewportWidth, imgWidth);
                contentHeight = 'auto';
            } else {
                // Image is smaller than viewport
                contentWidth = imgWidth;
                contentHeight = 'auto';
            }
        } else {
            // Portrait image
            if (imgHeight > viewportHeight * 0.65) { // Reduced from 0.7 to 0.65 to leave more room for text
                contentHeight = viewportHeight * 0.65;
                contentWidth = 'auto';
            } else {
                // Image is smaller than viewport
                contentHeight = imgHeight;
                contentWidth = 'auto';
            }
        }
        
        // On mobile devices in landscape, adjust layout
        if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
            // Already handled by CSS media query
        } else {
            // Add slight buffer to width to account for padding
            if (contentWidth !== 'auto' && contentWidth < 400) {
                contentWidth = Math.max(contentWidth, 320); // Minimum reasonable width
            }
        }
        
        // Apply styles to maintain aspect ratio and respect viewport
        popupImage.style.maxWidth = (typeof contentWidth === 'number') ? `${contentWidth}px` : contentWidth;
        popupImage.style.maxHeight = (typeof contentHeight === 'number') ? `${contentHeight}px` : contentHeight;
        
        // Ensure that we don't have scrollbars on text
        const popupInfo = popup.querySelector('.popup-info');
        popupInfo.style.maxHeight = 'none';
        popupInfo.style.overflowY = 'visible';
    };
    
    // Fallback in case image doesn't load or is cached
    setTimeout(() => {
        if (!popupImage.complete) {
            popupImage.onload();
        }
    }, 300);
}

// Setup gallery controls (prev, next, pause buttons)
function setupGalleryControls(type, track, container) {
    const prevBtn = document.querySelector(`#${type} .prev-btn`);
    const nextBtn = document.querySelector(`#${type} .next-btn`);
    const pauseBtn = document.querySelector(`#${type} .pause-btn`);
    
    // Pause/Play button
    pauseBtn.addEventListener('click', () => {
        track.classList.toggle('animate');
        pauseBtn.classList.toggle('paused');
    });
    
    // Scroll left
    prevBtn.addEventListener('click', () => {
        const itemWidth = track.querySelector('.gallery-item').offsetWidth + 20; // width + margin
        track.style.transform = `translateX(${-itemWidth}px)`;
        track.style.transition = 'transform 0.5s ease';
        
        // Reset position after animation
        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            
            // Move the last item to the beginning
            const firstItem = track.lastElementChild;
            track.prepend(firstItem);
            
            // Reattach click handlers
            attachClickHandlers(track);
        }, 500);
    });
    
    // Scroll right
    nextBtn.addEventListener('click', () => {
        const itemWidth = track.querySelector('.gallery-item').offsetWidth + 20; // width + margin
        
        // Move the first item to the end
        const firstItem = track.firstElementChild;
        track.appendChild(firstItem);
        
        // Reset position
        track.style.transition = 'none';
        track.style.transform = `translateX(-${itemWidth}px)`;
        
        // Animate to center
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
            track.style.transform = 'translateX(0)';
            
            // Reattach click handlers
            attachClickHandlers(track);
        }, 50);
    });
}

// Setup dragging functionality for the gallery
function setupGalleryDragging(track, container) {
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let isPaused = false;

    // Remove wheel event listener
    // container.removeEventListener('wheel', handleWheel);

    // Touch events
    track.addEventListener('touchstart', dragStart);
    track.addEventListener('touchmove', drag);
    track.addEventListener('touchend', dragEnd);

    // Mouse events
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('mousemove', drag);
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        if (isPaused) return;
        
        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
            e.preventDefault();
        }
        
        isDragging = true;
        track.style.cursor = 'grabbing';
        
        // Cancel any ongoing animation
        cancelAnimationFrame(animationID);
    }

    function drag(e) {
        if (!isDragging) return;
        
        let currentPosition;
        if (e.type === 'touchmove') {
            currentPosition = e.touches[0].clientX;
        } else {
            currentPosition = e.clientX;
        }
        
        currentTranslate = prevTranslate + currentPosition - startPos;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd() {
        isDragging = false;
        track.style.cursor = 'grab';
        prevTranslate = currentTranslate;
    }
}

// Get artwork data based on type
function getArtworkData(type) {
    let artworks = [];
    
    if (type === 'digital') {
        artworks = [
            {
                title: 'Baymax',
                description: 'The character Baymax from Big Hero 6 created using Procreate.',
                imagePath: 'art/Digital/Baymax.jpg',
                instagramUrl: 'https://www.instagram.com/p/C7ZAMRpvaUy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                // youtubeUrl: 'https://www.youtube.com/watch?v=example-landscape'
            },
            {
                title: 'Cat Design',
                description: 'Cat character design for fun.',
                imagePath: 'art/Digital/Cat.jpg',
                instagramUrl: 'https://www.instagram.com/p/example-character/',
                youtubeUrl: 'https://youtube.com/shorts/mlZw7ttAYag?si=viLwWLKyRyn6907a'
            },
            {
                title: 'Anya',
                description: 'The character Anya from the anime series "Spy x Family".',
                imagePath: 'art/Digital/Anya.jpg',
                instagramUrl: 'https://www.instagram.com/p/example-abstract/',
                youtubeUrl: 'https://www.youtube.com/watch?v=example-abstract'
            },
            {
                title: 'Mr Beast',
                description: 'Digital portrait of Mr Beast.',
                imagePath: 'art/Digital/MrBeast.jpg',
                instagramUrl: '',
                youtubeUrl: 'https://www.youtube.com/watch?v=example-portrait'
            },
            {
                title: 'Concept Art',
                description: 'Environment concept art for a science fiction project.',
                imagePath: 'art/Digital/MysteriousSky.jpg',
                instagramUrl: 'https://www.instagram.com/p/example-concept/',
                youtubeUrl: ''
            },
            {
                title: 'digital illustration',
                description: 'Illustration of a moment in time.',
                imagePath: 'art/Digital/Sista.jpg',
                instagramUrl: '',
                youtubeUrl: ''
            },
            {
                title: 'Baby Hanuman',
                description: 'Illustration of the legendary monkey god Hanuman.',
                imagePath: 'art/Digital/BabyHanuman.jpg',
                instagramUrl: 'https://www.instagram.com/p/C73y1Y2Pw-e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                youtubeUrl: 'https://youtube.com/shorts/5mZRfIhPaCI?si=KvqfH4JsNbIJJfWA'
            },
            {
                title: 'Deadpool & Wolverine',
                description: 'Imagining a crossover between Deadpool and Wolverine.',
                imagePath: 'art/Digital/DeadpoolWolverine.jpg',
                instagramUrl: 'https://www.instagram.com/p/DAfovukNy8m/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                youtubeUrl: ''
            },
            {
                title: 'Baby Yoda',
                description: 'Illustration of baby Yoda in my style.',
                imagePath: 'art/Digital/Yoda.jpg',
                instagramUrl: 'https://www.instagram.com/p/C7q65tevxoI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                youtubeUrl: 'https://www.youtube.com/shorts/M5-An2FFs0o'
            },
            {
                title: 'Krishna',
                description: 'Illustration of Krishna from the movie - Kalki.',
                imagePath: 'art/Digital/KrishnaKalki.jpg',
                instagramUrl: 'https://www.instagram.com/reel/C9jR5hcPhzc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                youtubeUrl: 'https://youtube.com/shorts/ksfyEbwyROk?si=jArPNFCWnF2-m4SZ'
            }
        ];
    } else if (type === 'traditional') {
        artworks = [
            {
                title: 'Hanuman',
                description: 'Pencil Sketch of Hanuman.',
                imagePath: 'art/Traditional/Hanuman.jpg',
                instagramUrl: 'https://www.instagram.com/p/example-oil/',
                youtubeUrl: 'https://www.youtube.com/watch?v=example-oil'
            },
            {
                title: 'Penny Wise',
                description: 'Botanical watercolor study of local flora.',
                imagePath: 'art/Traditional/It.jpg',
                instagramUrl: 'https://www.instagram.com/p/example-watercolor/',
                youtubeUrl: ''
            },
            {
                title: 'Joker',
                description: 'Pencil Sketch of Joker.',
                imagePath: 'art/Traditional/JokerFace.jpg',
                instagramUrl: '',
                youtubeUrl: 'https://www.youtube.com/watch?v=example-charcoal'
            },
            {
                title: 'Doodle',
                description: 'Experimental piece combining a peacock with doodling',
                imagePath: 'art/Traditional/PeacockDoodle.jpg',
                instagramUrl: 'https://www.instagram.com/p/example-mixed/',
                youtubeUrl: 'https://www.youtube.com/watch?v=example-mixed'
            },
            // {
            //     title: 'Ink Drawing',
            //     description: 'Detailed pen and ink drawing of an architectural subject.',
            //     imagePath: 'art/traditional/ink.jpg',
            //     instagramUrl: '',
            //     youtubeUrl: ''
            // },
            // {
            //     title: 'Pastel Landscape',
            //     description: 'Soft pastel landscape study capturing sunset colors.',
            //     imagePath: 'art/traditional/pastel.jpg',
            //     instagramUrl: 'https://www.instagram.com/p/example-pastel/',
            //     youtubeUrl: ''
            // }
        ];
    }
    
    return artworks;
}

// Handle contact form submission
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (const [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real implementation, you would send this data to your server
            console.log('Form submitted:', formValues);
            
            // Show success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            const submitButton = contactForm.querySelector('button');
            
            // Hide form fields
            formGroups.forEach(group => {
                group.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                group.style.opacity = '0';
                group.style.transform = 'translateY(-20px)';
            });
            
            submitButton.style.opacity = '0';
            submitButton.style.transform = 'translateY(-20px)';
            
            // Create success message
            setTimeout(() => {
                // Clear the form container
                contactForm.innerHTML = '';
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                `;
                
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '2rem';
                
                // Add to DOM
                contactForm.appendChild(successMessage);
                
                // Animate in
                setTimeout(() => {
                    successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
            }, 300);
        });
    }
}

// Setup theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('artPortfolioTheme');
    
    // Apply saved theme if it exists
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        // Toggle theme class on root element
        document.documentElement.classList.toggle('light-mode');
        
        // Update button icon
        if (document.documentElement.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('artPortfolioTheme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('artPortfolioTheme', 'dark');
        }
        
        // Add animation to the button
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0)';
        }, 500);
    });
}

// Setup mobile touch optimizations
function setupMobileOptimizations() {
    // Improve touch interactions for mobile users
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Enhance gallery drag sensitivity for touch
        document.querySelectorAll('.gallery-track').forEach(track => {
            // Increase touch targets
            track.style.touchAction = 'pan-x';
            
            // Add touch feedback animation
            track.addEventListener('touchstart', () => {
                track.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            track.addEventListener('touchend', () => {
                track.style.transform = 'scale(1)';
            }, { passive: true });
        });
        
        // Fix 300ms delay for buttons
        document.querySelectorAll('button, .btn, .social-link, .gallery-control-btn').forEach(btn => {
            btn.style.touchAction = 'manipulation';
        });
        
        // Add fast click for popup handling
        const popup = document.querySelector('.image-popup');
        if (popup) {
            popup.addEventListener('touchstart', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }, { passive: true });
        }
        
        // Optimize form inputs for mobile
        document.querySelectorAll('input, textarea').forEach(input => {
            // Auto capitalize first letter on name field
            if (input.name === 'name') {
                input.autocapitalize = 'words';
            }
            
            // Appropriate input types
            if (input.type === 'email') {
                input.autocomplete = 'email';
            }
            
            // Add subtle feedback on focus
            input.addEventListener('focus', () => {
                input.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'translateY(0)';
            });
        });
    }
}

// Setup social intro section special effects
function setupSocialIntro() {
    const socialIntroLinks = document.querySelectorAll('.intro-social-link');
    
    // Add mouse tracking effect to social links
    socialIntroLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Apply the effect
            link.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
            
            // Add subtle shadow effect
            const icon = link.querySelector('.intro-social-icon');
            icon.style.boxShadow = `${(x - centerX) / 15}px ${(y - centerY) / 15}px 15px rgba(139, 92, 246, 0.3)`;
        });
        
        // Reset on mouse leave
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            const icon = link.querySelector('.intro-social-icon');
            icon.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.3)';
            
            // Animate back to normal position
            link.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
            }, 500);
        });
    });
}

// Setup profile picture upload functionality
function setupProfileUpload() {
    const profileInput = document.getElementById('profile-upload');
    const profileImage = document.getElementById('profile-pic');
    
    if (!profileInput || !profileImage) return;
    
    // Set default image if image is missing
    profileImage.onerror = function() {
        this.src = 'https://via.placeholder.com/250x250?text=Upload+Profile+Photo';
    };
    
    // Check if there's a saved profile in localStorage
    const savedProfile = localStorage.getItem('profileImage');
    if (savedProfile) {
        profileImage.src = savedProfile;
    }
    
    // Handle file upload
    profileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imageData = e.target.result;
                profileImage.src = imageData;
                
                // Save to localStorage (only works for fairly small images)
                try {
                    localStorage.setItem('profileImage', imageData);
                } catch (e) {
                    console.warn('Image too large to save in localStorage');
                }
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Make the entire container clickable
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('click', function() {
            profileInput.click();
        });
    }
} 