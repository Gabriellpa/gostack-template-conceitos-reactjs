import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("repositories");
      if (response.data) {
        setRepositories(response.data);
      }
    })();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "desafio-react",
      url: "htpps://github.com/gabriellpa/desafio-react",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => {
      repository.id !== id
    }));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
