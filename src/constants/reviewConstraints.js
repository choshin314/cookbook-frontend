export const REVIEW_CONSTRAINTS = { 
    headline: {
        minChars: 0,
        maxChars: 50
    },
    content: {
        minChars: 0,
        maxChars: 400
    },
    rating: {
        required: true
    },
    reviewImg: {
        size: 1024000,
        type: ["image/jpeg", "image/jpg", "image/png"]
    }
}