import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import api from '../../__generated__/api';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { SignInCommand } from '../../__generated__/api-generated';
import { AxiosError, AxiosResponse } from 'axios';
import DynamicIcon from '../../components/DynamicIcon';

const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [, setCookies] = useCookies(['token']);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleSubmit = async () => {
    setIsFetching(true);

    api.authenticate
      .signIn({ email, password } as SignInCommand)
      .then((result: AxiosResponse) => {
        setCookies('token', result.data.result, { sameSite: true, secure: true, path: '/' });
        navigate(location?.state?.from ? location?.state?.from : '/account');
      })
      .catch((error: AxiosError) => console.error(error))
      .finally(() => setIsFetching(false));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <DynamicIcon icon="LockResetIcon" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('authenticate:forgotPasswordTitle')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t('authenticate:email')}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            disabled={isFetching}
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {i18n.t('authenticate:send')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/authenticate/signUp" style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:signUp')}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/authenticate/signIn" style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
