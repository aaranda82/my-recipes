export const categoryAction = (categoryToShow: string) => {
  return {
    type: "SET_CATEGORY",
    payload: categoryToShow,
  };
};
