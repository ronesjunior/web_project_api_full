import React from "react";
import "../../blocks/infoTooltip.css";

export default function InfoTooltip({ icon, message, onClose }) {
  return (
    <div className="info-tooltip">
      <div className="info-tooltip__overlay" onClick={onClose}></div>

      <div className="info-tooltip__container">
        <button type="button" className="info-tooltip__close" onClick={onClose}>
          ×
        </button>

        {icon && (
          <img
            src={icon}
            alt="Ícone informativo"
            className="info-tooltip__icon"
          />
        )}

        <p className="info-tooltip__message">{message}</p>
      </div>
    </div>
  );
}
