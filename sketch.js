
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var count=0;
var bg1, bg2, bg3, sound,rock1, rock2, meteor1, meteor2, debris, wormhole1, wormhole2, obstaclesGroup;
var gameOver,restart;


function preload() {
  
  bg1 = loadImage("bg_1.jpg");
  bg2 = loadImage("bg_2.jpeg");
  bg3 = loadImage("bg_3.png");
  rock1 = loadImage("rock_1.png");
  rock2 = loadImage("rock_2.png");
  meteor1 = loadImage("hdm.png");
  meteor2 = loadImage("fire.png");
  debris = loadImage("space_debris.png");
  wormhole1 = loadImage("Wormhole.png");
  wormhole2 = loadImage("Wormhole_2.png");
  rocket = loadImage("rocket.png");
  enemy = loadImage("Enemy.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  createSprite(400, 200, 50, 50);
  background1 = createSprite(width / 2, height / 2, width, height);
  
  
  

  rocket_hmc = createSprite(width / 2 - 100, height / 2, 100, 100)
  rocket_hmc.addImage(rocket);
  rocket_hmc.scale = 1;
  //rocket_hmc.debug = true;
  rocket_hmc.setCollider("circle",0,0,100);

  gameOver = createSprite(width/2,height/2- 70);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale=0.3;
  gameOver.visible = false;
  restart.visible = false;
  
    obstaclesGroup = new Group();
    edges=createEdgeSprites();
    score=0;
}

function draw() {

  if(score%30>15)
{
  background1.addImage(bg1);
  background1.scale = 2;
}
else if(score%30>-1&&score%30<16){
  background1.addImage(bg2);
  background1.scale = 2.3;
}  


 
if (gameState == PLAY) {
  
    if (background1.x < 0) {
      background1.x = 550;

    }
    background1.velocityX = -(5+score/5);
    if (keyDown(LEFT_ARROW)) {
      rocket_hmc.x = rocket_hmc.x - 5;
    }
    if (keyDown(RIGHT_ARROW)) {
      rocket_hmc.x = rocket_hmc.x + 5;
    }
   
   
    obstacles();
    if(count==0&&obstaclesGroup.isTouching(edges[3])){
      score=score+2;
     
    }
    if(obstaclesGroup.isTouching(edges[3])){
      count=1
    }
  
    else{
      count=0;
    }

    if (obstaclesGroup.isTouching(rocket_hmc)) {
      gameState = END;
    }
  }

  if (gameState == END) {
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.destroyEach;
    background1.velocityX = 0;
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
  }

  if(touches.length>0 || keyDown("ENTER")) {      
    reset();
    touches = []
  }



   if(mousePressedOver(restart)){
reset();
     }


  drawSprites();
  textSize(30);
  textFont("Comic Sans MS")
  fill("purple");
  text("Score =" +score,width-200,50);

}

function obstacles() {
  if (frameCount % 100 == 0) {
    var obstacle = createSprite(random(50, width - 50) - 50, 10, 12);
    
    var rand = Math.round(random(1, 3));
    if (rand == 1) {
      obstacle.addImage(meteor1);
      //obstacle.debug = true;
      obstacle.setCollider("rectangle",0,0,150,80);
    }

    if (rand == 2) {
      obstacle.addImage(meteor2);
      //obstacle.debug = true;
      obstacle.setCollider("rectangle",0,0,270,100)
    }

    if (rand == 3) {
      obstacle.addImage(enemy);
      obstacle.scale = 0.35;
      //obstacle.debug = true;
      obstacle.setCollider("rectangle",-50,-100,100,50)
    }
    obstacle.velocityY = (5+score/10);
    obstaclesGroup.add(obstacle);
  }

}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  

  
  obstaclesGroup.destroyEach();
  score=0;
}