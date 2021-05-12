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
                let first_bar_colour = "";
                let second_bar_colour = "";
                let small = 0;
                let big =  0;
                let mm = "";

                //Define colours for text/chart and get relation
                if(firstKlima < secondKlima){
                    first_colour = "primary_green";
                    second_colour = "dark_grey";
                    first_bar_colour = "#698F5D";
                    second_bar_colour = "#393738";
                    small = firstKlima;
                    big = secondKlima;
                    mm = "mindre";
                } else if (firstKlima > secondKlima) {
                    first_colour = "dark_grey";
                    second_colour = "primary_green";
                    first_bar_colour = "#393738";
                    second_bar_colour = "#698F5D";
                    small = secondKlima;
                    big = firstKlima;
                    mm = "mere";
                } else {
                    first_colour = "dark_grey";
                    second_colour = "dark_grey";
                    first_bar_colour = "#393738";
                    second_bar_colour = "#393738";
                    small = firstKlima;
                    big = secondKlima;
                    mm = "mindre";
                }
                let procentResult = (big - small) / big * 100;

                let resultTemplate = `
                    <div class="row">
                        <h3 class="colour_${first_colour} col-md-3">${madvarer[first].navn}</h3>
                        <h3 class="colour_dark_grey align_center col-md-2">vs</h3>
                        <h3 class="colour_${second_colour} col-md-3">${madvarer[second].navn}</h3>
                    </div>
                    <div class="col-md-8">
                        <canvas id="chartContainer" style="height: 370px; width: 100%; max-width: 500px; margin: 0px auto;"></canvas>
                    </div>
                    <div class="col-md-4 align_center">
                        <p>${madvarer[first].navn}'s samlet<br/>klimaaftryk* er</p>
                        <h3 class="colour_${first_colour}">${procentResult.toFixed(2)}%</h3>
                        <p><strong class="colour_${first_colour}">${mm}</strong> end ${madvarer[second].navn}</p>
                        <small>*Fødevarernes klimaaftryk fra produktion af 1 kg fødevare inklusiv alle led i fødevarekæden
                        (produktion, forarbejdning og transport) indtil varen ligger i supermarkedet</small>
                    </div>
                `;
                result.innerHTML = resultTemplate;
                const ctx = document.querySelector('#chartContainer').getContext('2d')
                const chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [madvarer[first].navn, madvarer[second].navn],
                        datasets: [{
                            label: "kg CO2-ækv. per kg fødevare",
                            data: [firstKlima, secondKlima],
                            backgroundColor: [
                                first_bar_colour,
                                second_bar_colour
                            ]
                        }]
                        
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                chart.render();
            });
        }
        this.drawCanvas();
        this.result.classList.remove("hidden");
    }

    drawCanvas = function(){
        console.log("HERE")
        
    }
}