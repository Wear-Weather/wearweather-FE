import CheckBoxBtn from '@components/common/atom/CheckBoxBtn';
import { useEffect, useState } from 'react';
import Text from '../atom/Text';
import ToggleBtn from '@components/icons/ToggleBtn';
import MarkdownRenderer from './MarkdownRenderer';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupForm } from '@/config/types';
import AlertModal from './AlertModal';
import Button from '../molecules/Button';

interface LocationTermsCheckBoxProps {
  register: UseFormRegister<SignupForm>;
  errors: FieldErrors<SignupForm>;
  isChecked: boolean;
}

export default function LocationTermsCheckBox({ register, errors, isChecked }: LocationTermsCheckBoxProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleTerms = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTerms(!showTerms);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 1 && errors.terms) setShowModal(true);
  }, [errors.terms]);

  return (
    <div>
      <div className="h-12 flex justify-between items-center cursor-pointer">
        <label htmlFor="terms" className="cursor-pointer flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="hidden"
            {...register('terms', {
              required: true,
            })}
          />
          <CheckBoxBtn isChecked={!!isChecked} />
          <Text>위치 정보 이용약관(필수)</Text>
        </label>
        <div className={`transition-transform duration-400 ${showTerms ? 'transform rotate-180' : ''}`}>
          <ToggleBtn onClick={toggleTerms} />
        </div>
      </div>
      {showTerms && <LocationTerms />}
      {showModal && (
        <AlertModal
          boldMessage="이용약관 동의"
          regularMessage="위치 정보 이용약관에 동의해 주세요."
          buttons={
            <Button size="m" onClick={() => setShowModal(false)}>
              확인
            </Button>
          }
        />
      )}
    </div>
  );
}

function LocationTerms() {
  return (
    <div className="px-3 pt-[14px] pb-10 mb-10 bg-background-light rounded-[10px]">
      <MarkdownRenderer markdownTitle="location-terms" />
    </div>
  );
}
