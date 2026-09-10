import { check } from 'express-validator'

const create = [
    check('stars').exists().isInt({ min: 0, max: 5 }).toInt(),
    check('body').optional({ nullable: true, checkFalsy: true }).isString({ min: 1, max: 255 }).trim(),
    check('userId').not().exists(),
    check('restaurantId').not().exists()
]

const update = [
    check('stars').exists().isInt({ min: 0, max: 5 }).toInt(),
    check('body').optional({ nullable: true, checkFalsy: true }).isString({ min: 1, max: 255 }).trim(),
    check('userId').not().exists(),
    check('restaurantId').not().exists()
]

export { create, update }
