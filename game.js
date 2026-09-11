function update(dt) {
    //the player, dt = delta time (in milliseconds)
    dt = new Decimal(dt).div(1000) //seconds
    if (dt.isNan() || dt.lte(0)) { return }

    //points go up by 10^^(1 + (tetrationPower/1000)) every second
    player.points = player.points.add(funcs.pointsGain().times(dt))
}

ct = Date.now()
let loop = setInterval(function () {

    var t = Date.now() - ct
    ct = Date.now()
    update(typeof (t) == "undefined" ? 0 : t)

    
},1)