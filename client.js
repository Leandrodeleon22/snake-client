const net = require("net");
const { IP, PORT } = require("./constants");

const connect = function () {
  const conn = net.createConnection({
    host: IP,
    port: PORT,
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

module.exports = { connect };
