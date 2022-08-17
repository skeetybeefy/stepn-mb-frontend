import { FC } from "react"
import ErrorSection from "./common/ErrorSection"

const ErrorItemPriceSection: FC = () => {
  return (
    <ErrorSection>
      <p>An error happened with some of the items' prices. These items are marked with red color on Available Items tab. Do not use them in your calculations, the error will be resolved soon.</p>
    </ErrorSection>
  )
}

export default ErrorItemPriceSection