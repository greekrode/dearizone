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
            imageUrl: "",
            password: "",
            error: false,
            helper: "This password will be required when you want to delete your message."
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleCancel = () => this.props.closeForm();

    handleSubmit = () => {
        const {name, message, imageUrl, password} = this.state
        if (password === '') {
            this.setState({
                error: true,
                helper: "Please fill in the password!"
            })
        } else {
            this.props.addItem({name, message, imageUrl, password})
        }
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
                            helperText="Could be your initial. Max. 20 characters"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            color="secondary"
                            autoFocus
                            inputProps={{ maxLength: 20}}
                        />
                        <TextField
                            required
                            name="message"
                            value={this.state.message}
                            onChange={this.handleChange}
                            id="outlined-multiline-static"
                            helperText="Max. 500 characters"
                            label="Message"
                            multiline
                            rows="8"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            color="secondary"
                            inputProps={{ maxLength: 500}}
                        />
                        <TextField
                            name="password"
                            required
                            value={this.state.password}
                            onChange={this.handleChange}
                            id="outlined-required"
                            label="Password"
                            helperText={this.state.helper}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            color="secondary"
                            error={this.state.error}
                        />
                            <TextField
                            name="imageUrl"
                            value={this.state.imageUrl}
                            onChange={this.handleChange}
                            id="outlined-basic"
                            label="Image URL"
                            helperText="Copy your image link here. Make sure you can preview the image URl on your browser."
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