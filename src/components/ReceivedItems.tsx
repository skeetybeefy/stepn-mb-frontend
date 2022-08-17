import { FC } from 'react';

import { items } from '../assets';
import { itemTypes } from '../enums/itemTypes';
import { IStateItems } from '../interfaces/IStateItems';
import Section from './common/Section';

interface IReceivedItemsProps {
  receivedItems: IStateItems,
  setReceivedItems: React.Dispatch<React.SetStateAction<IStateItems>>
}

const ReceivedItems: FC<IReceivedItemsProps> = ({ receivedItems, setReceivedItems }) => {
  return (
    <Section title="Received items">
      <div className='flex flex-wrap'>
        {
          (Object.keys(receivedItems) as Array<keyof IStateItems>).map((key) => {
            return receivedItems[key].map((count, idx) => {
              return count === 0 ?
                null :
                (
                  <div key={`${key}-${idx}`} className="w-1/4 border-2 border-accent rounded-md relative bg-secondary flex items-center" onClick={() => {
                    setReceivedItems(prevState => {
                      return {
                        ...prevState,
                        [key]: prevState[key].map((value, index) => {
                          return index === idx ? value - 1 : value
                        })
                      }
                    })
                  }}>
                    <img src={
                      key === itemTypes[itemTypes.scrolls] ?
                        items[key][idx] :
                        items[key][idx].default
                    } className="mx-auto" alt={key}></img>
                    <div className="absolute bottom-0 right-0 text-xl font-normal">{count}</div>
                  </div>
                )
            })
          })
        }
      </div>
    </Section>
  )
}

export default ReceivedItems