const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const usersRouter = require('./router/users');
const postsRouter = require('./router/posts');
const commentsRouter = require('./router/comments');
const dotenv = require('dotenv');
const models = require('./models');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

models.sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.HOST_PORT);
  console.log('success');
});
