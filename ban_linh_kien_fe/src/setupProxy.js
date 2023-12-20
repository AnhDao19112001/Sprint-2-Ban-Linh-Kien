const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        'http://localhost:8080/api/user',
        createProxyMiddleware({
            target: 'http://localhost:8080/api/user',
            changeOrigin: true,
        })
    );
};
