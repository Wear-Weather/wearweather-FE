import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import Location from '@components/common/molecules/Location';
import Spinner from '@components/icons/Spinner';
import CurrentTemp from '@components/weather/CurrentTemp';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import WeatherMessage from '@components/weather/WeatherMessage';

export default function HomeWeatherInfo() {
  const { geoPoint, location, isLocationLoading } = useLocationData();
  const { weatherData, isWeatherLoading, isSuccess, isError, handleRefetch } = useWeatherData(geoPoint);
  const { currentTemp, weatherMessage, weatherType, minTemp, maxTemp } = weatherData;
  const isLoading = isLocationLoading || isWeatherLoading;

  const backgroundType: 'light' | 'normal' | 'dark' = (() => {
    if (currentTemp >= 33 && weatherType === 'clear') {
      return 'light';
    } else if (weatherType === 'clear' || weatherType === 'partly_cloudy') {
      return 'normal';
    } else {
      return 'dark';
    }
  })();

  const backgroundStyle = {
    light: 'bg-weather-light-gradient',
    normal: 'bg-weather-normal-gradient',
    dark: 'bg-weather-dark-gradient',
    error: 'bg-weather-error-gradient',
  };

  return (
    <div
      className={`w-full h-[292px] relative ${
        backgroundStyle[isLoading ? 'normal' : isSuccess ? backgroundType : 'error']
      }`}
    >
      <div className={`w-full h-full px-5 text-white flex justify-between items-center`}>
        {!isLoading && (
          <>
            <div>
              <Location location={location} size="l" color="white" />
              {isSuccess && (
                <>
                  <CurrentTemp>{currentTemp}</CurrentTemp>
                  <WeatherMessage size="l" color="white">
                    {weatherMessage}
                  </WeatherMessage>
                  <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="white" />
                </>
              )}
              {isError && (
                <>
                  <p className="text-6xl font-bold mt-5 mb-3">Error</p>
                  <button onClick={handleRefetch} className="underline text-s ml-1">
                    재시도
                  </button>
                </>
              )}
            </div>
            <WeatherImg weatherType={isSuccess ? (weatherType as string) : 'error'} width={206} height={169} />
          </>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-black opacity-20 flex justify-center items-center">
            <Spinner width={40} />
          </div>
        )}
      </div>
    </div>
  );
}
