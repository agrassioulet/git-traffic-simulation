// Positionnement des constantes
const stopline = document.querySelector(".stop-line-lane-1")
const STOP_POSITION = getPixelNumber(getComputedStyle(stopline, null).left) - 150
const TIMER_RED_FIRE = 500
const TIMER_GREEN_FIRE = 500
const TIMER_ORANGE_FIRE = 50


// Sélection des éléments HTML
const btnStart = document.getElementById("btn-start")
const btnStop = document.getElementById("btn-stop")
const btnAddVehicle = document.getElementById("btn-add-vehicle")
const divRedFire = document.getElementById("redfire")
const divOrangeFire = document.getElementById("orangefire")
const divGreenFire = document.getElementById("greenfire")
const lane1 = document.querySelector(".lane-1")

// Variables internes au programme
var vehicles = []
var intervalID


// Init stoplight
const stoplightState = {}
stoplightState.timer = 200
stoplightState.state = "green"
updateDisplayStoplight("green")


// Init buttons
btnStart.onclick = (e) => {
    e.preventDefault()
    intervalID = setInterval(updateState, 1)
}

btnStop.onclick = (e) => {
    e.preventDefault()
    clearInterval(intervalID);
}

btnAddVehicle.onclick = (e) => {
    e.preventDefault()
    var count = vehicles.push({ "position": 0, "index": undefined })
    var nexIndex = count - 1
    vehicles[nexIndex].index = nexIndex
    var vehicle = ml("div", { id: (document.querySelectorAll(".lane-1 .vehicle").length) }, "")
    vehicle.style.left = "-50px"
    vehicle.classList.add("vehicle")
    vehicle.classList.add("car")
    lane1.appendChild(vehicle)
    if (!canVehicleProgress(vehicle, document.querySelectorAll(".lane-1 .vehicle"))) {
        lane1.removeChild(vehicle)
    }

}


// PARTIE FONCTIONS //
function updateState() {


    updateStateVehicles()
    updateStoplight()

}


function updateStoplight() {
    var timer = stoplightState.timer

    if (timer == 0) {
        switch (stoplightState.state) {
            case 'red':
                // Le feu était rouge, on passe au vert
                stoplightState.timer = TIMER_GREEN_FIRE
                stoplightState.state = "green"
                updateDisplayStoplight("green")
                break;
            case 'orange':
                // Le feu était orange, on passe au rouge
                stoplightState.timer = TIMER_RED_FIRE
                stoplightState.state = "red"
                updateDisplayStoplight("red")
                break
            case 'green':
                stoplightState.timer = TIMER_ORANGE_FIRE
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


function canVehicleProgress(vehicle, list_vehicles) {
    var str = vehicle.style.left
    var position = getPixelNumber(str)
    var targetPosition = 10000

    list_vehicles.forEach(nextVehicule => {
        if (nextVehicule != vehicle) {
            var testPosition = getPixelNumber(nextVehicule.style.left)
            if (testPosition >= position) {
                var diff1 = testPosition - position
                var diff2 = targetPosition - position
                if (diff1 < diff2) {
                    targetPosition = testPosition
                }
            }
        }
    })

    var diff = targetPosition - position
    if (diff < 155)
        return false
    else
        return true
}

function getPixelNumber(str) {
    return Number(str.replace("px", ""))
}


function updateStateVehicles() {
    var list_vehicles = document.querySelectorAll(".lane-1 .vehicle")
    list_vehicles.forEach(vehicle => {
        var str = vehicle.style.left
        var position = getPixelNumber(str)
        var widthScreen = getPixelNumber(getComputedStyle(document.body).width)
        
        // test si le véhicule est toujours dans l'écran
        if(position < 1.25 * widthScreen) {
            // Test si le véhicule peut progresser ou non
            var canProgress = canVehicleProgress(vehicle, list_vehicles)
            if ((stoplightState.state == "green" || position != STOP_POSITION) && canProgress == true) {
                position++
                position++
                vehicle.style.left = position + "px"
            }
        }
        else {
            lane1.removeChild(vehicle)
        }
    })
}


// Functions for fast dom
function ml(tagName, props, nest) {
    var el = document.createElement(tagName);
    if (props) {
        for (var name in props) {
            if (name.indexOf("on") === 0) {
                el.addEventListener(name.substr(2).toLowerCase(), props[name], false)
            } else {
                el.setAttribute(name, props[name]);
            }
        }
    }
    if (!nest) {
        return el;
    }
    return nester(el, nest)
}

function nester(el, n) {
    if (typeof n === "string") {
        var t = document.createTextNode(n);
        el.appendChild(t);
    } else if (n instanceof Array) {
        for (var i = 0; i < n.length; i++) {
            if (typeof n[i] === "string") {
                var t = document.createTextNode(n[i]);
                el.appendChild(t);
            } else if (n[i] instanceof Node) {
                el.appendChild(n[i]);
            }
        }
    } else if (n instanceof Node) {
        el.appendChild(n)
    }
    return el;
}