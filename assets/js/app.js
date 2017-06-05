function initMap() {
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

// Búsqueda Restaurantes

var restaurantes = [
  
  {
    "nombre": "Chilakillers",
    "giro":"Loungeria",
    "direccion": "Revolución 23, Col. Tacubaya",
    "lat":"19.4067469",
    "lng":"-99.1845839"
  },
  
  {
    "nombre": "Pizza Hut",
    "giro":"Pizzería",
    "direccion": "Hamburgo 98, Col. Juárez",
    "lat":"19.426595",
    "lng":"-99.16372460000002"
  },

  {
    "nombre": "Burguer King",
    "giro":"Hamburguesas",
    "direccion": "Insurgentes 325, Col. Condesa",
    "lat":"19.413052",
    "lng":"-99.16633910000002"
  },

  {
    "nombre": "Subway",
    "giro":"Baguettes",
    "direccion": "Insurgentes 327, Col. Condesa",
    "lat":"19.4131421",
    "lng":"-99.16648650000002"
  }
];

var plantillaContacto = '<article class="row contact">' +
        '<div class="card-panel hoverable grey lighten-5 z-depth-1">' +
          '<div class="row valign-wrapper">' +
            '<div class="col s3">' +
              '<img src="__foto__" alt="Contact" class="circle responsive-img">' +
            '</div>' +
            '<div class="col s9">' +
              '<h5 class="name">__nombre__</h5>' +
              '<span class="black-text">' +
                'Phone: __numero__' +
              '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
  '</article>';

var cargarPagina = function () {
  $("#search-form").submit(filtrarContactos);
};

var filtrarContactos = function (e) {
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  var contactosFiltrados = contactos.filter(function (contacto) {
    return contacto.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  mostrarContactos(contactosFiltrados);
};

var mostrarContactos = function (contactos) {
  var plantillaFinal = "";
  contactos.forEach(function (contacto) {
    plantillaFinal += plantillaContacto.replace("__nombre__", contacto.nombre)
      .replace("__numero__", contacto.numero)
      .replace("__foto__", contacto.foto);
  });
  $(".contacts").html(plantillaFinal);
};

$(document).ready(cargarPagina);
