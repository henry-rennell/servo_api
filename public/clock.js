export function setClock() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = d.getDay();
    let str = "";

    function checkAmPm() {
        if (dayjs().format('HH') < 11) {
            return 'AM' 
        }
        return 'PM'
    }

    str = `${days[day]} ${dayjs().format('HH:mm:ss')} ${checkAmPm()}`
    document.querySelector(".date").innerHTML = str;
}

