const pantalla = document.querySelector("#show");
const input = document.querySelectorAll(".escuchar");
const buttonDelet = document.getElementById('borrar')
const buttonCalcular = document.getElementById('calcular')

//LEER CLICK EN TODOS LOS BOTONES
    input.forEach(elm => {
        elm.addEventListener("click", () => 
            reciveInput(elm) 
        )
    });
    function reciveInput(text) {
        pantalla.textContent += text.textContent;
    }
//Function MULTIPLICAR
    function multiply() {
        const numbers = pantalla.textContent.split("*");
        pantalla.textContent = (numbers[0] * numbers[1]);
    }
//Function SUBTRACT
    function subtract() {
        const numbers = pantalla.textContent.split("-");
        pantalla.textContent = (numbers[0] - numbers[1]);
    }
//Function SUBTRACT
    function add() {
        const numbers = pantalla.textContent.split("+");
        pantalla.textContent = (Number(numbers[0]) + Number(numbers[1]));
    }
//Function SUBTRACT
    function divide() {
        const numbers = pantalla.textContent.split("/");
        if(numbers[1] === '0') {
            pantalla.textContent = 'Infinity';
        } else {
            pantalla.textContent = (Number(numbers[0]) / Number(numbers[1])).toFixed(3);
        }
    }
//Function DE CALCULAR CUANDO OPRIMO "="
    function calcular() {
        pantalla.textContent.includes('*')?multiply():pantalla.textContent.includes('-')?subtract():pantalla.textContent.includes('+')?add():pantalla.textContent.includes('/')?divide():pantalla.textContent = pantalla.textContent;
        buttonDelet.textContent = 'AC';
    }
//Function Delet
function delet() {
    if (buttonDelet.textContent === 'C') {
        pantalla.textContent = `${pantalla.textContent.substring(0,pantalla.textContent.length - 1)}`;
    } else {
        pantalla.textContent = '';
        buttonDelet.textContent ='C';
    }
}
buttonCalcular.addEventListener('click', calcular)
buttonDelet.addEventListener('click',delet)


