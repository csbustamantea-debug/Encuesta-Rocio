
// 1. Banco de preguntas

const preguntas = [
    {
        texto: "¿Cuál es mi comida favorita?",
        opciones: ["Pizza", "pollo", "cocido boyacence", "Sushi"],
        correcta: "pollo"
    },
    {
        texto: "¿Cuál sería mi viaje soñado?",
        opciones: ["París", "dubai", "brazil", "México"],
        correcta: "brazil"
    },
    {
        texto: "¿Qué prefiero hacer un domingo?",
        opciones: ["Dormir", "Viajar", "ir a cine", "Hacer ejercicio"],
        correcta: "viajar"
    },
    {
        texto: "¿Qué regalo me gustaría recibir?",
        opciones: ["rosas", "cerveza", "Chocolates", "plan inesperado"],
        correcta: "rosas"
    },
    {
        texto: "¿Qué es lo que más valoro?",
        opciones: ["El dinero", "tiempo de calidad", "Los regalos", "la lealtad"],
        correcta: "la lealtad"
    }
];

// 2. Obtener elementos HTML

const bienvenida = document.getElementById("bienvenida");
const formulario = document.getElementById("formulario");
const contenedor = document.getElementById("preguntas");
const resultado = document.getElementById("resultado");

let nombre = "";
let respuestas = [];

// 3. Iniciar el cuestionario

document.getElementById("comenzar").addEventListener("click", function() {

    nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {
        alert("Por favor, escribe tu nombre.");
        return;
    }

    bienvenida.classList.add("oculto");
    formulario.classList.remove("oculto");

    mostrarPreguntas();
});

// 4. Mostrar preguntas usando un ciclo FOR

function mostrarPreguntas() {

    for (let i = 0; i < preguntas.length; i++) {

        let pregunta = preguntas[i];

        let contenido = `
            <div class="pregunta">

                <h3>${i + 1}. ${pregunta.texto}</h3>
        `;

        for (let j = 0; j < pregunta.opciones.length; j++) {

            let opcion = pregunta.opciones[j];

            contenido += `
                <label class="opcion">
                    <input
                        type="radio"
                        name="pregunta${i}"
                        value="${opcion}"
                        required
                    >
                    ${opcion}
                </label>
            `;
        }

        contenido += `</div>`;

        contenedor.innerHTML += contenido;
    }
}

// 5. Evaluar las respuestas

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    respuestas = [];
    let puntos = 0;

    for (let i = 0; i < preguntas.length; i++) {

        let seleccion = document.querySelector(
            `input[name="pregunta${i}"]:checked`
        );

        if (!seleccion) {
            alert("Debes responder todas las preguntas.");
            return;
        }

        respuestas.push(seleccion.value);

        if (seleccion.value === preguntas[i].correcta) {
            puntos++;
        }
    }

    mostrarResultado(puntos);
});

// 6. Mostrar resultado personalizado

function mostrarResultado(puntos) {

    formulario.classList.add("oculto");
    resultado.classList.remove("oculto");

    document.getElementById("puntuacion").textContent =
        puntos + " de " + preguntas.length + " respuestas correctas";

    let mensaje = "";

    if (puntos === 5) {

        mensaje = "¡Increíble! Me conoces perfectamente. ❤️";

    } else if (puntos >= 3) {

        mensaje = "¡Muy bien! Sabes muchas cosas de mí. 🥰";

    } else {

        mensaje = "¡Tenemos muchas cosas por descubrir juntos! 💕";

    }

    document.getElementById("mensaje").textContent =
        "¡Hola " + nombre + "! " + mensaje;
}

// 7. Compartir resultado por WhatsApp

document.getElementById("compartir").addEventListener("click", function() {

    let texto = `¡Hola! Soy ${nombre} y acabo de responder tu cuestionario. ❤️`;

    let enlace = "https://wa.me/?text=" + encodeURIComponent(texto);

    window.open(enlace, "_blank");

});
