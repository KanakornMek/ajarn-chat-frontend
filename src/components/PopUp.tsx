interface Props {
  handleCancel: () => void;
}
export default function PopUp({ handleCancel }: Props) {
  return (
    <div className="pop-up">
      <button className="cancel-button" onClick={handleCancel}>
        X
      </button>
      <h4>Topic*</h4>
      <input type="text" className="input-topic"></input>
      <hr />
      <h4>Description*</h4>
      <input type="text" className="input-description"></input>
      <button className="submit-button">Post</button>
    </div>
  );
}
