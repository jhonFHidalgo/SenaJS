// geometric figures

function mostrarInputs() {
    document.getElementById("input-cuadrado").classList.add("hidden");
    document.getElementById("input-rectangulo").classList.add("hidden");
    document.getElementById("input-triangulo").classList.add("hidden");
    document.getElementById("input-circulo").classList.add("hidden");
    document.getElementById("figure-image").classList.add("hidden");

    const figura = document.getElementById("figura").value;
    if (figura) {

        document.getElementById(`input-${figura}`).classList.remove("hidden");

        const img = document.getElementById("figura-imagen");
        switch (figura) {
            case "cuadrado":
                img.src = "img/cuadrado.png";
                break;
            case "rectangulo":
                img.src = "img/rectangulo.png";
                break;
            case "triangulo":
                img.src = "img/triangulo.png";
                break;
            case "circulo":
                img.src = "img/circulo.png";
                break;
        }
        document.getElementById("figure-image").classList.remove("hidden");
    }
}

function calcular() {
    const figura = document.getElementById("figura").value;
    let resultados = "";

    if (figura === "cuadrado") {
        const lado = parseFloat(document.getElementById("lado").value);
        if (isNaN(lado) || lado <= 0) {
            resultados = "Por favor, ingresa un valor válido para el lado.";
        } else {
            const area = lado * lado;
            const perimetro = 4 * lado;
            resultados = `<h3>Cuadrado:</h3>El Área es: ${area} cm²-  El Perímetro es: ${perimetro} cms`;
        }
    } else if (figura === "rectangulo") {
        const base = parseFloat(document.getElementById("base-rect").value);
        const altura = parseFloat(document.getElementById("altura-rect").value);
        if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
            resultados = "Por favor, ingresa valores válidos para la base y la altura.";
        } else {
            const area = base * altura;
            const perimetro = 2 * (base + altura);
            resultados = `<h3>Rectángulo:</h3>El Área es: ${area} cm² - El Perímetro es: ${perimetro} cm`;
        }

    } else if (figura === "triangulo") {
        const lado1 = parseFloat(document.getElementById("lado1").value);
        const lado2 = parseFloat(document.getElementById("lado2").value);
        const lado3 = parseFloat(document.getElementById("lado3").value);
        if (isNaN(lado1) || isNaN(lado2) || isNaN(lado3) || lado1 <= 0 || lado2 <= 0 || lado3 <= 0) {
            resultados = "Por favor, ingresa valores válidos para los lados.";
        } else {
            const s = (lado1 + lado2 + lado3) / 2;
            const area = Math.sqrt(s * (s - lado1) * (s - lado2) * (s - lado3));
            const perimetro = lado1 + lado2 + lado3;
            resultados = `<h3>Triángulo:</h3> El Área es: ${area.toFixed(2)} cm² - El Perímetro es: ${perimetro} cm`;
        }
    } else if (figura === "circulo") {
        const radio = parseFloat(document.getElementById("radio").value);
        if (isNaN(radio) || radio <= 0) {
            resultados = "Por favor, ingresa un valor válido para el radio.";
        } else {
            const area = Math.PI * radio * radio;
            const perimetro = 2 * Math.PI * radio;
            resultados = `<h3>Círculo:</h3> El Área es: ${area.toFixed(2)} cm² - El Perímetro es: ${perimetro.toFixed(2)} cm`;
        }
    }

    document.getElementById("results").innerHTML = resultados;
}

// ages

var count = 0; // Contador para las filas
var ages = []; // Array para almacenar las edades

document.getElementById('ageForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var ageInput = document.getElementById('ageInput');
    var age = parseInt(ageInput.value);
    var errorMessage = document.getElementById('error-message');

    // Validar la edad
    if (age < 1 || age > 120) {
        errorMessage.style.display = 'block';
        ageInput.value = '';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    if (count >= 10) {
        errorMessage.textContent = "Solo se pueden agregar hasta 10 edades.";
        errorMessage.style.display = 'block';
        return;
    }

    // Incrementar el contador
    count++;
    ages.push(age);

    // Crear una nueva fila y celdas para la tabla
    var table = document.getElementById('ageTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    var noCell = newRow.insertCell();
    var ageCell = newRow.insertCell();
    noCell.textContent = count;
    ageCell.textContent = age;

    // Limpiar el input
    ageInput.value = '';

    // Actualizar el label
    document.getElementById('ageLabel').textContent = "Ingrese edad " + (count + 1) + ":";

    // Calcular y mostrar estadísticas
    updateStatistics();
});

function updateStatistics() {
    var minAge = Math.min(...ages);
    var maxAge = Math.max(...ages);
    var sumAges = ages.reduce((a, b) => a + b, 0);
    var promAge = sumAges / ages.length;

    var menorCount = ages.filter(age => age < 18).length;
    var adultCount = ages.filter(age => age >= 18 && age < 60).length;
    var seniorCount = ages.filter(age => age >= 60).length;

    document.getElementById('minAge').textContent = "Edad más baja: " + minAge;
    document.getElementById('maxAge').textContent = "Edad más alta: " + maxAge;
    document.getElementById('promAge').textContent = "Promedio de edades: " + promAge.toFixed(2);
    document.getElementById('menorCount').textContent = "Cantidad de menores de edad: " + menorCount;
    document.getElementById('adultCount').textContent = "Cantidad de mayores de edad: " + adultCount;
    document.getElementById('seniorCount').textContent = "Cantidad de adultos mayores: " + seniorCount;
}