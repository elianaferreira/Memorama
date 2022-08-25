document.addEventListener("DOMContentLoaded", () => {
  let tarjetas = [
    {
      name: "German Shepherd",
      img:
        "images/german_shepherd.png"
    },
    {
      name: "Labradoodle",
      img:
        "images/labradoodle.png"
    },
    {
      name: "Shetland Sheepdog",
      img:
        "images/shetland_sheepdog.png"
    },
    {
      name: "Spaniel English Springer",
      img:
        "images/spaniel_english_springer.png"
    },
    {
      name: "Welsh Corgi Pembroke",
      img:
        "images/welsh_corgi_pembroke.png"
    },
    {
      name: "White Swiss Shepherd",
      img:
        "images/white_swiss_shepherd.png"
    }
  ];
  tarjetas = tarjetas.concat(tarjetas); //suplicamos loss elementos del array
  tarjetas = revolverTarjetas(tarjetas)


  const grid = document.getElementById("grid");
  var cartasSeleccionadas = []; //va a ser un array de los índices de cada tarjeta seleccionada
  var contadorGanados = 0;
  const resultado = document.getElementById("result");

  https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  //este es el algoritmo de de mezcla Fisher-Yates
  function revolverTarjetas(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  //armamos el tablero de forma dinamica
  function armarTablero() {
    for (let i = 0; i < tarjetas.length; i++) {
      //creamos un elemento de tipo <img />
      const card = document.createElement("img");
      //seteamos la imagen de patron por defecto
      card.setAttribute(
        "src",
        "images/pattern.png"
      );
      //a cada imagen le asignamos un atributo único que va a corresponder con el índice del objeto de la raza en el array de tarjetas
      card.setAttribute("data-index", i);
      //esto es para agregar las clases al objeto "card"
      card.classList.add("card", "image");
      // card.setAttribute("id", "image");
      // para reconocer cada tarjeta asignamos el nombre, el nombre se corresponde al nombre de la raza del perro
      card.setAttribute("name", tarjetas[i].name);
      // agregamos el evento click, porque queremos que reaccione cuando se haga click en cada tarjeta
      card.addEventListener("click", flipCard);
      // agregamos el elemento creado a la grilla
      grid.appendChild(card);
    }
  }

  function validarTarjetasSeleccionadas() {
    //obtenemos un array de todas las imágenes
    const cards = document.querySelectorAll("img");
    //obtenemos los índices de las tarjetas seleccionadass
    const primeraTarjetaSeleccionadaIndex = cartasSeleccionadas[0];
    const segundaTarjetaSeleccionadaIndex = cartasSeleccionadas[1];
    if (primeraTarjetaSeleccionadaIndex == segundaTarjetaSeleccionadaIndex) {
      //en caso de seleccionar la misma tarjeta, mostrar una alerta
      alert("¡Es la misma tarjeta!");
      //ponemos d vuelva a ambas la imagen del patron por defecto
      cards[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
      cards[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
    } else if (cards[primeraTarjetaSeleccionadaIndex].name === cards[segundaTarjetaSeleccionadaIndex].name) {
      //el atributo "name" guarda el nombre de la raza, si son iguales entonces es correcto
      alert("¡Correcto!");
      //cambiar la imagen por la del patron de finalizacion
      cards[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern-inverted.png"
      );
      cards[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern-inverted.png"
      );
      //evitamos que se pueda volver a hacer click en las mismas
      cards[primeraTarjetaSeleccionadaIndex].removeEventListener("click", flipCard);
      cards[segundaTarjetaSeleccionadaIndex].removeEventListener("click", flipCard);
      contadorGanados = contadorGanados + 2; //sumamos 2 porque fueron 2 las cartas correctas
    } else {
      //si no coinciden entonces se vuelve a poner el patron por defecto para ocultar la imagen de los perros
      cards[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
      cards[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
    }
    //limpiamos el array de cartas seleccionadas para prepararlo para las siguientes tarjetas seleccionadas
    cartasSeleccionadas = [];
    if (contadorGanados === tarjetas.length) {
      resultado.textContent = "¡Felicidades! ¡Ganaste!";
    } else {
      resultado.textContent = contadorGanados / 2; //hay 2n pares, por ende hay n elementos distintos
    }
  }

  /* Metodo para cambiar la imagen */
  function flipCard() {
    //obtenemos el índice del array de perros
    let index = this.getAttribute("data-index");
    //guardamos en el array cuál es el índice de la carta seleccionada
    cartasSeleccionadas.push(index);
    //cambiamos la imagen por la del perro que se encuentre en esa misma posicion en el array, en lugar del patro por defecto
    this.setAttribute("src", tarjetas[index].img);
    //cada 2 tarjetas se hacen las validaciones
    if (cartasSeleccionadas.length === 2) {
      setTimeout(validarTarjetasSeleccionadas, 500);
    }
  }

  armarTablero();
});
