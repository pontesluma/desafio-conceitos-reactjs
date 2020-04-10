import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [ repositories, SetRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => SetRepositories(response.data))
  }, []);


  async function handleAddRepository() {
    api.post('repositories', {
      title: "Desafio GoStack",
      url: "https://github.com/pontesluma/desafio-conceitos-reactjs",
      tech: ["ReactJs", "NodeJS"]
    }).then(response => SetRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(SetRepositories(
      repositories.filter(repository => repository.id !== id)
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
