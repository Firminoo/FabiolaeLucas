document.addEventListener('DOMContentLoaded', () => {

    // --- SLIDER PRINCIPAL ---
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots');
    const prevBtn = document.querySelector('.btn.prev');
    const nextBtn = document.querySelector('.btn.next');
    let currentIndex = 0;
    let autoPlayInterval;

    if (slides.length > 0) {
        // Cria os pontos de navegação
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateSlides() {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        function moveSlide(step) {
            currentIndex = (currentIndex + step + slides.length) % slides.length;
            updateSlides();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
        }
        
        // Liga os botões
        prevBtn.addEventListener('click', () => {
            moveSlide(-1);
            resetAutoPlay();
        });
        nextBtn.addEventListener('click', () => {
            moveSlide(1);
            resetAutoPlay();
        });

        // Autoplay
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => moveSlide(1), 4000);
        }
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
        slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        slider.addEventListener('mouseleave', startAutoPlay);

        // Suporte a Swipe em Touchscreens
        let startX = 0;
        slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        slider.addEventListener('touchend', e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) moveSlide(1);
            if (endX - startX > 50) moveSlide(-1);
            resetAutoPlay();
        });

        updateSlides();
        startAutoPlay();
    }

    // --- MÚSICA ---
    const musicBtn = document.getElementById('music-btn');
    const nextMusicBtn = document.getElementById('next-music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicList = ["musica.mp3", "musica2.mp3"];
    let musicIndex = 0;
    let isPlaying = false;

    function loadMusic() {
        if (musicList.length > 0) {
            bgMusic.src = musicList[musicIndex];
        }
    }

    function playMusic() {
        bgMusic.play();
        isPlaying = true;
        musicBtn.textContent = "⏸ Pausar Música";
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicBtn.textContent = "🎵 Tocar Música";
    }

    musicBtn.addEventListener('click', () => {
        isPlaying ? pauseMusic() : playMusic();
    });

    nextMusicBtn.addEventListener('click', () => {
        musicIndex = (musicIndex + 1) % musicList.length;
        loadMusic();
        playMusic();
    });
    
    bgMusic.addEventListener('ended', () => {
        nextMusicBtn.click();
    });

    loadMusic();

    // --- CORAÇÕES FLUTUANTES (FUNDO DA PÁGINA) ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.textContent = "❤️";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    setInterval(createHeart, 500);

    // --- CONTADOR DE TEMPO PRECISO ---
    const timerElement = document.getElementById("timer");
    const startDate = new Date("2021-08-07T00:00:00");
    
    function updateTimer() {
        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const currentMonth = now.getMonth();
        const startDay = startDate.getDate();
        const currentDay = now.getDate();

        if (currentMonth < startMonth || (currentMonth === startMonth && currentDay < startDay)) {
            years--;
        }

        const lastAnniversary = new Date(startDate);
        lastAnniversary.setFullYear(startDate.getFullYear() + years);
        
        const diff = now - lastAnniversary;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${years} anos, ${days} dias, ${hours}h, ${minutes}m e ${seconds}s 💕`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // --- LÓGICA DA JANELA MODAL E SEUS EFEITOS ---
    const modal = document.getElementById("moment-modal");
    const revealBtn = document.getElementById("reveal-btn");
    const closeBtn = document.querySelector(".close-btn");

    // --- SLIDER DA MODAL (MINI-SLIDER) ---
    const miniSlides = document.querySelectorAll('.mini-slide');
    const miniPrevBtn = document.querySelector('.mini-prev');
    const miniNextBtn = document.querySelector('.mini-next');
    let miniCurrentIndex = 0;

    function showMiniSlide(index) {
        miniSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    if (miniSlides.length > 0) {
        miniPrevBtn.addEventListener('click', () => {
            miniCurrentIndex = (miniCurrentIndex - 1 + miniSlides.length) % miniSlides.length;
            showMiniSlide(miniCurrentIndex);
        });
    
        miniNextBtn.addEventListener('click', () => {
            miniCurrentIndex = (miniCurrentIndex + 1) % miniSlides.length;
            showMiniSlide(miniCurrentIndex);
        });
    }
    
    // --- PARTÍCULAS MÁGICAS NA MODAL ---
    let particleInterval;

    function createParticle() {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        const duration = Math.random() * 3 + 4;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        modalContent.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, (duration + 2) * 1000);
    }

    function startParticles() {
        if (particleInterval) clearInterval(particleInterval);
        particleInterval = setInterval(createParticle, 100);
    }

    function stopParticles() {
        if (particleInterval) clearInterval(particleInterval);
        document.querySelectorAll('.particle').forEach(p => p.remove());
    }

    // --- CONTROLES DE ABRIR/FECHAR A MODAL ---
    revealBtn.addEventListener('click', () => {
        modal.style.display = "flex";
        miniCurrentIndex = 0;
        showMiniSlide(miniCurrentIndex);
        startParticles();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        stopParticles();
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            stopParticles();
        }
    });
});