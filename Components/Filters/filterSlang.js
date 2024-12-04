export const filterSlang = (inputText) => {
      const slangDictionary = {
        "how dare you": "how 😠💢😈 you",
          "make you pay": 'make you 📉💸',
          "keep quiet": 'keep🔕quiet',
          "ruin": 'ru💀☠️👽💀',
          "destroy": 'des🤯💣🗡️🏴‍☠️',
          "burn": 'bu🔥♨️🔥', 
          "hit": '🔫🏹💥',
          "strike": 'str🎯🥊💥ike',
          "assault": '(❦◡❦)︻デ═一',
          "attack": '👊👊',
          'kill': 'Pew! Pew! 🔫',
          'killed': 'Pew! Pew! 🔫',
          'die': '⚰😴💤',
          'dead': '⚰😴💤',
          'end you': '🔚⚰👻',
          'eliminate': 'elimi❌🚷☠❎',
          'terminate': 'ter🤡😵‍💫😵',
          'fucker': 'Frog 🐸 errr 🌶',
          'fuckin': 'Frog 🐸 inn',
          'fuck': 'Frog 🐸',
          'bastard': 'bas 🤡🍉💥',
          'ass': 'aa 🍑💨🚀',
          'asshole': '🍑💨 🕳️',
          'shit': 'sh💩🍒',
          'slut': 'sl 👠💋💄🌶',
          'whore': 'who 🍑🍑🧹🦇',
          'pussy': 'pu 🐈🍑🍑',
          'pusey': 'pu pu 🐈🍑🍑',
          'pussi': 'pu pu 🐈🍑🍑',
          'pussye': 'pu pu 🐈🍑🍑',
          'horseshit': '💩🐴',
          'wanker': 'wa 🤭🍆💦',
          'wanking': 'wa 🤭🍆💦',
          'turd': 'tth 💩🐵🙈', 
          'twat': 'tw 🥴🧠❓',
          'spastic': '*',
          'nigga': '*',
          'nigra': '*',
          'frigger': 'fri 🍆💦🍑',
          'frig': 'fri 🍆💦🍑',
          'fatherfucker': 'father  🍆💦🍑',
          'dickhead': 'di 🍆🍆🍆',
          'dick': 'di 🍆🍆',
          'cunt': 'cu 🍆🍑💦',
          'crap': 'cr 💩🔥🤡',
          'sucker': 'su 🤤🍆🍑',
          'suck': 'su 🤤🍆🍑',
          'lick': 'li 🤤🍆🍑',
          'licker': 'li 🤤🍆🍑',
          'cocksucker': 'co 🤤🍆',
          'cock': 'co 🍆🍆',
          'child-fucker': '*',
          'childfucker': '*',
          'childfucker':'*',
          'bullshit': 'buul 🐂💩🍒',
          'brotherfucker': 'brother 🍆💦🍑',
          'bollocks': 'bo 🐂🍆🍆',
          'bloody': '🔪🩸',
          'bitch': 'bi 💆🏻‍♀️💅🏻🍑💩',
          'arsehole': '🍑💨 🕳️',
          'arsehead': '*',
          'arse': 'ar 🍑🍑',
          'Boob': '( ͜. ㅅ ͜. )',
          'Boobs': '( ͜. ㅅ ͜. )',
          'Boobies': '( ͜. ㅅ ͜. )',
          'Bubies': '( ͜. ㅅ ͜. )',
          'BhonsriWaala': 'bhors 🍆🍆',
          'Bhonsri': 'bh 🍆🍆',
          'chut': '🍆🍆🍑',
          'chodu': '🍆🍑💦',
          'chodra': '🍆🍑💦',
          'chod': '🍆🍑💦',
          'gaand': '🍆🍆',
          'gand': '🍆🍆',
          'kutte': 'woff 🐶',
          'kutteh': 'woff 🐶',
          'lunde': '🍆🍆',
          'Lavde ke baal':'Laa ✄🍑🍑',
          'Lavde ka baal':'Laa ✄🍑🍑',
          'Lavde ke bal':'Laa ✄🍑🍑',
          'Lavde ka bal': 'Laa ✄🍑🍑',
          'toto': '🍆🍑',
          'toota hua lund': 'to oo to 🍆',
          'bhadwe': '*',
          'bhosda': '*',
          'bhosri': '🍑🍑🍆',
          'benchod': 'ben 🍑🍆',
          'chutia': '🍑🍆', 
          'chutiya':'🍑🍆',
          'chutiye':'🍑🍆',
          'chutiye': '🍑🍆',
          'magi': '🍑💦',
          'baal':'b ✄🍆',
          'bal': 'b ✄🍆',
          'chudir': '🍆',
          'choda': '🍆🍆',
          'khanki': 'kh uh ah an kki',
          'madarchud': 'ma uh ad uhr ch od',
          'madarchod':'ma uh ad uhr ch od',
          'madarchodo': 'ma uh ad uhr ch do',
          'dhorshon': 'dh on ghor shon',
          'randimagi': 'rr uh ah en dd i mmh uh gi',
          'shukor': 'saussage',
          'lawra': 'la uw uwh ra',
          'chudirbai': 'ch uh uh di er bhai',
          'chudi': 'ch uh uh di',
      };

      // Regular expression to match all key phrases in the dictionary
      const phrasesRegex = new RegExp(
        Object.keys(slangDictionary)
          .sort((a, b) => b.length - a.length) // Sort by length to prioritize specific cases
          .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special characters
          .join('|'),
        'gi'
      );

      // Perform replacement using the regular expression
      const filteredText = inputText.replace(phrasesRegex, (match) => {
        const replacement = slangDictionary[match.toLowerCase()];
        return replacement || match;
      });

      // Return the filtered text as a string
      return filteredText;


};