import React, { FC } from 'react';

import gst from '../assets/coins/gst.png';
import Section from './common/Section';

interface IReceivedGst {
  receivedGST: number,
  setReceivedGST: React.Dispatch<React.SetStateAction<number>>
}

const ReceivedGst: FC<IReceivedGst> = ({ receivedGST, setReceivedGST }) => {
  return (
    <Section title="Received GST">
      <div className='flex gap-4'>
        <img src={gst} alt="gst" className="h-14"></img>
        <input type="number" inputMode='decimal' placeholder="0" className='outline-0 h-14 bg-transparent text-2xl w-[50%]' onChange={(e) => { setReceivedGST(Number(e.target.value)) }}></input>
      </div>
    </Section>
  )
}

export default ReceivedGst