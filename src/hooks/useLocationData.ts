import { fetchGeoPoint, fetchLocation } from '@/lib/geo';
import { useQuery } from '@tanstack/react-query';

export default function useLocationData() {
  const geoPointQuery = useQuery({
    queryKey: ['geoPoint'],
    queryFn: fetchGeoPoint,
    staleTime: 0, // 컴포넌트가 마운트될 때마다 패칭
    gcTime: 0,
  });

  const geoPoint = geoPointQuery.data ?? { latitude: null, longitude: null };
  console.log(geoPoint);

  // 위치 정보('OO시 OO구')를 패칭
  const locationQuery = useQuery({
    queryKey: ['location', geoPoint?.latitude, geoPoint?.longitude], // 의존성에 위도와 경도 추가 -> 위도와 경도 값이 바뀌면 리패칭
    queryFn: () => fetchLocation(geoPoint),
    staleTime: 1000 * 60 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 60 * 2,
    enabled: !!geoPoint, // geoPoint가 null이 아닐 때만 패칭
  });

  return {
    geoPoint,
    location: locationQuery.data ?? { city: null, district: null },
    isLocationLoading: locationQuery.isLoading,
  };
}
