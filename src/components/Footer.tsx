import { FC, MouseEvent, useState } from "react"
import { chains } from "../assets/index"
import walletAddresses from "../constants/wallets"

const Footer: FC = () => {
  return (
    <div className="pb-10 font-light text-center">
      <p>Token prices by CoinGecko</p>
      <p className="mb-2">StepN item prices by StepN API</p>
      <p className="text-xl my-4">If you want to donate:</p>
      {Object.keys(walletAddresses).map((chain) => {
        return <Wallet chain={chain as keyof typeof chains} key={chain} />
      })}
    </div>
  )
}

interface IWalletProps {
  chain: keyof typeof chains,
}

const Wallet: FC<IWalletProps> = ({ chain }) => {

  const onWalletClick = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement
    const chain = target.getAttribute("id")
    if (chain) {
      navigator.clipboard.writeText(walletAddresses[chain as keyof typeof walletAddresses])
      let popup = target.childNodes[0] as HTMLElement
      popup.className = popupClasses + "block"
      setTimeout(() => {popup.className = popupClasses + "hidden"}, 2000)
    }
  }

  const popupClasses = "left-[25%] transition-all bg-secondary top-[-1.8rem] absolute border-2 border-accent rounded-md p-1 "

  return (
    <div className="break-words mb-4 relative" onClick={onWalletClick} id={chain}>
      <div className={popupClasses + "hidden"}>
        Copied to clipboard!
      </div>
      <div className="flex gap-1 items-center justify-center">
        <img src={chains[chain as keyof typeof chains]} className="max-h-4 fhd:max-h-8"></img>
        <p className="hover:cursor-pointer hover:underline">{walletAddresses[chain as keyof typeof walletAddresses].slice(0, 8)}...{walletAddresses[chain as keyof typeof walletAddresses].slice(-8)}</p>
      </div>
    </div>
  )
}

export default Footer