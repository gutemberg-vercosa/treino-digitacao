export type Estado = 'certo' | 'errado' | 'pendente';

/** Convenção de mercado: uma "palavra" equivale a 5 caracteres, espaço incluso. */
export const CARACTERES_POR_PALAVRA = 5;
/** Tamanho de cada trecho usado para medir o ritmo. */
export const TAMANHO_TRECHO = 20;

export interface Trecho {
  inicio: number;
  fim: number;
  ppm: number;
}

export interface Resultado {
  ppm: number;
  precisao: number;
  segundos: number;
  digitados: number;
  erros: number;
  /** Teclas esperadas em que houve erro, da mais errada para a menos. */
  teclas: [string, number][];
  trechos: Trecho[];
  /** 1 − coeficiente de variação do PPM entre trechos (1 = ritmo perfeitamente constante). */
  estabilidade: number;
}

const ppm = (caracteres: number, ms: number) => (ms > 0 ? caracteres / CARACTERES_POR_PALAVRA / (ms / 60000) : 0);

export class Sessao {
  private digitado = '';
  private inicio: number | null = null;
  private fim: number | null = null;
  private digitados = 0;
  private erros = 0;
  private errosPorTecla = new Map<string, number>();
  /** Instante em que cada posição do texto foi digitada pela última vez. */
  private tempos: number[] = [];

  constructor(readonly texto: string) {}

  get iniciou() { return this.inicio !== null; }
  get terminou() { return this.fim !== null; }
  get posicao() { return this.digitado.length; }

  /** Recebe o conteúdo atual do campo de digitação; só caracteres novos contam como toques. */
  atualizar(valor: string, agora: number): void {
    if (this.terminou) return;
    valor = valor.slice(0, this.texto.length);
    this.inicio ??= valor ? agora : null;

    for (let i = this.digitado.length; i < valor.length; i++) {
      this.digitados++;
      this.tempos[i] = agora;
      if (valor[i] !== this.texto[i]) {
        this.erros++;
        this.errosPorTecla.set(this.texto[i], (this.errosPorTecla.get(this.texto[i]) ?? 0) + 1);
      }
    }

    this.digitado = valor;
    if (valor.length === this.texto.length) this.fim = agora;
  }

  estados(): Estado[] {
    return [...this.texto].map((c, i) => (i >= this.digitado.length ? 'pendente' : this.digitado[i] === c ? 'certo' : 'errado'));
  }

  private certos() {
    return [...this.digitado].filter((c, i) => c === this.texto[i]).length;
  }

  /** Métricas parciais, para exibir durante a digitação. */
  parcial(agora: number) {
    const ms = this.inicio === null ? 0 : (this.fim ?? agora) - this.inicio;
    return {
      ppm: ppm(this.certos(), ms),
      precisao: this.digitados ? (this.digitados - this.erros) / this.digitados : 1,
      segundos: ms / 1000,
    };
  }

  resultado(): Resultado {
    if (this.inicio === null || this.fim === null) throw new Error('A sessão ainda não terminou.');

    const trechos: Trecho[] = [];
    for (let inicio = 0; inicio < this.texto.length; inicio += TAMANHO_TRECHO) {
      const fim = Math.min(inicio + TAMANHO_TRECHO, this.texto.length);
      // Trechos finais muito curtos distorcem a medida; ficam de fora.
      if (fim - inicio < CARACTERES_POR_PALAVRA) break;
      const de = inicio === 0 ? this.inicio : this.tempos[inicio - 1];
      trechos.push({ inicio, fim, ppm: ppm(fim - inicio, this.tempos[fim - 1] - de) });
    }

    const media = trechos.reduce((s, t) => s + t.ppm, 0) / trechos.length;
    const desvio = Math.sqrt(trechos.reduce((s, t) => s + (t.ppm - media) ** 2, 0) / trechos.length);

    return {
      ...this.parcial(this.fim),
      digitados: this.digitados,
      erros: this.erros,
      teclas: [...this.errosPorTecla].sort((a, b) => b[1] - a[1]),
      trechos,
      estabilidade: media > 0 ? Math.max(0, 1 - desvio / media) : 0,
    };
  }
}
