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
                //how to display "correct" answers?
                numCorrect++;
                
                answerContainers[questionNumber].style.color = "green";
            }
            else{
                answerContainers[questionNumber].style.color = "lightgrey";
            }
        });
        //what to do with answers?
        resultsContainer.innerHTML = `Answers:...${numCorrect} (det her er bare placeholder)`
    }
    
    const quizContainer = document.getElementById('quizdiv');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
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

// display quiz 
buildQuiz();

submitButton.addEventListener('click', showResults);