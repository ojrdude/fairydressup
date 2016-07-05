var Fairy = new Play('Fairy');

Fairy.preload = function() {

	//Fairy Graphics
	this.addImage('face', 'assets/img/character/Fairy/face.png', false);

	this.addSpriteSheet('eyebrows', 'assets/img/character/Fairy/eyebrows.png', 477, 283, false, 6);
	this.addSpriteSheet('eyes', 'assets/img/character/Fairy/eyes.png', 481, 304, false, 10);
	this.addSpriteSheet('glasses', 'assets/img/character/Fairy/glasses.png', 510, 320, false);
	this.addSpriteSheet('hair', 'assets/img/character/Fairy/hair.png', 600, 377, false, 3);
	this.addSpriteSheet('mouth', 'assets/img/character/Fairy/mouth.png', 75, 52, false);
	this.addSpriteSheet('nose', 'assets/img/character/Fairy/nose.png', 431, 351, false);

	//The Body
	this.addImage('base', 'assets/img/character/Fairy/outfit/base.png', false);
	this.addImage('outfit-1', 'assets/img/character/Fairy/outfit/0.png', false);
	this.addImage('outfit-2', 'assets/img/character/Fairy/outfit/1.png', false);
	this.addImage('outfit-3', 'assets/img/character/Fairy/outfit/2.png', false);
	this.addImage('outfit-4', 'assets/img/character/Fairy/outfit/3.png', false);
	this.addImage('outfit-5', 'assets/img/character/Fairy/outfit/4.png', false);
	
	//Create the background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['Fairy-bg']);
	this.addChild(this.background);

	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}


Fairy.loadComplete = function() {
	Play.prototype.loadComplete.call(this);

	//When the loading has been completed, we need to destory the background and re-create it in the create stage.
	//This is because after the loadComplete method executes, Kiwi then remakes the texture library and that process will destory any currently used images.
	this.background.exists = false;
	this.background.visible = false;
}


//Controls the creation the dressup elements and the buttons to control them.
Fairy.createDressup = function() {

    //Create the background. 
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['Fairy-bg'], 0, 0);


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];
    this.buttons = [];

    //The Base
    var base = new Kiwi.GameObjects.StaticImage(this, this.textures.base, 0, 0);

    //Changable Items
    var face = new Option(this, this.textures.face, 0, 0);
    var eyes = new Option(this, this.textures.eyes, 0, 0);
    var eyebrows = new Option(this, this.textures.eyebrows, 0, 0);
    var glasses = new Option(this, this.textures.glasses, 0, 0);
    var hair = new Option(this, this.textures.hair, 1, 0);
    var mouth = new Option(this, this.textures.mouth, 383, 335);
    var nose = new Option(this, this.textures.nose, 0, 0);
    var outfit = new Option(this, [this.textures['outfit-1'], 
    	this.textures['outfit-2'],
    	this.textures['outfit-3'],
    	this.textures['outfit-4'],
    	this.textures['outfit-5']
    	], 0, 0);

    //Add the dress up elements to the array
    this.dressUpElements = [outfit, face, eyes, eyebrows, hair, nose, mouth, glasses];

    //Create the buttons
    this.createButton( this.textures.hairBtn, 10, hair);
    this.createButton( this.textures.eyebrowsBtn, 121, eyebrows);
    this.createButton( this.textures.glassesBtn, 232, glasses);
    this.createButton( this.textures.eyesBtn, 343, eyes);
    this.createButton( this.textures.noseBtn, 454, nose);
    this.createButton( this.textures.mouthBtn, 565, mouth);
    this.createButton( this.textures.outfitBtn, 676, outfit);


    //Add to the stage.
    this.addChild(this.background);
    this.addChild(base);
    this.addChild(face);

    for(var i = 0; i < this.dressUpElements.length; i++) {
    	this.addChild( this.dressUpElements[i] );
    }

    for(var i = 0; i < this.buttons.length; i++) {
    	this.addChild( this.buttons[i] );
    }
}


//Handles the creation of a button to switch the dressup item
Fairy.createButton = function(btnTexture, y, dressUpItem) {
	var ele = new Kiwi.GameObjects.Sprite(this, btnTexture, 10, y);
	this.buttons.push(ele);
	ele.input.onUp.add(dressUpItem.next, dressUpItem);
}


//This custom 
Fairy.createCustomButtons = function() {
	//Call the Play states createCustomButtons method, this will ensure that the buttons are created still.
	Play.prototype.createCustomButtons.call(this);

	//Apply input events to the next and previous buttons
	this.nextButton.input.onUp.add(function() {
		this.game.states.switchState('Zoe');
	}, this);


	this.prevButton.input.onUp.add(function() {
		this.game.states.switchState('ZoeFriend');
	}, this);
}




