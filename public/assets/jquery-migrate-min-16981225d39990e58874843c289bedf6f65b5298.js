(() => {
  // app/javascript/jquery-migrate-min.js
  jQuery.migrateMute === void 0 && (jQuery.migrateMute = true), function(e, t, n) {
    function r(n2) {
      o[n2] || (o[n2] = true, e.migrateWarnings.push(n2), t.console && console.warn && !e.migrateMute && (console.warn("JQMIGRATE: " + n2), e.migrateTrace && console.trace && console.trace()));
    }
    function a(t2, a2, o2, i2) {
      if (Object.defineProperty)
        try {
          return Object.defineProperty(t2, a2, { configurable: true, enumerable: true, get: function() {
            return r(i2), o2;
          }, set: function(e2) {
            r(i2), o2 = e2;
          } }), n;
        } catch (s2) {
        }
      e._definePropertyBroken = true, t2[a2] = o2;
    }
    var o = {};
    e.migrateWarnings = [], !e.migrateMute && t.console && console.log && console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = true), e.migrateReset = function() {
      o = {}, e.migrateWarnings.length = 0;
    }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
    var i = e("<input/>", { size: 1 }).attr("size") && e.attrFn, s = e.attr, u = e.attrHooks.value && e.attrHooks.value.get || function() {
      return null;
    }, c = e.attrHooks.value && e.attrHooks.value.set || function() {
      return n;
    }, l = /^(?:input|button)$/i, d = /^[238]$/, p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, f = /^(?:checked|selected)$/i;
    a(e, "attrFn", i || {}, "jQuery.attrFn is deprecated"), e.attr = function(t2, a2, o2, u2) {
      var c2 = a2.toLowerCase(), g2 = t2 && t2.nodeType;
      return u2 && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t2 && !d.test(g2) && (i ? a2 in i : e.isFunction(e.fn[a2]))) ? e(t2)[a2](o2) : ("type" === a2 && o2 !== n && l.test(t2.nodeName) && t2.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c2] && p.test(c2) && (e.attrHooks[c2] = { get: function(t3, r2) {
        var a3, o3 = e.prop(t3, r2);
        return o3 === true || "boolean" != typeof o3 && (a3 = t3.getAttributeNode(r2)) && a3.nodeValue !== false ? r2.toLowerCase() : n;
      }, set: function(t3, n2, r2) {
        var a3;
        return n2 === false ? e.removeAttr(t3, r2) : (a3 = e.propFix[r2] || r2, a3 in t3 && (t3[a3] = true), t3.setAttribute(r2, r2.toLowerCase())), r2;
      } }, f.test(c2) && r("jQuery.fn.attr('" + c2 + "') may use property instead of attribute")), s.call(e, t2, a2, o2));
    }, e.attrHooks.value = { get: function(e2, t2) {
      var n2 = (e2.nodeName || "").toLowerCase();
      return "button" === n2 ? u.apply(this, arguments) : ("input" !== n2 && "option" !== n2 && r("jQuery.fn.attr('value') no longer gets properties"), t2 in e2 ? e2.value : null);
    }, set: function(e2, t2) {
      var a2 = (e2.nodeName || "").toLowerCase();
      return "button" === a2 ? c.apply(this, arguments) : ("input" !== a2 && "option" !== a2 && r("jQuery.fn.attr('value', val) no longer sets properties"), e2.value = t2, n);
    } };
    var g, h, v = e.fn.init, m = e.parseJSON, y = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
    e.fn.init = function(t2, n2, a2) {
      var o2;
      return t2 && "string" == typeof t2 && !e.isPlainObject(n2) && (o2 = y.exec(t2)) && o2[1] && ("<" !== t2.charAt(0) && r("$(html) HTML strings must start with '<' character"), n2 && n2.context && (n2 = n2.context), e.parseHTML) ? v.call(this, e.parseHTML(e.trim(t2), n2, true), n2, a2) : v.apply(this, arguments);
    }, e.fn.init.prototype = e.fn, e.parseJSON = function(e2) {
      return e2 || null === e2 ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null);
    }, e.uaMatch = function(e2) {
      e2 = e2.toLowerCase();
      var t2 = /(chrome)[ \/]([\w.]+)/.exec(e2) || /(webkit)[ \/]([\w.]+)/.exec(e2) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e2) || /(msie) ([\w.]+)/.exec(e2) || 0 > e2.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e2) || [];
      return { browser: t2[1] || "", version: t2[2] || "0" };
    }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = true, h.version = g.version), h.chrome ? h.webkit = true : h.webkit && (h.safari = true), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function() {
      function t2(e2, n3) {
        return new t2.fn.init(e2, n3);
      }
      e.extend(true, t2, this), t2.superclass = this, t2.fn = t2.prototype = this(), t2.fn.constructor = t2, t2.sub = this.sub, t2.fn.init = function(r2, a2) {
        return a2 && a2 instanceof e && !(a2 instanceof t2) && (a2 = t2(a2)), e.fn.init.call(this, r2, a2, n2);
      }, t2.fn.init.prototype = t2.fn;
      var n2 = t2(document);
      return r("jQuery.sub() is deprecated"), t2;
    }, e.ajaxSetup({ converters: { "text json": e.parseJSON } });
    var b = e.fn.data;
    e.fn.data = function(t2) {
      var a2, o2, i2 = this[0];
      return !i2 || "events" !== t2 || 1 !== arguments.length || (a2 = e.data(i2, t2), o2 = e._data(i2, t2), a2 !== n && a2 !== o2 || o2 === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), o2);
    };
    var j = /\/(java|ecma)script/i, w = e.fn.andSelf || e.fn.addBack;
    e.fn.andSelf = function() {
      return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments);
    }, e.clean || (e.clean = function(t2, a2, o2, i2) {
      a2 = a2 || document, a2 = !a2.nodeType && a2[0] || a2, a2 = a2.ownerDocument || a2, r("jQuery.clean() is deprecated");
      var s2, u2, c2, l2, d2 = [];
      if (e.merge(d2, e.buildFragment(t2, a2).childNodes), o2)
        for (c2 = function(e2) {
          return !e2.type || j.test(e2.type) ? i2 ? i2.push(e2.parentNode ? e2.parentNode.removeChild(e2) : e2) : o2.appendChild(e2) : n;
        }, s2 = 0; null != (u2 = d2[s2]); s2++)
          e.nodeName(u2, "script") && c2(u2) || (o2.appendChild(u2), u2.getElementsByTagName !== n && (l2 = e.grep(e.merge([], u2.getElementsByTagName("script")), c2), d2.splice.apply(d2, [s2 + 1, 0].concat(l2)), s2 += l2.length));
      return d2;
    });
    var Q = e.event.add, x = e.event.remove, k = e.event.trigger, N = e.fn.toggle, C = e.fn.live, S = e.fn.die, T = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", M = RegExp("\\b(?:" + T + ")\\b"), H = /(?:^|\s)hover(\.\S+|)\b/, A = function(t2) {
      return "string" != typeof t2 || e.event.special.hover ? t2 : (H.test(t2) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t2 && t2.replace(H, "mouseenter$1 mouseleave$1"));
    };
    e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function(e2, t2, n2, a2, o2) {
      e2 !== document && M.test(t2) && r("AJAX events should be attached to document: " + t2), Q.call(this, e2, A(t2 || ""), n2, a2, o2);
    }, e.event.remove = function(e2, t2, n2, r2, a2) {
      x.call(this, e2, A(t2) || "", n2, r2, a2);
    }, e.fn.error = function() {
      var e2 = Array.prototype.slice.call(arguments, 0);
      return r("jQuery.fn.error() is deprecated"), e2.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e2) : (this.triggerHandler.apply(this, e2), this);
    }, e.fn.toggle = function(t2, n2) {
      if (!e.isFunction(t2) || !e.isFunction(n2))
        return N.apply(this, arguments);
      r("jQuery.fn.toggle(handler, handler...) is deprecated");
      var a2 = arguments, o2 = t2.guid || e.guid++, i2 = 0, s2 = function(n3) {
        var r2 = (e._data(this, "lastToggle" + t2.guid) || 0) % i2;
        return e._data(this, "lastToggle" + t2.guid, r2 + 1), n3.preventDefault(), a2[r2].apply(this, arguments) || false;
      };
      for (s2.guid = o2; a2.length > i2; )
        a2[i2++].guid = o2;
      return this.click(s2);
    }, e.fn.live = function(t2, n2, a2) {
      return r("jQuery.fn.live() is deprecated"), C ? C.apply(this, arguments) : (e(this.context).on(t2, this.selector, n2, a2), this);
    }, e.fn.die = function(t2, n2) {
      return r("jQuery.fn.die() is deprecated"), S ? S.apply(this, arguments) : (e(this.context).off(t2, this.selector || "**", n2), this);
    }, e.event.trigger = function(e2, t2, n2, a2) {
      return n2 || M.test(e2) || r("Global events are undocumented and deprecated"), k.call(this, e2, t2, n2 || document, a2);
    }, e.each(T.split("|"), function(t2, n2) {
      e.event.special[n2] = { setup: function() {
        var t3 = this;
        return t3 !== document && (e.event.add(document, n2 + "." + e.guid, function() {
          e.event.trigger(n2, null, t3, true);
        }), e._data(this, n2, e.guid++)), false;
      }, teardown: function() {
        return this !== document && e.event.remove(document, n2 + "." + e._data(this, n2)), false;
      } };
    });
  }(jQuery, window);
})();
/*! jQuery Migrate v1.1.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
