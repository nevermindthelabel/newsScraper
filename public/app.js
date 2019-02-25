$(document).ready(function() {
  console.log('ready');

  $('#scrape').on('click', function() {
    $.ajax({
      method: 'GET',
      url: '/scrape'
    }).then(function(data) {
      console.log(data);
      window.location.reload();
    });
  });

  $('#saveArticle').on('click', function() {
    $.ajax({
      method: 'POST',
      url: `/articles/saved/${$(this).attr('data-id')}`
    });
    window.location.reload();
    console.log($(this).attr('data-id'));
  });

  $('#saveNote').on('click', function() {
    let newNote = $('#articleNote').val();
    console.log(newNote);
    let articleId = $(this).attr('data-id');
    console.log(articleId);
    $.ajax({
      method: 'POST',
      url: `/notes/saved/${articleId}`,
      articleId: articleId,
      body: newNote
    });
    $('#articleNote').val('');
  });
});
