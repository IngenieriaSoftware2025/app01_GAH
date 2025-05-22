<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="build/js/app.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="shortcut icon" href="<?= asset('images/cit.png') ?>" type="image/x-icon">
    <link rel="stylesheet" href="<?= asset('build/styles.css') ?>">
    <title>Clase no.1</title>
    <style>
        .search-input::placeholder {
            color: white !important;
            opacity: 1 !important;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top" style="background: linear-gradient(45deg, #212529, #495057);">
        <div class="container-fluid px-4">
            <a class="navbar-brand fw-bold text-warning d-flex align-items-center" href="/app01_GAH">
                <i class="bi bi-house-fill me-2 fs-4"></i>
                <span class="text-uppercase">INICIO</span>
            </a>
            <button class="navbar-toggler border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item mx-1">
                        <a class="nav-link active rounded-pill px-3 py-2 fw-bold bg-success bg-opacity-25" aria-current="page" href="/app01_GAH/productos">
                            <i class="bi bi-people-fill me-1"></i> PRODUCTOS
                        </a>
                    </li>
                </ul>

                <form class="d-flex">
                    <div class="input-group">
                        <input class="form-control bg-dark bg-opacity-50 text-white border-secondary search-input"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Search">
                        <button class="btn btn-outline-warning" type="submit"><i class="bi bi-search"></i></button>
                    </div>
                </form>

                <div class="ms-3 d-none d-lg-flex">
                    <div class="dropdown">
                        <button class="btn btn-outline-light dropdown-toggle rounded-circle p-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle fs-5"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Perfil</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Configuración</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-power me-2"></i>Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="progress fixed-bottom" style="height: 6px;">
        <div class="progress-bar progress-bar-animated bg-danger" id="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="container-fluid mt-4 mb-4" style="min-height: 85vh">

        <?php echo $contenido; ?>
    </div>
    <div class="container-fluid ">
        <div class="row justify-content-center text-center">
            <div class="col-12">
                <p style="font-size:xx-small; font-weight: bold;">
                    Comando de Informática y Tecnología, <?= date('Y') ?> &copy;
                </p>
            </div>
        </div>
    </div>
</body>

</html>