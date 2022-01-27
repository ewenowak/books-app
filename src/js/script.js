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
      form: '.filters',
    },
  };
  
  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }; 
  
  class BookList {
    constructor(){
      const thisBookList = this;   
          
      thisBookList.initData();
      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
    }

    initData(){
      this.data = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
    }

    render() {
      const thisBookList = this;
      for (let book of thisBookList.data){
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;
          
        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;
        
        /* generate HTML based on template */
        
        const generatedHTML = template.book(book);
        
        /* generated DOM */
        
        const bookElement = utils.createDOMFromHTML(generatedHTML);
        
        /* Find container of booksList */
  
        const bookList = document.querySelector(select.containerOf.booksList);

        /* Add books to the booksList */
        
        bookList.appendChild(bookElement);
      } 
    }
    
    getElements(){
    
      const thisBookList = this;
        
      thisBookList.dom = {};

      thisBookList.dom.container = document.querySelector(select.containerOf.booksList);
      thisBookList.dom.form = document.querySelector(select.containerOf.form);
    }

    initActions() {
      const thisBookList = this;
      
      //const favoriteBooks = [];
      //const filters = [];
      /* Add event listener for a dblclick element */
      
      thisBookList.dom.container.addEventListener('dblclick', function(event){

        /* prevent default action for event */
        
        event.preventDefault();

        /* check if clicked element is a image */

        const clickedElement = event.target.offsetParent;

        if (clickedElement.classList.contains('book__image')){
          
          /* get book id by a clicked image */
          
          const idBook = clickedElement.getAttribute('data-id');

          /* Check if clicked image is already in favoriteBooks array*/
          
          if(thisBookList.favoriteBooks.includes(idBook)){
            
            /* If is, remove class favorite from the clicked image */

            clickedElement.classList.remove('favorite');

            /* Find an IndexOf idBook which need to be removed in favoriteBooks array */

            const indexOfRemoveBook = thisBookList.favoriteBooks.indexOf(idBook);

            /* Remove a idBook from a favoriteBooks array */

            thisBookList.favoriteBooks.splice(indexOfRemoveBook, 1);
          } else {
            /* If isn't, add class favorite to the clicked image */

            clickedElement.classList.add('favorite');
          
            /* Add id book to the favoriteBooks array */

            thisBookList.favoriteBooks.push(idBook);  
          }
        }  
      });
      
      /* add event listener  to the form */
      
      thisBookList.dom.form.addEventListener('click', function(event){

        /* check if clicked element is a checkbox */

        const clickedElement = event.target;

        if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){
    
          /* check if clicked element is checked */
          
          const value = clickedElement.value;
          if(clickedElement.checked){
  
            /* if is remove value of clicked element from the filters array */

            thisBookList.filters.push(value);
  
          } else {
  
            /* else add value to the filters array */

            const indexOfRemoveValue = thisBookList.filters.indexOf(value);
            thisBookList.filters.splice(indexOfRemoveValue, 1);
          }
        }
        thisBookList.filterBooks();
      });
    }
    
    filterBooks(){
      const thisBookList = this;
      
      for (const book of thisBookList.data){
        
        /* make new let with value false */

        let shouldBeHidden = false;
        
        /* for each value in filters array */
        
        for (const filter of thisBookList.filters){
          
          /* check if book has not that value*/
          
          if(!book.details[filter]){
            shouldBeHidden = true;

            /* if it has stop checikng */
            
            break;
          }
        }
        
        /* find a book_image of that book */

        const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        
        if(shouldBeHidden === true){
          filterBook.classList.add('hidden');
        } else {
          filterBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      
      if(rating < 6){
        return  'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
    
  }
  const app = new BookList(); 
  console.log('app', app);
}