import gql from 'graphql-tag';

const MessagesQuery = gql`
    query{
        messages{
            id
            from
            to
            body 
          }
    }
    `
const MessagesbyNameQuery = gql`
query($name: String!){
    messagebyName(name: $name){
        id
        from
        to
        body 
        }
}
`
const CreateMessageMutation = gql`
    mutation($from: String!,$to: String!, $body: String!){
        createMessage(from: $from,to: $to, body: $body){
            id
            from
            to
            body
        }
    }
`
const ClearMessageMutation = gql`
    mutation{
        clearMessage
    }
`
const NewMessageSubscription = gql`
    subscription($name: String!){
        newMessage(name: $name){
            id
            from
            to
            body
        }
    }
`

export {
    MessagesQuery,
    MessagesbyNameQuery,
    CreateMessageMutation,
    ClearMessageMutation,
    NewMessageSubscription
}
