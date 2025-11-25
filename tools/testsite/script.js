//UPPGIFT 1 - A NIVÅ

let kast = []
let sekvenser = [0, 0, [], []]
let antal = [0, 0]
for (let i = 0; i < 50; i++) {
    kast.push(Math.round(Math.random()))
    console.log(kast[i])
    sekvenser[kast[i]] += 1
    if (kast.length > 1 && kast[i] != kast[i - 1]) {
        sekvenser[kast[i - 1] + 2].push(sekvenser[kast[i - 1]])
        sekvenser[kast[i - 1]] = 0
    }
    antal[kast[i]] += 1
}
console.log("Antal nollor: " + antal[0])
console.log("Antal nollor: " + antal[1])
console.log("Längsta sekvens med 0: " + Math.max(...sekvenser[2]))
console.log("Längsta sekvens med 1: " + Math.max(...sekvenser[3]))

//-------------------------------------------------------------------
//UPPGIFT 2 - A NIVÅ

let a = input()
let b = input()
let likhet = testaLikhet(a, b)
console.log(likhet)

function testaLikhet(a, b) {
    let likhet = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] == b[i]) {
            likhet += 1
        } else {
            break
        }
    }
    return Math.round(likhet / Math.max(a.length, b.length) * 100)
}

//--------------------------------------------------------------------
//UPPGIFT 3 - A NIVÅ


