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
  if (key === "w") directionController("Move: up");
  if (key === "a") directionController("Move: left");
  if (key === "s") directionController("Move: down");
  if (key === "d") directionController("Move: right");
  if (key === "q") directionController("Say: Awesome");
  if (key === "e") directionController("Say: Please let me eat");

  if (key === "\u0003") {
    process.exit();
  }
};

module.exports = { setupInput };
