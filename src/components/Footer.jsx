function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Educational Tour Blog </p>
      <div className="social-links">
        <span>
          <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Twitter</a>
          <a href="elvinramos.meme" onClick={(e) => e.preventDefault()}>Facebook</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;