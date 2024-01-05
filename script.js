document.addEventListener('DOMContentLoaded', () => {
    const translateButton = document.getElementById('translateButton');
    translateButton.addEventListener('click', translateText);

    const userInput = document.getElementById('userInput');
    userInput.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) { // 13 is the key code for Enter
            event.preventDefault(); // Prevent the default action (newline) for Enter key in a textarea
            translateText();
        }
    });
});

function translateText() {
    let userInput = document.getElementById('userInput').value;
    let translatedText = pretentiousTranslate(userInput);
    document.getElementById('translationOutput').innerText = translatedText;
}

function pretentiousTranslate(text) {
    const replacements = {
        "yes": "Ah, yes, of course",
        "Actually": "uhm, actually",
        "Hello": "Salutations, esteemed interlocutor",
        "hi": "Salutations, esteemed interlocutor",
        "Goodbye": "I bid thee adieu",
        "Sorry": "I extend my most profound apologies",
        "Please": "If it pleases thee",
        "Thank you": "I am eternally indebted for your graciousness",
        "Cool": "Exceedingly fascinating, indeed",
        "Wow": "Behold! What an astonishing revelation!",
        "Really": "Veritably and without a shadow of doubt",
        "No problem": "It was but a trifling inconvenience",
        "Awesome": "An occurrence of awe-inspiring wonder",
        "Okay": "Assuredly, it shall be as you say",        
        "No": "Respectfully, no",
        "Maybe": "It remains within the realm of possibility",
        "I don’t know": "That knowledge escapes my current understanding",
        "What's up?": "Pray tell, what current events stir in your world?",
        "I'm tired": "I find myself wearied by the day's relentless pursuits",
        "I'm hungry": "The pangs of sustenance deprivation beset me",
        "See you later": "Until our paths converge once more",
        "I love you": "My heart overflows with an affection most profound for thee",
        "I vacation": "I summer",
        "Hey": "Prey tell",
        "Vis-à-vis": "I KNOW WHAT Vis-à-vis MEANS",
        "Vice versa": "Vis-à-vis",
        "Horse": "Equine",
        "Talkative": "loquacious",
        "You": "Thou, sir,",
        "I think": "Mmmm, yes, I do declare I think",
        "Yours": "Thine",
        "OK": "Oll korrect, good chap,",
        "No go": "KG",
        "Alright": "Oll right",
        "No use": "Know yuse",
        "Quick": "Pretty darn quick",
        "You are": "Thou art",
        "u r": "Thou art",
        "ur": "Thou art",
        "ure": "Thou art",
        "youre": "Thou art",
        "your": "Thine",
        "Friend": "Mine friend",
        "sad": "grievous",
        "dost": "do",
        "aware" : "acknown",
        "risk my reputation" : "adventure my discretion",
        "nest" : "aery",
        "affected, one who puts on airs" : "affectioned",
        "passions ruled" : "affections swayed",
        "against the grain" : "against the hair",
        "acknowledge" : "agnize",
        "guessed as much" : "aimed so near",
        "summoned to action" : "alarum'd",
        "each of them equally enchanted" : "alike bewitched",
        "all their habitual activity" : "all exercise",
        "unscrupulous pursuit of power" : "ambition",
        "punish" : "amerce",
        "In a moment!" : "Anon, anon",
        "caves" : "anters",
        "the limits of patience" : "a patient list",
        "wonders that have appeared" : "apparent prodigies",
        "therefore" : "argal",
        "begone" : "aroint thee",
        "out-and-out" : "arrant",
        "tapestry" : "arras",
        "any way you like" : "as thou list",
        "crookedly, falsely" : "asquint",
        "miniature beings" : "atomies",
        "priests who interpreted omens" : "augurers",
        "as a favorable influence" : "auspicious mistress",
        "thrashing or cudgeling" : "bastinado",
        "glut yourself" : "batten",
        "small" : "bawbling",
        "fine fellow" : "bawcock",
        "go-between a man and a woman" : "bawd",
        "bear a grudge against" : "bear hard",
        "overhangs" : "beetles o'er",
        "very small number" : "beggarly account",
        "necessary" : "behoveful",
        "hags" : "beldams",
        "probably" : "belike",
        "abuse" : "berattle",
        "a curse, plague upon" : "beshrew",
        "happened" : "betid",
        "at once" : "betimes",
        "indicate" : "betoken",
        "reveal" : "bewray",
        "common name for a hen" : "biddy",
        "fetters" : "bilboes",
        "the owl" : "bird of night",
        "an insulting gesture in Shakespeare's time" : "bite my thumb",
        "a term of endearment, not of assault" : "bite thee by the ear",
        "barren" : "blasted",
        "proclamation" : "blazon",
        "that is, a fool's head" : "blinking idiot",
        "prophecies" : "bodements",
        "dagger" : "bodkin",
        "leather bottle" : "bombard",
        "useless" : "bootless",
        "wooded" : "bosky",
        "glades" : "bowers",
        "hound bitch" : "brach",
        "foolishly" : "brainsickly",
        "celebrate" : "bray out",
        "fail to pay on the prescribed day" : "break his day",
        "break our news to, discuss" : "break with",
        "life is compared to a candle flame" : "brief candle",
        "bring the trick out into the open, to be judged" : "bring the device to the bar",
        "badger or skunk" : "brock",
        "racked nerves" : "broken sinews",
        "echo" : "bruit",
        "shield" : "buckler",
        "bushy" : "busky",
        "slowly" : "but soft",
        "How are you": "How now, good friend, how farest thou this day?",
        "Hru": "How now, good friend, how farest thou this day?",
        "Good morning": "Good morrow",
        "Truly": "Verily",
        "Please": "Verily",
        "I want to spend the rest of my life with you, will you marry me?": "I prithee, fair one, take my hand and vow. To join our hearts and souls eternally, To spend our days in joy, our nights in bliss, O, grant me this and seal it with a kiss.",
        "drink": "wine",
        "Men": "Sirrah",
        "Man": "Sirrah",
        "Woman": "Mistress",
        "think": "Methinks",
        "run": "runneth",
        "trip": "trippeth",
        "what": "What what, you say",
        "why": "Why now, verily",
        "who": "Whoeth",
        "how": "Howeth",
        "I don't care": "My most profound depths of compassion fail to produce the effort to acknowledge this",
        "I dont care": "My most profound depths of compassion fail to produce the effort to acknowledge this",
        "Mym": "MYM",
        "Jeef": "Mr.Jeef"
    };

    const lowerCaseReplacements = Object.keys(replacements).reduce((acc, key) => {
        acc[key.toLowerCase()] = replacements[key];
        return acc;
    }, {});

    return text.split(/\b/).map(word => {
        let wordLower = word.toLowerCase();
        let isCapitalized = wordLower !== word;
        let isPunctuated = /[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(word);
        let replacement = lowerCaseReplacements[wordLower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")];

        if (replacement) {
            if (isPunctuated) {
                let punctuation = word.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g).join('');
                replacement = replacement + punctuation;
            }
            return isCapitalized ? capitalize(replacement) : replacement;
        }

        return word;
    }).join('');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
