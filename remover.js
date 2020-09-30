const adsId = ["primis_playerSekindoSPlayer", "10FastFingers_300x250", "ad_unit", "sticky-footer", "google_ads"];

function removeAds() {
    let all = document.getElementsByTagName("div");
    let ads = [];
    for (obj of all) {
        for (id of adsId) {
            if (obj.id.indexOf(id) != -1)
                ads.push(obj);
        }
    }

    console.log("ads: " + ads)

    for (let i = 0; i < ads.length; i++)
        ads[i].setAttribute("style", "display: none")
}


removeAds();


setInterval(() => { removeAds() }, 100)


