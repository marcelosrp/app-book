import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = ({ open, severity, message, handleCloseToast }) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleCloseToast}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
            <Alert onClose={handleCloseToast} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast