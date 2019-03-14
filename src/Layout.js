import * as RW from "./constants";

export default class Layout {
    static show(data) {
        //first, clear the data
        Layout.clear();
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

        //setup places
        if(wanderer != null) {
            //toggle unlocked on any that are completed
            const divs = document.querySelectorAll("[data-region]");
            for(let i = 0; i < divs.length; i++) {
                const regDiv = divs[i];
                const fullName = getKeyByValue(RW.RegionLookup, regDiv.dataset.region);
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
            setupPipAchievement("survivor", RW.AchievementPointRequirements.survivor, survivor, true);
        }
        //wanderer
        if(wanderer != null) {
            setupPipAchievement("wanderer", RW.AchievementPointRequirements.traveller, wanderer);
        }
        //scholar
        if(scholar != null) {
            setupPipAchievement("scholar",RW. AchievementPointRequirements.scholar, scholar);
        }    
        //outlaw
        if(outlaw != null) {
        setupIntAchievement("outlaw", RW.AchievementPointRequirements.outlaw, outlaw);
        }
        //hunter
        if(hunter != null) {
            setupIntAchievement("hunter", RW.AchievementPointRequirements.hunter, hunter);
        }
        //friend
        if(friend != null) {
            setupFloatAchievement("friend", RW.AchievementPointRequirements.friend, friend);
        }
        //monk
        if(monk != null) {
            setupIntAchievement("monk", RW.AchievementPointRequirements.monk, monk);
        }
        //chieftain
        if(chieftain != null) {
            setupFloatAchievement("chieftain", RW.AchievementPointRequirements.chieftain, chieftain);
        }
        //saint
        if(saint != null) {
            setupIntAchievement("saint", RW.AchievementPointRequirements.saint, saint);
        }
        //dragonSlayer
        if(dragonSlayer != null) {
        setupDragonSlayer(RW.AchievementPointRequirements.dragonSlayer, dragonSlayer);
        }



        //handle karma data
        if(karma != null) {
            const activeKarmaDiv = document.querySelector(".karma.active");
            const inactiveKarmaDiv = document.querySelector(".karma.inactive");
            //look for a karma cap
            let cap = karmaCap || 4;
            let currKarma = Math.min(karma, cap);
            //compare for column index
            const column = RW.KarmaCapTracker[cap.toString()];
            console.log(column);
            //move to proper index
            activeKarmaDiv.style.backgroundPositionX = 
                inactiveKarmaDiv.style.backgroundPositionX = `${-column * RW.KarmaAtlasSize.width}px`;
            //move dial to proper y position
            //switch the active to the current type
            const offsetY = (9 - currKarma  ) * RW.KarmaAtlasSize.height;
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
                const keys = Object.keys(RW.SpriteAtlasIndex);
                if(keys.indexOf(a.key) > keys.indexOf(b.key)) return 1;
                else return -1;
            });
            for(let killData of kills) {
                //create a kill template
                const killDiv = RW.CreatureKillTemplate.cloneNode(true);
                killDiv.querySelector(".kill-amount").innerHTML = killData.kills;
                killDiv.querySelector(".kill-worth").innerHTML = `x${killData.score}`;

                
                //get the icon
                const position = RW.SpriteAtlasIndex[killData.key];

                const iconDiv = killDiv.querySelector(".creature-icon");
                const x = position.x * RW.SpriteAtlasSize.width;
                const y = position.y * RW.SpriteAtlasSize.height;
                iconDiv.style.backgroundPositionX = `${-x}px`;
                iconDiv.style.backgroundPositionY = `${-y}px`;

                //add a hover
                iconDiv.title = killDiv.querySelector(".kill-amount").title = killData.name;

                //attach to container
                document.querySelector(".creature-kill-container").appendChild(killDiv);

                // return;
            }
        }
    }


    static clear() {
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
