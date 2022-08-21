import { FC, PropsWithChildren } from "react";

type ISectionProps = PropsWithChildren & {
  title: string,
  isError?: boolean,
  isWarning?: boolean
} 

const Section: FC<ISectionProps> = ({ title, isError, isWarning, children}) => {
  return (
    <>
      <div className={(isError ? 
        "border-error bg-error" : 
        isWarning ? 
        "border-warning bg-warning": 
        "border-secondary bg-secondary") + " border-2 text-center rounded-t-md font-light"}>{title}</div>
      <div className={(isError ? 
        "border-error" : 
        isWarning ? 
        "border-warning" : 
        "border-secondary") + " border-2 border-t-0 rounded-b-md p-2 mb-10 min-h-[40px] font-light"}>
       {children}
      </div>
    </>
  )
}

export default Section