import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('business');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=2478296d03ba438fb3bca38cdebeb34b`)
    .then((response) => {
      const filteredArticles = response.data.articles.filter(article => article.urlToImage != null);
      setNews(filteredArticles);
    })
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <header>
        <h2>REACT-NEWS-APP</h2>
      </header>
      <div className='nav'>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'General'}})}>General</p>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'Business'}})}>Business</p>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'Technology'}})}>Technology</p>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'Sports'}})}>Sports</p>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'Entertainment'}})}>Entertainment</p>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'Health'}})}>Health</p>
        <p className='nav-item' onClick={() => handleCategoryChange({target: {value: 'Science'}})}>Science</p>
        <button className="search-button" onClick={toggleSearch}>
          <i className="fa fa-search">Search</i>
        </button>
        {showSearch && <input type="text" className="search-input" placeholder="Search..." onChange={handleCategoryChange} />}
      </div>
      <div className='container my-5'>
        <div className='row text-center'>
          {currentArticles.map((val) => (
            <div className='col my-3'>
              <div className="card">
                <img src={val.urlToImage} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{val.title}</h5>
                  <p className="card-text">{val.description}</p>
                  <a href={val.url} className="btn btn-danger">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='pagination'>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * articlesPerPage >= news.length}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
