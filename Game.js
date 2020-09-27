class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
  async  start(){
   /*  var playerCountRef = await database.ref('playerCount').once("value");


        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
         
        } */
      if(gameState === 0){
        if (playerCount === 0){
          player = new Player(500, 200, biker);
         
        }
        /* else if (playerCount === 1){
          player = new Player(980, 220, biker_flip);
          console.log("player2 created")
       
        }
        else if (playerCount === 2){
          player = new Player(750, 600, biker_Gun);
          player.haveGun = true;
        //  player.update();
        } */
        playerCount=player.getCount();
        form = new Form()
        form.display();
        
      }
  
      
    }
  
    play(){
      form.hide();

      Player.getPlayerInfo();
      
      
     // console.log(allPlayers);
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        
        var index = 0;
  
        for(var plr in allPlayers){
          
          //add 1 to the index for every loop
          index = index + 1 ;
          if (allPlayers[plr].haveGun === true){
            player.haveGun = true;
            bikers_Array[index-1].addImage(biker_Gun);
          }
        if(bulletGroup.isTouching(bikers_Array[index-1]) && plr !== "players"+player.index){
           var shots = allPlayers[plr].points +1;
          bulletGroup.destroyEach();
          //console.log(shots);
          var ref = database.ref("Players/players" + index)
          bikers_Array[index-1].addImage(biker_Gun);
          bikers_Array[index-0].addImage(biker)
          ref.update({
            points:shots
          })
          }     
          
          bikers_Array[index-1].x = allPlayers[plr].x
          bikers_Array[index-1].y = allPlayers[plr].y
          imageMode(CENTER);
          image(heartAnimation, bikers_Array[index-1].x, bikers_Array[index-1].y + 80, 80, 80);

        //  console.log("playersprite1 x pos :"+ bikers_Array[index-1].x );
        //  console.log("player1 x pos: "+allPlayers[plr].x)

          if (plr === "players"+player.index){
         
          
            
            camera.position.x = bikers_Array[index-1].x
            camera.position.y =bikers_Array[index-1].y

            
           
          }
          
        
        }
      }
        if (keyIsDown(RIGHT_ARROW) && player.index !== null){
          var i = 1;
          if(player.index===1){
         i = 0
          }
          bikers_Array[i].addImage(biker);
          if(player.haveGun === true){
            bikers_Array[i].addImage(biker_Gun);
          }
          player.biker.x = player.biker.x + 5;
          bikers_Array[i].x = player.biker.x;
          game.writePosition(player.biker.x, player.biker.y);
        }
        
        
        else if (keyIsDown(LEFT_ARROW) && player.index !== null){
          //player.biker.velocityX = -5;
          player.biker.x = player.biker.x - 5;
          bikers_Array[player.index-1].addImage(biker_flip);
          if(player.haveGun === true){
            bikers_Array[player.index-1].addImage(biker_Gun_flipped);
          }
          //player.biker.addImage(biker_flip);
          bikers_Array[player.index-1].x = player.biker.x;
          game.writePosition(player.biker.x, player.biker.y);
  
        }
        
        else if (keyIsDown(DOWN_ARROW) && player.index !== null){
          player.biker.y = player.biker.y + 5;
          game.writePosition(player.biker.x, player.biker.y);
        }
        
        else if (keyIsDown(UP_ARROW) && player.index !== null){
          player.biker.y = player.biker.y - 5;
          game.writePosition(player.biker.x, player.biker.y);
        }
        if(keyIsDown(87) || keyIsDown(119)){
        bullet = createSprite(bikers_Array[player.index-1].x,bikers_Array[player.index-1].y);
        bulletGroup.add(bullet);
        bullet.addImage(bullet2);
        bullet.scale = 0.50;
        bullet.velocityY = -5;
        
          }
          if(keyIsDown(65) || keyIsDown(97)){
        bullet = createSprite(bikers_Array[player.index-1].x,bikers_Array[player.index-1].y);
        bullet.addImage(bullet4);
        bulletGroup.add(bullet);
        bullet.scale = 0.50;
        bullet.velocityX = -5;
        
          }
          if(keyIsDown(83) || keyIsDown(115)){
            bullet = createSprite(bikers_Array[player.index-1].x,bikers_Array[player.index-1].y);
            bullet.addImage(bullet3);
            bulletGroup.add(bullet);
            bullet.scale = 0.50;
            bullet.velocityY = 5;
            
              }
              if(keyIsDown(68) || keyIsDown(100)){
                bullet = createSprite(bikers_Array[player.index-1].x,bikers_Array[player.index-1].y);
                bullet.addImage(bullet1);
                bulletGroup.add(bullet);
                bullet.scale = 0.50;
                bullet.velocityX = 5;
                
                  }
          //if (keyIsDown(32)){
            //player.biker.x = player.biker.x + 20;
          //}
          //else{
            //player.biker.x = player.biker - 20;
          //}
          drawSprites();
        
  
  
      
     
 
      }
  
    end(){
      textSize(35);
      text("Game Ended", 200, 3900);
      fill(0, 102, 153);
      console.log(player.rank);
    }
    writePosition(x, y){
      var ref = database.ref("Players/players" + player.index)
      ref.update({
        x: x,
        y: y
      })
    }


    writePoints(shots){
      var ref = database.ref("Players/players" + player.index)
      ref.update({
        points:shots
      })
    }
  }