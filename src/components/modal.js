import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import React, {Component} from 'react'

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
            imageUrl: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleCancel = () => this.props.closeForm();

    handleSubmit = () => {
        const {name, message, imageUrl} = this.state
        this.props.addItem({name, message, imageUrl})
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name] : value });
    }

    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.handleCancel}
                    keepMounted
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Submit your message</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please send your support for IZ*ONE.
                        </DialogContentText>
                        <form noValidate autoComplete="off">
                        <TextField
                            name="name"
                            required
                            value={this.state.name}
                            onChange={this.handleChange}
                            id="outlined-required"
                            label="Name"
                            helperText="Could be your initial"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            color="secondary"
                        />
                        <TextField
                            required
                            name="message"
                            value={this.state.message}
                            onChange={this.handleChange}
                            id="outlined-multiline-static"
                            label="Message"
                            multiline
                            rows="8"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            color="secondary"
                        />
                        <TextField
                            required
                            name="imageUrl"
                            value={this.state.imageUrl}
                            onChange={this.handleChange}
                            id="outlined-required"
                            label="Image URL"
                            helperText="Upload your image to Imgur and paste the image URL here"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            color="secondary"
                        />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="secondary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}