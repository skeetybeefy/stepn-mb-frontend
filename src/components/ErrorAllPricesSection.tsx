import { FC } from "react";
import ErrorSection from "./common/ErrorSection";

const ErrorAllPricesSection: FC = () => {
  return (
    <ErrorSection>
      <p>An error happened while getting prices of items. Please visit the site again in 10 or more minutes.</p>
    </ErrorSection>
  )
}

export default ErrorAllPricesSection