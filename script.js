const btnStart = document.getElementById("btn-start")
const btnStop = document.getElementById("btn-stop")
const btnAddVehicle = document.getElementById("btn-add-vehicle")

const divRedFire = document.getElementById("redfire")
const divOrangeFire = document.getElementById("orangefire")
const divGreenFire = document.getElementById("greenfire")
var intervalID

const vehicle = document.querySelector(".lane-1 .vehicle")
var vehicles = []


btnStart.onclick = (e) => {
    e.preventDefault()
    intervalID = setInterval(updateState, 10)
}

btnStop.onclick = (e) => {
    e.preventDefault()
    clearInterval(intervalID);
}

btnAddVehicle.onclick = (e) => {
    e.preventDefault()
    vehicles.push({"position" : 0})
}

const stoplightState = {}
// Init stoplight
stoplightState.timer = 200
stoplightState.state = "green"
updateDisplayStoplight("green")



// PARTIE FONCTIONS //
function updateState() {
    var str = vehicle.style.left
    var str=str.replace("px","")
    var nbr=Number(str)
    if(stoplightState.state == "green" || nbr != 350) {

        nbr++
        vehicle.style.left = nbr + "px"
    }
    
    updateStoplight()
    
}


function updateStoplight() {
    var timer = stoplightState.timer

    if (timer == 0) {
        switch (stoplightState.state) {
            case 'red':
                // Le feu était rouge, on passe au vert
                stoplightState.timer = 200
                stoplightState.state = "green"
                updateDisplayStoplight("green")
                break;
            case 'orange':
                 // Le feu était orange, on passe au rouge
                stoplightState.timer = 400
                stoplightState.state = "red"
                updateDisplayStoplight("red")
                break
            case 'green':
                stoplightState.timer = 100
                stoplightState.state = "orange"
                updateDisplayStoplight("orange")
                break
            default:
                console.log("Error in updateState");
        }
    }
    stoplightState.timer = stoplightState.timer - 1
}



function updateDisplayStoplight(color) {
    switch (color) {
        case 'red':
            divRedFire.setAttribute("state", "active")
            divGreenFire.setAttribute("state", "inactive")
            divOrangeFire.setAttribute("state", "inactive")
            break
        case 'orange':
            divRedFire.setAttribute("state", "inactive")
            divGreenFire.setAttribute("state", "inactive")
            divOrangeFire.setAttribute("state", "active")
            break
        case 'green':
            divRedFire.setAttribute("state", "inactive")
            divGreenFire.setAttribute("state", "active")
            divOrangeFire.setAttribute("state", "inactive")
            break
        default:
            console.log("Error");
    }
}

