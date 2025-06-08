import React, { useState } from 'react';
import type { SkipSize } from '../../shared/types/SkipSize.type';
import { calculatePriceWithVat } from '../../shared/utils/skip.util';
import { useQuery } from '@tanstack/react-query';
import { SkipFooter, SkipSizeCard, StepHeader } from '../../components';
import './select-skip-page.css';

const fetchSkips = async (): Promise<SkipSize[]> => {
  const res = await fetch(
    'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
  );
  if (!res.ok) throw new Error('Failed to fetch skip sizes');
  return res.json();
};

const SelectSkipPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: skipSizes = [],
    isLoading,
    isError,
    error,
  } = useQuery<SkipSize[], Error>({
    queryKey: ['skipSizes'],
    queryFn: fetchSkips,
  });

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleContinue = () => {
    if (selectedId !== null) {
      console.log('Selected Skip ID:', selectedId);
    }
  };

  const groupedSkips = skipSizes.reduce((acc, skip) => {
    const totalPrice = calculatePriceWithVat(skip.price_before_vat, skip.vat);
    const firstDigit = Math.floor(totalPrice / 100) * 100;
    const key = `£${firstDigit}s`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(skip);

    return acc;
  }, {} as Record<string, SkipSize[]>);

  return (
    <>
      <div className="skip-page">
        <StepHeader />

        {isError && (
          <p className="error-message">
            Error loading skip sizes: {error.message}
          </p>
        )}

        {isLoading ? (
          <p>Loading skip sizes...</p>
        ) : (
          <>
            <h1>Choose Your Skip Size</h1>
            <p className="subhead">
              Select the skip size that best suits your needs
            </p>

            {Object.entries(groupedSkips).map(([range, skips]) => (
              <div key={range} className="skip-section">
                <h2 className="skip-range-header">Price Range - {range}</h2>
                <div className="skip-grid">
                  {skips.map((skip) => (
                    <SkipSizeCard
                      key={skip.id}
                      skip={skip}
                      isSelected={selectedId === skip.id}
                      onSelect={() => handleSelect(skip.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <SkipFooter
        skipSizes={skipSizes}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        handleContinue={handleContinue}
      />
    </>
  );
};

export default SelectSkipPage;
