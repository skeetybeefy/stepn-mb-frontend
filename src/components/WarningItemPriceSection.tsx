import { FC } from "react"
import WarningSection from "./common/WarningSection"

const WarningItemPriceSection: FC = () => {
  return (
    <WarningSection>
      <p>Some items on this chain have no listings on StepN Marketplace. They were made unavailable to choose, their price is considered equal to 0.</p>
    </WarningSection>
  )
}

export default WarningItemPriceSection