$(() => {
  $('.navbar-placeholder').load(__dirname + 'navbar/navbar.html', () => {
  });
  $('.parallax').parallax();
  $('.footer-placeholder').load(__dirname + 'footer/footer.html', () => {
  });
});
