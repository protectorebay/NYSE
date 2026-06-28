const SESSION_OPEN_HOUR = 8;
const SESSION_CLOSE_HOUR = 17;

const timer = document.getElementById("sessionTimer");

function formatTime(ms){

    const total = Math.floor(ms / 1000);

    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    return (
        String(hours).padStart(2,"0") + ":" +
        String(minutes).padStart(2,"0") + ":" +
        String(seconds).padStart(2,"0")
    );
}

function updateTimer(){

    const now = new Date();

    // čas v New Yorku
    const nyString = now.toLocaleString("en-US",{
        timeZone:"America/New_York"
    });

    const ny = new Date(nyString);

    const hour = ny.getHours();
    const minute = ny.getMinutes();
    const second = ny.getSeconds();

    const todayOpen = new Date(ny);
    todayOpen.setHours(SESSION_OPEN_HOUR,0,0,0);

    const todayClose = new Date(ny);
    todayClose.setHours(SESSION_CLOSE_HOUR,0,0,0);

    if(ny >= todayOpen && ny < todayClose){

        const left = todayClose - ny;

        timer.innerHTML =
        'NEW YORK SESSION • <span class="open">OPEN</span> • CLOSES IN ' +
        formatTime(left);

    }else{

        let nextOpen = new Date(todayOpen);

        if(ny >= todayClose){
            nextOpen.setDate(nextOpen.getDate()+1);
        }

        const left = nextOpen - ny;

        timer.innerHTML =
        'NEW YORK SESSION • <span class="closed">CLOSED</span> • OPENS IN ' +
        formatTime(left);

    }

}

updateTimer();

setInterval(updateTimer,1000);
