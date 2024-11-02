import express from 'express';
import { User } from "./../Databases/User.js" //'./../../Databases/User.js'
import bcrypt from 'bcrypt'; // Para comparar senhas
import jwt from 'jsonwebtoken'; // Para gerar tokens JWT

const UserRoute = express.Router();

// Rota de login
UserRoute.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({
            where: { login: login },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(senha, user.senha.toString());

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id, login: user.login }, 'sua_chave_secreta', { expiresIn: '1h' });

        // Retorna o usuário e o token
        res.status(200).json({
            message: 'Login bem-sucedido',
            user: {
                id: user.id,
                login: user.login,
                // Exclua a senha da resposta
            },
            token: token,
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

export { UserRoute };
