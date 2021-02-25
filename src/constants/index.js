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

export const ACCOUNT_CONSTRAINTS = {
    email: {
        required: true,
        pattern: { 
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            failMsg: "Valid email address required"
        }
    },
    firstName: {
        required: true,
        maxChars: 30
    },
    lastName: {
        required: true,
        maxChars: 30
    },
    username: {
        required: true,
        pattern: {
            regex: /^[a-zA-Z0-9]+$/,
            failMsg: "Username accepts letters and numbers only"
        },
        minChars: 2,
        maxChars: 30
    },
    password: {
        required: true,
        minChars: 8,
        maxChars: 16,
        pattern: {
            regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            failMsg: "Password needs one of each: lowercase, uppercase, number"
        }
    },
    passwordConfirmation: {
        required: true,
        match: 'password'
    },
    bio: {
        minChars: 0,
        maxChars: 140
    },
    profilePic: {
        size: 512000,
        type: ["image/jpeg", "image/jpg", "image/png"]
    }
}

export const SEARCH_LIMIT = 1