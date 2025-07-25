import { error } from "console";
import { createClient } from "redis";
const client = createClient();
export default client;