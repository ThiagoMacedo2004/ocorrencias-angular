<?php

class Formularios extends Sql {

    public static function getMotivos(){
        $sql = new Sql;

        $result = $sql->select("SELECT * FROM tb_motivos order by motivo ASC");

        return $result;
    }

    public static function getSubmotivos($idMotivo){
        $sql = new Sql;

        $result = $sql->select("SELECT * FROM tb_submotivos WHERE id_motivo = '$idMotivo' order by submotivo ASC");

        return $result;
    }

    public static function getVeiculos() {
        $sql = new Sql;

        $result = $sql->select("SELECT * FROM tb_veiculos ORDER BY modelo ASC");

        return $result;
    }

    public static function getLojas() {
        $sql = new Sql;

        return $sql->select("SELECT * FROM tb_lojas order by loja ASC");

    }

}