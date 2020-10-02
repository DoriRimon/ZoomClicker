var presses = {};
var videos = document.getElementsByTagName("video");
var buttons = document.getElementsByTagName("button");
const buttonClass = "vjs-play-control vjs-control vjs-button";
const videoClass = "player-panel-l";
const iconSize = 70;
const speedUp = chrome.runtime.getURL("images/speed_up.png")

document.addEventListener("keydown", event => {
    presses[event.key] = (event.type == "keydown");
    
    if (presses["Control"]) {
        if (presses["ArrowUp"]) {
            if (videos[videos.length - 1].playbackRate < 8) {
                videos[videos.length - 1].playbackRate += 0.25;
                console.clear();
                console.log("playbackRate = " + videos[videos.length - 1].playbackRate);
                addIcon(speedUp);
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

function addIcon(imgSrc) {
    addCss();
    let vidClass = document.getElementsByClassName(videoClass);
    if (vidClass.length == 0)
        return;
    let vidDiv = vidClass[0];
    let img = document.createElement("img");
    img.alt = "Icon";
    img.src = imgSrc;
    vidDiv.appendChild(img);
    img.classList.add('icon');
    setTimeout(() => {
        img.classList.add('transitionOn');
    }, 20);
}

function addCss() {
    let width = videos[videos.length - 1]
    let styles = `
    .icon {
        width: ${iconSize}px;
        height: ${iconSize}px;
        position: absolute;
        margin-top: 155px;
        opacity: 1;
        -webkit-transition: 0.6s ease-in-out;
        -moz-transition: 0.6s ease-in-out;
        -o-transition: 0.6s ease-in-out;
        transition: 0.6s ease-in-out;
    }
    .icon.transitionOn {
        opacity: 0;
        width: ${iconSize * 1.5}px;
        height: ${iconSize * 1.5}px;
    }
    `

    let styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
}


