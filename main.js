var slime = 0;
var timesNewPrayed = 0;
var timesOldPrayed = 0;
var timesSlimePrayed = 0;
var slimePresses = 0;
var slimeTraps = 0;
var slimesCrushed = 0;
var worshipers = 0;
var crushFactor = 1;
var slimePudding = 0;

//function to write messages to user
function writeMessage(msg) {
    var msgDiv = document.getElementById('output');
    msgDiv.innerHTML = msg;
};

function gainCrushFactor() {
    var crushUpgradeCost = Math.floor(500 * Math.pow(1.4,crushFactor));
    if(slime >= crushUpgradeCost) {
        crushFactor = crushFactor + 1;
        slime = slime - crushUpgradeCost;
        document.getElementById('crushFactor').innerHTML = crushFactor;
        document.getElementById('slime').innerHTML = slime;
    };
    var nextCrushUpgradeCost = Math.floor(500 * Math.pow(1.4,crushFactor));
    document.getElementById("crushUpgradeCost").innerHTML = nextCrushUpgradeCost;
    console.log("DEBUG: " + "gainCrushFactor Completed" + " crushUpgradeCost: " + crushUpgradeCost + " crushFactor: " + crushFactor + " nextCrushUpgradeCost: " + nextCrushUpgradeCost);
};

function gainSlime(number){
    slime = slime + number;
    document.getElementById("slime").innerHTML = slime;
};

function gainTimesOldPrayed(number){
    timesOldPrayed = timesOldPrayed + number;
    document.getElementById("timesOldPrayed").innterHTML = timesOldPrayed;
};

function crushSlime(number) {
    slime = slime + number;
    document.getElementById("slime").innerHTML = slime;
    slimesCrushed = slimesCrushed + number;
    document.getElementById("slimesCrushed").innerHTML = slimesCrushed;
};

function prayNewClick(number) {
    timesNewPrayed = timesNewPrayed + number;
    document.getElementById("timesNewPrayed").innerHTML = timesNewPrayed;
};

function prayOldClick(number) {
    timesOldPrayed = timesOldPrayed + number;
    document.getElementById("timesOldPrayed").innerHTML = timesOldPrayed;
};

function praySlimeClick(number) {
    timesSlimePrayed = timesSlimePrayed + number;
    document.getElementById("timesSlimePrayed").innerHTML = timesSlimePrayed;
};

function buySlimePress(){
    var slimePressCost = Math.floor(45 * Math.pow(1.1,slimePresses));     //works out the cost of this cursor
    if(slime >= slimePressCost){                                   //checks that the player can afford the cursor
        slimePresses = slimePresses + 1;                                   //increases number of slimePresses
    	slime = slime - slimePressCost;                          //removes the slime spent
        document.getElementById('slimePresses').innerHTML = slimePresses;  //updates the number of slimePresses for the user
        document.getElementById('slime').innerHTML = slime;  //updates the number of slime for the user
    };
    var nextCostSlimePress = Math.floor(45 * Math.pow(1.1,slimePresses));       //works out the cost of the next cursor
    document.getElementById('slimePressCost').innerHTML = nextCostSlimePress;  //updates the cursor cost for the user
};

function buySlimeTrap() {
    var slimeTrapCost = Math.floor(10 * Math.pow(1.15,slimeTraps));
    if (slime >= slimeTrapCost) {
        slimeTraps = slimeTraps + 1;
        slime = slime - slimeTrapCost;
        document.getElementById('slimeTraps').innerHTML = slimeTraps;
        document.getElementById('slime').innerHTML = slime;
    };
    var nextCostSlimeTrap = Math.floor(10 * Math.pow(1.15,slimeTraps));
    document.getElementById('slimeTrapCost').innerHTML = nextCostSlimeTrap;
    console.log(slimeTrapCost);
};

//enable make slime pudding from slime
function makePudding() {
    if(slime >= 5) {
        slimePudding = slimePudding + 1;
        slime = slime - 5;
        document.getElementById('slimePudding').innerHTML = slimePudding;
        document.getElementById('slime').innerHTML = slime;
        console.log("DEBUG: " + "slimePudding: " + slimePudding)
    };
};

function buyWorshiper() {
    var worshiperCost = Math.floor(100 * Math.pow(1.15,worshipers));
    if (slime >= worshiperCost) {
        worshipers = worshipers + 1;
        slime = slime - worshiperCost;
        document.getElementById('worshipers').innerHTML = worshipers;
        document.getElementById('slime').innerHTML = slime;
    };
    var nextCostWorshiper = Math.floor(100 * Math.pow(1.15,worshipers));
    document.getElementById('worshiperCost').innerHTML = nextCostWorshiper;
    console.log("test test test" + " " + worshipers + " " + worshiperCost + " " + nextCostWorshiper);
};

window.setInterval(function(){
	
	gainSlime(slimePresses);
    gainSlime(slimeTraps);
    gainTimesOldPrayed(worshipers);
	
}, 1000);

function save() {
    var save = {                                                     //save variable
        slime: slime,
        timesNewPrayed: timesNewPrayed,
        timesOldPrayed: timesOldPrayed,
        timesSlimePrayed: timesSlimePrayed,
        slimePresses: slimePresses,
        slimeTraps: slimeTraps,
        slimesCrushed: slimesCrushed
    };
    localStorage.setItem("save",JSON.stringify(save));
    console.log("Game saved successfully");
    writeMessage("Game saved successfully", "output")
};

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.slime !== "undefined") slime = savegame.slime;
	if (typeof savegame.slimePresses !== "undefined") slimePresses = savegame.slimePresses;
    if (typeof savegame.timesNewPrayed !== "undefined") timesNewPrayed = savegame.timesNewPrayed;
    if (typeof savegame.timesOldPrayed !== "undefined") timesOldPrayed = savegame.timesOldPrayed;
    if (typeof savegame.timesSlimePrayed !== "undefined") timesSlimePrayed = savegame.timesSlimePrayed;
    if (typeof savegame.slimeTraps !== "undefined") slimeTraps = savegame.slimeTraps;
    if (typeof savegame.slimesCrushed !== "undefined") slimesCrushed = savegame.slimesCrushed;
    console.log("Game loaded successfully");
    writeMessage("Game loaded successfully", "output");          //shows player game was loaded
    writeMessage("Game loaded successfully -- NOTE: Some values may not update until changed. This is a known bug.", "output");         //warns the player of load bug
}

//to delete save file
function delsave() {
    localStorage.removeItem("save");
    console.log("Save file deleted");
    writeMessage("Save file deleted, time to start anew!", "output");
}

//cooldown image button
$(function () {
    "use strict";

    var canvas = document.getElementById("button");
    var context = canvas.getContext("2d");
    var regularImage, fadedImage, angle, isAnimating;

    var loadImage = function (name, onload) {
        var image = new Image();
        image.onload = onload;
        image.src = name;
        return image;
    };

    var mouseToggle = function () {
        if(!isAnimating){
            $(canvas).toggleClass("depressed");
        }
    };

    var startCoolDown = function () {
        if (!isAnimating) {
            isAnimating = true;
            angle = 0;
            context.drawImage(fadedImage, 0, 0);
            setTimeout(coolDown, 20);
        }
    };

    var coolDown = function () {
        context.fillStyle = context.createPattern(
            regularImage, "no-repeat"
        );
        context.moveTo(90, 90);
        context.beginPath();
        context.arc(
            90, 90, 130, angle * Math.PI / 180,
            (angle + 5) * Math.PI / 180, false
        );
        context.lineTo(90, 90);
        context.fill();
        context.closePath();
        angle += 4;
        if (angle < 360) {
            setTimeout(coolDown, 20);
        } else {
            isAnimating = false;
        }
    };

    var regularImageLoaded = function () {
        context.drawImage(regularImage, 0, 0);
        $(canvas).click(startCoolDown);
        $(canvas).bind("mousedown mouseup", mouseToggle);
    };


    fadedImage = loadImage("http://i.imgur.com/vzN14Rv.png");
    regularImage = loadImage("http://i.imgur.com/TwkKepA.png",
                             regularImageLoaded);
});