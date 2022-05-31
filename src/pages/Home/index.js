import { useEffect, useState } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';
import  imagem from '../../imagem/logo1.png'


function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "c626389ed1bc7ffd1ab4753893a0d0d1",
          language: "pt-BR",
          page: 1,
        }
      })
      //console.log(response.data);
      setFilmes(response.data.results.slice(0,10));
      setLoading(false);
    }

    loadFilmes();

  }, [])


  if(loading){
    return(
      <div className="loading">
          <h2>Caregando Filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
       
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>Nome: {filme.title}</strong>
              <img src={imagem} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home;