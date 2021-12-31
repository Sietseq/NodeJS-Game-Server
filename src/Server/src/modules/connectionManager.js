
const { putVar } = require("@gd-com/utils")
const sizeof = require('object-sizeof')

//====================================================
// TO DO:
//    - heart beat count overflow
// ===================================================


class ConnectionManager {

    // Called on init
    constructor(server){
        this.server = server
        this.heartBeatCount = 0
        this.ResponseRecord = {}
        setInterval(this.sendHeartBeat, 250, this.server)
    }


    sendHeartBeat(server){
        let connectionManager = server.connectionManager

        let send = putVar({"id": 0, "c": connectionManager.heartBeatCount}) // create packet
        connectionManager.heartBeatCount += 1 // update counter

        // Send to all connected clients
        for (var key in server.clients) {
            if (server.clients.hasOwnProperty(key)) {

                // Split key into ip and port
                let index = key.indexOf("-")
                let ip = key.substring(0, index)
                let port = key.substring(index + 1)
                
                server.socket.send(send, port, ip)
            }
        }

        setTimeout(connectionManager.onHeartBeatTimeout, 125, server)
    }

    // Called when a player sends the heartbeat back
    addToResponseRecord(client, count){
        this.ResponseRecord[client] = count
    }

    // Called to detect disconnections
    onHeartBeatTimeout(server){
        let connectionManager = server.connectionManager

        // Loop through record
        for (var key in connectionManager.ResponseRecord){
            if (connectionManager.ResponseRecord.hasOwnProperty(key)){

                // Give space for 5 beats
                if (connectionManager.ResponseRecord[key] < connectionManager.heartBeatCount - 5){
                    connectionManager.onPlayerDisconnect(key)
                }
            }
        }
    }

    // Called when a player connects
    onPlayerConnect(player){
        
    }

    // Called when a player disconnects
    onPlayerDisconnect(player){
        // Remove from response record
        delete this.ResponseRecord[player];

        // Remove from client
        for (var key in this.server.clients) { // Loop through all clients 
            if (this.server.clients.hasOwnProperty(key)) {
                
                // If one of the keys has a uuid that matches remove the player
                if (this.server.clients[key].uuid = player){
                    delete this.server.clients[key]
                }
            }
        }
    }

}

module.exports = ConnectionManager