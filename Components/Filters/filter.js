import nlp from "compromise";
import { filterSlang } from "./filterSlang";

export const filterFunction = (inputText, filterType, filterFrequency) => {                                                                      
    if (filterType === 'past') {
        return filterSlang(convertToPastTense(inputText)); 
    }
    if (filterType === 'third_person_past') {
        return filterSlang(convertToThirdPersonPastTense(inputText));
    }
    if (filterType === 'future') {
        return filterSlang(convertToFutureTense(inputText));
    }
    if (filterType === 'third_person_future') {
        return filterSlang(convertToThirdPersonFutureTense(inputText));
    }
    if (filterType === 'emoji') {
        return filterSlang(convertToEmojis(inputText));
    }
    if (filterType === 'nuke') {
        return filterSlang(nuke(inputText, filterFrequency));
    }
    if (filterType === 'president') {
        return filterSlang(president(inputText, filterFrequency));
    }
    if (filterType === 'confess_propose') {
        return filterSlang(proposeOrConfess(inputText, filterFrequency));
    }
    if (filterType === 'tariff') {
        return filterSlang(tariff(inputText, filterFrequency));
    }
    if (filterType === 'boss') {
        return filterSlang(bossFilter(inputText, filterFrequency));
    }
    if (filterType === 'rich_memes') {
        return filterSlang(richMemes(inputText, filterFrequency));
    }
    if (filterType === 'poor_memes') {
        return filterSlang(poorMemes(inputText, filterFrequency));
    }
    if (filterType === 'top_g_memes') {
        return filterSlang(topGMemes(inputText, filterFrequency));
    }
    if (filterType === 'gift') {
        return filterSlang(giftMemes(inputText, filterFrequency));
    }
    if (filterType === 'breakup') {
        return filterSlang(breakupMemes(inputText, filterFrequency));
    }
    if (filterType === 'marriage') {
        return filterSlang(marriageMemes(inputText, filterFrequency));
    }
    if (filterType === 'sad') {
        return filterSlang(sadMemes(inputText, filterFrequency));
    }
    if (filterType === 'nine_to_five') {
        return filterSlang(nineToFiveMemes(inputText, filterFrequency));
    }
    if (filterType === 'bottom_g_memes') {
        return filterSlang(bottomGMemes(inputText, filterFrequency));
    }
    if (filterType === 'workout_memes') {
        return filterSlang(workoutMemes(inputText, filterFrequency));
    }
    if (filterType === 'elon_memes') {
        return filterSlang(elonMemes(inputText, filterFrequency));
    }
    // Return inputText unchanged if no valid filterType matches
    return filterSlang(inputText);
};

// third person past tense starts
const convertToThirdPersonPastTense = (inputText) => {
    const pronounMap = {
        'I': 'The Writer',
        'my': 'his/her',
        'we': 'they',
        'you': 'he/she/they',
        'our': 'their',
        'me': 'him/her',
        'us': 'them',
    };

    // Replace pronouns manually
    let modifiedText = inputText.replace(/\b(I|my|we|you|our|me|us)\b/g, (match) => {
        return pronounMap[match] || match;
    });

    // Use Compromise.js only for verb tense conversion
    const doc = nlp(modifiedText);
    doc.verbs().toPastTense();

    return doc.out();
};




// third person past tense ends
// past tense starts
// Function to convert present tense text to past tense
const convertToPastTense = (inputText) => {
    // Common irregular verbs and their past tense forms
    let doc = nlp(inputText);
    // Step 3: Convert verbs to future tense using Compromise.js built-in methods
    doc.verbs().toPastTense();

    // Step 4: Return the transformed text, while handling HTML tags with spaces
    return doc.out();
};
// past tense ends
// future tense starts
export const convertToFutureTense = (inputText) => {
    let doc = nlp(inputText);
    // Step 3: Convert verbs to future tense using Compromise.js built-in methods
    doc.verbs().toFutureTense();

    // Step 4: Return the transformed text, while handling HTML tags with spaces
    return doc.out();
};
// future tense ends

// third person future tense starts
const convertToThirdPersonFutureTense = (inputText) => {
    // Step 1: Parse the input text using Compromise.js
    // inputText = inputText.replace(/(>)(\w)/g, "$1 $2");
    let doc = nlp(inputText);

    // Step 2: Replace first-person and second-person pronouns with third-person equivalents
    doc.match('I').replaceWith('The Writer');
    doc.match('my').replaceWith('his/her');
    doc.match('we').replaceWith('they');
    doc.match('you').replaceWith('he/she/they');
    doc.match('our').replaceWith('their');
    doc.match('me').replaceWith('him/her');
    doc.match('us').replaceWith('them');

    // Step 3: Convert verbs to future tense using Compromise.js built-in methods
    doc.verbs().toFutureTense();

    // Step 4: Return the transformed text, while handling HTML tags with spaces
    return doc.out();
};

// third person future tense ends

// emoji starts
const convertToEmojis = (inputText) => {
    // Mapping of words to their respective emojis
      const emojiMap = {
        "smile": "😊", "laugh": "😂", "cry": "😭", "crying": "😭", "angry": "😠", "happy": "😀", "sad": "😞", "beautiful": "🌹💖🌸🌺",
        "rose": "🌹", "love": "❤️", "kiss": "😘", "hug": "🤗", "surprise": "😲", "shy": "😊", "cool": "😎", "cherry blossom": "🌸",
        "sleep": "😴", "nervous": "😬","confused": "😕", "thinking": "🤔","heart": "❤️","thumbs up": "👍","like": "👍", "hibiscus": "🌺",
        "clap": "👏", "run": "🏃","walk": "🚶","dance": "💃","swim": "🏊","play": "🎮","read": "📖", "sunflower": "🌻", "bouquet": "💐",
        "write": "✍️","sing": "🎤","drink": "🍷","eat": "🍔","sleep": "🛏️","party": "🎉","partying face": "🥳", "tulip": "🌷",
        "moon": "🌙","star": "⭐","fire": "🔥","water": "💧","tree": "🌳","flower": "🌸", "herb": "🌿", "leaf fluttering": "🍃", "cactus": "🌵",
        "flowers": "🌸","bird": "🐦","cat": "🐱","dog": "🐶","fish": "🐟","car": "🚗","bus": "🚌","bike": "🚲","train": "🚆","plane": "✈️",
        "boat": "🚤","rocket": "🚀","house": "🏠","school": "🏫","beach": "🏖️","mountain": "🏔️","phone": "📱", "palm tree": "🌴",
        "laptop": "💻","camera": "📷","tv": "📺","clock": "⏰","gift": "🎁","lock": "🔒","key": "🔑",
        "rain": "🌧️","snow": "❄️","leaf": "🍃","football": "⚽","basketball": "🏀","baseball": "⚾",
        "volleyball": "🏐","cricket": "🏏","tennis": "🎾","rugby": "🏉","video game": "🎮","game": "🎮",
        "games": "🎮","controller": "🎮","controlles": "🎮","travel": "✈️","planet": "🌍","earth": "🌍",
        "forest": "🌲","workout": "🏋️","work out": "🏋️","work": "💼","run": "🏃🏃‍♀️","running": "🏃🏃‍♀️","marry": "💑❤️",
        "jesus": "✝️❤️","christan": "🎄❄️🎅","family": "👩‍👧‍👦👩‍👧‍👧👪","father": "👨","mother": "👩",
        "baby": "👶👧","angel": "👼","wing": "🪽","snake": "🐍","tiger": "🐯","lion": "🦁",
        "gun": "🔫","tired": "😫","bikini": "👙","punch": "👊","raised hand": "🙋‍♂️🙋‍♀️","chat": "💬","message": "💬",
        "listen": "👂","fly": "🛩","christmas": "❄️🎁🔔☃🎅","santa claus": "🎅","santa": "🎅",
        "ribbon": "🎀","dancing": "💃","cheers": "🥂","drunk": "🍻🍺🍷","stop": "⛔🚫✋","GOAT": "🐐",
        "goat": "🐐","king": "👑","queen": "👑","chess": "♟️", "park": "🏞️", "enjoy": "😄💃🕺🎉🧉🍻",
        // Fruits
        "apple": "🍎","green apple": "🍏",
        "banana": "🍌","grapes": "🍇","watermelon": "🍉","strawberry": "🍓","pineapple": "🍍","lemon": "🍋","cherry": "🍒","peach": "🍑",
        "pear": "🍐","mango": "🥭","blueberries": "🫐","kiwi": "🥝","coconut": "🥥",
        // Vegetables
        "tomato": "🍅","eggplant": "🍆","avocado": "🥑","broccoli": "🥦", "carrot": "🥕", "corn": "🌽", "cucumber": "🥒", "garlic": "🧄", "onion": "🧅", "potato": "🥔",
        "sweet potato": "🍠","mushroom": "🍄","lettuce": "🥬","pepper": "🌶️","pumpkin": "🎃",
        // Fast food and Snacks
        "hamburger": "🍔","burger": "🍔","fries": "🍟","hot dog": "🌭","pizza": "🍕","sandwich": "🥪",
        "taco": "🌮","burrito": "🌯","popcorn": "🍿","chicken": "🍗","drumstick": "🍗","sushi": "🍣",
        "bento": "🍱", "ramen": "🍜","spaghetti": "🍝","salad": "🥗","nachos": "🧀","steak": "🥩",
        "meat": "🍖", "kebab": "🥙", "falafel": "🧆", "cheese": "🧀", "shopping" : "🛍", "market": "🏪",
        // Desserts
        "cake": "🍰","cupcake": "🧁","chocolate": "🍫","ice cream": "🍨","cookie": "🍪","donut": "🍩","pancakes": "🥞",
        "waffle": "🧇",

        // Drinks
        "coffee": "☕","tea": "🍵","beer": "🍺", "wine": "🍷","champagne": "🍾","whiskey": "🥃","cocktail": "🍸",
        "milk": "🥛","milkshake": "🥤","smoothie": "🥤","water": "💧","juice": "🧃","soda": "🥤",

        // Miscellaneous
        "bread": "🍞","baguette": "🥖","croissant": "🥐","rice": "🍚","bowl": "🥣","honey": "🍯","butter": "🧈",
        "salt": "🧂","egg": "🥚","bacon": "🥓","shrimp": "🍤","lobster": "🦞", "crab": "🦀", "fish": "🐟", "octopus": "🐙",
        
        // Country names and their corresponding demonyms with emojis
        "afghanistan": "🇦🇫","afghan": "🇦🇫","albania": "🇦🇱","albanian": "🇦🇱","algeria": "🇩🇿","algerian": "🇩🇿",
        "andorra": "🇦🇩","andorran": "🇦🇩","angola": "🇦🇴","angolan": "🇦🇴","argentina": "🇦🇷","argentine": "🇦🇷",
        "armenia": "🇦🇲","armenian": "🇦🇲","australia": "🇦🇺","australian": "🇦🇺","austria": "🇦🇹","austrian": "🇦🇹",
        "azerbaijan": "🇦🇿","azerbaijani": "🇦🇿","bahamas": "🇧🇸","bahamian": "🇧🇸","bahrain": "🇧🇭",
        "bahraini": "🇧🇭", "bangladesh": "🇧🇩","bangladeshi": "🇧🇩","barbados": "🇧🇧","barbadian": "🇧🇧",
        "belarus": "🇧🇾","belarusian": "🇧🇾","belgium": "🇧🇪","belgian": "🇧🇪","belize": "🇧🇿","belizean": "🇧🇿","benin": "🇧🇯",
        "beninese": "🇧🇯","bhutan": "🇧🇹","bhutanese": "🇧🇹","bolivia": "🇧🇴","bolivian": "🇧🇴","bosnia": "🇧🇦",
        "bosnian": "🇧🇦","botswana": "🇧🇼","botswanan": "🇧🇼","brazil": "🇧🇷","brazilian": "🇧🇷","brunei": "🇧🇳",
        "bruneian": "🇧🇳","bulgaria": "🇧🇬","bulgarian": "🇧🇬","burkina faso": "🇧🇫","burkinabe": "🇧🇫","burundi": "🇧🇮","burundian": "🇧🇮",
        "cambodia": "🇰🇭","cambodian": "🇰🇭","cameroon": "🇨🇲","cameroonian": "🇨🇲",
        "canada": "🇨🇦","canadian": "🇨🇦","chile": "🇨🇱","chilean": "🇨🇱","china": "🇨🇳","chinese": "🇨🇳","colombia": "🇨🇴",
        "colombian": "🇨🇴","congo": "🇨🇬","congolese": "🇨🇬","costa rica": "🇨🇷","costa rican": "🇨🇷",
        "croatia": "🇭🇷","croatian": "🇭🇷","cuba": "🇨🇺","cuban": "🇨🇺","cyprus": "🇨🇾",
        "cypriot": "🇨🇾","czech republic": "🇨🇿","czech": "🇨🇿","denmark": "🇩🇰","danish": "🇩🇰","djibouti": "🇩🇯","djiboutian": "🇩🇯",
        "dominican republic": "🇩🇴","dominican": "🇩🇴","ecuador": "🇪🇨","ecuadorian": "🇪🇨",
        "egypt": "🇪🇬","egyptian": "🇪🇬","el salvador": "🇸🇻","salvadoran": "🇸🇻","estonia": "🇪🇪","estonian": "🇪🇪",
        "ethiopia": "🇪🇹","ethiopian": "🇪🇹","fiji": "🇫🇯","fijian": "🇫🇯","finland": "🇫🇮","finnish": "🇫🇮","france": "🇫🇷","french": "🇫🇷",
        "gabon": "🇬🇦","gabonese": "🇬🇦","gambia": "🇬🇲","gambian": "🇬🇲","georgia": "🇬🇪","georgian": "🇬🇪",
        "germany": "🇩🇪","german": "🇩🇪","ghana": "🇬🇭","ghanaian": "🇬🇭","greece": "🇬🇷","greek": "🇬🇷",
        "grenada": "🇬🇩","grenadian": "🇬🇩","guatemala": "🇬🇹","guatemalan": "🇬🇹","guinea": "🇬🇳","guinean": "🇬🇳","haiti": "🇭🇹",
        "haitian": "🇭🇹","honduras": "🇭🇳","honduran": "🇭🇳","hungary": "🇭🇺","hungarian": "🇭🇺","iceland": "🇮🇸","icelandic": "🇮🇸",
        "india": "🇮🇳","indian": "🇮🇳","indonesia": "🇮🇩","indonesian": "🇮🇩","iran": "🇮🇷","iranian": "🇮🇷",
        "iraq": "🇮🇶","iraqi": "🇮🇶","ireland": "🇮🇪","irish": "🇮🇪","israel": "🇮🇱","israeli": "🇮🇱",
        "italy": "🇮🇹","italian": "🇮🇹","jamaica": "🇯🇲","jamaican": "🇯🇲","japan": "🇯🇵","japanese": "🇯🇵","jordan": "🇯🇴",
        "jordanian": "🇯🇴","kazakhstan": "🇰🇿","kazakh": "🇰🇿","kenya": "🇰🇪","kenyan": "🇰🇪","kuwait": "🇰🇼","kuwaiti": "🇰🇼",
        "kyrgyzstan": "🇰🇬","kyrgyz": "🇰🇬","laos": "🇱🇦","laotian": "🇱🇦","latvia": "🇱🇻","latvian": "🇱🇻",
        "lebanon": "🇱🇧","lebanese": "🇱🇧","lesotho": "🇱🇸","mosotho": "🇱🇸","libya": "🇱🇾","libyan": "🇱🇾",
        "lithuania": "🇱🇹","lithuanian": "🇱🇹","luxembourg": "🇱🇺","luxembourgish": "🇱🇺","madagascar": "🇲🇬",
        "malagasy": "🇲🇬","malawi": "🇲🇼","malawian": "🇲🇼","malaysia": "🇲🇾","malaysian": "🇲🇾","malta": "🇲🇹","maltese": "🇲🇹",
        "mexico": "🇲🇽","mexican": "🇲🇽","mongolia": "🇲🇳","mongolian": "🇲🇳","morocco": "🇲🇦","moroccan": "🇲🇦","myanmar": "🇲🇲",
        "burmese": "🇲🇲","nepal": "🇳🇵","nepali": "🇳🇵", "netherlands": "🇳🇱","dutch": "🇳🇱","new zealand": "🇳🇿","new zealander": "🇳🇿",
        "nigeria": "🇳🇬","nigerian": "🇳🇬","north korea": "🇰🇵","north korean": "🇰🇵","norway": "🇳🇴",
        "norwegian": "🇳🇴", "oman": "🇴🇲","omani": "🇴🇲","pakistan": "🇵🇰","pakistani": "🇵🇰","palestine": "🇵🇸",
        "palestinian": "🇵🇸","panama": "🇵🇦","panamanian": "🇵🇦","peru": "🇵🇪","peruvian": "🇵🇪","philippines": "🇵🇭","filipino": "🇵🇭",
        "poland": "🇵🇱","polish": "🇵🇱","portugal": "🇵🇹","portuguese": "🇵🇹","qatar": "🇶🇦","qatari": "🇶🇦","romania": "🇷🇴",
        "romanian": "🇷🇴","russia": "🇷🇺","russian": "🇷🇺","rwanda": "🇷🇼","rwandan": "🇷🇼","saudi arabia": "🇸🇦",
        "saudi": "🇸🇦","senegal": "🇸🇳","senegalese": "🇸🇳","serbia": "🇷🇸","serbian": "🇷🇸","singapore": "🇸🇬",
        "singaporean": "🇸🇬","slovakia": "🇸🇰","slovak": "🇸🇰","slovenia": "🇸🇮","slovenian": "🇸🇮","somalia": "🇸🇴",
        "somali": "🇸🇴","south africa": "🇿🇦","south african": "🇿🇦","south korea": "🇰🇷","south korean": "🇰🇷","spain": "🇪🇸",
        "spanish": "🇪🇸","sri lanka": "🇱🇰","sri lankan": "🇱🇰","sudan": "🇸🇩","sudanese": "🇸🇩","sweden": "🇸🇪","swedish": "🇸🇪","switzerland": "🇨🇭",
        "swiss": "🇨🇭","syria": "🇸🇾","syrian": "🇸🇾","taiwan": "🇹🇼","taiwanese": "🇹🇼","tajikistan": "🇹🇯",
        "tajik": "🇹🇯","tanzania": "🇹🇿","tanzanian": "🇹🇿","thailand": "🇹🇭","thai": "🇹🇭","tunisia": "🇹🇳",
        "tunisian": "🇹🇳","turkey": "🇹🇷","turkish": "🇹🇷","turkmenistan": "🇹🇲","turkmen": "🇹🇲","uganda": "🇺🇬",
        "ugandan": "🇺🇬","ukraine": "🇺🇦","ukrainian": "🇺🇦","united arab emirates": "🇦🇪","emirati": "🇦🇪",
        "united kingdom": "🇬🇧","british": "🇬🇧","united states": "🇺🇸","american": "🇺🇸","uruguay": "🇺🇾","uruguayan": "🇺🇾","uzbekistan": "🇺🇿",
        "uzbek": "🇺🇿","vietnam": "🇻🇳","vietnamese": "🇻🇳","yemen": "🇾🇪","yemeni": "🇾🇪","zambia": "🇿🇲",
        "zambian": "🇿🇲","zimbabwe": "🇿🇼","zimbabwean": "🇿🇼",
        // Ball Sports
        "football": "⚽","soccer": "⚽", "basketball": "🏀","baseball": "⚾","volleyball": "🏐","tennis": "🎾","cricket": "🏏",
        "rugby": "🏉","golf": "⛳","ping pong": "🏓","table tennis": "🏓","badminton": "🏸","hockey": "🏒",
        "field hockey": "🏑","ice hockey": "🏒","softball": "🥎",
        // Athletics
        "running": "🏃","sprinting": "🏃","marathon": "🏃","jogging": "🏃‍♀️","race": "🏁","high jump": "🥇",
        "long jump": "🥇","pole vault": "🥇","shot put": "🥇",
        // Water Sports
        "swimming": "🏊","diving": "🤿","water polo": "🤽","surfing": "🏄","kayaking": "🛶","rowing": "🚣",
        "sailing": "⛵",
        // Winter Sports
        "skiing": "⛷️", "snowboarding": "🏂","ice skating": "⛸️","figure skating": "⛸️","sledding": "🛷","bobsleigh": "🏋️‍♀️",
        "curling": "🥌",
        // Combat Sports
        "boxing": "🥊", "wrestling": "🤼",
        "judo": "🥋","karate": "🥋","taekwondo": "🥋","fencing": "🤺","mma": "🥊",
        // Other Sports
        "gymnastics": "🤸","weightlifting": "🏋️","archery": "🏹","cycling": "🚴","mountain biking": "🚵","skateboarding": "🛹",
        "horse racing": "🏇","equestrian": "🏇","fishing": "🎣","shooting": "🔫",
        "bowling": "🎳","darts": "🎯","snooker": "🎱","billiards": "🎱","pool": "🎱","chess": "♟️",
        "esports": "🎮","video game": "🎮","drone racing": "🚁","paragliding": "🪂","skydiving": "🪂","skate": "🛼",
        "roller skating": "🛼",
        // Add more countries and demonyms as needed
                // Planets
        "planet": "🪐","mercury": "☿️","venus": "♀️","earth": "🌍",  // can also use 🌎 or 🌏
        "mars": "♂️","jupiter": "♃","saturn": "♄","uranus": "♅","neptune": "♆","pluto": "🪐",  // Even though Pluto isn't officially a planet anymore
        // Dwarf Planets
        "ceres": "🪐","haumea": "🪐","makemake": "🪐","eris": "🪐",
        // Moons
        "moon": "🌕",  // Full moon
        "new moon": "🌑","waxing crescent moon": "🌒", "first quarter moon": "🌓",
        "waxing gibbous moon": "🌔","full moon": "🌕","waning gibbous moon": "🌖","last quarter moon": "🌗","waning crescent moon": "🌘",
        "crescent moon": "🌙","new moon with face": "🌚","full moon with face": "🌝","first quarter moon with face": "🌛","last quarter moon with face": "🌜",
        // Suns
        "sun": "☀️","sun with face": "🌞", "sunrise": "🌅","sunset": "🌇","dawn": "🌄","dusk": "🌆","eclipse": "🌘",
        "solar eclipse": "🌞🌚","sunny": "🌞",
        // Stars
        "star": "⭐","shooting star": "🌠","glowing star": "🌟","milky way": "🌌","constellation": "✨",
        "comet": "☄️",
        // Space Objects
        "asteroid": "☄️","black hole": "🕳️","meteor": "☄️","spaceship": "🚀","telescope": "🔭","satellite": "🛰️",
                // Smiley Faces
        "smile": "😊","grinning": "😀","grin": "😁","laugh": "😂","rofl": "🤣","lol": "😂","blush": "😊",
        "happy": "😃","happiest": "😃","joy": "😂","beaming": "😄","wink": "😉","love": "😍","kiss": "😘","hug": "🤗",
        "relaxed": "☺️","cool": "😎","sunglasses": "😎","nerd": "🤓","thinking": "🤔","neutral": "😐",
        "expressionless": "😑","no mouth": "😶","smirk": "😏","unamused": "😒","relieved": "😌","pensive": "😔",
        "sleepy": "😪","drooling": "🤤","sleeping": "😴","shocked": "😲","astonished": "😲","dizzy": "😵",
        "worried": "😟","frowning": "☹️","slightly frowning": "🙁","confused": "😕","upside down": "🙃","pleading": "🥺",
        // Angry & Sad Faces
        "angry": "😠","rage": "😡","mad": "😡","pout": "😡","cry": "😭","crying": "😭","sob": "😭","sad": "😢","saddest": "😢",
        "disappointed": "😞","frustrated": "😖","persevering": "😣","weary": "😩", "tired": "😫","fearful": "😨","cold sweat": "😰","scream": "😱","shocked": "😱","astonished": "😲",
        "anxious": "😟","worried": "😟",
        // Positive Faces
        "heart eyes": "😍","star eyes": "🤩","kissy face": "😘","blowing kiss": "😘","hugging": "🤗","partying face": "🥳",
        "smiling with halo": "😇","halo": "😇","innocent": "😇",
        // Negative & Sick Faces
        "sick": "🤢","sickness": "🤢","nauseated": "🤢","vomit": "🤮","sneezing": "🤧","mask": "😷","headache": "🤕",
        "bandage": "🤕","sweat": "😓","disappointed": "😞","sleeping": "😴", "fever": "🤒",
        // Surprised Faces
        "surprised": "😲","astonished": "😲", "shocked": "😲","flushed": "😳","confounded": "😖",
        // Silly & Playful Faces
        "tongue out": "😛", "stuck out tongue": "😛","wink tongue": "😜","crazy face": "🤪","zany face": "🤪","money mouth": "🤑",
        "nerd": "🤓", "clown": "🤡", "joker": "🤡", "shushing": "🤫", "silence": "🤫","exploding head": "🤯","mind blown": "🤯",
        "monocle": "🧐","suspicious": "🧐",
        // Emotional Faces
        "pleading": "🥺","puppy eyes": "🥺","teary eyed": "🥺","sad": "😢","crying": "😭","sobbing": "😭",
        // Miscellaneous
        "skull": "💀","ghost": "👻","alien": "👽","robot": "🤖","poop": "💩","devil": "😈","imp": "👿","ogre": "👹",
        "goblin": "👺","jack o lantern": "🎃","halloween" : "🎃",
                // Major Global Events
        "stock": "📊",
        "christmas": "🎄","new year": "🎆","new year's eve": "🎇","halloween": "🎃", "thanksgiving": "🦃",
        "valentine's day": "❤️","easter": "🐰","hanukkah": "🕎","diwali": "🪔","ramadan": "🌙",
        "eid": "🕌","chinese new year": "🧧","cinco de mayo": "🎉","independence day": "🎆","veterans day": "🇺🇸",
        "st. patrick's day": "☘️","labor day": "🛠️","mother's day": "👩❤️","father's day": "👨❤️",
        "groundhog day": "🐾","earth day": "🌍","world environment day": "🌿","world wildlife day": "🐅",
        "women's day": "👩‍🦰🌸","pride day": "🏳️‍🌈",
        "pride": "🏳️‍🌈","olympics": "🏅","hockey world cup": "🏒", "world cup": "⚽🏆", "soccer world cup": "⚽🏆","football world cup": "🏈🏆","wedding": "💍","anniversary": "💐",
        "birthday": "🎂","graduation": "🎓","baby shower": "👶🎉",
        // Specific Cultural Events
        "mardi gras": "🎭","carnival": "🎉","oktoberfest": "🍺","bonfire night": "🔥","day of the dead": "💀",
        "bastille day": "🇫🇷","holi": "🎨","songkran": "💦","vesak": "🪔", "time": "⌚",
        // Miscellaneous
        "super bowl": "🏈","oscars": "🏆","grammys": "🎶🏆","golden globes": "🏆","emmys": "🎥🏆",
        "election day": "🗳️","parade": "🎊","concert": "🎤","festival": "🎉","fundraiser": "💰",
        "world cup": "🏆","sports event": "🏅", "movie premiere": "🎥","comic con": "👾🎉","canada day": "🍁🇨🇦",
        "victoria day": "👑","remembrance day": "🎖️","labour day": "🛠️","thanksgiving": "🦃",
        "national indigenous peoples day": "🪶","family day": "👨‍👩‍👧‍👦","civic holiday": "🎉","new year's day": "🎆","boxing day": "🎁",
        "st. jean baptiste day": "⚜️","truth and reconciliation day": "🧡","canadian flag day": "🇨🇦",
        "international women's day": "👩‍🦰🌸","national day of mourning": "🖤","valentine's day": "❤️",
        "halloween": "🎃", "easter": "🐰","mother's day": "👩❤️","father's day": "👨❤️","national tree day": "🌲",
        "earth day": "🌍","canadian thanksgiving": "🦃🍁","national day for truth and reconciliation": "🧡","world environment day": "🌿",
        "canadian armed forces day": "🎖️","national flag of canada day": "🇨🇦",
                // Seasons
        "spring": "🌸","summer": "☀️","autumn": "🍂",  
        // Also known as 
        "fall": "🍁","winter": "❄️",
        // Weather conditions
        "sunny": "☀️","rain": "🌧️","rainy": "🌧️","cloudy": "☁️","snowfall": "❄️","snow": "❄️","snowy": "☃️","thunderstorm": "⛈️","lightning": "⚡",
        "fog": "🌫️", "windy": "🌬️","storm": "🌪️","tornado": "🌪️","cyclone": "🌀","hurricane": "🌀","hail": "🌨️",
        "drizzle": "🌦️","overcast": "☁️","clear": "🌞","hot": "🔥","cold": "🥶","icy": "🧊","frost": "❄️","heatwave": "🌡️",
        "humid": "💧","dry": "🏜️","freezing": "❄️","blizzard": "🌨️","rainbow": "🌈","stormy": "⛈️",
        "mild": "🌤️","cool": "🧥","breezy": "🍃","dew": "💧","sunrise": "🌅","sunset": "🌇","mist": "🌫️",
        "drought": "🏜️","monsoon": "🌧️🌪️","tsunami": "🌊","sleet": "🌨️",
        // Natural disasters
        "earthquake": "🌍💥","volcano": "🌋","wildfire": "🔥🌲","tornado": "🌪️","cyclone": "🌀","hurricane": "🌀","flood": "🌊",
        "landslide": "⛰️🌊","avalanche": "🏔️❄️","tsunami": "🌊","thunderstorm": "⛈️","blizzard": "🌨️","sandstorm": "🌪️🏜️",
        "dust storm": "🌪️🏜️","mudslide": "⛰️🌧️", 'european union': '🇪🇺', 'euro': 'euro🏆', 'copa america': 'copa america🏆',
        "sparkle": "✨", "spark": "💥", "thunder": "⚡", "vibe": "🤟💥🥂✨️", "vibes": "🤟💥🥂✨️", "dm": "💌", "envelope": "✉️", "lit": "🔥💯",
        "settings": "⚙️", "option": "☰", "options": "☰s", "puzzle": "🧩🧩", "puzzled": "🧩🧩","solution": "💡", "solve": "💡",
        "comment": "💬", "support": "🎗️",
    };

    // Sort the emojiMap keys by length (longest first) to prioritize longer phrases
    const sortedEmojiKeys = Object.keys(emojiMap).sort((a, b) => b.length - a.length);

    // Function to replace text with emojis based on the sorted map
    const replaceWithEmojis = (inputText) => {
        let modifiedText = inputText;

        // Loop through the sorted emoji map keys and replace matching phrases
        sortedEmojiKeys.forEach((key) => {
            const regex = new RegExp(`\\b${key}\\b`, 'gi'); // Use word boundaries for exact matching
            modifiedText = modifiedText.replace(regex, emojiMap[key]);
        });

        return modifiedText;
    };

    // Return the emoji-converted text
    return replaceWithEmojis(inputText);
};
// emoji ends
// nuke fun starts

const nuke = (inputText, filterFrequency) => {
    // Nuclear "threat" phrases for comedic effect
    const nuclearPhrases = [
        "<--'☢️ BOOM prep in progress—grab your sunglasses! ☢️'-->",
        "<--'💥 Nuke’s in the mail, tracking number lost! 💥'-->",
        "<--'💣 Psyche! Or maybe not—check your bunker? 💣'-->",
        "<--'☠️ Countdown to kablam: 3...2...OOPS! ☠️'-->",
        "<--'🔥 Duck, cover, and pray your Wi-Fi holds! 🔥'-->",
        "<--'☢️ Dead Hand’s out, and it’s got jazz hands! ☠️ 💣'-->",
        "<--'🚀 Kim Jong Un’s Zoom call: ‘Nuke cam ON!’ 👀'-->",
        "<--'📡 North Korea’s in the chat—spamming BOOM emojis! 📡'-->",
        "<--'🎛️ Kim’s yeeting the nuke button like it’s TikTok! 🎛️'-->",
        "<--'🧨 Kim’s on the line, crank-calling with warheads! 🧨'-->",
        "<--'🎇 North Korea’s fireworks got a *glow-up*! 🎇'-->",
        "<--'👽 Kim’s nuke tech? Stolen from Area 51’s yard sale! 👽'-->",
        "<--'💣 Kim’s like, ‘Oops, I launched it on selfie mode!’ 💣'-->",
        "<--'💥 Kim’s BOOM delivery, free with Amazon Prime! 💥'-->",
        "<--'🧨💣 Kim slapped the nuke button like it’s a vending machine! 🍒 💣🧨'-->",
        "<--'🚀 Missile’s Uber is 2 minutes away—hide! 🚀'-->",
        "<--'⚠️ Tactical nuke says, ‘Be there in 5, bring snacks!’ ⚠️'-->",
        "<--'🧨 Explosions? Kim’s got a BOGO deal! 🧨'-->",
        "<--'💣 Countdown’s on, but Kim’s stuck on CAPTCHA! 💣'-->",
        "<--'🔥 Apocalypse called, it’s running late but *spicy*! 🔥'-->",
        "<--'☢️ Global destruction mode? Kim’s just vibing! ☢️'-->",
        "<--'💥 Shockwave’s here—hope you saved your game! 💥'-->",
        "<--'🧨 Kim: ‘Hold my kimchi, I’m going nuclear!’ 🧨'-->",
        "<--'🚀 Kim’s finger’s on the button, but he’s texting! 🚀'-->",
        "<--'☠️ Fallout forecast: 100% chance of *yikes*! ☠️'-->",
        "<--'💣 Kim’s like, ‘Watch this sick nuke trick shot!’ 💣'-->",
        "<--'☢️ North Korea’s kaboom comes with free glow! ☢️'-->",
        "<--'💥 World ending? Kim says, ‘Hold for the remix!’ 💥'-->",
        "<--'🧨 Kim’s ready—nuke’s got express shipping! 🧨'-->",
        "<--'🚀 Missile’s like, ‘BRB, ruining your day!’ 🚀'-->",
        "<--'🔥 Marshmallows ready? Kim’s grilling the planet! 🔥'-->",
        "<--'💣 Wrong button? Nah, Kim meant to do that! 💣'-->",
        "<--'💥 Kim’s not gaming—he’s speedrunning Armageddon! 💥'-->",
        "<--'🎇 Kim’s nuke show: Rated 5 stars on Yelp! 🎇'-->",
        "<--'🧨 Impact’s coming—Kim’s got no chill! 🧨'-->",
        "<--'⚠️ Fallout’s live, Kim’s streaming it on Twitch! ⚠️'-->",
        "<--'💥 T-minus 5? More like Kim’s instant YEET! 💥'-->",
        "<--'🎛️ Nuke system’s online, Kim’s eating noodles! 🎛️'-->",
        "<--'💣 BOOM’s inbound—Kim forgot the safe word! 💣'-->",
        "<--'☢️ Bunker’s sold out, Kim’s got VIP passes! ☢️'-->",
        "<--'🔥 World-ending party? Kim’s DJing! 🔥'-->",
        "<--'🚀 Direct hit? Kim’s aiming for your vibes! 🚀'-->",
        "<--'💥 Say bye—Kim’s nuke’s got your address! 💥'-->",
        "<--'💣 Launch codes? Kim used ‘password123’! 💣'-->",
        "<--'☠️ Kim’s cackling like he hacked the planet! ☠️'-->",
        "<--'💥 Nuclear storm? Kim’s just flexing his playlist! 💥'-->",
        "<--'🧨 Countdown’s on, Kim’s taking selfies! 🧨'-->",
        "<--'🚀 Shelter? Kim says, ‘Just dance it out!’ 🚀'-->",
        "<--'🔥 Too hot? Kim’s nuke says, ‘Get hotter!’ 🔥'-->",
        "<--'☢️ Israel to Iran: Nuke party? We RSVP'd with airstrikes! ☢️'-->",
        "<--'💥 Iran’s like, ‘We’ll nuke back!’ *US waves sanctions stick* 💥'-->",
        "<--'🧨 Netanyahu’s got the Begin Doctrine, Iran’s got the BOOM dreams 🧨'-->",
        "<--'🚀 Trump says, ‘No deal? Here comes the B-52 fireworks!’ 🚀'-->",
        "<--'🔥 Iran to US: ‘Touch our nukes, and we’ll light up your bases!’ 🔥'-->",
        "<--'💣 Israel’s F-16s to Iran: ‘Catch these precision vibes!’ 💣'-->",
        "<--'☠️ Tehran’s like, ‘We’ll enrich uranium just to flex!’ ☠️'-->",
        "<--'🎇 US to Iran: ‘Sign the deal or it’s Shock-and-Awe 2.0!’ 🎇'-->",
        "<--'⚠️ Israel’s Mossad sneaking drones like it’s a nuke prank war ⚠️'-->",
        "<--'💥 Iran’s centrifuges spinning, US says, ‘Not on our watch!’ 💥'-->",
        "<--'🧨 Netanyahu to Trump: ‘Hold my falafel, I’m bombing Natanz!’ 🧨'-->",
        "<--'🚀 Iran’s missiles on standby, US bases like, ‘We good?’ 🚀'-->",
        "<--'🔥 Israel’s like, ‘No nukes for you!’ Iran: ‘Bet, watch this!’ 🔥'-->",
        "<--'💣 Trump’s like, ‘I’ll bomb so hard, you’ll forget uranium!’ 💣'-->",
        "<--'☢️ Iran to Israel: ‘Our retaliation’s gonna be *radiant*!’ ☢️'-->",
        "<--'🎛️ US diplomats packing bags, Israel’s like, ‘We got this!’ 🎛️'-->",
        "<--'💥 Iran’s Supreme Leader: ‘Nukes? Nah, just peaceful vibes!’ 💥'-->",
        "<--'🧨 Israel to Iran: ‘Your nuke sites are our new pinata!’ 🧨'-->",
        "<--'🚀 Trump to Netanyahu: ‘Chill, I’m negotiating... or am I?’ 🚀'-->",
        "<--'🔥 Iran’s like, ‘We’ll nuke Israel’s vibes!’ US: ‘Try us.’ 🔥'-->"
    ];


    // Split input text into words
    const words = inputText.split(' ');

    // Insert a nuclear threat phrase every 5 words
    const nukedText = words.map((word, index) => {
        // Every 5th word, add a nuclear phrase
        if ((index + 1) % filterFrequency === 0) {
            // Pick a random funny nuclear phrase
            const randomNuke = nuclearPhrases[Math.floor(Math.random() * nuclearPhrases.length)];
            return `${word} ${randomNuke}`;
        }
        return word;
    });

    // Join the words back into a single string
    return nukedText.join(' ');
};
// nuke fun ends
// president quote starts
const president = (inputText, filterFrequency) => {
    // Array of famous (and funny) Trump quotes
    const trumpPhrases = [
        // Remixed Trump Classics
        "<--'🇺🇸 Making America Great Again—now with glitter! ✨'-->",
        "<--'🔥 Fake News? More like *Faux News* on snooze! 😴'-->",
        "<--'💪 Tremendous? My hair’s more tremendous than Wi-Fi! 💪'-->",
        "<--'💼 Believe me, folks, I invented the art of the YEET! 📈'-->",
        "<--'💸 Billions and billions—like my McNugget budget! 🍔'-->",
        "<--'🚀 Winning so much, we’re running out of trophies! 🏆'-->",
        "<--'🤔 People are saying... my tweets are NFTs now! 🤔'-->",
        "<--'🏆 Nobody does it better, except maybe my barber! 💇‍♂️'-->",
        "<--'📝 Huge? It’s YUGE—like my Diet Coke stash! 🥤'-->",
        "<--'📊 Best numbers, folks—better than TikTok likes! 📱'-->",
        "<--'💥 Big league? More like *galactic league*! 🌌'-->",
        "<--'😎 I know the best people—my mirror agrees! 🪞'-->",
        "<--'👀 Many people talking? My X posts broke the server! 💥'-->",
        "<--'🔔 You’re fired—now go start a podcast! 🎙️'-->",
        "<--'🍔 McDonald’s? I’m their unofficial fry ambassador! 🍟'-->",
        "<--'📉 Lowest numbers? Only on my golf score, folks! ⛳'-->",
        "<--'🎩 Classy? My gold toilet says *very* classy! 🚽'-->",
        "<--'🛑 Disaster? Only when my spray tan runs out! 😱'-->",
        "<--'💡 Trust me, I know—my gut’s got a PhD! 🧠'-->",
        "<--'📢 Greatest? Like my MAGA hats on a clearance rack! 🧢'-->",
        "<--'🌍 Nobody knows more than me—Google’s jealous! 🔍'-->",
        "<--'💭 Huge? Like my Mar-a-Lago Wi-Fi bill! 📡'-->",
        "<--'🤯 Unbelievable, folks—like my 4D chess moves! ♟️'-->",
        "<--'👔 Never seen before? My tie length’s a world record! 👔'-->",
        "<--'💪 Best words? I’m the Shakespeare of X posts! 📜'-->",

        // Remixed Trump on China, Russia, Business
        "<--'🇨🇳 China’s like, ‘We win!’ I’m like, ‘Not with my tariffs!’ 💰'-->",
        "<--'🔄 Jobs back from China? I’m mailing them via SpaceX! 📦'-->",
        "<--'🐉 China laughing? Wait till they see my dance moves! 💃'-->",
        "<--'🌏 Know China? I ate their takeout *and* won trade! 🍜'-->",
        "<--'🇷🇺 Russia? Putin and I text emojis—strong ones! 💪'-->",
        "<--'💰 Deals so big, my wallet needs a gym membership! 🏋️'-->",
        "<--'💼 Businessman? I sold air rights to the moon! 🌙'-->",
        "<--'📉 China’s trade game? I flipped the board, folks! 🎲'-->",
        "<--'📈 Economy? So hot it’s melting my ice cream! 🍦'-->",
        "<--'💵 Making us rich—like my NFT sneaker drop! 💸'-->",
        "<--'🕴 Deals? I negotiated peace with my barber! ✂️'-->",
        "<--'🦅 America First—unless it’s my burger order! 🍔'-->",
        "<--'👨‍💼 Business? I turned Mar-a-Lago into a meme coin! 🪙'-->",
        "<--'💸 China owes us—like my campaign owes me sleep! 😴'-->",
        "<--'🔍 Investigate? I’m Sherlock with better hair! 🕵️'-->",
        "<--'💡 Innovation? I patented the covfefe recipe! ☕'-->",

        // Remixed Famous Trump Quotes
        "<--'🇺🇸 Jobs president? God gave me a 5-star Yelp review! ⭐'-->",
        "<--'🔥 Stable genius? My brain’s a Tesla on autopilot! 🚗'-->",
        "<--'🏆 Win so much, we’re inventing new sports! 🏀'-->",
        "<--'💪 Walls? I’m building one around bad vibes! 🛑'-->",
        "<--'🌎 Love China? Sure, their egg rolls are *tremendous*! 🥟'-->",
        "<--'🎩 Fifth Avenue? I’d shoot a selfie and go viral! 📸-->",
        "<--'📉 Tax cuts? So big, my accountant’s on vacation! 🏝️'-->",
        "<--'💼 Deals? I sold the art of the deal to Netflix! 🎬'-->",

        // Remixed Elon Musk Quotes
        "<--'🚀 Mars? I’m moving there, but Wi-Fi better be 5G! 📡'-->",
        "<--'🌌 Odds bad? I’ll still yeet a Tesla to Jupiter! 🚘'-->",
        "<--'⚡ Possible? I made a flamethrower for camping! 🔥'-->",
        "<--'💡 Bright day? Unless my Starlink’s down, then panic! 😅'-->",
        "<--'🚘 Extraordinary? I’m just a guy with 12 companies! 🤷‍♂️'-->",
        "<--'🌍 Save the world? Sure, but keep my Cybertruck shiny! 🛻'-->",
        "<--'🧠 Questioning? I asked why my doge isn’t CEO yet! 🐶'-->",
        "<--'🔋 Odds against? I built a gigafactory on vibes! 🏭'-->",
        "<--'🚀 Feedback loop? I tweet, crash markets, repeat! 📉'-->",
        "<--🌱 Change? I changed my name to X Æ A-12 Sr.! 👶'-->",
        "<--'💼 Pain threshold? I sleep under my desk for fun! 😴'-->",
        "<--'🔧 Failure? My rockets go BOOM for the drama! 💥'-->",
        "<--'🚘 Samurai? I’d code seppuku in Python first! 💻'-->",
        "<--'🚀 CO2 experiment? I’m sending it to Mars, problem solved! 🌍'-->",
        "<--'🌍 Extraordinary? I hired a bot to tweet my dreams! 🤖'-->",
        "<--'💡 Better? I’m upgrading Earth to EarthOS 2.0! 💾'-->",
        "<--'🔌 Companies? I build them like LEGO sets! 🧱'-->",

        // New Funny MAGA Convos with Trump, Musk, and Others
        "<--'🇺🇸 Trump: ‘MAGA’s back!’ Elon: ‘Can I make it a Neuralink app?’ 🧠'-->",
        "<--'💥 Trump: ‘Build the wall!’ Musk: ‘I’ll 3D print it on the moon! 🌙'-->",
        "<--'🔥 Trump: ‘Fake News!’ Musk: ‘I’ll fact-check with X bots!’ 🤖'-->",
        "<--'🚀 Musk: ‘Tesla’s MAGA!’ Trump: ‘Put my face on the Cybertruck!’ 🛻'-->",
        "<--'💪 Trump: ‘Best economy!’ Musk: ‘Yeah, my stock’s up 420%!’ 📈'-->",
        "<--'🦅 Trump: ‘America First!’ Musk: ‘After Mars, you’re next!’ 🌌'-->",
        "<--'📢 Trump: ‘Huge rally!’ Musk: ‘I’ll livestream it via Starlink!’ 📡'-->",
        "<--'💸 Trump: ‘China pays!’ Musk: ‘I’ll bill them in Dogecoin! 🐶'-->",
        "<--'🏆 Trump: ‘We’re winning!’ Musk: ‘I won a bet with Bezos already!’ 💰'-->",
        "<--'🎩 Trump: ‘Classy!’ Musk: ‘My flamethrower’s classier!’ 🔥'-->",
        "<--'👀 Trump: ‘People talking!’ Musk: ‘My X algo’s trending you!’ 📊'-->",
        "<--'💼 Trump: ‘Best deals!’ Musk: ‘I sold Twitter for the lulz!’ 😎'-->",
        "<--'🇺🇸 Trump: ‘MAGA forever!’ Musk: ‘I’ll etch it on a Starship!’ 🚀'-->"
    ];

    // Split input text into words
    const words = inputText.split(' ');

    // Insert a Trump phrase every 5 words
    const presidentialText = words.map((word, index) => {
        // Every 5th word, add a Trump phrase
        if ((index + 1) % filterFrequency === 0) {
            // Pick a random Trump phrase
            const randomPhrase = trumpPhrases[Math.floor(Math.random() * trumpPhrases.length)];
            return `${word} ${randomPhrase}`;
        }
        return word;
    });

    // Join the words back into a single string
    return presidentialText.join(' ');
};
// president quote ends


const proposeOrConfess = (inputText, filterFrequency) => {
    const proposals = [
        "<--'💖 Will you be mine?'-->",
        "<--'🌹 I think I’m falling for you.'-->",
        "<--'💕 I can’t stop thinking about you.'-->",
        "<--'💘 Be the reason I smile every day.'-->",
        "<--'🥺 I like you... a lot.'-->",
        "<--'❤️ You had me at hello.'-->",
        "<--'😳 So... do you like me too?'-->",
        "<--'💍 Let's make it official?'-->",
        "<--'🌸 Being with you feels right.'-->",
        "<--'💌 I’ve written this in my heart.'-->",
        "<--'😘 Just one date... what do you say?'-->",
        "<--'🤞 I hope you feel the same.'-->",
        "<--'👀 You + Me = Something special?'-->",
        "<--'🎯 You’re the one I’ve been waiting for.'-->",
        "<--'☕ Wanna grab coffee... forever?'-->",
        "<--'💬 I needed to say it... I like you.'-->",
        "<--'🎶 My heart skips a beat when I see you.'-->",
        "<--'✨ You're everything I didn't know I needed.'-->",
        "<--'😅 I’ve liked you for a while now.'-->",
        "<--'💞 Let’s start a story together.'-->",
        "<--'🫶 Just wanted you to know… I like you.'-->",
        "<--'😳 Is this weird? I like you.'-->",
        "<--'🌈 Life’s better with you in it.'-->",
        "<--'🕊️ You make my world brighter.'-->",
        "<--'🎁 You’re the best thing I never expected.'-->",
        "<--'🍀 I’m lucky to know you. Let me love you?'-->",
        "<--'📦 Consider this a love drop-in.'-->",
        "<--'📍Wherever you are, I want to be too.'-->",
        "<--'🌙 Dreaming of you isn’t enough anymore.'-->",
        "<--'🔥 My heart’s on fire — you lit it.'-->",
        "<--'🚀 Let’s shoot for love, together.'-->",
        "<--'💖 Shall we entwine our destinies, my dear?'-->",
        "<--'🌹 My heart seems to have misplaced its composure around you.'-->",
        "<--'💕 Your presence lingers in my thoughts like a fine vintage.'-->",
        "<--'💘 Pray, be the muse to my every sunrise.'-->",
        "<--'🥺 I confess, my affections for you are rather… pronounced.'-->",
        "<--'❤️ You captivated me with a single syllable—‘hello.’'-->",
        "<--'😳 Dare I ask if your heart whispers my name in return?'-->",
        "<--'💍 Shall we make forever an official affair?'-->",
        "<--'🌸 With you, every moment feels like poetry in motion.'-->",
        "<--'💌 My heart’s penned a sonnet, and you’re the title.'-->",
        "<--'😘 One evening in your company—might I persuade you?'-->",
        "<--'🤞 I venture to hope our hearts beat in unison.'-->",
        "<--'👀 Might we, perchance, be a match of celestial proportions?'-->",
        "<--'🎯 You’re the serendipity I didn’t dare dream of.'-->",
        "<--'☕ Care to share a lifetime over a cup of espresso?'-->",
        "<--'💬 I must confess, my heart’s rather smitten with you.'-->",
        "<--'🎶 Your presence sets my pulse to a waltz’s rhythm.'-->",
        "<--'✨ You’re the unexpected masterpiece in my gallery of dreams.'-->",
        "<--'😅 My heart’s been practicing your name for ages.'-->",
        "<--'💞 Shall we write a romance for the ages?'-->",
        "<--'🫶 Allow me to admit—you’ve utterly charmed me.'-->",
        "<--'😳 Is it forward to say you’ve stolen my heart’s Wi-Fi?'-->",
        "<--'🌈 With you, life’s canvas bursts into color.'-->",
        "<--'🕊️ Your light makes my world a far lovelier place.'-->",
        "<--'🎁 You’re the gift I never knew I’d been wishing for.'-->",
        "<--'🍀 Fortune smiled when you entered my orbit—may I court you?'-->",
        "<--'📦 This heart’s been delivered, signature required.'-->",
        "<--'📍 My compass points to you, wherever you roam.'-->",
        "<--'🌙 Dreams of you pale beside the real thing.'-->",
        "<--'🔥 You’ve kindled a spark that’s rather hard to extinguish.'-->",
        "<--'🚀 Shall we embark on a grand amorous adventure?'-->"
    ];

    // Break the input into words
    const words = inputText.split(' ');

    // Inject love/confession phrases every 8 words
    const romanticized = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomProposal = proposals[Math.floor(Math.random() * proposals.length)];
            return `${word} ${randomProposal}`;
        }
        return word;
    });

    return romanticized.join(' ');
};


const tariff = (inputText, filterFrequency) => {
    const trumpTariffLines = [
        // Remixed Originals
        "<--'💸 Countries begging on Zoom, sending me emoji kisses! 😘'-->",
        "<--'📦 Liberation Day? I freed your wallet to love America! 🦅'-->",
        "<--'🔥 World’s so yippy, they’re writing tariff fanfic! 📝'-->",
        "<--'🚀 America First? More like America’s the *only* VIP! 🌟'-->",
        "<--'📈 Markets? Booming so hard, Wall Street’s doing cartwheels! 🤸'-->",
        "<--'🇨🇦 Canada’s governor? I promoted them to my fan club prez! 🍁'-->",
        "<--'💣 Tariffs so tremendous, they’re getting Oscar buzz! 🏆'-->",
        "<--'📊 Trade war? I’m winning so bad, Earth’s filing for bankruptcy! 🌍'-->",
        "<--'🧠 Trade? I wrote the book—called it *Tariff Tantrums*! 📚'-->",
        "<--'🍔 Pay more for fries? You’re basically saluting the flag! 🇺🇸'-->",
        "<--'🪙 Tariffs? Like fairy dust, but for making America rich! ✨'-->",
        "<--'🇲🇽 Mexico’s framing my tariffs in gold—they’re *that* obsessed! 🖼️'-->",
        "<--'💼 Beautiful tariffs? They’re my Mona Lisa, folks—head-spinning! 😵'-->",
        "<--'⚖️ China? Tried to outsmart me. Now they’re mailing me apologies! ✉️'-->",
        "<--'📢 EU? Total disaster—like a soggy croissant convention! 🥐'-->",
        "<--'📉 Fake economists whining? I’m thriving in 4D, haters! 🕶️'-->",
        "<--'🎉 Liberation Day 2.0—tariffs so lit, we’re roasting s’mores! 🔥'-->",
        "<--'🚫 Free trade? Nah, we’re charging tolls on vibes now! 🛣️'-->",
        "<--'🥇 Invented tariffs? I carved ‘em on Mount Rushmore! 🗿'-->",
        "<--'💰 Tax ‘em till they cry? I’m bottling their tears for profit! 😢'-->",
        "<--'🥊 Trade war? More like me teaching kindergarten economics! 🖍️'-->",
        "<--'🤯 Countries losing it? Good—my tariffs broke their group chat! 💬'-->",
        "<--'👔 Advisors? My gut’s got a Nobel in Tariffology! 🏅'-->",
        "<--'🧠 Real economics? It’s just me yelling ‘TARIFF!’ at the moon! 🌙'-->",
        "<--'🎯 Tariffs = chess? I’m checkmating with a gold-plated rook! ♟️'-->",

        // New Gut-Busting Tariff Lines
        "<--'💥 Tariffs so hot, China’s Googling ‘how to surrender’! 🔍'-->",
        "<--'🦁 I roared ‘TARIFF,’ and the EU fainted in French! 😱'-->",
        "<--'🍎 Apple’s pricey now? Call it the Patriot Tax, Tim! 🇺🇸'-->",
        "<--'🚨 Canada’s sending me maple syrup bribes—tariffs too sweet! 🥞'-->",
        "<--'💡 My tariffs? Like Wi-Fi, but only America gets the signal! 📶'-->",
        "<--'🧨 Japan’s like, ‘Plz no tariff!’ I’m like, ‘Sushi’s taxed too!’ 🍣'-->",
        "<--'🎤 Dropped a tariff mixtape—world’s streaming it in tears! 😭'-->",
        "<--'💪 Tariffs so strong, they bench-pressed the global economy! 🏋️'-->",
        "<--'🦅 America’s wallet? Thicc like my steak at Mar-a-Lago! 🥩'-->",
        "<--'📡 China tried to hack my tariffs—got a 404: Freedom Not Found! 🖥️'-->",
        "<--'🎉 Tariff party? BYOB—Bring Your Own Bucks, world! 💵'-->",
        "<--'🧀 EU’s crying over cheese tariffs? Brie-lieve it, folks! 🧀'-->",
        "<--'🚀 My tariffs went viral—X crashed from the hype! 🔥'-->",
        "<--'💼 Trade deal? Nah, I’m selling tariff NFTs for billions! 🪙'-->",
        "<--'😎 Tariffs so cool, I’m wearing ‘em as sunglasses! 🕶️'-->"
    ];

    const words = inputText.split(' ');

    const spicedUpText = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomTrumpLine = trumpTariffLines[Math.floor(Math.random() * trumpTariffLines.length)];
            return `${word} ${randomTrumpLine}`;
        }
        return word;
    });

    return spicedUpText.join(' ');
};

// boss filter 
const bossFilter = (inputText, filterFrequency) => {
     const bossMemes = [
        // Remixed Originals
        "<--'🧠 Work smarter? Nah, just clone yourself by Monday! 🧬'-->",
        "<--'📢 Circle back? Let’s marathon unpaid overtime on Zoom! 🏃‍♂️'-->",
        "<--'📆 Weekend shift? Surprise, it’s now a lifestyle! 🎉'-->",
        "<--'💬 Day off? Quick 3-hour call at midnight, k? 📞'-->",
        "<--'🥸 Credit’s mine, but the blame’s your new nickname! 😎'-->",
        "<--'📉 Burnout? Sounds like a *you* KPI, pal! 🔥'-->",
        "<--'🧃 No raises, but free pizza’s basically currency! 🍕'-->",
        "<--'💻 24/7 availability? It’s just adult hide-and-seek! 👻'-->",
        "<--'🔍 Micromanage? I’m just your personal GPS! 📍'-->",
        "<--'🥳 Birthday? Gifted you a 50-page report due tomorrow! 🎂'-->",
        "<--'📨 EOD task at 4:59 PM? I believe in your time travel skills! ⏰'-->",
        "<--'🧩 Stressed? My cryptic emails are team-building puzzles! 🧠'-->",
        "<--'🎩 Consultant? Paid them $10K to steal your Post-it notes! 💸'-->",
        "<--'☕ No promotion, but you’re the GOAT of coffee runs! 🐐'-->",
        "<--'🤡 Family? Sure, but vacation’s a family feud! 🚫'-->",
        "<--'🔥 Deadline’s yesterday—channel your inner superhero! 🦸‍♀️'-->",
        "<--'🚀 Fast, cheap, perfect? Also, make it TikTok viral! 📱'-->",
        "<--'💼 PTO? Approved for 2030, book your bunker now! 🏖️'-->",
        "<--'🗓️ Work-life balance? Let’s debate it during your lunch coma! 🥪'-->",
        "<--'🧊 Your idea? I rebranded it as my TED Talk! 🎤'-->",
        "<--'🫠 Multitask? Juggle 12 projects while I nap! 🤹‍♂️'-->",
        "<--'💡 Killing it? Here’s 3 more jobs and a stapler trophy! 🖇️'-->",
        "<--'👀 Leaving at 5? Bro, the sun’s still out, grind harder! 🌞'-->",
        "<--'💣 No tools? Impress me with vibes and a paperclip! 📎'-->",
        "<--'📈 Results? Figure it out, I’m golfing! ⛳'-->",
        "<--'🏆 Value you? Got you a $3 mug that says ‘Team!’ ☕'-->",
        "<--'📞 Daily touch base? My ego needs hourly hugs! 🤗'-->",
        "<--'🎯 Not literal? You should’ve read my mind, rookie! 🧙‍♂️'-->",

        // New Mind-Blowingly Funny Boss Memes
        "<--'💥 Need it done? I emailed you a vibe—execute it! ✨'-->",
        "<--'🦁 I’m the CEO of chaos, you’re the intern of miracles! 🪄'-->",
        "<--'🍎 No budget? Barter your soul for printer ink! 😈'-->",
        "<--'🚨 Task at 11:59 PM? Bet you can type with your eyes closed! 😴'-->",
        "<--'💡 Innovation? I need a PowerPoint to save the planet by lunch! 🌍'-->",
        "<--'🧨 Team meeting? Just me monologuing while you clap! 👏'-->",
        "<--'🎤 Feedback? I sang your review in karaoke—zero stars! 🎵'-->",
        "<--'💪 Overtime? It’s CrossFit for your inbox, champ! 🏋️‍♀️'-->",
        "<--'🦅 Value you? Named a conference room ‘Employee #472’! 🏢'-->",
        "<--'📡 Remote work? Sure, but I’m installing a webcam in your fridge! 🧀'-->",
        "<--'🎉 Morale boost? Free donuts if you sign this 80-hour contract! 🍩'-->",
        "<--'🧀 Goals? I scribbled ‘WIN’ on a napkin, make it happen! 📜'-->",
        "<--'🚀 Crunch time? I’m sipping mai tais, you’re saving Q4! 🍹'-->",
        "<--'💼 Strategy? I yelled ‘PROFIT’ in the elevator, now go! 🗣️'-->",
        "<--'😎 I’m not a boss, I’m a vibe dictator—obey the spreadsheet! 📊'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomBossLine = bossMemes[Math.floor(Math.random() * bossMemes.length)];
            return `${word} ${randomBossLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};

const richMemes = (inputText, filterFrequency) => {
    const richMemes = [
    // Remixed Originals
    "<--'💸 Found $10K in my old Gucci jeans—my laundry’s richer than you! 👖'-->",
    "<--'🛥️ Bought a yacht to skip traffic—still late ‘cause I napped! 😴'-->",
    "<--'🎩 My wallet’s got more cards than a Vegas magician’s finale! 💳✨'-->",
    "<--'🏃‍♂️ Jogging? I got treadmills in my elevators, bro! 🛗'-->",
    "<--'🦷 Gold toothbrush? My dentist polishes my vibes too! 😎'-->",
    "<--'✈️ Commercial flights? I bought Boeing for legroom! 💼'-->",
    "<--'💎 My dog’s collar? Cartier, ‘cause Fido’s a CEO! 🐶'-->",
    "<--'🏝️ Private island woes? Too much sand in my caviar! 🦪'-->",
    "<--'☕ Tipped my barista a Tesla—keep the change! 🚗'-->",
    "<--'🛁 Bathtub? It’s an Evian hot tub with diamond bubbles! 💧'-->",
    "<--'🪟 Windows? My app yeets drones to clean ‘em! 📱'-->",
    "<--'👨‍🍳 My chef’s chef has a chef—culinary inception! 🍽️'-->",
    "<--'👠 Second mansion? It’s my sneaker’s walk-in closet! 🏠'-->",
    "<--'🥂 Water my plants? Nah, they sip vintage Dom Pérignon! 🌱'-->",
    "<--'🚗 My car’s got a mini car for parallel parking flexes! 🚙'-->",
    "<--'😂 Hired a comedian to LOL at my memes 24/7! 💼'-->",
    "<--'☁️ Personal cloud? I store my ego in a private galaxy! 🔒'-->",
    "<--'⬆️ Stairs? My escalator’s got a champagne fountain! 🥂'-->",
    "<--'🛏️ Bed so big, I Uber to my pillow every night! 🚕'-->",
    "<--'⌚ My watch tells me to chill—cost more than your house! 🧘‍♂️'-->",
    "<--'🪞 My mirror? It’s an AI that roasts my outfits first! 😍'-->",
    "<--'🏋️ Gym membership? I bought Planet Fitness for squats! 🏢'-->",
    "<--'🧊 Fridge orders caviar when it’s low on vibes! 📦'-->",
    "<--'😎 Sunglasses indoors? Gotta shade my gold aura! 💡'-->",
    "<--'🤵‍♂️ Butler’s butler? He’s got a butler for his AirPods! 🤵'-->",
    "<--'🌕 Moon land? Bought it for my weekend BBQs! 📄'-->",
    "<--'😢 Tears? I cry into Fabergé eggs for resale! 💎'-->",
    "<--'⏰ Alarm clock? A symphony orchestra wakes my vibes! 🎻'-->",
    "<--'📶 WiFi? Named it ‘Billionaire Bandwidth’—no peasants! 🛫'-->",
    "<--'🏖️ Weekday vacay? Crowds are for poors, I’m napping! 🗓️'-->",
    "<--'🖊️ My pen? Worth more than your zip code, sign here! 🚗'-->",
    "<--'🚪 Gold bars? They’re my doorstops and my cardio! 🏋️‍♂️'-->",
    "<--'🐱 My cat? Struts in Versace, meows in crypto! 👜'-->",
    "<--'🧾 Jokes? My accountant laughs ‘em off as write-offs! 😆'-->",
    "<--'🔥 Fireplace? Burns $100 bills for ambiance! 🕯️'-->",
    "<--'🍰 Dessert fridge? It’s got its own Michelin star! 🧊'-->",

    // New Mind-Blowingly Funny Rich Memes
    "<--'💥 My pool? Filled with liquid gold—backstroke’s a flex! 🏊'-->",
    "<--'🦁 Pet lion? He’s got a Rolex and a personal chef! 🍖'-->",
    "<--'🍎 Forgot my lunch? Bought Apple to cater me! 📱'-->",
    "<--'🚨 Bored? I rented the Louvre for a selfie sesh! 🖼️'-->",
    "<--'💡 Bulbs? My chandeliers run on unicorn tears! 🦄'-->",
    "<--'🧨 My doorbell? Plays Beethoven’s 5th in diamonds! 🔔'-->",
    "<--'🎤 Karaoke? I hired Beyoncé to sing backup for me! 🎵'-->",
    "<--'💪 Gym? I lift islands for my morning routine! 🏝️'-->",
    "<--'🦅 My jet? It’s got a jet for its luggage! 🧳'-->",
    "<--'📡 Forgot my password? Hacked NASA to reset it! 🖥️'-->",
    "<--'🎉 Party? I rented Mars for the afterparty! 🚀'-->",
    "<--'🧀 My cheese? Aged in a vault with my crypto keys! 🗝️'-->",
    "<--'🚀 Midlife crisis? I bought SpaceX for a joyride! 🌌'-->",
    "<--'💼 Meetings? I send my hologram while I yacht! 🛥️'-->",
    "<--'😎 My vibe? So rich, I tax the air you breathe! 💨'-->"
];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomRichMemeLine = richMemes[Math.floor(Math.random() * richMemes.length)];
            return `${word} ${randomRichMemeLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};


// poor filter
const poorMemes = (inputText, filterFrequency) => {
    const poorMemes = [
        // Remixed Originals
        "<--'🏦 Bank says ‘Try again later’? Bro, my account’s on vacation! ❌'-->",
        "<--'📉 Procrastinate? I’m the CEO of ‘Broke Tomorrow’ vibes! 🛋️'-->",
        "<--'🧅 Wallet’s an onion—peel it open, I’m sobbing in pennies! 😭'-->",
        "<--'👀 Pay attention? Sorry, my focus got repossessed! 💰❌'-->",
        "<--'🛌 Dreams outnumber dollars like my Netflix queue! 💭💸'-->",
        "<--'😬 Smiled at my bills—they sent me to collections anyway! 💵'-->",
        "<--'🤞 Pre-rich? Nah, I’m post-broke with VIP debt! 📉'-->",
        "<--'😴 Thought I had cash—woke up to a Ramen reality! 💵❌'-->",
        "<--'📖 Credit card’s my bookmark—page one of ‘No Funds’! 💳'-->",
        "<--'🐖 Savings? My piggy bank’s on a coin cleanse! 🪙'-->",
        "<--'🧾 Rent’s due yesterday, I’m paying in IOU vibes! 🏠'-->",
        "<--'😂 Budget? It laughed, then ghosted me like my ex! 📉'-->",
        "<--'🥋 Window shopping? I’m the black belt of broke browsing! 🛍️'-->",
        "<--'😔 Attention? Can’t afford it, my brain’s on layaway! 🔇'-->",
        "<--'🎓 Broke PhD? I majored in instant noodle alchemy! 💀'-->",
        "<--'💸 Saved money? It yeeted itself to Narnia! 🏃‍♂️'-->",
        "<--'🤔 Can’t afford poor? My debt’s got debt’s debt! 💰❌'-->",
        "<--'🤧 Allergic to success? My bank balance sneezes at cash! 💵'-->",
        "<--'🧾 Expired coupons? I’m trading ‘em for clout at 7-Eleven! 💳'-->",
        "<--'🔍 Credit score? It’s playing hide-and-seek in the negatives! 😱'-->",
        "<--'💸 Budget’s duct-taped, but my dreams are Gorilla Glued! 🧻'-->",
        "<--'🍲 Microwave meal? Costs more than my 401(k) vibes! 😅'-->",
        "<--'🏦 Bank loan? They gave me Kleenex and a sympathy nod! 😭'-->",
        "<--'🚫 Vending machine snubbed me—my dime’s too broke! 🥤'-->",
        "<--'📶 WiFi’s ‘BrokeAF123’—even my router’s judging! 😂'-->",
        "<--'📺 Netflix asks if I’m watching? Nah, I’m just broke-staring! 💸'-->",
        "<--'🛒 Online shopping? Add to cart, cry, close tab—repeat! 🚪'-->",
        "<--'🍜 Dream in Ramen? My sleep’s sponsored by sodium! 💤'-->",
        "<--'🐖 Piggy bank? It’s on a hunger strike, send help! 🚫🍽️'-->",
        "<--'🙏 Wallet’s got prayers and a moth—holy broke, Batman! 💼'-->",
        "<--'💰 99 problems? All invoiced with interest, baby! 😩'-->",
        "<--'🏠 Rent so high, my stress got a bunk bed! 😵👯'-->",
        "<--'💳 Debit card weeps before swiping—it knows the PIN’s pain! 😭'-->",
        "<--'📱 Budget app? It blocked me for emotional damage! 🏃‍♀️'-->",
        "<--'🏷️ Dollar store? I call it ‘Bougie Bazaar’ for clout! 💎'-->",
        "<--'👻 Bank app ghosted me—now I’m DMing my overdraft! 📲'-->",
        "<--'✨ Job pays in vibes? I’m framing my exposure check! 💀'-->",

        // New Mind-Blowingly Funny Poor Memes
        "<--'💥 Broke so bad, my shadow’s couch-surfing! 🛋️'-->",
        "<--'🦁 Asked for a raise—boss gave me a high-five and lint! ✋'-->",
        "<--'🍎 Ate a free sample—now it’s my Michelin-star dinner! 🥐'-->",
        "<--'🚨 Bill collector called—I offered Monopoly money! 🎲'-->",
        "<--'💡 Light bill due? I’m romancing candles for ambiance! 🕯️'-->",
        "<--'🧨 Broke flex? I haggled with a parking meter and lost! 🅿️'-->",
        "<--'🎤 Karaoke night? I sang ‘No Scrubs’ to my bank balance! 🎵'-->",
        "<--'💪 Savings goal? I’m collecting bottle caps for clout! 🧢'-->",
        "<--'🦅 Freedom? My debt’s got me on a payment plan! 🏢'-->",
        "<--'📡 WiFi’s free at McDonald’s, so I’m CEO of the lot! 🍟'-->",
        "<--'🎉 Payday? I celebrated with a 99-cent taco fiesta! 🌮'-->",
        "<--'🧀 Fridge so empty, it’s auditioning for minimalism! 🗑️'-->",
        "<--'🚀 Broke dreams? I’m hitchhiking to the moon on vibes! 🌙'-->",
        "<--'💼 Jobless? I’m freelancing as a professional napper! 😴'-->",
        "<--'😎 So broke, I Venmo’d my cat for rent money! 🐱'-->"
    ];

  const words = inputText.split(' ');

  const filtered = words.map((word, index) => {
    if ((index + 1) % filterFrequency === 0) {
      const randomPoorMemeLine = poorMemes[Math.floor(Math.random() * poorMemes.length)];
      return `${word} ${randomPoorMemeLine}`;
    }
    return word;
  });

  return filtered.join(' ');
};


// motivational memes

const topGMemes = (inputText, filterFrequency) => {
    const topGMemes = [
        // Remixed Motivational Memes
        "<--'🧠 Survived Monday? I deserve a Nobel for napping through it! 💼'-->",
        "<--'☕ Coffee? It’s my emotional support liquid for adulting! 😩'-->",
        "<--'🛌 Dream big? My bed’s so cozy, I’m CEO of snooze! 🌠'-->",
        "<--'⏳ Procrastination? I’m world champ at ‘due yesterday’! 📆'-->",
        "<--'🍍 Be a pineapple? I’m crowned, sweet, and spiky AF! 👑'-->",
        "<--'🔠 Plan A flopped? I’m vibing through Plan Z, baby! 😅'-->",
        "<--'😴 Missed a nap? That’s a 100% fail in my life goals! 💯'-->",
        "<--'🌞 Rise and shine? I rose, but my shine’s on backorder! 😐'-->",
        "<--'💤 Don’t quit daydreams? Mine’s a Netflix series by now! ✨'-->",
        "<--'📅 Calendar after Tuesday? It’s just screaming ‘WTF!’ 🤯'-->",
        "<--'📶 Believe in me? Even my Wi-Fi ghosted my hustle! 😤'-->",
        "<--'🏃‍♂️ Weekend’s close? I’m sprinting past my inbox! 🏁'-->",
        "<--'🧠 Mistakes? Proof I’m human and bad at math! 🔁'-->",
        "<--'🍽️ Eat, sleep, conquer? I’m stuck on the eat part! 🏆'-->",
        "<--'☕ Stay strong? Coffee’s brewing, but my soul’s decaf! 💪'-->",
        "<--'⬅️ Nothing’s right? I’m yeeting left to Narnia! 🧭'-->",
        "<--'📺 You can do it? After this binge, I’m unstoppable! 😅'-->",
        "<--'💼 Hustle? My haters applied for my intern gig! 😎'-->",
        "<--'😁 Make ‘em smile? I’m the meme lord of grins! 😂'-->",
        "<--'🧦 Success? Found matching socks, I’m basically Elon! 🏆'-->",
        "<--'⏰ Clock’s ticking? I’m ticking faster, time’s shook! 🏃‍♀️'-->",
        "<--'🧠 Limits? Only gravity and my data plan hold me back! 🚀'-->",
        "<--'💥 Push yourself? I’m shoving my vibes to the moon! 💯'-->",
        "<--'😌 Stay positive? I’m glowing, but my test’s negative! 🧪'-->",
        "<--'🚪 No opportunity? I built a door with IKEA vibes! 🛠️'-->",
        "<--'📈 Future? I’m crafting it with glitter and grit! 🔮'-->",
        "<--'🙌 Made it through Monday? I’m the MVP of misery! 📆'-->",
        "<--'🧰 Start now? I’m MacGyvering success with a paperclip! 🧠'-->",
        "<--'💡 No opportunity? I’m forging it in my mom’s basement! 👷‍♂️'-->",
        "<--'⏰ Lazy? I’m up, but my hustle’s still hitting snooze! 🏋️'-->",

        // Remixed Top G Memes
        "<--'🏎️ Bugatti’s color? Bro, my vibe’s too rich for crayons! 🤔'-->",
        "<--'🛌 Sleep? That’s for peasants, I nap in gold bars! 💸'-->",
        "<--'💸 Wake up rich? I’m so dangerous, my mirror’s armed! 🔫'-->",
        "<--'👑 Breathing king air? My exhale’s worth a Lambo! 💨'-->",
        "<--'☕ Caffeine? My veins pump espresso, brain’s on crypto! 🧠'-->",
        "<--'📱 You scroll? I’m hustling so hard, X crashed my flex! 💼'-->",
        "<--'🦁 Alpha energy? My beta habits got deported! 🔥'-->",
        "<--'💳 Candy Crush? I’m crushing bank vaults with my pinky! 💥'-->",
        "<--'🛋️ Therapy? I do 500 push-ups and yell ‘TOP G!’ 💪'-->",
        "<--'🪑 Rejection throne? I built it with hater tears! 💔👑'-->",
        "<--'📺 Netflix? I’m streaming empires on hustle TV! 🏰'-->",
        "<--'💰 No sleep? Money’s my pillow, I’m cuddling billions! 😴❌'-->",
        "<--'🧢 Haters? They’re just my unpaid hype squad! 🔥'-->",
        "<--'🏎️ Drive fast? I’m living free, dodging speed traps! 🗽'-->",
        "<--'⚔️ Discipline? My schedule’s so sharp, it cuts steel! 💯'-->",
        "<--'❌ Simping? Top G only chases bags, not hugs! 💘'-->",
        "<--'🧠 Matrix? I escaped it on a jet ski of grit! 🔓🤖'-->",
        "<--'⭕ Broke circle? That’s a cage, I’m flying solo! 🔗'-->",
        "<--'🗣️ Speak Lambo? My fluent flex shuts down car shows! 🏎️'-->",
        "<--'🛏️ Comfort zone? I burned it for firewood, bro! 🚪'-->",
        "<--'👔 Designer flex? I’m flexing freedom in flip-flops! 🕊️'-->",
        "<--'📅 Motivation? My schedule’s stricter than a drill sergeant! 📏'-->",
        "<--'😐 Emotions? They don’t pay rent, so I evicted ‘em! 💵'-->",
        "<--'♟️ Chess? I flipped the board and sold the table! 🖐️'-->",
        "<--'💸 Chase girls? Nah, I’m catfishing crypto whales! 📈'-->",
        "<--'💪 Toxic? Weakness is the real poison, I’m immune! 🚫'-->",
        "<--'🧠 Invest in me? My ROI’s bigger than Bezos’ yacht! 💹'-->",
        "<--'👊 Alpha standard? I set it so high, satellites crash! 🦁'-->",
        "<--'⏰ Snooze? I’m deadlifting dumbbells at dawn! 🏋️‍♂️'-->",
        "<--'🔥 Respect? I earn it, not tweet it like a simp! 💯'-->",

        // New Crazy Funny Top G Memes
        "<--'💥 Top G flex? I tipped a waiter with a private jet! ✈️'-->",
        "<--'🦁 My hustle’s so loud, it woke up Mars! 👽'-->",
        "<--'🍎 Lunch break? I ate a gold apple for the vibes! 💰'-->",
        "<--'🚨 Haters DM me? I reply with my bank balance! 📱'-->",
        "<--'💡 Motivation? I bench-pressed my doubts at 3 AM! 🏋️'-->",
        "<--'🧨 Discipline? My alarm clock salutes me, bro! ⏰'-->",
        "<--'🎤 Mic drop? I dropped a Bugatti on my haters! 🏎️'-->",
        "<--'💪 Alpha mode? I’m so G, gravity bows to me! 🌍'-->",
        "<--'🦅 Freedom flex? I bought Wi-Fi for the whole planet! 📶'-->",
        "<--'📡 Matrix glitch? I hacked it with Top G energy! 🖥️'-->",
        "<--'🎉 Party? I rented the moon for my Top G bash! 🌕'-->",
        "<--'🧀 Cheese? I’m slicing stacks of cash for my sandwich! 💵'-->",
        "<--'🚀 Hustle so hard, NASA’s hiring me for grit! 🌌'-->",
        "<--'💼 9-to-5? I’m 24/7 CEO of my own destiny! 🕰️'-->",
        "<--'😎 Top G vibes? I’m so rich, I tax my own shadow! 💸'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomMotivationMemeLine = topGMemes[Math.floor(Math.random() * topGMemes.length)];
            return `${word} ${randomMotivationMemeLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};


// gift filter
const giftMemes = (inputText, filterFrequency) => {
    const giftMemes = [
        // Remixed Originals
        "<--'🎁 Wrapped it so good, they’re framing the box! 🔒'-->",
        "<--'🔁 Regifting? I turned my trash into their treasure! 😂'-->",
        "<--'💸 Gift bag cost more than my car—worth it! 🛍️'-->",
        "<--'💳 Gift card? It’s my love in plastic, swipe it! 💅'-->",
        "<--'⏰ Last-minute gift? I shopped in the gas station’s finest aisle! 😬'-->",
        "<--'🧠 Thought counts? My gift’s 100% brain vibes! 🎁'-->",
        "<--'🍬 Unwrapping like a toddler on a Red Bull bender! 🧸'-->",
        "<--'🧾 Kept the receipt? Yeah, for my tax write-off! 😉'-->",
        "<--'📦 Small package? It’s returnable, so we’re Gucci! 📉'-->",
        "<--'🪙 Unwrapping’s my pirate treasure hunt—argh! 🗺️'-->",
        "<--'🙋‍♂️ Best gift? Me, delivered with a bow on my head! 🎉'-->",
        "<--'🤗 Gifts are hugs in glitter paper—unwrap my love! 🎁'-->",
        "<--'💻 Got you a meme? It’s trending on X, you’re welcome! 😂'-->",
        "<--'🎁 Surprise! It’s the socks you never dreamed of! 🤷‍♀️'-->",
        "<--'❤️ Wrapped with love and 47 rolls of tape—good luck! 🩹'-->",
        "<--'🌟 Unique gift? Like you, it’s one-of-a-kind chaos! 🎁'-->",
        "<--'😄 Found this gift at 3 AM online—pure joy! 🛒'-->",
        "<--'🎨 Gifting? I gave you the thing I wanted to yoink! 👀'-->",
        "<--'🎁 Not much? It’s wrapped in my tears and dreams! 😅'-->",
        "<--'😬 Your fake smile’s Oscar-worthy for this gift! 📸'-->",
        "<--'🪙 Token of love? It’s a literal arcade token! 🎁'-->",
        "<--'😎 Perfect gift? Nah, I got you this glitter bomb! 🎁'-->",
        "<--'🧠 Thought counts? I thought about a yacht, but here’s a mug! 🔥'-->",
        "<--'🛒 Wanted epic? I got you this dollar store glow stick! 🫣'-->",
        "<--'😏 Gift with sarcasm? It’s wrapped in shade! 🛍️'-->",
        "<--'🔥 Last year’s flop? This gift’s my redemption arc! 🎄'-->",
        "<--'🎁 Unwrapping vibes? It’s a rollercoaster of regret! ✨'-->",
        "<--'💸 Couldn’t afford it? Here’s a coupon for my vibes! 🧃'-->",
        "<--'🔧 Practical? This gift’s so useless, it’s art! 🚫'-->",
        "<--'✂️ Wrapped it myself? It’s 90% tape, 10% hope! 🧻'-->",
        "<--'❓ Mystery gift? I forgot what I bought you! 📦'-->",
        "<--'❤️ Love and confusion? This gift’s a 2-for-1 deal! 🤔'-->",
        "<--'🧦 Socks again? Your feet are living the VIP life! 😐'-->",
        "<--'📦 Late gift? Blame my carrier pigeon’s GPS! 😬'-->",
        "<--'🕯️ Candle gift? Inscribed ‘For your dark soul’! 😅'-->",
        "<--'🚚 Supply chain? My gift’s stuck in Narnia! 📉'-->",
        "<--'🚫 No express shipping? My love’s on the slow boat! 💨'-->",
        "<--'🎁 Not what you wanted? Perfect, it’s a prank gift! 😂'-->",
        "<--'💲 Price tag on? It’s proof I’m broke but trying! 🎁'-->",
        "<--'🧾 Tax write-off? This gift’s my accountant’s MVP! 🤣'-->",
        "<--'🔜 Next year’s gift? I’m saving for a gold-plated vibe! 🎉'-->",

        // New Crazy Funny Gift Memes
        "<--'💥 Gift so lit, it came with a fire extinguisher! 🧯'-->",
        "<--'🦁 Wrapped it in gold foil—your cat’s new throne! 🐱'-->",
        "<--'🍎 Forgot your gift? Here’s an apple I shined with my dreams! 😴'-->",
        "<--'🚨 Last-minute? I gifted you my Netflix password—expired! 📺'-->",
        "<--'💡 Perfect gift? A lamp to light up your bad decisions! 🛋️'-->",
        "<--'🧨 Gift’s a mystery box—could be socks or a lawsuit! ❓'-->",
        "<--'🎤 I sang ‘Happy Birthday’ on your gift card—Grammy vibes! 🎵'-->",
        "<--'💪 Gift wrap? I used my gym socks for extra flex! 🧦'-->",
        "<--'🦅 Gift’s so free, it flew away before delivery! 🕊️'-->",
        "<--'📡 Regifted a Wi-Fi router—password’s ‘BrokeButGifting’! 📶'-->",
        "<--'🎉 Party favor? I gifted you my unpaid parking tickets! 🚗'-->",
        "<--'🧀 Cheese grater gift? It’s for shredding your regrets! 🧀'-->",
        "<--'🚀 Gift so out-of-this-world, it’s stuck on Mars! 🌌'-->",
        "<--'💼 Budget gift? I wrapped my hopes in tinfoil! 🪩'-->",
        "<--'😎 Ultimate flex? Gave you a coupon for my Top G vibes! 🎁'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomGiftMemeLine = giftMemes[Math.floor(Math.random() * giftMemes.length)];
            return `${word} ${randomGiftMemeLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};

// filter breakup
const breakupMemes = (inputText, filterFrequency) => {
  const breakupMemes = [
    // Remixed Originals
    "<--'😴 Sleeping great knowing my ex is someone else’s glitch now! 💅'-->",
    "<--'💸 Closure? Nah, I want a refund for my wasted vibes! 🙄'-->",
    "<--'🧸 Dumped ‘em with a meme—call me the breakup Picasso! 📱'-->",
    "<--'🐢 Miss you? Like I miss 56K dial-up screeching! 📶'-->",
    "<--'🫠 ‘It’s not you, it’s me’? Finally, some truth serum! 👏'-->",
    "<--'🔫 Dodged a bullet? Nah, I dodged a whole nuke! 🕺'-->",
    "<--'🍦 Breakup diet? Ice cream pints and zero regrets! 😌'-->",
    "<--'🫣 Saw my ex—yep, my eyes just filed for divorce! 🚩'-->",
    "<--'🐶 Single? I’m adopting a dog to simp for instead! ❤️'-->",
    "<--'🎯 Ex’s new boo? Respect for surviving that chaos! 😅'-->",
    "<--'🫥 Thought we had spark? Turns out it was just static! 💔'-->",
    "<--'☮️ Left you for peace—best glow-up deal ever! ✨'-->",
    "<--'📶 Breakup’s like bad Wi-Fi—annoying, but I’m free! 😤'-->",
    "<--'🧠 My heart? You just gave it a migraine subscription! ❌'-->",
    "<--'🍋 Bitter? Nah, I’m lemonade, you’re just pulp! 🧃'-->",
    "<--'🧾 Exes? Expired coupons I’m tossing in the shredder! 🗑️'-->",
    "<--'🕵️‍♀️ Stalking? I’m just an FBI agent for my own drama! 📲'-->",
    "<--'👁️ Love’s blind? Breakups gave me 20/20 vision! 🔓'-->",
    "<--'💘 Heartbreak to self-love? Upgraded to VIP vibes! 💪'-->",
    "<--'🌌 Gave you space? Here’s the whole Milky Way, bye! 🚀'-->",
    "<--'💅 Too much? You’re just too basic for my sparkle! 🔥'-->",
    "<--'💫 Glow-up activated—ex who? I’m my own star! 💄'-->",
    "<--'🎧 Lost you, gained a banger breakup playlist! 🕺'-->",
    "<--'👻 Ghosted me? I’m a legend, you’re just a myth! 🦸'-->",
    "<--'😂 Crying? Nah, I’m LOLing at our old selfies! 💔'-->",
    "<--'📶 Single life? My heart’s got 5G connection now! ❤️'-->",
    "<--'💯 The one? Turns out I’m the whole squad! 🪞'-->",
    "<--'⚖️ Breakups hurt? Not as bad as your mixtape did! 😣'-->",
    "<--'🍕 Swapped you for pizza—less drama, more cheese! 🧘'-->",
    "<--'👁️ Left on read? I left you on yeeted, pal! 👋'-->",
    "<--'🧩 Not broken—just building a better vibe castle! 🔥'-->",
    "<--'⏳ Forever? Your love had a 30-day trial period! 🗓️'-->",
    "<--'🚩 Red flags? I’m opening a flag shop, thanks to you! 💃'-->",
    "<--'🆙 Emotionally upgraded—now running on premium vibes! ❤️'-->",
    "<--'😐 Trust issues? You turned my heart into Fort Knox! 🔒'-->",
    "<--'📈 Goodbye? More like ‘Level up, loser!’ 🎮'-->",
    "<--'🪜 Moved on? I’m climbing charts, you’re on mute! 🏆'-->",
    "<--'🧃 Lost love, gained snacks—best trade deal ever! 🍟'-->",
    "<--'🌱 Tears? I’m watering my glow-up garden, bro! 😭'-->",
    "<--'💔 Broke up? My memes are now shredded and iconic! 🤣'-->",
    "<--'📃 Loyalty? I gave you my heart, you gave me receipts! 🧃'-->",
    "<--'🧩 Tried fixing us? Fixed my Netflix queue instead! 🔧'-->",
    "<--'🕒 Breakup’s a blessing? Universe sent it via 2-day shipping! 🎁'-->",
    "<--'📶 No closure? Got Wi-Fi and Doritos, I’m thriving! 🍫'-->",
    "<--'💅 Cried once? Then I remembered I’m a whole vibe! ✨'-->",
    "<--'🙉 Exes loud? Their cringe could wake a coma! 🫠'-->",
    "<--'📵 Blocked, healed, and flexing my Top G energy! 🌟'-->",
    "<--'➖ Downgraded? I’m adding sparkle to my solo flex! ➕'-->",
    "<--'🌌 Their loss? Universe gifted me a VIP comeback! 🎁'-->",
    "<--'💘 Heart-aware? My radar’s dodging red flags now! 🔍'-->",
    "<--'🚫 Drama detox? I’m cleaner than my ex’s lies! 🎭'-->",

    // New Crazy Funny Breakup Memes
    "<--'💥 Ex dumped me? I dumped their vibes in a shredder! 🗑️'-->",
    "<--'🦁 Single flex? I’m roaring so loud, my ex moved planets! 👽'-->",
    "<--'🍎 Heartbreak snack? I ate their ego with hot sauce! 🌮'-->",
    "<--'🚨 Ghosted? I’m haunting their dreams with my glow-up! 👻'-->",
    "<--'💡 Love lesson? I’m a PhD in dodging bad vibes! 🎓'-->",
    "<--'🧨 Ex’s new vibe? I sent them a pity trophy by drone! 🏆'-->",
    "<--'🎤 Breakup anthem? I’m belting ‘Single and Savage’! 🎵'-->",
    "<--'💪 Moved on? I’m bench-pressing my ex’s regrets! 🏋️'-->",
    "<--'🦅 Freedom flex? I’m soaring, ex stuck in my jet wash! 🛫'-->",
    "<--'📡 Ex texted? I replied with my bank account’s laughter! 💸'-->",
    "<--'🎉 Single party? I’m DJing my own comeback tour! 🎧'-->",
    "<--'🧀 Ex’s drama? I’m slicing it like cheap mozzarella! 🗡️'-->",
    "<--'🚀 Breakup boost? I’m orbiting, ex stuck in dial-up! 🌌'-->",
    "<--'💼 Love contract? I shredded it and sold the confetti! 🎊'-->",
    "<--'😎 Top G breakup? I’m so over you, I taxed your vibes! 🔥'-->"
];

  const words = inputText.split(' ');

  const filtered = words.map((word, index) => {
    if ((index + 1) % filterFrequency === 0) {
      const randomBreakupMeme = breakupMemes[Math.floor(Math.random() * breakupMemes.length)];
      return `${word} ${randomBreakupMeme}`;
    }
    return word;
  });

  return filtered.join(' ');
};


// filter marriage
const marriageMemes = (inputText, filterFrequency) => {
    const marriageMemes = [
        // Remixed Originals
        "<--'🎯 Marriage? Dating went pro, now we’re arguing MVPs! 💍'-->",
        "<--'☕ Love you more than coffee? Don’t make me choose at 7 AM! ❤️'-->",
        "<--'🛠️ Marriage workshop? I’m fixing Wi-Fi, she’s maxing my card! 🛍️'-->",
        "<--'🤗 Embrace mistakes? My spouse hugged me, now I’m broke! 😅'-->",
        "<--'🛌 Marriage war? We fight, then nap with the enemy! ⚔️'-->",
        "<--'🦩 Flamingo act? I said stop, now we’re both one-legged! 🚫'-->",
        "<--'🃏 Marriage is cards? I drew ‘dishes’ and lost the game! ♥️♠️'-->",
        "<--'🧒 No kids? Our plants are free to a good home! 📦'-->",
        "<--'😘 Annoy forever? I’m the GOAT of spouse trolling! 🔔'-->",
        "<--'🍔 Hangry love? I’d fight a bear for your fries! 😤'-->",
        "<--'💵 Two incomes? One epic fight over pizza toppings! 🍽️'-->",
        "<--'☕ Coffee and donuts? We’re a match made in snack heaven! 🍩'-->",
        "<--'💖 Spouse’s my distraction? Stole my phone during TikTok time! 📱'-->",
        "<--'🛒 Text ‘buy eggs’? I’m married to the grocery list now! 🥚'-->",
        "<--'🍕 Love you more than pizza? Don’t test me at midnight! ❤️'-->",
        "<--'🤵 Right? She’s Always Right, I’m just the husband! 🤐'-->",
        "<--'😴 Dream come true? Also my snore alarm clock! 💞'-->",
        "<--'👓 Love’s blind? Marriage gave me 4K HD glasses! 💔'-->",
        "<--'👰 Miss Always Right? Her first name’s Wi-Fi password! 📢'-->",
        "<--'🛠️ Teamwork? I’m working, she’s curating my to-do list! 😅'-->",
        "<--'🍔 Love to the fridge? I’m sprinting for your leftovers! 🚶‍♂️'-->",
        "<--'🥜 PB&J vibes? Except you shrunk my jeans, babe! 🧺'-->",
        "<--'🛌 Sleepover? You’re my loudest hype man at 2 AM! 🎉'-->",
        "<--'🍽️ You complete me? Now complete the dishwasher load! 🧼'-->",
        "<--'🧻 Towel fights? I’m folding my way to a divorce lawyer! 🙃'-->",
        "<--'🔁 Dinner debate? We’re starving over ‘What’s for food?’ 🍟'-->",
        "<--'🤝 Compromise? I’m wrong, she’s right, universe balanced! 💡'-->",
        "<--'🥶 Thermostat wars? Our love’s hotter than this AC! 🔥'-->",
        "<--'📺 Blanket fights? I do, but the remote’s mine, babe! 🛏️'-->",
        "<--'😂 Mad forever? I’m picking fights for eternity! 💔'-->",
        "<--'❤️ Snoring? I love you, but you sound like a lawnmower! 😴'-->",
        "<--'🍽️ Dishwasher drama? You loaded it wrong, now we’re single! 😤'-->",
        "<--'😅 Sorry’s my love language? I’m fluent in ‘my bad’! 💬'-->",
        "<--'🛋️ Asked for space? Now we’re sharing a couch corner! ↔️'-->",
        "<--'❤️ Reality TV? Our marriage is the ultimate drama show! 📉📺'-->",
        "<--'🔌 Fights over chargers? Food and sleep are close seconds! 🍕😴'-->",
        "<--'💤 Snoring clause? I didn’t sign up for this remix! 🔇'-->",
        "<--'🍟 Stole your fries? It’s in our marriage contract, babe! 😂'-->",
        "<--'😡 Dinner fight? We’re hangry and yelling at menus! 🍽️'-->",
        "<--'💘 Pain in the neck? You’re my favorite headache, love! 😤'-->",
        "<--'😬 ‘Fine’ means I’m sleeping in the doghouse tonight! 📢'-->",
        "<--'💡 Lights on? I love you, but my electric bill doesn’t! 😒'-->",
        "<--'🙃 Sorry when right? Marriage taught me to fake it! ❤️'-->",

        // New Crazy Funny Marriage Memes
        "<--'💥 Marriage flex? We argue over who’s the better snorer! 😴'-->",
        "<--'🦁 Spouse’s vibe? Roars loud, steals my side of the bed! 🛏️'-->",
        "<--'🍎 Forgot our anniversary? Gave you an apple, call it love! 😬'-->",
        "<--'🚨 Dish duty? I’m dodging it like a marital ninja! 🥷'-->",
        "<--'💡 Thermostat war? I’m freezing, she’s got lava vibes! 🌋'-->",
        "<--'🧨 Romance? We sparked over who gets the last fry! 🍟'-->",
        "<--'🎤 Love song? We duet ‘Where’s the remote?’ daily! 📺'-->",
        "<--'💪 Teamwork? I lift groceries, she lifts my spirit! 🛍️'-->",
        "<--'🦅 Marriage perk? Free fights with my VIP critic! 🗣️'-->",
        "<--'📡 Wi-Fi down? Our argument’s got better signal! 📶'-->",
        "<--'🎉 Anniversary gift? I wrapped my apology in glitter! 🎁'-->",
        "<--'🧀 Leftovers war? I’m guarding the fridge like a hawk! 🦅'-->",
        "<--'🚀 Married life? We’re orbiting each other’s chaos! 🌌'-->",
        "<--'💼 Vows update? Added ‘Don’t touch my snacks’ clause! 🍪'-->",
        "<--'😎 Top G spouse? I’m the dictator of dirty socks! 🧦'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomMarriageMemeLine = marriageMemes[Math.floor(Math.random() * marriageMemes.length)];
            return `${word} ${randomMarriageMemeLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};

// filter marriage ends
// filter sad starts
const sadMemes = (inputText, filterFrequency) => {
    const sadMemes = [
        // Remixed Originals
        "<--'🍋 Life gave lemons? I’m allergic and broke, send help! 🚫'-->",
        "<--'😢 Laughed so hard? Nah, my face’s just leaking sadness! 😅'-->",
        "<--'😐 Smiling outside, buffering existential dread inside! 🔄'-->",
        "<--'💍 Mood ring? It’s smoking and filing for divorce! 💨'-->",
        "<--'🩸 Positive vibes? My blood type’s ‘Eternally B-Negative’! 🙃'-->",
        "<--'🛋️ Pro in procrastination, PhD in sad snacking! 😭'-->",
        "<--'🌑 Shadow ditched me? Even my shade’s over my vibes! 👋'-->",
        "<--'☕ Coffee needs coffee? Mine’s on a double espresso IV! ➡️☕'-->",
        "<--'🪞 Mirror cracked? It saw my Monday face and gave up! 💔'-->",
        "<--'🪴 Thriving plants? They’re plastic, like my smile! 😔'-->",
        "<--'🧍‍♂️ Support group? Just me arguing with my echo! 🧍‍♂️'-->",
        "<--'🎶 Feelings song? It’s 10 minutes of dial-up modem screams! 😶'-->",
        "<--'👻 Flaws ghosted me? Even my quirks canceled my vibe! 💔'-->",
        "<--'📚 Therapist’s plot twist? I’m the sequel nobody asked for! 🌀'-->",
        "<--'🖤 Mood ring stuck on black? It’s vibing with my soul! 🪬'-->",
        "<--'🕵️‍♂️ Find myself? I’m hiding in the snack aisle! 🚫'-->",
        "<--'📓 Journal’s rain doodles? My tears are the ink, bro! 🌧️'-->",
        "<--'🤔 Personality test? It just shrugged and logged off! ❓'-->",
        "<--'🌙 Sunshine vibes? I’m stuck in eternal emo nighttime! 🌤️'-->",
        "<--'📱 Meditation app? It groaned and deleted itself! 😮‍💨'-->",
        "<--'🎸 Problems formed a band? They’re touring my brain! 🎤'-->",
        "<--'🚆 Light at tunnel’s end? It’s a freight train of feels! 💥'-->",
        "<--'🧮 Blessings count? I got to zero and my calculator quit! 0️⃣'-->",
        "<--'✅ To-do list? Step one: cry into my cereal! 😭'-->",
        "<--'💃 Danced sadness away? Now I’m sad *and* limping! 🦵💢'-->",
        "<--'📖 Self-help book? It’s begging for therapy now! 🆘'-->",
        "<--'🎤 Told a joke? Got banned from comedy for sad vibes! 🙃'-->",
        "<--'👤 Bigger person? Now I’m just lonely with extra height! 🔍'-->",
        "<--'🎨 Painted smile? Waterproof, but my vibes are soggy! 🙂'-->",
        "<--'🧘‍♂️ Laughter yoga? I sobbed so hard, they refunded me! 😂😭'-->",
        "<--'🪴 Fake plants, fake enthusiasm? I’m the king of plastic! 🤥'-->",
        "<--'📝 Quotes gave up? They’re picketing outside my brain! 😵'-->",
        "<--'🧺 Laundry’s growing? It’s my only thriving relationship! 📈'-->",
        "<--'📵 Happy place? It’s got zero bars and bad Wi-Fi! 🏝️'-->",
        "<--'🖊️ Journaling? Pen ran dry, now I’m crying in crayon! 🫥'-->",
        "<--'🛏️ Sleep schedule? It ghosted me for a better life! 👻'-->",
        "<--'🧀 Cheer up? Autocorrect said ‘cheese up,’ now I’m a nacho! 😩'-->",
        "<--'🎈 Spirit animal? A deflated balloon at a sad clown party! 😮‍💨'-->",
        "<--'🕳️ Screamed into the void? It roasted me back! 🗣️'-->",
        "<--'🌌 Universe’s sign? A typo saying ‘You’re doomed’! 🔤'-->",

        // New Crazy Funny Sad Memes
        "<--'💥 Sad vibes? My tears started a flash flood warning! 🌊'-->",
        "<--'🦁 Tried to roar? My sadness meowed like a wet cat! 🐱'-->",
        "<--'🍎 Snack therapy? Ate my feelings, now I’m sad and bloated! 😭'-->",
        "<--'🚨 Motivation search? Got a 404: Hope Not Found error! 📱'-->",
        "<--'💡 Happy thoughts? My brain’s running on a dim bulb! 💡'-->",
        "<--'🧨 Sad playlist? It’s just my fridge humming on loop! 🎵'-->",
        "<--'🎤 Open mic? I cried so hard, they gave me a tissue trophy! 🏆'-->",
        "<--'💪 Tried to vibe? My sadness deadlifted my dreams! 🏋️'-->",
        "<--'🦅 Fly high? My sadness clipped my wings with scissors! ✂️'-->",
        "<--'📡 Wi-Fi of hope? It’s password-protected and I’m locked out! 📶'-->",
        "<--'🎉 Sad party? I invited my regrets, they brought plus-ones! 🎈'-->",
        "<--'🧀 Sad snack? My cheese stick’s more grated than my soul! 🗑️'-->",
        "<--'🚀 Tried to soar? My sadness strapped me to a lawn chair! 🌌'-->",
        "<--'💼 Job at joy? I got laid off for excessive moping! 😴'-->",
        "<--'😎 Sad flex? My tears are so extra, they’re taxed by Top G! 💸'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomSadMemeLine = sadMemes[Math.floor(Math.random() * sadMemes.length)];
            return `${word} ${randomSadMemeLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};


// nine to five filter starts
const nineToFiveMemes = (inputText, filterFrequency) => {
    const nineToFiveMemes = [
        // Remixed Originals
        "<--'😵‍💫 Job not too jobby? I want a gig that’s just vibes! 💼'-->",
        "<--'⏰ 9:01 AM? Already dreaming of my couch and snacks! 😤'-->",
        "<--'🔁 ‘Circle back’? Boss, I’m spiraling into despair! 😑'-->",
        "<--'📅 Monday blues? I’m living for Saturday’s Netflix! 😩'-->",
        "<--'☕ Coffee? My blood’s 90% espresso, 10% regret! 😵'-->",
        "<--'📧 Meeting? Bro, this Zoom could’ve been a Slack ping! 🙄'-->",
        "<--'🧟‍♂️ Clock in like a zombie, sprint out like Usain Bolt! 🏃‍♂️'-->",
        "<--'💸 Paycheck gone? Rent yeeted my money to Narnia! 🏠💨'-->",
        "<--'☕ Surviving on caffeine and top-tier shade! 💀'-->",
        "<--'🕘 One more task? Now I’m working till the apocalypse! 🌙'-->",
        "<--'👀 Fake typing? I’m a meme-browsing ninja at work! 💻🤣'-->",
        "<--'🍩 Donuts gone? My coworker’s now my office nemesis! ❌😭'-->",
        "<--'📩 Reply-all oops? Just emailed my crush to HR! 😳'-->",
        "<--'💻 Crash before saving? My soul’s in the blue screen now! 🔥😱'-->",
        "<--'⏳ Lunch countdown? I’m hungrier than a Wi-Fi-less Zoom call! 🍱'-->",
        "<--'😤 4:59 PM meeting? Boss, my vibes are already on PTO! 📞'-->",
        "<--'😮‍💨 Tuesday realization? I’m only 20% through this hell! 📆'-->",
        "<--'❌ Vacation denied? I’m mentally on a beach in Fiji! 🏖️'-->",
        "<--'📂 Project done? Surprise, here’s a sequel nobody asked for! ➡️📂'-->",
        "<--'😅 Boss nearby? I’m typing gibberish like a pro! 🗂️'-->",
        "<--'🖨️ Printer jammed again? It’s plotting my downfall! 🤬'-->",
        "<--'🍱 Lunch thief? I’m setting a trap with ghost pepper sauce! 👀😤'-->",
        "<--'⏰ Fifth snooze? My bed’s holding me hostage! 😴'-->",
        "<--'📶 Zoom cuts out? Good, I was napping anyway! ❌🫠'-->",
        "<--'😰 Meme to boss? Just sent ‘Top G’ to my manager! 📤😂'-->",
        "<--'🎤 Muted all meeting? Spilled my life story to no one! ❌'-->",
        "<--'🕐 Quick break? Accidentally scrolled X for an hour! 🫣'-->",
        "<--'🏠 Desk’s my home? My chair’s got my butt’s zip code! 🖥️'-->",
        "<--'🛌 Work dreams? My weekend’s haunted by spreadsheets! 💼'-->",
        "<--'💰 5-cent raise? I’m rich enough for half a gum stick! 🪙😐'-->",
        "<--'🖥️ Zoom fatigue? My webcam’s filing for workers’ comp! 😵'-->",
        "<--'🧟‍♀️ Work to live? This job’s turning me into a corporate ghoul! 💼'-->",
        "<--'🌮 Staring at screen? My brain’s on a taco vacation! 💭'-->",
        "<--'💌 ‘Hope you’re well’? Nah, your email gave me hives! 😓'-->",
        "<--'🎓 Master’s in window minimizing? I’m the Usain Bolt of Alt+Tab! 🖱️'-->",
        "<--'📶 Boss wants OT? Oops, my Wi-Fi just joined a union! 💨'-->",
        "<--'🫠 Friday 5 PM meeting? My soul’s already clocked out! 📅'-->",
        "<--'🧾 Excel hell? My spreadsheet’s roasting me in Comic Sans! 🔥'-->",
        "<--'📊 Quitting math? Can I afford peace or just ramen? 🕊️'-->",
        "<--'👨‍👩‍👧‍👦 HR’s ‘family’? More like dysfunctional sitcom vibes! 🚩'-->",
        "<--'📎 No attachment? I’ve been ghosting files since Y2K! ❌'-->",
        "<--'☀️ Morning person? I’m just a caffeinated cryptid! 🛌😵‍💫'-->",
        "<--'📤 Out of patience? My OOO’s set to ‘eternity’! 😤'-->",
        "<--'🤝 Group project job? I’m carrying the team like Atlas! 🗂️'-->",
        "<--'🤕 Sick day? I’m recovering from email overload! 🧘‍♂️'-->",
        "<--'📬 Unread emails? They’re multiplying like roaches! 📈'-->",
        "<--'🏅 Survived work? Gimme a medal or at least a nap! 😮‍💨'-->",
        "<--'📦 Think outside the box? I’m thinking outside this job! 🚪'-->",
        "<--'🕒 15-min break? My only reason to live till 5 PM! 🍫'-->",
        "<--'📝 LinkedIn trap? Signed my soul to this desk life! 😭'-->",
        "<--'🛋️ 9-to-5 funds therapy? For surviving 9-to-5 trauma! 💳'-->",
        "<--'🔍 80% looking busy? I’m an Oscar-worthy slacker! 📋'-->",
        "<--'😁 Fake meeting smile? My face deserves a raise! 💼'-->",
        "<--'👁️ ‘Look tired’? Nah, I look like I sold my soul for Wi-Fi! 💀'-->",

        // New Crazy Funny 9-to-5 Memes
        "<--'💥 Boss’s pep talk? Now I’m motivated to yeet my laptop! 💻'-->",
        "<--'🦁 Office vibes? I’m a lion stuck in a cubicle zoo! 🗂️'-->",
        "<--'🍎 Lunch break? Ate my sadness with a side of stale chips! 😭'-->",
        "<--'🚨 Team meeting? Just me nodding while planning my escape! 🏃‍♂️'-->",
        "<--'💡 Bright idea? Got squashed by a PowerPoint avalanche! 📊'-->",
        "<--'🧨 Deadline panic? I’m typing with my tears for ink! ⏰'-->",
        "<--'🎤 Zoom karaoke? Accidentally sang ‘I Quit’ to HR! 🎵'-->",
        "<--'💪 Work grind? I’m lifting emails heavier than dumbbells! 📬'-->",
        "<--'🦅 Freedom dream? I’m plotting my exit in Comic Sans! 🖨️'-->",
        "<--'📡 Wi-Fi’s down? I’m sending smoke signals to IT! 💨'-->",
        "<--'🎉 Payday flex? Spent it all on coffee and existential dread! ☕'-->",
        "<--'🧀 Office snacks? I’m guarding the pretzels like a dragon! 🐉'-->",
        "<--'🚀 Career goals? I’m orbiting a desk till retirement! 🌌'-->",
        "<--'💼 Boss’s ‘urgent’ task? It’s urgent I nap first! 😴'-->",
        "<--'😎 Top G grind? I’m so 9-to-5, I tax my own coffee breaks! 💸'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomMeme = nineToFiveMemes[Math.floor(Math.random() * nineToFiveMemes.length)];
            return `${word} ${randomMeme}`;
        }
        return word;
    });

    return filtered.join(' ');
};


// nine to five filter ends
// bottom g starts
const bottomGMemes = (inputText, filterFrequency) => {
    const bottomGLines = [
        // Remixed Originals
        "<--'🚌 No Bugatti? My bus pass flexes harder than your lease! 💳'-->",
        "<--'📺 Push-ups? I’m jacked from reaching for the remote! 🛋️'-->",
        "<--'🚰 Real men drink tap water? I’m hydrated and broke! 🫡'-->",
        "<--'⏰ Alarms? I sleep through ‘em like a hibernation champ! 💤'-->",
        "<--'🛏️ Embrace naps? I’m the snooze button’s MVP! 😴'-->",
        "<--'🛌 Chasing dreams? I’m sprinting in my REM cycle! 💭'-->",
        "<--'🍀 Bottom G luck? Waiting for a four-leaf clover DM! 🙄'-->",
        "<--'🍿 Feelings and snacks? I’m munching my emotions! 😭'-->",
        "<--'😵 Motivation over discipline? I’ll start tomorrow… maybe! 💤'-->",
        "<--'💵 Monopoly money? My bank account’s a board game! 🎲'-->",
        "<--'🐌 Weakness? It’s my factory setting, no updates! 💔'-->",
        "<--'🥱 Thinking about work? I’m exhausted from the thought! 💼'-->",
        "<--'🦄 Success a myth? I’m chasing unicorns on Netflix! 📉'-->",
        "<--'📲 Trends? I’m so late, I’m vibing with 2010 TikTok! 📉'-->",
        "<--'🫣 Fear’s my BFF? We’re planning a panic party! 👯‍♂️'-->",
        "<--'👍 Need validation? I’m begging strangers for likes! 👀'-->",
        "<--'👕 Comfort’s my life? I’m married to my sweatpants! 🩴🛋️'-->",
        "<--'🌧️ Bad days? My life’s a double feature of worse! ☠️'-->",
        "<--'📋 Excuses? I’m the Picasso of dodging blame! 💬'-->",
        "<--'📢 Complaining? I’m the world champ of whining! 😤'-->",
        "<--'🔁 Losing lessons? I forgot to take notes, oops! ❌📘'-->",
        "<--'🛑 Opportunities pass? I’m waving at ‘em from my couch! 🚶'-->",
        "<--'👎 Negativity? It’s my middle name and my Wi-Fi password! 🥀'-->",
        "<--'⏰ Clock’s ticking? I’m crying into my stale cereal! 😭'-->",
        "<--'😰 Fear failure *and* success? I’m scared of vibes too! 📈📉'-->",
        "<--'📺 Plan B? It’s Netflix and a snack coma, baby! 🛑'-->",
        "<--'😐 Mediocrity? I’m the mayor of Average Town! 🏠'-->",
        "<--'💤 Big dreams? I’m napping on a cloud of nothing! 💭📉'-->",
        "<--'✨ Magic fix? I’m wishing for a fairy god-boss! 😬'-->",
        "<--'🌠 Star wishes? I’m praying for free Wi-Fi forever! 🤞'-->",
        "<--'🚪 Quitting’s a retreat? I’m Napoleon of napping! 🏃‍♂️'-->",
        "<--'📖 Self-help quote? Read one, now I’m on a vibe strike! 😌'-->",
        "<--'🐌 Slow success? I’m moving at sloth-on-vacation speed! 📉'-->",
        "<--'📱 Productivity app? Downloaded it, then deleted my ambition! 🗑️'-->",
        "<--'🧊 Chilling on resume? I’m the CEO of couch vibes! 💤'-->",
        "<--'🍩 Goals? I’m jogging to the donut aisle, full speed! 👟'-->",
        "<--'🛋️ Grind? I’m reclining so hard, I broke the sofa! 😎'-->",
        "<--'🚫 Hard work? Sounds like a bug, I’m calling IT! 💪'-->",
        "<--'😂 LOL while crying? My keyboard’s soggy from emo vibes! 😭'-->",
        "<--'📸 Savings? Just screenshots of Lambos I’ll never touch! 💸'-->",
        "<--'😤 Tried once? Burned my ambition in a toaster fire! ❌'-->",
        "<--'😩 Rise and grind? I’m rising to whine at my coffee! ☕'-->",
        "<--'🚩 Red flags? I’m the grand marshal of bad vibe parades! 🎉'-->",
        "<--'🍜 Bottom G diet? Regrets, noodles, and existential sauce! 😞'-->",
        "<--'🧘‍♂️ Work-life balance? I’m 100% life, 0% effort! 🛌'-->",
        "<--'🐢 Procrastination? My lifestyle’s sponsored by ‘later’! 🛋️'-->",
        "<--'🎶 Failure vibe? I’m dropping a sad mixtape on SoundCloud! 😎📉'-->",
        "<--'🔁 Snooze hustle? I’m world champ at alarm dodging! ⏰😪'-->",
        "<--'💡 Glow-up? My power’s out, I’m glowing in the dark! 💀'-->",
        "<--'📺 Manifest success? I’m binge-watching my dreams fail! 🌌'-->",

        // New Crazy Funny Bottom G Memes
        "<--'💥 Bottom G flex? I tripped chasing a free sample! 🧀'-->",
        "<--'🦁 Ambition? My roar’s a yawn that echoes failure! 😴'-->",
        "<--'🍎 Hustle snack? Ate my dreams with expired yogurt! 😭'-->",
        "<--'🚨 Motivation 911? I called, they put me on hold! 📱'-->",
        "<--'💡 Success spark? My brain’s running on a dead battery! 🔋'-->",
        "<--'🧨 Goal plan? I wrote it on a napkin, then lost it! 📝'-->",
        "<--'🎤 Life anthem? I’m singing ‘Ode to My Couch’ off-key! 🛋️'-->",
        "<--'💪 Grind mode? I’m lifting bags of chips to my face! 🍟'-->",
        "<--'🦅 Soaring dreams? I’m grounded in my mom’s basement! 🏠'-->",
        "<--'📡 Wi-Fi hope? My signal’s weaker than my work ethic! 📶'-->",
        "<--'🎉 Failure party? I’m the DJ spinning sad cat videos! 🐱'-->",
        "<--'🧀 Life goals? I’m shredding cheese, not dreams! 🗑️'-->",
        "<--'🚀 Career launch? I’m stuck in the couch’s orbit! 🌌'-->",
        "<--'💼 Job hunt? Applied to be a professional napper! 😴'-->",
        "<--'😎 Bottom G vibe? I’m so chill, I tax my own snooze! 💸'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomLine = bottomGLines[Math.floor(Math.random() * bottomGLines.length)];
            return `${word} ${randomLine}`;
        }
        return word;
    });

    return filtered.join(' ');
};


// bottom g ends
const workoutMemes = (inputText, filterFrequency) => {
    const workoutMemes = [
        // Remixed Originals
        "<--'🦵 Skipped leg day? Now I’m waddling like a sad penguin! 💀'-->",
        "<--'🏋️‍♂️ Lift things? I’m yeeting weights and my dignity! 😅'-->",
        "<--'🔥 Warm-up? My stretches are your Olympic gold! 😤'-->",
        "<--'💇‍♂️ Gym hair? Rocking a sweat-soaked mop, unbothered! 💪'-->",
        "<--'🍹 Heard ‘rum’ not ‘run’? I’m sprinting to the bar! 🏃'-->",
        "<--'💢 Sore today? Tomorrow I’m a jacked superhero! 💪'-->",
        "<--'👕 Flexed so hard, my shirt filed for divorce! 💥'-->",
        "<--'💪 Do you lift, bro? Or are your arms just vibes? 🤨'-->",
        "<--'🏋️‍♀️ Squat life? I’m saving the world, one rep at a time! 🧠'-->",
        "<--'🌮 Workout for tacos? I’m deadlifting for a burrito too! 💪'-->",
        "<--'😣 Pain’s weakness leaving? Or my body’s quitting life! 🏋️‍♀️'-->",
        "<--'✨ No sweat? I’m sparkling like a disco ball in tears! 💦'-->",
        "<--'🕒 Running late? My cardio’s dodging deadlines! 🏃‍♂️'-->",
        "<--'🍗 Lift to eat? I’m bulking for buffet domination! 💪'-->",
        "<--'🍫 Vending machine? My gym’s MVP, hands down! 🤖'-->",
        "<--'📺 Marathons? I’m crushing Netflix seasons, not miles! 🏁'-->",
        "<--'😅 Abs? Absolutely napping on my pizza dreams! 🍕'-->",
        "<--'🥊 Workout to punch? I’m dodging HR complaints instead! 🙃'-->",
        "<--'🍕 Fitness pizza? I’m curling slices to my face! 😆'-->",
        "<--'🧘‍♂️ Exhaustion’s relaxing? I’m Zen but my quads quit! 😫'-->",
        "<--'🤬 Burpees? I love-hate ‘em like my ex’s mixtape! ❤️'-->",
        "<--'💪 Lift to distress? My weights are my therapists! 🧠'-->",
        "<--'❌ Rest day? She ghosted me for a dumbbell date! 🛌'-->",
        "<--'🐅 Beast mode? I’m roaring louder than my gym playlist! 🔥'-->",
        "<--'🏋️‍♂️ Deadlifts > therapy? My barbell’s my bestie! 🧠'-->",
        "<--'🤔 Abs in the kitchen? I’m baking lasagna gains! 🍝'-->",
        "<--'🎒 Lift baggage? I’m curling my emotional luggage! 😓'-->",
        "<--'🍕 No pain, no pizza? I’m suffering for a deep dish! 💥'-->",
        "<--'🎧 Playlist reps? My music’s jacked, I’m slacking! 😅'-->",
        "<--'💤 One more rep? Then I’m napping on the bench! 💪'-->",
        "<--'🛒 Grocery carry? I’m flexing for one-trip glory! 💪'-->",
        "<--'🍩 Squat for snacks? I’m lunging for donut deals! 🦵'-->",
        "<--'🏋️‍♀️ Gym now? Tacos are my post-workout soulmate! 🌮'-->",
        "<--'🤸‍♂️ Push-ups? My floor’s mocking my life choices! 😵'-->",
        "<--'😬 Running? I thought you said ‘funning’ with ice cream! 👟'-->",
        "<--'🛏️ Bench press? Only pressure I signed up for! 🏋️‍♂️'-->",
        "<--'💪 Mirror, who’s swole? Me, after one bicep curl! 🪞'-->",
        "<--'⏳ Muscles loading? Stuck on 1% and buffering! 💪'-->",
        "<--'😭 Sweat or fat crying? My body’s a tearjerker! 💦'-->",
        "<--'🦵 Conquered leg day? I’m the king of wobbly walks! 🏆'-->",
        "<--'🧘‍♂️ Gym over therapy? I’m lifting to dodge my bills! 💸'-->",
        "<--'🛌 Squats = naps? I’d be shredded by now! 🦵'-->",
        "<--'🍕 Compete with pizza? I’m racing slices to my mouth! 🥇'-->",

        // New Crazy Funny Workout Memes
        "<--'💥 Flex so hard? My gym mirror filed a restraining order! 🪞'-->",
        "<--'🦁 Beast mode? I roared, but it was just a protein fart! 💨'-->",
        "<--'🍎 Post-workout snack? Ate my gains with a side of regret! 😭'-->",
        "<--'🚨 Treadmill sprint? I tripped and became a gym meme! 🏃‍♂️'-->",
        "<--'💡 Fitness goal? To not nap on the yoga mat again! 🧘‍♂️'-->",
        "<--'🧨 One more rep? My dumbbell’s laughing at my struggle! 🏋️‍♀️'-->",
        "<--'🎤 Gym playlist? I’m hyped, but my quads called in sick! 🎵'-->",
        "<--'💪 Gains check? My biceps grew a vibe, not a muscle! 🦵'-->",
        "<--'🦅 Swole dreams? I’m grounded by my love for nachos! 🧀'-->",
        "<--'📡 Gym Wi-Fi? I’m connected to pain, not progress! 📶'-->",
        "<--'🎉 Fitness party? I’m DJing my own sweat-soaked fail! 💦'-->",
        "<--'🧀 Protein shake? I chugged cheese dip by mistake! 🥤'-->",
        "<--'🚀 Fitness journey? I’m orbiting the snack bar instead! 🌌'-->",
        "<--'💼 Gym grind? I’m CEO of tripping over my own ego! 😴'-->",
        "<--'😎 Top G gains? I’m taxing my sweat for ultimate vibes! 💸'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomMeme = workoutMemes[Math.floor(Math.random() * workoutMemes.length)];
            return `${word} ${randomMeme}`;
        }
        return word;
    });

    return filtered.join(' ');
};



// elon musk memes starts
const elonMemes = (inputText, filterFrequency) => {
    const elonFunny = [
        // Remixed Originals
        "<--'🦵 Skipped leg day? Now I’m waddling like a sad penguin! 💀'-->",
        "<--'🏋️‍♂️ Lift things? I’m yeeting weights and my dignity! 😅'-->",
        "<--'🔥 Warm-up? My stretches are your Olympic gold! 😤'-->",
        "<--'💇‍♂️ Gym hair? Rocking a sweat-soaked mop, unbothered! 💪'-->",
        "<--'🍹 Heard ‘rum’ not ‘run’? I’m sprinting to the bar! 🏃'-->",
        "<--'💢 Sore today? Tomorrow I’m a jacked superhero! 💪'-->",
        "<--'👕 Flexed so hard, my shirt filed for divorce! 💥'-->",
        "<--'💪 Do you lift, bro? Or are your arms just vibes? 🤨'-->",
        "<--'🏋️‍♀️ Squat life? I’m saving the world, one rep at a time! 🧠'-->",
        "<--'🌮 Workout for tacos? I’m deadlifting for a burrito too! 💪'-->",
        "<--'😣 Pain’s weakness leaving? Or my body’s quitting life! 🏋️‍♀️'-->",
        "<--'✨ No sweat? I’m sparkling like a disco ball in tears! 💦'-->",
        "<--'🕒 Running late? My cardio’s dodging deadlines! 🏃‍♂️'-->",
        "<--'🍗 Lift to eat? I’m bulking for buffet domination! 💪'-->",
        "<--'🍫 Vending machine? My gym’s MVP, hands down! 🤖'-->",
        "<--'📺 Marathons? I’m crushing Netflix seasons, not miles! 🏁'-->",
        "<--'😅 Abs? Absolutely napping on my pizza dreams! 🍕'-->",
        "<--'🥊 Workout to punch? I’m dodging HR complaints instead! 🙃'-->",
        "<--'🍕 Fitness pizza? I’m curling slices to my face! 😆'-->",
        "<--'🧘‍♂️ Exhaustion’s relaxing? I’m Zen but my quads quit! 😫'-->",
        "<--'🤬 Burpees? I love-hate ‘em like my ex’s mixtape! ❤️'-->",
        "<--'💪 Lift to distress? My weights are my therapists! 🧠'-->",
        "<--'❌ Rest day? She ghosted me for a dumbbell date! 🛌'-->",
        "<--'🐅 Beast mode? I’m roaring louder than my gym playlist! 🔥'-->",
        "<--'🏋️‍♂️ Deadlifts > therapy? My barbell’s my bestie! 🧠'-->",
        "<--'🤔 Abs in the kitchen? I’m baking lasagna gains! 🍝'-->",
        "<--'🎒 Lift baggage? I’m curling my emotional luggage! 😓'-->",
        "<--'🍕 No pain, no pizza? I’m suffering for a deep dish! 💥'-->",
        "<--'🎧 Playlist reps? My music’s jacked, I’m slacking! 😅'-->",
        "<--'💤 One more rep? Then I’m napping on the bench! 💪'-->",
        "<--'🛒 Grocery carry? I’m flexing for one-trip glory! 💪'-->",
        "<--'🍩 Squat for snacks? I’m lunging for donut deals! 🦵'-->",
        "<--'🏋️‍♀️ Gym now? Tacos are my post-workout soulmate! 🌮'-->",
        "<--'🤸‍♂️ Push-ups? My floor’s mocking my life choices! 😵'-->",
        "<--'😬 Running? I thought you said ‘funning’ with ice cream! 👟'-->",
        "<--'🛏️ Bench press? Only pressure I signed up for! 🏋️‍♂️'-->",
        "<--'💪 Mirror, who’s swole? Me, after one bicep curl! 🪞'-->",
        "<--'⏳ Muscles loading? Stuck on 1% and buffering! 💪'-->",
        "<--'😭 Sweat or fat crying? My body’s a tearjerker! 💦'-->",
        "<--'🦵 Conquered leg day? I’m the king of wobbly walks! 🏆'-->",
        "<--'🧘‍♂️ Gym over therapy? I’m lifting to dodge my bills! 💸'-->",
        "<--'🛌 Squats = naps? I’d be shredded by now! 🦵'-->",
        "<--'🍕 Compete with pizza? I’m racing slices to my mouth! 🥇'-->",

        // New Crazy Funny Workout Memes
        "<--'💥 Flex so hard? My gym mirror filed a restraining order! 🪞'-->",
        "<--'🦁 Beast mode? I roared, but it was just a protein fart! 💨'-->",
        "<--'🍎 Post-workout snack? Ate my gains with a side of regret! 😭'-->",
        "<--'🚨 Treadmill sprint? I tripped and became a gym meme! 🏃‍♂️'-->",
        "<--'💡 Fitness goal? To not nap on the yoga mat again! 🧘‍♂️'-->",
        "<--'🧨 One more rep? My dumbbell’s laughing at my struggle! 🏋️‍♀️'-->",
        "<--'🎤 Gym playlist? I’m hyped, but my quads called in sick! 🎵'-->",
        "<--'💪 Gains check? My biceps grew a vibe, not a muscle! 🦵'-->",
        "<--'🦅 Swole dreams? I’m grounded by my love for nachos! 🧀'-->",
        "<--'📡 Gym Wi-Fi? I’m connected to pain, not progress! 📶'-->",
        "<--'🎉 Fitness party? I’m DJing my own sweat-soaked fail! 💦'-->",
        "<--'🧀 Protein shake? I chugged cheese dip by mistake! 🥤'-->",
        "<--'🚀 Fitness journey? I’m orbiting the snack bar instead! 🌌'-->",
        "<--'💼 Gym grind? I’m CEO of tripping over my own ego! 😴'-->",
        "<--'😎 Top G gains? I’m taxing my sweat for ultimate vibes! 💸'-->"
    ];

    const words = inputText.split(' ');

    const filtered = words.map((word, index) => {
        if ((index + 1) % filterFrequency === 0) {
            const randomMeme = elonFunny[Math.floor(Math.random() * elonFunny.length)];
            return `${word} ${randomMeme}`;
        }
        return word;
    });

    return filtered.join(' ');
};

