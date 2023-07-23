import { getRandomInt, generateRange } from "shared/helpers/math-utils"
import { SearchSortParams } from "shared/interfaces/searchSort.interface"

const nameTokens = ["Alan", "John", "Brandon", "Key", "Branda", "Morris", "Carlos", "Lee"]

export function generateStudent(id: number) {
  return {
    id,
    first_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
    last_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
  }
}

function sortByName(data: any, sortKey: string) {
  return data.sort(function(itemA: any, itemB: any) {
    const keyA = itemA[sortKey].toLowerCase();
    const keyB = itemB[sortKey].toLowerCase();

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}

export function generateStudents(number: number, params: SearchSortParams) {
  let data: any = generateRange(number).map((_, id) => generateStudent(id + 1));

  if(params && params.sortByName) {
    let sortedData: any = sortByName(data, params.sortByName);
    data = params.sortBy === 'asc' ? sortedData : sortedData.reverse();
  }

  if(params && params.text) {
    let search = data.filter((item: any, index: number) => {
      return item["first_name"].toLowerCase().indexOf(params.text.toLowerCase()) > -1 || item["last_name"].toLowerCase().indexOf(params.text.toLowerCase()) > -1
    })
    data = search;
  }
  return data;

}
