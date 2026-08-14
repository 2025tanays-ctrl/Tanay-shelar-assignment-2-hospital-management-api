const requestLogger = (request, response, next) => {
    console.log("Request URL:", request.url);
    console.log("Request Method:", request.method);
    console.log("Date:", new Date());

    next();
};

module.exports = requestLogger;