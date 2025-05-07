exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hola mundo desde la ESPE - Sede Santo Domingo!",
      input: event,
    }),
  };
};
