import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const packageAmounts: Record<string, number> = {
  "slot-holding": 200000,
  "expert-wave": 500000,
  "finance-wave": 950000,
  "creator-wave": 1600000,
  "tech-wave": 2000000,
};

const orderInput = z.object({
  packageId: z.string(),
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator(orderInput)
  .handler(async ({ data }) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const amount = packageAmounts[data.packageId];

    if (!keyId || !keySecret) {
      throw new Error("Razorpay server credentials are missing.");
    }
    if (!amount) {
      throw new Error("That package is not available.");
    }

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `enrollment_${data.packageId}_${Date.now()}`,
        notes: {
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          package_id: data.packageId,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Razorpay could not create the payment order.");
    }

    const order = (await response.json()) as { id: string; amount: number; currency: string };
    return { id: order.id, amount: order.amount, currency: order.currency };
  });
