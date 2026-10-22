(function () {
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var T = {
    he: {
      title: 'הקבוצות הפופולאריות | פרסום VIP', logo: 'פרסום VIP', contact: 'צור קשר',
      badge: 'הפלטפורמה המובילה במגזר החרדי',
      h1a: 'המסר שלכם,', h1b: 'ישר לידיים של הלקוח',
      cta1: 'לשריון מקום לפרסום',
      featTitle: 'למה הכי משתלם לפרסם אצלנו?',
      f1h: 'מגיעים ישר לידיים',
      f1p: 'באתרי אינטרנט רגילים, אתם יושבים ומחכים שהלקוח יחליט להיכנס, יגלול, ואולי ישים לב לבאנר בין שלל הסחות הדעת. <strong>אצלנו</strong>&nbsp;המסר נשלח ישירות למייל או לצ\'אט של הלקוח!',
      f2h: 'עוקבים אמיתיים בלבד',
      f2p: 'מכירים אתרים שכותבים “מאות אלפי צפיות”? הם סופרים כל אחד שאי פעם נכנס אליהם גם אם יצא אחרי דקה.',
      f2p2: 'המספרים לא משקפים קהל אמיתי. <strong>אצלנו, כל מספר מייצג מנוי חי ונושם</strong> שבחר אקטיבית להירשם.',
      f3h: 'מיקוד שעושה את ההבדל',
      f3p: 'קהל שנרשם הוא קהל מטרה ספציפי ומפולח. <strong>כל שקל שאתם משקיעים אצלנו עובד קשה יותר</strong> עבור העסק שלכם ומביא ROI גבוה.',
      clientsTitle: 'המפרסמים החכמים שכבר הבינו היכן הלקוחות שלהם נמצאים',
      ctaH: 'אל תתפשרו על פחות מפרסום שמכבד אתכם',
      ctaP: 'הצטרפו למפרסמים שכבר הבינו איפה נמצא קהל היעד האמיתי. הפסיקו לקנות מספרים וסטטיסטיקות – תתחילו לקנות תוצאות.',
      ctaBtn: 'לקבלת הצעת מחיר',
      theme: 'החלף מצב תצוגה', mail: 'שלח לנו אימייל', logoAlt: 'לוגו מפרסם',
      langBtn: 'EN', langAria: 'Switch to English',
      words: ['תפסיקו לשלם על צפיות.', 'תתחילו להגיע ללקוחות.', 'פרסום חכם, ממוקד ועוצמתי.']
    },
    en: {
      title: 'Popular Groups | VIP Advertising', logo: 'VIP Advertising', contact: 'Contact us',
      badge: 'The leading platform in the Haredi community',
      h1a: 'Your message,', h1b: 'straight into the customer\u2019s hands',
      cta1: 'Reserve your ad spot',
      featTitle: 'Why is advertising with us the best value?',
      f1h: 'Straight into their hands',
      f1p: 'On regular websites, you sit and wait for the customer to decide to visit, scroll, and maybe notice a banner among all the distractions. <strong>With us</strong>&nbsp;the message goes directly to the customer\u2019s email or chat!',
      f2h: 'Real followers only',
      f2p: 'Know those sites that claim \u201chundreds of thousands of views\u201d? They count everyone who ever visited, even if they left after a minute.',
      f2p2: 'The numbers don\u2019t reflect a real audience. <strong>With us, every number represents a living, breathing subscriber</strong> who actively chose to sign up.',
      f3h: 'Focus that makes the difference',
      f3p: 'An audience that signs up is a specific, segmented target audience. <strong>Every shekel you invest with us works harder</strong> for your business and brings a high ROI.',
      clientsTitle: 'The smart advertisers who already understood where their customers are',
      ctaH: 'Don\u2019t settle for less than advertising that respects you',
      ctaP: 'Join the advertisers who already understood where the real target audience is. Stop buying numbers and statistics \u2013 start buying results.',
      ctaBtn: 'Get a quote',
      theme: 'Toggle display mode', mail: 'Email us', logoAlt: 'Advertiser logo',
      langBtn: '\u05E2\u05D1', langAria: '\u05D4\u05D7\u05DC\u05E3 \u05DC\u05E2\u05D1\u05E8\u05D9\u05EA',
      words: ['Stop paying for views.', 'Start reaching customers.', 'Smart, targeted, powerful advertising.']
    }
  };

  var theme = store.get('theme') === 'dark' ? 'dark' : 'light';
  var lang = store.get('lang') === 'en' ? 'en' : 'he';
  root.classList.add('js');
  root.dataset.theme = theme;
  root.lang = lang;
  root.dir = lang === 'he' ? 'rtl' : 'ltr';

  /* typewriter */
  var tw, twTimer;
  function typewriter() {
    clearTimeout(twTimer);
    tw = tw || document.getElementById('typewriter');
    var words = T[lang].words, i = 0, text = '', del = false;
    if (reduce) { tw.textContent = words[0]; return; }
    (function tick() {
      var w = words[i];
      text = del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1);
      tw.textContent = text;
      var d = del ? 45 : 95;
      if (!del && text === w) { del = true; d = 2000; }
      else if (del && !text) { del = false; i = (i + 1) % words.length; d = 350; }
      twTimer = setTimeout(tick, d);
    })();
  }

  /* language */
  function applyLang() {
    var t = T[lang];
    root.lang = lang; root.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.innerHTML = t[el.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t[el.dataset.i18nAria]); });
    document.querySelectorAll('.tile:not([aria-hidden]) img').forEach(function (im) { im.alt = t.logoAlt; });
    var b = document.getElementById('lang-toggle');
    b.textContent = t.langBtn; b.setAttribute('aria-label', t.langAria);
    typewriter();
  }

  /* theme, with a circular reveal from the button */
  function setTheme(next, x, y) {
    var apply = function () { theme = next; root.dataset.theme = next; store.set('theme', next); };
    if (!document.startViewTransition || reduce) return apply();
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(function () {
      root.animate({ clipPath: ['circle(0 at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 650, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* marquee: duplicate the logos for a seamless loop */
    document.querySelectorAll('.track').forEach(function (track) {
      Array.prototype.slice.call(track.children).forEach(function (tile) {
        var c = tile.cloneNode(true);
        c.setAttribute('aria-hidden', 'true'); c.querySelector('img').alt = '';
        track.appendChild(c);
      });
    });

    applyLang();

    document.getElementById('lang-toggle').addEventListener('click', function () {
      lang = lang === 'he' ? 'en' : 'he'; store.set('lang', lang); applyLang();
    });
    document.getElementById('theme-toggle').addEventListener('click', function (e) {
      var r = e.currentTarget.getBoundingClientRect();
      setTheme(theme === 'light' ? 'dark' : 'light', r.left + r.width / 2, r.top + r.height / 2);
    });

    /* spotlight that follows the pointer on each perk */
    var perks = document.querySelectorAll('.perk');
    perks.forEach(function (p) {
      p.addEventListener('pointermove', function (e) {
        var r = p.getBoundingClientRect();
        p.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        p.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    /* reveal perks as they scroll in */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.2 });
      perks.forEach(function (p, i) { p.style.transitionDelay = (i * 0.08) + 's'; io.observe(p); });
    } else {
      perks.forEach(function (p) { p.classList.add('in'); });
    }
  });
})();
