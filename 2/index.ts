import { createReadStream } from "fs";

import * as readline from "readline";

const lineResults: Array<number> = [];
const lineResults2: Array<number> = [];

const filePath = "./input.txt";

const fileStream = createReadStream(filePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break.
});

rl.on("line", (line) => {
  const resultOfLine = findResult(line);
  lineResults.push(resultOfLine);
  const resultOfLine2 = findResult2(line);
  lineResults2.push(resultOfLine2);
});

rl.on("close", () => {
  const result = lineResults.reduce((accumlator, item) => accumlator + item, 0);
  const result2 = lineResults2.reduce(
    (accumlator, item) => accumlator + item,
    0
  );

  console.log(result2);
});

function findResult(line: string): number {
  const splitGameFromData = line.split(": ");
  const game = splitGameFromData[0];
  const data = splitGameFromData[1];
  const gameId = game.split(" ")[1];
  if (isValidGame(data)) {
    return Number(gameId);
  }
  return 0;
}

function isValidGame(data: string): boolean {
  return data.split("; ").every(isValidSet);
}

function isValidSet(data: string): boolean {
  return data.split(", ").every(isValidCubeAmount);
}

const cubeAmounts: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function isValidCubeAmount(data: string): boolean {
  const [amount, color] = data.split(" ");
  return Number(amount) <= cubeAmounts[color];
}

function findResult2(line: string) {
  const data = line.split(": ")[1];
  const smallestRedCubeAmount = getSmallestCubeAmount(data, "red");
  const smallestBlueCubeAmount = getSmallestCubeAmount(data, "blue");
  const smallestGreenCubeAmount = getSmallestCubeAmount(data, "green");

  return (
    smallestBlueCubeAmount * smallestGreenCubeAmount * smallestRedCubeAmount
  );
}

function getSmallestCubeAmount(data: string, color: string): number {
  if (data.split(color).length === 1) {
    return 0;
  }
  // String splitting magic. Don't ask, just feel it. m)
  const cubeAmounts = data
    .split(color)
    .slice(0, -1)
    .map((item) => {
      return Number(item.split(" ").at(-2));
    });
  return Math.max(...cubeAmounts);
}
