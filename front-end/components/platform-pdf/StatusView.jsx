import React, { useState, useRef, useEffect } from 'react';
import Preview from './Preview';
import SearchBar from './SearchBar'

const StatusView = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  const time = Date.now();
  const [bookData, setBookData] = useState([]);


  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current?.addEventListener('click', () => {
      modalRef.current?.showModal();
    });
  });

  useEffect(() => {
    // Fetch book data from API
    fetch('http://localhost:3000/api/v1/pdf')
      .then(response => response.json())
      .then(data => {
        setBookData(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, []);


  // Function to handle the "See More" click
  const handleSeeMoreClick = () => {
    setShowFullContent(true);
  };

  // Format the time in hh:mm mm dd, yy format
  const formattedTime = new Date(time).toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  });

  function splitStringByComma(str) {
    return str.split(',');
  }
  

  return (
    <>
    <SearchBar />
      {bookData.map((book, index) => (
        <div className="hero hero-custom mb-5" key={index}>
          <div className="hero-content hero-post flex-col lg:flex-row-reverse mb-5">
            <div className="w-full lg:w-2/3 flex justify-center">
              <img src={book.imageURLs[0]} alt="Image 1" width="200px" />
              <img src={book.imageURLs[1]} alt="Image 2" width="200px" />
            </div>
            <div className="w-full lg:w-1/3">
              <div>
                <h1 className="text-2xl text-accent font-bold">{book.fullName}</h1>
                <p className="py-6">
                  {showFullContent ? book.bookContent : `${book.bookContent.slice(0, 200)}...`}
                </p>
                {!showFullContent && (
                  <div className="join join-vertical lg:join-horizontal">
                    <button className="btn join-item btn-sm btn-accent mx-2" ref={buttonRef}>
                      See More..
                    </button>
                    <button className="btn join-item btn-sm btn-accent mx-2" onClick={() => window.open(book.pdf, '_blank')}>View PDF</button>
                    <dialog ref={modalRef} id={`my_modal_${index}`} className="modal">
                      <form method="dialog" className="modal-box modal-custom w-11/12 max-w-5xl">
                        <p className="text-2xl leading-12 my-10">
                          <b>{book.username}</b>
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1">
                            <br />
                            <p>{book.bookContent}</p>
                          </div>
                          <div className="col-span-1">
                            <div
                              className="w-full lg:w-2/3 flex justify-center"
                              style={{
                                marginLeft: '80px',
                              }}
                            >
                              <img src={book.imageURLs[0]} alt="Image 1" width="200px" />
                              <img src={book.imageURLs[1]} alt="Image 2" width="200px" />
                            </div>
                            <p className="m-8">Posted on: {formattedTime}</p>
                            <p>Keywords: {book.keywords}</p>

                            <button className="btn btn-cust1 btn-accent m-8">Share</button>
                          </div>
                        </div>
                        <div className="modal-action">
                          <button className="btn btn-accent">Close</button>
                        </div>
                      </form>
                    </dialog>
                  </div>
                )}
                <p className="mb-5">Posted on: {formattedTime}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatusView;
