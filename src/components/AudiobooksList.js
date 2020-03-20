import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { uriBase } from '../consts';

const Audiobooks = props => (
    <tr>
        <td className={props.audiobooks.completed ? 'completed' : ''}>{props.audiobooks.book_title}</td>
        <td className={props.audiobooks.completed ? 'completed' : ''}>{props.audiobooks.author}</td>
        <td className={props.audiobooks.completed ? 'completed' : ''}>{props.audiobooks.genre}</td>
        <td>
            <Link to={"/edit/"+props.audiobooks._id}>Edit</Link>
        </td>
        <td>
            <button 
                className="remove-btn"
                variant="danger"
                size="sm"
                onClick={(e) => props.deleteAudiobook(props.audiobooks._id)}
                >&times;</button>
        </td>
    </tr>
)

class AudiobooksList extends Component {
    constructor(props) {
        super(props);
        this.state = {audiobooks: []};
        this.audiobookList = this.audiobookList.bind(this);
        this.deleteAudiobook = this.deleteAudiobook.bind(this);
        this.retrieveBooklist = this.retrieveBooklist.bind(this);
    }

    retrieveBooklist() {
        axios.get(`${uriBase}/audiobooks/`)
        .then(response => {
            this.setState({audiobooks: response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    audiobookList() {
        return this.state.audiobooks.map((currentAudiobook, i) => {
            return <Audiobooks audiobooks={currentAudiobook} key={i} deleteAudiobook={this.deleteAudiobook} />
        });
    }

    deleteAudiobook(id) {
        axios.delete(`${uriBase}/audiobooks/${id}`)
        .then(response => {
            this.setState(state => ({
                todos: this.state.audiobooks.filter(audiobooks => audiobooks._id !== id)
            }));
        })
        .then(this.retrieveBooklist())
        .catch(function(error) {
            console.log(error);
        })
    };

    componentDidMount(){
        this.retrieveBooklist();
    }

    render() {
        return (
            <div className="container">
                <h3>Audiobook List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Actions</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.audiobookList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AudiobooksList;