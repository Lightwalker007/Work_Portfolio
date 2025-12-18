document.addEventListener('DOMContentLoaded', () => {
    // New Pathway Logic
    const pathBtns = document.querySelectorAll('.path-btn');
    const pathTimelines = document.querySelectorAll('.pathway-timeline');

    pathBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPath = btn.getAttribute('data-path');

            // Update buttons
            pathBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Update timelines
            pathTimelines.forEach(timeline => {
                timeline.classList.remove('active');
                if (timeline.id === targetPath) {
                    timeline.classList.add('active');
                    
                    // Reset animations for replay
                    const steps = timeline.querySelectorAll('.timeline-step');
                    steps.forEach(step => {
                        step.style.animation = 'none';
                        step.offsetHeight; /* Trigger reflow */
                        step.style.animation = null; 
                    });
                }
            });
        });
    });

    // Scroll reveal/sticky header effect
    let lastScroll = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // scroll down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // scroll up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});
