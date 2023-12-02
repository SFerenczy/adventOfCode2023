import { createReadStream } from "fs";
import * as readline from "readline";

const lineResults: Array<number> = [];

const filePath = "./input";

const fileStream = createReadStream(filePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break.
});

rl.on("line", (line) => {
  const resultOfLine = findResult(line);
  lineResults.push(resultOfLine);
});

rl.on("close", () => {
  console.log(lineResults);
  const result = lineResults.reduce((accumlator, item) => accumlator + item, 0);
  console.log(result);
});

function findResult(line: string) {
  const firstNumber = findFirstNumber(line);
  const lastNumber = findLastNumber(line);
  return parseInt(firstNumber + lastNumber);
}

function findFirstNumber(line: string) {
  const firstNumber = line.match(
    /\d|one|two|three|four|five|six|seven|eight|nine/
  )?.[0];

  if (firstNumber === undefined) {
    return "";
  }

  if (Number.isNaN(Number(firstNumber))) {
    return convertDigitWordToDigitString(firstNumber);
  }
  return firstNumber;
}

function findLastNumber(line: string) {
  const reversedLine = line.split("").reverse().join("");
  const lastNumber = reversedLine.match(
    /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/
  )?.[0];

  if (lastNumber === undefined) {
    return "";
  }

  if (Number.isNaN(Number(lastNumber))) {
    return convertDigitWordToDigitString(lastNumber);
  }
  return lastNumber;
}

const numberDictionary: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  eno: "1",
  owt: "2",
  eerht: "3",
  ruof: "4",
  evif: "5",
  xis: "6",
  neves: "7",
  thgie: "8",
  enin: "9",
};

function convertDigitWordToDigitString(numberWord: string): string {
  return numberDictionary[numberWord];
}
