var gameData = {
    "player": {
      "name": "SMN947",
      "home": {
        "lat": 4.5799752,
        "lon": -74.2488
      },
    }
  }
var game = new Game('map');
game.services.location();
game.updateGame(gameData);