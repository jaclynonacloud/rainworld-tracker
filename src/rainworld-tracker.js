import Log from './Log';
import * as RW from "./constants";
import Parser from "./Parser";
import Layout from "./layout";
import Score from "./Score";


new Log();
new Score();

let rainworldData;


//listen for save file change
document.getElementById("file-upload").addEventListener("change", (e) => {
    //if we have a value, fetch and send
    if(e.target.files.length <= 0) return;

    //try to parse
    var fileReader = new FileReader();
    fileReader.onload = (ev) => {
        // console.log(fileReader.result);
        const data = Parser.parse(fileReader.result);
        Layout.show(data);
        rainworldData = data;

        //set the name in the text
        document.querySelector(".file-input .name").innerHTML = e.target.files[0].name;

        //set preview
        document.getElementById("rank-preview").innerHTML = Log.compute(rainworldData);
        document.getElementById("kills-preview").innerHTML = Log.getKillsScore(rainworldData);
    };
    fileReader.readAsText(e.target.files[0]);
});



document.querySelector(".btn-calculate").addEventListener("click", () => {
    Score.show(rainworldData);
});
document.querySelector(".btn-sample").addEventListener("click", () => {
    //show sample file
    fetch('sav-comp.txt')
    .then(function(blob) {
        return blob.text();
    })
    .then(function(txt) {
        //parse out hunter data
        const data = Parser.parse(txt);
        rainworldData = data;
        Layout.show(data);

        //set preview
        document.getElementById("rank-preview").innerHTML = Log.compute(rainworldData);
        document.getElementById("kills-preview").innerHTML = Log.getKillsScore(rainworldData);
    });
});




/*------------- LAYOUT ----------------*/

