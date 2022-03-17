import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import { Formulario } from './components/Formulario'
import { Resultado } from './components/Resultado'
import { Spinner } from './components/Spinner'

const Contenedor = styled.section`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  width: 400px;
  max-width: 80%;
  margin: 100px auto 0 auto;
  display: block; 
`

const Heading = styled.h1`
  font-family: 'lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2f2;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect( () => {
    if(Object.keys(monedas).length > 0 ){
      const cotizarMoneda = async () => {
        setCargando(true)
        setResultado({})
        const {moneda, criptomoneda} = monedas
        const URL = await `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(URL)
        const resultado = await respuesta.json()
        // Manera de buscar en el objeto cuando cada llave del objeto varia entre cada llamado
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }
      cotizarMoneda()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt='Imagenes de criptomonedas'
      />
      <section>
        <Heading>Cotiza tu criptomonedas al isntante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        { cargando && <Spinner/>}
        { resultado.PRICE && <Resultado resultado={resultado} />}
      </section>
    </Contenedor>
  )

}
export default App
