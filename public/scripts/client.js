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

  // Assume that the tweet object has the following structure:
  // const tweet = {
  //   user: {
  //     name: "JohnDoe",
  //     avatars: "profile-picture.jpg",
  //     handle: "@johndoe",
  //   },
  //   content: {
  //     text: "This is the content of the tweet.",
  //   },
  //   created_at: 1627023249000, // Timestamp in milliseconds
  // };

  function createTweetElement(tweet) {
    // ... Your existing createTweetElement function ...

    return $tweet;
  }

  // Assume you have a tweet container element with ID "tweet-container"
  const $tweetContainer = $("#tweet-container");

  // Assume you have a list of tweet objects stored in an array called "tweets"
  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $tweetContainer.append($tweetElement);
  }

  // Handle form submission
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Get the tweet text from the textarea
    const tweetText = $("#tweet-text").val();

    // Check if the tweet text is valid (optional)
    if (!tweetText.trim()) {
      // Add code to handle empty tweets or any other validation
      return;
    }

    // Create a new tweet object with the tweet content and other properties as needed
    const newTweet = {
      user: {
        name: "Your Name",
        avatars: "profile-picture.jpg",
        handle: "@yourhandle",
      },
      content: {
        text: tweetText,
      },
      created_at: Date.now(), // Current timestamp in milliseconds
    };

    // Render the new tweet
    const $newTweetElement = createTweetElement(newTweet);
    $tweetContainer.prepend($newTweetElement);

    // Clear the textarea and reset the counter
    $("#tweet-text").val("");
    counter.text(maxLength);
  });
});
