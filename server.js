
//Arquivo para conexão do banco de dados MySQL
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Configurar CORS para permitir requisições do frontend
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados MySQL
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "91413653",
    database: "netmania"
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error("Erro ao conectar no MySQL:", err);
            setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2s
        } else {
            console.log("Conectado ao MySQL!");
        }
    });

    db.on("error", err => {
        console.error("Erro no MySQL:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Reconectando ao MySQL...");
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Rota para inserir dados no banco
app.post("/salvar", (req, res) => {
    const { cliente, cpf, telefone, indicado, telefone_indicado } = req.body;

    console.log("Dados recebidos no servidor:", req.body); // Log de debug

    if (!cliente || !cpf || !telefone || !indicado || !telefone_indicado) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = "INSERT INTO indiqueganhe (cliente, cpf, telefone, indicado, telefone_indicado) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [cliente, cpf, telefone, indicado, telefone_indicado], (err, result) => {
        if (err) {
            console.error("Erro ao inserir no banco:", err);
            return res.status(500).json({ error: "Erro ao salvar os dados!" });
        }
        res.status(200).json({ message: "Dados salvos com sucesso!" });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
