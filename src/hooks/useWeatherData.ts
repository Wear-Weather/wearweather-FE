'use client';

import { useQuery } from '@tanstack/react-query';
import { GeoPoint } from '@/config/types';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '@/api/apis';
import { useGeoPointQuery } from './useLocationData';
import useQueryStatus from './useQueryStatus';
import { calDailyWeatherStaleTime, calHourlyWeatherStaleTime } from '@/lib/utils';

const useHourlyWeatherQuery = (geoPoint: GeoPoint | undefined) =>
  useQuery({
    queryKey: ['hourlyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getHourlyWeatherInfo(geoPoint as GeoPoint),
    staleTime: calHourlyWeatherStaleTime(), // 매 정각에 리패칭
    gcTime: 1000 * 60 * 60,
    enabled: !!geoPoint,
  });

const useDailyWeatherQuery = (geoPoint: GeoPoint | undefined) =>
  useQuery({
    queryKey: ['dailyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getDailyWeatherInfo(geoPoint as GeoPoint),
    staleTime: calDailyWeatherStaleTime(), // 매일 2시 11분이 지나면 리패칭
    gcTime: 1000 * 60 * 60,
    enabled: !!geoPoint,
  });

export default function useWeatherData() {
  const geoPointQuery = useGeoPointQuery();
  const geoPoint = geoPointQuery.data;

  const hourlyWeatherQuery = useHourlyWeatherQuery(geoPoint);
  const dailyWeatherQuery = useDailyWeatherQuery(geoPoint);

  const queries = [geoPointQuery, hourlyWeatherQuery, dailyWeatherQuery];
  const queryStatus = useQueryStatus(queries);

  return {
    weatherData: { ...hourlyWeatherQuery.data, ...dailyWeatherQuery.data },
    ...queryStatus,
  };
}
