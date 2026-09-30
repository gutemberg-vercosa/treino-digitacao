// Compartilhado entre o site e a API: os dois precisam chegar à mesma frase para a mesma data.

export const FRASES_DIARIAS = [
  'Quem mede o próprio trabalho descobre problemas que ninguém tinha percebido.',
  'Uma lista curta de prioridades vale mais do que um plano longo que ninguém lê.',
  'O café esfriou enquanto a reunião discutia a pauta da próxima reunião.',
  'Todo processo pode ser melhorado, mas nem toda melhoria vale o esforço.',
  'A última peça do quebra-cabeça estava embaixo do sofá desde o começo.',
  'Errar rápido e corrigir cedo custa menos do que acertar tarde demais.',
  'O mapa não é o território, e a planilha não é a operação.',
  'Na dúvida entre dois caminhos, escolha o que dá para desfazer.',
  'O ônibus atrasou, choveu no caminho e mesmo assim cheguei antes do chefe.',
  'Padronizar não é engessar: é garantir que o básico funcione sempre.',
  'Cada minuto de espera na fila é um minuto que ninguém vai devolver.',
  'O gato derrubou o copo, olhou para mim e saiu andando sem pedir desculpas.',
  'Simplicidade dá trabalho; complicar é que acontece sozinho.',
  'Um indicador sem meta é só um número bonito no painel.',
  'Às sextas, a padaria da esquina faz pão de queijo com o dobro de queijo.',
  'Antes de automatizar um processo ruim, vale a pena consertá-lo.',
  'Quem nunca apertou o botão errado que atire o primeiro teclado.',
  'Estoque parado é dinheiro dormindo no depósito.',
  'O segredo da constância é fazer um pouco todos os dias, mesmo sem vontade.',
  'Perguntar por que cinco vezes costuma chegar mais longe do que culpar alguém.',
  'O domingo passou tão rápido que parecia ter só metade das horas.',
  'Um bom relatório responde à pergunta antes de ela ser feita.',
  'Velocidade sem direção só faz você chegar mais rápido ao lugar errado.',
  'A impressora sempre sabe quando o documento é urgente.',
  'Organize a bancada no fim do dia e agradeça a si mesmo pela manhã.',
  'Dados sem contexto contam a história que cada um quer ouvir.',
  'Nenhum sistema resiste a um usuário determinado a clicar em tudo.',
  'A melhor hora para revisar o processo é antes de ele virar problema.',
  'Três xícaras de farinha, dois ovos e uma pitada de paciência.',
  'Quem digita com calma e sem errar termina antes de quem corre e corrige.',
];

/** Data de hoje (AAAA-MM-DD) no horário de Brasília, para o desafio virar à meia-noite para todos. */
export function dataHoje(agora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(agora);
}

/** Frase de uma data. Percorre a lista em ordem, recomeçando ao fim dela. */
export function fraseDoDia(data: string): string {
  const dias = Math.floor(Date.parse(`${data}T00:00:00Z`) / 86_400_000);
  return FRASES_DIARIAS[dias % FRASES_DIARIAS.length];
}
