import { where } from 'sequelize';
import { Presente } from './../../Databases/Presentes.js';

// Criar um novo presente
export const createPresente = async (req, res) => {
    try {
        const {nome,hash_evento,preco,max_selecionado}= req.body
        const presente = {
            nome:nome,
            hash_evento:hash_evento,
            hash_nome:gerarHash(nome+hash_evento),
            preco:preco,
            max_selecionado:max_selecionado,
            n_selecionados:0
        }
        const novoPresente = await Presente.create(presente);
        res.status(201).json(novoPresente);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar o presente' });
    }
};

// Listar todos os presentes
export const getAllPresentes = async (req, res) => {
    try {
        const evento = req.params.evento
        console.log(evento)
        const presentes = await Presente.findAll({
            where:{hash_evento:evento}
        });
        res.status(200).json(presentes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao listar presentes' });
    }
};

// Obter um presente por ID
export const getPresenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const presente = await Presente.findByPk(id);
        if (presente) {
            res.status(200).json(presente);
        } else {
            res.status(404).json({ error: 'Presente não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o presente' });
    }
};

// Atualizar um presente
export const updatePresente = async (req, res) => {
    const { id } = req.params;
    try {
        const [atualizado] = await Presente.update(req.body, {
            where: { id },
        });
        if (atualizado) {
            const presenteAtualizado = await Presente.findByPk(id);
            res.status(200).json(presenteAtualizado);
        } else {
            res.status(404).json({ error: 'Presente não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o presente' });
    }
};

// Deletar um presente
export const deletePresente = async (req, res) => {
    const { id } = req.params;
    try {
        const deletado = await Presente.destroy({
            where: { id },
        });
        if (deletado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Presente não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o presente' });
    }
};
