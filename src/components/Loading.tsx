import { FC } from 'react';

import gmt from '../assets/coins/gmt.png';

const Loading: FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mb-10">
      <p className='text-2xl font-light fhd:text-3xl'>Loading...</p>
      <img src={gmt} alt="" className='h-20 animate-[fadeinout_2s_linear_infinite]'></img>
    </div>
  )
}

export default Loading