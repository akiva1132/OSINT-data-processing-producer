import { Producer } from "kafkajs";
import { producer } from "./configuration/kafka";

export const sendKafkaMessage = async (producer: Producer, topic: string, message: string) => {
  try {
    await producer.send({ topic, messages: [{ value: message }] });
  } catch (error) {
    return Promise.reject(error);
  }
};
export const send = async (message: string) => {
  await producer.connect()
  sendKafkaMessage(producer, "news", message);

}