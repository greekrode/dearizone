import React, {Component} from 'react'
import Image from './image'

export default class ImageView extends Component {
    constructor(props) {
        console.log(props)
        super(props);
    }

    render() {
        return (
            <div className="imageview-wrapper fadeIn">
                <div className="imageview">
                    <Image CSSClass="imageview-image"
                           src={this.props.src}
                           alt={this.props.name} />
                    <div className="imageview-info">
                        <button className="imageview-close" onClick={this.props._closeImageView}>x</button>
                        <h2>{this.props.name}</h2>
                        <p>{this.props.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}