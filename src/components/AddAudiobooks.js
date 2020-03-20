import React, { Component } from 'react';
import axios from 'axios';
import { uriBase } from '../consts';

export class AddAudiobooks extends Component {
    constructor(props) {
        super(props);

        this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            book_title: '',
            author: '',
            genre: '',
            completed: false
        }
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

    onSubmit(e) {
        e.preventDefault();

        //submit logic
        console.log(`Form submitted: `);
        console.log(`Book Title: ${this.state.book_title}`);
        console.log(`Author: ${this.state.author}`);
        console.log(`Genre: ${this.state.genre}`);
        console.log(`Completed: ${this.state.completed}`);

        const newAudiobook = {
            book_title: this.state.book_title,
            author: this.state.author,
            genre: this.state.genre,
            completed: this.state.completed
        }

        axios.post(`${uriBase}/audiobooks/add`, newAudiobook)
        .then(res => console.log(res.data));

        this.setState({
            book_title: '',
            author: '',
            genre: '',
            completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}} className="container">
                <h3>Add New Audiobook</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Book Title: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.book_title}
                                onChange={this.onChangeBookTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.author}
                                onChange={this.onChangeAuthor}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
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
                            <input className="form-check-input"
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
                            <input className="form-check-input"
                                   type="radio"
                                   name="genreOptions"
                                   id="genreReligious"
                                   value="Religious"
                                   checked={this.state.genre==='Religious'}
                                   onChange={this.onChangeGenre}
                                   />
                                <label className="form-check-label">Religious</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Audiobook" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddAudiobooks;
