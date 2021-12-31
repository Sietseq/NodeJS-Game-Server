const Server = require("./modules/server")
const Socket = require("./modules/socket")
const ConnectionManager = require("./modules/connectionManager")
const Packager = require("./modules/packager")
const AckManager = require("./modules/ackManager")

const server = new Server
server.socket = new Socket(server)
server.connectionManager = new ConnectionManager(server)
server.packager = new Packager(server)
server.ackManager = new AckManager(server)