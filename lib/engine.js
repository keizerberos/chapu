var canvas;
var stage;
var player;
var fondo;


$(document).ready(function(){
	
	cargar()

	iniciar();
	
	ejecutar();
});

function _Player(){
	this.name = "jose";
	this.x = 0;
	this.y = 0;
	this.isAnim = "";
	this.key = new Array();
	for (i = 0; i < 255 ; i++)	this.key[i] = false;
	
	this.anim = new createjs.SpriteSheet({"images": ["img/char.png"],
	"frames": {"regX": 0, "height": 100, "count": 3, "regY": 0, "width": 100},
	"animations": {"stand": [0, 0],"walk": [0, 2,"walk",0.5]}
	});
	  
	this.handle =  new createjs.Sprite(this.anim);
	this.handle.x = 100;
	this.handle.y = 50;
	this.handle.regX = 50;
	this.handle.regY = 50;
	this.handle.shadow = new createjs.Shadow("#787", 0, 5, 4);
	this.handle.direction = 90;
	this.handle.vX = 4;

	this.update = function(){
		if (this.key["D".charCodeAt(0)] == true){
			if (this.handle.direction == -90){
				this.handle.direction = 90;
				this.handle.scaleX = 1;
			}			
			this.handle.x +=this.handle.vX;
			if (this.isAnim != "walk"){
				this.isAnim = "walk";
				this.handle.gotoAndPlay("walk");				
			}
		}
		if (this.key["A".charCodeAt(0)] == true){
			if (this.handle.direction == 90){
				this.handle.direction = -90;
				this.handle.scaleX = -1;				
			} 
			this.handle.x -= this.handle.vX;			
			if (this.isAnim != "walk"){
				this.isAnim = "walk";
				this.handle.gotoAndPlay("walk");				
			}
		}
		if (this.key["W".charCodeAt(0)] == true){
			this.handle.y -=this.handle.vX;
			if (this.isAnim != "walk"){
				this.isAnim = "walk";
				this.handle.gotoAndPlay("walk");				
			}
		}
		if (this.key["S".charCodeAt(0)] == true){
			this.handle.y += this.handle.vX;
			if (this.isAnim != "walk"){
				this.isAnim = "walk";
				this.handle.gotoAndPlay("walk");				
			}
		}
		if (!(this.key["W".charCodeAt(0)] || this.key["S".charCodeAt(0)] || this.key["D".charCodeAt(0)] || this.key["A".charCodeAt(0)]) )
		{
			this.handle.gotoAndStop("stand");
			this.isAnim = "";
			this.handle.stop();
		}
	};
}


function cargar(){
	canvas = document.getElementById("demoCanvas");
	stage = new createjs.Stage(canvas);
	var img1 = new Image();
	img1.src = "img/fondo1.jpg";
	fondo = new createjs.Bitmap(img1);
	player  = new _Player();
	var text = new createjs.Text("Utiliza las teclas W,S,D,A ", "bold 24px Arial", "#ff7700");
	text.x = 400;
//	player.handle.direction = 90;
//	player.handle.currentFrame = 0;
//	player.handle.vX = 4;
//	player.handle.x = 16;
//	player.handle.y = 32;
	//player.handle.gotoAndPlay("walk");
	stage.addChild(fondo);
	
	stage.addChild(player.handle);
	stage.addChild(text);
}

function tecladoPress(){
	if (event.keyCode == "D".charCodeAt(0)) {
		player.key["D".charCodeAt(0)] = true;
	}
	if (event.keyCode == "A".charCodeAt(0)) {
		player.key["A".charCodeAt(0)] = true;
	}
	if (event.keyCode == "W".charCodeAt(0)) {
		player.key["W".charCodeAt(0)] = true;
	}
	if (event.keyCode == "S".charCodeAt(0)) {
		player.key["S".charCodeAt(0)] = true;
	}
}
function tecladoPressUp(){
	if (event.keyCode == "D".charCodeAt(0)) {
		player.key["D".charCodeAt(0)] = false; 
	}
	if (event.keyCode == "A".charCodeAt(0)) {
		player.key["A".charCodeAt(0)] = false; 
	}
	
	if (event.keyCode == "W".charCodeAt(0)) {
		player.key["W".charCodeAt(0)] = false;
	}
	if (event.keyCode == "S".charCodeAt(0)) {
		player.key["S".charCodeAt(0)] = false;
	}
}

function iniciar(){
	document.onkeydown = tecladoPress;
	document.onkeyup = tecladoPressUp;
}

function ejecutar(){	
	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
	
	player.update();

	stage.update(event);
}

