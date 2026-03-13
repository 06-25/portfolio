/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/lodash.throttle@4.1.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var FUNC_ERROR_TEXT = 'Expected a function',
  NAN = NaN,
  symbolTag = '[object Symbol]',
  reTrim = /^\s+|\s+$/g,
  reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
  reIsBinary = /^0b[01]+$/i,
  reIsOctal = /^0o[0-7]+$/i,
  freeParseInt = parseInt,
  freeGlobal =
    'object' == typeof global && global && global.Object === Object && global,
  freeSelf = 'object' == typeof self && self && self.Object === Object && self,
  root = freeGlobal || freeSelf || Function('return this')(),
  objectProto = Object.prototype,
  objectToString = objectProto.toString,
  nativeMax = Math.max,
  nativeMin = Math.min,
  now = function () {
    return root.Date.now();
  };
function debounce(t, e, n) {
  var r,
    i,
    o,
    a,
    u,
    f,
    c = 0,
    l = !1,
    b = !1,
    s = !0;
  if ('function' != typeof t) throw new TypeError(FUNC_ERROR_TEXT);
  function v(e) {
    var n = r,
      o = i;
    return (r = i = void 0), (c = e), (a = t.apply(o, n));
  }
  function m(t) {
    var n = t - f;
    return void 0 === f || n >= e || n < 0 || (b && t - c >= o);
  }
  function y() {
    var t = now();
    if (m(t)) return j(t);
    u = setTimeout(
      y,
      (function (t) {
        var n = e - (t - f);
        return b ? nativeMin(n, o - (t - c)) : n;
      })(t)
    );
  }
  function j(t) {
    return (u = void 0), s && r ? v(t) : ((r = i = void 0), a);
  }
  function g() {
    var t = now(),
      n = m(t);
    if (((r = arguments), (i = this), (f = t), n)) {
      if (void 0 === u)
        return (function (t) {
          return (c = t), (u = setTimeout(y, e)), l ? v(t) : a;
        })(f);
      if (b) return (u = setTimeout(y, e)), v(f);
    }
    return void 0 === u && (u = setTimeout(y, e)), a;
  }
  return (
    (e = toNumber(e) || 0),
    isObject(n) &&
      ((l = !!n.leading),
      (o = (b = 'maxWait' in n) ? nativeMax(toNumber(n.maxWait) || 0, e) : o),
      (s = 'trailing' in n ? !!n.trailing : s)),
    (g.cancel = function () {
      void 0 !== u && clearTimeout(u), (c = 0), (r = f = i = u = void 0);
    }),
    (g.flush = function () {
      return void 0 === u ? a : j(now());
    }),
    g
  );
}
function throttle(t, e, n) {
  var r = !0,
    i = !0;
  if ('function' != typeof t) throw new TypeError(FUNC_ERROR_TEXT);
  return (
    isObject(n) &&
      ((r = 'leading' in n ? !!n.leading : r),
      (i = 'trailing' in n ? !!n.trailing : i)),
    debounce(t, e, { leading: r, maxWait: e, trailing: i })
  );
}
function isObject(t) {
  var e = typeof t;
  return !!t && ('object' == e || 'function' == e);
}
function isObjectLike(t) {
  return !!t && 'object' == typeof t;
}
function isSymbol(t) {
  return (
    'symbol' == typeof t ||
    (isObjectLike(t) && objectToString.call(t) == symbolTag)
  );
}
function toNumber(t) {
  if ('number' == typeof t) return t;
  if (isSymbol(t)) return NAN;
  if (isObject(t)) {
    var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
    t = isObject(e) ? e + '' : e;
  }
  if ('string' != typeof t) return 0 === t ? t : +t;
  t = t.replace(reTrim, '');
  var n = reIsBinary.test(t);
  return n || reIsOctal.test(t)
    ? freeParseInt(t.slice(2), n ? 2 : 8)
    : reIsBadHex.test(t)
    ? NAN
    : +t;
}
module.exports = throttle;
//# sourceMappingURL=/sm/4821be4c17c96774933f52de28b42cf423cc8f3e273d4f8b4fb982a8aebf2981.map
