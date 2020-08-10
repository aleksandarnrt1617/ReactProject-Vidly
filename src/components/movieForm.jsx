import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { deleteMovie, getMovie, getMovies, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string().optional(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Number in stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Daily rental rate"),
  };

  async pupulateGenres() {
    const genres = await getGenres();
    this.setState({ genres });
  }
  async pupulateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new" || movieId === undefined) return;
      alert("Ass");
      const movie = await getMovie(movieId);

      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.pupulateGenres();
    await this.pupulateMovies();
    // if (!this.props.match.params.id) return;
    // if (getMovie(this.props.match.params.id) === undefined) {
    //   this.props.history.replace("/not-found");
    // } else {
    //   console.log(getMovie(this.props.match.params.id));
    //   const { _id, title, genre, numberInStock, dailyRentalRate } = getMovie(
    //     this.props.match.params.id
    //   );
    //   console.log("Ass", dailyRentalRate);
    //   this.setState({
    //     data: { _id, title, genre: genre.name, numberInStock, dailyRentalRate },
    //   });
    // }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInputList("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
