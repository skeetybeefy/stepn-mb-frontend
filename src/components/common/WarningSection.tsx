import { FC, PropsWithChildren } from "react"
import Section from "./Section"

const WarningSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Section title="Warning" isWarning>
      {children}
    </Section>
  )
}

export default WarningSection