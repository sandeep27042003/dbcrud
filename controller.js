import { pool } from "./db.js";
import { validator } from "./validation.js";

const values = { id: "", name: "", designation: "" };

// Common error response function
const errorResponse = (res, status, message) => {
    res.status(status).json({ error: true, code: status, msg: message });
};

// Get API function
export const read = (req, res) => {
    try {
        const { name, designation } = req.body;
        res.status(200).json({ msg: `${name} is ${designation}` });
    } catch (e) {
        errorResponse(res, 404, e.message);
    }
};

// Post API function
export const create = (req, res) => {
    try {
        const { id1, id2 } = req.params;
        console.log(req.params);
        res.status(200).json({ msg: `${id1} and ${id2} are created` });
    } catch (e) {
        errorResponse(res, 501, e.message);
    }
};

// Put API function
export const update = (req, res) => {
    try {
        const { name, designation } = req.body;
        values.name = "charlie";
        values.designation = "FSD";
        res.status(200).json({ msg: `Mr${values.name} is ${values.designation} ` });
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};

// Delete API function
export const del = (req, res) => {
    try {
        values.name = "";
        values.designation = "";
        res.status(200).json({ msg: `The data is deleted` });
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};

// Middleware
export const mw = (req, res, next) => {
    try {
        const { id } = req.body;
        if (id == 10) {
            next();
        } else {
            errorResponse(res, 402, `Unauthorized`);
        }
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};

// Function to create a table
export const Tablecreation = async (req, res) => {
    try {
        const createQuery = 'CREATE TABLE IF NOT EXISTS Details(id INTEGER, name VARCHAR(20), work VARCHAR(20))';
        const result = await pool.query(createQuery);
        console.log("Table created", result);
        
        if (result && result.command === 'CREATE') {
            res.status(200).json({ code: 200, data: result, error: false, msg: "Table has been created" });
        } else {
            errorResponse(res, 500, "Table not created");
        }
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};

// Function to insert data into the table
export const insertTable = async (req, res) => {
    try {
        const insertQuery = "INSERT INTO Details VALUES(1, 'charlie', 'FSD'),(2,'Zayn','BD'),(3,'Dualipa','MAD')";
        const result = await pool.query(insertQuery);
        console.log("Result", result);

        if (result && result.command === 'INSERT') {
            res.status(200).json({ code: 200, error: false, data: result, msg: "Data inserted" });
        } else {
            errorResponse(res, 500, "Data not inserted");
        }
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};

// Function to select data by ID
export const selectId = async (req, res) => {
    try {
        const getID = req.params.id;
        const selectedID = `SELECT * FROM Details WHERE id=${getID}`;
        const result = await pool.query(selectedID);
        console.log("Result", result);

        if (result.rows.length !== 0) {
            res.status(200).json({ code: 200, error: false, data: result.rows, msg: "Data found" });
        } else {
            errorResponse(res, 404, "Data not found");
        }
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};

// Function to delete data by ID
export const deleteId = async (req, res) => {
    try {
        const getID = req.params.id;
        const deleteID = `DELETE FROM Details WHERE id=${getID}`;
        const result = await pool.query(deleteID);
        console.log("Result of deletion", result);

        if (result && result.command === 'DELETE' && result.rowCount > 0) {
            res.status(200).json({ code: 200, error: false, msg: "Data deleted" });
        } else {
            errorResponse(res, 404, "Data not found");
        }
    } catch (e) {
        errorResponse(res, 500, e.message);
    }
};
