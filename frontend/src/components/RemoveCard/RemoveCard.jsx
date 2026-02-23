export default function RemoveCard({ onConfirm }) {
  return (
    <form className="popup__form">
      <button type="button" className="popup__button" onClick={onConfirm}>
        Sim
      </button>
    </form>
  );
}
