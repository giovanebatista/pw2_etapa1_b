const chalk = require("chalk")
const calculadora = require("./calculadora")
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
var nota = calculadora.media(5, 5, 5, 6)
