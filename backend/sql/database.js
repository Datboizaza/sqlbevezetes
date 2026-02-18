const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'iskola',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries

async function allDiak() {
    const query = 'SELECT nev, osztaly FROM diak;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function idLekerdez(diak_id) {
    const query =
        'SELECT jegy.tantargy, jegy.jegy, tanar.nev, jegy.datum FROM jegy JOIN diak ON jegy.diak_Id = diak.id JOIN tanar ON jegy.tanar_id = tanar.id  WHERE diak_id = ?;';
    try {
        const [rows] = await pool.execute(query, [diak_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

//!Export
module.exports = {
    // selectall,
    // insertInto,
    // selectAvgAr,
    allDiak,
    idLekerdez
};
