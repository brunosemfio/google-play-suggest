'use strict'

const gplay = require('google-play-scraper')

const readline = require('readline-sync')

const argv = require("yargs").argv;

async function start() {

    const country = argv.c ? argv.c : 'br';

    const lang = argv.l ? argv.l : 'pt';

    const nospace = argv.ns ? '' : ' ';

    const alphabet = [...' abcdefghijklmnopqrstuvwxyz']

    const startTerm = await askAndReturnQueryTerm()

    const searchTerms = alphabet.map(async i => await querySuggest(`${startTerm}${nospace}${i}`))

    const result = await Promise.all(searchTerms)

    console.log('---')

    result.forEach(r => {
        r.forEach(t => console.log(t))
        console.log('---')
    })

    async function askAndReturnQueryTerm() {
        return readline.question('Search term: ')
    }

    async function querySuggest(searchTerm) {
        return gplay.suggest({
            term: searchTerm.trim(),
            country: country,
            lang: lang,
        })
    }
}

start()
