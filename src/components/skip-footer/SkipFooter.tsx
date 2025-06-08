import type { SkipSize } from '../../shared/types/SkipSize.type';
import { calculatePriceWithVat } from '../../shared/utils/skip.util';
import placeholder from '../../assets/skip-placeholder.jpeg'; // add this line
import './skip-footer.css';

interface Props {
  skipSizes: SkipSize[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  handleContinue: () => void;
}

export function SkipFooter({
  skipSizes,
  selectedId,
  setSelectedId,
  handleContinue,
}: Props) {
  const selectedSkip = skipSizes.find((s) => s.id === selectedId);
  if (!selectedSkip) return null;

  return (
    <div
      className={`footer-bar-container ${selectedId !== null ? 'visible' : ''}`}
    >
      <div className="footer-bar">
        <div className="footer-skip-info">
          <img
            src={placeholder}
            alt={`${selectedSkip.size} Yard Skip`}
            className="footer-skip-image"
          />
          <span>
            <div className="info-skip">{selectedSkip.size} Yard Skip</div>
            <div className="info-price">
              <b>Price</b>: £
              {calculatePriceWithVat(
                selectedSkip.price_before_vat ?? 0,
                selectedSkip.vat ?? 0
              )}
            </div>
            <div className="info-duration">
              <b>Duration</b>: 14 day hire
            </div>
          </span>
        </div>
        <div className="footer-buttons">
          <button className="back" onClick={() => setSelectedId(null)}>
            Back
          </button>
          <button className="continue" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
