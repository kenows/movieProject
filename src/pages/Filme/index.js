import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme.css';
import api from '../../services/api';
import imagem from '../../imagem/logo2.jpeg';
import {toast} from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "c626389ed1bc7ffd1ab4753893a0d0d1",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME BUGADOOOOOOO");
          navigate("/", {replace:true});
          return;
        })

    }
    loadFilme();

    return () => {
      console.log("COMPONENTE DESMONTADO")
    }

  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme  = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id) 

    if(hasFilme){
      toast.warn("Esse filme ja esta na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
     
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes....</h1>
      </div>
    )
  } 

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={imagem} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className= "area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
        <a target="blank" rel="exernal" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
          Trailer
        </a>
        </button>
      </div>


    </div>
  )
}

export default Filme;