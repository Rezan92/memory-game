const generateRandomNum = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomNums = (req, res) => {
  let { numOfCards } = req.body;

  if (numOfCards > 12) {
    numOfCards = 12;
  } else if (numOfCards < 4) {
    numOfCards = 4;
  }

  const cardNums = [];

  while (cardNums.length < numOfCards) {
    const randomNum = generateRandomNum(1, 50);

    if (cardNums.indexOf(randomNum) === -1) cardNums.push(randomNum);
  }

  res.send(cardNums);
};

export { getRandomNums };
