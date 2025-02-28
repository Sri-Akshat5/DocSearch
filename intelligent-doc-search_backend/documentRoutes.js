const express = require("express");
const multer = require("multer");
const db = require("./db"); 
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("document"), (req, res) => {
  const { name, type, issueDate, idNumber, familyMember } = req.body;
  const filePath = req.file ? req.file.filename : null;

  if (!filePath) {
    return res.status(400).json({ error: "File upload failed!" });
  }

  const sql = "INSERT INTO documents (name, type, issueDate, idNumber, familyMember, filePath) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, type, issueDate, idNumber, familyMember, filePath];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "File uploaded successfully!", id: result.insertId });
  });
});


router.get("/documents", (req, res) => {
  const sql = "SELECT id, name, type, issueDate, idNumber, familyMember, filePath FROM documents";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Search query is required" });
    const words = q.split(" ").filter(word => word.trim() !== "");
    let searchQuery = `SELECT * FROM documents WHERE `;
    const conditions = [];
    const values = [];

    words.forEach(word => {
      conditions.push(
        "(name LIKE ? OR type LIKE ? OR issueDate LIKE ? OR idNumber LIKE ? OR familyMember LIKE ? OR filePath LIKE ?)"
      );
      values.push(`%${word}%`, `%${word}%`, `%${word}%`, `%${word}%`, `%${word}%`, `%${word}%`);
    });

    searchQuery += conditions.join(" OR ");
    const [results] = await db.promise().execute(searchQuery, values);
    res.json(results);

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/documents/:id", (req, res) => {
  const { id } = req.params;

  const getFileQuery = "SELECT filePath FROM documents WHERE id = ?";
  db.query(getFileQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }
    const filePath = `uploads/${results[0].filePath}`;
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr && unlinkErr.code !== "ENOENT") {
        return res.status(500).json({ error: "File deletion failed" });
      }

      const deleteQuery = "DELETE FROM documents WHERE id = ?";
      db.query(deleteQuery, [id], (deleteErr) => {
        if (deleteErr) {
          return res.status(500).json({ error: "Database deletion failed" });
        }
        res.json({ message: "Document deleted successfully" });
      });
    });
  });
});


module.exports = router;
