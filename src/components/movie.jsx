import React, { Component } from "react";
import { getMovie, getMovies, saveMovie, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import Filter from "./common/filter";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import _ from "lodash";
import Input from "./common/input";
import Search from "./common/search";
import { async } from "./../services/genreService";
class Movie extends Component {
  mov = getMovies();
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    search: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];

    this.setState({ movies: await getMovies(), genres });
  }

  movieDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== id);

    this.setState({ movies: movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error("Something went wrong");
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    console.log("Liked");
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (filter) => {
    this.setState({
      selectedGenre: filter,
      currentPage: 1,
      search: "",
      movies: getMovies(),
    });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleChange = (query) => {
    this.setState({
      selectedGenre: "All Genres",
      search: query,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      search,
      pageSize,
      currentPage,
      selectedGenre,
      movies: AllMovies,
      sortColumn,
    } = this.state;

    let filtered = AllMovies;
    if (search)
      filtered = AllMovies.filter((m) =>
        m.title.toLowerCase().startsWith(search.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = AllMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    let movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className='row my-5'>
          <div className='col-3'>
            <Filter
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelected={this.handleGenreSelect}
            />
          </div>
          <div className='col'>
            {user && (
              <Link className='btn btn-primary' to='/movies/new'>
                New Movie
              </Link>
            )}
            <p>Number of Movies {totalCount}</p>
            <Search value={this.state.search} Change={this.handleChange} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.movieDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
