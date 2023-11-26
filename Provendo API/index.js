const express = require('express');
const bd = require('./bd'); // Caminho para o arquivo bd.js

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para obter filmes por página
app.get('/filmes/:pagina', async (req, res) => {
  const { pagina } = req.params;

  try {
    const filmes = await bd.query(
      'SELECT * FROM filmes ORDER BY nota DESC LIMIT ?, 10',
      [(pagina - 1) * 10]
    );

    res.json(filmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar filmes.' });
  }
});


// Rota para obter informações de um filme por ID
app.get('/filme/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const filme = await bd.query('SELECT * FROM filmes WHERE id = ?', [id]);
    // Adicione lógica para obter gênero e atores relacionados ao filme

    res.json(filme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar informações do filme.' });
  }
});


// Rota para buscar filmes por palavra-chave
app.get('/filmes/busca/:palavra', async (req, res) => {
    const { palavra } = req.params;
  
    try {
      const filmes = await bd.query(
        'SELECT * FROM filmes WHERE titulo LIKE ?',
        [`%${palavra}%`]
      );
  
      res.json(filmes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar filmes.' });
    }
  });


// Rota para obter filmes por gênero
app.get('/generos/:genero', async (req, res) => {
    const { genero } = req.params;
  
    try {
      const filmesDoGenero = await bd.query(
        'SELECT filmes.titulo FROM filmes INNER JOIN filmes_generos ON filmes.id = filmes_generos.filme_id WHERE filmes_generos.genero_id = ?',
        [genero]
      );
  
      res.json(filmesDoGenero);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao recuperar filmes por gênero.' });
    }
  });
  

// Rota para obter ator por ID
app.get('/ator/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [ator] = await bd.query('SELECT titulo FROM atores WHERE id = ?', [id]);
      const filmesDoAtor = await bd.query(
        'SELECT filmes.titulo FROM filmes JOIN atores_filmes ON filmes.id = atores_filmes.filme_id WHERE atores_filmes.ator_id = ?',
        [id]
      );
  
      res.json({ ator: ator.titulo, filmes: filmesDoAtor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao recuperar informações do ator.' });
    }
});
  
  
// Rota para buscar atores por palavra-chave
app.get('/atores/busca/:palavra', async (req, res) => {
    const { palavra } = req.params;
  
    try {
      const atores = await bd.query(
        'SELECT id, titulo FROM atores WHERE titulo LIKE ?',
        [`%${palavra}%`]
      );
  
      const resultados = await Promise.all(
        atores.map(async (ator) => {
          const filmesDoAtor = await bd.query(
            'SELECT filmes.titulo FROM filmes JOIN atores_filmes ON filmes.id = atores_filmes.filme_id WHERE atores_filmes.ator_id = ?',
            [ator.id]
          );
          return { ator: ator.titulo, filmes: filmesDoAtor };
        })
      );
  
      res.json(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar atores.' });
    }
});
  

// Rota para criar um novo ator
app.post('/atores', async (req, res) => {
    const { titulo } = req.body;
  
    try {
      const resultado = await bd.query('INSERT INTO atores (titulo) VALUES (?)', [titulo]);
      
      // Recupera o registro do ator criado
      const novoAtor = await bd.query('SELECT * FROM atores WHERE id = ?', [resultado.insertId]);
  
      res.status(201).json(novoAtor[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar um novo ator.' });
    }
});
  
  
// Rota para editar o nome de um ator
app.put('/atores/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;
  
    try {
      await bd.query('UPDATE atores SET titulo = ? WHERE id = ?', [titulo, id]);
  
      // Recupera o registro do ator modificado
      const atorModificado = await bd.query('SELECT * FROM atores WHERE id = ?', [id]);
  
      if (atorModificado.length === 0) {
        res.status(404).json({ error: 'Ator não encontrado.' });
      } else {
        res.json(atorModificado[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao editar o nome do ator.' });
    }
});
  
  
// Rota para remover um ator
app.delete('/atores/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Remove registros vinculados na tabela atores_filmes
      await bd.query('DELETE FROM atores_filmes WHERE ator_id = ?', [id]);
  
      // Remove o ator da tabela atores
      const resultado = await bd.query('DELETE FROM atores WHERE id = ?', [id]);
  
      if (resultado.affectedRows === 0) {
        res.status(404).json({ error: 'Ator não encontrado.' });
      } else {
        res.json({ id });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao remover o ator.' });
    }
});
  

// Rota para cadastrar uma participação em um filme de um ator
app.post('/participacoes/:idAtor/:idFilme', async (req, res) => {
    const { idAtor, idFilme } = req.params;
  
    try {
      const resultado = await bd.query(
        'INSERT INTO atores_filmes (ator_id, filme_id) VALUES (?, ?)',
        [idAtor, idFilme]
      );
  
      res.status(201).json({ id: resultado.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar a participação.' });
    }
});
  
  
// Rota para remover uma participação em um filme de um ator
app.delete('/participacoes/:idAtor/:idFilme', async (req, res) => {
    const { idAtor, idFilme } = req.params;
  
    try {
      const resultado = await bd.query(
        'DELETE FROM atores_filmes WHERE ator_id = ? AND filme_id = ?',
        [idAtor, idFilme]
      );
  
      if (resultado.affectedRows === 0) {
        res.status(404).json({ error: 'Participação não encontrada.' });
      } else {
        res.json({ idAtor, idFilme });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao remover a participação.' });
    }
});
  
  
// Middleware para lidar com erros 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});
  
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
  