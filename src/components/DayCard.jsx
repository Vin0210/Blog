// Import all your day images at the top
import ManilaImage from '/images/Manila.jpg';
import QuezonImage from '/images/Quezon.JPG';

import BoracayImage from '/images/Boracay.jpg';
import PalawanImage from '/images/Palawan.jpg';
import CebuImage from '/images/Cebu.jpg';
// Add more imports as needed

function DayCard({ day }) {
  // Map day IDs to their corresponding images
  const dayImages = {
    1: ManilaImage,
    2: QuezonImage,
    3: BoracayImage,
    4: PalawanImage,
    5: CebuImage,
    // Add more mappings as needed
  };

  // Fallback to placeholder if no image exists for the day
  const imageSrc = dayImages[day.id] || '/api/placeholder/400/250';

  return (
    <div className="day-card">
      <h2>Day {day.id}: {day.title}</h2>
      <div className="day-image">
        <img 
          src={imageSrc}
          alt={`Day ${day.id} - ${day.title}`}
          width={400}
          height={250}
          onError={(e) => {
            e.target.src = '/api/placeholder/400/250'; // Fallback if image fails to load
          }}
        />
      </div>
      <div className="day-content">
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
  );
}

export default DayCard;