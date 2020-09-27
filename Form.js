class Form {
  constructor() {
    
     this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h3');
    this.title = createElement("h2");
    this.reset = createButton("Reset");
  }
  hide(){
    this.input.hide();
    this.button.hide();
    this.greeting.hide();
}
  display(){
    this.title.html("PVP");
    this.title.position(displayWidth/2 - 50, 0);
    
    
    this.input.position(displayWidth/2 - 40, displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth - 100, 20)

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();

     
       
      
      player.name = this.input.value();
      playerCount=playerCount+1;
      console.log("playerCount after filling form " +playerCount)
      if(playerCount===2){
        player.biker.x=580;
        player.biker.y=220;
        player.biker.addImage(biker_flip);
      }
      console.log(player.biker.x)
      console.log(player.biker.y)

      player.index = playerCount;
      player.updateCount(playerCount);
      player.update();
      
      
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4)
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      var playersref=database.ref('Players');
      playersref.remove();
    });
  }
}
