const db = require('../db')

class Station {

    static getAll (){
        let sql = `select * from service_stations limit 400;`
    
        return db.query(sql)
    }

    static getOwners(){
    let sql = 'select distinct owner from service_stations;'
    return db.query(sql).then(result => {
        return result.rows.map(row => row.owner)
      })
    }
    




}

module.exports = Station