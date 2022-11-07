'use STRICT'
var i = 0;
var array_eventos = new Array();
window.onload = function () {
    create_dates(i);
}

/*He modificado el comportamiento del ejercicio, para que en vez de necesitar poner la cantidad de eventos que va a tener el mes, lo haga de manera
dinámica, teniendo event listeners todos los TD de cada tabla de mes creada. La página se inicializa en el mes actual*/
function create_dates(i) {
    var flag = true;
    var date;
    var year;
    var month;
    if (flag) {
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth();
        flag = false;
    }
    month = date.getMonth() + i;
    if (month >= 0 || month <= 11) {
        date = new Date(date.getFullYear(), (date.getMonth() + i));
        year = date.getFullYear();
        month = date.getMonth();
    } else if (month > 11) {
        date = new Date(date.getFullYear() + 1, 0);
        year = date.getFullYear();
        month = date.getMonth();
        i = 0;
    } else if (month < 0) {
        date = new Date(date.getFullYear() - 1, 11);
        year = date.getFullYear();
        month = date.getMonth();
        i = 11;
    }
    array_eventos[[year,month]] = CargarCalendario(date, year, month, calculo_lineas(year, month), day_quantity(year, month));
    array_eventos.forEach(evento =>console.log(evento.innerHTML));
}

//Posicion del primer día del mes
function initial_day_placement(year, month) {
    var data = new Date(year, month, 1).getDay()
    if (data == 0) {
        return true;
    } else {
        return false;
    }
}

//Calculo de cuantos días tiene un mes
function day_quantity(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

//Actualizar el mes en el que nos encontramos 
function change_month_up() {
    i++;
    create_dates(i);
}

function change_month_down() {
    i--;
    create_dates(i);
}

//Calculo de lineas para la creacion del calendario.
//Recibe la cantidad de días y la posición que ocupa en el dia de la semana el primer día del mes
function calculo_lineas(year, month) {
    if (initial_day_placement(year, month)) {
        return Math.ceil(day_quantity(year, month) / 7) + 1;
    } else {
        return Math.ceil(day_quantity(year, month) / 7);
    }
}

//La idea era almacenar los event listeners en un array global, y recargarlo cada vez que vuelva al mismo contador de mes y año que correspondería
//con su coordenada, pero no me ha dado tiempo.
function CargarCalendario(date, year, month, filas, dias) {
    document.body.innerHTML = ""
    var tabla = document.createElement("table");
    th = document.createElement("th");
    th.colSpan = 7;

    bt_down = document.createElement("button");
    bt_down.id = "btn_down";
    bt_down.innerHTML = "<--";

    bt_up = document.createElement("button");
    bt_up.id = "btn_up";
    bt_up.innerHTML = "-->";

    th.appendChild(bt_down);
    th.appendChild(document.createTextNode(date.toLocaleString('default', { month: 'long' }).toUpperCase() + " " + year));
    th.appendChild(bt_up);
    tabla.appendChild(th);

    var contador = 1;
    var flag = initial_day_placement(year, month);

    for (var i = 0; i <= filas; i++) {
        tr = document.createElement("tr");
        tabla.appendChild(tr);
        for (var j = 0; j < 7; j++) {
            td = document.createElement("td");
            if (contador <= dias) {
                if (flag && j < 6) {
                    td.appendChild(document.createTextNode(""));
                    tr.appendChild(td);
                    tabla.appendChild(tr);
                    if (j == 5) {
                        flag = false;
                    }
                } else {
                    td.appendChild(document.createTextNode(contador));
                    tr.appendChild(td);
                    tabla.appendChild(tr);
                    contador++;
                }
            }
        }
    }
    document.body.appendChild(tabla);
    var btn_up_listener = document.getElementById("btn_up");
    var btn_down_listener = document.getElementById("btn_down");
    btn_up_listener.addEventListener("click", change_month_up)
    btn_down_listener.addEventListener("click", change_month_down);
    return listeners = document.querySelectorAll('td').forEach(td => {
        td.addEventListener("click", function () {
            td.innerHTML= "<a href='#'>"+td.innerHTML+"</a>";
            td.style.backgroundColor="white";
        })
    });
}