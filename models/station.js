const db = require('../db')

class Station {

    static getAll (){
        let sql = `select * from service_stations limit 400;`
    
        return db.query(sql)
    }

    static getOwners(){
    let sql = 'select distinct owner, count(name) from service_stations group by owner order by count(name) desc;'
    return db.query(sql).then(result => {
        return result.rows
      })
    }
    
    static getRandom(){
        let ranStation = Math.floor(Math.random() * 5244)

        let sql = `select * from service_stations where id = $1;`
        return db.query(sql, [ranStation]).then(ran => ran.rows)
    }



}

module.exports = Station