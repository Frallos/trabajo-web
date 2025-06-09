// auth-backend-api/server.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importa el módulo CORS

const app = express();
const PORT = 3000; // Puerto donde escuchará el backend
const JWT_SECRET = 'your_jwt_secret_key'; // ¡CAMBIA ESTO EN PRODUCCIÓN! Usa una cadena larga y aleatoria.

// Middleware
app.use(cors()); // Habilita CORS para todas las rutas. IMPORTANTE para el frontend.
app.use(express.json()); // Habilita el parsing de JSON para las peticiones entrantes

// Simulación de base de datos en memoria (PARA PRUEBAS SOLAMENTE)
// En un entorno real, esto sería una base de datos como MongoDB, PostgreSQL, etc.
let users = [];

// Ruta de Registro de Usuario
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validación básica de entrada
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Simular que el usuario ya existe
    if (users.find(u => u.username === username || u.email === email)) {
        return res.status(409).json({ message: 'El usuario o email ya está registrado.' });
    }

    try {
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10); // Generar un "salt" (factor aleatorio)
        const hashedPassword = await bcrypt.hash(password, salt); // Hashear la contraseña

        // Guardar el usuario (en la "base de datos" en memoria)
        const newUser = { id: users.length + 1, username, email, password: hashedPassword };
        users.push(newUser);

        console.log('Usuario registrado:', newUser.username, newUser.email);
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Ruta de Inicio de Sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Validación básica de entrada
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son obligatorios.' });
    }

    // Buscar el usuario
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    try {
        // Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Si las credenciales son correctas, generar un JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        console.log(`Login exitoso para: ${username}`);
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Ruta de prueba protegida (requiere token JWT)
// Este es un ejemplo de cómo podrías proteger otras rutas
app.get('/api/protected', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token.' });

    const token = authHeader.split(' ')[1]; // Espera "Bearer TOKEN"
    if (!token) return res.status(401).json({ message: 'Formato de token inválido.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: `Acceso concedido. Usuario: ${decoded.username}` });
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado.' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend de autenticación escuchando en http://localhost:${PORT}`);
});