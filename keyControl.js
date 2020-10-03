var presses = {};
var videos = document.getElementsByTagName("video");
var buttons = document.getElementsByTagName("button");
const buttonClass = "vjs-play-control vjs-control vjs-button";
const videoClass = "player-panel-l";
const iconSize = 70;
const speedUp = chrome.runtime.getURL("images/speed_up.png");
const speedDown = chrome.runtime.getURL("images/speed_down.png");
const fastForward = chrome.runtime.getURL("images/fast_forward.png");
const fastBackward = chrome.runtime.getURL("images/fast_backward.png");

document.addEventListener("keydown", event => {
    presses[event.key] = (event.type == "keydown");
    
    if (presses["Control"]) {
        if (presses["ArrowUp"]) {
            if (videos[videos.length - 1].playbackRate < 8) {
                videos[videos.length - 1].playbackRate += 0.25;
                console.clear();
                console.log("playbackRate = " + videos[videos.length - 1].playbackRate);
                injectIcon(speedUp);
            }
        }
        else if (presses["ArrowDown"]) {
            if (videos[videos.length - 1].playbackRate >= 0.5) {
                videos[videos.length - 1].playbackRate -= 0.25;
                console.clear();
                console.log("playbackRate = " + videos[videos.length - 1].playbackRate);
                injectIcon(speedDown);
            }
        }
        else if (presses["ArrowRight"]) {
            if (videos[videos.length - 1].currentTime < videos[videos.length - 1].duration - 5)
                videos[videos.length - 1].currentTime += 5;
                injectIcon(fastForward);
        }
        else if (presses["ArrowLeft"]) {
            if (videos[videos.length - 1].currentTime > 5)
                videos[videos.length - 1].currentTime -= 5;
                injectIcon(fastBackward);
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

function injectIcon(imgSrc) {
    let flag = false;
    for (s of document.getElementsByTagName("style")) {
        if (s.id == "mystylesheet")
            s.remove();
    }
    injectCss();
    for (i of document.getElementsByTagName("img")) {
        if (i.classList.contains("myicon"))
            i.remove();
    }
    let vidClass = document.getElementsByClassName(videoClass);
    if (vidClass.length == 0)
        return;
    let vidDiv = vidClass[0];
    let img = document.createElement("img");
    img.alt = "Icon";
    img.src = imgSrc;
    vidDiv.appendChild(img);
    img.classList.add("myicon");
    setTimeout(() => {
        img.classList.add("transitionOn");
    }, 5);
}

function injectCss() {
    let height = document.getElementsByClassName("player-share")[0].offsetHeight;
    let styles = `
    .myicon {
        width: ${iconSize}px;
        height: ${iconSize}px;
        position: absolute;
        margin-top: ${(height / 2) - (iconSize / 2)}px;
        opacity: 1;
        transition: 0.6s ease-in-out;
    }
    .myicon.transitionOn {
        opacity: 0;
        width: ${iconSize * 1.5}px;
        height: ${iconSize * 1.5}px;
        margin-top: ${(height / 2) - (iconSize / 2) - (0.25 * iconSize)}px;
    }
    `

    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    styleSheet.id = "mystylesheet";
    document.head.appendChild(styleSheet);
}


