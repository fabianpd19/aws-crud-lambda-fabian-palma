const { v4: uuidv4 } = require("uuid");
const { DynamoDB } = require("aws-sdk");

exports.agregarTask = async (event) => {
  const { titulo, descripcion } = JSON.parse(event.body);
  const fechaCreacion = new Date().toISOString();
  const id = uuidv4();

  const dynamoDB = new DynamoDB.DocumentClient();

  const item = {
    id,
    titulo,
    descripcion,
    fechaCreacion,
    estado: false,
  };

  await dynamoDB
    .put({
      TableName: "taskTable",
      Item: item,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tarea agregada con éxito",
      data: item,
    }),
  };
};

exports.obtenerTask = async () => {
  const dynamoDB = new DynamoDB.DocumentClient();

  const resultado = await dynamoDB
    .scan({
      TableName: "taskTable",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Tarea mostrada con éxito",
      data: resultado,
    }),
  };
};
