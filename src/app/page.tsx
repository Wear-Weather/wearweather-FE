import FooterNavi from '@/components/common/organism/FooterNavi';
import Header from '@/components/common/organism/Header';
import logo from '@/assets/logo.png';
import HomeWeatherWidget from '@/components/weather/HomeWeatherWidget';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import GuidePanel from '@components/common/organism/GuidePanel';
import OutfitListByTemperature from '@/components/post/OutfitListByTemperature';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header>
        <Image src={logo} width={40} height={18} alt="룩엣더웨더" priority />
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
