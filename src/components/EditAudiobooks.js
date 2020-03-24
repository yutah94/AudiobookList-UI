import React, { Component } from 'react';
import axios from 'axios';
import { uriBase } from '../consts';

export class EditAudiobooks extends Component {

    constructor(props) {
        super(props);

        this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            book_title: '',
            author: '',
            genre: '',
            completed: false
        }
    }

    componentDidMount() {
        axios.get(`${uriBase}/audiobooks/`+this.props.match.params.id)
            .then(response => {
                this.setState({
                    book_title: response.data.book_title,
                    author: response.data.author,
                    genre: response.data.genre,
                    completed: response.data.completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeBookTitle(e) {
        this.setState({
            book_title: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        });
    }

    onChangeCompleted(e) {
        this.setState({
            completed: !this.state.completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            book_title: this.state.book_title,
            author: this.state.author,
            genre: this.state.genre,
            completed: this.state.completed
        };

        console.log(obj);
        axios.put(`${uriBase}/audiobooks/${this.props.match.params.id}`, obj)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error.res)            
            });
    }

    render() {
        return (
            <div className="container">
                <h3>Edit Audiobook</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Book Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.book_title}
                                onChange={this.onChangeBookTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.author}
                                onChange={this.onChangeAuthor}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genreOptions" 
                                    id="genreSelf-Help" 
                                    value="Self-Help"
                                    checked={this.state.genre==='Self-Help'} 
                                    onChange={this.onChangeGenre}
                                    />
                            <label className="form-check-label">Self-Help</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genreOptions" 
                                    id="genreBiography" 
                                    value="Biography" 
                                    checked={this.state.genre==='Biography'} 
                                    onChange={this.onChangeGenre}
                                    />
                            <label className="form-check-label">Biography</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="GenreOptions" 
                                    id="GenreReligious" 
                                    value="Religious" 
                                    checked={this.state.genre==='Religious'} 
                                    onChange={this.onChangeGenre}
                                    />
                            <label className="form-check-label">Religious</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update AudiobookList" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditAudiobooks;