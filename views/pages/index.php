<div class="container-fluid min-vh-100 d-flex align-items-center" style="background-color: #f8f9fa;">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <!-- Header Section -->
                <div class="text-center mb-5">
                    <h1 class="display-1 fw-bold mb-0" style="color: #212529; letter-spacing: -3px;">¡Hola María!</h1>
                    <p class="fs-4 text-secondary">Simplifica tus compras, organiza tu vida</p>
                </div>

                <!-- Main Card -->
                <div class="card border-0 shadow-lg overflow-hidden" style="border-radius: 20px;">
                    <div class="card-body p-0">
                        <div class="row g-0">
                            <!-- Left Side - Welcome Message -->
                            <div class="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
                                <div class="mb-4">
                                    <span class="badge px-3 py-2 fs-6 rounded-pill mb-3" style="background-color: #ffc107; color: #212529;">
                                        <i class="bi bi-check-circle me-1"></i> Lista Inteligente
                                    </span>
                                    <h2 class="fw-bold text-dark mb-3">Tu asistente de compras personal</h2>
                                    <p class="text-muted fs-5">
                                        Olvídate del desorden. Organiza tus compras por categorías, 
                                        establece prioridades y nunca más compres duplicados.
                                    </p>
                                </div>

                                <div class="d-grid gap-3">
                                    <a href="/app01_GAH/productos" class="btn btn-primary btn-lg text-white shadow" 
                                       style="border-radius: 10px; padding: 15px; background-color: #0d6efd; border: none;">
                                        <i class="bi bi-rocket-takeoff me-2"></i>Comenzar Ahora
                                    </a>
                                    <button class="btn btn-outline-secondary btn-lg" style="border-radius: 10px; padding: 15px;" onclick="verTutorial()">
                                        <i class="bi bi-play-circle me-2"></i>Ver Cómo Funciona
                                    </button>
                                </div>
                            </div>

                            <!-- Right Side - Features Grid -->
                            <div class="col-md-6 p-5" style="background-color: #f8f9fa;">
                                <div class="row g-4">
                                    <div class="col-6">
                                        <div class="text-center feature-box p-4 h-100 bg-white" style="border-radius: 15px; border: 2px solid transparent;">
                                            <div class="feature-icon mb-3" style="font-size: 3rem;">🛒</div>
                                            <h6 class="fw-bold text-dark">Categorías</h6>
                                            <small class="text-muted">Alimentos, Higiene y Hogar</small>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="text-center feature-box p-4 h-100 bg-white" style="border-radius: 15px; border: 2px solid transparent;">
                                            <div class="feature-icon mb-3" style="font-size: 3rem;">⭐</div>
                                            <h6 class="fw-bold text-dark">Prioridades</h6>
                                            <small class="text-muted">Alta, Media, Baja</small>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="text-center feature-box p-4 h-100 bg-white" style="border-radius: 15px; border: 2px solid transparent;">
                                            <div class="feature-icon mb-3" style="font-size: 3rem;">✅</div>
                                            <h6 class="fw-bold text-dark">Control</h6>
                                            <small class="text-muted">Marca lo comprado</small>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="text-center feature-box p-4 h-100 bg-white" style="border-radius: 15px; border: 2px solid transparent;">
                                            <div class="feature-icon mb-3" style="font-size: 3rem;">🚫</div>
                                            <h6 class="fw-bold text-dark">Sin Duplicados</h6>
                                            <small class="text-muted">Sistema inteligente</small>
                                        </div>
                                    </div>
                                </div>

                                <!-- Live Stats -->
                                <div class="mt-4 p-4 text-center text-white" style="background-color: #ffc107; border-radius: 15px;">
                                    <h5 class="text-dark mb-3 fw-bold">Tu actividad</h5>
                                    <div class="row g-3 text-dark">
                                        <div class="col-4">
                                            <div class="bg-white rounded p-2" style="background-color: rgba(255,255,255,0.9) !important;">
                                                <h3 class="mb-0" id="totalItems">0</h3>
                                                <small>Pendientes</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="bg-white rounded p-2" style="background-color: rgba(255,255,255,0.9) !important;">
                                                <h3 class="mb-0" id="completedItems">0</h3>
                                                <small>Comprados</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="bg-white rounded p-2" style="background-color: rgba(255,255,255,0.9) !important;">
                                                <h3 class="mb-0" id="urgentItems">0</h3>
                                                <small>Urgentes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Info -->
                <div class="text-center mt-4">
                    <p class="text-muted">
                        <i class="bi bi-shield-check me-2"></i>Tu información está segura y organizada
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tutorial -->
<div class="modal fade" id="tutorialModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0" style="border-radius: 15px;">
            <div class="modal-header border-0" style="background-color: #0d6efd;">
                <h5 class="modal-title fw-bold text-white">¿Cómo funciona?</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <div class="timeline">
                    <div class="timeline-item mb-4">
                        <div class="d-flex align-items-start">
                            <div class="timeline-number me-3">
                                <span class="badge rounded-circle p-3" style="background-color: #ffc107; color: #212529; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">1</span>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-1">Agrega productos</h6>
                                <p class="text-muted small mb-0">Ingresa nombre, cantidad, categoría y prioridad</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item mb-4">
                        <div class="d-flex align-items-start">
                            <div class="timeline-number me-3">
                                <span class="badge rounded-circle p-3" style="background-color: #ffc107; color: #212529; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">2</span>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-1">Organiza automáticamente</h6>
                                <p class="text-muted small mb-0">Los productos se agrupan por categoría y prioridad</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item mb-4">
                        <div class="d-flex align-items-start">
                            <div class="timeline-number me-3">
                                <span class="badge rounded-circle p-3" style="background-color: #ffc107; color: #212529; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">3</span>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-1">Marca lo comprado</h6>
                                <p class="text-muted small mb-0">Un click para marcar productos como comprados</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="d-flex align-items-start">
                            <div class="timeline-number me-3">
                                <span class="badge rounded-circle p-3" style="background-color: #28a745; color: white; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">✓</span>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-1">¡Listo!</h6>
                                <p class="text-muted small mb-0">Tu lista siempre organizada y sin duplicados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-primary px-4" style="border-radius: 10px; background-color: #0d6efd;" data-bs-dismiss="modal">
                    Entendido
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .feature-box {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .feature-box:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        border-color: #0d6efd !important;
    }
    
    .btn {
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    .btn-primary:hover {
        background-color: #0a58ca !important;
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    .feature-box:hover .feature-icon {
        animation: float 2s ease-in-out infinite;
    }
    
    .badge {
        font-weight: 600;
    }
</style>

<script>
// Función para mostrar el tutorial
function verTutorial() {
    const modal = new bootstrap.Modal(document.getElementById('tutorialModal'));
    modal.show();
}

// Cargar estadísticas
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/app01_GAH/productos/buscarAPI');
        const data = await response.json();
        
        if (data.codigo === 1) {
            const productos = data.data;
            const pendientes = productos.filter(p => p.producto_situacion == 1);
            const comprados = productos.filter(p => p.producto_situacion == 0);
            const urgentes = pendientes.filter(p => p.producto_prioridad == 1);
            
            // Animación de contadores
            animateCounter('totalItems', pendientes.length);
            animateCounter('completedItems', comprados.length);
            animateCounter('urgentItems', urgentes.length);
        }
    } catch (error) {
        console.log('Error al cargar estadísticas:', error);
    }
});

function animateCounter(id, target) {
    const element = document.getElementById(id);
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}
</script>