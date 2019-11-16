import React, { Component } from 'react';
import './picture.css';
import { connect } from 'react-redux';
import { createItem, deleteItem, updateItem, readItems } from './redux/actions/actions'
import axios from 'axios';
import uuid from 'uuid';
import Gallery from './components/gallery'
import ImageView from './components/imageView'
import Modal from './components/modal'
import Form from './components/form'

//main component that wraps major part of application
class Menu2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddForm: false,
            data: [],
            activeID: 0,
            imageView: false
        };
    }

    componentDidMount() {
        this.props.readItems();
        this._loadData('https://api.myjson.com/bins/zygeu')
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
    handleAddItem = ({ name, price }) => {

        if (name === "") name = "untitled";
        if (price === "") price = 999;

        const newItem = {
            id: uuid.v4(),
            name, price
        }

        axios.post('/api/menuItems', { ...newItem }).then(({data : {name}}) => {
            console.log(`Item - ${name} added successfully`);
        }).catch(e => console.log("Addition failed , Error ", e));

        this.props.createItem(newItem);
        this.handleCancel();
    }

    //function to handle item deletion
    handleDeleteItem = (id) => {

        axios.delete(`/api/menuItems/${id}`).then(({data : {name}}) => {
            console.log(`Item - ${name} deleted successfully`);
        }).catch(e => console.log("Deletion failed, Error ",e));

        this.props.deleteItem(id)
    }

    //function to handle item updates
    handleUpdateItem = (item) => {

        axios.put(`/api/menuItems/${item.id}`,{item}).then( ({data : {name}}) => {
            console.log(`Item - ${name} updated successfully`);
        }).catch(e => console.log('Updation failed, Error ',e));

        this.props.updateItem(item);
    }

    //function to unmount form component or in short close it
    handleCancel = () => this.setState({ openAddForm: false });

    render() {
        const { loading, errors } = this.props;
        const dataExist = this.props.menuItems.length > 0;

        return (
            <>
                <div className="wrapper">
                    {
                        this.state.imageView ?
                            ""
                            :
                            <h1>DEAR IZ*ONE</h1>
                    }
                    {
                        this.state.imageView ?
                            <ImageView {...this.state.data[this.state.activeID]}
                                       _closeImageView={this._closeImageView.bind(this)} />
                            :
                            <Gallery data={this.state.data}
                                     _openImageView={this._openImageView.bind(this)} />
                    }
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
export default connect(mapStateToProps, { createItem, deleteItem, updateItem, readItems })(Menu2);