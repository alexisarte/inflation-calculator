const fs = require('fs');
const rawdata = fs.readFileSync('./bls.json');
const bls = JSON.parse(rawdata);

function findIpc(month, year) {
    return bls.find(e => ((e.month == month) && (e.year == year))).value;
}

function calculatePrice(datos) {
    const ipc1 = findIpc(datos.month1, datos.year1);
    const ipc2 = findIpc(datos.month2, datos.year2);
    return datos.price1 * (ipc2 / ipc1);
}

function validateData(data) {
    let allOk = false;
    const regex = new RegExp(/^\d{0,10}(\.\d{0,2})?$/);
    if (regex.test(data.price1)) {
        let yearsOk = ((data.year1 >= 1913) && (data.year2 >= 1913) && (data.year1 <= 2022) && (data.year2 <= 2022));
        let monthsOk = false;
        if (yearsOk) {
            if ((data.year1 != 2022) && (data.year2 != 2022)) {
                monthsOk = (data.month1 <= 12) && (data.month2 <= 12);
            }
            else if ((data.year1 == 2022) && (data.year2 == 2022)) {
                monthsOk = (data.month1 <= 3) && (data.month2 <= 3);
            }
            else if (data.year1 == 2022) {
                monthsOk = (data.month1 <= 3) && (data.month2 <= 12);
            }
            else {
                monthsOk = (data.month1 <= 12) && (data.month2 <= 3);
            }
        }
        allOk = yearsOk && monthsOk;
    }
    return allOk;
}

module.exports = {
    calculatePrice,
    validateData
}