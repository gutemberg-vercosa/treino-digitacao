import { dataHoje, fraseDoDia } from './desafio';
import { avaliarEnvio, JOGADOR, validarApelido } from './regras';

interface Env {
  DB: D1Database;
  ORIGENS: string; // origens permitidas, separadas por vírgula
}

const JA_JOGOU = 'Você já fez o desafio de hoje. Volte amanhã!';

async function ranking(db: D1Database, data: string, jogador: string | null) {
  const { results: top } = await db
    .prepare('SELECT apelido, ppm, precisao FROM resultados WHERE data = ? ORDER BY ppm DESC, criado_em LIMIT 10')
    .bind(data)
    .all();
  const total = await db.prepare('SELECT COUNT(*) AS n FROM resultados WHERE data = ?').bind(data).first<number>('n');
  const meu = jogador
    ? await db
      .prepare(`SELECT apelido, ppm, precisao,
                  (SELECT COUNT(*) FROM resultados r WHERE r.data = s.data AND r.ppm > s.ppm) + 1 AS posicao
                FROM resultados s WHERE data = ? AND jogador = ?`)
      .bind(data, jogador)
      .first()
    : null;
  return { data, total, top, meu };
}

async function tratar(req: Request, env: Env): Promise<[unknown, number]> {
  const url = new URL(req.url);
  const hoje = dataHoje();

  if (req.method === 'GET') {
    if (url.pathname === '/desafio') return [{ data: hoje, frase: fraseDoDia(hoje) }, 200];
    if (url.pathname === '/ranking') {
      const jogador = url.searchParams.get('jogador');
      return [await ranking(env.DB, hoje, jogador && JOGADOR.test(jogador) ? jogador : null), 200];
    }
    return [{ erro: 'Não encontrado.' }, 404];
  }

  if (req.method !== 'POST') return [{ erro: 'Não encontrado.' }, 404];
  const corpo = await req.json<{ jogador?: unknown; apelido?: unknown; precisao?: unknown }>();
  const jogador = typeof corpo.jogador === 'string' && JOGADOR.test(corpo.jogador) ? corpo.jogador : null;
  if (!jogador) return [{ erro: 'Jogador inválido.' }, 400];

  if (url.pathname === '/inicio') {
    const jaJogou = await env.DB.prepare('SELECT 1 FROM resultados WHERE data = ? AND jogador = ?').bind(hoje, jogador).first();
    if (jaJogou) return [{ erro: JA_JOGOU }, 409];
    // Só a primeira chamada do dia grava a hora; as seguintes mantêm o relógio original.
    await env.DB.prepare('INSERT OR IGNORE INTO inicios (data, jogador, inicio) VALUES (?, ?, ?)').bind(hoje, jogador, Date.now()).run();
    return [{ ok: true }, 200];
  }

  if (url.pathname === '/resultado') {
    const agora = Date.now();
    const inicio = await env.DB.prepare('SELECT inicio FROM inicios WHERE data = ? AND jogador = ?').bind(hoje, jogador).first<number>('inicio');
    if (inicio === null) return [{ erro: 'Desafio não iniciado.' }, 400];

    const apelido = validarApelido(corpo.apelido);
    if ('erro' in apelido) return [apelido, 400];
    const avaliacao = avaliarEnvio(fraseDoDia(hoje), inicio, agora, corpo.precisao);
    if ('erro' in avaliacao) return [avaliacao, 400];

    const { meta } = await env.DB
      .prepare('INSERT OR IGNORE INTO resultados (data, jogador, apelido, ppm, precisao) VALUES (?, ?, ?, ?, ?)')
      .bind(hoje, jogador, apelido.apelido, avaliacao.ppm, avaliacao.precisao)
      .run();
    if (!meta.changes) return [{ erro: JA_JOGOU }, 409];
    return [await ranking(env.DB, hoje, jogador), 201];
  }

  return [{ erro: 'Não encontrado.' }, 404];
}

export default {
  async fetch(req, env) {
    const origem = req.headers.get('Origin') ?? '';
    const cabecalhos = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': env.ORIGENS.split(',').includes(origem) ? origem : '',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cabecalhos });

    try {
      const [corpo, status] = await tratar(req, env);
      return new Response(JSON.stringify(corpo), { status, headers: cabecalhos });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ erro: 'Erro interno. Tente de novo em instantes.' }), { status: 500, headers: cabecalhos });
    }
  },
} satisfies ExportedHandler<Env>;
