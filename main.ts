input.onButtonPressed(Button.A, function () {
    basic.showString(" H ")
    basic.showNumber(totalHeads)
})
input.onGesture(Gesture.TiltLeft, function () {
    // will display a proportion of heads to flips
    led.plotBarGraph(
    totalHeads,
    totalFlips
    )
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(totalFlips)
})
input.onButtonPressed(Button.B, function () {
    basic.showString(" T ")
    basic.showNumber(totalTails)
})
input.onGesture(Gesture.Shake, function () {
    if (start == 1) {
        flip = randint(0, 1)
        totalFlips += 1
        if (flip == 0) {
            totalHeads += 1
            basic.showLeds(`
                # . . # .
                # . . # .
                # # # # .
                # . . # .
                # . . # .
                `)
        } else {
            totalTails += 1
            basic.showLeds(`
                # # # # #
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `)
        }
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "start") {
        start = value
        if (start == 1) {
            totalFlips = 0
            totalHeads = 0
            totalTails = 0
            // Play stuff here
            music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.OnceInBackground)
        } else {
            music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.OnceInBackground)
            control.waitMicros(randint(0, 2000))
            radio.sendValue("count", totalFlips)
            music.playTone(784, music.beat(BeatFraction.Sixteenth))
        }
    }
})
let flip = 0
let start = 0
let totalTails = 0
let totalFlips = 0
let totalHeads = 0
radio.setGroup(10)
