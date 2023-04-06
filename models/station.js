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
    
    static getStats() {
        let sql = 'select distinct owner, count(name) from service_stations group by owner having count(name) > 80 order by count(name) desc;'
        return db.query(sql).then(result => {
            return result.rows
         })
     }
    
    static getRandom(){
        let ranStation = Math.floor(Math.random() * 5244)

        let sql = `select * from service_stations where id = $1;`
        return db.query(sql, [ranStation]).then(ran => ran.rows)
    }

    static getTotals() {
        const sql = 'select count(distinct owner) as total_owners, count(id) as total_stations from service_stations;'
        return db.query(sql).then(result => result.rows)
    }

    static getNearest(lat, lng, radiusInMeters) {
          //hardcode map center,  work out radius for sql statement, return them in json
        // let radiusInMeters = Number(req.query.rad)
        // let lat = parseFloat(req.query.lat)
        // let lng = parseFloat(req.query.lng)
        // const earthRadiusKm = 6371.01;
        // // convert radius to radians
        // const radiusRad = (radiusInMeters * 1000) / earthRadiusKm;
        // // calculate min and max latitude and longitude values
        // const minLat = lat - radiusRad;
        // const maxLat = lat + radiusRad;
        // const minLng = lng - (radiusRad / Math.cos(lat * Math.PI / 180));
        // const maxLng = lng + (radiusRad / Math.cos(lat * Math.PI / 180));
        const limit = 700;


        const sql = `select *, earth_distance(ll_to_earth($1::float, $2::float), ll_to_earth(s.lat::float, s.long::float)) as distance from service_stations s where earth_distance(ll_to_earth($1::float, $2::float), ll_to_earth(s.lat::float, s.long::float)) < $3 order by distance asc limit $4;`

        return db.query(sql, [lat, lng, radiusInMeters, limit])
    }

    static getWithinBounds(neLat, neLng, swLat, swLng) {
        let sql = `select * from service_stations where lat between $1 and $2 and long between $3 and $4;`;
        
        return db.query(sql, [swLat, neLat, swLng, neLng]).then(dbRes => dbRes.rows)
    }




}

module.exports = Station