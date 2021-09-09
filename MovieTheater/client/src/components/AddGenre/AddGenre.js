import React, { Component } from "react";
import Context from "../../Context";
import config from "../../config";
import TokenService from "../services/token-service";

class AddGenre extends Component {
    static contextType = Context;

    constructor(props){
        super(props)
        this.state={
            genreName: {
                name: ' ',
                touched: false
            },
            admin_id: {
                adminId: 1,
                touched: false
            }
        }
    };

    updateGenreName(genreName){
        this.setState({
            GenreName:{
                name: genreName,
                touched: true
            },
        })
    };

    handleSubmitGenre = (event) => {
        event.preventDefault();
        const genreName = this.state.genreName.name;
        
        fetch(`${config.API_ENDPOINT}/admin/Genre`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({'genre_name': genreName})
        })
        .then(res => res.json())
        .then(data => {
            this.context.addGenre(data)
            this.props.history.push('/')
        })
        .catch(error => console.log(error))
    };

    render() {
        return(
            <div>
                <h2>Add New Genre</h2>

                <form onSubmit={e=> this.handleSubmitGenre(e)}>
                    <label htmlFor="name">{this.state.genreName.touched}</label>
                    <input type="test" name="genre-name" onChange={e=>this.updateGenreName(e.target.value)}></input>

                    <button type="submit">确认</button>
                </form>

            </div>
        )
    };
};

export default AddGenre;