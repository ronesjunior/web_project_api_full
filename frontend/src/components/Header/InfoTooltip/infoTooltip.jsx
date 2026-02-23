import PropTypes from "prop-types";
import "../../blocks/infoTooltip.css";

export default function InfoTooltip({ icon, message }) {
  return (
    <div className="info-tooltip">
      <img src={icon} alt="Status" className="info-tooltip__icon" />
      <p className="info-tooltip__message">{message}</p>
    </div>
  );
}

InfoTooltip.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
