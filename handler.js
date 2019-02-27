const AWS = require('aws-sdk');
const uuid = require('node-uuid');

// constants
const USERS_TABLE = 'users';

// dynamo db instance
const dynamoDB = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'eu-west-1'
});

module.exports.createUser = async (event, _context) => {
  try {
    const { firstName, lastName } = JSON.parse(event.body);
    const id = uuid.v4();
    await dynamoDB.putItem({
      TableName: USERS_TABLE,
      Item: {
        id: { S: id },
        firstName: { S: firstName },
        lastName: { S: lastName },
      }
    }).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({
        id,
        firstName,
        lastName
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error
      })
    }
  }
};

module.exports.getUser = async (event, _context) => {
  try {
    const { id } = event.pathParameters;
    const user = await dynamoDB.getItem({
      TableName: USERS_TABLE,
      Key: {
        id: { S: id },
      }
    }).promise();
    return {
      statusCode: user.Item ? 200 : 404,
      body: JSON.stringify(user.Item ? user.Item : { message: 'Not found' })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error
      })
    }
  }
};

module.exports.deleteUser = async (event, _context) => {
  try {
    const { id } = event.pathParameters;
    await dynamoDB.deleteItem({
      TableName: USERS_TABLE,
      Key: {
        id: { S: id },
      }
    }).promise();
    return {
      statusCode: 204,
      body: null
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error
      })
    }
  }
};

module.exports.putUser = async (event, _context) => {
  try {
    const { id } = event.pathParameters;
    const { firstName, lastName } = JSON.parse(event.body);
    await dynamoDB.putItem({
      TableName: USERS_TABLE,
      Item: {
        id: { S: id },
        ...firstName ? { firstName: { S: firstName } } : {},
        ...lastName ? { lastName: { S: lastName } } : {},
      }
    }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        id,
        firstName,
        lastName
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error
      })
    }
  }
};
