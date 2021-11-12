function routeErrorHandler(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (exception) {
            next(exception);
        }
    }
}

module.exports = routeErrorHandler;