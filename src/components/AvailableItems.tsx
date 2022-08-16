import React, { FC, useState } from 'react';

import { items } from '../assets';
import { IStateItems } from '../interfaces/IStateItems';
import { itemTypes } from '../enums/itemTypes'

interface IAvailableItemsProps {
  setReceivedItems: React.Dispatch<React.SetStateAction<IStateItems>>
}

const AvailableItems: FC<IAvailableItemsProps> = ({ setReceivedItems }) => {
  const [itemType, setItemType] = useState<itemTypes>(itemTypes.eff)
  return (
    <div className='mb-10'>
      <ItemTypeSelector itemType={itemType} setItemType={setItemType} />
      <Items itemType={itemType} setReceivedItems={setReceivedItems} />
    </div>
  )
}

interface IStateItemsProps {
  itemType: itemTypes,
  setReceivedItems: React.Dispatch<React.SetStateAction<IStateItems>>
}

// TODO responsive border width

const Items: FC<IStateItemsProps> = ({ itemType, setReceivedItems }) => {
  return (
    <div className="border-2 border-t-0 border-secondary rounded-b-md flex flex-wrap p-2">
      {(Object.keys(items[itemTypes[itemType] as keyof typeof itemTypes])).map((_, idx) => {
        return (
          <div key={idx} className="w-1/4 border-2 border-accent bg-secondary rounded-md" onClick={() => {
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
      })}
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