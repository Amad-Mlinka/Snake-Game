const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
var brzina=100;
/*jedna celihja-duzine 32 piksela*/

const celija = 32;

// img fajl pozadine i poena

const ground = new Image();
ground.src = "img/groundcopy.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// audio fajlovi

var dead = new Audio();
var eat = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";


// inicijalizacija zmije kao niz koji ce kasnije postati niz krugova
var snake = [];

snake[0] = 
{
    x : 9 * celija,
    y : 10 * celija
};

// generisanje poena na nasumicnim celijama

var food = 
{
    x : Math.floor(Math.random()*17+1) * celija+16,
    y : Math.floor(Math.random()*15+3) * celija+16
}

// inicijalizacija bodova

var score = 0;

//dio za kontrole

var unos;//d je unos iz tastature

document.addEventListener("keydown",smjer);

function smjer(event){
    var key = event.keyCode;
    if( key == 37 &&unos!= "RIGHT"){
       unos= "LEFT";
        
    }else if(key == 38 &&unos!= "DOWN"){
       unos= "UP";
       
    }else if(key == 39 &&unos!= "LEFT"){
       unos= "RIGHT";
        
    }else if(key == 40 &&unos!= "UP"){
       unos= "DOWN";
        
    }
}


// funkcija za collision, ili ti ga sudaranje
function collision(glava,zmija){
    for(var i = 0; i < zmija.length; i++){
        if(glava.x == zmija[i].x && glava.y == zmija[i].y){
            return true;
        }
    }
    return false;
}

// gdje se magija desava, sve se crta sto je napravljeno

function draw(){
    
    ctx.drawImage(ground,0,0);//pozadina
    
    for( var i = 0; i < snake.length ; i++){
        
        ctx.beginPath();
        ctx.arc(snake[i].x+16,snake[i].y+16,celija/2, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.fillStyle = ( i == 0 )? "darkred" : "red";
        ctx.fill();
        ctx.stroke();
        
       
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // pozicija prvobitne glave
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    
    // koji smjer
    if(unos== "LEFT") snakeX -= celija/2;
    if(unos== "UP") snakeY -= celija/2;
    if(unos== "RIGHT") snakeX += celija/2;
    if(unos== "DOWN") snakeY += celija/2;
    
    // jedenje jabuke
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * celija,
            y : Math.floor(Math.random()*15+3) * celija
        }
        
    }else{
        
        snake.pop();
    }
    
    // dodavanje nove glave
    
    var novaGlava = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < celija || snakeX > 17 * celija || snakeY < 3*celija || snakeY > 17*celija || collision(novaGlava,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(novaGlava);
    //oznacavanje score-a
    ctx.fillStyle = "black";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*celija,1.6*celija);
}

// draw funkcija, glavna funkcija se poziva svakih 100ms, moze oznacavati franmerate

var game = setInterval(draw,brzina);




















