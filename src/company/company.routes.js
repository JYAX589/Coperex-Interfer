import { Router } from "express";
import { createCompany, getCompanies, updateCompany, generateReport } from "./company.controller.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const router = Router();

router.post('/',authenticateAdmin ,createCompany);

router.get('/companies', getCompanies);

router.put('/companies/:id', updateCompany);

// Generar reporte excel
router.get('/report', generateReport);

export default router;