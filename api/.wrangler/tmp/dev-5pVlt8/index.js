var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/desafio.ts
var FRASES_DIARIAS = [
  "O gato derrubou o copo, olhou para mim e saiu andando sem pedir desculpas. Dez minutos depois, voltou miando na porta da cozinha, como se nada tivesse acontecido.",
  "\xC0s sextas, a padaria da esquina faz p\xE3o de queijo com o dobro de queijo. A fila come\xE7a antes das sete, e quem chega depois das oito s\xF3 sente o cheiro.",
  "O domingo passou t\xE3o r\xE1pido que parecia ter s\xF3 metade das horas. Entre o almo\xE7o demorado e o cochilo da tarde, quando vimos, j\xE1 era hora de pensar na segunda.",
  "Tr\xEAs x\xEDcaras de farinha, dois ovos, uma de a\xE7\xFAcar e uma pitada de paci\xEAncia. O resto da receita estava escrito \xE0 m\xE3o, com uma letra que s\xF3 a minha tia entendia.",
  "A \xFAltima pe\xE7a do quebra-cabe\xE7a estava embaixo do sof\xE1 desde o come\xE7o. Foram mil pe\xE7as, duas semanas de trabalho e um cachorro muito suspeito.",
  "Choveu a tarde inteira, e o cheiro de terra molhada entrou pela janela. Na rua, as crian\xE7as pulavam nas po\xE7as enquanto os adultos corriam atr\xE1s de um lugar coberto.",
  "Meu irm\xE3o jura que viu um disco voador sobre o pr\xE9dio, piscando luzes coloridas. Na manh\xE3 seguinte, descobrimos que era s\xF3 o drone novo do vizinho do quinto andar.",
  "A impressora sempre sabe quando o documento \xE9 urgente. Ela espera voc\xEA estar atrasado para mostrar uma mensagem de erro que ningu\xE9m no escrit\xF3rio consegue entender.",
  "Na praia, o sorvete derrete mais r\xE1pido do que a gente consegue tomar. Sobra uma m\xE3o grudenta, um sorriso satisfeito e a vontade de pedir mais um de outro sabor.",
  "O segredo de um bom caf\xE9 \xE9 a \xE1gua quente, mas nunca fervendo. O p\xF3 precisa ser fresco, a x\xEDcara deve estar aquecida e a conversa, de prefer\xEAncia, sem pressa.",
  "Dormi cedo, acordei com disposi\xE7\xE3o e mesmo assim perdi o \xF4nibus. Descobri no ponto que o despertador ainda estava no hor\xE1rio de ver\xE3o do ano passado.",
  "A bicicleta ficou anos na garagem, esperando algu\xE9m calibrar os pneus. Num s\xE1bado de sol, finalmente saiu para uma volta no parque e parecia at\xE9 mais feliz que eu.",
  "Toda festa de fam\xEDlia tem um tio que conta a mesma piada todo ano. A gra\xE7a j\xE1 n\xE3o est\xE1 na piada, mas em ver todo mundo rir na hora certa, como num ensaio.",
  "O p\xF4r do sol visto do alto do morro valeu cada degrau da escadaria. L\xE1 de cima, a cidade inteira ficava laranja, e ningu\xE9m quis ser o primeiro a descer.",
  "Ler antes de dormir \xE9 o jeito mais f\xE1cil de esquecer o celular. Uma p\xE1gina vira duas, duas viram um cap\xEDtulo, e quando voc\xEA percebe j\xE1 passou da meia-noite.",
  "O controle remoto sumiu de novo, e ningu\xE9m lembra quem viu por \xFAltimo. Depois de revirar a sala inteira, ele apareceu dentro da geladeira, ao lado do queijo.",
  "Na horta da escola, os alunos colheram tomates, alface e muita curiosidade. Cada um levou uma muda para casa, com a promessa de regar todos os dias.",
  "O vento levou o guarda-chuva, e eu fiquei s\xF3 com o cabo na m\xE3o. Cheguei ao trabalho com a roupa encharcada, mas com uma hist\xF3ria \xF3tima para contar.",
  "Aprender algo novo aos poucos, todos os dias, rende mais do que correr. Dez minutos de pr\xE1tica di\xE1ria valem mais do que uma maratona no fim de semana.",
  "O filme era t\xE3o bom que ningu\xE9m reparou que a pipoca tinha acabado. Quando as luzes acenderam, o balde estava vazio e a sala inteira aplaudiu de p\xE9.",
  "Arrumar a mala \xE9 f\xE1cil; dif\xEDcil \xE9 fechar o z\xEDper depois. Sempre sobra um par de sapatos, um casaco a mais e aquele livro que voc\xEA n\xE3o vai abrir na viagem.",
  "O papagaio da vizinha aprendeu a imitar o toque do meu telefone. Agora, toda manh\xE3, eu corro para atender uma liga\xE7\xE3o que nunca existiu.",
  "Uma caminhada curta depois do almo\xE7o deixa a tarde bem mais leve. O corpo agradece, a cabe\xE7a descansa e as ideias costumam aparecer no meio do caminho.",
  "Na biblioteca, o sil\xEAncio \xE9 tanto que d\xE1 para ouvir as p\xE1ginas virando. Foi l\xE1 que eu descobri que um bom livro pode fazer uma tarde inteira passar num instante.",
  "O time perdia por dois gols, mas a torcida n\xE3o parou de cantar um minuto. No \xFAltimo lance, a bola entrou, e o est\xE1dio inteiro explodiu de alegria.",
  "Quem digita com calma e sem errar termina antes de quem corre e corrige. Cada tecla apagada \xE9 um segundo perdido, e os segundos somam mais r\xE1pido do que parece.",
  "O bolo de cenoura com cobertura de chocolate sumiu antes do caf\xE9. Sobraram s\xF3 algumas migalhas no prato e a promessa de fazer outro no fim de semana.",
  "As estrelas aparecem melhor longe das luzes da cidade grande. Numa noite sem nuvens no campo, d\xE1 para ver tantas que parece que algu\xE9m espalhou a\xE7\xFAcar no c\xE9u.",
  "Hoje \xE9 um \xF3timo dia para come\xE7ar aquilo que voc\xEA vem adiando. N\xE3o precisa ser perfeito nem grandioso: o primeiro passo, por menor que seja, j\xE1 conta.",
  "A feira de artesanato da pra\xE7a reunia de tudo um pouco: cestos, cer\xE2mica, doces caseiros e brinquedos de madeira. Dif\xEDcil era sair de l\xE1 de m\xE3os vazias."
];
function dataHoje(agora = /* @__PURE__ */ new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(agora);
}
__name(dataHoje, "dataHoje");
function fraseDoDia(data) {
  const dias = Math.floor(Date.parse(`${data}T00:00:00Z`) / 864e5);
  return FRASES_DIARIAS[dias % FRASES_DIARIAS.length];
}
__name(fraseDoDia, "fraseDoDia");

// ../src/sessao.ts
var CARACTERES_POR_PALAVRA = 5;

// src/regras.ts
var PPM_MAXIMO = 250;
var PRECISAO_MINIMA = 0.9;
var DURACAO_MAXIMA_MS = 10 * 6e4;
var JOGADOR = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var PALAVRAS_BLOQUEADAS = ["porra", "caralho", "merda", "buceta", "puta", "foder", "fdp", "viado", "cuzao", "arrombado", "piroca", "xota"];
var normalizar = /* @__PURE__ */ __name((s) => s.normalize("NFD").replace(/[^a-zA-Z]/g, "").toLowerCase(), "normalizar");
var apelidoComPalavrao = /* @__PURE__ */ __name((apelido) => PALAVRAS_BLOQUEADAS.some((p) => normalizar(apelido).includes(p)), "apelidoComPalavrao");
var textoComPalavrao = /* @__PURE__ */ __name((texto) => texto.split(/\s+/).some((palavra) => PALAVRAS_BLOQUEADAS.includes(normalizar(palavra))), "textoComPalavrao");
var TAMANHO_TEXTO = { min: 120, max: 190 };
function extrairTextos(resposta) {
  return resposta.split("\n").map((l) => l.trim().replace(/^(\d+[.)]|[-*•])\s*/, "").replace(/^["“”']+|["“”']+$/g, "").replace(/\s+/g, " ").trim()).filter((t) => t.length >= TAMANHO_TEXTO.min && t.length <= TAMANHO_TEXTO.max).filter((t) => /^[\p{L}\p{N} .,;:!?()'"“”-]+$/u.test(t) && /[.!?]$/.test(t)).filter((t) => !textoComPalavrao(t));
}
__name(extrairTextos, "extrairTextos");
function validarApelido(bruto) {
  const apelido = typeof bruto === "string" ? bruto.trim().replace(/\s+/g, " ") : "";
  if (apelido.length < 2 || apelido.length > 20) return { erro: "O apelido precisa ter entre 2 e 20 caracteres." };
  if (!/^[\p{L}\p{N} ._-]+$/u.test(apelido)) return { erro: "Use s\xF3 letras, n\xFAmeros, espa\xE7o, ponto, h\xEDfen ou sublinhado." };
  if (apelidoComPalavrao(apelido)) return { erro: "Escolha outro apelido." };
  return { apelido };
}
__name(validarApelido, "validarApelido");
function avaliarEnvio(frase, inicio, agora, precisao) {
  const duracao = agora - inicio;
  if (duracao <= 0 || duracao > DURACAO_MAXIMA_MS) return { erro: "O tempo do desafio de hoje expirou. Volte amanh\xE3!" };
  if (typeof precisao !== "number" || !(precisao >= PRECISAO_MINIMA && precisao <= 1)) {
    return { erro: `Para entrar no ranking, a precis\xE3o precisa ser de pelo menos ${PRECISAO_MINIMA * 100}%.` };
  }
  const ppm = frase.length / CARACTERES_POR_PALAVRA / (duracao / 6e4);
  if (ppm > PPM_MAXIMO) return { erro: "Tempo imposs\xEDvel para uma pessoa. O resultado n\xE3o foi aceito." };
  return { ppm: Math.round(ppm * 10) / 10, precisao };
}
__name(avaliarEnvio, "avaliarEnvio");

// src/gerar.ts
var MODELO = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
var POR_PEDIDO = 6;
var TEMAS = [
  "cozinha e receitas",
  "animais de estima\xE7\xE3o",
  "viagens e passeios",
  "esportes",
  "natureza e clima",
  "lembran\xE7as de inf\xE2ncia",
  "vida na cidade",
  "vida no interior",
  "m\xFAsica e festas",
  "escola e aprendizado",
  "tecnologia no dia a dia",
  "fam\xEDlia e amigos",
  "hobbies e artesanato",
  "praia e f\xE9rias",
  "cinema e livros",
  "feira e mercado",
  "transporte e tr\xE2nsito",
  "jardim e horta",
  "fim de semana",
  "pequenos imprevistos engra\xE7ados"
];
var instrucoes = /* @__PURE__ */ __name((temas) => `Escreva ${POR_PEDIDO} textos originais em portugu\xEAs do Brasil, para treino de digita\xE7\xE3o.

Cada texto conta uma pequena cena do cotidiano, com algum detalhe concreto, curioso ou bem-humorado.
Evite frases gen\xE9ricas como "Gatos s\xE3o carinhosos" ou "Viajar \xE9 divertido".

Regras:
- Exatamente duas frases por texto, com 25 a 32 palavras no total.
- Linguagem leve, para todos os p\xFAblicos. Acentos e pontua\xE7\xE3o corretos.
- Sem nomes de pessoas reais, marcas, pol\xEDtica, religi\xE3o, viol\xEAncia, n\xFAmeros ou datas.
- Sem palavras que indiquem o g\xEAnero de quem narra (evite "cansado/cansada" em primeira pessoa).
- Um assunto diferente por texto, entre: ${temas.join(", ")}.

Exemplos do estilo esperado:
O controle remoto sumiu de novo, e ningu\xE9m lembra quem viu por \xFAltimo. Depois de revirar a sala inteira, ele apareceu dentro da geladeira, ao lado do queijo.
\xC0s sextas, a padaria da esquina faz p\xE3o de queijo com o dobro de queijo. A fila come\xE7a antes das sete, e quem chega depois das oito s\xF3 sente o cheiro.

Responda apenas com os textos, um por linha, sem numera\xE7\xE3o, sem aspas, sem linhas em branco e sem coment\xE1rios.`, "instrucoes");
async function pedir(ai, temas) {
  const resposta = await ai.run(MODELO, {
    messages: [{ role: "user", content: instrucoes(temas) }],
    max_tokens: 1200,
    temperature: 0.9
  });
  return extrairTextos(resposta.response ?? "");
}
__name(pedir, "pedir");
var criterios = /* @__PURE__ */ __name((textos) => `Voc\xEA \xE9 um editor rigoroso de textos em portugu\xEAs do Brasil. Avalie cada texto abaixo.

Aprove somente se TODOS os crit\xE9rios forem atendidos:
1. Ortografia, acentua\xE7\xE3o e concord\xE2ncia corretas, sem nenhuma palavra em outro idioma. Leia palavra por palavra:
   reprove erros como "sucosos" (o certo \xE9 "suculentos"), "agua" sem acento ou termos em ingl\xEAs como "favorite", "brunch" ou "children".
2. Soa natural, como algo que uma pessoa escreveria.
3. Tem um detalhe concreto, curioso ou bem-humorado; n\xE3o \xE9 s\xF3 uma descri\xE7\xE3o gen\xE9rica (como "O parque \xE9 bonito e as pessoas se divertem").

${textos.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Responda apenas com os n\xFAmeros dos textos aprovados, separados por v\xEDrgula. Se nenhum for aprovado, responda 0.`, "criterios");
async function revisar(ai, textos) {
  if (!textos.length) return [];
  const resposta = await ai.run(MODELO, {
    messages: [{ role: "user", content: criterios(textos) }],
    max_tokens: 100,
    temperature: 0
  });
  const aprovados = new Set((resposta.response ?? "").match(/\d+/g)?.map(Number));
  return textos.filter((_, i) => aprovados.has(i + 1));
}
__name(revisar, "revisar");
async function gerarTextos(ai, quantidade) {
  const temas = [...TEMAS].sort(() => Math.random() - 0.5);
  const pedidos = Math.ceil(quantidade / POR_PEDIDO);
  const lotes = await Promise.allSettled(
    Array.from({ length: pedidos }, (_, i) => pedir(ai, temas.slice(i * 4 % TEMAS.length, i * 4 % TEMAS.length + 4)))
  );
  const candidatos = [...new Set(lotes.flatMap((l) => l.status === "fulfilled" ? l.value : []))];
  return revisar(ai, candidatos);
}
__name(gerarTextos, "gerarTextos");

// src/index.ts
var JA_JOGOU = "Voc\xEA j\xE1 fez o desafio de hoje. Volte amanh\xE3!";
var TEXTOS_POR_DIA = 20;
async function desafioDoDia(db, data) {
  await db.prepare(`INSERT OR IGNORE INTO desafios (data, frase)
              SELECT ?, COALESCE((SELECT texto FROM textos WHERE texto NOT IN (SELECT frase FROM desafios) ORDER BY RANDOM() LIMIT 1), ?)`).bind(data, fraseDoDia(data)).run();
  return await db.prepare("SELECT frase FROM desafios WHERE data = ?").bind(data).first("frase");
}
__name(desafioDoDia, "desafioDoDia");
async function gerarDoDia(env) {
  const data = dataHoje();
  const textos = await gerarTextos(env.AI, TEXTOS_POR_DIA + 1);
  const usado = /* @__PURE__ */ __name((t) => env.DB.prepare("SELECT 1 FROM desafios WHERE frase = ?").bind(t).first(), "usado");
  let desafio;
  for (const t of textos) if (!desafio && !await usado(t)) desafio = t;
  const treino = textos.filter((t) => t !== desafio);
  if (desafio) await env.DB.prepare("INSERT OR IGNORE INTO desafios (data, frase) VALUES (?, ?)").bind(data, desafio).run();
  if (treino.length) {
    await env.DB.batch(treino.map((t) => env.DB.prepare("INSERT OR IGNORE INTO textos (texto) VALUES (?)").bind(t)));
  }
  console.log(`${data}: ${textos.length} textos gerados.`);
}
__name(gerarDoDia, "gerarDoDia");
async function ranking(db, data, jogador) {
  const { results: top } = await db.prepare("SELECT apelido, ppm, precisao FROM resultados WHERE data = ? ORDER BY ppm DESC, criado_em LIMIT 10").bind(data).all();
  const total = await db.prepare("SELECT COUNT(*) AS n FROM resultados WHERE data = ?").bind(data).first("n");
  const meu = jogador ? await db.prepare(`SELECT apelido, ppm, precisao,
                  (SELECT COUNT(*) FROM resultados r WHERE r.data = s.data AND r.ppm > s.ppm) + 1 AS posicao
                FROM resultados s WHERE data = ? AND jogador = ?`).bind(data, jogador).first() : null;
  return { data, total, top, meu };
}
__name(ranking, "ranking");
async function tratar(req, env) {
  const url = new URL(req.url);
  const hoje = dataHoje();
  if (url.pathname === "/teste-ia") {
    return [{ aceitos: await gerarTextos(env.AI, Number(url.searchParams.get("n")) || TEXTOS_POR_DIA + 1) }, 200];
  }
  if (req.method === "GET") {
    if (url.pathname === "/desafio") return [{ data: hoje, frase: await desafioDoDia(env.DB, hoje) }, 200];
    if (url.pathname === "/texto") {
      const excluir = Number(url.searchParams.get("excluir")) || 0;
      const texto = await env.DB.prepare("SELECT id, texto FROM textos WHERE id != ? ORDER BY RANDOM() LIMIT 1").bind(excluir).first();
      return texto ? [texto, 200] : [{ erro: "Acervo vazio." }, 404];
    }
    if (url.pathname === "/ranking") {
      const jogador2 = url.searchParams.get("jogador");
      return [await ranking(env.DB, hoje, jogador2 && JOGADOR.test(jogador2) ? jogador2 : null), 200];
    }
  }
  if (req.method !== "POST") return [{ erro: "N\xE3o encontrado." }, 404];
  const corpo = await req.json();
  const jogador = typeof corpo.jogador === "string" && JOGADOR.test(corpo.jogador) ? corpo.jogador : null;
  if (!jogador) return [{ erro: "Jogador inv\xE1lido." }, 400];
  const jaJogou = /* @__PURE__ */ __name(() => env.DB.prepare("SELECT 1 FROM resultados WHERE data = ? AND jogador = ?").bind(hoje, jogador).first(), "jaJogou");
  if (url.pathname === "/inicio") {
    if (await jaJogou()) return [{ erro: JA_JOGOU }, 409];
    await env.DB.prepare("INSERT OR IGNORE INTO inicios (data, jogador, inicio) VALUES (?, ?, ?)").bind(hoje, jogador, Date.now()).run();
    return [{ ok: true }, 200];
  }
  if (url.pathname === "/resultado") {
    const agora = Date.now();
    const inicio = await env.DB.prepare("SELECT inicio FROM inicios WHERE data = ? AND jogador = ?").bind(hoje, jogador).first("inicio");
    if (inicio === null) return [{ erro: "Desafio n\xE3o iniciado." }, 400];
    const apelido = validarApelido(corpo.apelido);
    if ("erro" in apelido) return [apelido, 400];
    const avaliacao = avaliarEnvio(await desafioDoDia(env.DB, hoje), inicio, agora, corpo.precisao);
    if ("erro" in avaliacao) return [avaliacao, 400];
    const { meta } = await env.DB.prepare("INSERT OR IGNORE INTO resultados (data, jogador, apelido, ppm, precisao) VALUES (?, ?, ?, ?, ?)").bind(hoje, jogador, apelido.apelido, avaliacao.ppm, avaliacao.precisao).run();
    if (!meta.changes) return [{ erro: JA_JOGOU }, 409];
    return [await ranking(env.DB, hoje, jogador), 201];
  }
  return [{ erro: "N\xE3o encontrado." }, 404];
}
__name(tratar, "tratar");
var src_default = {
  async fetch(req, env) {
    const origem = req.headers.get("Origin") ?? "";
    const cabecalhos = {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": env.ORIGENS.split(",").includes(origem) ? origem : "",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin"
    };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cabecalhos });
    try {
      const [corpo, status] = await tratar(req, env);
      return new Response(JSON.stringify(corpo), { status, headers: cabecalhos });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ erro: "Erro interno. Tente de novo em instantes." }), { status: 500, headers: cabecalhos });
    }
  },
  async scheduled(_evento, env, ctx) {
    ctx.waitUntil(gerarDoDia(env));
  }
};

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-scheduled.ts
var scheduled = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  const url = new URL(request.url);
  if (url.pathname === "/__scheduled") {
    const cron = url.searchParams.get("cron") ?? "";
    await middlewareCtx.dispatch("scheduled", { cron });
    return new Response("Ran scheduled event");
  }
  const resp = await middlewareCtx.next(request, env);
  if (request.headers.get("referer")?.endsWith("/__scheduled") && url.pathname === "/favicon.ico" && resp.status === 500) {
    return new Response(null, { status: 404 });
  }
  return resp;
}, "scheduled");
var middleware_scheduled_default = scheduled;

// .wrangler/tmp/bundle-QtTqbh/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_scheduled_default
];
var middleware_insertion_facade_default = src_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-QtTqbh/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
