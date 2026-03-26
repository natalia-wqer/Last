// ================= INIT =================
let step = 0;
let memoryStep = 0;

// ================= DATA =================
const memories = [
"I like talking to you.",
"You make things feel lighter.",
"And I didn’t act like that."
];

const messages = [
"Jona… this is a little embarrassing.",
"I ignored your messages.",
"And yeah… that wasn’t fair to you.",
"I tried to justify it.",
"It didn’t work.",
"I messed up.",
"But I do care about you.",
"And I should’ve shown that.",
"So this is me actually trying."
];

// ================= GSAP SCENE SWITCH =================
function goToScene(target) {
    const current = document.querySelector(".scene.active");
    const next = document.getElementById("scene" + target);

    gsap.to(current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        onComplete: () => {
            current.classList.remove("active");
            next.classList.add("active");

            gsap.fromTo(next,
                { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
            );
        }
    });
}

// ================= TYPEWRITER =================
function typeText(text, el, speed = 25) {
    el.innerHTML = "";
    let i = 0;

    const interval = setInterval(() => {
        el.innerHTML += text[i];
        i++;

        if (i >= text.length) clearInterval(interval);
    }, speed);
}

// ================= MEMORY =================
function nextMemory() {
    const el = document.getElementById("memoryText");

    if (memoryStep < memories.length) {
        typeText(memories[memoryStep], el);

        gsap.from(el, { y: 20, opacity: 0, duration: 0.5 });

        memoryStep++;
    } else {
        goToScene(3);
        loadChat();
    }
}

// ================= CHAT =================
function loadChat() {
    const chat = document.getElementById("chat");

    chat.innerHTML = `
        <div class="msg her">hey??</div>
        <div class="msg her">are you ignoring me</div>
        <div class="msg her">wow okay</div>
    `;

    gsap.from(".msg", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5
    });
}

// ================= CHARACTER =================
function setCharacterState(state) {
    const me = document.getElementById("me");
    const her = document.getElementById("her");

    gsap.to([me, her], {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });

    me.className = "character " + state;
    her.className = "character " + state;
}

// ================= APOLOGY =================
function nextStep() {
    const textEl = document.getElementById("text");

    if (step < messages.length) {
        typeText(messages[step], textEl);

        gsap.from(textEl, {
            y: 15,
            opacity: 0,
            duration: 0.4
        });

        // Emotional states
        if (step < 3) setCharacterState("sad");
        else if (step < 6) setCharacterState("shocked");
        else setCharacterState("sad");

        // Dramatic moment
        if (messages[step].includes("messed up")) {
            gsap.fromTo(textEl,
                { x: -5 },
                { x: 5, repeat: 4, yoyo: true, duration: 0.05 }
            );
        }

        step++;
    } else {
        goToScene(5);
    }
}

// ================= FINAL =================
function forgive() {
    const final = document.getElementById("final");

    final.classList.remove("hidden");
    final.innerText = "Okay… I’m really glad. I’ll do better.";

    gsap.from(final, {
        opacity: 0,
        y: 20,
        duration: 0.6
    });

    setCharacterState("happy");
    createHearts();
}

// ================= NO BUTTON =================
function moveNo() {
    const btn = document.getElementById("noBtn");

    gsap.to(btn, {
        x: Math.random() * 300 - 150,
        y: Math.random() * 200 - 100,
        duration: 0.4,
        ease: "power2.out"
    });
}

// ================= LILIES =================
function createLilies() {
    const container = document.getElementById("lily-container");

    setInterval(() => {
        const lily = document.createElement("div");
        lily.classList.add("lily");

        lily.style.left = Math.random() * 100 + "vw";

        const duration = 6 + Math.random() * 6;

        gsap.fromTo(lily,
            { y: "-10vh", rotation: 0, opacity: 0 },
            {
                y: "110vh",
                rotation: 360,
                opacity: 1,
                duration: duration,
                ease: "none"
            }
        );

        container.appendChild(lily);

        setTimeout(() => lily.remove(), duration * 1000);
    }, 300);
}

// ================= HEARTS =================
function createHearts() {
    setInterval(() => {
        const heart = document.createElement("div");

        heart.classList.add("heart");
        heart.innerText = "♡";
        heart.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(heart);

        gsap.fromTo(heart,
            { y: "100vh", opacity: 0 },
            { y: "-10vh", opacity: 1, duration: 5, ease: "none" }
        );

        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

// ================= START =================
document.addEventListener("DOMContentLoaded", () => {
    createLilies();

    // Intro animation
    gsap.from(".card", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });
});
