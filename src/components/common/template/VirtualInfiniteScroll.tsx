import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { showToast } from '../molecules/ToastProvider';
import VirtualPostGrid from '@components/post/VirtualPostGrid';

interface VirtualInfiniteScrollProps {
  queryKey: string;
  queryFn: ({ page, size }: { page: number; size: number }) => Promise<any>;
  size?: number;
  headerText: string;
  placeholderComp: React.ComponentType;
}

export default function VirtualInfiniteScroll({
  queryKey,
  queryFn,
  size = 10,
  headerText,
  placeholderComp: PlaceholderComp,
}: VirtualInfiniteScrollProps) {
  const { isError, error, isSuccess, pageEndRef, postList } = useInfiniteScroll([`${queryKey}`], queryFn, size);

  if (isError) {
    console.error(error.message);
    showToast(`${headerText}을 불러오는 데 실패했습니다.`);
  }

  return (
    <div className="flex-grow flex flex-col items-center">
      {isSuccess && (postList.length ? <VirtualPostGrid postList={postList} /> : <PlaceholderComp />)}
      <div ref={pageEndRef}></div>
    </div>
  );
}
