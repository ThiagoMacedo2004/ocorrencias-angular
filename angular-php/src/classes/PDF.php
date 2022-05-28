<?php

use \Mpdf\Mpdf;

class PDF {

    private $pdf;
    private $html;

    public function __construct($template, $formato = 'A4', $orientacao = 'P', $modo = 'utf-8')
    {
        $this->pdf = new Mpdf([
            'format'       => $formato,
            'orientation'  => $orientacao,
            'mode'         => $modo
        ]);

        $this->iniciar_pdf($template);
    }


    public function reiniciar_html()
    {
        $this->html = '';
    }


    public function iniciar_pdf($template = '')
    {   
        $this->html = $template;
    }


    public function salvar_pdf($loja, $oc){

        $this->pdf->WriteHTML($this->html);
        $this->pdf->Output("\\\\marabraz.com.br\\MAPEAMENTOS\\INFRAESTRUTURA\\LOJAS\\Planilha Ocorrências\\O.S_angular\\{$loja}-{$oc}.pdf");

    }

}