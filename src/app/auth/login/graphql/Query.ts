import { gql } from "@/__generated__";

export const LIST_MOVIES = gql(`
query movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {
  movies(filter: $filter, sort: $sort) {
    message
    count
    data {
      id
      title
      overview
      imageUrl
      status
    }
  }
}
`);
