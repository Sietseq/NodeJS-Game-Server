class Packager {
    constructor(server){
        this.server = server
        this.rpcQueue = {}

        setInterval(this.makePackets, 17, this.server)
    }


    makePackets(server){
        this.packageWorldState(server)
        this.packageRPC(server)
    }

    packageWorldState(server){

    }

    packageRPC(server){

    }
}

module.exports = Packager