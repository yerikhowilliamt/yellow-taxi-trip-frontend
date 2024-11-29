import { Button } from './button';

interface PaginationButtonProps {
  decrement: () => void;
  increment: () => void;
  page: number;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({decrement, increment, page}) => {
  return ( 
    <div className='w-full flex justify-center gap-2 mt-4'>
        <Button
          onClick={decrement}
          className='min-w-12 w-full max-w-24 bg-white text-black hover:text-white hover:bg-[#ffa702] transition-colors duration-700 ease-in-out'
        >
          Prev
        </Button>
        <span className='text-white font-semibold flex items-center justify-center px-3'>{page}</span>
        <Button
          onClick={increment}
          className='min-w-12 w-full max-w-24 bg-white text-black hover:text-white hover:bg-[#ffa702] transition-colors duration-700 ease-in-out'>
          Next
        </Button>
      </div>
   );
}
 
export default PaginationButton;