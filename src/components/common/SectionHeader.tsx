import { FC } from "react"

interface ISectionHeaderProps {
  text: string
}

const SectionHeader: FC<ISectionHeaderProps> = ({ text }) => {
  return (<div className="border-2 border-secondary text-center rounded-t-md bg-secondary font-light">{text}</div>)
}

export default SectionHeader