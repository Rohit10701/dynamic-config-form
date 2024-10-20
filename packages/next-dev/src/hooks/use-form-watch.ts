import { useWatch } from 'react-hook-form';
import {useFormContext } from '@/context/form-context';

const useFormWatch = <T extends Record<string, unknown>>(id: string, fields?: string[] | string ) => {
  const { forms } = useFormContext<T>()
  const form = forms?.[id];
  if (!form) return;

  return useWatch({
    control: form.control,
    name: fields,
  });
};
export default useFormWatch
