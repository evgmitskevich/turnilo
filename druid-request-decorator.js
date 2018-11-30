exports.version = 1;

exports.druidRequestDecoratorFactory = function (logger, params, sessionVars) {
  return function (decoratorRequest) {

    let clientHeaders = sessionVars.get("client-headers");
    let headers = {};
    for (let header in clientHeaders) {
      headers["X-Client-" + header] = clientHeaders[header];
    }
    let decoration = {
      headers: headers
    };

    console.log("Decoration:");
    console.log(decoration);

    // This can also be async if instead of a value of a promise is returned.
    return decoration;
  };
};
