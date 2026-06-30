console.log("SCRIPT LOADED");

const SESSION_OPEN_HOUR = 8;
const SESSION_CLOSE_HOUR = 17;

const timer = document.getElementById("sessionTimer");

function formatTime(ms) {

    const total = Math.max(0, Math.floor(ms / 1000));

    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0")
    );
}

function updateTimer() {

    const now = new Date();

    // Current New York time
    const ny = new Date(
        now.toLocaleString("en-US", {
            timeZone: "America/New_York"
        })
    );

    const day = ny.getDay(); // 0 = Sunday, 6 = Saturday

    const todayOpen = new Date(ny);
    todayOpen.setHours(SESSION_OPEN_HOUR, 0, 0, 0);

    const todayClose = new Date(ny);
    todayClose.setHours(SESSION_CLOSE_HOUR, 0, 0, 0);

    // =====================================================
    // WEEKEND
    // =====================================================

    if (day === 6 || day === 0) {

        let nextOpen = new Date(todayOpen);

        if (day === 6) {
            // Saturday -> Monday
            nextOpen.setDate(nextOpen.getDate() + 2);
        } else {
            // Sunday -> Monday
            nextOpen.setDate(nextOpen.getDate() + 1);
        }

        const left = nextOpen - ny;

        timer.innerHTML =
            'NEW YORK SESSION • <span class="weekend">WEEKEND</span> • OPENS IN ' +
            formatTime(left);

        return;
    }

    // =====================================================
    // SESSION OPEN
    // =====================================================

    if (ny >= todayOpen && ny < todayClose) {

        const left = todayClose - ny;

        let marketPhase = "";

        // PRE MARKET (08:00 - 09:29)
        if (
            ny.getHours() < 9 ||
            (ny.getHours() === 9 && ny.getMinutes() < 30)
        ) {
            marketPhase =
                ' <span class="premarket">(PRE MARKET)</span>';
        }

        // POST MARKET (16:00 - 16:59)
        else if (ny.getHours() >= 16) {
            marketPhase =
                ' <span class="postmarket">(POST MARKET)</span>';
        }

        timer.innerHTML =
            'NEW YORK SESSION • <span class="open">OPEN</span>' +
            marketPhase +
            ' • CLOSES IN ' +
            formatTime(left);

    }

    // =====================================================
    // SESSION CLOSED
    // =====================================================

    else {

        let nextOpen = new Date(todayOpen);

        if (ny >= todayClose) {
            nextOpen.setDate(nextOpen.getDate() + 1);
        }

        const left = nextOpen - ny;

        timer.innerHTML =
            'NEW YORK SESSION • <span class="closed">CLOSED</span> • OPENS IN ' +
            formatTime(left);

    }

}

updateTimer();

setInterval(updateTimer, 1000);
