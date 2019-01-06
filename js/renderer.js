const fs = require('fs');

let path = "";
let canWatch = false;



//listen for watch toggle
document.getElementById("watch-toggle").addEventListener("change", e => {
    canWatch = e.target.checked;

    //watch or unwatch
    if(canWatch) {
        watchPath(path);
        //fake change
        let changeEvent = new Event("change");
        document.getElementById("file-upload").dispatchEvent(changeEvent);
    }
    else unwatchPath();
});

//listen for save file change
document.getElementById("file-upload").addEventListener("change", (e) => {

    if(e.target.files == null) return;
    if(e.target.files.length <= 0) return;


    path = e.target.files[0].path;
    if(canWatch)watchPath(path);
    
});


function watchPath() {
    if(path == "") return;

    //try to unwatch before watching
    fs.unwatchFile(path);

    fs.watchFile(path, (curr) => {
        //fake change
        let changeEvent = new Event("change");
        document.getElementById("file-upload").dispatchEvent(changeEvent);
    });

}
function unwatchPath() {
    if(path == "") return;

    fs.unwatchFile(path);
}