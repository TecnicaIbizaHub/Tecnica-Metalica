import { useState } from 'react';

interface Image {
  url: string;
  title: string;
  description?: string;
}

export function useImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<Image[]>([]);

  const openModal = (imageList: Image[], index: number = 0) => {
    setImages(imageList);
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    currentImageIndex,
    images,
    openModal,
    closeModal
  };
}