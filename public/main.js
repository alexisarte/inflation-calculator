const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function changeMonths(init, end, select) {
    for (let i = init; i <= end; i++) {
        let option = document.createElement('option');
        option.textContent = MONTHS[i - 1];
        option.value = i;
        select.appendChild(option);
    }
}

//Actualiza la cantidad de meses en los selectores
function updateMonths() {
    // select salva el selector de meses que vamos a actualizar, hay dos de ellos
    let select, selectedMonth, numberOfMonths;
    select = this.id == 'year1' ? document.getElementById('month1') : document.getElementById('month2');
    selectedMonth = select.value;
    numberOfMonths = this.value == 2022 ? 3 : 12;
    //Si numberOfMonths es distinto a la cant actual del selector a modificar, actualizar la cant de meses y salvar el valor anterior, sino no es necesario!
    if (numberOfMonths != select.childElementCount) {
        while (select.firstChild != null) {
            select.firstChild.remove();
        }
        //Crea 3 o 12 meses posibles en el selector segun corrresponda
        changeMonths(1, numberOfMonths, select);
        //Si al value seleccionado anteriormente sigue siendo valido en el rango actual que seria numberOfMonths, seleccionar ese value, sino pone 1 por def
        if (selectedMonth <= numberOfMonths) {
            select.value = selectedMonth;
        }
    }
}

//Opciones para select de mes incial (1-3 porque el año por defecto es 2022)
function addMonths() {
    let selects = document.querySelectorAll('.month');
    selects.forEach(select => {
        changeMonths(1, 12, select);
    });
}
//Opciones para select de año (1913-2022)
function addYears() {
    let selects = document.querySelectorAll('.year');
    selects.forEach(select => {
        for (let i = 1913; i <= 2022; i++) {
            let option = document.createElement('option');
            option.textContent = i;
            option.value = i;
            select.appendChild(option);
        }
    });
}

function showPrice(data) {
    document.getElementById('price2').value = data.precio;
}

function postFetch() {
    const data = {
        month1: document.getElementById('month1').value,
        month2: document.getElementById('month2').value,
        year1: document.getElementById('year1').value,
        year2: document.getElementById('year2').value,
        price1: document.getElementById('price1').value,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch('/api', options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                document.getElementById('price2').value = '';
                alert('Los datos ingresados son invalidos');
                throw new Error('Invalid data');
            }
        })
        .then(json => showPrice(json))
        .catch(err => console.log(err));
}

window.onload = function () {
    addYears();
    addMonths();
    document.querySelectorAll('.year').forEach(item => {
        item.addEventListener('change', updateMonths);
    });
    document.getElementById('send').addEventListener('click', postFetch);
};
