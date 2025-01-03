import { GeoPoint } from '@/config/types';
import { DEFAULT_GEO_POINT } from '@/config/constants';
import { getLocationFromGeoPoint } from '@/api/apis';

// 소수점 넷째 자리까지 내림 처리하는 함수
function floorToFixed(num: number) {
  const factor = Math.pow(10, 4);
  return Math.floor(num * factor) / factor;
}

// geolocation api로 현재 위치의 위도와 경도를 구함
export async function fetchCurrentGeoPoint(): Promise<GeoPoint | undefined> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;

          latitude = floorToFixed(latitude);
          longitude = floorToFixed(longitude);

          resolve({ latitude, longitude });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            // 접근 거부 시 기본 좌표 반환
            resolve(DEFAULT_GEO_POINT);
          } else {
            // 다른 에러의 경우 undefined 반환
            reject(undefined);
            console.warn('위치 정보 패칭에 실패했습니다:', error.message);
          }
        },
      );
    } else {
      console.warn('Geolocation는 이 브라우저에서 지원되지 않습니다.');
      resolve(undefined);
    }
  });
}

export const fetchCurrentLocation = async () => {
  const currentGeoPoint = await fetchCurrentGeoPoint();

  if (!currentGeoPoint) return null;

  return getLocationFromGeoPoint(currentGeoPoint);
};

export function throttle(callback: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  return () => {
    if (timeoutId) return; // 이미 실행 중인 경우 무시
    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null; // 실행 후 초기화
    }, delay);
  };
}
