import Header from '@/components/common/Header';
import { useForm } from 'react-hook-form';
import Text from '@components/common/atom/Text';
import PasswordInput from '@components/form/inputs/PasswordInput';
import PasswordCheckInput from '@components/form/inputs/PasswordCheckInput';
import { useEffect } from 'react';
import { getUserInfos, patchEditProfile } from '@/api/apis';
import NicknameInput from '@components/form/inputs/NicknameInput';
import Button from '@components/common/molecules/Button';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@components/common/molecules/ToastProvider';
import { useNavigate } from 'react-router-dom';
import EmailInput from '@components/form/inputs/EmailInput';
import NameInput from '@components/form/inputs/NameInput';

interface ProfileEditType {
  nickname: string;
  password: string;
}

export default function ProfileEdit() {
  const formMethods = useForm<ProfileEditType>({
    defaultValues: {
      nickname: '',
    },
  });

  const { handleSubmit } = formMethods;
  const setNickName = useAuthStore((state) => state.setNickName);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    isError,
    error,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfos,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast('사용자 정보를 가져오는 데 실패했습니다.');
      console.error(error);
    }
  }, [isError, error]);

  const editProfileMutation = useMutation({
    mutationFn: patchEditProfile,
    onSuccess: (_, variables) => {
      showToast('개인 정보가 수정되었습니다.');
      setNickName(variables.nickname);
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigate(-1);
    },
    onError: () => {
      showToast('개인 정보 수정 실패. 다시 시도해주세요.');
    },
  });

  const onSubmit = async (data: ProfileEditType) => {
    const { password, nickname } = data;
    editProfileMutation.mutate({ password, nickname });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>개인정보 수정</Header>
      <form className="flex flex-col flex-grow gap-4 overflow-y-auto scrollbar-hide p-5">
        <EmailInput<ProfileEditType> {...formMethods} disabled defaultValue={userInfo?.email} />
        <PasswordInput<ProfileEditType> {...formMethods} shouldValidate disabled={userInfo?.social} />
        <PasswordCheckInput<ProfileEditType> {...formMethods} disabled={userInfo?.social} />
        <NameInput<ProfileEditType> {...formMethods} disabled defaultValue={userInfo?.name} />
        <NicknameInput<ProfileEditType> {...formMethods} shouldValidate defaultValue={userInfo?.nickname} />
        <Text href="/delete-account" color="gray" size="s" weight="bold" className="mt-3 underline">
          회원탈퇴
        </Text>
      </form>
      <div className="px-5 pb-10">
        <Button onClick={handleSubmit(onSubmit)} isSubmitting={editProfileMutation.isPending}>
          수정하기
        </Button>
      </div>
    </div>
  );
}
