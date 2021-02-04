const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'migueltafmart',
    password: 'Hola1234$',
    connectionLimit: 5,
    database: 'omdb'
});

exports.userId = async (email) => {
    let conn;
    let payload;
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT userID FROM users WHERE email=?", [email]);
        res = res.pop();
        payload = res;
    } catch (err) {
        console.log(err);
        resultado = null;
    } finally {
        if (conn) conn.end();
        return payload.userID;
    }
};

exports.users = async (email) => {
    let conn;
    let payload;
    let userId = await this.userId(email);
    try {
        conn = await pool.getConnection();
        res = await conn.query("SELECT * FROM users WHERE userID=?;", [userId])
        res = res.pop();
        payload = res;
    } catch (err) {
        console.log(err);
        payload = null;
    } finally {
        if (conn) conn.end();
        return payload;
    }
};
exports.postFavorite = async (email, datasource) => {
    let conn;
    let payload;
    let userId = await this.userId(email);
    try {
        conn = await pool.getConnection();
        res = await conn.query("INSERT INTO favorites (userID, datasource) VALUES (?,?);", [userId, datasource]);
        console.log(res)
        res = res
                .filter(a => typeof a == "object")
                .map(object => object.datasource);
        payload = res;
        console.log (res);
    } catch (err) {
        console.log(err);
        payload = null;
    } finally {
        if (conn) conn.end();
        console.log(payload);
        return payload;
    }
}
exports.deleteFavorite = async (email, datasource) => {
    let conn;
    let payload;
    let userId = await this.userId(email);
    try {
        conn = await pool.getConnection();
        res = await conn.query("DELETE FROM favorites WHERE userID=? AND datasource=? ;", [userId, datasource]);
        console.log(res)
        res = res
                .filter(a => typeof a == "object")
                .map(object => object.datasource);
        payload = res;
        console.log (res);
    } catch (err) {
        console.log(err);
        payload = null;
    } finally {
        if (conn) conn.end();
        console.log(payload);
        return payload;
    }
}
exports.favorites = async (email) => {
    let conn;
    let payload;
    let userId = await this.userId(email);
    try {
        conn = await pool.getConnection();
        res = await conn.query("SELECT datasource FROM favorites WHERE userID=?;", [userId])
        console.log(res)
        res = res
                .filter(a => typeof a == "object")
                .map(object => object.datasource);
        payload = res;
        console.log (res);
    } catch (err) {
        console.log(err);
        payload = null;
    } finally {
        if (conn) conn.end();
        console.log(payload);
        return payload;
    }
};

