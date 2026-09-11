//you can create more of those things, like
/**
 * const rebirth = {
 * rp_gain: function(){return player.points.add(1).slog().add(1).slog().add(1).pow(595959).sub(1)},
 * rp_effect: function(){return new Decimal(67)}
 * 
 * }
 */

const funcs = {
    goo: function(){return "idk"},

    //the height of the tetration, so: 1 + (tetrationPower / 1000)
    //0 tetration power -> 1, 1000 tetration power -> 2, 2000 -> 3, ...
    tetrationHeight: function () {
        return new Decimal(1).add(player.tetrationPower.div(1000))
    },

    //how many points you get every second: 10^^(1 + (tetrationPower / 1000))
    pointsGain: function () {
        return new Decimal(10).tetrate(funcs.tetrationHeight())
    },

    //what the button does
    addTetrationPower: function () {
        player.tetrationPower = player.tetrationPower.add(1)
    }
}