document.addEventListener('DOMContentLoaded', () => {
    const showMoreBtn = document.querySelector('#show-more');
    const container = document.querySelector('#container-Project');
    const homeLogo = document.querySelector('#LogoHome a');

    // --- SPLASH SCREEN ---
    const hasVisited = sessionStorage.getItem('hasVisited');

    let skeletonDelay = 1000; // default for returning visits

    if (!hasVisited) {
        sessionStorage.setItem('hasVisited', 'true');

        const splash = document.createElement('div');
        splash.id = 'splash-screen';
        splash.innerHTML = `<img src="Image/Nior Cat Logo.png" alt="Logo">`;
        document.body.appendChild(splash);

        // splash shows for 1500ms, then fades for 800ms = 2300ms total
        skeletonDelay = 3600;

        setTimeout(() => {
            // 1. Fade out the logo inside the splash
            const splashImg = splash.querySelector('img');
            splashImg.style.transition = 'opacity 0.6s ease';
            splashImg.style.opacity = '0';

            // 2. After logo fades, hold black screen for 400ms, then remove splash
            setTimeout(() => {
                splash.classList.add('fade-out'); // fades the black bg itself
                setTimeout(() => splash.remove(), 800);
            }, 200); // 200ms black screen hold
        }, 1500);
    }



    if (!showMoreBtn || !container) return;

    // 1. Initialize: Load saved count or default to 3
    let currentItem = parseInt(localStorage.getItem('projectCount')) || 3;

    // Logo click resets the count
    if (homeLogo) {
        homeLogo.onclick = () => localStorage.removeItem('projectCount');
    }

const updateDisplay = (isInitialLoad = false) => {
    const boxes = [...document.querySelectorAll('.project-card')];
    
    boxes.forEach((box, index) => {
        if (index < currentItem) {
            // --- SHOWING CARDS ---
            if (!box.classList.contains('show')) {
                box.style.display = 'inline-block';
                
                // Use a tiny timeout to ensure display: inline-block is rendered 
                // before adding the 'show' class for the opacity transition
                const delay = isInitialLoad ? index * 50 : (index % 3) * 100;
                setTimeout(() => box.classList.add('show'), delay);
            }
        } else {
            // --- HIDING CARDS (The Fix) ---
            // 1. Remove the animation class
            box.classList.remove('show');
            
            // 2. Hide from layout immediately
            box.style.display = 'none';
        }
    });

// Update button text
    if (showMoreBtn) {
        const remaining = boxes.length - currentItem;
        const hideable = currentItem - 3;

        if (currentItem >= boxes.length && boxes.length > 3) {
            showMoreBtn.innerText = `Show Less (${hideable})`;
        } else {
            showMoreBtn.innerText = `Show More (${remaining})`;
        }
    }
};

    // --- SKELETON LOADER — LOGO ---
    const logoHome = document.querySelector('#LogoHome');
    const logoOriginalHTML = logoHome.innerHTML;

    logoHome.style.opacity = '0';
    logoHome.style.pointerEvents = 'none';


    // --- SKELETON LOADER — HERO SECTION ---
    const heroSection = document.querySelector('.first-section');
    const heroOriginalHTML = heroSection.innerHTML;

    heroSection.innerHTML = `
        <div class="skeleton-circle"></div>
        <div class="skeleton-text-block">
            <div class="skeleton-text-line title"></div>
            <div class="skeleton-text-line full"></div>
            <div class="skeleton-text-line wide"></div>
            <div class="skeleton-text-line short"></div>
            <div class="skeleton-btn-group">
                <div class="skeleton-hero-btn"></div>
                <div class="skeleton-hero-btn"></div>
            </div>
        </div>
    `;

    // --- SKELETON LOADER — PROJECT TITLE ---
    const projectTitle = document.querySelector('#section_ProjectTitle');
    const projectTitleOriginalHTML = projectTitle.innerHTML;

    projectTitle.innerHTML = `<div class="skeleton-text-line title" style="width:200px; margin: 0 auto;"></div>`;

    // --- SKELETON LOADER ---
    const boxes = [...document.querySelectorAll('.project-card')];
    // Inject skeleton HTML and show first 3 as skeletons
    boxes.forEach((box, index) => {
        if (index < 3) {
            box.classList.add('skeleton', 'show');
            box.style.display = 'flex';
            box.dataset.originalHTML = box.innerHTML;
            box.innerHTML = `
                <div class="skeleton-img"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-btn"></div>
            `;
        }
    });

            // --- SKELETON LOADER — SHOW MORE BUTTON ---
    const showMoreOriginalHTML = showMoreBtn.innerText;
    showMoreBtn.style.opacity = '0';
    showMoreBtn.style.pointerEvents = 'none';


        // --- SKELETON LOADER — EDUCATION SECTION ---
    const educationSection = document.querySelector('#section_Education');
    const educationOriginalHTML = educationSection.innerHTML;

    educationSection.innerHTML = `
        <div class="skeleton-text-line title" style="width: 200px; margin: 0 auto 40px;"></div>
        <div style="display: flex; justify-content: center;">
            <div class="skeleton-education-card">
                <div class="skeleton-line medium" style="height:20px; border-radius:8px;"></div>
                <div class="skeleton-line short" style="height:16px; border-radius:8px; margin-top:12px;"></div>
                <div class="skeleton-line short" style="height:16px; border-radius:8px; width:30%; margin-top:12px;"></div>
            </div>
        </div>
    `;  

    // --- SKELETON LOADER — SKILLS SECTION ---
    const skillsSection = document.querySelector('#section_Skills');
    const skillsOriginalHTML = skillsSection.innerHTML;

    const skillCount = skillsSection.querySelectorAll('.skill-icon').length;
    const skeletonIcons = Array.from({ length: skillCount }, () => 
        `<div class="skeleton-skill-icon"></div>`
    ).join('');

    skillsSection.innerHTML = `
        <div class="skeleton-text-line title" style="width: 250px; margin: 0 auto 40px;"></div>
        <div class="skeleton-skills-container">
            ${skeletonIcons}
        </div>
    `;

    // --- SKELETON LOADER — CONTACT SECTION ---
    const contactSection = document.querySelector('#section-ContactMe');
    const contactOriginalHTML = contactSection.innerHTML;

    contactSection.innerHTML = `
        <div id="section_ContactTitle" style="display:flex; justify-content:center; position:relative; top:105px;">
            <div class="skeleton-text-line title" style="width: 220px;"></div>
        </div>

        <div id="container-ContactMe" style="display:flex; flex-direction:row; justify-content:center; align-items:stretch; height:700px;">
            
            <div id="container-Context" style="width:40%; margin-left:10%; display:flex; flex-direction:column;">
                <div style="margin-top:35%; margin-left:10%; margin-right:10%;">
                    <div class="skeleton-text-line" style="height:24px; width:80%; border-radius:8px;"></div>
                    <div class="skeleton-text-line" style="height:16px; width:100%; border-radius:8px; margin-top:14px;"></div>
                    <div class="skeleton-text-line" style="height:16px; width:90%; border-radius:8px; margin-top:10px;"></div>
                    <div class="skeleton-text-line" style="height:5px; width:90%; border-radius:8px; margin-top:20px;"></div>
                    <div style="display:flex; gap:20px; margin-top:30px;">
                        ${Array.from({ length: 5 }, () => `<div class="skeleton-social-icon"></div>`).join('')}
                    </div>
                </div>
            </div>

            <div id="Contact-Form-Div" style="width:50%; display:flex; align-items:stretch;">
                <div style="width:100%; display:flex; align-items:center; justify-content:space-evenly;">
                    <div class="skeleton-contact-form-panel">
                        <div class="skeleton-text-line" style="height:28px; width:50%; border-radius:8px;"></div>
                        <div class="skeleton-text-line" style="height:5px; width:100%; border-radius:8px; margin-top:8px;"></div>
                        <div class="skeleton-input"></div>
                        <div class="skeleton-input"></div>
                        <div class="skeleton-input textarea"></div>
                        <div class="skeleton-input btn"></div>
                    </div>
                </div>
            </div>

        </div>
    `;

    // Remove skeletons and show real content after short delay
    setTimeout(() => {

        // Restore logo
        logoHome.style.opacity = '1';
        logoHome.style.pointerEvents = 'auto';

        // Restore hero section
        heroSection.innerHTML = heroOriginalHTML;

        // Restore project title
        projectTitle.innerHTML = projectTitleOriginalHTML;

        // Restore show-more button
        showMoreBtn.style.opacity = '1';
        showMoreBtn.style.pointerEvents = 'auto';

        // Restore education section
        educationSection.innerHTML = educationOriginalHTML;

        // Restore skills section
        skillsSection.innerHTML = skillsOriginalHTML;

        // Restore contact section
        contactSection.innerHTML = contactOriginalHTML;

        // Restore project cards section
        boxes.forEach((box) => {
            if (box.classList.contains('skeleton')) {
                box.innerHTML = box.dataset.originalHTML;
                box.classList.remove('skeleton');
            }
        });
        updateDisplay(true);
    }, skeletonDelay);

    // Run immediately on load
    // updateDisplay(true);

    showMoreBtn.onclick = () => {
        const boxes = [...document.querySelectorAll('.project-card')];
        
        if (showMoreBtn.innerText.startsWith("Show More")) {
            currentItem += 3;
            if (currentItem > boxes.length) currentItem = boxes.length;
        } else {
            // SHOW LESS LOGIC
            currentItem = 3;
            // Smooth scroll back to the project section so the user isn't lost
            container.scrollIntoView({ behavior: 'smooth' });
        }

        localStorage.setItem('projectCount', currentItem);
        updateDisplay(false);
    };

    
    // --- SKILL ICON HOVER EFFECT ---
    document.querySelectorAll('.skill-icon').forEach(el => {
        el.onmousemove = function(e) {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--x', (e.clientX - rect.left) + 'px');
            el.style.setProperty('--y', (e.clientY - rect.top) + 'px');
        };
    });
});


