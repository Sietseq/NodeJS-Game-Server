extends Node

var connection = PacketPeerUDP.new()

var ADDRESS = '127.0.0.1'
var PORT_SERVER = 9091

func _ready():
	print("Start client UDP")
	# Connect
	connection.set_dest_address(ADDRESS, PORT_SERVER)
	connection.put_var(null)

func _process(delta):
	if Input.is_action_just_released("ui_accept"):
		connection.put_var(10)
		
	if connection.get_available_packet_count() > 0 :
		var packet = connection.get_var()
		match packet["id"]:
			0:
				connection.put_var({"id": 0, "c": packet["c"]})
