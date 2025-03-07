import useSignupStore from '@/store/signupStore';
import Button from '@/components/common/atom/Button';
import { useVerifyCodeMutation } from '@/lib/signupMutations';
import { FieldValues, Path, UseFormReturn, useWatch } from 'react-hook-form';
import InputWithLabel from '../InputWithLabel';

export default function CodeInput<T extends FieldValues>({ ...formMethods }: UseFormReturn<T>) {
  const { setError, clearErrors, getValues, control } = formMethods;
  const isEmailVerified = useSignupStore((state) => state.isEmailVerified);
  const isCodeSended = useSignupStore((state) => state.isCodeSended);
  const { mutate: verifyCodeMutation, isPending: isVerifyingCode } = useVerifyCodeMutation<T>(setError, clearErrors);

  // useWatch를 사용하여 특정 필드만 관찰
  const codeValue = useWatch({
    control,
    name: 'code' as Path<T>,
  });

  const handleVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = getValues('email' as Path<T>);
    const code = getValues('code' as Path<T>);
    verifyCodeMutation({ email, code });
  };

  return (
    <InputWithLabel<T>
      name={'code' as Path<T>}
      label="이메일 인증번호 확인"
      disabled={isEmailVerified}
      placeholder="인증번호를 입력해 주세요."
      hideDeleteBtn
      rules={{
        required: '인증번호를 입력해 주세요.',
        validate: () => isEmailVerified || '이메일 인증을 완료해 주세요.',
      }}
      {...formMethods}
      button={
        <Button
          size="m"
          width={123}
          disabled={!isCodeSended || !codeValue || isEmailVerified}
          isSubmitting={isVerifyingCode}
          onClick={handleVerifyCode}
        >
          {isEmailVerified ? '확인 완료' : '인증번호 확인'}
        </Button>
      }
    />
  );
}
