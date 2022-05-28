<?php

class Ocorrencias extends Sql {

    public static function getOcorrecias(){
        $sql = new Sql;

        $results = $sql->select("SELECT o.*, l.id as cod_loja, l.loja, u.nome, m.motivo, s.submotivo FROM tb_ocorrencias o
            inner join tb_lojas l      on (o.id_loja = l.id)
            inner join tb_motivos m    on (o.id_motivo = m.id)
            inner join tb_submotivos s on (o.id_submotivo = s.id)
            inner join users u         on (o.id_user_create = u.id)
            -- where status = 'Aberta'
            order by(o.date_create) DESC",[]);

        return $results;
    }

    public static function verificarOc($ocorrencia){
        $sql = new Sql;

        $results = $sql->select("SELECT * FROM tb_ocorrencias WHERE ocorrencia = :oc", [
            ':oc' => trim(strtoupper($ocorrencia))
        ]);

        if($results) {
            $date = date_create($results[0]['date_create']);
            $date_format = date_format($date, "d/m/Y  -  (H:i:s)");
            $validacao = array (
                'error'   => "Ocorrência já foi cadastrada em: $date_format. Verifique as informações e tente novamente.",
                'sucesso' => ''
            );
            return $validacao;
            exit();
        } else {
            $validacao = array (
                'error'   => "",
                'sucesso' => 1
            );

            return $validacao;

        }

        
    }

    public static function getDetalheOcFina($id_oc) {
        $sql = new Sql;

        $results = $sql->select("SELECT o.*, l.*, mat.*, u.id, u.nome as nome_create, m.motivo, s.submotivo, us.nome  as nome_final, tec.nome as nome_tecnico, v.modelo, v.placa
                                FROM tb_ocorrencias o
                                inner join tb_lojas l       on (o.id_loja = l.id)
                                inner join tb_motivos m     on (o.id_motivo       = m.id)
                                inner join tb_submotivos s  on (o.id_submotivo    = s.id)
                                inner join users u          on (o.id_user_create  = u.id)
                                inner join users us         on (o.id_user_final   = us.id)
                                inner join tb_veiculos v    on (o.id_veiculo      = v.id)
                                inner join tb_materiais mat on (o.id              = mat.id_ocorrencia)
                                inner join users tec        on (o.id_user_tecnico = tec.id)
                                where o.id = :id;",[
                                        ':id' => $id_oc
                                ]);

        return $results;
    }

    public static function saveOc($data, $id) {
        $sql = new Sql();

        return $sql->query("INSERT INTO tb_ocorrencias (
            ocorrencia,
            id_loja,
            prioridade,
            id_motivo,
            id_submotivo,
            descricao,
            triagem,
            id_user_create,
            date_create,
            status)
            VALUE (
                :ocorrencia,
                :id_loja,
                :prioridade,
                :id_motivo,
                :id_submotivo,
                :descricao,
                :triagem,
                :id_user_create,
                :date_create,
                :status
            )", [
                ':ocorrencia' => trim(strtoupper($data->ocorrencia))  ,
                ':id_loja' => intval($data->loja) ,
                ':prioridade' => 'media',
                ':id_motivo' => $data->motivo,
                ':id_submotivo' => $data->submotivo,
                ':descricao' => $data->descricao,
                ':triagem' => $data->triagem,
                ':id_user_create' => $id,
                ':date_create' => date('Y-m-d H:i:s'),
                ':status' => 'Aberta'
            ]);
    }

    public static function getOcorrencia($id) {
        $sql = new Sql;

        $results = $sql->select("SELECT o.*, l.loja, u.nome as nome_create, m.motivo, s.submotivo FROM tb_ocorrencias o
                    inner join tb_lojas l      on (o.id_loja = l.id)
                    inner join tb_motivos m    on (o.id_motivo = m.id)
                    inner join tb_submotivos s on (o.id_submotivo = s.id)
                    inner join users u         on (o.id_user_create = u.id)
                    where o.id = :id",[
                            ':id' => $id
                        ]);

        return $results;
    }

    public static function getOcorrenciaPDF($oc) {
        $sql = new Sql;

        $results = $sql->select("SELECT o.*, l.loja, u.nome as nome_create, m.motivo, s.submotivo FROM tb_ocorrencias o
                    inner join tb_lojas l      on (o.id_loja = l.id)
                    inner join tb_motivos m    on (o.id_motivo = m.id)
                    inner join tb_submotivos s on (o.id_submotivo = s.id)
                    inner join users u         on (o.id_user_create = u.id)
                    where o.ocorrencia = :oc",[
                            ':oc' => $oc
                        ]);

        return $results;
    }


    public static function finalizandoOc($dados){
        $sql = new Sql;

        return $sql->query(
            "UPDATE tb_ocorrencias SET id_user_final = :id_user_final,
                date_final = :date_final,
                status = 'Finalizada',
                id_user_tecnico = :id_user_tecnico,
                id_veiculo = :id_veiculo WHERE id = :id", [
                    ':id_user_final' => intval($dados->analista) ,
                    ':date_final' => date('Y-m-d H:i:s', strtotime("{$dados->data} " . date('H:i:s'))),
                    ':id_user_tecnico' => intval($dados->tecnicoAtend) ,
                    ':id_veiculo' => intval($dados->veiculo) ,
                    ':id' => intval($dados->id_oc) 
                ]
        );
        
    }

    public static function saveMateriais($dados) {

        $sql = new Sql;

        return $sql->query("INSERT INTO tb_materiais (id_ocorrencia, mouse, teclado, monitor, fonte, telefone, cpu, imp_tef, hd, cooler) 
            VALUES(
                :id_ocorrencia,
                :mouse,
                :teclado,
                :monitor,
                :fonte,
                :telefone,
                :cpu,
                :imp_tef,
                :hd,
                :cooler
            );", [
                ':id_ocorrencia' => intval($dados->id_oc),
                ':mouse'    => intval($dados->mouse)     >= 0 ? intval($dados->mouse)   : 0,     
                ':teclado'  => intval($dados->teclado)   >= 0 ? intval($dados->teclado) : 0,
                ':monitor'  => intval($dados->monitor)   >= 0 ? intval($dados->monitor) : 0,
                ':fonte'    => intval($dados->fonte)     >= 0 ? intval($dados->fonte)   : 0,
                ':telefone' => intval($dados->telefone)  >= 0 ? intval($dados->telefone): 0, 
                ':cpu'      => intval($dados->cpu)       >= 0 ? intval($dados->cpu)     : 0,
                ':imp_tef'  => intval($dados->impTef)    >= 0 ? intval($dados->impTef)  : 0,
                ':hd'       => intval($dados->hd)        >= 0 ? intval($dados->hd)      : 0,        
                ':cooler'   => intval($dados->cooler)    >= 0 ? intval($dados->cooler)  : 0  
            ]
        );
    }
}