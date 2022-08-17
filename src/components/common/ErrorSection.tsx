import { FC, PropsWithChildren } from "react";
import Section from "./Section";

const ErrorSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Section title="Error" isError={true}>{children}</Section>
  )
}

export default ErrorSection