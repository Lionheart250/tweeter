$(document).ready(function() {
  const maxLength = 140;
  const textarea = $("#tweet-text");
  const counter = $(".counter");

  // Add an input event listener to the textarea
  textarea.on("input", function() {
    const length = textarea.val().length;
    const remainingChars = maxLength - length;

    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});


