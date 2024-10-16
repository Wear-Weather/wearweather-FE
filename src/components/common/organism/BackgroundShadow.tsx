import { ReactNode, useEffect } from 'react';

export default function BackgroundShadow({
  children,
  isBackdropVisible = true,
}: {
  children: ReactNode;
  isBackdropVisible?: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 
      ${isBackdropVisible ? 'transform bg-opacity-1' : 'transform bg-opacity-0'} transition-transform duration-300`}
    >
      {children}
    </div>
  );
}
