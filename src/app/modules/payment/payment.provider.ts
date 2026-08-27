import axios from "axios";
import { envVars } from "../../config/env";


export const PaymentGateway = {
  async getAuthToken() {
    const response = await axios.post(
      `${envVars.ShurjoPay.SP_ENDPOINT}/api/get_token`,
      {
        username: envVars.ShurjoPay.SP_USERNAME,
        password: envVars.ShurjoPay.SP_PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  },

  async createPayment(
    token: string,
    storeId: string,
    order: {
      orderId: string;
      amount: number;
      customerName: string;
      customerEmail: string;
      customerPhone?: string;
      customerAddress?: string;
      customerCity?: string;
      customerPostCode?: string;
      clientIp?: string;
    },
  ) {
    const response = await axios.post(
      `${envVars.ShurjoPay.SP_ENDPOINT}/api/secret-pay`,
      {
        token,
        store_id: storeId,
        prefix: envVars.ShurjoPay.SP_PREFIX,

        amount: order.amount,
        order_id: order.orderId,
        currency: "BDT",

        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,

        customer_address: order.customerAddress || "Dhaka",
        customer_city: order.customerCity || "Dhaka",
        customer_post_code: order.customerPostCode || "1200",

        client_ip: order.clientIp || "127.0.0.1",

        return_url: envVars.ShurjoPay.SP_RETURN_URL,
        cancel_url: envVars.ShurjoPay.SP_RETURN_URL,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  },

  async verifyPayment(
    token: string,
    providerOrderId: string,
  ) {
    const response = await axios.post(
      `${envVars.ShurjoPay.SP_ENDPOINT}/api/verification`,
      {
        order_id: providerOrderId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};