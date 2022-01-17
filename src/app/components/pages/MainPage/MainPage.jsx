import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/system';

const MainPage = () => {

    return (
        <div>
            <CssBaseline />
            <Container fixed>
                <Card variant="outlined" 
                sx={{ bgcolor: '#ffddc1', height: '95vh'
             }}>
                 <Box m={3}>
                 ”Обмен книгами (буккроссер) становится всё более популярен. Это даёт шанс бумажным книгам продлить свою жизнь, помогает владельцам книг делиться хорошими историями и получать новые впечатления.
Все буккроссеры любят свои книги и любят их читать. Они щедрые, новаторские, дружелюбные, добросердечные, веселые и образованные люди.
Наш сайт предлагает совершить не просто обмен, а добавить к этому увлекательному процессу элемент сюрприза. Подбор книг для обмена будет выполнен по пожеланиям участников, но только при получении книги станет известно, какая именно книга будет радовать своего владельца. Интересно? Тогда начинайте обмен и приглашайте своих друзей поучаствовать! ”
                </Box>
                </Card>
            </Container>
        </div>
    )
}

export default MainPage;