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

}