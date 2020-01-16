
var m = document.getElementById("Modal1");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  m.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == m) {
    m.style.display = "none";
  }
}

var canvas = document.getElementById("game");
var c  = canvas.getContext('2d');


const 	GAME_WIDTH = 800;
const   GAME_HEIGHT = 600;
var score = 0;
var life = 3;
var change;
var gameLost=false;

var redundant=[];

class Game {
	constructor(game_width,game_height){
		
		this.game_height = game_height;
		this.game_width = game_width;
	}
	start(){
		this.greenball = new Greenball(this);
		this.blueball = new Blueball(this)
		this.blackball = new Blackball(this);
		this.redball = new Redball(this);
		this.stick =  new Stick(this);

		var blackballs = [];
	


		this.gameObject = [
			this.redball,
			this.stick,
			this.greenball,
			this.blackball ,
			this.blueball,
			
		];


		new InputHandler(this.stick);

	}
	draw(c){

		c.font="30px Arial";
		c.fillStyle="black";
		c.fillText("score "+score,game.game_width-120,30);
		
		c.fillText("life "+life,30,30);
		this.gameObject.forEach(object => object.draw(c));	
		

	}
	update(change){
	
		this.gameObject.forEach(object => object.update(change));	
	
	}
}


class Greenball{
	constructor(game){
	 
	this.image = document.getElementById('greenball')
	this.x=game.game_width-20;
	this.y=abc();
	this.sp=Math.max((Math.floor(Math.random()*6)/10),0.3);
	}

	draw(c){

	
	c.drawImage(this.image, this.x, this.y,20,20);
		
	}

	update(){
		

       
       	if(this.x>=game.stick.swidth)
		{
			this.x-=change*this.sp;
		}
		else
		{
			if((this.y+20)>=game.stick.y_s_cordinate&&this.y<=(game.stick.y_s_cordinate+game.stick.sheight))
			{
				this.x=game.game_width+20+(Math.random()*10);
				this.y=abc();
				this.sp=Math.max((Math.floor(Math.random()*6)/10),0.3);
				score+=5;
			}
			else{
				this.x-=change*this.sp;
				if(this.x<0)
				{
					this.x=game.game_width+20+(Math.random()*10);
					this.y=abc();
					this.sp=Math.max((Math.floor(Math.random()*6)/10),0.3);

				}
			
			}
		}


	}
}

class Blackball{
	constructor(game){
	this.image = document.getElementById('blackball')
	this.x=game.game_width-20;
		this.y=Math.floor(Math.random()*(game.game_height-20));
	
		updateRedundant(this.y);
	
		
		this.sp=Math.max((Math.floor(Math.random()*7)/10),0.5);


	 
	}

	draw(c){

	

	c.drawImage(this.image, this.x, this.y,20,20);


		
	}

	update(change){
		
 	if(this.x>=game.stick.swidth)
		{
			this.x-=change*this.sp;
		}
		else
		{
			if((this.y+20)>=game.stick.y_s_cordinate&&this.y<=(game.stick.y_s_cordinate+game.stick.sheight))
			{
				this.x=game.game_width+20+(Math.random()*10);
				this.y=Math.floor(Math.random()*(game.game_height-20));
				updateRedundant(this.y);
				this.sp=Math.max((Math.floor(Math.random()*7)/10),0.5);
				score+=5;
			}
			else{
				this.x-=change*this.sp;
				if(this.x<0)
				{
					this.x=game.game_width+20+(Math.random()*10);
					this.y=Math.floor(Math.random()*(game.game_height-20));
					updateRedundant(this.y);
					this.sp=Math.max((Math.floor(Math.random()*7)/10),0.5);
				}
			
			}
		}
		
		

	}

}










class Blueball{
	constructor(game){
	    
	this.image = document.getElementById('blueball')
	this.x=game.game_width-20;
	this.y=abc();
	this.sp=Math.max((Math.floor(Math.random()*7)/10),0.3);
	}

	draw(c){

		
		c.drawImage(this.image, this.x, this.y,20,20);
		
	}

	update(){
		
	 
	 	if(this.x>=game.stick.swidth)
		{
			this.x-=change*this.sp;
		}
		else
		{
			if((this.y+20)>=game.stick.y_s_cordinate&&this.y<=(game.stick.y_s_cordinate+game.stick.sheight))
			{
				this.x=game.game_width+20+(Math.random()*10);
				this.y=abc();
				this.sp=Math.max((Math.floor(Math.random()*7)/10),0.3);
				score+=5;
			}
			else{
				this.x-=change*this.sp;
				if(this.x<0)
				{
					this.x=game.game_width+20+(Math.random()*10);
					this.y=abc();
					this.sp=Math.max((Math.floor(Math.random()*7)/10),0.3);
				}
			
			}
		}



	}
}

class Redball{
	constructor(game){
	   
	this.image = document.getElementById('redball')
	this.x=game.game_width-20;
	
	this.y=abc();
	this.sp=Math.max((Math.floor(Math.random()*8)/10),0.5);
	}

	draw(c){

		c.drawImage(this.image, this.x, this.y,20,20);
		
	}

	update(){
       
        	if(this.x>=game.stick.swidth)
		{
			this.x-=change*this.sp;
		}
		else
		{
			if((this.y+20)>=game.stick.y_s_cordinate&&this.y<=(game.stick.y_s_cordinate+game.stick.sheight))
			{
				if(life>=2){
					
					this.y=abc();
					this.sp=Math.max((Math.floor(Math.random()*8)/10),0.5);
					this.x=game.game_width+20+(Math.random()*10);
					life--;

				}
				else
				{
					
					var p=document.getElementById("m");
					p.style.font="Comic Sans MS";
					p.innerHTML='<h1 style="color:red;">You lost </h1><br>';
					p.innerHTML+='<h1>your score : '+score+'</h1>';
					m.style.display = "block";
					gameLost=true;
				}
				
			}
			else{
				this.x-=change*this.sp;
				if(this.x<0)
				{
					this.x=game.game_width+20+(Math.random()*10);
					this.y=abc();
					this.sp=Math.max((Math.floor(Math.random()*8)/10),0.5);
				}
			
			}
		}


	}
}



class Stick{
    constructor(game){
	 
	 this.x_s_cordinate=0;
	 this.y_s_cordinate=game.game_height/2;
	 this.sheight=game.game_height/6;
	 this.swidth=this.sheight*0.18;
	}
	
	moveUp(){
		
		
		if(this.y_s_cordinate>15)
		{
			this.y_s_cordinate-=change;
		}
		else
		{
			
		}

	}
	moveDown(){
		
		if(this.y_s_cordinate<GAME_HEIGHT-this.sheight-10)
		{
			this.y_s_cordinate+=change+10;
		}
		else
		{
			
		}
	}

    draw(c){
		
		c.fillStyle = "yellow"
	
		c.fillRect(this.x_s_cordinate , this.y_s_cordinate - 5, this.swidth, this.sheight);

	}
	update(change) {
		
     
	}
}

class InputHandler{
	constructor(stick){
	document.addEventListener('keydown', (event) =>{
	
		switch(event.keyCode){
			case 38:
				stick.moveUp();
				break;
			case 40:
				stick.moveDown();
				break;
		}
	});
	}
}



function abc()
{
	while(true){
			r=Math.floor(Math.random()*(game.game_height-20));
			for(var i=0;i<redundant.length;i++)
			{
				if(r>=redundant[i][0]&&r<=redundant[i][1])
				{
					break;
				}
			}
			if(i==redundant.length)
			{
				updateRedundant(r);
				return r;
				break;
			}
		}


}
function updateRedundant(r)
{
		redundant.push([r,r+20]);
		
}
function clearDup()
{
	
	for(var i=0;i<redundant.length;i++)
	{
		redundant.pop();
	}
}
var previous =0;

var game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

function gameLoop(position){
	 change = position - previous;
	previous = position;
	c.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
	clearDup();
	game.draw(c);
	game.update(change);
	if(gameLost==false)
	{
		requestAnimationFrame(gameLoop);
	}
	
}

requestAnimationFrame(gameLoop);




