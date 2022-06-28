import { gql } from "@apollo/client";

// QUERIES

//Use Firebase id instead of MongoID
// {

//   "filter": {
//     "uid": "9luz6VTuykNQFFxaZfYuz8LfXLh2",

//   }
const GET_USER = gql`
query Query($filter: FilterFindOneUserInput) {
  userOne(filter: $filter) {
    uid
    username
    email
  }
}
`;

// {
//   "filter": {
//     "needHelp": true
//   }
// } for query below

const ALL_HR = gql`
  query Query($filter: FilterFindManyUserInput) {
    userPagination(filter: $filter) {
      items {
        username
        avatar
        user_languages
        help_request {
          title
          description
          hr_languages
        }
      }
    }
  }
`;

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

// {
//   "filter": {
//     "uid": "uid"
//   }
// } for below


const DELETE_USER = gql`
  mutation Mutation($filter: FilterRemoveOneUserInput) {
    userRemoveOne(filter: $filter) {
      record {
        uid
        username
        email
      }
    }
  }
`

// {

//   "filter": {
//     "uid": "9luz6VTuykNQFFxaZfYuz8LfXLh2"
//   },
//   "record": {
//     "needHelp": true,
//     "help_request": {
//       "title": "title",
//       "description": "descript",
//       "hr_languages": "Javascript"
//     }
//   }
const UPDATE_HR = gql`
mutation Mutation($record: UpdateOneUserInput!, $filter: FilterUpdateOneUserInput) {
  userUpdateOne(record: $record, filter: $filter) {
    record {
      username
      avatar
      help_request {
        title
        description
        hr_languages
      }
    }
  }
}
`;

export default CREATE_USER;
