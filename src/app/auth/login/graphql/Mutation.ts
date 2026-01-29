import { gql } from "@/__generated__";

export const LOGIN = gql(`
  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      message
      data {
        token
        user {
          id
          name
          email
          profileImage
        }
      }
    }
  }
`);
