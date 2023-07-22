$(document).ready(function () {
  const $tweetForm = $("#tweet-form");
  const $errorElement = $(".error-message");
  const maxLength = 140;
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const catImageUrls = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQamZ_bKNOfqoxHnubh23L9k4tmy35eRtY3xQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxY80Zy4D4bQ9aTqaTZQewQ6f_eTsWTGx621m8lrEvvJZGX_jg9gHafgztUBFL6KLWlLI&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDSy0TuTeLfy2KcUBFsvNCghU3l98gsfMMOA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEzIxhh1uUKRxOHfp84LOn0by_VCVTGcBJGA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBpqlczOmiZTus_TMl8FpCSBBlVKDLgR4AVQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxw-pP9I8A-Oo3y-5FHjv1zHYbX_SpL0CeA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgCV1i_EguyIbOyyEdTCJDJOAi__ulwu8x-g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGw5tniNRIukovQDn9xblZYsW5-NRwvB2bA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_exHw-9sfp5krCnRm8KGnUD6tpJ27HUYuKg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vaTlhacFibyvDpkFnPzNfmSgKZ-9gMG-myAeqnQ1_kRPaXwT19lXDbpgszQ8TD3hXYY&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4p4z_w_GuVcHAQ113WxpexDuuVibbddmoGg&usqp=CAU",
  ];
  
  // Function to create a new tweet element
  function createTweetElement(tweet) {
    // Format the created_at timestamp into a readable date
    const date = new Date(tweet.created_at);
    const formattedDate = date.toLocaleString();

    // Construct the HTML markup for the tweet element
    const randomCatImageUrl = catImageUrls[Math.floor(Math.random() * catImageUrls.length)];
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $userInfo = $("<div>").addClass("user-info");
    const $userAvatar = $("<img>").addClass("user-avatar").attr("src", randomCatImageUrl).attr("alt", "User Profile Picture");
    const $username = $("<span>").addClass("username").text(tweet.user.name);
    const $userHandle = $("<span>").addClass("handle").text(tweet.user.handle);
    const $tweetContent = $("<div>").addClass("tweet-content").append($("<p>").text(tweet.content.text));
    const $footer = $("<footer>");
    const $icons = $("<div>").addClass("icons");
    const $heartIcon = $("<i>").addClass("far fa-heart");
    const $retweetIcon = $("<i>").addClass("fas fa-retweet");
    const $flagIcon = $("<i>").addClass("fas fa-flag");

    // Timeago element to display time passed since tweet creation
    const $timeAgo = $("<time>").addClass("time-ago").attr("datetime", formattedDate).text(formattedDate);

    // Append elements to build the tweet structure
    $userInfo.append($userAvatar, $username);
    $header.append($userInfo, $userHandle);
    $icons.append($heartIcon, $retweetIcon, $flagIcon);
    $footer.append($icons, $timeAgo); // Append the timeago element to the footer

    // Assemble all parts to create the final tweet element
    $tweet.append($header, $tweetContent, $footer);

    return $tweet;
  }

  // Function to render tweets in the container
  function renderTweets(tweets) {
    // Clear the existing tweets in the container
    $("#tweet-container").empty();

    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $("#tweet-container").prepend($tweetElement);
    }
  }

  // Function to load tweets from the server
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "JSON",
      success: function (response) {
        renderTweets(response);
      },
      error: function (error) {
        console.error("Error loading tweets:", error);
      }
    });
  }

  // Call the loadTweets function to load tweets on page load
  loadTweets();

  $("#tweet-form").submit(function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Hide the error message before proceeding with validation
    $errorElement.slideUp();

    const tweetText = $("#tweet-text").val();

    // Validation logic
    if (!tweetText.trim()) {
      $errorElement.text("Tweet content cannot be empty.").slideDown();
      return; // Abort form submission
    } else if (tweetText.length > maxLength) {
      $errorElement.text("Tweet content is too long. Maximum " + maxLength + " characters allowed.").slideDown();
      return; // Abort form submission
    }

    // Create a new tweet object with the tweet content and other properties as needed
    const newTweet = {
      user: {
        name: "Your Name",
        avatars: "profile-picture.jpg",
        handle: "@yourhandle",
      },
      text: tweetText, // Use "text" instead of "content.text" for the tweet content
      created_at: Date.now(), // Current timestamp in milliseconds
    };
    
    // Send the new tweet data to the server using AJAX
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: newTweet,
      dataType: "JSON",
      success: function (response) {
        const $newTweetElement = createTweetElement(response);
        $("#tweet-container").prepend($newTweetElement);

        // Clear the textarea and reset the counter
        $("#tweet-text").val("");
        $("#tweet-text").closest('.counter-container').find('.counter').text(maxLength);
      },
      error: function (err) {
        console.error("Error sending tweet:", err);
        $errorElement.text("Error sending tweet. Please try again later.").slideDown();
      }
    });
  });

  // Timeago initialization
  $("time.time-ago").timeago();
});
