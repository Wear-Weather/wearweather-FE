import { useEffect } from 'react';
import InputWithLabel from '../InputWithLabel';
import { FormMethods } from '@/config/types';
import { FieldValues, Path } from 'react-hook-form';

interface PasswordInputProps<T extends FieldValues> extends FormMethods<T> {
  isPasswordReset?: boolean;
  shouldValidate?: boolean;
  disabled?: boolean;
}

export default function PasswordInput<T extends FieldValues>({
  shouldValidate,
  isPasswordReset,
  disabled,
  ...formMethods
}: PasswordInputProps<T>) {
  const { getValues, trigger, watch } = formMethods;

  useEffect(() => {
    if (getValues('password' as Path<T>)) trigger('password' as Path<T>);
  }, [watch('password' as Path<T>)]);

  return (
    <InputWithLabel
      name={'password' as Path<T>}
      type="password"
      label={isPasswordReset ? '새 비밀번호' : '비밀번호'}
      placeholder="영문/숫자/특수문자 2가지 이상 조합 (8-15자)"
      rules={{
        required: !disabled ? '비밀번호를 입력해 주세요.' : false,
        ...(shouldValidate && {
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,15}$/,
            message: '영문, 숫자, 특수문자 중 2가지 이상으로 조합해 주세요.(8-15자)',
          },
        }),
      }}
      maxLength={15}
      disabled={disabled}
      {...formMethods}
    />
  );
}
