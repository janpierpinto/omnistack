const File = require('../models/File');
const Box = require('../models/Box');

class FileController {
  async store (req, res) {
    try {
      const box = await Box.findById(req.params.id);
      const file = await File.create({
        title: req.file.originalname,
        path: req.file.key
      });
  
      box.files.push(file);
      await box.save();

      /**Quando o novo arquivo for enviado para o servidor, todos da sala serão notificados. */
      req.io.sockets.in(box._id).emit('file', file);

      return res.json({
        code: 200,
        storage: "OK",
        data: file
      });      
    } catch (error) {
      return res.json({
        code: 501,
        erro: "Not file storage.",
        details: error
      }); 
    }
  };
};

module.exports = new FileController();
