const dgram = require('dgram')
const { v4 } = require('uuid')
const  { putVar, getVar } = require("@gd-com/utils")


//====================================================
// TO DO:
//    - send all
//    - send to specific
// ===================================================

class Socket {

    // Called on init
    constructor(server){

        // Assign main interface
        this.server = server

        // Create socket
        this.socket = dgram.createSocket("udp4")
        this.socket.bind(9091, '127.0.0.1')

        // Register on start up listener
        this.socket.on('listening', () => {
            let address = this.socket.address()
            console.log(`UDP Server listening on ${address.address}:${address.port}`)
          })
        

        // Register on messafe listener
        this.socket.on('message', (buf, remote) => {

            // Checks if there is a connection
            let client = null
            if (!this.server.clients.hasOwnProperty(`${remote.address}-${remote.port}`)) {
              
              // New connection
              this.server.clients[`${remote.address}-${remote.port}`] = {uuid: v4()}  
              client = this.server.clients[`${remote.address}-${remote.port}`]
              console.log(`[${client.uuid}] New client from ${remote.address}:${remote.port}`)

            } else {

              // Already existing connection
              client = this.server.clients[`${remote.address}-${remote.port}`]

            }
            
            // Handle data 
            let buffer = new Buffer.from(buf)
            let receive = getVar(buffer)

            // Check IDs
            if (receive.value != null){

              // If it is a heart beat
              if (receive.value.id == 0){
                let count = receive.value.c
                this.server.connectionManager.addToResponseRecord(client.uuid, count)
              }

            }
          })

          
    }
    

    send(data, port, ip){
      this.socket.send(data, port, ip)
    }
}

module.exports = Socket