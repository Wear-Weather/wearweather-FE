import { BASEURL } from '@/config/constants';
import { EmptyHeartIcon, RedHeartIcon } from '@components/icons/heartIcons';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface HeartProps {
  fill?: string;
  liked?: boolean;
  postId: number;
}

interface ResponseCommonDTO {
  success: boolean;
  message: string;
}

interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

// 좋아요 처리하는 함수
const postLike = async (postId: number): Promise<ResponseCommonDTO> => {
  const response = await axios.post<ResponseCommonDTO>(
    `${BASEURL}/api/v1/posts/${postId}/like`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );

  return response.data;
};

// 좋아요 취소 처리하는 함수
const deleteLike = async (postId: number): Promise<ResponseCommonDTO> => {
  const response = await axios.delete<ResponseCommonDTO>(`${BASEURL}/api/v1/posts/${postId}/like`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return response.data;
};

// 하트 컴포넌트
export default function Heart({ fill = 'white', liked = false, postId }: HeartProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = isLiked ? await deleteLike(postId) : await postLike(postId);
      if (res.success) {
        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          const { errorCode, errorMessage } = axiosError.response.data;
          console.error(`Error: ${errorCode} - ${errorMessage}`);
        }
      } else {
        console.error('예상치 못한 에러가 발생했습니다:', error);
      }
    }
  };

  return <div onClick={handleClick}>{isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}</div>;
}
