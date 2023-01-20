import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Routes } from 'react-router-dom';
import { OperationsAuth } from './redux/operations';
// import { SelectorsAuth } from './redux/selectors';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(OperationsAuth.fetchUserMe());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
