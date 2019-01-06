import * as RW from "./constants";


export default class Parser {
    static parse(txt) {
        // const startIndex = txt.length - txt.split("").reverse().join("").indexOf(">AviDgorp<", 10);
        //changed start index for hunter to SAVE STATE NUMBER 2
        const startIndex = txt.indexOf("SAV STATE NUMBER<svB>2");

        if(startIndex == -1) {
            alert("This save file does not contain a Hunter save.  \n\nIf you believe this is incorrect, please report an issue to https://github.com/jaclynonacloud/rainworld-tracker/issues, or contact jaclynonacloud@gmail.com.");
            return;
        }
    
        const hunterText = txt.slice(startIndex);

        //create save object
        const hunterData = {
            "totalTime" : getTimeFromSeconds(findDataValue("TOTTIME", hunterText)),
            "totalTimeRaw" : findDataValue("TOTTIME", hunterText),
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

        return hunterData;
    }
}


function findDataValue(id, txt, tag = "") {
    let startIndex = txt.indexOf(`>${id}<`) + id.length;
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
    //splice out text
    const killText = txt.slice(startIndex, endIndex);
    //array up
    let killArray = killText.split(">");
    killArray = killArray.map(el => el.replace("<svB", "").replace("<svC", "").replace("<svD", ""));
    killArray.shift();

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
            result.push(creature);
        }
    }

    return result;
}

function findDataExists(id, txt) {
    return txt.indexOf(id) != -1;
}


function _getCreatureByID(id) {
    for(let key of Object.keys(RW.CreatureLookup)) {
        if(RW.CreatureLookup[key].id == id) {
            let creatureObj = RW.CreatureLookup[key];
            creatureObj.key = key;
            creatureObj.name = creatureObj.name || key;
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
    if(time.toString().split("").length < 2) return `0${time}`;
    return time;
}

/*----- SPECIALIZED -----*/
function getSurvivor(txt) {
    //first, see if it exists
    const value = findAchievementValue("Survivor", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.survivor;
    value.name = "The Survivor";

    return value;
}
function getHunter(txt) {
    //first, see if it exists
    const value = findAchievementValue("Hunter", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.hunter;
    value.name = "The Hunter";

    return value;
}
function getSaint(txt) {
    //first, see if it exists
    const value = findAchievementValue("Saint", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;
    
    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.saint;
    value.name = "The Saint";

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

    value.completed = value.visited.length >= RW.AchievementPointRequirements.traveller;
    value.name = "The Wanderer";

    return value;
}
function getChieftain(txt) {
    //first, see if it exists
    const value = findAchievementValue("Chieftain", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseFloat(value.data) >= RW.AchievementPointRequirements.chieftain;
    value.name = "The Chieftain";

    return value;
}
function getMonk(txt) {
    //first, see if it exists
    const value = findAchievementValue("Monk", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.monk;
    value.name = "The Monk";

    return value;
}
function getOutlaw(txt) {
    //first, see if it exists
    const value = findAchievementValue("Outlaw", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.outlaw;
    value.name = "The Outlaw";

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
    value.data = dataArray.map((el) => (el == "1") ? 1 : 0);
    //add the lizards killed    
    value.lizardsKilled = _getLizardsArray(dataArray);
    value.lizardsLeft = _getLizardsArray(_reverseDataArray(dataArray));


    value.completed = value.lizardsKilled.length >= RW.AchievementPointRequirements.dragonSlayer;
    value.name = "The Dragon Slayer";

    return value;
}
function getScholar(txt) {
    //first, see if it exists
    const value = findAchievementValue("Scholar", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.data = value.data.split(".").map(el => parseInt(el));
    value.completed = value.data.length >= RW.AchievementPointRequirements.scholar;
    value.name = "The Scholar";

    return value;
}
function getFriend(txt) {
    //first, see if it exists
    const value = findAchievementValue("Friend", txt);
    if(value == null) return null;
    if(Object.keys(value).length === 0) return null;

    value.completed = parseFloat(value.data) >= RW.AchievementPointRequirements.friend;
    value.name = "The Friend";

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