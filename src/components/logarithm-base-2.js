const logarithmBase2 = (number) => {
  // eslint-disable-next-line no-bitwise
  if (number & (number - 1) !== 0) {
    console.error();
    return 0;
  }
  if (number === 0) {
    return 0;
  }// function only for numbers that are power of 2
  let temporary = number;
  let toReturn = 0;
  while (temporary !== 1) {
    // bitwise operators are mega useful.
    // Who set up this Eslint thing?
    // eslint-disable-next-line no-bitwise
    temporary >>= 1;
    toReturn += 1;
  }
  return toReturn;
};

export default logarithmBase2;
