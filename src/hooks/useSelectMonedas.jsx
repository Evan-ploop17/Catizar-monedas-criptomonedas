import { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`

const Select = styled.select`
    border-radius: 10px;
    font-size: 18px;
    margin-bottom: 20px;
    padding: 14px;
    width: 100%;
`

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

    const SelectMonedas = () => (
        <>
            <Label> {label} </Label>
            <Select
                value={state}
                onChange={ e => setState(e.target.value)}
            >
                <option disabled defaultValue value="">Seleccione</option>
                { opciones.map( opt => (
                    <option 
                        key={opt.id}
                        value={opt.id}    
                    >
                        {opt.nombre}
                    </option>
                ) ) }
            </Select>
        </>
    )

    return [ state, SelectMonedas ]
}

export default useSelectMonedas