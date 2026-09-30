import { describe, expect, it } from 'vitest';
import { avaliarEnvio, JOGADOR, validarApelido } from './regras';
import { dataHoje, fraseDoDia, FRASES_DIARIAS } from '../../src/desafio';

describe('JOGADOR', () => {
  it('aceita só UUIDs', () => {
    expect(JOGADOR.test(crypto.randomUUID())).toBe(true);
    expect(JOGADOR.test('abc')).toBe(false);
    expect(JOGADOR.test("1' OR '1'='1")).toBe(false);
  });
});

describe('validarApelido', () => {
  it('aceita e limpa espaços', () => {
    expect(validarApelido('  Maria   Clara ')).toEqual({ apelido: 'Maria Clara' });
    expect(validarApelido('joão_2')).toEqual({ apelido: 'joão_2' });
  });

  it('rejeita tamanho fora do limite, símbolos e tipos errados', () => {
    expect(validarApelido('a')).toHaveProperty('erro');
    expect(validarApelido('a'.repeat(21))).toHaveProperty('erro');
    expect(validarApelido('<script>')).toHaveProperty('erro');
    expect(validarApelido(42)).toHaveProperty('erro');
  });

  it('bloqueia palavrões mesmo disfarçados com acento, espaço ou pontuação', () => {
    expect(validarApelido('Mérda')).toHaveProperty('erro');
    expect(validarApelido('po.rra 10')).toHaveProperty('erro');
  });
});

describe('avaliarEnvio', () => {
  const frase = 'a'.repeat(100); // 20 palavras

  it('calcula o PPM pelo tempo do servidor', () => {
    expect(avaliarEnvio(frase, 0, 30_000, 0.98)).toEqual({ ppm: 40, precisao: 0.98 });
  });

  it('rejeita tempo impossível para uma pessoa', () => {
    expect(avaliarEnvio(frase, 0, 1_000, 1)).toHaveProperty('erro');
  });

  it('rejeita precisão abaixo do mínimo ou inválida', () => {
    expect(avaliarEnvio(frase, 0, 30_000, 0.8)).toHaveProperty('erro');
    expect(avaliarEnvio(frase, 0, 30_000, 1.5)).toHaveProperty('erro');
    expect(avaliarEnvio(frase, 0, 30_000, '1')).toHaveProperty('erro');
  });

  it('rejeita desafio expirado', () => {
    expect(avaliarEnvio(frase, 0, 11 * 60_000, 1)).toHaveProperty('erro');
  });
});

describe('frase do dia', () => {
  it('muda à meia-noite de Brasília, não à de Greenwich', () => {
    expect(dataHoje(new Date('2026-10-02T02:30:00Z'))).toBe('2026-10-01'); // 23h30 em Brasília
    expect(dataHoje(new Date('2026-10-02T03:00:00Z'))).toBe('2026-10-02');
  });

  it('é a mesma para a mesma data e diferente no dia seguinte', () => {
    expect(fraseDoDia('2026-10-01')).toBe(fraseDoDia('2026-10-01'));
    expect(fraseDoDia('2026-10-01')).not.toBe(fraseDoDia('2026-10-02'));
  });

  it('só usa frases da lista', () => {
    expect(FRASES_DIARIAS).toContain(fraseDoDia('2031-01-01'));
  });
});
