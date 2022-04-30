<?php

function requireValidSession(){
    $user = $_SESSION['user'];
    if(!isset($user)){
        return [
            'error'     => 'Usuário não logado.',
            'navigator' => '',
            'header'    => 'false'
        ];
        exit();
    }
}