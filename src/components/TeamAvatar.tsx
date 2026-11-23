import { useEffect, useState } from 'react';

interface TeamAvatarProps {
  name: string;
  initials: string;
  photoUrl?: string;
  sizeClass?: string;
  textSizeClass?: string;
  decorative?: boolean;
}

export function TeamAvatar({
  name,
  initials,
  photoUrl,
  sizeClass = 'h-14 w-14',
  textSizeClass = 'text-base',
  decorative = false,
}: TeamAvatarProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [photoUrl]);

  const showImage = Boolean(photoUrl && !imageError);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-900 font-display font-bold tracking-tight text-white ${sizeClass} ${textSizeClass}`}
      aria-hidden={decorative && !showImage ? true : undefined}
    >
      {showImage ? (
        <img
          src={photoUrl}
          alt={name ? `${name} profile photo` : 'Team member profile photo'}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
