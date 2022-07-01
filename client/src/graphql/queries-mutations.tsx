import { gql } from '@apollo/client';

// QUERIES

const GET_USER = gql`
  query UserMany($filter: FilterFindOneUserInput) {
    userOne(filter: $filter) {
      username
      email
      avatar
      rating_total
      rating_count
      needHelp
      help_request {
        username
        title
        description
        hr_languages
        time_created
        url
      }
    }
  }
`;

const GET_HR_BY_LANGUAGE = gql`
  query Query($filter: FilterFindManyUserInput) {
    userMany(filter: $filter) {
      avatar
      needHelp
      help_request {
        time_created
        title
        description
        hr_languages
        username
        url
      }
    }
  }
`;

// MUTATIONS

const CREATE_USER = gql`
  mutation Mutation($record: CreateOneUserInput!) {
    userCreateOne(record: $record) {
      record {
        avatar
        email
        username
        uid
      }
    }
  }
`;

//NOT IN USE YET:
const DELETE_USER = gql`
  mutation Mutation($filter: FilterRemoveOneUserInput) {
    userRemoveOne(filter: $filter, uid: $uid) {
      record {
        uid
        username
        email
      }
    }
  }
`;

// NOT IN USE YET:

const UPDATE_HR = gql`
  mutation Mutation(
    $record: UpdateOneUserInput!
    $filter: FilterUpdateOneUserInput
  ) {
    userUpdateOne(record: $record, filter: $filter) {
      record {
        needHelp
        help_request {
          title
          description
          hr_languages
          username
          time_created
          url
        }
      }
    }
  }
`;

//NOT IN USE YET
// {
//   "filter": {
//     "uid": "nASbai2fxwVZTTVBmCzUNLpopoa2"
//   },
//   "record": {
//     "needHelp":false,
//     "help_request": null
//   }
// }
const DELETE_HR = gql`
  mutation Mutation(
    $record: UpdateOneUserInput!
    $filter: FilterUpdateOneUserInput
  ) {
    userUpdateOne(record: $record, filter: $filter) {
      record {
        username
        avatar
        help_request {
          title
          description
          hr_languages
        }
        createdAt
      }
    }
  }
`;

export { CREATE_USER, GET_USER, GET_HR_BY_LANGUAGE, UPDATE_HR };
