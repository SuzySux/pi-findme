import { Utils } from "../helpers/utils.js";

const d_triviaQuestions = [
    { question: "¿Cuántas veces ha clasificado México en el Mundial?", correct: "17 veces", incorrect: "5 veces", incorrect2: "12 veces" },
    { question: "¿Cuál fue el primer mundial de FIFA en el que participó México?", correct: "Uruguay 1930", incorrect: "Alemania 2006", incorrect2: "México 1970" },
    { question: "¿En qué mundial México utilizó un diferente uniforme?", correct: "Brasil 2014", incorrect: "Brasil 1950", incorrect2: "Chile 1962" },
    { question: "¿Después de qué mundial se empezó a traer chefs para cocinarles?", correct: "Estados Unidos 1994", incorrect: "Suiza 1954", incorrect2: "Corea-Japón 2002" },
    { question: "¿En qué año se celebró el primer Mundial en México?", correct: "1970", incorrect: "1962", incorrect2: "1986" },
    { question: "¿Qué jugador anotó el famoso 'Gol del Siglo' en México 86?", correct: "Diego Maradona", incorrect: "Pelé", incorrect2: "Hugo Sánchez" },
    { question: "¿Cuál fue la mascota oficial del Mundial México 1986?", correct: "Pique", incorrect: "Juanito", incorrect2: "Gauchito" },
    { question: "¿En qué estadio se jugaron las finales de 1970 y 1986?", correct: "Estadio Azteca", incorrect: "Estadio Jalisco", incorrect2: "Estadio Olímpico" },
    { question: "¿Quién fue el campeón del mundo en el Mundial de México 1970?", correct: "Brasil", incorrect: "Italia", incorrect2: "Alemania" },
    { question: "¿A qué fase llegó México en su mundial de 1986?", correct: "Cuartos de Final", incorrect: "Octavos de Final", incorrect2: "Semifinales" }
];

let d_curQuestion = 0;
let d_correctQuestions = 0; 

const d_lblTriviaQuestion = document.getElementById('lblTriviaQuestion');
const d_btnTriviaAnwser1 = document.getElementById('btnTriviaAnwser1');
const d_btnTriviaAnwser2 = document.getElementById('btnTriviaAnwser2');
const d_btnTriviaAnwser3 = document.getElementById('btnTriviaAnwser3');
const d_progressContainer = document.getElementById('triviaProgress');
const d_allButtons = [d_btnTriviaAnwser1, d_btnTriviaAnwser2, d_btnTriviaAnwser3];
d_allButtons.forEach(btn => {
    if(btn) btn.style.transition = "opacity 0.2s ease-in-out, background-color 0.2s ease-in-out";
});

function initProgressDots() {
    if (!d_progressContainer) return;
    d_progressContainer.innerHTML = ""; 
    d_triviaQuestions.forEach((_, index) => {
        const dot = document.createElement("p");
        dot.innerText = "●"; 
        dot.id = `dot-${index}`;
        dot.style.color = "#555"; 
        dot.className = "m-0 mx-1"; 
        d_progressContainer.appendChild(dot);
    });
}

function updateQuestion() {
    if (d_curQuestion >= d_triviaQuestions.length) return;

    const currentDot = document.getElementById(`dot-${d_curQuestion}`);
    if (currentDot) currentDot.style.color = "#FFFFFF";

    const currentData = d_triviaQuestions[d_curQuestion];
    d_lblTriviaQuestion.innerText = currentData.question;

    let options = [
        { text: currentData.correct, isCorrect: true },
        { text: currentData.incorrect, isCorrect: false },
        { text: currentData.incorrect2, isCorrect: false }
    ];

    options.sort(() => Math.random() - 0.5);

    d_allButtons.forEach((btn, index) => {
        btn.innerText = options[index].text;
        btn.dataset.isCorrect = options[index].isCorrect;
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
        btn.style.backgroundColor = ""; 
        btn.style.display = "block"; 
    });
}

function checkAnswer(event) {
    const selectedBtn = event.currentTarget;
    const l_isCorrect = selectedBtn.dataset.isCorrect === "true";

    d_allButtons.forEach(btn => btn.style.pointerEvents = "none");

    selectedBtn.style.opacity = "0.7";
    selectedBtn.style.backgroundColor = l_isCorrect ? "#28a745" : "#dc3545";

    const currentDot = document.getElementById(`dot-${d_curQuestion}`);
    if (currentDot) {
        currentDot.style.color = l_isCorrect ? "#28a745" : "#dc3545";
    }

    if (l_isCorrect) d_correctQuestions++; 

    setTimeout(() => {
        d_curQuestion++;
        if (d_curQuestion >= d_triviaQuestions.length) {
            showResults();
        } else { 
            updateQuestion(); 
        }
    }, 300); 
} 

function showResults() {
    d_lblTriviaQuestion.innerText = "";
    d_allButtons.forEach(btn => btn.style.display = "none");

    const spacer = document.getElementById('spacer');
    if (spacer) {
        // En lugar de ocultarlo, le quitamos el crecimiento y su altura
        // Esto hará que los círculos "suban" lentamente gracias a la transición de 0.8s
        spacer.style.flexGrow = "0";
        spacer.style.height = "0px";
        spacer.style.maxHeight = "0px";
    }
    
    if (!document.getElementById('finalResult')) {
        const resultMsg = document.createElement("h2");
        resultMsg.id = "finalResult";
        // Añadimos un margen arriba para que el mensaje aparezca con espacio
        resultMsg.className = "text-center mt-4 text-white fw-bold mb-4"; 
        resultMsg.innerText = `Tu puntuación: ${d_correctQuestions} de ${d_triviaQuestions.length}`;
        d_lblTriviaQuestion.after(resultMsg);
    }
}

if (d_btnTriviaAnwser1 && d_btnTriviaAnwser2 && d_btnTriviaAnwser3) {
    initProgressDots(); 
    d_allButtons.forEach(btn => btn.onclick = checkAnswer);
    updateQuestion();
}