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

d_btnVideos.onclick = () => { d_secVideos.classList.remove('hidden'); };
d_btnInfo.onclick = () => { d_secInfo.classList.remove('hidden'); };
d_btnAgenda.onclick = () => { d_secAgenda.classList.remove('hidden'); };

d_btnCloseVideos.onclick = () => { d_secVideos.classList.add('hidden'); };
d_btnCloseInfo.onclick = () => { d_secInfo.classList.add('hidden'); };
d_btnCloseAgenda.onclick = () => { d_secAgenda.classList.add('hidden'); };

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