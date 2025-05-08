const AWS = require("aws-sdk");

exports.actualizarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  const { titulo, descripcion, estado } = JSON.parse(event.body);
  const fechaActualizacion = new Date().toISOString();

  const params = {
    TableName: "taskTable",
    Key: { id },
    UpdateExpression:
      "set titulo = :titulo, descripcion = :descripcion, estado = :estado, fechaActualizacion = :fechaActualizacion",
    ExpressionAttributeValues: {
      ":titulo": titulo,
      ":descripcion": descripcion,
      ":estado": estado,
      ":fechaActualizacion": fechaActualizacion,
    },
    ReturnValues: "ALL_NEW",
  };

  const resultado = await dynamoDB.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tarea actualizada con éxito",
      data: resultado.Attributes,
    }),
  };
};
