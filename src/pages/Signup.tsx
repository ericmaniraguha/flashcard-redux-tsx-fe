import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import toast, { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SiGnuprivacyguard } from 'react-icons/si';
import Buttons from '../components/Button';

const CREATE_USER = gql`
  mutation Signup($names: String!, $password: String!, $email: String!) {
    Signup(email: $email, names: $names, password: $password) {
      token
      user {
        names
      }
    }
  }
`;

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [names, setNames] = useState('');
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const onhandChangeNames = (e: any) => {
    setNames(e.target.value);
  };
  const onhandChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      toast.error('Please, add valid credentials!');
    },
    onCompleted: (createUser) => {
      localStorage.setItem('userToken', createUser.Signup.token);
      navigate('/adminpanel');
    },
    variables: {
      names: names,
      password: password,
      email: email,
    },
  });
  const onsubmit = async (e: any) => {
    e.preventDefault();

    if (names === '') {
      toast.error('full name is required');
    } else if (password === '') {
      toast.error('password is required');
    } else if (email === '') {
      toast.error('password is required');
    } else {
      if (!loading) {
        setLoading(true);
        if (await createUser()) {
          setLoading(false);
        }
      }
    }
  };

  function Copyright(props: any) {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        <Toaster />
        {'Copyright © '}
        <Link color='inherit' href='https://flashcardcriminallaw.com/'>
          flashcardcriminallaw.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SiGnuprivacyguard />,
          </Avatar>
          <Typography component='h1' variant='h5'>
            Signup
          </Typography>
          <Box onSubmit={onsubmit} component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='names'
              label='Full Names'
              name='names'
              autoComplete='names'
              autoFocus
              size='small'
              type={'text'}
              value={names}
              onChange={onhandChangeNames}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              size='small'
              type={'email'}
              value={email}
              onChange={onhandChangeEmail}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              id='password'
              size='small'
              autoComplete='current-password'
              type={'password'}
              value={password}
              helperText='Do not share your password'
              onChange={handleChangePassword}
            />

            <Buttons
              value={'Signup'}
              loading={loading}
              sx={{
                mt: 3,
                mb: 2,
                width: {
                  xs: 280,
                  sm: 430,
                },
                height: 50,
                margin: {
                  xs: '2px 5px',
                  sm: '20px 10px',
                },
                backgroundColor: '#000080',
                fontSize: '18px',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#000080',
                },
              }}
            />
            <Grid container>
              <Grid item>
                <Link href='/login' variant='body2'>
                  {'Do you already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
