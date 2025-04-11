import SkeletonCard from '@/components/skeletonCard';

const Loading = () => {
  return (
    <main className='flex justify-between items-center min-h-screen mx-12'>
      <div className='w-full h-[750px] border rounded-lg p-4 backdrop-blur-sm bg-black bg-transparent/30 flex flex-col justify-center items-center'>
        <div className='w-20'></div>
        <div className='mb-4 max-w-[15rem] h-10 border rounded-lg' />
        <div className='w-full flex justify-between items-center'>
        {'12345'.split('').map((i) => (
          <SkeletonCard key={i} />
        ))}
        </div>
        <div>
          <div className='w-full h-8'></div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
