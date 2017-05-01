$(() => {
  $('.navbar-placeholder').load(__dirname + 'navbar/navbar.html', () => {
    $('.button-collapse').sideNav();
  });
  $('.parallax').parallax();
  $('.footer-placeholder').load(__dirname + 'footer/footer.html', () => {
  });
});
