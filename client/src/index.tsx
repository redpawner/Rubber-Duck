import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import createClient from './graphql/apollo-client';
import { userStore } from './state-stores/state-stores';

//TODO: consider returning to old format and using Apollo link https://www.apollographql.com/docs/react/api/link/introduction/

export default function Index() {
  const userAt = userStore((state) => state.userAT);
  const [client, setClient] = useState(createClient());

  useEffect(() => {
    if (userAt) setClient(createClient(userAt));
  }, [userAt]);

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
