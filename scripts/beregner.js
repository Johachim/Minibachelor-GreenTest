function readJSONtest() {
    fetch('../data/mad_data.json')
    .then(response => {
        if(!response.ok){
            throw new ("HTTP error " + response.status + " text: " + response.statusText)
        }
        return response.json();
    }).then(data => {
        // data = JSON.parse(json);
        for(let i in data){
            console.log(data[i])
        }
        // console.log(json[0])
    }).catch(error =>{
        console.log("Error:" + error.status)
    })
}

readJSONtest();