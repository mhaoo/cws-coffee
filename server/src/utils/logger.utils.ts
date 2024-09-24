import path from "path";
import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";
import config from "@/configs";

const { level: logLevel } = config.logger;

function createLogDirectory() {
  const dateFolder = new Date().toISOString().split("T")[0];
  const logDir = path.join(__dirname, `../../logs/${dateFolder}`);

  // Check if the directory exists, if not, create it
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return logDir;
}

const logDir = createLogDirectory();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  // defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Create logs in the date-based folder
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, "application-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
      level: "info",
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],
});

export default logger;
