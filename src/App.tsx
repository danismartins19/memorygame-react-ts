import * as C from './App.styles';
import LogoMemory from './assets/devmemory_logo.png';

export const App = () => {
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={LogoMemory} width='200' alt="" />
        </C.LogoLink>

        <C.InfoArea>
          ...
        </C.InfoArea>

        <button>Reiniciar</button>

      </C.Info>
      <C.GridArea>
        ...
      </C.GridArea>
    </C.Container>
  )
}