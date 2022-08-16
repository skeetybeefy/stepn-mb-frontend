import { FC } from "react";
import { IStateItems } from "../interfaces/IStateItems";
import { items } from "../assets"
import { itemTypes } from "../enums/itemTypes";
import SectionHeader from "./common/SectionHeader";

interface IReceivedItemsProps {
  receivedItems: IStateItems,
  setReceivedItems: React.Dispatch<React.SetStateAction<IStateItems>>
}

const ReceivedItems: FC<IReceivedItemsProps> = ({ receivedItems, setReceivedItems }) => {
  return (
    <>
      <SectionHeader text="Received items"/>
      <div className="border-2 border-t-0 border-secondary rounded-b-md flex flex-wrap p-2 mb-10 min-h-[40px]">
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
    </>
  )
}

export default ReceivedItems