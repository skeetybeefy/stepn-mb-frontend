import { FC, PropsWithChildren } from "react";
import SectionHeader from "./SectionHeader";

type ISectionProps = PropsWithChildren & {
  title: string,
  isError?: boolean,
} 

const Section: FC<ISectionProps> = ({ title, isError, children}) => {
  return (
    <>
      <SectionHeader text={title} isError={isError}/>
      <div className={(isError ? "border-error" : "border-secondary") + " border-2 border-t-0 rounded-b-md p-2 mb-10 min-h-[40px] font-light"}>
       {children}
      </div>
    </>
  )
}

export default Section