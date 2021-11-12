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
        bitbot.motor(BBMotor.Left, Stopp)
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
    if (name == "H") {
        Kjør = value
    }
    if (name == "A") {
        AvPå_Bil = value
    }
    if (name == "S") {
        Justering = value
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
let Radionummer = 1
radio.setGroup(Radionummer)
bitbot.ledRainbow()
Stopp = 0
basic.forever(function () {
    Fjernkontroll()
    Bitbotbil()
})
