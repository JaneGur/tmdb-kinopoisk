export const selectFavorites = (state: any) => state.favorites.items
export const selectIsFavorite = (state: any, movieId: number) => 
  state.favorites.items.some((item: any) => item.id === movieId)
