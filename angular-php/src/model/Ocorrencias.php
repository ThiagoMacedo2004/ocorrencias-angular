<?php

class Ocorrencias extends Sql {

    public static function getOcorrecias(){
        $sql = new Sql;

        $results = $sql->select("SELECT o.*, u.nome, m.motivo, s.submotivo FROM tb_ocorrencias o
            inner join tb_motivos m
            on (o.id_motivo = m.id)
            inner join tb_submotivos s
            on (o.id_submotivo = s.id)
            inner join users u
            on (o.id_user_create = u.id)
            where status = 'Aberta'
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

    public static function saveOc($data, $id) {
        $sql = new Sql();

        return $sql->query("INSERT INTO tb_ocorrencias (
            ocorrencia,
            loja,
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
                :loja,
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
                ':loja' => $data->loja,
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

        $results = $sql->select("SELECT o.*, u.nome as nome_create, m.motivo, s.submotivo FROM tb_ocorrencias o
                    inner join tb_motivos m
                    on (o.id_motivo = m.id)
                    inner join tb_submotivos s
                    on (o.id_submotivo = s.id)
                    inner join users u
                    on (o.id_user_create = u.id)
                    where o.id = :id",[
                            ':id' => $id
                        ]);

        return $results;
    }
}