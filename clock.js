const clockcontainer = document.querySelector(".js-clock"),
      clockTitle = clockcontainer.querySelector("h1");
      // you don`t have to add everytime const just use ,

function getTime ()
{
    const date = new Date(); //  function where you can get the Date
    const minutes = date.getMinutes(); //function
    const hours = date.getHours();
    const seconds=date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}`: hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds}`; // that we already define above (Mini-if)
}
function init()
{
    getTime();
    setInterval(getTime,1000); // to continue update the time
}

init(); // always add set-up 
