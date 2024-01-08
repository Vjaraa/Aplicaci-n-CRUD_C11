//adquirimos los elementos del DOM donde vamos a ingresar los datos de usuario:
//declaramos constantes que son variables que no cambian en el tiempo//
const formReg = document.getElementById('formRegister');
const formMod = document.getElementById('formModifier');
const nameinput = document.getElementById('nameinput');
const emailinput = document.getElementById('emailinput');

const phoneinput = document.getElementById('phoneinput');
const carreerinput = document.getElementById('carreerinput');
const campusinput = document.getElementById('campusinput');

const nameinput_mod = document.getElementById('nameinput_mod');
const emailinput_mod = document.getElementById('emailinput_mod');

const phoneinput_mod = document.getElementById('phoneinput_mod');
const carreerinput_mod = document.getElementById('carreerinput_mod');
const campusinput_mod = document.getElementById('campusinput_mod');

const addModal = document.getElementById("addModal");
const editModal = document.getElementById("modifyModal");
const btn = document.getElementById("addStudent");
const span = document.getElementsByClassName("close")[0];
const editSpan = document.getElementById("editclose");

const btnCancel = document.getElementById("resetbutton");
const btnEdit = document.getElementById("editbutton");
const btnCancelEdit = document.getElementById("editresetbutton");



//donde vamos a pintar los datos de Usuario//
const tablebody = document.getElementById('tablebody');

// Para almacenar estos datos en el localStore, al actualizar, no se borre la info:
// Se crea una variable "let" que es dinamica, con el nombre "data" porque será nuesta base de datos
// Json.parse porque esos datos los adquirimos y convertimos en objetos almacenables como los arrays
// Guardamos en localStore en el navegador bajo la función formData() que son los datos de nuestro formulario:

let data = JSON.parse(localStorage.getItem('formData')) || [];

// When the user clicks the button, open the addModal 
btn.onclick = function () {
    console.log('CLICK');
    addModal.style.display = "block";
}

// When the user clicks on <span> (x), close the addModal
span.onclick = function () {
    addModal.style.display = "none";
}

editSpan.onclick = function (){
    editModal.style.display = "none";
}

// When the user clicks anywhere outside of the addModal, close it
window.onclick = function (event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}

// Creamos funcion para que al evento "submit" click al boton (agregar), almacene la información en memoria
formReg.addEventListener('submit', function (event) {

    //elimina comportamientos por defecto del formulario
    event.preventDefault();

    const name = nameinput.value;
    const email = emailinput.value;
    const phone = phoneinput.value;
    const carreer = carreerinput.value;
    const campus = campusinput.value;

    if (name && email && phone && carreer && campus) {
        const newData = { name, email, phone, carreer, campus};
        data.push(newData);
        console.log('Variable data: ' +  JSON.stringify(data));
        saveDataToLocalStorage();
        renderTable();
        addModal.style.display = "none";
        //Función para borrar y volver a iniciar de JavaScript no se necesita crear
        formReg.reset();
    } else {
        alert('Favor llenar todos los campos');

    }
})


btnCancel.onclick = function () {
    formReg.reset();
    addModal.style.display = "none";
}

btnCancelEdit.onclick = function () {
    formMod.reset();
    editModal.style.display = "none";
}




//Función para guardar los datos del formulario:
function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

//Función para renderizar o actualizar el formulario, limpia el contenido de la tabla para nuevo registro:
function renderTable() {
    tablebody.innerHTML = '';

    //Para generar todos los registros del formulario en una tabla necesitamos iterar el "data" (toda la información) y crear la tabla
    // compuesta de un item e index, cada elemento tendrá su puesto en la tabla.
    data.forEach(function (item, index) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');

        const phoneCell = document.createElement('td');
        const carreerCell = document.createElement('td');
        const campusCell = document.createElement('td');



        const actionCell = document.createElement('td');

        // Dentro de la celda "action" o acciones creamos dos botones un editar y otro eliminar.
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        // Agregamos el contenido de la celda, texto para name y email.
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        phoneCell.textContent = item.phone;
        carreerCell.textContent = item.carreer;
        campusCell.textContent = item.campus;

        // Agregamos el texto en los botones.    
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

        // asignamos las clases a los botones que aparecen en la celda "acciones".
        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--terciary');

        // Eventos de escucha con funciones para los botones de la celda "acciones" editar y eliminar.
        editButton.addEventListener('click', function () {
            editData(index);
            
        })

        deleteButton.addEventListener('click', function () {
            deleteData(index);
        })

        // Agregamos los botones a la celda de acciones.
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Creamos las filas o celdas para los textos que capture en la data:
        row.appendChild(nameCell);
        row.appendChild(emailCell);

        row.appendChild(phoneCell);
        row.appendChild(carreerCell);
        row.appendChild(campusCell);

        row.appendChild(actionCell);
        

        // Creamos las filas para nuestro tablebody "la que aparece con la data":
        tablebody.appendChild(row);

    })
}

// Confección de las funciones de editar y eliminar
function editData(index) {

    editModal.style.display = "block";

    const item = data[index];

    nameinput_mod.value = item.name;
    emailinput_mod.value = item.email;
    phoneinput_mod.value = item.phone;
    carreerinput_mod.value = item.carreer;
    campusinput_mod.value = item.campus;

    btnEdit.onclick = function () {

        const name = nameinput_mod.value;
        const email = emailinput_mod.value;
        const phone = phoneinput_mod.value;
        const carreer = carreerinput_mod.value;
        const campus = campusinput_mod.value;



        data.splice(index, 1);


        const newData = { name, email, phone, carreer, campus};
        data.push(newData);
        console.log('Variable data en funcion editar : ' +  JSON.stringify(data));
        saveDataToLocalStorage();
        renderTable();
    }
    
   /*  data.splice(index, 1);
    console.log('Click en editar, objeto data: ' + JSON.stringify(data));

    saveDataToLocalStorage();
    renderTable(); */
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();