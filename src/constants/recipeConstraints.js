export const RECIPE_CONSTRAINTS = { 
    title: {
        required: true,
        minChars: 5,
        maxChars: 50
    },
    intro: {
        required: true,
        minChars: 20,
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
        size: 1024000,
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
    tags: null,
    tagDraft: null,
    instructionDraft: null,
    ingredientDraft_qty: null,
    ingredientDraft_unit: null,
    ingredientDraft_content: null
}