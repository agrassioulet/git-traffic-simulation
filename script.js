const btnStart = document.getElementById("btn-start")
const btnStop = document.getElementById("btn-stop")
const divRedFire = document.getElementById("redfire")
const divOrangeFire = document.getElementById("orangefire")
const divGreenFire = document.getElementById("greenfire")
var intervalID

const vehicle = document.querySelector(".lane-1 .vehicle")

btnStart.onclick = (e) => {
    e.preventDefault()
    intervalID = setInterval(updateState, 10)
}

btnStop.onclick = (e) => {
    e.preventDefault()
    clearInterval(intervalID);
}

const stoplightState = {
    "state": "orange",
    "timer" : 1
}
updateStoplight("orange")

// PARTIE FONCTIONS //
function updateState() {
    var str = vehicle.style.left
    var str=str.replace("px","")
    var nbr=Number(str)
    if(stoplightState.state == "green" || nbr != 450) {

        nbr++
        vehicle.style.left = nbr + "px"
    }
    

    updateStateStoplight()
    
}


function updateStateStoplight() {
    var timer = stoplightState.timer

    if (timer == 0) {
        switch (stoplightState.state) {
            case 'red':
                stoplightState.timer = 200
                stoplightState.state = "green"
                updateStoplight("green")
                break;
            case 'orange':
                stoplightState.timer = 700
                stoplightState.state = "red"
                updateStoplight("red")
                break
            case 'green':
                stoplightState.timer = 700
                stoplightState.state = "orange"
                updateStoplight("orange")
                break
            default:
                console.log("Error in updateState");
        }
    }
    stoplightState.timer = stoplightState.timer - 1
}



function updateStoplight(color) {
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

// fonctions pour actualiser le dom plus rapidemment
// function ml(tagName, props, nest) {
//     var el = document.createElement(tagName);
//     if (props) {
//         for (var name in props) {
//             if (name.indexOf("on") === 0) {
//                 el.addEventListener(name.substr(2).toLowerCase(), props[name], false)
//             } else {
//                 el.setAttribute(name, props[name]);
//             }
//         }
//     }
//     if (!nest) {
//         return el;
//     }
//     return nester(el, nest)
// }

// function nester(el, n) {
//     if (typeof n === "string") {
//         var t = document.createTextNode(n);
//         el.appendChild(t);
//     } else if (n instanceof Array) {
//         for (var i = 0; i < n.length; i++) {
//             if (typeof n[i] === "string") {
//                 var t = document.createTextNode(n[i]);
//                 el.appendChild(t);
//             } else if (n[i] instanceof Node) {
//                 el.appendChild(n[i]);
//             }
//         }
//     } else if (n instanceof Node) {
//         el.appendChild(n)
//     }
//     return el;
// }