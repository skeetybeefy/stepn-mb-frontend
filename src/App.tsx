import axios from 'axios';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

import AvailableItems from './components/AvailableItems';
import ErrorAllPricesSection from './components/ErrorAllPricesSection';
import Footer from './components/Footer';
import Loading from './components/Loading';
import MysteryBoxInfo from './components/MysteryBoxInfo';
import ReceivedGst from './components/ReceivedGst';
import ReceivedItems from './components/ReceivedItems';
import Results from './components/Results';
import TopBar from './components/TopBar';
import ErrorItemPriceSection from './components/WarningItemPriceSection';
import getGstAmountFromMbLevel from './constants/getGstAmountFromMbLevel';
import { ICoins } from './interfaces/ICoins';
import { IItems } from './interfaces/IItems';
import { IStateItems } from './interfaces/IStateItems';

const items = {
  eff: [0, 0, 0, 0],
  luck: [0, 0, 0, 0],
  comf: [0, 0, 0, 0],
  res: [0, 0, 0, 0],
  scrolls: [0, 0, 0, 0, 0]
}

const BACKEND_URL = process.env.URL || "http://localhost:3000"

function App() {
  const [receivedItems, setReceivedItems] = useState<IStateItems>(items)
  const [receivedGST, setReceivedGST] = useState<number>(0)
  const startingChain = window.localStorage.getItem("chain") ?? "sol"
  const [chain, setChain] = useState(startingChain)
  const startingMbLevel = window.localStorage.getItem("mbLevel") ?? "4"
  const [spentGST, setSpentGST] = useState<number>(getGstAmountFromMbLevel(Number(startingMbLevel)))
  const [isItemPriceError, setIsItemPriceError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [itemData, setItemData] = useState<IItems>()
  const [coinsData, setCoinsData] = useState<ICoins>()

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data: items } = await axios.get(`${BACKEND_URL}/items`)
        setItemData(items)
        const { data: coins } = await axios.get(`${BACKEND_URL}/coins`)
        setCoinsData(coins)
      } catch (error) {
        setIsError(true)
        if (error instanceof Error) {
          console.log(error.message)
        }
      } finally {
        setTimeout(() => setIsLoading(false), 750)
      }
    })()
  }, [])
  
  return (
    <PaddingWrapper>
      <TopBar chain={chain} setChain={setChain} setIsItemPriceError={setIsItemPriceError}/>
      { 
        isLoading ?
        <Loading/> :
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
