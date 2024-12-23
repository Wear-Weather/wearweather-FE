import Header from '@components/common/Header';
import FooterNavi from '@components/common/FooterNavi';
import { getMyPosts } from '@/api/apis';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { showToast } from '@components/common/molecules/ToastProvider';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import { useNavigate } from 'react-router-dom';
import InfiniteScrollLoading from '@components/common/molecules/InfiniteScrollLoading';
import VirtualPostGrid from '@components/post/VirtualPostGrid';

export default function MyPost() {
  const { isFetchingNextPage, isLoading, isError, error, isSuccess, pageEndRef, postList } = useInfiniteScroll(
    ['myPosts'],
    getMyPosts,
    10,
  );

  if (isError) {
    console.error(error.message);
    showToast('내가 좋아요한 게시물을 불러오는 데 실패했습니다.');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header>내 게시물</Header>
      <div className="flex-grow flex flex-col items-center">
        {isSuccess && (postList.length ? <VirtualPostGrid postList={postList} /> : <MyPostEmpty />)}
        <div ref={pageEndRef}></div>
        {(isLoading || isFetchingNextPage) && <InfiniteScrollLoading />}
      </div>
      <FooterNavi />
    </div>
  );
}

function MyPostEmpty() {
  const navigate = useNavigate();

  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="아직 작성한 게시물이 없어요"
      lightMessage={
        <>
          첫 게시물을 작성하고
          <br />
          오늘의 룩을 공유해보세요!
        </>
      }
      btnText="게시물 작성하기"
      btnFunc={() => navigate('/post-write')}
    />
  );
}
