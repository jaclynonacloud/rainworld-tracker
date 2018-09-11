import Log from './Log';

export default class Score {
    constructor() {
        Score.data = null;

        document.querySelector(".current-score .btn-stats").addEventListener("click", () => {
            if(Score.data == null) return;
            Log.show(Score.data);
        });

        document.querySelector(".current-score .btn-close").addEventListener("click", () => {
            Score.hide(); 
        });
    }

    static show(data) {
        const score = (data != null) ? Log.compute(data) : 0;
        document.querySelector(".current-score .score").innerHTML = score;
        document.querySelector(".current-score").classList.remove("hide");
        Score.data = data;
    }

    static hide() {
        Score.data = null;
        document.querySelector(".current-score").classList.add("hide");
    }
}