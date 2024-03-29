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
import { items as itemImgSrcs, mysteryBoxes as mbImgSrcs } from './assets'
import { itemTypes } from './enums/itemTypes';

const items = {
  eff: [0, 0, 0, 0],
  luck: [0, 0, 0, 0],
  comf: [0, 0, 0, 0],
  res: [0, 0, 0, 0],
  scrolls: [0, 0, 0, 0, 0]
}

const BACKEND_URL = "https://stepnmb.ru/api"

function App() {
  const [receivedItems, setReceivedItems] = useState<IStateItems>(items)
  const [receivedGST, setReceivedGST] = useState<number>(0)
  const startingChain = window.localStorage.getItem("chain") ?? "sol"
  const [chain, setChain] = useState(startingChain)
  const startingMbLevel = window.localStorage.getItem("mbLevel") ?? "4"
  const [spentGST, setSpentGST] = useState<number>(getGstAmountFromMbLevel(Number(startingMbLevel)))
  const startingIsFeeEnabled = window.localStorage.getItem("isFeeEnabled") ?? "false"
  const [isFeeEnabled, setIsFeeEnabled] = useState(startingIsFeeEnabled === "true")
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

  useEffect(() => {
    Object.keys(itemImgSrcs).forEach((type) => {
      itemImgSrcs[type as keyof typeof itemImgSrcs].forEach((imgSrc) => {
        if (type === itemTypes[itemTypes.scrolls]) {
          new Image().src = imgSrc
        } else {
          new Image().src = imgSrc.default
        }
      })
    })

    mbImgSrcs.forEach((mbImgSrc) => {
      new Image().src = mbImgSrc
    })
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
      <Results chain={chain} receivedGST={receivedGST} receivedItems={receivedItems} spentGST={spentGST} itemData={itemData} coinsData={coinsData} isFeeEnabled={isFeeEnabled} setIsFeeEnabled={setIsFeeEnabled}/>
      <Footer/>
    </PaddingWrapper>
  );
}

const PaddingWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="px-8 md:px-[200px] lg:px-[360px] xl:px-[500px] 2xl:px-[580px] fhd:px-[700px] 2k:px-[1000px] 4k:px-[3000px] bg-primary text-action pt-10 fhd:text-3xl ">
      {children}
    </div>
  )
}

export default App;
