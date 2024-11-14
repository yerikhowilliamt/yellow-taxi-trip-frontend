'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface FiltersProps {
  onFilter: (filters: {
    start_date_time: string | null;
    end_date_time: string | null;
    min_fare: number;
    max_fare: number;
    min_distance: number;
    max_distance: number;
    payment_type: string | null;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [startDateTime, setStartDateTime] = useState<string | ''>('');
  const [endtDateTime, setEndDateTime] = useState<string | ''>('');
  const [minFare, setMinFare] = useState<number>(0);
  const [maxFare, setMaxFare] = useState<number>(100);
  const [minDistance, setMinDistance] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [paymentType, setPaymentType] = useState<string | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onFilter({
        start_date_time: startDateTime,
        end_date_time: endtDateTime,
        min_fare: minFare,
        max_fare: maxFare,
        min_distance: minDistance,
        max_distance: maxDistance,
        payment_type: paymentType,
      });
      toast.success('Success applying filters.')
    } catch (error) {
      console.error('Error applying filters:', error);
      toast.error('Error applying filters.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-full lg:max-w-[40rem] border rounded-md p-4 backdrop-blur-sm bg-black bg-transparent/30'>
      <h3 className='text-4xl font-semibold mb-4 text-center text-white'>
        FILTERS
      </h3>
      <form onSubmit={handleSubmit} className='mb-4 w-full text-black'>
        <div className='mb-4 space-y-2'>
          <Label htmlFor='startDateTime' className='block text-white'>
            Start date time
          </Label>
          <Input
            type='string'
            id='startDateTime'
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className='p-2 border rounded w-full'
            placeholder='2014-01-10T00:00:00'
            disabled={loading}
          />
        </div>
        <div className='mb-4 space-y-2'>
          <Label htmlFor='endDateTime' className='block text-white'>
            End date time
          </Label>
          <Input
            type='string'
            id='endDateTime'
            value={endtDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            className='p-2 border rounded w-full'
            placeholder='2014-03-10T23:59:59'
            disabled={loading}
          />
        </div>
        <div className='flex gap-6 justify-between w-full'>
          <div className='mb-4 space-y-2 w-full'>
            <Label htmlFor='minFare' className='block text-white'>
              Min Fare
            </Label>
            <Input
              type='number'
              id='minFare'
              value={minFare}
              onChange={(e) => setMinFare(Number(e.target.value))}
              className='p-2 border rounded w-full'
              placeholder='Min Fare'
              disabled={loading}
            />
          </div>
          <div className='mb-4 space-y-2 w-full'>
            <Label htmlFor='maxFare' className='block text-white'>
              Max Fare
            </Label>
            <Input
              type='number'
              id='maxFare'
              value={maxFare}
              onChange={(e) => setMaxFare(Number(e.target.value))}
              className='p-2 border rounded w-full'
              placeholder='Max Fare'
              disabled={loading}
            />
          </div>
        </div>
        <div className='flex gap-6 justify-between w-full'>
          <div className='mb-4 space-y-2 w-full'>
            <Label htmlFor='minDistance' className='block text-white'>
              Min Distance
            </Label>
            <Input
              type='number'
              id='minDistance'
              value={minDistance}
              onChange={(e) => setMinDistance(Number(e.target.value))}
              className='p-2 border rounded w-full'
              placeholder='Min Distance'
              disabled={loading}
            />
          </div>
          <div className='mb-4 space-y-2 w-full'>
            <Label htmlFor='maxDistance' className='block text-white'>
              Max Distance
            </Label>
            <Input
              type='number'
              id='maxDistance'
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className='p-2 border rounded w-full'
              placeholder='Max Distance'
              disabled={loading}
            />
          </div>
        </div>
        <div className='mb-4 space-y-2'>
          <Label htmlFor='paymentType' className='block text-white'>
            Payment Type
          </Label>
          <Input
            type='string'
            id='paymentType'
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className='p-2 border rounded w-full'
            placeholder='Payment Type'
            disabled={loading}
          />
        </div>
        <Button
          type='submit'
          className='p-2 bg-blue-700 text-white rounded w-full mt-6 hover:bg-[#038a18]'
          disabled={loading}
        >
          {loading === false ? 'Apply Filters' : 'Loading...'}
        </Button>
      </form>
    </div>
  );
};

export default Filters;
