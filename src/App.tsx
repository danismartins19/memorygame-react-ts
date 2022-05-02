import { useEffect, useState } from 'react';
import * as C from './App.styles';
import LogoMemory from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';


export const App = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeElapsed])


  //verificar se os itens ativos sao iguais
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {


        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanent = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        }
        else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1100)
        }

        setMoveCount(moveCount + 1);
      }
    }
  }, [shownCount, gridItems])

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
    if (isPlaying && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (tmpGrid[index].permanent === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  }


  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={LogoMemory} width='200' alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}></InfoItem>
          <InfoItem label='Movimentos' value={moveCount.toString()}></InfoItem>
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