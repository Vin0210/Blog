// src/components/Gallery.jsx
import { useState } from 'react';

function Gallery({ tourData }) {
  const [filter, setFilter] = useState('all');
  
  const filteredImages = filter === 'all' 
    ? tourData.flatMap(day => day.images || [{ day: day.id, title: day.title }]) 
    : tourData
        .filter(day => day.id === parseInt(filter))
        .flatMap(day => day.images || [{ day: day.id, title: day.title }]);

  return (
    <div className="gallery-container">
      <h2>Photo Gallery</h2>
      <p>Browse through the highlights of our educational tour across the Philippines.</p>
      
      <div className="gallery-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Days
        </button>
        {tourData.map(day => (
          <button 
            key={day.id}
            className={filter === day.id.toString() ? 'active' : ''}
            onClick={() => setFilter(day.id.toString())}
          >
            Day {day.id}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img 
              src={image.imageUrl}  // Ensure this is correctly pulling the imageUrl
              alt={`Day ${image.day} - ${image.title}`} 
            />
            <div className="gallery-caption">
              <strong>Day {image.day}:</strong> {image.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
