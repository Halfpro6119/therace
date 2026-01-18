interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200';

  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
      <Skeleton variant="rectangular" className="h-32 w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" className="h-8 w-20" />
        <Skeleton variant="rectangular" className="h-8 w-20" />
      </div>
    </div>
  );
}

export function SkeletonQuizTile() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-start gap-3">
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-2/3" />
          <Skeleton variant="text" className="w-full" />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" className="h-6 w-16" />
            <Skeleton variant="rectangular" className="h-6 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonSubjectCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <Skeleton variant="rectangular" className="h-40 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton variant="text" className="w-3/4 h-6" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton variant="rectangular" className="h-10 flex-1" />
          <Skeleton variant="rectangular" className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}
