import { body } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleError } from "./handle-error.js"

export const loginValidator = [
    body("email", "El email es requerido").notEmpty(),
    body("email", "Este no es un email válido").isEmail(),
    validateField,
    handleError
]