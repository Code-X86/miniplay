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
      // the original keys — permanent, never reassigned
      '0': 'https://google.com/',
      '1': 'https://youtube.com/',
      '2': 'https://facebook.com/',
      '3': 'https://instagram.com/',
      '4': 'https://x.com/',
      '5': 'https://wikipedia.org/',
      '6': 'https://reddit.com/',
      '7': 'https://amazon.com/',
      '8': 'https://chatgpt.com/',
      '9': 'https://claude.ai/',
      '10': 'https://github.com/',
      '11': 'https://netflix.com/',
      '12': 'https://tiktok.com/',
      '13': 'https://linkedin.com/',
      '14': 'https://whatsapp.com/',
      '15': 'https://discord.com/',
      '16': 'https://twitch.tv/',
      '17': 'https://spotify.com/',
      '18': 'https://apple.com/',
      '19': 'https://microsoft.com/',
      '20': 'https://mail.google.com/',
      '21': 'https://drive.google.com/',
      '22': 'https://docs.google.com/',
      '23': 'https://maps.google.com/',
      '24': 'https://news.ycombinator.com/',
      '25': 'https://stackoverflow.com/',
      '26': 'https://medium.com/',
      '27': 'https://ebay.com/',
      '28': 'https://paypal.com/',
      '29': 'https://pinterest.com/',
      '30': 'https://yahoo.com/',
      '31': 'https://bing.com/',
      '32': 'https://duckduckgo.com/',
      '33': 'https://cnn.com/',
      '34': 'https://bbc.com/',
      '35': 'https://nytimes.com/',
      '36': 'https://theguardian.com/',
      '37': 'https://espn.com/',
      '38': 'https://imdb.com/',
      '39': 'https://twitter.com/',
      '40': 'https://roblox.com/',
      '41': 'https://minecraft.net/',
      '42': 'https://store.steampowered.com/',
      '43': 'https://epicgames.com/',
      '44': 'https://nintendo.com/',
      '45': 'https://playstation.com/',
      '46': 'https://xbox.com/',
      '47': 'https://itch.io/',
      '48': 'https://poki.com/',
      '49': 'https://coolmathgames.com/',
      '50': 'https://openai.com/',
      '51': 'https://anthropic.com/',
      '52': 'https://huggingface.co/',
      '53': 'https://npmjs.com/',
      '54': 'https://pypi.org/',
      '55': 'https://crates.io/',
      '56': 'https://developer.mozilla.org/',
      '57': 'https://w3schools.com/',
      '58': 'https://gitlab.com/',
      '59': 'https://austin-code.com/',
      '60': 'https://en.wikipedia.org/',
      '61': 'https://archive.org/',
      '62': 'https://dropbox.com/',
      '63': 'https://soundcloud.com/',
      '64': 'https://vimeo.com/',
      '65': 'https://imgur.com/',
      '66': 'https://etsy.com/',
      '67': 'https://shopify.com/',
      '68': 'https://stripe.com/',
      '69': 'https://cloudflare.com/',

      // one-character aliases; the numeric keys above still decode
      'g': 'https://github.com/',
      'n': 'https://netflix.com/',
      't': 'https://tiktok.com/',
      'l': 'https://linkedin.com/',
      'w': 'https://whatsapp.com/',
      'd': 'https://discord.com/',
      'v': 'https://twitch.tv/',
      'm': 'https://spotify.com/',
      'a': 'https://apple.com/',
      'M': 'https://microsoft.com/',
      'e': 'https://mail.google.com/',
      'D': 'https://drive.google.com/',
      'o': 'https://docs.google.com/',
      'p': 'https://maps.google.com/',
      'h': 'https://news.ycombinator.com/',
      's': 'https://stackoverflow.com/',
      'E': 'https://ebay.com/',
      'P': 'https://paypal.com/',
      'S': 'https://store.steampowered.com/',
      'r': 'https://roblox.com/',
      'W': 'https://wikipedia.org/',
      'R': 'https://reddit.com/',
      'A': 'https://archive.org/',
      'O': 'https://openai.com/',
      'T': 'https://twitter.com/',
      'i': 'https://imdb.com/',
      'N': 'https://nytimes.com/',
      'b': 'https://bbc.com/',
      'c': 'https://cnn.com/',
      'L': 'https://gitlab.com/',

      // destinations added once the wider key set opened these up
      'f': 'https://figma.com/',
      'k': 'https://kaggle.com/',
      'q': 'https://quora.com/',
      'u': 'https://udemy.com/',
      'z': 'https://zoom.us/',
      'j': 'https://notion.so/',
      'x': 'https://bsky.app/',
      'y': 'https://yelp.com/',
      'B': 'https://bandcamp.com/',
      'C': 'https://canva.com/',
      'F': 'https://flickr.com/',
      'H': 'https://hulu.com/',
      'J': 'https://jetbrains.com/',
      'K': 'https://khanacademy.org/',
      'U': 'https://unsplash.com/',
      'V': 'https://vercel.com/',
      'X': 'https://xkcd.com/',
      'Y': 'https://ycombinator.com/',
      'Z': 'https://zillow.com/',
      'I': 'https://ikea.com/',
    };
    // Keys come from the same 81-character URL-safe set the codecs use, at one
    // or two characters: 81 + 81^2 = 6642 addressable slots. A destination may
    // have several keys — the numeric ones handed out first still decode — so
    // encoding picks the shortest, and ties break alphabetically to keep the
    // choice stable across builds.
    var KEYSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@/?";
    var BY_URL = {};
    for (var k in PRESETS) {
      if (k.length < 1 || k.length > 2) throw new Error('preset key must be 1-2 characters: ' + k);
      for (var ci = 0; ci < k.length; ci++) {
        if (KEYSET.indexOf(k[ci]) < 0) throw new Error('preset key outside the url-safe set: ' + k);
      }
      var cur = BY_URL[PRESETS[k]];
      if (!cur || k.length < cur.length || (k.length === cur.length && k < cur)) BY_URL[PRESETS[k]] = k;
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
        var u = PRESETS[String(code).trim()];
        if (!u) throw new Error('not a preset code');
        return u;
      },
      encode: function (input) {
        var s = normalize(input);
        // tolerate the trailing slash going either way
        var code = BY_URL[s] || BY_URL[s.replace(/\/$/, '')] || BY_URL[s + '/'];
        return {
          normalized: s,
          items: code ? [{ name: 'preset', b: new Uint8Array(0), code: code, len: code.length }] : []
        };
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
