/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Get the textarea element and the counter element
  const textarea = $("#tweet-text");
  const counter = $("output[name='counter']");
  const maxLength = 140;

  // Add an input event listener to the textarea
  textarea.on("input", function() {
    // Get the current length of the textarea value
    const currentLength = textarea.val().length;
    // Calculate the remaining characters
    const remainingChars = maxLength - currentLength;
    // Update the counter value
    counter.text(remainingChars);

    // Disable textarea if character limit is exceeded
    if (remainingChars < 0) {
      textarea.addClass("exceeded-limit");
    } else {
      textarea.removeClass("exceeded-limit");
    }
  });
});
