import { useState } from 'react';

function Gallery({ tourData }) {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const getOrderedImages = () => {
    try {
      if (!Array.isArray(tourData)) return [];
          
      const sortedDays = [...tourData].sort((a, b) => (a?.id || 0) - (b?.id || 0));

      const filteredDays = filter === 'all'
        ? sortedDays
        : sortedDays.filter(day => day?.id?.toString() === filter);

      return filteredDays.flatMap(day => {
        const dayImages = Array.isArray(day?.images) ? day.images : [];
        return dayImages.map((img, index) => ({
          ...img,
          dayId: day?.id || 'unknown',
          order: img?.order || index 
        }));
      });
    } catch (error) {
      console.error("Error processing gallery data:", error);
      return [];
    }
  };

  const orderedImages = getOrderedImages();

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-container">
      <h2>Photo Gallery</h2>
      <p>Browse through the highlights of our educational tour.</p>

      <div className="gallery-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Days
        </button>
        {Array.isArray(tourData) && tourData
          .sort((a, b) => (a?.id || 0) - (b?.id || 0))
          .map(day => (
            <button
              key={day?.id || `day-${Math.random()}`}
              className={filter === day?.id?.toString() ? 'active' : ''}
              onClick={() => setFilter(day?.id?.toString())}
            >
              Day {day?.id || '?'}
            </button>
          ))}
      </div>

      <div className="gallery-grid">
        {orderedImages.length > 0 ? (
          orderedImages.map((image, index) => (
            <div
              className="gallery-item"
              key={`day-${image.dayId}-img-${index}`}
              onClick={() => openImage(image)}
            >
              <img
                src={image?.imageUrl || ''}
                alt={`Day ${image.dayId}: ${image?.title || 'Untitled'}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'placeholder-image.jpg';
                }}
              />
              <div className="gallery-caption">
                <strong>Day {image.dayId}:</strong> {image?.title || 'No description'}
              </div>
            </div>
          ))
        ) : (
          <p className="no-images-message">No images found for this filter.</p>
        )}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={closeImage}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-button" onClick={closeImage}>&times;</span>
            <img
              src={selectedImage?.imageUrl || ''}
              alt={`Day ${selectedImage.dayId}: ${selectedImage?.title || ''}`}
            />
            <div className="modal-caption">
              <strong>Day {selectedImage.dayId}:</strong> {selectedImage?.title || ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;