const AWS = require("aws-sdk");
exports.obtenerTasks = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDB
    .scan({
      TableName: "taskTable",
    })
    .promise();
  const tareas = result.Items;
  return {
    status: 200,
    body: tareas,
  };
};
