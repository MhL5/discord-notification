import { z } from "zod";
import { REST } from "@discordjs/rest";
import {
  Routes,
  type APIEmbed,
  type RESTPostAPIChannelMessageResult,
} from "discord-api-types/v10";
import { type RESTPostAPICurrentUserCreateDMChannelResult } from "discord-api-types/v10";

const colorVariants = {
  success: 0x00ff00,
  error: 0xff0000,
  warning: 0xffff00,
  info: 0x0000ff,
  unknown: 0x808080,
};

const zodSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  color: z.number().optional(),
  description: z.string().optional(),
  fieldsArr: z
    .array(z.object({ name: z.string(), value: z.string() }))
    .optional(),
});

export const POST = async (request: Request) => {
  const { variant, title, fieldsArr, description, content } =
    await request.json();

  const { success, data } = zodSchema.safeParse({
    content,
    color:
      colorVariants[variant as keyof typeof colorVariants] ||
      colorVariants["unknown"],
    title,
    fieldsArr,
    description,
  });

  if (!success) return new Response(`incorrect payload!`, { status: 400 });

  const embedData: APIEmbed = {
    title: data.title,
    color: data.color,
    description: data.description,
    timestamp: new Date().toISOString(),
    fields: data.fieldsArr,
  };

  const discordClient = DiscordClient();
  discordClient.sendEmbed(embedData, content);

  return new Response("OK");
};

function DiscordClient() {
  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN ?? "",
  );

  async function createDM(
    userId: string,
  ): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    return rest.post(Routes.userChannels(), {
      body: { recipient_id: userId },
    }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>;
  }

  async function sendEmbed(
    embed: APIEmbed,
    content: string,
  ): Promise<RESTPostAPIChannelMessageResult> {
    return rest.post(
      Routes.channelMessages(process.env.DISCORD_CHANNEL_ID ?? ""),
      {
        body: {
          content,
          embeds: [embed],
        },
      },
    ) as Promise<RESTPostAPIChannelMessageResult>;
  }

  return {
    createDM,
    sendEmbed,
  };
}
