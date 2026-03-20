import ChatClient from './chat-client';
import { getChildById } from './actions';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ChatPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const childId = searchParams.childId;
  let initialChildInfo = null;

  if (typeof childId === 'string') {
    initialChildInfo = await getChildById(childId);
  }

  return (
    <ChatClient
      initialChildInfo={initialChildInfo}
      systemPrompt={initialChildInfo?.systemPrompt}
    />
  );
}
