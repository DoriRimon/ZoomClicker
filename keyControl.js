var presses = {};
var videos = document.getElementsByTagName("video");
var buttons = document.getElementsByTagName("button");
const buttonClass = "vjs-play-control vjs-control vjs-button";

document.addEventListener("keydown", event => {
    presses[event.key] = (event.type == "keydown");
    
    if (presses["Control"]) {
        if (presses["ArrowUp"]) {
            if (videos[videos.length - 1].playbackRate < 8) {
                videos[videos.length - 1].playbackRate += 0.25;
                console.clear();
                console.log("playbackRate = " + videos[videos.length - 1].playbackRate);
            }
        }
        else if (presses["ArrowDown"]) {
            if (videos[videos.length - 1].playbackRate >= 0.5) {
                videos[videos.length - 1].playbackRate -= 0.25;
                console.clear();
                console.log("playbackRate = " + videos[videos.length - 1].playbackRate);
            }
        }
        else if (presses["ArrowRight"]) {
            if (videos[videos.length - 1].currentTime < videos[videos.length - 1].duration - 5)
                videos[videos.length - 1].currentTime += 5;
        }
        else if (presses["ArrowLeft"]) {
            if (videos[videos.length - 1].currentTime > 5)
                videos[videos.length - 1].currentTime -= 5;
        }
    }
});

document.addEventListener("keyup", event => {
    presses[event.key] = (event.type == "keydown");
});

document.addEventListener("keypress", event => {
    if (event.key == " ") {
        let playButton = null;
        for (button of buttons) {
            if (button.className.indexOf(buttonClass) != -1) {
                playButton = button;
                break;
            }
        }
        if (playButton != null)
            playButton.click();
    }
});


