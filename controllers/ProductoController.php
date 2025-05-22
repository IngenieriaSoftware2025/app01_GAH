<?php

namespace Controllers;

use Exception;
use Model\ActiveRecord;
use Model\Productos;
use MVC\Router;

class ProductoController extends ActiveRecord{

    public function renderizarPagina(Router $router){
        $router->render('productos/index', []);
    }

    public static function guardarAPI(){
    getHeadersApi();

    $_POST['producto_nombre'] = htmlspecialchars($_POST['producto_nombre']);
    if (empty(trim($_POST['producto_nombre']))) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'El nombre del producto no puede quedar vacio'
        ]);
        return;
    }

    $_POST['producto_cantidad'] = filter_var($_POST['producto_cantidad'], FILTER_VALIDATE_INT);
    if ($_POST['producto_cantidad'] <= 0) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'La cantidad no puede venir vacia'
        ]);
        return;
    }

    $_POST['producto_categoria'] = filter_var($_POST['producto_categoria'], FILTER_VALIDATE_INT);
    if (!in_array($_POST['producto_categoria'], [1, 2, 3])) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'Las categorias solo pueden ser Alimentos, Higiene o Hogar'
        ]);
        return;
    }

    $_POST['producto_prioridad'] = filter_var($_POST['producto_prioridad'], FILTER_VALIDATE_INT);
    if (!in_array($_POST['producto_prioridad'], [1, 2, 3])) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'Las prioridades solo pueden ser Alta, Media o Baja'
        ]);
        return;
    }

    //producto que no se dupliquen
    $sql = "SELECT * FROM productos WHERE producto_nombre = ? AND producto_categoria = ? AND producto_situacion = 1";
    $resultado = self::$db->prepare($sql);
    $resultado->execute([$_POST['producto_nombre'], $_POST['producto_categoria']]);

    if ($resultado->rowCount() > 0) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'El producto se encuentra repetido en la misma categoria'
        ]);
        return;
    }

    try {
        $data = new Productos([
            'producto_nombre' => $_POST['producto_nombre'],
            'producto_cantidad' => $_POST['producto_cantidad'],
            'producto_categoria' => $_POST['producto_categoria'],
            'producto_prioridad' => $_POST['producto_prioridad'],
            'producto_situacion' => 1 
        ]);

        $crear = $data->crear();

        http_response_code(200);
        echo json_encode([
            'codigo' => 1,
            'mensaje' => 'El producto ha sido registrado correctamente'
        ]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'Error al guardar el producto',
            'detalle' => $e->getMessage(),
        ]);
    }
}

    public static function buscarAPI()
    {
        try {
            $sql = "SELECT p.producto_id, p.producto_nombre, p.producto_cantidad, 
              p.producto_categoria, c.categoria_nombre, 
              p.producto_prioridad, pr.prioridad_nombre,
              p.producto_situacion, 
              CASE p.producto_situacion 
                WHEN 0 THEN 'Comprado'
                WHEN 1 THEN 'Pendiente'
              END as situacion_nombre
       FROM productos p
       JOIN categorias c ON p.producto_categoria = c.categoria_id
       JOIN prioridades pr ON p.producto_prioridad = pr.prioridad_id
       ORDER BY p.producto_categoria, p.producto_prioridad";

            $data = self::fetchArray($sql);

            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Productos obtenidos correctamente',
                'data' => $data
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al obtener los productos',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function modificarAPI()
    {
        getHeadersApi();

        $id = $_POST['producto_id'];
        if (empty($id)) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Se requiere el ID del producto'
            ]);
            return;
        }

        $_POST['producto_nombre'] = htmlspecialchars($_POST['producto_nombre']);
        if (empty(trim($_POST['producto_nombre']))) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'El nombre del producto no puede quedar vacio',
            ]);
            return;
        }

        $_POST['producto_cantidad'] = filter_var($_POST['producto_cantidad'], FILTER_VALIDATE_INT);
        if ($_POST['producto_cantidad'] <= 0) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'La cantidad no puede venir vacia'
            ]);
            return;
        }

        try {
            $producto = Productos::find($id);
            if (!$producto) {
                http_response_code(404);
                echo json_encode([
                    'codigo' => 0,
                    'mensaje' => 'Producto no encontrado'
                ]);
                return;
            }

            $producto->sincronizar([
                'producto_nombre' => $_POST['producto_nombre'],
                'producto_cantidad' => $_POST['producto_cantidad'],
                'producto_categoria' => $_POST['producto_categoria'],
                'producto_prioridad' => $_POST['producto_prioridad']
            ]);

            $producto->actualizar();

            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'El producto fue actualizado correctamente'
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al modificar el producto',
                'detalle' => $e->getMessage()
            ]);
        }
    }

    public static function marcarCompradoAPI()
    {
    getHeadersApi();

    $id = $_POST['producto_id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'No se recibió el ID del producto'
        ]);
        return;
    }

    try {
        $producto = Productos::find($id);
        if (!$producto) {
            http_response_code(404);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Producto no encontrado'
            ]);
            return;
        }

        $producto->sincronizar([
            'producto_situacion' => 0  
        ]);

        $producto->actualizar();

        http_response_code(200);
        echo json_encode([
            'codigo' => 1,
            'mensaje' => 'Producto marcado como comprado correctamente'
        ]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'codigo' => 0,
            'mensaje' => 'Error al marcar el producto como comprado',
            'detalle' => $e->getMessage()
        ]);
    }
}

    public static function EliminarAPI(){
        getHeadersApi();

        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'No se recibió el ID del producto'
            ]);
            return;
        }

        try {
            $producto = Productos::find($id);
            if (!$producto) {
                http_response_code(404);
                echo json_encode([
                    'codigo' => 0,
                    'mensaje' => 'Producto no encontrado'
                ]);
                return;
            }

            $producto->eliminar();

            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Producto eliminado correctamente'
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al eliminar el producto',
                'detalle' => $e->getMessage()
            ]);
        }
    }

}