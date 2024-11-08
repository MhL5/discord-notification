# Discord Notification Bot

1. **Set Up the Bot in Discord**:

   - Create a bot in Discord, then obtain the bot's token and your desired channel’s ID.
   - Share the bot with your Discord server by using the OAuth link at the bottom of the OAuth page.
   - Assign the "Send Messages" permission to the bot in the target channel.

2. **Install Required Packages**:

   - Install `@discordjs/rest` and `discord-api-types` also `zod` for validation.
   - Create a `.env` file and add the following variables:

     ```plaintext
     DISCORD_BOT_TOKEN=your_bot_token
     DISCORD_CHANNEL_ID=your_channel_id
     ```

3. **Create a Next.js Route for Notifications**:

   - Copy and paste the provided code into a Next.js route.
   - Send POST requests to this API endpoint to trigger notifications.

   - The request body should be a JSON object with the following structure:

     ```typescript
     {
       variant: 'success' | 'error' | 'warning' | 'info' | 'unknown' | string,
       title: string,
       fieldsArr: { name: string, value: string, inline: boolean }[],
       description: string
     }
     ```

   - Some fields support Markdown formatting.

4. **Trigger Notifications**:
   - Use the endpoint to send Discord notifications with customized content.

Enjoy using your Discord notification bot!
[Need more help? feel free to Contact me](https://t.me/mhl_5)
