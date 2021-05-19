    buildQuiz = () => {
        const output = [];
        
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            
            for(letter in currentQuestion.answers){
                answers.push(`
                <label class="labelcontainer">
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`)
            }
            output.push(`
            <div class="slide">
            <p class="question-amount"> Spørgsmål ${currentQuestion.qNumber} af 8</p> 
            <img src="${currentQuestion.imgFile}" alt="${currentQuestion.imgFile}" width="120" height="120"></img>
            <h4 class="question"> ${currentQuestion.question} </h4>
            <div class="answers"> ${answers.join('')} </div>
            </div>`);
            
        }
        
        );
        
        quizContainer.innerHTML = output.join('');
        
    }
    
    showResults = () => {
        let numCorrect = 0;
        let responseString = ``;
        const answerContainers = quizContainer.querySelectorAll('.answers');
        
        
        quizQuestions.forEach( (currentQuestion, questionNumber) => {

            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            if(userAnswer === currentQuestion.correctAnswer){
                numCorrect+=12.5;
                
                answerContainers[questionNumber].style.color = "green";
            }
            else if(userAnswer === currentQuestion.correctAnswer2) {
                numCorrect+=6.25;
            }
            else{
                answerContainers[questionNumber].style.color = "firebrick";
            }
            if(numCorrect === 100){
                responseString = `Tillykke! Din dagligdag er helt grøn!`
            }
            if(numCorrect >= 60){
                responseString = `Godt gået! Din dagligdag er meget grøn. For mere information om en grønnere dagligdag <a href="./index.html">tryk her</a>`
            }
            else{
                responseString = `Ønsker du at gøre din dagligdag grønnere kan du evt. læse nogle tips & tricks <a href="./index.html">her</a>`
            }
            
        });
        resultsContainer.innerHTML = `<br/>
        <h4>Din dagligdag er ${numCorrect}% grønt optimeret!</h4>
        <h4>${responseString}</h4> 
        <br/>
        `
        //<p>Læs <a href="./Quiz_reasoning.html">her</a> for at se hvordan du kan gøre din hverdag grønnere!</p>
    }
    //DOM and questions
    const quizContainer = document.getElementById('quizdiv');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const quizQuestions = [
        {
            qNumber: "1",
            imgFile: "./images/El_Bil.png",
            question: "Bruger du primært en El-bil eller en benzin/diesel bil (den bil der bruges oftest om du bliver kørt eller kører)?",
            answers: {
                a: "Benzin",
                b: "Diesel",
                c: "El"
        },
        correctAnswer: "c",
        correctAnswer2: "b"
    },
    {
        qNumber: "2",
        imgFile: "./images/Grøntsag.png",
        question: "Har du nogle særlige spisevaner?",
        answers: {
            a: "Veganer",
            b: "Vegetar",
            c: "Spiser ikke rødt kød",
            d: "Spiser alt"
        },
        correctAnswer: "a",
        correctAnswer2: "b"
    },
    {
        qNumber: "3",
        imgFile: "./images/Normal_Bruser.png",
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
        qNumber: "4",
        imgFile: "./images/blad.png",
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
        qNumber: "5",
        imgFile: "./images/Plastik_Pose.png",
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
        qNumber: "6",
        imgFile: "./images/Slukket_Pære.png",
        question: "Slukker du lyset når du forlader et rum?",
        answers: {
            a: "Ja",
            b: "Nej"
        },
        correctAnswer: "a"
    },
    {
        qNumber: "7",
        imgFile: "./images/Gas_Gril.png",
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
        qNumber: "8",
        imgFile: "./images/Stof_Pose.png",
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


//Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currSlide = 0;

showSlide = (n) => {
    slides[currSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currSlide = n;
    if(currSlide === 0){
        previousButton.style.display = "none";
    }
    else{
        previousButton.style.display = "inline-block";
    }
    if(currSlide === slides.length-1){
        nextButton.style.display = "none";
    }
    else{
        nextButton.style.display = "inline-block";
    }
    if(nextButton.style.display === "inline-block"){
        submitButton.style.display = "none";
    }
    else{
        submitButton.style.display = "inline-block";
    }
}

showSlide(currSlide);

showNextSlide = () => {
    showSlide(currSlide + 1)
}
showPreviousSlide = () => {
    showSlide(currSlide - 1)
}

submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);