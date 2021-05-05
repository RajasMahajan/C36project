//Create variables here
var database;
var dog;
var dog1;
var foodok;
var dog2;
var foodstock;
var foodS;
var addone,feedone;
var lasttime;
var e;
function preload()
{
  //load images here
  dog1=loadImage("dogImg.png");
  dog2=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,800);
  dog=createSprite(250,600,30,30);
  dog.scale=0.7;
  dog.addImage(dog1);
  database=firebase.database();
 ref = database.ref("Food")
 ref.on("value",readStock)
 addone=createButton("addMilk");
 addone.position(450,200);
  addone.mousePressed(addfood);
  feedone=createButton("Feed Dog");
  feedone.position(600,200);
  feedone.mousePressed(feedDog)
  food=new Foodyes();
}


function draw() {  
  background("skyblue");
  food.display();
  feedref=database.ref('Feedtime');
  feedref.on("value",(data)=>{
    lasttime=data.val();
  })
  console.log(lasttime);
  drawSprites();
  text("last feed: "+lasttime,200,100)
}
function readStock(data){
  foodS=data.val();
  console.log(foodS);
  food.updateFood(foodS); 
}
function addfood(){
  foodS=foodS+5;
  
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage(dog1);
}
function feedDog(){
  dog.addImage(dog2);
  var currentstock = food.getFood();
  currentstock=currentstock-3;
  food.updateFood(currentstock);
  database.ref('/').update({
    Food:food.getFood(),
    Feedtime:hour()
  })
}
