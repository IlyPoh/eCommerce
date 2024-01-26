// IMPORTS
// styles
import styles from './PriceSlider.module.scss';
import ReactSlider from 'react-slider';

// TYPES
interface IPriceSliderProps {
  onPriceChange: (prices: number[]) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  total: { min: number; max: number };
}

// COMPONENT
export const PriceSlider: React.FC<IPriceSliderProps> = ({
  onPriceChange,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  total,
}) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isMin: boolean
  ) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      if (isMin) {
        setMinPrice(newValue);
      } else {
        setMaxPrice(newValue);
      }
      onPriceChange([isMin ? newValue : minPrice, isMin ? maxPrice : newValue]);
    }
  };

  const handleSliderChange = (newValues: number[]) => {
    setMinPrice(newValues[0]);
    setMaxPrice(newValues[1]);
    onPriceChange([newValues[0], newValues[1]]);
  };

  if (!maxPrice) return null;

  return (
    <>
      {isFinite(maxPrice) && (
        <section>
          <h4>Price</h4>
          <div className={styles['block']}>
            <ReactSlider
              max={total.max}
              value={[minPrice, maxPrice]}
              className={styles['slider']}
              thumbClassName={styles['thumb']}
              trackClassName={styles['track']}
              ariaLabelledby={['first-slider-label', 'second-slider-label']}
              pearling
              minDistance={10}
              onChange={handleSliderChange}
            />
            <div className={styles['inputs']}>
              <div className={styles['inputs-item']}>
                <div className={styles['inputs-title']}>Min</div>
                <input
                  type='number'
                  id='first-slider-label'
                  value={minPrice}
                  onChange={e => handleInputChange(e, true)}
                />
              </div>
              <span>-</span>
              <div className={styles['inputs-item']}>
                <div className={styles['inputs-title']}>Max</div>
                <input
                  type='number'
                  id='second-slider-label'
                  value={maxPrice}
                  onChange={e => handleInputChange(e, false)}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
