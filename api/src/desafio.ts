import { FRASES } from './frases';

/** Data de hoje (AAAA-MM-DD) no horário de Brasília, para o desafio virar à meia-noite para todos. */
export function dataHoje(agora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(agora);
}

/** Gerador pseudoaleatório com semente (mulberry32): a mesma semente sempre produz a mesma sequência. */
function sorteador(semente: number) {
  return () => {
    semente = (semente + 0x6d2b79f5) | 0;
    let t = Math.imul(semente ^ (semente >>> 15), 1 | semente);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}

/** Ordem das frases num ano: embaralhada com o próprio ano como semente, igual para todo mundo. */
function ordemDoAno(ano: number): number[] {
  const sortear = sorteador(ano);
  const ordem = FRASES.map((_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = Math.floor(sortear() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return ordem;
}

/** Frase de uma data. Como há mais frases que dias no ano, nenhuma se repete dentro do mesmo ano. */
export function fraseDoDia(data: string): string {
  const ano = Number(data.slice(0, 4));
  const diaDoAno = (Date.parse(data) - Date.parse(`${ano}-01-01`)) / 86_400_000;
  return FRASES[ordemDoAno(ano)[diaDoAno]];
}
