// src/components/DayCard.jsx
import { useState } from 'react';
import ManilaImage from '/images/Manila.jpg';
import SubicImage from '/images/Subic.JPG';
import MuseumImage from '/images/Museum.JPG';
import HytechImage from '/images/Hytech2.JPG';
import LRTImage from '/images/LRT2.JPG';
import BaguioImage from '/images/2Baguio.JPG';
import BaguioImage2 from '/images/Baguio2.JPG';
import ReturnImage from '/images/terminal.jpg';

function DayCard({ day }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const dayImages = {
    1: ManilaImage,
    2: SubicImage,
    3: MuseumImage,
    4: HytechImage,
    5: LRTImage,
    6: BaguioImage,
    7: BaguioImage2,
    8: ReturnImage,
  };

  const imageSrc = dayImages[day.id] || '/api/placeholder/800/450';

  const openModal = () => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="day-card">
      <h2>Day {day.id}: {day.title}</h2>
      <div className="day-image-container" onClick={openModal}>
        <img 
          src={imageSrc}
          alt={`Day ${day.id} - ${day.title}`}
          className="day-image"
          onError={(e) => {
            e.target.src = '/api/placeholder/800/450';
          }}
        />
        <div className="image-overlay">
          <span>Click to enlarge</span>
        </div>
      </div>
      <div className="day-content">
        <div className="text-content">
          <h3>Highlights:</h3>
          <ul>
            {day.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          <div className="day-description">
            <p>{day.description}</p>
          </div>
          <div className="learning-outcomes">
            <h3>What I Learned:</h3>
            <p>{day.learnings}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img 
              src={currentImage} 
              alt={`Day ${day.id} - ${day.title}`}
              className="modal-image"
            />
            <div className="modal-caption">
              <h3>Day {day.id}: {day.title}</h3>
              <p>{day.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DayCard;