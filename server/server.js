const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let aboutMessage = "Product Tracker API v1.0";

const productsDB = [
];

const GraphQLCategory = new GraphQLScalarType({
  name: 'GraphQLCategory',
  description: 'A GraphQLCategory() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const categoryValue = new String(value);
    return isNaN(categoryValue) ? undefined : categoryValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new String(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    productList,
  },
  Mutation: {
    setAboutMessage,
    productAdd,
  },
  GraphQLCategory,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function productList() {
  return productsDB;
}

function productAdd(_, { product }) {
  product.id = productsDB.length + 1;
  productsDB.push(product);
  return product;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
