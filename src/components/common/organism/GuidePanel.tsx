'use client';

import GuideBtn from '../molecule/GuideBtn';
import LookGuideIcon from '@components/icons/guide/LookGuideIcon';
import GuideManualIcon from '@components/icons/guide/GuideManualIcon';
import { useGuideManageStore } from '@/store/guideManageStore';
import PreloadImage from '../atom/PreloadImage';
import { guideContent } from '@/config/guideContent';
import TempGuideModal from '../../modal/TempGuideModal';
import ManualGuideModal from '../../modal/ManualGuideModal';

export default function GuidePanel() {
  const { isLookGuideModalOpen, isManualGuideModalOpen, setIsLookGuideModal, setIsManualGuideModal } =
    useGuideManageStore();

  return (
    <div className="flex gap-1 my-3 w-full px-5">
      <div
        onClick={() => {
          setIsLookGuideModal(!isLookGuideModalOpen);
        }}
        className="flex-[5] w-full cursor-pointer"
      >
        <GuideBtn
          Icon={LookGuideIcon}
          title="기온별 룩 가이드"
          upperDesc="오늘 기온에 맞는"
          lowerDesc="룩을 추천해 드립니다!"
        />
      </div>
      <div
        onClick={() => {
          setIsManualGuideModal(!isManualGuideModalOpen);
        }}
        className="flex-[3] w-full cursor-pointer"
      >
        <GuideBtn Icon={GuideManualIcon} title={'사용설명서'} upperDesc="룩엣더웨더가" lowerDesc="처음이신가요?" />
        {guideContent.map((content) => (
          <PreloadImage key={content.page} url={content.src} />
        ))}
      </div>
      {isLookGuideModalOpen && <TempGuideModal />}
      {isManualGuideModalOpen && <ManualGuideModal />}
    </div>
  );
}
