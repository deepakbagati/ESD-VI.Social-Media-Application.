// components/ShareButton.tsx

'use client';

import React from 'react';
import { toast } from 'react-toastify';

interface ShareButtonProps {
  content: string;
  id: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ content, id }) => {
  const handleShare = () => {
    const shareData = {
      title: 'Check out this thread!',
      text: content,
      url: `${window.location.origin}/thread/${id}`,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      toast.info("Sharing not supported, sharing via email...");
      const mailtoLink = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n' + shareData.url)}`;
      window.location.href = mailtoLink;
    }
  };

  return (
    <img
      src='/assets/share.svg'
      alt='share'
      width={24}
      height={24}
      className='cursor-pointer object-contain'
      onClick={handleShare}
    />
  );
};

export default ShareButton;
