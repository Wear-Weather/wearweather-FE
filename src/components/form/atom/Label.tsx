import { TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  size?: TextSize;
  required?: boolean;
}

export default function Label({ children, size = 'm', required }: LabelProps) {
  return (
    <Text size={size} weight="bold">
      {children}
      {required && <span className="text-status-error"> *</span>}
    </Text>
  );
}
