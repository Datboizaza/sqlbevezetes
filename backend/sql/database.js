const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'suloskaja',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

const pool2 = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'categories',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
// async function selectall() {
//     const query = 'SELECT * FROM exampletable;';
//     const [rows] = await pool.execute(query);
//     return rows;
// }

// async function insertInto(nev, ar, finom) {
//     const query = 'INSERT INTO kaja(nev, ar, finom) VALUES (?, ?, ?);';
//     try {
//         const [rows] = await pool.execute(query, [nev, ar, finom]);
//         return rows.insertId;
//     } catch (error) {
//         if (error.code == 'ER_DUP_ENTRY') {
//             throw new Error('Az étel neve vagy finsomsága már létezik az adatbázisban');
//         }
//         throw error;
//     }
// }

// async function selectAvgAr() {
//     try {
//         const query = 'SELECT AVG(ar) FROM kaja';
//         const [rows] = await pool.execute(query);
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }
async function selectAllCateg() {
    const query = 'SELECT * FROM kateg;';
    const [rows] = await pool2.execute(query);
    return rows;
}
async function insertIntoCateg(nev) {
    const query = 'INSERT INTO kateg(nev) VALUES (?);';
    try {
        const [rows] = await pool2.execute(query, [nev]);
        return rows.insertId;
    } catch (error) {
        throw error;
    }
}

async function updateCateg() {
    const query = 'UPDATE kateg(nev) SET (?);';
    try {
        const [rows] = await pool2.execute(query, [nev]);
        return rows.insertId;
    } catch (error) {
        throw error;
    }
}
//!Export
module.exports = {
    // selectall,
    // insertInto,
    // selectAvgAr,
    selectAllCateg,
    insertIntoCateg,
    updateCateg
};
