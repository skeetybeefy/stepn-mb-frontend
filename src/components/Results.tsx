import React, { FC, useEffect, useState } from 'react';

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
  isFeeEnabled: boolean,
  setIsFeeEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const FEE = 0.06

const Results: FC<IResultsProps> = ({ chain, receivedItems, receivedGST, spentGST, itemData, coinsData, isFeeEnabled, setIsFeeEnabled }) => {
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
        receivedItems[key as keyof IStateItems].forEach((count, idx) => {
          total += itemData[chain as keyof Omit<IItems, "lastUpdate">][key as keyof IStateItems][idx] * count
        })
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
      <div className="flex flex-col gap-4 text-xl fhd:text-3xl">
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
              <p>
                {isFeeEnabled ? 
                (totalGST * (1 - FEE)).toFixed(2) :
                totalGST.toFixed(2)}
              </p>
            </div>
          </div>

        </div>

        <div className='flex items-center text-center'>
          <p className='flex-1'>No fee</p>
          <div className={(isFeeEnabled ? 'bg-secondary' : 'bg-action' ) + ' h-8 rounded-[2rem] flex-1 relative transition-all cursor-pointer'} onClick={() => {
              window.localStorage.setItem("isFeeEnabled", !isFeeEnabled ? "true" : "false")
              setIsFeeEnabled(!isFeeEnabled)
            }}>
            <div className={(isFeeEnabled ? 'left-[calc(100%-32px)]' : 'left-0' ) + ' w-8 h-8 border-action border-2 bg-primary absolute rounded-[1.75rem] transition-all'}></div>
          </div>
          <p className='flex-1'>With fee</p>
        </div>

        <div className='text-center'>
          <p>Profit</p>
          <div>
            <p>
              {isFeeEnabled ? 
              ((totalGST - receivedGST) * (1 - FEE) + receivedGST - spentGST).toFixed(2) : 
              (totalGST - spentGST).toFixed(2)} GST
            </p>
          </div>
          <div>
            <p>
              {isFeeEnabled ? 
              convertGSTtoUSD((totalGST - receivedGST) * (1 - FEE) + receivedGST - spentGST).toFixed(4) :
              convertGSTtoUSD(totalGST - spentGST).toFixed(4)} USD
            </p>
          </div>
          <div>
            <p>
              {isFeeEnabled ? 
              convertUSDtoChainCoin(convertGSTtoUSD((totalGST - receivedGST) * (1 - FEE) + receivedGST - spentGST)).toFixed(4) :
              convertUSDtoChainCoin(convertGSTtoUSD(totalGST - spentGST)).toFixed(4)} {chain.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Results