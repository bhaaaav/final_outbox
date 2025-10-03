export default {
  openapi: "3.0.0",
  info: { title: "Email Delivery API", version: "1.0.0" },

  // 1️⃣ Add security schemes
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token like: Bearer <token>",
      },
    },
  },

  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register user",
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } },
            },
          },
        },
        responses: { "200": { description: "User registered" } },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login user",
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } },
            },
          },
        },
        responses: { "200": { description: "Token returned" } },
      },
    },
    "/api/email/send": {
      post: {
        summary: "Send email",
        security: [{ BearerAuth: [] }], // 2️⃣ Protect this route
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { recipient: { type: "string" }, subject: { type: "string" }, body: { type: "string" } },
              },
            },
          },
        },
        responses: { "200": { description: "Email sent" }, "401": { description: "Unauthorized" } },
      },
    },
    "/api/email": {
      get: {
        summary: "Get user emails",
        security: [{ BearerAuth: [] }], // 2️⃣ Protect this route
        responses: { "200": { description: "List of emails" }, "401": { description: "Unauthorized" } },
      },
    },
  },
};
