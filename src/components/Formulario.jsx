import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { Error } from './Error'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border-radius: 5px;
    border: none;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
    padding: 10px;
    text-transform: uppercase;
    transition: backgroud-color .3s ease;
    width: 100%;

    &:hover{
        background-color: #7a7dfe ;
        cursor: pointer;
    }
`
export const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect( () => {
        const consultarAPI = async () => {
            const URL =  'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(URL) 
            const resultado = await respuesta.json()
            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            } )
            setCriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        if( [moneda, criptomoneda].includes('') ){
            setError(true)
            return
        }
        setError(false)
        setMonedas({moneda, criptomoneda})
    }

  return (
        <>
            {
                error && <Error>Todos los campos son obligatorios</Error>
            }
            <form 
            onSubmit={handleSubmit}
            >
                <SelectMonedas/>
                <SelectCriptomoneda/>
                <InputSubmit 
                    type="submit" 
                    value='cotizar' 
                />
            </form>
        </>
  )
}