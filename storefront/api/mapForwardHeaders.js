import { lookup } from 'geoip-country';

const mapForwardHeaders = ({ headers = {}, ...req } = {}) => {
  const ip =
    headers['x-real-ip'] ||
    headers['x-forwarded-for'] ||
    req?.connection?.remoteAddress ||
    req?.socket?.remoteAddress ||
    req?.connection?.socket?.remoteAddress;

  const forwardHeaders = {
    ...headers,
    'accept-language': headers['accept-language'],
    authorization: headers.authorization,
    'x-real-ip': ip,
    'x-shop-country': headers['x-shop-country'] || lookup(ip),
    'user-agent': headers['user-agent'],
  };
  return forwardHeaders;
};

export default mapForwardHeaders;
