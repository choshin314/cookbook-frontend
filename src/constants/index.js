export const API_BASE = process.env.REACT_APP_API_BASE;

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

export const RECIPE_CONSTRAINTS = { 
    title: {
        required: true,
        minChars: 5,
        maxChars: 50
    },
    intro: {
        required: true,
        minChars: 50,
        maxChars: 400
    },
    servings: {
        required: true
    },
    prepTime: {
        required: true
    },
    cookTime: {
        required: true
    },
    coverImg: {
        required: true,
        size: 5120000,
        type: ["image/jpeg", "image/jpg", "image/png"]
    },
    instructions: {
        required: true,
        minItems: 4,
        maxItems: 30
    },
    ingredients: {
        required: true,
        minItems: 3,
        maxItems: 30
    },
    tags: null
}