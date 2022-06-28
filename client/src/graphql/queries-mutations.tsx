import { gql } from '@apollo/client';

// QUERIES

// MUTATIONS

const CREATE_USER = gql`
  mutation Mutation($record: CreateOneUserInput!) {
    userCreateOne(record: $record) {
      record {
        email
        username
        uid
      }
    }
  }
`;

//user_languages

export default CREATE_USER;
