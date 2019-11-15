import React, { Component } from 'react';
import ImageLoader from './imageLoader'
import LazyLoad from 'react-lazy-load'

export default class Image extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <LazyLoad
                debounce={false}
                offsetVertical={250}
            >
                <ImageLoader
                    src={this.props.src}
                    alt={this.props.name}
                    className={this.props.CSSClass}
                />
            </LazyLoad>
        )
    }
}