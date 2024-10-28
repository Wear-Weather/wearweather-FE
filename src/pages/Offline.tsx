import FooterNavi from '@components/common/FooterNavi';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import OfflineImg from '@components/icons/placeholders/OfflineImg';

export default function Offline() {
  return (
    <div className="w-full min-h-screen flex">
      <StatusPlaceholder
        ImgComp={OfflineImg}
        boldMessage="잠시 연결이 불안정해요"
        lightMessage="네트워크 상태 확인 후 다시 시도해 주세요."
      />
      <FooterNavi />
    </div>
  );
}
