const todayForm = document.querySelector(".js-today");

function getToday()
{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2,'0');
    const mm = String(today.getMonth() + 1).padStart(2,'0');
    const yyyy = today.getFullYear();
    const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    const day = weekday[today.getDay()];
    todayForm.innerText = `${dd} / ${mm} / ${yyyy} (${day})`;
}


function init()
{
    getToday();
}

init();