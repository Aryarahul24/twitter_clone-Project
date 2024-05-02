$(document).ready(function() {
    // Handle the form submission for creating a new tweet
    $('#new_tweet').on('submit', function(event) {
      event.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function(data) {
          // Add the new tweet to the list of tweets
          $('#tweets').append('<li>' + data.content + '</li>');
          // Clear the form
          $('#new_tweet')[0].reset();
        }
      });
    });
  
    // Handle the deletion of a tweet
    $('body').on('click', '.destroy', function(event) {
      event.preventDefault();
      $.ajax({
        type: 'DELETE',
        url: $(this).data('url'),
        success: function(data) {
          // Remove the tweet from the list of tweets
          $(event.target).closest('li').remove();
        }
      });
    });
  
    // Handle the editing of a tweet
    $('body').on('click', '.edit', function(event) {
      event.preventDefault();
      const tweetId = $(this).data('id');
      const content = $(this).data('content');
      const newContent = prompt('Edit the tweet:', content);
      if (newContent) {
        $.ajax({
          type: 'PUT',
          url: '/tweets/' + tweetId,
          data: { content: newContent },
          success: function(data) {
            // Update the content of the tweet
            $('li[data-id="' + tweetId + '"] .content').text(newContent);
          }
        });
      }
    });
  });