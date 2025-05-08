import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Room: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      chatMessages: a.hasMany("ChatMessage", "chatMessageId"),
    })
    .authorization((allow) => [allow.authenticated()]),
  ChatMessage: a
    .model({
      room: a.belongsTo("Room", "chatMessageId"),
      chatMessageId: a.id(),
      sender: a.string().required(),
      text: a.string().required(),
    })
    .authorization((allow) => [allow.authenticated()]),
  chat: a
    .conversation({
      aiModel: a.ai.model("Claude 3.5 Sonnet"),
      systemPrompt:
        "You are a person in a chat room. You will respond as if you are casually chatting with a random person. ",
    })
    .authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
