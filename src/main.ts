import { buscarRanking, enviarResultado, iniciarDesafio, type Ranking } from './api';
import { dataHoje, fraseDoDia } from './desafio';
import { Sessao, type Resultado } from './sessao';
import { TEXTOS } from './textos';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const pct = (v: number) => `${(v * 100).toFixed(0)}%`;
const num = (v: number, casas = 0) => v.toLocaleString('pt-BR', { maximumFractionDigits: casas });
const nomeTecla = (c: string) => (c === ' ' ? 'espaço' : c);

// localStorage pode estar bloqueado (aba anônima, por exemplo); nesse caso nada é lembrado.
function ler(chave: string) {
  try { return localStorage.getItem(chave) ?? ''; } catch { return ''; }
}
function salvar(chave: string, valor: string) {
  try { localStorage.setItem(chave, valor); } catch { /* segue sem guardar */ }
}

const entrada = $<HTMLTextAreaElement>('entrada');
const texto = $('texto');
const resultado = $('resultado');
const apelido = $<HTMLInputElement>('apelido');
const DICA = 'Toque no texto e comece a digitar. O tempo começa na primeira tecla.';

const jogador = ler('jogador') || crypto.randomUUID();
salvar('jogador', jogador);
apelido.value = ler('apelido');

let modo: 'treino' | 'desafio' = 'treino';
let sessao: Sessao;
let indice = -1;
let relogio = 0;
let inicioDesafio: Promise<unknown> | null = null;

/** No desafio, só a primeira rodada completa do dia vai para o ranking. */
const valendo = () => modo === 'desafio' && ler('desafio-feito') !== dataHoje();

function iniciar(novoTexto: boolean) {
  if (modo === 'desafio') {
    sessao = new Sessao(fraseDoDia(dataHoje()));
  } else {
    if (novoTexto) {
      // Sorteia um texto diferente do atual.
      const anterior = indice;
      while (indice === anterior) indice = Math.floor(Math.random() * TEXTOS.length);
    }
    sessao = new Sessao(TEXTOS[indice]);
  }
  clearInterval(relogio);
  entrada.value = '';
  resultado.hidden = true;
  $('dica').hidden = false;
  prepararDesafio();

  texto.replaceChildren(...[...sessao.texto].map((c) => {
    const span = document.createElement('span');
    span.textContent = c;
    return span;
  }));
  pintar();
  atualizarStatus();
  entrada.focus({ preventScroll: true });
}

function pintar() {
  const estados = sessao.estados();
  texto.querySelectorAll('span').forEach((span, i) => {
    span.className = estados[i] === 'pendente' && i === sessao.posicao ? 'atual' : estados[i];
  });
}

function atualizarStatus() {
  const p = sessao.parcial(performance.now());
  $('vivo-ppm').textContent = num(p.ppm);
  $('vivo-precisao').textContent = pct(p.precisao);
  $('vivo-tempo').textContent = `${num(p.segundos)} s`;
}

function aoDigitar() {
  const agora = performance.now();
  const comecou = !sessao.iniciou;
  sessao.atualizar(entrada.value, agora);
  if (entrada.value.length > sessao.texto.length) entrada.value = entrada.value.slice(0, sessao.texto.length);

  if (comecou && sessao.iniciou) {
    $('dica').hidden = true;
    relogio = window.setInterval(atualizarStatus, 250);
    // O servidor marca a hora de início; a digitação segue sem esperar a resposta.
    if (valendo()) inicioDesafio = iniciarDesafio(jogador).catch((e: Error) => e);
  }
  pintar();

  if (sessao.terminou) {
    clearInterval(relogio);
    atualizarStatus();
    entrada.disabled = true;
    const r = sessao.resultado();
    mostrarResultado(r);
    if (valendo()) enviar(r.precisao);
  }
}

// --- Desafio do dia --------------------------------------------------------

function prepararDesafio() {
  const noDesafio = modo === 'desafio';
  $('desafio').hidden = !noDesafio;
  $('ranking').hidden = !noDesafio;
  $('novo').hidden = noDesafio;
  $('de-novo').hidden = noDesafio;

  const semApelido = valendo() && apelido.value.trim().length < 2;
  entrada.disabled = semApelido || sessao.terminou;
  $('dica').textContent = semApelido ? 'Escolha um apelido acima para começar.' : DICA;
  $('desafio-status').textContent = !noDesafio ? ''
    : valendo() ? 'A frase é a mesma para todo mundo e muda à meia-noite. Vale a primeira tentativa: recomeçar não zera o relógio.'
    : 'Você já participou hoje. Pode praticar a frase à vontade; o ranking não muda.';
}

async function enviar(precisao: number) {
  $('ranking-msg').textContent = 'Enviando seu resultado…';
  try {
    const erroInicio = await inicioDesafio;
    if (erroInicio instanceof Error) throw erroInicio;
    const rk = await enviarResultado(jogador, apelido.value.trim(), precisao);
    salvar('desafio-feito', rk.data);
    mostrarRanking(rk);
  } catch (e) {
    const msg = (e as Error).message;
    if (msg.includes('já fez')) salvar('desafio-feito', dataHoje());
    $('ranking-msg').textContent = msg;
  }
  prepararDesafio();
}

async function carregarRanking() {
  $('ranking-msg').textContent = 'Carregando…';
  try {
    mostrarRanking(await buscarRanking(jogador));
  } catch (e) {
    $('ranking-msg').textContent = (e as Error).message;
  }
}

function mostrarRanking(rk: Ranking) {
  const { meu } = rk;
  $('ranking-msg').textContent = meu
    ? `Você ficou em ${meu.posicao}º de ${rk.total}, com ${num(meu.ppm, 1)} PPM medidos pelo servidor.`
    : rk.total ? `${rk.total} ${rk.total === 1 ? 'pessoa fez' : 'pessoas fizeram'} o desafio hoje.`
    : 'Ninguém fez o desafio de hoje ainda. Seja a primeira pessoa!';

  $('ranking-lista').replaceChildren(...rk.top.map((l, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="pos"></span><span class="nome"></span><span class="ppm"></span>';
    li.children[0].textContent = `${i + 1}º`;
    li.children[1].textContent = l.apelido;
    li.children[2].textContent = `${num(l.ppm, 1)} PPM`;
    li.classList.toggle('meu', !!meu && meu.posicao === i + 1 && meu.apelido === l.apelido);
    return li;
  }));
}

function trocarModo(novo: typeof modo) {
  modo = novo;
  document.querySelectorAll<HTMLElement>('.abas button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.modo === novo)));
  iniciar(novo === 'treino');
  if (novo === 'desafio') carregarRanking();
}

function faixaVelocidade(ppm: number): [string, string] {
  if (ppm >= 60) return ['alto', 'Muito rápido'];
  if (ppm >= 40) return ['alto', 'Rápido'];
  if (ppm >= 25) return ['medio', 'Intermediário'];
  return ['baixo', 'Iniciante'];
}

function desenharGrafico(r: Resultado) {
  const L = 600, A = 160, folga = 6;
  const max = Math.max(...r.trechos.map((t) => t.ppm)) * 1.1;
  const media = r.trechos.reduce((s, t) => s + t.ppm, 0) / r.trechos.length;
  const lento = r.trechos.reduce((a, b) => (b.ppm < a.ppm ? b : a));
  const largura = L / r.trechos.length;
  const y = (v: number) => A - (v / max) * A;

  const barras = r.trechos.map((t, i) => {
    const h = A - y(t.ppm);
    return `<rect x="${i * largura + folga / 2}" y="${y(t.ppm)}" width="${largura - folga}" height="${h}" rx="6" class="${t === lento ? 'lento' : ''}"><title>${num(t.ppm)} PPM</title></rect>`;
  });
  const grafico = $('r-grafico');
  grafico.setAttribute('viewBox', `0 0 ${L} ${A}`);
  grafico.innerHTML = `${barras.join('')}<line x1="0" x2="${L}" y1="${y(media)}" y2="${y(media)}" class="media"/>`;
  return lento;
}

function diagnostico(r: Resultado, trechoLento: string): string {
  const teclas = r.teclas.slice(0, 3).map(([c]) => `“${nomeTecla(c)}”`).join(', ');
  if (r.precisao < 0.95) {
    return `Sua precisão ficou em ${pct(r.precisao)}. Abaixo de 95%, corrigir erros custa mais tempo do que digitar um pouco mais devagar: reduza o ritmo e priorize acertar${teclas ? `, com atenção a ${teclas}` : ''}. A velocidade vem com a prática.`;
  }
  if (r.estabilidade < 0.85) {
    return `A precisão foi boa, mas o ritmo oscilou entre os trechos. O mais lento foi “${trechoLento.trim()}”. Manter um ritmo constante, mesmo que um pouco menor, costuma render mais do que alternar picos de velocidade e pausas.`;
  }
  return `Boa combinação de precisão e ritmo constante. Para ganhar velocidade daqui em diante, aumente o ritmo aos poucos e só volte a acelerar quando a precisão se mantiver acima de 95%.`;
}

function mostrarResultado(r: Resultado) {
  const [classe, rotulo] = faixaVelocidade(r.ppm);
  $('r-ppm').textContent = num(r.ppm);
  const faixa = $('r-faixa');
  faixa.textContent = rotulo;
  faixa.className = `faixa ${classe}`;

  const recorde = r.ppm > Number(ler('recorde-ppm')) && r.precisao >= 0.9;
  $('r-recorde').hidden = !recorde;
  if (recorde) salvar('recorde-ppm', String(r.ppm));

  $('r-precisao').textContent = pct(r.precisao);
  $('r-precisao-conta').textContent = `(${r.digitados} − ${r.erros} erros) ÷ ${r.digitados} toques`;
  $('r-tempo').textContent = `${num(r.segundos, 1)} s`;
  $('r-tempo-conta').textContent = `${sessao.texto.length} caracteres`;
  $('r-estabilidade').textContent = pct(r.estabilidade);

  const lento = desenharGrafico(r);

  $('r-teclas-bloco').hidden = r.teclas.length === 0;
  $('r-teclas').replaceChildren(...r.teclas.slice(0, 6).map(([c, n]) => {
    const el = document.createElement('span');
    el.innerHTML = '<kbd></kbd><small></small>';
    el.querySelector('kbd')!.textContent = nomeTecla(c);
    el.querySelector('small')!.textContent = `${n}×`;
    return el;
  }));

  // Amplia o trecho mais lento até palavras inteiras, para citá-lo no diagnóstico.
  const t = sessao.texto;
  const fim = t.indexOf(' ', lento.fim - 1);
  $('r-diag').textContent = diagnostico(r, t.slice(t.lastIndexOf(' ', lento.inicio) + 1, fim < 0 ? t.length : fim));
  resultado.hidden = false;
  resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

entrada.addEventListener('input', (e) => {
  // Com teclas mortas (acentos), só processa quando a letra final estiver composta.
  if (!(e as InputEvent).isComposing) aoDigitar();
});
entrada.addEventListener('compositionend', aoDigitar);
entrada.addEventListener('paste', (e) => e.preventDefault());
entrada.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') iniciar(false);
});

apelido.addEventListener('input', () => {
  salvar('apelido', apelido.value.trim());
  prepararDesafio();
});
document.querySelectorAll<HTMLElement>('.abas button').forEach((b) => b.addEventListener('click', () => trocarModo(b.dataset.modo as typeof modo)));

$('reiniciar').addEventListener('click', () => iniciar(false));
$('novo').addEventListener('click', () => iniciar(true));
$('de-novo').addEventListener('click', () => {
  iniciar(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

iniciar(true);
