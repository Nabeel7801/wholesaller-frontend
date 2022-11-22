import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useConfirmDialogStore } from 'utils/confirm';

const ConfirmDialog = () => {

    const { message, onSubmit, onCancel } = useConfirmDialogStore();

    return (
        <Dialog open={Boolean(onSubmit)} onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h5">Confirm the action</Typography>
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton onClick={onCancel}>
                    <Close />
                </IconButton>
            </Box>

            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>

            <DialogActions>
                <Button color="info" variant="contained" onClick={onCancel}>
                    Never Mind
                </Button>
                <Button color="primary" variant="contained" onClick={() => { onSubmit && onSubmit(); onCancel() }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
  
export default ConfirmDialog;