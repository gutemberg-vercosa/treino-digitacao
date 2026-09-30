import { describe, expect, it } from 'vitest';
import { Sessao } from './sessao';

/** Digita o texto caractere a caractere, com um intervalo fixo entre toques. */
function digitar(sessao: Sessao, texto: string, intervaloMs: number, inicio = 0) {
  for (let i = 1; i <= texto.length; i++) sessao.atualizar(texto.slice(0, i), inicio + (i - 1) * intervaloMs);
}

describe('Sessao', () => {
  it('marca cada caractere como certo, errado ou pendente', () => {
    const s = new Sessao('abc');
    s.atualizar('ax', 0);
    expect(s.estados()).toEqual(['certo', 'errado', 'pendente']);
  });

  it('só começa a contar o tempo no primeiro toque', () => {
    const s = new Sessao('abc');
    s.atualizar('', 1000);
    expect(s.iniciou).toBe(false);
    s.atualizar('a', 5000);
    expect(s.iniciou).toBe(true);
  });

  it('calcula PPM pela convenção de 5 caracteres por palavra', () => {
    const s = new Sessao('a'.repeat(51));
    digitar(s, 'a'.repeat(51), 1200); // 50 intervalos de 1,2 s = 60 s para 51 caracteres
    expect(s.resultado().ppm).toBeCloseTo(51 / 5, 5);
  });

  it('conta erros mesmo que depois sejam corrigidos', () => {
    const s = new Sessao('abcd');
    s.atualizar('a', 0);
    s.atualizar('ax', 100);
    s.atualizar('a', 200);
    s.atualizar('ab', 300);
    s.atualizar('abc', 400);
    s.atualizar('abcd', 500);

    const r = s.resultado();
    expect(r.erros).toBe(1);
    expect(r.digitados).toBe(5);
    expect(r.precisao).toBeCloseTo(4 / 5);
    expect(r.teclas).toEqual([['b', 1]]);
  });

  it('termina ao chegar no fim do texto e ignora o que vier depois', () => {
    const s = new Sessao('ab');
    s.atualizar('ab', 100);
    expect(s.terminou).toBe(true);
    s.atualizar('abc', 200);
    expect(s.resultado().digitados).toBe(2);
  });

  it('ordena as teclas da mais errada para a menos', () => {
    const s = new Sessao('aab');
    s.atualizar('x', 0);
    s.atualizar('xx', 100);
    s.atualizar('xxy', 200);
    expect(s.resultado().teclas).toEqual([['a', 2], ['b', 1]]);
  });

  it('tem estabilidade 1 quando o ritmo é constante', () => {
    const s = new Sessao('a'.repeat(60));
    digitar(s, 'a'.repeat(60), 200);
    const r = s.resultado();
    expect(r.trechos).toHaveLength(3);
    // O primeiro trecho tem um intervalo a menos (o tempo começa no 1º toque), então a estabilidade fica perto de 1.
    expect(r.estabilidade).toBeGreaterThan(0.95);
  });

  it('perde estabilidade quando um trecho é bem mais lento', () => {
    const s = new Sessao('a'.repeat(40));
    digitar(s, 'a'.repeat(20), 200);
    for (let i = 21; i <= 40; i++) s.atualizar('a'.repeat(i), 19 * 200 + (i - 20) * 800);
    const [rapido, lento] = s.resultado().trechos;
    expect(lento.ppm).toBeLessThan(rapido.ppm / 3);
    expect(s.resultado().estabilidade).toBeLessThan(0.5);
  });

  it('descarta um trecho final curto demais', () => {
    const s = new Sessao('a'.repeat(23));
    digitar(s, 'a'.repeat(23), 100);
    expect(s.resultado().trechos).toHaveLength(1);
  });
});
