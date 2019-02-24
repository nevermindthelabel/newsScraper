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

  // $('#viewSaved').on('click', () => {
  //   $.ajax({
  //     method: 'GET',
  //     url: 
  //   })
  // })


});

  
// });
// Grab the articles as a json
// $.getJSON('/articles', data => {
  // For each one
  // for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
  //   $('.card-body').append(`
  //    <h4 class="card-title">${data[i].title}</h4>
  // <h5>${data[i].summery}</h5> <br />
  // <p>View article on NHL.com<a href=https://www.nhl.com${
  //     data[i].link
  //     }> here</a></p >
  //   <p>article id: ${data[i]._id}</p>
  //   <a href=/articles / ${data[i]._id}> json data</a >
  //    <form action="/articles/saved/${data[i]._id}" method="post">
  //    <button id="submit" class="btn btn-primary" type="submit" formmethod="post">Save this Article</button>
  //     </form>
  //         <hr class="body" /> 
  //     `);
//   }
// });

/* <form action="/articles/${data[i]._id}" method="post">
  Title of Note: <input type="textarea" name="title"><br />
    Your Note Text: <input type="textarea" name="body"><br />
      <button id="submit" class="btn btn-primary" type="submit" formmethod="post">Save your Note</button>
      </form> */

// $.getJSON('/articles/:id', data => {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $('.card-body').append(`
//       <h5 class="card-title">${data[i].title}</h5>
//       ${data[i].summery} <br />
//       <p>View article on NHL.com<a href=https://www.nhl.com${
//         data[i].link
//       }> here</a></p>
//       <p>article id: '${data[i]._id}'</p>
//       <a href=/articles/${data[i]._id}>json data</a>
//       <hr class="body"/>
//       `);
//   }
// });
