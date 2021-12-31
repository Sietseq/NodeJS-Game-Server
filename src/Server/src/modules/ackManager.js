class AckManager{
    constructor(server){
        this.server = server
        this.sent = {}
    }

    updateStatus(){
        // remove package from sent
    }

    resendPackage(){
        // Resend package with high priority
    }
}

module.exports = AckManager