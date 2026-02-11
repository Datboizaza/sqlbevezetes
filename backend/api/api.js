const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
// router.get('/testsql', async (request, response) => {
//     try {
//         const selectall = await database.selectall();
//         response.status(200).json({
//             message: 'Ez a végpont működik.',
//             results: selectall
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

// router.post('/insertInto', async (request, response) => {
//     const body = request.body;
//     try {
//         const insertInto = await database.insertInto(body.nev, body.ar, body.finom);
//         response.status(200).json({
//             message: 'Ez a végpont működik.',
//             insertId: insertInto
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

// router.get('/avgAr', async (request, response) => {
//     try {
//         const selectAvg = await database.selectAvgAr();
//         response.status(200).json({
//             message: 'Ez a végpont működik.',
//             results: selectAvg
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

router.get('/categories', async (request, response) => {
    try {
        const selectall = await database.selectAllCateg();
        response.status(200).json({
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/categories', async (request, response) => {
    const body = request.body;
    try {
        const insertInto = await database.insertIntoCateg(body.nev);
        response.status(200).json({
            insertId: insertInto
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/updatecategories/:id', async (request, response) => {
    const body = request.body;
    try {
        const update = await database.updateCateg(body.nev);
        response.status(200).json({
            insertId: update
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
