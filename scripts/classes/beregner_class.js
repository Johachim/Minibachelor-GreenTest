export default class Beregner{
    constructor(firstSelector, secondSelector, valuesURL, submitBtn, result){
        this.firstSelector = firstSelector;
        this.secondSelector = secondSelector;
        this.url = valuesURL;
        this.result = result;
        this.submitBtn = submitBtn;
    }

    importValuesToSelects(){
        this.fetchValues(this.firstSelector);
        this.fetchValues(this.secondSelector);
    }

    fetchValues = function (select) {
        fetch(this.url)
        .then(response => {
            if(!response.ok){
                throw new ("HTTP error " + response.status + " text: " + response.statusText)
            }
            return response.json();
        }).then(data => {
            // data = JSON.parse(json);
            for(let i in data){
                let option = document.createElement("option");
                option.text = data[i].navn;
                option.value = data[i].navn;
                select.append(option);
            }
            // console.log(json[0])
        }).catch(error =>{
            console.log("Error:" + error.status)
        })
    }

    beregn = function(){
        this.result.classList.remove("hidden");
    }
}
