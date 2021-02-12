const getRandomNums = (req, res) => {
  const { numOfCards } = req.body;

  const generateRandomNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const cardNums = [];

  while (cardNums.length < numOfCards) {
    const randomNum = generateRandomNum(1, 50);

    if (cardNums.indexOf(randomNum) === -1) cardNums.push(randomNum);
  }

  res.send(cardNums);
};

export { getRandomNums };
