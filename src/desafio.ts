// Compartilhado entre o site e a API: os dois precisam chegar à mesma frase para a mesma data.

export const FRASES_DIARIAS = [
  'O gato derrubou o copo, olhou para mim e saiu andando sem pedir desculpas. Dez minutos depois, voltou miando na porta da cozinha, como se nada tivesse acontecido.',
  'Às sextas, a padaria da esquina faz pão de queijo com o dobro de queijo. A fila começa antes das sete, e quem chega depois das oito só sente o cheiro.',
  'O domingo passou tão rápido que parecia ter só metade das horas. Entre o almoço demorado e o cochilo da tarde, quando vimos, já era hora de pensar na segunda.',
  'Três xícaras de farinha, dois ovos, uma de açúcar e uma pitada de paciência. O resto da receita estava escrito à mão, com uma letra que só a minha tia entendia.',
  'A última peça do quebra-cabeça estava embaixo do sofá desde o começo. Foram mil peças, duas semanas de trabalho e um cachorro muito suspeito.',
  'Choveu a tarde inteira, e o cheiro de terra molhada entrou pela janela. Na rua, as crianças pulavam nas poças enquanto os adultos corriam atrás de um lugar coberto.',
  'Meu irmão jura que viu um disco voador sobre o prédio, piscando luzes coloridas. Na manhã seguinte, descobrimos que era só o drone novo do vizinho do quinto andar.',
  'A impressora sempre sabe quando o documento é urgente. Ela espera você estar atrasado para mostrar uma mensagem de erro que ninguém no escritório consegue entender.',
  'Na praia, o sorvete derrete mais rápido do que a gente consegue tomar. Sobra uma mão grudenta, um sorriso satisfeito e a vontade de pedir mais um de outro sabor.',
  'O segredo de um bom café é a água quente, mas nunca fervendo. O pó precisa ser fresco, a xícara deve estar aquecida e a conversa, de preferência, sem pressa.',
  'Dormi cedo, acordei com disposição e mesmo assim perdi o ônibus. Descobri no ponto que o despertador ainda estava no horário de verão do ano passado.',
  'A bicicleta ficou anos na garagem, esperando alguém calibrar os pneus. Num sábado de sol, finalmente saiu para uma volta no parque e parecia até mais feliz que eu.',
  'Toda festa de família tem um tio que conta a mesma piada todo ano. A graça já não está na piada, mas em ver todo mundo rir na hora certa, como num ensaio.',
  'O pôr do sol visto do alto do morro valeu cada degrau da escadaria. Lá de cima, a cidade inteira ficava laranja, e ninguém quis ser o primeiro a descer.',
  'Ler antes de dormir é o jeito mais fácil de esquecer o celular. Uma página vira duas, duas viram um capítulo, e quando você percebe já passou da meia-noite.',
  'O controle remoto sumiu de novo, e ninguém lembra quem viu por último. Depois de revirar a sala inteira, ele apareceu dentro da geladeira, ao lado do queijo.',
  'Na horta da escola, os alunos colheram tomates, alface e muita curiosidade. Cada um levou uma muda para casa, com a promessa de regar todos os dias.',
  'O vento levou o guarda-chuva, e eu fiquei só com o cabo na mão. Cheguei ao trabalho com a roupa encharcada, mas com uma história ótima para contar.',
  'Aprender algo novo aos poucos, todos os dias, rende mais do que correr. Dez minutos de prática diária valem mais do que uma maratona no fim de semana.',
  'O filme era tão bom que ninguém reparou que a pipoca tinha acabado. Quando as luzes acenderam, o balde estava vazio e a sala inteira aplaudiu de pé.',
  'Arrumar a mala é fácil; difícil é fechar o zíper depois. Sempre sobra um par de sapatos, um casaco a mais e aquele livro que você não vai abrir na viagem.',
  'O papagaio da vizinha aprendeu a imitar o toque do meu telefone. Agora, toda manhã, eu corro para atender uma ligação que nunca existiu.',
  'Uma caminhada curta depois do almoço deixa a tarde bem mais leve. O corpo agradece, a cabeça descansa e as ideias costumam aparecer no meio do caminho.',
  'Na biblioteca, o silêncio é tanto que dá para ouvir as páginas virando. Foi lá que eu descobri que um bom livro pode fazer uma tarde inteira passar num instante.',
  'O time perdia por dois gols, mas a torcida não parou de cantar um minuto. No último lance, a bola entrou, e o estádio inteiro explodiu de alegria.',
  'Quem digita com calma e sem errar termina antes de quem corre e corrige. Cada tecla apagada é um segundo perdido, e os segundos somam mais rápido do que parece.',
  'O bolo de cenoura com cobertura de chocolate sumiu antes do café. Sobraram só algumas migalhas no prato e a promessa de fazer outro no fim de semana.',
  'As estrelas aparecem melhor longe das luzes da cidade grande. Numa noite sem nuvens no campo, dá para ver tantas que parece que alguém espalhou açúcar no céu.',
  'Hoje é um ótimo dia para começar aquilo que você vem adiando. Não precisa ser perfeito nem grandioso: o primeiro passo, por menor que seja, já conta.',
  'A feira de artesanato da praça reunia de tudo um pouco: cestos, cerâmica, doces caseiros e brinquedos de madeira. Difícil era sair de lá de mãos vazias.',
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
