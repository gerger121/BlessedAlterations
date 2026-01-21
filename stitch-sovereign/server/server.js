import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { body, validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database(join(__dirname, 'blessed_alterations.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    message TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS price_estimates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    service TEXT NOT NULL,
    fabric TEXT NOT NULL,
    options TEXT,
    estimated_price REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Validation rules
const appointmentValidation = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('service').trim().notEmpty().withMessage('Service is required'),
];

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

const estimateValidation = [
  body('service').trim().notEmpty().withMessage('Service is required'),
  body('fabric').trim().notEmpty().withMessage('Fabric is required'),
  body('estimated_price').isNumeric().withMessage('Price must be a number'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ============ APPOINTMENT ROUTES ============

// Create appointment
app.post('/api/appointments', appointmentValidation, handleValidationErrors, (req, res) => {
  try {
    const { first_name, last_name, email, phone, service, message, preferred_date, preferred_time } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO appointments (first_name, last_name, email, phone, service, message, preferred_date, preferred_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(first_name, last_name, email, phone || null, service, message || null, preferred_date || null, preferred_time || null);
    
    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully',
      data: { id: result.lastInsertRowid }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to create appointment' });
  }
});

// Get all appointments (admin)
app.get('/api/appointments', (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM appointments';
    const params = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const appointments = db.prepare(query).all(...params);
    const total = db.prepare('SELECT COUNT(*) as count FROM appointments').get();
    
    res.json({
      success: true,
      data: appointments,
      total: total.count
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
});

// Get single appointment
app.get('/api/appointments/:id', (req, res) => {
  try {
    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    res.json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch appointment' });
  }
});

// Update appointment status
app.patch('/api/appointments/:id', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
    const result = stmt.run(status, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    res.json({ success: true, message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to update appointment' });
  }
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
    const result = stmt.run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to delete appointment' });
  }
});

// ============ CONTACT MESSAGE ROUTES ============

// Create contact message
app.post('/api/contact', contactValidation, handleValidationErrors, (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(name, email, subject || null, message);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { id: result.lastInsertRowid }
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Get all contact messages (admin)
app.get('/api/contact', (req, res) => {
  try {
    const { read, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM contact_messages';
    const params = [];
    
    if (read !== undefined) {
      query += ' WHERE read = ?';
      params.push(parseInt(read));
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const messages = db.prepare(query).all(...params);
    const total = db.prepare('SELECT COUNT(*) as count FROM contact_messages').get();
    const unread = db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE read = 0').get();
    
    res.json({
      success: true,
      data: messages,
      total: total.count,
      unread: unread.count
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// Mark message as read
app.patch('/api/contact/:id/read', (req, res) => {
  try {
    const stmt = db.prepare('UPDATE contact_messages SET read = 1 WHERE id = ?');
    const result = stmt.run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ success: false, message: 'Failed to update message' });
  }
});

// Delete contact message
app.delete('/api/contact/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM contact_messages WHERE id = ?');
    const result = stmt.run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

// ============ PRICE ESTIMATE ROUTES ============

// Save price estimate
app.post('/api/estimates', estimateValidation, handleValidationErrors, (req, res) => {
  try {
    const { email, service, fabric, options, estimated_price } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO price_estimates (email, service, fabric, options, estimated_price)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const optionsJson = options ? JSON.stringify(options) : null;
    const result = stmt.run(email || null, service, fabric, optionsJson, estimated_price);
    
    res.status(201).json({
      success: true,
      message: 'Estimate saved successfully',
      data: { id: result.lastInsertRowid }
    });
  } catch (error) {
    console.error('Error saving estimate:', error);
    res.status(500).json({ success: false, message: 'Failed to save estimate' });
  }
});

// Get pricing data
app.get('/api/pricing', (req, res) => {
  const pricing = {
    services: {
      suit: { name: 'Bespoke Suit', base: 1200 },
      shirt: { name: 'Dress Shirt', base: 250 },
      trousers: { name: 'Trousers', base: 350 },
      alterations: { name: 'Alterations', base: 75 }
    },
    fabrics: {
      standard: { name: 'Standard', multiplier: 1 },
      premium: { name: 'Premium', multiplier: 1.5 },
      luxury: { name: 'Luxury', multiplier: 2.2 }
    },
    options: [
      { id: 'rush', name: 'Rush Service', price: 150 },
      { id: 'monogram', name: 'Monogramming', price: 50 },
      { id: 'lining', name: 'Custom Lining', price: 100 }
    ]
  };
  
  res.json({ success: true, data: pricing });
});

// ============ SERVICES ROUTES ============

// Get all services
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 'bespoke-suits',
      title: 'Bespoke Suits',
      description: 'Handcrafted suits tailored to your exact measurements, style preferences, and lifestyle needs.',
      features: ['Personal consultation', 'Premium fabrics', 'Multiple fittings', 'Lifetime adjustments'],
      startingPrice: 1200
    },
    {
      id: 'bridal-alterations',
      title: 'Bridal Alterations',
      description: 'Expert alterations ensuring your wedding dress fits perfectly for your special day.',
      features: ['Delicate handling', 'Preservation care', 'Rush services', 'Accessory fitting'],
      startingPrice: 200
    },
    {
      id: 'wardrobe-styling',
      title: 'Wardrobe Styling',
      description: 'Complete wardrobe consultation and styling services to elevate your personal brand.',
      features: ['Style assessment', 'Wardrobe audit', 'Shopping guidance', 'Seasonal updates'],
      startingPrice: 300
    }
  ];
  
  res.json({ success: true, data: services });
});

// ============ STATS ROUTES (Admin Dashboard) ============

app.get('/api/stats', (req, res) => {
  try {
    const totalAppointments = db.prepare('SELECT COUNT(*) as count FROM appointments').get();
    const pendingAppointments = db.prepare('SELECT COUNT(*) as count FROM appointments WHERE status = ?').get('pending');
    const confirmedAppointments = db.prepare('SELECT COUNT(*) as count FROM appointments WHERE status = ?').get('confirmed');
    const unreadMessages = db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE read = 0').get();
    const totalEstimates = db.prepare('SELECT COUNT(*) as count FROM price_estimates').get();
    
    // Recent appointments
    const recentAppointments = db.prepare(`
      SELECT * FROM appointments 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();
    
    // Recent messages
    const recentMessages = db.prepare(`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();
    
    res.json({
      success: true,
      data: {
        appointments: {
          total: totalAppointments.count,
          pending: pendingAppointments.count,
          confirmed: confirmedAppointments.count
        },
        messages: {
          unread: unreadMessages.count
        },
        estimates: {
          total: totalEstimates.count
        },
        recent: {
          appointments: recentAppointments,
          messages: recentMessages
        }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Blessed Alterations API is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🧵 Blessed Alterations API running on http://localhost:${PORT}`);
  console.log(`📊 Database initialized at ${join(__dirname, 'blessed_alterations.db')}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  console.log('\n👋 Server shutting down gracefully');
  process.exit(0);
});
