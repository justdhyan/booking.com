
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User, Map, Camera, Book } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BadgeType = 'explorer' | 'journalist' | 'photographer';

interface BadgeConfig {
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const badgeConfig: Record<BadgeType, BadgeConfig> = {
  explorer: {
    label: 'Explorer',
    icon: <Map size={12} />,
    color: 'bg-cyan-500 dark:bg-cyan-600',
    description: 'Contributed to Local Guides'
  },
  journalist: {
    label: 'Journalist',
    icon: <Book size={12} />,
    color: 'bg-purple-500 dark:bg-purple-600',
    description: 'Created 3+ journal entries'
  },
  photographer: {
    label: 'Photographer',
    icon: <Camera size={12} />,
    color: 'bg-amber-500 dark:bg-amber-600',
    description: 'Uploaded 5+ photos'
  }
};

interface UserBadgeProps {
  type: BadgeType;
  className?: string;
  showTooltip?: boolean;
}

export const UserBadge: React.FC<UserBadgeProps> = ({ 
  type, 
  className,
  showTooltip = true
}) => {
  const { label, icon, color, description } = badgeConfig[type];
  
  const badge = (
    <Badge 
      className={cn(
        "text-xs font-medium gap-1", 
        color, 
        "text-white animate-pulse-subtle", 
        className
      )}
    >
      {icon}
      {label}
    </Badge>
  );
  
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{label}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return badge;
};

export interface UserBadgesProps {
  badges: BadgeType[];
  className?: string;
}

export const UserBadges: React.FC<UserBadgesProps> = ({ badges, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {badges.map(badge => (
        <UserBadge key={badge} type={badge} />
      ))}
    </div>
  );
};
