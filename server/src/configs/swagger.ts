import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coffee Shop API",
      version: "1.0.0",
      description: "API documentation for the Coffee Shop application",
      contact: {
        name: "Developer",
        email: "developer@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000", // Change this to your API server URL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
