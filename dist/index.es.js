var D = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var s = (n, t, e) => (D(n, t, "read from private field"), e ? e.call(n) : t.get(n)), u = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, l = (n, t, e, r) => (D(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e);
var E = (n, t, e) => (D(n, t, "access private method"), e);
var I;
class j {
  constructor() {
    u(this, I, {
      "s=>s": 1,
      "m=>s": 60,
      "h=>s": 60 * 60,
      "d=>s": 24 * 60 * 60,
      "w=>s": 7 * 24 * 60 * 60,
      "s=>m": 1 / 60,
      "m=>m": 1,
      "h=>m": 60,
      "d=>m": 24 * 60,
      "w=>m": 7 * 24 * 60,
      "s=>h": 1 / 60 / 60,
      "m=>h": 1 / 60,
      "h=>h": 1,
      "d=>h": 24,
      "w=>h": 7 * 24,
      "s=>d": 1 / 24 / 60 / 60,
      "m=>d": 1 / 24 / 60,
      "h=>d": 1 / 24,
      "d=>d": 1,
      "w=>d": 7,
      "s=>w": 1 / 7 / 24 / 60 / 60,
      "m=>w": 1 / 7 / 24 / 60,
      "h=>w": 1 / 7 / 24,
      "d=>w": 1 / 7,
      "w=>w": 1
    });
  }
  /**
   * Convert time number expressed in source unit to number expressed in target unit; both units are basic one (en)
   *
   * @param {number} time Input time number
   * @param {string} sourceUnit Source time unit
   * @param {string} targetUnit Target time unit
   * @returns {number}
   */
  convert(t, e, r) {
    const i = `${e}=>${r}`, o = s(this, I)[i] ?? null;
    if (o === null)
      throw new Error(`Conversion ${i} is not supported!`);
    return t * o;
  }
}
I = new WeakMap();
var f;
class v {
  constructor() {
    u(this, f, {
      en: {
        s: "s",
        m: "m",
        h: "h",
        d: "d",
        w: "w"
      }
    });
  }
  /**
   * Register new time identifiers for the given locale
   *
   * @param {string} locale Name of locale for which time identifiers are registered
   * @param newIdentifiers New time identifiers
   * @returns {TimeIdentifiers}
   */
  add(t, e) {
    return s(this, f)[t] = e, this;
  }
  /**
   * Return time identifiers for the given locale name; if not registered, return identifiers for 'en' locale
   *
   * @param {string} locale Locale name
   * @returns {TimeIdentifiersGroup}
   */
  get(t) {
    return s(this, f)[t] ?? s(this, f).en;
  }
  /**
   * Return internal unit (en) for the time unit in the specified locale
   *
   * @param {string} identifier Localized time identifier
   * @param {string} locale Locale name
   * @returns {string|null}
   */
  getInternalUnit(t, e) {
    const r = this.get(e);
    for (const i in r)
      if (r[i] === t)
        return i;
    return null;
  }
}
f = new WeakMap();
var w;
class R {
  /* istanbul ignore next */
  /**
   * @param {TimeIdentifiers|null} timeIdentifiers
   */
  constructor(t = null) {
    u(this, w, void 0);
    l(this, w, t ?? new v());
  }
  /**
   * Extract array of time groups which are in duration string
   *
   * @param {string} duration Whole duration string
   * @param {string} locale Locale name of time identifiers used in duration string
   * @returns {string[]}
   */
  extractTimeGroups(t, e) {
    const r = s(this, w).get(e), i = `^(\\d+${r.w})?\\s*(\\d+${r.d})?\\s*(\\d+${r.h})?\\s*(\\d+${r.m})?\\s*(\\d+${r.s})?$`, o = new RegExp(i), c = t.trim().toLowerCase().match(o);
    return c === null ? [] : [...c].slice(1).filter(Boolean);
  }
  /**
   * Parse single time group to object having information about both unit and number of it
   *
   * @param {string} timeGroup Single time group
   * @param {string} locale Locale name of time unit used in time group
   * @returns {TimeGroup|null}
   */
  parseTimeGroup(t, e) {
    const r = s(this, w).get(e), i = `^(\\d+)\\s*([${r.w}${r.d}${r.h}${r.m}${r.s}])$`, o = new RegExp(i), c = t.trim().toLowerCase().match(o);
    if (c === null)
      return null;
    const g = [...c].slice(1);
    return {
      time: parseInt(g[0]),
      unit: g[1]
    };
  }
  /**
   * Build a single time group from object created while parsing a group
   *
   * @param {TimeGroup} parsedTime Object of parsed time group
   * @returns {string}
   */
  buildTimeGroup(t) {
    if (typeof t.time > "u" || typeof t.unit > "u")
      throw new Error("Wrong input object is passed");
    return `${t.time}${t.unit.trim()}`;
  }
  /**
   * Compose the whole duration string from array of time groups; given separator is used to join all groups
   *
   * @param {string[]} timeGroups Array of time groups in the same locale as for output
   * @param {string} groupSeparator Separator between every group in output duration string
   * @returns {string}
   */
  composeDuration(t, e = " ") {
    return t.join(e);
  }
}
w = new WeakMap();
var h, a, d, m, G, b;
class P {
  /**
   * @param {string} locale Locale used for parsing duration
   * @param {TimeIdentifiers|null} customTimeIdentifiers Custom TimeIdentifiers object with added localized identifiers
   */
  constructor(t = "en", e = null) {
    /**
     * Converts given time group into number in target unit
     *
     * @param {string} timeGroup Time group being a single parsed duration, eg. "2w", "30m", etc.
     * @param {string} targetUnit Target time unit expressed in 'en' locale
     * @returns {number}
     */
    u(this, G);
    u(this, h, void 0);
    u(this, a, void 0);
    u(this, d, void 0);
    u(this, m, void 0);
    l(this, h, t), l(this, a, new j()), l(this, d, e ?? new v()), l(this, m, new R(s(this, d)));
  }
  /**
   * Return duration length from input expressed in target units
   *
   * @param {string} input Input duration string expressed in human-like pattern
   * @param {string} targetUnit Identifier of target time unit
   * @returns {number|null}
   */
  parse(t, e = "m") {
    if (!t)
      return 0;
    if (t.trim().match(/^\d+$/) !== null)
      return parseInt(t.trim());
    const r = s(this, m).extractTimeGroups(t, s(this, h));
    return r.length === 0 ? null : r.reduce(
      (i, o) => i + E(this, G, b).call(this, o, e),
      0
    );
  }
  /**
   * Create duration string from time amount
   *
   * @param {number} time Input time amount expressed in source time unit
   * @param {string} sourceUnit Source time unit identifier
   * @param {string} groupSeparator Group separator used to join time groups in output duration string
   * @returns {string}
   */
  compose(t, e = "m", r = " ") {
    if (!t)
      return `0${e}`;
    const i = s(this, d).get(s(this, h)), o = ["w", "d", "h", "m", "s"], c = [];
    let g = t;
    for (const T of o) {
      const x = parseInt(
        s(this, a).convert(g, e, T)
      ), C = i[T] ?? null;
      if (x >= 1 && C !== null) {
        c.push(s(this, m).buildTimeGroup({ time: x, unit: C }));
        const U = s(this, a).convert(
          x,
          T,
          e
        );
        g -= U;
      }
    }
    return s(this, m).composeDuration(c, r);
  }
}
h = new WeakMap(), a = new WeakMap(), d = new WeakMap(), m = new WeakMap(), G = new WeakSet(), b = function(t, e) {
  const r = s(this, m).parseTimeGroup(t, s(this, h));
  return s(this, a).convert(
    r.time,
    s(this, d).getInternalUnit(r.unit, s(this, h)),
    e
  );
};
var p;
class B {
  /* istanbul ignore next */
  /**
   * @param {TimeIdentifiers} timeIdentifiers
   */
  constructor(t = new v()) {
    u(this, p, void 0);
    l(this, p, t);
  }
  /**
   * Translate duration string from source to target locale
   *
   * @param {string} duration Input duration string
   * @param {string} sourceLocale Source locale name
   * @param {string} targetLocale Target locale name
   * @returns {string}
   */
  translate(t, e, r) {
    const i = new P(e, s(this, p)), o = new P(r, s(this, p)), c = i.parse(t, "s");
    return o.compose(c, "s");
  }
}
p = new WeakMap();
var $;
class L {
  /**
   * @param {TimeIdentifiers|null} timeIdentifiers
   */
  constructor(t = null) {
    u(this, $, void 0);
    l(this, $, new R(t ?? new v()));
  }
  /**
   *  Validate if duration string meets all syntactic requirements
   *
   * @param {string} duration Duration string expressed in human-like format
   * @param {string} locale Locale name which is used in duration string
   * @returns {boolean}
   */
  validate(t, e = "en") {
    return !!(t.length > 0 && (t.trim().match(/^\d+$/) !== null || s(this, $).extractTimeGroups(t, e).length));
  }
}
$ = new WeakMap();
export {
  B as DurationTranslator,
  L as DurationValidator,
  v as TimeIdentifiers,
  P as default
};
//# sourceMappingURL=index.es.js.map
