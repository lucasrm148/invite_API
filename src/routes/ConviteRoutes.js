import express from 'express';
import { Convite } from "./../Databases/Convite.js"
import { where } from 'sequelize';
import { gerarHash } from './../function/cripto.js'
import {createConvite,updateConvite,deleteConvite} from "./../function/crud/ConviteCrud.js"
const { Router, Request, Response, response } = express;

const ConviteRoutes = Router()

ConviteRoutes.get("/:senha", async (req, res) => {//pega convite
    try {
        console.log("here")
        const senha = req.params.senha
        
        const resultado = await Convite.findOne({
            where: { senha: senha }
        })
        console.log(resultado)
        res.json({
            code: '200',
            convite: resultado.dataValues
        })
    } catch (error) {
        console.log(error)
        res.json({
            code:'404',
            mensagem:error
        })
    }
})
ConviteRoutes.put("/:senha", async (req, res) => {// atualiza
    try {
        const {confirmado} = req.body
        const senha = req.params.senha
        const resultado = await Convite.update(
            {confirmados:confirmado},
            {  where: { senha: senha } }
        )
        res.json({
            code: '200',
            convite: resultado
        })
    } catch (error) {
        console.log(error)
        res.json({
            code:'404',
            mensagem:error
        })
    }
})
ConviteRoutes.post('/', createConvite);

// Rota para atualizar um convite
ConviteRoutes.put('/:id', updateConvite);

ConviteRoutes.delete('/convites/:id', deleteConvite);

export { ConviteRoutes }