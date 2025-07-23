const express = require('express');
const { body, query, validationResult } = require('express-validator');
const CatalogItem = require('../models/CatalogItem');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all catalog items with filtering, sorting, and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn([
    'stamps', 'first-day-covers', 'postal-stationery', 'commemorative-items',
    'cancellations', 'miniature-sheets', 'souvenir-sheets', 'booklets'
  ]).withMessage('Invalid category'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Minimum price must be non-negative'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Maximum price must be non-negative'),
  query('sortBy').optional().isIn(['name', 'price', 'releaseDate', 'views', 'createdAt']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], optionalAuth, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 20,
      category,
      postalCircle,
      theme,
      minPrice,
      maxPrice,
      releaseYear,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (postalCircle) filter.postalCircle = postalCircle;
    if (theme) filter.theme = theme;
    if (releaseYear) filter.releaseYear = parseInt(releaseYear);
    if (featured === 'true') filter.isFeatured = true;

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [items, totalCount] = await Promise.all([
      CatalogItem.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('name description category postalCircle price images releaseDate isFeatured views rating'),
      CatalogItem.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.json({
      message: 'Catalog items retrieved successfully',
      data: {
        items,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: totalCount,
          itemsPerPage: parseInt(limit),
          hasNextPage,
          hasPrevPage
        },
        filters: {
          category,
          postalCircle,
          theme,
          minPrice,
          maxPrice,
          releaseYear,
          search,
          featured
        }
      }
    });

  } catch (error) {
    console.error('Catalog fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch catalog items',
      error: 'CATALOG_FETCH_ERROR'
    });
  }
});

// Get single catalog item by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const item = await CatalogItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: 'Catalog item not found',
        error: 'ITEM_NOT_FOUND'
      });
    }

    if (!item.isActive) {
      return res.status(404).json({
        message: 'Catalog item not available',
        error: 'ITEM_NOT_AVAILABLE'
      });
    }

    // Increment view count (don't await to avoid slowing response)
    item.incrementViews().catch(err => console.error('View count update error:', err));

    res.json({
      message: 'Catalog item retrieved successfully',
      data: item
    });

  } catch (error) {
    console.error('Catalog item fetch error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid item ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to fetch catalog item',
      error: 'ITEM_FETCH_ERROR'
    });
  }
});

// Get featured items
router.get('/featured/items', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const items = await CatalogItem.find({
      isActive: true,
      isFeatured: true
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('name description category postalCircle price images releaseDate rating');

    res.json({
      message: 'Featured items retrieved successfully',
      data: items
    });

  } catch (error) {
    console.error('Featured items fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch featured items',
      error: 'FEATURED_ITEMS_ERROR'
    });
  }
});

// Get categories with item counts
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await CatalogItem.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      message: 'Categories retrieved successfully',
      data: categories
    });

  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch categories',
      error: 'CATEGORIES_ERROR'
    });
  }
});

// Get postal circles with item counts
router.get('/meta/postal-circles', async (req, res) => {
  try {
    const postalCircles = await CatalogItem.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$postalCircle',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      message: 'Postal circles retrieved successfully',
      data: postalCircles
    });

  } catch (error) {
    console.error('Postal circles fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch postal circles',
      error: 'POSTAL_CIRCLES_ERROR'
    });
  }
});

// Admin routes for managing catalog items

// Create new catalog item (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('name').trim().isLength({ min: 2, max: 200 }).withMessage('Name must be between 2 and 200 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('category').isIn([
    'stamps', 'first-day-covers', 'postal-stationery', 'commemorative-items',
    'cancellations', 'miniature-sheets', 'souvenir-sheets', 'booklets'
  ]).withMessage('Invalid category'),
  body('postalCircle').notEmpty().withMessage('Postal circle is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('releaseDate').isISO8601().withMessage('Invalid release date'),
  body('stock.quantity').isInt({ min: 0 }).withMessage('Stock quantity must be non-negative')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const item = new CatalogItem(req.body);
    await item.save();

    res.status(201).json({
      message: 'Catalog item created successfully',
      data: item
    });

  } catch (error) {
    console.error('Catalog item creation error:', error);
    res.status(500).json({
      message: 'Failed to create catalog item',
      error: 'ITEM_CREATION_ERROR'
    });
  }
});

// Update catalog item (Admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('name').optional().trim().isLength({ min: 2, max: 200 }).withMessage('Name must be between 2 and 200 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('stock.quantity').optional().isInt({ min: 0 }).withMessage('Stock quantity must be non-negative')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const item = await CatalogItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        message: 'Catalog item not found',
        error: 'ITEM_NOT_FOUND'
      });
    }

    res.json({
      message: 'Catalog item updated successfully',
      data: item
    });

  } catch (error) {
    console.error('Catalog item update error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid item ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to update catalog item',
      error: 'ITEM_UPDATE_ERROR'
    });
  }
});

// Delete catalog item (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const item = await CatalogItem.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        message: 'Catalog item not found',
        error: 'ITEM_NOT_FOUND'
      });
    }

    res.json({
      message: 'Catalog item deleted successfully'
    });

  } catch (error) {
    console.error('Catalog item deletion error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid item ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to delete catalog item',
      error: 'ITEM_DELETION_ERROR'
    });
  }
});

module.exports = router;