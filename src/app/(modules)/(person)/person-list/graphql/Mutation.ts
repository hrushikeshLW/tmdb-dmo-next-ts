import { gql } from "@/__generated__";

export const CREATE_PERSON = gql(`
  mutation CreatePerson($data: PersonInput!) {
    createPerson(data: $data) {
      message
    }
  }
`);

export const UPDATE_PERSON = gql(`
  mutation UpdatePerson($id: ID!, $data: UpdatePersonInput!) {
    updatePerson(id: $id, data: $data) {
      message
    }
  }
`);

export const DELETE_PERSON = gql(`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id) {
      message
    }
  }
`);
