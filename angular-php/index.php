<?php


require_once 'src/config/config.php';

$data = json_decode(file_get_contents("php://input"));

// if($_GET['acao']){
//     echo $_GET['acao'];
//     // echo json_encode($data->ocorrencia) ;
// } else {
//     echo "Erro";
// }

switch ($_GET['acao']) {

    case 'getOcorrencias':
        $ocorrencias = new Ocorrencias;
        $result      = $ocorrencias::getOcorrecias();
        echo json_encode($result);
        break;

    case 'gravarOS':
        $salvarOs = new Ocorrencias;
        $verificarOc = $salvarOs::verificarOc($data->ocorrencia);

        if($verificarOc['error']){
            echo json_encode($verificarOc);
        } else {
            $result   = $salvarOs::saveOc($data, $_GET['id']);
            echo json_encode($result);
        }
        break;

    case 'detalheOc':
        $getDetalheOc = new Ocorrencias;
        $result       = $getDetalheOc::getOcorrencia($_GET['id']);
        echo json_encode($result);
        break;

    case 'getMotivos':
        $motivos = new Formularios;
        $result  = $motivos::getMotivos();
        echo json_encode($result);
        break;

    case 'getSubmotivos':
        $subMotivos = new Formularios;
        $result  = $subMotivos::getSubmotivos($_GET['id']);
        echo json_encode($result);
        break;

    case 'login':
        // echo json_encode($data->matricula);
        $getUsuario = new Usuario;
        $result  = $getUsuario::getUsuario(ltrim($data->matricula), $data->senha);
        echo json_encode($result);
        break;

    
}




