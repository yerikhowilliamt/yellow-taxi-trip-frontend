import { Skeleton } from './ui/skeleton';

const SkeletonCard = () => {
  return (
      <div className='border rounded-lg p-4 backdrop-blur-sm bg-black bg-transparent/30 w-[300px]'>
        <div className='border rounded-md shadow-sm w-full text-white p-4 relative pt-2 pb-6'>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
          <div className='flex flex-col py-2 items-center w-full'>
            <Skeleton className='w-full p-4' />
          </div>
        </div>
      </div>
  );
};

export default SkeletonCard;
