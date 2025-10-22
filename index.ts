import { Client } from 'pg';
import * as readline from 'readline';

// Função para calcular média
const calcularMedia = (notas: number[]) => {
  const soma = notas.reduce((acc, val) => acc + val, 0);
  return soma / notas.length;
};

// Função para criar interface de leitura no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pergunta(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

// Função para ler 6 notas do usuário para uma matéria
async function lerNotas(materia: string): Promise<number[]> {
  console.log(`Digite as 6 notas de ${materia} separadas por espaço:`);

  while (true) {
    const resposta = await pergunta(`Notas de ${materia}: `);
    const notasStr = resposta.trim().split(/\s+/);

    if (notasStr.length !== 6) {
      console.log('Você deve digitar exatamente 6 notas. Tente novamente.');
      continue;
    }

    const notas = notasStr.map(n => parseFloat(n));
    if (notas.some(isNaN)) {
      console.log('Notas inválidas detectadas. Use apenas números. Tente novamente.');
      continue;
    }

    return notas;
  }
}

// Função para inserir aluno no banco
async function inserirAluno(
  nome: string,
  serie: string,
  idade: number,
  matematica: number[],
  geografia: number[],
  historia: number[]
) {
const mediaMatematica = parseFloat(calcularMedia(matematica).toFixed(3));
const mediaGeografia = parseFloat(calcularMedia(geografia).toFixed(3));
const mediaHistoria = parseFloat(calcularMedia(historia).toFixed(3));

  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'admin',
    password: 'admin',
    database: 'escola',
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados!');

    const query = `
      INSERT INTO alunos 
      (nome, serie, idade, matematica, geografia, historia, media_matematica, media_geografia, media_historia)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      nome,
      serie,
      idade,
      matematica,
      geografia,
      historia,
      mediaMatematica,
      mediaGeografia,
      mediaHistoria,
    ];

    const res = await client.query(query, values);
    console.log('Aluno inserido:', res.rows[0]);

  } catch (error) {
    console.error('Erro ao inserir aluno:', error);
  } finally {
    await client.end();
  }
}

async function main() {
  const nome = await pergunta('Nome do aluno: ');
  const serie = await pergunta('Série: ');
  
  let idade: number;
  while (true) {
    const idadeStr = await pergunta('Idade: ');
    idade = parseInt(idadeStr);
    if (!isNaN(idade) && idade > 0) break;
    console.log('Idade inválida. Digite um número válido.');
  }

  const matematica = await lerNotas('Matemática');
  const geografia = await lerNotas('Geografia');
  const historia = await lerNotas('História');

  await inserirAluno(nome, serie, idade, matematica, geografia, historia);

  rl.close();
}

main();