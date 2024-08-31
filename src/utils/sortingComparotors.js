/**
|--------------------------------------------------
| Compare String and Sort to Ascending order (Comparator For  array.sort)
|--------------------------------------------------
*/
export const sortArrayByStringComparator = (firstString,secondString, isAscendingOrder = true, ignoreCasing = true )=>  {
  const nameA = ignoreCasing ? firstString?.toUpperCase && firstString.toUpperCase() : firstString; // ignore upper and lowercase
  const nameB = ignoreCasing ? secondString?.toUpperCase && secondString.toUpperCase() : secondString; // ignore upper and lowercase
  if (nameA < nameB) {
    return isAscendingOrder ? -1 : 1;
  }
  if (nameA > nameB) {
    return isAscendingOrder ? 1 : -1;
  }
  // names must be equal
  return 0;
}