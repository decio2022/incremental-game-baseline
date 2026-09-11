function initPlayer() {
    return {
        version: "1.0.0",
        points: new Decimal(0), //the main currency, gained by 10^^(1+tetrationPower/1000) every second
        tetrationPower: new Decimal(0) //starts at 0, +1 every time you press the button
    }
}

NAME = "baseline_save" //place you want to direct your local storage thing
//change this to sth else to enable saving!!!



player = initPlayer()

const player_vars_d = ["points", "tetrationPower"]
const player_vars_l = []
const player_vars_str = ["version"]

function detectNaN() {
    for (var i in player_vars_d) {
        if (player[player_vars_d[i]].isNan()) { player[player_vars_d[i]] = initPlayer()[player_vars_d[i]] }
    }
    for (var i in player_vars_l) {
        for (var j in player[player_vars_l[i]]) {
            if (player[player_vars_l[i]][j].isNan()) {
                console.log(player[player_vars_l[i]][j])
                player[player_vars_l[i]][j] = initPlayer()[player_vars_l[i]][j]
            }
        }
    }
    for (var i in player_vars_str) {
        if (player[player_vars_str[i]] == NaN) { player[player_vars_str[i]] = initPlayer()[player_vars_str[i]] }
    }
}



function save() {
    detectNaN()
    localStorage.setItem(NAME, JSON.stringify(player))
}

if (NAME != "67") s = setInterval(save, 1000, 1)

function load() {
    var raw = localStorage.getItem(NAME)
    if (raw == undefined || raw == null) { return } //no save yet -> keep the initPlayer() values
    var u = undefined
    try { u = JSON.parse(raw) } catch (e) { console.log("save is corrupted, starting over"); return }
    if (u == undefined || u == null) { return }
    console.log(u)
    for (var i in player_vars_d) {
        var v = player_vars_d[i]
        //keys that aren't in the save (or that broke) fall back to their initPlayer() value
        player[v] = (u[v] == undefined || new Decimal(u[v]).isNan()) ? initPlayer()[v] : new Decimal(u[v])
    }
    for (var i in player_vars_l) {
        player[player_vars_l[i]] = initPlayer()[player_vars_l[i]]
        for (var j in u[player_vars_l[i]]) {
            player[player_vars_l[i]][j] = new Decimal(u[player_vars_l[i]][j])
            if (player[player_vars_l[i]][j].isNan()) { player[player_vars_l[i]][j] = initPlayer()[player_vars_l[i]][j] }
        }
    }
    for (var i in player_vars_str) {
        player[player_vars_str[i]] = u[player_vars_str[i]]
        if (player[player_vars_str[i]] == undefined) {
            if (player_vars_str[i] == "version") { //old save revert
                //idk
            }
            else {
                player[player_vars_str[i]] = initPlayer()[player_vars_str[i]]
            }
        }
    }
}


const banks =
    [
            ]

load()
player.version = "1.0.0"

function bank(num) {
    if (confirm("Are you sure you want to use this save? This will OVERRIDE your progress!")) {
        clearInterval(s)
        localStorage.setItem(NAME, banks[num])
        location.reload()
    }
}

function import_player(data) {
    console.log(data)
    if (confirm("Are you sure you want to use this save to override the previous save?")) {
        clearInterval(s)
        localStorage.setItem(NAME, data)
        location.reload()
    }
}