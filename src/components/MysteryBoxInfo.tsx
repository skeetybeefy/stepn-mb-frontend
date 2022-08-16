import React, { FC, useState } from "react"
import Select, { ActionMeta, SingleValue } from "react-select"
import { mysteryBoxes } from "../assets"
import getGstAmountFromMbLevel from "../constants/getGstAmountFromMbLevel"
import mbOptions from "../constants/mbOptions"
import SectionHeader from "./common/SectionHeader"
import gst from "../assets/coins/gst.png"

interface IMysteryBoxInfoProps {
  spentGST: number,
  setSpentGST: React.Dispatch<React.SetStateAction<number>>
}

const MysteryBoxInfo: FC<IMysteryBoxInfoProps> = ({ spentGST, setSpentGST }) => {
  const [mbLevel, setMbLevel] = useState<number>(4)
  
  const handleChange = (selectedOption: SingleValue<typeof mbOptions[number]>, actionMeta: ActionMeta<typeof mbOptions[number]>) => {
    if (selectedOption) {
      setSpentGST(getGstAmountFromMbLevel(selectedOption.value))
      setMbLevel(selectedOption.value)
    }
  }

  return (
    <>
      <SectionHeader text="Mystery Box Information" />
      <div className="border-2 border-secondary rounded-b-md border-t-0 font-light p-2 flex flex-col gap-2 mb-10">
        <p className="text-center">Mystery Box Level</p>
        <div className="flex justify-center items-center gap-1 text-primary">
          <div className="w-1/4">
            <img className="w-full" src={mysteryBoxes[mbLevel - 1]}></img>
          </div>
          <Select 
          options={mbOptions}
          isSearchable={false}
          defaultValue={mbOptions[3]}
          onChange={handleChange}
          />
        </div>
        <p className="text-center">Opening Cost (Edit if needed)</p>
        <div className="flex gap-4">
          <img src={gst} className="h-14"></img>
          <input type="number" className='outline-0 h-14 bg-transparent text-2xl max-w-full' value={String(spentGST)} onChange={(e) => {setSpentGST(Number(e.target.value))}}></input>
        </div>
      </div>
    </>
  )
}

export default MysteryBoxInfo