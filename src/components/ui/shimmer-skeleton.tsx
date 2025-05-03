
import React from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ShimmerSkeletonProps {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const ShimmerSkeleton = ({
  className,
  children,
  isLoading = true
}: ShimmerSkeletonProps) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={cn(
      "animate-pulse relative overflow-hidden", 
      className
    )}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Skeleton className={cn("w-full h-full", className)} />
    </div>
  );
};

export const PropertyCardSkeleton = () => {
  return (
    <div className="border border-booking-gray-200 dark:border-booking-gray-500 rounded-lg overflow-hidden shadow-md h-full">
      <ShimmerSkeleton className="h-48 md:h-64" />
      <div className="p-4 space-y-3">
        <ShimmerSkeleton className="h-4 w-1/2" />
        <ShimmerSkeleton className="h-6 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <ShimmerSkeleton className="h-4 w-1/4" />
          <ShimmerSkeleton className="h-6 w-1/6 rounded-md" />
        </div>
        <div className="flex justify-end">
          <ShimmerSkeleton className="h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
};

export const PropertyDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ShimmerSkeleton className="h-8 w-3/4" />
        <ShimmerSkeleton className="h-6 w-1/2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShimmerSkeleton className="h-64 rounded-lg" />
        <div className="space-y-4">
          <ShimmerSkeleton className="h-6 w-full" />
          <ShimmerSkeleton className="h-6 w-3/4" />
          <ShimmerSkeleton className="h-6 w-5/6" />
          <ShimmerSkeleton className="h-6 w-full" />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <ShimmerSkeleton key={i} className="h-24 rounded-md" />
        ))}
      </div>
    </div>
  );
};

export const JournalEntrySkeleton = () => {
  return (
    <div className="border border-booking-gray-200 dark:border-booking-gray-500 rounded-lg overflow-hidden shadow-md p-4 space-y-3">
      <div className="flex justify-between">
        <ShimmerSkeleton className="h-6 w-1/2" />
        <ShimmerSkeleton className="h-6 w-1/4" />
      </div>
      <ShimmerSkeleton className="h-4 w-3/4" />
      <ShimmerSkeleton className="h-40 w-full rounded-md" />
      <ShimmerSkeleton className="h-20 w-full" />
    </div>
  );
};

export const LocalGuideSkeleton = () => {
  return (
    <div className="border border-booking-gray-200 dark:border-booking-gray-500 rounded-lg overflow-hidden shadow-md p-4 space-y-3">
      <ShimmerSkeleton className="h-6 w-1/2" />
      <div className="flex items-center gap-2">
        <ShimmerSkeleton className="h-10 w-10 rounded-full" />
        <ShimmerSkeleton className="h-4 w-1/4" />
      </div>
      <ShimmerSkeleton className="h-32 w-full rounded-md" />
      <ShimmerSkeleton className="h-4 w-3/4" />
      <ShimmerSkeleton className="h-4 w-1/2" />
    </div>
  );
};
