document.addEventListener("DOMContentLoaded", () => {
  let tarjetas = [
    {
      nombre: "German Shepherd",
      imagen:
        "images/german_shepherd.png"
    },
    {
      nombre: "Labradoodle",
      imagen:
        "images/labradoodle.png"
    },
    {
      nombre: "Shetland Sheepdog",
      imagen:
        "images/shetland_sheepdog.png"
    },
    {
      nombre: "Spaniel English Springer",
      imagen:
        "images/spaniel_english_springer.png"
    },
    {
      nombre: "Welsh Corgi Pembroke",
      imagen:
        "images/welsh_corgi_pembroke.png"
    },
    {
      nombre: "White Swiss Shepherd",
      imagen:
        "images/white_swiss_shepherd.png"
    }
  ];
  tarjetas = tarjetas.concat(tarjetas); //duplicamos loss elementos del array

  const grid = document.getElementById("grid");
  var cartasSeleccionadas = []; //va a ser un array de los índices de cada tarjeta seleccionada
  var contadorGanados = 0;
  const resultado = document.getElementById("resultado");

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

  tarjetas = revolverTarjetas(tarjetas);

  //armamos el tablero de forma dinamica
  function armarTablero() {
    for (let i = 0; i < tarjetas.length; i++) {
      //creamos un elemento de tipo <img />
      const tarjeta = document.createElement("img");
      //seteamos la imagen de patron por defecto
      tarjeta.setAttribute(
        "src",
        "images/pattern.png"
      );
      //a cada imagen le asignamos un atributo único que va a corresponder con el índice del objeto de la raza en el array de tarjetas
      tarjeta.setAttribute("data-index", i);
      //esto es para agregar las clases al objeto "tarjeta"
      tarjeta.classList.add("imagen");
      // para reconocer cada tarjeta asignamos el nombre, el nombre se corresponde al nombre de la raza del perro
      tarjeta.setAttribute("name", tarjetas[i].nombre);
      // agregamos el evento click, porque queremos que reaccione cuando se haga click en cada tarjeta
      tarjeta.addEventListener("click", voltearTarjeta);
      // agregamos el elemento creado a la grilla
      grid.appendChild(tarjeta);
    }
  }

  function validarTarjetasSeleccionadas() {
    //obtenemos un array de todas las imágenes
    const listaTarjetas = document.querySelectorAll("img");
    //obtenemos los índices de las tarjetas seleccionadass
    const primeraTarjetaSeleccionadaIndex = cartasSeleccionadas[0];
    const segundaTarjetaSeleccionadaIndex = cartasSeleccionadas[1];
    if (primeraTarjetaSeleccionadaIndex == segundaTarjetaSeleccionadaIndex) {
      //en caso de seleccionar la misma tarjeta, mostrar una alerta
      alert("¡Es la misma tarjeta!");
      //ponemos d vuelva a ambas la imagen del patron por defecto
      listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
      listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
    } else if (listaTarjetas[primeraTarjetaSeleccionadaIndex].name === listaTarjetas[segundaTarjetaSeleccionadaIndex].name) {
      //el atributo "name" guarda el nombre de la raza, si son iguales entonces es correcto
      alert("¡Correcto!");
      //cambiar la imagen por la del patron de finalizacion
      listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern-inverted.png"
      );
      listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern-inverted.png"
      );
      //evitamos que se pueda volver a hacer click en las mismas
      listaTarjetas[primeraTarjetaSeleccionadaIndex].removeEventListener("click", voltearTarjeta);
      listaTarjetas[segundaTarjetaSeleccionadaIndex].removeEventListener("click", voltearTarjeta);
      contadorGanados = contadorGanados + 2; //sumamos 2 porque fueron 2 las cartas correctas
    } else {
      //si no coinciden entonces se vuelve a poner el patron por defecto para ocultar la imagen de los perros
      listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
      listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.png"
      );
    }
    //limpiamos el array de cartas seleccionadas para prepararlo para las siguientes tarjetas seleccionadas
    cartasSeleccionadas = [];
    if (contadorGanados === tarjetas.length) {
      resultado.textContent = "¡Felicidades! ¡Los encontraste a todos!";
    } else {
      resultado.textContent = (contadorGanados / 2) + " razas encontradas"; //hay 2n pares, por ende hay n elementos distintos
    }
  }

  /* Metodo para cambiar la imagen */
  function voltearTarjeta() {
    //obtenemos el índice del array de perros
    let index = this.getAttribute("data-index");
    //guardamos en el array cuál es el índice de la carta seleccionada
    cartasSeleccionadas.push(index);
    //cambiamos la imagen por la del perro que se encuentre en esa misma posicion en el array, en lugar del patro por defecto
    this.setAttribute("src", tarjetas[index].imagen);
    //cada 2 tarjetas se hacen las validaciones
    if (cartasSeleccionadas.length === 2) {
      setTimeout(validarTarjetasSeleccionadas, 500);
    }
  }

  armarTablero();
});
