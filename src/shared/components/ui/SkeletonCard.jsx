export function MachineCardSkeleton() {
  return (
    <div className="card-outer">
      <div className="card-inner p-6">
        <div className="skeleton rounded-2xl w-full aspect-[4/3] mb-5" />
        <div className="skeleton h-5 w-20 rounded-full mb-3" />
        <div className="skeleton h-7 w-3/4 rounded-lg mb-2" />
        <div className="skeleton h-5 w-full rounded-lg mb-1" />
        <div className="skeleton h-5 w-2/3 rounded-lg mb-6" />
        <div className="skeleton h-8 w-28 rounded-lg mb-4" />
        <div className="skeleton h-11 w-full rounded-full" />
      </div>
    </div>
  )
}

export function PodCardSkeleton() {
  return (
    <div className="card-outer">
      <div className="card-inner p-4">
        <div className="skeleton rounded-xl w-full aspect-square mb-4" />
        <div className="skeleton h-4 w-16 rounded-full mb-2" />
        <div className="skeleton h-6 w-3/4 rounded-lg mb-2" />
        <div className="skeleton h-4 w-full rounded-lg mb-1" />
        <div className="skeleton h-4 w-2/3 rounded-lg mb-4" />
        <div className="flex items-center justify-between gap-2">
          <div className="skeleton h-7 w-20 rounded-lg" />
          <div className="skeleton h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ type = 'machine', count = 3 }) {
  const Skeleton = type === 'machine' ? MachineCardSkeleton : PodCardSkeleton
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  )
}
