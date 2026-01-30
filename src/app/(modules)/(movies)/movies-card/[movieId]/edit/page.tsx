import React from "react";
import AddEditMovie from "../../AddEditMovie";

const EditMovie = async ({ params }: { params: { movieId: string } }) => {
  const { movieId } = await params;
  return (
    <div>
      <AddEditMovie movieId={movieId} />
    </div>
  );
};

export default EditMovie;
