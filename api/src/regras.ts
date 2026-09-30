import { CARACTERES_POR_PALAVRA } from '../../src/sessao';

/** Acima disso nenhuma pessoa digita; o envio é tratado como fraude. */
export const PPM_MAXIMO = 250;
export const PRECISAO_MINIMA = 0.9;
/** Tempo máximo entre começar e enviar o desafio. */
export const DURACAO_MAXIMA_MS = 10 * 60_000;

export const JOGADOR = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const PALAVRAS_BLOQUEADAS = ['porra', 'caralho', 'merda', 'buceta', 'puta', 'foder', 'fdp', 'viado', 'cuzao', 'arrombado', 'piroca', 'xota'];

/** Devolve o apelido limpo, ou uma mensagem de erro. */
export function validarApelido(bruto: unknown): { apelido: string } | { erro: string } {
  const apelido = typeof bruto === 'string' ? bruto.trim().replace(/\s+/g, ' ') : '';
  if (apelido.length < 2 || apelido.length > 20) return { erro: 'O apelido precisa ter entre 2 e 20 caracteres.' };
  if (!/^[\p{L}\p{N} ._-]+$/u.test(apelido)) return { erro: 'Use só letras, números, espaço, ponto, hífen ou sublinhado.' };
  // Sem acentos, espaços e pontuação, para pegar palavrões disfarçados.
  const normalizado = apelido.normalize('NFD').replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (PALAVRAS_BLOQUEADAS.some((p) => normalizado.includes(p))) return { erro: 'Escolha outro apelido.' };
  return { apelido };
}

/** Calcula o PPM a partir do tempo medido no servidor e aplica os limites. */
export function avaliarEnvio(frase: string, inicio: number, agora: number, precisao: unknown): { ppm: number; precisao: number } | { erro: string } {
  const duracao = agora - inicio;
  if (duracao <= 0 || duracao > DURACAO_MAXIMA_MS) return { erro: 'O tempo do desafio de hoje expirou. Volte amanhã!' };
  if (typeof precisao !== 'number' || !(precisao >= PRECISAO_MINIMA && precisao <= 1)) {
    return { erro: `Para entrar no ranking, a precisão precisa ser de pelo menos ${PRECISAO_MINIMA * 100}%.` };
  }
  const ppm = frase.length / CARACTERES_POR_PALAVRA / (duracao / 60_000);
  if (ppm > PPM_MAXIMO) return { erro: 'Tempo impossível para uma pessoa. O resultado não foi aceito.' };
  return { ppm: Math.round(ppm * 10) / 10, precisao };
}
