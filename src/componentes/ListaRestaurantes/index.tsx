import { useEffect } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { useState } from 'react';
import IPaginacao from '../../interfaces/IPaginacao';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {

    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(res => {
        console.log(res);
        setRestaurantes(res.data.results)
        setProximaPagina(res.data.next)
      })

      .catch(err => {
        console.log(err)
      })
  }, []);

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(res => {
        console.log(res);
        setRestaurantes([...restaurantes, ...res.data.results])
        setProximaPagina(res.data.next)
      })

      .catch(err => {
        console.log(err)
      })


  }

  const filtrandoRestaurantes:any = [];
  const navigate = useNavigate();

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {proximaPagina && <button onClick={verMais}>
        ver mais
      </button>}



      <button onClick={() => navigate(-1)}>
        voltar
      </button>




      <form>

        <TextField value={filtrandoRestaurantes[0]}
          id="standard-basic"
          label="Filtrar Restaurantes"
          variant="standard" />
        <Button type="submit" variant="outlined">
          Filtrar
        </Button>
      </form>
    </section>

  )
}

export default ListaRestaurantes