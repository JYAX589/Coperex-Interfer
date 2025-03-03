import rateLimit from "express-rate-limit";

const reqlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
})

export default reqlimiter;