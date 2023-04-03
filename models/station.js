const db = require('../db')

class Station {

    static getAll (){
        let sql = `select * from service_stations limit 400;`
    
        return db.query(sql)
    }




}

module.exports = Station