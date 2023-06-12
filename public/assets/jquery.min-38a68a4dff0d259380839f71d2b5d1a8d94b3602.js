(() => {
  // app/javascript/jquery.min.js
  (function(e, t) {
    "use strict";
    function n(e2) {
      var t2 = e2.length, n2 = st.type(e2);
      return st.isWindow(e2) ? false : 1 === e2.nodeType && t2 ? true : "array" === n2 || "function" !== n2 && (0 === t2 || "number" == typeof t2 && t2 > 0 && t2 - 1 in e2);
    }
    function r(e2) {
      var t2 = Tt[e2] = {};
      return st.each(e2.match(lt) || [], function(e3, n2) {
        t2[n2] = true;
      }), t2;
    }
    function i(e2, n2, r2, i2) {
      if (st.acceptData(e2)) {
        var o2, a2, s2 = st.expando, u2 = "string" == typeof n2, l2 = e2.nodeType, c2 = l2 ? st.cache : e2, f2 = l2 ? e2[s2] : e2[s2] && s2;
        if (f2 && c2[f2] && (i2 || c2[f2].data) || !u2 || r2 !== t)
          return f2 || (l2 ? e2[s2] = f2 = K.pop() || st.guid++ : f2 = s2), c2[f2] || (c2[f2] = {}, l2 || (c2[f2].toJSON = st.noop)), ("object" == typeof n2 || "function" == typeof n2) && (i2 ? c2[f2] = st.extend(c2[f2], n2) : c2[f2].data = st.extend(c2[f2].data, n2)), o2 = c2[f2], i2 || (o2.data || (o2.data = {}), o2 = o2.data), r2 !== t && (o2[st.camelCase(n2)] = r2), u2 ? (a2 = o2[n2], null == a2 && (a2 = o2[st.camelCase(n2)])) : a2 = o2, a2;
      }
    }
    function o(e2, t2, n2) {
      if (st.acceptData(e2)) {
        var r2, i2, o2, a2 = e2.nodeType, u2 = a2 ? st.cache : e2, l2 = a2 ? e2[st.expando] : st.expando;
        if (u2[l2]) {
          if (t2 && (r2 = n2 ? u2[l2] : u2[l2].data)) {
            st.isArray(t2) ? t2 = t2.concat(st.map(t2, st.camelCase)) : t2 in r2 ? t2 = [t2] : (t2 = st.camelCase(t2), t2 = t2 in r2 ? [t2] : t2.split(" "));
            for (i2 = 0, o2 = t2.length; o2 > i2; i2++)
              delete r2[t2[i2]];
            if (!(n2 ? s : st.isEmptyObject)(r2))
              return;
          }
          (n2 || (delete u2[l2].data, s(u2[l2]))) && (a2 ? st.cleanData([e2], true) : st.support.deleteExpando || u2 != u2.window ? delete u2[l2] : u2[l2] = null);
        }
      }
    }
    function a(e2, n2, r2) {
      if (r2 === t && 1 === e2.nodeType) {
        var i2 = "data-" + n2.replace(Nt, "-$1").toLowerCase();
        if (r2 = e2.getAttribute(i2), "string" == typeof r2) {
          try {
            r2 = "true" === r2 ? true : "false" === r2 ? false : "null" === r2 ? null : +r2 + "" === r2 ? +r2 : wt.test(r2) ? st.parseJSON(r2) : r2;
          } catch (o2) {
          }
          st.data(e2, n2, r2);
        } else
          r2 = t;
      }
      return r2;
    }
    function s(e2) {
      var t2;
      for (t2 in e2)
        if (("data" !== t2 || !st.isEmptyObject(e2[t2])) && "toJSON" !== t2)
          return false;
      return true;
    }
    function u() {
      return true;
    }
    function l() {
      return false;
    }
    function c(e2, t2) {
      do
        e2 = e2[t2];
      while (e2 && 1 !== e2.nodeType);
      return e2;
    }
    function f(e2, t2, n2) {
      if (t2 = t2 || 0, st.isFunction(t2))
        return st.grep(e2, function(e3, r3) {
          var i2 = !!t2.call(e3, r3, e3);
          return i2 === n2;
        });
      if (t2.nodeType)
        return st.grep(e2, function(e3) {
          return e3 === t2 === n2;
        });
      if ("string" == typeof t2) {
        var r2 = st.grep(e2, function(e3) {
          return 1 === e3.nodeType;
        });
        if (Wt.test(t2))
          return st.filter(t2, r2, !n2);
        t2 = st.filter(t2, r2);
      }
      return st.grep(e2, function(e3) {
        return st.inArray(e3, t2) >= 0 === n2;
      });
    }
    function p(e2) {
      var t2 = zt.split("|"), n2 = e2.createDocumentFragment();
      if (n2.createElement)
        for (; t2.length; )
          n2.createElement(t2.pop());
      return n2;
    }
    function d(e2, t2) {
      return e2.getElementsByTagName(t2)[0] || e2.appendChild(e2.ownerDocument.createElement(t2));
    }
    function h(e2) {
      var t2 = e2.getAttributeNode("type");
      return e2.type = (t2 && t2.specified) + "/" + e2.type, e2;
    }
    function g(e2) {
      var t2 = nn.exec(e2.type);
      return t2 ? e2.type = t2[1] : e2.removeAttribute("type"), e2;
    }
    function m(e2, t2) {
      for (var n2, r2 = 0; null != (n2 = e2[r2]); r2++)
        st._data(n2, "globalEval", !t2 || st._data(t2[r2], "globalEval"));
    }
    function y(e2, t2) {
      if (1 === t2.nodeType && st.hasData(e2)) {
        var n2, r2, i2, o2 = st._data(e2), a2 = st._data(t2, o2), s2 = o2.events;
        if (s2) {
          delete a2.handle, a2.events = {};
          for (n2 in s2)
            for (r2 = 0, i2 = s2[n2].length; i2 > r2; r2++)
              st.event.add(t2, n2, s2[n2][r2]);
        }
        a2.data && (a2.data = st.extend({}, a2.data));
      }
    }
    function v(e2, t2) {
      var n2, r2, i2;
      if (1 === t2.nodeType) {
        if (n2 = t2.nodeName.toLowerCase(), !st.support.noCloneEvent && t2[st.expando]) {
          r2 = st._data(t2);
          for (i2 in r2.events)
            st.removeEvent(t2, i2, r2.handle);
          t2.removeAttribute(st.expando);
        }
        "script" === n2 && t2.text !== e2.text ? (h(t2).text = e2.text, g(t2)) : "object" === n2 ? (t2.parentNode && (t2.outerHTML = e2.outerHTML), st.support.html5Clone && e2.innerHTML && !st.trim(t2.innerHTML) && (t2.innerHTML = e2.innerHTML)) : "input" === n2 && Zt.test(e2.type) ? (t2.defaultChecked = t2.checked = e2.checked, t2.value !== e2.value && (t2.value = e2.value)) : "option" === n2 ? t2.defaultSelected = t2.selected = e2.defaultSelected : ("input" === n2 || "textarea" === n2) && (t2.defaultValue = e2.defaultValue);
      }
    }
    function b(e2, n2) {
      var r2, i2, o2 = 0, a2 = e2.getElementsByTagName !== t ? e2.getElementsByTagName(n2 || "*") : e2.querySelectorAll !== t ? e2.querySelectorAll(n2 || "*") : t;
      if (!a2)
        for (a2 = [], r2 = e2.childNodes || e2; null != (i2 = r2[o2]); o2++)
          !n2 || st.nodeName(i2, n2) ? a2.push(i2) : st.merge(a2, b(i2, n2));
      return n2 === t || n2 && st.nodeName(e2, n2) ? st.merge([e2], a2) : a2;
    }
    function x(e2) {
      Zt.test(e2.type) && (e2.defaultChecked = e2.checked);
    }
    function T(e2, t2) {
      if (t2 in e2)
        return t2;
      for (var n2 = t2.charAt(0).toUpperCase() + t2.slice(1), r2 = t2, i2 = Nn.length; i2--; )
        if (t2 = Nn[i2] + n2, t2 in e2)
          return t2;
      return r2;
    }
    function w(e2, t2) {
      return e2 = t2 || e2, "none" === st.css(e2, "display") || !st.contains(e2.ownerDocument, e2);
    }
    function N(e2, t2) {
      for (var n2, r2 = [], i2 = 0, o2 = e2.length; o2 > i2; i2++)
        n2 = e2[i2], n2.style && (r2[i2] = st._data(n2, "olddisplay"), t2 ? (r2[i2] || "none" !== n2.style.display || (n2.style.display = ""), "" === n2.style.display && w(n2) && (r2[i2] = st._data(n2, "olddisplay", S(n2.nodeName)))) : r2[i2] || w(n2) || st._data(n2, "olddisplay", st.css(n2, "display")));
      for (i2 = 0; o2 > i2; i2++)
        n2 = e2[i2], n2.style && (t2 && "none" !== n2.style.display && "" !== n2.style.display || (n2.style.display = t2 ? r2[i2] || "" : "none"));
      return e2;
    }
    function C(e2, t2, n2) {
      var r2 = mn.exec(t2);
      return r2 ? Math.max(0, r2[1] - (n2 || 0)) + (r2[2] || "px") : t2;
    }
    function k(e2, t2, n2, r2, i2) {
      for (var o2 = n2 === (r2 ? "border" : "content") ? 4 : "width" === t2 ? 1 : 0, a2 = 0; 4 > o2; o2 += 2)
        "margin" === n2 && (a2 += st.css(e2, n2 + wn[o2], true, i2)), r2 ? ("content" === n2 && (a2 -= st.css(e2, "padding" + wn[o2], true, i2)), "margin" !== n2 && (a2 -= st.css(e2, "border" + wn[o2] + "Width", true, i2))) : (a2 += st.css(e2, "padding" + wn[o2], true, i2), "padding" !== n2 && (a2 += st.css(e2, "border" + wn[o2] + "Width", true, i2)));
      return a2;
    }
    function E(e2, t2, n2) {
      var r2 = true, i2 = "width" === t2 ? e2.offsetWidth : e2.offsetHeight, o2 = ln(e2), a2 = st.support.boxSizing && "border-box" === st.css(e2, "boxSizing", false, o2);
      if (0 >= i2 || null == i2) {
        if (i2 = un(e2, t2, o2), (0 > i2 || null == i2) && (i2 = e2.style[t2]), yn.test(i2))
          return i2;
        r2 = a2 && (st.support.boxSizingReliable || i2 === e2.style[t2]), i2 = parseFloat(i2) || 0;
      }
      return i2 + k(e2, t2, n2 || (a2 ? "border" : "content"), r2, o2) + "px";
    }
    function S(e2) {
      var t2 = V, n2 = bn[e2];
      return n2 || (n2 = A(e2, t2), "none" !== n2 && n2 || (cn = (cn || st("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t2.documentElement), t2 = (cn[0].contentWindow || cn[0].contentDocument).document, t2.write("<!doctype html><html><body>"), t2.close(), n2 = A(e2, t2), cn.detach()), bn[e2] = n2), n2;
    }
    function A(e2, t2) {
      var n2 = st(t2.createElement(e2)).appendTo(t2.body), r2 = st.css(n2[0], "display");
      return n2.remove(), r2;
    }
    function j(e2, t2, n2, r2) {
      var i2;
      if (st.isArray(t2))
        st.each(t2, function(t3, i3) {
          n2 || kn.test(e2) ? r2(e2, i3) : j(e2 + "[" + ("object" == typeof i3 ? t3 : "") + "]", i3, n2, r2);
        });
      else if (n2 || "object" !== st.type(t2))
        r2(e2, t2);
      else
        for (i2 in t2)
          j(e2 + "[" + i2 + "]", t2[i2], n2, r2);
    }
    function D(e2) {
      return function(t2, n2) {
        "string" != typeof t2 && (n2 = t2, t2 = "*");
        var r2, i2 = 0, o2 = t2.toLowerCase().match(lt) || [];
        if (st.isFunction(n2))
          for (; r2 = o2[i2++]; )
            "+" === r2[0] ? (r2 = r2.slice(1) || "*", (e2[r2] = e2[r2] || []).unshift(n2)) : (e2[r2] = e2[r2] || []).push(n2);
      };
    }
    function L(e2, n2, r2, i2) {
      function o2(u2) {
        var l2;
        return a2[u2] = true, st.each(e2[u2] || [], function(e3, u3) {
          var c2 = u3(n2, r2, i2);
          return "string" != typeof c2 || s2 || a2[c2] ? s2 ? !(l2 = c2) : t : (n2.dataTypes.unshift(c2), o2(c2), false);
        }), l2;
      }
      var a2 = {}, s2 = e2 === $n;
      return o2(n2.dataTypes[0]) || !a2["*"] && o2("*");
    }
    function H(e2, n2) {
      var r2, i2, o2 = st.ajaxSettings.flatOptions || {};
      for (r2 in n2)
        n2[r2] !== t && ((o2[r2] ? e2 : i2 || (i2 = {}))[r2] = n2[r2]);
      return i2 && st.extend(true, e2, i2), e2;
    }
    function M(e2, n2, r2) {
      var i2, o2, a2, s2, u2 = e2.contents, l2 = e2.dataTypes, c2 = e2.responseFields;
      for (o2 in c2)
        o2 in r2 && (n2[c2[o2]] = r2[o2]);
      for (; "*" === l2[0]; )
        l2.shift(), i2 === t && (i2 = e2.mimeType || n2.getResponseHeader("Content-Type"));
      if (i2) {
        for (o2 in u2)
          if (u2[o2] && u2[o2].test(i2)) {
            l2.unshift(o2);
            break;
          }
      }
      if (l2[0] in r2)
        a2 = l2[0];
      else {
        for (o2 in r2) {
          if (!l2[0] || e2.converters[o2 + " " + l2[0]]) {
            a2 = o2;
            break;
          }
          s2 || (s2 = o2);
        }
        a2 = a2 || s2;
      }
      return a2 ? (a2 !== l2[0] && l2.unshift(a2), r2[a2]) : t;
    }
    function q(e2, t2) {
      var n2, r2, i2, o2, a2 = {}, s2 = 0, u2 = e2.dataTypes.slice(), l2 = u2[0];
      if (e2.dataFilter && (t2 = e2.dataFilter(t2, e2.dataType)), u2[1])
        for (n2 in e2.converters)
          a2[n2.toLowerCase()] = e2.converters[n2];
      for (; i2 = u2[++s2]; )
        if ("*" !== i2) {
          if ("*" !== l2 && l2 !== i2) {
            if (n2 = a2[l2 + " " + i2] || a2["* " + i2], !n2) {
              for (r2 in a2)
                if (o2 = r2.split(" "), o2[1] === i2 && (n2 = a2[l2 + " " + o2[0]] || a2["* " + o2[0]])) {
                  n2 === true ? n2 = a2[r2] : a2[r2] !== true && (i2 = o2[0], u2.splice(s2--, 0, i2));
                  break;
                }
            }
            if (n2 !== true)
              if (n2 && e2["throws"])
                t2 = n2(t2);
              else
                try {
                  t2 = n2(t2);
                } catch (c2) {
                  return { state: "parsererror", error: n2 ? c2 : "No conversion from " + l2 + " to " + i2 };
                }
          }
          l2 = i2;
        }
      return { state: "success", data: t2 };
    }
    function _() {
      try {
        return new e.XMLHttpRequest();
      } catch (t2) {
      }
    }
    function F() {
      try {
        return new e.ActiveXObject("Microsoft.XMLHTTP");
      } catch (t2) {
      }
    }
    function O() {
      return setTimeout(function() {
        Qn = t;
      }), Qn = st.now();
    }
    function B(e2, t2) {
      st.each(t2, function(t3, n2) {
        for (var r2 = (rr[t3] || []).concat(rr["*"]), i2 = 0, o2 = r2.length; o2 > i2; i2++)
          if (r2[i2].call(e2, t3, n2))
            return;
      });
    }
    function P(e2, t2, n2) {
      var r2, i2, o2 = 0, a2 = nr.length, s2 = st.Deferred().always(function() {
        delete u2.elem;
      }), u2 = function() {
        if (i2)
          return false;
        for (var t3 = Qn || O(), n3 = Math.max(0, l2.startTime + l2.duration - t3), r3 = n3 / l2.duration || 0, o3 = 1 - r3, a3 = 0, u3 = l2.tweens.length; u3 > a3; a3++)
          l2.tweens[a3].run(o3);
        return s2.notifyWith(e2, [l2, o3, n3]), 1 > o3 && u3 ? n3 : (s2.resolveWith(e2, [l2]), false);
      }, l2 = s2.promise({ elem: e2, props: st.extend({}, t2), opts: st.extend(true, { specialEasing: {} }, n2), originalProperties: t2, originalOptions: n2, startTime: Qn || O(), duration: n2.duration, tweens: [], createTween: function(t3, n3) {
        var r3 = st.Tween(e2, l2.opts, t3, n3, l2.opts.specialEasing[t3] || l2.opts.easing);
        return l2.tweens.push(r3), r3;
      }, stop: function(t3) {
        var n3 = 0, r3 = t3 ? l2.tweens.length : 0;
        if (i2)
          return this;
        for (i2 = true; r3 > n3; n3++)
          l2.tweens[n3].run(1);
        return t3 ? s2.resolveWith(e2, [l2, t3]) : s2.rejectWith(e2, [l2, t3]), this;
      } }), c2 = l2.props;
      for (R(c2, l2.opts.specialEasing); a2 > o2; o2++)
        if (r2 = nr[o2].call(l2, e2, c2, l2.opts))
          return r2;
      return B(l2, c2), st.isFunction(l2.opts.start) && l2.opts.start.call(e2, l2), st.fx.timer(st.extend(u2, { elem: e2, anim: l2, queue: l2.opts.queue })), l2.progress(l2.opts.progress).done(l2.opts.done, l2.opts.complete).fail(l2.opts.fail).always(l2.opts.always);
    }
    function R(e2, t2) {
      var n2, r2, i2, o2, a2;
      for (n2 in e2)
        if (r2 = st.camelCase(n2), i2 = t2[r2], o2 = e2[n2], st.isArray(o2) && (i2 = o2[1], o2 = e2[n2] = o2[0]), n2 !== r2 && (e2[r2] = o2, delete e2[n2]), a2 = st.cssHooks[r2], a2 && "expand" in a2) {
          o2 = a2.expand(o2), delete e2[r2];
          for (n2 in o2)
            n2 in e2 || (e2[n2] = o2[n2], t2[n2] = i2);
        } else
          t2[r2] = i2;
    }
    function W(e2, t2, n2) {
      var r2, i2, o2, a2, s2, u2, l2, c2, f2, p2 = this, d2 = e2.style, h2 = {}, g2 = [], m2 = e2.nodeType && w(e2);
      n2.queue || (c2 = st._queueHooks(e2, "fx"), null == c2.unqueued && (c2.unqueued = 0, f2 = c2.empty.fire, c2.empty.fire = function() {
        c2.unqueued || f2();
      }), c2.unqueued++, p2.always(function() {
        p2.always(function() {
          c2.unqueued--, st.queue(e2, "fx").length || c2.empty.fire();
        });
      })), 1 === e2.nodeType && ("height" in t2 || "width" in t2) && (n2.overflow = [d2.overflow, d2.overflowX, d2.overflowY], "inline" === st.css(e2, "display") && "none" === st.css(e2, "float") && (st.support.inlineBlockNeedsLayout && "inline" !== S(e2.nodeName) ? d2.zoom = 1 : d2.display = "inline-block")), n2.overflow && (d2.overflow = "hidden", st.support.shrinkWrapBlocks || p2.done(function() {
        d2.overflow = n2.overflow[0], d2.overflowX = n2.overflow[1], d2.overflowY = n2.overflow[2];
      }));
      for (r2 in t2)
        if (o2 = t2[r2], Zn.exec(o2)) {
          if (delete t2[r2], u2 = u2 || "toggle" === o2, o2 === (m2 ? "hide" : "show"))
            continue;
          g2.push(r2);
        }
      if (a2 = g2.length) {
        s2 = st._data(e2, "fxshow") || st._data(e2, "fxshow", {}), "hidden" in s2 && (m2 = s2.hidden), u2 && (s2.hidden = !m2), m2 ? st(e2).show() : p2.done(function() {
          st(e2).hide();
        }), p2.done(function() {
          var t3;
          st._removeData(e2, "fxshow");
          for (t3 in h2)
            st.style(e2, t3, h2[t3]);
        });
        for (r2 = 0; a2 > r2; r2++)
          i2 = g2[r2], l2 = p2.createTween(i2, m2 ? s2[i2] : 0), h2[i2] = s2[i2] || st.style(e2, i2), i2 in s2 || (s2[i2] = l2.start, m2 && (l2.end = l2.start, l2.start = "width" === i2 || "height" === i2 ? 1 : 0));
      }
    }
    function $(e2, t2, n2, r2, i2) {
      return new $.prototype.init(e2, t2, n2, r2, i2);
    }
    function I(e2, t2) {
      var n2, r2 = { height: e2 }, i2 = 0;
      for (t2 = t2 ? 1 : 0; 4 > i2; i2 += 2 - t2)
        n2 = wn[i2], r2["margin" + n2] = r2["padding" + n2] = e2;
      return t2 && (r2.opacity = r2.width = e2), r2;
    }
    function z(e2) {
      return st.isWindow(e2) ? e2 : 9 === e2.nodeType ? e2.defaultView || e2.parentWindow : false;
    }
    var X, U, V = e.document, Y = e.location, J = e.jQuery, G = e.$, Q = {}, K = [], Z = "1.9.0", et = K.concat, tt = K.push, nt = K.slice, rt = K.indexOf, it = Q.toString, ot = Q.hasOwnProperty, at = Z.trim, st = function(e2, t2) {
      return new st.fn.init(e2, t2, X);
    }, ut = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, lt = /\S+/g, ct = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ft = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, pt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, dt = /^[\],:{}\s]*$/, ht = /(?:^|:|,)(?:\s*\[)+/g, gt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, mt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, yt = /^-ms-/, vt = /-([\da-z])/gi, bt = function(e2, t2) {
      return t2.toUpperCase();
    }, xt = function() {
      V.addEventListener ? (V.removeEventListener("DOMContentLoaded", xt, false), st.ready()) : "complete" === V.readyState && (V.detachEvent("onreadystatechange", xt), st.ready());
    };
    st.fn = st.prototype = { jquery: Z, constructor: st, init: function(e2, n2, r2) {
      var i2, o2;
      if (!e2)
        return this;
      if ("string" == typeof e2) {
        if (i2 = "<" === e2.charAt(0) && ">" === e2.charAt(e2.length - 1) && e2.length >= 3 ? [null, e2, null] : ft.exec(e2), !i2 || !i2[1] && n2)
          return !n2 || n2.jquery ? (n2 || r2).find(e2) : this.constructor(n2).find(e2);
        if (i2[1]) {
          if (n2 = n2 instanceof st ? n2[0] : n2, st.merge(this, st.parseHTML(i2[1], n2 && n2.nodeType ? n2.ownerDocument || n2 : V, true)), pt.test(i2[1]) && st.isPlainObject(n2))
            for (i2 in n2)
              st.isFunction(this[i2]) ? this[i2](n2[i2]) : this.attr(i2, n2[i2]);
          return this;
        }
        if (o2 = V.getElementById(i2[2]), o2 && o2.parentNode) {
          if (o2.id !== i2[2])
            return r2.find(e2);
          this.length = 1, this[0] = o2;
        }
        return this.context = V, this.selector = e2, this;
      }
      return e2.nodeType ? (this.context = this[0] = e2, this.length = 1, this) : st.isFunction(e2) ? r2.ready(e2) : (e2.selector !== t && (this.selector = e2.selector, this.context = e2.context), st.makeArray(e2, this));
    }, selector: "", length: 0, size: function() {
      return this.length;
    }, toArray: function() {
      return nt.call(this);
    }, get: function(e2) {
      return null == e2 ? this.toArray() : 0 > e2 ? this[this.length + e2] : this[e2];
    }, pushStack: function(e2) {
      var t2 = st.merge(this.constructor(), e2);
      return t2.prevObject = this, t2.context = this.context, t2;
    }, each: function(e2, t2) {
      return st.each(this, e2, t2);
    }, ready: function(e2) {
      return st.ready.promise().done(e2), this;
    }, slice: function() {
      return this.pushStack(nt.apply(this, arguments));
    }, first: function() {
      return this.eq(0);
    }, last: function() {
      return this.eq(-1);
    }, eq: function(e2) {
      var t2 = this.length, n2 = +e2 + (0 > e2 ? t2 : 0);
      return this.pushStack(n2 >= 0 && t2 > n2 ? [this[n2]] : []);
    }, map: function(e2) {
      return this.pushStack(st.map(this, function(t2, n2) {
        return e2.call(t2, n2, t2);
      }));
    }, end: function() {
      return this.prevObject || this.constructor(null);
    }, push: tt, sort: [].sort, splice: [].splice }, st.fn.init.prototype = st.fn, st.extend = st.fn.extend = function() {
      var e2, n2, r2, i2, o2, a2, s2 = arguments[0] || {}, u2 = 1, l2 = arguments.length, c2 = false;
      for ("boolean" == typeof s2 && (c2 = s2, s2 = arguments[1] || {}, u2 = 2), "object" == typeof s2 || st.isFunction(s2) || (s2 = {}), l2 === u2 && (s2 = this, --u2); l2 > u2; u2++)
        if (null != (e2 = arguments[u2]))
          for (n2 in e2)
            r2 = s2[n2], i2 = e2[n2], s2 !== i2 && (c2 && i2 && (st.isPlainObject(i2) || (o2 = st.isArray(i2))) ? (o2 ? (o2 = false, a2 = r2 && st.isArray(r2) ? r2 : []) : a2 = r2 && st.isPlainObject(r2) ? r2 : {}, s2[n2] = st.extend(c2, a2, i2)) : i2 !== t && (s2[n2] = i2));
      return s2;
    }, st.extend({ noConflict: function(t2) {
      return e.$ === st && (e.$ = G), t2 && e.jQuery === st && (e.jQuery = J), st;
    }, isReady: false, readyWait: 1, holdReady: function(e2) {
      e2 ? st.readyWait++ : st.ready(true);
    }, ready: function(e2) {
      if (e2 === true ? !--st.readyWait : !st.isReady) {
        if (!V.body)
          return setTimeout(st.ready);
        st.isReady = true, e2 !== true && --st.readyWait > 0 || (U.resolveWith(V, [st]), st.fn.trigger && st(V).trigger("ready").off("ready"));
      }
    }, isFunction: function(e2) {
      return "function" === st.type(e2);
    }, isArray: Array.isArray || function(e2) {
      return "array" === st.type(e2);
    }, isWindow: function(e2) {
      return null != e2 && e2 == e2.window;
    }, isNumeric: function(e2) {
      return !isNaN(parseFloat(e2)) && isFinite(e2);
    }, type: function(e2) {
      return null == e2 ? e2 + "" : "object" == typeof e2 || "function" == typeof e2 ? Q[it.call(e2)] || "object" : typeof e2;
    }, isPlainObject: function(e2) {
      if (!e2 || "object" !== st.type(e2) || e2.nodeType || st.isWindow(e2))
        return false;
      try {
        if (e2.constructor && !ot.call(e2, "constructor") && !ot.call(e2.constructor.prototype, "isPrototypeOf"))
          return false;
      } catch (n2) {
        return false;
      }
      var r2;
      for (r2 in e2)
        ;
      return r2 === t || ot.call(e2, r2);
    }, isEmptyObject: function(e2) {
      var t2;
      for (t2 in e2)
        return false;
      return true;
    }, error: function(e2) {
      throw Error(e2);
    }, parseHTML: function(e2, t2, n2) {
      if (!e2 || "string" != typeof e2)
        return null;
      "boolean" == typeof t2 && (n2 = t2, t2 = false), t2 = t2 || V;
      var r2 = pt.exec(e2), i2 = !n2 && [];
      return r2 ? [t2.createElement(r2[1])] : (r2 = st.buildFragment([e2], t2, i2), i2 && st(i2).remove(), st.merge([], r2.childNodes));
    }, parseJSON: function(n2) {
      return e.JSON && e.JSON.parse ? e.JSON.parse(n2) : null === n2 ? n2 : "string" == typeof n2 && (n2 = st.trim(n2), n2 && dt.test(n2.replace(gt, "@").replace(mt, "]").replace(ht, ""))) ? Function("return " + n2)() : (st.error("Invalid JSON: " + n2), t);
    }, parseXML: function(n2) {
      var r2, i2;
      if (!n2 || "string" != typeof n2)
        return null;
      try {
        e.DOMParser ? (i2 = new DOMParser(), r2 = i2.parseFromString(n2, "text/xml")) : (r2 = new ActiveXObject("Microsoft.XMLDOM"), r2.async = "false", r2.loadXML(n2));
      } catch (o2) {
        r2 = t;
      }
      return r2 && r2.documentElement && !r2.getElementsByTagName("parsererror").length || st.error("Invalid XML: " + n2), r2;
    }, noop: function() {
    }, globalEval: function(t2) {
      t2 && st.trim(t2) && (e.execScript || function(t3) {
        e.eval.call(e, t3);
      })(t2);
    }, camelCase: function(e2) {
      return e2.replace(yt, "ms-").replace(vt, bt);
    }, nodeName: function(e2, t2) {
      return e2.nodeName && e2.nodeName.toLowerCase() === t2.toLowerCase();
    }, each: function(e2, t2, r2) {
      var i2, o2 = 0, a2 = e2.length, s2 = n(e2);
      if (r2) {
        if (s2)
          for (; a2 > o2 && (i2 = t2.apply(e2[o2], r2), i2 !== false); o2++)
            ;
        else
          for (o2 in e2)
            if (i2 = t2.apply(e2[o2], r2), i2 === false)
              break;
      } else if (s2)
        for (; a2 > o2 && (i2 = t2.call(e2[o2], o2, e2[o2]), i2 !== false); o2++)
          ;
      else
        for (o2 in e2)
          if (i2 = t2.call(e2[o2], o2, e2[o2]), i2 === false)
            break;
      return e2;
    }, trim: at && !at.call("\uFEFF\xA0") ? function(e2) {
      return null == e2 ? "" : at.call(e2);
    } : function(e2) {
      return null == e2 ? "" : (e2 + "").replace(ct, "");
    }, makeArray: function(e2, t2) {
      var r2 = t2 || [];
      return null != e2 && (n(Object(e2)) ? st.merge(r2, "string" == typeof e2 ? [e2] : e2) : tt.call(r2, e2)), r2;
    }, inArray: function(e2, t2, n2) {
      var r2;
      if (t2) {
        if (rt)
          return rt.call(t2, e2, n2);
        for (r2 = t2.length, n2 = n2 ? 0 > n2 ? Math.max(0, r2 + n2) : n2 : 0; r2 > n2; n2++)
          if (n2 in t2 && t2[n2] === e2)
            return n2;
      }
      return -1;
    }, merge: function(e2, n2) {
      var r2 = n2.length, i2 = e2.length, o2 = 0;
      if ("number" == typeof r2)
        for (; r2 > o2; o2++)
          e2[i2++] = n2[o2];
      else
        for (; n2[o2] !== t; )
          e2[i2++] = n2[o2++];
      return e2.length = i2, e2;
    }, grep: function(e2, t2, n2) {
      var r2, i2 = [], o2 = 0, a2 = e2.length;
      for (n2 = !!n2; a2 > o2; o2++)
        r2 = !!t2(e2[o2], o2), n2 !== r2 && i2.push(e2[o2]);
      return i2;
    }, map: function(e2, t2, r2) {
      var i2, o2 = 0, a2 = e2.length, s2 = n(e2), u2 = [];
      if (s2)
        for (; a2 > o2; o2++)
          i2 = t2(e2[o2], o2, r2), null != i2 && (u2[u2.length] = i2);
      else
        for (o2 in e2)
          i2 = t2(e2[o2], o2, r2), null != i2 && (u2[u2.length] = i2);
      return et.apply([], u2);
    }, guid: 1, proxy: function(e2, n2) {
      var r2, i2, o2;
      return "string" == typeof n2 && (r2 = e2[n2], n2 = e2, e2 = r2), st.isFunction(e2) ? (i2 = nt.call(arguments, 2), o2 = function() {
        return e2.apply(n2 || this, i2.concat(nt.call(arguments)));
      }, o2.guid = e2.guid = e2.guid || st.guid++, o2) : t;
    }, access: function(e2, n2, r2, i2, o2, a2, s2) {
      var u2 = 0, l2 = e2.length, c2 = null == r2;
      if ("object" === st.type(r2)) {
        o2 = true;
        for (u2 in r2)
          st.access(e2, n2, u2, r2[u2], true, a2, s2);
      } else if (i2 !== t && (o2 = true, st.isFunction(i2) || (s2 = true), c2 && (s2 ? (n2.call(e2, i2), n2 = null) : (c2 = n2, n2 = function(e3, t2, n3) {
        return c2.call(st(e3), n3);
      })), n2))
        for (; l2 > u2; u2++)
          n2(e2[u2], r2, s2 ? i2 : i2.call(e2[u2], u2, n2(e2[u2], r2)));
      return o2 ? e2 : c2 ? n2.call(e2) : l2 ? n2(e2[0], r2) : a2;
    }, now: function() {
      return (/* @__PURE__ */ new Date()).getTime();
    } }), st.ready.promise = function(t2) {
      if (!U)
        if (U = st.Deferred(), "complete" === V.readyState)
          setTimeout(st.ready);
        else if (V.addEventListener)
          V.addEventListener("DOMContentLoaded", xt, false), e.addEventListener("load", st.ready, false);
        else {
          V.attachEvent("onreadystatechange", xt), e.attachEvent("onload", st.ready);
          var n2 = false;
          try {
            n2 = null == e.frameElement && V.documentElement;
          } catch (r2) {
          }
          n2 && n2.doScroll && function i2() {
            if (!st.isReady) {
              try {
                n2.doScroll("left");
              } catch (e2) {
                return setTimeout(i2, 50);
              }
              st.ready();
            }
          }();
        }
      return U.promise(t2);
    }, st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e2, t2) {
      Q["[object " + t2 + "]"] = t2.toLowerCase();
    }), X = st(V);
    var Tt = {};
    st.Callbacks = function(e2) {
      e2 = "string" == typeof e2 ? Tt[e2] || r(e2) : st.extend({}, e2);
      var n2, i2, o2, a2, s2, u2, l2 = [], c2 = !e2.once && [], f2 = function(t2) {
        for (n2 = e2.memory && t2, i2 = true, u2 = a2 || 0, a2 = 0, s2 = l2.length, o2 = true; l2 && s2 > u2; u2++)
          if (l2[u2].apply(t2[0], t2[1]) === false && e2.stopOnFalse) {
            n2 = false;
            break;
          }
        o2 = false, l2 && (c2 ? c2.length && f2(c2.shift()) : n2 ? l2 = [] : p2.disable());
      }, p2 = { add: function() {
        if (l2) {
          var t2 = l2.length;
          (function r2(t3) {
            st.each(t3, function(t4, n3) {
              var i3 = st.type(n3);
              "function" === i3 ? e2.unique && p2.has(n3) || l2.push(n3) : n3 && n3.length && "string" !== i3 && r2(n3);
            });
          })(arguments), o2 ? s2 = l2.length : n2 && (a2 = t2, f2(n2));
        }
        return this;
      }, remove: function() {
        return l2 && st.each(arguments, function(e3, t2) {
          for (var n3; (n3 = st.inArray(t2, l2, n3)) > -1; )
            l2.splice(n3, 1), o2 && (s2 >= n3 && s2--, u2 >= n3 && u2--);
        }), this;
      }, has: function(e3) {
        return st.inArray(e3, l2) > -1;
      }, empty: function() {
        return l2 = [], this;
      }, disable: function() {
        return l2 = c2 = n2 = t, this;
      }, disabled: function() {
        return !l2;
      }, lock: function() {
        return c2 = t, n2 || p2.disable(), this;
      }, locked: function() {
        return !c2;
      }, fireWith: function(e3, t2) {
        return t2 = t2 || [], t2 = [e3, t2.slice ? t2.slice() : t2], !l2 || i2 && !c2 || (o2 ? c2.push(t2) : f2(t2)), this;
      }, fire: function() {
        return p2.fireWith(this, arguments), this;
      }, fired: function() {
        return !!i2;
      } };
      return p2;
    }, st.extend({ Deferred: function(e2) {
      var t2 = [["resolve", "done", st.Callbacks("once memory"), "resolved"], ["reject", "fail", st.Callbacks("once memory"), "rejected"], ["notify", "progress", st.Callbacks("memory")]], n2 = "pending", r2 = { state: function() {
        return n2;
      }, always: function() {
        return i2.done(arguments).fail(arguments), this;
      }, then: function() {
        var e3 = arguments;
        return st.Deferred(function(n3) {
          st.each(t2, function(t3, o2) {
            var a2 = o2[0], s2 = st.isFunction(e3[t3]) && e3[t3];
            i2[o2[1]](function() {
              var e4 = s2 && s2.apply(this, arguments);
              e4 && st.isFunction(e4.promise) ? e4.promise().done(n3.resolve).fail(n3.reject).progress(n3.notify) : n3[a2 + "With"](this === r2 ? n3.promise() : this, s2 ? [e4] : arguments);
            });
          }), e3 = null;
        }).promise();
      }, promise: function(e3) {
        return null != e3 ? st.extend(e3, r2) : r2;
      } }, i2 = {};
      return r2.pipe = r2.then, st.each(t2, function(e3, o2) {
        var a2 = o2[2], s2 = o2[3];
        r2[o2[1]] = a2.add, s2 && a2.add(function() {
          n2 = s2;
        }, t2[1 ^ e3][2].disable, t2[2][2].lock), i2[o2[0]] = function() {
          return i2[o2[0] + "With"](this === i2 ? r2 : this, arguments), this;
        }, i2[o2[0] + "With"] = a2.fireWith;
      }), r2.promise(i2), e2 && e2.call(i2, i2), i2;
    }, when: function(e2) {
      var t2, n2, r2, i2 = 0, o2 = nt.call(arguments), a2 = o2.length, s2 = 1 !== a2 || e2 && st.isFunction(e2.promise) ? a2 : 0, u2 = 1 === s2 ? e2 : st.Deferred(), l2 = function(e3, n3, r3) {
        return function(i3) {
          n3[e3] = this, r3[e3] = arguments.length > 1 ? nt.call(arguments) : i3, r3 === t2 ? u2.notifyWith(n3, r3) : --s2 || u2.resolveWith(n3, r3);
        };
      };
      if (a2 > 1)
        for (t2 = Array(a2), n2 = Array(a2), r2 = Array(a2); a2 > i2; i2++)
          o2[i2] && st.isFunction(o2[i2].promise) ? o2[i2].promise().done(l2(i2, r2, o2)).fail(u2.reject).progress(l2(i2, n2, t2)) : --s2;
      return s2 || u2.resolveWith(r2, o2), u2.promise();
    } }), st.support = function() {
      var n2, r2, i2, o2, a2, s2, u2, l2, c2, f2, p2 = V.createElement("div");
      if (p2.setAttribute("className", "t"), p2.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r2 = p2.getElementsByTagName("*"), i2 = p2.getElementsByTagName("a")[0], !r2 || !i2 || !r2.length)
        return {};
      o2 = V.createElement("select"), a2 = o2.appendChild(V.createElement("option")), s2 = p2.getElementsByTagName("input")[0], i2.style.cssText = "top:1px;float:left;opacity:.5", n2 = { getSetAttribute: "t" !== p2.className, leadingWhitespace: 3 === p2.firstChild.nodeType, tbody: !p2.getElementsByTagName("tbody").length, htmlSerialize: !!p2.getElementsByTagName("link").length, style: /top/.test(i2.getAttribute("style")), hrefNormalized: "/a" === i2.getAttribute("href"), opacity: /^0.5/.test(i2.style.opacity), cssFloat: !!i2.style.cssFloat, checkOn: !!s2.value, optSelected: a2.selected, enctype: !!V.createElement("form").enctype, html5Clone: "<:nav></:nav>" !== V.createElement("nav").cloneNode(true).outerHTML, boxModel: "CSS1Compat" === V.compatMode, deleteExpando: true, noCloneEvent: true, inlineBlockNeedsLayout: false, shrinkWrapBlocks: false, reliableMarginRight: true, boxSizingReliable: true, pixelPosition: false }, s2.checked = true, n2.noCloneChecked = s2.cloneNode(true).checked, o2.disabled = true, n2.optDisabled = !a2.disabled;
      try {
        delete p2.test;
      } catch (d2) {
        n2.deleteExpando = false;
      }
      s2 = V.createElement("input"), s2.setAttribute("value", ""), n2.input = "" === s2.getAttribute("value"), s2.value = "t", s2.setAttribute("type", "radio"), n2.radioValue = "t" === s2.value, s2.setAttribute("checked", "t"), s2.setAttribute("name", "t"), u2 = V.createDocumentFragment(), u2.appendChild(s2), n2.appendChecked = s2.checked, n2.checkClone = u2.cloneNode(true).cloneNode(true).lastChild.checked, p2.attachEvent && (p2.attachEvent("onclick", function() {
        n2.noCloneEvent = false;
      }), p2.cloneNode(true).click());
      for (f2 in { submit: true, change: true, focusin: true })
        p2.setAttribute(l2 = "on" + f2, "t"), n2[f2 + "Bubbles"] = l2 in e || p2.attributes[l2].expando === false;
      return p2.style.backgroundClip = "content-box", p2.cloneNode(true).style.backgroundClip = "", n2.clearCloneStyle = "content-box" === p2.style.backgroundClip, st(function() {
        var r3, i3, o3, a3 = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", s3 = V.getElementsByTagName("body")[0];
        s3 && (r3 = V.createElement("div"), r3.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s3.appendChild(r3).appendChild(p2), p2.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o3 = p2.getElementsByTagName("td"), o3[0].style.cssText = "padding:0;margin:0;border:0;display:none", c2 = 0 === o3[0].offsetHeight, o3[0].style.display = "", o3[1].style.display = "none", n2.reliableHiddenOffsets = c2 && 0 === o3[0].offsetHeight, p2.innerHTML = "", p2.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", n2.boxSizing = 4 === p2.offsetWidth, n2.doesNotIncludeMarginInBodyOffset = 1 !== s3.offsetTop, e.getComputedStyle && (n2.pixelPosition = "1%" !== (e.getComputedStyle(p2, null) || {}).top, n2.boxSizingReliable = "4px" === (e.getComputedStyle(p2, null) || { width: "4px" }).width, i3 = p2.appendChild(V.createElement("div")), i3.style.cssText = p2.style.cssText = a3, i3.style.marginRight = i3.style.width = "0", p2.style.width = "1px", n2.reliableMarginRight = !parseFloat((e.getComputedStyle(i3, null) || {}).marginRight)), p2.style.zoom !== t && (p2.innerHTML = "", p2.style.cssText = a3 + "width:1px;padding:1px;display:inline;zoom:1", n2.inlineBlockNeedsLayout = 3 === p2.offsetWidth, p2.style.display = "block", p2.innerHTML = "<div></div>", p2.firstChild.style.width = "5px", n2.shrinkWrapBlocks = 3 !== p2.offsetWidth, s3.style.zoom = 1), s3.removeChild(r3), r3 = p2 = o3 = i3 = null);
      }), r2 = o2 = u2 = a2 = i2 = s2 = null, n2;
    }();
    var wt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Nt = /([A-Z])/g;
    st.extend({ cache: {}, expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""), noData: { embed: true, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: true }, hasData: function(e2) {
      return e2 = e2.nodeType ? st.cache[e2[st.expando]] : e2[st.expando], !!e2 && !s(e2);
    }, data: function(e2, t2, n2) {
      return i(e2, t2, n2, false);
    }, removeData: function(e2, t2) {
      return o(e2, t2, false);
    }, _data: function(e2, t2, n2) {
      return i(e2, t2, n2, true);
    }, _removeData: function(e2, t2) {
      return o(e2, t2, true);
    }, acceptData: function(e2) {
      var t2 = e2.nodeName && st.noData[e2.nodeName.toLowerCase()];
      return !t2 || t2 !== true && e2.getAttribute("classid") === t2;
    } }), st.fn.extend({ data: function(e2, n2) {
      var r2, i2, o2 = this[0], s2 = 0, u2 = null;
      if (e2 === t) {
        if (this.length && (u2 = st.data(o2), 1 === o2.nodeType && !st._data(o2, "parsedAttrs"))) {
          for (r2 = o2.attributes; r2.length > s2; s2++)
            i2 = r2[s2].name, i2.indexOf("data-") || (i2 = st.camelCase(i2.substring(5)), a(o2, i2, u2[i2]));
          st._data(o2, "parsedAttrs", true);
        }
        return u2;
      }
      return "object" == typeof e2 ? this.each(function() {
        st.data(this, e2);
      }) : st.access(this, function(n3) {
        return n3 === t ? o2 ? a(o2, e2, st.data(o2, e2)) : null : (this.each(function() {
          st.data(this, e2, n3);
        }), t);
      }, null, n2, arguments.length > 1, null, true);
    }, removeData: function(e2) {
      return this.each(function() {
        st.removeData(this, e2);
      });
    } }), st.extend({ queue: function(e2, n2, r2) {
      var i2;
      return e2 ? (n2 = (n2 || "fx") + "queue", i2 = st._data(e2, n2), r2 && (!i2 || st.isArray(r2) ? i2 = st._data(e2, n2, st.makeArray(r2)) : i2.push(r2)), i2 || []) : t;
    }, dequeue: function(e2, t2) {
      t2 = t2 || "fx";
      var n2 = st.queue(e2, t2), r2 = n2.length, i2 = n2.shift(), o2 = st._queueHooks(e2, t2), a2 = function() {
        st.dequeue(e2, t2);
      };
      "inprogress" === i2 && (i2 = n2.shift(), r2--), o2.cur = i2, i2 && ("fx" === t2 && n2.unshift("inprogress"), delete o2.stop, i2.call(e2, a2, o2)), !r2 && o2 && o2.empty.fire();
    }, _queueHooks: function(e2, t2) {
      var n2 = t2 + "queueHooks";
      return st._data(e2, n2) || st._data(e2, n2, { empty: st.Callbacks("once memory").add(function() {
        st._removeData(e2, t2 + "queue"), st._removeData(e2, n2);
      }) });
    } }), st.fn.extend({ queue: function(e2, n2) {
      var r2 = 2;
      return "string" != typeof e2 && (n2 = e2, e2 = "fx", r2--), r2 > arguments.length ? st.queue(this[0], e2) : n2 === t ? this : this.each(function() {
        var t2 = st.queue(this, e2, n2);
        st._queueHooks(this, e2), "fx" === e2 && "inprogress" !== t2[0] && st.dequeue(this, e2);
      });
    }, dequeue: function(e2) {
      return this.each(function() {
        st.dequeue(this, e2);
      });
    }, delay: function(e2, t2) {
      return e2 = st.fx ? st.fx.speeds[e2] || e2 : e2, t2 = t2 || "fx", this.queue(t2, function(t3, n2) {
        var r2 = setTimeout(t3, e2);
        n2.stop = function() {
          clearTimeout(r2);
        };
      });
    }, clearQueue: function(e2) {
      return this.queue(e2 || "fx", []);
    }, promise: function(e2, n2) {
      var r2, i2 = 1, o2 = st.Deferred(), a2 = this, s2 = this.length, u2 = function() {
        --i2 || o2.resolveWith(a2, [a2]);
      };
      for ("string" != typeof e2 && (n2 = e2, e2 = t), e2 = e2 || "fx"; s2--; )
        r2 = st._data(a2[s2], e2 + "queueHooks"), r2 && r2.empty && (i2++, r2.empty.add(u2));
      return u2(), o2.promise(n2);
    } });
    var Ct, kt, Et = /[\t\r\n]/g, St = /\r/g, At = /^(?:input|select|textarea|button|object)$/i, jt = /^(?:a|area)$/i, Dt = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, Lt = /^(?:checked|selected)$/i, Ht = st.support.getSetAttribute, Mt = st.support.input;
    st.fn.extend({ attr: function(e2, t2) {
      return st.access(this, st.attr, e2, t2, arguments.length > 1);
    }, removeAttr: function(e2) {
      return this.each(function() {
        st.removeAttr(this, e2);
      });
    }, prop: function(e2, t2) {
      return st.access(this, st.prop, e2, t2, arguments.length > 1);
    }, removeProp: function(e2) {
      return e2 = st.propFix[e2] || e2, this.each(function() {
        try {
          this[e2] = t, delete this[e2];
        } catch (n2) {
        }
      });
    }, addClass: function(e2) {
      var t2, n2, r2, i2, o2, a2 = 0, s2 = this.length, u2 = "string" == typeof e2 && e2;
      if (st.isFunction(e2))
        return this.each(function(t3) {
          st(this).addClass(e2.call(this, t3, this.className));
        });
      if (u2) {
        for (t2 = (e2 || "").match(lt) || []; s2 > a2; a2++)
          if (n2 = this[a2], r2 = 1 === n2.nodeType && (n2.className ? (" " + n2.className + " ").replace(Et, " ") : " ")) {
            for (o2 = 0; i2 = t2[o2++]; )
              0 > r2.indexOf(" " + i2 + " ") && (r2 += i2 + " ");
            n2.className = st.trim(r2);
          }
      }
      return this;
    }, removeClass: function(e2) {
      var t2, n2, r2, i2, o2, a2 = 0, s2 = this.length, u2 = 0 === arguments.length || "string" == typeof e2 && e2;
      if (st.isFunction(e2))
        return this.each(function(t3) {
          st(this).removeClass(e2.call(this, t3, this.className));
        });
      if (u2) {
        for (t2 = (e2 || "").match(lt) || []; s2 > a2; a2++)
          if (n2 = this[a2], r2 = 1 === n2.nodeType && (n2.className ? (" " + n2.className + " ").replace(Et, " ") : "")) {
            for (o2 = 0; i2 = t2[o2++]; )
              for (; r2.indexOf(" " + i2 + " ") >= 0; )
                r2 = r2.replace(" " + i2 + " ", " ");
            n2.className = e2 ? st.trim(r2) : "";
          }
      }
      return this;
    }, toggleClass: function(e2, t2) {
      var n2 = typeof e2, r2 = "boolean" == typeof t2;
      return st.isFunction(e2) ? this.each(function(n3) {
        st(this).toggleClass(e2.call(this, n3, this.className, t2), t2);
      }) : this.each(function() {
        if ("string" === n2)
          for (var i2, o2 = 0, a2 = st(this), s2 = t2, u2 = e2.match(lt) || []; i2 = u2[o2++]; )
            s2 = r2 ? s2 : !a2.hasClass(i2), a2[s2 ? "addClass" : "removeClass"](i2);
        else
          ("undefined" === n2 || "boolean" === n2) && (this.className && st._data(this, "__className__", this.className), this.className = this.className || e2 === false ? "" : st._data(this, "__className__") || "");
      });
    }, hasClass: function(e2) {
      for (var t2 = " " + e2 + " ", n2 = 0, r2 = this.length; r2 > n2; n2++)
        if (1 === this[n2].nodeType && (" " + this[n2].className + " ").replace(Et, " ").indexOf(t2) >= 0)
          return true;
      return false;
    }, val: function(e2) {
      var n2, r2, i2, o2 = this[0];
      {
        if (arguments.length)
          return i2 = st.isFunction(e2), this.each(function(r3) {
            var o3, a2 = st(this);
            1 === this.nodeType && (o3 = i2 ? e2.call(this, r3, a2.val()) : e2, null == o3 ? o3 = "" : "number" == typeof o3 ? o3 += "" : st.isArray(o3) && (o3 = st.map(o3, function(e3) {
              return null == e3 ? "" : e3 + "";
            })), n2 = st.valHooks[this.type] || st.valHooks[this.nodeName.toLowerCase()], n2 && "set" in n2 && n2.set(this, o3, "value") !== t || (this.value = o3));
          });
        if (o2)
          return n2 = st.valHooks[o2.type] || st.valHooks[o2.nodeName.toLowerCase()], n2 && "get" in n2 && (r2 = n2.get(o2, "value")) !== t ? r2 : (r2 = o2.value, "string" == typeof r2 ? r2.replace(St, "") : null == r2 ? "" : r2);
      }
    } }), st.extend({ valHooks: { option: { get: function(e2) {
      var t2 = e2.attributes.value;
      return !t2 || t2.specified ? e2.value : e2.text;
    } }, select: { get: function(e2) {
      for (var t2, n2, r2 = e2.options, i2 = e2.selectedIndex, o2 = "select-one" === e2.type || 0 > i2, a2 = o2 ? null : [], s2 = o2 ? i2 + 1 : r2.length, u2 = 0 > i2 ? s2 : o2 ? i2 : 0; s2 > u2; u2++)
        if (n2 = r2[u2], !(!n2.selected && u2 !== i2 || (st.support.optDisabled ? n2.disabled : null !== n2.getAttribute("disabled")) || n2.parentNode.disabled && st.nodeName(n2.parentNode, "optgroup"))) {
          if (t2 = st(n2).val(), o2)
            return t2;
          a2.push(t2);
        }
      return a2;
    }, set: function(e2, t2) {
      var n2 = st.makeArray(t2);
      return st(e2).find("option").each(function() {
        this.selected = st.inArray(st(this).val(), n2) >= 0;
      }), n2.length || (e2.selectedIndex = -1), n2;
    } } }, attr: function(e2, n2, r2) {
      var i2, o2, a2, s2 = e2.nodeType;
      if (e2 && 3 !== s2 && 8 !== s2 && 2 !== s2)
        return e2.getAttribute === t ? st.prop(e2, n2, r2) : (a2 = 1 !== s2 || !st.isXMLDoc(e2), a2 && (n2 = n2.toLowerCase(), o2 = st.attrHooks[n2] || (Dt.test(n2) ? kt : Ct)), r2 === t ? o2 && a2 && "get" in o2 && null !== (i2 = o2.get(e2, n2)) ? i2 : (e2.getAttribute !== t && (i2 = e2.getAttribute(n2)), null == i2 ? t : i2) : null !== r2 ? o2 && a2 && "set" in o2 && (i2 = o2.set(e2, r2, n2)) !== t ? i2 : (e2.setAttribute(n2, r2 + ""), r2) : (st.removeAttr(e2, n2), t));
    }, removeAttr: function(e2, t2) {
      var n2, r2, i2 = 0, o2 = t2 && t2.match(lt);
      if (o2 && 1 === e2.nodeType)
        for (; n2 = o2[i2++]; )
          r2 = st.propFix[n2] || n2, Dt.test(n2) ? !Ht && Lt.test(n2) ? e2[st.camelCase("default-" + n2)] = e2[r2] = false : e2[r2] = false : st.attr(e2, n2, ""), e2.removeAttribute(Ht ? n2 : r2);
    }, attrHooks: { type: { set: function(e2, t2) {
      if (!st.support.radioValue && "radio" === t2 && st.nodeName(e2, "input")) {
        var n2 = e2.value;
        return e2.setAttribute("type", t2), n2 && (e2.value = n2), t2;
      }
    } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function(e2, n2, r2) {
      var i2, o2, a2, s2 = e2.nodeType;
      if (e2 && 3 !== s2 && 8 !== s2 && 2 !== s2)
        return a2 = 1 !== s2 || !st.isXMLDoc(e2), a2 && (n2 = st.propFix[n2] || n2, o2 = st.propHooks[n2]), r2 !== t ? o2 && "set" in o2 && (i2 = o2.set(e2, r2, n2)) !== t ? i2 : e2[n2] = r2 : o2 && "get" in o2 && null !== (i2 = o2.get(e2, n2)) ? i2 : e2[n2];
    }, propHooks: { tabIndex: { get: function(e2) {
      var n2 = e2.getAttributeNode("tabindex");
      return n2 && n2.specified ? parseInt(n2.value, 10) : At.test(e2.nodeName) || jt.test(e2.nodeName) && e2.href ? 0 : t;
    } } } }), kt = { get: function(e2, n2) {
      var r2 = st.prop(e2, n2), i2 = "boolean" == typeof r2 && e2.getAttribute(n2), o2 = "boolean" == typeof r2 ? Mt && Ht ? null != i2 : Lt.test(n2) ? e2[st.camelCase("default-" + n2)] : !!i2 : e2.getAttributeNode(n2);
      return o2 && o2.value !== false ? n2.toLowerCase() : t;
    }, set: function(e2, t2, n2) {
      return t2 === false ? st.removeAttr(e2, n2) : Mt && Ht || !Lt.test(n2) ? e2.setAttribute(!Ht && st.propFix[n2] || n2, n2) : e2[st.camelCase("default-" + n2)] = e2[n2] = true, n2;
    } }, Mt && Ht || (st.attrHooks.value = { get: function(e2, n2) {
      var r2 = e2.getAttributeNode(n2);
      return st.nodeName(e2, "input") ? e2.defaultValue : r2 && r2.specified ? r2.value : t;
    }, set: function(e2, n2, r2) {
      return st.nodeName(e2, "input") ? (e2.defaultValue = n2, t) : Ct && Ct.set(e2, n2, r2);
    } }), Ht || (Ct = st.valHooks.button = { get: function(e2, n2) {
      var r2 = e2.getAttributeNode(n2);
      return r2 && ("id" === n2 || "name" === n2 || "coords" === n2 ? "" !== r2.value : r2.specified) ? r2.value : t;
    }, set: function(e2, n2, r2) {
      var i2 = e2.getAttributeNode(r2);
      return i2 || e2.setAttributeNode(i2 = e2.ownerDocument.createAttribute(r2)), i2.value = n2 += "", "value" === r2 || n2 === e2.getAttribute(r2) ? n2 : t;
    } }, st.attrHooks.contenteditable = { get: Ct.get, set: function(e2, t2, n2) {
      Ct.set(e2, "" === t2 ? false : t2, n2);
    } }, st.each(["width", "height"], function(e2, n2) {
      st.attrHooks[n2] = st.extend(st.attrHooks[n2], { set: function(e3, r2) {
        return "" === r2 ? (e3.setAttribute(n2, "auto"), r2) : t;
      } });
    })), st.support.hrefNormalized || (st.each(["href", "src", "width", "height"], function(e2, n2) {
      st.attrHooks[n2] = st.extend(st.attrHooks[n2], { get: function(e3) {
        var r2 = e3.getAttribute(n2, 2);
        return null == r2 ? t : r2;
      } });
    }), st.each(["href", "src"], function(e2, t2) {
      st.propHooks[t2] = { get: function(e3) {
        return e3.getAttribute(t2, 4);
      } };
    })), st.support.style || (st.attrHooks.style = { get: function(e2) {
      return e2.style.cssText || t;
    }, set: function(e2, t2) {
      return e2.style.cssText = t2 + "";
    } }), st.support.optSelected || (st.propHooks.selected = st.extend(st.propHooks.selected, { get: function(e2) {
      var t2 = e2.parentNode;
      return t2 && (t2.selectedIndex, t2.parentNode && t2.parentNode.selectedIndex), null;
    } })), st.support.enctype || (st.propFix.enctype = "encoding"), st.support.checkOn || st.each(["radio", "checkbox"], function() {
      st.valHooks[this] = { get: function(e2) {
        return null === e2.getAttribute("value") ? "on" : e2.value;
      } };
    }), st.each(["radio", "checkbox"], function() {
      st.valHooks[this] = st.extend(st.valHooks[this], { set: function(e2, n2) {
        return st.isArray(n2) ? e2.checked = st.inArray(st(e2).val(), n2) >= 0 : t;
      } });
    });
    var qt = /^(?:input|select|textarea)$/i, _t = /^key/, Ft = /^(?:mouse|contextmenu)|click/, Ot = /^(?:focusinfocus|focusoutblur)$/, Bt = /^([^.]*)(?:\.(.+)|)$/;
    st.event = { global: {}, add: function(e2, n2, r2, i2, o2) {
      var a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, m2, y2 = 3 !== e2.nodeType && 8 !== e2.nodeType && st._data(e2);
      if (y2) {
        for (r2.handler && (a2 = r2, r2 = a2.handler, o2 = a2.selector), r2.guid || (r2.guid = st.guid++), (l2 = y2.events) || (l2 = y2.events = {}), (s2 = y2.handle) || (s2 = y2.handle = function(e3) {
          return st === t || e3 && st.event.triggered === e3.type ? t : st.event.dispatch.apply(s2.elem, arguments);
        }, s2.elem = e2), n2 = (n2 || "").match(lt) || [""], c2 = n2.length; c2--; )
          u2 = Bt.exec(n2[c2]) || [], h2 = m2 = u2[1], g2 = (u2[2] || "").split(".").sort(), p2 = st.event.special[h2] || {}, h2 = (o2 ? p2.delegateType : p2.bindType) || h2, p2 = st.event.special[h2] || {}, f2 = st.extend({ type: h2, origType: m2, data: i2, handler: r2, guid: r2.guid, selector: o2, needsContext: o2 && st.expr.match.needsContext.test(o2), namespace: g2.join(".") }, a2), (d2 = l2[h2]) || (d2 = l2[h2] = [], d2.delegateCount = 0, p2.setup && p2.setup.call(e2, i2, g2, s2) !== false || (e2.addEventListener ? e2.addEventListener(h2, s2, false) : e2.attachEvent && e2.attachEvent("on" + h2, s2))), p2.add && (p2.add.call(e2, f2), f2.handler.guid || (f2.handler.guid = r2.guid)), o2 ? d2.splice(d2.delegateCount++, 0, f2) : d2.push(f2), st.event.global[h2] = true;
        e2 = null;
      }
    }, remove: function(e2, t2, n2, r2, i2) {
      var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, m2 = st.hasData(e2) && st._data(e2);
      if (m2 && (u2 = m2.events)) {
        for (t2 = (t2 || "").match(lt) || [""], l2 = t2.length; l2--; )
          if (s2 = Bt.exec(t2[l2]) || [], d2 = g2 = s2[1], h2 = (s2[2] || "").split(".").sort(), d2) {
            for (f2 = st.event.special[d2] || {}, d2 = (r2 ? f2.delegateType : f2.bindType) || d2, p2 = u2[d2] || [], s2 = s2[2] && RegExp("(^|\\.)" + h2.join("\\.(?:.*\\.|)") + "(\\.|$)"), a2 = o2 = p2.length; o2--; )
              c2 = p2[o2], !i2 && g2 !== c2.origType || n2 && n2.guid !== c2.guid || s2 && !s2.test(c2.namespace) || r2 && r2 !== c2.selector && ("**" !== r2 || !c2.selector) || (p2.splice(o2, 1), c2.selector && p2.delegateCount--, f2.remove && f2.remove.call(e2, c2));
            a2 && !p2.length && (f2.teardown && f2.teardown.call(e2, h2, m2.handle) !== false || st.removeEvent(e2, d2, m2.handle), delete u2[d2]);
          } else
            for (d2 in u2)
              st.event.remove(e2, d2 + t2[l2], n2, r2, true);
        st.isEmptyObject(u2) && (delete m2.handle, st._removeData(e2, "events"));
      }
    }, trigger: function(n2, r2, i2, o2) {
      var a2, s2, u2, l2, c2, f2, p2, d2 = [i2 || V], h2 = n2.type || n2, g2 = n2.namespace ? n2.namespace.split(".") : [];
      if (s2 = u2 = i2 = i2 || V, 3 !== i2.nodeType && 8 !== i2.nodeType && !Ot.test(h2 + st.event.triggered) && (h2.indexOf(".") >= 0 && (g2 = h2.split("."), h2 = g2.shift(), g2.sort()), c2 = 0 > h2.indexOf(":") && "on" + h2, n2 = n2[st.expando] ? n2 : new st.Event(h2, "object" == typeof n2 && n2), n2.isTrigger = true, n2.namespace = g2.join("."), n2.namespace_re = n2.namespace ? RegExp("(^|\\.)" + g2.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n2.result = t, n2.target || (n2.target = i2), r2 = null == r2 ? [n2] : st.makeArray(r2, [n2]), p2 = st.event.special[h2] || {}, o2 || !p2.trigger || p2.trigger.apply(i2, r2) !== false)) {
        if (!o2 && !p2.noBubble && !st.isWindow(i2)) {
          for (l2 = p2.delegateType || h2, Ot.test(l2 + h2) || (s2 = s2.parentNode); s2; s2 = s2.parentNode)
            d2.push(s2), u2 = s2;
          u2 === (i2.ownerDocument || V) && d2.push(u2.defaultView || u2.parentWindow || e);
        }
        for (a2 = 0; (s2 = d2[a2++]) && !n2.isPropagationStopped(); )
          n2.type = a2 > 1 ? l2 : p2.bindType || h2, f2 = (st._data(s2, "events") || {})[n2.type] && st._data(s2, "handle"), f2 && f2.apply(s2, r2), f2 = c2 && s2[c2], f2 && st.acceptData(s2) && f2.apply && f2.apply(s2, r2) === false && n2.preventDefault();
        if (n2.type = h2, !(o2 || n2.isDefaultPrevented() || p2._default && p2._default.apply(i2.ownerDocument, r2) !== false || "click" === h2 && st.nodeName(i2, "a") || !st.acceptData(i2) || !c2 || !i2[h2] || st.isWindow(i2))) {
          u2 = i2[c2], u2 && (i2[c2] = null), st.event.triggered = h2;
          try {
            i2[h2]();
          } catch (m2) {
          }
          st.event.triggered = t, u2 && (i2[c2] = u2);
        }
        return n2.result;
      }
    }, dispatch: function(e2) {
      e2 = st.event.fix(e2);
      var n2, r2, i2, o2, a2, s2 = [], u2 = nt.call(arguments), l2 = (st._data(this, "events") || {})[e2.type] || [], c2 = st.event.special[e2.type] || {};
      if (u2[0] = e2, e2.delegateTarget = this, !c2.preDispatch || c2.preDispatch.call(this, e2) !== false) {
        for (s2 = st.event.handlers.call(this, e2, l2), n2 = 0; (o2 = s2[n2++]) && !e2.isPropagationStopped(); )
          for (e2.currentTarget = o2.elem, r2 = 0; (a2 = o2.handlers[r2++]) && !e2.isImmediatePropagationStopped(); )
            (!e2.namespace_re || e2.namespace_re.test(a2.namespace)) && (e2.handleObj = a2, e2.data = a2.data, i2 = ((st.event.special[a2.origType] || {}).handle || a2.handler).apply(o2.elem, u2), i2 !== t && (e2.result = i2) === false && (e2.preventDefault(), e2.stopPropagation()));
        return c2.postDispatch && c2.postDispatch.call(this, e2), e2.result;
      }
    }, handlers: function(e2, n2) {
      var r2, i2, o2, a2, s2 = [], u2 = n2.delegateCount, l2 = e2.target;
      if (u2 && l2.nodeType && (!e2.button || "click" !== e2.type)) {
        for (; l2 != this; l2 = l2.parentNode || this)
          if (l2.disabled !== true || "click" !== e2.type) {
            for (i2 = [], r2 = 0; u2 > r2; r2++)
              a2 = n2[r2], o2 = a2.selector + " ", i2[o2] === t && (i2[o2] = a2.needsContext ? st(o2, this).index(l2) >= 0 : st.find(o2, this, null, [l2]).length), i2[o2] && i2.push(a2);
            i2.length && s2.push({ elem: l2, handlers: i2 });
          }
      }
      return n2.length > u2 && s2.push({ elem: this, handlers: n2.slice(u2) }), s2;
    }, fix: function(e2) {
      if (e2[st.expando])
        return e2;
      var t2, n2, r2 = e2, i2 = st.event.fixHooks[e2.type] || {}, o2 = i2.props ? this.props.concat(i2.props) : this.props;
      for (e2 = new st.Event(r2), t2 = o2.length; t2--; )
        n2 = o2[t2], e2[n2] = r2[n2];
      return e2.target || (e2.target = r2.srcElement || V), 3 === e2.target.nodeType && (e2.target = e2.target.parentNode), e2.metaKey = !!e2.metaKey, i2.filter ? i2.filter(e2, r2) : e2;
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(e2, t2) {
      return null == e2.which && (e2.which = null != t2.charCode ? t2.charCode : t2.keyCode), e2;
    } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(e2, n2) {
      var r2, i2, o2, a2 = n2.button, s2 = n2.fromElement;
      return null == e2.pageX && null != n2.clientX && (r2 = e2.target.ownerDocument || V, i2 = r2.documentElement, o2 = r2.body, e2.pageX = n2.clientX + (i2 && i2.scrollLeft || o2 && o2.scrollLeft || 0) - (i2 && i2.clientLeft || o2 && o2.clientLeft || 0), e2.pageY = n2.clientY + (i2 && i2.scrollTop || o2 && o2.scrollTop || 0) - (i2 && i2.clientTop || o2 && o2.clientTop || 0)), !e2.relatedTarget && s2 && (e2.relatedTarget = s2 === e2.target ? n2.toElement : s2), e2.which || a2 === t || (e2.which = 1 & a2 ? 1 : 2 & a2 ? 3 : 4 & a2 ? 2 : 0), e2;
    } }, special: { load: { noBubble: true }, click: { trigger: function() {
      return st.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), false) : t;
    } }, focus: { trigger: function() {
      if (this !== V.activeElement && this.focus)
        try {
          return this.focus(), false;
        } catch (e2) {
        }
    }, delegateType: "focusin" }, blur: { trigger: function() {
      return this === V.activeElement && this.blur ? (this.blur(), false) : t;
    }, delegateType: "focusout" }, beforeunload: { postDispatch: function(e2) {
      e2.result !== t && (e2.originalEvent.returnValue = e2.result);
    } } }, simulate: function(e2, t2, n2, r2) {
      var i2 = st.extend(new st.Event(), n2, { type: e2, isSimulated: true, originalEvent: {} });
      r2 ? st.event.trigger(i2, null, t2) : st.event.dispatch.call(t2, i2), i2.isDefaultPrevented() && n2.preventDefault();
    } }, st.removeEvent = V.removeEventListener ? function(e2, t2, n2) {
      e2.removeEventListener && e2.removeEventListener(t2, n2, false);
    } : function(e2, n2, r2) {
      var i2 = "on" + n2;
      e2.detachEvent && (e2[i2] === t && (e2[i2] = null), e2.detachEvent(i2, r2));
    }, st.Event = function(e2, n2) {
      return this instanceof st.Event ? (e2 && e2.type ? (this.originalEvent = e2, this.type = e2.type, this.isDefaultPrevented = e2.defaultPrevented || e2.returnValue === false || e2.getPreventDefault && e2.getPreventDefault() ? u : l) : this.type = e2, n2 && st.extend(this, n2), this.timeStamp = e2 && e2.timeStamp || st.now(), this[st.expando] = true, t) : new st.Event(e2, n2);
    }, st.Event.prototype = { isDefaultPrevented: l, isPropagationStopped: l, isImmediatePropagationStopped: l, preventDefault: function() {
      var e2 = this.originalEvent;
      this.isDefaultPrevented = u, e2 && (e2.preventDefault ? e2.preventDefault() : e2.returnValue = false);
    }, stopPropagation: function() {
      var e2 = this.originalEvent;
      this.isPropagationStopped = u, e2 && (e2.stopPropagation && e2.stopPropagation(), e2.cancelBubble = true);
    }, stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = u, this.stopPropagation();
    } }, st.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function(e2, t2) {
      st.event.special[e2] = { delegateType: t2, bindType: t2, handle: function(e3) {
        var n2, r2 = this, i2 = e3.relatedTarget, o2 = e3.handleObj;
        return (!i2 || i2 !== r2 && !st.contains(r2, i2)) && (e3.type = o2.origType, n2 = o2.handler.apply(this, arguments), e3.type = t2), n2;
      } };
    }), st.support.submitBubbles || (st.event.special.submit = { setup: function() {
      return st.nodeName(this, "form") ? false : (st.event.add(this, "click._submit keypress._submit", function(e2) {
        var n2 = e2.target, r2 = st.nodeName(n2, "input") || st.nodeName(n2, "button") ? n2.form : t;
        r2 && !st._data(r2, "submitBubbles") && (st.event.add(r2, "submit._submit", function(e3) {
          e3._submit_bubble = true;
        }), st._data(r2, "submitBubbles", true));
      }), t);
    }, postDispatch: function(e2) {
      e2._submit_bubble && (delete e2._submit_bubble, this.parentNode && !e2.isTrigger && st.event.simulate("submit", this.parentNode, e2, true));
    }, teardown: function() {
      return st.nodeName(this, "form") ? false : (st.event.remove(this, "._submit"), t);
    } }), st.support.changeBubbles || (st.event.special.change = { setup: function() {
      return qt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (st.event.add(this, "propertychange._change", function(e2) {
        "checked" === e2.originalEvent.propertyName && (this._just_changed = true);
      }), st.event.add(this, "click._change", function(e2) {
        this._just_changed && !e2.isTrigger && (this._just_changed = false), st.event.simulate("change", this, e2, true);
      })), false) : (st.event.add(this, "beforeactivate._change", function(e2) {
        var t2 = e2.target;
        qt.test(t2.nodeName) && !st._data(t2, "changeBubbles") && (st.event.add(t2, "change._change", function(e3) {
          !this.parentNode || e3.isSimulated || e3.isTrigger || st.event.simulate("change", this.parentNode, e3, true);
        }), st._data(t2, "changeBubbles", true));
      }), t);
    }, handle: function(e2) {
      var n2 = e2.target;
      return this !== n2 || e2.isSimulated || e2.isTrigger || "radio" !== n2.type && "checkbox" !== n2.type ? e2.handleObj.handler.apply(this, arguments) : t;
    }, teardown: function() {
      return st.event.remove(this, "._change"), !qt.test(this.nodeName);
    } }), st.support.focusinBubbles || st.each({ focus: "focusin", blur: "focusout" }, function(e2, t2) {
      var n2 = 0, r2 = function(e3) {
        st.event.simulate(t2, e3.target, st.event.fix(e3), true);
      };
      st.event.special[t2] = { setup: function() {
        0 === n2++ && V.addEventListener(e2, r2, true);
      }, teardown: function() {
        0 === --n2 && V.removeEventListener(e2, r2, true);
      } };
    }), st.fn.extend({ on: function(e2, n2, r2, i2, o2) {
      var a2, s2;
      if ("object" == typeof e2) {
        "string" != typeof n2 && (r2 = r2 || n2, n2 = t);
        for (s2 in e2)
          this.on(s2, n2, r2, e2[s2], o2);
        return this;
      }
      if (null == r2 && null == i2 ? (i2 = n2, r2 = n2 = t) : null == i2 && ("string" == typeof n2 ? (i2 = r2, r2 = t) : (i2 = r2, r2 = n2, n2 = t)), i2 === false)
        i2 = l;
      else if (!i2)
        return this;
      return 1 === o2 && (a2 = i2, i2 = function(e3) {
        return st().off(e3), a2.apply(this, arguments);
      }, i2.guid = a2.guid || (a2.guid = st.guid++)), this.each(function() {
        st.event.add(this, e2, i2, r2, n2);
      });
    }, one: function(e2, t2, n2, r2) {
      return this.on(e2, t2, n2, r2, 1);
    }, off: function(e2, n2, r2) {
      var i2, o2;
      if (e2 && e2.preventDefault && e2.handleObj)
        return i2 = e2.handleObj, st(e2.delegateTarget).off(i2.namespace ? i2.origType + "." + i2.namespace : i2.origType, i2.selector, i2.handler), this;
      if ("object" == typeof e2) {
        for (o2 in e2)
          this.off(o2, n2, e2[o2]);
        return this;
      }
      return (n2 === false || "function" == typeof n2) && (r2 = n2, n2 = t), r2 === false && (r2 = l), this.each(function() {
        st.event.remove(this, e2, r2, n2);
      });
    }, bind: function(e2, t2, n2) {
      return this.on(e2, null, t2, n2);
    }, unbind: function(e2, t2) {
      return this.off(e2, null, t2);
    }, delegate: function(e2, t2, n2, r2) {
      return this.on(t2, e2, n2, r2);
    }, undelegate: function(e2, t2, n2) {
      return 1 === arguments.length ? this.off(e2, "**") : this.off(t2, e2 || "**", n2);
    }, trigger: function(e2, t2) {
      return this.each(function() {
        st.event.trigger(e2, t2, this);
      });
    }, triggerHandler: function(e2, n2) {
      var r2 = this[0];
      return r2 ? st.event.trigger(e2, n2, r2, true) : t;
    }, hover: function(e2, t2) {
      return this.mouseenter(e2).mouseleave(t2 || e2);
    } }), st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e2, t2) {
      st.fn[t2] = function(e3, n2) {
        return arguments.length > 0 ? this.on(t2, null, e3, n2) : this.trigger(t2);
      }, _t.test(t2) && (st.event.fixHooks[t2] = st.event.keyHooks), Ft.test(t2) && (st.event.fixHooks[t2] = st.event.mouseHooks);
    }), function(e2, t2) {
      function n2(e3) {
        return ht2.test(e3 + "");
      }
      function r2() {
        var e3, t3 = [];
        return e3 = function(n3, r3) {
          return t3.push(n3 += " ") > C2.cacheLength && delete e3[t3.shift()], e3[n3] = r3;
        };
      }
      function i2(e3) {
        return e3[P2] = true, e3;
      }
      function o2(e3) {
        var t3 = L2.createElement("div");
        try {
          return e3(t3);
        } catch (n3) {
          return false;
        } finally {
          t3 = null;
        }
      }
      function a2(e3, t3, n3, r3) {
        var i3, o3, a3, s3, u3, l3, c3, d3, h3, g3;
        if ((t3 ? t3.ownerDocument || t3 : R2) !== L2 && D2(t3), t3 = t3 || L2, n3 = n3 || [], !e3 || "string" != typeof e3)
          return n3;
        if (1 !== (s3 = t3.nodeType) && 9 !== s3)
          return [];
        if (!M2 && !r3) {
          if (i3 = gt2.exec(e3))
            if (a3 = i3[1]) {
              if (9 === s3) {
                if (o3 = t3.getElementById(a3), !o3 || !o3.parentNode)
                  return n3;
                if (o3.id === a3)
                  return n3.push(o3), n3;
              } else if (t3.ownerDocument && (o3 = t3.ownerDocument.getElementById(a3)) && O2(t3, o3) && o3.id === a3)
                return n3.push(o3), n3;
            } else {
              if (i3[2])
                return Q2.apply(n3, K2.call(t3.getElementsByTagName(e3), 0)), n3;
              if ((a3 = i3[3]) && W2.getByClassName && t3.getElementsByClassName)
                return Q2.apply(n3, K2.call(t3.getElementsByClassName(a3), 0)), n3;
            }
          if (W2.qsa && !q2.test(e3)) {
            if (c3 = true, d3 = P2, h3 = t3, g3 = 9 === s3 && e3, 1 === s3 && "object" !== t3.nodeName.toLowerCase()) {
              for (l3 = f2(e3), (c3 = t3.getAttribute("id")) ? d3 = c3.replace(vt2, "\\$&") : t3.setAttribute("id", d3), d3 = "[id='" + d3 + "'] ", u3 = l3.length; u3--; )
                l3[u3] = d3 + p2(l3[u3]);
              h3 = dt2.test(e3) && t3.parentNode || t3, g3 = l3.join(",");
            }
            if (g3)
              try {
                return Q2.apply(n3, K2.call(h3.querySelectorAll(g3), 0)), n3;
              } catch (m3) {
              } finally {
                c3 || t3.removeAttribute("id");
              }
          }
        }
        return x2(e3.replace(at2, "$1"), t3, n3, r3);
      }
      function s2(e3, t3) {
        for (var n3 = e3 && t3 && e3.nextSibling; n3; n3 = n3.nextSibling)
          if (n3 === t3)
            return -1;
        return e3 ? 1 : -1;
      }
      function u2(e3) {
        return function(t3) {
          var n3 = t3.nodeName.toLowerCase();
          return "input" === n3 && t3.type === e3;
        };
      }
      function l2(e3) {
        return function(t3) {
          var n3 = t3.nodeName.toLowerCase();
          return ("input" === n3 || "button" === n3) && t3.type === e3;
        };
      }
      function c2(e3) {
        return i2(function(t3) {
          return t3 = +t3, i2(function(n3, r3) {
            for (var i3, o3 = e3([], n3.length, t3), a3 = o3.length; a3--; )
              n3[i3 = o3[a3]] && (n3[i3] = !(r3[i3] = n3[i3]));
          });
        });
      }
      function f2(e3, t3) {
        var n3, r3, i3, o3, s3, u3, l3, c3 = X2[e3 + " "];
        if (c3)
          return t3 ? 0 : c3.slice(0);
        for (s3 = e3, u3 = [], l3 = C2.preFilter; s3; ) {
          (!n3 || (r3 = ut2.exec(s3))) && (r3 && (s3 = s3.slice(r3[0].length) || s3), u3.push(i3 = [])), n3 = false, (r3 = lt2.exec(s3)) && (n3 = r3.shift(), i3.push({ value: n3, type: r3[0].replace(at2, " ") }), s3 = s3.slice(n3.length));
          for (o3 in C2.filter)
            !(r3 = pt2[o3].exec(s3)) || l3[o3] && !(r3 = l3[o3](r3)) || (n3 = r3.shift(), i3.push({ value: n3, type: o3, matches: r3 }), s3 = s3.slice(n3.length));
          if (!n3)
            break;
        }
        return t3 ? s3.length : s3 ? a2.error(e3) : X2(e3, u3).slice(0);
      }
      function p2(e3) {
        for (var t3 = 0, n3 = e3.length, r3 = ""; n3 > t3; t3++)
          r3 += e3[t3].value;
        return r3;
      }
      function d2(e3, t3, n3) {
        var r3 = t3.dir, i3 = n3 && "parentNode" === t3.dir, o3 = I2++;
        return t3.first ? function(t4, n4, o4) {
          for (; t4 = t4[r3]; )
            if (1 === t4.nodeType || i3)
              return e3(t4, n4, o4);
        } : function(t4, n4, a3) {
          var s3, u3, l3, c3 = $2 + " " + o3;
          if (a3) {
            for (; t4 = t4[r3]; )
              if ((1 === t4.nodeType || i3) && e3(t4, n4, a3))
                return true;
          } else
            for (; t4 = t4[r3]; )
              if (1 === t4.nodeType || i3) {
                if (l3 = t4[P2] || (t4[P2] = {}), (u3 = l3[r3]) && u3[0] === c3) {
                  if ((s3 = u3[1]) === true || s3 === N2)
                    return s3 === true;
                } else if (u3 = l3[r3] = [c3], u3[1] = e3(t4, n4, a3) || N2, u3[1] === true)
                  return true;
              }
        };
      }
      function h2(e3) {
        return e3.length > 1 ? function(t3, n3, r3) {
          for (var i3 = e3.length; i3--; )
            if (!e3[i3](t3, n3, r3))
              return false;
          return true;
        } : e3[0];
      }
      function g2(e3, t3, n3, r3, i3) {
        for (var o3, a3 = [], s3 = 0, u3 = e3.length, l3 = null != t3; u3 > s3; s3++)
          (o3 = e3[s3]) && (!n3 || n3(o3, r3, i3)) && (a3.push(o3), l3 && t3.push(s3));
        return a3;
      }
      function m2(e3, t3, n3, r3, o3, a3) {
        return r3 && !r3[P2] && (r3 = m2(r3)), o3 && !o3[P2] && (o3 = m2(o3, a3)), i2(function(i3, a4, s3, u3) {
          var l3, c3, f3, p3 = [], d3 = [], h3 = a4.length, m3 = i3 || b2(t3 || "*", s3.nodeType ? [s3] : s3, []), y3 = !e3 || !i3 && t3 ? m3 : g2(m3, p3, e3, s3, u3), v3 = n3 ? o3 || (i3 ? e3 : h3 || r3) ? [] : a4 : y3;
          if (n3 && n3(y3, v3, s3, u3), r3)
            for (l3 = g2(v3, d3), r3(l3, [], s3, u3), c3 = l3.length; c3--; )
              (f3 = l3[c3]) && (v3[d3[c3]] = !(y3[d3[c3]] = f3));
          if (i3) {
            if (o3 || e3) {
              if (o3) {
                for (l3 = [], c3 = v3.length; c3--; )
                  (f3 = v3[c3]) && l3.push(y3[c3] = f3);
                o3(null, v3 = [], l3, u3);
              }
              for (c3 = v3.length; c3--; )
                (f3 = v3[c3]) && (l3 = o3 ? Z2.call(i3, f3) : p3[c3]) > -1 && (i3[l3] = !(a4[l3] = f3));
            }
          } else
            v3 = g2(v3 === a4 ? v3.splice(h3, v3.length) : v3), o3 ? o3(null, a4, v3, u3) : Q2.apply(a4, v3);
        });
      }
      function y2(e3) {
        for (var t3, n3, r3, i3 = e3.length, o3 = C2.relative[e3[0].type], a3 = o3 || C2.relative[" "], s3 = o3 ? 1 : 0, u3 = d2(function(e4) {
          return e4 === t3;
        }, a3, true), l3 = d2(function(e4) {
          return Z2.call(t3, e4) > -1;
        }, a3, true), c3 = [function(e4, n4, r4) {
          return !o3 && (r4 || n4 !== j2) || ((t3 = n4).nodeType ? u3(e4, n4, r4) : l3(e4, n4, r4));
        }]; i3 > s3; s3++)
          if (n3 = C2.relative[e3[s3].type])
            c3 = [d2(h2(c3), n3)];
          else {
            if (n3 = C2.filter[e3[s3].type].apply(null, e3[s3].matches), n3[P2]) {
              for (r3 = ++s3; i3 > r3 && !C2.relative[e3[r3].type]; r3++)
                ;
              return m2(s3 > 1 && h2(c3), s3 > 1 && p2(e3.slice(0, s3 - 1)).replace(at2, "$1"), n3, r3 > s3 && y2(e3.slice(s3, r3)), i3 > r3 && y2(e3 = e3.slice(r3)), i3 > r3 && p2(e3));
            }
            c3.push(n3);
          }
        return h2(c3);
      }
      function v2(e3, t3) {
        var n3 = 0, r3 = t3.length > 0, o3 = e3.length > 0, s3 = function(i3, s4, u3, l3, c3) {
          var f3, p3, d3, h3 = [], m3 = 0, y3 = "0", v3 = i3 && [], b3 = null != c3, x3 = j2, T3 = i3 || o3 && C2.find.TAG("*", c3 && s4.parentNode || s4), w3 = $2 += null == x3 ? 1 : Math.E;
          for (b3 && (j2 = s4 !== L2 && s4, N2 = n3); null != (f3 = T3[y3]); y3++) {
            if (o3 && f3) {
              for (p3 = 0; d3 = e3[p3]; p3++)
                if (d3(f3, s4, u3)) {
                  l3.push(f3);
                  break;
                }
              b3 && ($2 = w3, N2 = ++n3);
            }
            r3 && ((f3 = !d3 && f3) && m3--, i3 && v3.push(f3));
          }
          if (m3 += y3, r3 && y3 !== m3) {
            for (p3 = 0; d3 = t3[p3]; p3++)
              d3(v3, h3, s4, u3);
            if (i3) {
              if (m3 > 0)
                for (; y3--; )
                  v3[y3] || h3[y3] || (h3[y3] = G2.call(l3));
              h3 = g2(h3);
            }
            Q2.apply(l3, h3), b3 && !i3 && h3.length > 0 && m3 + t3.length > 1 && a2.uniqueSort(l3);
          }
          return b3 && ($2 = w3, j2 = x3), v3;
        };
        return r3 ? i2(s3) : s3;
      }
      function b2(e3, t3, n3) {
        for (var r3 = 0, i3 = t3.length; i3 > r3; r3++)
          a2(e3, t3[r3], n3);
        return n3;
      }
      function x2(e3, t3, n3, r3) {
        var i3, o3, a3, s3, u3, l3 = f2(e3);
        if (!r3 && 1 === l3.length) {
          if (o3 = l3[0] = l3[0].slice(0), o3.length > 2 && "ID" === (a3 = o3[0]).type && 9 === t3.nodeType && !M2 && C2.relative[o3[1].type]) {
            if (t3 = C2.find.ID(a3.matches[0].replace(xt2, Tt2), t3)[0], !t3)
              return n3;
            e3 = e3.slice(o3.shift().value.length);
          }
          for (i3 = pt2.needsContext.test(e3) ? -1 : o3.length - 1; i3 >= 0 && (a3 = o3[i3], !C2.relative[s3 = a3.type]); i3--)
            if ((u3 = C2.find[s3]) && (r3 = u3(a3.matches[0].replace(xt2, Tt2), dt2.test(o3[0].type) && t3.parentNode || t3))) {
              if (o3.splice(i3, 1), e3 = r3.length && p2(o3), !e3)
                return Q2.apply(n3, K2.call(r3, 0)), n3;
              break;
            }
        }
        return S2(e3, l3)(r3, t3, M2, n3, dt2.test(e3)), n3;
      }
      function T2() {
      }
      var w2, N2, C2, k2, E2, S2, A2, j2, D2, L2, H2, M2, q2, _2, F2, O2, B2, P2 = "sizzle" + -/* @__PURE__ */ new Date(), R2 = e2.document, W2 = {}, $2 = 0, I2 = 0, z2 = r2(), X2 = r2(), U2 = r2(), V2 = typeof t2, Y2 = 1 << 31, J2 = [], G2 = J2.pop, Q2 = J2.push, K2 = J2.slice, Z2 = J2.indexOf || function(e3) {
        for (var t3 = 0, n3 = this.length; n3 > t3; t3++)
          if (this[t3] === e3)
            return t3;
        return -1;
      }, et2 = "[\\x20\\t\\r\\n\\f]", tt2 = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", nt2 = tt2.replace("w", "w#"), rt2 = "([*^$|!~]?=)", it2 = "\\[" + et2 + "*(" + tt2 + ")" + et2 + "*(?:" + rt2 + et2 + `*(?:(['"])((?:\\\\.|[^\\\\])*?)\\3|(` + nt2 + ")|)|)" + et2 + "*\\]", ot2 = ":(" + tt2 + `)(?:\\(((['"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|` + it2.replace(3, 8) + ")*)|.*)\\)|)", at2 = RegExp("^" + et2 + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et2 + "+$", "g"), ut2 = RegExp("^" + et2 + "*," + et2 + "*"), lt2 = RegExp("^" + et2 + "*([\\x20\\t\\r\\n\\f>+~])" + et2 + "*"), ct2 = RegExp(ot2), ft2 = RegExp("^" + nt2 + "$"), pt2 = { ID: RegExp("^#(" + tt2 + ")"), CLASS: RegExp("^\\.(" + tt2 + ")"), NAME: RegExp(`^\\[name=['"]?(` + tt2 + `)['"]?\\]`), TAG: RegExp("^(" + tt2.replace("w", "w*") + ")"), ATTR: RegExp("^" + it2), PSEUDO: RegExp("^" + ot2), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et2 + "*(even|odd|(([+-]|)(\\d*)n|)" + et2 + "*(?:([+-]|)" + et2 + "*(\\d+)|))" + et2 + "*\\)|)", "i"), needsContext: RegExp("^" + et2 + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et2 + "*((?:-\\d)?\\d*)" + et2 + "*\\)|)(?=[^-]|$)", "i") }, dt2 = /[\x20\t\r\n\f]*[+~]/, ht2 = /\{\s*\[native code\]\s*\}/, gt2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, mt2 = /^(?:input|select|textarea|button)$/i, yt2 = /^h\d$/i, vt2 = /'|\\/g, bt2 = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, xt2 = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, Tt2 = function(e3, t3) {
        var n3 = "0x" + t3 - 65536;
        return n3 !== n3 ? t3 : 0 > n3 ? String.fromCharCode(n3 + 65536) : String.fromCharCode(55296 | n3 >> 10, 56320 | 1023 & n3);
      };
      try {
        K2.call(H2.childNodes, 0)[0].nodeType;
      } catch (wt2) {
        K2 = function(e3) {
          for (var t3, n3 = []; t3 = this[e3]; e3++)
            n3.push(t3);
          return n3;
        };
      }
      E2 = a2.isXML = function(e3) {
        var t3 = e3 && (e3.ownerDocument || e3).documentElement;
        return t3 ? "HTML" !== t3.nodeName : false;
      }, D2 = a2.setDocument = function(e3) {
        var r3 = e3 ? e3.ownerDocument || e3 : R2;
        return r3 !== L2 && 9 === r3.nodeType && r3.documentElement ? (L2 = r3, H2 = r3.documentElement, M2 = E2(r3), W2.tagNameNoComments = o2(function(e4) {
          return e4.appendChild(r3.createComment("")), !e4.getElementsByTagName("*").length;
        }), W2.attributes = o2(function(e4) {
          e4.innerHTML = "<select></select>";
          var t3 = typeof e4.lastChild.getAttribute("multiple");
          return "boolean" !== t3 && "string" !== t3;
        }), W2.getByClassName = o2(function(e4) {
          return e4.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e4.getElementsByClassName && e4.getElementsByClassName("e").length ? (e4.lastChild.className = "e", 2 === e4.getElementsByClassName("e").length) : false;
        }), W2.getByName = o2(function(e4) {
          e4.id = P2 + 0, e4.innerHTML = "<a name='" + P2 + "'></a><div name='" + P2 + "'></div>", H2.insertBefore(e4, H2.firstChild);
          var t3 = r3.getElementsByName && r3.getElementsByName(P2).length === 2 + r3.getElementsByName(P2 + 0).length;
          return W2.getIdNotName = !r3.getElementById(P2), H2.removeChild(e4), t3;
        }), C2.attrHandle = o2(function(e4) {
          return e4.innerHTML = "<a href='#'></a>", e4.firstChild && typeof e4.firstChild.getAttribute !== V2 && "#" === e4.firstChild.getAttribute("href");
        }) ? {} : { href: function(e4) {
          return e4.getAttribute("href", 2);
        }, type: function(e4) {
          return e4.getAttribute("type");
        } }, W2.getIdNotName ? (C2.find.ID = function(e4, t3) {
          if (typeof t3.getElementById !== V2 && !M2) {
            var n3 = t3.getElementById(e4);
            return n3 && n3.parentNode ? [n3] : [];
          }
        }, C2.filter.ID = function(e4) {
          var t3 = e4.replace(xt2, Tt2);
          return function(e5) {
            return e5.getAttribute("id") === t3;
          };
        }) : (C2.find.ID = function(e4, n3) {
          if (typeof n3.getElementById !== V2 && !M2) {
            var r4 = n3.getElementById(e4);
            return r4 ? r4.id === e4 || typeof r4.getAttributeNode !== V2 && r4.getAttributeNode("id").value === e4 ? [r4] : t2 : [];
          }
        }, C2.filter.ID = function(e4) {
          var t3 = e4.replace(xt2, Tt2);
          return function(e5) {
            var n3 = typeof e5.getAttributeNode !== V2 && e5.getAttributeNode("id");
            return n3 && n3.value === t3;
          };
        }), C2.find.TAG = W2.tagNameNoComments ? function(e4, n3) {
          return typeof n3.getElementsByTagName !== V2 ? n3.getElementsByTagName(e4) : t2;
        } : function(e4, t3) {
          var n3, r4 = [], i3 = 0, o3 = t3.getElementsByTagName(e4);
          if ("*" === e4) {
            for (; n3 = o3[i3]; i3++)
              1 === n3.nodeType && r4.push(n3);
            return r4;
          }
          return o3;
        }, C2.find.NAME = W2.getByName && function(e4, n3) {
          return typeof n3.getElementsByName !== V2 ? n3.getElementsByName(name) : t2;
        }, C2.find.CLASS = W2.getByClassName && function(e4, n3) {
          return typeof n3.getElementsByClassName === V2 || M2 ? t2 : n3.getElementsByClassName(e4);
        }, _2 = [], q2 = [":focus"], (W2.qsa = n2(r3.querySelectorAll)) && (o2(function(e4) {
          e4.innerHTML = "<select><option selected=''></option></select>", e4.querySelectorAll("[selected]").length || q2.push("\\[" + et2 + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e4.querySelectorAll(":checked").length || q2.push(":checked");
        }), o2(function(e4) {
          e4.innerHTML = "<input type='hidden' i=''/>", e4.querySelectorAll("[i^='']").length && q2.push("[*^$]=" + et2 + `*(?:""|'')`), e4.querySelectorAll(":enabled").length || q2.push(":enabled", ":disabled"), e4.querySelectorAll("*,:x"), q2.push(",.*:");
        })), (W2.matchesSelector = n2(F2 = H2.matchesSelector || H2.mozMatchesSelector || H2.webkitMatchesSelector || H2.oMatchesSelector || H2.msMatchesSelector)) && o2(function(e4) {
          W2.disconnectedMatch = F2.call(e4, "div"), F2.call(e4, "[s!='']:x"), _2.push("!=", ot2);
        }), q2 = RegExp(q2.join("|")), _2 = RegExp(_2.join("|")), O2 = n2(H2.contains) || H2.compareDocumentPosition ? function(e4, t3) {
          var n3 = 9 === e4.nodeType ? e4.documentElement : e4, r4 = t3 && t3.parentNode;
          return e4 === r4 || !(!r4 || 1 !== r4.nodeType || !(n3.contains ? n3.contains(r4) : e4.compareDocumentPosition && 16 & e4.compareDocumentPosition(r4)));
        } : function(e4, t3) {
          if (t3) {
            for (; t3 = t3.parentNode; )
              if (t3 === e4)
                return true;
          }
          return false;
        }, B2 = H2.compareDocumentPosition ? function(e4, t3) {
          var n3;
          return e4 === t3 ? (A2 = true, 0) : (n3 = t3.compareDocumentPosition && e4.compareDocumentPosition && e4.compareDocumentPosition(t3)) ? 1 & n3 || e4.parentNode && 11 === e4.parentNode.nodeType ? e4 === r3 || O2(R2, e4) ? -1 : t3 === r3 || O2(R2, t3) ? 1 : 0 : 4 & n3 ? -1 : 1 : e4.compareDocumentPosition ? -1 : 1;
        } : function(e4, t3) {
          var n3, i3 = 0, o3 = e4.parentNode, a3 = t3.parentNode, u3 = [e4], l3 = [t3];
          if (e4 === t3)
            return A2 = true, 0;
          if (e4.sourceIndex && t3.sourceIndex)
            return (~t3.sourceIndex || Y2) - (O2(R2, e4) && ~e4.sourceIndex || Y2);
          if (!o3 || !a3)
            return e4 === r3 ? -1 : t3 === r3 ? 1 : o3 ? -1 : a3 ? 1 : 0;
          if (o3 === a3)
            return s2(e4, t3);
          for (n3 = e4; n3 = n3.parentNode; )
            u3.unshift(n3);
          for (n3 = t3; n3 = n3.parentNode; )
            l3.unshift(n3);
          for (; u3[i3] === l3[i3]; )
            i3++;
          return i3 ? s2(u3[i3], l3[i3]) : u3[i3] === R2 ? -1 : l3[i3] === R2 ? 1 : 0;
        }, A2 = false, [0, 0].sort(B2), W2.detectDuplicates = A2, L2) : L2;
      }, a2.matches = function(e3, t3) {
        return a2(e3, null, null, t3);
      }, a2.matchesSelector = function(e3, t3) {
        if ((e3.ownerDocument || e3) !== L2 && D2(e3), t3 = t3.replace(bt2, "='$1']"), !(!W2.matchesSelector || M2 || _2 && _2.test(t3) || q2.test(t3)))
          try {
            var n3 = F2.call(e3, t3);
            if (n3 || W2.disconnectedMatch || e3.document && 11 !== e3.document.nodeType)
              return n3;
          } catch (r3) {
          }
        return a2(t3, L2, null, [e3]).length > 0;
      }, a2.contains = function(e3, t3) {
        return (e3.ownerDocument || e3) !== L2 && D2(e3), O2(e3, t3);
      }, a2.attr = function(e3, t3) {
        var n3;
        return (e3.ownerDocument || e3) !== L2 && D2(e3), M2 || (t3 = t3.toLowerCase()), (n3 = C2.attrHandle[t3]) ? n3(e3) : M2 || W2.attributes ? e3.getAttribute(t3) : ((n3 = e3.getAttributeNode(t3)) || e3.getAttribute(t3)) && e3[t3] === true ? t3 : n3 && n3.specified ? n3.value : null;
      }, a2.error = function(e3) {
        throw Error("Syntax error, unrecognized expression: " + e3);
      }, a2.uniqueSort = function(e3) {
        var t3, n3 = [], r3 = 1, i3 = 0;
        if (A2 = !W2.detectDuplicates, e3.sort(B2), A2) {
          for (; t3 = e3[r3]; r3++)
            t3 === e3[r3 - 1] && (i3 = n3.push(r3));
          for (; i3--; )
            e3.splice(n3[i3], 1);
        }
        return e3;
      }, k2 = a2.getText = function(e3) {
        var t3, n3 = "", r3 = 0, i3 = e3.nodeType;
        if (i3) {
          if (1 === i3 || 9 === i3 || 11 === i3) {
            if ("string" == typeof e3.textContent)
              return e3.textContent;
            for (e3 = e3.firstChild; e3; e3 = e3.nextSibling)
              n3 += k2(e3);
          } else if (3 === i3 || 4 === i3)
            return e3.nodeValue;
        } else
          for (; t3 = e3[r3]; r3++)
            n3 += k2(t3);
        return n3;
      }, C2 = a2.selectors = { cacheLength: 50, createPseudo: i2, match: pt2, find: {}, relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function(e3) {
        return e3[1] = e3[1].replace(xt2, Tt2), e3[3] = (e3[4] || e3[5] || "").replace(xt2, Tt2), "~=" === e3[2] && (e3[3] = " " + e3[3] + " "), e3.slice(0, 4);
      }, CHILD: function(e3) {
        return e3[1] = e3[1].toLowerCase(), "nth" === e3[1].slice(0, 3) ? (e3[3] || a2.error(e3[0]), e3[4] = +(e3[4] ? e3[5] + (e3[6] || 1) : 2 * ("even" === e3[3] || "odd" === e3[3])), e3[5] = +(e3[7] + e3[8] || "odd" === e3[3])) : e3[3] && a2.error(e3[0]), e3;
      }, PSEUDO: function(e3) {
        var t3, n3 = !e3[5] && e3[2];
        return pt2.CHILD.test(e3[0]) ? null : (e3[4] ? e3[2] = e3[4] : n3 && ct2.test(n3) && (t3 = f2(n3, true)) && (t3 = n3.indexOf(")", n3.length - t3) - n3.length) && (e3[0] = e3[0].slice(0, t3), e3[2] = n3.slice(0, t3)), e3.slice(0, 3));
      } }, filter: { TAG: function(e3) {
        return "*" === e3 ? function() {
          return true;
        } : (e3 = e3.replace(xt2, Tt2).toLowerCase(), function(t3) {
          return t3.nodeName && t3.nodeName.toLowerCase() === e3;
        });
      }, CLASS: function(e3) {
        var t3 = z2[e3 + " "];
        return t3 || (t3 = RegExp("(^|" + et2 + ")" + e3 + "(" + et2 + "|$)")) && z2(e3, function(e4) {
          return t3.test(e4.className || typeof e4.getAttribute !== V2 && e4.getAttribute("class") || "");
        });
      }, ATTR: function(e3, t3, n3) {
        return function(r3) {
          var i3 = a2.attr(r3, e3);
          return null == i3 ? "!=" === t3 : t3 ? (i3 += "", "=" === t3 ? i3 === n3 : "!=" === t3 ? i3 !== n3 : "^=" === t3 ? n3 && 0 === i3.indexOf(n3) : "*=" === t3 ? n3 && i3.indexOf(n3) > -1 : "$=" === t3 ? n3 && i3.substr(i3.length - n3.length) === n3 : "~=" === t3 ? (" " + i3 + " ").indexOf(n3) > -1 : "|=" === t3 ? i3 === n3 || i3.substr(0, n3.length + 1) === n3 + "-" : false) : true;
        };
      }, CHILD: function(e3, t3, n3, r3, i3) {
        var o3 = "nth" !== e3.slice(0, 3), a3 = "last" !== e3.slice(-4), s3 = "of-type" === t3;
        return 1 === r3 && 0 === i3 ? function(e4) {
          return !!e4.parentNode;
        } : function(t4, n4, u3) {
          var l3, c3, f3, p3, d3, h3, g3 = o3 !== a3 ? "nextSibling" : "previousSibling", m3 = t4.parentNode, y3 = s3 && t4.nodeName.toLowerCase(), v3 = !u3 && !s3;
          if (m3) {
            if (o3) {
              for (; g3; ) {
                for (f3 = t4; f3 = f3[g3]; )
                  if (s3 ? f3.nodeName.toLowerCase() === y3 : 1 === f3.nodeType)
                    return false;
                h3 = g3 = "only" === e3 && !h3 && "nextSibling";
              }
              return true;
            }
            if (h3 = [a3 ? m3.firstChild : m3.lastChild], a3 && v3) {
              for (c3 = m3[P2] || (m3[P2] = {}), l3 = c3[e3] || [], d3 = l3[0] === $2 && l3[1], p3 = l3[0] === $2 && l3[2], f3 = d3 && m3.childNodes[d3]; f3 = ++d3 && f3 && f3[g3] || (p3 = d3 = 0) || h3.pop(); )
                if (1 === f3.nodeType && ++p3 && f3 === t4) {
                  c3[e3] = [$2, d3, p3];
                  break;
                }
            } else if (v3 && (l3 = (t4[P2] || (t4[P2] = {}))[e3]) && l3[0] === $2)
              p3 = l3[1];
            else
              for (; (f3 = ++d3 && f3 && f3[g3] || (p3 = d3 = 0) || h3.pop()) && ((s3 ? f3.nodeName.toLowerCase() !== y3 : 1 !== f3.nodeType) || !++p3 || (v3 && ((f3[P2] || (f3[P2] = {}))[e3] = [$2, p3]), f3 !== t4)); )
                ;
            return p3 -= i3, p3 === r3 || 0 === p3 % r3 && p3 / r3 >= 0;
          }
        };
      }, PSEUDO: function(e3, t3) {
        var n3, r3 = C2.pseudos[e3] || C2.setFilters[e3.toLowerCase()] || a2.error("unsupported pseudo: " + e3);
        return r3[P2] ? r3(t3) : r3.length > 1 ? (n3 = [e3, e3, "", t3], C2.setFilters.hasOwnProperty(e3.toLowerCase()) ? i2(function(e4, n4) {
          for (var i3, o3 = r3(e4, t3), a3 = o3.length; a3--; )
            i3 = Z2.call(e4, o3[a3]), e4[i3] = !(n4[i3] = o3[a3]);
        }) : function(e4) {
          return r3(e4, 0, n3);
        }) : r3;
      } }, pseudos: { not: i2(function(e3) {
        var t3 = [], n3 = [], r3 = S2(e3.replace(at2, "$1"));
        return r3[P2] ? i2(function(e4, t4, n4, i3) {
          for (var o3, a3 = r3(e4, null, i3, []), s3 = e4.length; s3--; )
            (o3 = a3[s3]) && (e4[s3] = !(t4[s3] = o3));
        }) : function(e4, i3, o3) {
          return t3[0] = e4, r3(t3, null, o3, n3), !n3.pop();
        };
      }), has: i2(function(e3) {
        return function(t3) {
          return a2(e3, t3).length > 0;
        };
      }), contains: i2(function(e3) {
        return function(t3) {
          return (t3.textContent || t3.innerText || k2(t3)).indexOf(e3) > -1;
        };
      }), lang: i2(function(e3) {
        return ft2.test(e3 || "") || a2.error("unsupported lang: " + e3), e3 = e3.replace(xt2, Tt2).toLowerCase(), function(t3) {
          var n3;
          do
            if (n3 = M2 ? t3.getAttribute("xml:lang") || t3.getAttribute("lang") : t3.lang)
              return n3 = n3.toLowerCase(), n3 === e3 || 0 === n3.indexOf(e3 + "-");
          while ((t3 = t3.parentNode) && 1 === t3.nodeType);
          return false;
        };
      }), target: function(t3) {
        var n3 = e2.location && e2.location.hash;
        return n3 && n3.slice(1) === t3.id;
      }, root: function(e3) {
        return e3 === H2;
      }, focus: function(e3) {
        return e3 === L2.activeElement && (!L2.hasFocus || L2.hasFocus()) && !!(e3.type || e3.href || ~e3.tabIndex);
      }, enabled: function(e3) {
        return e3.disabled === false;
      }, disabled: function(e3) {
        return e3.disabled === true;
      }, checked: function(e3) {
        var t3 = e3.nodeName.toLowerCase();
        return "input" === t3 && !!e3.checked || "option" === t3 && !!e3.selected;
      }, selected: function(e3) {
        return e3.parentNode && e3.parentNode.selectedIndex, e3.selected === true;
      }, empty: function(e3) {
        for (e3 = e3.firstChild; e3; e3 = e3.nextSibling)
          if (e3.nodeName > "@" || 3 === e3.nodeType || 4 === e3.nodeType)
            return false;
        return true;
      }, parent: function(e3) {
        return !C2.pseudos.empty(e3);
      }, header: function(e3) {
        return yt2.test(e3.nodeName);
      }, input: function(e3) {
        return mt2.test(e3.nodeName);
      }, button: function(e3) {
        var t3 = e3.nodeName.toLowerCase();
        return "input" === t3 && "button" === e3.type || "button" === t3;
      }, text: function(e3) {
        var t3;
        return "input" === e3.nodeName.toLowerCase() && "text" === e3.type && (null == (t3 = e3.getAttribute("type")) || t3.toLowerCase() === e3.type);
      }, first: c2(function() {
        return [0];
      }), last: c2(function(e3, t3) {
        return [t3 - 1];
      }), eq: c2(function(e3, t3, n3) {
        return [0 > n3 ? n3 + t3 : n3];
      }), even: c2(function(e3, t3) {
        for (var n3 = 0; t3 > n3; n3 += 2)
          e3.push(n3);
        return e3;
      }), odd: c2(function(e3, t3) {
        for (var n3 = 1; t3 > n3; n3 += 2)
          e3.push(n3);
        return e3;
      }), lt: c2(function(e3, t3, n3) {
        for (var r3 = 0 > n3 ? n3 + t3 : n3; --r3 >= 0; )
          e3.push(r3);
        return e3;
      }), gt: c2(function(e3, t3, n3) {
        for (var r3 = 0 > n3 ? n3 + t3 : n3; t3 > ++r3; )
          e3.push(r3);
        return e3;
      }) } };
      for (w2 in { radio: true, checkbox: true, file: true, password: true, image: true })
        C2.pseudos[w2] = u2(w2);
      for (w2 in { submit: true, reset: true })
        C2.pseudos[w2] = l2(w2);
      S2 = a2.compile = function(e3, t3) {
        var n3, r3 = [], i3 = [], o3 = U2[e3 + " "];
        if (!o3) {
          for (t3 || (t3 = f2(e3)), n3 = t3.length; n3--; )
            o3 = y2(t3[n3]), o3[P2] ? r3.push(o3) : i3.push(o3);
          o3 = U2(e3, v2(i3, r3));
        }
        return o3;
      }, C2.pseudos.nth = C2.pseudos.eq, C2.filters = T2.prototype = C2.pseudos, C2.setFilters = new T2(), D2(), a2.attr = st.attr, st.find = a2, st.expr = a2.selectors, st.expr[":"] = st.expr.pseudos, st.unique = a2.uniqueSort, st.text = a2.getText, st.isXMLDoc = a2.isXML, st.contains = a2.contains;
    }(e);
    var Pt = /Until$/, Rt = /^(?:parents|prev(?:Until|All))/, Wt = /^.[^:#\[\.,]*$/, $t = st.expr.match.needsContext, It = { children: true, contents: true, next: true, prev: true };
    st.fn.extend({ find: function(e2) {
      var t2, n2, r2;
      if ("string" != typeof e2)
        return r2 = this, this.pushStack(st(e2).filter(function() {
          for (t2 = 0; r2.length > t2; t2++)
            if (st.contains(r2[t2], this))
              return true;
        }));
      for (n2 = [], t2 = 0; this.length > t2; t2++)
        st.find(e2, this[t2], n2);
      return n2 = this.pushStack(st.unique(n2)), n2.selector = (this.selector ? this.selector + " " : "") + e2, n2;
    }, has: function(e2) {
      var t2, n2 = st(e2, this), r2 = n2.length;
      return this.filter(function() {
        for (t2 = 0; r2 > t2; t2++)
          if (st.contains(this, n2[t2]))
            return true;
      });
    }, not: function(e2) {
      return this.pushStack(f(this, e2, false));
    }, filter: function(e2) {
      return this.pushStack(f(this, e2, true));
    }, is: function(e2) {
      return !!e2 && ("string" == typeof e2 ? $t.test(e2) ? st(e2, this.context).index(this[0]) >= 0 : st.filter(e2, this).length > 0 : this.filter(e2).length > 0);
    }, closest: function(e2, t2) {
      for (var n2, r2 = 0, i2 = this.length, o2 = [], a2 = $t.test(e2) || "string" != typeof e2 ? st(e2, t2 || this.context) : 0; i2 > r2; r2++)
        for (n2 = this[r2]; n2 && n2.ownerDocument && n2 !== t2 && 11 !== n2.nodeType; ) {
          if (a2 ? a2.index(n2) > -1 : st.find.matchesSelector(n2, e2)) {
            o2.push(n2);
            break;
          }
          n2 = n2.parentNode;
        }
      return this.pushStack(o2.length > 1 ? st.unique(o2) : o2);
    }, index: function(e2) {
      return e2 ? "string" == typeof e2 ? st.inArray(this[0], st(e2)) : st.inArray(e2.jquery ? e2[0] : e2, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function(e2, t2) {
      var n2 = "string" == typeof e2 ? st(e2, t2) : st.makeArray(e2 && e2.nodeType ? [e2] : e2), r2 = st.merge(this.get(), n2);
      return this.pushStack(st.unique(r2));
    }, addBack: function(e2) {
      return this.add(null == e2 ? this.prevObject : this.prevObject.filter(e2));
    } }), st.fn.andSelf = st.fn.addBack, st.each({ parent: function(e2) {
      var t2 = e2.parentNode;
      return t2 && 11 !== t2.nodeType ? t2 : null;
    }, parents: function(e2) {
      return st.dir(e2, "parentNode");
    }, parentsUntil: function(e2, t2, n2) {
      return st.dir(e2, "parentNode", n2);
    }, next: function(e2) {
      return c(e2, "nextSibling");
    }, prev: function(e2) {
      return c(e2, "previousSibling");
    }, nextAll: function(e2) {
      return st.dir(e2, "nextSibling");
    }, prevAll: function(e2) {
      return st.dir(e2, "previousSibling");
    }, nextUntil: function(e2, t2, n2) {
      return st.dir(e2, "nextSibling", n2);
    }, prevUntil: function(e2, t2, n2) {
      return st.dir(e2, "previousSibling", n2);
    }, siblings: function(e2) {
      return st.sibling((e2.parentNode || {}).firstChild, e2);
    }, children: function(e2) {
      return st.sibling(e2.firstChild);
    }, contents: function(e2) {
      return st.nodeName(e2, "iframe") ? e2.contentDocument || e2.contentWindow.document : st.merge([], e2.childNodes);
    } }, function(e2, t2) {
      st.fn[e2] = function(n2, r2) {
        var i2 = st.map(this, t2, n2);
        return Pt.test(e2) || (r2 = n2), r2 && "string" == typeof r2 && (i2 = st.filter(r2, i2)), i2 = this.length > 1 && !It[e2] ? st.unique(i2) : i2, this.length > 1 && Rt.test(e2) && (i2 = i2.reverse()), this.pushStack(i2);
      };
    }), st.extend({ filter: function(e2, t2, n2) {
      return n2 && (e2 = ":not(" + e2 + ")"), 1 === t2.length ? st.find.matchesSelector(t2[0], e2) ? [t2[0]] : [] : st.find.matches(e2, t2);
    }, dir: function(e2, n2, r2) {
      for (var i2 = [], o2 = e2[n2]; o2 && 9 !== o2.nodeType && (r2 === t || 1 !== o2.nodeType || !st(o2).is(r2)); )
        1 === o2.nodeType && i2.push(o2), o2 = o2[n2];
      return i2;
    }, sibling: function(e2, t2) {
      for (var n2 = []; e2; e2 = e2.nextSibling)
        1 === e2.nodeType && e2 !== t2 && n2.push(e2);
      return n2;
    } });
    var zt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Xt = / jQuery\d+="(?:null|\d+)"/g, Ut = RegExp("<(?:" + zt + ")[\\s/>]", "i"), Vt = /^\s+/, Yt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Jt = /<([\w:]+)/, Gt = /<tbody/i, Qt = /<|&#?\w+;/, Kt = /<(?:script|style|link)/i, Zt = /^(?:checkbox|radio)$/i, en = /checked\s*(?:[^=]|=\s*.checked.)/i, tn = /^$|\/(?:java|ecma)script/i, nn = /^true\/(.*)/, rn = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, on = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: st.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, an = p(V), sn = an.appendChild(V.createElement("div"));
    on.optgroup = on.option, on.tbody = on.tfoot = on.colgroup = on.caption = on.thead, on.th = on.td, st.fn.extend({ text: function(e2) {
      return st.access(this, function(e3) {
        return e3 === t ? st.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(e3));
      }, null, e2, arguments.length);
    }, wrapAll: function(e2) {
      if (st.isFunction(e2))
        return this.each(function(t3) {
          st(this).wrapAll(e2.call(this, t3));
        });
      if (this[0]) {
        var t2 = st(e2, this[0].ownerDocument).eq(0).clone(true);
        this[0].parentNode && t2.insertBefore(this[0]), t2.map(function() {
          for (var e3 = this; e3.firstChild && 1 === e3.firstChild.nodeType; )
            e3 = e3.firstChild;
          return e3;
        }).append(this);
      }
      return this;
    }, wrapInner: function(e2) {
      return st.isFunction(e2) ? this.each(function(t2) {
        st(this).wrapInner(e2.call(this, t2));
      }) : this.each(function() {
        var t2 = st(this), n2 = t2.contents();
        n2.length ? n2.wrapAll(e2) : t2.append(e2);
      });
    }, wrap: function(e2) {
      var t2 = st.isFunction(e2);
      return this.each(function(n2) {
        st(this).wrapAll(t2 ? e2.call(this, n2) : e2);
      });
    }, unwrap: function() {
      return this.parent().each(function() {
        st.nodeName(this, "body") || st(this).replaceWith(this.childNodes);
      }).end();
    }, append: function() {
      return this.domManip(arguments, true, function(e2) {
        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e2);
      });
    }, prepend: function() {
      return this.domManip(arguments, true, function(e2) {
        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e2, this.firstChild);
      });
    }, before: function() {
      return this.domManip(arguments, false, function(e2) {
        this.parentNode && this.parentNode.insertBefore(e2, this);
      });
    }, after: function() {
      return this.domManip(arguments, false, function(e2) {
        this.parentNode && this.parentNode.insertBefore(e2, this.nextSibling);
      });
    }, remove: function(e2, t2) {
      for (var n2, r2 = 0; null != (n2 = this[r2]); r2++)
        (!e2 || st.filter(e2, [n2]).length > 0) && (t2 || 1 !== n2.nodeType || st.cleanData(b(n2)), n2.parentNode && (t2 && st.contains(n2.ownerDocument, n2) && m(b(n2, "script")), n2.parentNode.removeChild(n2)));
      return this;
    }, empty: function() {
      for (var e2, t2 = 0; null != (e2 = this[t2]); t2++) {
        for (1 === e2.nodeType && st.cleanData(b(e2, false)); e2.firstChild; )
          e2.removeChild(e2.firstChild);
        e2.options && st.nodeName(e2, "select") && (e2.options.length = 0);
      }
      return this;
    }, clone: function(e2, t2) {
      return e2 = null == e2 ? false : e2, t2 = null == t2 ? e2 : t2, this.map(function() {
        return st.clone(this, e2, t2);
      });
    }, html: function(e2) {
      return st.access(this, function(e3) {
        var n2 = this[0] || {}, r2 = 0, i2 = this.length;
        if (e3 === t)
          return 1 === n2.nodeType ? n2.innerHTML.replace(Xt, "") : t;
        if (!("string" != typeof e3 || Kt.test(e3) || !st.support.htmlSerialize && Ut.test(e3) || !st.support.leadingWhitespace && Vt.test(e3) || on[(Jt.exec(e3) || ["", ""])[1].toLowerCase()])) {
          e3 = e3.replace(Yt, "<$1></$2>");
          try {
            for (; i2 > r2; r2++)
              n2 = this[r2] || {}, 1 === n2.nodeType && (st.cleanData(b(n2, false)), n2.innerHTML = e3);
            n2 = 0;
          } catch (o2) {
          }
        }
        n2 && this.empty().append(e3);
      }, null, e2, arguments.length);
    }, replaceWith: function(e2) {
      var t2 = st.isFunction(e2);
      return t2 || "string" == typeof e2 || (e2 = st(e2).not(this).detach()), this.domManip([e2], true, function(e3) {
        var t3 = this.nextSibling, n2 = this.parentNode;
        (n2 && 1 === this.nodeType || 11 === this.nodeType) && (st(this).remove(), t3 ? t3.parentNode.insertBefore(e3, t3) : n2.appendChild(e3));
      });
    }, detach: function(e2) {
      return this.remove(e2, true);
    }, domManip: function(e2, n2, r2) {
      e2 = et.apply([], e2);
      var i2, o2, a2, s2, u2, l2, c2 = 0, f2 = this.length, p2 = this, m2 = f2 - 1, y2 = e2[0], v2 = st.isFunction(y2);
      if (v2 || !(1 >= f2 || "string" != typeof y2 || st.support.checkClone) && en.test(y2))
        return this.each(function(i3) {
          var o3 = p2.eq(i3);
          v2 && (e2[0] = y2.call(this, i3, n2 ? o3.html() : t)), o3.domManip(e2, n2, r2);
        });
      if (f2 && (i2 = st.buildFragment(e2, this[0].ownerDocument, false, this), o2 = i2.firstChild, 1 === i2.childNodes.length && (i2 = o2), o2)) {
        for (n2 = n2 && st.nodeName(o2, "tr"), a2 = st.map(b(i2, "script"), h), s2 = a2.length; f2 > c2; c2++)
          u2 = i2, c2 !== m2 && (u2 = st.clone(u2, true, true), s2 && st.merge(a2, b(u2, "script"))), r2.call(n2 && st.nodeName(this[c2], "table") ? d(this[c2], "tbody") : this[c2], u2, c2);
        if (s2)
          for (l2 = a2[a2.length - 1].ownerDocument, st.map(a2, g), c2 = 0; s2 > c2; c2++)
            u2 = a2[c2], tn.test(u2.type || "") && !st._data(u2, "globalEval") && st.contains(l2, u2) && (u2.src ? st.ajax({ url: u2.src, type: "GET", dataType: "script", async: false, global: false, "throws": true }) : st.globalEval((u2.text || u2.textContent || u2.innerHTML || "").replace(rn, "")));
        i2 = o2 = null;
      }
      return this;
    } }), st.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e2, t2) {
      st.fn[e2] = function(e3) {
        for (var n2, r2 = 0, i2 = [], o2 = st(e3), a2 = o2.length - 1; a2 >= r2; r2++)
          n2 = r2 === a2 ? this : this.clone(true), st(o2[r2])[t2](n2), tt.apply(i2, n2.get());
        return this.pushStack(i2);
      };
    }), st.extend({ clone: function(e2, t2, n2) {
      var r2, i2, o2, a2, s2, u2 = st.contains(e2.ownerDocument, e2);
      if (st.support.html5Clone || st.isXMLDoc(e2) || !Ut.test("<" + e2.nodeName + ">") ? s2 = e2.cloneNode(true) : (sn.innerHTML = e2.outerHTML, sn.removeChild(s2 = sn.firstChild)), !(st.support.noCloneEvent && st.support.noCloneChecked || 1 !== e2.nodeType && 11 !== e2.nodeType || st.isXMLDoc(e2)))
        for (r2 = b(s2), i2 = b(e2), a2 = 0; null != (o2 = i2[a2]); ++a2)
          r2[a2] && v(o2, r2[a2]);
      if (t2)
        if (n2)
          for (i2 = i2 || b(e2), r2 = r2 || b(s2), a2 = 0; null != (o2 = i2[a2]); a2++)
            y(o2, r2[a2]);
        else
          y(e2, s2);
      return r2 = b(s2, "script"), r2.length > 0 && m(r2, !u2 && b(e2, "script")), r2 = i2 = o2 = null, s2;
    }, buildFragment: function(e2, t2, n2, r2) {
      for (var i2, o2, a2, s2, u2, l2, c2, f2 = e2.length, d2 = p(t2), h2 = [], g2 = 0; f2 > g2; g2++)
        if (o2 = e2[g2], o2 || 0 === o2)
          if ("object" === st.type(o2))
            st.merge(h2, o2.nodeType ? [o2] : o2);
          else if (Qt.test(o2)) {
            for (s2 = s2 || d2.appendChild(t2.createElement("div")), a2 = (Jt.exec(o2) || ["", ""])[1].toLowerCase(), u2 = on[a2] || on._default, s2.innerHTML = u2[1] + o2.replace(Yt, "<$1></$2>") + u2[2], c2 = u2[0]; c2--; )
              s2 = s2.lastChild;
            if (!st.support.leadingWhitespace && Vt.test(o2) && h2.push(t2.createTextNode(Vt.exec(o2)[0])), !st.support.tbody)
              for (o2 = "table" !== a2 || Gt.test(o2) ? "<table>" !== u2[1] || Gt.test(o2) ? 0 : s2 : s2.firstChild, c2 = o2 && o2.childNodes.length; c2--; )
                st.nodeName(l2 = o2.childNodes[c2], "tbody") && !l2.childNodes.length && o2.removeChild(l2);
            for (st.merge(h2, s2.childNodes), s2.textContent = ""; s2.firstChild; )
              s2.removeChild(s2.firstChild);
            s2 = d2.lastChild;
          } else
            h2.push(t2.createTextNode(o2));
      for (s2 && d2.removeChild(s2), st.support.appendChecked || st.grep(b(h2, "input"), x), g2 = 0; o2 = h2[g2++]; )
        if ((!r2 || -1 === st.inArray(o2, r2)) && (i2 = st.contains(o2.ownerDocument, o2), s2 = b(d2.appendChild(o2), "script"), i2 && m(s2), n2))
          for (c2 = 0; o2 = s2[c2++]; )
            tn.test(o2.type || "") && n2.push(o2);
      return s2 = null, d2;
    }, cleanData: function(e2, n2) {
      for (var r2, i2, o2, a2, s2 = 0, u2 = st.expando, l2 = st.cache, c2 = st.support.deleteExpando, f2 = st.event.special; null != (o2 = e2[s2]); s2++)
        if ((n2 || st.acceptData(o2)) && (i2 = o2[u2], r2 = i2 && l2[i2])) {
          if (r2.events)
            for (a2 in r2.events)
              f2[a2] ? st.event.remove(o2, a2) : st.removeEvent(o2, a2, r2.handle);
          l2[i2] && (delete l2[i2], c2 ? delete o2[u2] : o2.removeAttribute !== t ? o2.removeAttribute(u2) : o2[u2] = null, K.push(i2));
        }
    } });
    var un, ln, cn, fn = /alpha\([^)]*\)/i, pn = /opacity\s*=\s*([^)]*)/, dn = /^(top|right|bottom|left)$/, hn = /^(none|table(?!-c[ea]).+)/, gn = /^margin/, mn = RegExp("^(" + ut + ")(.*)$", "i"), yn = RegExp("^(" + ut + ")(?!px)[a-z%]+$", "i"), vn = RegExp("^([+-])=(" + ut + ")", "i"), bn = { BODY: "block" }, xn = { position: "absolute", visibility: "hidden", display: "block" }, Tn = { letterSpacing: 0, fontWeight: 400 }, wn = ["Top", "Right", "Bottom", "Left"], Nn = ["Webkit", "O", "Moz", "ms"];
    st.fn.extend({ css: function(e2, n2) {
      return st.access(this, function(e3, n3, r2) {
        var i2, o2, a2 = {}, s2 = 0;
        if (st.isArray(n3)) {
          for (i2 = ln(e3), o2 = n3.length; o2 > s2; s2++)
            a2[n3[s2]] = st.css(e3, n3[s2], false, i2);
          return a2;
        }
        return r2 !== t ? st.style(e3, n3, r2) : st.css(e3, n3);
      }, e2, n2, arguments.length > 1);
    }, show: function() {
      return N(this, true);
    }, hide: function() {
      return N(this);
    }, toggle: function(e2) {
      var t2 = "boolean" == typeof e2;
      return this.each(function() {
        (t2 ? e2 : w(this)) ? st(this).show() : st(this).hide();
      });
    } }), st.extend({ cssHooks: { opacity: { get: function(e2, t2) {
      if (t2) {
        var n2 = un(e2, "opacity");
        return "" === n2 ? "1" : n2;
      }
    } } }, cssNumber: { columnCount: true, fillOpacity: true, fontWeight: true, lineHeight: true, opacity: true, orphans: true, widows: true, zIndex: true, zoom: true }, cssProps: { "float": st.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function(e2, n2, r2, i2) {
      if (e2 && 3 !== e2.nodeType && 8 !== e2.nodeType && e2.style) {
        var o2, a2, s2, u2 = st.camelCase(n2), l2 = e2.style;
        if (n2 = st.cssProps[u2] || (st.cssProps[u2] = T(l2, u2)), s2 = st.cssHooks[n2] || st.cssHooks[u2], r2 === t)
          return s2 && "get" in s2 && (o2 = s2.get(e2, false, i2)) !== t ? o2 : l2[n2];
        if (a2 = typeof r2, "string" === a2 && (o2 = vn.exec(r2)) && (r2 = (o2[1] + 1) * o2[2] + parseFloat(st.css(e2, n2)), a2 = "number"), !(null == r2 || "number" === a2 && isNaN(r2) || ("number" !== a2 || st.cssNumber[u2] || (r2 += "px"), st.support.clearCloneStyle || "" !== r2 || 0 !== n2.indexOf("background") || (l2[n2] = "inherit"), s2 && "set" in s2 && (r2 = s2.set(e2, r2, i2)) === t)))
          try {
            l2[n2] = r2;
          } catch (c2) {
          }
      }
    }, css: function(e2, n2, r2, i2) {
      var o2, a2, s2, u2 = st.camelCase(n2);
      return n2 = st.cssProps[u2] || (st.cssProps[u2] = T(e2.style, u2)), s2 = st.cssHooks[n2] || st.cssHooks[u2], s2 && "get" in s2 && (o2 = s2.get(e2, true, r2)), o2 === t && (o2 = un(e2, n2, i2)), "normal" === o2 && n2 in Tn && (o2 = Tn[n2]), r2 ? (a2 = parseFloat(o2), r2 === true || st.isNumeric(a2) ? a2 || 0 : o2) : o2;
    }, swap: function(e2, t2, n2, r2) {
      var i2, o2, a2 = {};
      for (o2 in t2)
        a2[o2] = e2.style[o2], e2.style[o2] = t2[o2];
      i2 = n2.apply(e2, r2 || []);
      for (o2 in t2)
        e2.style[o2] = a2[o2];
      return i2;
    } }), e.getComputedStyle ? (ln = function(t2) {
      return e.getComputedStyle(t2, null);
    }, un = function(e2, n2, r2) {
      var i2, o2, a2, s2 = r2 || ln(e2), u2 = s2 ? s2.getPropertyValue(n2) || s2[n2] : t, l2 = e2.style;
      return s2 && ("" !== u2 || st.contains(e2.ownerDocument, e2) || (u2 = st.style(e2, n2)), yn.test(u2) && gn.test(n2) && (i2 = l2.width, o2 = l2.minWidth, a2 = l2.maxWidth, l2.minWidth = l2.maxWidth = l2.width = u2, u2 = s2.width, l2.width = i2, l2.minWidth = o2, l2.maxWidth = a2)), u2;
    }) : V.documentElement.currentStyle && (ln = function(e2) {
      return e2.currentStyle;
    }, un = function(e2, n2, r2) {
      var i2, o2, a2, s2 = r2 || ln(e2), u2 = s2 ? s2[n2] : t, l2 = e2.style;
      return null == u2 && l2 && l2[n2] && (u2 = l2[n2]), yn.test(u2) && !dn.test(n2) && (i2 = l2.left, o2 = e2.runtimeStyle, a2 = o2 && o2.left, a2 && (o2.left = e2.currentStyle.left), l2.left = "fontSize" === n2 ? "1em" : u2, u2 = l2.pixelLeft + "px", l2.left = i2, a2 && (o2.left = a2)), "" === u2 ? "auto" : u2;
    }), st.each(["height", "width"], function(e2, n2) {
      st.cssHooks[n2] = { get: function(e3, r2, i2) {
        return r2 ? 0 === e3.offsetWidth && hn.test(st.css(e3, "display")) ? st.swap(e3, xn, function() {
          return E(e3, n2, i2);
        }) : E(e3, n2, i2) : t;
      }, set: function(e3, t2, r2) {
        var i2 = r2 && ln(e3);
        return C(e3, t2, r2 ? k(e3, n2, r2, st.support.boxSizing && "border-box" === st.css(e3, "boxSizing", false, i2), i2) : 0);
      } };
    }), st.support.opacity || (st.cssHooks.opacity = { get: function(e2, t2) {
      return pn.test((t2 && e2.currentStyle ? e2.currentStyle.filter : e2.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t2 ? "1" : "";
    }, set: function(e2, t2) {
      var n2 = e2.style, r2 = e2.currentStyle, i2 = st.isNumeric(t2) ? "alpha(opacity=" + 100 * t2 + ")" : "", o2 = r2 && r2.filter || n2.filter || "";
      n2.zoom = 1, (t2 >= 1 || "" === t2) && "" === st.trim(o2.replace(fn, "")) && n2.removeAttribute && (n2.removeAttribute("filter"), "" === t2 || r2 && !r2.filter) || (n2.filter = fn.test(o2) ? o2.replace(fn, i2) : o2 + " " + i2);
    } }), st(function() {
      st.support.reliableMarginRight || (st.cssHooks.marginRight = { get: function(e2, n2) {
        return n2 ? st.swap(e2, { display: "inline-block" }, un, [e2, "marginRight"]) : t;
      } }), !st.support.pixelPosition && st.fn.position && st.each(["top", "left"], function(e2, n2) {
        st.cssHooks[n2] = { get: function(e3, r2) {
          return r2 ? (r2 = un(e3, n2), yn.test(r2) ? st(e3).position()[n2] + "px" : r2) : t;
        } };
      });
    }), st.expr && st.expr.filters && (st.expr.filters.hidden = function(e2) {
      return 0 === e2.offsetWidth && 0 === e2.offsetHeight || !st.support.reliableHiddenOffsets && "none" === (e2.style && e2.style.display || st.css(e2, "display"));
    }, st.expr.filters.visible = function(e2) {
      return !st.expr.filters.hidden(e2);
    }), st.each({ margin: "", padding: "", border: "Width" }, function(e2, t2) {
      st.cssHooks[e2 + t2] = { expand: function(n2) {
        for (var r2 = 0, i2 = {}, o2 = "string" == typeof n2 ? n2.split(" ") : [n2]; 4 > r2; r2++)
          i2[e2 + wn[r2] + t2] = o2[r2] || o2[r2 - 2] || o2[0];
        return i2;
      } }, gn.test(e2) || (st.cssHooks[e2 + t2].set = C);
    });
    var Cn = /%20/g, kn = /\[\]$/, En = /\r?\n/g, Sn = /^(?:submit|button|image|reset)$/i, An = /^(?:input|select|textarea|keygen)/i;
    st.fn.extend({ serialize: function() {
      return st.param(this.serializeArray());
    }, serializeArray: function() {
      return this.map(function() {
        var e2 = st.prop(this, "elements");
        return e2 ? st.makeArray(e2) : this;
      }).filter(function() {
        var e2 = this.type;
        return this.name && !st(this).is(":disabled") && An.test(this.nodeName) && !Sn.test(e2) && (this.checked || !Zt.test(e2));
      }).map(function(e2, t2) {
        var n2 = st(this).val();
        return null == n2 ? null : st.isArray(n2) ? st.map(n2, function(e3) {
          return { name: t2.name, value: e3.replace(En, "\r\n") };
        }) : { name: t2.name, value: n2.replace(En, "\r\n") };
      }).get();
    } }), st.param = function(e2, n2) {
      var r2, i2 = [], o2 = function(e3, t2) {
        t2 = st.isFunction(t2) ? t2() : null == t2 ? "" : t2, i2[i2.length] = encodeURIComponent(e3) + "=" + encodeURIComponent(t2);
      };
      if (n2 === t && (n2 = st.ajaxSettings && st.ajaxSettings.traditional), st.isArray(e2) || e2.jquery && !st.isPlainObject(e2))
        st.each(e2, function() {
          o2(this.name, this.value);
        });
      else
        for (r2 in e2)
          j(r2, e2[r2], n2, o2);
      return i2.join("&").replace(Cn, "+");
    };
    var jn, Dn, Ln = st.now(), Hn = /\?/, Mn = /#.*$/, qn = /([?&])_=[^&]*/, _n = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, On = /^(?:GET|HEAD)$/, Bn = /^\/\//, Pn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Rn = st.fn.load, Wn = {}, $n = {}, In = "*/".concat("*");
    try {
      Dn = Y.href;
    } catch (zn) {
      Dn = V.createElement("a"), Dn.href = "", Dn = Dn.href;
    }
    jn = Pn.exec(Dn.toLowerCase()) || [], st.fn.load = function(e2, n2, r2) {
      if ("string" != typeof e2 && Rn)
        return Rn.apply(this, arguments);
      var i2, o2, a2, s2 = this, u2 = e2.indexOf(" ");
      return u2 >= 0 && (i2 = e2.slice(u2, e2.length), e2 = e2.slice(0, u2)), st.isFunction(n2) ? (r2 = n2, n2 = t) : n2 && "object" == typeof n2 && (o2 = "POST"), s2.length > 0 && st.ajax({ url: e2, type: o2, dataType: "html", data: n2 }).done(function(e3) {
        a2 = arguments, s2.html(i2 ? st("<div>").append(st.parseHTML(e3)).find(i2) : e3);
      }).complete(r2 && function(e3, t2) {
        s2.each(r2, a2 || [e3.responseText, t2, e3]);
      }), this;
    }, st.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e2, t2) {
      st.fn[t2] = function(e3) {
        return this.on(t2, e3);
      };
    }), st.each(["get", "post"], function(e2, n2) {
      st[n2] = function(e3, r2, i2, o2) {
        return st.isFunction(r2) && (o2 = o2 || i2, i2 = r2, r2 = t), st.ajax({ url: e3, type: n2, dataType: o2, data: r2, success: i2 });
      };
    }), st.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Dn, type: "GET", isLocal: Fn.test(jn[1]), global: true, processData: true, async: true, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": In, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": e.String, "text html": true, "text json": st.parseJSON, "text xml": st.parseXML }, flatOptions: { url: true, context: true } }, ajaxSetup: function(e2, t2) {
      return t2 ? H(H(e2, st.ajaxSettings), t2) : H(st.ajaxSettings, e2);
    }, ajaxPrefilter: D(Wn), ajaxTransport: D($n), ajax: function(e2, n2) {
      function r2(e3, n3, r3, s3) {
        var l3, f3, v3, b3, T3, N2 = n3;
        2 !== x2 && (x2 = 2, u2 && clearTimeout(u2), i2 = t, a2 = s3 || "", w2.readyState = e3 > 0 ? 4 : 0, r3 && (b3 = M(p2, w2, r3)), e3 >= 200 && 300 > e3 || 304 === e3 ? (p2.ifModified && (T3 = w2.getResponseHeader("Last-Modified"), T3 && (st.lastModified[o2] = T3), T3 = w2.getResponseHeader("etag"), T3 && (st.etag[o2] = T3)), 304 === e3 ? (l3 = true, N2 = "notmodified") : (l3 = q(p2, b3), N2 = l3.state, f3 = l3.data, v3 = l3.error, l3 = !v3)) : (v3 = N2, (e3 || !N2) && (N2 = "error", 0 > e3 && (e3 = 0))), w2.status = e3, w2.statusText = (n3 || N2) + "", l3 ? g2.resolveWith(d2, [f3, N2, w2]) : g2.rejectWith(d2, [w2, N2, v3]), w2.statusCode(y2), y2 = t, c2 && h2.trigger(l3 ? "ajaxSuccess" : "ajaxError", [w2, p2, l3 ? f3 : v3]), m2.fireWith(d2, [w2, N2]), c2 && (h2.trigger("ajaxComplete", [w2, p2]), --st.active || st.event.trigger("ajaxStop")));
      }
      "object" == typeof e2 && (n2 = e2, e2 = t), n2 = n2 || {};
      var i2, o2, a2, s2, u2, l2, c2, f2, p2 = st.ajaxSetup({}, n2), d2 = p2.context || p2, h2 = p2.context && (d2.nodeType || d2.jquery) ? st(d2) : st.event, g2 = st.Deferred(), m2 = st.Callbacks("once memory"), y2 = p2.statusCode || {}, v2 = {}, b2 = {}, x2 = 0, T2 = "canceled", w2 = { readyState: 0, getResponseHeader: function(e3) {
        var t2;
        if (2 === x2) {
          if (!s2)
            for (s2 = {}; t2 = _n.exec(a2); )
              s2[t2[1].toLowerCase()] = t2[2];
          t2 = s2[e3.toLowerCase()];
        }
        return null == t2 ? null : t2;
      }, getAllResponseHeaders: function() {
        return 2 === x2 ? a2 : null;
      }, setRequestHeader: function(e3, t2) {
        var n3 = e3.toLowerCase();
        return x2 || (e3 = b2[n3] = b2[n3] || e3, v2[e3] = t2), this;
      }, overrideMimeType: function(e3) {
        return x2 || (p2.mimeType = e3), this;
      }, statusCode: function(e3) {
        var t2;
        if (e3)
          if (2 > x2)
            for (t2 in e3)
              y2[t2] = [y2[t2], e3[t2]];
          else
            w2.always(e3[w2.status]);
        return this;
      }, abort: function(e3) {
        var t2 = e3 || T2;
        return i2 && i2.abort(t2), r2(0, t2), this;
      } };
      if (g2.promise(w2).complete = m2.add, w2.success = w2.done, w2.error = w2.fail, p2.url = ((e2 || p2.url || Dn) + "").replace(Mn, "").replace(Bn, jn[1] + "//"), p2.type = n2.method || n2.type || p2.method || p2.type, p2.dataTypes = st.trim(p2.dataType || "*").toLowerCase().match(lt) || [""], null == p2.crossDomain && (l2 = Pn.exec(p2.url.toLowerCase()), p2.crossDomain = !(!l2 || l2[1] === jn[1] && l2[2] === jn[2] && (l2[3] || ("http:" === l2[1] ? 80 : 443)) == (jn[3] || ("http:" === jn[1] ? 80 : 443)))), p2.data && p2.processData && "string" != typeof p2.data && (p2.data = st.param(p2.data, p2.traditional)), L(Wn, p2, n2, w2), 2 === x2)
        return w2;
      c2 = p2.global, c2 && 0 === st.active++ && st.event.trigger("ajaxStart"), p2.type = p2.type.toUpperCase(), p2.hasContent = !On.test(p2.type), o2 = p2.url, p2.hasContent || (p2.data && (o2 = p2.url += (Hn.test(o2) ? "&" : "?") + p2.data, delete p2.data), p2.cache === false && (p2.url = qn.test(o2) ? o2.replace(qn, "$1_=" + Ln++) : o2 + (Hn.test(o2) ? "&" : "?") + "_=" + Ln++)), p2.ifModified && (st.lastModified[o2] && w2.setRequestHeader("If-Modified-Since", st.lastModified[o2]), st.etag[o2] && w2.setRequestHeader("If-None-Match", st.etag[o2])), (p2.data && p2.hasContent && p2.contentType !== false || n2.contentType) && w2.setRequestHeader("Content-Type", p2.contentType), w2.setRequestHeader("Accept", p2.dataTypes[0] && p2.accepts[p2.dataTypes[0]] ? p2.accepts[p2.dataTypes[0]] + ("*" !== p2.dataTypes[0] ? ", " + In + "; q=0.01" : "") : p2.accepts["*"]);
      for (f2 in p2.headers)
        w2.setRequestHeader(f2, p2.headers[f2]);
      if (p2.beforeSend && (p2.beforeSend.call(d2, w2, p2) === false || 2 === x2))
        return w2.abort();
      T2 = "abort";
      for (f2 in { success: 1, error: 1, complete: 1 })
        w2[f2](p2[f2]);
      if (i2 = L($n, p2, n2, w2)) {
        w2.readyState = 1, c2 && h2.trigger("ajaxSend", [w2, p2]), p2.async && p2.timeout > 0 && (u2 = setTimeout(function() {
          w2.abort("timeout");
        }, p2.timeout));
        try {
          x2 = 1, i2.send(v2, r2);
        } catch (N2) {
          if (!(2 > x2))
            throw N2;
          r2(-1, N2);
        }
      } else
        r2(-1, "No Transport");
      return w2;
    }, getScript: function(e2, n2) {
      return st.get(e2, t, n2, "script");
    }, getJSON: function(e2, t2, n2) {
      return st.get(e2, t2, n2, "json");
    } }), st.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function(e2) {
      return st.globalEval(e2), e2;
    } } }), st.ajaxPrefilter("script", function(e2) {
      e2.cache === t && (e2.cache = false), e2.crossDomain && (e2.type = "GET", e2.global = false);
    }), st.ajaxTransport("script", function(e2) {
      if (e2.crossDomain) {
        var n2, r2 = V.head || st("head")[0] || V.documentElement;
        return { send: function(t2, i2) {
          n2 = V.createElement("script"), n2.async = true, e2.scriptCharset && (n2.charset = e2.scriptCharset), n2.src = e2.url, n2.onload = n2.onreadystatechange = function(e3, t3) {
            (t3 || !n2.readyState || /loaded|complete/.test(n2.readyState)) && (n2.onload = n2.onreadystatechange = null, n2.parentNode && n2.parentNode.removeChild(n2), n2 = null, t3 || i2(200, "success"));
          }, r2.insertBefore(n2, r2.firstChild);
        }, abort: function() {
          n2 && n2.onload(t, true);
        } };
      }
    });
    var Xn = [], Un = /(=)\?(?=&|$)|\?\?/;
    st.ajaxSetup({ jsonp: "callback", jsonpCallback: function() {
      var e2 = Xn.pop() || st.expando + "_" + Ln++;
      return this[e2] = true, e2;
    } }), st.ajaxPrefilter("json jsonp", function(n2, r2, i2) {
      var o2, a2, s2, u2 = n2.jsonp !== false && (Un.test(n2.url) ? "url" : "string" == typeof n2.data && !(n2.contentType || "").indexOf("application/x-www-form-urlencoded") && Un.test(n2.data) && "data");
      return u2 || "jsonp" === n2.dataTypes[0] ? (o2 = n2.jsonpCallback = st.isFunction(n2.jsonpCallback) ? n2.jsonpCallback() : n2.jsonpCallback, u2 ? n2[u2] = n2[u2].replace(Un, "$1" + o2) : n2.jsonp !== false && (n2.url += (Hn.test(n2.url) ? "&" : "?") + n2.jsonp + "=" + o2), n2.converters["script json"] = function() {
        return s2 || st.error(o2 + " was not called"), s2[0];
      }, n2.dataTypes[0] = "json", a2 = e[o2], e[o2] = function() {
        s2 = arguments;
      }, i2.always(function() {
        e[o2] = a2, n2[o2] && (n2.jsonpCallback = r2.jsonpCallback, Xn.push(o2)), s2 && st.isFunction(a2) && a2(s2[0]), s2 = a2 = t;
      }), "script") : t;
    });
    var Vn, Yn, Jn = 0, Gn = e.ActiveXObject && function() {
      var e2;
      for (e2 in Vn)
        Vn[e2](t, true);
    };
    st.ajaxSettings.xhr = e.ActiveXObject ? function() {
      return !this.isLocal && _() || F();
    } : _, Yn = st.ajaxSettings.xhr(), st.support.cors = !!Yn && "withCredentials" in Yn, Yn = st.support.ajax = !!Yn, Yn && st.ajaxTransport(function(n2) {
      if (!n2.crossDomain || st.support.cors) {
        var r2;
        return { send: function(i2, o2) {
          var a2, s2, u2 = n2.xhr();
          if (n2.username ? u2.open(n2.type, n2.url, n2.async, n2.username, n2.password) : u2.open(n2.type, n2.url, n2.async), n2.xhrFields)
            for (s2 in n2.xhrFields)
              u2[s2] = n2.xhrFields[s2];
          n2.mimeType && u2.overrideMimeType && u2.overrideMimeType(n2.mimeType), n2.crossDomain || i2["X-Requested-With"] || (i2["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (s2 in i2)
              u2.setRequestHeader(s2, i2[s2]);
          } catch (l2) {
          }
          u2.send(n2.hasContent && n2.data || null), r2 = function(e2, i3) {
            var s3, l2, c2, f2, p2;
            try {
              if (r2 && (i3 || 4 === u2.readyState))
                if (r2 = t, a2 && (u2.onreadystatechange = st.noop, Gn && delete Vn[a2]), i3)
                  4 !== u2.readyState && u2.abort();
                else {
                  f2 = {}, s3 = u2.status, p2 = u2.responseXML, c2 = u2.getAllResponseHeaders(), p2 && p2.documentElement && (f2.xml = p2), "string" == typeof u2.responseText && (f2.text = u2.responseText);
                  try {
                    l2 = u2.statusText;
                  } catch (d2) {
                    l2 = "";
                  }
                  s3 || !n2.isLocal || n2.crossDomain ? 1223 === s3 && (s3 = 204) : s3 = f2.text ? 200 : 404;
                }
            } catch (h2) {
              i3 || o2(-1, h2);
            }
            f2 && o2(s3, l2, f2, c2);
          }, n2.async ? 4 === u2.readyState ? setTimeout(r2) : (a2 = ++Jn, Gn && (Vn || (Vn = {}, st(e).unload(Gn)), Vn[a2] = r2), u2.onreadystatechange = r2) : r2();
        }, abort: function() {
          r2 && r2(t, true);
        } };
      }
    });
    var Qn, Kn, Zn = /^(?:toggle|show|hide)$/, er = RegExp("^(?:([+-])=|)(" + ut + ")([a-z%]*)$", "i"), tr = /queueHooks$/, nr = [W], rr = { "*": [function(e2, t2) {
      var n2, r2, i2 = this.createTween(e2, t2), o2 = er.exec(t2), a2 = i2.cur(), s2 = +a2 || 0, u2 = 1, l2 = 20;
      if (o2) {
        if (n2 = +o2[2], r2 = o2[3] || (st.cssNumber[e2] ? "" : "px"), "px" !== r2 && s2) {
          s2 = st.css(i2.elem, e2, true) || n2 || 1;
          do
            u2 = u2 || ".5", s2 /= u2, st.style(i2.elem, e2, s2 + r2);
          while (u2 !== (u2 = i2.cur() / a2) && 1 !== u2 && --l2);
        }
        i2.unit = r2, i2.start = s2, i2.end = o2[1] ? s2 + (o2[1] + 1) * n2 : n2;
      }
      return i2;
    }] };
    st.Animation = st.extend(P, { tweener: function(e2, t2) {
      st.isFunction(e2) ? (t2 = e2, e2 = ["*"]) : e2 = e2.split(" ");
      for (var n2, r2 = 0, i2 = e2.length; i2 > r2; r2++)
        n2 = e2[r2], rr[n2] = rr[n2] || [], rr[n2].unshift(t2);
    }, prefilter: function(e2, t2) {
      t2 ? nr.unshift(e2) : nr.push(e2);
    } }), st.Tween = $, $.prototype = { constructor: $, init: function(e2, t2, n2, r2, i2, o2) {
      this.elem = e2, this.prop = n2, this.easing = i2 || "swing", this.options = t2, this.start = this.now = this.cur(), this.end = r2, this.unit = o2 || (st.cssNumber[n2] ? "" : "px");
    }, cur: function() {
      var e2 = $.propHooks[this.prop];
      return e2 && e2.get ? e2.get(this) : $.propHooks._default.get(this);
    }, run: function(e2) {
      var t2, n2 = $.propHooks[this.prop];
      return this.pos = t2 = this.options.duration ? st.easing[this.easing](e2, this.options.duration * e2, 0, 1, this.options.duration) : e2, this.now = (this.end - this.start) * t2 + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n2 && n2.set ? n2.set(this) : $.propHooks._default.set(this), this;
    } }, $.prototype.init.prototype = $.prototype, $.propHooks = { _default: { get: function(e2) {
      var t2;
      return null == e2.elem[e2.prop] || e2.elem.style && null != e2.elem.style[e2.prop] ? (t2 = st.css(e2.elem, e2.prop, "auto"), t2 && "auto" !== t2 ? t2 : 0) : e2.elem[e2.prop];
    }, set: function(e2) {
      st.fx.step[e2.prop] ? st.fx.step[e2.prop](e2) : e2.elem.style && (null != e2.elem.style[st.cssProps[e2.prop]] || st.cssHooks[e2.prop]) ? st.style(e2.elem, e2.prop, e2.now + e2.unit) : e2.elem[e2.prop] = e2.now;
    } } }, $.propHooks.scrollTop = $.propHooks.scrollLeft = { set: function(e2) {
      e2.elem.nodeType && e2.elem.parentNode && (e2.elem[e2.prop] = e2.now);
    } }, st.each(["toggle", "show", "hide"], function(e2, t2) {
      var n2 = st.fn[t2];
      st.fn[t2] = function(e3, r2, i2) {
        return null == e3 || "boolean" == typeof e3 ? n2.apply(this, arguments) : this.animate(I(t2, true), e3, r2, i2);
      };
    }), st.fn.extend({ fadeTo: function(e2, t2, n2, r2) {
      return this.filter(w).css("opacity", 0).show().end().animate({ opacity: t2 }, e2, n2, r2);
    }, animate: function(e2, t2, n2, r2) {
      var i2 = st.isEmptyObject(e2), o2 = st.speed(t2, n2, r2), a2 = function() {
        var t3 = P(this, st.extend({}, e2), o2);
        a2.finish = function() {
          t3.stop(true);
        }, (i2 || st._data(this, "finish")) && t3.stop(true);
      };
      return a2.finish = a2, i2 || o2.queue === false ? this.each(a2) : this.queue(o2.queue, a2);
    }, stop: function(e2, n2, r2) {
      var i2 = function(e3) {
        var t2 = e3.stop;
        delete e3.stop, t2(r2);
      };
      return "string" != typeof e2 && (r2 = n2, n2 = e2, e2 = t), n2 && e2 !== false && this.queue(e2 || "fx", []), this.each(function() {
        var t2 = true, n3 = null != e2 && e2 + "queueHooks", o2 = st.timers, a2 = st._data(this);
        if (n3)
          a2[n3] && a2[n3].stop && i2(a2[n3]);
        else
          for (n3 in a2)
            a2[n3] && a2[n3].stop && tr.test(n3) && i2(a2[n3]);
        for (n3 = o2.length; n3--; )
          o2[n3].elem !== this || null != e2 && o2[n3].queue !== e2 || (o2[n3].anim.stop(r2), t2 = false, o2.splice(n3, 1));
        (t2 || !r2) && st.dequeue(this, e2);
      });
    }, finish: function(e2) {
      return e2 !== false && (e2 = e2 || "fx"), this.each(function() {
        var t2, n2 = st._data(this), r2 = n2[e2 + "queue"], i2 = n2[e2 + "queueHooks"], o2 = st.timers, a2 = r2 ? r2.length : 0;
        for (n2.finish = true, st.queue(this, e2, []), i2 && i2.cur && i2.cur.finish && i2.cur.finish.call(this), t2 = o2.length; t2--; )
          o2[t2].elem === this && o2[t2].queue === e2 && (o2[t2].anim.stop(true), o2.splice(t2, 1));
        for (t2 = 0; a2 > t2; t2++)
          r2[t2] && r2[t2].finish && r2[t2].finish.call(this);
        delete n2.finish;
      });
    } }), st.each({ slideDown: I("show"), slideUp: I("hide"), slideToggle: I("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e2, t2) {
      st.fn[e2] = function(e3, n2, r2) {
        return this.animate(t2, e3, n2, r2);
      };
    }), st.speed = function(e2, t2, n2) {
      var r2 = e2 && "object" == typeof e2 ? st.extend({}, e2) : { complete: n2 || !n2 && t2 || st.isFunction(e2) && e2, duration: e2, easing: n2 && t2 || t2 && !st.isFunction(t2) && t2 };
      return r2.duration = st.fx.off ? 0 : "number" == typeof r2.duration ? r2.duration : r2.duration in st.fx.speeds ? st.fx.speeds[r2.duration] : st.fx.speeds._default, (null == r2.queue || r2.queue === true) && (r2.queue = "fx"), r2.old = r2.complete, r2.complete = function() {
        st.isFunction(r2.old) && r2.old.call(this), r2.queue && st.dequeue(this, r2.queue);
      }, r2;
    }, st.easing = { linear: function(e2) {
      return e2;
    }, swing: function(e2) {
      return 0.5 - Math.cos(e2 * Math.PI) / 2;
    } }, st.timers = [], st.fx = $.prototype.init, st.fx.tick = function() {
      var e2, n2 = st.timers, r2 = 0;
      for (Qn = st.now(); n2.length > r2; r2++)
        e2 = n2[r2], e2() || n2[r2] !== e2 || n2.splice(r2--, 1);
      n2.length || st.fx.stop(), Qn = t;
    }, st.fx.timer = function(e2) {
      e2() && st.timers.push(e2) && st.fx.start();
    }, st.fx.interval = 13, st.fx.start = function() {
      Kn || (Kn = setInterval(st.fx.tick, st.fx.interval));
    }, st.fx.stop = function() {
      clearInterval(Kn), Kn = null;
    }, st.fx.speeds = { slow: 600, fast: 200, _default: 400 }, st.fx.step = {}, st.expr && st.expr.filters && (st.expr.filters.animated = function(e2) {
      return st.grep(st.timers, function(t2) {
        return e2 === t2.elem;
      }).length;
    }), st.fn.offset = function(e2) {
      if (arguments.length)
        return e2 === t ? this : this.each(function(t2) {
          st.offset.setOffset(this, e2, t2);
        });
      var n2, r2, i2 = { top: 0, left: 0 }, o2 = this[0], a2 = o2 && o2.ownerDocument;
      if (a2)
        return n2 = a2.documentElement, st.contains(n2, o2) ? (o2.getBoundingClientRect !== t && (i2 = o2.getBoundingClientRect()), r2 = z(a2), { top: i2.top + (r2.pageYOffset || n2.scrollTop) - (n2.clientTop || 0), left: i2.left + (r2.pageXOffset || n2.scrollLeft) - (n2.clientLeft || 0) }) : i2;
    }, st.offset = { setOffset: function(e2, t2, n2) {
      var r2 = st.css(e2, "position");
      "static" === r2 && (e2.style.position = "relative");
      var i2, o2, a2 = st(e2), s2 = a2.offset(), u2 = st.css(e2, "top"), l2 = st.css(e2, "left"), c2 = ("absolute" === r2 || "fixed" === r2) && st.inArray("auto", [u2, l2]) > -1, f2 = {}, p2 = {};
      c2 ? (p2 = a2.position(), i2 = p2.top, o2 = p2.left) : (i2 = parseFloat(u2) || 0, o2 = parseFloat(l2) || 0), st.isFunction(t2) && (t2 = t2.call(e2, n2, s2)), null != t2.top && (f2.top = t2.top - s2.top + i2), null != t2.left && (f2.left = t2.left - s2.left + o2), "using" in t2 ? t2.using.call(e2, f2) : a2.css(f2);
    } }, st.fn.extend({ position: function() {
      if (this[0]) {
        var e2, t2, n2 = { top: 0, left: 0 }, r2 = this[0];
        return "fixed" === st.css(r2, "position") ? t2 = r2.getBoundingClientRect() : (e2 = this.offsetParent(), t2 = this.offset(), st.nodeName(e2[0], "html") || (n2 = e2.offset()), n2.top += st.css(e2[0], "borderTopWidth", true), n2.left += st.css(e2[0], "borderLeftWidth", true)), { top: t2.top - n2.top - st.css(r2, "marginTop", true), left: t2.left - n2.left - st.css(r2, "marginLeft", true) };
      }
    }, offsetParent: function() {
      return this.map(function() {
        for (var e2 = this.offsetParent || V.documentElement; e2 && !st.nodeName(e2, "html") && "static" === st.css(e2, "position"); )
          e2 = e2.offsetParent;
        return e2 || V.documentElement;
      });
    } }), st.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(e2, n2) {
      var r2 = /Y/.test(n2);
      st.fn[e2] = function(i2) {
        return st.access(this, function(e3, i3, o2) {
          var a2 = z(e3);
          return o2 === t ? a2 ? n2 in a2 ? a2[n2] : a2.document.documentElement[i3] : e3[i3] : (a2 ? a2.scrollTo(r2 ? st(a2).scrollLeft() : o2, r2 ? o2 : st(a2).scrollTop()) : e3[i3] = o2, t);
        }, e2, i2, arguments.length, null);
      };
    }), st.each({ Height: "height", Width: "width" }, function(e2, n2) {
      st.each({ padding: "inner" + e2, content: n2, "": "outer" + e2 }, function(r2, i2) {
        st.fn[i2] = function(i3, o2) {
          var a2 = arguments.length && (r2 || "boolean" != typeof i3), s2 = r2 || (i3 === true || o2 === true ? "margin" : "border");
          return st.access(this, function(n3, r3, i4) {
            var o3;
            return st.isWindow(n3) ? n3.document.documentElement["client" + e2] : 9 === n3.nodeType ? (o3 = n3.documentElement, Math.max(n3.body["scroll" + e2], o3["scroll" + e2], n3.body["offset" + e2], o3["offset" + e2], o3["client" + e2])) : i4 === t ? st.css(n3, r3, s2) : st.style(n3, r3, i4, s2);
          }, n2, a2 ? i3 : t, a2, null);
        };
      });
    }), e.jQuery = e.$ = st, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
      return st;
    });
  })(window);
})();
/*! jQuery v1.9.0 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license */
