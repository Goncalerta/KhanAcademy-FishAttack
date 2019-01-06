void setup() {
    size(400, 400);
    
}

/**

By Goncalerta

You're a fish. Control yourself with your mouse and eat the other fish. You must be fast because you're hungry and if you take too much time you die. 

Try to get the best score you can! Have fun. :)

**/

//Support Variables
var d = 5;
var p = 0;

//Player Variable
var P = {
    centerX: width/2,
    centerY: height/2,
    bodyLength: 50,
    bodyHeight: 30,
    bodyColor: color(83, 181, 165),
    vel: 3,
    side: random(1, 10)
};

//Fish Variable
var Fish = [{
    centerX: random(-100, width+100),
    centerY: random(0, 400),
    bodyLength: random(30, 130),
    bodyHeight: random(10, 90),
    bodyColor: color(random(0, 255), //Red
                     random(0, 255), //Green
                     random(0, 255)), //Blue
    vel: random(1, 6),
    side: random(1, 10)
    
}, {
    centerX: random(-100, width+100),
    centerY: random(0, 400),
    bodyLength: random(30, 130),
    bodyHeight: random(10, 90),
    bodyColor: color(random(0, 255), //Red
                     random(0, 255), //Green
                     random(0, 255)), //Blue
    vel: random(1, 6),
    side: random(1, 10)
    
}];

//Draw Fish
var drawFish = function(centerX, centerY, bodyLength, bodyHeight, bodyColor){
        noStroke();
        fill(bodyColor);
        
        //Body
        ellipse(centerX, centerY, bodyLength, bodyHeight);
        
        //Tail
        var tailWidth = bodyLength/4;
        var tailHeight = bodyHeight/2;
        triangle(centerX-bodyLength/2, centerY,
          centerX-bodyLength/2-tailWidth, centerY-tailHeight,
          centerX-bodyLength/2-tailWidth, centerY+tailHeight);
         
        //Eye
        fill(33, 33, 33);
        ellipse(centerX+bodyLength/4, centerY, bodyHeight/5, bodyHeight/5);
};

//Fish Ability
var toFish = function(Player, Fish){
    
    //Player Height Logic
    p++;
    Player.bodyLength+=8;
    Player.bodyHeight+=4;
    
    //New Fish Generator
    Fish.centerX = random(0, width);
    Fish.centerY = random(0, height);
    Fish.bodyLength = random(30, 130);
    Fish.bodyHeight = random(10, 90);
    Fish.bodyColor = color(random(0, 255),
                         random(0, 255), 
                         random(0, 255));
    Fish.vel = random(1, 6);
    Fish.side = random(1, 10);
   
};

//Draw Function
void draw() {
    background(89, 216, 255);
    
    //Draw Player
    drawFish( P.centerX    , 
              P.centerY    , 
              P.bodyLength , 
              P.bodyHeight , 
              P.bodyColor  );
             
    //Mouse Controls
    P.centerX = mouseX;
    P.centerY = mouseY;
    
    //Player Height Logic
    P.bodyLength-=(d/100);
    P.bodyHeight-=(d/100);
    d+= 3/100;
    if(P.bodyLength > 200){
        P.bodyLength = 150;
        P.bodyHeight = 120;
    }
    
    //Score
    fill(0, 0, 0);
    textSize(50);
    textAlign(RIGHT, BASELINE);
    text(p, width-20, 66);
    
    //Game Over
    if(P.bodyLength && P.bodyHeight < 0){
        fill(0, 0, 0);
        textAlign(LEFT, BASELINE);
        textSize(60);
        text("Game Over!!!", 10, 397);
        P = undefined;
        
    }
    
    
    //Fish AI
    for (var i = 0; i < Fish.length; i++){
        drawFish(  Fish[i].centerX, 
                   Fish[i].centerY, 
                   Fish[i].bodyLength, 
                   Fish[i].bodyHeight, 
                   Fish[i].bodyColor  );
        
        //Tank Canvas
        if(Fish[i].centerX > width+100 || Fish[i].centerX < -100){
            Fish[i].side = 6;   
        }
        
        if(Fish[i].side > 5){
            Fish[i].vel = -Fish[i].vel;   
            Fish[i].bodyLength = -Fish[i].bodyLength;   
            Fish[i].side = 2;
        }
        
        //Movement
        Fish[i].centerX += Fish[i].vel;
        
        //Fishing
        if(Fish[i].vel > 0){
            if((P.centerX+P.bodyLength/2 > Fish[i].centerX-Fish[i].bodyLength/2 &&
             P.centerX-P.bodyLength/2 < Fish[i].centerX+Fish[i].bodyLength/2) &&
             (P.centerY+P.bodyHeight/2 > Fish[i].centerY-Fish[i].bodyHeight/2 && 
             P.centerY-P.bodyHeight/2 < Fish[i].centerY+Fish[i].bodyHeight/2)){
                 
                toFish(P, Fish[i]);
            }
           
        }else if(Fish[i].vel < 0){
            if((P.centerX+P.bodyLength/2 > Fish[i].centerX+Fish[i].bodyLength/2 &&
             P.centerX-P.bodyLength/2 < Fish[i].centerX-Fish[i].bodyLength/2) &&
             (P.centerY+P.bodyHeight/2 > Fish[i].centerY-Fish[i].bodyHeight/2 && 
             P.centerY-P.bodyHeight/2 < Fish[i].centerY+Fish[i].bodyHeight/2)){
                 
                toFish(P, Fish[i]);
            }
        }
    }
};