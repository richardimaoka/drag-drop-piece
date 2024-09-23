const nonNull = <ElementType>(
  element: ElementType | null | undefined
): element is ElementType => {
  return element !== null && element != undefined;
};

export const nonNullArray = <ElementType>(
  arr: (ElementType | null | undefined)[]
) => {
  return arr.filter(nonNull);
};
