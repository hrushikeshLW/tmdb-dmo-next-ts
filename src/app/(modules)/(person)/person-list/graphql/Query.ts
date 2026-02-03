import { gql } from "@/__generated__";

export const GET_PERSONS = gql(`
    query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
  listPersons(filter: $filter, sort: $sort) {
    message
    count
    data {
      id
      tmdbId
      name
      birthday
      deathday
      knownForDepartment
      alsoKnownAs
      gender
      biography
      popularity
      placeOfBirth
      profilePath
      homePage
      adult
    }
  }
}
    `);

export const GET_PERSON = gql(`
  query Person($id: ID!) {
    person(id: $id) {
      message
      data {
        id
        tmdbId
        name
        birthday
        deathday
        knownForDepartment
        alsoKnownAs
        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`);
