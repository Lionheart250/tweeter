$(document).ready(function() {
  const maxLength = 140;
  
  $('#tweet-text').on('input', function() {
    const length = $(this).val().length;
    const counter = $(this).siblings('.counter');
    const remainingChars = maxLength - length;
    
    counter.text(remainingChars);
    
    if (remainingChars < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});
