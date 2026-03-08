import { Utils } from "../helpers/utils.js";

const d_triviaQuestions = [
    {
        question: "¿Cuantas veces a clasificado Mexico en el Mundial?",
        correct: "17 veces",
        incorrect: "5 veces"
    },
    {
        question: "¿Cuál fue el primer mundial de FIFA en el que participó México?",
        correct: "Uruguay 1930",
        incorrect: "Alemania 2006"
    },
    {
        question: "¿En que mundial México utilizó un diferente uniforme?",
        correct: "Brazil 2014",
        incorrect: "Brazil 1950"
    },
    {
        question: "¿Después de que mundial se empezó a traer chefs para cocinarles?",
        correct: "Estados Unidos 1994",
        incorrect: "Suiza 1954"
    }
];

var d_curQuestion = 0;
var d_correctQuestions = 0;

const d_secVideos = document.getElementById("secVideos");
const d_secInfo = document.getElementById("secInfo");
const d_secAgenda = document.getElementById("secAgenda");

const d_btnVideos = document.getElementById("btnVideos");
const d_btnInfo = document.getElementById("btnInfo");
const d_btnAgenda = document.getElementById("btnAgenda");

const d_btnCloseVideos = document.getElementById("btnCloseVideos");
const d_btnCloseInfo = document.getElementById("btnCloseInfo");
const d_btnCloseAgenda = document.getElementById("btnCloseAgenda");

const d_lblTriviaQuestion = document.getElementById('lblTriviaQuestion');
const d_btnTriviaAnwser1 = document.getElementById('btnTriviaAnwser1');
const d_btnTriviaAnwser2 = document.getElementById('btnTriviaAnwser2');

const d_arEntity = document.querySelector('[mindar-image-target]');
const d_scene = document.getElementById('asc-camera');
let isModalOpen = false;

function toggleOverlay(hide) {
    const d_overlay = document.querySelector('.mindar-ui-overlay.mindar-ui-scanning');
    if (d_overlay) {
        if (hide) d_overlay.classList.add('hidden');
        else d_overlay.classList.remove('hidden');
    }
}

function controlCamera(play) {
    const system = d_scene.systems['mindar-image-system'];
    if (system) {
        if (play) system.start();
        else system.stop();
    }
}

d_btnVideos.onclick = () => { 
    d_secVideos.classList.remove('hidden'); 
    isModalOpen = true; 
    toggleOverlay(true); 
    setTimeout(() => { controlCamera(false); }, 500); 
};
d_btnInfo.onclick = () => { 
    d_secInfo.classList.remove('hidden'); 
    isModalOpen = true; 
    toggleOverlay(true); 
    setTimeout(() => { controlCamera(false); }, 500); 
};
d_btnAgenda.onclick = () => { 
    d_secAgenda.classList.remove('hidden'); 
    isModalOpen = true; 
    toggleOverlay(true); 
    setTimeout(() => { controlCamera(false); }, 500); 
};

d_btnCloseVideos.onclick = () => { d_secVideos.classList.add('hidden'); isModalOpen = false; toggleOverlay(false); controlCamera(true); };
d_btnCloseInfo.onclick = () => { d_secInfo.classList.add('hidden'); isModalOpen = false; toggleOverlay(false); controlCamera(true); };
d_btnCloseAgenda.onclick = () => { d_secAgenda.classList.add('hidden'); isModalOpen = false; toggleOverlay(false); controlCamera(true); };

function updateQuestion() {
    d_lblTriviaQuestion.innerText = d_triviaQuestions[d_curQuestion].question;

    const d_randomAnswer = Utils.randomBool(50);
    const d_correctAnswer = [d_btnTriviaAnwser1, d_btnTriviaAnwser2][d_randomAnswer ? 1 : 0];
    const d_correctIncorrect = [d_btnTriviaAnwser1, d_btnTriviaAnwser2][d_randomAnswer ? 0 : 1];

    d_correctAnswer.innerText  = d_triviaQuestions[d_curQuestion].correct;
    d_correctAnswer.dataset.isCorrect = true;
    
    d_correctIncorrect.innerText = d_triviaQuestions[d_curQuestion].incorrect;
    d_correctIncorrect.dataset.isCorrect = false;
}

function checkAnswer(_element) {
    const l_isCorrect = _element.target.dataset.isCorrect == "true";
    if (l_isCorrect) { d_correctQuestions++; } 

    d_curQuestion++;

    if (d_curQuestion >= d_triviaQuestions.length) {
        d_lblTriviaQuestion.innerText = `Respuestas Correctas: ${d_correctQuestions}/${d_triviaQuestions.length}`;

        d_btnTriviaAnwser1.remove();
        d_btnTriviaAnwser2.remove();
    } else { updateQuestion(); }
}

d_btnTriviaAnwser1.onclick = checkAnswer;
d_btnTriviaAnwser2.onclick = checkAnswer;

updateQuestion();

// --- Lógica para el Carrusel ---
const d_videoScroller = document.getElementById('videoScroller');
const d_videoItems = d_videoScroller.querySelectorAll('.video-item');
let d_activeVideo = null; // Referencia al video que está actualmente en el centro

function updateVideoVisuals() {
    const scrollerCenter = d_videoScroller.getBoundingClientRect().left + d_videoScroller.offsetWidth / 2;

    d_videoItems.forEach(video => {
        const videoRect = video.getBoundingClientRect();
        const videoCenter = videoRect.left + videoRect.width / 2;
        
        const distance = Math.abs(scrollerCenter - videoCenter);
        const isCenter = distance < (videoRect.width / 2);

        video.style.opacity = isCenter ? '1' : '0.4';
        video.style.transform = isCenter ? 'scale(1)' : 'scale(0.85)';
        
        const isPixelated = video.classList.contains('effect-pixel');
        const isHeatCam = video.classList.contains('effect-heatcam');
        const isChromatic = video.classList.contains('effect-chromatic');
        
        const blurEffect = isCenter ? 'blur(0px)' : 'blur(2px)';
        let activeEffect = '';
        if (isPixelated) activeEffect = 'url(#pixelate)';
        else if (isHeatCam) activeEffect = 'url(#heatcam)';
        else if (isChromatic) activeEffect = 'url(#chromatic)';
        
        video.style.filter = `${blurEffect} ${activeEffect}`.trim();

        // Lógica de reproducción
        if (isCenter) {
            d_activeVideo = video; // Guardamos el video actual
            if (video.paused) video.play().catch(() => {});
        } else {
            if (!video.paused || video.currentTime !== 0) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
}

// Escuchamos el evento scroll y ejecutamos al inicio
d_videoScroller.addEventListener('scroll', updateVideoVisuals);
// Llamada inicial para acomodar la primera imagen
updateVideoVisuals();

if (d_arEntity) {
    d_arEntity.addEventListener("targetLost", () => {
        if (!isModalOpen) toggleOverlay(false);
    });
}

// Pixel Effecto
const d_btnEffectPixel = document.getElementById('btnEffectPixel');
if (d_btnEffectPixel) {
    d_btnEffectPixel.onclick = () => {
        if (d_activeVideo) {
            d_activeVideo.classList.remove('effect-heatcam');
            d_activeVideo.classList.remove('effect-chromatic');
            d_activeVideo.classList.toggle('effect-pixel');
            updateVideoVisuals();
        }
    };
}

// Efecto Camera Heat
const d_btnEffectHeat = document.getElementById('btnEffectHeat');
if (d_btnEffectHeat) {
    d_btnEffectHeat.onclick = () => {
        if (d_activeVideo) {
            d_activeVideo.classList.remove('effect-pixel');
            d_activeVideo.classList.remove('effect-chromatic');
            d_activeVideo.classList.toggle('effect-heatcam');
            updateVideoVisuals();
        }
    };
}

// Effecto Aberracion Cromatica
const d_btnEffectChromatic = document.getElementById('btnEffectChromatic');
if (d_btnEffectChromatic) {
    d_btnEffectChromatic.onclick = () => {
        if (d_activeVideo) {
            d_activeVideo.classList.remove('effect-pixel');
            d_activeVideo.classList.remove('effect-heatcam');
            d_activeVideo.classList.toggle('effect-chromatic');
            updateVideoVisuals();
        }
    };
}