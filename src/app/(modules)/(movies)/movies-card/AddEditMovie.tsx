"use client";
import { useLazyQuery } from "@apollo/client/react";
import React from "react";
import { LIST_MOVIES } from "../graphql/Query";

const AddEditMovie = ({ movieId }: { movieId?: string }) => {
  const [getMovie, { data, loading }] = useLazyQuery(LIST_MOVIES);

  // React.useEffect(() => {
  //   if (movieId) {
  //     getMovie({ variables: { id: movieId } });
  //   }
  // }, [movieId]);

  return <div>AddEditMovie {movieId}</div>;
};

export default AddEditMovie;
