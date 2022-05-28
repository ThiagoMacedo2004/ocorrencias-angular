<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/angular-php/layout.css">
    <title>Document</title>
</head>
    <body>
        <table class="tabela">
            <tr class="linha-1">
                <td class="img">
                   <img src="/angular-php/logo.JPG" alt="">
                </td>
                <td class="descricao">
                    <span>INFRAESTUTURA MARABRAZ</span><br><br>
                    <span> O.S <?= $result[0]['loja'] ?> </span><br><br>
                    <span>RAMAL: 7203</span>
                </td>
                <td class="informacoes">
                    <span>Ocorrência:</span><br>
                    <span class="info-oc"><?= $result[0]['ocorrencia'] ?></span>

                    <hr>

                    <span>Data:</span><br>
                    <span class="info-oc"><?= date('d/m/Y (H:i:s)', strtotime("{$result[0]['date_create']}")) ?></span>

                    <hr>

                    <span>Analista:</span><br>
                    <span class="info-oc"><?= $result[0]['nome_create'] ?></span>
                </td>
            </tr>

            <tr class="linha-2">
                <td colspan="3">
                    DETALHES DA OCORRÊNCIA
                </td>
            </tr>
                
            <tr class="linha-3">

            </tr>

        </table>     
    </body>
</html>