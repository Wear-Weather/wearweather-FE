import { ReactNode, useEffect, useState } from 'react';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import Menu from '@components/icons/post-menu/Menu';
import PostManageModal from '@components/common/organism/PostManageModal';
import { getPostDetail } from '@/api/apis';
import Heart from '@components/common/atom/Heart';
import { PostMeta } from '@/config/types';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import PostImgBlind from '@components/post/PostImgBlind';
import ImageSlider from '@components/post/ImageSlider';
import { showToast } from '@components/common/molecules/ToastProvider';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';

export interface PostDetail extends PostMeta {
  nickname: string;
  date: string;
  title: string;
  content: string;
  images: {
    image: {
      imageId: number;
      url: string;
    }[];
  };
  likedCount: number;
}

export default function PostDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || typeof location.state.id !== 'number') {
    return <Navigate to="/not-found" />;
  }

  const { id: postId } = location.state;
  const isLogin = useAuthStore((state) => state.isLogin);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: postDetailData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail(postId),
    retry: 1,
  });

  const {
    nickname,
    location: postLocation,
    images,
    title,
    content,
    date,
    weatherTags = [],
    temperatureTags = [],
    seasonTag,
    likeByUser,
    likedCount,
    reportPost,
  }: PostDetail = postDetailData || {};

  const imgUrlList = images?.image.map((img) => img.url);

  const myNickName = useAuthStore((state) => state.nickName);
  const isMyPost = nickname === myNickName;

  const modalHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        showToast(`${error.response?.data.errorMessage}`);
      }
      navigate(-1);
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isLoading && (
        <div className="flex-grow flex justify-center items-center">
          <Spinner width={20} />
        </div>
      )}
      {isSuccess && (
        <>
          <div className="px-5 py-2.5 flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <Text weight="bold">{nickname}</Text>
              <Text color="gray">{`${postLocation.city} ${postLocation.district}`}</Text>
            </div>
            {isLogin && <Menu className="cursor-pointer" onClick={modalHandler} />}
          </div>
          <div className="w-full relative">
            {reportPost && <PostImgBlind textSize="l" textWeight="bold" />}
            <ImageSlider images={imgUrlList} />
          </div>
          <div className="p-5 pb-10 flex flex-col gap-4">
            <Heart
              fill="rgb(var(--color-label-600))"
              liked={likeByUser}
              postId={postId}
              hasUserNumber
              likedCount={likedCount}
            />
            <div className="flex flex-col gap-4">
              <Text size="l" weight="bold">
                {title}
              </Text>
              <div className="flex flex-col gap-2.5">
                <Text color="lightBlack">{content}</Text>
                <Text color="gray">{date}</Text>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-3 py-3.5 bg-background-light rounded-[10px]">
              <div className="flex gap-5">
                <TagsWithLabel label="날씨">{...weatherTags}</TagsWithLabel>
                <TagsWithLabel label="계절">{seasonTag}</TagsWithLabel>
              </div>
              <div>
                <TagsWithLabel label="온도">{...temperatureTags}</TagsWithLabel>
              </div>
            </div>
          </div>
        </>
      )}
      {modalOpen ? (
        <PostManageModal
          modalController={setModalOpen}
          isMyPost={isMyPost}
          postId={postId}
          postData={postDetailData}
          isReported={reportPost}
        />
      ) : null}
    </div>
  );
}

function TagsWithLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <Text>{label}</Text>
      <div className="flex gap-1.5">
        {Array.isArray(children) ? (
          children.map((child) => (
            <Text key={child} color="gray">
              {child}
            </Text>
          ))
        ) : (
          <Text color="gray">{children}</Text>
        )}
      </div>
    </div>
  );
}
