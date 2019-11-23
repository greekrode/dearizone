import React, {Component} from 'react'
import Image from './image'
import Moment from 'react-moment';

export default class ImageView extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false)
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false)
        document.addEventListener("keydown", this.escFunction, false);
    }

    handleClickOutside = (e) => {
        if (!this.imageViewRef.contains(e.target)) {
            this.props._closeImageView();
        }
    }

    escFunction = (e) => {
        if (e.keyCode === 27) {
            this.props._closeImageView();
        }
    }

    render() {
        return (
            <div className="layer">
            <div className="imageview-wrapper fadeIn">
                <div className="imageview" ref={node => this.imageViewRef = node}>
                    <Image CSSClass="imageview-image"
                           src={this.props.imageUrl}
                           alt={this.props.name} />
                    <div className="imageview-info">
                        <button className="imageview-close" onClick={this.props._closeImageView}>x</button>
                        <h2>{this.props.name}</h2>
                        <p>{this.props.message}</p>
                        <p>
                            <Moment format="YYYY/MM/DD HH:mm" local>
                                {this.props.created}
                            </Moment>
                        </p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}