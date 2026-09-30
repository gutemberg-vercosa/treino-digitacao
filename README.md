# Treino de Digitação

Mede velocidade, precisão e a estabilidade do ritmo de digitação, trecho a trecho, e diz onde focar para melhorar.

**Acesse:** https://gutemberg-vercosa.github.io/treino-digitacao/

<a href="https://gutemberg-vercosa.github.io/treino-digitacao/"><img src="docs/preview.png" width="720" alt="Resultado de uma sessão: 54 palavras por minuto, precisão de 99%, gráfico de ritmo por trecho e teclas com mais erros"></a>

## O que ele faz

- Mostra velocidade, precisão e tempo enquanto você digita, com o erro destacado na hora.
- Ao terminar, mostra:
  - **Palavras por minuto (PPM)**, contando só os caracteres certos.
  - **Precisão**, incluindo erros que foram corrigidos depois.
  - **Estabilidade do ritmo**: o texto é dividido em trechos de 20 caracteres, e a estabilidade é 1 menos o coeficiente de variação do PPM entre eles. É a mesma ideia de variabilidade usada no controle de processos.
  - Um gráfico do ritmo por trecho, com o trecho mais lento em destaque.
  - As teclas em que você mais errou.
  - Um diagnóstico do que priorizar: precisão, constância ou velocidade.
- Guarda o seu recorde pessoal no navegador.
- Funciona no celular: tocar no texto abre o teclado.

## Tecnologias

- TypeScript e Vite, sem frameworks.
- Vitest para os testes da lógica de medição (`src/sessao.test.ts`).
- GitHub Actions roda os testes, gera o build e publica no GitHub Pages a cada push.
- Layout mobile first, com tema claro e escuro automático.

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `src/sessao.ts` | Lógica pura: estado de cada caractere, erros, PPM, precisão e ritmo por trecho |
| `src/main.ts` | Interface: captura da digitação, atualização da tela e resultado |
| `src/textos.ts` | Textos de treino |

## Rodando localmente

```bash
npm install
npm run dev    # servidor de desenvolvimento
npm test       # testes
npm run build  # build de produção em dist/
```
