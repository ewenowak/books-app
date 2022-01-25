/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
    },
  };

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }; 

  const render = function(){
    for (let book of dataSource.books){
      
      /* generate HTML based on template */
      
      const generatedHTML = template.book(book);

      /* generated DOM */
      
      const bookElement = utils.createDOMFromHTML(generatedHTML);
 
      /* Find container of booksList */

      const bookList = document.querySelector(select.containerOf.booksList);

      /* Add books to the booksList */

      bookList.appendChild(bookElement);
    }
  };
  
  /* make new favoriteBooks array */

  const favoriteBooks = [];
  
  const InitActions = function(){
   
    /* find all book-image elements */

    const allImages = document.querySelectorAll(select.containerOf.bookImage);

    for (let image of allImages){
      
      /* add event Listener for a clicked Image */

      image.addEventListener('click', function(event) {
      
        /* prevent default action for event */
      
        event.preventDefault();
      
        /* get book id from a clicked image */

        const idBook = image.getAttribute('data-id');
      
        /* Check if clicked image is already in favoriteBooks array*/
      
        if(favoriteBooks.includes(idBook)){

          /* If is, remove class favorite from the clicked image */

          image.classList.remove('favorite');

          /* Find an IndexOf idBook which need to be removed in favoriteBooks array */

          const indexOfRemoveBook = favoriteBooks.indexOf(idBook);

          /* Remove a idBook from a favoriteBooks array */

          favoriteBooks.splice(indexOfRemoveBook, 1);
        } else {
          /*If isn't, add class favorite to the clicked image */
        
          image.classList.add('favorite');
        
          /* Get id book from the clicked image */

          const idBook = image.getAttribute('data-id');
        
          /* Add id book to the favoriteBooks array */

          favoriteBooks.push(idBook);
        
        }
        console.log(favoriteBooks);
      });
    }
    
  };
  render();
  InitActions();

}
