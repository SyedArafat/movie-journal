import './App.css';
import Row from './components/row/Row';
import requests from './requests';
import Banner from './components/banner/Banner';
import Nav from './components/navbar/Nav';
import React from 'react';

function App() {
  return (
      <div className="App">
        <Nav />
        <Banner />
        <Row isLargeRow={true} title = "NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals} />
        <Row title = "Trending Now" fetchUrl = {requests.fetchTrending} />
        <Row title = "Top Rated" fetchUrl = {requests.fetchTopRated} />
        {/* <Row title = "Action Movies" fetchUrl = {requests.fetchActionMovies} /> */}
        {/* <Row title = "Comedy Movies" fetchUrl = {requests.fetchComedyMovies} /> */}
        {/* <Row title = "Romance Movies" fetchUrl = {requests.fetchRomanceMovies} /> */}
        {/* <Row title = "Documentaries" fetchUrl = {requests.fetchDocumentaries} /> */}
        {/* <Row title = "Horror Movies" fetchUrl = {requests.fetchHorrorMovies} /> */}
      </div>
  );
}

export default App;
