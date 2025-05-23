//variables
import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario } from '../funciones';
import DataTable from "datatables.net-bs5";
import { lenguaje } from "../lenguaje";
import { data } from "jquery";

//constantes
const FormProductos = document.getElementById('FormProductos');
const BtnGuardar = document.getElementById('BtnGuardar');
const BtnLimpiar = document.getElementById('BtnLimpiar');
const InputNombreProducto = document.getElementById('producto_nombre');
const InputCantidad = document.getElementById('producto_cantidad');
const SelectCategoria = document.getElementById('producto_categoria');
const SelectPrioridad = document.getElementById('producto_prioridad');

let modoEdicion = false;
let productoEditandoId = null;

const ValidarNombreProducto = () =>{ 
    const nombreProducto = InputNombreProducto.value;
    if (nombreProducto.length < 1) {
        InputNombreProducto.classList.remove('is-valid','is-invalid');
    }else{
        if (nombreProducto.trim() === ''){
            InputNombreProducto.classList.remove('is-valid');
            InputNombreProducto.classList.add('is-invalid');
        } else {
            InputNombreProducto.classList.remove('is-invalid');
            InputNombreProducto.classList.add('is-valid');
        }
    }
}

const ValidarCantidad = () => {
    const cantidad = InputCantidad.value;
    if (cantidad.length < 1) {
        InputCantidad.classList.remove('is-valid', 'is-invalid');
    } else {
        if (parseInt(cantidad) <= 0) {
            InputCantidad.classList.remove('is-valid');
            InputCantidad.classList.add('is-invalid');
        } else {
            InputCantidad.classList.remove('is-invalid');
            InputCantidad.classList.add('is-valid');
        }
    }
}

const ValidarCategoria = () => {
    if (SelectCategoria.value === '') {
        SelectCategoria.classList.remove('is-valid');
        SelectCategoria.classList.add('is-invalid');
    } else {
        SelectCategoria.classList.remove('is-invalid');
        SelectCategoria.classList.add('is-valid');
    }
}

const ValidarPrioridad = () => {
    if (SelectPrioridad.value === '') {
        SelectPrioridad.classList.remove('is-valid');
        SelectPrioridad.classList.add('is-invalid');
    } else {
        SelectPrioridad.classList.remove('is-invalid');
        SelectPrioridad.classList.add('is-valid');
    }
}

const GuardarProducto = async (event) => {
    event.preventDefault();
    BtnGuardar.disabled = true;

    if(!validarFormulario(FormProductos, ['producto_id'])){
        Swal.fire({
            position: "center",
            icon: "info",
            title: "FORMULARIO INCOMPLETO",
            text: "Debe completar todos los campos",
            showConfirmButton: true,
        });
        BtnGuardar.disabled = false;
        return;
    }

    const body = new FormData(FormProductos);
    let url;
    if (modoEdicion && productoEditandoId) {
        url = '/app01_GAH/productos/modificarAPI';
        body.append('producto_id', productoEditandoId);
    } else {
        url = '/app01_GAH/productos/guardarAPI';
    }
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

           if (modoEdicion) {
                CancelarEdicion();
            } else {
                limpiarTodo();
            }
            await BuscarProductos();
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: mensaje,
                showConfirmButton: true,
            });
        } 
    }catch (error){
            console.log(error);
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al procesar la solicitud'
        });
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
            const productosPendientes = data.filter(producto => producto.producto_situacion == 1);
            const productosComprados = data.filter(producto => producto.producto_situacion == 0);
            
            datatable.clear().draw();
            datatable.rows.add(productosPendientes).draw();

            datatableComprados.clear().draw();
            datatableComprados.rows.add(productosComprados).draw();

            const seccionComprados = document.getElementById('SeccionComprados');
            if (productosComprados.length > 0) {
                seccionComprados.style.display = 'block';
            } else {
                seccionComprados.style.display = 'none';
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const EditarProducto = async (id) => {
    if (!id) {
        console.error('No se recibió ID para editar');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo identificar el producto a editar'
        });
        return;
    }
    
    try {
        id = id.toString();
   
        const productos = datatable.data().toArray();
        const producto = productos.find(p => p.producto_id.toString() === id);
        
        if (!producto) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró el producto'
            });
            return;
        }
        InputNombreProducto.value = producto.producto_nombre;
        InputCantidad.value = producto.producto_cantidad;
        SelectCategoria.value = producto.producto_categoria;
        SelectPrioridad.value = producto.producto_prioridad;

        modoEdicion = true;
        productoEditandoId = id;
        
        BtnGuardar.innerHTML = '<i class="bi bi-pencil"></i> Modificar';
        BtnGuardar.classList.remove('btn-success');
        BtnGuardar.classList.add('btn-warning');

        if (!document.getElementById('BtnCancelar')) {
            const btnCancelar = document.createElement('button');
            btnCancelar.type = 'button';
            btnCancelar.id = 'BtnCancelar';
            btnCancelar.className = 'btn btn-danger ms-2';
            btnCancelar.innerHTML = '<i class="bi bi-x-circle"></i> Cancelar';
            btnCancelar.onclick = CancelarEdicion;
            BtnLimpiar.parentNode.insertBefore(btnCancelar, BtnLimpiar.nextSibling);
        }

        ValidarNombreProducto();
        ValidarCantidad();
        ValidarCategoria();
        ValidarPrioridad();

        document.getElementById('FormProductos').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error al editar:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar editar el producto'
        });
    }
}

const CancelarEdicion = () => {
    modoEdicion = false;
    productoEditandoId = null;
    
    // Limpiar formulario
    limpiarTodo();
    
    // Restaurar botón guardar
    BtnGuardar.innerHTML = '<i class="bi bi-plus-circle"></i> Agregar';
    BtnGuardar.classList.remove('btn-warning');
    BtnGuardar.classList.add('btn-success');
    
    // Remover botón cancelar
    const btnCancelar = document.getElementById('BtnCancelar');
    if (btnCancelar) {
        btnCancelar.remove();
    }
}

const MarcarComprado = async (id) => {
    if (!id) {
        console.error('No se recibió ID para marcar como comprado');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo identificar el producto'
        });
        return;
    }
    
    try {
        const resultado = await Swal.fire({
            title: '¿Marcar como comprado?',
            text: "Este producto se moverá a la sección de comprados",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, marcar',
            cancelButtonText: 'Cancelar'
        });

        if (!resultado.isConfirmed) return;

        const formData = new FormData();
        formData.append('producto_id', id.toString());

        const respuesta = await fetch('/app01_GAH/productos/marcarCompradoAPI', {
            method: 'POST',
            body: formData
        });

        const datos = await respuesta.json();
        const { codigo, mensaje } = datos;
        
        if (codigo === 1) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto comprado",
                text: mensaje,
                timer: 2000,
                showConfirmButton: false,
            });
            
            await BuscarProductos();
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: mensaje,
                showConfirmButton: true,
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al marcar el producto'
        });
    }
}

const limpiarTodo = () => {
    FormProductos.reset();
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
    order: [
        [3, 'asc'], 
        [4, 'asc']  
    ],
    columns: [
        {
            title: 'No.',
            data: null,
            width: '5%',
            render: (data, type, row, meta) => meta.row + 1
        },
        { title: 'Producto', data: 'producto_nombre', width: '25%' },
        { title: 'Cantidad', data: 'producto_cantidad', width: '10%' },
        { title: 'Categoría', data: 'categoria_nombre', width: '15%' },
        { 
            title: 'Prioridad', 
            data: 'prioridad_nombre', 
            width: '15%',
            render: function(data, type, row) {
                let claseColor = '';
                switch(row.prioridad_nombre.toLowerCase()) {
                    case 'alta':
                        claseColor = 'text-danger fw-bold';
                        break;
                    case 'media':
                        claseColor = 'text-warning';
                        break;
                    case 'baja':
                        claseColor = 'text-secondary';
                        break;
                }
                return `<span class="${claseColor}">${data}</span>`;
            }
        },
        {
            title: 'Acciones',
            data: null,
            width: '30%',
            orderable: false,
            searchable: false,
            defaultContent: '',
            createdCell: function(td, cellData, rowData, row, col) {
                const id = rowData.producto_id;
                $(td).html(`
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-warning btn-editar" data-id="${id}" title="Editar">
                            <i class="bi bi-pencil-square"></i> Editar
                        </button>
                        <button class="btn btn-success btn-comprado" data-id="${id}" title="Marcar como comprado">
                            <i class="bi bi-check-circle"></i> Comprado
                        </button>
                    </div>
                `);
            }
        }
    ],
    drawCallback: function() {
        $('.btn-editar').off('click');
        $('.btn-comprado').off('click');
        $('.btn-editar').on('click', function() {
            const id = $(this).data('id');
            EditarProducto(id);
        });
        
        $('.btn-comprado').on('click', function() {
            const id = $(this).data('id');
            MarcarComprado(id);
        });
    }
});

const datatableComprados = new DataTable('#TableProductosComprados', {
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
    order: [
        [3, 'asc'], 
        [4, 'asc']  
    ],
    columns: [
        {
            title: 'No.',
            data: 'producto_id',
            width: '15%',
            render: (data, type, row, meta) => meta.row + 1
        },
        { title: 'Producto', data: 'producto_nombre', width: '30%' },
        { title: 'Cantidad', data: 'producto_cantidad', width: '20%' },
        { title: 'Categoría', data: 'categoria_nombre', width: '25%' },
        { title: 'Prioridad', data: 'prioridad_nombre', width: '20%' }
    ]
});

window.MarcarComprado = MarcarComprado;
window.EditarProducto = EditarProducto;

FormProductos.addEventListener('submit', GuardarProducto);
BtnLimpiar.addEventListener('click', limpiarTodo);
InputNombreProducto.addEventListener('change', ValidarNombreProducto);
InputCantidad.addEventListener('change', ValidarCantidad);
SelectCategoria.addEventListener('change', ValidarCategoria);
SelectPrioridad.addEventListener('change', ValidarPrioridad);

document.addEventListener('DOMContentLoaded', async () => {
    await BuscarProductos();    
});