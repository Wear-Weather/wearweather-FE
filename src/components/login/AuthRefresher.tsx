'use client';

import { reissue } from '@/api/apis';
import { getAccessToken, setAccessToken } from '@/api/instance';
import { useAuthStore } from '@/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function AuthRefresher() {
  const { setIsLogin } = useAuthStore.getState();
  const queryClient = useQueryClient();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await reissue();
        if (response.accessToken) {
          setAccessToken(response.accessToken);
        }
      } catch (error) {
        console.log('리프레시 토큰 만료 또는 인증 에러 발생:', error);
        setIsLogin(false);
        queryClient.removeQueries({ queryKey: ['post'] });
      }
    };

    if (!getAccessToken()) {
      refreshAccessToken();
    }
  }, []);

  return null;
}
