import { gql } from "../../../../__generated__";

export const CREATE_MOVIE = gql(`
mutation createMovie($data: MovieInput) {
  createMovie(data: $data) {
    message
}}
    `);

export const UPDATE_MOVIE = gql(`
mutation updateMovie($id: ID!, $data: UpdateMovieInput) {
  updateMovie(id: $id, data: $data) {
    message
}}
    `);
