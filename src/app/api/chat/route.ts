import { createOpenAI } from '@ai-sdk/openai';

import { streamText, convertToCoreMessages, CoreMessage, UserContent } from 'ai';

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST (req: Request) { 
  const { messages, selectedModel, data } = await req.json();
  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  const openai = createOpenAI({
    compatibility: 'strict', 
    baseURL: process.env.NEXT_PUBLIC_OPENAI_URL,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const result = await streamText({
    model: openai(selectedModel),
    messages: [
      ...convertToCoreMessages(initialMessages),
      { role: 'user', content: currentMessage.content },
    ],
  });

  return result.toDataStreamResponse();
}
