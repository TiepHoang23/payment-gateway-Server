import crypto from 'crypto';
import redis_client from '../redis.js';
function hashToken(token) {
  return crypto.createHmac('sha256', 'secretKey').update(token).digest('hex');
}

async function getBlockedToken(token) {
  const hashedToken = `bl:${hashToken(token)}`;
  const result = await redis_client.get(hashedToken);
  return result;
}

async function setBlockedToken(token, expiresIn) {
  const hashedToken = `bl:${hashToken(token)}`;
  await redis_client.setEx(hashedToken, expiresIn, '1');
}

export  { getBlockedToken, setBlockedToken };
export default  { getBlockedToken, setBlockedToken };
