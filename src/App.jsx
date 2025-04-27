// src/App.jsx
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import DayCard from './components/DayCard';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import About from './components/About';
import { tourData } from './data/tourData';

function App() {
  const [activeDay, setActiveDay] = useState(null);
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch(activePage) {
      case 'home':
        return (
          <>
            <div className="tour-overview">
              <h2>My 8-Day Educational Tour: Manila, Subic, Baguio & Beyond</h2>
              <p>Join me on a journey through the Philippines where we explored historical sites, 
              financial institutions, transportation systems, and natural wonders while learning about
              the country's rich culture and modern development.</p>
            </div>
            
            <div className="day-navigation">
              {tourData.map((day) => (
                <button 
                  key={day.id}
                  className={activeDay === day.id ? 'active' : ''}
                  onClick={() => setActiveDay(day.id)}
                >
                  Day {day.id}
                </button>
              ))}
              <button 
                className={activeDay === null ? 'active' : ''}
                onClick={() => setActiveDay(null)}
              >
                All Days
              </button>
            </div>
            
            <div className="tour-content">
              {activeDay 
                ? <DayCard day={tourData.find(day => day.id === activeDay)} /> 
                : tourData.map(day => <DayCard key={day.id} day={day} />)
              }
            </div>
          </>
        );
      case 'gallery':
        return <Gallery tourData={tourData} />;
      case 'about':
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Header onPageChange={handlePageChange} activePage={activePage} />
      {renderContent()}
      <Footer />
    </div>
  );
}

export default App;
