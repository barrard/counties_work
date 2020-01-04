const rp = require('request-promise');
let cheerio = require('cheerio')
const fs = require('fs')






module.exports = {
    get_counties_list
}



async function get_counties_list() {
    const counties_json_file = './countires.json'
    let json = fs.readFileSync(counties_json_file)
        if (!json) {
            let counties_html = await rp('https://en.wikipedia.org/wiki/List_of_counties_by_U.S._state_and_territory')
            let $ = cheerio.load(counties_html)
            let state_lists = $('.div-col.columns.column-width')
            console.log(state_lists.length)
            let counties_obj = {}
            state_lists.each((index, element) => {
                let state_county_list = $(element).children().first().children()
                if (!state_county_list) return console.log('NO MORE!! at ' + index)
                state_county_list.each((index, element) => {
                    let county_state = $(element).text()
                    // console.log(county_state)

                    let county = county_state.split(',')[0].trim()
                    let state = county_state.split(',')[1]
                    if (!state) return
                    state = state.trim()
                    // console.log({state, county})
                    if (!counties_obj[state]) {
                        counties_obj[state] = []
                    }
                    counties_obj[state].push(county)
                })


            })
            fs.writeFile(counties_json_file, JSON.stringify(counties_obj), (err, ok) => {
                if (err) console.log(err)
            })

            return counties_obj
        } else {
			// console.log(JSON.parse(json.toString()))
			console.log('already got this')
            return JSON.parse(json.toString())
        }


	



}