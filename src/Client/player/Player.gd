extends KinematicBody2D

var speed = 200  # speed in pixels/sec
var velocity = Vector2.ZERO

func get_input():
	velocity = Vector2.ZERO
	if Input.is_action_pressed('right'):
		$Sprite.frame = 3
		velocity.x += 1
	if Input.is_action_pressed('left'):
		$Sprite.frame = 2
		velocity.x -= 1
	if Input.is_action_pressed('down'):
		$Sprite.frame = 0
		velocity.y += 1
	if Input.is_action_pressed('up'):
		$Sprite.frame = 1
		velocity.y -= 1
	# Make sure diagonal movement isn't faster
	velocity = velocity.normalized() * speed

func _physics_process(delta):
	get_input()
	velocity = move_and_slide(velocity)
