import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Text from './Text';
import { deleteLike, postLike } from '@/api/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '../../provider/ToastProvider';
import { ErrorResponse } from '@/config/types';
import RedHeartIcon from '@components/icons/hearts/RedHeartIcon';
import EmptyHeartIcon from '@components/icons/hearts/EmptyHeartIcon';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import LoginPromptModal from '@/components/modal/LoginPromptModal';

interface HeartProps {
  fill?: string;
  liked?: boolean;
  postId: number;
  hasUserNumber?: boolean;
  likedCount?: number;
}

export default function Heart({
  fill = 'white',
  liked = false,
  postId,
  hasUserNumber,
  likedCount: initialLikedCount,
}: HeartProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likedCount, setLikedCount] = useState(initialLikedCount);
  const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    setIsLiked(liked);
    setLikedCount(initialLikedCount);
  }, [liked, initialLikedCount]);

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      return isLiked ? await deleteLike(postId) : await postLike(postId);
    },
    onSuccess: ({ likedCount: newLikedCount }) => {
      setIsLiked((prev) => !prev);
      setLikedCount(newLikedCount);

      // 좋아요 여부 동기화를 위해 post 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['post', 'list'], refetchType: 'none' });
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId], refetchType: 'none' });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          showToast(`${data.errorMessage}`);
        } else if (status !== 401) {
          showToast('에러가 발생했습니다. 다시 시도해주세요.');
          console.error(`${status} 에러: ${error}`);
        }
      } else {
        console.error('예상치 못한 에러가 발생했습니다.', error);
      }
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (isLogin) toggleLikeMutation.mutate();
    else setShowLoginPromptModal(true);
  };

  return (
    <>
      <div onClick={handleClick} className="flex items-center gap-x-2">
        {isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}
        {hasUserNumber && <Text>{likedCount || 0}</Text>}
      </div>
      {showLoginPromptModal && (
        <LoginPromptModal
          onCancel={(e) => {
            e.stopPropagation();
            setShowLoginPromptModal(false);
          }}
          onContinue={(e) => {
            e.stopPropagation();
            router.push('/login');
          }}
        />
      )}
    </>
  );
}
