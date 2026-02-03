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
    "\nmutation createMovie($data: MovieInput) {\n  createMovie(data: $data) {\n    message\n}}\n    ": typeof types.CreateMovieDocument,
    "\nmutation updateMovie($id: ID!, $data: UpdateMovieInput) {\n  updateMovie(id: $id, data: $data) {\n    message\n}}\n    ": typeof types.UpdateMovieDocument,
    "\n  mutation deleteMovie($id: ID!) {\n    deleteMovie(id: $id) {\n      message\n    }\n  }\n": typeof types.DeleteMovieDocument,
    "\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n": typeof types.MoviesDocument,
    "\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id\n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id\n    name\n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id\nlanguageCode\nenglishName  }\n    movieCollection{\n    id\n    name\n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n": typeof types.MovieDocument,
    "\nquery countries {\n  countries {\n    data {\n      id\n      englishName\n    }\n  }\n}\n": typeof types.CountriesDocument,
    "\nquery languages {\n  languages {\n    data {\n      id\n      englishName\n    }\n  }\n}\n": typeof types.LanguagesDocument,
    "\nquery listProductionCompanies {\n  listProductionCompanies {\n    data {\n      id\n      name\n    }\n  }\n}\n": typeof types.ListProductionCompaniesDocument,
    "\nquery listGenre {\n  listGenre {\n      id\n      name\n  }\n}\n": typeof types.ListGenreDocument,
    "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      message\n    }\n  }\n": typeof types.CreatePersonDocument,
    "\n  mutation UpdatePerson($id: ID!, $data: UpdatePersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      message\n    }\n  }\n": typeof types.UpdatePersonDocument,
    "\n  mutation deletePerson($id: ID!) {\n    deletePerson(id: $id) {\n      message\n    }\n  }\n": typeof types.DeletePersonDocument,
    "\n    query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      tmdbId\n      name\n      birthday\n      deathday\n      knownForDepartment\n      alsoKnownAs\n      gender\n      biography\n      popularity\n      placeOfBirth\n      profilePath\n      homePage\n      adult\n    }\n  }\n}\n    ": typeof types.ListPersonsDocument,
    "\n  query Person($id: ID!) {\n    person(id: $id) {\n      message\n      data {\n        id\n        tmdbId\n        name\n        birthday\n        deathday\n        knownForDepartment\n        alsoKnownAs\n        gender\n        biography\n        popularity\n        placeOfBirth\n        profilePath\n        homePage\n        adult\n      }\n    }\n  }\n": typeof types.PersonDocument,
    "\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n": typeof types.EmailPasswordLogInDocument,
};
const documents: Documents = {
    "\nmutation createMovie($data: MovieInput) {\n  createMovie(data: $data) {\n    message\n}}\n    ": types.CreateMovieDocument,
    "\nmutation updateMovie($id: ID!, $data: UpdateMovieInput) {\n  updateMovie(id: $id, data: $data) {\n    message\n}}\n    ": types.UpdateMovieDocument,
    "\n  mutation deleteMovie($id: ID!) {\n    deleteMovie(id: $id) {\n      message\n    }\n  }\n": types.DeleteMovieDocument,
    "\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n": types.MoviesDocument,
    "\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id\n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id\n    name\n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id\nlanguageCode\nenglishName  }\n    movieCollection{\n    id\n    name\n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n": types.MovieDocument,
    "\nquery countries {\n  countries {\n    data {\n      id\n      englishName\n    }\n  }\n}\n": types.CountriesDocument,
    "\nquery languages {\n  languages {\n    data {\n      id\n      englishName\n    }\n  }\n}\n": types.LanguagesDocument,
    "\nquery listProductionCompanies {\n  listProductionCompanies {\n    data {\n      id\n      name\n    }\n  }\n}\n": types.ListProductionCompaniesDocument,
    "\nquery listGenre {\n  listGenre {\n      id\n      name\n  }\n}\n": types.ListGenreDocument,
    "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      message\n    }\n  }\n": types.CreatePersonDocument,
    "\n  mutation UpdatePerson($id: ID!, $data: UpdatePersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      message\n    }\n  }\n": types.UpdatePersonDocument,
    "\n  mutation deletePerson($id: ID!) {\n    deletePerson(id: $id) {\n      message\n    }\n  }\n": types.DeletePersonDocument,
    "\n    query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      tmdbId\n      name\n      birthday\n      deathday\n      knownForDepartment\n      alsoKnownAs\n      gender\n      biography\n      popularity\n      placeOfBirth\n      profilePath\n      homePage\n      adult\n    }\n  }\n}\n    ": types.ListPersonsDocument,
    "\n  query Person($id: ID!) {\n    person(id: $id) {\n      message\n      data {\n        id\n        tmdbId\n        name\n        birthday\n        deathday\n        knownForDepartment\n        alsoKnownAs\n        gender\n        biography\n        popularity\n        placeOfBirth\n        profilePath\n        homePage\n        adult\n      }\n    }\n  }\n": types.PersonDocument,
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
export function gql(source: "\nmutation createMovie($data: MovieInput) {\n  createMovie(data: $data) {\n    message\n}}\n    "): (typeof documents)["\nmutation createMovie($data: MovieInput) {\n  createMovie(data: $data) {\n    message\n}}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updateMovie($id: ID!, $data: UpdateMovieInput) {\n  updateMovie(id: $id, data: $data) {\n    message\n}}\n    "): (typeof documents)["\nmutation updateMovie($id: ID!, $data: UpdateMovieInput) {\n  updateMovie(id: $id, data: $data) {\n    message\n}}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteMovie($id: ID!) {\n    deleteMovie(id: $id) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMovie($id: ID!) {\n    deleteMovie(id: $id) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n  movies(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      title\n      overview\n      imageUrl\n      status\n      movieImages{\n      filePath\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id\n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id\n    name\n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id\nlanguageCode\nenglishName  }\n    movieCollection{\n    id\n    name\n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n"): (typeof documents)["\nquery movie($id: ID!) {\n  movie(id: $id) {\n    message\n    data {\n    adult\n    budget\n    castAndCrew{\n    id\n    name}\n    countries{\n    id\n    countryCode\n    englishName\n    }\n    createdAt\n    genres{\n    id\n    name\n    }\n    homePage\n    id\n    imageUrl\n    languages{\n    id\nlanguageCode\nenglishName  }\n    movieCollection{\n    id\n    name\n    posterPath\n    backdropPath}\n    movieImages{\n    id\n    filePath\n    }\n    movieVideo{\n    id\n    site\n    }\n    originalLanguage\n    originalTitle\n    overview\n    popularity\n    releaseDate\n    revenue\n    runtime\n    status\n    streamingOn\n    tagline\n    title\n    video\n    voteAverage\n    voteCount\n       }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery countries {\n  countries {\n    data {\n      id\n      englishName\n    }\n  }\n}\n"): (typeof documents)["\nquery countries {\n  countries {\n    data {\n      id\n      englishName\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery languages {\n  languages {\n    data {\n      id\n      englishName\n    }\n  }\n}\n"): (typeof documents)["\nquery languages {\n  languages {\n    data {\n      id\n      englishName\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery listProductionCompanies {\n  listProductionCompanies {\n    data {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery listProductionCompanies {\n  listProductionCompanies {\n    data {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery listGenre {\n  listGenre {\n      id\n      name\n  }\n}\n"): (typeof documents)["\nquery listGenre {\n  listGenre {\n      id\n      name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePerson($id: ID!, $data: UpdatePersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePerson($id: ID!, $data: UpdatePersonInput!) {\n    updatePerson(id: $id, data: $data) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deletePerson($id: ID!) {\n    deletePerson(id: $id) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation deletePerson($id: ID!) {\n    deletePerson(id: $id) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      tmdbId\n      name\n      birthday\n      deathday\n      knownForDepartment\n      alsoKnownAs\n      gender\n      biography\n      popularity\n      placeOfBirth\n      profilePath\n      homePage\n      adult\n    }\n  }\n}\n    "): (typeof documents)["\n    query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    message\n    count\n    data {\n      id\n      tmdbId\n      name\n      birthday\n      deathday\n      knownForDepartment\n      alsoKnownAs\n      gender\n      biography\n      popularity\n      placeOfBirth\n      profilePath\n      homePage\n      adult\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Person($id: ID!) {\n    person(id: $id) {\n      message\n      data {\n        id\n        tmdbId\n        name\n        birthday\n        deathday\n        knownForDepartment\n        alsoKnownAs\n        gender\n        biography\n        popularity\n        placeOfBirth\n        profilePath\n        homePage\n        adult\n      }\n    }\n  }\n"): (typeof documents)["\n  query Person($id: ID!) {\n    person(id: $id) {\n      message\n      data {\n        id\n        tmdbId\n        name\n        birthday\n        deathday\n        knownForDepartment\n        alsoKnownAs\n        gender\n        biography\n        popularity\n        placeOfBirth\n        profilePath\n        homePage\n        adult\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      message\n      data {\n        token\n        user {\n          id\n          name\n          email\n          profileImage\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;