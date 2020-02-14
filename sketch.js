var frames;
var board;
var states;
var pacman;
var enemies;

var gameIsOver = false;
var gameIsPaused = false;
var gameReady = true;


function setup() {
	createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
	resetGame();
	frameRate(FPS);
}

async function draw() {
	background(BLACK);
	states.draw();
	board.draw();
	//if (gameReady){
	//	await sleep(2000);
	//	gameReady = false;
	//}
	pacman.draw();
	pacman.update();
	drawEnemies();

	keyDown();
	/*
	player.update();
	updatePlayerLastOffFieldPos();
	drawTailingLines();
	checkKeyDown();
	checkCollisions();
	checkEnemyLineCollisions();
	drawPauseGame();
	showStatus();
	*/
}

function setBoard(){
	board = new Board(BOARD_POS_X, BOARD_POS_Y, BOARD_ROWS, BOARD_COLS);
}

function setFrames(){
	frames = [];
	let frame = new Frame(board.pos.x, board.pos.y, board.w, board.h);
	frames.push(frame);
}

function setStates(){
	states = new States(STATES_POS_X, STATES_POS_Y, SCREEN_WIDTH, STATES_HEIGHT, BLACK1);
}

function showStatus(){
	textSize(18);
	textStyle(BOLD);
	noStroke();
	fill(color(255));
	text(playerPositionsInsideField.length, width / 2, 20);
}

function resetGame(){
	setStates();
	setBoard();
	setFrames();
	setEnemies();
	setPacman();
	/*
	gameIsOver = false;
	gameIsPaused = false;
	//loop();
	*/
}

function drawEnemies(){
	for (let enemy of enemies){
		enemy.draw();
		enemy.update();
	}
}

function setPacman(){
	pacman = new Pacman(BOARD_POS_X + PACMAN_RADIUS, BOARD_POS_Y + PACMAN_RADIUS, PACMAN_RADIUS, PACMAN_SPEED, YELLOW);
}

function setEnemies(){
	enemies = [];
	for (let i = 0; i < ENEMIES_NUMBER; i++){
		let x = int(random(BOARD_POS_X + CELL_SIZE, BOARD_POS_X + BOARD_WIDTH - CELL_SIZE));
		let y = int(random(BOARD_POS_Y + CELL_SIZE, BOARD_POS_Y + BOARD_HEIGHT - CELL_SIZE));
		let enemy = new Enemy(x, y, ENEMY_RADIUS, ENEMY_SPEED, PINK);
		enemies.push(enemy);
	}
}
/*
function checkCollisions(){
	for (let enemy of enemies){
		if (player.isCollide(enemy)){
			gameOver();
		}
	}
}

function checkEnemyLineCollisions(){
	if (playerPositionsInsideField.length < 2){
		return;
	}
	for (let enemy of enemies){
		// for (let fieldLine of fieldLines){
		for (let i = 0; i < playerPositionsInsideField.length - 1; i++){
			// if enemy.pos is in fieldLine: game over
			// if (fieldLine.containsPoint(enemy.pos)){
				// gameOver();
			// }
			if (containsPoint(playerPositionsInsideField[i], playerPositionsInsideField[i + 1], enemy.pos, ENEMY_RADIUS)){
				gameOver();
			}
		}
	}
}
*/
function drawMessage(msg, fontSize, col){
	textSize(fontSize);
	textStyle(BOLD);
	noStroke();
	fill(col);
	text(msg, width / 2 - 50, height / 2);
}

function gameOver(){
	noLoop();
	drawMessage('GAME OVER. Press SPACE to restart', 24, color(255));
	gameIsOver = true;
}

function pauseGame(){
	noLoop();
	gameIsPaused = true;
}

function resumeGame(){
	loop();
	gameIsPaused = false;
}

function keyReleased(){
	pacman.stop();
}

function drawPauseGame(){
	if (gameIsPaused){
		drawMessage('GAME PAUSED', 24, color(255));
	}
}

function pauseOrResumeGame(){
	if (gameIsPaused){
		resumeGame();
	}
	else{
		pauseGame();
	}
}

function containsPoint(p1, p2, p, precision){
	// x = a OR y = b
	var a = 0;

	// line equation is: x = a
	if (p1.x == p2.x){
		a = p1.x;
		var cond1 = p1.y <= p2.y && p.y >= p1.y && p.y <= p2.y && abs(p.x - a) == precision;
		var cond2 = p2.y <= p1.y && p.y >= p2.y && p.y <= p1.y && abs(p.x - a) == precision;
		return cond1 || cond2;
	}

	// line equation is: y = a
	else if (p1.y == p2.y){
		a = p1.y;
		var cond3 = p1.x <= p2.x && p.x >= p1.x && p.x <= p2.x && abs(p.y - a) == precision;
		var cond4 = p2.x <= p1.x && p.x >= p2.x && p.x <= p1.x && abs(p.y - a) == precision;
		return cond3 || cond4;
	}
	return false;
}

/* Event Handlers */

function keyDown(){
	if (keyIsDown(RIGHT_ARROW)){
		pacman.goRight();
	}
	if (keyIsDown(LEFT_ARROW)){
		pacman.goLeft();
	}
	if (keyIsDown(UP_ARROW)){
		pacman.goUp();
	}
	if (keyIsDown(DOWN_ARROW)){
		pacman.goDown();
	}
}

function keyPressed(){
	if (!gameIsOver){
		if (key == 'p'){
			console.log('p');
			pauseOrResumeGame();
		}
	}
	if (key == ' '){
		if (gameIsOver){
			restartGame();
		}
	}
	/*
	if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW){
		if (keyCode == RIGHT_ARROW){
			pacman.saveLastDirection('r');
		}
		else if (keyCode == LEFT_ARROW){
			pacman.saveLastDirection('l');
		}
		else if (keyCode == UP_ARROW){
			pacman.saveLastDirection('u');
		}
		else if (keyCode == DOWN_ARROW){
			pacman.saveLastDirection('d');
		}

		if (player.isInsideRect(field) && player.currDirection != player.prevDirection){
			playerPositionsInsideField.push(player.pos.copy());
		}
	}
	*/
}
