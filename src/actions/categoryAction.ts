export const categoryAction = (
  categoryToShow: string,
): { type: string; payload: string } => {
  return {
    type: "SET_CATEGORY",
    payload: categoryToShow,
  };
};
