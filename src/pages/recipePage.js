import styled from 'styled-components'

import {Main, PageTitle, Wrapper} from '../components/commonStyles'
import Ratings from '../components/recipe/ratings'
import AvatarLink from '../components/shared/avatarLink'
import IntroSection from '../components/recipe/introSection'
import IngredientsSection from '../components/recipe/ingredientsSection'
import InstructionsSection from '../components/recipe/instructionsSection'

const dummy = {
    "id": 62,
    "name": "Chilli Stuffed Garlic Bread",
    "slug": "chilli-stuffed-garlic-bread",
    "created_at": 1493235935,
    "servings": 4,
    "total_time_minutes": 10,
    "thumbnail_img": "https://img.buzzfeed.com/video-api-prod/assets/70b9326994b14611b66146d91f41b194/BFV10705_Chilli_Stuffed_Garlic_Bread_THUMB_A.jpg",
    "cover_img": "https://img.buzzfeed.com/video-api-prod/assets/70b9326994b14611b66146d91f41b194/BFV10705_Chilli_Stuffed_Garlic_Bread_THUMB_A.jpg",
    "instructions": [
        {
            "id": 476,
            "display_text": "In a saucepan, cook the onion and 2 garlic cloves in a little oil.",
            "position": 1
        },
        {
            "id": 477,
            "display_text": "After a minute or so, add the minced beef, breaking it up with a spoon.",
            "position": 2
        },
        {
            "id": 478,
            "display_text": "When the mince has browned, stir in the chilli powder, cumin, ground coriander, and the plain flour.",
            "position": 3
        },
        {
            "id": 479,
            "display_text": "Stir in the beef stock, tomatoes, tomato purée, kidney beans, oregano, and salt.",
            "position": 4
        },
        {
            "id": 480,
            "display_text": "Place a bay leaf into the mixture, loosely cover and simmer for 30-45 minutes, stirring occasionally. Allow to cool some so you don’t burn yourself during the next bit!",
            "position": 5
        },
        {
            "id": 481,
            "display_text": "Preheat the oven to 200°C (400°F).",
            "position": 6
        },
        {
            "id": 482,
            "display_text": "Top and tail the baguette, then cut it into 3-4 equal rolls.",
            "position": 7
        },
        {
            "id": 483,
            "display_text": "Hollow out each roll, allowing a thin border of bread around the outside.",
            "position": 8
        },
        {
            "id": 484,
            "display_text": "Stuff each roll with chili using a teaspoon. Try to really fill them up.",
            "position": 9
        },
        {
            "id": 485,
            "display_text": "Make the garlic butter by stirring in 2 cloves of crushed garlic and a handful of parsley into the melted butter.",
            "position": 10
        },
        {
            "id": 486,
            "display_text": "Coat each stuffed roll with a generous helping of garlic butter. Top with a healthy portion of finely grated cheddar.",
            "position": 11
        },
        {
            "id": 488,
            "display_text": "Bake in the centre of the preheated oven for 10-12 minutes, until the cheese is bubbly and melted.",
            "position": 12
        },
        {
            "id": 489,
            "display_text": "Enjoy!",
            "position": 13
        }
    ],
    "ingredients": [
        {
            "id": 694,
            "text": "250 grams lean minced beef",
            "position": 1
        },
        {
            "id": 695,
            "text": "1 onion, chopped",
            "position": 2
        },
        {
            "id": 696,
            "text": "4 cloves of garlic, crushed",
            "position": 3
        },
        {
            "id": 697,
            "text": "1 teaspoon chilli powder (spiciness to your preference)",
            "position": 4
        },
        {
            "id": 698,
            "text": "1 teaspoon ground cumin",
            "position": 5
        },
        {
            "id": 699,
            "text": "1 teaspoon ground coriander",
            "position": 6
        },
        {
            "id": 700,
            "text": "1 tablespoon plain flour",
            "position": 7
        },
        {
            "id": 701,
            "text": "300 millilitres beef stock",
            "position": 8
        },
        {
            "id": 12247,
            "text": "n/a",
            "position": 9
        },
        {
            "id": 703,
            "text": "½ can (about 120 grams when drained) of kidney beans, rinsed and drained",
            "position": 10
        },
        {
            "id": 704,
            "text": "2 tablespoons tomato purée",
            "position": 11
        },
        {
            "id": 705,
            "text": "1 teaspoon dried oregano",
            "position": 12
        },
        {
            "id": 706,
            "text": "½ teaspoon salt",
            "position": 13
        },
        {
            "id": 707,
            "text": "1 bay leaf",
            "position": 14
        },
        {
            "id": 708,
            "text": "1 crusty baguette",
            "position": 15
        },
        {
            "id": 709,
            "text": "50 grams butter, melted",
            "position": 16
        },
        {
            "id": 710,
            "text": "Handful of fresh parsley, roughly chopped",
            "position": 17
        },
        {
            "id": 711,
            "text": "50 grams cheddar, finely grated",
            "position": 18
        }
    ],
    "tags": [
        {
            "id": 64462,
            "name": "comfort_food",
            "display_name": "Comfort Food",
            "type": "dietary"
        },
        {
            "id": 64492,
            "name": "bake",
            "display_name": "Bake",
            "type": "method"
        },
        {
            "id": 65848,
            "name": "stove_top",
            "display_name": "Stove Top",
            "type": "appliance"
        },
        {
            "id": 65856,
            "name": "stuffed",
            "display_name": "Stuffed",
            "type": "dish_style"
        },
        {
            "id": 65846,
            "name": "oven",
            "display_name": "Oven",
            "type": "appliance"
        },
        {
            "id": 64444,
            "name": "american",
            "display_name": "American",
            "type": "cuisine"
        },
        {
            "id": 1247794,
            "name": "wooden_spoon",
            "display_name": "Wooden Spoon",
            "type": "equipment"
        },
        {
            "id": 1247786,
            "name": "sauce_pan",
            "display_name": "Sauce Pan",
            "type": "equipment"
        },
        {
            "id": 1280508,
            "name": "measuring_spoons",
            "display_name": "Measuring Spoons",
            "type": "equipment"
        },
        {
            "id": 1280506,
            "name": "liquid_measuring_cup",
            "display_name": "Liquid Measuring Cup",
            "type": "equipment"
        },
        {
            "id": 1280501,
            "name": "chefs_knife",
            "display_name": "Chef's Knife",
            "type": "equipment"
        },
        {
            "id": 1280503,
            "name": "cutting_board",
            "display_name": "Cutting Board",
            "type": "equipment"
        },
        {
            "id": 1247785,
            "name": "pyrex",
            "display_name": "Pyrex",
            "type": "equipment"
        },
        {
            "id": 1280500,
            "name": "baking_pan",
            "display_name": "Baking Pan",
            "type": "equipment"
        },
        {
            "id": 1247775,
            "name": "oven_mitts",
            "display_name": "Oven Mitts",
            "type": "equipment"
        },
        {
            "id": 64486,
            "name": "dinner",
            "display_name": "Dinner",
            "type": "meal"
        },
        {
            "id": 64505,
            "name": "weeknight",
            "display_name": "Weeknight",
            "type": "occasion"
        },
        {
            "id": 64501,
            "name": "game_day",
            "display_name": "Game Day",
            "type": "occasion"
        }
    ],
    "user_ratings": {
        "count_positive": 124,
        "count_negative": 3,
        "score": 0.9763779528
    },
    "nutrition": {
        "calories": 613,
        "carbohydrates": 67,
        "fat": 23,
        "protein": 31,
        "sugar": 11,
        "fiber": 4
    },
    "creatorId": 10,
    "creatorName": "Bob",
    "creatorProfileImg": "https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg",
    "rating": 2.8718104633498687,
    "reviewCount": 88
}

function RecipePage(props) {
    return (
        <Main>
            <Container>
                <Wrapper as="div">
                    <PageTitle align="left">{dummy.name}</PageTitle>
                    <div className="margin-btm-1">
                        <Ratings rating={4} reviewCount={10} />
                    </div>
                    <div className="margin-btm-1">
                        <AvatarLink userName="asdf"/>
                    </div>
                </Wrapper>
                <IntroSection 
                    coverImg={{ 
                        src: dummy.cover_img, 
                        alt: `${dummy.name} cover image` 
                    }}
                    servings={dummy.servings}
                    prepTime={dummy.total_time_minutes /2}
                    cookTime={dummy.total_time_minutes /2}
                />
                <IngredientsSection 
                    ingredients={dummy.ingredients}
                />
                <InstructionsSection
                    instructions={dummy.instructions}
                />
            </Container>
        </Main>
    )
}

export default RecipePage

const Container = styled.div`
    padding: 2rem 0;
`

const Headline = styled.div`
`


