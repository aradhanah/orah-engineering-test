export const sortByNameFunc = (data: any, sortKey: string) => {
    return data.sort(function(itemA: any, itemB: any) {
      const keyA = itemA[sortKey].toLowerCase();
      const keyB = itemB[sortKey].toLowerCase();
  
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }