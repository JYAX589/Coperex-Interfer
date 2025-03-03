import { Router } from "express";
import { createCompany, getCompanies, updateCompany, generateReport } from "./company.controller.js";

const router = Router();

router.post('/', createCompany);

router.get('/companies', getCompanies);

router.put('/companies/:id', updateCompany);

// Generar reporte excel
router.get('/report', generateReport);

export default router;