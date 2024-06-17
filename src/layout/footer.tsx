function Footer() {
  const currentDate = new Date();
  return (
    <footer className="container md:w-full flex justify-between items-center text-xs opacity-50 mt-3">
      <small>
        &copy; {currentDate.getFullYear()}. Copyright by Svetlozar Antonov.
        Intended for learning purposes.
      </small>
      <p className="invisible md:visible">
        Version <b>1.0</b>
      </p>
    </footer>
  );
}

export default Footer;
