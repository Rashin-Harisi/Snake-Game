
var blockSize  = 25 ;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize *5;

//velocity
var velocityX =0;
var velocityY = 0;

//body
var snakeBody =[]

//food 
var foodX;
var foodY;

var gameOver = false

window.onload = function(){

	board = document.getElementById("board");
	board.height = rows * blockSize;
	board.width = cols*blockSize;
	context = board.getContext('2d');
	placeFood();
	document.addEventListener("keyup",changeDirection)
	//update();
	setInterval(update, 100);
}

function update(){
	if(gameOver){return;}
	context.fillStyle= "black";
	context.fillRect(0,0,board.height, board.width);

	context.fillStyle= 'red';
	context.fillRect(foodX,foodY,blockSize,blockSize);
	if(snakeX == foodX && snakeY==foodY){
		//pushing the location of food to the snake body
		snakeBody.push([foodX,foodY])
		placeFood()
	}
	//snake body movement from the tail
	for(let i = snakeBody.length-1 ; i>0 ; i--){
		snakeBody[i] = snakeBody[i-1];
	}
	//snake head movement
	if(snakeBody.length){
		snakeBody[0] = [snakeX,snakeY];
	}

	context.fillStyle= "lime";
	snakeX += velocityX *blockSize;
	snakeY += velocityY *blockSize;
	context.fillRect(snakeX,snakeY,blockSize,blockSize);
	for (let i=0;i<snakeBody.length;i++){
		context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
	}

	if(snakeX <0 || snakeX > blockSize*cols || snakeY <0 || snakeY >blockSize*rows){
		gameOver= true;
		alert("Game Over")
	}
	for (let i= 0 ; i<snakeBody.length; i++){
		if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
			gameOver=true;
			alert('Game Over')
		}
	}
} 


function changeDirection (e){
	if(e.code == "ArrowUp" && velocityY != 1){ 
		velocityX= 0;
		velocityY= -1;
	}else if (e.code == "ArrowDown" && velocityY != -1){
		velocityX= 0;
		velocityY= 1;
	}else if(e.code == "ArrowLeft" && velocityX != 1){
		velocityX= -1;
		velocityY= 0;
	}else if (e.code == "ArrowRight" && velocityX != -1){
		velocityX= 1;
		velocityY= 0;
	}
}


function placeFood(){
	foodX = Math.floor(Math.random() *cols) * blockSize;
	foodY = Math.floor(Math.random() * rows) * blockSize;
}