import express from 'express';
import { Convidados } from '../Databases/convidados.js';
import { where } from 'sequelize';
import {gerarHash} from './../function/cripto.js'
const { Router, Request, Response, response } = express;

const InviteRoute = Router()

InviteRoute.get("/", async (req, res) => {

  res.json({
    message: 'You are connect',
    code: '200',
  })
})
InviteRoute.get("/participante/:name_hash", async (req, res) => {
  const nomeHash = req.params.name_hash
  console.log(nomeHash)
  const resultado = await Convidados.findOne({
    where: { hash_name: nomeHash }
  });
  res.json({
    code: '200',
    convidado: resultado
  })
})
InviteRoute.put("/participante", async (req, res) => {
  console.log(req.body)
  try {
    const nomeHash = req.body.nomeHash //DecodeMessage(req.body.token,key,'Top Secret')
    const hashConvite = req.body.hashConvite
    const participara = req.body.participara
    const contribuicao = req.body.contribuicao
    const newData = { participara: participara, contribuicao: contribuicao }

    const resultado = await Convidados.update(newData, {
      where: { hash_name: nomeHash, hash_convite: hashConvite }
    })
    res.json({
      code: '200',
      convidado: resultado
    })
  } catch (error) {
    console.log(error)
  }
})

InviteRoute.post('/convidados', async (req, res) => {
  try {
    const { nome,  participara, contribuicao,hash_convite } = req.body;
    const   hash_name =gerarHash(nome)
    // Cria um novo convidado
    const novoConvidado = await Convidados.create({
      nome,
      hash_convite,
      participara,
      hash_name,
      contribuicao,
    });

    // Retorna o novo convidado
    res.status(201).json(novoConvidado);
  } catch (error) {
    console.error('Erro ao criar convidado:', error);
    res.status(500).json({ error: 'Erro ao criar convidado' });
  }
});
export { InviteRoute }

