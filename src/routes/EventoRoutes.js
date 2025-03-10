import express from 'express';
import { where } from 'sequelize';
import { Evento } from './../Databases/Evento.js';
const { Router, Request, Response, response } = express;
const EventoRoute = Router()

EventoRoute.get("/", async (req, res) => {
    req.params.cofimado
    const activeUsers = await Evento.findAll({})
  
    res.json({
      message: 'You are connect',
      code: '200',
    })
  })

  export { EventoRoute}