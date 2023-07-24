import { getRandomInt, generateRange } from "shared/helpers/math-utils"
import { sortByNameFunc } from "shared/helpers/sort-util"

const nameTokens = ["Alan", "John", "Brandon", "Key", "Branda", "Morris", "Carlos", "Lee"]

export function generateStudent(id: number) {
  return {
    id,
    first_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
    last_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
  }
}

export function generateStudents(number: number) {
  let data: any = generateRange(number).map((_, id) => generateStudent(id + 1));

  data = sortByNameFunc(data, "first_name");

  return data;

}
