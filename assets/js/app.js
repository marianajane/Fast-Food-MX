$(document).ready(cargarPagina);
// HOISTING
function cargarPagina() {
  obtenerUbicacionActual();
  $(".restaurante").click(cambiarUbicacion);
}

function obtenerUbicacionActual() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicionActual);
  } else {
    alert("Geolocalización no es soportado en tu navegador");
  }
}

function mostrarPosicionActual(posicion) {
  var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  mostrarMapa(coordenadas);
}

// @coordenadas: { lat: <number>, lng: <number> }
function mostrarMapa(coordenadas) {
  var map = new google.maps.Map($('#map')[0], {
    zoom: 17,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
}

function cambiarUbicacion() {
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}


/*function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 23.634501, lng: -102.55278399999997},
    zoom: 12
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // GetCurrentPosition.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Errores de buscador
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

function cambiarUbicacion() {
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}
*/


// Búsqueda Restaurantes

var restaurante = [
  
  {
    "nombre": "Chilakillers",
    "giro":"Loungeria",
    "direccion": "Revolución 23, Col. Tacubaya",
  },
  
  {
    "nombre": "Pizza Hut",
    "giro":"Pizzería",
    "direccion": "Hamburgo 98, Col. Juárez",
  },

  {
    "nombre": "Burguer King",
    "giro":"Hamburguesas",
    "direccion": "Insurgentes 325, Col. Condesa",
  },

  {
    "nombre": "Subway",
    "giro":"Baguettes",
    "direccion": "Insurgentes 327, Col. Condesa",
  }
];

var plantillaContacto = '<ul class="collection" id="restaurantes">'+
        '<li class="collection-item avatar">'+
          '<img src="assets/img/Icon_food.png" alt="" class="circle">'+
          '<span class="title restaurante">__nombre__</span>'+
          '<p>__giro__<br>'+
             '__direccion__'+
          '</p>'+
          '<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>'+
        '</li>';


var cargarPagina = function () {
  $("#search-form").submit(filtrarRestaurantes);
};

var filtrarRestaurantes = function (e) {
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  var restaurantesFiltrados = restaurante.filter(function (restaurante) {
    return restaurante.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  mostrarRestaurantes(restaurantesFiltrados);
};

var mostrarRestaurantes = function (restaurante) {
  var plantillaFinal = "";
  restaurante.forEach(function (restaurante) {
    plantillaFinal += plantillaContacto.replace("__nombre__", restaurante.nombre).replace("__giro__", restaurante.giro).replace("__direccion__", restaurante.direccion);
    
  });
  $("#restaurantes").html(plantillaFinal);
};

$(document).ready(cargarPagina);

//Ubicaciones 