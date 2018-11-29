exports.version = 1;

exports.druidRequestDecoratorFactory = function (logger, params, sessionVars) {
  return function (decoratorRequest) {

    var decoration = {
      headers: {
        "X-Client-Domain": sessionVars.get("X-Client-Domain")
      }
    };

    console.log("Decoration:");
    console.log(decoration);

    // This can also be async if instead of a value of a promise is returned.
    return decoration;
  };
};
