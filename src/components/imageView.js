import React, {Component} from 'react'
import Image from './image'
import Moment from 'react-moment';

export default class ImageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer">
            <div className="imageview-wrapper fadeIn">
                <div className="imageview" >
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