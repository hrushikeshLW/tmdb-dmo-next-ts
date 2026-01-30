/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n": typeof types.MoviesDocument,
    "\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id \n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id \n    name \n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id   \nlanguageCode   \nenglishName  }\n    movieCollection{\n    id \n    name \n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n": typeof types.MovieDocument,
    "\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n": typeof types.EmailPasswordLogInDocument,
};
const documents: Documents = {
    "\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n": types.MoviesDocument,
    "\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id \n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id \n    name \n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id   \nlanguageCode   \nenglishName  }\n    movieCollection{\n    id \n    name \n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n": types.MovieDocument,
    "\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n": types.EmailPasswordLogInDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id \n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id \n    name \n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id   \nlanguageCode   \nenglishName  }\n    movieCollection{\n    id \n    name \n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n"): (typeof documents)["\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id \n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id \n    name \n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id   \nlanguageCode   \nenglishName  }\n    movieCollection{\n    id \n    name \n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;