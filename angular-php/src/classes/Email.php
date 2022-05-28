<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'src/config/config.php';

class Email {

    //Create an instance; passing `true` enables exceptions
    private $mail;

    public function __construct($remetente, $destinatario, $fileName, $submotivo, $acao = '')
    {
        $this->mail = new PHPMailer(true);
        try {

            //Server settings
            $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;                      
            $this->mail->isSMTP();                                            
            $this->mail->Host       = 'smtp.marabraz.com.br';                    
            $this->mail->SMTPAuth   = false;                                   
            $this->mail->Port       = 25;

            $this->configEmail($remetente, $destinatario, $fileName, $submotivo, $acao);
            $this->anexo($fileName);

            $this->mail->send();
            echo 'O.S encaminhada com sucesso!!';

        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
        }
    }

    public function configEmail($remetente, $destinatario, $loja, $submotivo, $acao = '')
    {
        $this->mail->setFrom($remetente);
        $this->mail->addAddress($destinatario);

        // if($acao == 'reenvio') {
        //     $this->mail->Subject = "{$loja} - {$submotivo} (Reenvio)";
        // }

        $this->mail->Subject = "{$loja} - {$submotivo}";

        $this->mail->Body    = "<h2>O.S {$loja} - {$submotivo}</h2>";
        $this->mail->isHTML(true);

    }

    public function anexo($fileName)
    {
        $this->mail->addAttachment(PATH_OS . "{$fileName}.pdf", "{$fileName}.pdf");
    }
        
}