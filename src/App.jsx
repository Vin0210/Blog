// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import DayCard from './components/DayCard';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import About from './components/About';
import { tourData } from './data/tourData';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [activeDay, setActiveDay] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDays, setFilteredDays] = useState(tourData);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter days based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDays(tourData);
    } else {
      const filtered = tourData.filter(day => 
        day.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        day.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        day.activities.some(activity => 
          activity.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredDays(filtered);
    }
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setActivePage(page);
    setActiveDay(null);
    setSearchTerm('');
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleDayChange = (dayId) => {
    setActiveDay(dayId);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const resetFilters = () => {
    setActiveDay(null);
    setSearchTerm('');
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

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
              {filteredDays.map((day) => (
                <button 
                  key={day.id}
                  className={activeDay === day.id ? 'active' : ''}
                  onClick={() => handleDayChange(day.id)}
                >
                  Day {day.id}: {day.shortTitle}
                </button>
              ))}
              <button 
                className={activeDay === null && searchTerm === '' ? 'active' : ''}
                onClick={resetFilters}
              >
                All Days
              </button>
            </div>
            
            <div className="tour-content">
              {activeDay 
                ? <DayCard day={filteredDays.find(day => day.id === activeDay)} /> 
                : filteredDays.length > 0 
                  ? filteredDays.map(day => <DayCard key={day.id} day={day} />)
                  : <div className="no-results">No matching days found. Try a different search term.</div>
              }
            </div>
          </>
        );
      case 'gallery':
        return <Gallery tourData={tourData} searchTerm={searchTerm} />;
      case 'about':
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Header 
        onPageChange={handlePageChange} 
        activePage={activePage} 
        searchTerm={activePage === 'gallery' ? searchTerm : ''}
        onSearchChange={activePage === 'gallery' ? setSearchTerm : undefined}
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;