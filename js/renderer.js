const fs = require('fs');

let path = "";
let canWatch = false;


const watchEvent = (curr) => {
    //fake change
    let changeEvent = new Event("change");
    document.getElementById("file-upload").dispatchEvent(changeEvent);
};


//listen for watch toggle
document.getElementById("watch-toggle").addEventListener("change", e => {
    canWatch = e.target.checked;

    //watch or unwatch
    if(canWatch) {
        watchPath(path, watchEvent);
        //fake change
        let changeEvent = new Event("change");
        document.getElementById("file-upload").dispatchEvent(changeEvent);
    }
    else unwatchPath(path, watchEvent);
});

//listen for save file change
document.getElementById("file-upload").addEventListener("change", (e) => {

    if(e.target.files == null) return;
    if(e.target.files.length <= 0) return;


    path = e.target.files[0].path;
    if(canWatch)watchPath(p, watchEvent);
    
});


function watchPath(p, event) {
    if(p == "") return;

    fs.watchFile(path, event);

}
function unwatchPath(p, event) {
    if(p == "") return;

    fs.unwatchFile(p, event);
}