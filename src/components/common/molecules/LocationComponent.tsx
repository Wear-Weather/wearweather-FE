'use client';

import { TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import CloseBtn from '@components/icons/CloseBtn';
import LocationIcon from '@components/icons/LocationIcon';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Skeleton from '../../skeleton/Skeleton';

interface LocationComponentProps {
  city?: string;
  district?: string;
  size?: TextSize;
  color?: TextColor;
  isLoading?: boolean;
}

export default function LocationComponent({ city, district, size, color, isLoading }: LocationComponentProps) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const currentPage = pathname.replace('/', '');

  const [showTooltip, setShowTooltip] = useState(false);

  const handleLocationClick = () => {
    router.push(`/search-address?from=${currentPage}`);
  };

  useEffect(() => {
    const lastTooltipClosedDate = localStorage.getItem('lastTooltipClosedDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (!lastTooltipClosedDate || lastTooltipClosedDate !== currentDate) {
      setShowTooltip(true);
    }
  }, []);

  const handleTooltipClose = () => {
    setShowTooltip(false);
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastTooltipClosedDate', currentDate);
  };

  return (
    <div className="w-fit flex items-center gap-1 relative">
      <div className="w-fit flex items-center gap-1.5 cursor-pointer" onClick={handleLocationClick}>
        <LocationIcon fill={color} />
        {isLoading ? (
          <Skeleton className={`w-[80px] ${size === 'm' ? 'h-[21px]' : 'h-6'} `} />
        ) : (
          <Text size={size} color={color} className="whitespace-nowrap">
            {city || district ? `${city} ${district}` : '위치 정보 없음'}
          </Text>
        )}
      </div>
      {showTooltip && !isLoading && (
        <div className="absolute left-full ml-1">
          <LocationTooltip onClose={handleTooltipClose} />
        </div>
      )}
    </div>
  );
}

function LocationTooltip({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center">
      <div className="w-[8px] h-0 border-primary-main border-t-[3px] border-r-[5px] border-b-[3px] border-t-transparent border-l-transparent border-b-transparent"></div>
      <div className="flex items-center gap-1 px-3 py-[5px] bg-primary-main rounded-md z-10">
        <Text size="xs" color="white" className="whitespace-nowrap">
          클릭해서 위치를 변경할 수 있어요!
        </Text>
        <CloseBtn width={15} fill="white" onClick={onClose} />
      </div>
    </div>
  );
}
