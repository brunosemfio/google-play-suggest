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

    for (const letter of alphabet) {

        const query = await querySuggest(`${startTerm}${nospace}${letter}`)

        console.log('---')
        query.forEach(r => { console.log(r) })
        console.log('---')
    }

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