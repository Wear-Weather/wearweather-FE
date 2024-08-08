import { SEASON_TAGS, TEMPERATURE_TAGS, WEATHER_TAGS } from '@/config/constants';

// 모의 데이터 생성 함수
export const generateMockPosts = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    postId: index + 1,
    thumbnail:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202210/12/kncom/20221012135123984gqor.png',
    location: { city: '서울시', district: '강남구' },
    SeasonTag: SEASON_TAGS.map((tag) => tag.name)[Math.floor(Math.random() * 4)],
    WeatherTags: WEATHER_TAGS.map((tag) => tag.name).slice(0, Math.floor(Math.random() * 3) + 1),
    TemperatureTags: TEMPERATURE_TAGS.map((tag) => tag.name).slice(0, Math.floor(Math.random() * 3) + 1),
    likeByUser: Math.random() > 0.5,
  }));
};
