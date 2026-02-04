document.addEventListener('DOMContentLoaded', () => {

    const introScreen = document.getElementById('intro-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const surpriseBtn = document.getElementById('surprise-btn');
    const hiddenMessage = document.getElementById('hidden-message');

    // Intro Sequence
    function createIntroHeart() {
        if (introScreen.classList.contains('hidden')) return;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        introScreen.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }
    const heartInterval = setInterval(createIntroHeart, 400);

    enterBtn.addEventListener('click', () => {
        clearInterval(heartInterval);

        // Button Exit Animation
        enterBtn.style.transform = 'scale(0) rotate(180deg)';
        enterBtn.style.transition = 'transform 0.5s ease-in';

        // Text Exit Animation
        const introText = document.querySelector('.intro-text');
        introText.style.transform = 'translateY(-50px)';
        introText.style.opacity = '0';
        introText.style.transition = 'all 0.5s ease-in';

        // Background Fade (Wait until button is gone!)
        setTimeout(() => {
            introScreen.style.transition = 'opacity 1s ease'; // Ensure transition is active
            introScreen.style.opacity = '0';
        }, 600); // Wait 600ms (500ms animation + buffer)

        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');

            // Start observing elements once main content is visible
            initObserver();
        }, 1600); // 600ms start + 1000ms fade
    });

    // Scroll Animations
    function initObserver() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add a slight slide-up effect for text
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item, .scroll-reveal').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
            observer.observe(el);
        });
    }

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });

    // Magical Cursor Sparkles
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.3) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            const colors = ['#FFD700', '#FFB6C1', '#87CEFA', '#ffffff'];
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const size = Math.random() * 8 + 4 + 'px';
            sparkle.style.width = size;
            sparkle.style.height = size;

            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;

            // Random movement offset
            const moveX = (Math.random() - 0.5) * 100;
            const moveY = (Math.random() - 0.5) * 100;
            sparkle.style.setProperty('--moveX', `${moveX}px`);
            sparkle.style.setProperty('--moveY', `${moveY}px`);

            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    });

    // Music Player
    const musicPlayer = document.getElementById('music-player');
    const audio = document.getElementById('bg-music');
    const artistName = document.querySelector('.artist-name');
    let isPlaying = false;

    musicPlayer.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicPlayer.classList.remove('playing');
            artistName.textContent = "Click to Play";
        } else {
            audio.play();
            musicPlayer.classList.add('playing');
            artistName.textContent = "Now Playing...";
        }
        isPlaying = !isPlaying;
    });

    // Time Counter - Disabled (replaced with static romantic message)
    /*
    const startDate = new Date('2023-02-09T00:00:00'); // Example: Feb 9, 2023

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);

        document.getElementById('time-together').innerText =
            `${days} Days, ${hours} Hours, ${minutes} Mins`;
    }

    setInterval(updateCounter, 1000);
    updateCounter();
    */

    // Confetti on Make a Wish Button
    if (surpriseBtn) {
        console.log('✅ Make a Wish button found!');
        surpriseBtn.addEventListener('click', () => {
            console.log('🎉 Button clicked!');
            hiddenMessage.classList.remove('hidden');
            hiddenMessage.classList.add('fade-in');
            // surpriseBtn.style.display = 'none'; // Keep button visible for more wishes!

            // Pulse animation on click
            surpriseBtn.style.transform = 'scale(0.95)';
            setTimeout(() => surpriseBtn.style.transform = 'scale(1)', 150);

            var duration = 4000;
            var end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FF9A9E', '#FECFEF', '#ffffff', '#FFD700']
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF9A9E', '#FECFEF', '#ffffff', '#FFD700']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        });
    } else {
        console.error('❌ Make a Wish button NOT found!');
    }

    // Back to Top Button functionality
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Parallax Background
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        if (!shapes.length) return;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 25;
            const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
            const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Falling Rose Petals (Romantic Effect)
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 7000);
    }

    // Create petals periodically
    setInterval(createPetal, 800);
});
