import {useEffect, useState} from "react";
import styled from "styled-components";

interface RequireFieldInterface {
  title: string
  require: boolean
  type: string
  value: any
  placeholder: string
  onChange: any
}

const Wrap = styled.div<{ require?: string }>`
  display: flex;
  flex-direction: column;
  min-width: 40%;
  padding: .5rem 1rem;
  > p {
    padding: 0;
    margin: 1rem 0 .5rem;
    color: black;
    font-weight: bold;
    ${props => props.require && `&::after {
                                                  content: '* ';
                                                  color: red
                                           }`}
  }
  input, select{
    flex: 1;
    padding: .5rem 1rem;
    font-weight: normal;
    outline-color: lightgray;
    border-radius: 6px;
    border-width: 1px;
  }
  >div{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    > select {
      flex: none;
    }
  }
`

const Index = ({title, require, value, placeholder, onChange}: RequireFieldInterface) => {

  const [state, setState] = useState<string>('')

  const handleChangeValue = (e: any) => {
    setState(e.target.value)
    onChange && onChange(e.target.value)
  }

  useEffect(() => {
    value && setState(value)
  }, [value])

  return <Wrap className={'parent'} require={'1'}>
    <p className={'title'}>{title}</p>
    <input
      type={'text'}
      value={state}
      placeholder={placeholder}
      onChange={handleChangeValue}
    />
  </Wrap>
}

export default Index
