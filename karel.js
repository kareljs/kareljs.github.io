
var ctx;

var mapIndexOffset = -1;

var mapRows = 10;
var mapCols = 10;

var ground = new Image();
ground.src = 'assets/ground.png';
var wall = new Image();
wall.src = 'assets/wall.png';
var bip = new Image();
bip.src = 'assets/bip.png';
var karelFront = new Image;
karelFront.src = 'assets/karelFront.png';
var karelBack = new Image;
karelBack.src = 'assets/karelBack.png';
var karelLeft = new Image;
karelLeft.src = 'assets/karelLeft.png';
var karelRight = new Image;
karelRight.src = 'assets/karelRight.png';

var map = [
	['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
	['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
	['G', 'W', 'G', 'W', 'G', 'G', 'G', 'G', 'B', 'G'],
	['G', 'W', 'G', 'W', 'G', 'G', 'G', 'W', 'G', 'G'],
	['G', 'W', 'G', 'W', 'G', 'G', 'G', 'W', 'G', 'G'],
	['G', 'W', 'G', 'W', 'G', 'G', 'G', 'G', 'G', 'G'],
	['G', 'W', 'G', 'W', 'G', 'G', 'G', 'G', 'G', 'G'],
	['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
	['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
	['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
];

document.addEventListener('DOMContentLoaded', start);

function start(){
	
	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	drawMap();
}

function drawMap(){
	for(var rowCtr = 0; rowCtr < mapRows; rowCtr++){
		for(var colCtr = 0; colCtr < mapCols; colCtr++){
			var img;
			switch(map[rowCtr][colCtr]){
				case 'G':
					img = ground;
				break;
				case 'W':
					img = wall;
				break;
				case 'B':
					img = bip;
				break;
			}
			ctx.drawImage(img, rowCtr*32, colCtr*32, 32, 32);
		}
	}
}

function kObject(type, imgUrl, imgSize){
	this.type = type;
	this.img = new Image();
	this.imgSize = imgSize;

	this.img.src = imgUrl;
}