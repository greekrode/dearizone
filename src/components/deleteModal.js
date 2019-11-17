import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import React, {Component} from 'react'

export default class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            message: "This password will be required when you want to delete your message.",
            error: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleCancel = () => this.props.closeForm();

    handleSubmit = () => {
        if ( this.props.password !== this.state.password ) {
            this.setState({ error: true, message: "Your password is incorrect!", password: ""})
        } else {
            this.props.deleteItem(this.props.id)
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
                    <DialogTitle id="form-dialog-title">Delete your message</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your password to delete your message
                        </DialogContentText>
                        <form noValidate autoComplete="off">
                            <TextField
                                name="password"
                                required
                                error={this.state.error}
                                value={this.state.password}
                                onChange={this.handleChange}
                                id="outlined-required"
                                label="Password"
                                helperText={this.state.message}
                                margin="normal"
                                variant="outlined"
                                fullWidth={true}
                                color="primary"
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