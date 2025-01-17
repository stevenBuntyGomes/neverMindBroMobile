import nlp from "compromise";
import { filterSlang } from "./filterSlang";

export const filterFunction = (inputText, filterType) => {
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
        return filterSlang(nuke(inputText));
    }
    if (filterType === 'president') {
        return filterSlang(president(inputText));
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
        "smile": "😊", "laugh": "😂", "cry": "😭", "crying": "😭", "angry": "😠", "happy": "😀", "sad": "😞",
        "love": "❤️", "kiss": "😘", "hug": "🤗", "surprise": "😲", "shy": "😊", "cool": "😎",
        "sleep": "😴", "nervous": "😬","confused": "😕", "thinking": "🤔","heart": "❤️","thumbs up": "👍","like": "👍",
        "clap": "👏", "run": "🏃","walk": "🚶","dance": "💃","swim": "🏊","play": "🎮","read": "📖",
        "write": "✍️","sing": "🎤","drink": "🍷","eat": "🍔","sleep": "🛏️","party": "🎉","partying face": "🥳",
        "moon": "🌙","star": "⭐","fire": "🔥","water": "💧","tree": "🌳","flower": "🌸",
        "flowers": "🌸","bird": "🐦","cat": "🐱","dog": "🐶","fish": "🐟","car": "🚗","bus": "🚌","bike": "🚲","train": "🚆","plane": "✈️",
        "boat": "🚤","rocket": "🚀","house": "🏠","school": "🏫","beach": "🏖️","mountain": "🏔️","phone": "📱",
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

const nuke = (inputText) => {
    // Nuclear "threat" phrases for comedic effect
    const nuclearPhrases = [
        "'☢️ prepare for the BOOM! ☢️'",
        "'💥 incoming nuke! 💥'",
        "'💣 just kidding... or am I? 💣'",
        "'☠️ kaboom in 3...2...1 ☠️'",
        "'🔥 duck and cover! 🔥'",
        "'☢️ The dead hand has been released ☠️ 💣'",
        "'🚀 Kim Jong Un is watching... 👀'",
        "'📡 North Korea has entered the boom chat 📡'",
        "'🎛️ Kim just pushed the nuke button 🎛️'",
        "'🧨 watch out, Kim's on the line 🧨'",
        "'🎇 fireworks courtesy of North Korea 🎇'",
        "'👽 alien tech meets North Korea 👽'",
        "'💣 unauthorized launch by Kim Jong Un 💣'",
        "'💥 BOOM! Courtesy of Kim 💥'",
        "'🧨💣 Kim has slapped the 🍒 button for nuke 💣🧨'",
        "'🚀 Missile ready for launch 🚀'",
        "'⚠️ Tactical nuke inbound! ⚠️'",
        "'🧨 Explosions guaranteed! 🧨'",
        "'💣 Detonation countdown initiated 💣'",
        "'🔥 Nuclear apocalypse incoming 🔥'",
        "'☢️ Initiating global destruction mode ☢️'",
        "'💥 Shockwave imminent 💥'",
        "'🧨 Kim Jong Un: Hold my drink 🧨'",
        "'🚀 Kim’s got his finger on the button 🚀'",
        "'☠️ Prepare for maximum fallout ☠️'",
        "'💣 Kim Jong Un: Watch this... 💣'",
        "'☢️ Incoming from North Korea: Kaboom! ☢️'",
        "'💥 The world is about to end... 💥'",
        "'🧨 The end is near! Kim is ready 🧨'",
        "'🚀 Missile strike incoming... 🚀'",
        "'🔥 Toast your marshmallows while you can 🔥'",
        "'💣 Someone pressed the wrong button! 💣'",
        "'💥 Kim is not playing games... 💥'",
        "'🎇 Nuclear fireworks show! 🎇'",
        "'🧨 Brace for impact 🧨'",
        "'⚠️ Nuclear fallout initiated ⚠️'",
        "'💥 Launching in T-minus 5 seconds 💥'",
        "'🎛️ System online, ready to nuke 🎛️'",
        "'💣 Incoming boom! 💣'",
        "'☢️ Prepare your bunker ☢️'",
        "'🔥 World-ending event in progress 🔥'",
        "'🚀 Direct hit incoming! 🚀'",
        "'💥 Say goodbye! 💥'",
        "'💣 Launch codes entered... 💣'",
        "'☠️ Kim is laughing maniacally ☠️'",
        "'💥 Nuclear storm inbound 💥'",
        "'🧨 Countdown initiated 🧨'",
        "'🚀 I hope you packed a shelter 🚀'",
        "'🔥 It's getting hot in here... 🔥'"
    ];


    // Split input text into words
    const words = inputText.split(' ');

    // Insert a nuclear threat phrase every 5 words
    const nukedText = words.map((word, index) => {
        // Every 5th word, add a nuclear phrase
        if ((index + 1) % 8 === 0) {
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
const president = (inputText) => {
    // Array of famous (and funny) Trump quotes
    const trumpPhrases = [
        // Original Trump Quotes
        "'🇺🇸 Make Great Again!'",
        "'🔥 Fake News! 🔥'",
        "'💪 Tremendous! Just tremendous! 💪'",
        "'💼 Believe me, folks! 💼'",
        "'💸 Billions and billions! 💸'",
        "'🚀 We’re winning so much! 🚀'",
        "'🤔 People are saying... 🤔'",
        "'🏆 Nobody does it better! 🏆'",
        "'📝 It's huge, believe me! 📝'",
        "'📊 Best numbers, incredible! 📊'",
        "'💥 Big league! 💥'",
        "'😎 I know the best people! 😎'",
        "'👀 Many people are talking about it! 👀'",
        "'🔔 You're fired! 🔔'",
        "'🍔 Love McDonald's! 🍔'",
        "'📉 Lowest numbers ever, folks! 📉'",
        "'🎩 Very classy, very smart! 🎩'",
        "'🛑 Total disaster! 🛑'",
        "'💡 Trust me, I know! 💡'",
        "'📢 It's the greatest! 📢'",
        "'🌍 Nobody knows more about this than me! 🌍'",
        "'💭 Huge, just huge! 💭'",
        "'🤯 Unbelievable, folks! 🤯'",
        "'👔 It's like you've never seen before! 👔'",
        "'💪 I have the best words! 💪'",
        
        // New Trump Quotes about China, Russia, and Business
        "'🇨🇳 China’s taking advantage of us! 🇨🇳'",
        "'🔄 We're bringing jobs back from China! 🔄'",
        "'🐉 China’s laughing at us! 🐉'",
        "'🌏 Nobody knows China like I do! 🌏'",
        "'🇷🇺 Very strong relationship with Russia! 🇷🇺'",
        "'💰 Tremendous business deals, believe me! 💰'",
        "'💼 I’m a businessman, folks! 💼'",
        "'📉 China’s killing us on trade! 📉'",
        "'📈 The best economy ever! 📈'",
        "'💵 We're making rich again! 💵'",
        "'🕴 I negotiate the best deals! 🕴'",
        "'🦅 Our Nation First! 🦅'",
        "'👨‍💼 Business is my thing, believe me! 👨‍💼'",
        "'💸 China owes us big time! 💸'",
        "'🔍 Investigate everything, believe me! 🔍'",
        "'💡 Innovation, people! Innovation! 💡'",

        // More famous Trump quotes
        "'🇺🇸 The greatest jobs president that God ever created! 🇺🇸'",
        "'🔥 I’m very consistent—I’m a very stable genius. 🔥'",
        "'🏆 We’re going to win so much, you’re going to be so tired of winning. 🏆'",
        "'💪 Nobody builds walls better than me! 💪'",
        "'🌎 I have great respect for China. I love China! 🌎'",
        "'🎩 I could stand in the middle of Fifth Avenue and shoot somebody, and I wouldn’t lose voters. 🎩'",
        "'📉 The biggest tax cuts in history! 📉'",
        "'💼 I’ve always been good at making deals. 💼'",

        // Elon Musk Quotes
        "'🚀 I want to die on Mars, just not on impact. 🚀'",
        "'🌌 When something is important enough, you do it even if the odds are not in your favor. 🌌'",
        "'⚡ The first step is to establish that something is possible; then probability will occur. ⚡'",
        "'💡 If you get up in the morning and think the future is going to be better, it is a bright day. 💡'",
        "'🚘 I think it is possible for ordinary people to choose to be extraordinary. 🚘'",
        "'🌍 We need to figure out how to have the things we love, and not destroy the world. 🌍'",
        "'🧠 I think you should always be questioning. Always try to figure out what you don’t know about. 🧠'",
        "'🔋 If something is important enough, even if the odds are against you, you should still do it. 🔋'",
        "'🚀 I think it’s very important to have a feedback loop, where you’re constantly thinking about what you’ve done and how you could be doing it better. 🚀'",
        "'🌱 Some people don’t like change, but you need to embrace change if the alternative is disaster. 🌱'",
        "'💼 Starting a business is not for everyone. You have to have a high pain threshold. 💼'",
        "'🔧 Failure is an option here. If things are not failing, you are not innovating enough. 🔧'",
        "'🚘 My mentality is that of a samurai. I would rather commit seppuku than fail. 🚘'",
        "'🚀 We’re running the most dangerous experiment in history right now, which is to see how much carbon dioxide the atmosphere can handle before there is an environmental catastrophe. 🚀'",
        "'🌍 I think it’s possible for ordinary people to be extraordinary. 🌍'",
        "'💡 Constantly think about how you could be doing things better. 💡'",
        "'🔌 I don’t create companies for the sake of creating companies, but to get things done. 🔌'"
    ];

    // Split input text into words
    const words = inputText.split(' ');

    // Insert a Trump phrase every 5 words
    const presidentialText = words.map((word, index) => {
        // Every 5th word, add a Trump phrase
        if ((index + 1) % 8 === 0) {
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


