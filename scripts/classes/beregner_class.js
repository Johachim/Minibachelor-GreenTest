export default class Beregner{
    constructor(firstSelector, secondSelector, valuesURL, submitBtn, result){
        this.firstSelector = firstSelector;
        this.secondSelector = secondSelector;
        this.url = valuesURL;
        this.result = result;
        this.submitBtn = submitBtn;
        this.madliste = this.fetchValues();
        this.counter = 0;
    }

    setup(){
        this.importValuesToSelects(this.firstSelector);
        this.importValuesToSelects(this.secondSelector);
    }

    importValuesToSelects(select){
        this.madliste.then(function(result){
            result.forEach(mad => {
                let option = document.createElement("option");
                option.text = mad.navn;
                option.value = mad.id;
                select.append(option);
            });
        });
    }

    fetchValues = async () => {
        let array = [{id: 0, navn: "Vælg en madvare", klimaftryk: null, imported: null, kategori: null}];
        const response = await fetch(this.url);
        const data = await response.json();
        data.forEach(mad =>{
            array.push(mad);
        });
        
        // fetch(this.url)
        // .then(response => {
        //     if(!response.ok){
        //         throw new ("HTTP error " + response.status + " text: " + response.statusText)
        //     }
        //     return response.json();
        // }).then(data => {
        //     for(let i in data){
        //         let madvare = {
        //             navn: data[i].navn,
        //             klimaftryk: data[i].klimaftryk,
        //             imported: data[i].import,
        //             kategori: data[i].kategori
        //         }
        //         array.push(madvare);
        //     }
        // }).catch(error =>{
        //     console.log("Error:" + error.status)
        // });
        return array;
    };

    beregn = function(){
        let result = this.result;
        if(this.firstSelector.value == 0 || this.secondSelector.value == 0){
            let resultTemplate = `
                <div class="col-12"><h2 class="align_center colour_dark_grey">Vælg 2 madvarer for at se resultatet</h2></div>
            `
            result.innerHTML = resultTemplate;
        } else if(this.firstSelector.value == this.secondSelector.value){
            let resultTemplate = `
                <div class="col-12"><h2 class="align_center colour_dark_grey">Vælg 2 forskellige madvarer for at se resultatet</h2></div>
            `
            result.innerHTML = resultTemplate;
        }else{
            let first = this.firstSelector.value;
            let second = this.secondSelector.value;
            //Collect objects in madliste
            this.madliste.then(function(madvarer){
                let firstKlima = madvarer[first].klimaftryk + madvarer[first].import;
                let secondKlima = madvarer[second].klimaftryk + madvarer[second].import;
                let first_colour = "";
                let second_colour = "";

                //Define colours for text
                if(firstKlima < secondKlima){
                    first_colour = "primary_green";
                    second_colour = "dark_grey";
                } else if (firstKlima > secondKlima){
                    first_colour = "dark_grey";
                    second_colour = "primary_green";
                }else {
                    first_colour = "dark_grey";
                    second_colour = "dark_grey";
                }

                let resultTemplate = `
                    <div class="row">
                        <h3 class="colour_${first_colour} col-3">${madvarer[first].navn}</h3>
                        <h3 class="colour_dark_grey align_center col-2">vs</h3>
                        <h3 class="colour_${second_colour} col-3">${madvarer[second].navn}</h3>
                    </div>
                    <div class="col-8">

                    </div>
                    <div class="col-4 align_center">
                        <p>${madvarer[first].navn}s samlet<br/>klimaaftryk* er</p>
                        <h3 class="colour_${first_colour}"> %</h3>
                        <p>end ${madvarer[second].navn}</p>
                        <small>*Gælder kun importede fødevarer. Der lægges omkring 0.2 noget oven i pr fødevarer i transport</small>
                    </div>
                `;
                result.innerHTML = resultTemplate;
            });
        }
        this.result.classList.remove("hidden");
    }
}