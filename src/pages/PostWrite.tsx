import { uploadPost } from '@/api/apis';
import { PostFormData } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostForm from '@components/form/PostForm';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function PostWrite() {
  const { location: currentLocation, geoPoint } = useLocationData();
  const {
    weatherData: { currentTemp },
  } = useWeatherData(geoPoint);

  const navigate = useNavigate();

  const defaultValues = {
    title: '',
    content: '',
    city: currentLocation?.city || '',
    district: currentLocation?.district || '',
    gender: null,
    temperature: +currentTemp,
    weatherTagIds: [],
    temperatureTagIds: [],
    seasonTagId: null,
    imageIds: [],
    images: [],
  };

  const uploadMutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: ({ postId }) => {
      navigate(`/post/${postId}`, { state: { id: postId }, replace: true });
      showToast('게시물이 등록되었습니다');
    },
    onError: (error) => {
      console.error(error);
      showToast('게시물을 등록하는 데 실패했습니다.');
    },
  });

  const onSubmit = (data: PostFormData) => {
    uploadMutation.mutate(data);
  };

  return <PostForm type="작성" defaultValues={defaultValues} onSubmit={onSubmit} />;
}
