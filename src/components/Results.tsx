import { FC, useEffect, useState } from 'react';

import gst from '../assets/coins/gst.png';
import divisor from '../constants/chainDivisors';
import { scrollTypes } from '../enums/itemTypes';
import { ICoins } from '../interfaces/ICoins';
import { IItems, ItemsOnChain } from '../interfaces/IItems';
import { IStateItems } from '../interfaces/IStateItems';
import Section from './common/Section';

interface IResultsProps {
  receivedItems: IStateItems,
  receivedGST: number,
  chain: string,
  spentGST: number,
  coinsData: ICoins | undefined,
  itemData: IItems | undefined,
}

const Results: FC<IResultsProps> = ({ chain, receivedItems, receivedGST, spentGST, itemData, coinsData }) => {
  const [totalGST, setTotalGST] = useState<number>(0)

  const convertGSTtoUSD = (gstAmount: number) => {
    if (coinsData) {
      return coinsData.gst[chain as keyof typeof coinsData.gst] * gstAmount
    }
    return 0
  }

  const convertUSDtoChainCoin = (usdAmount: number) => {
    if (coinsData) {
      if (chain === "bsc") {
        return usdAmount / coinsData["bnb"]
      } else {
        return usdAmount / coinsData[chain as keyof Record<"sol" | "eth", number>]
      }
    }
    return 0
  }

  const countGstFromItems = () => { // assuming scrolls sell in SOL, not GMT
    if (itemData && coinsData) {
      let total = 0; // in chain coins (satoshi)
      (Object.keys(receivedItems)).forEach((key) => {
        if (key !== "scrolls") {
          receivedItems[key as keyof IStateItems].forEach((count, idx) => {
            total += itemData[chain as keyof Record<"sol" | "bsc" | "eth", ItemsOnChain>].gems[key][`lvl${idx + 1}`][0] * count
          })
        } else {
          receivedItems[key as keyof IStateItems].forEach((count, idx) => {
            total += itemData[chain as keyof Record<"sol" | "bsc" | "eth", ItemsOnChain>].scrolls[scrollTypes[idx]][0] * count
          })
        }
      })

      total /= divisor[chain as keyof typeof divisor]

      let totalUSD = chain === "bsc" ?
        total * coinsData["bnb"] :
        total * coinsData[chain as keyof Record<"sol" | "eth", number>]

      let totalGST = totalUSD / coinsData.gst[chain as keyof typeof coinsData.gst]

      totalGST += receivedGST

      setTotalGST(totalGST)
    }
  }

  useEffect(() => {
    countGstFromItems()
  }, [receivedItems, receivedGST, countGstFromItems])

  return (
    <Section title="Results">
      <div className="flex flex-col gap-2 text-xl">
        {itemData ?
          <div className='text-center'>
            <p>Last Price Update:</p>
            <p>{itemData.lastUpdate}</p>
          </div> :
          null}
        <div className='flex justify-between items-center'>

          <div id="spent" className='flex flex-col gap-2'>
            <p>Spent</p>
            <div className='flex max-w-full items-center gap-2'>
              <img src={gst} alt="gst" className="h-10"></img>
              <p>{spentGST.toFixed(2)}</p>
            </div>
          </div>

          <div id="received" className='flex flex-col gap-2'>
            <p className="text-right">Received</p>
            <div className='flex max-w-full items-center gap-2'>
              <img src={gst} alt="gst" className="h-10"></img>
              <p>{totalGST.toFixed(2)}</p>
            </div>
          </div>

        </div>

        <div className='text-center'>
          <p>Profit</p>
          <div>
            <p>{(totalGST - spentGST).toFixed(2)} GST</p>
          </div>
          <div>
            <p>{convertGSTtoUSD(totalGST - spentGST).toFixed(4)} USD</p>
          </div>
          <div>
            <p>{convertUSDtoChainCoin(convertGSTtoUSD(totalGST - spentGST)).toFixed(4)} {chain.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Results