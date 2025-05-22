<div class="container py-4">

    <div class="row mb-4">
        <div class="col-12 text-center">
            <h2 class="fw-bold text-dark">Mi Lista de Compras</h2>
            <p class="text-muted">Organiza tus compras semanales</p>
        </div>
    </div>

    <div class="row mb-4 justify-content-center">
        <div class="col-lg-8">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Agregar Producto</h5>
                </div>
                
                <div class="card-body">
                    <form id="FormProductos">
                        <input type="hidden" id="producto_id" name="producto_id">
                        
                        <div class="row g-3 mb-3">
                            <div class="col-md-6">
                                <label for="producto_nombre" class="form-label">Nombre del producto</label>
                                <input type="text" 
                                       class="form-control" 
                                       id="producto_nombre" 
                                       name="producto_nombre" 
                                       placeholder="Ejemplo: Leche, Pan, etc.">
                            </div>

                            <div class="col-md-6">
                                <label for="producto_cantidad" class="form-label">Cantidad</label>
                                <input type="number" 
                                       class="form-control" 
                                       id="producto_cantidad" 
                                       name="producto_cantidad" 
                                       placeholder="1, 2, 3..."
                                       min="1">
                            </div>
                        </div>

                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <label for="producto_categoria" class="form-label">Categoría</label>
                                <select name="producto_categoria" class="form-select" id="producto_categoria">
                                    <option value="">Seleccionar categoría</option>
                                    <option value="1">Alimentos</option>
                                    <option value="2">Higiene</option>
                                    <option value="3">Hogar</option>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <label for="producto_prioridad" class="form-label">Prioridad</label>
                                <select name="producto_prioridad" class="form-select" id="producto_prioridad">
                                    <option value="">Seleccionar prioridad</option>
                                    <option value="1">Alta</option>
                                    <option value="2">Media</option>
                                    <option value="3">Baja</option>
                                </select>
                            </div>
                        </div>

                        <div class="text-center">
                            <button class="btn btn-success me-2" type="submit" id="BtnGuardar">
                                Agregar
                            </button>
                            
                            <button class="btn btn-warning me-2 d-none" type="button" id="BtnModificar">
                                Actualizar
                            </button>
                            
                            <button class="btn btn-secondary" type="reset" id="BtnLimpiar">
                                Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0">Por Comprar</h5>
                </div>
                
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped" id="TableProductos">

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tabla de productos comprados -->
    <div class="row" id="SeccionComprados" style="display: none;">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">Ya Comprados</h5>
                </div>
                
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped" id="TableProductosComprados">
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<script src="<?= asset('build/js/productos/index.js') ?>"></script>