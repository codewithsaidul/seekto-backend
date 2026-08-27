import dotenv from "dotenv";
dotenv.config();

interface ENVCONFIG {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  EXPRESS_SESSION_SECRET: string;
  FRONTEND_URL: string;
  LOCAL_FRONTEND_URL: string;

  JWT: {
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRATION_TIME: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRATION_TIME: string;
  };

  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;

  ShurjoPay: {
    SP_ENDPOINT: string;
    SP_USERNAME: string;
    SP_PASSWORD: string;
    SP_PREFIX: string;
    SP_RETURN_URL: string;
  };

  SSL: {
    SSL_STORE_ID: string;
    SSL_STORE_PASS: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
    SSL_SUCCESS_BACKEND_URL: string;
    SSL_FAIL_BACKEND_URL: string;
    SSL_CANCEL_BACKEND_URL: string;
    SSL_SUCCESS_FRONTEND_URL: string;
    SSL_FAIL_FRONTEND_URL: string;
    SSL_CANCEL_FRONTEND_URL: string;
  };

  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };

  EMAIL_SENDER: {
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_FROM: string;
    RESEND_API_KEY: string;
  };

  REDIS: {
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
  };
}

const loadEnvVariable = (): ENVCONFIG => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
    "EXPRESS_SESSION_SECRET",

    "FRONTEND_URL",
    "LOCAL_FRONTEND_URL",

    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRATION_TIME",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRATION_TIME",

    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",

    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",

    "SP_ENDPOINT",
    "SP_USERNAME",
    "SP_PASSWORD",
    "SP_PREFIX",
    "SP_RETURN_URL",

    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSL_CANCEL_BACKEND_URL",
    "SSL_SUCCESS_FRONTEND_URL",
    "SSL_FAIL_FRONTEND_URL",
    "SSL_CANCEL_FRONTEND_URL",

    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",

    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "RESEND_API_KEY",

    "REDIS_HOST",
    "REDIS_PORT",
    "REDIS_USERNAME",
    "REDIS_PASSWORD",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    LOCAL_FRONTEND_URL: process.env.LOCAL_FRONTEND_URL as string,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,

    JWT: {
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
      JWT_ACCESS_EXPIRATION_TIME: process.env
        .JWT_ACCESS_EXPIRATION_TIME as string,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
      JWT_REFRESH_EXPIRATION_TIME: process.env
        .JWT_REFRESH_EXPIRATION_TIME as string,
    },

    ShurjoPay: {
      SP_ENDPOINT: process.env.SP_ENDPOINT as string,
      SP_USERNAME: process.env.SP_USERNAME as string,
      SP_PASSWORD: process.env.SP_PASSWORD as string,
      SP_PREFIX: process.env.SP_PREFIX as string,
      SP_RETURN_URL: process.env.SP_RETURN_URL as string,
    },

    SSL: {
      SSL_STORE_ID: process.env.SSL_STORE_ID as string,
      SSL_STORE_PASS: process.env.SSL_STORE_PASS as string,
      SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
      SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,

      SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
      SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
      SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,

      SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
      SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
      SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
    },

    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },

    EMAIL_SENDER: {
      SMTP_HOST: process.env.SMTP_HOST as string,
      SMTP_PORT: process.env.SMTP_PORT as string,
      SMTP_USER: process.env.SMTP_USER as string,
      SMTP_PASS: process.env.SMTP_PASS as string,
      SMTP_FROM: process.env.SMTP_FROM as string,
      RESEND_API_KEY: process.env.RESEND_API_KEY as string,
    },

    REDIS: {
      REDIS_HOST: process.env.REDIS_HOST as string,
      REDIS_PORT: process.env.REDIS_PORT as string,
      REDIS_USERNAME: process.env.REDIS_USERNAME as string,
      REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    },
  };
};

export const envVars = loadEnvVariable();
