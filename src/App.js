import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })  

  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "GitHub Challange",
      url: "https://github.com/mateusgcoelho/desafio-conceitos-nodejs",
      techs: ["React", "Node"]
    });

    setRepositories([...repositories, response.data])
  }

  function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((res) => {
      const repos = repositories;
      const repositorieIndex = repos.findIndex(repositorie => repositorie.id === id);

      repos.splice(repositorieIndex, 1);

      setRepositories([...repos]);
    });
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep =>   
          <li key={rep.id}>{rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li> 
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
