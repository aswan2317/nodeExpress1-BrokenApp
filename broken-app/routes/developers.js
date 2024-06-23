const express = require('express');
const router = new express.Router();
const db = require('../db');
const ExpressError = require('../expressError');

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const results = await db.query('SELECT id, name, type FROM users');
    return res.json({ users: results.rows });
  } catch (err) {
    return next(err);
  }
});

// POST /users
router.post('/', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const result = await db.query(
      'INSERT INTO users (name, type) VALUES ($1, $2) RETURNING id, name, type',
      [name, type]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// PATCH /users/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const result = await db.query(
      'UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING id, name, type',
      [name, type, req.params.id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError('User not found', 404);
    }
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id=$1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      throw new ExpressError('User not found', 404);
    }
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
