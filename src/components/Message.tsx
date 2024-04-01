interface Props {
  topic: string;
  description: string;
}

export default function Message({ topic, description }: Props) {
  return (
    <div className="message">
      <h4>{topic}</h4>
      <h1>{description}</h1>
    </div>
  );
}
