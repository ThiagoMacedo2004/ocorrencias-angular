<?php

class Usuario extends Sql {

    public static function getUsuario($matricula, $senha) {
        $sql = new Sql;

        $results = $sql->select("SELECT * FROM users WHERE matricula = $matricula");

        $result =  $results[0];

        if(!$result) {
            $validacao = array (
                'error'   => "Matricula ou senha incorreta.",
                'sucesso' => ''
            );
            echo json_encode($validacao);
            exit();
        } else {
            if(isset($result) && count($result) > 0){
                if(!password_verify($senha, $result['senha'])){
                    $validacao = array (
                        'error'   => 'Matricula ou senha incorreta.',
                        'sucesso' => ''
                    );
                    return $validacao;
                    exit();
                } else {
                    $validacao = array(
                        'error'   => "",
                        'sucesso' => $result
                    );
                    return $validacao; 
                    exit();
                }
            } else {
                $validacao = array (
                    'error'   => 'Matricula ou senha incorreta.',
                    'sucesso' => ''
                );
                return $validacao; 
                exit();
                
            }
        }
    }

    public static function getUsers(){
        $sql = new Sql;
        
        $results = $sql->select("SELECT * FROM users ORDER BY(nome) ASC");

        return $results;

    }
}