import express from 'express';
import { where } from 'sequelize';
import { Evento } from './../Databases/Evento.js';
import { Convidados } from '../Databases/convidados.js';
const { Router, Request, Response, response } = express;
const EventoRoute = Router()

EventoRoute.get("/:hash", async (req, res) => {// retona evento.
  try {
    const hash = req.params.hash
    const resultado = await Evento.findOne({
      where: { hash_name: hash }
    })
    res.json({
      message: 'evento encotrado',
      code: '200',
      eventos: resultado
    })
  } catch (error) {
    res.json({
      message: error,
      code: '203',
    })
  }
})
EventoRoute.put("/dados", async (req, res) => { //update
  try {
    const {data,hash_organizador,forma_pagamento,hash_name,nome} = req.body
    const  EditeEvento  = {
        hash_name:gerarHash(nome+hash_organizador),
        data:data,
        forma_pagamento:forma_pagamento,
        nome:nome
    }
    const {update} = await Evento.update(EditeEvento,{
      where: { hash_organizador:hash_organizador, hash_name:hash_name }
    })
    if (updated) {
      res.status(200).json({
          message: 'Evento atualizado com sucesso',
          code: '200',
          evento: EditeEvento
      });
  } else {
      res.status(404).json({
          message: 'Evento não encontrado',
          code: '404'
      });
  }
} catch (error) {
  console.error(error); // Log do erro para análise
  res.status(500).json({
      message: 'Erro ao atualizar o evento',
      code: '500',
      error: error.message
  });
}
})



export { EventoRoute }