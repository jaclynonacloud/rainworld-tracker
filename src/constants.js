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
    "Slugcat" : {name:"Slugcat", id:1, score:5},
    "GreenLizard" : {name:"Green Lizard", id:4, score:10},
    "PinkLizard" : {name:"Pink Lizard", id:3, score:7},
    "BlueLizard" : {name:"Blue Lizard", id:5, score:6},
    "WhiteLizard" : {name:"White Lizard", id:7, score:8},
    "BlackLizard" : {name:"Black Lizard", id:9, score:7},
    "YellowLizard" : {name:"Yellow Lizard", id:6, score:6},
    "CyanLizard" : {name:"Cyan Lizard", id:11, score:9},
    "RedLizard" : {name:"Red Lizard", id:8, score:25},
    "Salamander" : {name:"salamander", id:10, score:7},
    "CicadaA" : {name:"White Cicada", id:19, score:2},
    "CicadaB" : {name:"Black Cicada", id:20, score:2},
    "Snail" : {name:"Snail", id:15, score:1},
    "PoleMimic" : {name:"Pole Plant", id:29, score:2},
    "TentaclePlant" : {name:"Monster Kelp", id:28, score:7},
    "Scavenger" : {name:"Scavenger", id:36, score:6},
    "Vulture" : {name:"Vulture", id:16, score:15},
    "KingVulture" : {name:"King Vulture", id:45, score:25},
    // "SmallCentipede" : {name:"Small Centipede", id:321, score:4},  //added their variant to the ID
    "SmallCentipede" : {name:"Small Centipede", id:322, score:4},  //added their variant to the ID
    // "Centipede" : {name:"Centipede", id:322, score:7},
    "Centipede" : {name:"Centipede", id:321, score:7},
    "LargeCentipede" : {name:"Large Centipede", id:323, score:7},
    "RedCentipede" : {name:"Red Centipede", id:33, score:19},
    "Centiwing" : {name:"Centiwing", id:34, score:5},
    "Tubeworm" : {name:"Garbage Worm", id:25, score:1},
    "Hazer" : {name:"Hazer", id:46, score:1},
    "LanternMouse" : {name:"Lantern Mouse", id:18, score:2},
    "BigSpider" : {name:"Spider", id:40, score:4},
    "SpitterSpider" : {name:"Tranq Spider", id:41, score:5},
    "MirosBird" : {name:"Scissorbird", id:30, score:16},
    "BrotherLongLegs" : {name:"Brother Long Legs", id:27, score:14},
    "DaddyLongLegs" : {name:"Daddy Long Legs", id:26, score:25},
    "Deer" : {name:"Raindeer", id:24, score:10}, //??Doesn't have a score?
    "EggBug" : {name:"Egg Bug", id:39, score:2},
    "DropBug" : {name:"Dropwig", id:44, score:5},
    "BigNeedleWorm" : {name:"Noodlefly", id:43, score:5},
    "JetFish" : {name:"Jet Fish", id:22, score:4},
    "Leviathan" : {name:"Leviathan", id:23, score:25},
    "Overseer" : {name:"Overseer", id:37, score:2}, //??
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
const SpriteAtlasSize = Object.freeze({
    "width" : 31,
    "height" : 26
});
const SpriteAtlasIndex = Object.freeze({
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


//get the creature kill template
const CreatureKillTemplate = document.querySelector(".creature-kill");
CreatureKillTemplate.remove();


//get the log item template
const LogItemTemplate = document.querySelector(".log-item");
LogItemTemplate.remove();

//get the total template
const LogItemTotalTemplate = document.querySelector(".log-item.full-total");
LogItemTotalTemplate.remove();



export { RegionLookup, DefaultScores, CreatureLookup, 
    AchievementPointRequirements, KarmaAtlasSize, KarmaCapTracker,
    SpriteAtlasSize, SpriteAtlasIndex, 
    CreatureKillTemplate, LogItemTemplate, LogItemTotalTemplate };