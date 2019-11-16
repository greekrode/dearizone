import React, {Component} from 'react'
import Tile from './tile'

export default class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gallery fadeIn">
                {
                    this.props.data.map((data, index) =>
                        <Tile key={index}
                              activeId={index}
                              id={data.id}
                              src={data.imageUrl}
                              name={data.name}
                              _openImageView={this.props._openImageView} />
                    )
                }
            </div>
        )
    }
}