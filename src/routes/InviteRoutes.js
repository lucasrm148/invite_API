import express from 'express';
import { Convidados } from '../Databases/convidados.js';
import { gerarHash } from './../function/cripto.js';
const { Router } = express;

const InviteRoute = Router();

// Visualiza participante
InviteRoute.get("/:name_hash", async (req, res) => {
  const nomeHash = req.params.name_hash;
  try {
    const resultado = await Convidados.findOne({
      where: { hash_name: nomeHash }
    });

    if (resultado) {
      res.status(200).json({
        code: '200',
        convidado: resultado
      });
    } else {
      res.status(404).json({
        code: '404',
        message: 'Convidado não encontrado'
      });
    }
  } catch (error) {
    console.error('Erro ao buscar convidado:', error);
    res.status(500).json({ error: 'Erro ao buscar convidado' });
  }
});

InviteRoute.get("/convite/:convite_hash", async (req, res) => {
  const conviteHash = req.params.convite_hash;
  try {
    const resultado = await Convidados.findAll({
      where: {hash_convite: conviteHash }
    });
    if (resultado) {
      res.status(200).json({
        code: '200',
        convidado: resultado
      });
    } else {
      res.status(404).json({
        code: '404',
        message: 'Convidado não encontrado'
      });
    }
  } catch (error) {
    console.error('Erro ao buscar convidado:', error);
    res.status(500).json({ error: 'Erro ao buscar convidado' });
  }
});
// Atualiza participante
InviteRoute.put("/", async (req, res) => {
  try {
    const { nomeHash, hashConvite, participara } = req.body;
    const newData = { participara };
    console.log({ nomeHash, hashConvite, participara })
    const resultado = await Convidados.update(newData, {
      where: { hash_name: nomeHash, hash_convite: hashConvite }
    });

    if (resultado[0] > 0) { // `resultado[0]` representa o número de registros afetados
      res.status(200).json({
        code: '200',
        message: 'Convidado atualizado com sucesso'
      });
    } else {
      res.status(404).json({
        code: '404',
        message: 'Convidado não encontrado ou nenhuma alteração feita'
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar convidado:', error);
    res.status(500).json({ error: 'Erro ao atualizar convidado' });
  }
});

// Cria participante
InviteRoute.post('/', async (req, res) => {
  try {
    const { nome, participara, hash_convite } = req.body;
    const hash_name = gerarHash(nome);

    // Cria um novo convidado
    const novoConvidado = await Convidados.create({
      nome,
      hash_convite,
      participara,
      hash_name,
    });

    res.status(201).json(novoConvidado);
  } catch (error) {
    console.error('Erro ao criar convidado:', error);
    res.status(500).json({ error: 'Erro ao criar convidado' });
  }
});

// Deleta participante
InviteRoute.delete('/', async (req, res) => {
  try {
    const { hash_name, hash_convite } = req.body;

    // Deleta o convidado
    const resultado = await Convidados.destroy({
      where: { hash_name, hash_convite }
    });

    if (resultado > 0) { // `resultado` representa o número de registros deletados
      res.status(200).json({
        message: 'Convidado deletado com sucesso'
      });
    } else {
      res.status(404).json({
        message: 'Convidado não encontrado'
      });
    }
  } catch (error) {
    console.error('Erro ao deletar convidado:', error);
    res.status(500).json({ error: 'Erro ao deletar convidado' });
  }
});

export { InviteRoute };
