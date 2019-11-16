import React, {Component} from 'react'
import Image from './image'
import Moment from 'react-moment';

export default class ImageView extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.props.handleClickOutside)
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.props.handleClickOutside)
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props._closeImageView();
        }
    }


    render() {
        return (
            <div className="imageview-wrapper fadeIn">
                <div className="imageview" ref={this.setWrapperRef}>
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
        )
    }
}