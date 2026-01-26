/**
 * BGAME — Carte & géolocalisation
 * Destination: 10.9300043 N, 14.2845698 W (coordonnées fournies)
 * Note: -14.2845698 W = longitude -14.2845698
 */
(function () {
  'use strict';

  var DEST = { lat: 10.9300043, lng: -14.2845698 };
  var map = null;
  var userMarker = null;
  var destMarker = null;
  var routingControl = null;
  var userPosition = null;

  var mapEl = document.getElementById('map');
  var btnGeoloc = document.getElementById('btn-geoloc');
  var btnGuide = document.getElementById('btn-guide');
  var btnRoute = document.getElementById('btn-route');
  var statusEl = document.getElementById('map-status');

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function initMap() {
    if (!mapEl) return;
    map = L.map('map').setView([DEST.lat, DEST.lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    var destIcon = L.divIcon({
      className: 'bgame-marker',
      html: '<span style="background:#00d4aa;color:#0a0e14;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);">🎮</span>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    destMarker = L.marker([DEST.lat, DEST.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup('<strong>BGAME</strong><br>Le meilleur espace de jeux en ville.<br>Coordonnées: ' + DEST.lat + ', ' + DEST.lng);

    setStatus('Carte chargée. Localisation en cours…');
    requestGeolocation();
  }

  function addUserMarker(lat, lng) {
    if (userMarker) {
      map.removeLayer(userMarker);
      userMarker = null;
    }
    var icon = L.divIcon({
      className: 'user-marker',
      html: '<span style="background:#3b82f6;color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);">●</span>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    userMarker = L.marker([lat, lng], { icon: icon })
      .addTo(map)
      .bindPopup('Votre position');
  }

  function showRoute() {
    if (!userPosition || !map) return;
    if (routingControl) {
      map.removeControl(routingControl);
      routingControl = null;
    }
    routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userPosition.lat, userPosition.lng),
        L.latLng(DEST.lat, DEST.lng)
      ],
      routeWhileDragging: false,
      show: true,
      addWaypoints: false,
      lineOptions: { styles: [{ color: '#00d4aa', weight: 5 }] },
      createMarker: function () { return null; }
    }).addTo(map);
    setStatus('Itinéraire affiché sur la carte.');
  }

  function openGoogleMapsDirections() {
    var base = 'https://www.google.com/maps/dir/?api=1';
    var dest = '&destination=' + DEST.lat + ',' + DEST.lng;
    var mode = '&travelmode=driving';
    var origin = '';
    if (userPosition) {
      origin = '&origin=' + userPosition.lat + ',' + userPosition.lng;
    } else {
      origin = '&origin=';
    }
    var url = base + origin + dest + mode;
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('Google Maps ouvert. Autorisez la localisation dans l’app pour un itinéraire depuis votre position.');
  }

  function requestGeolocation() {
    setStatus('Localisation en cours…');
    if (!navigator.geolocation) {
      setStatus('La géolocalisation n’est pas prise en charge par votre navigateur.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        userPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        addUserMarker(userPosition.lat, userPosition.lng);
        map.setView([userPosition.lat, userPosition.lng], 14);
        map.fitBounds([
          [userPosition.lat, userPosition.lng],
          [DEST.lat, DEST.lng]
        ], { padding: [40, 40] });
        setStatus('Position trouvée. Vous pouvez « Me guider » ou « Afficher l’itinéraire ».');
      },
      function (err) {
        var msg = 'Impossible d’obtenir votre position. ';
        if (err.code === 1) msg += 'Veuillez autoriser la localisation.';
        else if (err.code === 2) msg += 'Position indisponible.';
        else msg += 'Erreur de géolocalisation.';
        setStatus(msg);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  if (btnGeoloc) btnGeoloc.addEventListener('click', requestGeolocation);
  if (btnGuide) btnGuide.addEventListener('click', openGoogleMapsDirections);
  if (btnRoute) btnRoute.addEventListener('click', showRoute);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
