import { createHash } from 'crypto';

/**
 * Gera um hash SHA-256 de um dado
 * @param {string} data - O dado a ser hashado
 * @returns {string} - O hash gerado em formato hexadecimal
 */
function gerarHash(data) {
  return createHash('sha256') // Você pode trocar 'sha256' por outro algoritmo, se desejar
    .update(data)
    .digest('hex');
}

// Exemplo de uso
export {gerarHash}