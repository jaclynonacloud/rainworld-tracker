import * as RW from "./constants";

export default class Log {
    constructor() {
        Log.rankItems = [];
        Log.score = 0;
        Log.multiplier = 1;

        document.querySelector(".log .btn-close").addEventListener("click", () => {
            Log.hide(); 
        });
    }
    static show(data) {
        document.querySelector(".log").classList.remove("hide");
        Log.compute(data);
    }
    static hide() {
        document.querySelector(".log").classList.add("hide");
    }
    static compute(data) {
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
        Log.addRankItem("Time", data.totalTimeRaw, -1, (data.totalTimeRaw != null) ? -(data.totalTimeRaw / 60) : 0);
        //delivered payload
        if(data.deliveredPayload)
            Log.addRankItem("Delivered Payload", data.deliveredPayload ? 100 : 0, 1);
        //helped pebbles
        if(data.helpedPebbles)
            Log.addRankItem("Helped Five Pebbles", data.helpedPebbles ? 40 : 0, 1);
        //ascended
        if(data.ascended)
            Log.addRankItem("Ascended", data.ascended ? 300 : 0, 1);
        Log._computeScore();

        //show total before creatures
        Log.addTotalItem(Log.getTotalScore());

        //creatures
        if(data.kills != null) {
            for(let i = 0 ; i < data.kills.length; i++) {
                const killItemData = data.kills[i];
                Log.addRankItem(`${killItemData.name} kill(s)`, killItemData.kills, killItemData.score);
            }
        }
        Log._computeScore();
        //show total before multiplier
        Log.addTotalItem(Log.getTotalScore());

        //achievements
        const score = Log.getTotalScore();
        let multiplier = 1;
        for(let achievement of [data.survivor, data.wanderer, data.chieftain, data.monk, data.scholar, 
            data.outlaw, data.dragonSlayer, data.hunter, data.friend, data.saint]) 
        {
            if(achievement != null) {
                if(achievement.completed) {
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

    static getKillsScore(data) {
        let score = 0;
        if(data.kills != null) {
            for(let i = 0 ; i < data.kills.length; i++) {
                const killItemData = data.kills[i];
                score += killItemData.kills * killItemData.score;
            }
        }
        return score;
    }

    static addRankItem(name, amount, value=0, handfeedScore=0, isMultiplier=false) {
        const score = (handfeedScore != 0) ? handfeedScore : amount * value;
        //get div
        const div = RW.LogItemTemplate.cloneNode(true);
        const titleDiv = div.querySelector(".title");
        const amountDiv = div.querySelector(".amount");
        const valueDiv =  div.querySelector(".value");
        const totalDiv = div.querySelector(".total");
        titleDiv.innerHTML = name;
        amountDiv.innerHTML = (amount == "") ? "" : `x ${amount}`;
        if(value != 0)
            valueDiv.innerHTML = `@ ${value}`;
        totalDiv.innerHTML = Math.floor(score);

        //check for negative scores
        if(valueDiv.innerHTML.indexOf("-") != -1) valueDiv.classList.add("negative");
        if(totalDiv.innerHTML.indexOf("-") != -1) totalDiv.classList.add("negative");

        //push into container
        document.querySelector(".log .log-list").appendChild(div);

        if(!isMultiplier) Log.rankItems.push({name, score});
        else Log.multiplier++;
    }
    static addTotalItem(score) {
        const div = RW.LogItemTotalTemplate.cloneNode(true);
        div.querySelector(".total").innerHTML = score;

        //push into container
        document.querySelector(".log .log-list").appendChild(div);
    }

    static getTotalScore() {
        let score = 0;
        for(let item of Log.rankItems) score += parseInt(item.score);
        return score;
    }

    static getFinalScore() {
        return Log.score;
    }

    static _computeScore() {
        Log.score += Log.getTotalScore();
    }

    static clear() {
        Log.rankItems = [];
        Log.score = 0;
        Log.multiplier = 1;
        document.querySelector(".log .log-list").innerHTML = "";
    }
}