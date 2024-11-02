import express from 'express';
import {
    createPresente,
    getAllPresentes,
    getPresenteById,
    updatePresente,
    deletePresente,
} from "./../function/crud/PresenteCrud.js";

const Presente = express.Router();

Presente.post('/', createPresente);
Presente.get('/evento/:evento', getAllPresentes);
Presente.get('/:id', getPresenteById);
Presente.put('/:id', updatePresente);
Presente.delete('/:id', deletePresente);

export  {Presente};
