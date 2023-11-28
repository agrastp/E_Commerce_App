const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoints


 // finds all categories including its associated Products
router.get('/', async (req, res) => {
  try { 
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // finds one category by its `id` value including its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

  // created a new category
router.post('/', async (req, res) => {
  try{
    const { category_name } = req.body;
    const newCategory = await Category.create({category_name});
    console.log('Category added successfully:', newCategory);
    res.status(200).json({message: 'Category added successfully', category: newCategory});
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ error: 'Error adding category'});
  }
});

 // updates a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;

    const updatedCategory = await Category.update(updatedData, {
      where: { 
        id: categoryId },
    });

    if (updatedCategory) {
      console.log('Category updated successfully:', updatedCategory);
      res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Error updating category' });
  }
});



 // deletes a category by its `id` value
router.delete('/:id', async (req, res) => {
 try{ 
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that id!' });
      return;
  }
  res.status(200).json(categoryData);
 }catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
