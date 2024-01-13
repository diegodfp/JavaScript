fetch('http://localhost:3000/trainers',{
    method: 'POST',
    body: JSON.stringify({
        "id":"3",
        "nombres ":"Yulieth",
        "apellidos":"Rueda",
        "especialidad": "FullStack Python"
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },    
})
    .then((response ) => response.json())
    .then((json)=> console.log(json))
    .catch((error) => console.error("Erroor!"+error))