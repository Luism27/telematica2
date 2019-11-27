<?php 
    include("conexion.php");
    $foto = addslashes(file_get_contents($_FILES['imagen']['tmp_name']));
    $plan = addslashes(file_get_contents($_FILES['plan']['tmp_name']));
    $query = "INSERT INTO candidato(foto,plan) VALUES('$foto','$plan')";
    $resultado = $conexion->query($query);
    if ($resultado){
        echo 'se insertó correctamente'
    }else {
        echo 'no se insertó'
    }
?>