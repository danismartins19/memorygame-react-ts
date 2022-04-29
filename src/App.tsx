import { useEffect, useState } from 'react';
import * as C from './App.styles';
import LogoMemory from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';


export const App = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, [])

  const resetAndCreateGrid = () => {
    //step 1 - reset the game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    setGridItems([]);


    //cleaning the array's position 
    let tempGridList: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tempGridList.push({
        item: null, shown: false, permanent: false
      })
    }

    //setting new positions for them
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGridList[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGridList[pos].item = i;
      }
    }

    //set state with the tempGridList
    setGridItems(tempGridList);

    //start the game
    setIsPlaying(true);
  }

  const handleItemClick = (index: number) => {

  }


  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={LogoMemory} width='200' alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'></InfoItem>
          <InfoItem label='Movimentos' value='0'></InfoItem>
        </C.InfoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}></Button>

      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => { handleItemClick(index) }}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}