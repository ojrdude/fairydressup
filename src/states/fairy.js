var Fairy = new Play('Fairy');

Fairy.preload = function() {

	//Fairy Graphics
	// Currently excluding the fairy outlines at end of spritesheets by specifying the number of images
	this.addSpriteSheet('girl_base', 'assets/img/character/fairy/girl_fairy_base.png', 350, 500, false, 9);
	this.addSpriteSheet('girl_access', 'assets/img/character/fairy/girls_access.png', 350, 500, false, 10);
	this.addSpriteSheet('girl_clothes_bottom', 'assets/img/character/fairy/girls_bottom_clothes.png', 350, 500, false, 30);
	this.addSpriteSheet('girl_ears', 'assets/img/character/fairy/girls_ears.png', 350, 500, false, 6);
	this.addSpriteSheet('girl_eyes', 'assets/img/character/fairy/girls_eyes.png', 350, 500, false, 45);
	this.addSpriteSheet('girl_hair', 'assets/img/character/fairy/girls_hair.png', 350, 500, false, 50);
	this.addSpriteSheet('girl_head_access', 'assets/img/character/fairy/girls_head_access.png', 350, 500, false, 8);
	this.addSpriteSheet('girl_mouths', 'assets/img/character/fairy/girls_mouths.png', 350, 500, false, 8);
	this.addSpriteSheet('girl_shoes', 'assets/img/character/fairy/girls_shoes.png', 350, 500, false, 30);
	this.addSpriteSheet('girl_clothes_top', 'assets/img/character/fairy/girls_top_clothes.png', 350, 500, false, 30);
	this.addSpriteSheet('girl_wands', 'assets/img/character/fairy/girls_wands.png', 350, 500, false, 15);
	this.addSpriteSheet('wings', 'assets/img/character/fairy/wings.png', 400, 400, false, 30);

	// Base for loading time
	this.addImage('base', 'assets/img/character/fairy/girl_base_single.png', false);

	
	//Create the background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['fairy-bg']);
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
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['fairy-bg'], 0, 0);


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];
    this.buttons = [];

    var baseX = 200;
    var baseY = 170
    //The Base
    var base = new Kiwi.GameObjects.StaticImage(this, this.textures.base, baseX, baseY);

    //Changable Items
    var bases = new Option(this, this.textures.girl_base, baseX, baseY);
    var accessories = new Option(this, this.textures.girl_access, 0, 0);
    var clothesBottom = new Option(this, this.textures.girls_clothes_bottom, 0, 0);
    var ears = new Option(this, this.textures.girl_ears, 0, 0);
    var eyes = new Option(this, this.textures.girl_eyes, 0, 0);
    var hair = new Option(this, this.textures.girl_hair, 0, 0);
    var headAccessories = new Option(this, this.textures.girl_head_access, 0, 0);
    var mouths = new Option(this, this.textures.girl_mouths, 0, 0);
    var shoes = new Option(this, this.textures.girl_shoes, 0, 0);
    var clothesTop = new Option(this, this.textures.girl_clothes_top, 0, 0);
    var wands = new Option(this, this.textures.girls_wands, 0, 0);
    var wings = new Option(this, this.textures.wings, 0, 0);
    
    //Add the dress up elements to the array
    this.dressUpElements = [bases, accessories, clothesBottom, ears, eyes, hair, headAccessories, mouths,
                            shoes, clothesTop, wands, wings];

    //Create the buttons
    this.createButton( this.textures.hairBtn, 10, bases);
    this.createButton( this.textures.eyebrowsBtn, 121, accessories);
    this.createButton( this.textures.glassesBtn, 232, clothesBottom);
    this.createButton( this.textures.eyesBtn, 343, ears);
    this.createButton( this.textures.noseBtn, 454, hair);
    this.createButton( this.textures.mouthBtn, 565, headAccessories);
    this.createButton( this.textures.outfitBtn, 676, mouths);
    // TODO: other dresssup elements


    //Add to the stage.
    this.addChild(this.background);
    this.addChild(base);
//    this.addChild(face);

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




