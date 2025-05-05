function Header({ onPageChange, activePage }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="tour-title">CCS Educational Tour 2025</h1>
        <nav className="main-nav">
          <ul className="nav-list">
            {['home', 'gallery', 'about'].map((page) => (
              <li key={page} className="nav-item">
                <button
                  className={`nav-button ${activePage === page ? 'active-nav' : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page === 'home' ? 'Home' :
                    page === 'gallery' ? 'Gallery' :
                      'About the Tour'}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;