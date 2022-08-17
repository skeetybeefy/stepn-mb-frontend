import { FC } from "react"

interface ISectionHeaderProps {
  text: string,
  isError?: boolean
}

const SectionHeader: FC<ISectionHeaderProps> = ({ text, isError }) => {
  return (<div className={(isError ? "border-error bg-error" : "border-secondary bg-secondary") + " border-2 text-center rounded-t-md font-light"}>{text}</div>)
}

export default SectionHeader