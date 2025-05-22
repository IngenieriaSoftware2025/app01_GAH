<?php

namespace Model;

class Productos extends ActiveRecord{

    public static $tabla = 'productos';
    public static $columnasDB = [
        'producto_nombre',
        'producto_cantidad',
        'producto_categoria',
        'producto_prioridad',
        'producto_situacion'
    ];

    public static $idTabla = 'producto_id';
    public $producto_id;
    public $producto_nombre;
    public $producto_cantidad;
    public $producto_categoria;
    public $producto_prioridad;
    public $producto_situacion;

    public function __construct($args = []){
        $this->producto_id = $args['producto_id'] ?? null;
        $this->producto_nombre = $args['producto_nombre'] ?? '';
        $this->producto_cantidad = $args['producto_cantidad'] ?? 1;
        $this->producto_categoria = $args['producto_categoria'] ?? 1;
        $this->producto_prioridad = $args['producto_prioridad'] ?? 3; 
        $this->producto_situacion = $args['producto_situacion'] ?? 1;
    }

}



?>
