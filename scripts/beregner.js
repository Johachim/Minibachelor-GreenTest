import Beregner from "./classes/beregner_class.js";

//Set up
const select1 = document.querySelector("#firstSelected");
const select2 = document.querySelector("#secondSelected");
const submitbtn = document.querySelector('#beregnSubmit')
const result = document.querySelector('#resultat')
const beregner = new Beregner(select1, select2, 'Minibachelor-GreenTest/data/mad_data.json', submitbtn, result);
beregner.setup();

//Add EventListener for "Beregn" button
submitbtn.addEventListener('click', function(){
    event.preventDefault();
    beregner.beregn();
});