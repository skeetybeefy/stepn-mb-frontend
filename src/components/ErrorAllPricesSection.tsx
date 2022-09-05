import { FC } from "react";
import ErrorSection from "./common/ErrorSection";

const ErrorAllPricesSection: FC = () => {
  return (
    <ErrorSection>
      <p className="fhd:text-2xl">An error happened while getting prices of items. Please visit the site again in 5 or more minutes.</p>
    </ErrorSection>
  )
}

export default ErrorAllPricesSection