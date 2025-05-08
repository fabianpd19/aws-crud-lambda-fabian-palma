const AWS = require("aws-sdk");

exports.eliminarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDB
    .delete({
      TableName: "taskTable",
      Key: { id },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tarea eliminada con éxito",
    }),
  };
};
