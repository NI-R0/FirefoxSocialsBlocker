// Time constraints: block if current HOUR is NOT in [start, end)
const CONSTRAINTS = {
    "https://www.instagram.com/": { start: 15, end: 22 },
    "https://www.instagram.com/explore/": { start: 0, end: 0 },
    "https://www.instagram.com/reels/": { start: 0, end: 0 },
    "https://www.youtube.com/shorts/": { start: 0, end: 0 },
    "https://www.reddit.com/": { start: 15, end: 22 },
};

function isHourInRange(start, end){
    const currentHour = new Date().getHours();
    return (start <= currentHour && currentHour < end)
}

function isBlockedUrl(url) {

    for (const [site, { start, end }] of Object.entries(CONSTRAINTS)) {
        //As reddit can be quite helpful sometimes, we only block homepage browsing
        if (site == "https://www.reddit.com/"){
            if (url == site){
                if (!isHourInRange(start, end)){
                    return true
                }
            }
            continue;
        }

        if (url.startsWith(site)) {
            if (!isHourInRange(start, end)){
                return true
            }
        }
    }

    return false;
}
