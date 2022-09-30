//-----------------------------------------------------------------------------
//  Galv's Message Busts
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MessageBusts.js
//-----------------------------------------------------------------------------
//  2017-11-04 - Version 2.8 - Added fade out speed setting
//  2017-08-21 - Version 2.7 - Fixed a minor bug with appear in front & above
//  2016-10-04 - Version 2.6 - Fixed issue where bust disable/position did not
//                             save in saved games.
//  2016-08-11 - Version 2.5 - Made bust sprite object public
//  2016-08-10 - Version 2.4 - Fixed a crash in MV 1.3 update
//  2016-04-27 - Version 2.3 - Fixed deployment bug with face name case
//  2016-04-22 - Version 2.2 - Fixed a bug with still checking for bust when
//                             Using just faces
//  2016-04-22 - Version 2.1 - Fixed issue with turning busts on/off
//  2016-04-02 - Version 2.0 - Added compatibility for Message Style popups
//  2016-01-12 - Version 1.9 - Fixed issue with middle-aligned textbox
//  2015-12-26 - Version 1.8 - added an option to append text to bust filenames
//                           - to use different images for this and bust menu
//  2015-11-11 - Version 1.7 - fixed text code to change bust mid message.
//                           - (the actor number went to wrong face)
//                           - fixed mid message changing of bust flicker
//  2015-11-11 - Version 1.6 - added Galv plugin command efficiency code
//  2015-11-09 - Version 1.5 - Added ability to display faces/busts based on
//                           - Member position or leader.
//  2015-11-02 - Version 1.4 - Added escape code to change bust during message
//  2015-11-01 - Version 1.3 - fixed bug with bust not disappearing
//  2015-11-01 - Version 1.2 - fixed bug with changing bust
//  2015-11-01 - Version 1.1 - fixed bug with settings
//  2015-11-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageBusts = true;

var Galv = Galv || {};        // Galv's main object
Galv.pCmd = Galv.pCmd || {};  // Plugin Command manager
Galv.MB = Galv.MB || {};      // Galv's stuff

Galv.Mstyle = Galv.Mstyle || {};  // compatibility

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.2.8) Displays a bust image instead of selected face image
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Bust Priority
 * @desc Can be 0 or 1. 0 = bust appears behind message window. 1 = bust appear in front of it
 * @default 0
 *
 * @param Bust Position
 * @desc Can be 0 or 1. 0 = bust appears above window messages. 1 = bust appears at bottom of screen
 * @default 0
 *
 * @param Text X Offset
 * @desc Amount of pixels that text is pushed to the right when a bust is displayed on the left.
 * @default 390
 *
 * @param Fade Out Speed
 * @desc The speed in which busts fade out. 1-255
 * @default 32
 *
 * @param Filename Append
 * @desc Text to append to the normal file path the plugin looks for.
 * @default
 
 *
 * @help
 *   Galv's Message Busts
 * ----------------------------------------------------------------------------
 * This plugin displays a bust image from /img/pictures/ folder based on the
 * face chosen in the 'Show Text' event command.  For example:
 * If your 'Show Text' uses the 2nd face from the "Actor1" faces file, then
 * the plugin will use /img/pictures/Actor1_2.png for the bust image.
 *
 * Remember, all filenames are case sensitive, so make sure to use the correct
 * capitalization/case for your faces and busts.
 *
 * ADDED: A plugin setting called "Filename Append".
 * Whatever you put in this setting will be added to the end of the filename.
 * Using the above example, if the Filename Append setting is "_bust", then the
 * plugin will use /img/pictures/Actor1_2_bust.png instead.
 *
 * Make sure to add 'wait' between messages with different character's busts
 * for better looking transitions.
 * Use the 'Plugin' event command to change bust settings. These settings will
 * be in effect until changed, so they can be used for multiple messages. 
 *
 * NOTE: You will need to find your own bust images to use. I can not help
 * you with that. The images in the demo are for demo purposes only.
 *
 * This plugin also comes with the ability to display bust/facesets according
 * to who is in the party or a certain position from the leader's faceset.
 * This works for both the faces and busts.
 *
 * 1. Member's face.
 * Create a face file (or get from demo) called "partymember.png".
 * Number each face in this faceset from 1 to 8.
 * When this face set is used in a "Show Text" event command, it will replace
 * the face with the party member according to the face number used.
 *
 * 1. Leader's face.
 * Create a face file (or get from demo) called "partyleader.png".
 * Label your faces accordingly (for example, happy, sad, laugh. Or numbers)
 * When this face set is used in a "Show Text" event command, it will replace
 * the face with the party leader's faceset and the face number of the chosen
 * face position of the 'partyleader' faceset.
 *
 * ----------------------------------------------------------------------------
 *   PLUGIN COMMANDS (To change bust position/visibility)
 * ----------------------------------------------------------------------------
 *
 *   BUST POSITION MIRROR                    // BUST = the plugin command
 *                                           // POSITION = LEFT or RIGHT
 *                                           // MIRROR = TRUE or FALSE
 *   BUST STATUS                             // STATUS = TRUE or FALSE
 *
 * 
 * ----------------------------------------------------------------------------
 * Examples:
 * BUST LEFT FALSE    // Bust will appear on the left and not mirrored.
 * BUST RIGHT TRUE    // Bust will appear on the right, mirrored.
 * BUST FALSE         // Disable busts and use face graphics as normal.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   TEXT ESCAPE CODES (During 'Show Tesxt')
 * ----------------------------------------------------------------------------
 *
 * \BST[x]            // Change the bust in the middle of a message. X is the
 *                    // number of the face without changing the face name
 *
 * \BST[x,face]       // Change the bust image to a different file name
 *
 * ----------------------------------------------------------------------------
 * Examples:
 * If a "Show Text" event command uses face number 3 from "Actor1"...
 * \BST[7]  will keep using "Actor1" face file but change the 3 to 7
 * \BST[7,Actor2]    will change the face file to "Actor2" and use face 7
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {	

	Galv.MB.prio = Number(PluginManager.parameters('Galv_MessageBusts')["Bust Priority"]);
	Galv.MB.pos = Number(PluginManager.parameters('Galv_MessageBusts')["Bust Position"]);
	Galv.MB.w = Number(PluginManager.parameters('Galv_MessageBusts')["Text X Offset"]);
	Galv.MB.f = PluginManager.parameters('Galv_MessageBusts')["Filename Append"];

	Galv.MB.fadeOutSpeed = Number(PluginManager.parameters('Galv_MessageBusts')["Fade Out Speed"]);
	
	Galv.MB.msgWindow = null;
	
if (Galv.MB.prio == 1 && Galv.MB.pos == 0) {
	// Fix
	Galv.MB.prio = 0;
};
	
// GALV'S PLUGIN MANAGEMENT. INCLUDED IN ALL GALV PLUGINS THAT HAVE PLUGIN COMMAND CALLS, BUT ONLY RUN ONCE.
if (!Galv.aliased) {
	var Galv_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (Galv.pCmd[command]) {
			Galv.pCmd[command](args);
			return;
		};
		Galv_Game_Interpreter_pluginCommand.call(this, command, args);
	};
	Galv.aliased = true; // Don't keep aliasing for other Galv scripts.
};

// Direct to Plugin Object
Galv.pCmd.BUST = function(arguments) {
	Galv.MB.bustPos(arguments);
};
// END GALV'S PLUGIN MANAGEMENT

Galv.MB.bustPos = function(pos) {
	if (pos[0] === "TRUE") {
		return $gameSystem.bustDisable = false;
	} else if (pos[0] === "FALSE") {
		return $gameSystem.bustDisable = true;
	};
	
	$gameSystem.bustPos = 0
	if (pos[0] === "LEFT") {
		$gameSystem.bustPos = 0;
	} else if (pos[0] === "RIGHT") {
		$gameSystem.bustPos = 1;
	};
	if (pos[1] === "TRUE") {
		$gameSystem.bustMirror = true;
	} else if (pos[1] === "FALSE") {
		$gameSystem.bustMirror = false;
	};
};


	
// ---------------- WINDOW MESSAGE

Galv.MB.Game_Message_setFaceImage = Game_Message.prototype.setFaceImage;
Game_Message.prototype.setFaceImage = function(faceName, faceIndex) {
	switch (faceName) {
		case 'PartyLeader':
			var faceName = $gameParty.leader().faceName();
			break;
		case 'PartyMember':
			if ($gameParty.members()[faceIndex]) {
				var faceName = $gameParty.members()[faceIndex].faceName();
				var faceIndex = $gameParty.members()[faceIndex].faceIndex();
			} else {
				var faceName = "";
			};
			break;
	};
    Galv.MB.Game_Message_setFaceImage.call(this,faceName,faceIndex);
};


// WINDOW MESSAGE START MESSAGE - MOD
Galv.MB.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	Galv.MB.msgWindow = this;
	$gameSystem.bustPos = $gameSystem.bustPos || 0;
	$gameMessage.bustOffset = $gameMessage.bustOffset || Galv.MB.w;
	Galv.MB.Window_Message_startMessage.call(this);
	Galv.MB.msgWindow.tempPosType = this._positionType;
};


Galv.MB.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'BST':
        this.obtainSpecialParam(textState);
        break;
    }
	Galv.MB.Window_Message_processEscapeCharacter.call(this, code, textState);
};


Window_Message.prototype.obtainSpecialParam = function(textState) {
    var arr = /^\[(.*)]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        var txt = arr[0].slice(1).slice(0, - 1);
		var array = txt.split(",");
		$gameMessage.setFaceImage(array[1] || $gameMessage._faceName,Number(array[0] - 1));
    } else {
        return '';
    }
};


Galv.MB.Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
	if (!$gameSystem.bustDisable) return;
	Galv.MB.Window_Message_drawMessageFace.call(this);
};

// ---------------- SPRITESET MAP

if (Galv.MB.prio == 0) {
// UNDER MESSAGE
	Galv.MB.Spriteset_Map_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() {
		Galv.MB.Spriteset_Map_createUpperLayer.call(this);
		this.createBusts();
	};
	
	// SPRITESET MAP CREATE MSG BG
	Spriteset_Base.prototype.createBusts = function() {
		// Create bust image
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if ($gameSystem.bustDisable) {
			return Galv.MB.Window_Message_newLineX.call(this);
		} else {
			return 0;
		};
	};
	
} else {
// OVER MESSAGE
	
	// Add to window_message as child instead, so it displays above
	Galv.MB.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function() {
		Galv.MB.Window_Message_createSubWindows.call(this);
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if ($gameSystem.bustDisable) {
			return Galv.MB.Window_Message_newLineX.call(this);
		} else if ($gameMessage.faceName() && Galv.MB.prio == 1 && $gameMessage._positionType == 2 && $gameSystem.bustPos == 0) {
			return $gameMessage.bustOffset;
		} else {
			return 0;
		};
	};

};

})();


// ---------------- SPRITE GALVMSGBG - NEW

function Sprite_GalvBust() {
    this.initialize.apply(this, arguments);
}

Sprite_GalvBust.prototype = Object.create(Sprite.prototype);
Sprite_GalvBust.prototype.constructor = Sprite_GalvBust;

Sprite_GalvBust.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.name = "";
	this.opacity = 0;
    this.update();
};

Sprite_GalvBust.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Galv.MB.msgWindow) this.controlBitmap();
};

Sprite_GalvBust.prototype.loadBitmap = function() {
	var imgAdd = "";
	altImg = 0;
	var name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);
	if ($gameSystem.bustDisable){
		var img = ImageManager.loadPicture('');
	} else {
        //
        Galv.MB.f = "";
		var form = "";
		// del other pictures
		for (var i = 11; i <= 13; ++i) {
			$gameScreen.erasePicture(i);
		}		
		//
        if ($gameMessage.faceName() === "Shina"){ 
        if ($gameActors.actor(4).equips()[1] && $gameActors.actor(4).equips()[1].id == 11){ //underwear
          Galv.MB.f = "u";
        } else if ($gameActors.actor(4).equips()[1] && $gameActors.actor(4).equips()[1].id == 12){ //naked
          Galv.MB.f = "n";
        } else if ($gameSwitches.value(152) === true){ //bath
          Galv.MB.f = "n";       
        } else if ($gameActors.actor(4).equips()[1] && $gameActors.actor(4).equips()[1].atypeId == 12){ //dress        
          Galv.MB.f = "";
        } else if ($gameActors.actor(4).equips()[2] && $gameActors.actor(4).equips()[2].etypeId == 8){ //panties
          Galv.MB.f = "u";
        } else {
          Galv.MB.f = "n";
        }       
		if ($gameSwitches.value(275) === true && $gameSwitches.value(306) === true){ //after Act I
			form = "COW"; 
		}
			if ($gameVariables.value(4004) === 2){ //Cheat - Human
				form = "";   
			} else if ($gameVariables.value(4004) === 3){ //Cheat - Cow
				form = "COW";   
			}
			if ($gameVariables.value(4007) === 2){ //Cheat - Dressed
				Galv.MB.f = "";   
			} else if ($gameVariables.value(4007) === 3){ //Cheat - Underwear
				Galv.MB.f = "u"; 
			} else if ($gameVariables.value(4007) === 4){ //Cheat - Naked
				Galv.MB.f = "n";  				
			}		
        }
        if ($gameMessage.faceName() === "Nou"){ 
        if ($gameSwitches.value(152) === true){ //bath
          Galv.MB.f = "n"; 
        } else {
          Galv.MB.f = "";
        }       
			if ($gameVariables.value(4021) === 2){ //Cheat - Dressed
				Galv.MB.f = "";   
			} else if ($gameVariables.value(4021) === 3){ //Cheat - Naked
				Galv.MB.f = "n";  				
			}		
        }
        if ($gameMessage.faceName() === "Kanako"){ 
			if ($gameSwitches.value(288) === true){ //prebattle
				Galv.MB.f = "n";      
			}				
				if ($gameVariables.value(4029) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4029) === 3){ //Cheat - Naked
					Galv.MB.f = "n";  				
				}		
				if ($gameMessage.faceIndex() === 5 || $gameMessage.faceIndex() === 6) {
					Galv.MB.f = "";
				} 
			}		
        if ($gameMessage.faceName() === "Lina"){    
			if ($gameSwitches.value(152) === true){ //bath 
				Galv.MB.f = "n";  
			}			
				if ($gameVariables.value(4023) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4023) === 3){ //Cheat - Naked
					Galv.MB.f = "n";  				
				}		
		}		
		if ($gameMessage.faceName() === "Emma"){ 
					if ($gameVariables.value(4026) === 2){ //Cheat - Dressed
						Galv.MB.f = "";   
					} else if ($gameVariables.value(4026) === 3){ //Cheat - Naked
						Galv.MB.f = "n";  				
					}		
			}		
		if ($gameMessage.faceName() === "Anemone"){ 
			if ($gameSwitches.value(301) === true && $gameSwitches.value(378) === false){ //kaere to StrI and No Reveal
				form = "KOB"; 
			} else {form = "";}		
			if ($gameVariables.value(4034) === 2){ //Cheat - Human
				form = "";   
			} else if ($gameVariables.value(4034) === 3){ //Cheat - Kob
				form = "KOB";   
			}								
					if ($gameVariables.value(4022) === 2){ //Cheat - Dressed
						Galv.MB.f = "";   
					} else if ($gameVariables.value(4022) === 3){ //Cheat - Naked
						Galv.MB.f = "n";  				
					}		
			}		
		if ($gameMessage.faceName() === "OMegumi"){ 
				if ($gameVariables.value(4027) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4027) === 3){ //Cheat - Underwear
					Galv.MB.f = "u"; 
				} else if ($gameVariables.value(4027) === 4){ //Cheat - Naked
					Galv.MB.f = "n";  				
				}			
			}			
			if ($gameMessage.faceName() === "Ruina"){ 
				if ($gameSwitches.value(152) === true){ //bath 
					Galv.MB.f = "n";  
				}
				if ($gameVariables.value(4030) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4030) === 3){ //Cheat - Naked
					Galv.MB.f = "n"; 		
				}			
			}				
			if ($gameMessage.faceName() === "Belgrina"){ 
				if ($gameSwitches.value(152) === true){ //bath 
					Galv.MB.f = "n";  
				}				
				if ($gameVariables.value(4031) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4031) === 3){ //Cheat - Naked
					Galv.MB.f = "n"; 		
				}			
			}		
			if ($gameMessage.faceName() === "Perina"){ 
				if ($gameVariables.value(4032) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4032) === 3){ //Cheat - Naked
					Galv.MB.f = "n"; 		
				}			
			}			
			if ($gameMessage.faceName() === "Zokuki"){ 
				if ($gameVariables.value(4033) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4033) === 3){ //Cheat - Naked
					Galv.MB.f = "n"; 		
				}			
			}				
			if ($gameMessage.faceName() === "KobJester"){ 
				if ($gameVariables.value(4035) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4035) === 3){ //Cheat - Naked
					Galv.MB.f = "n"; 		
				}			
			}				
			if ($gameMessage.faceName() === "DwarfHW"){ 
				if ($gameVariables.value(4036) === 2){ //Cheat - Dressed
					Galv.MB.f = "";   
				} else if ($gameVariables.value(4036) === 3){ //Cheat - Naked
					Galv.MB.f = "n"; 		
				}			
			}																					
        if ($gameMessage.faceName() === "Kaere"){ 			
        if ($gameActors.actor(3).equips()[1] && $gameActors.actor(3).equips()[1].id == 11){ //underwear
          Galv.MB.f = "u";
        } else if ($gameActors.actor(3).equips()[1] && $gameActors.actor(3).equips()[1].id == 12){ //naked
          Galv.MB.f = "n";
        } else if ($gameSwitches.value(152) === true){ //bath
          Galv.MB.f = "n";       
        } else if ($gameActors.actor(3).equips()[1] && $gameActors.actor(3).equips()[1].atypeId == 11){ //dress        
          Galv.MB.f = "";
        } else if ($gameActors.actor(3).equips()[2] && $gameActors.actor(3).equips()[2].etypeId == 8){ //panties
          Galv.MB.f = "u";
        } else {
          Galv.MB.f = "n";
        }       
		if ($gameSwitches.value(275) === true && $gameSwitches.value(301) === true){ //after Act I
			form = "FROG";
		}		
			if ($gameVariables.value(4005) === 2){ //Cheat - Human
				form = "";   
			} else if ($gameVariables.value(4005) === 3){ //Cheat - Frog
				form = "FROG";   
			}
			if ($gameVariables.value(4008) === 2){ //Cheat - Dressed
				Galv.MB.f = "";   
			} else if ($gameVariables.value(4008) === 3){ //Cheat - Underwear
				Galv.MB.f = "u"; 
			} else if ($gameVariables.value(4008) === 4){ //Cheat - Naked
				Galv.MB.f = "n";  				
			}		
        }
        if ($gameMessage.faceName() === "Anzu"){
        if ($gameActors.actor(5).equips()[1] && $gameActors.actor(5).equips()[1].id == 11){ //underwear
          Galv.MB.f = "u";
        } else if ($gameActors.actor(5).equips()[1] && $gameActors.actor(5).equips()[1].id == 12){ //naked
          Galv.MB.f = "n";
        } else if ($gameSwitches.value(152) === true){ //bath
          Galv.MB.f = "n";       
        } else if ($gameActors.actor(5).equips()[1] && $gameActors.actor(5).equips()[1].atypeId == 13){ //dress        
          Galv.MB.f = "";
        } else if ($gameActors.actor(5).equips()[2] && $gameActors.actor(5).equips()[2].etypeId == 8){ //panties
          Galv.MB.f = "u";
        } else {
          Galv.MB.f = "n";
        }              
			if ($gameVariables.value(4006) === 2){ //Cheat - Human
				form = "";   
			} else if ($gameVariables.value(4006) === 3){ //Cheat - ???
				form = "???";   
			}
			if ($gameVariables.value(4009) === 2){ //Cheat - Dressed
				Galv.MB.f = "";   
			} else if ($gameVariables.value(4009) === 3){ //Cheat - Underwear
				Galv.MB.f = "u"; 
			} else if ($gameVariables.value(4009) === 4){ //Cheat - Naked
				Galv.MB.f = "n";  				
			}		
        }
        if ($gameMessage.faceName() === "Abigail"){ 
        if ($gameSwitches.value(168) === true){ //abigail mad
          Galv.MB.f = "n"; 
		  form = "OWL";  
        } else {
          Galv.MB.f = "";
		  form = "";  
        }         
		if ($gameVariables.value(4024) === 2){ //Cheat - Human
			form = "";  
		} else if ($gameVariables.value(4024) === 3){ //Cheat - Owl
			form = "OWL";  
		}
		if ($gameVariables.value(4025) === 2){ //Cheat - Dressed
			Galv.MB.f = "";   
		} else if ($gameVariables.value(4025) === 3){ //Cheat - Naked
			Galv.MB.f = "n"; 				
		}	
        }       
        if ($gameMessage.faceName() === "Neneko" || $gameMessage.faceName() === "Neneko2"){       
        if ($gameActors.actor(1).equips()[1] && $gameActors.actor(1).equips()[1].id == 105){ //armor
        Galv.MB.f = "sdf";
        } else if ($gameActors.actor(1).equips()[1] && $gameActors.actor(1).equips()[1].atypeId == 10){ //dress
        Galv.MB.f = "";
        } else if ($gameActors.actor(1).equips()[2] && $gameActors.actor(1).equips()[2].id == 114){ //batpants
        Galv.MB.f = "bat";
        } else if ($gameActors.actor(1).equips()[2] && $gameActors.actor(1).equips()[2].etypeId == 8){ //panties
        Galv.MB.f = "u";
        } else {
        Galv.MB.f = "n";
        }
		if ($gameSwitches.value(321) === true){ //Neneko Eff - Futa
			Galv.MB.f = "Fn"; 
		}		
		if ($gameActors.actor(1).isStateAffected(16)){ //dwarf form
			form = "DWARF";
			Galv.MB.f = ""; 
		}		
		if ($gameActors.actor(1).isStateAffected(17)){ //kobold form
			form = "KOBOLD";
			Galv.MB.f = ""; 
		}		
					if ($gameVariables.value(4013) === 2){ //Cheat - Human
				form = "";   
			} else if ($gameVariables.value(4013) === 3){ //Cheat - Dwarf
				form = "DWARF";   
			}
			if ($gameVariables.value(4014) === 2){ //Cheat - Dressed
				Galv.MB.f = "";   
			} else if ($gameVariables.value(4014) === 3){ //Cheat - Underwear
				Galv.MB.f = "u"; 
			} else if ($gameVariables.value(4014) === 4){ //Cheat - batpants
				Galv.MB.f = "bat";  				
			} else if ($gameVariables.value(4014) === 5){ //Cheat - armor
				Galv.MB.f = "sdf";  				
			} else if ($gameVariables.value(4014) === 6){ //Cheat - Naked
				Galv.MB.f = "n";  	
			} else if ($gameVariables.value(4014) === 7){ //Cheat - Futa Naked
				Galv.MB.f = "Fn";  								
			}	
        }
		//		
		if ($gameMessage.faceName().contains("Lili")) {
			altImg = 1;
			if ($gameMessage.faceName().contains("LiliF")) {
				var bodBase = "LiliF";
			} else if ($gameMessage.faceName().contains("LiliM")) {
                var bodBase = "LiliM";
			}
			if ($gameMessage.faceName().contains("Calm")) {
				var exp = "expCalm";
			} else if ($gameMessage.faceName().contains("Rage")) {
                var exp = "expRage";
			} else if ($gameMessage.faceName().contains("Happy")) {
                var exp = "expHappy";
			} else if ($gameMessage.faceName().contains("Scared")) {
                var exp = "expScared";								
			}
			if ($gameMessage.faceIndex() === 0 || $gameMessage.faceIndex() === 4) {
				var hairStyle = "hair0";
			    } else if ($gameMessage.faceIndex() === 1 || $gameMessage.faceIndex() === 5) {
					var hairStyle = "hair1";
				} else if ($gameMessage.faceIndex() === 2 || $gameMessage.faceIndex() === 6) {
					var hairStyle = "hair2";
				} else if ($gameMessage.faceIndex() === 3 || $gameMessage.faceIndex() === 7) {	
					var hairStyle = "hair3";
			}
			if ($gameMessage.faceIndex() <= 3) {				
				if ($gameMessage.faceName().contains("1")) {
                   var skinCol = "Pal";
				} else {
				   var skinCol = "Bla";
				}
			} else {
				if ($gameMessage.faceName().contains("1")) {
					var skinCol = "Tan";
				 } else {
					var skinCol = "Gre";
				 }				
			}	
			imgAdd = bodBase + skinCol;	
			imgAdd2 = bodBase + exp + hairStyle; //hairstyle needed for eyebrow col
			imgAdd3 = bodBase + hairStyle;
		}		
        //
		if (altImg === 1){
		$gameScreen.showPicture(11, imgAdd, 0, 0, 0, 100, 100, 255, 0);
		$gameScreen.showPicture(12, imgAdd2, 0, 0, 0, 100, 100, 255, 0);
		$gameScreen.showPicture(13, imgAdd3, 0, 0, 0, 100, 100, 255, 0);
		var img = "";
		this.hasBust = false;
		this.alt = true;
		this.name = "";
	    } else {
		var img = ImageManager.loadPicture(name + form + Galv.MB.f);
		if (img.isReady()) {
			if (this.bitmap) {
				//this._destroyCachedSprite();
				this.bitmap = null;
			};
			this.bitmap = img;
			this.name = name;
			this.alt = false;
			this.hasBust = true;
		};
		}
		//		
	};
};
Sprite_GalvBust.prototype.controlBitmap = function() {
	if ($gameMessage.faceName() && this.name !== $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1)) {
    	this.loadBitmap();  // If image changed, reload bitmap
	};
	
    if (Galv.MB.msgWindow.openness <= 0 && this.alt) {
		// del other pictures
		for (var i = 11; i <= 13; ++i) {
			$gameScreen.erasePicture(i);
		}		
		//
		return;
	} else if (Galv.MB.msgWindow.openness <= 0 || !this.hasBust || $gameSystem.bustDisable) {
		this.opacity = 0;
		this.name = "";
		this.hasBust = false;
		return;
	};

	if ($gameSystem.bustMirror) {
		this.scale.x = -1;
		var offset = this.bitmap.width;
	} else {
		this.scale.x = 1;
		var offset = 0;
	};

	this.opacity = $gameMessage.faceName() ? Galv.MB.msgWindow._openness : this.opacity - Galv.MB.fadeOutSpeed;
	
	// Control image position
	switch (Galv.MB.msgWindow.tempPosType) {
	case 0:
		this.y = this.baseY();
		break;
	case 1:
	//top and middle
		this.y =  this.baseY() - Galv.MB.msgWindow.y;
		break;
	case 2:
	//bottom
		if (Galv.MB.prio == 1) {
			this.y = Galv.MB.msgWindow.height - this.bitmap.height;
		} else if (Galv.MB.pos === 1) {
			this.y = this.baseY();
		} else {
			this.y = this.baseY() - Galv.MB.msgWindow.height;
		};
		break;
	};
	
	if ($gameSystem.bustPos == 1) {
		// if on the right
		if (Galv.MB.prio == 1) {
			this.x = Galv.MB.msgWindow.width - this.bitmap.width + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + Galv.MB.msgWindow.width - this.bitmap.width + offset;
		};
	} else {
		// else on the left
		if (Galv.MB.prio == 1) {
			this.x = 0 + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + offset;
		};
	};
};

Sprite_GalvBust.prototype.baseY = function() {
	if (Galv.Mstyle.target) {
		return Galv.MB.msgWindow.y + Galv.MB.msgWindow.height - this.bitmap.height;
	} else {
		return Graphics.boxHeight - this.bitmap.height;
	};
};


