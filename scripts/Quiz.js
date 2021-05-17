    buildQuiz = () => {
        const output = [];
        
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            
            for(letter in currentQuestion.answers){
                answers.push(`
                <label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`)
            }
            output.push(`
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`);
        }
        
        );
        
        quizContainer.innerHTML = output.join('');
        
    }
    
    showResults = () => {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        
        let numCorrect = 0;
        
        quizQuestions.forEach( (currentQuestion, questionNumber) => {

            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            if(userAnswer === currentQuestion.correctAnswer){
                numCorrect+=12.5;
                
                answerContainers[questionNumber].style.color = "green";
            }
            else if(userAnswer === currentQuestion.correctAnswer2) {
                numCorrect+=6;

                answerContainers[questionNumber].style.color = "yellow"
            }
            else{
                answerContainers[questionNumber].style.color = "red";
            }
        });
        resultsContainer.innerHTML = `<br/>
        <h4>Din dagligdag er ${numCorrect}% grønt optimeret!</h4> 
        <br/>
        <p>Læs <a href="./Quiz_reasoning.html">her</a> for at se hvordan du kan gøre din hverdag grønnere!</p>
        `
    }
    
    const quizContainer = document.getElementById('quizdiv');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const quizQuestions = [
        {
            question: "Bruger du primært en El-bil eller en benzin/diesel bil (den bil der bruges oftest om du bliver kørt eller kører)?",
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
            b: "1-4 pr. person i boligen",
            c: "5-8 pr. person i boligen",
            d: "8+ pr. person i boligen"
        },
        correctAnswer: "d",
        correctAnswer2: "c"
    },
    {
        question: "Genbrug af affald. Vælg det svar der passer bedst for hvad du gør.",
        answers: {
            a: "Genbruger: Plastik, glas, tøj, metal, pap, papir, madaffald (kompost)",
            b: "Genbruger: Tøj, Pap, papir, madaffald (kompost)",
            c: "Genbruger: Papir, Madaffald (kompost)",
            d: "Går ikke ud af min vej for at genbruge."
        },
        correctAnswer: "a",
        correctAnswer2: "b"
    },
    {
        question: "Slukker du lyset når du forlader et rum?",
        answers: {
            a: "Ja",
            b: "Nej"
        },
        correctAnswer: "a"
    },
    {
        question: "Hvis du griller hvordan foregår det så oftest?",
        answers: {
            a: "Kulgril",
            b: "Gasgril",
            c: "Griller ikke"
        },
        correctAnswer: "c",
        correctAnswer2: "b"
    },
    {
        question: "Bruger du genbrugelige genstande til daglig?",
        answers: {
            a: "Taske/Bærepose med til indkøb",
            b: "Vandflaske til at drikke af",
            c: "Genbrugelige klude/svampe til opvask",
            d: "Alle de ovenstående",
            e: "Ingen af de ovenstående"
        },
        correctAnswer: "d",
        correctAnswer2: "a"
    }
];

// display quiz 
buildQuiz();

submitButton.addEventListener('click', showResults);