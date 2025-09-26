const express = require("express");
const { getFirestore } = require("firebase-admin/firestore");
const db = require("../../services/firebaseService.js");
const router = express.Router();

// ========== GET all documents ==========
router.get("/all", async (req, res) => {
  try {
    const collectionName = "Test";
    const snapshot = await db.collection(collectionName).get();

    // Collect documents into an array
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error retrieving documents:", err);
    return res.status(500).send("Error retrieving all documents");
  }
});

// ========== GET one document by ID ==========
router.get("/one/:id", async (req, res) => {
  const collectionName = "Test";
  const { id } = req.params;

  try {
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send(`Document with ID '${id}' not found`);
    }

    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("Error retrieving document:", err);
    return res.status(500).send("Error retrieving the document");
  }
});

// ========== POST new document ==========
router.post("/post", async (req, res) => {
  const collectionName = "Test";
  try {
    const { id, param1, param2, paramN } = req.body;

    // Validate required fields
    if (!id || !param1 || !param2 || !paramN) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the data object
    const data = {
      param1: param1,
      param2: param2,
      paramN: paramN,
    };

    // Save document with specific ID
    await db.collection(collectionName).doc(id).set(data);
    return res.status(201).json({ message: "Document successfully created", id });
  } catch (error) {
    console.error("Error creating document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
