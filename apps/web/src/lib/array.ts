export const moveObjectToTop = <T extends { id: string | number }>(
  arr: T[],
  id: T["id"]
) => {
  const index = arr.findIndex((item) => item.id === id);

  if (index === -1) return arr;

  const updatedArr = [...arr];
  const [existedObj] = updatedArr.splice(index, 1);

  return [existedObj, ...updatedArr] as T[];
};
