// Tailwind Configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                cream: {
                    50: '#FFFDF9',
                    100: '#FAF7F2',
                    200: '#F5ECE3',
                    300: '#EAD9C8'
                },
                blush: {
                    100: '#FDEAE6',
                    200: '#F9D4CD',
                    300: '#F1B2A5',
                    400: '#E58A7A',
                    500: '#D46957',
                    600: '#B84F3E'
                },
                roseGold: '#D89A8C',
                warmGold: '#C9A35E',
                romanticDark: '#332325',
                romanticMuted: '#6D5558'
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                handwriting: ['"Caveat"', 'cursive'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif']
            },
            boxShadow: {
                'cozy': '0 10px 35px -5px rgba(212, 105, 87, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                'polaroid': '0 12px 28px rgba(90, 50, 55, 0.12)',
                'glow': '0 0 25px rgba(232, 165, 152, 0.55)',
                'candle': '0 0 16px 4px rgba(255, 180, 50, 0.7)'
            }
        }
    }
};
if (typeof tailwind !== 'undefined') {
    tailwind.config = window.tailwind.config;
}

/* ===================================================
   1. LIVE RELATIONSHIP COUNTER (Feb 20, 2024)
   =================================================== */
const relationshipStartDate = new Date("2024-02-20T00:00:00");

function updateCounter() {
    const now = new Date();
    const diffMs = now - relationshipStartDate;

    if (diffMs > 0) {
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const dElem = document.getElementById('counter-days');
        const hElem = document.getElementById('counter-hours');
        const mElem = document.getElementById('counter-minutes');
        const sElem = document.getElementById('counter-seconds');

        if (dElem) dElem.innerText = days;
        if (hElem) hElem.innerText = hours;
        if (mElem) mElem.innerText = minutes;
        if (sElem) sElem.innerText = seconds;
    }
}

/* ===================================================
   2. CANDLE BLOW OUT & CONFETTI
   =================================================== */
let candleBlown = false;

function blowCandle() {
    if (candleBlown) return;
    candleBlown = true;

    const flame = document.getElementById('candle-flame');
    const smoke = document.getElementById('candle-smoke');
    const button = document.getElementById('blow-btn');
    const wishBanner = document.getElementById('wish-revealed');

    // Extinguish animation
    if (flame) {
        flame.classList.remove('flame-active');
        flame.style.transform = 'scale(0)';
        flame.style.opacity = '0';
    }
    if (smoke) {
        smoke.classList.add('active');
    }

    if (button) {
        button.classList.add('opacity-50', 'cursor-not-allowed');
        button.innerHTML = '<i class="fa-solid fa-heart text-blush-200"></i> Wish Sent to God ✨';
    }

    // Confetti Explosion
    fireRomanticConfetti();

    // Reveal heartfelt pop-up
    setTimeout(() => {
        if (wishBanner) wishBanner.classList.remove('hidden');
    }, 600);
}

function fireRomanticConfetti() {
    if (typeof confetti !== 'function') return;
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        colors: ['#F7D6D0', '#E58A7A', '#D4AF37', '#FFFDF9', '#B84F3E']
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

/* ===================================================
   3. "OPEN WHEN..." LETTERS
   =================================================== */
const letters = [
    {
        tag: "Open on your Birthday Morning ☀️",
        title: "Happy Birthday, Beautiful Anna",
        body: "Good morning, my birthday girl. Before anything else today, take a deep breath and remember how precious you are. The world was given a masterpiece on this day, and I am the luckiest guy alive to hold your hand. I hope today brings you as much warmth, soft joy, and smiles as you bring into my life every day."
    },
    {
        tag: "Open When You Miss Me 💌",
        title: "I'm Right There In Your Heart",
        body: "Whenever you feel far away or you miss me, close your eyes and put your hand over your heart. That heartbeat? That's me, right there with you. Distance is only physical; you occupy every corner of my mind and thoughts. I love you endlessly, Anna."
    },
    {
        tag: "Open When You Need a Smile 🌸",
        title: "Just In Case You Forgot...",
        body: "You have that infectious, cute little laugh that completely disarms me. Remember our silly conversations, the inside jokes that only make sense to us, and how cute you look when you get excited about little things? You make this life so full of color. Now give me that pretty smile!"
    },
    {
        tag: "Open For a Midnight Secret ✨",
        title: "Our Quiet Future",
        body: "When the night is quiet and the stars are out, I often think about the future. All the places we haven't visited yet, all the coffee we have yet to share, and all the quiet mornings ahead. You are my forever favorite dream, Anna. Sweet dreams tonight."
    }
];

function openLetter(index) {
    const data = letters[index];
    if (!data) return;

    const tagElem = document.getElementById('modal-tag');
    const titleElem = document.getElementById('modal-title');
    const bodyElem = document.getElementById('modal-body');
    const modal = document.getElementById('letter-modal');

    if (tagElem) tagElem.innerText = data.tag;
    if (titleElem) titleElem.innerText = data.title;
    if (bodyElem) bodyElem.innerText = `"${data.body}"`;

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeLetter() {
    const modal = document.getElementById('letter-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

/* ===================================================
   4. JAR OF LOVE REASONS (150 Heartfelt Reasons)
   =================================================== */
const loveReasons = [
    "The way your eyes crinkle with genuine warmth when you laugh.",
    "How safe and peaceful the world feels whenever your hand is in mine.",
    "Because the universe got so much softer and brighter the day you were born.",
    "Your gentle heart that cares so deeply about the people you love.",
    "The cute little ways you express excitement over simple joys.",
    "How you make ordinary Tuesday evenings feel like romantic movies.",
    "Your patience, understanding, and the soft tone of your voice.",
    "The way you believe in me even when I doubt myself.",
    "Because being near you feels like finally coming home.",
    "How naturally beautiful you are, especially when you think you aren't trying.",
    "Your kindness, which inspires me to be a better man every single day.",
    "The silly inside jokes that only you and I truly understand.",
    "The look in your eyes right before we hug.",
    "Because loving you is the easiest, sweetest decision I've ever made.",
    "The way your laughter instantly turns my worst days into good ones.",
    "How you remember the smallest details about things I've told you.",
    "The comforting warmth of your hugs when words aren't enough.",
    "How passionate you get when talking about things you love.",
    "The cute sleepy voice you have in the morning.",
    "How you make every song sound better when I think of you while listening to it.",
    "That sparkle in your eyes when you see something you adore.",
    "The effortless way you make everyone around you feel valued.",
    "Your adorable expressions when you're concentrating on something.",
    "How you always know how to calm my mind when it's racing.",
    "The feeling of your head resting gently against my shoulder.",
    "The cute way you scrunch your nose when something makes you giggle.",
    "How our silences together are never awkward, just peaceful.",
    "That your hand fits perfectly in mine, like it was designed just for it.",
    "Your incredible empathy and how deeply you understand others.",
    "How you inspire me to dream bigger and love deeper.",
    "The way you look at me across a crowded room and make me feel like the only person there.",
    "Your sweet texts that pop up and make me smile at my phone like a fool.",
    "Because you are both my greatest adventure and my safest haven.",
    "The way you appreciate the little things in nature—sunsets, flowers, quiet breezes.",
    "How we can talk for hours without ever running out of things to say.",
    "The softest forehead kisses that always make everything right.",
    "How brave and resilient you are, even during tough moments.",
    "The way you blush when I give you an unexpected compliment.",
    "Because February 20, 2024, will forever be the best chapter title of my life.",
    "How sweet and gentle you are with animals.",
    "The cute little sounds you make when you yawn or stretch.",
    "How you never judge me and love me for exactly who I am.",
    "The way you make ordinary coffee dates feel like royalty.",
    "That radiant glow on your face when you're genuinely happy.",
    "How you make me look forward to every single tomorrow.",
    "The soft way you say my name that always catches my heart.",
    "How thoughtful you are with every gift and gesture you give.",
    "Because you make me laugh harder than anyone else in this world.",
    "The warmth of your smile that can light up the coldest room.",
    "How you always see the silver lining in cloudy situations.",
    "The way you tuck your hair behind your ear when you're thinking.",
    "How you make home feel like a person rather than a place.",
    "The genuine excitement you share whenever I achieve something good.",
    "Because your heart is the purest, kindest treasure I've ever found.",
    "How we can just look at each other and know exactly what the other is thinking.",
    "The sweet way you lean in just a little closer when we're walking.",
    "How you make simple grocery store trips feel like fun dates.",
    "Your artistic eye and the way you appreciate beauty in the world.",
    "Because you are the first thought in my mind when I wake up.",
    "And the sweetest dream I have before I fall asleep.",
    "The gentle way you touch my arm when you want my attention.",
    "How supportive you are of my goals and dreams.",
    "The way you can make me smile even through text messages.",
    "How your presence brings an instant sense of calm to my soul.",
    "The little dance you do when you eat food that's delicious.",
    "How you always listen with your whole heart.",
    "The adorable way you get cozy in warm blankets and sweaters.",
    "How proud I feel to tell people that you are my girl.",
    "The sweet nicknames that belong only to us.",
    "Because every sunset looks better when I'm watching it with you.",
    "How you make me want to learn and grow every single day.",
    "The delicate way you hold cups with both hands when drinking tea or coffee.",
    "How easily you forgive and how generously you love.",
    "The way you remember our special dates and anniversaries.",
    "Because you have the most beautiful soul, inside and out.",
    "The cute way you get passionate about your favorite shows or books.",
    "How you make ordinary car rides feel like joyful road trips.",
    "That gentle look of care in your eyes when I'm feeling sick or tired.",
    "How you make everything feel cozy, warm, and inviting.",
    "The sweetest kiss you give me unexpectedly.",
    "The cute way you try to act tough even when you're being adorable.",
    "How you celebrate my wins as if they were your own.",
    "Because with you, I can be completely vulnerable and completely myself.",
    "The way your voice brings me comfort across any distance.",
    "How beautiful you look in every outfit, even in simple oversized hoodies.",
    "Your wonderful sense of style and grace.",
    "The way you hold my pinky or interlock fingers when our hands touch.",
    "Because you believe in love in its most honest, genuine form.",
    "How you make even boring waiting rooms fun with your comments.",
    "The warmth of your breath against my cheek when you whisper something.",
    "How you always encourage me to take care of myself.",
    "That little sparkle that appears in your eyes when you tease me.",
    "Because you are my best friend and the love of my life, all in one.",
    "How you appreciate good storytelling and deep conversations.",
    "The sweet scent that always reminds me of you and brings immediate peace.",
    "How you never let me go to bed feeling unloved.",
    "The patience you show whenever things don't go according to plan.",
    "How you look at the stars with that sense of wonder in your eyes.",
    "Because your happiness is my highest priority in this world.",
    "The cute way you steal glances at me when you think I'm not looking.",
    "How you make simple home-cooked meals feel like a 5-star feast.",
    "That reassurance I feel knowing we are a team against anything.",
    "How you understand my quirks and love me because of them, not despite them.",
    "The way you celebrate other people's joy with total sincerity.",
    "Because holding you close is my favorite place in the universe.",
    "The cute little notes and sweet words you leave behind.",
    "How you make rainy, gloomy days feel romantic and warm.",
    "The confidence you give me just by believing in what I can do.",
    "How soft your hands feel in mine.",
    "The silly faces you make when we take photos together.",
    "Because with you, I never have to pretend to be someone I'm not.",
    "The way you can read my mood before I even say a single word.",
    "How you light up whenever you see something cute.",
    "The calm rhythm of breathing next to you when you fall asleep.",
    "Because you make life feel like a gift rather than a routine.",
    "The excitement of planning our future trips, dates, and adventures together.",
    "How you make me laugh until my stomach hurts.",
    "The thoughtful questions you ask that show how much you care.",
    "How your presence turns any house into a loving home.",
    "Because you always know the right thing to say when I'm overwhelmed.",
    "The sweet way you squeeze my hand three times to say 'I love you'.",
    "How you never take love for granted and cherish our connection.",
    "That look of pure joy on your face when you open a surprise.",
    "How you inspire me to be more patient, kind, and understanding.",
    "Because you make every season of the year feel special.",
    "The cute way you tuck your chin down when you're shy.",
    "How our memories together feel like pieces of gold I treasure in my heart.",
    "That feeling of relief when I finally get to see you after a long day.",
    "Because you are the reason I believe in true soulmates.",
    "The way you treat strangers, servers, and everyone with dignity and warmth.",
    "How you make ordinary walks around the neighborhood feel magical.",
    "The gentle way you brush stray hairs away from my face.",
    "Because your smile is the sweetest sunrise I could ever ask for.",
    "How we share our favorite songs and build soundtracks to our story.",
    "The cute way you get engrossed in something you're crafting or learning.",
    "That feeling of absolute trust I have with you.",
    "How you bring out the playful, joyful kid in me.",
    "The sweet way you celebrate half-birthdays and little milestones.",
    "Because you make me feel like the luckiest guy alive every single day.",
    "How you hold my arm tighter when walking through a crowd.",
    "The beautiful, quiet strength you carry with such grace.",
    "How you remember the things that matter to me, even when I forget.",
    "That cute little sigh of satisfaction when you take that first sip of coffee.",
    "Because loving you feels as natural and essential as breathing.",
    "How you make ordinary moments turn into lifelong core memories.",
    "The softness of your voice when you say 'I miss you'.",
    "How you accept all my imperfections and love me anyway.",
    "That feeling of excitement every time my phone vibrates hoping it's you.",
    "Because with you, my heart has found its permanent home.",
    "And simply because you are Anna—the one, only, and most wonderful girl I will ever love."
];

let currentReasonIndex = 0;

function pullLoveNote() {
    const noteBox = document.getElementById('love-note-box');
    const textElem = document.getElementById('love-note-text');
    const numElem = document.getElementById('love-note-number');

    if (!noteBox || !textElem || !numElem) return;

    // Small bounce fade transition
    noteBox.style.opacity = '0';
    noteBox.style.transform = 'scale(0.96)';

    setTimeout(() => {
        currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
        textElem.innerText = `"${loveReasons[currentReasonIndex]}"`;
        numElem.innerText = `Reason #${currentReasonIndex + 1} of ${loveReasons.length}`;
        noteBox.style.opacity = '1';
        noteBox.style.transform = 'scale(1)';
    }, 200);
}

function setSpecificLoveNote(index) {
    if (index < 0 || index >= loveReasons.length) return;
    currentReasonIndex = index;
    const textElem = document.getElementById('love-note-text');
    const numElem = document.getElementById('love-note-number');
    if (textElem) textElem.innerText = `"${loveReasons[currentReasonIndex]}"`;
    if (numElem) numElem.innerText = `Reason #${currentReasonIndex + 1} of ${loveReasons.length}`;
    closeAllNotesModal();
    const jarSection = document.getElementById('love-note-box');
    if (jarSection) jarSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ===================================================
   MODAL: ALL 150 REASONS VIEW
   =================================================== */
function renderAllNotes(filter = '') {
    const container = document.getElementById('all-notes-list');
    if (!container) return;

    const term = filter.trim().toLowerCase();
    container.innerHTML = '';

    let matchCount = 0;
    loveReasons.forEach((note, idx) => {
        if (!term || note.toLowerCase().includes(term) || `reason #${idx + 1}`.includes(term) || `${idx + 1}` === term) {
            matchCount++;
            const item = document.createElement('div');
            item.className = 'group p-3.5 rounded-2xl bg-white/90 border border-blush-100 hover:border-blush-300 shadow-sm transition flex items-start gap-3 cursor-pointer hover:bg-cream-50';
            item.onclick = () => setSpecificLoveNote(idx);

            item.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-blush-100 text-blush-500 flex items-center justify-center text-xs font-bold font-serif shrink-0 group-hover:bg-blush-400 group-hover:text-white transition">
                    ${idx + 1}
                </div>
                <div class="flex-1">
                    <p class="font-serif italic text-sm sm:text-base text-romanticDark leading-snug">
                        "${note}"
                    </p>
                    <span class="text-[11px] font-handwriting text-blush-500 flex items-center gap-1 mt-1 opacity-70 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-sparkles text-[10px]"></i> View in jar
                    </span>
                </div>
            `;
            container.appendChild(item);
        }
    });

    if (matchCount === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-romanticMuted font-handwriting text-xl">
                No notes match "${filter}". Try searching another sweet word!
            </div>
        `;
    }
}

function openAllNotesModal() {
    renderAllNotes();
    const modal = document.getElementById('all-notes-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    const searchInput = document.getElementById('notes-search-input');
    if (searchInput) {
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 150);
    }
}

function closeAllNotesModal() {
    const modal = document.getElementById('all-notes-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function filterNotes(query) {
    renderAllNotes(query);
}

/* ===================================================
   5. PHOTO SWAP PREVIEW FOR POLAROIDS
   =================================================== */
function previewImage(event, targetImgId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const targetImg = document.getElementById(targetImgId);
            if (targetImg) targetImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

/* ===================================================
   6. AUDIO PLAYER
   =================================================== */
let isPlaying = false;

function initAudio() {
    const audio = document.getElementById('romantic-audio');
    const audioBtn = document.getElementById('audio-toggle-btn');
    const audioIcon = document.getElementById('audio-icon');
    const audioStatus = document.getElementById('audio-status');
    const soundWave = document.getElementById('sound-wave');

    if (!audio || !audioBtn) return;

    audioBtn.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                if (audioIcon) audioIcon.classList.replace('fa-play', 'fa-pause');
                if (audioStatus) audioStatus.innerText = "Playing for Anna ✨";
                if (soundWave) {
                    soundWave.classList.remove('hidden');
                    soundWave.classList.add('flex');
                }
            }).catch(err => {
                // If browser policy blocks auto streaming, display friendly cue
                if (audioStatus) audioStatus.innerText = "Enjoying Anna's moment";
            });
        } else {
            audio.pause();
            isPlaying = false;
            if (audioIcon) audioIcon.classList.replace('fa-pause', 'fa-play');
            if (audioStatus) audioStatus.innerText = "Click to play ambient melody";
            if (soundWave) {
                soundWave.classList.add('hidden');
                soundWave.classList.remove('flex');
            }
        }
    });
}

/* ===================================================
   7. CANVAS: FLOATING SPARKLES & GENTLE HEARTS
   =================================================== */
function initCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height * 0.1;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.isHeart = Math.random() > 0.7; // 30% are little floating hearts
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.fillStyle = `rgba(229, 138, 122, ${this.opacity})`;
            if (this.isHeart) {
                ctx.font = `${this.size * 3 + 6}px serif`;
                ctx.fillText("♥", this.x, this.y);
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < 35; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ===================================================
   INITIALIZATION
   =================================================== */
function init() {
    updateCounter();
    setInterval(updateCounter, 1000);

    const letterModal = document.getElementById('letter-modal');
    if (letterModal) {
        letterModal.addEventListener('click', (e) => {
            if (e.target.id === 'letter-modal') closeLetter();
        });
    }

    const allNotesModal = document.getElementById('all-notes-modal');
    if (allNotesModal) {
        allNotesModal.addEventListener('click', (e) => {
            if (e.target.id === 'all-notes-modal') closeAllNotesModal();
        });
    }

    // Set initial note number to Reason #1 of 150
    const numElem = document.getElementById('love-note-number');
    if (numElem) {
        numElem.innerText = `Reason #1 of ${loveReasons.length}`;
    }

    initAudio();
    initCanvas();
}

// Make functions globally available for inline onclick handlers
window.blowCandle = blowCandle;
window.openLetter = openLetter;
window.closeLetter = closeLetter;
window.pullLoveNote = pullLoveNote;
window.setSpecificLoveNote = setSpecificLoveNote;
window.openAllNotesModal = openAllNotesModal;
window.closeAllNotesModal = closeAllNotesModal;
window.filterNotes = filterNotes;
window.previewImage = previewImage;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
