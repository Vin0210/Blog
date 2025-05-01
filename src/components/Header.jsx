function Header({ onPageChange, activePage }) {
  return (
    <header className="header">
      <h1>CCS Educational Tour 2025</h1>
      <nav>
        <ul>
          <li>
            <button 
              className={activePage === 'home' ? 'active-nav' : ''} 
              onClick={() => onPageChange('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={activePage === 'gallery' ? 'active-nav' : ''} 
              onClick={() => onPageChange('gallery')}
            >
              Gallery
            </button>
          </li>
          <li>
            <button 
              className={activePage === 'about' ? 'active-nav' : ''} 
              onClick={() => onPageChange('about')}
            >
              About the Tour
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
