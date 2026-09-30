const API = 'https://treino-digitacao-api.gutemberg-vercosa.workers.dev';

export interface Linha { apelido: string; ppm: number; precisao: number }
export interface Ranking { data: string; total: number; top: Linha[]; meu: (Linha & { posicao: number }) | null }

async function chamar<T>(caminho: string, corpo?: object): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(API + caminho, corpo && {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    });
  } catch {
    throw new Error('Sem conexão com o servidor do ranking.');
  }
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro ?? 'Falha ao falar com o servidor do ranking.');
  return dados;
}

export const buscarRanking = (jogador: string) => chamar<Ranking>(`/ranking?jogador=${jogador}`);
export const iniciarDesafio = (jogador: string) => chamar<{ ok: true }>('/inicio', { jogador });
export const enviarResultado = (jogador: string, apelido: string, precisao: number) =>
  chamar<Ranking>('/resultado', { jogador, apelido, precisao });
