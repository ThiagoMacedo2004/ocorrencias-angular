<?php


require_once 'src/config/config.php';

$data = json_decode(file_get_contents("php://input"));


// if($_GET['acao']){
//     echo $_GET['acao'];
//     // echo json_encode($data->ocorrencia) ;
// } else {
//     echo "Erro";
// }

// $sql = new Sql;
// $n = 1;
// $loja = "{$n}";

// do  {

//     if(strlen($n) == 1) {
//         $loja = "Loja-00{$n}";
//     } elseif(strlen($n) == 2) {
//         $loja = "Loja-0{$n}";
//     } else {
//         $loja = "Loja-{$n}";
//     }

//     $sql->select("INSERT INTO tb_lojas(loja) VALUES ('{$loja}')");

//     echo "{$loja} acrescentada no banco de dados!";
//     echo "<br>";
//     $n++;
// } while ($n <= 143);

switch ($_GET['acao']) {

    case 'getOcorrencias':
        $ocorrencias = new Ocorrencias;
        $result      = $ocorrencias::getOcorrecias();
        echo json_encode($result);
        break;

    case 'getUsers':
        $users   = new Usuario;
        $result  = $users::getUsers();
        echo json_encode($result);
        break;

    case 'getVeiculos':
        $veiculos = new Formularios;
        $result = $veiculos::getVeiculos();
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

    case 'salvarPDF':

        ob_start();
        $getDetalheOc = new Ocorrencias;
        $result       = $getDetalheOc::getOcorrenciaPDF($_GET['ocorrencia']);
        require_once '../angular-php/templateOc.php';
        $pdf = new PDF(ob_get_clean());
        
        $pdf->salvar_pdf($result[0]['loja'], $result[0]['ocorrencia']);

        $mail = new Email(
            $_GET['email'],
            'thiago.souza@marabraz.com.br',
            "{$result[0]['loja']}-{$_GET['ocorrencia']}",
            $result[0]['submotivo']
        );

        break;

    case 'reenvio':

        $getDetalheOc = new Ocorrencias;
        $result       = $getDetalheOc::getOcorrenciaPDF($_GET['ocorrencia']);
               
    
        $mail = new Email(
            $_GET['email'],
            'thiago.souza@marabraz.com.br',
            "{$result[0]['loja']}-{$_GET['ocorrencia']}",
            $result[0]['submotivo'],
            $_GET['acao']

        );

        break;

    case 'detalheOc':
        
        ob_start();
        $getDetalheOc = new Ocorrencias;
        $result       = $getDetalheOc::getOcorrencia($_GET['id']);

        require_once '../angular-php/templateOc.php';
        $pdf = new PDF(ob_get_clean());
        
        $pdf->salvar_pdf($result[0]['loja'], $result[0]['ocorrencia']);
        
        echo json_encode($result);
        break;

    case 'getLojas':
        $getLojas = new Formularios;
        $result   = $getLojas::getLojas();
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

    case 'finalizarOc':
        $finalizando = new Ocorrencias;
        $resultF = $finalizando::finalizandoOc($data);
        $resultM = $finalizando::saveMateriais($data);

       if($resultF['sucesso'] && $resultM['sucesso']){
           $validacao = array (
               'sucesso' => 1,
               'error'   => ''
           );

           echo json_encode($validacao);
       } else {
            $validacao = array (
                'sucesso' => '',
                'error'   => [
                    'error1' => $resultF['error'],
                    'error2' => $resultM['error']
                ]
            );
            echo json_encode($validacao);
       }

        break;

    case 'detalhesOcFina':
        $detalhesOcFina = new Ocorrencias;
        $result = $detalhesOcFina::getDetalheOcFina($_GET['id']);

       
        echo json_encode($result);
    
}




