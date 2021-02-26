import { ApolloProvider,ApolloClient,InMemoryCache, Reference} from '@apollo/client';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css';
import 'antd/dist/antd.css'



import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
    timeout: 30000
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
