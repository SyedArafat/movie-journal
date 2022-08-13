import Nav from "../components/navbar/Nav";
import Banner from "../components/banner/Banner";
import Row from "../components/row/Row";
import requests from "../config/requests";
import Footer from "../compounds/FooterCompound";

function HomePage() {
    return (
        <div className="App">
            <Nav />
            <Banner />
            <Row isLargeRow={true} title = "NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals} />
            <Row title = "Trending Now" fetchUrl = {requests.fetchTrending} />
            <Row title = "Top Rated" fetchUrl = {requests.fetchTopRated} />
            <Footer />
            {/* <Row title = "Action Movies" fetchUrl = {requests.fetchActionMovies} /> */}
            {/* <Row title = "Comedy Movies" fetchUrl = {requests.fetchComedyMovies} /> */}
            {/* <Row title = "Romance Movies" fetchUrl = {requests.fetchRomanceMovies} /> */}
            {/* <Row title = "Documentaries" fetchUrl = {requests.fetchDocumentaries} /> */}
            {/* <Row title = "Horror Movies" fetchUrl = {requests.fetchHorrorMovies} /> */}
        </div>
    );
}

export default HomePage;
