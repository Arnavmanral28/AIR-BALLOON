var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position; 

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirballoon",balloonImage1);
  

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError)
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirballoon",balloonImage2);
    updateposition(-10,0);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirballoon",balloonImage2);
    //write code to move air balloon in right direction
    updateposition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirballoon",balloonImage2);
    //write code to move air balloon in up direction
    updateposition(0,-10);
    balloon.scale = balloon.scale+0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirballoon",balloonImage2);
    //write code to move air balloon in down direction
    updateposition(0,10);
    balloon.scale = balloon.scale-0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air balloon!",40,40);
}
function updateposition(x,y){
  database.ref('balloon/position').set({
    'x': position.x+x,
    'y': position.y+y
  })
}
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y; 
}
function showError(){
  console.log("Error in writing to the database");
}