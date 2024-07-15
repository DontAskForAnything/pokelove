export const NoFavoritePokemons = ({ user_name }: { user_name?: string }) => (
  <div className="w-full flex-1 items-center flex  flex-col justify-center mt-8">
    {user_name ? (
      <h2 className="ml-4 text-4xl  mb-2 text-center p-6">
        <span className="font-bold">@{user_name} </span>
        has no favorites
      </h2>
    ) : (
      <h2 className="ml-4 text-4xl font-bold mb-2 text-center">No Favorites</h2>
    )}
    <img src={"/sad_fish.png"} alt={"sad fish"} className="h-64 drag-none" />
    <p className="ml-4 text-base opacity-70 font-semibold mb-2 text-center">
      yet....
    </p>
  </div>
);
