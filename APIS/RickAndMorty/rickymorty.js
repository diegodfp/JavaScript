function getDatos(){
    const url= `https://rickandmortyapi.com/api/character`;

    // fetch en una promesa
    fetch(url)
        .then(respuesta =>  respuesta.json())
        .then(json=>{
            console.log(json)
            return json.info.count
        })
}


let datos = getDatos()
console.log(datos)