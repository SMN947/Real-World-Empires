class Game {
  constructor(mapID) {
    this.map = L.map(mapID).setView([0, 0], 14);
  }
  renderMap() {
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(this.map);

    L.control.scale().addTo(this.map);
    L.marker([41.66, -4.71], {
      draggable: true
    }).addTo(this.map);
  }
}