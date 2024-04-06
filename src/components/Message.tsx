import { threadType } from "../pages/Course";

interface Props {
  threadList: threadType[];
}

export default function Message({ threadList }: Props) {
  return (
    <div className="message">
      {threadList.map((content: threadType) => (
        <div className="message-flow">
          <h5>author: {content.author_id}</h5>
          <h4>{content.topic}</h4>
          <h1>{content.content}</h1>
        </div>
      ))}
    </div>
  );
}
