import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex gap-16 mt-16">
      <div className="flex flex-col gap-10">
      <Skeleton className="h-[130px] w-[390px] rounded-xl" />
      <Skeleton className="h-[130px] w-[390px] rounded-xl" />
      </div>
      <div className="flex flex-col gap-10">
      <Skeleton className="h-[130px] w-[390px] rounded-xl" />
      <Skeleton className="h-[130px] w-[390px] rounded-xl" />
      </div>
    </div>
  )
}
