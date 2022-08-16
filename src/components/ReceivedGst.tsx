import React, { FC } from 'react';
import gst from "../assets/coins/gst.png"

import SectionHeader from './common/SectionHeader';

interface IReceivedGst {
  receivedGST: number,
  setReceivedGST: React.Dispatch<React.SetStateAction<number>>
}

const ReceivedGst: FC<IReceivedGst> = ({ receivedGST, setReceivedGST }) => {
  return (
    <>
      <SectionHeader text="Received GST" />
      <div className="border-2 border-secondary rounded-b-md border-t-0 flex gap-4 mb-10 p-2 font-light">
        <img src={gst} className="h-14"></img>
        <input type="number" inputMode='decimal' placeholder="0" className='outline-0 h-14 bg-transparent text-2xl w-[50%]' onChange={(e) => { setReceivedGST(Number(e.target.value)) }}></input>
      </div>
    </>
  )
}

export default ReceivedGst