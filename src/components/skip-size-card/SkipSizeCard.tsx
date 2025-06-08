import type { SkipSize } from '../../shared/types/SkipSize.type';
import placeholder from '../../assets/skip-placeholder.jpeg';
import { calculatePriceWithVat } from '../../shared/utils/skip.util';
import './skip-size-card.css';

interface Props {
  skip: SkipSize;
  isSelected: boolean;
  onSelect: () => void;
}

export function SkipSizeCard({ skip, isSelected, onSelect }: Props) {
  return (
    <div
      className={`skip-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div className="skip-image-container">
        <img
          src={placeholder}
          alt={`${skip?.size} Yard Skip`}
          className="skip-image"
        />
        {!skip?.allowed_on_road && (
          <span className="badge not-road">Not Allowed On The Road</span>
        )}
      </div>
      <div className="skip-details">
        <div className="yard-size">
          <span>{skip?.size} Yard Skip</span>
        </div>
        <div className="price">
          <span>
            £
            {calculatePriceWithVat(skip?.price_before_vat ?? 0, skip?.vat ?? 0)}
          </span>
        </div>
        <div className="hire-period">
          {skip?.hire_period_days} day hire period
        </div>
      </div>
      <div className="skip-select-button">
        <button className={isSelected ? 'selected-btn' : 'default-btn'}>
          {isSelected ? 'Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  );
}
