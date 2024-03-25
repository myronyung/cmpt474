const router = require('express').Router();

router.post("/texts", async (req, res) => {
    try {
      const data = req.body;
      const newTextId = await text.addText(data);
      res.json({ message: `Text added successfully with ID: ${newTextId}` });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding student");
    }
});

module.exports = router;
