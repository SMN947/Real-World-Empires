class Game {
  constructor(mapID) {
    console.log(mapID);

    this.map = L.map(mapID).setView([0, 0], 14);
    this.marker = L.marker([0, 0], {
      draggable: true
    }).addTo(this.map);
    this.renderMap();
  }
  renderMap() {
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 30
    }).addTo(this.map);



    L.easyButton('<strong>1</strong>', function() {
      this.disable();
    }).addTo(this.map);
    L.control.scale().addTo(this.map);
  }
  update(map, marker, loc) {
    marker.setLatLng([loc.coords.latitude, loc.coords.longitude])
    map.flyTo([loc.coords.latitude, loc.coords.longitude], 19)
  }
  services = {
    location: () => {
      var startPos;
      var geoOptions = {
        timeout: 10 * 1000
      }
      var map = this.map;
      var update = this.update;
      var marker = this.marker;
      navigator.geolocation.watchPosition((loc) => {
        update(map, marker, loc)
      }, this.error, geoOptions);

    }
  }
  error(a) {
    console.error(a);
  }
}