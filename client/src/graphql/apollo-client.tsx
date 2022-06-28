import { ApolloClient, InMemoryCache } from '@apollo/client';
import { auth } from '../firebase';
import { userStore } from '../state-stores/state-stores';

const createClient = (accessToken?: string) => {
  return new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
    headers: accessToken ? { authorization: `Bearer ${accessToken}` } : {},
  });
};

export default createClient;
