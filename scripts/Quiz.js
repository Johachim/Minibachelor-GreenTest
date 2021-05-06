const quizQuestions = [
    {
        question: "Bruger du primært en El bil eller en benzin/diesel bil (den bil der bruges oftest om du bliver kørt eller kører)?",
        answers: {
            a: "Benzin",
            b: "Diesel",
            c: "El"
        },
        correctAnswer: "c"
    },
    {
        question: "Har du nogle særlige spisevaner?",
        answers: {
            a: "Veganer",
            b: "Vegetar",
            c: "Spiser ikke rødt kød",
            d: "Spiser alt"
        },
        correctAnswer: "a"
    },
    {
        question: "Hvor lang tid bruger du normalt på et bad?",
        answers: {
            a: "< 5 minutter",
            b: "5-10 minutter",
            c: "10-15 minutter",
            d: "> 15 minutter"
        },
        correctAnswer: "a"
    },
    {
        question: "Hvor mange indendørs planter har du i din bolig?",
        answers: {
            a: "0",
            b: "1-2 pr. person i boligen",
            c: "3-4 pr. person i boligen",
            d: "5+ pr. person i boligen"
        },
        correctAnswer: "d"
    }
];

const quizContainer = document.querySelector(".quiz");
const resultsContainer = document.querySelector(".results")
const submitButton = document.querySelector(".submit")

buildQuiz = () => {

}

showResults = () => {

}

// display quiz right away
buildQuiz();

submitButton.addEventListener('click', showResults);