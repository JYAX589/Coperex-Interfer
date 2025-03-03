import Company from './company.model.js';
import ExcelJS from 'exceljs';


export const createCompany = async (req, res) =>{
    try {

        const data = req.body

        const company = new Company({
            name: data.name,
            impactLevel: data.impactLevel,
            yearTrajectory: data.yearTrajectory,
            category: data.category
        })

        await company.save();

        res.status(201).json({
            message: 'Company created successfully',
            company
        })
      
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true });

        res.json({
            message: 'Company updated successfully',
            company: updatedCompany
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error
        });
    }
};


export const getCompanies = async (req, res) => {
    try {
        const { filter, sort, order } = req.query;

        let query = {};
        if (filter) {
            query = { category: filter };
        }

        let sortOrder = {};
        if (sort && order) {
            sortOrder[sort] = order === 'asc' ? 1 : -1;
        }

        const companies = await Company.find(query).sort(sortOrder);

        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateReport = async (req, res) => {
    try {
        const companies = await Company.find({});

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Empresas');

        worksheet.columns = [
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
            { header: 'Años de Trayectoria', key: 'yearTrajectory', width: 20 },
            { header: 'Categoría', key: 'category', width: 20 }
        ];

        companies.forEach(company => {
            worksheet.addRow(company);
        });

        // Configura la respuesta para descargar el archivo Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_empresas.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

