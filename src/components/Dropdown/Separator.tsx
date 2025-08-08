import { cn } from '@/utils';

export function Separator({ className }: { className?: string }) {
  return (
    <div role="separator" className={cn('my-1 h-px w-full bg-gray dark:bg-white/20', className)} />
  );
}
