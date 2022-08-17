import { FC, PropsWithChildren, useEffect, useState } from 'react';

import AvailableItems from './components/AvailableItems';
import ErrorAllPricesSection from './components/ErrorAllPricesSection';
import ErrorItemPriceSection from './components/ErrorItemPriceSection';
import Footer from './components/Footer';
import MysteryBoxInfo from './components/MysteryBoxInfo';
import ReceivedGst from './components/ReceivedGst';
import ReceivedItems from './components/ReceivedItems';
import Results from './components/Results';
import TopBar from './components/TopBar';
import getGstAmountFromMbLevel from './constants/getGstAmountFromMbLevel';
import { ICoins } from './interfaces/ICoins';
import { IItems } from './interfaces/IItems';
import { IStateItems } from './interfaces/IStateItems';
import { coins, items as itemsTest } from './testData';

const items = {
  eff: [0, 0, 0, 0],
  luck: [0, 0, 0, 0],
  comf: [0, 0, 0, 0],
  res: [0, 0, 0, 0],
  scrolls: [0, 0, 0, 0, 0]
}

function App() {
  const [receivedItems, setReceivedItems] = useState<IStateItems>(items)
  const [receivedGST, setReceivedGST] = useState<number>(0)
  const [chain, setChain] = useState<string>("sol")
  const [spentGST, setSpentGST] = useState<number>(getGstAmountFromMbLevel(4))
  const [isItemPriceError, setIsItemPriceError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [itemData, setItemData] = useState<IItems>()
  const [coinsData, setCoinsData] = useState<ICoins>()

  useEffect(() => {
    setItemData(itemsTest)
    setCoinsData(coins)
  }, [])
  
  return (
    <PaddingWrapper>
      <TopBar chain={chain} setChain={setChain}/>
      { 
        isError ? 
        <ErrorAllPricesSection/> : 
        isItemPriceError ?
        <ErrorItemPriceSection/> :
        null
      }
      <ReceivedItems receivedItems={receivedItems} setReceivedItems={setReceivedItems}/>
      <AvailableItems setReceivedItems={setReceivedItems} itemData={itemData} chain={chain} setIsItemPriceError={setIsItemPriceError}/>
      <ReceivedGst receivedGST={receivedGST} setReceivedGST={setReceivedGST}/>
      <MysteryBoxInfo spentGST={spentGST} setSpentGST={setSpentGST}/>
      <Results chain={chain} receivedGST={receivedGST} receivedItems={receivedItems} spentGST={spentGST} itemData={itemData} coinsData={coinsData}/>
      <Footer/>
    </PaddingWrapper>
  );
}

const PaddingWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="px-8 md:px-12 lg:px-40 xl:px-[320px] 2xl:px-[500px] bg-primary text-action pt-10">
      {children}
    </div>
  )
}

export default App;
