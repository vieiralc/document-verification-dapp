import React, { Component } from 'react';
import Hash from 'object-hash';
import $ from 'jquery';

export default class Form extends Component {

    constructor() {
        super();
        this.state = {
            fileName: null,
            file: null,
            fileHash: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onNameChange(event) { 
        this.setState({fileName: event.target.value});
    }

    onFileChange(event) { 
        this.setState({file: event.target.files[0]});
    }
    
    onSubmit(event) {
        event.preventDefault();

        if (!this.state.file) {
            alert('Please upload a file');
            return;
        }

        $('#myProgress').removeClass('visibility');

        let elem = document.getElementById('myBar');
        let width = 1;
        let id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++; 
                elem.style.width = width + '%'; 
            }
        }

        setTimeout(() => {
            let file = this.state.file
            let reader = new FileReader()

            reader.onload = (event) => {
                let hash = Hash(event.target.result)
                this.setState({fileHash: this.props.web3.utils.fromAscii(hash)})
                $('#fileHash').html(this.state.fileHash.substring(0,40))
                $('#fileName').html(this.state.fileName)
            }

            reader.readAsBinaryString(file)
        }, 2000)
    };
  
    render() {
        return (
            <div className='row justify-content-center'>
                <div className='col-md-8'>

                    <form onSubmit={event => this.onSubmit(event)} id='myForm'>
                        <div className="input-field">
                            <input id="name" type="text" className="validate" onChange={event => this.onNameChange(event)}/>
                            <label htmlFor="name">File Name</label>
                        </div>
                        
                        <div className="file-field input-field"> 
                            <div className="btn">
                                <span>File</span>
                                <input type="file" onChange={event => this.onFileChange(event)}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div> <br/>

                        <div className='visibility' id="myProgress">
                            <div id="myBar"></div>
                        </div><br/>

                        <div className='text-right'>
                            <button className="waves-effect waves-light btn-small" type='submit'> Generate Hash </button><br/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
