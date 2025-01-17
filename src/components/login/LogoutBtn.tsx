import { postLogout } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { showToast } from '../common/molecules/ToastProvider';
import Text from '../common/atom/Text';
import { useNavigate } from 'react-router-dom';
import AlertModal from '@components/common/organism/AlertModal';
import Button from '@components/common/molecules/Button';
import { usePostStore } from '@/store/postStore';

export default function LogoutBtn() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { setIsLogin, authStoreClear } = useAuthStore();
  const { postStoreClear } = usePostStore();
  const navigate = useNavigate();

  const LogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setAccessToken(null);
      setIsLogin(false);
      localStorage.removeItem('nickname');
      authStoreClear();
      postStoreClear();
      navigate('/');
      showToast('로그아웃되었습니다.');
    },
    onError: (error) => {
      showToast('로그아웃 실패. 다시 시도해주세요.');
      console.error(error);
    },
  });

  const handleLogoutClick = () => {
    LogoutMutation.mutate();
  };
  return (
    <>
      <div onClick={() => setShowLogoutModal(true)}>
        <Text color="darkGray" className="cursor-pointer underline">
          로그아웃
        </Text>
      </div>
      {showLogoutModal && (
        <AlertModal
          boldMessage="로그아웃 확인"
          regularMessage="정말 로그아웃 하시겠습니까?"
          buttons={
            <>
              <Button size="m" type="sub" onClick={() => setShowLogoutModal(false)}>
                닫기
              </Button>
              <Button size="m" onClick={handleLogoutClick}>
                확인
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
