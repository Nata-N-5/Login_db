const express = require("express");
const SqlService = require("../../services/sqlService");

const router = express.Router();


// ========== POST entry to table ==========

//Register
router.post('/post-user', async (req, res) => { // pongo nombre y le digo que hace con .post
  const {name, password } = req.body;  
  if (!name || !password ) {
    return res.status(400).send("Missing fields."); //llego completo? si no
  }

  const db = new SqlService();
  try { //Trate de hacer esto
    await db.connectToDb(); //1, conectese a la base de datos
    await db.query(
      `INSERT INTO user (name, password) VALUES (?, ?)`, // valores
      [name , password]
    );
    res.status(200).send("✅ cuenta creada");
  } catch (err) { //Si hay un error haga esto
    console.error("SQL error:", err);
    //res.status(500).send("Error creating entry.");
    if (err.code === 'ER_DUP_ENTRY') { //El  ER_DUP_ENTRY (1062) es exclusivo de MySQL y aparece cuando Intentas insertar (o actualizar) un valor duplicado en una columna que tiene una restricción UNIQUE
      res.status(409).send("El nombre de usuario ya está en uso.");
    } else {
      res.status(500).send("Error al crear el usuario.");
    }


  } finally { //Si al final hay error o no haga esto
    await db.closeConnection();
  }
});


///login
router.post('/login-user', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send("Missing fields.");
  }

  const db = new SqlService();
  try {
    await db.connectToDb();
    const result = await db.query(
      `SELECT * FROM user WHERE name = ? AND  password = ?`,
      [name, password]
    );

    if (result.length > 0) {
      res.status(200).send("✅ Login exitoso ");
    } else {
      res.status(401).send("❌ Usuario o contraseña incorrectos");
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error en el servidor.");
  } finally {
    await db.closeConnection();
  }
});

module.exports = router; 
