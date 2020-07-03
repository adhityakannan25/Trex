var trex,trexWalkingImg;
var ground,groundImg;
var invisibleGround;
var obsGroup,cloudGroup;
var speedObs=3
var cloudImg;
var obsImg1,obsImg2,obsImg3,obsImg4,obsImg5,obsImg6;
var score;


function preload(){
  trexWalkingImg=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obsImg1=loadImage("obstacle1.png");  
  obsImg2=loadImage("obstacle2.png");
  obsImg3=loadImage("obstacle3.png");
  obsImg4=loadImage("obstacle4.png");
  obsImg5=loadImage("obstacle5.png");
  obsImg6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(40,170,10,10);
  trex.addAnimation("alias name",trexWalkingImg);
  trex.scale=0.6
  
  ground=createSprite(300,180,600,10);
  ground.addImage(groundImg);
  
  invisibleGround=createSprite(300,185,600,2);
  
  invisibleGround.visible=false;
  
  ground.velocityX=-3
  ground.x=ground.width/2;
  
  obsGroup=createGroup()
  cloudGroup=createGroup()
  
  score=0;
  
}

function draw() {
  background(180);
  //trex jump
  trex.velocityY=trex.velocityY+0.8;
  
  if(keyDown("space") && trex.y>145){
     trex.velocityY=-10;
     }
  //console.log(trex.y);
  trex.collide(invisibleGround);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
console.log(score);

  spawnObstacles() 
  spawnClouds()
  
  score=score+Math.round(World.frameRate/50);
  
  textFont("Arial Black");
   textSize(17);
   text("Score = "+score,450,45);
  
  drawSprites();
}

function spawnObstacles(){
  if(World.frameCount%80===0){
    var obstacle = createSprite(610,170,20,20)
    obstacle.scale=0.5;
    obstacle.velocityX=-speedObs;
    obstacle.lifetime=Math.round(620/speedObs);
    var randomNo=Math.round(random(1,6));
    //console.log(randomNo);
    
    switch(randomNo){//decision making 
      case 1:  obstacle.addImage(obsImg1);
        break;
      case 2:  obstacle.addImage(obsImg2);
        break;
      case 3:  obstacle.addImage(obsImg3);
        break;
      case 4:  obstacle.addImage(obsImg4);
        break;
      case 5:  obstacle.addImage(obsImg5);
        break;
      case 6:  obstacle.addImage(obsImg6);
        break;
      default: obstacle.addImage(obsImg1);
        break;
    }
    obsGroup.add(obstacle);
  }
}
function spawnClouds(){
  if(World.frameCount%50===0){
    var cloud = createSprite(610,random(20,100),20,20)
    cloud.velocityX=-3;
    //cloud.setAnimation("cloud"); 
    cloud.scale=random(0.3,0.8)
    cloud.depth=trex.depth;
    trex.depth++;
     //cloud.depth=1;
     //trex.depth=2;
     //console.log(cloud.depth);
     //console.log(trex.depth);
     cloud.lifetime=Math.round(620/3); 
     cloudGroup.add(cloud);
     cloud.addImage(cloudImg)
  }
}