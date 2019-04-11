const Box = require('../models/Box');

class BoxController {
  async store (req, res) {
    try {
      const box = await Box.create(req.body);
      return res.json({
        "code": 200,
        "created": "OK",
        "data": box
      });      
    } catch (error) {
        return res.json({
          "code": 501,
          "erro": "Box not create.",
          "details": error
        });
    }
  }
  async show (req, res) {
    try {
      const box = await Box.findById(req.params.id).populate({
        path: "files",
        options: { sort: { createdAt: -1 } }
      });
      return res.json({
        "code": 200,
        "created": "OK",
        "data": box
      });      
    } catch (error) {
        return res.json({
          "code": 501,
          "erro": "Not Box finded",
          "details": error
        });
    }
  }
};

module.exports = new BoxController();
