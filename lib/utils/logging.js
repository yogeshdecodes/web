export function log(msg, namespace = "") {
  console.log(`Artemis${namespace ? "/" + namespace : ""}: ${msg}`);
}

export function logFunc(logMessage) {
  // return decorator function
  return function(target, property, descriptor) {
    // save original value, which is method (function)
    let originalMethod = descriptor.value;
    // replace method implementation
    descriptor.value = function(...args) {
      log(logMessage);
      // here, call original method
      // `this` points to the instance
      return originalMethod.call(this, ...args);
    };
    return descriptor;
  };
}
