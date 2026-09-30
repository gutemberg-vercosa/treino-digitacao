// Compartilhado entre o site e a API: os dois precisam chegar à mesma frase para a mesma data.

export const FRASES_DIARIAS = [
  'O gato derrubou o copo, olhou para mim e saiu andando sem pedir desculpas.',
  'Às sextas, a padaria da esquina faz pão de queijo com o dobro de queijo.',
  'O domingo passou tão rápido que parecia ter só metade das horas.',
  'Três xícaras de farinha, dois ovos e uma pitada de paciência.',
  'A última peça do quebra-cabeça estava embaixo do sofá desde o começo.',
  'Quem nunca apertou o botão errado que atire o primeiro teclado.',
  'Choveu a tarde inteira, e o cheiro de terra molhada entrou pela janela.',
  'Meu irmão jura que viu um disco voador, mas era só o drone do vizinho.',
  'A impressora sempre sabe quando o documento é urgente.',
  'Na praia, o sorvete derrete mais rápido do que a gente consegue tomar.',
  'O segredo de um bom café é a água quente, mas nunca fervendo.',
  'Dormi cedo, acordei com disposição e mesmo assim perdi o ônibus.',
  'A bicicleta ficou anos na garagem, esperando alguém calibrar os pneus.',
  'Toda festa de família tem um tio que conta a mesma piada todo ano.',
  'O pôr do sol visto do alto do morro valeu cada degrau da escadaria.',
  'Ler antes de dormir é o jeito mais rápido de esquecer o celular.',
  'O controle remoto sumiu de novo, e ninguém lembra quem viu por último.',
  'Na horta da escola, os alunos colheram tomates, alface e muita curiosidade.',
  'O vento levou o guarda-chuva, e eu fiquei só com o cabo na mão.',
  'Aprender algo novo aos poucos, todos os dias, rende mais do que correr.',
  'O filme era tão bom que ninguém reparou que a pipoca tinha acabado.',
  'Arrumar a mala é fácil; difícil é fechar o zíper depois.',
  'O papagaio da vizinha aprendeu a imitar o toque do meu telefone.',
  'Uma caminhada curta depois do almoço deixa a tarde bem mais leve.',
  'Na biblioteca, o silêncio é tanto que dá para ouvir as páginas virando.',
  'O time perdia por dois gols, mas a torcida não parou de cantar um minuto.',
  'Quem digita com calma e sem errar termina antes de quem corre e corrige.',
  'O bolo de cenoura com cobertura de chocolate sumiu antes do café.',
  'As estrelas aparecem melhor longe das luzes da cidade grande.',
  'Hoje é um ótimo dia para começar aquilo que você vem adiando.',
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
