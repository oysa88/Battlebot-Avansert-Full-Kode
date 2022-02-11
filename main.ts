function Fjernkontroll () {
    Hastighet = input.rotation(Rotation.Pitch)
    Svinge = input.rotation(Rotation.Roll)
    radio.sendValue("H", Hastighet)
    radio.sendValue("A", AvPå)
    radio.sendValue("S", Svinge)
}
function Bitbotbil () {
    if (AvPå_Bil) {
        Venstrejustering = Kjør - pins.map(
        Justering,
        0,
        1023,
        Kjør,
        Kjør * -1
        )
        Høyrejustering = Kjør - pins.map(
        Justering,
        0,
        -1023,
        Kjør,
        Kjør * -1
        )
        bitbot.motor(BBMotor.Right, Kjør - Høyrejustering)
        bitbot.motor(BBMotor.Left, Kjør - Venstrejustering)
    } else {
        bitbot.motor(BBMotor.Both, Stopp)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (AvPå) {
        AvPå = 0
    } else {
        AvPå = 1
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "A") {
        AvPå_Bil = value
    }
    if (name == "H") {
        Kjør = value * -22.7
    }
    if (name == "S") {
        Justering = value * -22.7
    }
})
let Høyrejustering = 0
let Justering = 0
let Kjør = 0
let Venstrejustering = 0
let AvPå_Bil = 0
let AvPå = 0
let Svinge = 0
let Hastighet = 0
let Stopp = 0
radio.setGroup(1)
bitbot.ledRainbow()
Stopp = 0
basic.forever(function () {
    Fjernkontroll()
    Bitbotbil()
})
