import express from "express";
import {create,update,read,del,mw,Tablecreation, insertTable, selectId, deleteId}  from "./controller.js";
import bodyParser from 'body-parser';
//exporting router
export const router = express.Router();
router.use(bodyParser.json());
//call getAPI
router.get("/read",mw,read);
//call postAPI
router.post("/create/:id1/:id2",mw,create);
//call putAPI
router.put("/update",mw,update);
//call deleteAPI
router.delete("/delete",mw,del);
//createTable api
router.post("/createtable",Tablecreation);
//insertTable api
router.put("/inserttable",insertTable);
//selectid api
router.get("/select/:id",selectId);
//deleteId api
router.delete("/delete/:id",deleteId);


