import React, { FC, useState } from 'react';
import Select, { ActionMeta, Options, SingleValue } from 'react-select';
import { chains } from '../assets';

interface ITopBarProps {
  chain: string,
  setChain: React.Dispatch<React.SetStateAction<string>>,
  setIsItemPriceError: React.Dispatch<React.SetStateAction<boolean>>
}

const TopBar: FC<ITopBarProps> = ({ chain, setChain, setIsItemPriceError }) => {
  return (
    <div className='flex items-center mb-10 justify-between text-xl font-bold'>
      <p className=''>STEPN MB</p>
      <div className='flex gap-2 text-primary items-center'>
        <img alt={chain} src={chains[chain as keyof typeof chains]} className="max-h-[6vh]"></img>
        <ChainSelector chain={chain} setChain={setChain} setIsItemPriceError={setIsItemPriceError}/>
      </div>
    </div>
  )
}

type IChainSelector = ITopBarProps

const ChainSelector: FC<IChainSelector> = ({ chain, setChain, setIsItemPriceError }) => {
  const options = [
    { value: "sol", label: "SOL" },
    { value: "bsc", label: "BSC" },
    { value: "eth", label: "ETH" }
  ]

  const handleChange = (selectedOption: SingleValue<typeof options[number]>, actionMeta: ActionMeta<typeof options[number]>) => {
    if (selectedOption) {
      setChain(selectedOption.value)
      setIsItemPriceError(false)
      window.localStorage.setItem("chain", selectedOption.value)
    }
  }

  const getOptionFromState = (selectedChain: string) => {
    return {
      value: selectedChain,
      label: selectedChain.toUpperCase()
    }
  }

  return (
    <Select
      options={options}
      isSearchable={false}
      value={getOptionFromState(chain)}
      onChange={handleChange}
    ></Select>
  )
}

export default TopBar