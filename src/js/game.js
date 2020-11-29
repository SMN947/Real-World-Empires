class Game {
  constructor(mapID) {
    console.log(mapID);
    this.map = L.map(mapID).setView([0, 0], 14);
    console.log(this.map);
    this.renderMap();
  }
  renderMap() {
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(this.map);

    L.control.scale().addTo(this.map);
    L.marker([0, 0], {
      draggable: true
    }).addTo(this.map);
  }
  update(map, loc) {
    console.log(map, loc);
    map.flyTo([loc.coords.latitude, loc.coords.longitude], 18)
  }
  services = {
    location: () => {
      var startPos;
      var geoOptions = {
        timeout: 10 * 1000
      }
      var map = this.map;
      var update = this.update;
      navigator.geolocation.watchPosition((loc) => {
        update(map, loc)
      }, this.error, geoOptions);

    }
  }
  error(a) {
    console.error(a);
  }
}