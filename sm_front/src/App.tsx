import { Outlet } from 'react-router-dom'
import Cabecalho from './components/Cabecalho/Cabecalho'
import Rodape from './components/Rodape/Rodape'
import Menu from './components/Menu/Menu'

export default function App(){

  return (
    <div className='app-shell'>
      <Cabecalho/> 
      <Menu/> 
      <Outlet/> 
      <Rodape/> 
    </div>
  )
}

