//variables
import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario } from '../funciones';
import DataTable from "datatables.net-bs5";
import { lenguaje } from "../lenguaje";
import { data, event } from "jquery";


//constantes
const FormProductos = document.getElementById('FormProductos');
const BtnGuardar = document.getElementById('BtnGuardar');
const BtnModificar = document.getElementById('BtnModificar');
const BtnLimpiar = document.getElementById('BtnLimpiar');
const InputNombreProducto = document.getElementById('producto_nombre');
const InputCantidad = document.getElementById('producto_cantidad');
const SelectCategoria = document.getElementById('producto_categoria');
const SelectPrioridad = document.getElementById('producto_prioridad');


//funcion para validar nombre
const ValidarNombreProducto = () =>{ 
    const nombreProducto = InputNombreProducto.value;

    if (nombreProducto.length < 1) {
        InputNombreProducto.classList.remove('is-valid','is-invalid');
    }else{
        if (nombreProducto.trim() === '') {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Revise el nombre del producto",
                text: "El nombre del producto no puede estar vacío",
                showConfirmButton: true,
            });

            InputNombreProducto.classList.remove('is-valid');
            InputNombreProducto.classList.add('is-invalid');
        }else {
            InputNombreProducto.classList.remove('is-invalid');
            InputNombreProducto.classList.add('is-valid');
        }
    }
}

//funcion para validar cantidad
const ValidarCantidad = () => {
    const cantidad = InputCantidad.value;

    if (cantidad.length < 1) {
        InputCantidad.classList.remove('is-valid', 'is-invalid');
    } else {
        if (parseInt(cantidad) <= 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Revise la cantidad",
                text: "La cantidad debe ser mayor a 0",
                showConfirmButton: true,
            });

            InputCantidad.classList.remove('is-valid');
            InputCantidad.classList.add('is-invalid');
        } else {
            InputCantidad.classList.remove('is-invalid');
            InputCantidad.classList.add('is-valid');
        }
    }
}

//funcion GuardarProducto
const GuardarProducto = async (event) => {
    event.preventDefault();
    BtnGuardar.disabled = true;

    if(!validarFormulario(FormProductos, ['producto_id'])){
        Swal.fire({
            position: "center",
            icon: "info",
            title: "FORMULARIO INCOMPLETO",
            text: "Debe de validar todos los campos",
            showConfirmButton: true,
        });
        BtnGuardar.disabled = false;
        return;
    }

    const body = new FormData(FormProductos);
    const url = 'http://localhost:9002/app01_GAH/productos/guardarAPI';
    const config = {
        method: 'POST',
        body
    }
    try {
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        const { codigo, mensaje } = datos;
        
        if (codigo === 1){
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Éxito",
                text: mensaje,
                showConfirmButton: true,
            });

            limpiarTodo();
            BuscarProductos();
        } else {
            await Swal.fire({
                position: "center",
                icon: "info",
                title: "Error",
                text: mensaje,
                showConfirmButton: true,
            });
        } 
    }catch (error){
            console.log(error);
        }
        BtnGuardar.disabled = false;
}

const BuscarProductos = async () => {
    const url = '/app01_GAH/productos/buscarAPI';
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        const { codigo, mensaje, data } = datos;

        if (codigo == 1) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Éxito",
                text: mensaje,
                showConfirmButton: true,
            });

            datatable.clear().draw();
            datatable.rows.add(data).draw();
        } else {
            await Swal.fire({
                position: "center",
                icon: "info",
                title: "Error",
                text: mensaje,
                showConfirmButton: true,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const limpiarTodo = () => {
    FormProductos.reset();
    BtnGuardar.classList.remove('d-none');
    BtnModificar.classList.add('d-none');
    
    // Remover clases de validación
    InputNombreProducto.classList.remove('is-valid', 'is-invalid');
    InputCantidad.classList.remove('is-valid', 'is-invalid');
    SelectCategoria.classList.remove('is-valid', 'is-invalid');
    SelectPrioridad.classList.remove('is-valid', 'is-invalid');
}

const datatable = new DataTable('#TableProductos', {
    dom: `
        <"row mt-3 justify-content-between" 
            <"col" l> 
            <"col" B> 
            <"col-3" f>
        >
        t
        <"row mt-3 justify-content-between" 
            <"col-md-3 d-flex align-items-center" i> 
            <"col-md-8 d-flex justify-content-end" p>
        >
    `,
    language: lenguaje,
    data: [],
    columns: [
        {
            title: 'No.',
            data: 'producto_id',
            width: '5%',
            render: (data, type, row, meta) => meta.row + 1
        },
        { title: 'Producto', data: 'producto_nombre', width: '20%' },
        { title: 'Cantidad', data: 'producto_cantidad', width: '10%' },
        { title: 'Categoría', data: 'categoria_nombre', width: '15%' },
        { title: 'Prioridad', data: 'prioridad_nombre', width: '15%' },
        { 
            title: 'Estado', 
            data: 'producto_situacion', 
            width: '15%',
            render: (data, type, row) => {
                const estado = row.producto_situacion;
                if (estado == 1) {
                    return '<span class="badge bg-warning">Pendiente</span>';
                } else {
                    return '<span class="badge bg-success">Comprado</span>';
                }
            }
        }
    ]
});
// Inicialización - Cargar productos al abrir la página
BuscarProductos();

// Event Listeners
FormProductos.addEventListener('submit', GuardarProducto);
BtnLimpiar.addEventListener('click', limpiarTodo);
InputNombreProducto.addEventListener('change', ValidarNombreProducto);
InputCantidad.addEventListener('change', ValidarCantidad);
