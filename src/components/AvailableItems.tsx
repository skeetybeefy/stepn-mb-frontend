import React, { FC, useState } from 'react';

import { items } from '../assets';
import { IStateItems } from '../interfaces/IStateItems';
import { itemTypes, scrollTypes } from '../enums/itemTypes'
import { IItems, ItemsOnChain } from '../interfaces/IItems';

interface IAvailableItemsProps {
  setReceivedItems: React.Dispatch<React.SetStateAction<IStateItems>>,
  itemData: IItems | undefined,
  chain: string,
  setIsItemPriceError: React.Dispatch<React.SetStateAction<boolean>>
}

const AvailableItems: FC<IAvailableItemsProps> = ({ setReceivedItems, itemData, chain, setIsItemPriceError }) => {
  const [itemType, setItemType] = useState<itemTypes>(itemTypes.eff)
  return (
    <div className='mb-10'>
      <ItemTypeSelector itemType={itemType} setItemType={setItemType} />
      <Items itemType={itemType} setReceivedItems={setReceivedItems} itemData={itemData} chain={chain} setIsItemPriceError={setIsItemPriceError}/>
    </div>
  )
}

type IStateItemsProps = IAvailableItemsProps & {itemType: itemTypes}

const Items: FC<IStateItemsProps> = ({ itemType, setReceivedItems, itemData, chain, setIsItemPriceError }) => {
  return (
    <div className="border-2 border-t-0 border-secondary rounded-b-md flex flex-wrap p-2">
      {(Object.keys(items[itemTypes[itemType] as keyof typeof itemTypes])).map((_, idx) => {
        let isError = false
        if (itemData) {
          if (itemTypes[itemType] === "scrolls") {
            let obj = itemData[chain as keyof Omit<typeof itemData, "lastUpdate">][itemTypes[itemType] as keyof Omit<ItemsOnChain, "gems">]
            isError = !(obj[scrollTypes[idx]][0]) // value of 0 is considered an error
            if (isError) {
              setIsItemPriceError(true)
            }
          } else {
            let obj = itemData[chain as keyof Omit<typeof itemData, "lastUpdate">].gems[itemTypes[itemType] as keyof Omit<ItemsOnChain, "scrolls">]
            isError = !(obj[`lvl${idx + 1}`][0])
            if (isError) {
              setIsItemPriceError(true)
            }
          }
        }
        return (
          <Item key={idx} idx={idx} itemType={itemType} setReceivedItems={setReceivedItems} error={isError}/>
        )
      })}
    </div>
  )
}

type IItem = Omit<IStateItemsProps, "itemData" | "chain" | "setIsItemPriceError"> & {idx: number, error: boolean}

const Item: FC<IItem> = ({ idx, error, itemType, setReceivedItems }) => {
  return (
    <div className={(error ? "bg-error" : "bg-secondary") + " w-1/4 border-2 border-accent rounded-md"} onClick={() => {
      setReceivedItems(prevState => {
        return {
          ...prevState,
          [itemTypes[itemType]]: prevState[itemTypes[itemType] as keyof IStateItems].map((value, index) => {
            return index === idx ? value + 1 : value
          })
        }
      })
    }}>
      <img src={
        itemType === itemTypes.scrolls ?
          items[itemTypes[itemType] as keyof typeof itemTypes][idx] :
          items[itemTypes[itemType] as keyof typeof itemTypes][idx].default
      } className="mx-auto" alt={itemTypes[idx]}></img>
    </div>
  )
}

interface IItemTypeSelectorProps {
  itemType: itemTypes,
  setItemType: React.Dispatch<React.SetStateAction<itemTypes>>
}

const ItemTypeSelector: FC<IItemTypeSelectorProps> = ({ itemType, setItemType }) => {
  return (
    <div className="flex font-light justify-between text-center">
      {(Object.keys(itemTypes) as Array<keyof typeof itemTypes>).filter(key => !isNaN(Number(key))).map((_, idx) => {
        return itemType === idx ?
          (<div className={"flex-1 capitalize bg-accent rounded-t-md"} key={idx} onClick={() => setItemType(idx)}>{itemTypes[idx]}</div>
          ) : (
            <div className={"flex-1 capitalize bg-secondary rounded-t-md"} key={idx} onClick={() => setItemType(idx)}>{itemTypes[idx]}</div>
          )
      })}
    </div>
  )
}

export default AvailableItems