const {
  MOVE_UP_KEY,
  MOVE_DOWN_KEY,
  MOVE_LEFT_KEY,
  MOVE_RIGHT_KEY,
} = require("./constants");

let connection;

const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};

const directionController = (str) => {
  connection.write(str);
};

const handleUserInput = function (key) {
  if (key === "w") directionController(MOVE_UP_KEY);
  if (key === "a") directionController(MOVE_LEFT_KEY);
  if (key === "s") directionController(MOVE_DOWN_KEY);
  if (key === "d") directionController(MOVE_RIGHT_KEY);
  if (key === "q") directionController("Say: Awesome");
  if (key === "e") directionController("Say: Please let me eat");

  if (key === "\u0003") {
    process.exit();
  }
};

module.exports = { setupInput };
