class Game {
  constructor(mapID) {
    this.map = L.map(mapID, {zoomControl: false}).setView([0, 0], 14);
    this.marker = L.marker([0, 0], {
      draggable: false
    }).addTo(this.map);
    this.circles = [];
    this.circleMax = 100;
    this.circelStep = 25;
    for (var i = 0; i < 4;i++) {
      var tempCir = L.circle([0, 0], {
        color: '#ff000000',
        fillColor: '#0f3',
        fillOpacity: 0.1,
        radius: this.circleMax
      }).addTo(this.map);
      this.circles.push(tempCir);
      this.circleMax -= this.circelStep;
    }
    this.renderMap();
    console.log(this.circles);
  }
  renderMap() {
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 20
    }).addTo(this.map);
    //L.easyButton('<strong>MAIN</strong>', function () {
      //Que  hacer con el boton
    //}).addTo(this.map);
    //L.control.scale().addTo(this.map);
  }
  updateLocation(map, marker, circle, loc) {
    var maxC = 100;
    var step = 25;
    for (var i = 0; i < 4;i++) {
      map.removeLayer(circle[i]);
      var tempCircle = L.circle([loc.coords.latitude, loc.coords.longitude], {
        color: '#ff000000',
        fillColor: '#0f3',
        fillOpacity: 0.1,
        radius: maxC
      }).addTo(map);
      circle[i] = tempCircle;
      maxC -= step;
    }
    marker.setLatLng([loc.coords.latitude, loc.coords.longitude]);
    map.flyTo([loc.coords.latitude, loc.coords.longitude], 19);
  }
  updateGame(game) {
    L.marker([game.player.home.lat, game.player.home.lon]).addTo(this.map)
    .bindPopup(`${game.player.name} Mainbase`)
    .openPopup();
  }
  services = {
    location: () => {
      var startPos;
      var geoOptions = {
        timeout: 10 * 1000
      }
      var map = this.map;
      var update = this.updateLocation;
      var marker = this.marker;
      var circle = this.circles;
      navigator.geolocation.watchPosition((loc) => {
        update(map, marker, circle, loc)
      }, this.error, geoOptions);

    }
  }
  error(a) {
    console.error(a);
  }
}