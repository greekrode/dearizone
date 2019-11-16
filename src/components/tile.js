import React, {Component} from 'react'
import Image from './image'

export default class Tile extends Component {
    _handleClick() {
        this.props._openImageView(this.props.activeId)
    }
    render() {
        return (
            <div className="gallery-tile" onClick={this._handleClick.bind(this)}>
                <div className="picture-info">
                    <h2>{this.props.name}</h2>
                    <p>{this.props.message}</p>
                </div>
                <Image
                    CSSClass="tile-image"
                    src={this.props.src}
                    alt={this.props.name} />
            </div>
        )
    }
}

