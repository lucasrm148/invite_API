import { Convite } from './../../Databases/Convite.js';
import { gerarHash } from './../cripto.js'; // Apenas se precisar gerar um hash

// Cria um novo convite
 const createConvite = async (req, res) => {
    try {
        const { confirmados, convidados, hash_evento, senha } = req.body;
        const hash_convite = gerarHash(hash_evento + senha); // Opcional, caso queira gerar um hash

        const novoConvite = await Convite.create({
            confirmados: confirmados,
            convidados: convidados,
            hash_evento: hash_evento,
            senha: senha,
            hash_convite: hash_convite
        });

        res.status(201).json(novoConvite);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar o convite', details: error.message });
    }
};

// Atualiza um convite existente
 const updateConvite = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmados, convidados,presente } = req.body;

        const [updated] = await Convite.update(
            { confirmados, convidados,presente },
            { where: { id } }
        );

        if (updated) {
            const conviteAtualizado = await Convite.findOne({ where: { id } });
            res.status(200).json(conviteAtualizado);
        } else {
            res.status(404).json({ message: 'Convite não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o convite', details: error.message });
    }
};
 
export const deleteConvite = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Convite.destroy({
            where: { id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Convite deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Convite não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao deletar o convite', details: error.message });
    }
};
export{updateConvite,createConvite}