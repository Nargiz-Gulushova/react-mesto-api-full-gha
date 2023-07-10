const allowOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://mesto.nomoredomains.work',
  'https://mesto.nomoredomains.work',
];

const allowMethods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowMethods.join(','));
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
}

module.exports = cors;
