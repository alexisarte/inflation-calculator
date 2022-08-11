const fs = require('fs');
const rawdata = fs.readFileSync('./bls.json');
const bls = JSON.parse(rawdata);
const LAST_YEAR = bls[bls.length - 1].year;
const FIRST_YEAR = bls[0].year;

function findIpc(month, year) {
    return bls.find(e => ((e.month == month) && (e.year == year))).value;
}

function calculatePrice(datos) {
    const ipc1 = findIpc(datos.month1, datos.year1);
    const ipc2 = findIpc(datos.month2, datos.year2);
    return datos.price1 * (ipc2 / ipc1);
}

function validateData(data) {
    let monthsOk, yearsOk;
    const regex = new RegExp(/^\d{0,10}(\.\d{0,2})?$/);
    if (regex.test(data.price1)) {
        yearsOk = (((data.year1 && data.year2) >= FIRST_YEAR) && (data.year1 && data.year2 <= LAST_YEAR));
        if (yearsOk) {
            if (data.year1 != LAST_YEAR && data.year2 != LAST_YEAR) {
                monthsOk = data.month1 <= 12 && data.month2 <= 12;
            } else if (data.year1 == LAST_YEAR && data.year2 == LAST_YEAR) {
                monthsOk = data.month1 <= 3 && data.month2 <= 3;
            } else if (data.year1 == LAST_YEAR) {
                monthsOk = data.month1 <= 3 && data.month2 <= 12;
            } else {
                monthsOk = data.month1 <= 12 && data.month2 <= 3;
            }
        } 
    }
    return yearsOk && monthsOk;
}

module.exports = {
    calculatePrice,
    validateData
}