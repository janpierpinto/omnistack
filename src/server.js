const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

/**Utilizando essa configura��o fazemos com que a nossa app,
 * escute requisi��es http e ws;
 */
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
})

/**Conecta o mongoDB coma aplica��o */
mongoose.connect('mongodb+srv://janpier:23032014@cluster0-2w1f0.mongodb.net/omnistack?retryWrites=true', 
{
  useNewUrlParser : true
}
);

/**Declarando uma vari�vel global utilizando middleware */
app.use((req, res, next) => {
  req.io = io;
  return next();// processa o middleware e passa para o restante da aplica��o.
});

/**Como vamos utilizar uma API para outros servi�os
 * utilizamos essa informa��o para informar o formato de dados recebido pelo servidor, sem interface visual.
 */
app.use(express.json());

/**Informa ao servidor que iremos receber arquivos, quando realizarmos upload para o servidor. */
app.use(express.urlencoded({ extended:true }));

/**Informando um novo require informando o arquivo para rotas */

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));


server.listen(3333);