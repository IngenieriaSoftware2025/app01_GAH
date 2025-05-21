<div class="container py-5">
    <div class="row mb-5 justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-lg border-0 rounded-4">
                <div class="card-body" style="background: linear-gradient(45deg, #212529, #495057);">
                    <div class="mb-4 text-center">
                        <h5 class="fw-bold text-warning mb-2">Administra tu lista de compras semanal de manera eficiente.</h5>
                        <h3 class="fw-bold text-white mb-0">Ir a mi Lista de Compras</h3>
                    </div>
                    <form id="FormUsuarios" class="p-4 bg-dark bg-opacity-75 rounded-3 shadow-sm border border-secondary">
                        <input type="hidden" id="producto_id" name="producto_id">
                        <div class="row g-4 mb-3">

                            <div class="col-md-6">
                                <label for="producto_nombre" class="form-label text-white">Nombre del producto</label>
                                <input type="text" class="form-control form-control-lg bg-dark bg-opacity-50 text-white border-secondary" id="producto_nombre" name="producto_nombre" placeholder="producto">
                            </div>

                            <div class="col-md-6">
                                <label for="producto_cantidad" class="form-label text-white">Cantidad a comprar</label>
                                <input type="number" class="form-control form-control-lg bg-dark bg-opacity-50 text-white border-secondary" id="producto_cantidad" name="producto_cantidad" placeholder="cantidad">
                            </div>

                        </div>

                        <div class="row g-4 mb-3"> 
                        <div class="col-md-6">
                            <label for="producto_categoria" class="form-label text-white"></label>
                            <select name="producto_categoria" class="form-select form-select-lg bg-dark bg-opacity-50 text-white border-secondary" id="producto_categoria">
                                <option value="">-- Seleccione una categoria --</option>
                                <option value="A">Alimento</option>
                                <option value="H">Higene</option>
                                <option value="C">Hogar</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label for="producto_prioridad" class="form-label text-white"></label>
                            <select name="producto_prioridad" class="form-select form-select-lg bg-dark bg-opacity-50 text-white border-secondary" id="producto_prioridad">
                                <option value="">-- Prioridad del producto --</option>
                                <option value="A">Alta</option>
                                <option value="M">Mediana</option>
                                <option value="B">Baja</option>
                            </select>
                        </div>
                        </div>

                        <div class="d-flex justify-content-center gap-3">
                            <button class="btn btn-success btn-lg px-4 shadow" type="submit" id="BtnGuardar">
                                <i class="bi bi-save me-2"></i>Guardar
                            </button>
                            <button class="btn btn-warning btn-lg px-4 shadow d-none" type="button" id="BtnModificar">
                                <i class="bi bi-pencil-square me-2"></i>Modificar
                            </button>
                            <button class="btn btn-secondary btn-lg px-4 shadow" type="reset" id="BtnLimpiar">
                                <i class="bi bi-eraser me-2"></i>Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row justify-content-center mt-5">
        <div class="col-lg-11">
            <div class="card shadow-lg border-0 rounded-4">
                <div class="card-body" style="background: linear-gradient(45deg, #212529, #495057);">
                    <h3 class="text-center text-white mb-4">Listado de Productos</h3>
                    <div class="table-responsive">
                        <table class="table table-dark table-striped table-hover table-bordered align-middle rounded-3 overflow-hidden" id="TableProductos">
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap Icons CD los botones -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<script src="<?= asset('build/js/productos/index.js') ?>"></script>


<style>
    .form-control::placeholder,
    .form-select::placeholder {
        color: white !important;
        opacity: 0.7 !important;
    }

    /* Estilo para las opciones del select */
    .bg-dark option {
        background-color: #343a40;
        color: white;
    }
</style>