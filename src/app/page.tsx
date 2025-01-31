import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import HomeWeatherWidget from '@/components/weather/HomeWeatherWidget';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import GuidePanel from '@components/common/organism/GuidePanel';
import OutfitListByTemperature from '@/components/post/OutfitListByTemperature';

export default function Home() {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <div className="flex-grow mb-5">
        <HomeWeatherWidget />
        <GuidePanel />
        <div className="flex flex-col gap-5">
          <TodayBestWearList />
          <OutfitListByTemperature />
        </div>
      </div>
      <FooterNavi />
    </>
  );
}
