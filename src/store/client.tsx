import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'


  // query data for driven 
const httpLink = new HttpLink({ // querys
  uri: 'https://react.eogresources.com/graphql',
});

//// subcript the data
const websocketLink = new WebSocketLink({ 
  uri: 'wss://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

  //split based on operation type
const link:any= split(
  
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' 
    && definition.operation === 'subscription';
  },
  websocketLink,
  httpLink,
);

// instruction sample
const Client= new ApolloClient({
  link,
  cache: new InMemoryCache()

});
export default Client;


