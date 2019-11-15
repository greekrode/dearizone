import React, {Component} from 'react'
import './picture.css'
import {connect} from 'react-redux'
import {createItem, deleteItem, readItems, updateItem} from './redux/actions/actions'
import axios from 'axios'
import Gallery from './components/gallery'
import ImageView from './components/imageView'
import Modal from './components/modal'

//main component that wraps major part of application
class Menu2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddForm: false,
            data: [],
            activeID: 0,
            imageView: false
        }
    }

    componentDidMount() {
        // this._loadData('https://api.myjson.com/bins/zygeu')
        this.props.readItems();
    }

    _openImageView(id) {
        console.log(id)
        this.setState({
            activeID: id,
            imageView: true
        })
    }

    _closeImageView() {
        this.setState({
            imageView: false
        })
    }

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

    //function to trigger form rendering
    handleAddClick = () => this.setState({ openAddForm: true });

    //function to handle item addition
    handleAddItem = ({name, message, imageUrl}) => {
        if (name === '') name = 'anon'
        const newItem = {
            name, message, imageUrl
        }

        axios.post('/api/menuItems', { ...newItem }).then(({data : {name}}) => {
            console.log(`${name} message added successfully`)
        }).catch(e => console.log("Addition failed , Error ", e));

        this.props.createItem(newItem);
        this.handleCancel();
    }

    handleCancel = () => this.setState({ openAddForm: false });

    render() {

        return (
            <>
                <div className="wrapper">
                    {
                        this.state.imageView ?
                            ''
                            :
                            <h1>DEAR IZ*ONE</h1>
                    }
                    {
                        this.state.imageView ?
                            <ImageView {...this.props.menuItems[this.state.activeID]}
                                       _closeImageView={this._closeImageView.bind(this)}/>
                            :
                            <Gallery data={this.props.menuItems}
                                     _openImageView={this._openImageView.bind(this)}/>
                    }
                    >
                    {!this.state.openAddForm ? (
                        <>
                            <a href="#" onClick={this.handleAddClick} className="float">
                                <i className="fa fa-plus my-float"/>
                            </a>
                            <div className="label-container">
                                <div className="label-text">Submit</div>
                                <i className="fa fa-play label-arrow"/>
                            </div>
                        </>
                    ) : (
                        <div className="menu"><Modal addItem={this.handleAddItem} closeForm={this.handleCancel}/></div>
                    )
                    }
                    >
                </div>
            </>
        )
    }
}

//subscribing to redux store updates
const mapStateToProps = ({ menuItems, loading, errors }) => ({
    menuItems, loading, errors
})

//connecting our main component to redux store
export default connect(mapStateToProps, {createItem, deleteItem, updateItem, readItems})(Menu2)