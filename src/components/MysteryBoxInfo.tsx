import React, { FC, useState } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';

import { mysteryBoxes } from '../assets';
import gst from '../assets/coins/gst.png';
import getGstAmountFromMbLevel from '../constants/getGstAmountFromMbLevel';
import mbOptions from '../constants/mbOptions';
import Section from './common/Section';

interface IMysteryBoxInfoProps {
  spentGST: number,
  setSpentGST: React.Dispatch<React.SetStateAction<number>>
}

const MysteryBoxInfo: FC<IMysteryBoxInfoProps> = ({ spentGST, setSpentGST }) => {
  const startingMbLevel = window.localStorage.getItem("mbLevel") ?? "4"
  const [mbLevel, setMbLevel] = useState(Number(startingMbLevel))
  const [spentGSTInput, setSpentGSTInput] = useState(String(spentGST))

  const handleChange = (selectedOption: SingleValue<typeof mbOptions[number]>, actionMeta: ActionMeta<typeof mbOptions[number]>) => {
    if (selectedOption) {
      setSpentGST(getGstAmountFromMbLevel(selectedOption.value))
      setSpentGSTInput(String(getGstAmountFromMbLevel(selectedOption.value)))
      setMbLevel(selectedOption.value)
      window.localStorage.setItem("mbLevel", String(selectedOption.value))
    }
  }

  return (
    <Section title="Mystery Box Information">
      <div className="flex flex-col gap-2">
        <p className="text-center">Mystery Box Level</p>
        <div className="flex justify-center items-center gap-1 text-primary">
          <div className="w-1/4">
            <img className="w-full" alt={`Mystery box LVL ${mbLevel}`} src={mysteryBoxes[mbLevel - 1]}></img>
          </div>
          <Select
            options={mbOptions}
            isSearchable={false}
            defaultValue={mbOptions[mbLevel - 1]}
            onChange={handleChange}
          />
        </div>
        <p className="text-center">Opening Cost (Edit if needed)</p>
        <div className="flex gap-4">
          <img src={gst} alt="gst" className="h-14"></img>
          <input type="text" inputMode="decimal" placeholder={String(spentGST)} className='outline-0 h-14 bg-transparent text-2xl w-[50%]' value={spentGSTInput} onChange={(e) => {
            setSpentGSTInput(e.target.value) 
            setSpentGST(parseFloat(e.target.value.replaceAll(",", ".")) || 0) 
          }}></input>
        </div>
      </div>
    </Section>
  )
}

export default MysteryBoxInfo