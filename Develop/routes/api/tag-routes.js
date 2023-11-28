const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoints

// finds all tags including its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error('Error in router.get:', err);
    res.status(500).json(err);
  }
});

// finds a single tag by its `id` including its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
  });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new tag
router.post('/', async (req, res) => {
  try{
    const { tag_name } = req.body;
    const newTag = await Tag.create({tag_name});
    console.log('Tag added successfully:', newTag);
    res.status(200).json({message: 'Tag added successfully', tag: newTag});
  } catch (err) {
    console.error('Error adding tag:', err);
    res.status(500).json({ error: 'Error adding tag'});
  }
});


// updates a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const updatedData = req.body;

    const updatedTag = await Tag.update(updatedData, {
      where: { 
        id: tagId },
    });

    if (updatedTag) {
      console.log('Tag updated successfully:', updatedTag);
      res.status(200).json({ message: 'Tag updated successfully', tag: updatedTag });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Error updating tag' });
  }
});

// deletes on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{ 
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
        return;
    }
    res.status(200).json(tagData);
   }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
