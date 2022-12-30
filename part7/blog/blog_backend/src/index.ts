import {PORT} from "./utils/config";
import {app} from "./app";
import logger from "./utils/logger";
import * as http from "http";

const server = http.createServer(app)

server.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`)
})
