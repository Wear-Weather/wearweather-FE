'use client';

import { useForm } from 'react-hook-form';
import Header from '@/components/common/Header';
import Button from '@components/common/molecules/Button';
import LocationTermsCheckBox from '@components/common/organism/LocationTermsCheckBox';
import { useRegisterMutation } from '@/lib/signupMutations';
import { SignupForm } from '@/config/types';
import EmailInput from '@components/form/inputs/EmailInput';
import CodeInput from '@components/form/inputs/CodeInput';
import PasswordInput from '@components/form/inputs/PasswordInput';
import PasswordCheckInput from '@components/form/inputs/PasswordCheckInput';
import NameInput from '@components/form/inputs/NameInput';
import NicknameInput from '@components/form/inputs/NicknameInput';
import { useState } from 'react';
import AlertModal from '@components/common/organism/AlertModal';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const formMethods = useForm<SignupForm>({
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      name: '',
      nickname: '',
      terms: false,
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = formMethods;

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { mutate: registerMutation } = useRegisterMutation();

  const handleFormCloseBtn = () => {
    if (isDirty) setShowModal(true);
    else router.back();
  };

  const onSubmit = async (data: SignupForm) => {
    const { email, password, name, nickname } = data;
    registerMutation({ email, password, name, nickname, isSocial: false });
  };

  return (
    <div className="h-screen flex flex-col">
      <Header hideBackBtn onClose={handleFormCloseBtn}>
        회원가입
      </Header>
      <form className="flex flex-col flex-grow gap-4 pt-5 px-5 overflow-auto scrollbar-hide">
        <EmailInput<SignupForm> shouldValidate {...formMethods} />
        <CodeInput<SignupForm> {...formMethods} />
        <PasswordInput<SignupForm> shouldValidate {...formMethods} />
        <PasswordCheckInput<SignupForm> {...formMethods} />
        <NameInput<SignupForm> shouldValidate {...formMethods} />
        <NicknameInput<SignupForm> shouldValidate {...formMethods} />
        <LocationTermsCheckBox register={register} errors={errors} isChecked={watch('terms')} />
      </form>
      <div className="px-5 pb-10">
        <Button type="main" isSubmitting={isSubmitting} onClick={handleSubmit(onSubmit)}>
          가입하기
        </Button>
      </div>
      {showModal && (
        <AlertModal
          boldMessage="회원가입 취소"
          regularMessage={
            <>
              회원가입을 취소하시겠어요?
              <br />
              다시 가입할 경우 처음부터
              <br />
              정보를 입력해야 합니다.
            </>
          }
          buttons={
            <>
              <Button size="m" type="sub" onClick={() => setShowModal(false)}>
                가입 계속하기
              </Button>
              <Button size="m" onClick={() => router.back()}>
                취소하기
              </Button>
            </>
          }
        />
      )}
    </div>
  );
}