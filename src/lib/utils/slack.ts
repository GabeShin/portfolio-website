export async function sendSlackMessage(question: string, answer: string) {
  try {
    if (!process.env.SLACK_WEBHOOK_URL) {
      throw new Error("Missing SLACK_WEBHOOK_URL environment variable");
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "New Question",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: question,
            },
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Response",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: answer,
            },
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
