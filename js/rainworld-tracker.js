(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var RW = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
    function Log() {
        _classCallCheck(this, Log);

        Log.rankItems = [];
        Log.score = 0;
        Log.multiplier = 1;

        document.querySelector(".log .btn-close").addEventListener("click", function () {
            Log.hide();
        });
    }

    _createClass(Log, null, [{
        key: "show",
        value: function show(data) {
            document.querySelector(".log").classList.remove("hide");
            Log.compute(data);
        }
    }, {
        key: "hide",
        value: function hide() {
            document.querySelector(".log").classList.add("hide");
        }
    }, {
        key: "compute",
        value: function compute(data) {
            Log.clear();
            //calculate the data
            //food
            Log.addRankItem("Food", data.totalFood || 0, 1);
            //successful cycles
            Log.addRankItem("Successful cycles", data.cycles || 0, 10);
            //deaths
            Log.addRankItem("Deaths", data.deaths || 0, -3);
            //quits
            Log.addRankItem("Quits", data.quits || 0, -3);
            //time
            Log.addRankItem("Time", data.totalTimeRaw, -1, data.totalTimeRaw != null ? -(data.totalTimeRaw / 60) : 0);
            //delivered payload
            if (data.deliveredPayload) Log.addRankItem("Delivered Payload", data.deliveredPayload ? 100 : 0, 1);
            //helped pebbles
            if (data.helpedPebbles) Log.addRankItem("Helped Five Pebbles", data.helpedPebbles ? 40 : 0, 1);
            //ascended
            if (data.ascended) Log.addRankItem("Ascended", data.ascended ? 300 : 0, 1);
            Log._computeScore();

            //show total before creatures
            Log.addTotalItem(Log.getTotalScore());

            //creatures
            if (data.kills != null) {
                for (var i = 0; i < data.kills.length; i++) {
                    var killItemData = data.kills[i];
                    Log.addRankItem(killItemData.name + " kill(s)", killItemData.kills, killItemData.score);
                }
            }
            Log._computeScore();
            //show total before multiplier
            Log.addTotalItem(Log.getTotalScore());

            //achievements
            var score = Log.getTotalScore();
            var multiplier = 1;
            var _arr = [data.survivor, data.wanderer, data.chieftain, data.monk, data.scholar, data.outlaw, data.dragonSlayer, data.hunter, data.friend, data.saint];
            for (var _i = 0; _i < _arr.length; _i++) {
                var achievement = _arr[_i];
                if (achievement != null) {
                    if (achievement.completed) {
                        multiplier++;
                        Log.addRankItem(achievement.name, multiplier, 0, score * multiplier, true);
                    }
                }
            }

            Log.score = score * multiplier;
            //show total
            Log.addTotalItem(Log.score);

            return Log.score;
        }
    }, {
        key: "addRankItem",
        value: function addRankItem(name, amount) {
            var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var handfeedScore = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var isMultiplier = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var score = handfeedScore != 0 ? handfeedScore : amount * value;
            //get div
            var div = RW.LogItemTemplate.cloneNode(true);
            var titleDiv = div.querySelector(".title");
            var amountDiv = div.querySelector(".amount");
            var valueDiv = div.querySelector(".value");
            var totalDiv = div.querySelector(".total");
            titleDiv.innerHTML = name;
            amountDiv.innerHTML = amount == "" ? "" : "x " + amount;
            if (value != 0) valueDiv.innerHTML = "@ " + value;
            totalDiv.innerHTML = Math.floor(score);

            //check for negative scores
            if (valueDiv.innerHTML.indexOf("-") != -1) valueDiv.classList.add("negative");
            if (totalDiv.innerHTML.indexOf("-") != -1) totalDiv.classList.add("negative");

            //push into container
            document.querySelector(".log .log-list").appendChild(div);

            if (!isMultiplier) Log.rankItems.push({ name: name, score: score });else Log.multiplier++;
        }
    }, {
        key: "addTotalItem",
        value: function addTotalItem(score) {
            var div = RW.LogItemTotalTemplate.cloneNode(true);
            div.querySelector(".total").innerHTML = score;

            //push into container
            document.querySelector(".log .log-list").appendChild(div);
        }
    }, {
        key: "getTotalScore",
        value: function getTotalScore() {
            var score = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Log.rankItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;
                    score += parseInt(item.score);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return score;
        }
    }, {
        key: "getFinalScore",
        value: function getFinalScore() {
            return Log.score;
        }
    }, {
        key: "_computeScore",
        value: function _computeScore() {
            Log.score += Log.getTotalScore();
        }
    }, {
        key: "clear",
        value: function clear() {
            Log.rankItems = [];
            Log.score = 0;
            Log.multiplier = 1;
            document.querySelector(".log .log-list").innerHTML = "";
        }
    }]);

    return Log;
}();

exports.default = Log;

},{"./constants":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var RW = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, null, [{
        key: "parse",
        value: function parse(txt) {
            // const startIndex = txt.length - txt.split("").reverse().join("").indexOf(">AviDgorp<", 10);
            //changed start index for hunter to SAVE STATE NUMBER 2
            // const startIndex = txt.indexOf("SAV STATE NUMBER<svB>2");
            var startIndex = txt.lastIndexOf("SAVE STATE");

            if (startIndex == -1) {
                alert("This save file does not contain a Hunter save.  \n\nIf you believe this is incorrect, please report an issue to https://github.com/jaclynonacloud/rainworld-tracker/issues, or contact jaclynonacloud@gmail.com.");
                return;
            }

            var hunterText = txt.slice(startIndex);

            //create save object
            var hunterData = {
                "totalTime": getTimeFromSeconds(findDataValue("TOTTIME", hunterText)),
                "totalTimeRaw": findDataValue("TOTTIME", hunterText),
                "cycles": findDataValue("CURRVERCYCLES", hunterText),
                "totalFood": findDataValue("TOTFOOD", hunterText),
                "survives": findDataValue("SURVIVES", hunterText),
                "deaths": findDataValue("DEATHS", hunterText),
                "quits": findDataValue("QUITS", hunterText),
                "karma": findDataValue("KARMA", hunterText),
                "karmaCap": findDataValue("KARMACAP", hunterText),
                "helpedPebbles": findDataExists("PEBBLESHELPED", hunterText),
                "deliveredPayload": findDataExists("MOONREVIVED", hunterText),
                "ascended": findDataExists("ASCENDED", hunterText),
                "swallowedItem": findDataValue("SWALLOWEDITEMS", hunterText, "oA"),
                "extraCycles": findDataExists("REDEXTRACYCLES", hunterText),
                "kills": findKillValue(hunterText),
                //achievements
                "survivor": getSurvivor(hunterText),
                "hunter": getHunter(hunterText),
                "saint": getSaint(hunterText),
                "wanderer": getWanderer(hunterText),
                "chieftain": getChieftain(hunterText),
                "monk": getMonk(hunterText),
                "outlaw": getOutlaw(hunterText),
                "dragonSlayer": getDragonSlayer(hunterText),
                "scholar": getScholar(hunterText),
                "friend": findAchievementValue("Friend", hunterText)
            };

            return hunterData;
        }
    }]);

    return Parser;
}();

exports.default = Parser;


function findDataValue(id, txt) {
    var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    var findIndex = txt.indexOf(">" + id + "<");
    if (findIndex == -1) return "";
    var startIndex = +findIndex + id.length;
    if (tag != "") startIndex = txt.indexOf(tag, startIndex);
    var valueIndex = txt.indexOf(">", startIndex) + 1;
    var valueIndexEnd = txt.indexOf("<", valueIndex);

    return txt.slice(valueIndex, valueIndexEnd);
}

function findAchievementValue(id, txt) {
    var achievementData = {};
    var startIndex = txt.indexOf(id);
    if (startIndex == -1) return null;
    startIndex = txt.indexOf("egA", startIndex);
    var valueIndex = txt.indexOf(">", startIndex) + 1;
    var valueIndexEnd = txt.indexOf("<", valueIndex);
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
    var startIndex = txt.indexOf("KILLS") + 5;
    var endIndex = txt.lastIndexOf("svD");
    endIndex = txt.indexOf("<", endIndex);
    //splice out text
    var killText = txt.slice(startIndex, endIndex);
    //array up
    var killArray = killText.split(">");
    killArray = killArray.map(function (el) {
        return el.replace("<svB", "").replace("<svC", "").replace("<svD", "");
    });
    killArray.shift();

    //decipher the data
    var result = [];
    for (var i = 0; i < killArray.length; i += 2) {
        var rawID = killArray[i];
        var amount = parseInt(killArray[i + 1]);
        //decipher the creature type
        var creatureID = parseInt(rawID.split("-")[0]);
        //if the id is a 32 (freak num), check the variant as well
        if (creatureID == 32) creatureID = parseInt("32" + rawID.split("-")[2]);
        //go find the creature
        var creature = _getCreatureByID(creatureID);
        if (creature != null) {
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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(RW.CreatureLookup)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (RW.CreatureLookup[key].id == id) {
                var creatureObj = RW.CreatureLookup[key];
                creatureObj.key = key;
                creatureObj.name = creatureObj.name || key;
                return creatureObj;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return null;
}

function getTimeFromSeconds(time) {
    var hours = Math.floor(time / 3600);
    var minutes = _setToTens(Math.floor(time % 3600 / 60));
    var seconds = _setToTens(Math.floor(time % 3600 % 60));

    return hours + ":" + minutes + ":" + seconds;
}
function _setToTens(time) {
    if (time.toString().split("").length < 2) return "0" + time;
    return time;
}

/*----- SPECIALIZED -----*/
function getSurvivor(txt) {
    //first, see if it exists
    var value = findAchievementValue("Survivor", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.survivor;
    value.name = "The Survivor";

    return value;
}
function getHunter(txt) {
    //first, see if it exists
    var value = findAchievementValue("Hunter", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.hunter;
    value.name = "The Hunter";

    return value;
}
function getSaint(txt) {
    //first, see if it exists
    var value = findAchievementValue("Saint", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.saint;
    value.name = "The Saint";

    return value;
}
function getWanderer(txt) {
    //first, see if it exists
    var value = findAchievementValue("Traveller", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    //interpret data
    var dataArray = value.data.split(".");
    value.data = dataArray.map(function (el) {
        return el == "1" ? 1 : 0;
    });
    //add the places wandered to
    value.visited = _getPlacesArray(dataArray);
    value.notVisited = _getPlacesArray(_reverseDataArray(dataArray));

    value.completed = value.visited.length >= RW.AchievementPointRequirements.traveller;
    value.name = "The Wanderer";

    return value;
}
function getChieftain(txt) {
    //first, see if it exists
    var value = findAchievementValue("Chieftain", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseFloat(value.data) >= RW.AchievementPointRequirements.chieftain;
    value.name = "The Chieftain";

    return value;
}
function getMonk(txt) {
    //first, see if it exists
    var value = findAchievementValue("Monk", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.monk;
    value.name = "The Monk";

    return value;
}
function getOutlaw(txt) {
    //first, see if it exists
    var value = findAchievementValue("Outlaw", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseInt(value.data) >= RW.AchievementPointRequirements.outlaw;
    value.name = "The Outlaw";

    return value;
}
function getDragonSlayer(txt) {
    //first, see if it exists
    var value = findAchievementValue("DragonSlayer", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    //interpret data
    var dataArray = value.data.split(".");
    dataArray.pop();
    value.data = dataArray.map(function (el) {
        return el == "1" ? 1 : 0;
    });
    //add the lizards killed    
    value.lizardsKilled = _getLizardsArray(dataArray);
    value.lizardsLeft = _getLizardsArray(_reverseDataArray(dataArray));

    value.completed = value.lizardsKilled.length >= RW.AchievementPointRequirements.dragonSlayer;
    value.name = "The Dragon Slayer";

    return value;
}
function getScholar(txt) {
    //first, see if it exists
    var value = findAchievementValue("Scholar", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.data = value.data.split(".").map(function (el) {
        return parseInt(el);
    });
    value.completed = value.data.length >= RW.AchievementPointRequirements.scholar;
    value.name = "The Scholar";

    return value;
}
function getFriend(txt) {
    //first, see if it exists
    var value = findAchievementValue("Friend", txt);
    if (value == null) return null;
    if (Object.keys(value).length === 0) return null;

    value.completed = parseFloat(value.data) >= RW.AchievementPointRequirements.friend;
    value.name = "The Friend";

    return value;
}

function _reverseDataArray(dataArray) {
    var result = [];
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i] == "1") result.push("0");else result.push("1");
    }return result;
}

function _getLizardsArray(dataArray) {
    var lizardArray = [];
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i] == "1") {
            switch (i) {
                case 0:
                    lizardArray.push("green");break;
                case 1:
                    lizardArray.push("magenta");break;
                case 2:
                    lizardArray.push("blue");break;
                case 3:
                    lizardArray.push("white");break;
                case 4:
                    lizardArray.push("yellow");break;
                case 5:
                    lizardArray.push("black");
            }
        }
    }
    return lizardArray;
}

function _getPlacesArray(dataArray) {
    var placesArray = [];
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i] == "1") {
            switch (i) {
                case 0:
                    placesArray.push("Outskirts");break;
                case 1:
                    placesArray.push("Industrial Complex");break;
                case 2:
                    placesArray.push("Drainage System");break;
                case 3:
                    placesArray.push("Chimney Canopy");break;
                case 4:
                    placesArray.push("Garbage Wastes");break;
                case 5:
                    placesArray.push("Shaded Citadel");break;
                case 6:
                    placesArray.push("Shoreline");break;
                case 7:
                    placesArray.push("Sky Islands");break;
                case 8:
                    placesArray.push("Farm Arrays");break;
                case 9:
                    placesArray.push("Exterior");break;
                case 10:
                    placesArray.push("Five Pebbles");break;
                case 11:
                    placesArray.push("Subterranean");break;
            }
        }
    }
    return placesArray;
}

function _getKillsArray(dataArray) {
    var killsArray = [];
}

},{"./constants":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = require("./Log");

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = function () {
    function Score() {
        _classCallCheck(this, Score);

        Score.data = null;

        document.querySelector(".current-score .btn-stats").addEventListener("click", function () {
            if (Score.data == null) return;
            _Log2.default.show(Score.data);
        });

        document.querySelector(".current-score .btn-close").addEventListener("click", function () {
            Score.hide();
        });
    }

    _createClass(Score, null, [{
        key: "show",
        value: function show(data) {
            var score = data != null ? _Log2.default.compute(data) : 0;
            document.querySelector(".current-score .score").innerHTML = score;
            document.querySelector(".current-score").classList.remove("hide");
            Score.data = data;
        }
    }, {
        key: "hide",
        value: function hide() {
            Score.data = null;
            document.querySelector(".current-score").classList.add("hide");
        }
    }]);

    return Score;
}();

exports.default = Score;

},{"./Log":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var RegionLookup = Object.freeze({
    "Outskirts": "os",
    "Industrial Complex": "ic",
    "Drainage System": "ds",
    "Chimney Canopy": "cc",
    "Garbage Wastes": "gw",
    "Shaded Citadel": "sh",
    "Shoreline": "sl",
    "Sky Islands": "si",
    "Farm Arrays": "fa",
    "Exterior": "ex",
    "Five Pebbles": "fp",
    "Subterranean": "sb",
    "Depths": "dp"
});

var DefaultScores = Object.freeze({
    "Food": 1,
    "Survival": 5
});

//scores are in SandboxSettingsInterface | IDs are in MultiplayerUnlocks - SandboxUnlockID
//the image IDs are CreatureTemplate.Type references, however
var CreatureLookup = Object.freeze({
    "Slugcat": { name: "Slugcat", id: 1, score: 5 },
    "GreenLizard": { name: "Green Lizard", id: 4, score: 10 },
    "PinkLizard": { name: "Pink Lizard", id: 3, score: 7 },
    "BlueLizard": { name: "Blue Lizard", id: 5, score: 6 },
    "WhiteLizard": { name: "White Lizard", id: 7, score: 8 },
    "BlackLizard": { name: "Black Lizard", id: 9, score: 7 },
    "YellowLizard": { name: "Yellow Lizard", id: 6, score: 6 },
    "CyanLizard": { name: "Cyan Lizard", id: 11, score: 9 },
    "RedLizard": { name: "Red Lizard", id: 8, score: 25 },
    "Salamander": { name: "salamander", id: 10, score: 7 },
    "CicadaA": { name: "White Cicada", id: 19, score: 2 },
    "CicadaB": { name: "Black Cicada", id: 20, score: 2 },
    "Snail": { name: "Snail", id: 15, score: 1 },
    "PoleMimic": { name: "Pole Plant", id: 29, score: 2 },
    "TentaclePlant": { name: "Monster Kelp", id: 28, score: 7 },
    "Scavenger": { name: "Scavenger", id: 36, score: 6 },
    "Vulture": { name: "Vulture", id: 16, score: 15 },
    "KingVulture": { name: "King Vulture", id: 45, score: 25 },
    // "SmallCentipede" : {name:"Small Centipede", id:321, score:4},  //added their variant to the ID
    "SmallCentipede": { name: "Small Centipede", id: 322, score: 4 }, //added their variant to the ID
    // "Centipede" : {name:"Centipede", id:322, score:7},
    "Centipede": { name: "Centipede", id: 321, score: 7 },
    "LargeCentipede": { name: "Large Centipede", id: 323, score: 7 },
    "RedCentipede": { name: "Red Centipede", id: 33, score: 19 },
    "Centiwing": { name: "Centiwing", id: 34, score: 5 },
    "Tubeworm": { name: "Garbage Worm", id: 25, score: 1 },
    "Hazer": { name: "Hazer", id: 46, score: 1 },
    "LanternMouse": { name: "Lantern Mouse", id: 18, score: 2 },
    "BigSpider": { name: "Spider", id: 40, score: 4 },
    "SpitterSpider": { name: "Tranq Spider", id: 41, score: 5 },
    "MirosBird": { name: "Scissorbird", id: 30, score: 16 },
    "BrotherLongLegs": { name: "Brother Long Legs", id: 27, score: 14 },
    "DaddyLongLegs": { name: "Daddy Long Legs", id: 26, score: 25 },
    "Deer": { name: "Raindeer", id: 24, score: 10 }, //??Doesn't have a score?
    "EggBug": { name: "Egg Bug", id: 39, score: 2 },
    "DropBug": { name: "Dropwig", id: 44, score: 5 },
    "BigNeedleWorm": { name: "Noodlefly", id: 43, score: 5 },
    "JetFish": { name: "Jet Fish", id: 22, score: 4 },
    "Leviathan": { name: "Leviathan", id: 23, score: 25 },
    "Overseer": { name: "Overseer", id: 37, score: 2 //??
    } });

var AchievementPointRequirements = Object.freeze({
    "survivor": 5,
    "hunter": 12,
    "saint": 12,
    "traveller": 12,
    "chieftain": 1,
    "monk": 12,
    "outlaw": 7,
    "dragonSlayer": 6,
    "scholar": 3,
    "friend": 12
});

var KarmaAtlasSize = Object.freeze({
    "width": 90,
    "height": 90
});
var KarmaCapTracker = Object.freeze({
    "9": 0,
    "8": 1,
    "7": 2,
    "6": 3,
    "5": 4,
    "4": 4,
    "3": 4,
    "2": 4,
    "1": 4,
    "0": 4
});

//large centipede is 32-0-3
//med is 32-0-2
//small is 32-0-1

//31*26
var SpriteAtlasSize = Object.freeze({
    "width": 31,
    "height": 26
});
var SpriteAtlasIndex = Object.freeze({
    "Leviathan": { x: 0, y: 0 },
    "Slugcat": { x: 1, y: 0 },
    "GreenLizard": { x: 2, y: 0 },
    "PinkLizard": { x: 3, y: 0 },
    "BlueLizard": { x: 5, y: 0 },
    "WhiteLizard": { x: 0, y: 1 },
    "BlackLizard": { x: 1, y: 1 },
    "YellowLizard": { x: 2, y: 1 },
    "CyanLizard": { x: 3, y: 1 },
    "RedLizard": { x: 4, y: 1 },
    "Salamander": { x: 5, y: 1 },
    "CicadaA": { x: 0, y: 2 },
    "CicadaB": { x: 1, y: 2 },
    "Snail": { x: 2, y: 2 },
    "PoleMimic": { x: 3, y: 2 },
    "TentaclePlant": { x: 4, y: 2 },
    "Scavenger": { x: 5, y: 2 },
    "Vulture": { x: 0, y: 3 },
    "KingVulture": { x: 1, y: 3 },
    "SmallCentipede": { x: 2, y: 3 },
    "Centipede": { x: 3, y: 3 },
    "LargeCentipede": { x: 4, y: 3 },
    "RedCentipede": { x: 5, y: 3 },
    "Centiwing": { x: 0, y: 4 },
    "LanternMouse": { x: 1, y: 4 },
    "BigSpider": { x: 2, y: 4 },
    "SpitterSpider": { x: 3, y: 4 },
    "MirosBird": { x: 4, y: 4 },
    "BrotherLongLegs": { x: 5, y: 4 },
    "DaddyLongLegs": { x: 0, y: 5 },
    "EggBug": { x: 1, y: 5 },
    "DropBug": { x: 2, y: 5 },
    "BigNeedleWorm": { x: 3, y: 5 },
    "JetFish": { x: 4, y: 5 },
    "Deer": { x: 5, y: 5 },
    "Overseer": { x: 4, y: 0 }
});

//get the creature kill template
var CreatureKillTemplate = document.querySelector(".creature-kill");
CreatureKillTemplate.remove();

//get the log item template
var LogItemTemplate = document.querySelector(".log-item");
LogItemTemplate.remove();

//get the total template
var LogItemTotalTemplate = document.querySelector(".log-item.full-total");
LogItemTotalTemplate.remove();

exports.RegionLookup = RegionLookup;
exports.DefaultScores = DefaultScores;
exports.CreatureLookup = CreatureLookup;
exports.AchievementPointRequirements = AchievementPointRequirements;
exports.KarmaAtlasSize = KarmaAtlasSize;
exports.KarmaCapTracker = KarmaCapTracker;
exports.SpriteAtlasSize = SpriteAtlasSize;
exports.SpriteAtlasIndex = SpriteAtlasIndex;
exports.CreatureKillTemplate = CreatureKillTemplate;
exports.LogItemTemplate = LogItemTemplate;
exports.LogItemTotalTemplate = LogItemTotalTemplate;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var RW = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
    function Layout() {
        _classCallCheck(this, Layout);
    }

    _createClass(Layout, null, [{
        key: "show",
        value: function show(data) {
            //first, clear the data
            Layout.clear();
            var totalTime = data.totalTime,
                totalFood = data.totalFood,
                cycles = data.cycles,
                extraCycles = data.extraCycles,
                survives = data.survives,
                deaths = data.deaths,
                quits = data.quits,
                kills = data.kills,
                swallowedItem = data.swallowedItem,
                helpedPebbles = data.helpedPebbles,
                deliveredPayload = data.deliveredPayload,
                ascended = data.ascended,
                wanderer = data.wanderer,
                scholar = data.scholar,
                survivor = data.survivor,
                outlaw = data.outlaw,
                hunter = data.hunter,
                friend = data.friend,
                monk = data.monk,
                chieftain = data.chieftain,
                saint = data.saint,
                dragonSlayer = data.dragonSlayer,
                karma = data.karma,
                karmaCap = data.karmaCap;

            //general data

            document.querySelector(".totalTime").innerHTML = totalTime;
            document.querySelector(".totalFood").innerHTML = totalFood;
            document.querySelector(".totalCycles").innerHTML = cycles;
            document.querySelector(".remainingCycles").innerHTML = 20 - parseInt(cycles) + (extraCycles ? 5 : 0) || "";
            document.querySelector(".survives").innerHTML = survives;
            document.querySelector(".deaths").innerHTML = deaths;
            document.querySelector(".quits").innerHTML = quits;
            document.querySelector(".currentKarma").innerHTML = karma;
            document.querySelector(".karmaCap").innerHTML = karmaCap;
            document.querySelector(".quits").innerHTML = quits;
            document.querySelector(".itemSwallowed").innerText = swallowedItem != "" ? swallowedItem : "<None>";
            document.querySelector(".helpedPebbles").innerHTML = helpedPebbles ? "Yes" : "No";
            document.querySelector(".deliveredPayload").innerHTML = deliveredPayload ? "Yes" : "No";
            document.querySelector(".ascended").innerHTML = ascended ? "Yes" : "No";

            //setup places
            if (wanderer != null) {
                //toggle unlocked on any that are completed
                var divs = document.querySelectorAll("[data-region]");
                for (var i = 0; i < divs.length; i++) {
                    var regDiv = divs[i];
                    var fullName = getKeyByValue(RW.RegionLookup, regDiv.dataset.region);
                    if (wanderer.visited.indexOf(fullName) != -1) regDiv.classList.add("unlocked");else regDiv.classList.remove("unlocked");
                }
                //handle depths
                if (ascended) document.querySelector("[data-region='dp']").classList.add("unlocked");else document.querySelector("[data-region='dp']").classList.remove("unlocked");
            }

            //achievements
            //survivor
            if (survivor != null) {
                //unhide others
                document.querySelector(".survivor-hidden").classList.remove("hide");
                setupPipAchievement("survivor", RW.AchievementPointRequirements.survivor, survivor, true);
            }
            //wanderer
            if (wanderer != null) {
                setupPipAchievement("wanderer", RW.AchievementPointRequirements.traveller, wanderer);
            }
            //scholar
            if (scholar != null) {
                setupPipAchievement("scholar", RW.AchievementPointRequirements.scholar, scholar);
            }
            //outlaw
            if (outlaw != null) {
                setupIntAchievement("outlaw", RW.AchievementPointRequirements.outlaw, outlaw);
            }
            //hunter
            if (hunter != null) {
                setupIntAchievement("hunter", RW.AchievementPointRequirements.hunter, hunter);
            }
            //friend
            if (friend != null) {
                setupFloatAchievement("friend", RW.AchievementPointRequirements.friend, friend);
            }
            //monk
            if (monk != null) {
                setupIntAchievement("monk", RW.AchievementPointRequirements.monk, monk);
            }
            //chieftain
            if (chieftain != null) {
                setupFloatAchievement("chieftain", RW.AchievementPointRequirements.chieftain, chieftain);
            }
            //saint
            if (saint != null) {
                setupIntAchievement("saint", RW.AchievementPointRequirements.saint, saint);
            }
            //dragonSlayer
            if (dragonSlayer != null) {
                setupDragonSlayer(RW.AchievementPointRequirements.dragonSlayer, dragonSlayer);
            }

            //handle karma data
            if (karma != null) {
                var activeKarmaDiv = document.querySelector(".karma.active");
                var inactiveKarmaDiv = document.querySelector(".karma.inactive");
                //look for a karma cap
                var cap = karmaCap || 4;
                var currKarma = Math.min(karma, cap);
                //compare for column index
                var column = RW.KarmaCapTracker[cap.toString()];
                //move to proper index
                activeKarmaDiv.style.backgroundPositionX = inactiveKarmaDiv.style.backgroundPositionX = -column * RW.KarmaAtlasSize.width + "px";
                //move dial to proper y position
                //switch the active to the current type
                var offsetY = (9 - currKarma) * RW.KarmaAtlasSize.height;
                activeKarmaDiv.style.backgroundPositionY = "-" + offsetY + "px";
                inactiveKarmaDiv.style.backgroundPositionY = "calc(-50% - " + (offsetY + 75) + "px)";
            }

            //handle kills data
            if (kills != null) {
                if (kills.length <= 0) return;
                //order by biggest boy points
                // kills.sort((a, b) => a.score > b.score ? -1 : 1);
                //order by hierarchy
                kills.sort(function (a, b) {
                    var keys = Object.keys(RW.SpriteAtlasIndex);
                    if (keys.indexOf(a.key) > keys.indexOf(b.key)) return 1;else return -1;
                });
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = kills[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var killData = _step.value;

                        //create a kill template
                        var killDiv = RW.CreatureKillTemplate.cloneNode(true);
                        killDiv.querySelector(".kill-amount").innerHTML = killData.kills;
                        killDiv.querySelector(".kill-worth").innerHTML = "x" + killData.score;

                        //get the icon
                        var position = RW.SpriteAtlasIndex[killData.key];

                        var iconDiv = killDiv.querySelector(".creature-icon");
                        var x = position.x * RW.SpriteAtlasSize.width;
                        var y = position.y * RW.SpriteAtlasSize.height;
                        iconDiv.style.backgroundPositionX = -x + "px";
                        iconDiv.style.backgroundPositionY = -y + "px";

                        //add a hover
                        iconDiv.title = killDiv.querySelector(".kill-amount").title = killData.name;

                        //attach to container
                        document.querySelector(".creature-kill-container").appendChild(killDiv);

                        // return;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            //relock map
            var mapDivs = document.querySelectorAll("[data-region]");
            mapDivs.forEach(function (el) {
                return el.classList.remove("unlocked");
            });

            //delete kills
            var killDivs = document.querySelectorAll(".creature-kill");
            killDivs.forEach(function (el) {
                el.remove();
                el = null;
            });

            //reset achievements
            var achieveDivs = document.querySelectorAll(".achievement");
            achieveDivs.forEach(function (el) {
                el.classList.remove("complete");
                el.classList.add("inactive");

                var pips = el.querySelector(".pips");
                if (pips != null) pips.innerHTML = "";
            });
        }
    }]);

    return Layout;
}();

exports.default = Layout;


function setupPipAchievement(id, pointRequirement, obj) {
    var staticValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var aDiv = document.querySelector("[data-achievement='" + id + "']");
    aDiv.classList.remove("inactive");
    //set the pips
    var pipsDiv = aDiv.querySelector(".pips");
    // const length = (staticValue) ? parseInt(obj.data) : obj.data.length;
    for (var i = 0; i < pointRequirement; i++) {
        var pip = document.createElement("div");
        if (staticValue) {
            if (parseInt(obj.data) > i) pip.classList.add("pip", "full");else pip.classList.add("pip", "empty");
        } else {
            if (obj.data[i] == 1) pip.classList.add("pip", "full");else if (obj.data[i] != 1 && obj.data[i] != 0 && i < obj.data.length) pip.classList.add("pip", "full"); //data-pearl
            else pip.classList.add("pip", "empty");
        }
        pipsDiv.appendChild(pip);
    }

    var progressDiv = aDiv.querySelector(".progress");
    if (pipsDiv.childNodes.length > 0) {
        progressDiv.innerHTML = "";
    }
    if (obj.completed) aDiv.classList.add("complete");
}

function setupIntAchievement(id, pointRequirement, obj) {
    var aDiv = document.querySelector("[data-achievement='" + id + "']");
    aDiv.classList.remove("inactive");
    //set the status
    var statusDiv = aDiv.querySelector(".status-bar .slider");
    var perc = parseInt(obj.data) / pointRequirement * 100;
    statusDiv.style.left = perc + "%";

    var progressDiv = aDiv.querySelector(".progress");
    progressDiv.innerHTML = "";
    if (obj.completed) aDiv.classList.add("complete");

    var countDiv = aDiv.querySelector(".count");
    countDiv.innerHTML = parseInt(obj.data) + "/" + pointRequirement;
}

function setupFloatAchievement(id, pointRequirement, obj) {
    var aDiv = document.querySelector("[data-achievement='" + id + "']");
    aDiv.classList.remove("inactive");
    //set the status
    var statusDiv = aDiv.querySelector(".status-bar .slider");
    var perc = parseFloat(obj.data) / pointRequirement * 100;
    statusDiv.style.left = perc + "%";

    var progressDiv = aDiv.querySelector(".progress");
    progressDiv.innerHTML = "";
    if (obj.completed) aDiv.classList.add("complete");

    var countDiv = aDiv.querySelector(".count");
    countDiv.innerHTML = parseFloat(obj.data).toFixed(2) + "/" + pointRequirement;
}

function setupDragonSlayer(pointRequirement, obj) {
    var aDiv = document.querySelector("[data-achievement='dragonSlayer']");
    aDiv.classList.remove("inactive");
    //set the pips
    var pipsDiv = aDiv.querySelector(".pips");
    for (var i = 0; i < obj.data.length; i++) {
        var pip = document.createElement("div");
        if (obj.data[i] == "1") pip.classList.add("pip", "full", "dragon-slayer", "pip-" + i);else pip.classList.add("pip", "empty");
        pipsDiv.appendChild(pip);
    }

    if (obj.completed) aDiv.classList.add("complete");
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(function (key) {
        return object[key] === value;
    });
}

},{"./constants":4}],6:[function(require,module,exports){
"use strict";

var _Log = require("./Log");

var _Log2 = _interopRequireDefault(_Log);

var _constants = require("./constants");

var RW = _interopRequireWildcard(_constants);

var _Parser = require("./Parser");

var _Parser2 = _interopRequireDefault(_Parser);

var _layout = require("./layout");

var _layout2 = _interopRequireDefault(_layout);

var _Score = require("./Score");

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Log2.default();
new _Score2.default();

var rainworldData = void 0;

//listen for save file change
document.getElementById("file-upload").addEventListener("change", function (e) {
    //if we have a value, fetch and send
    if (e.target.files.length <= 0) return;

    //try to parse
    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
        // console.log(fileReader.result);
        var data = _Parser2.default.parse(fileReader.result);
        _layout2.default.show(data);
        rainworldData = data;

        //set the name in the text
        document.querySelector(".file-input .name").innerHTML = e.target.files[0].name;

        //set preview
        document.getElementById("rank-preview").innerHTML = _Log2.default.compute(rainworldData);
    };
    fileReader.readAsText(e.target.files[0]);
});

document.querySelector(".btn-calculate").addEventListener("click", function () {
    _Score2.default.show(rainworldData);
});

/*------------- LAYOUT ----------------*/

},{"./Log":1,"./Parser":2,"./Score":3,"./constants":4,"./layout":5}]},{},[6])

//# sourceMappingURL=rainworld-tracker.js.map
