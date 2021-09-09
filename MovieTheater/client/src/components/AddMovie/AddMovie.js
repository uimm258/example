import React, { Component } from 'react'
import Context from "../../Context"
import config from "../../config"
import TokenService from "../../services/token-service"

class AddMovie extends Component {
    static contextType = Context;

    constructor(props) {
        super(props)
        this.state = {
            movieName: {
                value: ' ',
                touched: false,
            },
            price: {
                value: ' ',
                touched: false,
            },
            content: {
                value: ' ',
                touched: false,
            }
        }
    };

    updateName(movieName) {
        this.setState({
            MovieName: {
                value: movieName,
                touched: true,
            }
        })
    };

    updatePrice(price) {
        this.setState({
            price: {
                value: price,
                touched: true,
            }
        })
    };

    updateContent(content) {
        this.setState({
            content: {
                value: content,
                touched: true,
            }
        })
    };


    handleSubmitMovie = (event) => {
        event.preventDefault();
        const movieName = this.state.movieName;
        const price = this.state.price;
        const content = this.state.content;
        const genre_id = event.currentTarget.querySelector("select").value;

        fetch(`${config.API_ENDPOINT}/admin/movies`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                'movies_name': movieName.value,
                'movies_price': price.value,
                'content': content.value,
                'genre_id': genre_id,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.context.addMovie(data);
                this.props.history.push("/");
            })
            .catch((error) => console.log(error));
    };

    genreOption = () => {
        const { genres } = this.context;
        return genres.map((genre) =>
            <option id="genre_name" key={genre.id} name={genre.id} value={genre.id}>
                {genre.genre_name}
            </option>
        )
    }

    render() {
        return (
            <div>
                <h2>Add A New Movie</h2>

                <form onSubmit={e => this.handleSubmitMovie(e)}>
                    <label for="movie_name">
                        Movie Name: {this.state.movieName.touched}

                        <input id="movie_name" type="text" onChange={(e) => this.updateName(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="price">
                        Price: {this.state.price.touched}

                        <input id="price" type="text" onChange={(e) => this.updatePrice(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="content">
                        内容: {this.state.content.touched}

                        <textarea cols="60" rows="10" id="content" type="text" onChange={(e) => this.updateContent(e.target.value)}></textarea>
                    </label>
                    <br></br>

                    <p>Select its genre: 
                    <select for="genre_name">{this.genreOption()}</select>
                    </p>
                    <br></br>

                    <button type="submit">确认</button>

                </form>
            </div>
        )
    };
};

export default AddMovie;