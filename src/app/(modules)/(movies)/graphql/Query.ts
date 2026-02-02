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
      movieImages{
      filePath
      }
    }
  }
}
`);

export const GET_MOVIE = gql(`
query movie($id: ID!) {
  movie(id: $id) {
    message
    data {
    adult
    budget
    castAndCrew{
    id
    name}
    countries{
    id
    countryCode
    englishName
    }
    createdAt
    genres{
    id
    name
    }
    homePage
    id
    imageUrl
    languages{
    id
languageCode
englishName  }
    movieCollection{
    id
    name
    posterPath
    backdropPath}
    movieImages{
    id
    filePath
    }
    movieVideo{
    id
    site
    }
    originalLanguage
    originalTitle
    overview
    popularity
    releaseDate
    revenue
    runtime
    status
    streamingOn
    tagline
    title
    video
    voteAverage
    voteCount
       }
  }
}
`);

export const GET_COUNTRIES = gql(`
query countries {
  countries {
    data {
      id
      englishName
    }
  }
}
`);

export const GET_LANGUAGES = gql(`
query languages {
  languages {
    data {
      id
      englishName
    }
  }
}
`);

export const GET_PRODUCTION_COMPANIES = gql(`
query listProductionCompanies {
  listProductionCompanies {
    data {
      id
      name
    }
  }
}
`);

export const GET_GENRES = gql(`
query listGenre {
  listGenre {
      id
      name
  }
}
`);
