//variables
import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario } from '../funciones';
import DataTable from "datatables.net-bs5";
import { lenguaje } from "../lenguaje";

//constantes
const FormProductos = document.getElementById('FormProductos');
const BtnGuardar = document.getElementById('BtnGuardar');
const BtnLimpiar = document.getElementById('BtnLimpiar');
const InputNombreProducto = document.getElementById('producto_nombre');
const InputCantidad = document.getElementById('producto_cantidad');
const SelectCategoria = document.getElementById('producto_categoria');
const SelectPrioridad = document.getElementById('producto_prioridad');


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

const CargarCategorias = async () => {
    try {
        const respuesta = await fetch('/app01_GAH/productos/categoriasAPI');
        const datos = await respuesta.json();
        const { codigo, data } = datos;

        if (codigo === 1) {
            SelectCategoria.innerHTML = '<option value="">Seleccionar categoría</option>';
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.categoria_id;
                option.textContent = categoria.categoria_nombre;
                SelectCategoria.appendChild(option);
            });
        }
    } catch (error) {
        console.log('Error cargando categorías:', error);
    }
}


const CargarPrioridades = async () => {
    try {
        const prioridades = [
            { prioridad_id: 1, prioridad_nombre: 'Alta' },
            { prioridad_id: 2, prioridad_nombre: 'Media' },
            { prioridad_id: 3, prioridad_nombre: 'Baja' }
        ];

        SelectPrioridad.innerHTML = '<option value="">Seleccionar prioridad</option>';
        prioridades.forEach(prioridad => {
            const option = document.createElement('option');
            option.value = prioridad.prioridad_id;
            option.textContent = prioridad.prioridad_nombre;
            SelectPrioridad.appendChild(option);
        });
    } catch (error) {
        console.log('Error cargando prioridades:', error);
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
            text: "Debe de validar todos los campos",
            showConfirmButton: true,
        });
        BtnGuardar.disabled = false;
        return;
    }

    const body = new FormData(FormProductos);
    const url = '/app01_GAH/productos/guardarAPI';
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
            
            datatable.clear().draw();
            datatable.rows.add(productosPendientes).draw();
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

const BuscarProductosComprados = async () => {
    const url = '/app01_GAH/productos/buscarAPI';
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        const { codigo, mensaje, data } = datos;

        if (codigo == 1) {
            const productosComprados = data.filter(producto => producto.producto_situacion == 0);
            
            if (datatableComprados) {
                datatableComprados.clear().draw();
                datatableComprados.rows.add(productosComprados).draw();
            }

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

const limpiarTodo = () => {
    FormProductos.reset();
    BtnGuardar.classList.remove('d-none');
    BtnModificar.classList.add('d-none');

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
        },
        {
            title: 'Acciones',
            data: 'producto_id',
            width: '20%',
            orderable: false,
            render: (data, type, row) => {
                let botones = '';
                
                // Solo mostrar botón "Marcar Comprado" si está pendiente
                if (row.producto_situacion == 1) {
                    botones += `
                        <button class="btn btn-sm btn-success me-1" onclick="MarcarComprado(${data})" title="Marcar como comprado">
                            <i class="bi bi-check-circle"></i>
                        </button>
                        <button class="btn btn-sm btn-warning me-1" onclick="ModificarProducto(${data})" title="Modificar producto">
                            <i class="bi bi-pencil"></i>
                        </button>
                    `;
                }
                
                // Botón eliminar siempre disponible
                botones += `
                    <button class="btn btn-sm btn-danger" onclick="EliminarProducto(${data})" title="Eliminar producto">
                        <i class="bi bi-trash"></i>
                    </button>
                `;
                
                return `<div class="btn-group" role="group">${botones}</div>`;
            }
        }
    ]
});

let datatableComprados;

const MarcarComprado = async (id) => {
    try {
        const formData = new FormData();
        formData.append('producto_id', id);

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
            await BuscarProductosComprados(); 
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
        await Swal.fire({
            position: "center",
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo marcar el producto como comprado",
            showConfirmButton: true,
        });
    }
}

// Función para eliminar producto 
const EliminarProducto = async (id) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            const respuesta = await fetch(`/app01_GAH/productos/EliminarAPI?id=${id}`, {
            method: 'GET'
            });

            const datos = await respuesta.json();
            console.log(datos)
            const { codigo, mensaje } = datos;
            
            if (codigo === 1) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Eliminado",
                    text: mensaje,
                    timer: 2000,
                    showConfirmButton: false,
                });
                
                await BuscarProductos();
                await BuscarProductosComprados();
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
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo eliminar el producto",
                showConfirmButton: true,
            });
        }
    }
}

const ModificarProducto = async (id) => {
    try {
        // Buscar el producto para prellenar el formulario
        const respuesta = await fetch('/app01_GAH/productos/buscarAPI');
        const datos = await respuesta.json();
        
        if (datos.codigo === 1) {
            const producto = datos.data.find(p => p.producto_id == id);
            
            if (producto) {
                // Prellenar formulario
                document.getElementById('producto_id').value = producto.producto_id;
                document.getElementById('producto_nombre').value = producto.producto_nombre;
                document.getElementById('producto_cantidad').value = producto.producto_cantidad;
                document.getElementById('producto_categoria').value = producto.producto_categoria;
                document.getElementById('producto_prioridad').value = producto.producto_prioridad;
                
                // Cambiar botones
                BtnGuardar.classList.add('d-none');
                BtnModificar.classList.remove('d-none');
                
                // Scroll hacia arriba
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            text: "No se pudo cargar la información del producto",
            showConfirmButton: true,
        });
    }
}

const ModificarProductoSubmit = async (event) => {
    event.preventDefault();
    BtnModificar.disabled = true;

    if (!validarFormulario(FormProductos, [''])) {
        Swal.fire({
            position: "center",
            icon: "info",
            title: "FORMULARIO INCOMPLETO",
            text: "Debe de validar todos los campos",
            showConfirmButton: true,
        });
        BtnModificar.disabled = false;
        return;
    }

    const body = new FormData(FormProductos);
    const url = '/app01_GAH/productos/modificarAPI';
    const config = {
        method: 'POST',
        body
    }

    try {
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        const { codigo, mensaje } = datos;

        if (codigo === 1) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Éxito",
                text: mensaje,
                showConfirmButton: true,
            });

            limpiarTodo();
            await BuscarProductos();
            await BuscarProductosComprados();
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
    }
    BtnModificar.disabled = false;
}

const inicializarTablaComprados = () => {
    datatableComprados = new DataTable('#TableProductosComprados', {
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
            [3, 'asc'], // Categoría primero
            [4, 'asc']  // Prioridad segundo
        ],
        columns: [
            {
                title: 'No.',
                data: 'producto_id',
                width: '5%',
                render: (data, type, row, meta) => meta.row + 1
            },
            { title: 'Producto', data: 'producto_nombre', width: '25%' },
            { title: 'Cantidad', data: 'producto_cantidad', width: '15%' },
            { title: 'Categoría', data: 'categoria_nombre', width: '20%' },
            { title: 'Prioridad', data: 'prioridad_nombre', width: '20%' },
            {
                title: 'Acciones',
                data: 'producto_id',
                width: '15%',
                orderable: false,
                render: (data, type, row) => {
                    return `
                        <button class="btn btn-sm btn-danger" onclick="EliminarProducto(${data})" title="Eliminar producto">
                            <i class="bi bi-trash"></i>
                        </button>
                    `;
                }
            }
        ]
    });
}


window.MarcarComprado = MarcarComprado;
window.EliminarProducto = EliminarProducto;
window.ModificarProducto = ModificarProducto;

FormProductos.addEventListener('submit', GuardarProducto);
BtnLimpiar.addEventListener('click', limpiarTodo);
BtnModificar.addEventListener('click', ModificarProductoSubmit);
InputNombreProducto.addEventListener('change', ValidarNombreProducto);
InputCantidad.addEventListener('change', ValidarCantidad);

document.addEventListener('DOMContentLoaded', async () => {
    await CargarCategorias();
    await CargarPrioridades();
    inicializarTablaComprados();
    await BuscarProductos();
    await BuscarProductosComprados();
});