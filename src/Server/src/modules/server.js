class Server {
    constructor(){
        this.clients = {}
        this.connectionManager
        this.socket
        this.packager
        this.ackManager
    }
}

module.exports = Server