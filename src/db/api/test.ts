const words = require('../words.json')
const y = words.filter(a => a.hasOwnProperty('freq_deg')).sort((a, b) =>  a.freq_deg + b.freq_deg )
console.log(y[0]) //5666 = plus gros freq