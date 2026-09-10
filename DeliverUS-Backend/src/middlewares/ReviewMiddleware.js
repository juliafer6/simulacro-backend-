import { Review, Order } from '../models/models.js'

const userHasPlacedOrderInRestaurant = async (req, res, next) => {
  try {
    const numberOfOrders = await Order.count({ where: { restaurantId: req.params.restaurantId, userId: req.user.id } })
    if (numberOfOrders !== 0) {
      return next()
    }
    return res.status(409).json({ message: 'User has never placed order in this restaurant' })
  } catch (err) {
    res.status(500).send(err)
  }
}

const checkCustomerHasNotReviewed = async (req, res, next) => {
  try {
    const numReviews = await Review.count({ where: { userId: req.user.id, restaurantId: req.params.restaurantId } })
    if (numReviews === 0) {
      return next()
    }
    return res.status(409).json({ message: 'User has already reviewed this restaurant' })
  } catch (err) {
    res.status(500).send(err)
  }
}

const checkReviewOwnership = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: 'You do not have permission to modify this review.' })
  }
  next()
}

const checkReviewBelongsToRestaurant = async (req, res, next) => {
  const { restaurantId, reviewId } = req.params

  try {
    const review = await Review.findByPk(reviewId)

    // El comparador doble es intencionado por la diferencia de tipo de datos string vs integer
    // eslint-disable-next-line eqeqeq
    if (review.restaurantId != restaurantId) {
      return res.status(409).json({ error: 'Review does not belong to the specified restaurant.' })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { checkCustomerHasNotReviewed, userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant }
