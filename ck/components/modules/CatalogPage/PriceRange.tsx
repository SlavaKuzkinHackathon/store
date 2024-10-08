import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { Range, getTrackBackground } from 'react-range'
import styles from '@/styles/catalog/index.module.scss'
import { IPriceRangeProps } from '@/types/catalog'

const STEP = 1
const MIN = 5000
const MAX = 150000

const PriceRange = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: IPriceRangeProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handlePriceRangeChange = (values: number[]) => {
    setIsPriceRangeChanged(true)
    setPriceRange(values)
  }

  return (
    <div className={styles.filters__price}>
      <div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
        <input
          type="text"
          value={Math.ceil(priceRange[0])}
          placeholder="от 5 000"
          readOnly
        />
        <span className={styles.filters__price__inputs__border} />
        <input
          type="text"
          value={Math.ceil(priceRange[1])}
          placeholder="до 150 000"
          readOnly
        />
      </div>
      <Range
        values={priceRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePriceRangeChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: 'auto',
              display: 'flex',
              width: '100%',
              padding: '0 10px',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: priceRange,
                  colors: ['rgb(137, 200, 156)', 'rgb(50, 133, 42)', 'rgb(137, 200, 156)'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
          >
            <div
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '3px solid rgb(50, 133, 42)',
                boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

export default PriceRange
