import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';

const app = express();
app.use(express.json());
app.use(routes);
app.set('port',(process.env.PORT || 3333))


app.listen(app.get('port'), () => {
    console.log('server started');
});
