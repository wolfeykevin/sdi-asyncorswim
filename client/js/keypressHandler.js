const serverUrl = "http://127.0.0.1:3000/que";

$("body").on("keydown", (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    SwimTeam.move(direction.toLowerCase());
  }
});

console.log("Client is running in the browser!");
