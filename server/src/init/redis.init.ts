import { Redis } from "ioredis";
import config from "../configs";

const { host, port } = config.redis;

const redisConnection = new Redis({
  host,
  port,
});

export default redisConnection;
