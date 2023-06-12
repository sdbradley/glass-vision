(() => {
  // app/javascript/jquery-ui.min.js
  (function(t, e) {
    function i(e2, i2) {
      var n2, o2, a, r = e2.nodeName.toLowerCase();
      return "area" === r ? (n2 = e2.parentNode, o2 = n2.name, e2.href && o2 && "map" === n2.nodeName.toLowerCase() ? (a = t("img[usemap=#" + o2 + "]")[0], !!a && s(a)) : false) : (/input|select|textarea|button|object/.test(r) ? !e2.disabled : "a" === r ? e2.href || i2 : i2) && s(e2);
    }
    function s(e2) {
      return t.expr.filters.visible(e2) && !t(e2).parents().addBack().filter(function() {
        return "hidden" === t.css(this, "visibility");
      }).length;
    }
    var n = 0, o = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, { version: "1.10.2", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), t.fn.extend({ focus: function(e2) {
      return function(i2, s2) {
        return "number" == typeof i2 ? this.each(function() {
          var e3 = this;
          setTimeout(function() {
            t(e3).focus(), s2 && s2.call(e3);
          }, i2);
        }) : e2.apply(this, arguments);
      };
    }(t.fn.focus), scrollParent: function() {
      var e2;
      return e2 = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
        return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"));
      }).eq(0) : this.parents().filter(function() {
        return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"));
      }).eq(0), /fixed/.test(this.css("position")) || !e2.length ? t(document) : e2;
    }, zIndex: function(i2) {
      if (i2 !== e)
        return this.css("zIndex", i2);
      if (this.length)
        for (var s2, n2, o2 = t(this[0]); o2.length && o2[0] !== document; ) {
          if (s2 = o2.css("position"), ("absolute" === s2 || "relative" === s2 || "fixed" === s2) && (n2 = parseInt(o2.css("zIndex"), 10), !isNaN(n2) && 0 !== n2))
            return n2;
          o2 = o2.parent();
        }
      return 0;
    }, uniqueId: function() {
      return this.each(function() {
        this.id || (this.id = "ui-id-" + ++n);
      });
    }, removeUniqueId: function() {
      return this.each(function() {
        o.test(this.id) && t(this).removeAttr("id");
      });
    } }), t.extend(t.expr[":"], { data: t.expr.createPseudo ? t.expr.createPseudo(function(e2) {
      return function(i2) {
        return !!t.data(i2, e2);
      };
    }) : function(e2, i2, s2) {
      return !!t.data(e2, s2[3]);
    }, focusable: function(e2) {
      return i(e2, !isNaN(t.attr(e2, "tabindex")));
    }, tabbable: function(e2) {
      var s2 = t.attr(e2, "tabindex"), n2 = isNaN(s2);
      return (n2 || s2 >= 0) && i(e2, !n2);
    } }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i2, s2) {
      function n2(e2, i3, s3, n3) {
        return t.each(o2, function() {
          i3 -= parseFloat(t.css(e2, "padding" + this)) || 0, s3 && (i3 -= parseFloat(t.css(e2, "border" + this + "Width")) || 0), n3 && (i3 -= parseFloat(t.css(e2, "margin" + this)) || 0);
        }), i3;
      }
      var o2 = "Width" === s2 ? ["Left", "Right"] : ["Top", "Bottom"], a = s2.toLowerCase(), r = { innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight };
      t.fn["inner" + s2] = function(i3) {
        return i3 === e ? r["inner" + s2].call(this) : this.each(function() {
          t(this).css(a, n2(this, i3) + "px");
        });
      }, t.fn["outer" + s2] = function(e2, i3) {
        return "number" != typeof e2 ? r["outer" + s2].call(this, e2) : this.each(function() {
          t(this).css(a, n2(this, e2, true, i3) + "px");
        });
      };
    }), t.fn.addBack || (t.fn.addBack = function(t2) {
      return this.add(null == t2 ? this.prevObject : this.prevObject.filter(t2));
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e2) {
      return function(i2) {
        return arguments.length ? e2.call(this, t.camelCase(i2)) : e2.call(this);
      };
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({ disableSelection: function() {
      return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t2) {
        t2.preventDefault();
      });
    }, enableSelection: function() {
      return this.unbind(".ui-disableSelection");
    } }), t.extend(t.ui, { plugin: { add: function(e2, i2, s2) {
      var n2, o2 = t.ui[e2].prototype;
      for (n2 in s2)
        o2.plugins[n2] = o2.plugins[n2] || [], o2.plugins[n2].push([i2, s2[n2]]);
    }, call: function(t2, e2, i2) {
      var s2, n2 = t2.plugins[e2];
      if (n2 && t2.element[0].parentNode && 11 !== t2.element[0].parentNode.nodeType)
        for (s2 = 0; n2.length > s2; s2++)
          t2.options[n2[s2][0]] && n2[s2][1].apply(t2.element, i2);
    } }, hasScroll: function(e2, i2) {
      if ("hidden" === t(e2).css("overflow"))
        return false;
      var s2 = i2 && "left" === i2 ? "scrollLeft" : "scrollTop", n2 = false;
      return e2[s2] > 0 ? true : (e2[s2] = 1, n2 = e2[s2] > 0, e2[s2] = 0, n2);
    } });
  })(jQuery), function(t, e) {
    var i = 0, s = Array.prototype.slice, n = t.cleanData;
    t.cleanData = function(e2) {
      for (var i2, s2 = 0; null != (i2 = e2[s2]); s2++)
        try {
          t(i2).triggerHandler("remove");
        } catch (o) {
        }
      n(e2);
    }, t.widget = function(i2, s2, n2) {
      var o, a, r, h, l = {}, c = i2.split(".")[0];
      i2 = i2.split(".")[1], o = c + "-" + i2, n2 || (n2 = s2, s2 = t.Widget), t.expr[":"][o.toLowerCase()] = function(e2) {
        return !!t.data(e2, o);
      }, t[c] = t[c] || {}, a = t[c][i2], r = t[c][i2] = function(t2, i3) {
        return this._createWidget ? (arguments.length && this._createWidget(t2, i3), e) : new r(t2, i3);
      }, t.extend(r, a, { version: n2.version, _proto: t.extend({}, n2), _childConstructors: [] }), h = new s2(), h.options = t.widget.extend({}, h.options), t.each(n2, function(i3, n3) {
        return t.isFunction(n3) ? (l[i3] = function() {
          var t2 = function() {
            return s2.prototype[i3].apply(this, arguments);
          }, e2 = function(t3) {
            return s2.prototype[i3].apply(this, t3);
          };
          return function() {
            var i4, s3 = this._super, o2 = this._superApply;
            return this._super = t2, this._superApply = e2, i4 = n3.apply(this, arguments), this._super = s3, this._superApply = o2, i4;
          };
        }(), e) : (l[i3] = n3, e);
      }), r.prototype = t.widget.extend(h, { widgetEventPrefix: a ? h.widgetEventPrefix : i2 }, l, { constructor: r, namespace: c, widgetName: i2, widgetFullName: o }), a ? (t.each(a._childConstructors, function(e2, i3) {
        var s3 = i3.prototype;
        t.widget(s3.namespace + "." + s3.widgetName, r, i3._proto);
      }), delete a._childConstructors) : s2._childConstructors.push(r), t.widget.bridge(i2, r);
    }, t.widget.extend = function(i2) {
      for (var n2, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++)
        for (n2 in a[r])
          o = a[r][n2], a[r].hasOwnProperty(n2) && o !== e && (i2[n2] = t.isPlainObject(o) ? t.isPlainObject(i2[n2]) ? t.widget.extend({}, i2[n2], o) : t.widget.extend({}, o) : o);
      return i2;
    }, t.widget.bridge = function(i2, n2) {
      var o = n2.prototype.widgetFullName || i2;
      t.fn[i2] = function(a) {
        var r = "string" == typeof a, h = s.call(arguments, 1), l = this;
        return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a, r ? this.each(function() {
          var s2, n3 = t.data(this, o);
          return n3 ? t.isFunction(n3[a]) && "_" !== a.charAt(0) ? (s2 = n3[a].apply(n3, h), s2 !== n3 && s2 !== e ? (l = s2 && s2.jquery ? l.pushStack(s2.get()) : s2, false) : e) : t.error("no such method '" + a + "' for " + i2 + " widget instance") : t.error("cannot call methods on " + i2 + " prior to initialization; attempted to call method '" + a + "'");
        }) : this.each(function() {
          var e2 = t.data(this, o);
          e2 ? e2.option(a || {})._init() : t.data(this, o, new n2(a, this));
        }), l;
      };
    }, t.Widget = function() {
    }, t.Widget._childConstructors = [], t.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { disabled: false, create: null }, _createWidget: function(e2, s2) {
      s2 = t(s2 || this.defaultElement || this)[0], this.element = t(s2), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e2), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s2 !== this && (t.data(s2, this.widgetFullName, this), this._on(true, this.element, { remove: function(t2) {
        t2.target === s2 && this.destroy();
      } }), this.document = t(s2.style ? s2.ownerDocument : s2.document || s2), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
    }, _getCreateOptions: t.noop, _getCreateEventData: t.noop, _create: t.noop, _init: t.noop, destroy: function() {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");
    }, _destroy: t.noop, widget: function() {
      return this.element;
    }, option: function(i2, s2) {
      var n2, o, a, r = i2;
      if (0 === arguments.length)
        return t.widget.extend({}, this.options);
      if ("string" == typeof i2)
        if (r = {}, n2 = i2.split("."), i2 = n2.shift(), n2.length) {
          for (o = r[i2] = t.widget.extend({}, this.options[i2]), a = 0; n2.length - 1 > a; a++)
            o[n2[a]] = o[n2[a]] || {}, o = o[n2[a]];
          if (i2 = n2.pop(), s2 === e)
            return o[i2] === e ? null : o[i2];
          o[i2] = s2;
        } else {
          if (s2 === e)
            return this.options[i2] === e ? null : this.options[i2];
          r[i2] = s2;
        }
      return this._setOptions(r), this;
    }, _setOptions: function(t2) {
      var e2;
      for (e2 in t2)
        this._setOption(e2, t2[e2]);
      return this;
    }, _setOption: function(t2, e2) {
      return this.options[t2] = e2, "disabled" === t2 && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e2).attr("aria-disabled", e2), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this;
    }, enable: function() {
      return this._setOption("disabled", false);
    }, disable: function() {
      return this._setOption("disabled", true);
    }, _on: function(i2, s2, n2) {
      var o, a = this;
      "boolean" != typeof i2 && (n2 = s2, s2 = i2, i2 = false), n2 ? (s2 = o = t(s2), this.bindings = this.bindings.add(s2)) : (n2 = s2, s2 = this.element, o = this.widget()), t.each(n2, function(n3, r) {
        function h() {
          return i2 || a.options.disabled !== true && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e;
        }
        "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
        var l = n3.match(/^(\w+)\s*(.*)$/), c = l[1] + a.eventNamespace, u = l[2];
        u ? o.delegate(u, c, h) : s2.bind(c, h);
      });
    }, _off: function(t2, e2) {
      e2 = (e2 || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t2.unbind(e2).undelegate(e2);
    }, _delay: function(t2, e2) {
      function i2() {
        return ("string" == typeof t2 ? s2[t2] : t2).apply(s2, arguments);
      }
      var s2 = this;
      return setTimeout(i2, e2 || 0);
    }, _hoverable: function(e2) {
      this.hoverable = this.hoverable.add(e2), this._on(e2, { mouseenter: function(e3) {
        t(e3.currentTarget).addClass("ui-state-hover");
      }, mouseleave: function(e3) {
        t(e3.currentTarget).removeClass("ui-state-hover");
      } });
    }, _focusable: function(e2) {
      this.focusable = this.focusable.add(e2), this._on(e2, { focusin: function(e3) {
        t(e3.currentTarget).addClass("ui-state-focus");
      }, focusout: function(e3) {
        t(e3.currentTarget).removeClass("ui-state-focus");
      } });
    }, _trigger: function(e2, i2, s2) {
      var n2, o, a = this.options[e2];
      if (s2 = s2 || {}, i2 = t.Event(i2), i2.type = (e2 === this.widgetEventPrefix ? e2 : this.widgetEventPrefix + e2).toLowerCase(), i2.target = this.element[0], o = i2.originalEvent)
        for (n2 in o)
          n2 in i2 || (i2[n2] = o[n2]);
      return this.element.trigger(i2, s2), !(t.isFunction(a) && a.apply(this.element[0], [i2].concat(s2)) === false || i2.isDefaultPrevented());
    } }, t.each({ show: "fadeIn", hide: "fadeOut" }, function(e2, i2) {
      t.Widget.prototype["_" + e2] = function(s2, n2, o) {
        "string" == typeof n2 && (n2 = { effect: n2 });
        var a, r = n2 ? n2 === true || "number" == typeof n2 ? i2 : n2.effect || i2 : e2;
        n2 = n2 || {}, "number" == typeof n2 && (n2 = { duration: n2 }), a = !t.isEmptyObject(n2), n2.complete = o, n2.delay && s2.delay(n2.delay), a && t.effects && t.effects.effect[r] ? s2[e2](n2) : r !== e2 && s2[r] ? s2[r](n2.duration, n2.easing, o) : s2.queue(function(i3) {
          t(this)[e2](), o && o.call(s2[0]), i3();
        });
      };
    });
  }(jQuery), function(t) {
    var e = false;
    t(document).mouseup(function() {
      e = false;
    }), t.widget("ui.mouse", { version: "1.10.2", options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 }, _mouseInit: function() {
      var e2 = this;
      this.element.bind("mousedown." + this.widgetName, function(t2) {
        return e2._mouseDown(t2);
      }).bind("click." + this.widgetName, function(i) {
        return true === t.data(i.target, e2.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e2.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), false) : void 0;
      }), this.started = false;
    }, _mouseDestroy: function() {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
    }, _mouseDown: function(i) {
      if (!e) {
        this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
        var s = this, n = 1 === i.which, o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : false;
        return n && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
          s.mouseDelayMet = true;
        }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== false, !this._mouseStarted) ? (i.preventDefault(), true) : (true === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t2) {
          return s._mouseMove(t2);
        }, this._mouseUpDelegate = function(t2) {
          return s._mouseUp(t2);
        }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = true, true)) : true;
      }
    }, _mouseMove: function(e2) {
      return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e2.button ? this._mouseUp(e2) : this._mouseStarted ? (this._mouseDrag(e2), e2.preventDefault()) : (this._mouseDistanceMet(e2) && this._mouseDelayMet(e2) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e2) !== false, this._mouseStarted ? this._mouseDrag(e2) : this._mouseUp(e2)), !this._mouseStarted);
    }, _mouseUp: function(e2) {
      return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = false, e2.target === this._mouseDownEvent.target && t.data(e2.target, this.widgetName + ".preventClickEvent", true), this._mouseStop(e2)), false;
    }, _mouseDistanceMet: function(t2) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t2.pageX), Math.abs(this._mouseDownEvent.pageY - t2.pageY)) >= this.options.distance;
    }, _mouseDelayMet: function() {
      return this.mouseDelayMet;
    }, _mouseStart: function() {
    }, _mouseDrag: function() {
    }, _mouseStop: function() {
    }, _mouseCapture: function() {
      return true;
    } });
  }(jQuery), function(t) {
    t.widget("ui.draggable", t.ui.mouse, { version: "1.10.2", widgetEventPrefix: "drag", options: { addClasses: true, appendTo: "parent", axis: false, connectToSortable: false, containment: false, cursor: "auto", cursorAt: false, grid: false, handle: false, helper: "original", iframeFix: false, opacity: false, refreshPositions: false, revert: false, revertDuration: 500, scope: "default", scroll: true, scrollSensitivity: 20, scrollSpeed: 20, snap: false, snapMode: "both", snapTolerance: 20, stack: false, zIndex: false, drag: null, start: null, stop: null }, _create: function() {
      "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit();
    }, _destroy: function() {
      this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy();
    }, _mouseCapture: function(e) {
      var i = this.options;
      return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? false : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === true ? "iframe" : i.iframeFix).each(function() {
        t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({ width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3 }).css(t(this).offset()).appendTo("body");
      }), true) : false);
    }, _mouseStart: function(e) {
      var i = this.options;
      return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), i.containment && this._setContainment(), this._trigger("start", e) === false ? (this._clear(), false) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, true), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), true);
    }, _mouseDrag: function(e, i) {
      if (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
        var s = this._uiHash();
        if (this._trigger("drag", e, s) === false)
          return this._mouseUp({}), false;
        this.position = s.position;
      }
      return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), false;
    }, _mouseStop: function(e) {
      var i, s = this, n = false, o = false;
      for (t.ui.ddmanager && !this.options.dropBehaviour && (o = t.ui.ddmanager.drop(this, e)), this.dropped && (o = this.dropped, this.dropped = false), i = this.element[0]; i && (i = i.parentNode); )
        i === document && (n = true);
      return n || "original" !== this.options.helper ? ("invalid" === this.options.revert && !o || "valid" === this.options.revert && o || this.options.revert === true || t.isFunction(this.options.revert) && this.options.revert.call(this.element, o) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
        s._trigger("stop", e) !== false && s._clear();
      }) : this._trigger("stop", e) !== false && this._clear(), false) : false;
    }, _mouseUp: function(e) {
      return t("div.ui-draggable-iframeFix").each(function() {
        this.parentNode.removeChild(this);
      }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e);
    }, cancel: function() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this;
    }, _getHandle: function(e) {
      return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : true;
    }, _createHelper: function(e) {
      var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
      return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s;
    }, _adjustOffsetFromHelper: function(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
    }, _getParentOffset: function() {
      this.offsetParent = this.helper.offsetParent();
      var e = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) };
    }, _getRelativeOffset: function() {
      if ("relative" === this.cssPosition) {
        var t2 = this.element.position();
        return { top: t2.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t2.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
      }
      return { top: 0, left: 0 };
    }, _cacheMargins: function() {
      this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 };
    }, _cacheHelperProportions: function() {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    }, _setContainment: function() {
      var e, i, s, n = this.options;
      if ("parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = ["document" === n.containment ? 0 : t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" === n.containment ? 0 : t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" === n.containment ? 0 : t(window).scrollLeft()) + t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? 0 : t(window).scrollTop()) + (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || n.containment.constructor === Array)
        n.containment.constructor === Array && (this.containment = n.containment);
      else {
        if (i = t(n.containment), s = i[0], !s)
          return;
        e = "hidden" !== t(s).css("overflow"), this.containment = [(parseInt(t(s).css("borderLeftWidth"), 10) || 0) + (parseInt(t(s).css("paddingLeft"), 10) || 0), (parseInt(t(s).css("borderTopWidth"), 10) || 0) + (parseInt(t(s).css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(t(s).css("borderRightWidth"), 10) || 0) - (parseInt(t(s).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(t(s).css("borderBottomWidth"), 10) || 0) - (parseInt(t(s).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i;
      }
    }, _convertPositionTo: function(e, i) {
      i || (i = this.position);
      var s = "absolute" === e ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(n[0].tagName);
      return { top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s };
    }, _generatePosition: function(e) {
      var i, s, n, o, a = this.options, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName), l = e.pageX, c = e.pageY;
      return this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (c = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (c = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, c = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o)), { top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()), left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft()) };
    }, _clear: function() {
      this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = false;
    }, _trigger: function(e, i, s) {
      return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s);
    }, plugins: {}, _uiHash: function() {
      return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
    } }), t.ui.plugin.add("draggable", "connectToSortable", { start: function(e, i) {
      var s = t(this).data("ui-draggable"), n = s.options, o = t.extend({}, i, { item: s.element });
      s.sortables = [], t(n.connectToSortable).each(function() {
        var i2 = t.data(this, "ui-sortable");
        i2 && !i2.options.disabled && (s.sortables.push({ instance: i2, shouldRevert: i2.options.revert }), i2.refreshPositions(), i2._trigger("activate", e, o));
      });
    }, stop: function(e, i) {
      var s = t(this).data("ui-draggable"), n = t.extend({}, i, { item: s.element });
      t.each(s.sortables, function() {
        this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = true, this.instance.cancelHelperRemoval = false, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({ top: "auto", left: "auto" })) : (this.instance.cancelHelperRemoval = false, this.instance._trigger("deactivate", e, n));
      });
    }, drag: function(e, i) {
      var s = t(this).data("ui-draggable"), n = this;
      t.each(s.sortables, function() {
        var o = false, a = this;
        this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = true, t.each(s.sortables, function() {
          return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && t.contains(a.instance.element[0], this.instance.element[0]) && (o = false), o;
        })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
          return i.helper[0];
        }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, true), this.instance._mouseStart(e, true, true), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = true, this.instance.options.revert = false, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, true), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = false);
      });
    } }), t.ui.plugin.add("draggable", "cursor", { start: function() {
      var e = t("body"), i = t(this).data("ui-draggable").options;
      e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor);
    }, stop: function() {
      var e = t(this).data("ui-draggable").options;
      e._cursor && t("body").css("cursor", e._cursor);
    } }), t.ui.plugin.add("draggable", "opacity", { start: function(e, i) {
      var s = t(i.helper), n = t(this).data("ui-draggable").options;
      s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity);
    }, stop: function(e, i) {
      var s = t(this).data("ui-draggable").options;
      s._opacity && t(i.helper).css("opacity", s._opacity);
    } }), t.ui.plugin.add("draggable", "scroll", { start: function() {
      var e = t(this).data("ui-draggable");
      e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset());
    }, drag: function(e) {
      var i = t(this).data("ui-draggable"), s = i.options, n = false;
      i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))), n !== false && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e);
    } }), t.ui.plugin.add("draggable", "snap", { start: function() {
      var e = t(this).data("ui-draggable"), i = e.options;
      e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
        var i2 = t(this), s = i2.offset();
        this !== e.element[0] && e.snapElements.push({ item: this, width: i2.outerWidth(), height: i2.outerHeight(), top: s.top, left: s.left });
      });
    }, drag: function(e, i) {
      var s, n, o, a, r, h, l, c, u, d, p = t(this).data("ui-draggable"), f = p.options, g = f.snapTolerance, m = i.offset.left, v = m + p.helperProportions.width, _ = i.offset.top, b = _ + p.helperProportions.height;
      for (u = p.snapElements.length - 1; u >= 0; u--)
        r = p.snapElements[u].left, h = r + p.snapElements[u].width, l = p.snapElements[u].top, c = l + p.snapElements[u].height, m > r - g && h + g > m && _ > l - g && c + g > _ || m > r - g && h + g > m && b > l - g && c + g > b || v > r - g && h + g > v && _ > l - g && c + g > _ || v > r - g && h + g > v && b > l - g && c + g > b ? ("inner" !== f.snapMode && (s = g >= Math.abs(l - b), n = g >= Math.abs(c - _), o = g >= Math.abs(r - v), a = g >= Math.abs(h - m), s && (i.position.top = p._convertPositionTo("relative", { top: l - p.helperProportions.height, left: 0 }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", { top: c, left: 0 }).top - p.margins.top), o && (i.position.left = p._convertPositionTo("relative", { top: 0, left: r - p.helperProportions.width }).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", { top: 0, left: h }).left - p.margins.left)), d = s || n || o || a, "outer" !== f.snapMode && (s = g >= Math.abs(l - _), n = g >= Math.abs(c - b), o = g >= Math.abs(r - m), a = g >= Math.abs(h - v), s && (i.position.top = p._convertPositionTo("relative", { top: l, left: 0 }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", { top: c - p.helperProportions.height, left: 0 }).top - p.margins.top), o && (i.position.left = p._convertPositionTo("relative", { top: 0, left: r }).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", { top: 0, left: h - p.helperProportions.width }).left - p.margins.left)), !p.snapElements[u].snapping && (s || n || o || a || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), { snapItem: p.snapElements[u].item })), p.snapElements[u].snapping = s || n || o || a || d) : (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), { snapItem: p.snapElements[u].item })), p.snapElements[u].snapping = false);
    } }), t.ui.plugin.add("draggable", "stack", { start: function() {
      var e, i = this.data("ui-draggable").options, s = t.makeArray(t(i.stack)).sort(function(e2, i2) {
        return (parseInt(t(e2).css("zIndex"), 10) || 0) - (parseInt(t(i2).css("zIndex"), 10) || 0);
      });
      s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function(i2) {
        t(this).css("zIndex", e + i2);
      }), this.css("zIndex", e + s.length));
    } }), t.ui.plugin.add("draggable", "zIndex", { start: function(e, i) {
      var s = t(i.helper), n = t(this).data("ui-draggable").options;
      s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex);
    }, stop: function(e, i) {
      var s = t(this).data("ui-draggable").options;
      s._zIndex && t(i.helper).css("zIndex", s._zIndex);
    } });
  }(jQuery), function(t) {
    function e(t2, e2, i) {
      return t2 > e2 && e2 + i > t2;
    }
    t.widget("ui.droppable", { version: "1.10.2", widgetEventPrefix: "drop", options: { accept: "*", activeClass: false, addClasses: true, greedy: false, hoverClass: false, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null }, _create: function() {
      var e2 = this.options, i = e2.accept;
      this.isover = false, this.isout = true, this.accept = t.isFunction(i) ? i : function(t2) {
        return t2.is(i);
      }, this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight }, t.ui.ddmanager.droppables[e2.scope] = t.ui.ddmanager.droppables[e2.scope] || [], t.ui.ddmanager.droppables[e2.scope].push(this), e2.addClasses && this.element.addClass("ui-droppable");
    }, _destroy: function() {
      for (var e2 = 0, i = t.ui.ddmanager.droppables[this.options.scope]; i.length > e2; e2++)
        i[e2] === this && i.splice(e2, 1);
      this.element.removeClass("ui-droppable ui-droppable-disabled");
    }, _setOption: function(e2, i) {
      "accept" === e2 && (this.accept = t.isFunction(i) ? i : function(t2) {
        return t2.is(i);
      }), t.Widget.prototype._setOption.apply(this, arguments);
    }, _activate: function(e2) {
      var i = t.ui.ddmanager.current;
      this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e2, this.ui(i));
    }, _deactivate: function(e2) {
      var i = t.ui.ddmanager.current;
      this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e2, this.ui(i));
    }, _over: function(e2) {
      var i = t.ui.ddmanager.current;
      i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e2, this.ui(i)));
    }, _out: function(e2) {
      var i = t.ui.ddmanager.current;
      i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e2, this.ui(i)));
    }, _drop: function(e2, i) {
      var s = i || t.ui.ddmanager.current, n = false;
      return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
        var e3 = t.data(this, "ui-droppable");
        return e3.options.greedy && !e3.options.disabled && e3.options.scope === s.options.scope && e3.accept.call(e3.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e3, { offset: e3.element.offset() }), e3.options.tolerance) ? (n = true, false) : void 0;
      }), n ? false : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e2, this.ui(s)), this.element) : false) : false;
    }, ui: function(t2) {
      return { draggable: t2.currentItem || t2.element, helper: t2.helper, position: t2.position, offset: t2.positionAbs };
    } }), t.ui.intersect = function(t2, i, s) {
      if (!i.offset)
        return false;
      var n, o, a = (t2.positionAbs || t2.position.absolute).left, r = a + t2.helperProportions.width, h = (t2.positionAbs || t2.position.absolute).top, l = h + t2.helperProportions.height, c = i.offset.left, u = c + i.proportions.width, d = i.offset.top, p = d + i.proportions.height;
      switch (s) {
        case "fit":
          return a >= c && u >= r && h >= d && p >= l;
        case "intersect":
          return a + t2.helperProportions.width / 2 > c && u > r - t2.helperProportions.width / 2 && h + t2.helperProportions.height / 2 > d && p > l - t2.helperProportions.height / 2;
        case "pointer":
          return n = (t2.positionAbs || t2.position.absolute).left + (t2.clickOffset || t2.offset.click).left, o = (t2.positionAbs || t2.position.absolute).top + (t2.clickOffset || t2.offset.click).top, e(o, d, i.proportions.height) && e(n, c, i.proportions.width);
        case "touch":
          return (h >= d && p >= h || l >= d && p >= l || d > h && l > p) && (a >= c && u >= a || r >= c && u >= r || c > a && r > u);
        default:
          return false;
      }
    }, t.ui.ddmanager = { current: null, droppables: { "default": [] }, prepareOffsets: function(e2, i) {
      var s, n, o = t.ui.ddmanager.droppables[e2.options.scope] || [], a = i ? i.type : null, r = (e2.currentItem || e2.element).find(":data(ui-droppable)").addBack();
      t:
        for (s = 0; o.length > s; s++)
          if (!(o[s].options.disabled || e2 && !o[s].accept.call(o[s].element[0], e2.currentItem || e2.element))) {
            for (n = 0; r.length > n; n++)
              if (r[n] === o[s].element[0]) {
                o[s].proportions.height = 0;
                continue t;
              }
            o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions = { width: o[s].element[0].offsetWidth, height: o[s].element[0].offsetHeight });
          }
    }, drop: function(e2, i) {
      var s = false;
      return t.each((t.ui.ddmanager.droppables[e2.options.scope] || []).slice(), function() {
        this.options && (!this.options.disabled && this.visible && t.ui.intersect(e2, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e2.currentItem || e2.element) && (this.isout = true, this.isover = false, this._deactivate.call(this, i)));
      }), s;
    }, dragStart: function(e2, i) {
      e2.element.parentsUntil("body").bind("scroll.droppable", function() {
        e2.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e2, i);
      });
    }, drag: function(e2, i) {
      e2.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e2, i), t.each(t.ui.ddmanager.droppables[e2.options.scope] || [], function() {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var s, n, o, a = t.ui.intersect(e2, this, this.options.tolerance), r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
          r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
            return t.data(this, "ui-droppable").options.scope === n;
          }), o.length && (s = t.data(o[0], "ui-droppable"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = false, s.isout = true, s._out.call(s, i)), this[r] = true, this["isout" === r ? "isover" : "isout"] = false, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = false, s.isover = true, s._over.call(s, i)));
        }
      });
    }, dragStop: function(e2, i) {
      e2.element.parentsUntil("body").unbind("scroll.droppable"), e2.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e2, i);
    } };
  }(jQuery), function(t) {
    function e(t2) {
      return parseInt(t2, 10) || 0;
    }
    function i(t2) {
      return !isNaN(parseInt(t2, 10));
    }
    t.widget("ui.resizable", t.ui.mouse, { version: "1.10.2", widgetEventPrefix: "resize", options: { alsoResize: false, animate: false, animateDuration: "slow", animateEasing: "swing", aspectRatio: false, autoHide: false, containment: false, ghost: false, grid: false, handles: "e,s,se", helper: false, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null }, _create: function() {
      var e2, i2, s, n, o, a = this, r = this.options;
      if (this.element.addClass("ui-resizable"), t.extend(this, { _aspectRatio: !!r.aspectRatio, aspectRatio: r.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({ position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left") })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = true, this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") }), this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })), this.originalElement.css({ margin: this.originalElement.css("margin") }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" } : "e,s,se"), this.handles.constructor === String)
        for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e2 = this.handles.split(","), this.handles = {}, i2 = 0; e2.length > i2; i2++)
          s = t.trim(e2[i2]), o = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + o + "'></div>"), n.css({ zIndex: r.zIndex }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
      this._renderAxis = function(e3) {
        var i3, s2, n2, o2;
        e3 = e3 || this.element;
        for (i3 in this.handles)
          this.handles[i3].constructor === String && (this.handles[i3] = t(this.handles[i3], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s2 = t(this.handles[i3], this.element), o2 = /sw|ne|nw|se|n|s/.test(i3) ? s2.outerHeight() : s2.outerWidth(), n2 = ["padding", /ne|nw|n/.test(i3) ? "Top" : /se|sw|s/.test(i3) ? "Bottom" : /^e$/.test(i3) ? "Right" : "Left"].join(""), e3.css(n2, o2), this._proportionallyResize()), t(this.handles[i3]).length;
      }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
        a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se");
      }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
        r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show());
      }).mouseleave(function() {
        r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide());
      })), this._mouseInit();
    }, _destroy: function() {
      this._mouseDestroy();
      var e2, i2 = function(e3) {
        t(e3).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
      };
      return this.elementIsWrapper && (i2(this.element), e2 = this.element, this.originalElement.css({ position: e2.css("position"), width: e2.outerWidth(), height: e2.outerHeight(), top: e2.css("top"), left: e2.css("left") }).insertAfter(e2), e2.remove()), this.originalElement.css("resize", this.originalResizeStyle), i2(this.originalElement), this;
    }, _mouseCapture: function(e2) {
      var i2, s, n = false;
      for (i2 in this.handles)
        s = t(this.handles[i2])[0], (s === e2.target || t.contains(s, e2.target)) && (n = true);
      return !this.options.disabled && n;
    }, _mouseStart: function(i2) {
      var s, n, o, a = this.options, r = this.element.position(), h = this.element;
      return this.resizing = true, /absolute/.test(h.css("position")) ? h.css({ position: "absolute", top: h.css("top"), left: h.css("left") }) : h.is(".ui-draggable") && h.css({ position: "absolute", top: r.top, left: r.left }), this._renderProxy(), s = e(this.helper.css("left")), n = e(this.helper.css("top")), a.containment && (s += t(a.containment).scrollLeft() || 0, n += t(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: s, top: n }, this.size = this._helper ? { width: h.outerWidth(), height: h.outerHeight() } : { width: h.width(), height: h.height() }, this.originalSize = this._helper ? { width: h.outerWidth(), height: h.outerHeight() } : { width: h.width(), height: h.height() }, this.originalPosition = { left: s, top: n }, this.sizeDiff = { width: h.outerWidth() - h.width(), height: h.outerHeight() - h.height() }, this.originalMousePosition = { left: i2.pageX, top: i2.pageY }, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === o ? this.axis + "-resize" : o), h.addClass("ui-resizable-resizing"), this._propagate("start", i2), true;
    }, _mouseDrag: function(e2) {
      var i2, s = this.helper, n = {}, o = this.originalMousePosition, a = this.axis, r = this.position.top, h = this.position.left, l = this.size.width, c = this.size.height, u = e2.pageX - o.left || 0, d = e2.pageY - o.top || 0, p = this._change[a];
      return p ? (i2 = p.apply(this, [e2, u, d]), this._updateVirtualBoundaries(e2.shiftKey), (this._aspectRatio || e2.shiftKey) && (i2 = this._updateRatio(i2, e2)), i2 = this._respectSize(i2, e2), this._updateCache(i2), this._propagate("resize", e2), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== c && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || this._trigger("resize", e2, this.ui()), false) : false;
    }, _mouseStop: function(e2) {
      this.resizing = false;
      var i2, s, n, o, a, r, h, l = this.options, c = this;
      return this._helper && (i2 = this._proportionallyResizeElements, s = i2.length && /textarea/i.test(i2[0].nodeName), n = s && t.ui.hasScroll(i2[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = { width: c.helper.width() - o, height: c.helper.height() - n }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, h = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(a, { top: h, left: r })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e2), this._helper && this.helper.remove(), false;
    }, _updateVirtualBoundaries: function(t2) {
      var e2, s, n, o, a, r = this.options;
      a = { minWidth: i(r.minWidth) ? r.minWidth : 0, maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0, minHeight: i(r.minHeight) ? r.minHeight : 0, maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0 }, (this._aspectRatio || t2) && (e2 = a.minHeight * this.aspectRatio, n = a.minWidth / this.aspectRatio, s = a.maxHeight * this.aspectRatio, o = a.maxWidth / this.aspectRatio, e2 > a.minWidth && (a.minWidth = e2), n > a.minHeight && (a.minHeight = n), a.maxWidth > s && (a.maxWidth = s), a.maxHeight > o && (a.maxHeight = o)), this._vBoundaries = a;
    }, _updateCache: function(t2) {
      this.offset = this.helper.offset(), i(t2.left) && (this.position.left = t2.left), i(t2.top) && (this.position.top = t2.top), i(t2.height) && (this.size.height = t2.height), i(t2.width) && (this.size.width = t2.width);
    }, _updateRatio: function(t2) {
      var e2 = this.position, s = this.size, n = this.axis;
      return i(t2.height) ? t2.width = t2.height * this.aspectRatio : i(t2.width) && (t2.height = t2.width / this.aspectRatio), "sw" === n && (t2.left = e2.left + (s.width - t2.width), t2.top = null), "nw" === n && (t2.top = e2.top + (s.height - t2.height), t2.left = e2.left + (s.width - t2.width)), t2;
    }, _respectSize: function(t2) {
      var e2 = this._vBoundaries, s = this.axis, n = i(t2.width) && e2.maxWidth && e2.maxWidth < t2.width, o = i(t2.height) && e2.maxHeight && e2.maxHeight < t2.height, a = i(t2.width) && e2.minWidth && e2.minWidth > t2.width, r = i(t2.height) && e2.minHeight && e2.minHeight > t2.height, h = this.originalPosition.left + this.originalSize.width, l = this.position.top + this.size.height, c = /sw|nw|w/.test(s), u = /nw|ne|n/.test(s);
      return a && (t2.width = e2.minWidth), r && (t2.height = e2.minHeight), n && (t2.width = e2.maxWidth), o && (t2.height = e2.maxHeight), a && c && (t2.left = h - e2.minWidth), n && c && (t2.left = h - e2.maxWidth), r && u && (t2.top = l - e2.minHeight), o && u && (t2.top = l - e2.maxHeight), t2.width || t2.height || t2.left || !t2.top ? t2.width || t2.height || t2.top || !t2.left || (t2.left = null) : t2.top = null, t2;
    }, _proportionallyResize: function() {
      if (this._proportionallyResizeElements.length) {
        var t2, e2, i2, s, n, o = this.helper || this.element;
        for (t2 = 0; this._proportionallyResizeElements.length > t2; t2++) {
          if (n = this._proportionallyResizeElements[t2], !this.borderDif)
            for (this.borderDif = [], i2 = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], e2 = 0; i2.length > e2; e2++)
              this.borderDif[e2] = (parseInt(i2[e2], 10) || 0) + (parseInt(s[e2], 10) || 0);
          n.css({ height: o.height() - this.borderDif[0] - this.borderDif[2] || 0, width: o.width() - this.borderDif[1] - this.borderDif[3] || 0 });
        }
      }
    }, _renderProxy: function() {
      var e2 = this.element, i2 = this.options;
      this.elementOffset = e2.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({ width: this.element.outerWidth() - 1, height: this.element.outerHeight() - 1, position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i2.zIndex }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
    }, _change: { e: function(t2, e2) {
      return { width: this.originalSize.width + e2 };
    }, w: function(t2, e2) {
      var i2 = this.originalSize, s = this.originalPosition;
      return { left: s.left + e2, width: i2.width - e2 };
    }, n: function(t2, e2, i2) {
      var s = this.originalSize, n = this.originalPosition;
      return { top: n.top + i2, height: s.height - i2 };
    }, s: function(t2, e2, i2) {
      return { height: this.originalSize.height + i2 };
    }, se: function(e2, i2, s) {
      return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e2, i2, s]));
    }, sw: function(e2, i2, s) {
      return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e2, i2, s]));
    }, ne: function(e2, i2, s) {
      return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e2, i2, s]));
    }, nw: function(e2, i2, s) {
      return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e2, i2, s]));
    } }, _propagate: function(e2, i2) {
      t.ui.plugin.call(this, e2, [i2, this.ui()]), "resize" !== e2 && this._trigger(e2, i2, this.ui());
    }, plugins: {}, ui: function() {
      return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition };
    } }), t.ui.plugin.add("resizable", "animate", { stop: function(e2) {
      var i2 = t(this).data("ui-resizable"), s = i2.options, n = i2._proportionallyResizeElements, o = n.length && /textarea/i.test(n[0].nodeName), a = o && t.ui.hasScroll(n[0], "left") ? 0 : i2.sizeDiff.height, r = o ? 0 : i2.sizeDiff.width, h = { width: i2.size.width - r, height: i2.size.height - a }, l = parseInt(i2.element.css("left"), 10) + (i2.position.left - i2.originalPosition.left) || null, c = parseInt(i2.element.css("top"), 10) + (i2.position.top - i2.originalPosition.top) || null;
      i2.element.animate(t.extend(h, c && l ? { top: c, left: l } : {}), { duration: s.animateDuration, easing: s.animateEasing, step: function() {
        var s2 = { width: parseInt(i2.element.css("width"), 10), height: parseInt(i2.element.css("height"), 10), top: parseInt(i2.element.css("top"), 10), left: parseInt(i2.element.css("left"), 10) };
        n && n.length && t(n[0]).css({ width: s2.width, height: s2.height }), i2._updateCache(s2), i2._propagate("resize", e2);
      } });
    } }), t.ui.plugin.add("resizable", "containment", { start: function() {
      var i2, s, n, o, a, r, h, l = t(this).data("ui-resizable"), c = l.options, u = l.element, d = c.containment, p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
      p && (l.containerElement = t(p), /document/.test(d) || d === document ? (l.containerOffset = { left: 0, top: 0 }, l.containerPosition = { left: 0, top: 0 }, l.parentData = { element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight }) : (i2 = t(p), s = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t2, n2) {
        s[t2] = e(i2.css("padding" + n2));
      }), l.containerOffset = i2.offset(), l.containerPosition = i2.position(), l.containerSize = { height: i2.innerHeight() - s[3], width: i2.innerWidth() - s[1] }, n = l.containerOffset, o = l.containerSize.height, a = l.containerSize.width, r = t.ui.hasScroll(p, "left") ? p.scrollWidth : a, h = t.ui.hasScroll(p) ? p.scrollHeight : o, l.parentData = { element: p, left: n.left, top: n.top, width: r, height: h }));
    }, resize: function(e2) {
      var i2, s, n, o, a = t(this).data("ui-resizable"), r = a.options, h = a.containerOffset, l = a.position, c = a._aspectRatio || e2.shiftKey, u = { top: 0, left: 0 }, d = a.containerElement;
      d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio), a.position.left = r.helper ? h.left : 0), l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio), a.position.top = a._helper ? h.top : 0), a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top, i2 = Math.abs((a._helper ? a.offset.left - u.left : a.offset.left - u.left) + a.sizeDiff.width), s = Math.abs((a._helper ? a.offset.top - u.top : a.offset.top - h.top) + a.sizeDiff.height), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o && (i2 -= a.parentData.left), i2 + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i2, c && (a.size.height = a.size.width / a.aspectRatio)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio));
    }, stop: function() {
      var e2 = t(this).data("ui-resizable"), i2 = e2.options, s = e2.containerOffset, n = e2.containerPosition, o = e2.containerElement, a = t(e2.helper), r = a.offset(), h = a.outerWidth() - e2.sizeDiff.width, l = a.outerHeight() - e2.sizeDiff.height;
      e2._helper && !i2.animate && /relative/.test(o.css("position")) && t(this).css({ left: r.left - n.left - s.left, width: h, height: l }), e2._helper && !i2.animate && /static/.test(o.css("position")) && t(this).css({ left: r.left - n.left - s.left, width: h, height: l });
    } }), t.ui.plugin.add("resizable", "alsoResize", { start: function() {
      var e2 = t(this).data("ui-resizable"), i2 = e2.options, s = function(e3) {
        t(e3).each(function() {
          var e4 = t(this);
          e4.data("ui-resizable-alsoresize", { width: parseInt(e4.width(), 10), height: parseInt(e4.height(), 10), left: parseInt(e4.css("left"), 10), top: parseInt(e4.css("top"), 10) });
        });
      };
      "object" != typeof i2.alsoResize || i2.alsoResize.parentNode ? s(i2.alsoResize) : i2.alsoResize.length ? (i2.alsoResize = i2.alsoResize[0], s(i2.alsoResize)) : t.each(i2.alsoResize, function(t2) {
        s(t2);
      });
    }, resize: function(e2, i2) {
      var s = t(this).data("ui-resizable"), n = s.options, o = s.originalSize, a = s.originalPosition, r = { height: s.size.height - o.height || 0, width: s.size.width - o.width || 0, top: s.position.top - a.top || 0, left: s.position.left - a.left || 0 }, h = function(e3, s2) {
        t(e3).each(function() {
          var e4 = t(this), n2 = t(this).data("ui-resizable-alsoresize"), o2 = {}, a2 = s2 && s2.length ? s2 : e4.parents(i2.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
          t.each(a2, function(t2, e5) {
            var i3 = (n2[e5] || 0) + (r[e5] || 0);
            i3 && i3 >= 0 && (o2[e5] = i3 || null);
          }), e4.css(o2);
        });
      };
      "object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : t.each(n.alsoResize, function(t2, e3) {
        h(t2, e3);
      });
    }, stop: function() {
      t(this).removeData("resizable-alsoresize");
    } }), t.ui.plugin.add("resizable", "ghost", { start: function() {
      var e2 = t(this).data("ui-resizable"), i2 = e2.options, s = e2.size;
      e2.ghost = e2.originalElement.clone(), e2.ghost.css({ opacity: 0.25, display: "block", position: "relative", height: s.height, width: s.width, margin: 0, left: 0, top: 0 }).addClass("ui-resizable-ghost").addClass("string" == typeof i2.ghost ? i2.ghost : ""), e2.ghost.appendTo(e2.helper);
    }, resize: function() {
      var e2 = t(this).data("ui-resizable");
      e2.ghost && e2.ghost.css({ position: "relative", height: e2.size.height, width: e2.size.width });
    }, stop: function() {
      var e2 = t(this).data("ui-resizable");
      e2.ghost && e2.helper && e2.helper.get(0).removeChild(e2.ghost.get(0));
    } }), t.ui.plugin.add("resizable", "grid", { resize: function() {
      var e2 = t(this).data("ui-resizable"), i2 = e2.options, s = e2.size, n = e2.originalSize, o = e2.originalPosition, a = e2.axis, r = "number" == typeof i2.grid ? [i2.grid, i2.grid] : i2.grid, h = r[0] || 1, l = r[1] || 1, c = Math.round((s.width - n.width) / h) * h, u = Math.round((s.height - n.height) / l) * l, d = n.width + c, p = n.height + u, f = i2.maxWidth && d > i2.maxWidth, g = i2.maxHeight && p > i2.maxHeight, m = i2.minWidth && i2.minWidth > d, v = i2.minHeight && i2.minHeight > p;
      i2.grid = r, m && (d += h), v && (p += l), f && (d -= h), g && (p -= l), /^(se|s|e)$/.test(a) ? (e2.size.width = d, e2.size.height = p) : /^(ne)$/.test(a) ? (e2.size.width = d, e2.size.height = p, e2.position.top = o.top - u) : /^(sw)$/.test(a) ? (e2.size.width = d, e2.size.height = p, e2.position.left = o.left - c) : (e2.size.width = d, e2.size.height = p, e2.position.top = o.top - u, e2.position.left = o.left - c);
    } });
  }(jQuery), function(t) {
    t.widget("ui.selectable", t.ui.mouse, { version: "1.10.2", options: { appendTo: "body", autoRefresh: true, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null }, _create: function() {
      var e, i = this;
      this.element.addClass("ui-selectable"), this.dragged = false, this.refresh = function() {
        e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
          var e2 = t(this), i2 = e2.offset();
          t.data(this, "selectable-item", { element: this, $element: e2, left: i2.left, top: i2.top, right: i2.left + e2.outerWidth(), bottom: i2.top + e2.outerHeight(), startselected: false, selected: e2.hasClass("ui-selected"), selecting: e2.hasClass("ui-selecting"), unselecting: e2.hasClass("ui-unselecting") });
        });
      }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>");
    }, _destroy: function() {
      this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy();
    }, _mouseStart: function(e) {
      var i = this, s = this.options;
      this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({ left: e.pageX, top: e.pageY, width: 0, height: 0 }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
        var s2 = t.data(this, "selectable-item");
        s2.startselected = true, e.metaKey || e.ctrlKey || (s2.$element.removeClass("ui-selected"), s2.selected = false, s2.$element.addClass("ui-unselecting"), s2.unselecting = true, i._trigger("unselecting", e, { unselecting: s2.element }));
      }), t(e.target).parents().addBack().each(function() {
        var s2, n = t.data(this, "selectable-item");
        return n ? (s2 = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s2 ? "ui-unselecting" : "ui-selected").addClass(s2 ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s2, n.selecting = s2, n.selected = s2, s2 ? i._trigger("selecting", e, { selecting: n.element }) : i._trigger("unselecting", e, { unselecting: n.element }), false) : void 0;
      }));
    }, _mouseDrag: function(e) {
      if (this.dragged = true, !this.options.disabled) {
        var i, s = this, n = this.options, o = this.opos[0], a = this.opos[1], r = e.pageX, h = e.pageY;
        return o > r && (i = r, r = o, o = i), a > h && (i = h, h = a, a = i), this.helper.css({ left: o, top: a, width: r - o, height: h - a }), this.selectees.each(function() {
          var i2 = t.data(this, "selectable-item"), l = false;
          i2 && i2.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i2.left > r || o > i2.right || i2.top > h || a > i2.bottom) : "fit" === n.tolerance && (l = i2.left > o && r > i2.right && i2.top > a && h > i2.bottom), l ? (i2.selected && (i2.$element.removeClass("ui-selected"), i2.selected = false), i2.unselecting && (i2.$element.removeClass("ui-unselecting"), i2.unselecting = false), i2.selecting || (i2.$element.addClass("ui-selecting"), i2.selecting = true, s._trigger("selecting", e, { selecting: i2.element }))) : (i2.selecting && ((e.metaKey || e.ctrlKey) && i2.startselected ? (i2.$element.removeClass("ui-selecting"), i2.selecting = false, i2.$element.addClass("ui-selected"), i2.selected = true) : (i2.$element.removeClass("ui-selecting"), i2.selecting = false, i2.startselected && (i2.$element.addClass("ui-unselecting"), i2.unselecting = true), s._trigger("unselecting", e, { unselecting: i2.element }))), i2.selected && (e.metaKey || e.ctrlKey || i2.startselected || (i2.$element.removeClass("ui-selected"), i2.selected = false, i2.$element.addClass("ui-unselecting"), i2.unselecting = true, s._trigger("unselecting", e, { unselecting: i2.element })))));
        }), false;
      }
    }, _mouseStop: function(e) {
      var i = this;
      return this.dragged = false, t(".ui-unselecting", this.element[0]).each(function() {
        var s = t.data(this, "selectable-item");
        s.$element.removeClass("ui-unselecting"), s.unselecting = false, s.startselected = false, i._trigger("unselected", e, { unselected: s.element });
      }), t(".ui-selecting", this.element[0]).each(function() {
        var s = t.data(this, "selectable-item");
        s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = false, s.selected = true, s.startselected = true, i._trigger("selected", e, { selected: s.element });
      }), this._trigger("stop", e), this.helper.remove(), false;
    } });
  }(jQuery), function(t) {
    function e(t2, e2, i2) {
      return t2 > e2 && e2 + i2 > t2;
    }
    function i(t2) {
      return /left|right/.test(t2.css("float")) || /inline|table-cell/.test(t2.css("display"));
    }
    t.widget("ui.sortable", t.ui.mouse, { version: "1.10.2", widgetEventPrefix: "sort", ready: false, options: { appendTo: "parent", axis: false, connectWith: false, containment: false, cursor: "auto", cursorAt: false, dropOnEmpty: true, forcePlaceholderSize: false, forceHelperSize: false, grid: false, handle: false, helper: "original", items: "> *", opacity: false, placeholder: false, revert: false, scroll: true, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null }, _create: function() {
      var t2 = this.options;
      this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t2.axis || i(this.items[0].item) : false, this.offset = this.element.offset(), this._mouseInit(), this.ready = true;
    }, _destroy: function() {
      this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
      for (var t2 = this.items.length - 1; t2 >= 0; t2--)
        this.items[t2].item.removeData(this.widgetName + "-item");
      return this;
    }, _setOption: function(e2, i2) {
      "disabled" === e2 ? (this.options[e2] = i2, this.widget().toggleClass("ui-sortable-disabled", !!i2)) : t.Widget.prototype._setOption.apply(this, arguments);
    }, _mouseCapture: function(e2, i2) {
      var s = null, n = false, o = this;
      return this.reverting ? false : this.options.disabled || "static" === this.options.type ? false : (this._refreshItems(e2), t(e2.target).parents().each(function() {
        return t.data(this, o.widgetName + "-item") === o ? (s = t(this), false) : void 0;
      }), t.data(e2.target, o.widgetName + "-item") === o && (s = t(e2.target)), s ? !this.options.handle || i2 || (t(this.options.handle, s).find("*").addBack().each(function() {
        this === e2.target && (n = true);
      }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), true) : false : false);
    }, _mouseStart: function(e2, i2, s) {
      var n, o, a = this.options;
      if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e2), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, t.extend(this.offset, { click: { left: e2.pageX - this.offset.left, top: e2.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e2), this.originalPageX = e2.pageX, this.originalPageY = e2.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e2, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
        for (n = this.containers.length - 1; n >= 0; n--)
          this.containers[n]._trigger("activate", e2, this._uiHash(this));
      return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e2), this.dragging = true, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e2), true;
    }, _mouseDrag: function(e2) {
      var i2, s, n, o, a = this.options, r = false;
      for (this.position = this._generatePosition(e2), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e2.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e2.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e2.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e2.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e2.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e2.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e2.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e2.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), r !== false && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e2)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i2 = this.items.length - 1; i2 >= 0; i2--)
        if (s = this.items[i2], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : true)) {
          if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s))
            break;
          this._rearrange(e2, s), this._trigger("change", e2, this._uiHash());
          break;
        }
      return this._contactContainers(e2), t.ui.ddmanager && t.ui.ddmanager.drag(this, e2), this._trigger("sort", e2, this._uiHash()), this.lastPositionAbs = this.positionAbs, false;
    }, _mouseStop: function(e2, i2) {
      if (e2) {
        if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e2), this.options.revert) {
          var s = this, n = this.placeholder.offset(), o = this.options.axis, a = {};
          o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = true, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
            s._clear(e2);
          });
        } else
          this._clear(e2, i2);
        return false;
      }
    }, cancel: function() {
      if (this.dragging) {
        this._mouseUp({ target: null }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
        for (var e2 = this.containers.length - 1; e2 >= 0; e2--)
          this.containers[e2]._trigger("deactivate", null, this._uiHash(this)), this.containers[e2].containerCache.over && (this.containers[e2]._trigger("out", null, this._uiHash(this)), this.containers[e2].containerCache.over = 0);
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, { helper: null, dragging: false, reverting: false, _noFinalSort: null }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this;
    }, serialize: function(e2) {
      var i2 = this._getItemsAsjQuery(e2 && e2.connected), s = [];
      return e2 = e2 || {}, t(i2).each(function() {
        var i3 = (t(e2.item || this).attr(e2.attribute || "id") || "").match(e2.expression || /(.+)[\-=_](.+)/);
        i3 && s.push((e2.key || i3[1] + "[]") + "=" + (e2.key && e2.expression ? i3[1] : i3[2]));
      }), !s.length && e2.key && s.push(e2.key + "="), s.join("&");
    }, toArray: function(e2) {
      var i2 = this._getItemsAsjQuery(e2 && e2.connected), s = [];
      return e2 = e2 || {}, i2.each(function() {
        s.push(t(e2.item || this).attr(e2.attribute || "id") || "");
      }), s;
    }, _intersectsWith: function(t2) {
      var e2 = this.positionAbs.left, i2 = e2 + this.helperProportions.width, s = this.positionAbs.top, n = s + this.helperProportions.height, o = t2.left, a = o + t2.width, r = t2.top, h = r + t2.height, l = this.offset.click.top, c = this.offset.click.left, u = s + l > r && h > s + l && e2 + c > o && a > e2 + c;
      return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t2[this.floating ? "width" : "height"] ? u : e2 + this.helperProportions.width / 2 > o && a > i2 - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2;
    }, _intersectsWithPointer: function(t2) {
      var i2 = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t2.top, t2.height), s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t2.left, t2.width), n = i2 && s, o = this._getDragVerticalDirection(), a = this._getDragHorizontalDirection();
      return n ? this.floating ? a && "right" === a || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : false;
    }, _intersectsWithSides: function(t2) {
      var i2 = e(this.positionAbs.top + this.offset.click.top, t2.top + t2.height / 2, t2.height), s = e(this.positionAbs.left + this.offset.click.left, t2.left + t2.width / 2, t2.width), n = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
      return this.floating && o ? "right" === o && s || "left" === o && !s : n && ("down" === n && i2 || "up" === n && !i2);
    }, _getDragVerticalDirection: function() {
      var t2 = this.positionAbs.top - this.lastPositionAbs.top;
      return 0 !== t2 && (t2 > 0 ? "down" : "up");
    }, _getDragHorizontalDirection: function() {
      var t2 = this.positionAbs.left - this.lastPositionAbs.left;
      return 0 !== t2 && (t2 > 0 ? "right" : "left");
    }, refresh: function(t2) {
      return this._refreshItems(t2), this.refreshPositions(), this;
    }, _connectWith: function() {
      var t2 = this.options;
      return t2.connectWith.constructor === String ? [t2.connectWith] : t2.connectWith;
    }, _getItemsAsjQuery: function(e2) {
      var i2, s, n, o, a = [], r = [], h = this._connectWith();
      if (h && e2)
        for (i2 = h.length - 1; i2 >= 0; i2--)
          for (n = t(h[i2]), s = n.length - 1; s >= 0; s--)
            o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && r.push([t.isFunction(o.options.items) ? o.options.items.call(o.element) : t(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
      for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i2 = r.length - 1; i2 >= 0; i2--)
        r[i2][0].each(function() {
          a.push(this);
        });
      return t(a);
    }, _removeCurrentsFromItems: function() {
      var e2 = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = t.grep(this.items, function(t2) {
        for (var i2 = 0; e2.length > i2; i2++)
          if (e2[i2] === t2.item[0])
            return false;
        return true;
      });
    }, _refreshItems: function(e2) {
      this.items = [], this.containers = [this];
      var i2, s, n, o, a, r, h, l, c = this.items, u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e2, { item: this.currentItem }) : t(this.options.items, this.element), this]], d = this._connectWith();
      if (d && this.ready)
        for (i2 = d.length - 1; i2 >= 0; i2--)
          for (n = t(d[i2]), s = n.length - 1; s >= 0; s--)
            o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e2, { item: this.currentItem }) : t(o.options.items, o.element), o]), this.containers.push(o));
      for (i2 = u.length - 1; i2 >= 0; i2--)
        for (a = u[i2][1], r = u[i2][0], s = 0, l = r.length; l > s; s++)
          h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({ item: h, instance: a, width: 0, height: 0, left: 0, top: 0 });
    }, refreshPositions: function(e2) {
      this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      var i2, s, n, o;
      for (i2 = this.items.length - 1; i2 >= 0; i2--)
        s = this.items[i2], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e2 || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
      if (this.options.custom && this.options.custom.refreshContainers)
        this.options.custom.refreshContainers.call(this);
      else
        for (i2 = this.containers.length - 1; i2 >= 0; i2--)
          o = this.containers[i2].element.offset(), this.containers[i2].containerCache.left = o.left, this.containers[i2].containerCache.top = o.top, this.containers[i2].containerCache.width = this.containers[i2].element.outerWidth(), this.containers[i2].containerCache.height = this.containers[i2].element.outerHeight();
      return this;
    }, _createPlaceholder: function(e2) {
      e2 = e2 || this;
      var i2, s = e2.options;
      s.placeholder && s.placeholder.constructor !== String || (i2 = s.placeholder, s.placeholder = { element: function() {
        var s2 = e2.currentItem[0].nodeName.toLowerCase(), n = t(e2.document[0].createElement(s2)).addClass(i2 || e2.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
        return "tr" === s2 ? n.append("<td colspan='99'>&#160;</td>") : "img" === s2 && n.attr("src", e2.currentItem.attr("src")), i2 || n.css("visibility", "hidden"), n;
      }, update: function(t2, n) {
        (!i2 || s.forcePlaceholderSize) && (n.height() || n.height(e2.currentItem.innerHeight() - parseInt(e2.currentItem.css("paddingTop") || 0, 10) - parseInt(e2.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e2.currentItem.innerWidth() - parseInt(e2.currentItem.css("paddingLeft") || 0, 10) - parseInt(e2.currentItem.css("paddingRight") || 0, 10)));
      } }), e2.placeholder = t(s.placeholder.element.call(e2.element, e2.currentItem)), e2.currentItem.after(e2.placeholder), s.placeholder.update(e2, e2.placeholder);
    }, _contactContainers: function(s) {
      var n, o, a, r, h, l, c, u, d, p, f = null, g = null;
      for (n = this.containers.length - 1; n >= 0; n--)
        if (!t.contains(this.currentItem[0], this.containers[n].element[0]))
          if (this._intersectsWith(this.containers[n].containerCache)) {
            if (f && t.contains(this.containers[n].element[0], f.element[0]))
              continue;
            f = this.containers[n], g = n;
          } else
            this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
      if (f)
        if (1 === this.containers.length)
          this.containers[g].containerCache.over || (this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1);
        else {
          for (a = 1e4, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], o = this.items.length - 1; o >= 0; o--)
            t.contains(this.containers[g].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (u = this.items[o].item.offset()[h], d = false, Math.abs(u - c) > Math.abs(u + this.items[o][l] - c) && (d = true, u += this.items[o][l]), a > Math.abs(u - c) && (a = Math.abs(u - c), r = this.items[o], this.direction = d ? "up" : "down"));
          if (!r && !this.options.dropOnEmpty)
            return;
          if (this.currentContainer === this.containers[g])
            return;
          r ? this._rearrange(s, r, null, true) : this._rearrange(s, null, this.containers[g].element, true), this._trigger("change", s, this._uiHash()), this.containers[g]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[g], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1;
        }
    }, _createHelper: function(e2) {
      var i2 = this.options, s = t.isFunction(i2.helper) ? t(i2.helper.apply(this.element[0], [e2, this.currentItem])) : "clone" === i2.helper ? this.currentItem.clone() : this.currentItem;
      return s.parents("body").length || t("parent" !== i2.appendTo ? i2.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") }), (!s[0].style.width || i2.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i2.forceHelperSize) && s.height(this.currentItem.height()), s;
    }, _adjustOffsetFromHelper: function(e2) {
      "string" == typeof e2 && (e2 = e2.split(" ")), t.isArray(e2) && (e2 = { left: +e2[0], top: +e2[1] || 0 }), "left" in e2 && (this.offset.click.left = e2.left + this.margins.left), "right" in e2 && (this.offset.click.left = this.helperProportions.width - e2.right + this.margins.left), "top" in e2 && (this.offset.click.top = e2.top + this.margins.top), "bottom" in e2 && (this.offset.click.top = this.helperProportions.height - e2.bottom + this.margins.top);
    }, _getParentOffset: function() {
      this.offsetParent = this.helper.offsetParent();
      var e2 = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e2.left += this.scrollParent.scrollLeft(), e2.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e2 = { top: 0, left: 0 }), { top: e2.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e2.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) };
    }, _getRelativeOffset: function() {
      if ("relative" === this.cssPosition) {
        var t2 = this.currentItem.position();
        return { top: t2.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t2.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
      }
      return { top: 0, left: 0 };
    }, _cacheMargins: function() {
      this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 };
    }, _cacheHelperProportions: function() {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    }, _setContainment: function() {
      var e2, i2, s, n = this.options;
      "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e2 = t(n.containment)[0], i2 = t(n.containment).offset(), s = "hidden" !== t(e2).css("overflow"), this.containment = [i2.left + (parseInt(t(e2).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e2).css("paddingLeft"), 10) || 0) - this.margins.left, i2.top + (parseInt(t(e2).css("borderTopWidth"), 10) || 0) + (parseInt(t(e2).css("paddingTop"), 10) || 0) - this.margins.top, i2.left + (s ? Math.max(e2.scrollWidth, e2.offsetWidth) : e2.offsetWidth) - (parseInt(t(e2).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e2).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i2.top + (s ? Math.max(e2.scrollHeight, e2.offsetHeight) : e2.offsetHeight) - (parseInt(t(e2).css("borderTopWidth"), 10) || 0) - (parseInt(t(e2).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
    }, _convertPositionTo: function(e2, i2) {
      i2 || (i2 = this.position);
      var s = "absolute" === e2 ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(n[0].tagName);
      return { top: i2.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s, left: i2.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s };
    }, _generatePosition: function(e2) {
      var i2, s, n = this.options, o = e2.pageX, a = e2.pageY, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName);
      return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e2.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e2.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e2.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e2.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i2 = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i2 - this.offset.click.top >= this.containment[1] && i2 - this.offset.click.top <= this.containment[3] ? i2 : i2 - this.offset.click.top >= this.containment[1] ? i2 - n.grid[1] : i2 + n.grid[1] : i2, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), { top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()), left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft()) };
    }, _rearrange: function(t2, e2, i2, s) {
      i2 ? i2[0].appendChild(this.placeholder[0]) : e2.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e2.item[0] : e2.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var n = this.counter;
      this._delay(function() {
        n === this.counter && this.refreshPositions(!s);
      });
    }, _clear: function(t2, e2) {
      this.reverting = false;
      var i2, s = [];
      if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (i2 in this._storedCSS)
          ("auto" === this._storedCSS[i2] || "static" === this._storedCSS[i2]) && (this._storedCSS[i2] = "");
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
      } else
        this.currentItem.show();
      for (this.fromOutside && !e2 && s.push(function(t3) {
        this._trigger("receive", t3, this._uiHash(this.fromOutside));
      }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e2 || s.push(function(t3) {
        this._trigger("update", t3, this._uiHash());
      }), this !== this.currentContainer && (e2 || (s.push(function(t3) {
        this._trigger("remove", t3, this._uiHash());
      }), s.push(function(t3) {
        return function(e3) {
          t3._trigger("receive", e3, this._uiHash(this));
        };
      }.call(this, this.currentContainer)), s.push(function(t3) {
        return function(e3) {
          t3._trigger("update", e3, this._uiHash(this));
        };
      }.call(this, this.currentContainer)))), i2 = this.containers.length - 1; i2 >= 0; i2--)
        e2 || s.push(function(t3) {
          return function(e3) {
            t3._trigger("deactivate", e3, this._uiHash(this));
          };
        }.call(this, this.containers[i2])), this.containers[i2].containerCache.over && (s.push(function(t3) {
          return function(e3) {
            t3._trigger("out", e3, this._uiHash(this));
          };
        }.call(this, this.containers[i2])), this.containers[i2].containerCache.over = 0);
      if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = false, this.cancelHelperRemoval) {
        if (!e2) {
          for (this._trigger("beforeStop", t2, this._uiHash()), i2 = 0; s.length > i2; i2++)
            s[i2].call(this, t2);
          this._trigger("stop", t2, this._uiHash());
        }
        return this.fromOutside = false, false;
      }
      if (e2 || this._trigger("beforeStop", t2, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e2) {
        for (i2 = 0; s.length > i2; i2++)
          s[i2].call(this, t2);
        this._trigger("stop", t2, this._uiHash());
      }
      return this.fromOutside = false, true;
    }, _trigger: function() {
      t.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel();
    }, _uiHash: function(e2) {
      var i2 = e2 || this;
      return { helper: i2.helper, placeholder: i2.placeholder || t([]), position: i2.position, originalPosition: i2.originalPosition, offset: i2.positionAbs, item: i2.currentItem, sender: e2 ? e2.element : null };
    } });
  }(jQuery), function(t, e) {
    var i = "ui-effects-";
    t.effects = { effect: {} }, function(t2, e2) {
      function i2(t3, e3, i3) {
        var s2 = u[e3.type] || {};
        return null == t3 ? i3 || !e3.def ? null : e3.def : (t3 = s2.floor ? ~~t3 : parseFloat(t3), isNaN(t3) ? e3.def : s2.mod ? (t3 + s2.mod) % s2.mod : 0 > t3 ? 0 : t3 > s2.max ? s2.max : t3);
      }
      function s(i3) {
        var s2 = l(), n2 = s2._rgba = [];
        return i3 = i3.toLowerCase(), f(h, function(t3, o2) {
          var a2, r2 = o2.re.exec(i3), h2 = r2 && o2.parse(r2), l2 = o2.space || "rgba";
          return h2 ? (a2 = s2[l2](h2), s2[c[l2].cache] = a2[c[l2].cache], n2 = s2._rgba = a2._rgba, false) : e2;
        }), n2.length ? ("0,0,0,0" === n2.join() && t2.extend(n2, o.transparent), s2) : o[i3];
      }
      function n(t3, e3, i3) {
        return i3 = (i3 + 1) % 1, 1 > 6 * i3 ? t3 + 6 * (e3 - t3) * i3 : 1 > 2 * i3 ? e3 : 2 > 3 * i3 ? t3 + 6 * (e3 - t3) * (2 / 3 - i3) : t3;
      }
      var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, h = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(t3) {
        return [t3[1], t3[2], t3[3], t3[4]];
      } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(t3) {
        return [2.55 * t3[1], 2.55 * t3[2], 2.55 * t3[3], t3[4]];
      } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function(t3) {
        return [parseInt(t3[1], 16), parseInt(t3[2], 16), parseInt(t3[3], 16)];
      } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function(t3) {
        return [parseInt(t3[1] + t3[1], 16), parseInt(t3[2] + t3[2], 16), parseInt(t3[3] + t3[3], 16)];
      } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function(t3) {
        return [t3[1], t3[2] / 100, t3[3] / 100, t3[4]];
      } }], l = t2.Color = function(e3, i3, s2, n2) {
        return new t2.Color.fn.parse(e3, i3, s2, n2);
      }, c = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } }, u = { "byte": { floor: true, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: true } }, d = l.support = {}, p = t2("<p>")[0], f = t2.each;
      p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t3, e3) {
        e3.cache = "_" + t3, e3.props.alpha = { idx: 3, type: "percent", def: 1 };
      }), l.fn = t2.extend(l.prototype, { parse: function(n2, a2, r2, h2) {
        if (n2 === e2)
          return this._rgba = [null, null, null, null], this;
        (n2.jquery || n2.nodeType) && (n2 = t2(n2).css(a2), a2 = e2);
        var u2 = this, d2 = t2.type(n2), p2 = this._rgba = [];
        return a2 !== e2 && (n2 = [n2, a2, r2, h2], d2 = "array"), "string" === d2 ? this.parse(s(n2) || o._default) : "array" === d2 ? (f(c.rgba.props, function(t3, e3) {
          p2[e3.idx] = i2(n2[e3.idx], e3);
        }), this) : "object" === d2 ? (n2 instanceof l ? f(c, function(t3, e3) {
          n2[e3.cache] && (u2[e3.cache] = n2[e3.cache].slice());
        }) : f(c, function(e3, s2) {
          var o2 = s2.cache;
          f(s2.props, function(t3, e4) {
            if (!u2[o2] && s2.to) {
              if ("alpha" === t3 || null == n2[t3])
                return;
              u2[o2] = s2.to(u2._rgba);
            }
            u2[o2][e4.idx] = i2(n2[t3], e4, true);
          }), u2[o2] && 0 > t2.inArray(null, u2[o2].slice(0, 3)) && (u2[o2][3] = 1, s2.from && (u2._rgba = s2.from(u2[o2])));
        }), this) : e2;
      }, is: function(t3) {
        var i3 = l(t3), s2 = true, n2 = this;
        return f(c, function(t4, o2) {
          var a2, r2 = i3[o2.cache];
          return r2 && (a2 = n2[o2.cache] || o2.to && o2.to(n2._rgba) || [], f(o2.props, function(t5, i4) {
            return null != r2[i4.idx] ? s2 = r2[i4.idx] === a2[i4.idx] : e2;
          })), s2;
        }), s2;
      }, _space: function() {
        var t3 = [], e3 = this;
        return f(c, function(i3, s2) {
          e3[s2.cache] && t3.push(i3);
        }), t3.pop();
      }, transition: function(t3, e3) {
        var s2 = l(t3), n2 = s2._space(), o2 = c[n2], a2 = 0 === this.alpha() ? l("transparent") : this, r2 = a2[o2.cache] || o2.to(a2._rgba), h2 = r2.slice();
        return s2 = s2[o2.cache], f(o2.props, function(t4, n3) {
          var o3 = n3.idx, a3 = r2[o3], l2 = s2[o3], c2 = u[n3.type] || {};
          null !== l2 && (null === a3 ? h2[o3] = l2 : (c2.mod && (l2 - a3 > c2.mod / 2 ? a3 += c2.mod : a3 - l2 > c2.mod / 2 && (a3 -= c2.mod)), h2[o3] = i2((l2 - a3) * e3 + a3, n3)));
        }), this[n2](h2);
      }, blend: function(e3) {
        if (1 === this._rgba[3])
          return this;
        var i3 = this._rgba.slice(), s2 = i3.pop(), n2 = l(e3)._rgba;
        return l(t2.map(i3, function(t3, e4) {
          return (1 - s2) * n2[e4] + s2 * t3;
        }));
      }, toRgbaString: function() {
        var e3 = "rgba(", i3 = t2.map(this._rgba, function(t3, e4) {
          return null == t3 ? e4 > 2 ? 1 : 0 : t3;
        });
        return 1 === i3[3] && (i3.pop(), e3 = "rgb("), e3 + i3.join() + ")";
      }, toHslaString: function() {
        var e3 = "hsla(", i3 = t2.map(this.hsla(), function(t3, e4) {
          return null == t3 && (t3 = e4 > 2 ? 1 : 0), e4 && 3 > e4 && (t3 = Math.round(100 * t3) + "%"), t3;
        });
        return 1 === i3[3] && (i3.pop(), e3 = "hsl("), e3 + i3.join() + ")";
      }, toHexString: function(e3) {
        var i3 = this._rgba.slice(), s2 = i3.pop();
        return e3 && i3.push(~~(255 * s2)), "#" + t2.map(i3, function(t3) {
          return t3 = (t3 || 0).toString(16), 1 === t3.length ? "0" + t3 : t3;
        }).join("");
      }, toString: function() {
        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
      } }), l.fn.parse.prototype = l.fn, c.hsla.to = function(t3) {
        if (null == t3[0] || null == t3[1] || null == t3[2])
          return [null, null, null, t3[3]];
        var e3, i3, s2 = t3[0] / 255, n2 = t3[1] / 255, o2 = t3[2] / 255, a2 = t3[3], r2 = Math.max(s2, n2, o2), h2 = Math.min(s2, n2, o2), l2 = r2 - h2, c2 = r2 + h2, u2 = 0.5 * c2;
        return e3 = h2 === r2 ? 0 : s2 === r2 ? 60 * (n2 - o2) / l2 + 360 : n2 === r2 ? 60 * (o2 - s2) / l2 + 120 : 60 * (s2 - n2) / l2 + 240, i3 = 0 === l2 ? 0 : 0.5 >= u2 ? l2 / c2 : l2 / (2 - c2), [Math.round(e3) % 360, i3, u2, null == a2 ? 1 : a2];
      }, c.hsla.from = function(t3) {
        if (null == t3[0] || null == t3[1] || null == t3[2])
          return [null, null, null, t3[3]];
        var e3 = t3[0] / 360, i3 = t3[1], s2 = t3[2], o2 = t3[3], a2 = 0.5 >= s2 ? s2 * (1 + i3) : s2 + i3 - s2 * i3, r2 = 2 * s2 - a2;
        return [Math.round(255 * n(r2, a2, e3 + 1 / 3)), Math.round(255 * n(r2, a2, e3)), Math.round(255 * n(r2, a2, e3 - 1 / 3)), o2];
      }, f(c, function(s2, n2) {
        var o2 = n2.props, a2 = n2.cache, h2 = n2.to, c2 = n2.from;
        l.fn[s2] = function(s3) {
          if (h2 && !this[a2] && (this[a2] = h2(this._rgba)), s3 === e2)
            return this[a2].slice();
          var n3, r2 = t2.type(s3), u2 = "array" === r2 || "object" === r2 ? s3 : arguments, d2 = this[a2].slice();
          return f(o2, function(t3, e3) {
            var s4 = u2["object" === r2 ? t3 : e3.idx];
            null == s4 && (s4 = d2[e3.idx]), d2[e3.idx] = i2(s4, e3);
          }), c2 ? (n3 = l(c2(d2)), n3[a2] = d2, n3) : l(d2);
        }, f(o2, function(e3, i3) {
          l.fn[e3] || (l.fn[e3] = function(n3) {
            var o3, a3 = t2.type(n3), h3 = "alpha" === e3 ? this._hsla ? "hsla" : "rgba" : s2, l2 = this[h3](), c3 = l2[i3.idx];
            return "undefined" === a3 ? c3 : ("function" === a3 && (n3 = n3.call(this, c3), a3 = t2.type(n3)), null == n3 && i3.empty ? this : ("string" === a3 && (o3 = r.exec(n3), o3 && (n3 = c3 + parseFloat(o3[2]) * ("+" === o3[1] ? 1 : -1))), l2[i3.idx] = n3, this[h3](l2)));
          });
        });
      }), l.hook = function(e3) {
        var i3 = e3.split(" ");
        f(i3, function(e4, i4) {
          t2.cssHooks[i4] = { set: function(e5, n2) {
            var o2, a2, r2 = "";
            if ("transparent" !== n2 && ("string" !== t2.type(n2) || (o2 = s(n2)))) {
              if (n2 = l(o2 || n2), !d.rgba && 1 !== n2._rgba[3]) {
                for (a2 = "backgroundColor" === i4 ? e5.parentNode : e5; ("" === r2 || "transparent" === r2) && a2 && a2.style; )
                  try {
                    r2 = t2.css(a2, "backgroundColor"), a2 = a2.parentNode;
                  } catch (h2) {
                  }
                n2 = n2.blend(r2 && "transparent" !== r2 ? r2 : "_default");
              }
              n2 = n2.toRgbaString();
            }
            try {
              e5.style[i4] = n2;
            } catch (h2) {
            }
          } }, t2.fx.step[i4] = function(e5) {
            e5.colorInit || (e5.start = l(e5.elem, i4), e5.end = l(e5.end), e5.colorInit = true), t2.cssHooks[i4].set(e5.elem, e5.start.transition(e5.end, e5.pos));
          };
        });
      }, l.hook(a), t2.cssHooks.borderColor = { expand: function(t3) {
        var e3 = {};
        return f(["Top", "Right", "Bottom", "Left"], function(i3, s2) {
          e3["border" + s2 + "Color"] = t3;
        }), e3;
      } }, o = t2.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" };
    }(jQuery), function() {
      function i2(e2) {
        var i3, s2, n2 = e2.ownerDocument.defaultView ? e2.ownerDocument.defaultView.getComputedStyle(e2, null) : e2.currentStyle, o2 = {};
        if (n2 && n2.length && n2[0] && n2[n2[0]])
          for (s2 = n2.length; s2--; )
            i3 = n2[s2], "string" == typeof n2[i3] && (o2[t.camelCase(i3)] = n2[i3]);
        else
          for (i3 in n2)
            "string" == typeof n2[i3] && (o2[i3] = n2[i3]);
        return o2;
      }
      function s(e2, i3) {
        var s2, n2, a = {};
        for (s2 in i3)
          n2 = i3[s2], e2[s2] !== n2 && (o[s2] || (t.fx.step[s2] || !isNaN(parseFloat(n2))) && (a[s2] = n2));
        return a;
      }
      var n = ["add", "remove", "toggle"], o = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };
      t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e2, i3) {
        t.fx.step[i3] = function(t2) {
          ("none" !== t2.end && !t2.setAttr || 1 === t2.pos && !t2.setAttr) && (jQuery.style(t2.elem, i3, t2.end), t2.setAttr = true);
        };
      }), t.fn.addBack || (t.fn.addBack = function(t2) {
        return this.add(null == t2 ? this.prevObject : this.prevObject.filter(t2));
      }), t.effects.animateClass = function(e2, o2, a, r) {
        var h = t.speed(o2, a, r);
        return this.queue(function() {
          var o3, a2 = t(this), r2 = a2.attr("class") || "", l = h.children ? a2.find("*").addBack() : a2;
          l = l.map(function() {
            var e3 = t(this);
            return { el: e3, start: i2(this) };
          }), o3 = function() {
            t.each(n, function(t2, i3) {
              e2[i3] && a2[i3 + "Class"](e2[i3]);
            });
          }, o3(), l = l.map(function() {
            return this.end = i2(this.el[0]), this.diff = s(this.start, this.end), this;
          }), a2.attr("class", r2), l = l.map(function() {
            var e3 = this, i3 = t.Deferred(), s2 = t.extend({}, h, { queue: false, complete: function() {
              i3.resolve(e3);
            } });
            return this.el.animate(this.diff, s2), i3.promise();
          }), t.when.apply(t, l.get()).done(function() {
            o3(), t.each(arguments, function() {
              var e3 = this.el;
              t.each(this.diff, function(t2) {
                e3.css(t2, "");
              });
            }), h.complete.call(a2[0]);
          });
        });
      }, t.fn.extend({ addClass: function(e2) {
        return function(i3, s2, n2, o2) {
          return s2 ? t.effects.animateClass.call(this, { add: i3 }, s2, n2, o2) : e2.apply(this, arguments);
        };
      }(t.fn.addClass), removeClass: function(e2) {
        return function(i3, s2, n2, o2) {
          return arguments.length > 1 ? t.effects.animateClass.call(this, { remove: i3 }, s2, n2, o2) : e2.apply(this, arguments);
        };
      }(t.fn.removeClass), toggleClass: function(i3) {
        return function(s2, n2, o2, a, r) {
          return "boolean" == typeof n2 || n2 === e ? o2 ? t.effects.animateClass.call(this, n2 ? { add: s2 } : { remove: s2 }, o2, a, r) : i3.apply(this, arguments) : t.effects.animateClass.call(this, { toggle: s2 }, n2, o2, a);
        };
      }(t.fn.toggleClass), switchClass: function(e2, i3, s2, n2, o2) {
        return t.effects.animateClass.call(this, { add: i3, remove: e2 }, s2, n2, o2);
      } });
    }(), function() {
      function s(e2, i2, s2, n2) {
        return t.isPlainObject(e2) && (i2 = e2, e2 = e2.effect), e2 = { effect: e2 }, null == i2 && (i2 = {}), t.isFunction(i2) && (n2 = i2, s2 = null, i2 = {}), ("number" == typeof i2 || t.fx.speeds[i2]) && (n2 = s2, s2 = i2, i2 = {}), t.isFunction(s2) && (n2 = s2, s2 = null), i2 && t.extend(e2, i2), s2 = s2 || i2.duration, e2.duration = t.fx.off ? 0 : "number" == typeof s2 ? s2 : s2 in t.fx.speeds ? t.fx.speeds[s2] : t.fx.speeds._default, e2.complete = n2 || i2.complete, e2;
      }
      function n(e2) {
        return !e2 || "number" == typeof e2 || t.fx.speeds[e2] ? true : "string" != typeof e2 || t.effects.effect[e2] ? t.isFunction(e2) ? true : "object" != typeof e2 || e2.effect ? false : true : true;
      }
      t.extend(t.effects, { version: "1.10.2", save: function(t2, e2) {
        for (var s2 = 0; e2.length > s2; s2++)
          null !== e2[s2] && t2.data(i + e2[s2], t2[0].style[e2[s2]]);
      }, restore: function(t2, s2) {
        var n2, o;
        for (o = 0; s2.length > o; o++)
          null !== s2[o] && (n2 = t2.data(i + s2[o]), n2 === e && (n2 = ""), t2.css(s2[o], n2));
      }, setMode: function(t2, e2) {
        return "toggle" === e2 && (e2 = t2.is(":hidden") ? "show" : "hide"), e2;
      }, getBaseline: function(t2, e2) {
        var i2, s2;
        switch (t2[0]) {
          case "top":
            i2 = 0;
            break;
          case "middle":
            i2 = 0.5;
            break;
          case "bottom":
            i2 = 1;
            break;
          default:
            i2 = t2[0] / e2.height;
        }
        switch (t2[1]) {
          case "left":
            s2 = 0;
            break;
          case "center":
            s2 = 0.5;
            break;
          case "right":
            s2 = 1;
            break;
          default:
            s2 = t2[1] / e2.width;
        }
        return { x: s2, y: i2 };
      }, createWrapper: function(e2) {
        if (e2.parent().is(".ui-effects-wrapper"))
          return e2.parent();
        var i2 = { width: e2.outerWidth(true), height: e2.outerHeight(true), "float": e2.css("float") }, s2 = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }), n2 = { width: e2.width(), height: e2.height() }, o = document.activeElement;
        try {
          o.id;
        } catch (a) {
          o = document.body;
        }
        return e2.wrap(s2), (e2[0] === o || t.contains(e2[0], o)) && t(o).focus(), s2 = e2.parent(), "static" === e2.css("position") ? (s2.css({ position: "relative" }), e2.css({ position: "relative" })) : (t.extend(i2, { position: e2.css("position"), zIndex: e2.css("z-index") }), t.each(["top", "left", "bottom", "right"], function(t2, s3) {
          i2[s3] = e2.css(s3), isNaN(parseInt(i2[s3], 10)) && (i2[s3] = "auto");
        }), e2.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), e2.css(n2), s2.css(i2).show();
      }, removeWrapper: function(e2) {
        var i2 = document.activeElement;
        return e2.parent().is(".ui-effects-wrapper") && (e2.parent().replaceWith(e2), (e2[0] === i2 || t.contains(e2[0], i2)) && t(i2).focus()), e2;
      }, setTransition: function(e2, i2, s2, n2) {
        return n2 = n2 || {}, t.each(i2, function(t2, i3) {
          var o = e2.cssUnit(i3);
          o[0] > 0 && (n2[i3] = o[0] * s2 + o[1]);
        }), n2;
      } }), t.fn.extend({ effect: function() {
        function e2(e3) {
          function s2() {
            t.isFunction(o2) && o2.call(n3[0]), t.isFunction(e3) && e3();
          }
          var n3 = t(this), o2 = i2.complete, r = i2.mode;
          (n3.is(":hidden") ? "hide" === r : "show" === r) ? (n3[r](), s2()) : a.call(n3[0], i2, s2);
        }
        var i2 = s.apply(this, arguments), n2 = i2.mode, o = i2.queue, a = t.effects.effect[i2.effect];
        return t.fx.off || !a ? n2 ? this[n2](i2.duration, i2.complete) : this.each(function() {
          i2.complete && i2.complete.call(this);
        }) : o === false ? this.each(e2) : this.queue(o || "fx", e2);
      }, show: function(t2) {
        return function(e2) {
          if (n(e2))
            return t2.apply(this, arguments);
          var i2 = s.apply(this, arguments);
          return i2.mode = "show", this.effect.call(this, i2);
        };
      }(t.fn.show), hide: function(t2) {
        return function(e2) {
          if (n(e2))
            return t2.apply(this, arguments);
          var i2 = s.apply(this, arguments);
          return i2.mode = "hide", this.effect.call(this, i2);
        };
      }(t.fn.hide), toggle: function(t2) {
        return function(e2) {
          if (n(e2) || "boolean" == typeof e2)
            return t2.apply(this, arguments);
          var i2 = s.apply(this, arguments);
          return i2.mode = "toggle", this.effect.call(this, i2);
        };
      }(t.fn.toggle), cssUnit: function(e2) {
        var i2 = this.css(e2), s2 = [];
        return t.each(["em", "px", "%", "pt"], function(t2, e3) {
          i2.indexOf(e3) > 0 && (s2 = [parseFloat(i2), e3]);
        }), s2;
      } });
    }(), function() {
      var e2 = {};
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t2, i2) {
        e2[i2] = function(e3) {
          return Math.pow(e3, t2 + 2);
        };
      }), t.extend(e2, { Sine: function(t2) {
        return 1 - Math.cos(t2 * Math.PI / 2);
      }, Circ: function(t2) {
        return 1 - Math.sqrt(1 - t2 * t2);
      }, Elastic: function(t2) {
        return 0 === t2 || 1 === t2 ? t2 : -Math.pow(2, 8 * (t2 - 1)) * Math.sin((80 * (t2 - 1) - 7.5) * Math.PI / 15);
      }, Back: function(t2) {
        return t2 * t2 * (3 * t2 - 2);
      }, Bounce: function(t2) {
        for (var e3, i2 = 4; ((e3 = Math.pow(2, --i2)) - 1) / 11 > t2; )
          ;
        return 1 / Math.pow(4, 3 - i2) - 7.5625 * Math.pow((3 * e3 - 2) / 22 - t2, 2);
      } }), t.each(e2, function(e3, i2) {
        t.easing["easeIn" + e3] = i2, t.easing["easeOut" + e3] = function(t2) {
          return 1 - i2(1 - t2);
        }, t.easing["easeInOut" + e3] = function(t2) {
          return 0.5 > t2 ? i2(2 * t2) / 2 : 1 - i2(-2 * t2 + 2) / 2;
        };
      });
    }();
  }(jQuery), function(t) {
    var e = 0, i = {}, s = {};
    i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show", t.widget("ui.accordion", { version: "1.10.2", options: { active: 0, animate: {}, collapsible: false, event: "click", header: "> li > :first-child,> :not(li):even", heightStyle: "auto", icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }, activate: null, beforeActivate: null }, _create: function() {
      var e2 = this.options;
      this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e2.collapsible || e2.active !== false && null != e2.active || (e2.active = 0), this._processPanels(), 0 > e2.active && (e2.active += this.headers.length), this._refresh();
    }, _getCreateEventData: function() {
      return { header: this.active, panel: this.active.length ? this.active.next() : t(), content: this.active.length ? this.active.next() : t() };
    }, _createIcons: function() {
      var e2 = this.options.icons;
      e2 && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e2.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e2.header).addClass(e2.activeHeader), this.headers.addClass("ui-accordion-icons"));
    }, _destroyIcons: function() {
      this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();
    }, _destroy: function() {
      var t2;
      this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
        /^ui-accordion/.test(this.id) && this.removeAttribute("id");
      }), this._destroyIcons(), t2 = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
        /^ui-accordion/.test(this.id) && this.removeAttribute("id");
      }), "content" !== this.options.heightStyle && t2.css("height", "");
    }, _setOption: function(t2, e2) {
      return "active" === t2 ? (this._activate(e2), void 0) : ("event" === t2 && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e2)), this._super(t2, e2), "collapsible" !== t2 || e2 || this.options.active !== false || this._activate(0), "icons" === t2 && (this._destroyIcons(), e2 && this._createIcons()), "disabled" === t2 && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e2), void 0);
    }, _keydown: function(e2) {
      if (!e2.altKey && !e2.ctrlKey) {
        var i2 = t.ui.keyCode, s2 = this.headers.length, n = this.headers.index(e2.target), o = false;
        switch (e2.keyCode) {
          case i2.RIGHT:
          case i2.DOWN:
            o = this.headers[(n + 1) % s2];
            break;
          case i2.LEFT:
          case i2.UP:
            o = this.headers[(n - 1 + s2) % s2];
            break;
          case i2.SPACE:
          case i2.ENTER:
            this._eventHandler(e2);
            break;
          case i2.HOME:
            o = this.headers[0];
            break;
          case i2.END:
            o = this.headers[s2 - 1];
        }
        o && (t(e2.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e2.preventDefault());
      }
    }, _panelKeyDown: function(e2) {
      e2.keyCode === t.ui.keyCode.UP && e2.ctrlKey && t(e2.currentTarget).prev().focus();
    }, refresh: function() {
      var e2 = this.options;
      this._processPanels(), (e2.active === false && e2.collapsible === true || !this.headers.length) && (e2.active = false, this.active = t()), e2.active === false ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e2.active = false, this.active = t()) : this._activate(Math.max(0, e2.active - 1)) : e2.active = this.headers.index(this.active), this._destroyIcons(), this._refresh();
    }, _processPanels: function() {
      this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide();
    }, _refresh: function() {
      var i2, s2 = this.options, n = s2.heightStyle, o = this.element.parent(), a = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
      this.active = this._findActive(s2.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(e2) {
        var i3 = t(this), s3 = i3.attr("id"), n2 = i3.next(), o2 = n2.attr("id");
        s3 || (s3 = a + "-header-" + e2, i3.attr("id", s3)), o2 || (o2 = a + "-panel-" + e2, n2.attr("id", o2)), i3.attr("aria-controls", o2), n2.attr("aria-labelledby", s3);
      }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({ "aria-selected": "false", tabIndex: -1 }).next().attr({ "aria-expanded": "false", "aria-hidden": "true" }).hide(), this.active.length ? this.active.attr({ "aria-selected": "true", tabIndex: 0 }).next().attr({ "aria-expanded": "true", "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(s2.event), "fill" === n ? (i2 = o.height(), this.element.siblings(":visible").each(function() {
        var e2 = t(this), s3 = e2.css("position");
        "absolute" !== s3 && "fixed" !== s3 && (i2 -= e2.outerHeight(true));
      }), this.headers.each(function() {
        i2 -= t(this).outerHeight(true);
      }), this.headers.next().each(function() {
        t(this).height(Math.max(0, i2 - t(this).innerHeight() + t(this).height()));
      }).css("overflow", "auto")) : "auto" === n && (i2 = 0, this.headers.next().each(function() {
        i2 = Math.max(i2, t(this).css("height", "").height());
      }).height(i2));
    }, _activate: function(e2) {
      var i2 = this._findActive(e2)[0];
      i2 !== this.active[0] && (i2 = i2 || this.active[0], this._eventHandler({ target: i2, currentTarget: i2, preventDefault: t.noop }));
    }, _findActive: function(e2) {
      return "number" == typeof e2 ? this.headers.eq(e2) : t();
    }, _setupEvents: function(e2) {
      var i2 = { keydown: "_keydown" };
      e2 && t.each(e2.split(" "), function(t2, e3) {
        i2[e3] = "_eventHandler";
      }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i2), this._on(this.headers.next(), { keydown: "_panelKeyDown" }), this._hoverable(this.headers), this._focusable(this.headers);
    }, _eventHandler: function(e2) {
      var i2 = this.options, s2 = this.active, n = t(e2.currentTarget), o = n[0] === s2[0], a = o && i2.collapsible, r = a ? t() : n.next(), h = s2.next(), l = { oldHeader: s2, oldPanel: h, newHeader: a ? t() : n, newPanel: r };
      e2.preventDefault(), o && !i2.collapsible || this._trigger("beforeActivate", e2, l) === false || (i2.active = a ? false : this.headers.index(n), this.active = o ? t() : n, this._toggle(l), s2.removeClass("ui-accordion-header-active ui-state-active"), i2.icons && s2.children(".ui-accordion-header-icon").removeClass(i2.icons.activeHeader).addClass(i2.icons.header), o || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i2.icons && n.children(".ui-accordion-header-icon").removeClass(i2.icons.header).addClass(i2.icons.activeHeader), n.next().addClass("ui-accordion-content-active")));
    }, _toggle: function(e2) {
      var i2 = e2.newPanel, s2 = this.prevShow.length ? this.prevShow : e2.oldPanel;
      this.prevShow.add(this.prevHide).stop(true, true), this.prevShow = i2, this.prevHide = s2, this.options.animate ? this._animate(i2, s2, e2) : (s2.hide(), i2.show(), this._toggleComplete(e2)), s2.attr({ "aria-expanded": "false", "aria-hidden": "true" }), s2.prev().attr("aria-selected", "false"), i2.length && s2.length ? s2.prev().attr("tabIndex", -1) : i2.length && this.headers.filter(function() {
        return 0 === t(this).attr("tabIndex");
      }).attr("tabIndex", -1), i2.attr({ "aria-expanded": "true", "aria-hidden": "false" }).prev().attr({ "aria-selected": "true", tabIndex: 0 });
    }, _animate: function(t2, e2, n) {
      var o, a, r, h = this, l = 0, c = t2.length && (!e2.length || t2.index() < e2.index()), u = this.options.animate || {}, d = c && u.down || u, p = function() {
        h._toggleComplete(n);
      };
      return "number" == typeof d && (r = d), "string" == typeof d && (a = d), a = a || d.easing || u.easing, r = r || d.duration || u.duration, e2.length ? t2.length ? (o = t2.show().outerHeight(), e2.animate(i, { duration: r, easing: a, step: function(t3, e3) {
        e3.now = Math.round(t3);
      } }), t2.hide().animate(s, { duration: r, easing: a, complete: p, step: function(t3, i2) {
        i2.now = Math.round(t3), "height" !== i2.prop ? l += i2.now : "content" !== h.options.heightStyle && (i2.now = Math.round(o - e2.outerHeight() - l), l = 0);
      } }), void 0) : e2.animate(i, r, a, p) : t2.animate(s, r, a, p);
    }, _toggleComplete: function(t2) {
      var e2 = t2.oldPanel;
      e2.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e2.length && (e2.parent()[0].className = e2.parent()[0].className), this._trigger("activate", null, t2);
    } });
  }(jQuery), function(t) {
    var e = 0;
    t.widget("ui.autocomplete", { version: "1.10.2", defaultElement: "<input>", options: { appendTo: null, autoFocus: false, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null }, pending: 0, _create: function() {
      var e2, i, s, n = this.element[0].nodeName.toLowerCase(), o = "textarea" === n, a = "input" === n;
      this.isMultiLine = o ? true : a ? false : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = true, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, { keydown: function(n2) {
        if (this.element.prop("readOnly"))
          return e2 = true, s = true, i = true, void 0;
        e2 = false, s = false, i = false;
        var o2 = t.ui.keyCode;
        switch (n2.keyCode) {
          case o2.PAGE_UP:
            e2 = true, this._move("previousPage", n2);
            break;
          case o2.PAGE_DOWN:
            e2 = true, this._move("nextPage", n2);
            break;
          case o2.UP:
            e2 = true, this._keyEvent("previous", n2);
            break;
          case o2.DOWN:
            e2 = true, this._keyEvent("next", n2);
            break;
          case o2.ENTER:
          case o2.NUMPAD_ENTER:
            this.menu.active && (e2 = true, n2.preventDefault(), this.menu.select(n2));
            break;
          case o2.TAB:
            this.menu.active && this.menu.select(n2);
            break;
          case o2.ESCAPE:
            this.menu.element.is(":visible") && (this._value(this.term), this.close(n2), n2.preventDefault());
            break;
          default:
            i = true, this._searchTimeout(n2);
        }
      }, keypress: function(s2) {
        if (e2)
          return e2 = false, s2.preventDefault(), void 0;
        if (!i) {
          var n2 = t.ui.keyCode;
          switch (s2.keyCode) {
            case n2.PAGE_UP:
              this._move("previousPage", s2);
              break;
            case n2.PAGE_DOWN:
              this._move("nextPage", s2);
              break;
            case n2.UP:
              this._keyEvent("previous", s2);
              break;
            case n2.DOWN:
              this._keyEvent("next", s2);
          }
        }
      }, input: function(t2) {
        return s ? (s = false, t2.preventDefault(), void 0) : (this._searchTimeout(t2), void 0);
      }, focus: function() {
        this.selectedItem = null, this.previous = this._value();
      }, blur: function(t2) {
        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t2), this._change(t2), void 0);
      } }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ input: t(), role: null }).hide().data("ui-menu"), this._on(this.menu.element, { mousedown: function(e3) {
        e3.preventDefault(), this.cancelBlur = true, this._delay(function() {
          delete this.cancelBlur;
        });
        var i2 = this.menu.element[0];
        t(e3.target).closest(".ui-menu-item").length || this._delay(function() {
          var e4 = this;
          this.document.one("mousedown", function(s2) {
            s2.target === e4.element[0] || s2.target === i2 || t.contains(i2, s2.target) || e4.close();
          });
        });
      }, menufocus: function(e3, i2) {
        if (this.isNewMenu && (this.isNewMenu = false, e3.originalEvent && /^mouse/.test(e3.originalEvent.type)))
          return this.menu.blur(), this.document.one("mousemove", function() {
            t(e3.target).trigger(e3.originalEvent);
          }), void 0;
        var s2 = i2.item.data("ui-autocomplete-item");
        false !== this._trigger("focus", e3, { item: s2 }) ? e3.originalEvent && /^key/.test(e3.originalEvent.type) && this._value(s2.value) : this.liveRegion.text(s2.value);
      }, menuselect: function(t2, e3) {
        var i2 = e3.item.data("ui-autocomplete-item"), s2 = this.previous;
        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s2, this._delay(function() {
          this.previous = s2, this.selectedItem = i2;
        })), false !== this._trigger("select", t2, { item: i2 }) && this._value(i2.value), this.term = this._value(), this.close(t2), this.selectedItem = i2;
      } }), this.liveRegion = t("<span>", { role: "status", "aria-live": "polite" }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), this._on(this.window, { beforeunload: function() {
        this.element.removeAttr("autocomplete");
      } });
    }, _destroy: function() {
      clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
    }, _setOption: function(t2, e2) {
      this._super(t2, e2), "source" === t2 && this._initSource(), "appendTo" === t2 && this.menu.element.appendTo(this._appendTo()), "disabled" === t2 && e2 && this.xhr && this.xhr.abort();
    }, _appendTo: function() {
      var e2 = this.options.appendTo;
      return e2 && (e2 = e2.jquery || e2.nodeType ? t(e2) : this.document.find(e2).eq(0)), e2 || (e2 = this.element.closest(".ui-front")), e2.length || (e2 = this.document[0].body), e2;
    }, _initSource: function() {
      var e2, i, s = this;
      t.isArray(this.options.source) ? (e2 = this.options.source, this.source = function(i2, s2) {
        s2(t.ui.autocomplete.filter(e2, i2.term));
      }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e3, n) {
        s.xhr && s.xhr.abort(), s.xhr = t.ajax({ url: i, data: e3, dataType: "json", success: function(t2) {
          n(t2);
        }, error: function() {
          n([]);
        } });
      }) : this.source = this.options.source;
    }, _searchTimeout: function(t2) {
      clearTimeout(this.searching), this.searching = this._delay(function() {
        this.term !== this._value() && (this.selectedItem = null, this.search(null, t2));
      }, this.options.delay);
    }, search: function(t2, e2) {
      return t2 = null != t2 ? t2 : this._value(), this.term = this._value(), t2.length < this.options.minLength ? this.close(e2) : this._trigger("search", e2) !== false ? this._search(t2) : void 0;
    }, _search: function(t2) {
      this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = false, this.source({ term: t2 }, this._response());
    }, _response: function() {
      var t2 = this, i = ++e;
      return function(s) {
        i === e && t2.__response(s), t2.pending--, t2.pending || t2.element.removeClass("ui-autocomplete-loading");
      };
    }, __response: function(t2) {
      t2 && (t2 = this._normalize(t2)), this._trigger("response", null, { content: t2 }), !this.options.disabled && t2 && t2.length && !this.cancelSearch ? (this._suggest(t2), this._trigger("open")) : this._close();
    }, close: function(t2) {
      this.cancelSearch = true, this._close(t2);
    }, _close: function(t2) {
      this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = true, this._trigger("close", t2));
    }, _change: function(t2) {
      this.previous !== this._value() && this._trigger("change", t2, { item: this.selectedItem });
    }, _normalize: function(e2) {
      return e2.length && e2[0].label && e2[0].value ? e2 : t.map(e2, function(e3) {
        return "string" == typeof e3 ? { label: e3, value: e3 } : t.extend({ label: e3.label || e3.value, value: e3.value || e3.label }, e3);
      });
    }, _suggest: function(e2) {
      var i = this.menu.element.empty();
      this._renderMenu(i, e2), this.isNewMenu = true, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next();
    }, _resizeMenu: function() {
      var t2 = this.menu.element;
      t2.outerWidth(Math.max(t2.width("").outerWidth() + 1, this.element.outerWidth()));
    }, _renderMenu: function(e2, i) {
      var s = this;
      t.each(i, function(t2, i2) {
        s._renderItemData(e2, i2);
      });
    }, _renderItemData: function(t2, e2) {
      return this._renderItem(t2, e2).data("ui-autocomplete-item", e2);
    }, _renderItem: function(e2, i) {
      return t("<li>").append(t("<a>").text(i.label)).appendTo(e2);
    }, _move: function(t2, e2) {
      return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t2) || this.menu.isLastItem() && /^next/.test(t2) ? (this._value(this.term), this.menu.blur(), void 0) : (this.menu[t2](e2), void 0) : (this.search(null, e2), void 0);
    }, widget: function() {
      return this.menu.element;
    }, _value: function() {
      return this.valueMethod.apply(this.element, arguments);
    }, _keyEvent: function(t2, e2) {
      (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t2, e2), e2.preventDefault());
    } }), t.extend(t.ui.autocomplete, { escapeRegex: function(t2) {
      return t2.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }, filter: function(e2, i) {
      var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
      return t.grep(e2, function(t2) {
        return s.test(t2.label || t2.value || t2);
      });
    } }), t.widget("ui.autocomplete", t.ui.autocomplete, { options: { messages: { noResults: "No search results.", results: function(t2) {
      return t2 + (t2 > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
    } } }, __response: function(t2) {
      var e2;
      this._superApply(arguments), this.options.disabled || this.cancelSearch || (e2 = t2 && t2.length ? this.options.messages.results(t2.length) : this.options.messages.noResults, this.liveRegion.text(e2));
    } });
  }(jQuery), function(t) {
    var e, i, s, n, o = "ui-button ui-widget ui-state-default ui-corner-all", a = "ui-state-hover ui-state-active ", r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", h = function() {
      var e2 = t(this).find(":ui-button");
      setTimeout(function() {
        e2.button("refresh");
      }, 1);
    }, l = function(e2) {
      var i2 = e2.name, s2 = e2.form, n2 = t([]);
      return i2 && (i2 = i2.replace(/'/g, "\\'"), n2 = s2 ? t(s2).find("[name='" + i2 + "']") : t("[name='" + i2 + "']", e2.ownerDocument).filter(function() {
        return !this.form;
      })), n2;
    };
    t.widget("ui.button", { version: "1.10.2", defaultElement: "<button>", options: { disabled: null, text: true, label: null, icons: { primary: null, secondary: null } }, _create: function() {
      this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, h), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
      var a2 = this, r2 = this.options, c = "checkbox" === this.type || "radio" === this.type, u = c ? "" : "ui-state-active", d = "ui-state-focus";
      null === r2.label && (r2.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
        r2.disabled || this === e && t(this).addClass("ui-state-active");
      }).bind("mouseleave" + this.eventNamespace, function() {
        r2.disabled || t(this).removeClass(u);
      }).bind("click" + this.eventNamespace, function(t2) {
        r2.disabled && (t2.preventDefault(), t2.stopImmediatePropagation());
      }), this.element.bind("focus" + this.eventNamespace, function() {
        a2.buttonElement.addClass(d);
      }).bind("blur" + this.eventNamespace, function() {
        a2.buttonElement.removeClass(d);
      }), c && (this.element.bind("change" + this.eventNamespace, function() {
        n || a2.refresh();
      }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(t2) {
        r2.disabled || (n = false, i = t2.pageX, s = t2.pageY);
      }).bind("mouseup" + this.eventNamespace, function(t2) {
        r2.disabled || (i !== t2.pageX || s !== t2.pageY) && (n = true);
      })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
        return r2.disabled || n ? false : void 0;
      }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
        if (r2.disabled || n)
          return false;
        t(this).addClass("ui-state-active"), a2.buttonElement.attr("aria-pressed", "true");
        var e2 = a2.element[0];
        l(e2).not(e2).map(function() {
          return t(this).button("widget")[0];
        }).removeClass("ui-state-active").attr("aria-pressed", "false");
      }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
        return r2.disabled ? false : (t(this).addClass("ui-state-active"), e = this, a2.document.one("mouseup", function() {
          e = null;
        }), void 0);
      }).bind("mouseup" + this.eventNamespace, function() {
        return r2.disabled ? false : (t(this).removeClass("ui-state-active"), void 0);
      }).bind("keydown" + this.eventNamespace, function(e2) {
        return r2.disabled ? false : ((e2.keyCode === t.ui.keyCode.SPACE || e2.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"), void 0);
      }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
        t(this).removeClass("ui-state-active");
      }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e2) {
        e2.keyCode === t.ui.keyCode.SPACE && t(this).click();
      })), this._setOption("disabled", r2.disabled), this._resetButton();
    }, _determineButtonType: function() {
      var t2, e2, i2;
      this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t2 = this.element.parents().last(), e2 = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t2.find(e2), this.buttonElement.length || (t2 = t2.length ? t2.siblings() : this.element.siblings(), this.buttonElement = t2.filter(e2), this.buttonElement.length || (this.buttonElement = t2.find(e2))), this.element.addClass("ui-helper-hidden-accessible"), i2 = this.element.is(":checked"), i2 && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i2)) : this.buttonElement = this.element;
    }, widget: function() {
      return this.buttonElement;
    }, _destroy: function() {
      this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(o + " " + a + " " + r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title");
    }, _setOption: function(t2, e2) {
      return this._super(t2, e2), "disabled" === t2 ? (e2 ? this.element.prop("disabled", true) : this.element.prop("disabled", false), void 0) : (this._resetButton(), void 0);
    }, refresh: function() {
      var e2 = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
      e2 !== this.options.disabled && this._setOption("disabled", e2), "radio" === this.type ? l(this.element[0]).each(function() {
        t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
      }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
    }, _resetButton: function() {
      if ("input" === this.type)
        return this.options.label && this.element.val(this.options.label), void 0;
      var e2 = this.buttonElement.removeClass(r), i2 = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e2.empty()).text(), s2 = this.options.icons, n2 = s2.primary && s2.secondary, o2 = [];
      s2.primary || s2.secondary ? (this.options.text && o2.push("ui-button-text-icon" + (n2 ? "s" : s2.primary ? "-primary" : "-secondary")), s2.primary && e2.prepend("<span class='ui-button-icon-primary ui-icon " + s2.primary + "'></span>"), s2.secondary && e2.append("<span class='ui-button-icon-secondary ui-icon " + s2.secondary + "'></span>"), this.options.text || (o2.push(n2 ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e2.attr("title", t.trim(i2)))) : o2.push("ui-button-text-only"), e2.addClass(o2.join(" "));
    } }), t.widget("ui.buttonset", { version: "1.10.2", options: { items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)" }, _create: function() {
      this.element.addClass("ui-buttonset");
    }, _init: function() {
      this.refresh();
    }, _setOption: function(t2, e2) {
      "disabled" === t2 && this.buttons.button("option", t2, e2), this._super(t2, e2);
    }, refresh: function() {
      var e2 = "rtl" === this.element.css("direction");
      this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
        return t(this).button("widget")[0];
      }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e2 ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e2 ? "ui-corner-left" : "ui-corner-right").end().end();
    }, _destroy: function() {
      this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
        return t(this).button("widget")[0];
      }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
    } });
  }(jQuery), function(t, e) {
    function i() {
      this._curInst = null, this._keyEvent = false, this._disabledInputs = [], this._datepickerShowing = false, this._inDialog = false, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: false, showMonthAfterYear: false, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: false, hideIfNoPrevNext: false, navigationAsDateFormat: false, gotoCurrent: false, changeMonth: false, changeYear: false, yearRange: "c-10:c+10", showOtherMonths: false, selectOtherMonths: false, showWeek: false, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: true, showButtonPanel: false, autoSize: false, disabled: false }, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }
    function s(e2) {
      var i2 = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
      return e2.delegate(i2, "mouseout", function() {
        t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover");
      }).delegate(i2, "mouseover", function() {
        t.datepicker._isDisabledDatepicker(o.inline ? e2.parent()[0] : o.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"));
      });
    }
    function n(e2, i2) {
      t.extend(e2, i2);
      for (var s2 in i2)
        null == i2[s2] && (e2[s2] = i2[s2]);
      return e2;
    }
    t.extend(t.ui, { datepicker: { version: "1.10.2" } });
    var o, a = "datepicker", r = (/* @__PURE__ */ new Date()).getTime();
    t.extend(i.prototype, { markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function() {
      return this.dpDiv;
    }, setDefaults: function(t2) {
      return n(this._defaults, t2 || {}), this;
    }, _attachDatepicker: function(e2, i2) {
      var s2, n2, o2;
      s2 = e2.nodeName.toLowerCase(), n2 = "div" === s2 || "span" === s2, e2.id || (this.uuid += 1, e2.id = "dp" + this.uuid), o2 = this._newInst(t(e2), n2), o2.settings = t.extend({}, i2 || {}), "input" === s2 ? this._connectDatepicker(e2, o2) : n2 && this._inlineDatepicker(e2, o2);
    }, _newInst: function(e2, i2) {
      var n2 = e2[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return { id: n2, input: e2, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i2, dpDiv: i2 ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv };
    }, _connectDatepicker: function(e2, i2) {
      var s2 = t(e2);
      i2.append = t([]), i2.trigger = t([]), s2.hasClass(this.markerClassName) || (this._attachments(s2, i2), s2.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i2), t.data(e2, a, i2), i2.settings.disabled && this._disableDatepicker(e2));
    }, _attachments: function(e2, i2) {
      var s2, n2, o2, a2 = this._get(i2, "appendText"), r2 = this._get(i2, "isRTL");
      i2.append && i2.append.remove(), a2 && (i2.append = t("<span class='" + this._appendClass + "'>" + a2 + "</span>"), e2[r2 ? "before" : "after"](i2.append)), e2.unbind("focus", this._showDatepicker), i2.trigger && i2.trigger.remove(), s2 = this._get(i2, "showOn"), ("focus" === s2 || "both" === s2) && e2.focus(this._showDatepicker), ("button" === s2 || "both" === s2) && (n2 = this._get(i2, "buttonText"), o2 = this._get(i2, "buttonImage"), i2.trigger = t(this._get(i2, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({ src: o2, alt: n2, title: n2 }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o2 ? t("<img/>").attr({ src: o2, alt: n2, title: n2 }) : n2)), e2[r2 ? "before" : "after"](i2.trigger), i2.trigger.click(function() {
        return t.datepicker._datepickerShowing && t.datepicker._lastInput === e2[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e2[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e2[0])) : t.datepicker._showDatepicker(e2[0]), false;
      }));
    }, _autoSize: function(t2) {
      if (this._get(t2, "autoSize") && !t2.inline) {
        var e2, i2, s2, n2, o2 = new Date(2009, 11, 20), a2 = this._get(t2, "dateFormat");
        a2.match(/[DM]/) && (e2 = function(t3) {
          for (i2 = 0, s2 = 0, n2 = 0; t3.length > n2; n2++)
            t3[n2].length > i2 && (i2 = t3[n2].length, s2 = n2);
          return s2;
        }, o2.setMonth(e2(this._get(t2, a2.match(/MM/) ? "monthNames" : "monthNamesShort"))), o2.setDate(e2(this._get(t2, a2.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o2.getDay())), t2.input.attr("size", this._formatDate(t2, o2).length);
      }
    }, _inlineDatepicker: function(e2, i2) {
      var s2 = t(e2);
      s2.hasClass(this.markerClassName) || (s2.addClass(this.markerClassName).append(i2.dpDiv), t.data(e2, a, i2), this._setDate(i2, this._getDefaultDate(i2), true), this._updateDatepicker(i2), this._updateAlternate(i2), i2.settings.disabled && this._disableDatepicker(e2), i2.dpDiv.css("display", "block"));
    }, _dialogDatepicker: function(e2, i2, s2, o2, r2) {
      var h, l, c, u, d, p = this._dialogInst;
      return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, false), p.settings = {}, t.data(this._dialogInput[0], a, p)), n(p.settings, o2 || {}), i2 = i2 && i2.constructor === Date ? this._formatDate(p, i2) : i2, this._dialogInput.val(i2), this._pos = r2 ? r2.length ? r2 : [r2.pageX, r2.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s2, this._inDialog = true, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], a, p), this;
    }, _destroyDatepicker: function(e2) {
      var i2, s2 = t(e2), n2 = t.data(e2, a);
      s2.hasClass(this.markerClassName) && (i2 = e2.nodeName.toLowerCase(), t.removeData(e2, a), "input" === i2 ? (n2.append.remove(), n2.trigger.remove(), s2.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i2 || "span" === i2) && s2.removeClass(this.markerClassName).empty());
    }, _enableDatepicker: function(e2) {
      var i2, s2, n2 = t(e2), o2 = t.data(e2, a);
      n2.hasClass(this.markerClassName) && (i2 = e2.nodeName.toLowerCase(), "input" === i2 ? (e2.disabled = false, o2.trigger.filter("button").each(function() {
        this.disabled = false;
      }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === i2 || "span" === i2) && (s2 = n2.children("." + this._inlineClass), s2.children().removeClass("ui-state-disabled"), s2.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)), this._disabledInputs = t.map(this._disabledInputs, function(t2) {
        return t2 === e2 ? null : t2;
      }));
    }, _disableDatepicker: function(e2) {
      var i2, s2, n2 = t(e2), o2 = t.data(e2, a);
      n2.hasClass(this.markerClassName) && (i2 = e2.nodeName.toLowerCase(), "input" === i2 ? (e2.disabled = true, o2.trigger.filter("button").each(function() {
        this.disabled = true;
      }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === i2 || "span" === i2) && (s2 = n2.children("." + this._inlineClass), s2.children().addClass("ui-state-disabled"), s2.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)), this._disabledInputs = t.map(this._disabledInputs, function(t2) {
        return t2 === e2 ? null : t2;
      }), this._disabledInputs[this._disabledInputs.length] = e2);
    }, _isDisabledDatepicker: function(t2) {
      if (!t2)
        return false;
      for (var e2 = 0; this._disabledInputs.length > e2; e2++)
        if (this._disabledInputs[e2] === t2)
          return true;
      return false;
    }, _getInst: function(e2) {
      try {
        return t.data(e2, a);
      } catch (i2) {
        throw "Missing instance data for this datepicker";
      }
    }, _optionDatepicker: function(i2, s2, o2) {
      var a2, r2, h, l, c = this._getInst(i2);
      return 2 === arguments.length && "string" == typeof s2 ? "defaults" === s2 ? t.extend({}, t.datepicker._defaults) : c ? "all" === s2 ? t.extend({}, c.settings) : this._get(c, s2) : null : (a2 = s2 || {}, "string" == typeof s2 && (a2 = {}, a2[s2] = o2), c && (this._curInst === c && this._hideDatepicker(), r2 = this._getDateDatepicker(i2, true), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, a2), null !== h && a2.dateFormat !== e && a2.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && a2.dateFormat !== e && a2.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled" in a2 && (a2.disabled ? this._disableDatepicker(i2) : this._enableDatepicker(i2)), this._attachments(t(i2), c), this._autoSize(c), this._setDate(c, r2), this._updateAlternate(c), this._updateDatepicker(c)), e);
    }, _changeDatepicker: function(t2, e2, i2) {
      this._optionDatepicker(t2, e2, i2);
    }, _refreshDatepicker: function(t2) {
      var e2 = this._getInst(t2);
      e2 && this._updateDatepicker(e2);
    }, _setDateDatepicker: function(t2, e2) {
      var i2 = this._getInst(t2);
      i2 && (this._setDate(i2, e2), this._updateDatepicker(i2), this._updateAlternate(i2));
    }, _getDateDatepicker: function(t2, e2) {
      var i2 = this._getInst(t2);
      return i2 && !i2.inline && this._setDateFromField(i2, e2), i2 ? this._getDate(i2) : null;
    }, _doKeyDown: function(e2) {
      var i2, s2, n2, o2 = t.datepicker._getInst(e2.target), a2 = true, r2 = o2.dpDiv.is(".ui-datepicker-rtl");
      if (o2._keyEvent = true, t.datepicker._datepickerShowing)
        switch (e2.keyCode) {
          case 9:
            t.datepicker._hideDatepicker(), a2 = false;
            break;
          case 13:
            return n2 = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o2.dpDiv), n2[0] && t.datepicker._selectDay(e2.target, o2.selectedMonth, o2.selectedYear, n2[0]), i2 = t.datepicker._get(o2, "onSelect"), i2 ? (s2 = t.datepicker._formatDate(o2), i2.apply(o2.input ? o2.input[0] : null, [s2, o2])) : t.datepicker._hideDatepicker(), false;
          case 27:
            t.datepicker._hideDatepicker();
            break;
          case 33:
            t.datepicker._adjustDate(e2.target, e2.ctrlKey ? -t.datepicker._get(o2, "stepBigMonths") : -t.datepicker._get(o2, "stepMonths"), "M");
            break;
          case 34:
            t.datepicker._adjustDate(e2.target, e2.ctrlKey ? +t.datepicker._get(o2, "stepBigMonths") : +t.datepicker._get(o2, "stepMonths"), "M");
            break;
          case 35:
            (e2.ctrlKey || e2.metaKey) && t.datepicker._clearDate(e2.target), a2 = e2.ctrlKey || e2.metaKey;
            break;
          case 36:
            (e2.ctrlKey || e2.metaKey) && t.datepicker._gotoToday(e2.target), a2 = e2.ctrlKey || e2.metaKey;
            break;
          case 37:
            (e2.ctrlKey || e2.metaKey) && t.datepicker._adjustDate(e2.target, r2 ? 1 : -1, "D"), a2 = e2.ctrlKey || e2.metaKey, e2.originalEvent.altKey && t.datepicker._adjustDate(e2.target, e2.ctrlKey ? -t.datepicker._get(o2, "stepBigMonths") : -t.datepicker._get(o2, "stepMonths"), "M");
            break;
          case 38:
            (e2.ctrlKey || e2.metaKey) && t.datepicker._adjustDate(e2.target, -7, "D"), a2 = e2.ctrlKey || e2.metaKey;
            break;
          case 39:
            (e2.ctrlKey || e2.metaKey) && t.datepicker._adjustDate(e2.target, r2 ? -1 : 1, "D"), a2 = e2.ctrlKey || e2.metaKey, e2.originalEvent.altKey && t.datepicker._adjustDate(e2.target, e2.ctrlKey ? +t.datepicker._get(o2, "stepBigMonths") : +t.datepicker._get(o2, "stepMonths"), "M");
            break;
          case 40:
            (e2.ctrlKey || e2.metaKey) && t.datepicker._adjustDate(e2.target, 7, "D"), a2 = e2.ctrlKey || e2.metaKey;
            break;
          default:
            a2 = false;
        }
      else
        36 === e2.keyCode && e2.ctrlKey ? t.datepicker._showDatepicker(this) : a2 = false;
      a2 && (e2.preventDefault(), e2.stopPropagation());
    }, _doKeyPress: function(i2) {
      var s2, n2, o2 = t.datepicker._getInst(i2.target);
      return t.datepicker._get(o2, "constrainInput") ? (s2 = t.datepicker._possibleChars(t.datepicker._get(o2, "dateFormat")), n2 = String.fromCharCode(null == i2.charCode ? i2.keyCode : i2.charCode), i2.ctrlKey || i2.metaKey || " " > n2 || !s2 || s2.indexOf(n2) > -1) : e;
    }, _doKeyUp: function(e2) {
      var i2, s2 = t.datepicker._getInst(e2.target);
      if (s2.input.val() !== s2.lastVal)
        try {
          i2 = t.datepicker.parseDate(t.datepicker._get(s2, "dateFormat"), s2.input ? s2.input.val() : null, t.datepicker._getFormatConfig(s2)), i2 && (t.datepicker._setDateFromField(s2), t.datepicker._updateAlternate(s2), t.datepicker._updateDatepicker(s2));
        } catch (n2) {
        }
      return true;
    }, _showDatepicker: function(e2) {
      if (e2 = e2.target || e2, "input" !== e2.nodeName.toLowerCase() && (e2 = t("input", e2.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e2) && t.datepicker._lastInput !== e2) {
        var i2, s2, o2, a2, r2, h, l;
        i2 = t.datepicker._getInst(e2), t.datepicker._curInst && t.datepicker._curInst !== i2 && (t.datepicker._curInst.dpDiv.stop(true, true), i2 && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s2 = t.datepicker._get(i2, "beforeShow"), o2 = s2 ? s2.apply(e2, [e2, i2]) : {}, o2 !== false && (n(i2.settings, o2), i2.lastVal = null, t.datepicker._lastInput = e2, t.datepicker._setDateFromField(i2), t.datepicker._inDialog && (e2.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e2), t.datepicker._pos[1] += e2.offsetHeight), a2 = false, t(e2).parents().each(function() {
          return a2 |= "fixed" === t(this).css("position"), !a2;
        }), r2 = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }, t.datepicker._pos = null, i2.dpDiv.empty(), i2.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), t.datepicker._updateDatepicker(i2), r2 = t.datepicker._checkOffset(i2, r2, a2), i2.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : a2 ? "fixed" : "absolute", display: "none", left: r2.left + "px", top: r2.top + "px" }), i2.inline || (h = t.datepicker._get(i2, "showAnim"), l = t.datepicker._get(i2, "duration"), i2.dpDiv.zIndex(t(e2).zIndex() + 1), t.datepicker._datepickerShowing = true, t.effects && t.effects.effect[h] ? i2.dpDiv.show(h, t.datepicker._get(i2, "showOptions"), l) : i2.dpDiv[h || "show"](h ? l : null), i2.input.is(":visible") && !i2.input.is(":disabled") && i2.input.focus(), t.datepicker._curInst = i2));
      }
    }, _updateDatepicker: function(e2) {
      this.maxRows = 4, o = e2, e2.dpDiv.empty().append(this._generateHTML(e2)), this._attachHandlers(e2), e2.dpDiv.find("." + this._dayOverClass + " a").mouseover();
      var i2, s2 = this._getNumberOfMonths(e2), n2 = s2[1], a2 = 17;
      e2.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n2 > 1 && e2.dpDiv.addClass("ui-datepicker-multi-" + n2).css("width", a2 * n2 + "em"), e2.dpDiv[(1 !== s2[0] || 1 !== s2[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e2.dpDiv[(this._get(e2, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e2 === t.datepicker._curInst && t.datepicker._datepickerShowing && e2.input && e2.input.is(":visible") && !e2.input.is(":disabled") && e2.input[0] !== document.activeElement && e2.input.focus(), e2.yearshtml && (i2 = e2.yearshtml, setTimeout(function() {
        i2 === e2.yearshtml && e2.yearshtml && e2.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e2.yearshtml), i2 = e2.yearshtml = null;
      }, 0));
    }, _getBorders: function(t2) {
      var e2 = function(t3) {
        return { thin: 1, medium: 2, thick: 3 }[t3] || t3;
      };
      return [parseFloat(e2(t2.css("border-left-width"))), parseFloat(e2(t2.css("border-top-width")))];
    }, _checkOffset: function(e2, i2, s2) {
      var n2 = e2.dpDiv.outerWidth(), o2 = e2.dpDiv.outerHeight(), a2 = e2.input ? e2.input.outerWidth() : 0, r2 = e2.input ? e2.input.outerHeight() : 0, h = document.documentElement.clientWidth + (s2 ? 0 : t(document).scrollLeft()), l = document.documentElement.clientHeight + (s2 ? 0 : t(document).scrollTop());
      return i2.left -= this._get(e2, "isRTL") ? n2 - a2 : 0, i2.left -= s2 && i2.left === e2.input.offset().left ? t(document).scrollLeft() : 0, i2.top -= s2 && i2.top === e2.input.offset().top + r2 ? t(document).scrollTop() : 0, i2.left -= Math.min(i2.left, i2.left + n2 > h && h > n2 ? Math.abs(i2.left + n2 - h) : 0), i2.top -= Math.min(i2.top, i2.top + o2 > l && l > o2 ? Math.abs(o2 + r2) : 0), i2;
    }, _findPos: function(e2) {
      for (var i2, s2 = this._getInst(e2), n2 = this._get(s2, "isRTL"); e2 && ("hidden" === e2.type || 1 !== e2.nodeType || t.expr.filters.hidden(e2)); )
        e2 = e2[n2 ? "previousSibling" : "nextSibling"];
      return i2 = t(e2).offset(), [i2.left, i2.top];
    }, _hideDatepicker: function(e2) {
      var i2, s2, n2, o2, r2 = this._curInst;
      !r2 || e2 && r2 !== t.data(e2, a) || this._datepickerShowing && (i2 = this._get(r2, "showAnim"), s2 = this._get(r2, "duration"), n2 = function() {
        t.datepicker._tidyDialog(r2);
      }, t.effects && (t.effects.effect[i2] || t.effects[i2]) ? r2.dpDiv.hide(i2, t.datepicker._get(r2, "showOptions"), s2, n2) : r2.dpDiv["slideDown" === i2 ? "slideUp" : "fadeIn" === i2 ? "fadeOut" : "hide"](i2 ? s2 : null, n2), i2 || n2(), this._datepickerShowing = false, o2 = this._get(r2, "onClose"), o2 && o2.apply(r2.input ? r2.input[0] : null, [r2.input ? r2.input.val() : "", r2]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = false);
    }, _tidyDialog: function(t2) {
      t2.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
    }, _checkExternalClick: function(e2) {
      if (t.datepicker._curInst) {
        var i2 = t(e2.target), s2 = t.datepicker._getInst(i2[0]);
        (i2[0].id !== t.datepicker._mainDivId && 0 === i2.parents("#" + t.datepicker._mainDivId).length && !i2.hasClass(t.datepicker.markerClassName) && !i2.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i2.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s2) && t.datepicker._hideDatepicker();
      }
    }, _adjustDate: function(e2, i2, s2) {
      var n2 = t(e2), o2 = this._getInst(n2[0]);
      this._isDisabledDatepicker(n2[0]) || (this._adjustInstDate(o2, i2 + ("M" === s2 ? this._get(o2, "showCurrentAtPos") : 0), s2), this._updateDatepicker(o2));
    }, _gotoToday: function(e2) {
      var i2, s2 = t(e2), n2 = this._getInst(s2[0]);
      this._get(n2, "gotoCurrent") && n2.currentDay ? (n2.selectedDay = n2.currentDay, n2.drawMonth = n2.selectedMonth = n2.currentMonth, n2.drawYear = n2.selectedYear = n2.currentYear) : (i2 = /* @__PURE__ */ new Date(), n2.selectedDay = i2.getDate(), n2.drawMonth = n2.selectedMonth = i2.getMonth(), n2.drawYear = n2.selectedYear = i2.getFullYear()), this._notifyChange(n2), this._adjustDate(s2);
    }, _selectMonthYear: function(e2, i2, s2) {
      var n2 = t(e2), o2 = this._getInst(n2[0]);
      o2["selected" + ("M" === s2 ? "Month" : "Year")] = o2["draw" + ("M" === s2 ? "Month" : "Year")] = parseInt(i2.options[i2.selectedIndex].value, 10), this._notifyChange(o2), this._adjustDate(n2);
    }, _selectDay: function(e2, i2, s2, n2) {
      var o2, a2 = t(e2);
      t(n2).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a2[0]) || (o2 = this._getInst(a2[0]), o2.selectedDay = o2.currentDay = t("a", n2).html(), o2.selectedMonth = o2.currentMonth = i2, o2.selectedYear = o2.currentYear = s2, this._selectDate(e2, this._formatDate(o2, o2.currentDay, o2.currentMonth, o2.currentYear)));
    }, _clearDate: function(e2) {
      var i2 = t(e2);
      this._selectDate(i2, "");
    }, _selectDate: function(e2, i2) {
      var s2, n2 = t(e2), o2 = this._getInst(n2[0]);
      i2 = null != i2 ? i2 : this._formatDate(o2), o2.input && o2.input.val(i2), this._updateAlternate(o2), s2 = this._get(o2, "onSelect"), s2 ? s2.apply(o2.input ? o2.input[0] : null, [i2, o2]) : o2.input && o2.input.trigger("change"), o2.inline ? this._updateDatepicker(o2) : (this._hideDatepicker(), this._lastInput = o2.input[0], "object" != typeof o2.input[0] && o2.input.focus(), this._lastInput = null);
    }, _updateAlternate: function(e2) {
      var i2, s2, n2, o2 = this._get(e2, "altField");
      o2 && (i2 = this._get(e2, "altFormat") || this._get(e2, "dateFormat"), s2 = this._getDate(e2), n2 = this.formatDate(i2, s2, this._getFormatConfig(e2)), t(o2).each(function() {
        t(this).val(n2);
      }));
    }, noWeekends: function(t2) {
      var e2 = t2.getDay();
      return [e2 > 0 && 6 > e2, ""];
    }, iso8601Week: function(t2) {
      var e2, i2 = new Date(t2.getTime());
      return i2.setDate(i2.getDate() + 4 - (i2.getDay() || 7)), e2 = i2.getTime(), i2.setMonth(0), i2.setDate(1), Math.floor(Math.round((e2 - i2) / 864e5) / 7) + 1;
    }, parseDate: function(i2, s2, n2) {
      if (null == i2 || null == s2)
        throw "Invalid arguments";
      if (s2 = "object" == typeof s2 ? "" + s2 : s2 + "", "" === s2)
        return null;
      var o2, a2, r2, h, l = 0, c = (n2 ? n2.shortYearCutoff : null) || this._defaults.shortYearCutoff, u = "string" != typeof c ? c : (/* @__PURE__ */ new Date()).getFullYear() % 100 + parseInt(c, 10), d = (n2 ? n2.dayNamesShort : null) || this._defaults.dayNamesShort, p = (n2 ? n2.dayNames : null) || this._defaults.dayNames, f = (n2 ? n2.monthNamesShort : null) || this._defaults.monthNamesShort, g = (n2 ? n2.monthNames : null) || this._defaults.monthNames, m = -1, v = -1, _ = -1, b = -1, y = false, w = function(t2) {
        var e2 = i2.length > o2 + 1 && i2.charAt(o2 + 1) === t2;
        return e2 && o2++, e2;
      }, k = function(t2) {
        var e2 = w(t2), i3 = "@" === t2 ? 14 : "!" === t2 ? 20 : "y" === t2 && e2 ? 4 : "o" === t2 ? 3 : 2, n3 = RegExp("^\\d{1," + i3 + "}"), o3 = s2.substring(l).match(n3);
        if (!o3)
          throw "Missing number at position " + l;
        return l += o3[0].length, parseInt(o3[0], 10);
      }, x = function(i3, n3, o3) {
        var a3 = -1, r3 = t.map(w(i3) ? o3 : n3, function(t2, e2) {
          return [[e2, t2]];
        }).sort(function(t2, e2) {
          return -(t2[1].length - e2[1].length);
        });
        if (t.each(r3, function(t2, i4) {
          var n4 = i4[1];
          return s2.substr(l, n4.length).toLowerCase() === n4.toLowerCase() ? (a3 = i4[0], l += n4.length, false) : e;
        }), -1 !== a3)
          return a3 + 1;
        throw "Unknown name at position " + l;
      }, D = function() {
        if (s2.charAt(l) !== i2.charAt(o2))
          throw "Unexpected literal at position " + l;
        l++;
      };
      for (o2 = 0; i2.length > o2; o2++)
        if (y)
          "'" !== i2.charAt(o2) || w("'") ? D() : y = false;
        else
          switch (i2.charAt(o2)) {
            case "d":
              _ = k("d");
              break;
            case "D":
              x("D", d, p);
              break;
            case "o":
              b = k("o");
              break;
            case "m":
              v = k("m");
              break;
            case "M":
              v = x("M", f, g);
              break;
            case "y":
              m = k("y");
              break;
            case "@":
              h = new Date(k("@")), m = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
              break;
            case "!":
              h = new Date((k("!") - this._ticksTo1970) / 1e4), m = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
              break;
            case "'":
              w("'") ? D() : y = true;
              break;
            default:
              D();
          }
      if (s2.length > l && (r2 = s2.substr(l), !/^\s+/.test(r2)))
        throw "Extra/unparsed characters found in date: " + r2;
      if (-1 === m ? m = (/* @__PURE__ */ new Date()).getFullYear() : 100 > m && (m += (/* @__PURE__ */ new Date()).getFullYear() - (/* @__PURE__ */ new Date()).getFullYear() % 100 + (u >= m ? 0 : -100)), b > -1)
        for (v = 1, _ = b; ; ) {
          if (a2 = this._getDaysInMonth(m, v - 1), a2 >= _)
            break;
          v++, _ -= a2;
        }
      if (h = this._daylightSavingAdjust(new Date(m, v - 1, _)), h.getFullYear() !== m || h.getMonth() + 1 !== v || h.getDate() !== _)
        throw "Invalid date";
      return h;
    }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function(t2, e2, i2) {
      if (!e2)
        return "";
      var s2, n2 = (i2 ? i2.dayNamesShort : null) || this._defaults.dayNamesShort, o2 = (i2 ? i2.dayNames : null) || this._defaults.dayNames, a2 = (i2 ? i2.monthNamesShort : null) || this._defaults.monthNamesShort, r2 = (i2 ? i2.monthNames : null) || this._defaults.monthNames, h = function(e3) {
        var i3 = t2.length > s2 + 1 && t2.charAt(s2 + 1) === e3;
        return i3 && s2++, i3;
      }, l = function(t3, e3, i3) {
        var s3 = "" + e3;
        if (h(t3))
          for (; i3 > s3.length; )
            s3 = "0" + s3;
        return s3;
      }, c = function(t3, e3, i3, s3) {
        return h(t3) ? s3[e3] : i3[e3];
      }, u = "", d = false;
      if (e2)
        for (s2 = 0; t2.length > s2; s2++)
          if (d)
            "'" !== t2.charAt(s2) || h("'") ? u += t2.charAt(s2) : d = false;
          else
            switch (t2.charAt(s2)) {
              case "d":
                u += l("d", e2.getDate(), 2);
                break;
              case "D":
                u += c("D", e2.getDay(), n2, o2);
                break;
              case "o":
                u += l("o", Math.round((new Date(e2.getFullYear(), e2.getMonth(), e2.getDate()).getTime() - new Date(e2.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
              case "m":
                u += l("m", e2.getMonth() + 1, 2);
                break;
              case "M":
                u += c("M", e2.getMonth(), a2, r2);
                break;
              case "y":
                u += h("y") ? e2.getFullYear() : (10 > e2.getYear() % 100 ? "0" : "") + e2.getYear() % 100;
                break;
              case "@":
                u += e2.getTime();
                break;
              case "!":
                u += 1e4 * e2.getTime() + this._ticksTo1970;
                break;
              case "'":
                h("'") ? u += "'" : d = true;
                break;
              default:
                u += t2.charAt(s2);
            }
      return u;
    }, _possibleChars: function(t2) {
      var e2, i2 = "", s2 = false, n2 = function(i3) {
        var s3 = t2.length > e2 + 1 && t2.charAt(e2 + 1) === i3;
        return s3 && e2++, s3;
      };
      for (e2 = 0; t2.length > e2; e2++)
        if (s2)
          "'" !== t2.charAt(e2) || n2("'") ? i2 += t2.charAt(e2) : s2 = false;
        else
          switch (t2.charAt(e2)) {
            case "d":
            case "m":
            case "y":
            case "@":
              i2 += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              n2("'") ? i2 += "'" : s2 = true;
              break;
            default:
              i2 += t2.charAt(e2);
          }
      return i2;
    }, _get: function(t2, i2) {
      return t2.settings[i2] !== e ? t2.settings[i2] : this._defaults[i2];
    }, _setDateFromField: function(t2, e2) {
      if (t2.input.val() !== t2.lastVal) {
        var i2 = this._get(t2, "dateFormat"), s2 = t2.lastVal = t2.input ? t2.input.val() : null, n2 = this._getDefaultDate(t2), o2 = n2, a2 = this._getFormatConfig(t2);
        try {
          o2 = this.parseDate(i2, s2, a2) || n2;
        } catch (r2) {
          s2 = e2 ? "" : s2;
        }
        t2.selectedDay = o2.getDate(), t2.drawMonth = t2.selectedMonth = o2.getMonth(), t2.drawYear = t2.selectedYear = o2.getFullYear(), t2.currentDay = s2 ? o2.getDate() : 0, t2.currentMonth = s2 ? o2.getMonth() : 0, t2.currentYear = s2 ? o2.getFullYear() : 0, this._adjustInstDate(t2);
      }
    }, _getDefaultDate: function(t2) {
      return this._restrictMinMax(t2, this._determineDate(t2, this._get(t2, "defaultDate"), /* @__PURE__ */ new Date()));
    }, _determineDate: function(e2, i2, s2) {
      var n2 = function(t2) {
        var e3 = /* @__PURE__ */ new Date();
        return e3.setDate(e3.getDate() + t2), e3;
      }, o2 = function(i3) {
        try {
          return t.datepicker.parseDate(t.datepicker._get(e2, "dateFormat"), i3, t.datepicker._getFormatConfig(e2));
        } catch (s3) {
        }
        for (var n3 = (i3.toLowerCase().match(/^c/) ? t.datepicker._getDate(e2) : null) || /* @__PURE__ */ new Date(), o3 = n3.getFullYear(), a3 = n3.getMonth(), r2 = n3.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i3); l; ) {
          switch (l[2] || "d") {
            case "d":
            case "D":
              r2 += parseInt(l[1], 10);
              break;
            case "w":
            case "W":
              r2 += 7 * parseInt(l[1], 10);
              break;
            case "m":
            case "M":
              a3 += parseInt(l[1], 10), r2 = Math.min(r2, t.datepicker._getDaysInMonth(o3, a3));
              break;
            case "y":
            case "Y":
              o3 += parseInt(l[1], 10), r2 = Math.min(r2, t.datepicker._getDaysInMonth(o3, a3));
          }
          l = h.exec(i3);
        }
        return new Date(o3, a3, r2);
      }, a2 = null == i2 || "" === i2 ? s2 : "string" == typeof i2 ? o2(i2) : "number" == typeof i2 ? isNaN(i2) ? s2 : n2(i2) : new Date(i2.getTime());
      return a2 = a2 && "Invalid Date" == "" + a2 ? s2 : a2, a2 && (a2.setHours(0), a2.setMinutes(0), a2.setSeconds(0), a2.setMilliseconds(0)), this._daylightSavingAdjust(a2);
    }, _daylightSavingAdjust: function(t2) {
      return t2 ? (t2.setHours(t2.getHours() > 12 ? t2.getHours() + 2 : 0), t2) : null;
    }, _setDate: function(t2, e2, i2) {
      var s2 = !e2, n2 = t2.selectedMonth, o2 = t2.selectedYear, a2 = this._restrictMinMax(t2, this._determineDate(t2, e2, /* @__PURE__ */ new Date()));
      t2.selectedDay = t2.currentDay = a2.getDate(), t2.drawMonth = t2.selectedMonth = t2.currentMonth = a2.getMonth(), t2.drawYear = t2.selectedYear = t2.currentYear = a2.getFullYear(), n2 === t2.selectedMonth && o2 === t2.selectedYear || i2 || this._notifyChange(t2), this._adjustInstDate(t2), t2.input && t2.input.val(s2 ? "" : this._formatDate(t2));
    }, _getDate: function(t2) {
      var e2 = !t2.currentYear || t2.input && "" === t2.input.val() ? null : this._daylightSavingAdjust(new Date(t2.currentYear, t2.currentMonth, t2.currentDay));
      return e2;
    }, _attachHandlers: function(e2) {
      var i2 = this._get(e2, "stepMonths"), s2 = "#" + e2.id.replace(/\\\\/g, "\\");
      e2.dpDiv.find("[data-handler]").map(function() {
        var e3 = { prev: function() {
          window["DP_jQuery_" + r].datepicker._adjustDate(s2, -i2, "M");
        }, next: function() {
          window["DP_jQuery_" + r].datepicker._adjustDate(s2, +i2, "M");
        }, hide: function() {
          window["DP_jQuery_" + r].datepicker._hideDatepicker();
        }, today: function() {
          window["DP_jQuery_" + r].datepicker._gotoToday(s2);
        }, selectDay: function() {
          return window["DP_jQuery_" + r].datepicker._selectDay(s2, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), false;
        }, selectMonth: function() {
          return window["DP_jQuery_" + r].datepicker._selectMonthYear(s2, this, "M"), false;
        }, selectYear: function() {
          return window["DP_jQuery_" + r].datepicker._selectMonthYear(s2, this, "Y"), false;
        } };
        t(this).bind(this.getAttribute("data-event"), e3[this.getAttribute("data-handler")]);
      });
    }, _generateHTML: function(t2) {
      var e2, i2, s2, n2, o2, a2, r2, h, l, c, u, d, p, f, g, m, v, _, b, y, w, k, x, D, C, I, P, T, M, S, z, A, H, N, E, W, O, F, R, j = /* @__PURE__ */ new Date(), L = this._daylightSavingAdjust(new Date(j.getFullYear(), j.getMonth(), j.getDate())), Y = this._get(t2, "isRTL"), B = this._get(t2, "showButtonPanel"), V = this._get(t2, "hideIfNoPrevNext"), K = this._get(t2, "navigationAsDateFormat"), U = this._getNumberOfMonths(t2), q = this._get(t2, "showCurrentAtPos"), Q = this._get(t2, "stepMonths"), X = 1 !== U[0] || 1 !== U[1], $ = this._daylightSavingAdjust(t2.currentDay ? new Date(t2.currentYear, t2.currentMonth, t2.currentDay) : new Date(9999, 9, 9)), G = this._getMinMaxDate(t2, "min"), J = this._getMinMaxDate(t2, "max"), Z = t2.drawMonth - q, te = t2.drawYear;
      if (0 > Z && (Z += 12, te--), J)
        for (e2 = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e2 = G && G > e2 ? G : e2; this._daylightSavingAdjust(new Date(te, Z, 1)) > e2; )
          Z--, 0 > Z && (Z = 11, te--);
      for (t2.drawMonth = Z, t2.drawYear = te, i2 = this._get(t2, "prevText"), i2 = K ? this.formatDate(i2, this._daylightSavingAdjust(new Date(te, Z - Q, 1)), this._getFormatConfig(t2)) : i2, s2 = this._canAdjustMonth(t2, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i2 + "</span></a>" : V ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i2 + "</span></a>", n2 = this._get(t2, "nextText"), n2 = K ? this.formatDate(n2, this._daylightSavingAdjust(new Date(te, Z + Q, 1)), this._getFormatConfig(t2)) : n2, o2 = this._canAdjustMonth(t2, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n2 + "</span></a>" : V ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n2 + "</span></a>", a2 = this._get(t2, "currentText"), r2 = this._get(t2, "gotoCurrent") && t2.currentDay ? $ : L, a2 = K ? this.formatDate(a2, r2, this._getFormatConfig(t2)) : a2, h = t2.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t2, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t2, r2) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a2 + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t2, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t2, "showWeek"), d = this._get(t2, "dayNames"), p = this._get(t2, "dayNamesMin"), f = this._get(t2, "monthNames"), g = this._get(t2, "monthNamesShort"), m = this._get(t2, "beforeShowDay"), v = this._get(t2, "showOtherMonths"), _ = this._get(t2, "selectOtherMonths"), b = this._getDefaultDate(t2), y = "", k = 0; U[0] > k; k++) {
        for (x = "", this.maxRows = 4, D = 0; U[1] > D; D++) {
          if (C = this._daylightSavingAdjust(new Date(te, Z, t2.selectedDay)), I = " ui-corner-all", P = "", X) {
            if (P += "<div class='ui-datepicker-group", U[1] > 1)
              switch (D) {
                case 0:
                  P += " ui-datepicker-group-first", I = " ui-corner-" + (Y ? "right" : "left");
                  break;
                case U[1] - 1:
                  P += " ui-datepicker-group-last", I = " ui-corner-" + (Y ? "left" : "right");
                  break;
                default:
                  P += " ui-datepicker-group-middle", I = "";
              }
            P += "'>";
          }
          for (P += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + I + "'>" + (/all|left/.test(I) && 0 === k ? Y ? o2 : s2 : "") + (/all|right/.test(I) && 0 === k ? Y ? s2 : o2 : "") + this._generateMonthYearHeader(t2, Z, te, G, J, k > 0 || D > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead><tr>", T = u ? "<th class='ui-datepicker-week-col'>" + this._get(t2, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++)
            M = (w + c) % 7, T += "<th" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[M] + "'>" + p[M] + "</span></th>";
          for (P += T + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t2.selectedYear && Z === t2.selectedMonth && (t2.selectedDay = Math.min(t2.selectedDay, S)), z = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, A = Math.ceil((z + S) / 7), H = X ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = H, N = this._daylightSavingAdjust(new Date(te, Z, 1 - z)), E = 0; H > E; E++) {
            for (P += "<tr>", W = u ? "<td class='ui-datepicker-week-col'>" + this._get(t2, "calculateWeek")(N) + "</td>" : "", w = 0; 7 > w; w++)
              O = m ? m.apply(t2.input ? t2.input[0] : null, [N]) : [true, ""], F = N.getMonth() !== Z, R = F && !_ || !O[0] || G && G > N || J && N > J, W += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (N.getTime() === C.getTime() && Z === t2.selectedMonth && t2._keyEvent || b.getTime() === N.getTime() && b.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !v ? "" : " " + O[1] + (N.getTime() === $.getTime() ? " " + this._currentClass : "") + (N.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + N.getMonth() + "' data-year='" + N.getFullYear() + "'") + ">" + (F && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + N.getDate() + "</span>" : "<a class='ui-state-default" + (N.getTime() === L.getTime() ? " ui-state-highlight" : "") + (N.getTime() === $.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + N.getDate() + "</a>") + "</td>", N.setDate(N.getDate() + 1), N = this._daylightSavingAdjust(N);
            P += W + "</tr>";
          }
          Z++, Z > 11 && (Z = 0, te++), P += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && D === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += P;
        }
        y += x;
      }
      return y += l, t2._keyEvent = false, y;
    }, _generateMonthYearHeader: function(t2, e2, i2, s2, n2, o2, a2, r2) {
      var h, l, c, u, d, p, f, g, m = this._get(t2, "changeMonth"), v = this._get(t2, "changeYear"), _ = this._get(t2, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", y = "";
      if (o2 || !m)
        y += "<span class='ui-datepicker-month'>" + a2[e2] + "</span>";
      else {
        for (h = s2 && s2.getFullYear() === i2, l = n2 && n2.getFullYear() === i2, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)
          (!h || c >= s2.getMonth()) && (!l || n2.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e2 ? " selected='selected'" : "") + ">" + r2[c] + "</option>");
        y += "</select>";
      }
      if (_ || (b += y + (!o2 && m && v ? "" : "&#xa0;")), !t2.yearshtml)
        if (t2.yearshtml = "", o2 || !v)
          b += "<span class='ui-datepicker-year'>" + i2 + "</span>";
        else {
          for (u = this._get(t2, "yearRange").split(":"), d = (/* @__PURE__ */ new Date()).getFullYear(), p = function(t3) {
            var e3 = t3.match(/c[+\-].*/) ? i2 + parseInt(t3.substring(1), 10) : t3.match(/[+\-].*/) ? d + parseInt(t3, 10) : parseInt(t3, 10);
            return isNaN(e3) ? d : e3;
          }, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s2 ? Math.max(f, s2.getFullYear()) : f, g = n2 ? Math.min(g, n2.getFullYear()) : g, t2.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++)
            t2.yearshtml += "<option value='" + f + "'" + (f === i2 ? " selected='selected'" : "") + ">" + f + "</option>";
          t2.yearshtml += "</select>", b += t2.yearshtml, t2.yearshtml = null;
        }
      return b += this._get(t2, "yearSuffix"), _ && (b += (!o2 && m && v ? "" : "&#xa0;") + y), b += "</div>";
    }, _adjustInstDate: function(t2, e2, i2) {
      var s2 = t2.drawYear + ("Y" === i2 ? e2 : 0), n2 = t2.drawMonth + ("M" === i2 ? e2 : 0), o2 = Math.min(t2.selectedDay, this._getDaysInMonth(s2, n2)) + ("D" === i2 ? e2 : 0), a2 = this._restrictMinMax(t2, this._daylightSavingAdjust(new Date(s2, n2, o2)));
      t2.selectedDay = a2.getDate(), t2.drawMonth = t2.selectedMonth = a2.getMonth(), t2.drawYear = t2.selectedYear = a2.getFullYear(), ("M" === i2 || "Y" === i2) && this._notifyChange(t2);
    }, _restrictMinMax: function(t2, e2) {
      var i2 = this._getMinMaxDate(t2, "min"), s2 = this._getMinMaxDate(t2, "max"), n2 = i2 && i2 > e2 ? i2 : e2;
      return s2 && n2 > s2 ? s2 : n2;
    }, _notifyChange: function(t2) {
      var e2 = this._get(t2, "onChangeMonthYear");
      e2 && e2.apply(t2.input ? t2.input[0] : null, [t2.selectedYear, t2.selectedMonth + 1, t2]);
    }, _getNumberOfMonths: function(t2) {
      var e2 = this._get(t2, "numberOfMonths");
      return null == e2 ? [1, 1] : "number" == typeof e2 ? [1, e2] : e2;
    }, _getMinMaxDate: function(t2, e2) {
      return this._determineDate(t2, this._get(t2, e2 + "Date"), null);
    }, _getDaysInMonth: function(t2, e2) {
      return 32 - this._daylightSavingAdjust(new Date(t2, e2, 32)).getDate();
    }, _getFirstDayOfMonth: function(t2, e2) {
      return new Date(t2, e2, 1).getDay();
    }, _canAdjustMonth: function(t2, e2, i2, s2) {
      var n2 = this._getNumberOfMonths(t2), o2 = this._daylightSavingAdjust(new Date(i2, s2 + (0 > e2 ? e2 : n2[0] * n2[1]), 1));
      return 0 > e2 && o2.setDate(this._getDaysInMonth(o2.getFullYear(), o2.getMonth())), this._isInRange(t2, o2);
    }, _isInRange: function(t2, e2) {
      var i2, s2, n2 = this._getMinMaxDate(t2, "min"), o2 = this._getMinMaxDate(t2, "max"), a2 = null, r2 = null, h = this._get(t2, "yearRange");
      return h && (i2 = h.split(":"), s2 = (/* @__PURE__ */ new Date()).getFullYear(), a2 = parseInt(i2[0], 10), r2 = parseInt(i2[1], 10), i2[0].match(/[+\-].*/) && (a2 += s2), i2[1].match(/[+\-].*/) && (r2 += s2)), (!n2 || e2.getTime() >= n2.getTime()) && (!o2 || e2.getTime() <= o2.getTime()) && (!a2 || e2.getFullYear() >= a2) && (!r2 || r2 >= e2.getFullYear());
    }, _getFormatConfig: function(t2) {
      var e2 = this._get(t2, "shortYearCutoff");
      return e2 = "string" != typeof e2 ? e2 : (/* @__PURE__ */ new Date()).getFullYear() % 100 + parseInt(e2, 10), { shortYearCutoff: e2, dayNamesShort: this._get(t2, "dayNamesShort"), dayNames: this._get(t2, "dayNames"), monthNamesShort: this._get(t2, "monthNamesShort"), monthNames: this._get(t2, "monthNames") };
    }, _formatDate: function(t2, e2, i2, s2) {
      e2 || (t2.currentDay = t2.selectedDay, t2.currentMonth = t2.selectedMonth, t2.currentYear = t2.selectedYear);
      var n2 = e2 ? "object" == typeof e2 ? e2 : this._daylightSavingAdjust(new Date(s2, i2, e2)) : this._daylightSavingAdjust(new Date(t2.currentYear, t2.currentMonth, t2.currentDay));
      return this.formatDate(this._get(t2, "dateFormat"), n2, this._getFormatConfig(t2));
    } }), t.fn.datepicker = function(e2) {
      if (!this.length)
        return this;
      t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = true), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
      var i2 = Array.prototype.slice.call(arguments, 1);
      return "string" != typeof e2 || "isDisabled" !== e2 && "getDate" !== e2 && "widget" !== e2 ? "option" === e2 && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e2 + "Datepicker"].apply(t.datepicker, [this[0]].concat(i2)) : this.each(function() {
        "string" == typeof e2 ? t.datepicker["_" + e2 + "Datepicker"].apply(t.datepicker, [this].concat(i2)) : t.datepicker._attachDatepicker(this, e2);
      }) : t.datepicker["_" + e2 + "Datepicker"].apply(t.datepicker, [this[0]].concat(i2));
    }, t.datepicker = new i(), t.datepicker.initialized = false, t.datepicker.uuid = (/* @__PURE__ */ new Date()).getTime(), t.datepicker.version = "1.10.2", window["DP_jQuery_" + r] = t;
  }(jQuery), function(t) {
    var e = { buttons: true, height: true, maxHeight: true, maxWidth: true, minHeight: true, minWidth: true, width: true }, i = { maxHeight: true, maxWidth: true, minHeight: true, minWidth: true };
    t.widget("ui.dialog", { version: "1.10.2", options: { appendTo: "body", autoOpen: true, buttons: [], closeOnEscape: true, closeText: "close", dialogClass: "", draggable: true, hide: null, height: "auto", maxHeight: null, maxWidth: null, minHeight: 150, minWidth: 150, modal: false, position: { my: "center", at: "center", of: window, collision: "fit", using: function(e2) {
      var i2 = t(this).css(e2).offset().top;
      0 > i2 && t(this).css("top", e2.top - i2);
    } }, resizable: true, show: null, title: null, width: 300, beforeClose: null, close: null, drag: null, dragStart: null, dragStop: null, focus: null, open: null, resize: null, resizeStart: null, resizeStop: null }, _create: function() {
      this.originalCss = { display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height }, this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = false;
    }, _init: function() {
      this.options.autoOpen && this.open();
    }, _appendTo: function() {
      var e2 = this.options.appendTo;
      return e2 && (e2.jquery || e2.nodeType) ? t(e2) : this.document.find(e2 || "body").eq(0);
    }, _destroy: function() {
      var t2, e2 = this.originalPosition;
      this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(true, true).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t2 = e2.parent.children().eq(e2.index), t2.length && t2[0] !== this.element[0] ? t2.before(this.element) : e2.parent.append(this.element);
    }, widget: function() {
      return this.uiDialog;
    }, disable: t.noop, enable: t.noop, close: function(e2) {
      var i2 = this;
      this._isOpen && this._trigger("beforeClose", e2) !== false && (this._isOpen = false, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || t(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
        i2._trigger("close", e2);
      }));
    }, isOpen: function() {
      return this._isOpen;
    }, moveToTop: function() {
      this._moveToTop();
    }, _moveToTop: function(t2, e2) {
      var i2 = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
      return i2 && !e2 && this._trigger("focus", t2), i2;
    }, open: function() {
      var e2 = this;
      return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = true, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, true), this._show(this.uiDialog, this.options.show, function() {
        e2._focusTabbable(), e2._trigger("focus");
      }), this._trigger("open"), void 0);
    }, _focusTabbable: function() {
      var t2 = this.element.find("[autofocus]");
      t2.length || (t2 = this.element.find(":tabbable")), t2.length || (t2 = this.uiDialogButtonPane.find(":tabbable")), t2.length || (t2 = this.uiDialogTitlebarClose.filter(":tabbable")), t2.length || (t2 = this.uiDialog), t2.eq(0).focus();
    }, _keepFocus: function(e2) {
      function i2() {
        var e3 = this.document[0].activeElement, i3 = this.uiDialog[0] === e3 || t.contains(this.uiDialog[0], e3);
        i3 || this._focusTabbable();
      }
      e2.preventDefault(), i2.call(this), this._delay(i2);
    }, _createWrapper: function() {
      this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo()), this._on(this.uiDialog, { keydown: function(e2) {
        if (this.options.closeOnEscape && !e2.isDefaultPrevented() && e2.keyCode && e2.keyCode === t.ui.keyCode.ESCAPE)
          return e2.preventDefault(), this.close(e2), void 0;
        if (e2.keyCode === t.ui.keyCode.TAB) {
          var i2 = this.uiDialog.find(":tabbable"), s = i2.filter(":first"), n = i2.filter(":last");
          e2.target !== n[0] && e2.target !== this.uiDialog[0] || e2.shiftKey ? e2.target !== s[0] && e2.target !== this.uiDialog[0] || !e2.shiftKey || (n.focus(1), e2.preventDefault()) : (s.focus(1), e2.preventDefault());
        }
      }, mousedown: function(t2) {
        this._moveToTop(t2) && this._focusTabbable();
      } }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") });
    }, _createTitlebar: function() {
      var e2;
      this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, { mousedown: function(e3) {
        t(e3.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus();
      } }), this.uiDialogTitlebarClose = t("<button></button>").button({ label: this.options.closeText, icons: { primary: "ui-icon-closethick" }, text: false }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, { click: function(t2) {
        t2.preventDefault(), this.close(t2);
      } }), e2 = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e2), this.uiDialog.attr({ "aria-labelledby": e2.attr("id") });
    }, _title: function(t2) {
      this.options.title || t2.html("&#160;"), t2.text(this.options.title);
    }, _createButtonPane: function() {
      this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons();
    }, _createButtons: function() {
      var e2 = this, i2 = this.options.buttons;
      return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i2) || t.isArray(i2) && !i2.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (t.each(i2, function(i3, s) {
        var n, o;
        s = t.isFunction(s) ? { click: s, text: i3 } : s, s = t.extend({ type: "button" }, s), n = s.click, s.click = function() {
          n.apply(e2.element[0], arguments);
        }, o = { icons: s.icons, text: s.showText }, delete s.icons, delete s.showText, t("<button></button>", s).button(o).appendTo(e2.uiButtonSet);
      }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0);
    }, _makeDraggable: function() {
      function e2(t2) {
        return { position: t2.position, offset: t2.offset };
      }
      var i2 = this, s = this.options;
      this.uiDialog.draggable({ cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function(s2, n) {
        t(this).addClass("ui-dialog-dragging"), i2._blockFrames(), i2._trigger("dragStart", s2, e2(n));
      }, drag: function(t2, s2) {
        i2._trigger("drag", t2, e2(s2));
      }, stop: function(n, o) {
        s.position = [o.position.left - i2.document.scrollLeft(), o.position.top - i2.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i2._unblockFrames(), i2._trigger("dragStop", n, e2(o));
      } });
    }, _makeResizable: function() {
      function e2(t2) {
        return { originalPosition: t2.originalPosition, originalSize: t2.originalSize, position: t2.position, size: t2.size };
      }
      var i2 = this, s = this.options, n = s.resizable, o = this.uiDialog.css("position"), a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
      this.uiDialog.resizable({ cancel: ".ui-dialog-content", containment: "document", alsoResize: this.element, maxWidth: s.maxWidth, maxHeight: s.maxHeight, minWidth: s.minWidth, minHeight: this._minHeight(), handles: a, start: function(s2, n2) {
        t(this).addClass("ui-dialog-resizing"), i2._blockFrames(), i2._trigger("resizeStart", s2, e2(n2));
      }, resize: function(t2, s2) {
        i2._trigger("resize", t2, e2(s2));
      }, stop: function(n2, o2) {
        s.height = t(this).height(), s.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i2._unblockFrames(), i2._trigger("resizeStop", n2, e2(o2));
      } }).css("position", o);
    }, _minHeight: function() {
      var t2 = this.options;
      return "auto" === t2.height ? t2.minHeight : Math.min(t2.minHeight, t2.height);
    }, _position: function() {
      var t2 = this.uiDialog.is(":visible");
      t2 || this.uiDialog.show(), this.uiDialog.position(this.options.position), t2 || this.uiDialog.hide();
    }, _setOptions: function(s) {
      var n = this, o = false, a = {};
      t.each(s, function(t2, s2) {
        n._setOption(t2, s2), t2 in e && (o = true), t2 in i && (a[t2] = s2);
      }), o && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", a);
    }, _setOption: function(t2, e2) {
      var i2, s, n = this.uiDialog;
      "dialogClass" === t2 && n.removeClass(this.options.dialogClass).addClass(e2), "disabled" !== t2 && (this._super(t2, e2), "appendTo" === t2 && this.uiDialog.appendTo(this._appendTo()), "buttons" === t2 && this._createButtons(), "closeText" === t2 && this.uiDialogTitlebarClose.button({ label: "" + e2 }), "draggable" === t2 && (i2 = n.is(":data(ui-draggable)"), i2 && !e2 && n.draggable("destroy"), !i2 && e2 && this._makeDraggable()), "position" === t2 && this._position(), "resizable" === t2 && (s = n.is(":data(ui-resizable)"), s && !e2 && n.resizable("destroy"), s && "string" == typeof e2 && n.resizable("option", "handles", e2), s || e2 === false || this._makeResizable()), "title" === t2 && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
    }, _size: function() {
      var t2, e2, i2, s = this.options;
      this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }), s.minWidth > s.width && (s.width = s.minWidth), t2 = this.uiDialog.css({ height: "auto", width: s.width }).outerHeight(), e2 = Math.max(0, s.minHeight - t2), i2 = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t2) : "none", "auto" === s.height ? this.element.css({ minHeight: e2, maxHeight: i2, height: "auto" }) : this.element.height(Math.max(0, s.height - t2)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
    }, _blockFrames: function() {
      this.iframeBlocks = this.document.find("iframe").map(function() {
        var e2 = t(this);
        return t("<div>").css({ position: "absolute", width: e2.outerWidth(), height: e2.outerHeight() }).appendTo(e2.parent()).offset(e2.offset())[0];
      });
    }, _unblockFrames: function() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    }, _allowInteraction: function(e2) {
      return t(e2.target).closest(".ui-dialog").length ? true : !!t(e2.target).closest(".ui-datepicker").length;
    }, _createOverlay: function() {
      if (this.options.modal) {
        var e2 = this, i2 = this.widgetFullName;
        t.ui.dialog.overlayInstances || this._delay(function() {
          t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(s) {
            e2._allowInteraction(s) || (s.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i2)._focusTabbable());
          });
        }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, { mousedown: "_keepFocus" }), t.ui.dialog.overlayInstances++;
      }
    }, _destroyOverlay: function() {
      this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null);
    } }), t.ui.dialog.overlayInstances = 0, t.uiBackCompat !== false && t.widget("ui.dialog", t.ui.dialog, { _position: function() {
      var e2, i2 = this.options.position, s = [], n = [0, 0];
      i2 ? (("string" == typeof i2 || "object" == typeof i2 && "0" in i2) && (s = i2.split ? i2.split(" ") : [i2[0], i2[1]], 1 === s.length && (s[1] = s[0]), t.each(["left", "top"], function(t2, e3) {
        +s[t2] === s[t2] && (n[t2] = s[t2], s[t2] = e3);
      }), i2 = { my: s[0] + (0 > n[0] ? n[0] : "+" + n[0]) + " " + s[1] + (0 > n[1] ? n[1] : "+" + n[1]), at: s.join(" ") }), i2 = t.extend({}, t.ui.dialog.prototype.options.position, i2)) : i2 = t.ui.dialog.prototype.options.position, e2 = this.uiDialog.is(":visible"), e2 || this.uiDialog.show(), this.uiDialog.position(i2), e2 || this.uiDialog.hide();
    } });
  }(jQuery), function(t) {
    var e = /up|down|vertical/, i = /up|left|vertical|horizontal/;
    t.effects.effect.blind = function(s, n) {
      var o, a, r, h = t(this), l = ["position", "top", "bottom", "left", "right", "height", "width"], c = t.effects.setMode(h, s.mode || "hide"), u = s.direction || "up", d = e.test(u), p = d ? "height" : "width", f = d ? "top" : "left", g = i.test(u), m = {}, v = "show" === c;
      h.parent().is(".ui-effects-wrapper") ? t.effects.save(h.parent(), l) : t.effects.save(h, l), h.show(), o = t.effects.createWrapper(h).css({ overflow: "hidden" }), a = o[p](), r = parseFloat(o.css(f)) || 0, m[p] = v ? a : 0, g || (h.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({ position: "absolute" }), m[f] = v ? r : a + r), v && (o.css(p, 0), g || o.css(f, r + a)), o.animate(m, { duration: s.duration, easing: s.easing, queue: false, complete: function() {
        "hide" === c && h.hide(), t.effects.restore(h, l), t.effects.removeWrapper(h), n();
      } });
    };
  }(jQuery), function(t) {
    t.effects.effect.bounce = function(e, i) {
      var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], h = t.effects.setMode(a, e.mode || "effect"), l = "hide" === h, c = "show" === h, u = e.direction || "up", d = e.distance, p = e.times || 5, f = 2 * p + (c || l ? 1 : 0), g = e.duration / f, m = e.easing, v = "up" === u || "down" === u ? "top" : "left", _ = "up" === u || "left" === u, b = a.queue(), y = b.length;
      for ((c || l) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (o = { opacity: 1 }, o[v] = 0, a.css("opacity", 0).css(v, _ ? 2 * -d : 2 * d).animate(o, g, m)), l && (d /= Math.pow(2, p - 1)), o = {}, o[v] = 0, s = 0; p > s; s++)
        n = {}, n[v] = (_ ? "-=" : "+=") + d, a.animate(n, g, m).animate(o, g, m), d = l ? 2 * d : d / 2;
      l && (n = { opacity: 0 }, n[v] = (_ ? "-=" : "+=") + d, a.animate(n, g, m)), a.queue(function() {
        l && a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i();
      }), y > 1 && b.splice.apply(b, [1, 0].concat(b.splice(y, f + 1))), a.dequeue();
    };
  }(jQuery), function(t) {
    t.effects.effect.clip = function(e, i) {
      var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], h = t.effects.setMode(a, e.mode || "hide"), l = "show" === h, c = e.direction || "vertical", u = "vertical" === c, d = u ? "height" : "width", p = u ? "top" : "left", f = {};
      t.effects.save(a, r), a.show(), s = t.effects.createWrapper(a).css({ overflow: "hidden" }), n = "IMG" === a[0].tagName ? s : a, o = n[d](), l && (n.css(d, 0), n.css(p, o / 2)), f[d] = l ? o : 0, f[p] = l ? 0 : o / 2, n.animate(f, { queue: false, duration: e.duration, easing: e.easing, complete: function() {
        l || a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i();
      } });
    };
  }(jQuery), function(t) {
    t.effects.effect.drop = function(e, i) {
      var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], a = t.effects.setMode(n, e.mode || "hide"), r = "show" === a, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h ? "pos" : "neg", u = { opacity: r ? 1 : 0 };
      t.effects.save(n, o), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](true) / 2, r && n.css("opacity", 0).css(l, "pos" === c ? -s : s), u[l] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, { queue: false, duration: e.duration, easing: e.easing, complete: function() {
        "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i();
      } });
    };
  }(jQuery), function(t) {
    t.effects.effect.explode = function(e, i) {
      function s() {
        b.push(this), b.length === u * d && n();
      }
      function n() {
        p.css({ visibility: "visible" }), t(b).remove(), g || p.hide(), i();
      }
      var o, a, r, h, l, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3, d = u, p = t(this), f = t.effects.setMode(p, e.mode || "hide"), g = "show" === f, m = p.show().css("visibility", "hidden").offset(), v = Math.ceil(p.outerWidth() / d), _ = Math.ceil(p.outerHeight() / u), b = [];
      for (o = 0; u > o; o++)
        for (h = m.top + o * _, c = o - (u - 1) / 2, a = 0; d > a; a++)
          r = m.left + a * v, l = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({ position: "absolute", visibility: "visible", left: -a * v, top: -o * _ }).parent().addClass("ui-effects-explode").css({ position: "absolute", overflow: "hidden", width: v, height: _, left: r + (g ? l * v : 0), top: h + (g ? c * _ : 0), opacity: g ? 0 : 1 }).animate({ left: r + (g ? 0 : l * v), top: h + (g ? 0 : c * _), opacity: g ? 1 : 0 }, e.duration || 500, e.easing, s);
    };
  }(jQuery), function(t) {
    t.effects.effect.fade = function(e, i) {
      var s = t(this), n = t.effects.setMode(s, e.mode || "toggle");
      s.animate({ opacity: n }, { queue: false, duration: e.duration, easing: e.easing, complete: i });
    };
  }(jQuery), function(t) {
    t.effects.effect.fold = function(e, i) {
      var s, n, o = t(this), a = ["position", "top", "bottom", "left", "right", "height", "width"], r = t.effects.setMode(o, e.mode || "hide"), h = "show" === r, l = "hide" === r, c = e.size || 15, u = /([0-9]+)%/.exec(c), d = !!e.horizFirst, p = h !== d, f = p ? ["width", "height"] : ["height", "width"], g = e.duration / 2, m = {}, v = {};
      t.effects.save(o, a), o.show(), s = t.effects.createWrapper(o).css({ overflow: "hidden" }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(d ? { height: 0, width: c } : { height: c, width: 0 }), m[f[0]] = h ? n[0] : c, v[f[1]] = h ? n[1] : 0, s.animate(m, g, e.easing).animate(v, g, e.easing, function() {
        l && o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i();
      });
    };
  }(jQuery), function(t) {
    t.effects.effect.highlight = function(e, i) {
      var s = t(this), n = ["backgroundImage", "backgroundColor", "opacity"], o = t.effects.setMode(s, e.mode || "show"), a = { backgroundColor: s.css("backgroundColor") };
      "hide" === o && (a.opacity = 0), t.effects.save(s, n), s.show().css({ backgroundImage: "none", backgroundColor: e.color || "#ffff99" }).animate(a, { queue: false, duration: e.duration, easing: e.easing, complete: function() {
        "hide" === o && s.hide(), t.effects.restore(s, n), i();
      } });
    };
  }(jQuery), function(t) {
    t.effects.effect.pulsate = function(e, i) {
      var s, n = t(this), o = t.effects.setMode(n, e.mode || "show"), a = "show" === o, r = "hide" === o, h = a || "hide" === o, l = 2 * (e.times || 5) + (h ? 1 : 0), c = e.duration / l, u = 0, d = n.queue(), p = d.length;
      for ((a || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; l > s; s++)
        n.animate({ opacity: u }, c, e.easing), u = 1 - u;
      n.animate({ opacity: u }, c, e.easing), n.queue(function() {
        r && n.hide(), i();
      }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, l + 1))), n.dequeue();
    };
  }(jQuery), function(t) {
    t.effects.effect.puff = function(e, i) {
      var s = t(this), n = t.effects.setMode(s, e.mode || "hide"), o = "hide" === n, a = parseInt(e.percent, 10) || 150, r = a / 100, h = { height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth() };
      t.extend(e, { effect: "scale", queue: false, fade: true, mode: n, complete: i, percent: o ? a : 100, from: o ? h : { height: h.height * r, width: h.width * r, outerHeight: h.outerHeight * r, outerWidth: h.outerWidth * r } }), s.effect(e);
    }, t.effects.effect.scale = function(e, i) {
      var s = t(this), n = t.extend(true, {}, e), o = t.effects.setMode(s, e.mode || "effect"), a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100), r = e.direction || "both", h = e.origin, l = { height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth() }, c = { y: "horizontal" !== r ? a / 100 : 1, x: "vertical" !== r ? a / 100 : 1 };
      n.effect = "size", n.queue = false, n.complete = i, "effect" !== o && (n.origin = h || ["middle", "center"], n.restore = true), n.from = e.from || ("show" === o ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 } : l), n.to = { height: l.height * c.y, width: l.width * c.x, outerHeight: l.outerHeight * c.y, outerWidth: l.outerWidth * c.x }, n.fade && ("show" === o && (n.from.opacity = 0, n.to.opacity = 1), "hide" === o && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n);
    }, t.effects.effect.size = function(e, i) {
      var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], l = ["width", "height", "overflow"], c = ["fontSize"], u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p = t.effects.setMode(a, e.mode || "effect"), f = e.restore || "effect" !== p, g = e.scale || "both", m = e.origin || ["middle", "center"], v = a.css("position"), _ = f ? r : h, b = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
      "show" === p && a.show(), s = { height: a.height(), width: a.width(), outerHeight: a.outerHeight(), outerWidth: a.outerWidth() }, "toggle" === e.mode && "show" === p ? (a.from = e.to || b, a.to = e.from || s) : (a.from = e.from || ("show" === p ? b : s), a.to = e.to || ("hide" === p ? b : s)), o = { from: { y: a.from.height / s.height, x: a.from.width / s.width }, to: { y: a.to.height / s.height, x: a.to.width / s.width } }, ("box" === g || "both" === g) && (o.from.y !== o.to.y && (_ = _.concat(u), a.from = t.effects.setTransition(a, u, o.from.y, a.from), a.to = t.effects.setTransition(a, u, o.to.y, a.to)), o.from.x !== o.to.x && (_ = _.concat(d), a.from = t.effects.setTransition(a, d, o.from.x, a.from), a.to = t.effects.setTransition(a, d, o.to.x, a.to))), ("content" === g || "both" === g) && o.from.y !== o.to.y && (_ = _.concat(c).concat(l), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), t.effects.save(a, _), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), m && (n = t.effects.getBaseline(m, s), a.from.top = (s.outerHeight - a.outerHeight()) * n.y, a.from.left = (s.outerWidth - a.outerWidth()) * n.x, a.to.top = (s.outerHeight - a.to.outerHeight) * n.y, a.to.left = (s.outerWidth - a.to.outerWidth) * n.x), a.css(a.from), ("content" === g || "both" === g) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), l = r.concat(u).concat(d), a.find("*[width]").each(function() {
        var i2 = t(this), s2 = { height: i2.height(), width: i2.width(), outerHeight: i2.outerHeight(), outerWidth: i2.outerWidth() };
        f && t.effects.save(i2, l), i2.from = { height: s2.height * o.from.y, width: s2.width * o.from.x, outerHeight: s2.outerHeight * o.from.y, outerWidth: s2.outerWidth * o.from.x }, i2.to = { height: s2.height * o.to.y, width: s2.width * o.to.x, outerHeight: s2.height * o.to.y, outerWidth: s2.width * o.to.x }, o.from.y !== o.to.y && (i2.from = t.effects.setTransition(i2, u, o.from.y, i2.from), i2.to = t.effects.setTransition(i2, u, o.to.y, i2.to)), o.from.x !== o.to.x && (i2.from = t.effects.setTransition(i2, d, o.from.x, i2.from), i2.to = t.effects.setTransition(i2, d, o.to.x, i2.to)), i2.css(i2.from), i2.animate(i2.to, e.duration, e.easing, function() {
          f && t.effects.restore(i2, l);
        });
      })), a.animate(a.to, { queue: false, duration: e.duration, easing: e.easing, complete: function() {
        0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, _), f || ("static" === v ? a.css({ position: "relative", top: a.to.top, left: a.to.left }) : t.each(["top", "left"], function(t2, e2) {
          a.css(e2, function(e3, i2) {
            var s2 = parseInt(i2, 10), n2 = t2 ? a.to.left : a.to.top;
            return "auto" === i2 ? n2 + "px" : s2 + n2 + "px";
          });
        })), t.effects.removeWrapper(a), i();
      } });
    };
  }(jQuery), function(t) {
    t.effects.effect.shake = function(e, i) {
      var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "height", "width"], a = t.effects.setMode(n, e.mode || "effect"), r = e.direction || "left", h = e.distance || 20, l = e.times || 3, c = 2 * l + 1, u = Math.round(e.duration / c), d = "up" === r || "down" === r ? "top" : "left", p = "up" === r || "left" === r, f = {}, g = {}, m = {}, v = n.queue(), _ = v.length;
      for (t.effects.save(n, o), n.show(), t.effects.createWrapper(n), f[d] = (p ? "-=" : "+=") + h, g[d] = (p ? "+=" : "-=") + 2 * h, m[d] = (p ? "-=" : "+=") + 2 * h, n.animate(f, u, e.easing), s = 1; l > s; s++)
        n.animate(g, u, e.easing).animate(m, u, e.easing);
      n.animate(g, u, e.easing).animate(f, u / 2, e.easing).queue(function() {
        "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i();
      }), _ > 1 && v.splice.apply(v, [1, 0].concat(v.splice(_, c + 1))), n.dequeue();
    };
  }(jQuery), function(t) {
    t.effects.effect.slide = function(e, i) {
      var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "width", "height"], a = t.effects.setMode(n, e.mode || "show"), r = "show" === a, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h, u = {};
      t.effects.save(n, o), n.show(), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](true), t.effects.createWrapper(n).css({ overflow: "hidden" }), r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s), u[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, { queue: false, duration: e.duration, easing: e.easing, complete: function() {
        "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i();
      } });
    };
  }(jQuery), function(t) {
    t.effects.effect.transfer = function(e, i) {
      var s = t(this), n = t(e.to), o = "fixed" === n.css("position"), a = t("body"), r = o ? a.scrollTop() : 0, h = o ? a.scrollLeft() : 0, l = n.offset(), c = { top: l.top - r, left: l.left - h, height: n.innerHeight(), width: n.innerWidth() }, u = s.offset(), d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({ top: u.top - r, left: u.left - h, height: s.innerHeight(), width: s.innerWidth(), position: o ? "fixed" : "absolute" }).animate(c, e.duration, e.easing, function() {
        d.remove(), i();
      });
    };
  }(jQuery), function(t) {
    t.widget("ui.menu", { version: "1.10.2", defaultElement: "<ul>", delay: 300, options: { icons: { submenu: "ui-icon-carat-1-e" }, menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null }, _create: function() {
      this.activeMenu = this.element, this.mouseHandled = false, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({ role: this.options.role, tabIndex: 0 }).bind("click" + this.eventNamespace, t.proxy(function(t2) {
        this.options.disabled && t2.preventDefault();
      }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({ "mousedown .ui-menu-item > a": function(t2) {
        t2.preventDefault();
      }, "click .ui-state-disabled > a": function(t2) {
        t2.preventDefault();
      }, "click .ui-menu-item:has(a)": function(e) {
        var i = t(e.target).closest(".ui-menu-item");
        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = true, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [true]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
      }, "mouseenter .ui-menu-item": function(e) {
        var i = t(e.currentTarget);
        i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i);
      }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function(t2, e) {
        var i = this.active || this.element.children(".ui-menu-item").eq(0);
        e || this.focus(t2, i);
      }, blur: function(e) {
        this._delay(function() {
          t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e);
        });
      }, keydown: "_keydown" }), this.refresh(), this._on(this.document, { click: function(e) {
        t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = false;
      } });
    }, _destroy: function() {
      this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
        var e = t(this);
        e.data("ui-menu-submenu-carat") && e.remove();
      }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
    }, _keydown: function(e) {
      function i(t2) {
        return t2.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }
      var s, n, o, a, r, h = true;
      switch (e.keyCode) {
        case t.ui.keyCode.PAGE_UP:
          this.previousPage(e);
          break;
        case t.ui.keyCode.PAGE_DOWN:
          this.nextPage(e);
          break;
        case t.ui.keyCode.HOME:
          this._move("first", "first", e);
          break;
        case t.ui.keyCode.END:
          this._move("last", "last", e);
          break;
        case t.ui.keyCode.UP:
          this.previous(e);
          break;
        case t.ui.keyCode.DOWN:
          this.next(e);
          break;
        case t.ui.keyCode.LEFT:
          this.collapse(e);
          break;
        case t.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
          break;
        case t.ui.keyCode.ENTER:
        case t.ui.keyCode.SPACE:
          this._activate(e);
          break;
        case t.ui.keyCode.ESCAPE:
          this.collapse(e);
          break;
        default:
          h = false, n = this.previousFilter || "", o = String.fromCharCode(e.keyCode), a = false, clearTimeout(this.filterTimer), o === n ? a = true : o = n + o, r = RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
            return r.test(t(this).children("a").text());
          }), s = a && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (o = String.fromCharCode(e.keyCode), r = RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
            return r.test(t(this).children("a").text());
          })), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = o, this.filterTimer = this._delay(function() {
            delete this.previousFilter;
          }, 1e3)) : delete this.previousFilter) : delete this.previousFilter;
      }
      h && e.preventDefault();
    }, _activate: function(t2) {
      this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t2) : this.select(t2));
    }, refresh: function() {
      var e, i = this.options.icons.submenu, s = this.element.find(this.options.menus);
      s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function() {
        var e2 = t(this), s2 = e2.prev("a"), n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", true);
        s2.attr("aria-haspopup", "true").prepend(n), e2.attr("aria-labelledby", s2.attr("id"));
      }), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({ tabIndex: -1, role: this._itemRole() }), e.children(":not(.ui-menu-item)").each(function() {
        var e2 = t(this);
        /[^\-\u2014\u2013\s]/.test(e2.text()) || e2.addClass("ui-widget-content ui-menu-divider");
      }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur();
    }, _itemRole: function() {
      return { menu: "menuitem", listbox: "option" }[this.options.role];
    }, _setOption: function(t2, e) {
      "icons" === t2 && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t2, e);
    }, focus: function(t2, e) {
      var i, s;
      this.blur(t2, t2 && "focus" === t2.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t2 && "keydown" === t2.type ? this._close() : this.timer = this._delay(function() {
        this._close();
      }, this.delay), i = e.children(".ui-menu"), i.length && /^mouse/.test(t2.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t2, { item: e });
    }, _scrollIntoView: function(e) {
      var i, s, n, o, a, r;
      this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r));
    }, blur: function(t2, e) {
      e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t2, { item: this.active }));
    }, _startOpening: function(t2) {
      clearTimeout(this.timer), "true" === t2.attr("aria-hidden") && (this.timer = this._delay(function() {
        this._close(), this._open(t2);
      }, this.delay));
    }, _open: function(e) {
      var i = t.extend({ of: this.active }, this.options.position);
      clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);
    }, collapseAll: function(e, i) {
      clearTimeout(this.timer), this.timer = this._delay(function() {
        var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
        s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s;
      }, this.delay);
    }, _close: function(t2) {
      t2 || (t2 = this.active ? this.active.parent() : this.element), t2.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active");
    }, collapse: function(t2) {
      var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
      e && e.length && (this._close(), this.focus(t2, e));
    }, expand: function(t2) {
      var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
      e && e.length && (this._open(e.parent()), this._delay(function() {
        this.focus(t2, e);
      }));
    }, next: function(t2) {
      this._move("next", "first", t2);
    }, previous: function(t2) {
      this._move("prev", "last", t2);
    }, isFirstItem: function() {
      return this.active && !this.active.prevAll(".ui-menu-item").length;
    }, isLastItem: function() {
      return this.active && !this.active.nextAll(".ui-menu-item").length;
    }, _move: function(t2, e, i) {
      var s;
      this.active && (s = "first" === t2 || "last" === t2 ? this.active["first" === t2 ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t2 + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s);
    }, nextPage: function(e) {
      var i, s, n;
      return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
        return i = t(this), 0 > i.offset().top - s - n;
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0);
    }, previousPage: function(e) {
      var i, s, n;
      return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
        return i = t(this), i.offset().top - s + n > 0;
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), void 0) : (this.next(e), void 0);
    }, _hasScroll: function() {
      return this.element.outerHeight() < this.element.prop("scrollHeight");
    }, select: function(e) {
      this.active = this.active || t(e.target).closest(".ui-menu-item");
      var i = { item: this.active };
      this.active.has(".ui-menu").length || this.collapseAll(e, true), this._trigger("select", e, i);
    } });
  }(jQuery), function(t, e) {
    function i(t2, e2, i2) {
      return [parseFloat(t2[0]) * (p.test(t2[0]) ? e2 / 100 : 1), parseFloat(t2[1]) * (p.test(t2[1]) ? i2 / 100 : 1)];
    }
    function s(e2, i2) {
      return parseInt(t.css(e2, i2), 10) || 0;
    }
    function n(e2) {
      var i2 = e2[0];
      return 9 === i2.nodeType ? { width: e2.width(), height: e2.height(), offset: { top: 0, left: 0 } } : t.isWindow(i2) ? { width: e2.width(), height: e2.height(), offset: { top: e2.scrollTop(), left: e2.scrollLeft() } } : i2.preventDefault ? { width: 0, height: 0, offset: { top: i2.pageY, left: i2.pageX } } : { width: e2.outerWidth(), height: e2.outerHeight(), offset: e2.offset() };
    }
    t.ui = t.ui || {};
    var o, a = Math.max, r = Math.abs, h = Math.round, l = /left|center|right/, c = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = t.fn.position;
    t.position = { scrollbarWidth: function() {
      if (o !== e)
        return o;
      var i2, s2, n2 = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), a2 = n2.children()[0];
      return t("body").append(n2), i2 = a2.offsetWidth, n2.css("overflow", "scroll"), s2 = a2.offsetWidth, i2 === s2 && (s2 = n2[0].clientWidth), n2.remove(), o = i2 - s2;
    }, getScrollInfo: function(e2) {
      var i2 = e2.isWindow ? "" : e2.element.css("overflow-x"), s2 = e2.isWindow ? "" : e2.element.css("overflow-y"), n2 = "scroll" === i2 || "auto" === i2 && e2.width < e2.element[0].scrollWidth, o2 = "scroll" === s2 || "auto" === s2 && e2.height < e2.element[0].scrollHeight;
      return { width: o2 ? t.position.scrollbarWidth() : 0, height: n2 ? t.position.scrollbarWidth() : 0 };
    }, getWithinInfo: function(e2) {
      var i2 = t(e2 || window), s2 = t.isWindow(i2[0]);
      return { element: i2, isWindow: s2, offset: i2.offset() || { left: 0, top: 0 }, scrollLeft: i2.scrollLeft(), scrollTop: i2.scrollTop(), width: s2 ? i2.width() : i2.outerWidth(), height: s2 ? i2.height() : i2.outerHeight() };
    } }, t.fn.position = function(e2) {
      if (!e2 || !e2.of)
        return f.apply(this, arguments);
      e2 = t.extend({}, e2);
      var o2, p2, g, m, v, _, b = t(e2.of), y = t.position.getWithinInfo(e2.within), w = t.position.getScrollInfo(y), k = (e2.collision || "flip").split(" "), x = {};
      return _ = n(b), b[0].preventDefault && (e2.at = "left top"), p2 = _.width, g = _.height, m = _.offset, v = t.extend({}, m), t.each(["my", "at"], function() {
        var t2, i2, s2 = (e2[this] || "").split(" ");
        1 === s2.length && (s2 = l.test(s2[0]) ? s2.concat(["center"]) : c.test(s2[0]) ? ["center"].concat(s2) : ["center", "center"]), s2[0] = l.test(s2[0]) ? s2[0] : "center", s2[1] = c.test(s2[1]) ? s2[1] : "center", t2 = u.exec(s2[0]), i2 = u.exec(s2[1]), x[this] = [t2 ? t2[0] : 0, i2 ? i2[0] : 0], e2[this] = [d.exec(s2[0])[0], d.exec(s2[1])[0]];
      }), 1 === k.length && (k[1] = k[0]), "right" === e2.at[0] ? v.left += p2 : "center" === e2.at[0] && (v.left += p2 / 2), "bottom" === e2.at[1] ? v.top += g : "center" === e2.at[1] && (v.top += g / 2), o2 = i(x.at, p2, g), v.left += o2[0], v.top += o2[1], this.each(function() {
        var n2, l2, c2 = t(this), u2 = c2.outerWidth(), d2 = c2.outerHeight(), f2 = s(this, "marginLeft"), _2 = s(this, "marginTop"), D = u2 + f2 + s(this, "marginRight") + w.width, C = d2 + _2 + s(this, "marginBottom") + w.height, I = t.extend({}, v), P = i(x.my, c2.outerWidth(), c2.outerHeight());
        "right" === e2.my[0] ? I.left -= u2 : "center" === e2.my[0] && (I.left -= u2 / 2), "bottom" === e2.my[1] ? I.top -= d2 : "center" === e2.my[1] && (I.top -= d2 / 2), I.left += P[0], I.top += P[1], t.support.offsetFractions || (I.left = h(I.left), I.top = h(I.top)), n2 = { marginLeft: f2, marginTop: _2 }, t.each(["left", "top"], function(i2, s2) {
          t.ui.position[k[i2]] && t.ui.position[k[i2]][s2](I, { targetWidth: p2, targetHeight: g, elemWidth: u2, elemHeight: d2, collisionPosition: n2, collisionWidth: D, collisionHeight: C, offset: [o2[0] + P[0], o2[1] + P[1]], my: e2.my, at: e2.at, within: y, elem: c2 });
        }), e2.using && (l2 = function(t2) {
          var i2 = m.left - I.left, s2 = i2 + p2 - u2, n3 = m.top - I.top, o3 = n3 + g - d2, h2 = { target: { element: b, left: m.left, top: m.top, width: p2, height: g }, element: { element: c2, left: I.left, top: I.top, width: u2, height: d2 }, horizontal: 0 > s2 ? "left" : i2 > 0 ? "right" : "center", vertical: 0 > o3 ? "top" : n3 > 0 ? "bottom" : "middle" };
          u2 > p2 && p2 > r(i2 + s2) && (h2.horizontal = "center"), d2 > g && g > r(n3 + o3) && (h2.vertical = "middle"), h2.important = a(r(i2), r(s2)) > a(r(n3), r(o3)) ? "horizontal" : "vertical", e2.using.call(this, t2, h2);
        }), c2.offset(t.extend(I, { using: l2 }));
      });
    }, t.ui.position = { fit: { left: function(t2, e2) {
      var i2, s2 = e2.within, n2 = s2.isWindow ? s2.scrollLeft : s2.offset.left, o2 = s2.width, r2 = t2.left - e2.collisionPosition.marginLeft, h2 = n2 - r2, l2 = r2 + e2.collisionWidth - o2 - n2;
      e2.collisionWidth > o2 ? h2 > 0 && 0 >= l2 ? (i2 = t2.left + h2 + e2.collisionWidth - o2 - n2, t2.left += h2 - i2) : t2.left = l2 > 0 && 0 >= h2 ? n2 : h2 > l2 ? n2 + o2 - e2.collisionWidth : n2 : h2 > 0 ? t2.left += h2 : l2 > 0 ? t2.left -= l2 : t2.left = a(t2.left - r2, t2.left);
    }, top: function(t2, e2) {
      var i2, s2 = e2.within, n2 = s2.isWindow ? s2.scrollTop : s2.offset.top, o2 = e2.within.height, r2 = t2.top - e2.collisionPosition.marginTop, h2 = n2 - r2, l2 = r2 + e2.collisionHeight - o2 - n2;
      e2.collisionHeight > o2 ? h2 > 0 && 0 >= l2 ? (i2 = t2.top + h2 + e2.collisionHeight - o2 - n2, t2.top += h2 - i2) : t2.top = l2 > 0 && 0 >= h2 ? n2 : h2 > l2 ? n2 + o2 - e2.collisionHeight : n2 : h2 > 0 ? t2.top += h2 : l2 > 0 ? t2.top -= l2 : t2.top = a(t2.top - r2, t2.top);
    } }, flip: { left: function(t2, e2) {
      var i2, s2, n2 = e2.within, o2 = n2.offset.left + n2.scrollLeft, a2 = n2.width, h2 = n2.isWindow ? n2.scrollLeft : n2.offset.left, l2 = t2.left - e2.collisionPosition.marginLeft, c2 = l2 - h2, u2 = l2 + e2.collisionWidth - a2 - h2, d2 = "left" === e2.my[0] ? -e2.elemWidth : "right" === e2.my[0] ? e2.elemWidth : 0, p2 = "left" === e2.at[0] ? e2.targetWidth : "right" === e2.at[0] ? -e2.targetWidth : 0, f2 = -2 * e2.offset[0];
      0 > c2 ? (i2 = t2.left + d2 + p2 + f2 + e2.collisionWidth - a2 - o2, (0 > i2 || r(c2) > i2) && (t2.left += d2 + p2 + f2)) : u2 > 0 && (s2 = t2.left - e2.collisionPosition.marginLeft + d2 + p2 + f2 - h2, (s2 > 0 || u2 > r(s2)) && (t2.left += d2 + p2 + f2));
    }, top: function(t2, e2) {
      var i2, s2, n2 = e2.within, o2 = n2.offset.top + n2.scrollTop, a2 = n2.height, h2 = n2.isWindow ? n2.scrollTop : n2.offset.top, l2 = t2.top - e2.collisionPosition.marginTop, c2 = l2 - h2, u2 = l2 + e2.collisionHeight - a2 - h2, d2 = "top" === e2.my[1], p2 = d2 ? -e2.elemHeight : "bottom" === e2.my[1] ? e2.elemHeight : 0, f2 = "top" === e2.at[1] ? e2.targetHeight : "bottom" === e2.at[1] ? -e2.targetHeight : 0, g = -2 * e2.offset[1];
      0 > c2 ? (s2 = t2.top + p2 + f2 + g + e2.collisionHeight - a2 - o2, t2.top + p2 + f2 + g > c2 && (0 > s2 || r(c2) > s2) && (t2.top += p2 + f2 + g)) : u2 > 0 && (i2 = t2.top - e2.collisionPosition.marginTop + p2 + f2 + g - h2, t2.top + p2 + f2 + g > u2 && (i2 > 0 || u2 > r(i2)) && (t2.top += p2 + f2 + g));
    } }, flipfit: { left: function() {
      t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments);
    }, top: function() {
      t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments);
    } } }, function() {
      var e2, i2, s2, n2, o2, a2 = document.getElementsByTagName("body")[0], r2 = document.createElement("div");
      e2 = document.createElement(a2 ? "div" : "body"), s2 = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }, a2 && t.extend(s2, { position: "absolute", left: "-1000px", top: "-1000px" });
      for (o2 in s2)
        e2.style[o2] = s2[o2];
      e2.appendChild(r2), i2 = a2 || document.documentElement, i2.insertBefore(e2, i2.firstChild), r2.style.cssText = "position: absolute; left: 10.7432222px;", n2 = t(r2).offset().left, t.support.offsetFractions = n2 > 10 && 11 > n2, e2.innerHTML = "", i2.removeChild(e2);
    }();
  }(jQuery), function(t, e) {
    t.widget("ui.progressbar", { version: "1.10.2", options: { max: 100, value: 0, change: null, complete: null }, min: 0, _create: function() {
      this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({ role: "progressbar", "aria-valuemin": this.min }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue();
    }, _destroy: function() {
      this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove();
    }, value: function(t2) {
      return t2 === e ? this.options.value : (this.options.value = this._constrainedValue(t2), this._refreshValue(), e);
    }, _constrainedValue: function(t2) {
      return t2 === e && (t2 = this.options.value), this.indeterminate = t2 === false, "number" != typeof t2 && (t2 = 0), this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, t2));
    }, _setOptions: function(t2) {
      var e2 = t2.value;
      delete t2.value, this._super(t2), this.options.value = this._constrainedValue(e2), this._refreshValue();
    }, _setOption: function(t2, e2) {
      "max" === t2 && (e2 = Math.max(this.min, e2)), this._super(t2, e2);
    }, _percentage: function() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
    }, _refreshValue: function() {
      var e2 = this.options.value, i = this._percentage();
      this.valueDiv.toggle(this.indeterminate || e2 > this.min).toggleClass("ui-corner-right", e2 === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": e2 }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e2 && (this.oldValue = e2, this._trigger("change")), e2 === this.options.max && this._trigger("complete");
    } });
  }(jQuery), function(t) {
    var e = 5;
    t.widget("ui.slider", t.ui.mouse, { version: "1.10.2", widgetEventPrefix: "slide", options: { animate: false, distance: 0, max: 100, min: 0, orientation: "horizontal", range: false, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, _create: function() {
      this._keySliding = false, this._mouseSliding = false, this._animateOff = true, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = false;
    }, _refresh: function() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
    }, _createHandles: function() {
      var e2, i, s = this.options, n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", a = [];
      for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e2 = n.length; i > e2; e2++)
        a.push(o);
      this.handles = n.add(t(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e3) {
        t(this).data("ui-slider-handle-index", e3);
      });
    }, _createRange: function() {
      var e2 = this.options, i = "";
      e2.range ? (e2.range === true && (e2.values ? e2.values.length && 2 !== e2.values.length ? e2.values = [e2.values[0], e2.values[0]] : t.isArray(e2.values) && (e2.values = e2.values.slice(0)) : e2.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e2.range || "max" === e2.range ? " ui-slider-range-" + e2.range : ""))) : this.range = t([]);
    }, _setupEvents: function() {
      var t2 = this.handles.add(this.range).filter("a");
      this._off(t2), this._on(t2, this._handleEvents), this._hoverable(t2), this._focusable(t2);
    }, _destroy: function() {
      this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy();
    }, _mouseCapture: function(e2) {
      var i, s, n, o, a, r, h, l, c = this, u = this.options;
      return u.disabled ? false : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: e2.pageX, y: e2.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e3) {
        var i2 = Math.abs(s - c.values(e3));
        (n > i2 || n === i2 && (e3 === c._lastChangedValue || c.values(e3) === u.min)) && (n = i2, o = t(this), a = e3);
      }), r = this._start(e2, a), r === false ? false : (this._mouseSliding = true, this._handleIndex = a, o.addClass("ui-state-active").focus(), h = o.offset(), l = !t(e2.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? { left: 0, top: 0 } : { left: e2.pageX - h.left - o.width() / 2, top: e2.pageY - h.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e2, a, s), this._animateOff = true, true));
    }, _mouseStart: function() {
      return true;
    }, _mouseDrag: function(t2) {
      var e2 = { x: t2.pageX, y: t2.pageY }, i = this._normValueFromMouse(e2);
      return this._slide(t2, this._handleIndex, i), false;
    }, _mouseStop: function(t2) {
      return this.handles.removeClass("ui-state-active"), this._mouseSliding = false, this._stop(t2, this._handleIndex), this._change(t2, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = false, false;
    }, _detectOrientation: function() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
    }, _normValueFromMouse: function(t2) {
      var e2, i, s, n, o;
      return "horizontal" === this.orientation ? (e2 = this.elementSize.width, i = t2.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e2 = this.elementSize.height, i = t2.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e2, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o);
    }, _start: function(t2, e2) {
      var i = { handle: this.handles[e2], value: this.value() };
      return this.options.values && this.options.values.length && (i.value = this.values(e2), i.values = this.values()), this._trigger("start", t2, i);
    }, _slide: function(t2, e2, i) {
      var s, n, o;
      this.options.values && this.options.values.length ? (s = this.values(e2 ? 0 : 1), 2 === this.options.values.length && this.options.range === true && (0 === e2 && i > s || 1 === e2 && s > i) && (i = s), i !== this.values(e2) && (n = this.values(), n[e2] = i, o = this._trigger("slide", t2, { handle: this.handles[e2], value: i, values: n }), s = this.values(e2 ? 0 : 1), o !== false && this.values(e2, i, true))) : i !== this.value() && (o = this._trigger("slide", t2, { handle: this.handles[e2], value: i }), o !== false && this.value(i));
    }, _stop: function(t2, e2) {
      var i = { handle: this.handles[e2], value: this.value() };
      this.options.values && this.options.values.length && (i.value = this.values(e2), i.values = this.values()), this._trigger("stop", t2, i);
    }, _change: function(t2, e2) {
      if (!this._keySliding && !this._mouseSliding) {
        var i = { handle: this.handles[e2], value: this.value() };
        this.options.values && this.options.values.length && (i.value = this.values(e2), i.values = this.values()), this._lastChangedValue = e2, this._trigger("change", t2, i);
      }
    }, value: function(t2) {
      return arguments.length ? (this.options.value = this._trimAlignValue(t2), this._refreshValue(), this._change(null, 0), void 0) : this._value();
    }, values: function(e2, i) {
      var s, n, o;
      if (arguments.length > 1)
        return this.options.values[e2] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e2), void 0;
      if (!arguments.length)
        return this._values();
      if (!t.isArray(arguments[0]))
        return this.options.values && this.options.values.length ? this._values(e2) : this.value();
      for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1)
        s[o] = this._trimAlignValue(n[o]), this._change(null, o);
      this._refreshValue();
    }, _setOption: function(e2, i) {
      var s, n = 0;
      switch ("range" === e2 && this.options.range === true && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e2) {
        case "orientation":
          this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
          break;
        case "value":
          this._animateOff = true, this._refreshValue(), this._change(null, 0), this._animateOff = false;
          break;
        case "values":
          for (this._animateOff = true, this._refreshValue(), s = 0; n > s; s += 1)
            this._change(null, s);
          this._animateOff = false;
          break;
        case "min":
        case "max":
          this._animateOff = true, this._refreshValue(), this._animateOff = false;
          break;
        case "range":
          this._animateOff = true, this._refresh(), this._animateOff = false;
      }
    }, _value: function() {
      var t2 = this.options.value;
      return t2 = this._trimAlignValue(t2);
    }, _values: function(t2) {
      var e2, i, s;
      if (arguments.length)
        return e2 = this.options.values[t2], e2 = this._trimAlignValue(e2);
      if (this.options.values && this.options.values.length) {
        for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
          i[s] = this._trimAlignValue(i[s]);
        return i;
      }
      return [];
    }, _trimAlignValue: function(t2) {
      if (this._valueMin() >= t2)
        return this._valueMin();
      if (t2 >= this._valueMax())
        return this._valueMax();
      var e2 = this.options.step > 0 ? this.options.step : 1, i = (t2 - this._valueMin()) % e2, s = t2 - i;
      return 2 * Math.abs(i) >= e2 && (s += i > 0 ? e2 : -e2), parseFloat(s.toFixed(5));
    }, _valueMin: function() {
      return this.options.min;
    }, _valueMax: function() {
      return this.options.max;
    }, _refreshValue: function() {
      var e2, i, s, n, o, a = this.options.range, r = this.options, h = this, l = this._animateOff ? false : r.animate, c = {};
      this.options.values && this.options.values.length ? this.handles.each(function(s2) {
        i = 100 * ((h.values(s2) - h._valueMin()) / (h._valueMax() - h._valueMin())), c["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate), h.options.range === true && ("horizontal" === h.orientation ? (0 === s2 && h.range.stop(1, 1)[l ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s2 && h.range[l ? "animate" : "css"]({ width: i - e2 + "%" }, { queue: false, duration: r.animate })) : (0 === s2 && h.range.stop(1, 1)[l ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s2 && h.range[l ? "animate" : "css"]({ height: i - e2 + "%" }, { queue: false, duration: r.animate }))), e2 = i;
      }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === a && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: false, duration: r.animate }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === a && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: false, duration: r.animate }));
    }, _handleEvents: { keydown: function(i) {
      var s, n, o, a, r = t(i.target).data("ui-slider-handle-index");
      switch (i.keyCode) {
        case t.ui.keyCode.HOME:
        case t.ui.keyCode.END:
        case t.ui.keyCode.PAGE_UP:
        case t.ui.keyCode.PAGE_DOWN:
        case t.ui.keyCode.UP:
        case t.ui.keyCode.RIGHT:
        case t.ui.keyCode.DOWN:
        case t.ui.keyCode.LEFT:
          if (i.preventDefault(), !this._keySliding && (this._keySliding = true, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === false))
            return;
      }
      switch (a = this.options.step, n = o = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
        case t.ui.keyCode.HOME:
          o = this._valueMin();
          break;
        case t.ui.keyCode.END:
          o = this._valueMax();
          break;
        case t.ui.keyCode.PAGE_UP:
          o = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
          break;
        case t.ui.keyCode.PAGE_DOWN:
          o = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
          break;
        case t.ui.keyCode.UP:
        case t.ui.keyCode.RIGHT:
          if (n === this._valueMax())
            return;
          o = this._trimAlignValue(n + a);
          break;
        case t.ui.keyCode.DOWN:
        case t.ui.keyCode.LEFT:
          if (n === this._valueMin())
            return;
          o = this._trimAlignValue(n - a);
      }
      this._slide(i, r, o);
    }, click: function(t2) {
      t2.preventDefault();
    }, keyup: function(e2) {
      var i = t(e2.target).data("ui-slider-handle-index");
      this._keySliding && (this._keySliding = false, this._stop(e2, i), this._change(e2, i), t(e2.target).removeClass("ui-state-active"));
    } } });
  }(jQuery), function(t) {
    function e(t2) {
      return function() {
        var e2 = this.element.val();
        t2.apply(this, arguments), this._refresh(), e2 !== this.element.val() && this._trigger("change");
      };
    }
    t.widget("ui.spinner", { version: "1.10.2", defaultElement: "<input>", widgetEventPrefix: "spin", options: { culture: null, icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" }, incremental: true, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null }, _create: function() {
      this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), true), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, { beforeunload: function() {
        this.element.removeAttr("autocomplete");
      } });
    }, _getCreateOptions: function() {
      var e2 = {}, i = this.element;
      return t.each(["min", "max", "step"], function(t2, s) {
        var n = i.attr(s);
        void 0 !== n && n.length && (e2[s] = n);
      }), e2;
    }, _events: { keydown: function(t2) {
      this._start(t2) && this._keydown(t2) && t2.preventDefault();
    }, keyup: "_stop", focus: function() {
      this.previous = this.element.val();
    }, blur: function(t2) {
      return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t2), void 0);
    }, mousewheel: function(t2, e2) {
      if (e2) {
        if (!this.spinning && !this._start(t2))
          return false;
        this._spin((e2 > 0 ? 1 : -1) * this.options.step, t2), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
          this.spinning && this._stop(t2);
        }, 100), t2.preventDefault();
      }
    }, "mousedown .ui-spinner-button": function(e2) {
      function i() {
        var t2 = this.element[0] === this.document[0].activeElement;
        t2 || (this.element.focus(), this.previous = s, this._delay(function() {
          this.previous = s;
        }));
      }
      var s;
      s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e2.preventDefault(), i.call(this), this.cancelBlur = true, this._delay(function() {
        delete this.cancelBlur, i.call(this);
      }), this._start(e2) !== false && this._repeat(null, t(e2.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e2);
    }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function(e2) {
      return t(e2.currentTarget).hasClass("ui-state-active") ? this._start(e2) === false ? false : (this._repeat(null, t(e2.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e2), void 0) : void 0;
    }, "mouseleave .ui-spinner-button": "_stop" }, _draw: function() {
      var t2 = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
      this.element.attr("role", "spinbutton"), this.buttons = t2.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(0.5 * t2.height()) && t2.height() > 0 && t2.height(t2.height()), this.options.disabled && this.disable();
    }, _keydown: function(e2) {
      var i = this.options, s = t.ui.keyCode;
      switch (e2.keyCode) {
        case s.UP:
          return this._repeat(null, 1, e2), true;
        case s.DOWN:
          return this._repeat(null, -1, e2), true;
        case s.PAGE_UP:
          return this._repeat(null, i.page, e2), true;
        case s.PAGE_DOWN:
          return this._repeat(null, -i.page, e2), true;
      }
      return false;
    }, _uiSpinnerHtml: function() {
      return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
    }, _buttonHtml: function() {
      return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>";
    }, _start: function(t2) {
      return this.spinning || this._trigger("start", t2) !== false ? (this.counter || (this.counter = 1), this.spinning = true, true) : false;
    }, _repeat: function(t2, e2, i) {
      t2 = t2 || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
        this._repeat(40, e2, i);
      }, t2), this._spin(e2 * this.options.step, i);
    }, _spin: function(t2, e2) {
      var i = this.value() || 0;
      this.counter || (this.counter = 1), i = this._adjustValue(i + t2 * this._increment(this.counter)), this.spinning && this._trigger("spin", e2, { value: i }) === false || (this._value(i), this.counter++);
    }, _increment: function(e2) {
      var i = this.options.incremental;
      return i ? t.isFunction(i) ? i(e2) : Math.floor(e2 * e2 * e2 / 5e4 - e2 * e2 / 500 + 17 * e2 / 200 + 1) : 1;
    }, _precision: function() {
      var t2 = this._precisionOf(this.options.step);
      return null !== this.options.min && (t2 = Math.max(t2, this._precisionOf(this.options.min))), t2;
    }, _precisionOf: function(t2) {
      var e2 = "" + t2, i = e2.indexOf(".");
      return -1 === i ? 0 : e2.length - i - 1;
    }, _adjustValue: function(t2) {
      var e2, i, s = this.options;
      return e2 = null !== s.min ? s.min : 0, i = t2 - e2, i = Math.round(i / s.step) * s.step, t2 = e2 + i, t2 = parseFloat(t2.toFixed(this._precision())), null !== s.max && t2 > s.max ? s.max : null !== s.min && s.min > t2 ? s.min : t2;
    }, _stop: function(t2) {
      this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = false, this._trigger("stop", t2));
    }, _setOption: function(t2, e2) {
      if ("culture" === t2 || "numberFormat" === t2) {
        var i = this._parse(this.element.val());
        return this.options[t2] = e2, this.element.val(this._format(i)), void 0;
      }
      ("max" === t2 || "min" === t2 || "step" === t2) && "string" == typeof e2 && (e2 = this._parse(e2)), "icons" === t2 && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e2.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e2.down)), this._super(t2, e2), "disabled" === t2 && (e2 ? (this.element.prop("disabled", true), this.buttons.button("disable")) : (this.element.prop("disabled", false), this.buttons.button("enable")));
    }, _setOptions: e(function(t2) {
      this._super(t2), this._value(this.element.val());
    }), _parse: function(t2) {
      return "string" == typeof t2 && "" !== t2 && (t2 = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t2, 10, this.options.culture) : +t2), "" === t2 || isNaN(t2) ? null : t2;
    }, _format: function(t2) {
      return "" === t2 ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t2, this.options.numberFormat, this.options.culture) : t2;
    }, _refresh: function() {
      this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) });
    }, _value: function(t2, e2) {
      var i;
      "" !== t2 && (i = this._parse(t2), null !== i && (e2 || (i = this._adjustValue(i)), t2 = this._format(i))), this.element.val(t2), this._refresh();
    }, _destroy: function() {
      this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element);
    }, stepUp: e(function(t2) {
      this._stepUp(t2);
    }), _stepUp: function(t2) {
      this._start() && (this._spin((t2 || 1) * this.options.step), this._stop());
    }, stepDown: e(function(t2) {
      this._stepDown(t2);
    }), _stepDown: function(t2) {
      this._start() && (this._spin((t2 || 1) * -this.options.step), this._stop());
    }, pageUp: e(function(t2) {
      this._stepUp((t2 || 1) * this.options.page);
    }), pageDown: e(function(t2) {
      this._stepDown((t2 || 1) * this.options.page);
    }), value: function(t2) {
      return arguments.length ? (e(this._value).call(this, t2), void 0) : this._parse(this.element.val());
    }, widget: function() {
      return this.uiSpinner;
    } });
  }(jQuery), function(t, e) {
    function i() {
      return ++n;
    }
    function s(t2) {
      return t2.hash.length > 1 && decodeURIComponent(t2.href.replace(o, "")) === decodeURIComponent(location.href.replace(o, ""));
    }
    var n = 0, o = /#.*$/;
    t.widget("ui.tabs", { version: "1.10.2", delay: 300, options: { active: null, collapsible: false, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null }, _create: function() {
      var e2 = this, i2 = this.options;
      this.running = false, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i2.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e3) {
        t(this).is(".ui-state-disabled") && e3.preventDefault();
      }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
        t(this).closest("li").is(".ui-state-disabled") && this.blur();
      }), this._processTabs(), i2.active = this._initialActive(), t.isArray(i2.disabled) && (i2.disabled = t.unique(i2.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t2) {
        return e2.tabs.index(t2);
      }))).sort()), this.active = this.options.active !== false && this.anchors.length ? this._findActive(i2.active) : t(), this._refresh(), this.active.length && this.load(i2.active);
    }, _initialActive: function() {
      var i2 = this.options.active, s2 = this.options.collapsible, n2 = location.hash.substring(1);
      return null === i2 && (n2 && this.tabs.each(function(s3, o2) {
        return t(o2).attr("aria-controls") === n2 ? (i2 = s3, false) : e;
      }), null === i2 && (i2 = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i2 || -1 === i2) && (i2 = this.tabs.length ? 0 : false)), i2 !== false && (i2 = this.tabs.index(this.tabs.eq(i2)), -1 === i2 && (i2 = s2 ? false : 0)), !s2 && i2 === false && this.anchors.length && (i2 = 0), i2;
    }, _getCreateEventData: function() {
      return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t() };
    }, _tabKeydown: function(i2) {
      var s2 = t(this.document[0].activeElement).closest("li"), n2 = this.tabs.index(s2), o2 = true;
      if (!this._handlePageNav(i2)) {
        switch (i2.keyCode) {
          case t.ui.keyCode.RIGHT:
          case t.ui.keyCode.DOWN:
            n2++;
            break;
          case t.ui.keyCode.UP:
          case t.ui.keyCode.LEFT:
            o2 = false, n2--;
            break;
          case t.ui.keyCode.END:
            n2 = this.anchors.length - 1;
            break;
          case t.ui.keyCode.HOME:
            n2 = 0;
            break;
          case t.ui.keyCode.SPACE:
            return i2.preventDefault(), clearTimeout(this.activating), this._activate(n2), e;
          case t.ui.keyCode.ENTER:
            return i2.preventDefault(), clearTimeout(this.activating), this._activate(n2 === this.options.active ? false : n2), e;
          default:
            return;
        }
        i2.preventDefault(), clearTimeout(this.activating), n2 = this._focusNextTab(n2, o2), i2.ctrlKey || (s2.attr("aria-selected", "false"), this.tabs.eq(n2).attr("aria-selected", "true"), this.activating = this._delay(function() {
          this.option("active", n2);
        }, this.delay));
      }
    }, _panelKeydown: function(e2) {
      this._handlePageNav(e2) || e2.ctrlKey && e2.keyCode === t.ui.keyCode.UP && (e2.preventDefault(), this.active.focus());
    }, _handlePageNav: function(i2) {
      return i2.altKey && i2.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, false)), true) : i2.altKey && i2.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, true)), true) : e;
    }, _findNextTab: function(e2, i2) {
      function s2() {
        return e2 > n2 && (e2 = 0), 0 > e2 && (e2 = n2), e2;
      }
      for (var n2 = this.tabs.length - 1; -1 !== t.inArray(s2(), this.options.disabled); )
        e2 = i2 ? e2 + 1 : e2 - 1;
      return e2;
    }, _focusNextTab: function(t2, e2) {
      return t2 = this._findNextTab(t2, e2), this.tabs.eq(t2).focus(), t2;
    }, _setOption: function(t2, i2) {
      return "active" === t2 ? (this._activate(i2), e) : "disabled" === t2 ? (this._setupDisabled(i2), e) : (this._super(t2, i2), "collapsible" === t2 && (this.element.toggleClass("ui-tabs-collapsible", i2), i2 || this.options.active !== false || this._activate(0)), "event" === t2 && this._setupEvents(i2), "heightStyle" === t2 && this._setupHeightStyle(i2), e);
    }, _tabId: function(t2) {
      return t2.attr("aria-controls") || "ui-tabs-" + i();
    }, _sanitizeSelector: function(t2) {
      return t2 ? t2.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
    }, refresh: function() {
      var e2 = this.options, i2 = this.tablist.children(":has(a[href])");
      e2.disabled = t.map(i2.filter(".ui-state-disabled"), function(t2) {
        return i2.index(t2);
      }), this._processTabs(), e2.active !== false && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e2.disabled.length ? (e2.active = false, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e2.active - 1), false)) : e2.active = this.tabs.index(this.active) : (e2.active = false, this.active = t()), this._refresh();
    }, _refresh: function() {
      this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({ "aria-selected": "false", tabIndex: -1 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-expanded": "false", "aria-hidden": "true" }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({ "aria-selected": "true", tabIndex: 0 }), this._getPanelForTab(this.active).show().attr({ "aria-expanded": "true", "aria-hidden": "false" })) : this.tabs.eq(0).attr("tabIndex", 0);
    }, _processTabs: function() {
      var e2 = this;
      this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({ role: "tab", tabIndex: -1 }), this.anchors = this.tabs.map(function() {
        return t("a", this)[0];
      }).addClass("ui-tabs-anchor").attr({ role: "presentation", tabIndex: -1 }), this.panels = t(), this.anchors.each(function(i2, n2) {
        var o2, a, r, h = t(n2).uniqueId().attr("id"), l = t(n2).closest("li"), c = l.attr("aria-controls");
        s(n2) ? (o2 = n2.hash, a = e2.element.find(e2._sanitizeSelector(o2))) : (r = e2._tabId(l), o2 = "#" + r, a = e2.element.find(o2), a.length || (a = e2._createPanel(r), a.insertAfter(e2.panels[i2 - 1] || e2.tablist)), a.attr("aria-live", "polite")), a.length && (e2.panels = e2.panels.add(a)), c && l.data("ui-tabs-aria-controls", c), l.attr({ "aria-controls": o2.substring(1), "aria-labelledby": h }), a.attr("aria-labelledby", h);
      }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel");
    }, _getList: function() {
      return this.element.find("ol,ul").eq(0);
    }, _createPanel: function(e2) {
      return t("<div>").attr("id", e2).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true);
    }, _setupDisabled: function(e2) {
      t.isArray(e2) && (e2.length ? e2.length === this.anchors.length && (e2 = true) : e2 = false);
      for (var i2, s2 = 0; i2 = this.tabs[s2]; s2++)
        e2 === true || -1 !== t.inArray(s2, e2) ? t(i2).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i2).removeClass("ui-state-disabled").removeAttr("aria-disabled");
      this.options.disabled = e2;
    }, _setupEvents: function(e2) {
      var i2 = { click: function(t2) {
        t2.preventDefault();
      } };
      e2 && t.each(e2.split(" "), function(t2, e3) {
        i2[e3] = "_eventHandler";
      }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i2), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs);
    }, _setupHeightStyle: function(e2) {
      var i2, s2 = this.element.parent();
      "fill" === e2 ? (i2 = s2.height(), i2 -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
        var e3 = t(this), s3 = e3.css("position");
        "absolute" !== s3 && "fixed" !== s3 && (i2 -= e3.outerHeight(true));
      }), this.element.children().not(this.panels).each(function() {
        i2 -= t(this).outerHeight(true);
      }), this.panels.each(function() {
        t(this).height(Math.max(0, i2 - t(this).innerHeight() + t(this).height()));
      }).css("overflow", "auto")) : "auto" === e2 && (i2 = 0, this.panels.each(function() {
        i2 = Math.max(i2, t(this).height("").height());
      }).height(i2));
    }, _eventHandler: function(e2) {
      var i2 = this.options, s2 = this.active, n2 = t(e2.currentTarget), o2 = n2.closest("li"), a = o2[0] === s2[0], r = a && i2.collapsible, h = r ? t() : this._getPanelForTab(o2), l = s2.length ? this._getPanelForTab(s2) : t(), c = { oldTab: s2, oldPanel: l, newTab: r ? t() : o2, newPanel: h };
      e2.preventDefault(), o2.hasClass("ui-state-disabled") || o2.hasClass("ui-tabs-loading") || this.running || a && !i2.collapsible || this._trigger("beforeActivate", e2, c) === false || (i2.active = r ? false : this.tabs.index(o2), this.active = a ? t() : o2, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(o2), e2), this._toggle(e2, c));
    }, _toggle: function(e2, i2) {
      function s2() {
        o2.running = false, o2._trigger("activate", e2, i2);
      }
      function n2() {
        i2.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && o2.options.show ? o2._show(a, o2.options.show, s2) : (a.show(), s2());
      }
      var o2 = this, a = i2.newPanel, r = i2.oldPanel;
      this.running = true, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
        i2.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n2();
      }) : (i2.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n2()), r.attr({ "aria-expanded": "false", "aria-hidden": "true" }), i2.oldTab.attr("aria-selected", "false"), a.length && r.length ? i2.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
        return 0 === t(this).attr("tabIndex");
      }).attr("tabIndex", -1), a.attr({ "aria-expanded": "true", "aria-hidden": "false" }), i2.newTab.attr({ "aria-selected": "true", tabIndex: 0 });
    }, _activate: function(e2) {
      var i2, s2 = this._findActive(e2);
      s2[0] !== this.active[0] && (s2.length || (s2 = this.active), i2 = s2.find(".ui-tabs-anchor")[0], this._eventHandler({ target: i2, currentTarget: i2, preventDefault: t.noop }));
    }, _findActive: function(e2) {
      return e2 === false ? t() : this.tabs.eq(e2);
    }, _getIndex: function(t2) {
      return "string" == typeof t2 && (t2 = this.anchors.index(this.anchors.filter("[href$='" + t2 + "']"))), t2;
    }, _destroy: function() {
      this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");
      }), this.tabs.each(function() {
        var e2 = t(this), i2 = e2.data("ui-tabs-aria-controls");
        i2 ? e2.attr("aria-controls", i2).removeData("ui-tabs-aria-controls") : e2.removeAttr("aria-controls");
      }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
    }, enable: function(i2) {
      var s2 = this.options.disabled;
      s2 !== false && (i2 === e ? s2 = false : (i2 = this._getIndex(i2), s2 = t.isArray(s2) ? t.map(s2, function(t2) {
        return t2 !== i2 ? t2 : null;
      }) : t.map(this.tabs, function(t2, e2) {
        return e2 !== i2 ? e2 : null;
      })), this._setupDisabled(s2));
    }, disable: function(i2) {
      var s2 = this.options.disabled;
      if (s2 !== true) {
        if (i2 === e)
          s2 = true;
        else {
          if (i2 = this._getIndex(i2), -1 !== t.inArray(i2, s2))
            return;
          s2 = t.isArray(s2) ? t.merge([i2], s2).sort() : [i2];
        }
        this._setupDisabled(s2);
      }
    }, load: function(e2, i2) {
      e2 = this._getIndex(e2);
      var n2 = this, o2 = this.tabs.eq(e2), a = o2.find(".ui-tabs-anchor"), r = this._getPanelForTab(o2), h = { tab: o2, panel: r };
      s(a[0]) || (this.xhr = t.ajax(this._ajaxSettings(a, i2, h)), this.xhr && "canceled" !== this.xhr.statusText && (o2.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function(t2) {
        setTimeout(function() {
          r.html(t2), n2._trigger("load", i2, h);
        }, 1);
      }).complete(function(t2, e3) {
        setTimeout(function() {
          "abort" === e3 && n2.panels.stop(false, true), o2.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t2 === n2.xhr && delete n2.xhr;
        }, 1);
      })));
    }, _ajaxSettings: function(e2, i2, s2) {
      var n2 = this;
      return { url: e2.attr("href"), beforeSend: function(e3, o2) {
        return n2._trigger("beforeLoad", i2, t.extend({ jqXHR: e3, ajaxSettings: o2 }, s2));
      } };
    }, _getPanelForTab: function(e2) {
      var i2 = t(e2).attr("aria-controls");
      return this.element.find(this._sanitizeSelector("#" + i2));
    } });
  }(jQuery), function(t) {
    function e(e2, i2) {
      var s2 = (e2.attr("aria-describedby") || "").split(/\s+/);
      s2.push(i2), e2.data("ui-tooltip-id", i2).attr("aria-describedby", t.trim(s2.join(" ")));
    }
    function i(e2) {
      var i2 = e2.data("ui-tooltip-id"), s2 = (e2.attr("aria-describedby") || "").split(/\s+/), n = t.inArray(i2, s2);
      -1 !== n && s2.splice(n, 1), e2.removeData("ui-tooltip-id"), s2 = t.trim(s2.join(" ")), s2 ? e2.attr("aria-describedby", s2) : e2.removeAttr("aria-describedby");
    }
    var s = 0;
    t.widget("ui.tooltip", { version: "1.10.2", options: { content: function() {
      var e2 = t(this).attr("title") || "";
      return t("<a>").text(e2).html();
    }, hide: true, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: true, tooltipClass: null, track: false, close: null, open: null }, _create: function() {
      this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable();
    }, _setOption: function(e2, i2) {
      var s2 = this;
      return "disabled" === e2 ? (this[i2 ? "_disable" : "_enable"](), this.options[e2] = i2, void 0) : (this._super(e2, i2), "content" === e2 && t.each(this.tooltips, function(t2, e3) {
        s2._updateContent(e3);
      }), void 0);
    }, _disable: function() {
      var e2 = this;
      t.each(this.tooltips, function(i2, s2) {
        var n = t.Event("blur");
        n.target = n.currentTarget = s2[0], e2.close(n, true);
      }), this.element.find(this.options.items).addBack().each(function() {
        var e3 = t(this);
        e3.is("[title]") && e3.data("ui-tooltip-title", e3.attr("title")).attr("title", "");
      });
    }, _enable: function() {
      this.element.find(this.options.items).addBack().each(function() {
        var e2 = t(this);
        e2.data("ui-tooltip-title") && e2.attr("title", e2.data("ui-tooltip-title"));
      });
    }, open: function(e2) {
      var i2 = this, s2 = t(e2 ? e2.target : this.element).closest(this.options.items);
      s2.length && !s2.data("ui-tooltip-id") && (s2.attr("title") && s2.data("ui-tooltip-title", s2.attr("title")), s2.data("ui-tooltip-open", true), e2 && "mouseover" === e2.type && s2.parents().each(function() {
        var e3, s3 = t(this);
        s3.data("ui-tooltip-open") && (e3 = t.Event("blur"), e3.target = e3.currentTarget = this, i2.close(e3, true)), s3.attr("title") && (s3.uniqueId(), i2.parents[this.id] = { element: this, title: s3.attr("title") }, s3.attr("title", ""));
      }), this._updateContent(s2, e2));
    }, _updateContent: function(t2, e2) {
      var i2, s2 = this.options.content, n = this, o = e2 ? e2.type : null;
      return "string" == typeof s2 ? this._open(e2, t2, s2) : (i2 = s2.call(t2[0], function(i3) {
        t2.data("ui-tooltip-open") && n._delay(function() {
          e2 && (e2.type = o), this._open(e2, t2, i3);
        });
      }), i2 && this._open(e2, t2, i2), void 0);
    }, _open: function(i2, s2, n) {
      function o(t2) {
        l.of = t2, a.is(":hidden") || a.position(l);
      }
      var a, r, h, l = t.extend({}, this.options.position);
      if (n) {
        if (a = this._find(s2), a.length)
          return a.find(".ui-tooltip-content").html(n), void 0;
        s2.is("[title]") && (i2 && "mouseover" === i2.type ? s2.attr("title", "") : s2.removeAttr("title")), a = this._tooltip(s2), e(s2, a.attr("id")), a.find(".ui-tooltip-content").html(n), this.options.track && i2 && /^mouse/.test(i2.type) ? (this._on(this.document, { mousemove: o }), o(i2)) : a.position(t.extend({ of: s2 }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
          a.is(":visible") && (o(l.of), clearInterval(h));
        }, t.fx.interval)), this._trigger("open", i2, { tooltip: a }), r = { keyup: function(e2) {
          if (e2.keyCode === t.ui.keyCode.ESCAPE) {
            var i3 = t.Event(e2);
            i3.currentTarget = s2[0], this.close(i3, true);
          }
        }, remove: function() {
          this._removeTooltip(a);
        } }, i2 && "mouseover" !== i2.type || (r.mouseleave = "close"), i2 && "focusin" !== i2.type || (r.focusout = "close"), this._on(true, s2, r);
      }
    }, close: function(e2) {
      var s2 = this, n = t(e2 ? e2.currentTarget : this.element), o = this._find(n);
      this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && n.attr("title", n.data("ui-tooltip-title")), i(n), o.stop(true), this._hide(o, this.options.hide, function() {
        s2._removeTooltip(t(this));
      }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e2 && "mouseleave" === e2.type && t.each(this.parents, function(e3, i2) {
        t(i2.element).attr("title", i2.title), delete s2.parents[e3];
      }), this.closing = true, this._trigger("close", e2, { tooltip: o }), this.closing = false);
    }, _tooltip: function(e2) {
      var i2 = "ui-tooltip-" + s++, n = t("<div>").attr({ id: i2, role: "tooltip" }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
      return t("<div>").addClass("ui-tooltip-content").appendTo(n), n.appendTo(this.document[0].body), this.tooltips[i2] = e2, n;
    }, _find: function(e2) {
      var i2 = e2.data("ui-tooltip-id");
      return i2 ? t("#" + i2) : t();
    }, _removeTooltip: function(t2) {
      t2.remove(), delete this.tooltips[t2.attr("id")];
    }, _destroy: function() {
      var e2 = this;
      t.each(this.tooltips, function(i2, s2) {
        var n = t.Event("blur");
        n.target = n.currentTarget = s2[0], e2.close(n, true), t("#" + i2).remove(), s2.data("ui-tooltip-title") && (s2.attr("title", s2.data("ui-tooltip-title")), s2.removeData("ui-tooltip-title"));
      });
    } });
  }(jQuery);
})();
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
