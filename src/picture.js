import React, {Component} from 'react'
import './picture.css'
import {connect} from 'react-redux'
import {createItem, deleteItem, readItems, updateItem} from './redux/actions/actions'
import axios from 'axios'
import Gallery from './components/gallery'
import ImageView from './components/imageView'
import Modal from './components/modal'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import DeleteModal from './components/deleteModal'
import uuid from 'uuid';

//main component that wraps major part of application
class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddForm: false,
            openDeleteForm: false,
            data: [],
            activeID: 0,
            imageView: false,
            open: false,
            message: "",
            position: 0
        }
    }

    componentDidMount() {
        this.props.readItems();
        window.addEventListener('scroll', this.listenToScroll)
    }

    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const scrolled = winScroll / height

        if (!this.state.imageView) {
            this.setState({
                position: scrolled
            })
        }
    }

    _openImageView(id) {
        this.setState({
            activeID: id,
            imageView: true,
        })
    }

    _closeImageView() {
        this.setState({
            imageView: false
        })
    }

    handleClose = () =>  {
        this.setState({
            open: false
        })
    }

    //function to trigger form rendering
    handleAddClick = () => this.setState({ openAddForm: true });

    //function to handle item addition
    handleAddItem = ({name, message, imageUrl, password}) => {
        if (name === '') name = 'anon'
        if (imageUrl === '') imageUrl = 'https://imgur.com/OvAqP77.jpg'
        const newItem = {
            id: uuid.v4(),
            name, message, imageUrl, password
        }

        axios.post('/api/menuItems', { ...newItem }).then(({data : {name}}) => {
            this.setState({ open: true, message: "Message submitted!" })
        }).catch(e => console.log("Addition failed , Error ", e));

        this.props.createItem(newItem);
        this.handleCancel();
    }

    handleDeleteItem = (id) => {
        axios.delete(`api/menuItems/${id}`).then(() => {
            this.setState({ open: true, message: "Message deleted!" })
        }).catch(e => console.log("Deletion failed, Error ", e));

        this.props.deleteItem(id)
        this.handleCancel();
        this._closeImageView()
    }

    handleDeleteClick = () => {
        this.setState({ openDeleteForm: true });
    }

    handleCancel = () => this.setState({ openAddForm: false, openDeleteForm: false });

    render() {

        return (
            <>
                {
                    this.state.imageView ?
                        ''
                        :
                        <>
                            <h1>DEAR <span style={{color: '#FF4D9D'}}>IZ*ONE</span></h1>
                            <p className="credits">By: <a href="https://twitter.com/GreekGod39">GreekGod39</a></p>
                        </>
                }

                <div className="wrapper">
                    <Gallery data={this.props.menuItems}
                             _openImageView={this._openImageView.bind(this)}/>
                    {
                        this.state.imageView &&
                        <ImageView {...this.props.menuItems[this.state.activeID]}
                                       _closeImageView={this._closeImageView.bind(this)}/>
                    }
                    {!this.state.openAddForm ? (
                        <>
                            {
                                this.state.imageView ?
                                    ''
                                    :
                                    <>
                                        <a href="#" onClick={this.handleAddClick} className="float">
                                            <i className="fa fa-plus my-float"/>
                                        </a>
                                        <div className="label-container">
                                            <div className="label-text">Submit</div>
                                            <i className="fa fa-play label-arrow"/>
                                        </div>
                                    </>
                            }
                        </>
                    ) : (
                        <div className="menu"><Modal addItem={this.handleAddItem} closeForm={this.handleCancel}/></div>
                    )
                    }

                    {!this.state.openDeleteForm ? (
                        <>
                            {
                                this.state.imageView ?
                                    <>
                                        <a href="#" onClick={this.handleDeleteClick} className="float">
                                            <i className="fa fa-trash my-float"/>
                                        </a>
                                        <div className="label-container">
                                            <div className="label-text">Delete</div>
                                            <i className="fa fa-play label-arrow"/>
                                        </div>
                                    </>
                                    :
                                    ''
                            }
                        </>
                    ) : (
                        <div className="menu"><DeleteModal {...this.props.menuItems[this.state.activeID]} deleteItem={this.handleDeleteItem} closeForm={this.handleCancel}/></div>
                    )
                    }

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
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
export default connect(mapStateToProps, {createItem, deleteItem, updateItem, readItems})(Picture)