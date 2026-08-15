// Shared codec bundle for the shortlink pages. Both /s/ and /s/api/gen/ load
// this, so there is exactly one copy of each codec on the site.
//
// Versions are frozen: a code is decodable forever by the version that made it.
// Ids inside each codec's dictionary are positional and must never be reordered.
window.SHORTLINK = (function () {
'use strict';

var CODECS = {
  // ---- version 5: the preset table ----------------------------------------
  // A short list of destinations that ship with the site, so they cost one or
  // two characters instead of being encoded at all. Nothing here is compressed:
  // the code IS the lookup key, which is why these reach lengths no general
  // codec can. Versions 1-4 carry the whole URL, and the shortest code any of
  // them produces is 7 characters, so the 1-2 character space is theirs alone
  // and no link minted before this can be shadowed.
  //
  // Keys are permanent: changing what a code points at silently redirects every
  // link already handed out. Append, never reassign.
  5: (function () {
    var PRESETS = {
      "0": "https://google.com/",
      "1": "https://youtube.com/",
      "2": "https://facebook.com/",
      "3": "https://instagram.com/",
      "4": "https://x.com/",
      "5": "https://wikipedia.org/",
      "6": "https://reddit.com/",
      "7": "https://amazon.com/",
      "8": "https://chatgpt.com/",
      "9": "https://claude.ai/",
      "10": "https://github.com/",
      "11": "https://netflix.com/",
      "12": "https://tiktok.com/",
      "13": "https://linkedin.com/",
      "14": "https://whatsapp.com/",
      "15": "https://discord.com/",
      "16": "https://twitch.tv/",
      "17": "https://spotify.com/",
      "18": "https://apple.com/",
      "19": "https://microsoft.com/",
      "20": "https://mail.google.com/",
      "21": "https://drive.google.com/",
      "22": "https://docs.google.com/",
      "23": "https://maps.google.com/",
      "24": "https://news.ycombinator.com/",
      "25": "https://stackoverflow.com/",
      "26": "https://medium.com/",
      "27": "https://ebay.com/",
      "28": "https://paypal.com/",
      "29": "https://pinterest.com/",
      "30": "https://yahoo.com/",
      "31": "https://bing.com/",
      "32": "https://duckduckgo.com/",
      "33": "https://cnn.com/",
      "34": "https://bbc.com/",
      "35": "https://nytimes.com/",
      "36": "https://theguardian.com/",
      "37": "https://espn.com/",
      "38": "https://imdb.com/",
      "39": "https://twitter.com/",
      "40": "https://roblox.com/",
      "41": "https://minecraft.net/",
      "42": "https://store.steampowered.com/",
      "43": "https://epicgames.com/",
      "44": "https://nintendo.com/",
      "45": "https://playstation.com/",
      "46": "https://xbox.com/",
      "47": "https://itch.io/",
      "48": "https://poki.com/",
      "49": "https://coolmathgames.com/",
      "50": "https://openai.com/",
      "51": "https://anthropic.com/",
      "52": "https://huggingface.co/",
      "53": "https://npmjs.com/",
      "54": "https://pypi.org/",
      "55": "https://crates.io/",
      "56": "https://developer.mozilla.org/",
      "57": "https://w3schools.com/",
      "58": "https://gitlab.com/",
      "59": "https://austin-code.com/",
      "60": "https://en.wikipedia.org/",
      "61": "https://archive.org/",
      "62": "https://dropbox.com/",
      "63": "https://soundcloud.com/",
      "64": "https://vimeo.com/",
      "65": "https://imgur.com/",
      "66": "https://etsy.com/",
      "67": "https://shopify.com/",
      "68": "https://stripe.com/",
      "69": "https://cloudflare.com/",
      "g": "https://github.com/",
      "n": "https://netflix.com/",
      "t": "https://tiktok.com/",
      "l": "https://linkedin.com/",
      "w": "https://whatsapp.com/",
      "d": "https://discord.com/",
      "v": "https://twitch.tv/",
      "m": "https://spotify.com/",
      "a": "https://apple.com/",
      "M": "https://microsoft.com/",
      "e": "https://mail.google.com/",
      "D": "https://drive.google.com/",
      "o": "https://docs.google.com/",
      "p": "https://maps.google.com/",
      "h": "https://news.ycombinator.com/",
      "s": "https://stackoverflow.com/",
      "E": "https://ebay.com/",
      "P": "https://paypal.com/",
      "S": "https://store.steampowered.com/",
      "r": "https://roblox.com/",
      "W": "https://wikipedia.org/",
      "R": "https://reddit.com/",
      "A": "https://archive.org/",
      "O": "https://openai.com/",
      "T": "https://twitter.com/",
      "i": "https://imdb.com/",
      "N": "https://nytimes.com/",
      "b": "https://bbc.com/",
      "c": "https://cnn.com/",
      "L": "https://gitlab.com/",
      "f": "https://figma.com/",
      "k": "https://kaggle.com/",
      "q": "https://quora.com/",
      "u": "https://udemy.com/",
      "z": "https://zoom.us/",
      "j": "https://notion.so/",
      "x": "https://bsky.app/",
      "y": "https://yelp.com/",
      "B": "https://bandcamp.com/",
      "C": "https://canva.com/",
      "F": "https://flickr.com/",
      "H": "https://hulu.com/",
      "J": "https://jetbrains.com/",
      "K": "https://khanacademy.org/",
      "U": "https://unsplash.com/",
      "V": "https://vercel.com/",
      "X": "https://xkcd.com/",
      "Y": "https://ycombinator.com/",
      "Z": "https://zillow.com/",
      "I": "https://ikea.com/",
      "li": "https://live.com/",
      "we": "https://weather.com/",
      "te": "https://temu.com/",
      "sa": "https://samsung.com/",
      "fa": "https://fandom.com/",
      "bo": "https://booking.com/",
      "br": "https://brave.com/",
      "G": "https://gemini.google.com/",
      "ba": "https://baidu.com/",
      "na": "https://naver.com/",
      "ya": "https://yandex.ru/",
      "bi": "https://bilibili.com/",
      "gl": "https://globo.com/",
      "ma": "https://mail.ru/",
      "tm": "https://t.me/",
      "TE": "https://telegram.org/",
      "dz": "https://dzen.ru/",
      "wo": "https://wolframalpha.com/",
      "BR": "https://britannica.com/",
      "di": "https://dictionary.com/",
      "me": "https://merriam-webster.com/",
      "th": "https://thesaurus.com/",
      "sc": "https://scholar.google.com/",
      "ar": "https://arxiv.org/",
      "js": "https://jstor.org/",
      "sn": "https://snopes.com/",
      "wi": "https://wikihow.com/",
      "st": "https://stackexchange.com/",
      "su": "https://superuser.com/",
      "se": "https://serverfault.com/",
      "as": "https://askubuntu.com/",
      "ca": "https://calendar.google.com/",
      "ph": "https://photos.google.com/",
      "tr": "https://translate.google.com/",
      "ne": "https://news.google.com/",
      "pl": "https://play.google.com/",
      "ME": "https://meet.google.com/",
      "sh": "https://sheets.google.com/",
      "sl": "https://slides.google.com/",
      "BI": "https://bitbucket.org/",
      "ru": "https://rubygems.org/",
      "pa": "https://packagist.org/",
      "nu": "https://nuget.org/",
      "co": "https://codepen.io/",
      "JS": "https://jsfiddle.net/",
      "re": "https://replit.com/",
      "CO": "https://codesandbox.io/",
      "NE": "https://netlify.com/",
      "he": "https://heroku.com/",
      "DI": "https://digitalocean.com/",
      "aw": "https://aws.amazon.com/",
      "az": "https://azure.microsoft.com/",
      "cl": "https://cloud.google.com/",
      "do": "https://docker.com/",
      "ku": "https://kubernetes.io/",
      "Q": "https://terraform.io/",
      "an": "https://ansible.com/",
      "je": "https://jenkins.io/",
      "ci": "https://circleci.com/",
      "TR": "https://travis-ci.com/",
      "SE": "https://sentry.io/",
      "da": "https://datadoghq.com/",
      "-": "https://newrelic.com/",
      "po": "https://postman.com/",
      "in": "https://insomnia.rest/",
      "sw": "https://swagger.io/",
      "_": "https://jsonplaceholder.typicode.com/",
      "RE": "https://regex101.com/",
      "CA": "https://caniuse.com/",
      "vi": "https://visualstudio.com/",
      "~": "https://code.visualstudio.com/",
      "SU": "https://sublimetext.com/",
      "VI": "https://vim.org/",
      "gn": "https://gnu.org/",
      "ke": "https://kernel.org/",
      "LI": "https://linux.org/",
      "ub": "https://ubuntu.com/",
      "de": "https://debian.org/",
      "fe": "https://fedoraproject.org/",
      "AR": "https://archlinux.org/",
      "ra": "https://raspberrypi.com/",
      "aa": "https://arduino.cc/",
      "py": "https://python.org/",
      "no": "https://nodejs.org/",
      "RU": "https://rust-lang.org/",
      "go": "https://go.dev/",
      "ja": "https://java.com/",
      "or": "https://oracle.com/",
      "PH": "https://php.net/",
      "ab": "https://ruby-lang.org/",
      "pe": "https://perl.org/",
      "ha": "https://haskell.org/",
      "SC": "https://scala-lang.org/",
      "ko": "https://kotlinlang.org/",
      "SW": "https://swift.org/",
      "DA": "https://dart.dev/",
      "ty": "https://typescriptlang.org/",
      "ac": "https://reactjs.org/",
      "vu": "https://vuejs.org/",
      "AN": "https://angular.io/",
      "sv": "https://svelte.dev/",
      "ad": "https://nextjs.org/",
      "NU": "https://nuxt.com/",
      "dj": "https://www.djangoproject.com/",
      "fl": "https://flask.palletsprojects.com/",
      "ae": "https://rubyonrails.org/",
      "la": "https://laravel.com/",
      "sp": "https://spring.io/",
      "ta": "https://tailwindcss.com/",
      "ge": "https://getbootstrap.com/",
      "SA": "https://sass-lang.com/",
      "WE": "https://webpack.js.org/",
      "af": "https://vitejs.dev/",
      "es": "https://eslint.org/",
      "pr": "https://prettier.io/",
      "JE": "https://jestjs.io/",
      "mo": "https://mochajs.org/",
      "cy": "https://cypress.io/",
      "PL": "https://playwright.dev/",
      "ag": "https://selenium.dev/",
      "PE": "https://perplexity.ai/",
      "mi": "https://midjourney.com/",
      "ST": "https://stability.ai/",
      "ah": "https://runwayml.com/",
      "el": "https://elevenlabs.io/",
      "ai": "https://replicate.com/",
      "PY": "https://pytorch.org/",
      "aj": "https://tensorflow.org/",
      "ak": "https://scikit-learn.org/",
      "al": "https://numpy.org/",
      "PA": "https://pandas.pydata.org/",
      "ju": "https://jupyter.org/",
      "am": "https://colab.research.google.com/",
      "MA": "https://mastodon.social/",
      "TH": "https://threads.net/",
      "tu": "https://tumblr.com/",
      "SN": "https://snapchat.com/",
      "vk": "https://vk.com/",
      "ao": "https://weibo.com/",
      "ap": "https://line.me/",
      "si": "https://signal.org/",
      "SL": "https://slack.com/",
      "aq": "https://teams.microsoft.com/",
      "at": "https://meetup.com/",
      "au": "https://nextdoor.com/",
      "av": "https://substack.com/",
      "DE": "https://dev.to/",
      "HA": "https://hashnode.com/",
      "PR": "https://producthunt.com/",
      "IN": "https://indiehackers.com/",
      "ax": "https://dailymotion.com/",
      "ay": "https://rumble.com/",
      "ki": "https://kick.com/",
      "LA": "https://last.fm/",
      "GE": "https://genius.com/",
      "mu": "https://music.apple.com/",
      "MU": "https://music.youtube.com/",
      "ti": "https://tidal.com/",
      "aA": "https://deezer.com/",
      "aB": "https://pandora.com/",
      "AU": "https://audible.com/",
      "aC": "https://disneyplus.com/",
      "aD": "https://max.com/",
      "aE": "https://peacocktv.com/",
      "aF": "https://paramountplus.com/",
      "cr": "https://crunchyroll.com/",
      "aG": "https://plex.tv/",
      "wa": "https://walmart.com/",
      "TA": "https://target.com/",
      "be": "https://bestbuy.com/",
      "aH": "https://costco.com/",
      "ho": "https://homedepot.com/",
      "lo": "https://lowes.com/",
      "WA": "https://wayfair.com/",
      "AL": "https://alibaba.com/",
      "aI": "https://aliexpress.com/",
      "SH": "https://shein.com/",
      "WI": "https://wish.com/",
      "aJ": "https://newegg.com/",
      "ch": "https://chewy.com/",
      "aK": "https://instacart.com/",
      "DO": "https://doordash.com/",
      "UB": "https://ubereats.com/",
      "gr": "https://grubhub.com/",
      "sq": "https://squareup.com/",
      "ve": "https://venmo.com/",
      "bb": "https://bbc.co.uk/",
      "aL": "https://washingtonpost.com/",
      "aM": "https://reuters.com/",
      "AP": "https://apnews.com/",
      "np": "https://npr.org/",
      "aN": "https://aljazeera.com/",
      "bl": "https://bloomberg.com/",
      "ws": "https://wsj.com/",
      "ft": "https://ft.com/",
      "ec": "https://economist.com/",
      "fo": "https://forbes.com/",
      "bu": "https://businessinsider.com/",
      "aO": "https://techcrunch.com/",
      "aP": "https://theverge.com/",
      "aQ": "https://arstechnica.com/",
      "aR": "https://wired.com/",
      "en": "https://engadget.com/",
      "zd": "https://zdnet.com/",
      "cn": "https://cnet.com/",
      "aS": "https://slashdot.org/",
      "NA": "https://nature.com/",
      "aT": "https://science.org/",
      "aU": "https://newscientist.com/",
      "aV": "https://scientificamerican.com/",
      "aW": "https://steamcommunity.com/",
      "GO": "https://gog.com/",
      "ea": "https://ea.com/",
      "aX": "https://ubisoft.com/",
      "ro": "https://rockstargames.com/",
      "BL": "https://blizzard.com/",
      "ri": "https://riotgames.com/",
      "SP": "https://speedrun.com/",
      "ig": "https://ign.com/",
      "ga": "https://gamespot.com/",
      "PO": "https://polygon.com/",
      "KO": "https://kotaku.com/",
      "pc": "https://pcgamer.com/",
      "AD": "https://addictinggames.com/",
      "aY": "https://newgrounds.com/",
      "CH": "https://chess.com/",
      "aZ": "https://lichess.org/",
      "a0": "https://coursera.org/",
      "ed": "https://edx.org/",
      "ud": "https://udacity.com/",
      "du": "https://duolingo.com/",
      "a1": "https://brilliant.org/",
      "a2": "https://codecademy.com/",
      "fr": "https://freecodecamp.org/",
      "le": "https://leetcode.com/",
      "a3": "https://hackerrank.com/",
      "a4": "https://codewars.com/",
      "ex": "https://exercism.org/",
      "MI": "https://mit.edu/",
      "a5": "https://stanford.edu/",
      "a6": "https://harvard.edu/",
      "a7": "https://ted.com/",
      "ob": "https://obsidian.md/",
      "ev": "https://evernote.com/",
      "a8": "https://trello.com/",
      "AS": "https://asana.com/",
      "MO": "https://monday.com/",
      "CL": "https://clickup.com/",
      "AI": "https://airtable.com/",
      "sk": "https://sketch.com/",
      "a9": "https://adobe.com/",
      "BE": "https://behance.net/",
      "dr": "https://dribbble.com/",
      "a-": "https://pexels.com/",
      "pi": "https://pixabay.com/",
      "gi": "https://giphy.com/",
      "a_": "https://tenor.com/",
      "a~": "https://miro.com/",
      "lu": "https://lucidchart.com/",
      "BO": "https://box.com/",
      "on": "https://onedrive.live.com/",
      "ic": "https://icloud.com/",
      "1p": "https://1password.com/",
      "bc": "https://bitwarden.com/",
      "bd": "https://lastpass.com/",
      "bf": "https://protonmail.com/",
      "bg": "https://proton.me/",
      "TU": "https://tutanota.com/",
      "bh": "https://mullvad.net/",
      "NO": "https://nordvpn.com/",
      "EX": "https://expressvpn.com/",
      "bj": "https://airbnb.com/",
      "bk": "https://expedia.com/",
      "ka": "https://kayak.com/",
      "bm": "https://tripadvisor.com/",
      "SK": "https://skyscanner.net/",
      "bn": "https://uber.com/",
      "ly": "https://lyft.com/",
      "op": "https://openstreetmap.org/",
      "bp": "https://redfin.com/",
      "bq": "https://realtor.com/",
      "bs": "https://indeed.com/",
      "GL": "https://glassdoor.com/",
      "bt": "https://monster.com/",
      "zi": "https://ziprecruiter.com/",
      "OP": "https://opentable.com/",
      "bv": "https://allrecipes.com/",
      "bw": "https://seriouseats.com/",
      "bx": "https://goodreads.com/",
      "gu": "https://gutenberg.org/",
      "LE": "https://letterboxd.com/",
      "RO": "https://rottentomatoes.com/",
      "by": "https://metacritic.com/",
      "nb": "https://nba.com/",
      "nf": "https://nfl.com/",
      "ml": "https://mlb.com/",
      "fi": "https://fifa.com/",
      "bz": "https://strava.com/",
      "my": "https://myfitnesspal.com/",
      "bA": "https://webmd.com/",
      "bB": "https://mayoclinic.org/",
      "ni": "https://nih.gov/",
      "cd": "https://cdc.gov/",
      "wh": "https://who.int/",
      "ir": "https://irs.gov/",
      "us": "https://usa.gov/",
      "bC": "https://weather.gov/",
      "bD": "https://coinbase.com/",
      "bE": "https://binance.com/",
      "kr": "https://kraken.com/",
      "bF": "https://robinhood.com/",
      "FI": "https://fidelity.com/",
      "bG": "https://schwab.com/",
      "va": "https://vanguard.com/",
      "bH": "https://chase.com/",
      "BA": "https://bankofamerica.com/",
      "bI": "https://wellsfargo.com/",
      "bJ": "https://nerdwallet.com/",
      "bK": "https://investopedia.com/",
      "bL": "https://morningstar.com/",
      "bM": "https://tradingview.com/",
      "bN": "https://finance.yahoo.com/",

      // added by tools/add-presets.mjs
      "so": "https://sourceforge.net/",
      "bO": "https://codeberg.org/",
      "sr": "https://sr.ht/",
      "bP": "https://launchpad.net/",
      "bQ": "https://apache.org/",
      "EC": "https://eclipse.org/",
      "bR": "https://mozilla.org/",
      "bS": "https://chromium.org/",
      "bT": "https://webkit.org/",
      "v8": "https://v8.dev/",
      "bU": "https://deno.com/",
      "BU": "https://bun.sh/",
      "pn": "https://pnpm.io/",
      "YA": "https://yarnpkg.com/",
      "bV": "https://babeljs.io/",
      "bW": "https://rollupjs.org/",
      "ES": "https://esbuild.github.io/",
      "bX": "https://parceljs.org/",
      "bY": "https://storybook.js.org/",
      "bZ": "https://turborepo.com/",
      "nx": "https://nx.dev/",
      "GR": "https://graphql.org/",
      "b0": "https://apollographql.com/",
      "b1": "https://prisma.io/",
      "b2": "https://sequelize.org/",
      "b3": "https://mongodb.com/",
      "b4": "https://postgresql.org/",
      "MY": "https://mysql.com/",
      "SQ": "https://sqlite.org/",
      "b5": "https://redis.io/",
      "EL": "https://elastic.co/",
      "RA": "https://rabbitmq.com/",
      "KA": "https://kafka.apache.org/",
      "ng": "https://nginx.org/",
      "ht": "https://httpd.apache.org/",
      "b6": "https://caddyserver.com/",
      "b7": "https://traefik.io/",
      "b8": "https://consul.io/",
      "VA": "https://vaultproject.io/",
      "b9": "https://grafana.com/",
      "b-": "https://prometheus.io/",
      "b_": "https://influxdata.com/",
      "b~": "https://splunk.com/",
      "cb": "https://pagerduty.com/",
      "cc": "https://statuspage.io/",
      "ce": "https://linode.com/",
      "VU": "https://vultr.com/",
      "HE": "https://hetzner.com/",
      "ov": "https://ovhcloud.com/",
      "FL": "https://fly.io/",
      "cf": "https://render.com/",
      "cg": "https://railway.app/",
      "cj": "https://supabase.com/",
      "ck": "https://firebase.google.com/",
      "cm": "https://planetscale.com/",
      "cp": "https://neon.tech/",
      "up": "https://upstash.com/",
      "cq": "https://auth0.com/",
      "ok": "https://okta.com/",
      "cs": "https://clerk.com/",
      "tw": "https://twilio.com/",
      "ct": "https://sendgrid.com/",
      "cu": "https://mailchimp.com/",
      "cv": "https://mailgun.com/",
      "cw": "https://postmarkapp.com/",
      "cx": "https://algolia.com/",
      "cz": "https://cloudinary.com/",
      "im": "https://imgix.com/",
      "FA": "https://fastly.com/",
      "AK": "https://akamai.com/",
      "cA": "https://bunny.net/",
      "cB": "https://jsdelivr.com/",
      "un": "https://unpkg.com/",
      "CD": "https://cdnjs.com/",
      "cC": "https://gravatar.com/",
      "cD": "https://shields.io/",
      "cE": "https://badgen.net/",
      "cF": "https://gemini.google.com/app",
      "cG": "https://copilot.microsoft.com/",
      "GI": "https://github.com/features/copilot",
      "CU": "https://cursor.com/",
      "cH": "https://codeium.com/",
      "cI": "https://tabnine.com/",
      "cJ": "https://mistral.ai/",
      "cK": "https://cohere.com/",
      "cL": "https://ai21.com/",
      "to": "https://together.ai/",
      "cM": "https://groq.com/",
      "cN": "https://fireworks.ai/",
      "cO": "https://modal.com/",
      "cP": "https://wandb.ai/",
      "ML": "https://mlflow.org/",
      "dv": "https://dvc.org/",
      "KE": "https://keras.io/",
      "cQ": "https://opencv.org/",
      "cR": "https://spacy.io/",
      "nl": "https://nltk.org/",
      "cS": "https://statsmodels.org/",
      "cT": "https://scipy.org/",
      "cU": "https://matplotlib.org/",
      "cV": "https://seaborn.pydata.org/",
      "cW": "https://plotly.com/",
      "d3": "https://d3js.org/",
      "OB": "https://observablehq.com/",
      "cX": "https://tableau.com/",
      "cY": "https://powerbi.microsoft.com/",
      "LO": "https://looker.com/",
      "cZ": "https://databricks.com/",
      "c0": "https://snowflake.com/",
      "db": "https://dbt.com/",
      "c1": "https://airbyte.com/",
      "c2": "https://prefect.io/",
      "c3": "https://airflow.apache.org/",
      "c4": "https://messenger.com/",
      "c5": "https://wechat.com/",
      "qq": "https://qq.com/",
      "c6": "https://douyin.com/",
      "KU": "https://kuaishou.com/",
      "xi": "https://xiaohongshu.com/",
      "zh": "https://zhihu.com/",
      "c7": "https://douban.com/",
      "c8": "https://www.naver.com/",
      "c9": "https://kakaocorp.com/",
      "c-": "https://viber.com/",
      "c_": "https://skype.com/",
      "c~": "https://wire.com/",
      "dc": "https://element.io/",
      "dd": "https://matrix.org/",
      "df": "https://libera.chat/",
      "dg": "https://lemmy.world/",
      "kb": "https://kbin.social/",
      "dh": "https://minds.com/",
      "GA": "https://gab.com/",
      "dk": "https://truthsocial.com/",
      "dl": "https://clubhouse.com/",
      "dm": "https://bereal.com/",
      "dn": "https://www.strava.com/",
      "UN": "https://untappd.com/",
      "dp": "https://www.goodreads.com/",
      "US": "https://usatoday.com/",
      "dq": "https://latimes.com/",
      "ds": "https://chicagotribune.com/",
      "dt": "https://bostonglobe.com/",
      "sf": "https://sfchronicle.com/",
      "dw": "https://seattletimes.com/",
      "dx": "https://denverpost.com/",
      "dy": "https://miamiherald.com/",
      "dA": "https://dallasnews.com/",
      "dB": "https://politico.com/",
      "AX": "https://axios.com/",
      "dC": "https://thehill.com/",
      "vo": "https://vox.com/",
      "dD": "https://slate.com/",
      "dE": "https://salon.com/",
      "dF": "https://motherjones.com/",
      "dG": "https://propublica.org/",
      "dH": "https://theatlantic.com/",
      "dI": "https://newyorker.com/",
      "dJ": "https://harpers.org/",
      "TI": "https://time.com/",
      "dK": "https://newsweek.com/",
      "dL": "https://usnews.com/",
      "CB": "https://cbsnews.com/",
      "NB": "https://nbcnews.com/",
      "AB": "https://abcnews.go.com/",
      "FO": "https://foxnews.com/",
      "ms": "https://msnbc.com/",
      "pb": "https://pbs.org/",
      "CS": "https://c-span.org/",
      "dM": "https://independent.co.uk/",
      "dN": "https://telegraph.co.uk/",
      "dO": "https://thetimes.co.uk/",
      "dP": "https://dailymail.co.uk/",
      "dQ": "https://mirror.co.uk/",
      "dR": "https://metro.co.uk/",
      "dS": "https://news.sky.com/",
      "dT": "https://lemonde.fr/",
      "dU": "https://lefigaro.fr/",
      "dV": "https://spiegel.de/",
      "ze": "https://zeit.de/",
      "dW": "https://faz.net/",
      "dX": "https://welt.de/",
      "dY": "https://elpais.com/",
      "dZ": "https://elmundo.es/",
      "d0": "https://corriere.it/",
      "d1": "https://repubblica.it/",
      "d2": "https://asahi.com/",
      "JA": "https://japantimes.co.jp/",
      "d4": "https://scmp.com/",
      "d5": "https://straitstimes.com/",
      "d6": "https://thehindu.com/",
      "d7": "https://timesofindia.indiatimes.com/",
      "nd": "https://ndtv.com/",
      "d8": "https://haaretz.com/",
      "jp": "https://jpost.com/",
      "9t": "https://9to5mac.com/",
      "9T": "https://9to5google.com/",
      "d9": "https://androidauthority.com/",
      "d-": "https://androidpolice.com/",
      "d_": "https://macrumors.com/",
      "d~": "https://appleinsider.com/",
      "TO": "https://tomshardware.com/",
      "eb": "https://anandtech.com/",
      "ee": "https://gamersnexus.net/",
      "ef": "https://linustechtips.com/",
      "xd": "https://xda-developers.com/",
      "HO": "https://howtogeek.com/",
      "eg": "https://makeuseof.com/",
      "eh": "https://lifehacker.com/",
      "ei": "https://digitaltrends.com/",
      "ej": "https://gizmodo.com/",
      "ek": "https://mashable.com/",
      "VE": "https://venturebeat.com/",
      "em": "https://theinformation.com/",
      "eo": "https://protocol.com/",
      "ep": "https://readwrite.com/",
      "eq": "https://hackernoon.com/",
      "er": "https://infoq.com/",
      "DZ": "https://dzone.com/",
      "sm": "https://smashingmagazine.com/",
      "et": "https://css-tricks.com/",
      "eu": "https://alistapart.com/",
      "SI": "https://sitepoint.com/",
      "ew": "https://scotch.io/",
      "ey": "https://tutorialspoint.com/",
      "ez": "https://geeksforgeeks.org/",
      "eA": "https://programiz.com/",
      "eB": "https://javatpoint.com/",
      "eC": "https://baeldung.com/",
      "eD": "https://realpython.com/",
      "eE": "https://pythontutorial.net/",
      "eF": "https://learncpp.com/",
      "CP": "https://cplusplus.com/",
      "eG": "https://cppreference.com/",
      "hu": "https://humblebundle.com/",
      "eH": "https://fanatical.com/",
      "eI": "https://greenmangaming.com/",
      "eJ": "https://gamejolt.com/",
      "eK": "https://indiedb.com/",
      "eL": "https://moddb.com/",
      "eM": "https://nexusmods.com/",
      "eN": "https://curseforge.com/",
      "eO": "https://modrinth.com/",
      "eP": "https://planetminecraft.com/",
      "eQ": "https://minecraftforum.net/",
      "eR": "https://www.speedrun.com/",
      "TW": "https://www.twitch.tv/",
      "eS": "https://opencritic.com/",
      "eT": "https://howlongtobeat.com/",
      "eU": "https://backloggd.com/",
      "gg": "https://gg.deals/",
      "is": "https://isthereanydeal.com/",
      "eV": "https://protondb.com/",
      "PC": "https://pcgamingwiki.com/",
      "eW": "https://steamdb.info/",
      "eX": "https://steamgifts.com/",
      "eY": "https://gamefaqs.gamespot.com/",
      "eZ": "https://giantbomb.com/",
      "e0": "https://destructoid.com/",
      "e1": "https://rockpapershotgun.com/",
      "EU": "https://eurogamer.net/",
      "vg": "https://vg247.com/",
      "e2": "https://gematsu.com/",
      "e3": "https://siliconera.com/",
      "NI": "https://nintendolife.com/",
      "pu": "https://purexbox.com/",
      "PU": "https://pushsquare.com/",
      "e4": "https://dexerto.com/",
      "e5": "https://www.esports.net/",
      "e6": "https://liquipedia.net/",
      "e7": "https://op.gg/",
      "ug": "https://u.gg/",
      "e8": "https://mobalytics.gg/",
      "e9": "https://tracker.gg/",
      "e-": "https://faceit.com/",
      "e_": "https://esea.net/",
      "e~": "https://challengermode.com/",
      "fb": "https://www.codecademy.com/learn",
      "fc": "https://pluralsight.com/",
      "fd": "https://www.linkedin.com/learning/",
      "ff": "https://skillshare.com/",
      "fg": "https://masterclass.com/",
      "fh": "https://datacamp.com/",
      "ED": "https://educative.io/",
      "FR": "https://frontendmasters.com/",
      "EG": "https://egghead.io/",
      "fj": "https://laracasts.com/",
      "fk": "https://testdome.com/",
      "fm": "https://codesignal.com/",
      "fn": "https://topcoder.com/",
      "fp": "https://codeforces.com/",
      "AT": "https://atcoder.jp/",
      "fq": "https://projecteuler.net/",
      "fs": "https://adventofcode.com/",
      "fu": "https://rosettacode.org/",
      "fv": "https://cs50.harvard.edu/",
      "oc": "https://ocw.mit.edu/",
      "fw": "https://open.edu/",
      "FU": "https://futurelearn.com/",
      "fx": "https://alison.com/",
      "SO": "https://sololearn.com/",
      "w3": "https://w3.org/",
      "WH": "https://whatwg.org/",
      "ie": "https://ietf.org/",
      "rf": "https://rfc-editor.org/",
      "IS": "https://iso.org/",
      "fy": "https://unicode.org/",
      "ia": "https://iana.org/",
      "IC": "https://icann.org/",
      "fz": "https://learn.microsoft.com/",
      "of": "https://office.com/",
      "ou": "https://outlook.com/",
      "fA": "https://sharepoint.com/",
      "fB": "https://salesforce.com/",
      "HU": "https://hubspot.com/",
      "ZE": "https://zendesk.com/",
      "fC": "https://intercom.com/",
      "fD": "https://freshworks.com/",
      "zo": "https://zoho.com/",
      "fE": "https://basecamp.com/",
      "fF": "https://linear.app/",
      "fG": "https://height.app/",
      "fH": "https://shortcut.com/",
      "fI": "https://www.atlassian.com/software/jira",
      "fJ": "https://atlassian.com/",
      "fK": "https://www.atlassian.com/software/confluence",
      "SM": "https://smartsheet.com/",
      "wr": "https://wrike.com/",
      "fL": "https://teamwork.com/",
      "fM": "https://podio.com/",
      "fN": "https://todoist.com/",
      "fO": "https://culturedcode.com/things/",
      "fP": "https://ticktick.com/",
      "fQ": "https://bear.app/",
      "CR": "https://craft.do/",
      "fR": "https://roamresearch.com/",
      "fS": "https://logseq.com/",
      "fT": "https://zettlr.com/",
      "TY": "https://typora.io/",
      "fU": "https://grammarly.com/",
      "fV": "https://hemingwayapp.com/",
      "fW": "https://deepl.com/",
      "ot": "https://otter.ai/",
      "fX": "https://descript.com/",
      "fY": "https://loom.com/",
      "fZ": "https://calendly.com/",
      "f0": "https://doodle.com/",
      "f1": "https://when2meet.com/",
      "f2": "https://docusign.com/",
      "DR": "https://www.dropbox.com/sign",
      "f3": "https://pandadoc.com/",
      "qu": "https://quickbooks.intuit.com/",
      "xe": "https://xero.com/",
      "f4": "https://freshbooks.com/",
      "f5": "https://www.waveapps.com/",
      "GU": "https://gusto.com/",
      "RI": "https://rippling.com/",
      "f6": "https://deel.com/",
      "UP": "https://upwork.com/",
      "f7": "https://fiverr.com/",
      "f8": "https://freelancer.com/",
      "f9": "https://toptal.com/",
      "99": "https://99designs.com/",
      "f-": "https://wellfound.com/",
      "f_": "https://crunchbase.com/",
      "PI": "https://pitchbook.com/",
      "yc": "https://www.ycombinator.com/apply",
      "f~": "https://photopea.com/",
      "gb": "https://gimp.org/",
      "gc": "https://inkscape.org/",
      "KR": "https://krita.org/",
      "gd": "https://blender.org/",
      "gf": "https://autodesk.com/",
      "gh": "https://sketchup.com/",
      "rh": "https://rhino3d.com/",
      "gj": "https://www.maxon.net/en/zbrush",
      "gk": "https://substance3d.adobe.com/",
      "gm": "https://www.maxon.net/en/cinema-4d",
      "gp": "https://www.blackmagicdesign.com/products/davinciresolve",
      "gq": "https://www.adobe.com/products/premiere.html",
      "gs": "https://www.apple.com/final-cut-pro/",
      "gt": "https://audacityteam.org/",
      "gv": "https://ardour.org/",
      "gw": "https://reaper.fm/",
      "gx": "https://ableton.com/",
      "IM": "https://image-line.com/",
      "gy": "https://steinberg.net/",
      "gz": "https://native-instruments.com/",
      "gA": "https://splice.com/",
      "gB": "https://looperman.com/",
      "gC": "https://freesound.org/",
      "gD": "https://fontsquirrel.com/",
      "gE": "https://fonts.google.com/",
      "gF": "https://dafont.com/",
      "gG": "https://myfonts.com/",
      "gH": "https://typewolf.com/",
      "gI": "https://coolors.co/",
      "gJ": "https://colorhunt.co/",
      "gK": "https://paletton.com/",
      "gL": "https://material.io/",
      "gM": "https://ant.design/",
      "gN": "https://chakra-ui.com/",
      "gO": "https://mui.com/",
      "gP": "https://radix-ui.com/",
      "ui": "https://ui.shadcn.com/",
      "gQ": "https://heroicons.com/",
      "gR": "https://fontawesome.com/",
      "FE": "https://feathericons.com/",
      "LU": "https://lucide.dev/",
      "gS": "https://iconify.design/",
      "gT": "https://undraw.co/",
      "gU": "https://storyset.com/",
      "gV": "https://lottiefiles.com/",
      "gW": "https://aldi.com/",
      "gX": "https://kroger.com/",
      "gY": "https://publix.com/",
      "gZ": "https://safeway.com/",
      "g0": "https://traderjoes.com/",
      "g1": "https://wholefoodsmarket.com/",
      "g2": "https://sephora.com/",
      "ul": "https://ulta.com/",
      "g3": "https://nordstrom.com/",
      "g4": "https://macys.com/",
      "g5": "https://kohls.com/",
      "g6": "https://gap.com/",
      "g7": "https://uniqlo.com/",
      "za": "https://zara.com/",
      "hm": "https://hm.com/",
      "g8": "https://asos.com/",
      "g9": "https://nike.com/",
      "g-": "https://adidas.com/",
      "g_": "https://underarmour.com/",
      "g~": "https://lululemon.com/",
      "hb": "https://patagonia.com/",
      "hc": "https://rei.com/",
      "hd": "https://dickssportinggoods.com/",
      "hf": "https://autozone.com/",
      "OR": "https://oreillyauto.com/",
      "hg": "https://carvana.com/",
      "hh": "https://carmax.com/",
      "hi": "https://cargurus.com/",
      "hj": "https://edmunds.com/",
      "KB": "https://kbb.com/",
      "hk": "https://www.booking.com/",
      "hl": "https://hotels.com/",
      "hn": "https://marriott.com/",
      "HI": "https://hilton.com/",
      "hy": "https://hyatt.com/",
      "ih": "https://ihg.com/",
      "hp": "https://delta.com/",
      "hq": "https://united.com/",
      "AA": "https://aa.com/",
      "hr": "https://southwest.com/",
      "hs": "https://jetblue.com/",
      "ry": "https://ryanair.com/",
      "EA": "https://easyjet.com/",
      "hv": "https://lufthansa.com/",
      "hw": "https://britishairways.com/",
      "EM": "https://emirates.com/",
      "AM": "https://amtrak.com/",
      "hx": "https://greyhound.com/",
      "hz": "https://rome2rio.com/",
      "hA": "https://seatguru.com/",
      "hB": "https://flightaware.com/",
      "hC": "https://flightradar24.com/",
      "hD": "https://gasbuddy.com/",
      "hE": "https://waze.com/",
      "CI": "https://citymapper.com/",
      "hF": "https://transitapp.com/",
      "hG": "https://eater.com/",
      "hH": "https://bonappetit.com/",
      "hI": "https://foodnetwork.com/",
      "EP": "https://epicurious.com/",
      "hJ": "https://budgetbytes.com/",
      "KI": "https://kingarthurbaking.com/",
      "hK": "https://tasteofhome.com/",
      "hL": "https://simplyrecipes.com/",
      "hM": "https://thekitchn.com/",
      "hN": "https://delish.com/",
      "yu": "https://yummly.com/",
      "hO": "https://medlineplus.gov/",
      "hP": "https://healthline.com/",
      "hQ": "https://verywellhealth.com/",
      "hR": "https://drugs.com/",
      "hS": "https://goodrx.com/",
      "ZO": "https://zocdoc.com/",
      "ps": "https://psychologytoday.com/",
      "hT": "https://nami.org/",
      "hU": "https://samhsa.gov/",
      "FD": "https://fda.gov/",
      "hV": "https://epa.gov/",
      "hW": "https://nasa.gov/",
      "hX": "https://noaa.gov/",
      "hY": "https://usgs.gov/",
      "CE": "https://census.gov/",
      "hZ": "https://bls.gov/",
      "h0": "https://sec.gov/",
      "FT": "https://ftc.gov/",
      "FC": "https://fcc.gov/",
      "h1": "https://uspto.gov/",
      "h2": "https://loc.gov/",
      "h3": "https://archives.gov/",
      "h4": "https://supremecourt.gov/",
      "h5": "https://congress.gov/",
      "h6": "https://whitehouse.gov/",
      "h7": "https://state.gov/",
      "h8": "https://travel.state.gov/",
      "ss": "https://ssa.gov/",
      "h9": "https://medicare.gov/",
      "h-": "https://healthcare.gov/",
      "h_": "https://studentaid.gov/",
      "h~": "https://usps.com/",
      "ib": "https://ups.com/",
      "id": "https://fedex.com/",
      "DH": "https://dhl.com/",
      "if": "https://europa.eu/",
      "ii": "https://un.org/",
      "WO": "https://worldbank.org/",
      "ij": "https://imf.org/",
      "oe": "https://oecd.org/",
      "wt": "https://wto.org/",
      "ik": "https://unesco.org/",
      "il": "https://unicef.org/",
      "io": "https://redcross.org/",
      "ip": "https://doctorswithoutborders.org/",
      "iq": "https://amnesty.org/",
      "HR": "https://hrw.org/",
      "EF": "https://eff.org/",
      "AC": "https://aclu.org/",
      "it": "https://wikimedia.org/",
      "iu": "https://wikidata.org/",
      "iv": "https://wiktionary.org/",
      "iw": "https://wikisource.org/",
      "ix": "https://wikiquote.org/",
      "iy": "https://wikivoyage.org/",
      "iz": "https://commons.wikimedia.org/",
      "iA": "https://openlibrary.org/",
      "iB": "https://worldcat.org/",
      "iC": "https://zotero.org/",
      "iD": "https://mendeley.com/",
      "iE": "https://researchgate.net/",
      "iF": "https://academia.edu/",
      "iG": "https://semanticscholar.org/",
      "iH": "https://pubmed.ncbi.nlm.nih.gov/",
      "iI": "https://biorxiv.org/",
      "iJ": "https://medrxiv.org/",
      "SS": "https://ssrn.com/",
      "iK": "https://plos.org/",
      "iL": "https://frontiersin.org/",
      "iM": "https://springer.com/",
      "iN": "https://sciencedirect.com/",
      "iO": "https://wiley.com/",
      "iP": "https://tandfonline.com/",
      "iQ": "https://sagepub.com/",
      "iR": "https://cambridge.org/",
      "iS": "https://academic.oup.com/",
    };
    // Keys come from the same 81-character URL-safe set the codecs use, at one
    // or two characters: 81 + 81^2 = 6642 addressable slots. A destination may
    // have several keys — the numeric ones handed out first still decode — so
    // encoding picks the shortest, and ties break alphabetically to keep the
    // choice stable across builds.
    // Sections that turn up on the same host over and over. A preset host plus
    // one of these still resolves to a handful of characters rather than
    // falling through to a codec that has to spell the whole URL out.
    var PATHS = {
      "a": "/about",
      "c": "/contact",
      "l": "/login",
      "g": "/signup",
      "p": "/pricing",
      "b": "/blog",
      "d": "/docs",
      "h": "/help",
      "s": "/support",
      "j": "/careers",
      "v": "/privacy",
      "t": "/terms",
      "e": "/settings",
      "u": "/account",
      "r": "/profile",
      "q": "/search",
      "n": "/news",
      "f": "/faq",
      "w": "/download",
      "i": "/api",
      "k": "/status",
      "m": "/team",
      "z": "/press",
      "y": "/legal",
      "x": "/security",
      "A": "/developers",
      "B": "/community",
      "C": "/forum",
      "D": "/shop",
      "E": "/store",
      "F": "/cart",
      "G": "/checkout",
      "H": "/dashboard",
      "I": "/explore",
      "J": "/trending",
      "K": "/new",
      "L": "/popular",
      "M": "/feed",
      "N": "/notifications",
      "O": "/messages",
      "P": "/watch",
      "Q": "/library",
      "R": "/playlist",
      "S": "/subscriptions",
      "T": "/history",
      "U": "/pricing/",
      "V": "/jobs",
      "W": "/features",
      "X": "/changelog",
      "Y": "/roadmap",
      "Z": "/faq/",
      "0": "/index.html",
      "1": "/home",
      "2": "/browse",
      "3": "/categories",

      // added by tools/add-presets.mjs
      "ab": "/about-us",
      "o": "/aboutus",
      "co": "/company",
      "ou": "/our-team",
      "pe": "/people",
      "st": "/staff",
      "le": "/leadership",
      "mi": "/mission",
      "va": "/values",
      "4": "/story",
      "wh": "/who-we-are",
      "5": "/what-we-do",
      "pr": "/press-kit",
      "me": "/media",
      "ne": "/newsroom",
      "br": "/brand",
      "lo": "/logos",
      "in": "/investors",
      "6": "/investor-relations",
      "pa": "/partners",
      "af": "/affiliates",
      "sp": "/sponsors",
      "wo": "/work-with-us",
      "hi": "/hiring",
      "7": "/internships",
      "8": "/contact-us",
      "9": "/contactus",
      "he": "/help-center",
      "-": "/helpcenter",
      "fa": "/faqs",
      "qu": "/questions",
      "fe": "/feedback",
      "re": "/report",
      "_": "/report-abuse",
      "bu": "/bug",
      "~": "/bugs",
      "is": "/issues",
      "ti": "/tickets",
      "aa": "/ticket",
      "ch": "/chat",
      "li": "/live-chat",
      "em": "/email",
      "ca": "/call",
      "ac": "/locations",
      "ad": "/stores",
      "fi": "/find-a-store",
      "di": "/directions",
      "ae": "/log-in",
      "si": "/signin",
      "ag": "/sign-in",
      "ah": "/sign-up",
      "ai": "/register",
      "aj": "/registration",
      "jo": "/join",
      "ak": "/logout",
      "al": "/log-out",
      "am": "/signout",
      "an": "/accounts",
      "my": "/my-account",
      "ao": "/profiles",
      "ap": "/me",
      "us": "/user",
      "aq": "/users",
      "ar": "/preferences",
      "as": "/admin",
      "at": "/console",
      "au": "/panel",
      "bi": "/billing",
      "su": "/subscription",
      "pl": "/plan",
      "up": "/upgrade",
      "av": "/auth",
      "oa": "/oauth",
      "ve": "/verify",
      "aw": "/reset-password",
      "fo": "/forgot-password",
      "ax": "/password",
      "2f": "/2fa",
      "ay": "/privacy-settings",
      "se": "/sessions",
      "de": "/devices",
      "az": "/connections",
      "aA": "/index",
      "aB": "/discover",
      "aC": "/results",
      "to": "/top",
      "be": "/best",
      "aD": "/newest",
      "la": "/latest",
      "aE": "/featured",
      "aF": "/recommended",
      "aG": "/for-you",
      "aH": "/following",
      "aI": "/feeds",
      "rs": "/rss",
      "aJ": "/rss.xml",
      "aK": "/atom.xml",
      "aL": "/sitemap",
      "aM": "/sitemap.xml",
      "aN": "/archive",
      "aO": "/archives",
      "aP": "/category",
      "aQ": "/topics",
      "aR": "/topic",
      "ta": "/tags",
      "aS": "/tag",
      "aT": "/collections",
      "aU": "/series",
      "aV": "/all",
      "aW": "/list",
      "aX": "/lists",
      "ra": "/random",
      "aY": "/inbox",
      "aZ": "/outbox",
      "dr": "/drafts",
      "sa": "/saved",
      "bo": "/bookmarks",
      "a0": "/favorites",
      "a1": "/favourites",
      "a2": "/likes",
      "wa": "/watchlist",
      "wi": "/wishlist",
      "a3": "/playlists",
      "a4": "/queue",
      "do": "/downloads",
      "a5": "/uploads",
      "vi": "/videos",
      "a6": "/video",
      "sh": "/shorts",
      "cl": "/clips",
      "a7": "/live",
      "a8": "/streams",
      "a9": "/stream",
      "a-": "/channel",
      "a_": "/channels",
      "mu": "/music",
      "so": "/songs",
      "a~": "/albums",
      "ba": "/artists",
      "tr": "/tracks",
      "po": "/podcast",
      "bb": "/podcasts",
      "ep": "/episodes",
      "ph": "/photos",
      "im": "/images",
      "pi": "/pictures",
      "ga": "/gallery",
      "bc": "/albums-photos",
      "bd": "/media-library",
      "bf": "/audio",
      "bg": "/radio",
      "tv": "/tv",
      "bh": "/shows",
      "mo": "/movies",
      "bj": "/films",
      "bk": "/series-tv",
      "bl": "/anime",
      "bm": "/books",
      "bn": "/comics",
      "bp": "/products",
      "bq": "/product",
      "bs": "/catalog",
      "bt": "/catalogue",
      "it": "/items",
      "bv": "/item",
      "bw": "/basket",
      "or": "/orders",
      "bx": "/order",
      "by": "/track-order",
      "bz": "/shipping",
      "bA": "/delivery",
      "bB": "/returns",
      "bC": "/refunds",
      "bD": "/warranty",
      "bE": "/deals",
      "bF": "/sale",
      "bG": "/sales",
      "of": "/offers",
      "bH": "/discounts",
      "bI": "/clearance",
      "bJ": "/coupons",
      "bK": "/promo",
      "gi": "/gift-cards",
      "bL": "/giftcards",
      "bM": "/gifts",
      "bN": "/new-arrivals",
      "bO": "/bestsellers",
      "bP": "/brands",
      "bQ": "/departments",
      "ma": "/marketplace",
      "bR": "/sellers",
      "bS": "/sell",
      "bT": "/buy",
      "bU": "/compare",
      "bV": "/reviews",
      "bW": "/ratings",
      "bX": "/prices",
      "bY": "/plans",
      "bZ": "/pricing-plans",
      "en": "/enterprise",
      "b0": "/business",
      "te": "/teams",
      "b1": "/for-business",
      "b2": "/solutions",
      "b3": "/services",
      "b4": "/industries",
      "cu": "/customers",
      "b5": "/clients",
      "b6": "/case-studies",
      "b7": "/testimonials",
      "b8": "/success-stories",
      "b9": "/quote",
      "ge": "/get-a-quote",
      "b-": "/demo",
      "b_": "/request-demo",
      "fr": "/free-trial",
      "b~": "/trial",
      "cb": "/contact-sales",
      "cc": "/documentation",
      "cd": "/doc",
      "gu": "/guide",
      "ce": "/guides",
      "cf": "/manual",
      "ha": "/handbook",
      "cg": "/reference",
      "ci": "/api-docs",
      "cj": "/apis",
      "ck": "/developer",
      "cm": "/dev",
      "sd": "/sdk",
      "cn": "/libraries",
      "cp": "/integrations",
      "cq": "/plugins",
      "ex": "/extensions",
      "cr": "/addons",
      "cs": "/apps",
      "ct": "/tools",
      "cv": "/templates",
      "th": "/themes",
      "cw": "/examples",
      "cx": "/samples",
      "cy": "/showcase",
      "cz": "/releases",
      "cA": "/release-notes",
      "cB": "/whats-new",
      "cC": "/updates",
      "cD": "/versions",
      "cE": "/downloads-page",
      "cF": "/install",
      "cG": "/installation",
      "cH": "/getting-started",
      "cI": "/quickstart",
      "cJ": "/setup",
      "cK": "/uptime",
      "cL": "/health",
      "sy": "/system-status",
      "cM": "/learn",
      "cN": "/learning",
      "cO": "/courses",
      "cP": "/course",
      "tu": "/tutorials",
      "cQ": "/tutorial",
      "cR": "/lessons",
      "cS": "/training",
      "cT": "/certification",
      "cU": "/certificates",
      "cV": "/academy",
      "sc": "/school",
      "un": "/university",
      "ed": "/education",
      "cW": "/students",
      "cX": "/teachers",
      "cY": "/resources",
      "cZ": "/library-resources",
      "gl": "/glossary",
      "c0": "/wiki",
      "kn": "/knowledge-base",
      "kb": "/kb",
      "we": "/webinars",
      "ev": "/events",
      "c1": "/calendar",
      "c2": "/conference",
      "c3": "/meetups",
      "c4": "/workshops",
      "c5": "/forums",
      "c6": "/discussions",
      "c7": "/discuss",
      "c8": "/board",
      "c9": "/boards",
      "gr": "/groups",
      "c-": "/group",
      "c_": "/clubs",
      "c~": "/social",
      "da": "/members",
      "db": "/directory",
      "dc": "/leaderboard",
      "dd": "/rankings",
      "df": "/stats",
      "dg": "/statistics",
      "dh": "/analytics",
      "dj": "/insights",
      "dk": "/reports",
      "dl": "/blogs",
      "dm": "/posts",
      "dn": "/post",
      "dp": "/articles",
      "dq": "/article",
      "ds": "/newsletter",
      "dt": "/subscribe",
      "du": "/updates-blog",
      "dv": "/stories",
      "es": "/essays",
      "no": "/notes",
      "dw": "/journal",
      "dx": "/magazine",
      "dy": "/editorial",
      "op": "/opinion",
      "dz": "/reviews-editorial",
      "dA": "/interviews",
      "dB": "/features-editorial",
      "dC": "/privacy-policy",
      "dD": "/policy",
      "dE": "/policies",
      "dF": "/terms-of-service",
      "dG": "/terms-of-use",
      "dH": "/tos",
      "eu": "/eula",
      "dI": "/license",
      "dJ": "/licenses",
      "dK": "/licensing",
      "dL": "/cookies",
      "dM": "/cookie-policy",
      "gd": "/gdpr",
      "dN": "/ccpa",
      "dO": "/dmca",
      "dP": "/copyright",
      "dQ": "/trademark",
      "dR": "/patents",
      "dS": "/accessibility",
      "dT": "/imprint",
      "dU": "/disclaimer",
      "dV": "/compliance",
      "dW": "/transparency",
      "dX": "/guidelines",
      "dY": "/community-guidelines",
      "dZ": "/code-of-conduct",
      "ru": "/rules",
      "d0": "/safety",
      "d1": "/trust",
      "d2": "/trust-and-safety",
      "d3": "/abuse",
      "d4": "/moderation",
    };

    // '.' separates a host key from a path key, so it may never appear inside
    // either one — that is what keeps "g" and "g.a" from being ambiguous.
    var SEP = '.';
    var KEYSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@/?";
    var BY_URL = {};
    for (var k in PRESETS) {
      if (k.length < 1 || k.length > 2) throw new Error('preset key must be 1-2 characters: ' + k);
      if (k.indexOf(SEP) >= 0) throw new Error('preset key may not contain "' + SEP + '": ' + k);
      for (var ci = 0; ci < k.length; ci++) {
        if (KEYSET.indexOf(k[ci]) < 0) throw new Error('preset key outside the url-safe set: ' + k);
      }
      var cur = BY_URL[PRESETS[k]];
      if (!cur || k.length < cur.length || (k.length === cur.length && k < cur)) BY_URL[PRESETS[k]] = k;
    }

    var BY_PATH = {};
    for (var pk in PATHS) {
      if (pk.length < 1 || pk.length > 2) throw new Error('path key must be 1-2 characters: ' + pk);
      if (pk.indexOf(SEP) >= 0) throw new Error('path key may not contain "' + SEP + '": ' + pk);
      if (BY_PATH[PATHS[pk]]) throw new Error('duplicate path: ' + PATHS[pk]);
      BY_PATH[PATHS[pk]] = pk;
    }

    // Every preset destination is a bare origin, so host + path composes by
    // dropping the trailing slash. Anything else is left to the codecs.
    function originOf(url) { return /^https?:\/\/[^/]+\/$/.test(url) ? url.slice(0, -1) : null; }
    var BY_ORIGIN = {};
    for (var u2 in BY_URL) {
      var o = originOf(u2);
      if (o && !BY_ORIGIN[o]) BY_ORIGIN[o] = BY_URL[u2];
    }

    function addScheme(s) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return s;
      return /^[^\s/?#]+\.[^\s/?#]{2,}/.test(s) ? 'https://' + s : s;
    }
    function normalize(s) { s = addScheme(s.trim()); try { return new URL(s).href; } catch (e) { return s; } }

    return {
      emoji: false,
      preset: true,
      addScheme: addScheme,
      decode: function (code) {
        code = String(code).trim();
        var cut = code.indexOf(SEP);
        if (cut < 0) {
          var u = PRESETS[code];
          if (!u) throw new Error('not a preset code');
          return u;
        }
        var host = PRESETS[code.slice(0, cut)], path = PATHS[code.slice(cut + 1)];
        if (!host || !path) throw new Error('not a preset code');
        var origin = originOf(host);
        if (!origin) throw new Error('not a preset code');
        return origin + path;
      },
      encode: function (input) {
        var s = normalize(input), items = [];
        // tolerate the trailing slash going either way
        var code = BY_URL[s] || BY_URL[s.replace(/\/$/, '')] || BY_URL[s + '/'];
        if (code) {
          items.push({ name: 'preset', b: new Uint8Array(0), code: code, len: code.length });
        } else {
          // a preset host with one of the common sections on it
          var cut = s.indexOf('/', s.indexOf('//') + 2);
          if (cut > 0) {
            var hk = BY_ORIGIN[s.slice(0, cut)], pk = BY_PATH[s.slice(cut)];
            if (hk && pk) {
              var c2 = hk + SEP + pk;
              items.push({ name: 'preset host + path', b: new Uint8Array(0), code: c2, len: c2.length });
            }
          }
        }
        return { normalized: s, items: items };
      }
    };
  })(),
  // ---- version 4 codec ----------------------------------------------------
  // Adds four systems on top of what v1-v3 do: a host/token dictionary large
  // enough to cover most real URLs, structured packing of hex / digit / base64url
  // runs (an id stops costing one byte per character), and native deflate-raw as
  // an alternative final stage. Every candidate is still round-trip checked
  // before it is offered, so a strategy can only win by being correct.
  4: (function () {
    var TE = new TextEncoder(), TD = new TextDecoder();

    var A = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@/?";
    var BASE = BigInt(A.length);
    var AVAL = {}; for (var i = 0; i < A.length; i++) AVAL[A[i]] = i;

    var EMOJI = '\u{1F600}\u{1F601}\u{1F602}\u{1F603}\u{1F604}\u{1F605}\u{1F606}\u{1F607}\u{1F608}\u{1F609}\u{1F60A}\u{1F60B}\u{1F60C}\u{1F60D}\u{1F60E}\u{1F60F}\u{1F610}\u{1F611}\u{1F612}\u{1F613}\u{1F614}\u{1F615}\u{1F616}\u{1F617}\u{1F618}\u{1F619}\u{1F61A}\u{1F61B}\u{1F61C}\u{1F61D}\u{1F61E}\u{1F61F}\u{1F620}\u{1F621}\u{1F622}\u{1F623}\u{1F624}\u{1F625}\u{1F626}\u{1F627}\u{1F628}\u{1F629}\u{1F62A}\u{1F62B}\u{1F62C}\u{1F62D}\u{1F62E}\u{1F62F}\u{1F630}\u{1F631}\u{1F632}\u{1F633}\u{1F634}\u{1F635}\u{1F636}\u{1F637}\u{1F638}\u{1F639}\u{1F63A}\u{1F63B}\u{1F63C}\u{1F63D}\u{1F63E}\u{1F63F}\u{1F640}\u{1F641}\u{1F642}\u{1F643}\u{1F644}\u{1F645}\u{1F646}\u{1F647}\u{1F648}\u{1F649}\u{1F64A}\u{1F64B}\u{1F64C}\u{1F64D}\u{1F64E}\u{1F64F}\u{1F680}\u{1F681}\u{1F682}\u{1F683}\u{1F684}\u{1F685}\u{1F686}\u{1F687}\u{1F688}\u{1F689}\u{1F68A}\u{1F68B}\u{1F68C}\u{1F68D}\u{1F68E}\u{1F68F}\u{1F690}\u{1F691}\u{1F692}\u{1F693}\u{1F694}\u{1F695}\u{1F696}\u{1F697}\u{1F698}\u{1F699}\u{1F69A}\u{1F69B}\u{1F69C}\u{1F69D}\u{1F69E}\u{1F69F}\u{1F6A0}\u{1F6A1}\u{1F6A2}\u{1F6A3}\u{1F6A4}\u{1F30D}\u{1F30E}\u{1F30F}\u{1F310}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F319}\u{1F31A}\u{1F31B}\u{1F31C}\u{1F31D}\u{1F31E}\u{1F31F}\u{1F320}\u{1F321}\u{1F322}\u{1F323}\u{1F324}\u{1F325}\u{1F326}\u{1F327}\u{1F328}\u{1F329}\u{1F32A}\u{1F32B}\u{1F32C}\u{1F32D}\u{1F32E}\u{1F32F}\u{1F330}\u{1F331}\u{1F332}\u{1F333}\u{1F334}\u{1F335}\u{1F400}\u{1F401}\u{1F402}\u{1F403}\u{1F404}\u{1F405}\u{1F406}\u{1F407}\u{1F408}\u{1F409}\u{1F40A}\u{1F40B}\u{1F40C}\u{1F40D}\u{1F40E}\u{1F40F}\u{1F410}';
    var SENTINEL = '✨';
    var SYMS = A.split('').concat(Array.from(EMOJI));
    var SYMVAL = new Map(SYMS.map(function (s, i) { return [s, i]; }));

    /* ---- packing ---- */
    function pack81(bytes) {
      if (!bytes.length) return '0';
      var x = 0n;
      for (var i = 0; i < bytes.length; i++) x = (x << 8n) | BigInt(bytes[i]);
      var out = '';
      while (x) { out = A[Number(x % BASE)] + out; x /= BASE; }
      var zeros = 0; while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
      return A[0].repeat(zeros) + out;
    }
    function unpack81(str) {
      var zeros = 0; while (zeros < str.length && str[zeros] === A[0]) zeros++;
      var x = 0n;
      for (var i = zeros; i < str.length; i++) {
        var v = AVAL[str[i]];
        if (v === undefined) throw new Error('bad base81 character');
        x = x * BASE + BigInt(v);
      }
      var tail = [];
      while (x) { tail.unshift(Number(x & 255n)); x >>= 8n; }
      var out = new Uint8Array(zeros + tail.length);
      out.set(tail, zeros);
      return out;
    }
    function packSyms(bytes) { var o = ''; for (var i = 0; i < bytes.length; i++) o += SYMS[bytes[i]]; return o; }
    function unpackSyms(str) {
      var a = Array.from(str), o = new Uint8Array(a.length);
      for (var i = 0; i < a.length; i++) {
        var v = SYMVAL.get(a[i]);
        if (v === undefined) throw new Error('symbol outside the emoji alphabet');
        o[i] = v;
      }
      return o;
    }
    function routeSafeEncode(c) { return c.replace(/!/g, '!!').replace(/\//g, '!s'); }
    function routeSafeDecode(c) {
      var out = '';
      for (var i = 0; i < c.length; i++) {
        if (c[i] !== '!') { out += c[i]; continue; }
        if (++i >= c.length) throw new Error('bad route escape');
        if (c[i] === '!') out += '!';
        else if (c[i] === 's') out += '/';
        else throw new Error('bad route escape');
      }
      return out;
    }
    function hasReserved(code) { return /\/\d+\//.test(code); }

    /* ---- bytes ---- */
    function concat(list) {
      var n = 0, i;
      for (i = 0; i < list.length; i++) n += list[i].length;
      var o = new Uint8Array(n), p = 0;
      for (i = 0; i < list.length; i++) { o.set(list[i], p); p += list[i].length; }
      return o;
    }
    function varint(n) {
      var a = [];
      do { var b = n & 127; n = Math.floor(n / 128); if (n) b |= 128; a.push(b); } while (n);
      return Uint8Array.from(a);
    }
    function readVar(b, p) {
      var n = 0, s = 0, x;
      do {
        if (p.i >= b.length) throw new Error('truncated varint');
        x = b[p.i++]; n += (x & 127) * Math.pow(2, s); s += 7;
      } while (x & 128);
      return n;
    }

    /* ---- dictionary ----
       Index in this array IS the token id, so entries may be appended but never
       reordered or removed. Ids 0..DICT.length-1 are tokens; the four values
       above that are the structured-run opcodes. */
    var DICT = [
      'https://', 'http://', 'https://www.', 'http://www.', 'www.',
      '.com', '.org', '.net', '.io', '.dev', '.app', '.co', '.uk', '.ca', '.gov', '.edu', '.info', '.me', '.tv', '.ai',
      'youtube.com', 'youtu.be', 'google.com', 'github.com', 'githubusercontent.com', 'wikipedia.org', 'en.wikipedia.org', 'reddit.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'amazon.com', 'linkedin.com', 'stackoverflow.com', 'medium.com', 'netflix.com', 'twitch.tv', 'spotify.com', 'apple.com', 'microsoft.com', 'openai.com', 'anthropic.com', 'claude.ai', 'chatgpt.com', 'discord.com', 'discord.gg', 'tiktok.com', 'imgur.com', 'dropbox.com', 'drive.google.com', 'docs.google.com', 'mail.google.com', 'maps.google.com', 'news.ycombinator.com', 'gitlab.com', 'npmjs.com', 'pypi.org', 'crates.io', 'developer.mozilla.org', 'archive.org', 'nytimes.com', 'bbc.com', 'paypal.com', 'stripe.com', 'shopify.com', 'austin-code.com',
      '/watch', '/watch?v=', '/shorts/', '/playlist', '/channel/', '/user/', '/users/', '/u/', '/r/',
      '/products/', '/product/', '/item/', '/items/', '/search', '/search?q=', '/results', '/browse/', '/category/', '/tags/',
      '/issues/', '/pull/', '/pulls/', '/blob/', '/tree/', '/commit/', '/commits/', '/releases/', '/tag/', '/raw/', '/wiki/', '/discussions/', '/actions/', '/settings/',
      '/api/', '/api/v1/', '/api/v2/', '/v1/', '/v2/', '/v3/', '/graphql', '/rest/',
      '/posts/', '/post/', '/article/', '/articles/', '/blog/', '/news/', '/story/', '/s/',
      '/login', '/logout', '/signup', '/register', '/account', '/profile', '/settings', '/dashboard', '/admin', '/help', '/support', '/about', '/contact', '/privacy', '/terms', '/docs/', '/documentation/', '/download', '/downloads/', '/assets/', '/static/', '/images/', '/img/', '/media/', '/files/', '/uploads/',
      'index.html', 'index.htm', 'index.php', '.html', '.htm', '.php', '.aspx', '.jsp', '.json', '.xml', '.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.mp4', '.mp3', '.zip', '.txt', '.css', '.js',
      '?utm_source=', '&utm_source=', '?utm_medium=', '&utm_medium=', '?utm_campaign=', '&utm_campaign=', '?utm_content=', '&utm_content=', '?utm_term=', '&utm_term=',
      'utm_source=', 'utm_medium=', 'utm_campaign=', 'newsletter', 'email', 'google', 'facebook', 'twitter',
      '?id=', '&id=', '?q=', '&q=', '?s=', '&s=', '?page=', '&page=', '?p=', '&p=', '?ref=', '&ref=', '?v=', '&v=', '?t=', '&t=', '?lang=', '&lang=', '?sort=', '&sort=', '?limit=', '&limit=', '?offset=', '&offset=', '?type=', '&type=', '?format=', '&format=', '?key=', '&key=', '?token=', '&token=', '?code=', '&code=', '?redirect=', '&redirect=', '?next=', '&next=', '?from=', '&from=', '?to=', '&to=',
      '%20', '%2F', '%3A', '%3F', '%3D', '%26',
      'true', 'false', 'null', 'en-US', 'en-GB', 'index', 'home', 'main', 'default', 'new', 'old', 'top', 'best', 'all', 'list', 'view'
    ];
    // Ids are positional, so a duplicate would waste an id and a reorder would
    // invalidate every code already minted.
    (function () {
      var seen = {};
      for (var d = 0; d < DICT.length; d++) {
        if (DICT[d].length < 2) throw new Error('v4 token "' + DICT[d] + '" is too short to ever match');
        if (seen[DICT[d]]) throw new Error('v4 duplicate token: ' + DICT[d]);
        seen[DICT[d]] = 1;
      }
    })();
    var OP_LIT = DICT.length, OP_HEX = DICT.length + 1, OP_NUM = DICT.length + 2, OP_B64 = DICT.length + 3;
    if (OP_B64 > 255) throw new Error('v4 dictionary has ' + DICT.length + ' entries; the one-byte opcode allows 252');

    // longest-first match order; ids stay tied to DICT position
    var BY_LEN = DICT.map(function (t, i) { return { t: t, i: i }; })
                     .sort(function (a, b) { return b.t.length - a.t.length; });

    var B64C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var B64V = {}; for (var k = 0; k < B64C.length; k++) B64V[B64C[k]] = k;

    function runLen(s, i, re) { var j = i; while (j < s.length && re.test(s[j])) j++; return j - i; }

    /* ---- structured stream ---- */
    function structEncode(s) {
      var out = [], lit = '';
      function flush() {
        if (!lit) return;
        var b = TE.encode(lit);
        out.push(Uint8Array.of(OP_LIT), varint(b.length), b);
        lit = '';
      }
      var i = 0;
      while (i < s.length) {
        var m = null;
        for (var t = 0; t < BY_LEN.length; t++) {
          var tok = BY_LEN[t].t;
          if (tok.length > 1 && s.startsWith(tok, i)) { m = BY_LEN[t]; break; }
        }
        if (m) { flush(); out.push(Uint8Array.of(m.i)); i += m.t.length; continue; }

        var hx = runLen(s, i, /[0-9a-f]/);
        if (hx >= 10) {
          flush();
          var hs = s.substr(i, hx), hb = new Uint8Array(Math.ceil(hx / 2));
          for (var h = 0; h < hx; h++) {
            var nib = parseInt(hs[h], 16);
            if (h % 2 === 0) hb[h >> 1] = nib << 4; else hb[h >> 1] |= nib;
          }
          out.push(Uint8Array.of(OP_HEX), varint(hx), hb);
          i += hx; continue;
        }

        var dg = runLen(s, i, /[0-9]/);
        if (dg >= 5) {
          flush();
          var ds = s.substr(i, dg), val = BigInt(ds);
          var need = Math.ceil(dg * 3.3219280948873626 / 8);
          var nb = new Uint8Array(need);
          for (var n = need - 1; n >= 0; n--) { nb[n] = Number(val & 255n); val >>= 8n; }
          out.push(Uint8Array.of(OP_NUM), varint(dg), nb);
          i += dg; continue;
        }

        var b6 = runLen(s, i, /[A-Za-z0-9_-]/);
        if (b6 >= 12) {
          flush();
          var bs = s.substr(i, b6), bits = 0, acc = 0, bb = [];
          for (var q = 0; q < b6; q++) {
            acc = (acc << 6) | B64V[bs[q]]; bits += 6;
            while (bits >= 8) { bits -= 8; bb.push((acc >> bits) & 255); }
          }
          if (bits) bb.push((acc << (8 - bits)) & 255);
          out.push(Uint8Array.of(OP_B64), varint(b6), Uint8Array.from(bb));
          i += b6; continue;
        }

        lit += s[i]; i++;
      }
      flush();
      return concat(out);
    }

    function structDecode(b) {
      var p = { i: 0 }, out = '';
      while (p.i < b.length) {
        var op = b[p.i++];
        if (op < DICT.length) { out += DICT[op]; continue; }
        if (op === OP_LIT) {
          var n = readVar(b, p);
          out += TD.decode(b.slice(p.i, p.i + n)); p.i += n; continue;
        }
        if (op === OP_HEX) {
          var hn = readVar(b, p), need = Math.ceil(hn / 2), hs = '';
          for (var h = 0; h < hn; h++) {
            var byte = b[p.i + (h >> 1)];
            hs += ((h % 2 === 0) ? (byte >> 4) : (byte & 15)).toString(16);
          }
          p.i += need; out += hs; continue;
        }
        if (op === OP_NUM) {
          var dn = readVar(b, p), dneed = Math.ceil(dn * 3.3219280948873626 / 8), v = 0n;
          for (var d = 0; d < dneed; d++) v = (v << 8n) | BigInt(b[p.i + d]);
          p.i += dneed;
          out += v.toString(10).padStart(dn, '0'); continue;
        }
        if (op === OP_B64) {
          var qn = readVar(b, p), qneed = Math.ceil(qn * 6 / 8), bits = 0, acc = 0, qs = '';
          for (var z = 0; z < qneed; z++) {
            acc = (acc << 8) | b[p.i + z]; bits += 8;
            while (bits >= 6 && qs.length < qn) { bits -= 6; qs += B64C[(acc >> bits) & 63]; }
          }
          p.i += qneed; out += qs; continue;
        }
        throw new Error('unknown v4 opcode ' + op);
      }
      return out;
    }

    /* ---- deflate ---- */
    var HAS_CS = typeof CompressionStream === 'function' && typeof DecompressionStream === 'function' && typeof Response === 'function';
    async function deflate(bytes) {
      var cs = new CompressionStream('deflate-raw');
      var w = cs.writable.getWriter();
      w.write(bytes); w.close();
      return new Uint8Array(await new Response(cs.readable).arrayBuffer());
    }
    async function inflate(bytes) {
      var ds = new DecompressionStream('deflate-raw');
      var w = ds.writable.getWriter();
      w.write(bytes); w.close();
      return new Uint8Array(await new Response(ds.readable).arrayBuffer());
    }

    /* ---- payload: [0xF0|strategy, ...body, checksum16] ----
       A v4 code has to announce itself. Every dictionary token is URL text, so
       structDecode maps almost any byte string onto something that looks like a
       URL — "it threw" is not a safe way to reject a version 1-3 code, and
       without this the resolver returns a confident wrong destination. 0xF0-0xF3
       sits above every strategy id versions 1-3 emit, and the trailing checksum
       rejects garbage that lands in that range anyway. */
    var S_RAW = 0, S_STRUCT = 1, S_DEF_RAW = 2, S_DEF_STRUCT = 3;
    var TAG = 0xF0;

    function checksum(s) {
      var b = TE.encode(s), h = 0x811c;
      for (var i = 0; i < b.length; i++) { h ^= b[i]; h = (h * 0x0193) & 0xFFFF; }
      return h;
    }
    function wrap(kind, body, s) {
      var c = checksum(s);
      return concat([Uint8Array.of(TAG | kind), body, Uint8Array.of(c >> 8, c & 255)]);
    }

    async function decodePayload(b) {
      if (b.length < 3 || (b[0] & 0xFC) !== TAG) throw new Error('not a version 4 code');
      var kind = b[0] & 3, body = b.slice(1, b.length - 2), out;
      if (kind === S_RAW) out = TD.decode(body);
      else if (kind === S_STRUCT) out = structDecode(body);
      else if (kind === S_DEF_RAW) out = TD.decode(await inflate(body));
      else out = structDecode(await inflate(body));
      if (checksum(out) !== ((b[b.length - 2] << 8) | b[b.length - 1])) throw new Error('v4 checksum mismatch');
      return out;
    }

    function addScheme(s) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return s;
      return /^[^\s/?#]+\.[^\s/?#]{2,}/.test(s) ? 'https://' + s : s;
    }
    function normalize(s) { s = addScheme(s.trim()); try { return new URL(s).href; } catch (e) { return s; } }

    function packCode(bytes, emoji) {
      return emoji ? SENTINEL + routeSafeEncode(packSyms(bytes))
                   : routeSafeEncode(pack81(bytes));
    }
    function unpackCode(code) {
      code = code.trim();
      if (Array.from(code)[0] === SENTINEL) return unpackSyms(routeSafeDecode(Array.from(code).slice(1).join('')));
      return unpack81(routeSafeDecode(code));
    }
    async function decode(code) { return decodePayload(unpackCode(code)); }

    async function encode(input, emoji) {
      var s = normalize(input);
      var raw = TE.encode(s);
      var st = structEncode(s);

      var payloads = [
        { name: 'raw UTF-8', b: wrap(S_RAW, raw, s) },
        { name: 'dictionary + structured ids', b: wrap(S_STRUCT, st, s) }
      ];
      if (HAS_CS) {
        try {
          payloads.push({ name: 'deflate', b: wrap(S_DEF_RAW, await deflate(raw), s) });
          payloads.push({ name: 'dictionary + structured ids + deflate', b: wrap(S_DEF_STRUCT, await deflate(st), s) });
        } catch (e) {}
      }

      var items = [];
      for (var i = 0; i < payloads.length; i++) {
        var code = packCode(payloads[i].b, emoji);
        if (hasReserved(code)) continue;
        try { if (await decode(code) !== s) continue; } catch (e) { continue; }
        items.push({ name: payloads[i].name, b: payloads[i].b, code: code, len: Array.from(code).length });
      }
      items.sort(function (a, b) { return a.len - b.len || a.b.length - b.b.length; });
      return { normalized: s, items: items };
    }

    return { emoji: true, async: true, addScheme: addScheme, decode: decode, encode: encode };
  })(),
  1: (function () {
    /*
     Static Shortlink Lab — Version 1
     --------------------
     Format: [strategy-id][payload]
     Alphabet deliberately includes digits + uppercase + lowercase + two URL-safe symbols.
     We do NOT use '/' because that complicates path routing on static hosts.
    */
    const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"; // 64 chars
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const EXPECTED_VERSION = 1;


    function detectPathVersion(pathname=location.pathname){
      const m=pathname.match(/(?:^|\/)(\d+)(?:\/|$)/);
      return m ? Number(m[1]) : null;
    }
    function routeSafeEncode(code){
      // v1 alphabet contains no slash, so /1/, /2/, /3/, etc. are impossible by construction.
      if(/\/\d+\//.test(code)) throw new Error('reserved version sequence generated');
      return code;
    }
    function routeSafeDecode(code){ return code; }

    const DOMAIN_DICT = [
      'https://www.', 'https://', 'http://www.', 'http://',
      'www.',
      'google.com','youtube.com','github.com','wikipedia.org','reddit.com','amazon.com','x.com','twitter.com','facebook.com','instagram.com','tiktok.com','discord.com','microsoft.com','apple.com','cloudflare.com','openai.com','example.com'
    ];
    const TOKEN_DICT = [
      '?utm_source=', '&utm_source=', '?utm_medium=', '&utm_medium=', '?utm_campaign=', '&utm_campaign=',
      '?ref=', '&ref=', '?id=', '&id=', '/api/', '/v1/', '/v2/', '.html', '.php', 'index.', 'download', 'products', 'product', 'users', 'user', 'search', 'page', 'lang=', 'source=', 'medium=', 'campaign='
    ];

    function bytesToB64(bytes){
      let out='';
      for(let i=0;i<bytes.length;i+=3){
        const a=bytes[i], b=i+1<bytes.length?bytes[i+1]:0, c=i+2<bytes.length?bytes[i+2]:0;
        const n=(a<<16)|(b<<8)|c;
        out += ALPHABET[(n>>>18)&63] + ALPHABET[(n>>>12)&63];
        if(i+1<bytes.length) out += ALPHABET[(n>>>6)&63];
        if(i+2<bytes.length) out += ALPHABET[n&63];
      }
      return out;
    }
    function b64ToBytes(s){
      const arr=[];
      for(let i=0;i<s.length;i+=4){
        const a=ALPHABET.indexOf(s[i]);
        const b=ALPHABET.indexOf(s[i+1]);
        const c=i+2<s.length?ALPHABET.indexOf(s[i+2]):-1;
        const d=i+3<s.length?ALPHABET.indexOf(s[i+3]):-1;
        if(a<0||b<0||(c<0&&i+2<s.length)||(d<0&&i+3<s.length)) throw new Error('Invalid base64 alphabet');
        const n=(a<<18)|(b<<12)|((c<0?0:c)<<6)|(d<0?0:d);
        arr.push((n>>>16)&255);
        if(c>=0) arr.push((n>>>8)&255);
        if(d>=0) arr.push(n&255);
      }
      return new Uint8Array(arr);
    }

    function utf8ToCode(s){ return bytesToB64(encoder.encode(s)); }
    function codeToUtf8(s){ return decoder.decode(b64ToBytes(s)); }

    // Compact varint encoded using our 64-symbol alphabet.
    function vint(n){
      let out='';
      do { out += ALPHABET[n & 31 | (n>31?32:0)]; n >>>= 5; } while(n);
      return out;
    }
    function readVint(str,pos){
      let shift=0,n=0;
      while(true){ if(pos>=str.length) throw new Error('bad varint'); const v=ALPHABET.indexOf(str[pos++]); if(v<0) throw new Error('bad varint char'); n|=(v&31)<<shift; if(!(v&32)) break; shift+=5; }
      return [n,pos];
    }

    // A shortlink has to land somewhere real, so give a bare host the https:// it is
    // missing. Anything not host-shaped is left alone, and never followed.
    function addScheme(s){
      if(/^[a-z][a-z0-9+.-]*:/i.test(s)) return s;
      return /^[^\s/?#]+\.[^\s/?#]{2,}/.test(s) ? 'https://'+s : s;
    }

    function normalizeUrl(raw){
      const s=addScheme(raw.trim());
      try{
        const u=new URL(s);
        // Conservative normalization only: preserve semantics.
        if((u.protocol==='https:'&&u.port==='443')||(u.protocol==='http:'&&u.port==='80')) u.port='';
        // Remove a bare trailing slash only when there is no query/hash/path content.
        if(u.pathname==='/' && !u.search && !u.hash) u.pathname='';
        return u.toString().replace(/\/$/,'');
      }catch{return s;}
    }

    // Dictionary tokenization. Escape marker is '~' internally, then payload is encoded.
    function dictEncode(s){
      let out='';
      let i=0;
      const dict=[...DOMAIN_DICT,...TOKEN_DICT].sort((a,b)=>b.length-a.length);
      while(i<s.length){
        let best=-1,bestToken='';
        for(let j=0;j<dict.length;j++) if(dict[j].length>bestToken.length && s.startsWith(dict[j],i)){best=j;bestToken=dict[j];}
        if(best>=0){ out+='~'+String.fromCharCode(33+best); i+=bestToken.length; }
        else { const ch=s[i++]; out += ch==='~' ? '~~' : ch; }
      }
      return out;
    }
    function dictDecode(s){
      const dict=[...DOMAIN_DICT,...TOKEN_DICT].sort((a,b)=>b.length-a.length);
      let out='';
      for(let i=0;i<s.length;i++){
        if(s[i]!=='~'){out+=s[i];continue;}
        const n=s[++i];
        if(n==='~'){out+='~';continue;}
        const idx=n.charCodeAt(0)-33;
        if(idx<0||idx>=dict.length) throw new Error('bad dictionary token');
        out+=dict[idx];
      }
      return out;
    }

    // URL structural encoding. Common URL components become tiny indexed fields.
    function structuralEncode(raw){
      let u; try{u=new URL(raw)}catch{return null}
      if(u.protocol!=='http:'&&u.protocol!=='https:') return null;
      let flags=0;
      if(u.protocol==='https:') flags|=1;
      let host=u.hostname;
      if(host.startsWith('www.')){flags|=2;host=host.slice(4)}
      let hostIdx=DOMAIN_DICT.indexOf(host);
      // DOMAIN_DICT has prefixes too; only use exact host matches.
      if(hostIdx<0 || DOMAIN_DICT[hostIdx].includes('://') || DOMAIN_DICT[hostIdx]==='www.') hostIdx=-1;
      if(hostIdx>=0) flags|=4;
      const port=u.port;
      if(port) flags|=8;
      const path=u.pathname==='/'?'':u.pathname;
      const query=u.search;
      const hash=u.hash;
      let meta=ALPHABET[flags];
      let body='';
      if(hostIdx>=0) body+=vint(hostIdx); else body+=utf8ToCode(host);
      const fields=[];
      if(port) fields.push(port); else fields.push('');
      fields.push(path,query,hash);
      // Use length prefixes so separator chars are unnecessary.
      for(const f of fields){const c=utf8ToCode(f); body+=vint(c.length)+c;}
      return meta+body;
    }
    function structuralDecode(payload){
      let pos=0;
      const flags=ALPHABET.indexOf(payload[pos++]); if(flags<0) throw new Error('bad structural flags');
      let host;
      if(flags&4){let n;[n,pos]=readVint(payload,pos);host=DOMAIN_DICT[n];}
      else{
        // Host is not length-prefixed in v1, so infer via decoding candidates using field boundaries is impossible.
        // Structural mode therefore only supports dictionary hosts. Kept intentionally strict.
        throw new Error('unsupported structural host');
      }
      const vals=[];
      for(let i=0;i<4;i++){let len;[len,pos]=readVint(payload,pos);vals.push(codeToUtf8(payload.slice(pos,pos+len)));pos+=len;}
      const [port,path,query,hash]=vals;
      const proto=(flags&1)?'https://':'http://';
      return proto+((flags&2)?'www.':'')+host+(port?':'+port:'')+(path||'/')+query+hash;
    }

    // Lightweight byte-RLE. Helps repeated patterns; otherwise loses and optimizer rejects it.
    function rleEncode(bytes){
      const out=[];
      for(let i=0;i<bytes.length;){
        let run=1; while(i+run<bytes.length && bytes[i+run]===bytes[i] && run<255) run++;
        if(run>=4 || bytes[i]===255){out.push(255,run,bytes[i]); i+=run;} else {for(let k=0;k<run;k++) out.push(bytes[i++]);}
      }
      return new Uint8Array(out);
    }
    function rleDecode(bytes){
      const out=[];
      for(let i=0;i<bytes.length;i++){
        if(bytes[i]===255){const run=bytes[++i], val=bytes[++i]; if(run===undefined||val===undefined) throw new Error('bad RLE'); for(let k=0;k<run;k++) out.push(val);} else out.push(bytes[i]);
      }
      return new Uint8Array(out);
    }

    function makeCandidates(raw){
      const s=normalizeUrl(raw);
      const candidates=[];
      const add=(name,id,payload,decode)=>{
        if(payload==null) return;
        const code=routeSafeEncode(id+payload);
        let ok=false,decoded='';
        try{decoded=decode(payload);ok=decoded===s || normalizeUrl(decoded)===s;}catch{}
        candidates.push({name,id,payload,code,len:code.length,ok,decoded});
      };
      add('Raw UTF-8/Base64', '0', utf8ToCode(s), p=>codeToUtf8(p));
      const d=dictEncode(s);
      add('Dictionary + Base64', '1', utf8ToCode(d), p=>dictDecode(codeToUtf8(p)));
      const r=rleEncode(encoder.encode(s));
      add('RLE bytes + Base64', '2', bytesToB64(r), p=>decoder.decode(rleDecode(b64ToBytes(p))));
      const sd=dictEncode(s);
      const sr=rleEncode(encoder.encode(sd));
      add('Dictionary + RLE + Base64', '3', bytesToB64(sr), p=>dictDecode(decoder.decode(rleDecode(b64ToBytes(p)))));
      const st=structuralEncode(s);
      if(st) add('URL structural', '4', st, p=>structuralDecode(p));
      return {normalized:s,candidates};
    }

    function decodeCode(code){
      code=routeSafeDecode(code.trim()); if(!code) throw new Error('Empty code');
      const id=code[0],p=code.slice(1);
      if(id==='0') return codeToUtf8(p);
      if(id==='1') return dictDecode(codeToUtf8(p));
      if(id==='2') return decoder.decode(rleDecode(b64ToBytes(p)));
      if(id==='3') return dictDecode(decoder.decode(rleDecode(b64ToBytes(p))));
      if(id==='4') return structuralDecode(p);
      throw new Error('Unknown strategy id');
    }

    let latest='';
    function encodeCurrent(){
      const raw=document.getElementById('url').value;
      const {normalized,candidates}=makeCandidates(raw);
      const valid=candidates.filter(x=>x.ok).sort((a,b)=>a.len-b.len);
      const best=valid[0];
      const tbody=document.getElementById('strategies'); tbody.innerHTML='';
      candidates.sort((a,b)=>a.len-b.len).forEach((c,i)=>{
        const tr=document.createElement('tr');
        tr.innerHTML=`<td class="${c===best?'win':'loss'}">${c===best?'✓ ':''}${c.name}</td><td class="mono">${escapeHtml(c.code)}</td><td>${c.len}</td><td class="${c.ok?'ok':'bad'}">${c.ok?'yes':'no'}</td>`;
        tbody.appendChild(tr);
      });
      if(!best){document.getElementById('best').textContent='No valid strategy';return;}
      const base=document.getElementById('base').value.trim()||new URL('./', location.href).href.split(/[?#]/)[0];
      const mode=document.getElementById('mode').value;
      const stem=base.replace(/[?#].*$/,'');
      latest=mode==='path'?stem+best.code:stem+(mode==='hash'?'#':'?s=')+best.code;
      document.getElementById('best').textContent=latest;
      document.getElementById('code').value=best.code;
      document.getElementById('decoded').textContent=best.decoded;
      document.getElementById('codeLen').textContent=best.len;
      document.getElementById('linkLen').textContent=latest.length;
      document.getElementById('origLen').textContent=normalized.length;
      document.getElementById('ratio').textContent=Math.round(best.len/Math.max(1,normalized.length)*100)+'%';
    }
    function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

    function decodeCurrent(){
      try{const u=decodeCode(document.getElementById('code').value);document.getElementById('decoded').textContent=u;return u}catch(e){document.getElementById('decoded').textContent='Error: '+e.message;return null}
    }

    function runTests(){
      const samples=[
        'https://example.com',
        'https://www.example.com/products/item?id=12345&utm_source=newsletter&utm_medium=email',
        'https://github.com/Code-X86/example-repository/issues/123?ref=homepage',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'http://example.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'https://openai.com/api/v1/users/search?page=12&lang=en',
        'https://en.wikipedia.org/wiki/Information_theory#Applications',
        'https://example.com/path/~literal~tilde?x=1&y=2'
      ];
      let pass=0; const rows=[];
      for(const s of samples){
        const {normalized,candidates}=makeCandidates(s);
        const valid=candidates.filter(c=>c.ok).sort((a,b)=>a.len-b.len);
        const best=valid[0];
        let round=false;
        try{round=normalizeUrl(decodeCode(best.code))===normalized}catch{}
        const actuallyShortest=best && valid.every(c=>best.len<=c.len);
        const ok=!!best&&round&&actuallyShortest; if(ok) pass++;
        rows.push(`<div class="${ok?'ok':'bad'}">${ok?'PASS':'FAIL'} <span class="mono">${escapeHtml(s)}</span><br><small>best=${best?best.name:'none'}, code=${best?best.len:'—'} chars, original=${normalized.length}</small></div>`);
      }
      document.getElementById('tests').innerHTML=`<b class="${pass===samples.length?'ok':'warn'}">${pass}/${samples.length} tests passed</b><div style="display:grid;gap:10px;margin-top:12px">${rows.join('')}</div>`;
    }
    return {
      emoji: false,
      addScheme: addScheme,
      decode: function (code) { return decodeCode(code); },
      encode: function (input) {
        var r = makeCandidates(input);
        var items = r.candidates.filter(function (c) { return c.ok; })
                                .sort(function (a, b) { return a.len - b.len; });
        return { normalized: r.normalized, items: items };
      }
    };
  })(),
  2: (function () {
    const A="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@/?"; // 81 URL-fragment-friendly chars
    const TE=new TextEncoder(), TD=new TextDecoder();

    const TOKENS=[
      'https://www.','https://','http://www.','http://','www.',
      'youtube.com','youtu.be','github.com','google.com','wikipedia.org','reddit.com','amazon.com','openai.com','microsoft.com','apple.com','cloudflare.com','discord.com','instagram.com','facebook.com','tiktok.com','twitter.com','x.com','example.com',
      '.com','.org','.net','.io','.dev','.app','.ai','.ca','.co.uk','.me','.tv','.gg','.xyz','.site',
      '/watch?v=','/products/','/product/','/users/','/user/','/search','/api/','/v1/','/v2/','/wiki/','/issues/','/releases/','/download/',
      '?utm_source=','&utm_source=','?utm_medium=','&utm_medium=','?utm_campaign=','&utm_campaign=','?utm_term=','&utm_term=','?utm_content=','&utm_content=',
      '?ref=','&ref=','?id=','&id=','?page=','&page=','?q=','&q=','?lang=','&lang=','?source=','&source=',
      '.html','.php','index.','newsletter','email','homepage','true','false'
    ].sort((a,b)=>b.length-a.length);
    const TOKEN_BYTES=TOKENS.map(x=>TE.encode(x));
    const EXPECTED_VERSION=2;
    function detectPathVersion(pathname=location.pathname){const m=pathname.match(/(?:^|\/)(\d+)(?:\/|$)/);return m?Number(m[1]):null}
    // Routing-safety transform. All literal ! are escaped first, then / becomes !s.
    // Therefore generated public codes can never contain /N/ version-like path fragments.
    function routeSafeEncode(code){return code.replace(/!/g,'!!').replace(/\//g,'!s')}
    function routeSafeDecode(code){let out='';for(let i=0;i<code.length;i++){if(code[i]!=='!'){out+=code[i];continue}if(++i>=code.length)throw Error('bad route escape');if(code[i]==='!')out+='!';else if(code[i]==='s')out+='/';else throw Error('bad route escape')}return out}
    function hasReservedVersionSequence(code){return /\/\d+\//.test(code)}
    const COMMON_HOSTS=['example.com','github.com','youtube.com','youtu.be','google.com','reddit.com','openai.com','wikipedia.org','amazon.com','microsoft.com','apple.com','cloudflare.com','discord.com','x.com','twitter.com','facebook.com','instagram.com','tiktok.com'];

    // A shortlink has to land somewhere real, so give a bare host the https:// it is
    // missing. Anything not host-shaped is left alone, and never followed.
    function addScheme(s){return /^[a-z][a-z0-9+.-]*:/i.test(s)?s:(/^[^\s/?#]+\.[^\s/?#]{2,}/.test(s)?'https://'+s:s)}
    function normalizeUrl(raw){
      const s=addScheme(raw.trim());
      try{const u=new URL(s);if((u.protocol==='https:'&&u.port==='443')||(u.protocol==='http:'&&u.port==='80'))u.port='';if(u.pathname==='/'&&!u.search&&!u.hash)u.pathname='';return u.toString().replace(/\/$/,'');}catch{return s;}
    }
    function bytesEq(a,b){if(a.length!==b.length)return false;for(let i=0;i<a.length;i++)if(a[i]!==b[i])return false;return true}
    function base81Encode(data){
      const b=new Uint8Array(data.length+1);b[0]=1;b.set(data,1);
      let n=0n;for(const x of b)n=(n<<8n)|BigInt(x);
      let s='';while(n){const r=Number(n%81n);s=A[r]+s;n/=81n;}return s||A[0];
    }
    function base81Decode(s){
      let n=0n;for(const ch of s){const v=A.indexOf(ch);if(v<0)throw Error('invalid Base81 character');n=n*81n+BigInt(v)}
      const a=[];while(n){a.push(Number(n&255n));n>>=8n}a.reverse();if(a[0]!==1)throw Error('bad Base81 sentinel');return new Uint8Array(a.slice(1));
    }
    function varPut(n,out){do{let b=n&127;n>>>=7;if(n)b|=128;out.push(b)}while(n)}
    function varGet(bytes,p){let n=0,s=0,b;do{if(p.i>=bytes.length)throw Error('bad varint');b=bytes[p.i++];n|=(b&127)<<s;s+=7;if(s>35)throw Error('varint too large')}while(b&128);return n>>>0}

    function tokenEncodeBytes(input){
      const bytes=input instanceof Uint8Array?input:TE.encode(input),out=[];
      for(let i=0;i<bytes.length;){let hit=-1,hlen=0;
        for(let t=0;t<TOKEN_BYTES.length;t++){const tb=TOKEN_BYTES[t];if(tb.length<=hlen||i+tb.length>bytes.length)continue;let ok=true;for(let k=0;k<tb.length;k++)if(bytes[i+k]!==tb[k]){ok=false;break}if(ok){hit=t;hlen=tb.length}}
        if(hit>=0&&hlen>2){out.push(0,hit+1);i+=hlen}else{const b=bytes[i++];if(b===0)out.push(0,0);else out.push(b)}
      }return new Uint8Array(out);
    }
    function tokenDecodeBytes(bytes){const out=[];for(let i=0;i<bytes.length;i++){const b=bytes[i];if(b!==0){out.push(b);continue}if(++i>=bytes.length)throw Error('bad token stream');const t=bytes[i];if(t===0){out.push(0);continue}const tb=TOKEN_BYTES[t-1];if(!tb)throw Error('bad token id');for(const x of tb)out.push(x)}return new Uint8Array(out)}

    function lzEncode(bytes){
      const out=[];for(let i=0;i<bytes.length;){let bestL=0,bestO=0;const start=Math.max(0,i-255);
        for(let j=i-1;j>=start;j--){let l=0;while(l<255&&i+l<bytes.length&&bytes[j+l]===bytes[i+l])l++;if(l>bestL){bestL=l;bestO=i-j;if(l>=255)break}}
        if(bestL>=4){out.push(0,bestO,bestL);i+=bestL}else{const b=bytes[i++];if(b===0)out.push(0,0);else out.push(b)}
      }return new Uint8Array(out);
    }
    function lzDecode(bytes){const out=[];for(let i=0;i<bytes.length;i++){const b=bytes[i];if(b!==0){out.push(b);continue}if(++i>=bytes.length)throw Error('bad LZ stream');const off=bytes[i];if(off===0){out.push(0);continue}if(++i>=bytes.length)throw Error('bad LZ backref');const len=bytes[i];if(off>out.length)throw Error('invalid LZ offset');for(let k=0;k<len;k++)out.push(out[out.length-off])}return new Uint8Array(out)}

    function structuralEncode(s){let u;try{u=new URL(s)}catch{return null}if(!/^https?:$/.test(u.protocol))return null;
      let flags=u.protocol==='https:'?1:0,host=u.hostname;if(host.startsWith('www.')){flags|=2;host=host.slice(4)}
      const hi=COMMON_HOSTS.indexOf(host);if(hi>=0)flags|=4;if(u.port)flags|=8;
      const out=[flags];if(hi>=0)out.push(hi+1);else{const hb=tokenEncodeBytes(host);varPut(hb.length,out);out.push(...hb)}
      if(u.port){const pb=TE.encode(u.port);varPut(pb.length,out);out.push(...pb)}
      const rest=(u.pathname==='/'?'':u.pathname)+u.search+u.hash,rb=tokenEncodeBytes(rest);out.push(...rb);return new Uint8Array(out)
    }
    function structuralDecode(bytes){const p={i:0};if(!bytes.length)throw Error('empty structural');const flags=bytes[p.i++];let host;
      if(flags&4){const id=bytes[p.i++]-1;host=COMMON_HOSTS[id];if(!host)throw Error('bad host id')}else{const n=varGet(bytes,p);host=TD.decode(tokenDecodeBytes(bytes.slice(p.i,p.i+n)));p.i+=n}
      let port='';if(flags&8){const n=varGet(bytes,p);port=TD.decode(bytes.slice(p.i,p.i+n));p.i+=n}
      const rest=TD.decode(tokenDecodeBytes(bytes.slice(p.i)));return ((flags&1)?'https://':'http://')+((flags&2)?'www.':'')+host+(port?':'+port:'')+(rest||'/')
    }

    const RAW64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    function b64urlLen(bytes){return Math.ceil(bytes.length*8/6)}

    function makeCandidates(raw){const s=normalizeUrl(raw),src=TE.encode(s),cs=[];
      const add=(name,id,bytes,decodeBytes)=>{if(!bytes)return;const payload=base81Encode(bytes),rawCode=id+payload,code=routeSafeEncode(rawCode);let decoded='',ok=false;try{decoded=decodeBytes(bytes);ok=normalizeUrl(decoded)===s&&!hasReservedVersionSequence(code)&&decodeCode(code)===decoded}catch{}cs.push({name,id,code,len:code.length,ok,decoded})};
      add('Raw UTF-8 → Base81','0',src,b=>TD.decode(b));
      const tok=tokenEncodeBytes(src);add('Token dictionary → Base81','1',tok,b=>TD.decode(tokenDecodeBytes(b)));
      const lz=lzEncode(src);add('LZ backreferences → Base81','2',lz,b=>TD.decode(lzDecode(b)));
      const tlz=lzEncode(tok);add('Tokens + LZ → Base81','3',tlz,b=>TD.decode(tokenDecodeBytes(lzDecode(b))));
      const st=structuralEncode(s);if(st){add('URL grammar → Base81','4',st,b=>structuralDecode(b));const slz=lzEncode(st);add('URL grammar + LZ → Base81','5',slz,b=>structuralDecode(lzDecode(b)))}
      return {normalized:s,candidates:cs,raw64:1+b64urlLen(src)}
    }
    function decodeCode(code){code=routeSafeDecode(code.trim());if(code.length<2)throw Error('code too short');const id=code[0],b=base81Decode(code.slice(1));if(id==='0')return TD.decode(b);if(id==='1')return TD.decode(tokenDecodeBytes(b));if(id==='2')return TD.decode(lzDecode(b));if(id==='3')return TD.decode(tokenDecodeBytes(lzDecode(b)));if(id==='4')return structuralDecode(b);if(id==='5')return structuralDecode(lzDecode(b));throw Error('unknown strategy')}
    function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
    let latest='';
    function encodeCurrent(){const {normalized,candidates,raw64}=makeCandidates(document.getElementById('url').value);const valid=candidates.filter(x=>x.ok).sort((a,b)=>a.len-b.len),best=valid[0];const tb=document.getElementById('strategies');tb.innerHTML='';[...candidates].sort((a,b)=>a.len-b.len).forEach(c=>{const tr=document.createElement('tr');tr.innerHTML=`<td class="${c===best?'win':''}">${c===best?'✓ ':''}${esc(c.name)}</td><td class="mono">${esc(c.code)}</td><td>${c.len}</td><td class="${c.ok?'ok':'bad'}">${c.ok?'yes':'no'}</td>`;tb.appendChild(tr)});if(!best){document.getElementById('best').textContent='No valid strategy';return}
      const base=(document.getElementById('base').value.trim()||new URL('./', location.href).href.split(/[?#]/)[0]).replace(/[?#].*$/,'');const mode=document.getElementById('mode').value;latest=mode==='path'?base+best.code:mode==='hash'?base+'#'+best.code:base+'?s='+encodeURIComponent(best.code);document.getElementById('best').textContent=latest;document.getElementById('code').value=best.code;document.getElementById('decoded').textContent=best.decoded;document.getElementById('codeLen').textContent=best.len;document.getElementById('linkLen').textContent=latest.length;document.getElementById('origLen').textContent=normalized.length;document.getElementById('ratio').textContent=Math.round(best.len/Math.max(1,normalized.length)*100)+'%';document.getElementById('saved').textContent=Math.round((1-best.len/raw64)*100)+'%'}
    function decodeCurrent(){try{const u=decodeCode(document.getElementById('code').value);document.getElementById('decoded').textContent=u;return u}catch(e){document.getElementById('decoded').textContent='Error: '+e.message;return null}}
    function runTests(){const samples=['https://example.com','https://www.example.com/products/item?id=12345&utm_source=newsletter&utm_medium=email','https://github.com/Code-X86/example-repository/issues/123?ref=homepage','https://www.youtube.com/watch?v=dQw4w9WgXcQ','http://example.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','https://openai.com/api/v1/users/search?page=12&lang=en','https://en.wikipedia.org/wiki/Information_theory#Applications','https://example.com/path/~literal~tilde?x=1&y=2','https://subdomain.example.com/a/b/c/d?utm_campaign=test&utm_source=google','https://example.com/repeat/repeat/repeat/repeat/repeat','http://localhost:8080/api/v1/users?id=42','https://example.com/emoji/%F0%9F%98%80?q=hello%20world'];let pass=0,html='';for(const x of samples){const r=makeCandidates(x),v=r.candidates.filter(c=>c.ok).sort((a,b)=>a.len-b.len),b=v[0];let ok=false;try{ok=!!b&&normalizeUrl(decodeCode(b.code))===r.normalized&&v.every(c=>b.len<=c.len)&&!hasReservedVersionSequence(b.code)}catch{}if(ok)pass++;html+=`<div class="${ok?'ok':'bad'}" style="margin:8px 0">${ok?'PASS':'FAIL'} <span class="mono">${esc(x)}</span><br><small>${b?esc(b.name):'none'} · code ${b?b.len:'—'} · raw64 ${r.raw64}</small></div>`}document.getElementById('tests').innerHTML=`<b class="${pass===samples.length?'ok':'warn'}">${pass}/${samples.length} tests passed</b>${html}`}
    return {
      emoji: false,
      addScheme: addScheme,
      decode: function (code) { return decodeCode(code); },
      encode: function (input) {
        var r = makeCandidates(input);
        var items = r.candidates.filter(function (c) { return c.ok; })
                                .sort(function (a, b) { return a.len - b.len; });
        return { normalized: r.normalized, items: items };
      }
    };
  })(),
  3: (function () {
    const A="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@/?"; // 81 chars
    const BASE=BigInt(A.length);
    const te=new TextEncoder(),td=new TextDecoder();
    const EXPECTED_VERSION=3;
    function detectPathVersion(pathname=location.pathname){const m=pathname.match(/(?:^|\/)(\d+)(?:\/|$)/);return m?Number(m[1]):null}
    // Escape routing delimiters after compression. This keeps the dense Base81 codec intact
    // while making /1/, /2/, /3/, /123/, etc. impossible inside generated public codes.
    function routeSafeEncode(code){return code.replace(/!/g,'!!').replace(/\//g,'!s')}
    function routeSafeDecode(code){let out='';for(let i=0;i<code.length;i++){if(code[i]!=='!'){out+=code[i];continue}if(++i>=code.length)throw Error('bad route escape');if(code[i]==='!')out+='!';else if(code[i]==='s')out+='/';else throw Error('bad route escape')}return out}
    function hasReservedVersionSequence(code){return /\/\d+\//.test(code)}
    const enc=s=>te.encode(s), dec=b=>td.decode(b);
    const concat=(...xs)=>{let n=xs.reduce((a,x)=>a+x.length,0),o=new Uint8Array(n),p=0;for(const x of xs){o.set(x,p);p+=x.length}return o};
    function varint(n){let a=[];n=Number(n);do{let b=n&127;n>>>=7;if(n)b|=128;a.push(b)}while(n);return Uint8Array.from(a)}
    function readVar(b,p){let n=0,s=0,x;do{if(p.i>=b.length)throw Error('truncated varint');x=b[p.i++];n|=(x&127)<<s;s+=7}while(x&128);return n>>>0}
    function pack81(bytes){if(!bytes.length)return '0';let x=0n;for(const b of bytes)x=(x<<8n)|BigInt(b);let out='';while(x){out=A[Number(x%BASE)]+out;x/=BASE}let zeros=0;while(zeros<bytes.length&&bytes[zeros]===0)zeros++;return A[0].repeat(zeros)+out}
    function unpack81(s){if(!s)return new Uint8Array();let zeros=0;while(zeros<s.length&&s[zeros]===A[0])zeros++;let x=0n;for(const c of s){let i=A.indexOf(c);if(i<0)throw Error('bad alphabet');x=x*BASE+BigInt(i)}let arr=[];while(x){arr.push(Number(x&255n));x>>=8n}arr.reverse();return Uint8Array.from([...new Array(zeros).fill(0),...arr])}
    const HOSTS=['youtube.com','youtu.be','github.com','reddit.com','www.reddit.com','google.com','wikipedia.org','en.wikipedia.org','example.com','x.com','twitter.com','discord.com','discord.gg','tiktok.com','instagram.com','facebook.com','amazon.com','amazon.ca','microsoft.com','apple.com','cloudflare.com','openai.com','chatgpt.com','stackoverflow.com','developer.mozilla.org','npmjs.com','pypi.org'];
    const QT=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','ref','source','q','query','search','id','v','t','page','sort','lang','feature','si','list','index','start','end','redirect','url'];
    const TOK=['https://','http://','www.','.com','.org','.net','.io','.dev','.app','.ca','/api/','/v1/','/v2/','/watch','/user/','/users/','/repo/','/repos/','/blob/','/tree/','/commit/','/issues/','/pull/','?','&','=', '%20','%2F','%3A','/'];
    function putStr(s){let b=enc(s);return concat(varint(b.length),b)}
    function getStr(b,p){let n=readVar(b,p);if(p.i+n>b.length)throw Error('truncated string');let s=dec(b.slice(p.i,p.i+n));p.i+=n;return s}
    function isHex(s){return s.length>=6&&s.length%2===0&&/^[0-9a-fA-F]+$/.test(s)}
    function isUUID(s){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s)}
    function valPack(s){
     if(/^\d+$/.test(s)&&s.length<=15){let x=BigInt(s),a=[];do{a.push(Number(x&255n));x>>=8n}while(x);a.reverse();return concat(Uint8Array.of(1),varint(a.length),Uint8Array.from(a))}
     if(isUUID(s)){let h=s.replaceAll('-',''),a=[];for(let i=0;i<h.length;i+=2)a.push(parseInt(h.slice(i,i+2),16));return concat(Uint8Array.of(2),Uint8Array.from(a))}
     if(isHex(s)&&s.length<=128){let a=[];for(let i=0;i<s.length;i+=2)a.push(parseInt(s.slice(i,i+2),16));return concat(Uint8Array.of(3,s===s.toUpperCase()?1:0),varint(a.length),Uint8Array.from(a))}
     return concat(Uint8Array.of(0),putStr(s));
    }
    function valUnpack(b,p){let t=b[p.i++];if(t===0)return getStr(b,p);if(t===1){let n=readVar(b,p),x=0n;for(let i=0;i<n;i++)x=(x<<8n)|BigInt(b[p.i++]);return x.toString()}if(t===2){let h='';for(let i=0;i<16;i++)h+=b[p.i++].toString(16).padStart(2,'0');return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20)}if(t===3){let up=b[p.i++],n=readVar(b,p),h='';for(let i=0;i<n;i++)h+=b[p.i++].toString(16).padStart(2,'0');return up?h.toUpperCase():h}throw Error('bad value type')}
    function genericURL(s){let u;try{u=new URL(s)}catch{return null}let out=[4]; // codec id
     out.push(u.protocol==='https:'?0:u.protocol==='http:'?1:2);if(out[1]===2)out.push(...putStr(u.protocol));
     let host=u.hostname.toLowerCase(),www=host.startsWith('www.');if(www)host=host.slice(4);let hi=HOSTS.indexOf(host);out.push(www?1:0);if(hi>=0)out.push(hi+1);else out.push(0,...putStr(host));
     let port=u.port||'';out.push(port?1:0);if(port)out.push(...varint(+port));
     let seg=u.pathname.split('/').filter(Boolean);out.push(...varint(seg.length));let seen=new Map();for(let i=0;i<seg.length;i++){let x=decodeURIComponent(seg[i]);let prev=seen.get(x);if(prev!=null&&i-prev<=255){out.push(4,i-prev)}else{let vi=valPack(x);out.push(...vi);seen.set(x,i)}}
     let qs=[...u.searchParams.entries()];out.push(...varint(qs.length));for(const [k,v] of qs){let qi=QT.indexOf(k);if(qi>=0)out.push(qi+1);else out.push(0,...putStr(k));out.push(...valPack(v))}
     let frag=u.hash.slice(1);out.push(frag?1:0);if(frag)out.push(...valPack(frag));return Uint8Array.from(out)}
    function genericURLDecode(b){let p={i:1},sc=b[p.i++],proto=sc===0?'https:':sc===1?'http:':getStr(b,p);let www=b[p.i++]===1,hi=b[p.i++],host=hi?HOSTS[hi-1]:getStr(b,p);if(www)host='www.'+host;let port=b[p.i++]?':'+readVar(b,p):'';let n=readVar(b,p),seg=[],history=[];for(let i=0;i<n;i++){let t=b[p.i];if(t===4){p.i++;let d=b[p.i++];if(d<1||d>history.length)throw Error('bad repeat');seg.push(history[history.length-d]);history.push(seg.at(-1))}else{let v=valUnpack(b,p);seg.push(encodeURIComponent(v).replace(/%2F/gi,'%252F'));history.push(v)}}let qn=readVar(b,p),params=[];for(let i=0;i<qn;i++){let qi=b[p.i++],k=qi?QT[qi-1]:getStr(b,p),v=valUnpack(b,p);params.push(encodeURIComponent(k)+'='+encodeURIComponent(v))}let frag=b[p.i++]?valUnpack(b,p):'';let path=seg.length?'/'+seg.join('/'):'/';let s=proto+'//'+host+port+path+(params.length?'?'+params.join('&'):'')+(frag?'#'+encodeURIComponent(frag):'');return s}
    function serviceCodec(s){let u;try{u=new URL(s)}catch{return null}let h=u.hostname.replace(/^www\./,'');
     // youtube watch
     if((h==='youtube.com'||h==='youtu.be')){let id=h==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v');if(id&&/^[\w-]{6,20}$/.test(id)){let rest=new URLSearchParams(u.searchParams);rest.delete('v');let r=rest.toString();return concat(Uint8Array.of(5,0),putStr(id),putStr(r),putStr(u.hash.slice(1)))} }
     // github owner/repo[/...]
     if(h==='github.com'){let a=u.pathname.split('/').filter(Boolean);if(a.length>=2){return concat(Uint8Array.of(5,1),putStr(a[0]),putStr(a[1]),putStr('/'+a.slice(2).join('/')),putStr(u.search),putStr(u.hash))}}
     // reddit compact path
     if(h==='reddit.com'||h==='www.reddit.com'){return concat(Uint8Array.of(5,2),putStr(u.pathname),putStr(u.search),putStr(u.hash))}
     return null}
    function serviceDecode(b){let p={i:1},t=b[p.i++];if(t===0){let id=getStr(b,p),r=getStr(b,p),f=getStr(b,p);return 'https://www.youtube.com/watch?v='+encodeURIComponent(id)+(r?'&'+r:'')+(f?'#'+f:'')}if(t===1){let o=getStr(b,p),r=getStr(b,p),path=getStr(b,p),q=getStr(b,p),h=getStr(b,p);return 'https://github.com/'+o+'/'+r+(path==='/'?'':path)+q+h}if(t===2)return 'https://www.reddit.com'+getStr(b,p)+getStr(b,p)+getStr(b,p);throw Error('bad service')}
    function tokenEncode(bytes){let s=dec(bytes),o=[];for(let i=0;i<s.length;){let best=-1,bl=0;for(let j=0;j<TOK.length;j++)if(TOK[j].length>bl&&s.startsWith(TOK[j],i)){best=j;bl=TOK[j].length}if(best>=0&&bl>=3){o.push(255,best);i+=bl}else{let b=enc(s[i]);for(const x of b)o.push(x);i++}}return concat(Uint8Array.of(2),Uint8Array.from(o))}
    function tokenDecode(b){let o=[];for(let i=1;i<b.length;i++){if(b[i]===255){let t=TOK[b[++i]];if(t==null)throw Error('bad token');o.push(...enc(t))}else o.push(b[i])}return Uint8Array.from(o)}
    function lzEncode(src){let o=[3],i=0;while(i<src.length){let bestL=0,bestD=0,start=Math.max(0,i-255);for(let j=start;j<i;j++){let l=0;while(l<130&&i+l<src.length&&src[j+l]===src[i+l]&&j+l<i)l++;if(l>bestL&&l>=4){bestL=l;bestD=i-j}}if(bestL>=4){o.push(128+(bestL-3),bestD);i+=bestL}else{let run=i;while(i<src.length&&i-run<127){let found=false;if(i+4<=src.length){for(let j=Math.max(0,i-255);j<i;j++)if(src[j]===src[i]&&src[j+1]===src[i+1]&&src[j+2]===src[i+2]&&src[j+3]===src[i+3]){found=true;break}}if(found&&i>run)break;i++}o.push(i-run);for(let k=run;k<i;k++)o.push(src[k])}}return Uint8Array.from(o)}
    function lzDecode(b){let o=[];for(let i=1;i<b.length;){let t=b[i++];if(t<=127){for(let n=0;n<t;n++)o.push(b[i++])}else{let l=t-128+3,d=b[i++];for(let n=0;n<l;n++)o.push(o[o.length-d])}}return Uint8Array.from(o)}
    function raw(s){return concat(Uint8Array.of(1),enc(s))}
    function decodePayload(b){if(!b.length)throw Error('empty');if(b[0]===1)return dec(b.slice(1));if(b[0]===2)return dec(tokenDecode(b));if(b[0]===3)return dec(lzDecode(b));if(b[0]===4)return genericURLDecode(b);if(b[0]===5)return serviceDecode(b);if(b[0]===6){let p={i:1},inner=b.slice(p.i);return dec(tokenDecode(lzDecode(concat(Uint8Array.of(3),inner))))}throw Error('unknown codec')}
    function comboTokenLZ(s){let t=tokenEncode(enc(s));let l=lzEncode(t.slice(1));return concat(Uint8Array.of(6),l.slice(1))}
    // A shortlink has to land somewhere real, so give a bare host the https:// it is
    // missing. Anything not host-shaped is left alone, and never followed.
    function addScheme(s){return /^[a-z][a-z0-9+.-]*:/i.test(s)?s:(/^[^\s/?#]+\.[^\s/?#]{2,}/.test(s)?'https://'+s:s)}
    function normalize(s){s=addScheme(s.trim());try{return new URL(s).href}catch{return s}}
    function optimize(input){let s=normalize(input),items=[];const add=(name,b)=>{if(!b)return;try{let rawCode=pack81(b),code=routeSafeEncode(rawCode),back=decodeCode(code);if(back===s&&!hasReservedVersionSequence(code))items.push({name,b,code,len:code.length})}catch(e){}}
     add('raw/base81',raw(s));add('token dictionary',tokenEncode(enc(s)));add('LZ',lzEncode(enc(s)));add('token → LZ',comboTokenLZ(s));add('URL grammar',genericURL(s));add('service-specific',serviceCodec(s));
     // Meta-search: LZ over selected binary codecs in a self-describing wrapper isn't always shorter; test a raw tagged wrapper.
     const bases=[genericURL(s),serviceCodec(s)].filter(Boolean);for(const base of bases){let l=lzEncode(base);let wrap=concat(Uint8Array.of(7,base[0]),l.slice(1));try{let rawCode=pack81(wrap),code=routeSafeEncode(rawCode);let back=decodeCode(code);if(back===s&&!hasReservedVersionSequence(code))items.push({name:(base[0]===4?'URL grammar':'service')+' → binary LZ',b:wrap,code,len:code.length})}catch{}}
     items.sort((a,b)=>a.len-b.len||a.b.length-b.b.length);return {s,items}}
    function decodeAny(b){if(b[0]!==7)return decodePayload(b);let orig=b[1],lz=concat(Uint8Array.of(3),b.slice(2)),inner=lzDecode(lz);return decodePayload(concat(Uint8Array.of(orig),inner))}
    function decodeCode(code){return decodeAny(unpack81(routeSafeDecode(code.trim())))}

    /* ---- emoji mode ---- */
    var EMOJI = "😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙋🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌡🌢🌣🌤🌥🌦🌧🌨🌩🌪🌫🌬🌭🌮🌯🌰🌱🌲🌳🌴🌵🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐";
    var SENTINEL = '\u2728';
    var SYMS = A.split('').concat(Array.from(EMOJI));
    if (SYMS.length !== 256) throw new Error('emoji alphabet must be 256 symbols');
    var SYMVAL = new Map(SYMS.map(function (s, i) { return [s, i]; }));

    function packSyms(bytes) {
      var o = '';
      for (var i = 0; i < bytes.length; i++) o += SYMS[bytes[i]];
      return o;
    }
    function unpackSyms(str) {
      var a = Array.from(str), o = new Uint8Array(a.length);
      for (var i = 0; i < a.length; i++) {
        var val = SYMVAL.get(a[i]);
        if (val === undefined) throw new Error('symbol outside the emoji alphabet');
        o[i] = val;
      }
      return o;
    }
    function isEmojiCode(code) { return Array.from(code.trim())[0] === SENTINEL; }

    var decodeBase81 = decodeCode;
    function decodeEither(code) {
      code = code.trim();
      if (!isEmojiCode(code)) return decodeBase81(code);
      var body = Array.from(code).slice(1).join('');
      return decodeAny(unpackSyms(routeSafeDecode(body)));
    }

    // Re-pack each candidate's byte payload instead of re-running the search.
    function encodeEmoji(input) {
      var r = optimize(input);
      var items = [];
      for (var i = 0; i < r.items.length; i++) {
        var it = r.items[i];
        var code = SENTINEL + routeSafeEncode(packSyms(it.b));
        try {
          if (decodeEither(code) !== r.s || hasReservedVersionSequence(code)) continue;
        } catch (e) { continue; }
        items.push({ name: it.name, b: it.b, code: code, len: Array.from(code).length });
      }
      items.sort(function (a, b) { return a.len - b.len || a.b.length - b.b.length; });
      return { normalized: r.s, items: items };
    }

    return {
      emoji: true,
      addScheme: addScheme,
      decode: decodeEither,
      encode: function (input, useEmoji) {
        if (useEmoji) return encodeEmoji(input);
        var r = optimize(input);
        return { normalized: r.s, items: r.items };
      }
    };
  })()
};

var ORDER = [5, 4, 3, 2, 1];

// Try the named version first when the caller has a hint. Version 1's decoder
// returns garbage rather than throwing on a foreign code, and version 4's
// dictionary is made of URL fragments, so an untargeted sweep runs newest
// first. Either way a result is only accepted when it is an absolute http(s)
// URL, and version 4 additionally checks its own tag and checksum.
async function resolve(code, hint) {
  var order = ORDER.slice();
  if (hint && CODECS[hint]) order = [Number(hint)].concat(order.filter(function (v) { return String(v) !== hint; }));
  for (var i = 0; i < order.length; i++) {
    var v = order[i];
    try {
      // version 4 decodes through DecompressionStream, so this is a promise
      // there and a plain value for 1-3; awaiting covers both.
      var u = CODECS[v].addScheme(await CODECS[v].decode(code));
      if (/^https?:\/\//.test(u)) return { version: v, url: u };
    } catch (e) {}
  }
  return null;
}

// Every codec races; the shortest code wins. Emoji mode only adds candidates,
// so enabling it can never make the result longer.
//
// Each codec round-trips its own candidates, but that is not enough on its own:
// versions 1-3 put no version tag in a code, so a short code minted by one can
// also be valid input to another and decode to something else. What matters is
// what resolve() will do with the link, so every candidate is checked through
// that exact path — untargeted, the way a bare /s/#code link arrives — and the
// shortest one that survives is the one handed out.
async function encodeBest(input, useEmoji) {
  var all = [];
  for (var oi = 0; oi < ORDER.length; oi++) {
    var v = ORDER[oi], codec = CODECS[v];
    var modes = useEmoji && codec.emoji ? [false, true] : [false];
    for (var mi = 0; mi < modes.length; mi++) {
      var emoji = modes[mi], r;
      try { r = await codec.encode(input, emoji); } catch (e) { continue; }
      // the resolver only ever follows an absolute http(s) URL, so a candidate
      // for anything else would encode into a link that never goes anywhere
      if (!/^https?:\/\//.test(r.normalized)) continue;
      for (var ii = 0; ii < r.items.length; ii++) {
        all.push({
          version: v, emoji: emoji, strategy: r.items[ii].name,
          code: r.items[ii].code, len: r.items[ii].len, normalized: r.normalized
        });
      }
    }
  }
  all.sort(function (a, b) { return a.len - b.len || b.version - a.version; });

  for (var i = 0; i < all.length; i++) {
    var hit = null;
    try { hit = await resolve(all[i].code, null); } catch (e) {}
    if (hit && hit.url === all[i].normalized) return all[i];
  }
  return null;
}

return { CODECS: CODECS, ORDER: ORDER, resolve: resolve, encodeBest: encodeBest };
})();
