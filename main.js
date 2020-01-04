let get_counties_list = require('./get_counties.js')


main()


async function main(){
    console.log('get list')
    let counties = await get_counties_list.get_counties_list()
    console.log(counties)
}