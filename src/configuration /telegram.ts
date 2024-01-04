import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { updates } from "telegram/client";
import { NewMessage } from "telegram/events";
import { NewMessageEvent } from "telegram/events/NewMessage";
import input from "input";

const apiId = 22806061;
const apiHash = "d0a612fdba70ee170a3d854c3c26ed52";
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUKpLM562fYFJ2VAubzLB3A37e6ck866cANvmLUXTXIFsXOYH4jLw3pU3TUAw+Id7NV6e3YSioK2oi68bs3zWr/xoMx+dIcYStksWFcjDcKdTZKpkQadLBf976do91OLK9SzKf7QL9UeAH+zrbWS2BeoRQNSrI1gDmbzhvW7baEKp4i1oGT433YxmnWfoxtyqKYSgQ0GXRDCfeixoLKop66KYEu47PjH9y3QufUv7II/raaE2MF9g4Cq9P0XTk0OXu5ZmnvABFibOJBmZeNsXM72a2agVhoHw6XwIxQFAWS+ltCW0xN3jmXvG5VBQUKdadPfrQLOb4t7M/IbuzPgRo0U=");
export const client = new TelegramClient(stringSession, apiId, apiHash, {
connectionRetries: 5,
});

console.log("You should now be connected.");
console.log(client.session.save()); // Save this string to avoid logging in again
// await client.sendMessage("me", { message: "Hello!" });

export const connectToTelegram = async () => {
    await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () =>
          await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
      });
}