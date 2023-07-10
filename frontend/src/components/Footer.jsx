function Footer({ loggedIn }) {
  return (
    loggedIn && (
      <footer className="footer">
        <p className="footer__copyright">© 2023 Mesto Russia</p>
      </footer>
    )
  );
}

export default Footer;
