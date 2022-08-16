const getGstAmountFromMbLevel = (level: number) => {
  const gstAmounts = [5, 7, 10, 35, 100, 255, 523, 1024, 1818, 2699]
  return gstAmounts[level - 1]
}

export default getGstAmountFromMbLevel