/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    'use strict';
  
    const select = {
      templateOf: {
        books: '#template-book',
      },
  
      containerOf: {
        booksList: '.books-list',
        bookImage: '.books-list .book__image',
      },
  
      
  
    };
  
    const template = {
      book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
    }; 
  
  /*  class BookList {
      constructor(dataSource){
          const thisBookList = this;   

          thisBookList.data = data;
          thisBookList.data.books = 
      }

      initData() {
          const thisBookList = this;
      }
      
    } 

    const app = new BookList(); */


    const render = function(){
      for (let book of dataSource.books){
      
        /* make a new constant ratingBgc which determine background rating */
  
        const ratingBgc = determineRatingBgc(book.rating);
        console.log('ratingBgc', ratingBgc);
        book.ratingBgc = ratingBgc;
        
        /* make a new constant widthRating which determine width rating */
  
        const ratingWidth = book.rating * 10;
        console.log('widthRating', ratingWidth);
        book.ratingWidth = ratingWidth;
        
        /* generate HTML based on template */
        
        const generatedHTML = template.book(book);
  
        console.log('generatedHTML', generatedHTML);
  
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
  
        image.addEventListener('dblclick', function(event) {
        
          /* prevent default action for event */
        
          event.preventDefault();
        
          /* get book id from a clicked image */
  
          const idBook = image.getAttribute('data-id');
        
          /* Check if clicked image is already in favoriteBooks array*/
        
          if(favoriteBooks.includes(idBook)){
  
            /* If is, remove class favorite from the clicked image */
  
            image.classList.toggle('favorite');
  
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
   
  
    const determineRatingBgc = function(rating){
  
      if(rating < 6){
         return  'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
          return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
          return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
          return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      console.log(rating);
    }
    
  
  
  render();
  InitActions();
  }