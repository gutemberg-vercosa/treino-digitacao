-- Hora em que cada pessoa começou o desafio do dia. Só a primeira tentativa vale:
-- recomeçar não zera o relógio, então repetir o desafio só piora o tempo.
CREATE TABLE IF NOT EXISTS inicios (
  data TEXT NOT NULL,         -- dia do desafio (AAAA-MM-DD, horário de Brasília)
  jogador TEXT NOT NULL,      -- identificador anônimo gerado no navegador
  inicio INTEGER NOT NULL,    -- epoch em ms, medido no servidor
  PRIMARY KEY (data, jogador)
);

CREATE TABLE IF NOT EXISTS resultados (
  data TEXT NOT NULL,
  jogador TEXT NOT NULL,
  apelido TEXT NOT NULL,
  ppm REAL NOT NULL,          -- calculado no servidor a partir de inicios.inicio
  precisao REAL NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (data, jogador) -- um resultado por pessoa por dia
);

CREATE INDEX IF NOT EXISTS idx_ranking ON resultados (data, ppm DESC);
