const body = document.body;
const loginForm = document.getElementById('login-form');
const pull = document.getElementById('pull');
const clickSound = document.getElementById('click-sound');
const lampChain = document.querySelector('.lamp-chain');

let isOn = false;


body.classList.remove('lights-on');

function toggleLamp() {
    isOn = !isOn;
    clickSound.currentTime = 0;
    clickSound.play();

    body.classList.toggle('lights-on', isOn);

    if (isOn) {
        gsap.to(body, { backgroundColor: "#1c1f24", duration: 0.6 });
    } else {
        gsap.to(body, { backgroundColor: "#121417", duration: 0.6 });
    }
}


Draggable.create(pull, {
    type: "y",
    bounds: { minY: 0, maxY: 60 },
    onDrag: function () {
        // Трохи розтягуємо шнурок візуально
        lampChain.style.height = (100 + this.y) + 'px';
    },
    onDragEnd: function () {
        if (this.y > 30) {
            toggleLamp();
        }

        gsap.to(this.target, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        gsap.to(lampChain, { height: 100, duration: 0.6 });
    }
});