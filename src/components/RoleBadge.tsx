import { Shield, User } from 'lucide-react';

interface RoleBadgeProps {
  role: 'user' | 'admin';
  size?: 'sm' | 'md';
}

export function RoleBadge({ role, size = 'sm' }: RoleBadgeProps) {
  const isAdmin = role === 'admin';

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses[size]} ${
        isAdmin
          ? 'bg-purple-100 text-purple-700'
          : 'bg-gray-100 text-gray-700'
      }`}
    >
      {isAdmin ? (
        <Shield className={iconSize} />
      ) : (
        <User className={iconSize} />
      )}
      <span>{isAdmin ? 'Admin' : 'User'}</span>
    </span>
  );
}
