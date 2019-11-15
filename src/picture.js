import './picture.css'
import React, { Component } from 'react';
import Gallery from './components/gallery'
import ImageView from './components/imageView'

class Picture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            activeID: 0,
            imageView: false
        }
    }
    componentWillMount() {
        this._loadData('https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rpg-2-data.json')
    }
    componentWillUnmount() {
        this._loadData.abort()
    }
    // Fetch data, then clone it to state using destructuring
    // XHR Fallback
    _loadData(url) {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => this.setState({
                data: [...json.gallery]
            }))
            .catch((err) => {
                console.log(err.message)
                try {
                    const xhr = new XMLHttpRequest()
                    xhr.open('GET', url)
                    xhr.responseType = 'json'

                    xhr.onload = () => {
                        let json = xhr.response
                        this.setState({
                            data: [...json.gallery]
                        })
                    }

                    xhr.onerror = () => {
                        throw new Error('XMLHttpRequest Failed...')
                    }

                    xhr.send()
                } catch (e) {
                    console.log(e.message)
                }
            })
    }
    _openImageView(id) {
        this.setState({
            activeID: id,
            imageView: true
        });
    }
    _closeImageView() {
        this.setState({
            imageView: false
        })
    }
    render() {
        return (
            <div className="wrapper">
                {
                    this.state.imageView ?
                        <ImageView {...this.state.data[this.state.activeID]}
                                   _closeImageView={this._closeImageView.bind(this)} />
                        :
                        <Gallery data={this.state.data}
                                 _openImageView={this._openImageView.bind(this)} />
                }
            </div>
        )
    }
}


// Render app
export default Picture
