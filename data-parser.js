const RegionLookup = Object.freeze({
    "Outskirts" : "os",
    "Industrial Complex" : "ic",
    "Drainage System" : "ds",
    "Chimney Canopy" : "cc",
    "Garbage Wastes" : "gw",
    "Shaded Citadel" : "sh",
    "Shoreline" : "sl",
    "Sky Islands" : "si",
    "Farm Arrays" : "fa",
    "Exterior" : "ex",
    "Five Pebbles" : "fp",
    "Subterranean" : "sb",
    "Depths" : "dp"
});


const DefaultScores = Object.freeze({
    "Food" : 1,
    "Survival" : 5
});

//scores are in SandboxSettingsInterface | IDs are in MultiplayerUnlocks - SandboxUnlockID
//the image IDs are CreatureTemplate.Type references, however
const CreatureLookup = Object.freeze({
    "Slugcat" : {id:1, score:5},
    "GreenLizard" : {id:4, score:10},
    "PinkLizard" : {id:3, score:7},
    "BlueLizard" : {id:5, score:6},
    "WhiteLizard" : {id:7, score:8},
    "BlackLizard" : {id:9, score:7},
    "YellowLizard" : {id:6, score:6},
    "CyanLizard" : {id:11, score:9},
    "RedLizard" : {id:8, score:25},
    "Salamander" : {id:10, score:7},
    "CicadaA" : {id:19, score:2},
    "CicadaB" : {id:20, score:2},
    "Snail" : {id:15, score:1},
    "PoleMimic" : {id:29, score:2},
    "TentaclePlant" : {id:28, score:7},
    "Scavenger" : {id:36, score:6},
    "Vulture" : {id:16, score:15},
    "KingVulture" : {id:45, score:25},
    "SmallCentipede" : {id:321, score:4},  //added their variant to the ID
    "Centipede" : {id:322, score:7},
    "LargeCentipede" : {id:323, score:7},
    "RedCentipede" : {id:33, score:19},
    "Centiwing" : {id:34, score:5},
    "Tubeworm" : {id:25, score:1},
    "Hazer" : {id:46, score:1},
    "LanternMouse" : {id:18, score:2},
    "BigSpider" : {id:40, score:4},
    "SpitterSpider" : {id:41, score:5},
    "MirosBird" : {id:30, score:16},
    "BrotherLongLegs" : {id:27, score:14},
    "DaddyLongLegs" : {id:26, score:25},
    "Deer" : {id:24, score:10}, //??Doesn't have a score?
    "EggBug" : {id:39, score:2},
    "DropBug" : {id:44, score:5},
    "BigNeedleWorm" : {id:43, score:5},
    "JetFish" : {id:22, score:4},
    "Leviathan" : {id:23, score:25},
    "Overseer" : {id:37, score:2}, //??
});


const AchievementPointRequirements = Object.freeze({
    "survivor" : 5,
    "hunter": 12,
    "saint" : 12,
    "traveller" : 12,
    "chieftain" : 1,
    "monk" : 12,
    "outlaw" : 7,
    "dragonSlayer": 6,
    "scholar" : 3,
    "friend" : 12,
});


const KarmaAtlasSize = Object.freeze({
    "width" : 90,
    "height" : 90
});
const KarmaCapTracker = Object.freeze({
    "9" : 0,
    "8" : 1,
    "7" : 2,
    "6" : 3,
    "5" : 4,
    "4" : 4,
    "3" : 4,
    "2" : 4,
    "1" : 4,
    "0" : 4
});

//large centipede is 32-0-3
//med is 32-0-2
//small is 32-0-1

//31*26
const spriteAtlasSize = Object.freeze({
    "width" : 31,
    "height" : 26
});
const spriteAtlasIndex = Object.freeze({
    "Leviathan" : {x:0,y:0},
    "Slugcat" : {x:1,y:0},
    "GreenLizard" : {x:2,y:0},
    "PinkLizard" : {x:3,y:0},
    "BlueLizard" : {x:5,y:0},
    "WhiteLizard" : {x:0,y:1},
    "BlackLizard" : {x:1,y:1},
    "YellowLizard" : {x:2,y:1},
    "CyanLizard" : {x:3,y:1},
    "RedLizard" : {x:4,y:1},
    "Salamander" : {x:5,y:1},
    "CicadaA" : {x:0,y:2},
    "CicadaB" : {x:1,y:2},
    "Snail" : {x:2,y:2},
    "PoleMimic" : {x:3,y:2},
    "TentaclePlant" : {x:4,y:2},
    "Scavenger" : {x:5,y:2},
    "Vulture" : {x:0,y:3},
    "KingVulture" : {x:1,y:3},
    "SmallCentipede" : {x:2,y:3},
    "Centipede" : {x:3,y:3},
    "LargeCentipede" : {x:4,y:3},
    "RedCentipede" : {x:5,y:3},
    "Centiwing" : {x:0,y:4},
    "LanternMouse" : {x:1,y:4},
    "BigSpider" : {x:2,y:4},
    "SpitterSpider" : {x:3,y:4},
    "MirosBird" : {x:4,y:4},
    "BrotherLongLegs" : {x:5,y:4},
    "DaddyLongLegs" : {x:0,y:5},
    "EggBug" : {x:1,y:5},
    "DropBug" : {x:2,y:5},
    "BigNeedleWorm" : {x:3,y:5},
    "JetFish" : {x:4,y:5},
    "Deer" : {x:5,y:5},
    "Overseer" : {x:4,y:0}
});


//listen for save file change
document.getElementById("file-upload").addEventListener("change", (e) => {
    console.log(e);
    console.log(e.target.files);
    //if we have a value, fetch and send
    if(e.target.files.length <= 0) return;
    //try to parse
    var fileReader = new FileReader();
    fileReader.onload = (ev) => {
        console.log("I READ IT!");
        console.log(fileReader);
        // console.log(fileReader.result);
        const data = parseData(fileReader.result);
        layoutData(data);

        //set the name in the text
        document.querySelector(".file-input .name").innerHTML = e.target.files[0].name;
    };
    fileReader.readAsText(e.target.files[0]);
});


// fetch('sav.txt')
fetch('sav-comp.txt')
// fetch('sav-2.txt')
.then(function(blob) {
    return blob.text();
})
.then(function(txt) {
    // console.log(txt);
    //parse out hunter data
    const data = parseData(txt);
    layoutData(data);
});


//get the creature kill template
const creatureKillTemplate = document.querySelector(".creature-kill");
creatureKillTemplate.remove();


/**
 * Parse save data to get only hunter data.
 * @param {string} txt 
 */
function parseData(txt) {
    const startIndex = txt.length - txt.split("").reverse().join("").indexOf(">AviDgorp<", 10);
    
    const hunterText = txt.slice(startIndex);
    console.log(hunterText);

    //create save object
    const hunterData = {
        "totalTime" : getTimeFromSeconds(findDataValue("TOTTIME", hunterText)),
        "cycles" : findDataValue("CURRVERCYCLES", hunterText),
        "totalFood" : findDataValue("TOTFOOD", hunterText),
        "survives" : findDataValue("SURVIVES", hunterText),
        "deaths" : findDataValue("DEATHS", hunterText),
        "quits" : findDataValue("QUITS", hunterText),
        "karma" : findDataValue("KARMA", hunterText),
        "karmaCap" : findDataValue("KARMACAP", hunterText),
        "helpedPebbles" : findDataExists("PEBBLESHELPED", hunterText),
        "deliveredPayload" : findDataExists("MOONREVIVED", hunterText),
        "ascended" : findDataExists("ASCENDED", hunterText),
        "swallowedItem" : findDataValue("SWALLOWEDITEMS", hunterText, "oA"),
        "extraCycles" : findDataExists("REDEXTRACYCLES", hunterText),
        "kills" : findKillValue(hunterText),
        //achievements
        "survivor" : getSurvivor(hunterText),
        "hunter" : getHunter(hunterText),
        "saint" : getSaint(hunterText),
        "wanderer" : getWanderer(hunterText),
        "chieftain" : getChieftain(hunterText),
        "monk" : getMonk(hunterText),
        "outlaw" : getOutlaw(hunterText),
        "dragonSlayer" : getDragonSlayer(hunterText),
        "scholar" : getScholar(hunterText),
        "friend" : findAchievementValue("Friend", hunterText),
    };

    console.log(hunterData);
    for(let key of Object.keys(hunterData)) {
        const div = document.createElement("div");
        let data = hunterData[key];
        // div.innerHTML += key + ": " + JSON.stringify(hunterData[key]);
        document.body.appendChild(div);
    }


    return hunterData;

}


function findDataValue(id, txt, tag = "") {
    let startIndex = txt.indexOf(id);
    if(startIndex == -1) return "";
    if(tag != "") startIndex = txt.indexOf(tag, startIndex);
    const valueIndex = txt.indexOf(">", startIndex) + 1;
    const valueIndexEnd = txt.indexOf("<", valueIndex);

    return txt.slice(valueIndex, valueIndexEnd);
}

function findAchievementValue(id, txt) {
    let achievementData = {};
    let startIndex = txt.indexOf(id);
    if(startIndex == -1) return null;
    startIndex = txt.indexOf("egA", startIndex);
    let valueIndex = txt.indexOf(">", startIndex) + 1;
    let valueIndexEnd = txt.indexOf("<", valueIndex);
    achievementData.addIfMissing = txt.slice(valueIndex, valueIndexEnd);
    //reuse for second val
    valueIndex = txt.indexOf(">", valueIndexEnd) + 1;
    valueIndexEnd = txt.indexOf("<", valueIndex);
    achievementData.data = txt.slice(valueIndex, valueIndexEnd);

    //not sure what to do with this flag?
    delete achievementData.addIfMissing;

    return achievementData;
}

function findKillValue(txt) {
    let startIndex = txt.indexOf("KILLS") + 5;
    let endIndex = txt.lastIndexOf("svD");
    endIndex = txt.indexOf("<", endIndex);
    console.log(startIndex, endIndex);
    //splice out text
    const killText = txt.slice(startIndex, endIndex);
    //array up
    let killArray = killText.split(">");
    killArray = killArray.map(el => el.replace("<svB", "").replace("<svC", "").replace("<svD", ""));
    killArray.shift();
    console.log(killArray);

    //decipher the data
    let result = [];
    for(let i = 0; i < killArray.length; i+=2) {
        const rawID = killArray[i];
        const amount = parseInt(killArray[i+1]);
        //decipher the creature type
        let creatureID = parseInt(rawID.split("-")[0]);
        //if the id is a 32 (freak num), check the variant as well
        if(creatureID == 32) creatureID = parseInt("32" + rawID.split("-")[2]);
        //go find the creature
        const creature = _getCreatureByID(creatureID);
        if(creature != null) {
            creature.kills = amount;
            console.log(creature);
            result.push(creature);
        }
    }

    return result;
}

function findDataExists(id, txt) {
    return txt.indexOf(id) != -1;
}


function _getCreatureByID(id) {
    for(let key of Object.keys(CreatureLookup)) {
        if(CreatureLookup[key].id == id) {
            let creatureObj = CreatureLookup[key];
            creatureObj.name = key;
            return creatureObj;
        }
    }
    return null;
}




function getTimeFromSeconds(time) {
    const hours = Math.floor(time / 3600);
    const minutes = _setToTens(Math.floor(time % 3600 / 60));
    const seconds = _setToTens(Math.floor(time % 3600 % 60));

    return `${hours}:${minutes}:${seconds}`;
}
function _setToTens(time) {
    if(time.toString().split("").length < 2) return time.toString() + "0";
    return time;
}

/*----- SPECIALIZED -----*/
function getSurvivor(txt) {
    //first, see if it exists
    const value = findAchievementValue("Survivor", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= AchievementPointRequirements.survivor;

    return value;
}
function getHunter(txt) {
    //first, see if it exists
    const value = findAchievementValue("Hunter", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= AchievementPointRequirements.hunter;

    return value;
}
function getSaint(txt) {
    //first, see if it exists
    const value = findAchievementValue("Saint", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= AchievementPointRequirements.saint;

    return value;
}
function getWanderer(txt) {
    //first, see if it exists
    const value = findAchievementValue("Traveller", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    //interpret data
    const dataArray = value.data.split(".");
    value.data = dataArray.map((el) => (el == "1") ? 1 : 0);
    //add the places wandered to
    value.visited = _getPlacesArray(dataArray);
    value.notVisited = _getPlacesArray(_reverseDataArray(dataArray));

    value.completed = value.visited.length >= AchievementPointRequirements.traveller;

    return value;
}
function getChieftain(txt) {
    //first, see if it exists
    const value = findAchievementValue("Chieftain", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseFloat(value.data) >= AchievementPointRequirements.chieftain;

    return value;
}
function getMonk(txt) {
    //first, see if it exists
    const value = findAchievementValue("Monk", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= AchievementPointRequirements.monk;

    return value;
}
function getOutlaw(txt) {
    //first, see if it exists
    const value = findAchievementValue("Outlaw", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= AchievementPointRequirements.outlaw;

    return value;
}
function getDragonSlayer(txt) {
    //first, see if it exists
    const value = findAchievementValue("DragonSlayer", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;
    
    //interpret data
    let dataArray = value.data.split(".");
    dataArray.pop();
    console.log(dataArray);
    value.data = dataArray.map((el) => (el == "1") ? 1 : 0);
    //add the lizards killed    
    value.lizardsKilled = _getLizardsArray(dataArray);
    value.lizardsLeft = _getLizardsArray(_reverseDataArray(dataArray));


    value.completed = value.lizardsKilled.length >= AchievementPointRequirements.dragonSlayer;

    return value;
}
function getScholar(txt) {
    //first, see if it exists
    const value = findAchievementValue("Scholar", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.data = value.data.split(".").map(el => parseInt(el));
    value.completed = value.data.length >= AchievementPointRequirements.scholar;

    return value;
}
function getFriend(txt) {
    //first, see if it exists
    const value = findAchievementValue("Friend", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseFloat(value.data) >= AchievementPointRequirements.friend;

    return value;
}







function _reverseDataArray(dataArray) {
    let result = [];
    for(let i = 0; i < dataArray.length; i++)
        if(dataArray[i] == "1") result.push("0");
        else result.push("1");
    return result;
}





function _getLizardsArray(dataArray) {
    let lizardArray = [];
    for(let i = 0; i < dataArray.length; i++) {
        if(dataArray[i] == "1") {
            switch(i) {
                case 0: lizardArray.push("green"); break;
                case 1: lizardArray.push("magenta"); break;
                case 2: lizardArray.push("blue"); break;
                case 3: lizardArray.push("white"); break;
                case 4: lizardArray.push("yellow"); break;
                case 5: lizardArray.push("black");
            }
        }
    }
    return lizardArray;
}


function _getPlacesArray(dataArray) {
    let placesArray = [];
    for(let i = 0; i < dataArray.length; i++) {
        if(dataArray[i] == "1") {
            switch(i) {
                case 0: placesArray.push("Outskirts"); break;
                case 1: placesArray.push("Industrial Complex"); break;
                case 2: placesArray.push("Drainage System"); break;
                case 3: placesArray.push("Chimney Canopy"); break;
                case 4: placesArray.push("Garbage Wastes"); break;
                case 5: placesArray.push("Shaded Citadel"); break;
                case 6: placesArray.push("Shoreline"); break;
                case 7: placesArray.push("Sky Islands"); break;
                case 8: placesArray.push("Farm Arrays"); break;
                case 9: placesArray.push("Exterior"); break;
                case 10: placesArray.push("Five Pebbles"); break;
                case 11: placesArray.push("Subterranean"); break;
            }
        }
    }
    return placesArray;
}



function _getKillsArray(dataArray) {
    let killsArray = [];
}







/*------------- LAYOUT ----------------*/

function layoutData(data) {
    console.log("LAYOUT");
    //first, clear the data
    clearData();
    const { 
        totalTime, totalFood, cycles, extraCycles,
        survives, deaths, quits, kills,
        swallowedItem, helpedPebbles, deliveredPayload, ascended,
        wanderer, scholar, survivor, outlaw, hunter, friend, monk, chieftain, saint, dragonSlayer,
        karma, karmaCap
    } = data;
    
    //general data
    document.querySelector(".totalTime").innerHTML = totalTime;
    document.querySelector(".totalFood").innerHTML = totalFood;
    document.querySelector(".totalCycles").innerHTML = cycles;
    document.querySelector(".remainingCycles").innerHTML = (20 - parseInt(cycles) + ((extraCycles) ? 5 : 0)) || "";
    document.querySelector(".survives").innerHTML = survives;
    document.querySelector(".deaths").innerHTML = deaths;
    document.querySelector(".quits").innerHTML = quits;
    document.querySelector(".currentKarma").innerHTML = karma;
    document.querySelector(".karmaCap").innerHTML = karmaCap;
    document.querySelector(".quits").innerHTML = quits;
    document.querySelector(".itemSwallowed").innerText = (swallowedItem != "") ? swallowedItem : "<None>";
    document.querySelector(".helpedPebbles").innerHTML = (helpedPebbles) ? "Yes" : "No";
    document.querySelector(".deliveredPayload").innerHTML = (deliveredPayload) ? "Yes" : "No";
    document.querySelector(".ascended").innerHTML = (ascended) ? "Yes" : "No";


    console.log(wanderer);
    //setup places
    if(wanderer != null) {
        //toggle unlocked on any that are completed
        const divs = document.querySelectorAll("[data-region]");
        for(let i = 0; i < divs.length; i++) {
            const regDiv = divs[i];
            const fullName = getKeyByValue(RegionLookup, regDiv.dataset.region);
            console.log(fullName);
            if(wanderer.visited.indexOf(fullName) != -1) regDiv.classList.add("unlocked");
            else regDiv.classList.remove("unlocked");
        }
        //handle depths
        if(ascended) document.querySelector("[data-region='dp']").classList.add("unlocked");
        else document.querySelector("[data-region='dp']").classList.remove("unlocked");
    }

    //achievements
    //survivor
    if(survivor != null) {
        //unhide others
        document.querySelector(".survivor-hidden").classList.remove("hide");
        setupPipAchievement("survivor", AchievementPointRequirements.survivor, survivor, true);
    }
    //wanderer
    if(wanderer != null) {
        setupPipAchievement("wanderer", AchievementPointRequirements.traveller, wanderer);
    }
    //scholar
    if(scholar != null) {
        console.log(scholar);
        setupPipAchievement("scholar", AchievementPointRequirements.scholar, scholar);
    }    
    //outlaw
    if(outlaw != null) {
       setupIntAchievement("outlaw", AchievementPointRequirements.outlaw, outlaw);
    }
    //hunter
    if(hunter != null) {
        setupIntAchievement("hunter", AchievementPointRequirements.hunter, hunter);
    }
    //friend
    if(friend != null) {
        setupFloatAchievement("friend", AchievementPointRequirements.friend, friend);
    }
    //monk
    if(monk != null) {
        setupIntAchievement("monk", AchievementPointRequirements.monk, monk);
    }
    //chieftain
    if(chieftain != null) {
        setupFloatAchievement("chieftain", AchievementPointRequirements.chieftain, chieftain);
    }
    //saint
    if(saint != null) {
        setupIntAchievement("saint", AchievementPointRequirements.saint, saint);
    }
    //dragonSlayer
    if(dragonSlayer != null) {
       setupDragonSlayer(AchievementPointRequirements.dragonSlayer, dragonSlayer);
    }



    //handle karma data
    if(karma != null) {
        const activeKarmaDiv = document.querySelector(".karma.active");
        const inactiveKarmaDiv = document.querySelector(".karma.inactive");
        //look for a karma cap
        let cap = karmaCap || 4;
        // cap = 8;
        // let karma = 6;
        // const cap = 9;
        //compare for column index
        const column = KarmaCapTracker[cap.toString()];
        //move to proper index
        activeKarmaDiv.style.backgroundPositionX = 
            inactiveKarmaDiv.style.backgroundPositionX = `${-column * KarmaAtlasSize.width}px`;
        //move dial to proper y position
        //switch the active to the current type
        console.log("KARMA: " + karma);
        const offsetY = (karmaCap - karma) * KarmaAtlasSize.height;
        activeKarmaDiv.style.backgroundPositionY = `-${offsetY}px`;
        inactiveKarmaDiv.style.backgroundPositionY = `calc(-50% - ${offsetY + 75}px)`;

    }



    //handle kills data
    if(kills != null) {
        if(kills.length <= 0) return;
        //order by biggest boy points
        // kills.sort((a, b) => a.score > b.score ? -1 : 1);
        //order by hierarchy
        kills.sort((a, b) => {
            const keys = Object.keys(spriteAtlasIndex);
            if(keys.indexOf(a.name) > keys.indexOf(b.name)) return 1;
            else return -1;
        });
        for(let killData of kills) {
            //create a kill template
            const killDiv = creatureKillTemplate.cloneNode(true);
            killDiv.querySelector(".kill-amount").innerHTML = killData.kills;
            killDiv.querySelector(".kill-worth").innerHTML = `x${killData.score}`;

            //get the icon
            const position = spriteAtlasIndex[killData.name];

            console.log(killData.name);
            console.log(position);
            const iconDiv = killDiv.querySelector(".creature-icon");
            const x = position.x * spriteAtlasSize.width;
            const y = position.y * spriteAtlasSize.height;
            iconDiv.style.backgroundPositionX = `${-x}px`;
            iconDiv.style.backgroundPositionY = `${-y}px`;
            console.log(iconDiv.style.backgroundPosition);

            //add a hover
            iconDiv.title = killDiv.querySelector(".kill-amount").title = killData.name;

            //attach to container
            document.querySelector(".creature-kill-container").appendChild(killDiv);

            // return;
        }
    }

}




function setupPipAchievement(id, pointRequirement, obj, staticValue=false) {
    const aDiv = document.querySelector(`[data-achievement='${id}']`);
    aDiv.classList.remove("inactive");
    //set the pips
    const pipsDiv = aDiv.querySelector(".pips");
    // const length = (staticValue) ? parseInt(obj.data) : obj.data.length;
    for(let i = 0; i < pointRequirement; i++) {
        const pip = document.createElement("div");
        if(staticValue) { 
            if(parseInt(obj.data) > i) pip.classList.add("pip", "full");
            else pip.classList.add("pip", "empty");
        }
        else {
            if(id == "wanderer") { console.log("AM I IN"); console.log(obj.data[i]) }
            if(obj.data[i] == 1) pip.classList.add("pip", "full");
            else if(obj.data[i] != 1 && obj.data[i] != 0 && i < obj.data.length) pip.classList.add("pip", "full"); //data-pearl
            else pip.classList.add("pip", "empty");
        }
        pipsDiv.appendChild(pip);
    }

    const progressDiv = aDiv.querySelector(".progress");
    if(pipsDiv.childNodes.length > 0) {
        progressDiv.innerHTML = "";
    }
    if(obj.completed) aDiv.classList.add("complete");
}

function setupIntAchievement(id, pointRequirement, obj) {
    const aDiv = document.querySelector(`[data-achievement='${id}']`);
    aDiv.classList.remove("inactive");
    //set the status
    const statusDiv = aDiv.querySelector(".status-bar .slider");
    const perc = (parseInt(obj.data) / pointRequirement) * 100;
    statusDiv.style.left = `${perc}%`;

    const progressDiv = aDiv.querySelector(".progress");
    progressDiv.innerHTML = "";
    if(obj.completed) aDiv.classList.add("complete");

    const countDiv = aDiv.querySelector(".count");
    countDiv.innerHTML = `${parseInt(obj.data)}/${pointRequirement}`;
}

function setupFloatAchievement(id, pointRequirement, obj) {
    const aDiv = document.querySelector(`[data-achievement='${id}']`);
    aDiv.classList.remove("inactive");
    //set the status
    const statusDiv = aDiv.querySelector(".status-bar .slider");
    const perc = (parseFloat(obj.data) / pointRequirement) * 100;
    statusDiv.style.left = `${perc}%`;

    const progressDiv = aDiv.querySelector(".progress");
    progressDiv.innerHTML = "";
    if(obj.completed) aDiv.classList.add("complete");

    const countDiv = aDiv.querySelector(".count");
    countDiv.innerHTML = `${parseFloat(obj.data).toFixed(2)}/${pointRequirement}`;
}

function setupDragonSlayer(pointRequirement, obj) {
    const aDiv = document.querySelector("[data-achievement='dragonSlayer']");
    aDiv.classList.remove("inactive");
    //set the pips
    const pipsDiv = aDiv.querySelector(".pips");
    for(let i = 0; i < obj.data.length; i++) {
        const pip = document.createElement("div");
        if(obj.data[i] == "1") pip.classList.add("pip", "full", "dragon-slayer", `pip-${i}`);
        else pip.classList.add("pip", "empty");
        pipsDiv.appendChild(pip);
    }

    if(obj.completed) aDiv.classList.add("complete");
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}




function clearData() {
    //relock map
    const mapDivs = document.querySelectorAll("[data-region]");
    mapDivs.forEach((el) => el.classList.remove("unlocked"));

    //delete kills
    const killDivs = document.querySelectorAll(".creature-kill");
    killDivs.forEach((el) => {
        el.remove();
        el = null;
    });


    //reset achievements
    const achieveDivs = document.querySelectorAll(".achievement");
    achieveDivs.forEach((el) => {
        el.classList.remove("complete");
        el.classList.add("inactive");

        const pips = el.querySelector(".pips");
        if(pips != null) pips.innerHTML = "";
    });
}