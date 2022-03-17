import styled from "@emotion/styled"

const Contenedor = styled.section`
    color: #FFF;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Imagen = styled.img`
    display: block;
    width: 150px;
`
const Texto = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`

export const Resultado = ({resultado}) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <Contenedor>
        <Imagen 
            src={`http://cryptocompare.com/${IMAGEURL}`}
            alt="Imagen cripto"
        />
        <section>
            <Precio>El precio es de: <span>{PRICE}</span> </Precio>
            <Texto>Precio más alto del día: <span>{HIGHDAY}</span> </Texto>
            <Texto>Precio másbajo del día: <span>{LOWDAY}</span> </Texto>
            <Texto> Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span> </Texto>
            <Texto> Última Actualización: <span>{LASTUPDATE}</span> </Texto>
        </section>
    </Contenedor>
  )
}
 