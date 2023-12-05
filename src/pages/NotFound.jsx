import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function NotFound() {
    return (
        <Stack
        sx={{ width: '100%',
                marginTop: 25,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', }} spacing={5}>
            <Alert severity="error" action={
            <Button href='/login' color="inherit" size="small">
                UNDO
            </Button>
        }>
                <AlertTitle>Error</AlertTitle>
                404 Not Found — <strong>check it out!</strong>
            </Alert>
        </Stack>
    );
}