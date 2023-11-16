const { keysObj, messageKey } = require("./constants");

let connection;
let direction;
let currentKey;

const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};

const directionController = (key) => {
  connection.write(keysObj[key]);

  direction = setInterval(() => {
    connection.write(keysObj[key]);
  }, 200);
};

const handleUserInput = function (key) {
  if (key === "\u0003") {
    process.exit();
  }

  if (direction) {
    clearInterval(direction);
    direction = null;
  }

  if (keysObj[key]) {
    currentKey = key;
    directionController(currentKey);
  }
  if (messageKey[key]) {
    clearInterval(direction);
    direction = null;
    connection.write(messageKey[key]);
    directionController(currentKey);
  }
};

module.exports = { setupInput };
