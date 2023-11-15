const net = require("net");

const connect = function () {
  const conn = net.createConnection({
    host: "localhost",
    port: 50541,
  });

  //interpret incoming data as text
  conn.setEncoding("utf8");
  conn.on("connect", () => {
    conn.write("Name: LLL");

    console.log("Successfully connected to game server");
  });
  // conn.on("connect", () => {
  //   setTimeout(() => {
  //     conn.write("Move: up");
  //   }, 1000);
  // });

  conn.on("data", (data) => {
    console.log("Server says: ", data);
  });

  return conn;
};

const setupInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};

const handleUserInput = function (key) {
  if (key === "\u0003") {
    process.exit();
  }
};

module.exports = { connect, setupInput };
