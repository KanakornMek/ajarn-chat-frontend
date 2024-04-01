export default function Question() {
  return (
    <div className="question">
      <h1>Reflection</h1>
      <h1>อะไรคือความแตกต่างคะ</h1>

      <hr />

      <div className="question-input-row">
        <div className="send-row">
          <input type="text" className="send-text-field"></input>
          <button className="send-btn">Send</button>
        </div>
        <button className="resolve-btn">Mark as Resolved</button>
      </div>
    </div>
  );
}
