import userData from "../data-users.json";

function isRecipeInFavs(uid: string | undefined, recipeId: number) {
  let isInFavs = false;
  if (uid) {
    let user = userData.filter((u) => u.uid === uid);
    const userFavs = user[0].favorites;
    for (let x = 0; x < userFavs.length; x++) {
      if (userFavs[x] === recipeId) {
        isInFavs = true;
      }
    }
  }
  return isInFavs;
}

export default isRecipeInFavs;
