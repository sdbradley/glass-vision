(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@rails/actioncable/src/adapters.js
  var adapters_default;
  var init_adapters = __esm({
    "node_modules/@rails/actioncable/src/adapters.js"() {
      adapters_default = {
        logger: self.console,
        WebSocket: self.WebSocket
      };
    }
  });

  // node_modules/@rails/actioncable/src/logger.js
  var logger_default;
  var init_logger = __esm({
    "node_modules/@rails/actioncable/src/logger.js"() {
      init_adapters();
      logger_default = {
        log(...messages) {
          if (this.enabled) {
            messages.push(Date.now());
            adapters_default.logger.log("[ActionCable]", ...messages);
          }
        }
      };
    }
  });

  // node_modules/@rails/actioncable/src/connection_monitor.js
  var now, secondsSince, ConnectionMonitor, connection_monitor_default;
  var init_connection_monitor = __esm({
    "node_modules/@rails/actioncable/src/connection_monitor.js"() {
      init_logger();
      now = () => (/* @__PURE__ */ new Date()).getTime();
      secondsSince = (time) => (now() - time) / 1e3;
      ConnectionMonitor = class {
        constructor(connection) {
          this.visibilityDidChange = this.visibilityDidChange.bind(this);
          this.connection = connection;
          this.reconnectAttempts = 0;
        }
        start() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            addEventListener("visibilitychange", this.visibilityDidChange);
            logger_default.log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`);
          }
        }
        stop() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            removeEventListener("visibilitychange", this.visibilityDidChange);
            logger_default.log("ConnectionMonitor stopped");
          }
        }
        isRunning() {
          return this.startedAt && !this.stoppedAt;
        }
        recordPing() {
          this.pingedAt = now();
        }
        recordConnect() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          logger_default.log("ConnectionMonitor recorded connect");
        }
        recordDisconnect() {
          this.disconnectedAt = now();
          logger_default.log("ConnectionMonitor recorded disconnect");
        }
        // Private
        startPolling() {
          this.stopPolling();
          this.poll();
        }
        stopPolling() {
          clearTimeout(this.pollTimeout);
        }
        poll() {
          this.pollTimeout = setTimeout(
            () => {
              this.reconnectIfStale();
              this.poll();
            },
            this.getPollInterval()
          );
        }
        getPollInterval() {
          const { staleThreshold, reconnectionBackoffRate } = this.constructor;
          const backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
          const jitterMax = this.reconnectAttempts === 0 ? 1 : reconnectionBackoffRate;
          const jitter = jitterMax * Math.random();
          return staleThreshold * 1e3 * backoff * (1 + jitter);
        }
        reconnectIfStale() {
          if (this.connectionIsStale()) {
            logger_default.log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              logger_default.log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);
            } else {
              logger_default.log("ConnectionMonitor reopening");
              this.connection.reopen();
            }
          }
        }
        get refreshedAt() {
          return this.pingedAt ? this.pingedAt : this.startedAt;
        }
        connectionIsStale() {
          return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
        }
        disconnectedRecently() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        }
        visibilityDidChange() {
          if (document.visibilityState === "visible") {
            setTimeout(
              () => {
                if (this.connectionIsStale() || !this.connection.isOpen()) {
                  logger_default.log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);
                  this.connection.reopen();
                }
              },
              200
            );
          }
        }
      };
      ConnectionMonitor.staleThreshold = 6;
      ConnectionMonitor.reconnectionBackoffRate = 0.15;
      connection_monitor_default = ConnectionMonitor;
    }
  });

  // node_modules/@rails/actioncable/src/internal.js
  var internal_default;
  var init_internal = __esm({
    "node_modules/@rails/actioncable/src/internal.js"() {
      internal_default = {
        "message_types": {
          "welcome": "welcome",
          "disconnect": "disconnect",
          "ping": "ping",
          "confirmation": "confirm_subscription",
          "rejection": "reject_subscription"
        },
        "disconnect_reasons": {
          "unauthorized": "unauthorized",
          "invalid_request": "invalid_request",
          "server_restart": "server_restart"
        },
        "default_mount_path": "/cable",
        "protocols": [
          "actioncable-v1-json",
          "actioncable-unsupported"
        ]
      };
    }
  });

  // node_modules/@rails/actioncable/src/connection.js
  var message_types, protocols, supportedProtocols, indexOf, Connection, connection_default;
  var init_connection = __esm({
    "node_modules/@rails/actioncable/src/connection.js"() {
      init_adapters();
      init_connection_monitor();
      init_internal();
      init_logger();
      ({ message_types, protocols } = internal_default);
      supportedProtocols = protocols.slice(0, protocols.length - 1);
      indexOf = [].indexOf;
      Connection = class {
        constructor(consumer2) {
          this.open = this.open.bind(this);
          this.consumer = consumer2;
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new connection_monitor_default(this);
          this.disconnected = true;
        }
        send(data2) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data2));
            return true;
          } else {
            return false;
          }
        }
        open() {
          if (this.isActive()) {
            logger_default.log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);
            return false;
          } else {
            logger_default.log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${protocols}`);
            if (this.webSocket) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new adapters_default.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        }
        close({ allowReconnect } = { allowReconnect: true }) {
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isOpen()) {
            return this.webSocket.close();
          }
        }
        reopen() {
          logger_default.log(`Reopening WebSocket, current state is ${this.getState()}`);
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error2) {
              logger_default.log("Failed to reopen WebSocket", error2);
            } finally {
              logger_default.log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        }
        getProtocol() {
          if (this.webSocket) {
            return this.webSocket.protocol;
          }
        }
        isOpen() {
          return this.isState("open");
        }
        isActive() {
          return this.isState("open", "connecting");
        }
        // Private
        isProtocolSupported() {
          return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
        }
        isState(...states) {
          return indexOf.call(states, this.getState()) >= 0;
        }
        getState() {
          if (this.webSocket) {
            for (let state in adapters_default.WebSocket) {
              if (adapters_default.WebSocket[state] === this.webSocket.readyState) {
                return state.toLowerCase();
              }
            }
          }
          return null;
        }
        installEventHandlers() {
          for (let eventName in this.events) {
            const handler = this.events[eventName].bind(this);
            this.webSocket[`on${eventName}`] = handler;
          }
        }
        uninstallEventHandlers() {
          for (let eventName in this.events) {
            this.webSocket[`on${eventName}`] = function() {
            };
          }
        }
      };
      Connection.reopenDelay = 500;
      Connection.prototype.events = {
        message(event) {
          if (!this.isProtocolSupported()) {
            return;
          }
          const { identifier, message, reason, reconnect, type } = JSON.parse(event.data);
          switch (type) {
            case message_types.welcome:
              this.monitor.recordConnect();
              return this.subscriptions.reload();
            case message_types.disconnect:
              logger_default.log(`Disconnecting. Reason: ${reason}`);
              return this.close({ allowReconnect: reconnect });
            case message_types.ping:
              return this.monitor.recordPing();
            case message_types.confirmation:
              this.subscriptions.confirmSubscription(identifier);
              return this.subscriptions.notify(identifier, "connected");
            case message_types.rejection:
              return this.subscriptions.reject(identifier);
            default:
              return this.subscriptions.notify(identifier, "received", message);
          }
        },
        open() {
          logger_default.log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
          this.disconnected = false;
          if (!this.isProtocolSupported()) {
            logger_default.log("Protocol is unsupported. Stopping monitor and disconnecting.");
            return this.close({ allowReconnect: false });
          }
        },
        close(event) {
          logger_default.log("WebSocket onclose event");
          if (this.disconnected) {
            return;
          }
          this.disconnected = true;
          this.monitor.recordDisconnect();
          return this.subscriptions.notifyAll("disconnected", { willAttemptReconnect: this.monitor.isRunning() });
        },
        error() {
          logger_default.log("WebSocket onerror event");
        }
      };
      connection_default = Connection;
    }
  });

  // node_modules/@rails/actioncable/src/subscription.js
  var extend, Subscription;
  var init_subscription = __esm({
    "node_modules/@rails/actioncable/src/subscription.js"() {
      extend = function(object, properties) {
        if (properties != null) {
          for (let key in properties) {
            const value = properties[key];
            object[key] = value;
          }
        }
        return object;
      };
      Subscription = class {
        constructor(consumer2, params = {}, mixin) {
          this.consumer = consumer2;
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }
        // Perform a channel action with the optional data passed as an attribute
        perform(action, data2 = {}) {
          data2.action = action;
          return this.send(data2);
        }
        send(data2) {
          return this.consumer.send({ command: "message", identifier: this.identifier, data: JSON.stringify(data2) });
        }
        unsubscribe() {
          return this.consumer.subscriptions.remove(this);
        }
      };
    }
  });

  // node_modules/@rails/actioncable/src/subscription_guarantor.js
  var SubscriptionGuarantor, subscription_guarantor_default;
  var init_subscription_guarantor = __esm({
    "node_modules/@rails/actioncable/src/subscription_guarantor.js"() {
      init_logger();
      SubscriptionGuarantor = class {
        constructor(subscriptions) {
          this.subscriptions = subscriptions;
          this.pendingSubscriptions = [];
        }
        guarantee(subscription) {
          if (this.pendingSubscriptions.indexOf(subscription) == -1) {
            logger_default.log(`SubscriptionGuarantor guaranteeing ${subscription.identifier}`);
            this.pendingSubscriptions.push(subscription);
          } else {
            logger_default.log(`SubscriptionGuarantor already guaranteeing ${subscription.identifier}`);
          }
          this.startGuaranteeing();
        }
        forget(subscription) {
          logger_default.log(`SubscriptionGuarantor forgetting ${subscription.identifier}`);
          this.pendingSubscriptions = this.pendingSubscriptions.filter((s) => s !== subscription);
        }
        startGuaranteeing() {
          this.stopGuaranteeing();
          this.retrySubscribing();
        }
        stopGuaranteeing() {
          clearTimeout(this.retryTimeout);
        }
        retrySubscribing() {
          this.retryTimeout = setTimeout(
            () => {
              if (this.subscriptions && typeof this.subscriptions.subscribe === "function") {
                this.pendingSubscriptions.map((subscription) => {
                  logger_default.log(`SubscriptionGuarantor resubscribing ${subscription.identifier}`);
                  this.subscriptions.subscribe(subscription);
                });
              }
            },
            500
          );
        }
      };
      subscription_guarantor_default = SubscriptionGuarantor;
    }
  });

  // node_modules/@rails/actioncable/src/subscriptions.js
  var Subscriptions;
  var init_subscriptions = __esm({
    "node_modules/@rails/actioncable/src/subscriptions.js"() {
      init_subscription();
      init_subscription_guarantor();
      init_logger();
      Subscriptions = class {
        constructor(consumer2) {
          this.consumer = consumer2;
          this.guarantor = new subscription_guarantor_default(this);
          this.subscriptions = [];
        }
        create(channelName, mixin) {
          const channel = channelName;
          const params = typeof channel === "object" ? channel : { channel };
          const subscription = new Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        }
        // Private
        add(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.subscribe(subscription);
          return subscription;
        }
        remove(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        }
        reject(identifier) {
          return this.findAll(identifier).map((subscription) => {
            this.forget(subscription);
            this.notify(subscription, "rejected");
            return subscription;
          });
        }
        forget(subscription) {
          this.guarantor.forget(subscription);
          this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
          return subscription;
        }
        findAll(identifier) {
          return this.subscriptions.filter((s) => s.identifier === identifier);
        }
        reload() {
          return this.subscriptions.map((subscription) => this.subscribe(subscription));
        }
        notifyAll(callbackName, ...args) {
          return this.subscriptions.map((subscription) => this.notify(subscription, callbackName, ...args));
        }
        notify(subscription, callbackName, ...args) {
          let subscriptions;
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          return subscriptions.map((subscription2) => typeof subscription2[callbackName] === "function" ? subscription2[callbackName](...args) : void 0);
        }
        subscribe(subscription) {
          if (this.sendCommand(subscription, "subscribe")) {
            this.guarantor.guarantee(subscription);
          }
        }
        confirmSubscription(identifier) {
          logger_default.log(`Subscription confirmed ${identifier}`);
          this.findAll(identifier).map((subscription) => this.guarantor.forget(subscription));
        }
        sendCommand(subscription, command) {
          const { identifier } = subscription;
          return this.consumer.send({ command, identifier });
        }
      };
    }
  });

  // node_modules/@rails/actioncable/src/consumer.js
  function createWebSocketURL(url) {
    if (typeof url === "function") {
      url = url();
    }
    if (url && !/^wss?:/i.test(url)) {
      const a = document.createElement("a");
      a.href = url;
      a.href = a.href;
      a.protocol = a.protocol.replace("http", "ws");
      return a.href;
    } else {
      return url;
    }
  }
  var Consumer;
  var init_consumer = __esm({
    "node_modules/@rails/actioncable/src/consumer.js"() {
      init_connection();
      init_subscriptions();
      Consumer = class {
        constructor(url) {
          this._url = url;
          this.subscriptions = new Subscriptions(this);
          this.connection = new connection_default(this);
        }
        get url() {
          return createWebSocketURL(this._url);
        }
        send(data2) {
          return this.connection.send(data2);
        }
        connect() {
          return this.connection.open();
        }
        disconnect() {
          return this.connection.close({ allowReconnect: false });
        }
        ensureActiveConnection() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        }
      };
    }
  });

  // node_modules/@rails/actioncable/src/index.js
  var src_exports = {};
  __export(src_exports, {
    Connection: () => connection_default,
    ConnectionMonitor: () => connection_monitor_default,
    Consumer: () => Consumer,
    INTERNAL: () => internal_default,
    Subscription: () => Subscription,
    SubscriptionGuarantor: () => subscription_guarantor_default,
    Subscriptions: () => Subscriptions,
    adapters: () => adapters_default,
    createConsumer: () => createConsumer,
    createWebSocketURL: () => createWebSocketURL,
    getConfig: () => getConfig,
    logger: () => logger_default
  });
  function createConsumer(url = getConfig("url") || internal_default.default_mount_path) {
    return new Consumer(url);
  }
  function getConfig(name2) {
    const element = document.head.querySelector(`meta[name='action-cable-${name2}']`);
    if (element) {
      return element.getAttribute("content");
    }
  }
  var init_src = __esm({
    "node_modules/@rails/actioncable/src/index.js"() {
      init_connection();
      init_connection_monitor();
      init_consumer();
      init_internal();
      init_subscription();
      init_subscriptions();
      init_subscription_guarantor();
      init_adapters();
      init_logger();
    }
  });

  // app/javascript/quotations.js
  var require_quotations = __commonJS({
    "app/javascript/quotations.js"(exports, module) {
      $("#quotation-search-form").bind("ajax:beforeSend", function(evt2, xhr2, settings2) {
        jQuery("#loading").toggle();
      }).bind("ajax:success", function(evt, data, status, xhr) {
        eval(xhr.responseText);
      }).bind("ajax:failure", function(evt2, data2, status2, xhr2) {
      });
    }
  });

  // node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js
  (function() {
    if (window.Reflect === void 0 || window.customElements === void 0 || window.customElements.polyfillWrapFlushCallback) {
      return;
    }
    const BuiltInHTMLElement = HTMLElement;
    const wrapperForTheName = {
      HTMLElement: function HTMLElement2() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
      }
    };
    window.HTMLElement = wrapperForTheName["HTMLElement"];
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  })();
  (function(prototype) {
    if (typeof prototype.requestSubmit == "function")
      return;
    prototype.requestSubmit = function(submitter) {
      if (submitter) {
        validateSubmitter(submitter, this);
        submitter.click();
      } else {
        submitter = document.createElement("input");
        submitter.type = "submit";
        submitter.hidden = true;
        this.appendChild(submitter);
        submitter.click();
        this.removeChild(submitter);
      }
    };
    function validateSubmitter(submitter, form) {
      submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
      submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
      submitter.form == form || raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
    }
    function raise(errorConstructor, message, name2) {
      throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name2);
    }
  })(HTMLFormElement.prototype);
  var submittersByForm = /* @__PURE__ */ new WeakMap();
  function findSubmitterFromClickTarget(target) {
    const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    const candidate = element ? element.closest("input, button") : null;
    return (candidate === null || candidate === void 0 ? void 0 : candidate.type) == "submit" ? candidate : null;
  }
  function clickCaptured(event) {
    const submitter = findSubmitterFromClickTarget(event.target);
    if (submitter && submitter.form) {
      submittersByForm.set(submitter.form, submitter);
    }
  }
  (function() {
    if ("submitter" in Event.prototype)
      return;
    let prototype = window.Event.prototype;
    if ("SubmitEvent" in window && /Apple Computer/.test(navigator.vendor)) {
      prototype = window.SubmitEvent.prototype;
    } else if ("SubmitEvent" in window) {
      return;
    }
    addEventListener("click", clickCaptured, true);
    Object.defineProperty(prototype, "submitter", {
      get() {
        if (this.type == "submit" && this.target instanceof HTMLFormElement) {
          return submittersByForm.get(this.target);
        }
      }
    });
  })();
  var FrameLoadingStyle;
  (function(FrameLoadingStyle2) {
    FrameLoadingStyle2["eager"] = "eager";
    FrameLoadingStyle2["lazy"] = "lazy";
  })(FrameLoadingStyle || (FrameLoadingStyle = {}));
  var FrameElement = class extends HTMLElement {
    static get observedAttributes() {
      return ["disabled", "complete", "loading", "src"];
    }
    constructor() {
      super();
      this.loaded = Promise.resolve();
      this.delegate = new FrameElement.delegateConstructor(this);
    }
    connectedCallback() {
      this.delegate.connect();
    }
    disconnectedCallback() {
      this.delegate.disconnect();
    }
    reload() {
      return this.delegate.sourceURLReloaded();
    }
    attributeChangedCallback(name2) {
      if (name2 == "loading") {
        this.delegate.loadingStyleChanged();
      } else if (name2 == "complete") {
        this.delegate.completeChanged();
      } else if (name2 == "src") {
        this.delegate.sourceURLChanged();
      } else {
        this.delegate.disabledChanged();
      }
    }
    get src() {
      return this.getAttribute("src");
    }
    set src(value) {
      if (value) {
        this.setAttribute("src", value);
      } else {
        this.removeAttribute("src");
      }
    }
    get loading() {
      return frameLoadingStyleFromString(this.getAttribute("loading") || "");
    }
    set loading(value) {
      if (value) {
        this.setAttribute("loading", value);
      } else {
        this.removeAttribute("loading");
      }
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
    get autoscroll() {
      return this.hasAttribute("autoscroll");
    }
    set autoscroll(value) {
      if (value) {
        this.setAttribute("autoscroll", "");
      } else {
        this.removeAttribute("autoscroll");
      }
    }
    get complete() {
      return !this.delegate.isLoading;
    }
    get isActive() {
      return this.ownerDocument === document && !this.isPreview;
    }
    get isPreview() {
      var _a, _b;
      return (_b = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.documentElement) === null || _b === void 0 ? void 0 : _b.hasAttribute("data-turbo-preview");
    }
  };
  function frameLoadingStyleFromString(style) {
    switch (style.toLowerCase()) {
      case "lazy":
        return FrameLoadingStyle.lazy;
      default:
        return FrameLoadingStyle.eager;
    }
  }
  function expandURL(locatable) {
    return new URL(locatable.toString(), document.baseURI);
  }
  function getAnchor(url) {
    let anchorMatch;
    if (url.hash) {
      return url.hash.slice(1);
    } else if (anchorMatch = url.href.match(/#(.*)$/)) {
      return anchorMatch[1];
    }
  }
  function getAction(form, submitter) {
    const action = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formaction")) || form.getAttribute("action") || form.action;
    return expandURL(action);
  }
  function getExtension(url) {
    return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || "";
  }
  function isHTML(url) {
    return !!getExtension(url).match(/^(?:|\.(?:htm|html|xhtml|php))$/);
  }
  function isPrefixedBy(baseURL, url) {
    const prefix = getPrefix(url);
    return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix);
  }
  function locationIsVisitable(location2, rootLocation) {
    return isPrefixedBy(location2, rootLocation) && isHTML(location2);
  }
  function getRequestURL(url) {
    const anchor = getAnchor(url);
    return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href;
  }
  function toCacheKey(url) {
    return getRequestURL(url);
  }
  function urlsAreEqual(left, right) {
    return expandURL(left).href == expandURL(right).href;
  }
  function getPathComponents(url) {
    return url.pathname.split("/").slice(1);
  }
  function getLastPathComponent(url) {
    return getPathComponents(url).slice(-1)[0];
  }
  function getPrefix(url) {
    return addTrailingSlash(url.origin + url.pathname);
  }
  function addTrailingSlash(value) {
    return value.endsWith("/") ? value : value + "/";
  }
  var FetchResponse = class {
    constructor(response) {
      this.response = response;
    }
    get succeeded() {
      return this.response.ok;
    }
    get failed() {
      return !this.succeeded;
    }
    get clientError() {
      return this.statusCode >= 400 && this.statusCode <= 499;
    }
    get serverError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
    get redirected() {
      return this.response.redirected;
    }
    get location() {
      return expandURL(this.response.url);
    }
    get isHTML() {
      return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/);
    }
    get statusCode() {
      return this.response.status;
    }
    get contentType() {
      return this.header("Content-Type");
    }
    get responseText() {
      return this.response.clone().text();
    }
    get responseHTML() {
      if (this.isHTML) {
        return this.response.clone().text();
      } else {
        return Promise.resolve(void 0);
      }
    }
    header(name2) {
      return this.response.headers.get(name2);
    }
  };
  function activateScriptElement(element) {
    if (element.getAttribute("data-turbo-eval") == "false") {
      return element;
    } else {
      const createdScriptElement = document.createElement("script");
      const cspNonce = getMetaContent("csp-nonce");
      if (cspNonce) {
        createdScriptElement.nonce = cspNonce;
      }
      createdScriptElement.textContent = element.textContent;
      createdScriptElement.async = false;
      copyElementAttributes(createdScriptElement, element);
      return createdScriptElement;
    }
  }
  function copyElementAttributes(destinationElement, sourceElement) {
    for (const { name: name2, value } of sourceElement.attributes) {
      destinationElement.setAttribute(name2, value);
    }
  }
  function createDocumentFragment(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }
  function dispatch(eventName, { target, cancelable, detail } = {}) {
    const event = new CustomEvent(eventName, {
      cancelable,
      bubbles: true,
      composed: true,
      detail
    });
    if (target && target.isConnected) {
      target.dispatchEvent(event);
    } else {
      document.documentElement.dispatchEvent(event);
    }
    return event;
  }
  function nextAnimationFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  function nextEventLoopTick() {
    return new Promise((resolve) => setTimeout(() => resolve(), 0));
  }
  function nextMicrotask() {
    return Promise.resolve();
  }
  function parseHTMLDocument(html = "") {
    return new DOMParser().parseFromString(html, "text/html");
  }
  function unindent(strings, ...values) {
    const lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
    const match = lines[0].match(/^\s+/);
    const indent = match ? match[0].length : 0;
    return lines.map((line) => line.slice(indent)).join("\n");
  }
  function interpolate(strings, values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] == void 0 ? "" : values[i];
      return result + string + value;
    }, "");
  }
  function uuid() {
    return Array.from({ length: 36 }).map((_, i) => {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        return "-";
      } else if (i == 14) {
        return "4";
      } else if (i == 19) {
        return (Math.floor(Math.random() * 4) + 8).toString(16);
      } else {
        return Math.floor(Math.random() * 15).toString(16);
      }
    }).join("");
  }
  function getAttribute(attributeName, ...elements) {
    for (const value of elements.map((element) => element === null || element === void 0 ? void 0 : element.getAttribute(attributeName))) {
      if (typeof value == "string")
        return value;
    }
    return null;
  }
  function hasAttribute(attributeName, ...elements) {
    return elements.some((element) => element && element.hasAttribute(attributeName));
  }
  function markAsBusy(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.setAttribute("busy", "");
      }
      element.setAttribute("aria-busy", "true");
    }
  }
  function clearBusyState(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.removeAttribute("busy");
      }
      element.removeAttribute("aria-busy");
    }
  }
  function waitForLoad(element, timeoutInMilliseconds = 2e3) {
    return new Promise((resolve) => {
      const onComplete = () => {
        element.removeEventListener("error", onComplete);
        element.removeEventListener("load", onComplete);
        resolve();
      };
      element.addEventListener("load", onComplete, { once: true });
      element.addEventListener("error", onComplete, { once: true });
      setTimeout(resolve, timeoutInMilliseconds);
    });
  }
  function getHistoryMethodForAction(action) {
    switch (action) {
      case "replace":
        return history.replaceState;
      case "advance":
      case "restore":
        return history.pushState;
    }
  }
  function isAction(action) {
    return action == "advance" || action == "replace" || action == "restore";
  }
  function getVisitAction(...elements) {
    const action = getAttribute("data-turbo-action", ...elements);
    return isAction(action) ? action : null;
  }
  function getMetaElement(name2) {
    return document.querySelector(`meta[name="${name2}"]`);
  }
  function getMetaContent(name2) {
    const element = getMetaElement(name2);
    return element && element.content;
  }
  function setMetaContent(name2, content) {
    let element = getMetaElement(name2);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name2);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
    return element;
  }
  function findClosestRecursively(element, selector) {
    var _a;
    if (element instanceof Element) {
      return element.closest(selector) || findClosestRecursively(element.assignedSlot || ((_a = element.getRootNode()) === null || _a === void 0 ? void 0 : _a.host), selector);
    }
  }
  var FetchMethod;
  (function(FetchMethod2) {
    FetchMethod2[FetchMethod2["get"] = 0] = "get";
    FetchMethod2[FetchMethod2["post"] = 1] = "post";
    FetchMethod2[FetchMethod2["put"] = 2] = "put";
    FetchMethod2[FetchMethod2["patch"] = 3] = "patch";
    FetchMethod2[FetchMethod2["delete"] = 4] = "delete";
  })(FetchMethod || (FetchMethod = {}));
  function fetchMethodFromString(method) {
    switch (method.toLowerCase()) {
      case "get":
        return FetchMethod.get;
      case "post":
        return FetchMethod.post;
      case "put":
        return FetchMethod.put;
      case "patch":
        return FetchMethod.patch;
      case "delete":
        return FetchMethod.delete;
    }
  }
  var FetchRequest = class {
    constructor(delegate, method, location2, body = new URLSearchParams(), target = null) {
      this.abortController = new AbortController();
      this.resolveRequestPromise = (_value) => {
      };
      this.delegate = delegate;
      this.method = method;
      this.headers = this.defaultHeaders;
      this.body = body;
      this.url = location2;
      this.target = target;
    }
    get location() {
      return this.url;
    }
    get params() {
      return this.url.searchParams;
    }
    get entries() {
      return this.body ? Array.from(this.body.entries()) : [];
    }
    cancel() {
      this.abortController.abort();
    }
    async perform() {
      const { fetchOptions } = this;
      this.delegate.prepareRequest(this);
      await this.allowRequestToBeIntercepted(fetchOptions);
      try {
        this.delegate.requestStarted(this);
        const response = await fetch(this.url.href, fetchOptions);
        return await this.receive(response);
      } catch (error2) {
        if (error2.name !== "AbortError") {
          if (this.willDelegateErrorHandling(error2)) {
            this.delegate.requestErrored(this, error2);
          }
          throw error2;
        }
      } finally {
        this.delegate.requestFinished(this);
      }
    }
    async receive(response) {
      const fetchResponse = new FetchResponse(response);
      const event = dispatch("turbo:before-fetch-response", {
        cancelable: true,
        detail: { fetchResponse },
        target: this.target
      });
      if (event.defaultPrevented) {
        this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
      } else if (fetchResponse.succeeded) {
        this.delegate.requestSucceededWithResponse(this, fetchResponse);
      } else {
        this.delegate.requestFailedWithResponse(this, fetchResponse);
      }
      return fetchResponse;
    }
    get fetchOptions() {
      var _a;
      return {
        method: FetchMethod[this.method].toUpperCase(),
        credentials: "same-origin",
        headers: this.headers,
        redirect: "follow",
        body: this.isSafe ? null : this.body,
        signal: this.abortSignal,
        referrer: (_a = this.delegate.referrer) === null || _a === void 0 ? void 0 : _a.href
      };
    }
    get defaultHeaders() {
      return {
        Accept: "text/html, application/xhtml+xml"
      };
    }
    get isSafe() {
      return this.method === FetchMethod.get;
    }
    get abortSignal() {
      return this.abortController.signal;
    }
    acceptResponseType(mimeType) {
      this.headers["Accept"] = [mimeType, this.headers["Accept"]].join(", ");
    }
    async allowRequestToBeIntercepted(fetchOptions) {
      const requestInterception = new Promise((resolve) => this.resolveRequestPromise = resolve);
      const event = dispatch("turbo:before-fetch-request", {
        cancelable: true,
        detail: {
          fetchOptions,
          url: this.url,
          resume: this.resolveRequestPromise
        },
        target: this.target
      });
      if (event.defaultPrevented)
        await requestInterception;
    }
    willDelegateErrorHandling(error2) {
      const event = dispatch("turbo:fetch-request-error", {
        target: this.target,
        cancelable: true,
        detail: { request: this, error: error2 }
      });
      return !event.defaultPrevented;
    }
  };
  var AppearanceObserver = class {
    constructor(delegate, element) {
      this.started = false;
      this.intersect = (entries) => {
        const lastEntry = entries.slice(-1)[0];
        if (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.isIntersecting) {
          this.delegate.elementAppearedInViewport(this.element);
        }
      };
      this.delegate = delegate;
      this.element = element;
      this.intersectionObserver = new IntersectionObserver(this.intersect);
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.intersectionObserver.observe(this.element);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.intersectionObserver.unobserve(this.element);
      }
    }
  };
  var StreamMessage = class {
    static wrap(message) {
      if (typeof message == "string") {
        return new this(createDocumentFragment(message));
      } else {
        return message;
      }
    }
    constructor(fragment) {
      this.fragment = importStreamElements(fragment);
    }
  };
  StreamMessage.contentType = "text/vnd.turbo-stream.html";
  function importStreamElements(fragment) {
    for (const element of fragment.querySelectorAll("turbo-stream")) {
      const streamElement = document.importNode(element, true);
      for (const inertScriptElement of streamElement.templateElement.content.querySelectorAll("script")) {
        inertScriptElement.replaceWith(activateScriptElement(inertScriptElement));
      }
      element.replaceWith(streamElement);
    }
    return fragment;
  }
  var FormSubmissionState;
  (function(FormSubmissionState2) {
    FormSubmissionState2[FormSubmissionState2["initialized"] = 0] = "initialized";
    FormSubmissionState2[FormSubmissionState2["requesting"] = 1] = "requesting";
    FormSubmissionState2[FormSubmissionState2["waiting"] = 2] = "waiting";
    FormSubmissionState2[FormSubmissionState2["receiving"] = 3] = "receiving";
    FormSubmissionState2[FormSubmissionState2["stopping"] = 4] = "stopping";
    FormSubmissionState2[FormSubmissionState2["stopped"] = 5] = "stopped";
  })(FormSubmissionState || (FormSubmissionState = {}));
  var FormEnctype;
  (function(FormEnctype2) {
    FormEnctype2["urlEncoded"] = "application/x-www-form-urlencoded";
    FormEnctype2["multipart"] = "multipart/form-data";
    FormEnctype2["plain"] = "text/plain";
  })(FormEnctype || (FormEnctype = {}));
  function formEnctypeFromString(encoding) {
    switch (encoding.toLowerCase()) {
      case FormEnctype.multipart:
        return FormEnctype.multipart;
      case FormEnctype.plain:
        return FormEnctype.plain;
      default:
        return FormEnctype.urlEncoded;
    }
  }
  var FormSubmission = class {
    static confirmMethod(message, _element, _submitter) {
      return Promise.resolve(confirm(message));
    }
    constructor(delegate, formElement, submitter, mustRedirect = false) {
      this.state = FormSubmissionState.initialized;
      this.delegate = delegate;
      this.formElement = formElement;
      this.submitter = submitter;
      this.formData = buildFormData(formElement, submitter);
      this.location = expandURL(this.action);
      if (this.method == FetchMethod.get) {
        mergeFormDataEntries(this.location, [...this.body.entries()]);
      }
      this.fetchRequest = new FetchRequest(this, this.method, this.location, this.body, this.formElement);
      this.mustRedirect = mustRedirect;
    }
    get method() {
      var _a;
      const method = ((_a = this.submitter) === null || _a === void 0 ? void 0 : _a.getAttribute("formmethod")) || this.formElement.getAttribute("method") || "";
      return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get;
    }
    get action() {
      var _a;
      const formElementAction = typeof this.formElement.action === "string" ? this.formElement.action : null;
      if ((_a = this.submitter) === null || _a === void 0 ? void 0 : _a.hasAttribute("formaction")) {
        return this.submitter.getAttribute("formaction") || "";
      } else {
        return this.formElement.getAttribute("action") || formElementAction || "";
      }
    }
    get body() {
      if (this.enctype == FormEnctype.urlEncoded || this.method == FetchMethod.get) {
        return new URLSearchParams(this.stringFormData);
      } else {
        return this.formData;
      }
    }
    get enctype() {
      var _a;
      return formEnctypeFromString(((_a = this.submitter) === null || _a === void 0 ? void 0 : _a.getAttribute("formenctype")) || this.formElement.enctype);
    }
    get isSafe() {
      return this.fetchRequest.isSafe;
    }
    get stringFormData() {
      return [...this.formData].reduce((entries, [name2, value]) => {
        return entries.concat(typeof value == "string" ? [[name2, value]] : []);
      }, []);
    }
    async start() {
      const { initialized, requesting } = FormSubmissionState;
      const confirmationMessage = getAttribute("data-turbo-confirm", this.submitter, this.formElement);
      if (typeof confirmationMessage === "string") {
        const answer = await FormSubmission.confirmMethod(confirmationMessage, this.formElement, this.submitter);
        if (!answer) {
          return;
        }
      }
      if (this.state == initialized) {
        this.state = requesting;
        return this.fetchRequest.perform();
      }
    }
    stop() {
      const { stopping, stopped } = FormSubmissionState;
      if (this.state != stopping && this.state != stopped) {
        this.state = stopping;
        this.fetchRequest.cancel();
        return true;
      }
    }
    prepareRequest(request) {
      if (!request.isSafe) {
        const token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
        if (token) {
          request.headers["X-CSRF-Token"] = token;
        }
      }
      if (this.requestAcceptsTurboStreamResponse(request)) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }
    requestStarted(_request) {
      var _a;
      this.state = FormSubmissionState.waiting;
      (_a = this.submitter) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
      this.setSubmitsWith();
      dispatch("turbo:submit-start", {
        target: this.formElement,
        detail: { formSubmission: this }
      });
      this.delegate.formSubmissionStarted(this);
    }
    requestPreventedHandlingResponse(request, response) {
      this.result = { success: response.succeeded, fetchResponse: response };
    }
    requestSucceededWithResponse(request, response) {
      if (response.clientError || response.serverError) {
        this.delegate.formSubmissionFailedWithResponse(this, response);
      } else if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
        const error2 = new Error("Form responses must redirect to another location");
        this.delegate.formSubmissionErrored(this, error2);
      } else {
        this.state = FormSubmissionState.receiving;
        this.result = { success: true, fetchResponse: response };
        this.delegate.formSubmissionSucceededWithResponse(this, response);
      }
    }
    requestFailedWithResponse(request, response) {
      this.result = { success: false, fetchResponse: response };
      this.delegate.formSubmissionFailedWithResponse(this, response);
    }
    requestErrored(request, error2) {
      this.result = { success: false, error: error2 };
      this.delegate.formSubmissionErrored(this, error2);
    }
    requestFinished(_request) {
      var _a;
      this.state = FormSubmissionState.stopped;
      (_a = this.submitter) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
      this.resetSubmitterText();
      dispatch("turbo:submit-end", {
        target: this.formElement,
        detail: Object.assign({ formSubmission: this }, this.result)
      });
      this.delegate.formSubmissionFinished(this);
    }
    setSubmitsWith() {
      if (!this.submitter || !this.submitsWith)
        return;
      if (this.submitter.matches("button")) {
        this.originalSubmitText = this.submitter.innerHTML;
        this.submitter.innerHTML = this.submitsWith;
      } else if (this.submitter.matches("input")) {
        const input = this.submitter;
        this.originalSubmitText = input.value;
        input.value = this.submitsWith;
      }
    }
    resetSubmitterText() {
      if (!this.submitter || !this.originalSubmitText)
        return;
      if (this.submitter.matches("button")) {
        this.submitter.innerHTML = this.originalSubmitText;
      } else if (this.submitter.matches("input")) {
        const input = this.submitter;
        input.value = this.originalSubmitText;
      }
    }
    requestMustRedirect(request) {
      return !request.isSafe && this.mustRedirect;
    }
    requestAcceptsTurboStreamResponse(request) {
      return !request.isSafe || hasAttribute("data-turbo-stream", this.submitter, this.formElement);
    }
    get submitsWith() {
      var _a;
      return (_a = this.submitter) === null || _a === void 0 ? void 0 : _a.getAttribute("data-turbo-submits-with");
    }
  };
  function buildFormData(formElement, submitter) {
    const formData = new FormData(formElement);
    const name2 = submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("name");
    const value = submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("value");
    if (name2) {
      formData.append(name2, value || "");
    }
    return formData;
  }
  function getCookieValue(cookieName) {
    if (cookieName != null) {
      const cookies = document.cookie ? document.cookie.split("; ") : [];
      const cookie = cookies.find((cookie2) => cookie2.startsWith(cookieName));
      if (cookie) {
        const value = cookie.split("=").slice(1).join("=");
        return value ? decodeURIComponent(value) : void 0;
      }
    }
  }
  function responseSucceededWithoutRedirect(response) {
    return response.statusCode == 200 && !response.redirected;
  }
  function mergeFormDataEntries(url, entries) {
    const searchParams = new URLSearchParams();
    for (const [name2, value] of entries) {
      if (value instanceof File)
        continue;
      searchParams.append(name2, value);
    }
    url.search = searchParams.toString();
    return url;
  }
  var Snapshot = class {
    constructor(element) {
      this.element = element;
    }
    get activeElement() {
      return this.element.ownerDocument.activeElement;
    }
    get children() {
      return [...this.element.children];
    }
    hasAnchor(anchor) {
      return this.getElementForAnchor(anchor) != null;
    }
    getElementForAnchor(anchor) {
      return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null;
    }
    get isConnected() {
      return this.element.isConnected;
    }
    get firstAutofocusableElement() {
      const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";
      for (const element of this.element.querySelectorAll("[autofocus]")) {
        if (element.closest(inertDisabledOrHidden) == null)
          return element;
        else
          continue;
      }
      return null;
    }
    get permanentElements() {
      return queryPermanentElementsAll(this.element);
    }
    getPermanentElementById(id) {
      return getPermanentElementById(this.element, id);
    }
    getPermanentElementMapForSnapshot(snapshot) {
      const permanentElementMap = {};
      for (const currentPermanentElement of this.permanentElements) {
        const { id } = currentPermanentElement;
        const newPermanentElement = snapshot.getPermanentElementById(id);
        if (newPermanentElement) {
          permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
        }
      }
      return permanentElementMap;
    }
  };
  function getPermanentElementById(node, id) {
    return node.querySelector(`#${id}[data-turbo-permanent]`);
  }
  function queryPermanentElementsAll(node) {
    return node.querySelectorAll("[id][data-turbo-permanent]");
  }
  var FormSubmitObserver = class {
    constructor(delegate, eventTarget) {
      this.started = false;
      this.submitCaptured = () => {
        this.eventTarget.removeEventListener("submit", this.submitBubbled, false);
        this.eventTarget.addEventListener("submit", this.submitBubbled, false);
      };
      this.submitBubbled = (event) => {
        if (!event.defaultPrevented) {
          const form = event.target instanceof HTMLFormElement ? event.target : void 0;
          const submitter = event.submitter || void 0;
          if (form && submissionDoesNotDismissDialog(form, submitter) && submissionDoesNotTargetIFrame(form, submitter) && this.delegate.willSubmitForm(form, submitter)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.delegate.formSubmitted(form, submitter);
          }
        }
      };
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    start() {
      if (!this.started) {
        this.eventTarget.addEventListener("submit", this.submitCaptured, true);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.eventTarget.removeEventListener("submit", this.submitCaptured, true);
        this.started = false;
      }
    }
  };
  function submissionDoesNotDismissDialog(form, submitter) {
    const method = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formmethod")) || form.getAttribute("method");
    return method != "dialog";
  }
  function submissionDoesNotTargetIFrame(form, submitter) {
    if ((submitter === null || submitter === void 0 ? void 0 : submitter.hasAttribute("formtarget")) || form.hasAttribute("target")) {
      const target = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formtarget")) || form.target;
      for (const element of document.getElementsByName(target)) {
        if (element instanceof HTMLIFrameElement)
          return false;
      }
      return true;
    } else {
      return true;
    }
  }
  var View = class {
    constructor(delegate, element) {
      this.resolveRenderPromise = (_value) => {
      };
      this.resolveInterceptionPromise = (_value) => {
      };
      this.delegate = delegate;
      this.element = element;
    }
    scrollToAnchor(anchor) {
      const element = this.snapshot.getElementForAnchor(anchor);
      if (element) {
        this.scrollToElement(element);
        this.focusElement(element);
      } else {
        this.scrollToPosition({ x: 0, y: 0 });
      }
    }
    scrollToAnchorFromLocation(location2) {
      this.scrollToAnchor(getAnchor(location2));
    }
    scrollToElement(element) {
      element.scrollIntoView();
    }
    focusElement(element) {
      if (element instanceof HTMLElement) {
        if (element.hasAttribute("tabindex")) {
          element.focus();
        } else {
          element.setAttribute("tabindex", "-1");
          element.focus();
          element.removeAttribute("tabindex");
        }
      }
    }
    scrollToPosition({ x, y }) {
      this.scrollRoot.scrollTo(x, y);
    }
    scrollToTop() {
      this.scrollToPosition({ x: 0, y: 0 });
    }
    get scrollRoot() {
      return window;
    }
    async render(renderer) {
      const { isPreview, shouldRender, newSnapshot: snapshot } = renderer;
      if (shouldRender) {
        try {
          this.renderPromise = new Promise((resolve) => this.resolveRenderPromise = resolve);
          this.renderer = renderer;
          await this.prepareToRenderSnapshot(renderer);
          const renderInterception = new Promise((resolve) => this.resolveInterceptionPromise = resolve);
          const options = { resume: this.resolveInterceptionPromise, render: this.renderer.renderElement };
          const immediateRender = this.delegate.allowsImmediateRender(snapshot, options);
          if (!immediateRender)
            await renderInterception;
          await this.renderSnapshot(renderer);
          this.delegate.viewRenderedSnapshot(snapshot, isPreview);
          this.delegate.preloadOnLoadLinksForView(this.element);
          this.finishRenderingSnapshot(renderer);
        } finally {
          delete this.renderer;
          this.resolveRenderPromise(void 0);
          delete this.renderPromise;
        }
      } else {
        this.invalidate(renderer.reloadReason);
      }
    }
    invalidate(reason) {
      this.delegate.viewInvalidated(reason);
    }
    async prepareToRenderSnapshot(renderer) {
      this.markAsPreview(renderer.isPreview);
      await renderer.prepareToRender();
    }
    markAsPreview(isPreview) {
      if (isPreview) {
        this.element.setAttribute("data-turbo-preview", "");
      } else {
        this.element.removeAttribute("data-turbo-preview");
      }
    }
    async renderSnapshot(renderer) {
      await renderer.render();
    }
    finishRenderingSnapshot(renderer) {
      renderer.finishRendering();
    }
  };
  var FrameView = class extends View {
    missing() {
      this.element.innerHTML = `<strong class="turbo-frame-error">Content missing</strong>`;
    }
    get snapshot() {
      return new Snapshot(this.element);
    }
  };
  var LinkInterceptor = class {
    constructor(delegate, element) {
      this.clickBubbled = (event) => {
        if (this.respondsToEventTarget(event.target)) {
          this.clickEvent = event;
        } else {
          delete this.clickEvent;
        }
      };
      this.linkClicked = (event) => {
        if (this.clickEvent && this.respondsToEventTarget(event.target) && event.target instanceof Element) {
          if (this.delegate.shouldInterceptLinkClick(event.target, event.detail.url, event.detail.originalEvent)) {
            this.clickEvent.preventDefault();
            event.preventDefault();
            this.delegate.linkClickIntercepted(event.target, event.detail.url, event.detail.originalEvent);
          }
        }
        delete this.clickEvent;
      };
      this.willVisit = (_event) => {
        delete this.clickEvent;
      };
      this.delegate = delegate;
      this.element = element;
    }
    start() {
      this.element.addEventListener("click", this.clickBubbled);
      document.addEventListener("turbo:click", this.linkClicked);
      document.addEventListener("turbo:before-visit", this.willVisit);
    }
    stop() {
      this.element.removeEventListener("click", this.clickBubbled);
      document.removeEventListener("turbo:click", this.linkClicked);
      document.removeEventListener("turbo:before-visit", this.willVisit);
    }
    respondsToEventTarget(target) {
      const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
      return element && element.closest("turbo-frame, html") == this.element;
    }
  };
  var LinkClickObserver = class {
    constructor(delegate, eventTarget) {
      this.started = false;
      this.clickCaptured = () => {
        this.eventTarget.removeEventListener("click", this.clickBubbled, false);
        this.eventTarget.addEventListener("click", this.clickBubbled, false);
      };
      this.clickBubbled = (event) => {
        if (event instanceof MouseEvent && this.clickEventIsSignificant(event)) {
          const target = event.composedPath && event.composedPath()[0] || event.target;
          const link = this.findLinkFromClickTarget(target);
          if (link && doesNotTargetIFrame(link)) {
            const location2 = this.getLocationForLink(link);
            if (this.delegate.willFollowLinkToLocation(link, location2, event)) {
              event.preventDefault();
              this.delegate.followedLinkToLocation(link, location2);
            }
          }
        }
      };
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    start() {
      if (!this.started) {
        this.eventTarget.addEventListener("click", this.clickCaptured, true);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.eventTarget.removeEventListener("click", this.clickCaptured, true);
        this.started = false;
      }
    }
    clickEventIsSignificant(event) {
      return !(event.target && event.target.isContentEditable || event.defaultPrevented || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    }
    findLinkFromClickTarget(target) {
      return findClosestRecursively(target, "a[href]:not([target^=_]):not([download])");
    }
    getLocationForLink(link) {
      return expandURL(link.getAttribute("href") || "");
    }
  };
  function doesNotTargetIFrame(anchor) {
    if (anchor.hasAttribute("target")) {
      for (const element of document.getElementsByName(anchor.target)) {
        if (element instanceof HTMLIFrameElement)
          return false;
      }
      return true;
    } else {
      return true;
    }
  }
  var FormLinkClickObserver = class {
    constructor(delegate, element) {
      this.delegate = delegate;
      this.linkInterceptor = new LinkClickObserver(this, element);
    }
    start() {
      this.linkInterceptor.start();
    }
    stop() {
      this.linkInterceptor.stop();
    }
    willFollowLinkToLocation(link, location2, originalEvent) {
      return this.delegate.willSubmitFormLinkToLocation(link, location2, originalEvent) && link.hasAttribute("data-turbo-method");
    }
    followedLinkToLocation(link, location2) {
      const form = document.createElement("form");
      const type = "hidden";
      for (const [name2, value] of location2.searchParams) {
        form.append(Object.assign(document.createElement("input"), { type, name: name2, value }));
      }
      const action = Object.assign(location2, { search: "" });
      form.setAttribute("data-turbo", "true");
      form.setAttribute("action", action.href);
      form.setAttribute("hidden", "");
      const method = link.getAttribute("data-turbo-method");
      if (method)
        form.setAttribute("method", method);
      const turboFrame = link.getAttribute("data-turbo-frame");
      if (turboFrame)
        form.setAttribute("data-turbo-frame", turboFrame);
      const turboAction = getVisitAction(link);
      if (turboAction)
        form.setAttribute("data-turbo-action", turboAction);
      const turboConfirm = link.getAttribute("data-turbo-confirm");
      if (turboConfirm)
        form.setAttribute("data-turbo-confirm", turboConfirm);
      const turboStream = link.hasAttribute("data-turbo-stream");
      if (turboStream)
        form.setAttribute("data-turbo-stream", "");
      this.delegate.submittedFormLinkToLocation(link, location2, form);
      document.body.appendChild(form);
      form.addEventListener("turbo:submit-end", () => form.remove(), { once: true });
      requestAnimationFrame(() => form.requestSubmit());
    }
  };
  var Bardo = class {
    static async preservingPermanentElements(delegate, permanentElementMap, callback) {
      const bardo = new this(delegate, permanentElementMap);
      bardo.enter();
      await callback();
      bardo.leave();
    }
    constructor(delegate, permanentElementMap) {
      this.delegate = delegate;
      this.permanentElementMap = permanentElementMap;
    }
    enter() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement, newPermanentElement] = this.permanentElementMap[id];
        this.delegate.enteringBardo(currentPermanentElement, newPermanentElement);
        this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
      }
    }
    leave() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement] = this.permanentElementMap[id];
        this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
        this.replacePlaceholderWithPermanentElement(currentPermanentElement);
        this.delegate.leavingBardo(currentPermanentElement);
      }
    }
    replaceNewPermanentElementWithPlaceholder(permanentElement) {
      const placeholder = createPlaceholderForPermanentElement(permanentElement);
      permanentElement.replaceWith(placeholder);
    }
    replaceCurrentPermanentElementWithClone(permanentElement) {
      const clone = permanentElement.cloneNode(true);
      permanentElement.replaceWith(clone);
    }
    replacePlaceholderWithPermanentElement(permanentElement) {
      const placeholder = this.getPlaceholderById(permanentElement.id);
      placeholder === null || placeholder === void 0 ? void 0 : placeholder.replaceWith(permanentElement);
    }
    getPlaceholderById(id) {
      return this.placeholders.find((element) => element.content == id);
    }
    get placeholders() {
      return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")];
    }
  };
  function createPlaceholderForPermanentElement(permanentElement) {
    const element = document.createElement("meta");
    element.setAttribute("name", "turbo-permanent-placeholder");
    element.setAttribute("content", permanentElement.id);
    return element;
  }
  var Renderer = class {
    constructor(currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
      this.activeElement = null;
      this.currentSnapshot = currentSnapshot;
      this.newSnapshot = newSnapshot;
      this.isPreview = isPreview;
      this.willRender = willRender;
      this.renderElement = renderElement;
      this.promise = new Promise((resolve, reject) => this.resolvingFunctions = { resolve, reject });
    }
    get shouldRender() {
      return true;
    }
    get reloadReason() {
      return;
    }
    prepareToRender() {
      return;
    }
    finishRendering() {
      if (this.resolvingFunctions) {
        this.resolvingFunctions.resolve();
        delete this.resolvingFunctions;
      }
    }
    async preservingPermanentElements(callback) {
      await Bardo.preservingPermanentElements(this, this.permanentElementMap, callback);
    }
    focusFirstAutofocusableElement() {
      const element = this.connectedSnapshot.firstAutofocusableElement;
      if (elementIsFocusable(element)) {
        element.focus();
      }
    }
    enteringBardo(currentPermanentElement) {
      if (this.activeElement)
        return;
      if (currentPermanentElement.contains(this.currentSnapshot.activeElement)) {
        this.activeElement = this.currentSnapshot.activeElement;
      }
    }
    leavingBardo(currentPermanentElement) {
      if (currentPermanentElement.contains(this.activeElement) && this.activeElement instanceof HTMLElement) {
        this.activeElement.focus();
        this.activeElement = null;
      }
    }
    get connectedSnapshot() {
      return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot;
    }
    get currentElement() {
      return this.currentSnapshot.element;
    }
    get newElement() {
      return this.newSnapshot.element;
    }
    get permanentElementMap() {
      return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot);
    }
  };
  function elementIsFocusable(element) {
    return element && typeof element.focus == "function";
  }
  var FrameRenderer = class extends Renderer {
    static renderElement(currentElement, newElement) {
      var _a;
      const destinationRange = document.createRange();
      destinationRange.selectNodeContents(currentElement);
      destinationRange.deleteContents();
      const frameElement = newElement;
      const sourceRange = (_a = frameElement.ownerDocument) === null || _a === void 0 ? void 0 : _a.createRange();
      if (sourceRange) {
        sourceRange.selectNodeContents(frameElement);
        currentElement.appendChild(sourceRange.extractContents());
      }
    }
    constructor(delegate, currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
      super(currentSnapshot, newSnapshot, renderElement, isPreview, willRender);
      this.delegate = delegate;
    }
    get shouldRender() {
      return true;
    }
    async render() {
      await nextAnimationFrame();
      this.preservingPermanentElements(() => {
        this.loadFrameElement();
      });
      this.scrollFrameIntoView();
      await nextAnimationFrame();
      this.focusFirstAutofocusableElement();
      await nextAnimationFrame();
      this.activateScriptElements();
    }
    loadFrameElement() {
      this.delegate.willRenderFrame(this.currentElement, this.newElement);
      this.renderElement(this.currentElement, this.newElement);
    }
    scrollFrameIntoView() {
      if (this.currentElement.autoscroll || this.newElement.autoscroll) {
        const element = this.currentElement.firstElementChild;
        const block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
        const behavior = readScrollBehavior(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
        if (element) {
          element.scrollIntoView({ block, behavior });
          return true;
        }
      }
      return false;
    }
    activateScriptElements() {
      for (const inertScriptElement of this.newScriptElements) {
        const activatedScriptElement = activateScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }
    get newScriptElements() {
      return this.currentElement.querySelectorAll("script");
    }
  };
  function readScrollLogicalPosition(value, defaultValue) {
    if (value == "end" || value == "start" || value == "center" || value == "nearest") {
      return value;
    } else {
      return defaultValue;
    }
  }
  function readScrollBehavior(value, defaultValue) {
    if (value == "auto" || value == "smooth") {
      return value;
    } else {
      return defaultValue;
    }
  }
  var ProgressBar = class {
    static get defaultCSS() {
      return unindent`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${ProgressBar.animationDuration}ms ease-out,
          opacity ${ProgressBar.animationDuration / 2}ms ${ProgressBar.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `;
    }
    constructor() {
      this.hiding = false;
      this.value = 0;
      this.visible = false;
      this.trickle = () => {
        this.setValue(this.value + Math.random() / 100);
      };
      this.stylesheetElement = this.createStylesheetElement();
      this.progressElement = this.createProgressElement();
      this.installStylesheetElement();
      this.setValue(0);
    }
    show() {
      if (!this.visible) {
        this.visible = true;
        this.installProgressElement();
        this.startTrickling();
      }
    }
    hide() {
      if (this.visible && !this.hiding) {
        this.hiding = true;
        this.fadeProgressElement(() => {
          this.uninstallProgressElement();
          this.stopTrickling();
          this.visible = false;
          this.hiding = false;
        });
      }
    }
    setValue(value) {
      this.value = value;
      this.refresh();
    }
    installStylesheetElement() {
      document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
    }
    installProgressElement() {
      this.progressElement.style.width = "0";
      this.progressElement.style.opacity = "1";
      document.documentElement.insertBefore(this.progressElement, document.body);
      this.refresh();
    }
    fadeProgressElement(callback) {
      this.progressElement.style.opacity = "0";
      setTimeout(callback, ProgressBar.animationDuration * 1.5);
    }
    uninstallProgressElement() {
      if (this.progressElement.parentNode) {
        document.documentElement.removeChild(this.progressElement);
      }
    }
    startTrickling() {
      if (!this.trickleInterval) {
        this.trickleInterval = window.setInterval(this.trickle, ProgressBar.animationDuration);
      }
    }
    stopTrickling() {
      window.clearInterval(this.trickleInterval);
      delete this.trickleInterval;
    }
    refresh() {
      requestAnimationFrame(() => {
        this.progressElement.style.width = `${10 + this.value * 90}%`;
      });
    }
    createStylesheetElement() {
      const element = document.createElement("style");
      element.type = "text/css";
      element.textContent = ProgressBar.defaultCSS;
      if (this.cspNonce) {
        element.nonce = this.cspNonce;
      }
      return element;
    }
    createProgressElement() {
      const element = document.createElement("div");
      element.className = "turbo-progress-bar";
      return element;
    }
    get cspNonce() {
      return getMetaContent("csp-nonce");
    }
  };
  ProgressBar.animationDuration = 300;
  var HeadSnapshot = class extends Snapshot {
    constructor() {
      super(...arguments);
      this.detailsByOuterHTML = this.children.filter((element) => !elementIsNoscript(element)).map((element) => elementWithoutNonce(element)).reduce((result, element) => {
        const { outerHTML } = element;
        const details = outerHTML in result ? result[outerHTML] : {
          type: elementType(element),
          tracked: elementIsTracked(element),
          elements: []
        };
        return Object.assign(Object.assign({}, result), { [outerHTML]: Object.assign(Object.assign({}, details), { elements: [...details.elements, element] }) });
      }, {});
    }
    get trackedElementSignature() {
      return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => this.detailsByOuterHTML[outerHTML].tracked).join("");
    }
    getScriptElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("script", snapshot);
    }
    getStylesheetElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot);
    }
    getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
      return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => !(outerHTML in snapshot.detailsByOuterHTML)).map((outerHTML) => this.detailsByOuterHTML[outerHTML]).filter(({ type }) => type == matchedType).map(({ elements: [element] }) => element);
    }
    get provisionalElements() {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const { type, tracked, elements } = this.detailsByOuterHTML[outerHTML];
        if (type == null && !tracked) {
          return [...result, ...elements];
        } else if (elements.length > 1) {
          return [...result, ...elements.slice(1)];
        } else {
          return result;
        }
      }, []);
    }
    getMetaValue(name2) {
      const element = this.findMetaElementByName(name2);
      return element ? element.getAttribute("content") : null;
    }
    findMetaElementByName(name2) {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const { elements: [element] } = this.detailsByOuterHTML[outerHTML];
        return elementIsMetaElementWithName(element, name2) ? element : result;
      }, void 0);
    }
  };
  function elementType(element) {
    if (elementIsScript(element)) {
      return "script";
    } else if (elementIsStylesheet(element)) {
      return "stylesheet";
    }
  }
  function elementIsTracked(element) {
    return element.getAttribute("data-turbo-track") == "reload";
  }
  function elementIsScript(element) {
    const tagName = element.localName;
    return tagName == "script";
  }
  function elementIsNoscript(element) {
    const tagName = element.localName;
    return tagName == "noscript";
  }
  function elementIsStylesheet(element) {
    const tagName = element.localName;
    return tagName == "style" || tagName == "link" && element.getAttribute("rel") == "stylesheet";
  }
  function elementIsMetaElementWithName(element, name2) {
    const tagName = element.localName;
    return tagName == "meta" && element.getAttribute("name") == name2;
  }
  function elementWithoutNonce(element) {
    if (element.hasAttribute("nonce")) {
      element.setAttribute("nonce", "");
    }
    return element;
  }
  var PageSnapshot = class extends Snapshot {
    static fromHTMLString(html = "") {
      return this.fromDocument(parseHTMLDocument(html));
    }
    static fromElement(element) {
      return this.fromDocument(element.ownerDocument);
    }
    static fromDocument({ head, body }) {
      return new this(body, new HeadSnapshot(head));
    }
    constructor(element, headSnapshot) {
      super(element);
      this.headSnapshot = headSnapshot;
    }
    clone() {
      const clonedElement = this.element.cloneNode(true);
      const selectElements = this.element.querySelectorAll("select");
      const clonedSelectElements = clonedElement.querySelectorAll("select");
      for (const [index, source] of selectElements.entries()) {
        const clone = clonedSelectElements[index];
        for (const option of clone.selectedOptions)
          option.selected = false;
        for (const option of source.selectedOptions)
          clone.options[option.index].selected = true;
      }
      for (const clonedPasswordInput of clonedElement.querySelectorAll('input[type="password"]')) {
        clonedPasswordInput.value = "";
      }
      return new PageSnapshot(clonedElement, this.headSnapshot);
    }
    get headElement() {
      return this.headSnapshot.element;
    }
    get rootLocation() {
      var _a;
      const root = (_a = this.getSetting("root")) !== null && _a !== void 0 ? _a : "/";
      return expandURL(root);
    }
    get cacheControlValue() {
      return this.getSetting("cache-control");
    }
    get isPreviewable() {
      return this.cacheControlValue != "no-preview";
    }
    get isCacheable() {
      return this.cacheControlValue != "no-cache";
    }
    get isVisitable() {
      return this.getSetting("visit-control") != "reload";
    }
    getSetting(name2) {
      return this.headSnapshot.getMetaValue(`turbo-${name2}`);
    }
  };
  var TimingMetric;
  (function(TimingMetric2) {
    TimingMetric2["visitStart"] = "visitStart";
    TimingMetric2["requestStart"] = "requestStart";
    TimingMetric2["requestEnd"] = "requestEnd";
    TimingMetric2["visitEnd"] = "visitEnd";
  })(TimingMetric || (TimingMetric = {}));
  var VisitState;
  (function(VisitState2) {
    VisitState2["initialized"] = "initialized";
    VisitState2["started"] = "started";
    VisitState2["canceled"] = "canceled";
    VisitState2["failed"] = "failed";
    VisitState2["completed"] = "completed";
  })(VisitState || (VisitState = {}));
  var defaultOptions = {
    action: "advance",
    historyChanged: false,
    visitCachedSnapshot: () => {
    },
    willRender: true,
    updateHistory: true,
    shouldCacheSnapshot: true,
    acceptsStreamResponse: false
  };
  var SystemStatusCode;
  (function(SystemStatusCode2) {
    SystemStatusCode2[SystemStatusCode2["networkFailure"] = 0] = "networkFailure";
    SystemStatusCode2[SystemStatusCode2["timeoutFailure"] = -1] = "timeoutFailure";
    SystemStatusCode2[SystemStatusCode2["contentTypeMismatch"] = -2] = "contentTypeMismatch";
  })(SystemStatusCode || (SystemStatusCode = {}));
  var Visit = class {
    constructor(delegate, location2, restorationIdentifier, options = {}) {
      this.identifier = uuid();
      this.timingMetrics = {};
      this.followedRedirect = false;
      this.historyChanged = false;
      this.scrolled = false;
      this.shouldCacheSnapshot = true;
      this.acceptsStreamResponse = false;
      this.snapshotCached = false;
      this.state = VisitState.initialized;
      this.delegate = delegate;
      this.location = location2;
      this.restorationIdentifier = restorationIdentifier || uuid();
      const { action, historyChanged, referrer, snapshot, snapshotHTML, response, visitCachedSnapshot, willRender, updateHistory, shouldCacheSnapshot, acceptsStreamResponse } = Object.assign(Object.assign({}, defaultOptions), options);
      this.action = action;
      this.historyChanged = historyChanged;
      this.referrer = referrer;
      this.snapshot = snapshot;
      this.snapshotHTML = snapshotHTML;
      this.response = response;
      this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
      this.visitCachedSnapshot = visitCachedSnapshot;
      this.willRender = willRender;
      this.updateHistory = updateHistory;
      this.scrolled = !willRender;
      this.shouldCacheSnapshot = shouldCacheSnapshot;
      this.acceptsStreamResponse = acceptsStreamResponse;
    }
    get adapter() {
      return this.delegate.adapter;
    }
    get view() {
      return this.delegate.view;
    }
    get history() {
      return this.delegate.history;
    }
    get restorationData() {
      return this.history.getRestorationDataForIdentifier(this.restorationIdentifier);
    }
    get silent() {
      return this.isSamePage;
    }
    start() {
      if (this.state == VisitState.initialized) {
        this.recordTimingMetric(TimingMetric.visitStart);
        this.state = VisitState.started;
        this.adapter.visitStarted(this);
        this.delegate.visitStarted(this);
      }
    }
    cancel() {
      if (this.state == VisitState.started) {
        if (this.request) {
          this.request.cancel();
        }
        this.cancelRender();
        this.state = VisitState.canceled;
      }
    }
    complete() {
      if (this.state == VisitState.started) {
        this.recordTimingMetric(TimingMetric.visitEnd);
        this.state = VisitState.completed;
        this.followRedirect();
        if (!this.followedRedirect) {
          this.adapter.visitCompleted(this);
          this.delegate.visitCompleted(this);
        }
      }
    }
    fail() {
      if (this.state == VisitState.started) {
        this.state = VisitState.failed;
        this.adapter.visitFailed(this);
      }
    }
    changeHistory() {
      var _a;
      if (!this.historyChanged && this.updateHistory) {
        const actionForHistory = this.location.href === ((_a = this.referrer) === null || _a === void 0 ? void 0 : _a.href) ? "replace" : this.action;
        const method = getHistoryMethodForAction(actionForHistory);
        this.history.update(method, this.location, this.restorationIdentifier);
        this.historyChanged = true;
      }
    }
    issueRequest() {
      if (this.hasPreloadedResponse()) {
        this.simulateRequest();
      } else if (this.shouldIssueRequest() && !this.request) {
        this.request = new FetchRequest(this, FetchMethod.get, this.location);
        this.request.perform();
      }
    }
    simulateRequest() {
      if (this.response) {
        this.startRequest();
        this.recordResponse();
        this.finishRequest();
      }
    }
    startRequest() {
      this.recordTimingMetric(TimingMetric.requestStart);
      this.adapter.visitRequestStarted(this);
    }
    recordResponse(response = this.response) {
      this.response = response;
      if (response) {
        const { statusCode } = response;
        if (isSuccessful(statusCode)) {
          this.adapter.visitRequestCompleted(this);
        } else {
          this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
        }
      }
    }
    finishRequest() {
      this.recordTimingMetric(TimingMetric.requestEnd);
      this.adapter.visitRequestFinished(this);
    }
    loadResponse() {
      if (this.response) {
        const { statusCode, responseHTML } = this.response;
        this.render(async () => {
          if (this.shouldCacheSnapshot)
            this.cacheSnapshot();
          if (this.view.renderPromise)
            await this.view.renderPromise;
          if (isSuccessful(statusCode) && responseHTML != null) {
            await this.view.renderPage(PageSnapshot.fromHTMLString(responseHTML), false, this.willRender, this);
            this.performScroll();
            this.adapter.visitRendered(this);
            this.complete();
          } else {
            await this.view.renderError(PageSnapshot.fromHTMLString(responseHTML), this);
            this.adapter.visitRendered(this);
            this.fail();
          }
        });
      }
    }
    getCachedSnapshot() {
      const snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
      if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
        if (this.action == "restore" || snapshot.isPreviewable) {
          return snapshot;
        }
      }
    }
    getPreloadedSnapshot() {
      if (this.snapshotHTML) {
        return PageSnapshot.fromHTMLString(this.snapshotHTML);
      }
    }
    hasCachedSnapshot() {
      return this.getCachedSnapshot() != null;
    }
    loadCachedSnapshot() {
      const snapshot = this.getCachedSnapshot();
      if (snapshot) {
        const isPreview = this.shouldIssueRequest();
        this.render(async () => {
          this.cacheSnapshot();
          if (this.isSamePage) {
            this.adapter.visitRendered(this);
          } else {
            if (this.view.renderPromise)
              await this.view.renderPromise;
            await this.view.renderPage(snapshot, isPreview, this.willRender, this);
            this.performScroll();
            this.adapter.visitRendered(this);
            if (!isPreview) {
              this.complete();
            }
          }
        });
      }
    }
    followRedirect() {
      var _a;
      if (this.redirectedToLocation && !this.followedRedirect && ((_a = this.response) === null || _a === void 0 ? void 0 : _a.redirected)) {
        this.adapter.visitProposedToLocation(this.redirectedToLocation, {
          action: "replace",
          response: this.response,
          shouldCacheSnapshot: false,
          willRender: false
        });
        this.followedRedirect = true;
      }
    }
    goToSamePageAnchor() {
      if (this.isSamePage) {
        this.render(async () => {
          this.cacheSnapshot();
          this.performScroll();
          this.changeHistory();
          this.adapter.visitRendered(this);
        });
      }
    }
    prepareRequest(request) {
      if (this.acceptsStreamResponse) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }
    requestStarted() {
      this.startRequest();
    }
    requestPreventedHandlingResponse(_request, _response) {
    }
    async requestSucceededWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == void 0) {
        this.recordResponse({
          statusCode: SystemStatusCode.contentTypeMismatch,
          redirected
        });
      } else {
        this.redirectedToLocation = response.redirected ? response.location : void 0;
        this.recordResponse({ statusCode, responseHTML, redirected });
      }
    }
    async requestFailedWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == void 0) {
        this.recordResponse({
          statusCode: SystemStatusCode.contentTypeMismatch,
          redirected
        });
      } else {
        this.recordResponse({ statusCode, responseHTML, redirected });
      }
    }
    requestErrored(_request, _error) {
      this.recordResponse({
        statusCode: SystemStatusCode.networkFailure,
        redirected: false
      });
    }
    requestFinished() {
      this.finishRequest();
    }
    performScroll() {
      if (!this.scrolled && !this.view.forceReloaded) {
        if (this.action == "restore") {
          this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
        } else {
          this.scrollToAnchor() || this.view.scrollToTop();
        }
        if (this.isSamePage) {
          this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
        }
        this.scrolled = true;
      }
    }
    scrollToRestoredPosition() {
      const { scrollPosition } = this.restorationData;
      if (scrollPosition) {
        this.view.scrollToPosition(scrollPosition);
        return true;
      }
    }
    scrollToAnchor() {
      const anchor = getAnchor(this.location);
      if (anchor != null) {
        this.view.scrollToAnchor(anchor);
        return true;
      }
    }
    recordTimingMetric(metric) {
      this.timingMetrics[metric] = (/* @__PURE__ */ new Date()).getTime();
    }
    getTimingMetrics() {
      return Object.assign({}, this.timingMetrics);
    }
    getHistoryMethodForAction(action) {
      switch (action) {
        case "replace":
          return history.replaceState;
        case "advance":
        case "restore":
          return history.pushState;
      }
    }
    hasPreloadedResponse() {
      return typeof this.response == "object";
    }
    shouldIssueRequest() {
      if (this.isSamePage) {
        return false;
      } else if (this.action == "restore") {
        return !this.hasCachedSnapshot();
      } else {
        return this.willRender;
      }
    }
    cacheSnapshot() {
      if (!this.snapshotCached) {
        this.view.cacheSnapshot(this.snapshot).then((snapshot) => snapshot && this.visitCachedSnapshot(snapshot));
        this.snapshotCached = true;
      }
    }
    async render(callback) {
      this.cancelRender();
      await new Promise((resolve) => {
        this.frame = requestAnimationFrame(() => resolve());
      });
      await callback();
      delete this.frame;
    }
    cancelRender() {
      if (this.frame) {
        cancelAnimationFrame(this.frame);
        delete this.frame;
      }
    }
  };
  function isSuccessful(statusCode) {
    return statusCode >= 200 && statusCode < 300;
  }
  var BrowserAdapter = class {
    constructor(session2) {
      this.progressBar = new ProgressBar();
      this.showProgressBar = () => {
        this.progressBar.show();
      };
      this.session = session2;
    }
    visitProposedToLocation(location2, options) {
      this.navigator.startVisit(location2, (options === null || options === void 0 ? void 0 : options.restorationIdentifier) || uuid(), options);
    }
    visitStarted(visit2) {
      this.location = visit2.location;
      visit2.loadCachedSnapshot();
      visit2.issueRequest();
      visit2.goToSamePageAnchor();
    }
    visitRequestStarted(visit2) {
      this.progressBar.setValue(0);
      if (visit2.hasCachedSnapshot() || visit2.action != "restore") {
        this.showVisitProgressBarAfterDelay();
      } else {
        this.showProgressBar();
      }
    }
    visitRequestCompleted(visit2) {
      visit2.loadResponse();
    }
    visitRequestFailedWithStatusCode(visit2, statusCode) {
      switch (statusCode) {
        case SystemStatusCode.networkFailure:
        case SystemStatusCode.timeoutFailure:
        case SystemStatusCode.contentTypeMismatch:
          return this.reload({
            reason: "request_failed",
            context: {
              statusCode
            }
          });
        default:
          return visit2.loadResponse();
      }
    }
    visitRequestFinished(_visit) {
      this.progressBar.setValue(1);
      this.hideVisitProgressBar();
    }
    visitCompleted(_visit) {
    }
    pageInvalidated(reason) {
      this.reload(reason);
    }
    visitFailed(_visit) {
    }
    visitRendered(_visit) {
    }
    formSubmissionStarted(_formSubmission) {
      this.progressBar.setValue(0);
      this.showFormProgressBarAfterDelay();
    }
    formSubmissionFinished(_formSubmission) {
      this.progressBar.setValue(1);
      this.hideFormProgressBar();
    }
    showVisitProgressBarAfterDelay() {
      this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
    }
    hideVisitProgressBar() {
      this.progressBar.hide();
      if (this.visitProgressBarTimeout != null) {
        window.clearTimeout(this.visitProgressBarTimeout);
        delete this.visitProgressBarTimeout;
      }
    }
    showFormProgressBarAfterDelay() {
      if (this.formProgressBarTimeout == null) {
        this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
      }
    }
    hideFormProgressBar() {
      this.progressBar.hide();
      if (this.formProgressBarTimeout != null) {
        window.clearTimeout(this.formProgressBarTimeout);
        delete this.formProgressBarTimeout;
      }
    }
    reload(reason) {
      var _a;
      dispatch("turbo:reload", { detail: reason });
      window.location.href = ((_a = this.location) === null || _a === void 0 ? void 0 : _a.toString()) || window.location.href;
    }
    get navigator() {
      return this.session.navigator;
    }
  };
  var CacheObserver = class {
    constructor() {
      this.selector = "[data-turbo-temporary]";
      this.deprecatedSelector = "[data-turbo-cache=false]";
      this.started = false;
      this.removeTemporaryElements = (_event) => {
        for (const element of this.temporaryElements) {
          element.remove();
        }
      };
    }
    start() {
      if (!this.started) {
        this.started = true;
        addEventListener("turbo:before-cache", this.removeTemporaryElements, false);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        removeEventListener("turbo:before-cache", this.removeTemporaryElements, false);
      }
    }
    get temporaryElements() {
      return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation];
    }
    get temporaryElementsWithDeprecation() {
      const elements = document.querySelectorAll(this.deprecatedSelector);
      if (elements.length) {
        console.warn(`The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`);
      }
      return [...elements];
    }
  };
  var FrameRedirector = class {
    constructor(session2, element) {
      this.session = session2;
      this.element = element;
      this.linkInterceptor = new LinkInterceptor(this, element);
      this.formSubmitObserver = new FormSubmitObserver(this, element);
    }
    start() {
      this.linkInterceptor.start();
      this.formSubmitObserver.start();
    }
    stop() {
      this.linkInterceptor.stop();
      this.formSubmitObserver.stop();
    }
    shouldInterceptLinkClick(element, _location, _event) {
      return this.shouldRedirect(element);
    }
    linkClickIntercepted(element, url, event) {
      const frame = this.findFrameElement(element);
      if (frame) {
        frame.delegate.linkClickIntercepted(element, url, event);
      }
    }
    willSubmitForm(element, submitter) {
      return element.closest("turbo-frame") == null && this.shouldSubmit(element, submitter) && this.shouldRedirect(element, submitter);
    }
    formSubmitted(element, submitter) {
      const frame = this.findFrameElement(element, submitter);
      if (frame) {
        frame.delegate.formSubmitted(element, submitter);
      }
    }
    shouldSubmit(form, submitter) {
      var _a;
      const action = getAction(form, submitter);
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const rootLocation = expandURL((_a = meta === null || meta === void 0 ? void 0 : meta.content) !== null && _a !== void 0 ? _a : "/");
      return this.shouldRedirect(form, submitter) && locationIsVisitable(action, rootLocation);
    }
    shouldRedirect(element, submitter) {
      const isNavigatable = element instanceof HTMLFormElement ? this.session.submissionIsNavigatable(element, submitter) : this.session.elementIsNavigatable(element);
      if (isNavigatable) {
        const frame = this.findFrameElement(element, submitter);
        return frame ? frame != element.closest("turbo-frame") : false;
      } else {
        return false;
      }
    }
    findFrameElement(element, submitter) {
      const id = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("data-turbo-frame")) || element.getAttribute("data-turbo-frame");
      if (id && id != "_top") {
        const frame = this.element.querySelector(`#${id}:not([disabled])`);
        if (frame instanceof FrameElement) {
          return frame;
        }
      }
    }
  };
  var History = class {
    constructor(delegate) {
      this.restorationIdentifier = uuid();
      this.restorationData = {};
      this.started = false;
      this.pageLoaded = false;
      this.onPopState = (event) => {
        if (this.shouldHandlePopState()) {
          const { turbo } = event.state || {};
          if (turbo) {
            this.location = new URL(window.location.href);
            const { restorationIdentifier } = turbo;
            this.restorationIdentifier = restorationIdentifier;
            this.delegate.historyPoppedToLocationWithRestorationIdentifier(this.location, restorationIdentifier);
          }
        }
      };
      this.onPageLoad = async (_event) => {
        await nextMicrotask();
        this.pageLoaded = true;
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("popstate", this.onPopState, false);
        addEventListener("load", this.onPageLoad, false);
        this.started = true;
        this.replace(new URL(window.location.href));
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("popstate", this.onPopState, false);
        removeEventListener("load", this.onPageLoad, false);
        this.started = false;
      }
    }
    push(location2, restorationIdentifier) {
      this.update(history.pushState, location2, restorationIdentifier);
    }
    replace(location2, restorationIdentifier) {
      this.update(history.replaceState, location2, restorationIdentifier);
    }
    update(method, location2, restorationIdentifier = uuid()) {
      const state = { turbo: { restorationIdentifier } };
      method.call(history, state, "", location2.href);
      this.location = location2;
      this.restorationIdentifier = restorationIdentifier;
    }
    getRestorationDataForIdentifier(restorationIdentifier) {
      return this.restorationData[restorationIdentifier] || {};
    }
    updateRestorationData(additionalData) {
      const { restorationIdentifier } = this;
      const restorationData = this.restorationData[restorationIdentifier];
      this.restorationData[restorationIdentifier] = Object.assign(Object.assign({}, restorationData), additionalData);
    }
    assumeControlOfScrollRestoration() {
      var _a;
      if (!this.previousScrollRestoration) {
        this.previousScrollRestoration = (_a = history.scrollRestoration) !== null && _a !== void 0 ? _a : "auto";
        history.scrollRestoration = "manual";
      }
    }
    relinquishControlOfScrollRestoration() {
      if (this.previousScrollRestoration) {
        history.scrollRestoration = this.previousScrollRestoration;
        delete this.previousScrollRestoration;
      }
    }
    shouldHandlePopState() {
      return this.pageIsLoaded();
    }
    pageIsLoaded() {
      return this.pageLoaded || document.readyState == "complete";
    }
  };
  var Navigator = class {
    constructor(delegate) {
      this.delegate = delegate;
    }
    proposeVisit(location2, options = {}) {
      if (this.delegate.allowsVisitingLocationWithAction(location2, options.action)) {
        if (locationIsVisitable(location2, this.view.snapshot.rootLocation)) {
          this.delegate.visitProposedToLocation(location2, options);
        } else {
          window.location.href = location2.toString();
        }
      }
    }
    startVisit(locatable, restorationIdentifier, options = {}) {
      this.stop();
      this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, Object.assign({ referrer: this.location }, options));
      this.currentVisit.start();
    }
    submitForm(form, submitter) {
      this.stop();
      this.formSubmission = new FormSubmission(this, form, submitter, true);
      this.formSubmission.start();
    }
    stop() {
      if (this.formSubmission) {
        this.formSubmission.stop();
        delete this.formSubmission;
      }
      if (this.currentVisit) {
        this.currentVisit.cancel();
        delete this.currentVisit;
      }
    }
    get adapter() {
      return this.delegate.adapter;
    }
    get view() {
      return this.delegate.view;
    }
    get history() {
      return this.delegate.history;
    }
    formSubmissionStarted(formSubmission) {
      if (typeof this.adapter.formSubmissionStarted === "function") {
        this.adapter.formSubmissionStarted(formSubmission);
      }
    }
    async formSubmissionSucceededWithResponse(formSubmission, fetchResponse) {
      if (formSubmission == this.formSubmission) {
        const responseHTML = await fetchResponse.responseHTML;
        if (responseHTML) {
          const shouldCacheSnapshot = formSubmission.isSafe;
          if (!shouldCacheSnapshot) {
            this.view.clearSnapshotCache();
          }
          const { statusCode, redirected } = fetchResponse;
          const action = this.getActionForFormSubmission(formSubmission);
          const visitOptions = {
            action,
            shouldCacheSnapshot,
            response: { statusCode, responseHTML, redirected }
          };
          this.proposeVisit(fetchResponse.location, visitOptions);
        }
      }
    }
    async formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      const responseHTML = await fetchResponse.responseHTML;
      if (responseHTML) {
        const snapshot = PageSnapshot.fromHTMLString(responseHTML);
        if (fetchResponse.serverError) {
          await this.view.renderError(snapshot, this.currentVisit);
        } else {
          await this.view.renderPage(snapshot, false, true, this.currentVisit);
        }
        this.view.scrollToTop();
        this.view.clearSnapshotCache();
      }
    }
    formSubmissionErrored(formSubmission, error2) {
      console.error(error2);
    }
    formSubmissionFinished(formSubmission) {
      if (typeof this.adapter.formSubmissionFinished === "function") {
        this.adapter.formSubmissionFinished(formSubmission);
      }
    }
    visitStarted(visit2) {
      this.delegate.visitStarted(visit2);
    }
    visitCompleted(visit2) {
      this.delegate.visitCompleted(visit2);
    }
    locationWithActionIsSamePage(location2, action) {
      const anchor = getAnchor(location2);
      const currentAnchor = getAnchor(this.view.lastRenderedLocation);
      const isRestorationToTop = action === "restore" && typeof anchor === "undefined";
      return action !== "replace" && getRequestURL(location2) === getRequestURL(this.view.lastRenderedLocation) && (isRestorationToTop || anchor != null && anchor !== currentAnchor);
    }
    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
    }
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
    getActionForFormSubmission({ submitter, formElement }) {
      return getVisitAction(submitter, formElement) || "advance";
    }
  };
  var PageStage;
  (function(PageStage2) {
    PageStage2[PageStage2["initial"] = 0] = "initial";
    PageStage2[PageStage2["loading"] = 1] = "loading";
    PageStage2[PageStage2["interactive"] = 2] = "interactive";
    PageStage2[PageStage2["complete"] = 3] = "complete";
  })(PageStage || (PageStage = {}));
  var PageObserver = class {
    constructor(delegate) {
      this.stage = PageStage.initial;
      this.started = false;
      this.interpretReadyState = () => {
        const { readyState } = this;
        if (readyState == "interactive") {
          this.pageIsInteractive();
        } else if (readyState == "complete") {
          this.pageIsComplete();
        }
      };
      this.pageWillUnload = () => {
        this.delegate.pageWillUnload();
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        if (this.stage == PageStage.initial) {
          this.stage = PageStage.loading;
        }
        document.addEventListener("readystatechange", this.interpretReadyState, false);
        addEventListener("pagehide", this.pageWillUnload, false);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        document.removeEventListener("readystatechange", this.interpretReadyState, false);
        removeEventListener("pagehide", this.pageWillUnload, false);
        this.started = false;
      }
    }
    pageIsInteractive() {
      if (this.stage == PageStage.loading) {
        this.stage = PageStage.interactive;
        this.delegate.pageBecameInteractive();
      }
    }
    pageIsComplete() {
      this.pageIsInteractive();
      if (this.stage == PageStage.interactive) {
        this.stage = PageStage.complete;
        this.delegate.pageLoaded();
      }
    }
    get readyState() {
      return document.readyState;
    }
  };
  var ScrollObserver = class {
    constructor(delegate) {
      this.started = false;
      this.onScroll = () => {
        this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("scroll", this.onScroll, false);
        this.onScroll();
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("scroll", this.onScroll, false);
        this.started = false;
      }
    }
    updatePosition(position) {
      this.delegate.scrollPositionChanged(position);
    }
  };
  var StreamMessageRenderer = class {
    render({ fragment }) {
      Bardo.preservingPermanentElements(this, getPermanentElementMapForFragment(fragment), () => document.documentElement.appendChild(fragment));
    }
    enteringBardo(currentPermanentElement, newPermanentElement) {
      newPermanentElement.replaceWith(currentPermanentElement.cloneNode(true));
    }
    leavingBardo() {
    }
  };
  function getPermanentElementMapForFragment(fragment) {
    const permanentElementsInDocument = queryPermanentElementsAll(document.documentElement);
    const permanentElementMap = {};
    for (const permanentElementInDocument of permanentElementsInDocument) {
      const { id } = permanentElementInDocument;
      for (const streamElement of fragment.querySelectorAll("turbo-stream")) {
        const elementInStream = getPermanentElementById(streamElement.templateElement.content, id);
        if (elementInStream) {
          permanentElementMap[id] = [permanentElementInDocument, elementInStream];
        }
      }
    }
    return permanentElementMap;
  }
  var StreamObserver = class {
    constructor(delegate) {
      this.sources = /* @__PURE__ */ new Set();
      this.started = false;
      this.inspectFetchResponse = (event) => {
        const response = fetchResponseFromEvent(event);
        if (response && fetchResponseIsStream(response)) {
          event.preventDefault();
          this.receiveMessageResponse(response);
        }
      };
      this.receiveMessageEvent = (event) => {
        if (this.started && typeof event.data == "string") {
          this.receiveMessageHTML(event.data);
        }
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        this.started = true;
        addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }
    connectStreamSource(source) {
      if (!this.streamSourceIsConnected(source)) {
        this.sources.add(source);
        source.addEventListener("message", this.receiveMessageEvent, false);
      }
    }
    disconnectStreamSource(source) {
      if (this.streamSourceIsConnected(source)) {
        this.sources.delete(source);
        source.removeEventListener("message", this.receiveMessageEvent, false);
      }
    }
    streamSourceIsConnected(source) {
      return this.sources.has(source);
    }
    async receiveMessageResponse(response) {
      const html = await response.responseHTML;
      if (html) {
        this.receiveMessageHTML(html);
      }
    }
    receiveMessageHTML(html) {
      this.delegate.receivedMessageFromStream(StreamMessage.wrap(html));
    }
  };
  function fetchResponseFromEvent(event) {
    var _a;
    const fetchResponse = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.fetchResponse;
    if (fetchResponse instanceof FetchResponse) {
      return fetchResponse;
    }
  }
  function fetchResponseIsStream(response) {
    var _a;
    const contentType = (_a = response.contentType) !== null && _a !== void 0 ? _a : "";
    return contentType.startsWith(StreamMessage.contentType);
  }
  var ErrorRenderer = class extends Renderer {
    static renderElement(currentElement, newElement) {
      const { documentElement, body } = document;
      documentElement.replaceChild(newElement, body);
    }
    async render() {
      this.replaceHeadAndBody();
      this.activateScriptElements();
    }
    replaceHeadAndBody() {
      const { documentElement, head } = document;
      documentElement.replaceChild(this.newHead, head);
      this.renderElement(this.currentElement, this.newElement);
    }
    activateScriptElements() {
      for (const replaceableElement of this.scriptElements) {
        const parentNode = replaceableElement.parentNode;
        if (parentNode) {
          const element = activateScriptElement(replaceableElement);
          parentNode.replaceChild(element, replaceableElement);
        }
      }
    }
    get newHead() {
      return this.newSnapshot.headSnapshot.element;
    }
    get scriptElements() {
      return document.documentElement.querySelectorAll("script");
    }
  };
  var PageRenderer = class extends Renderer {
    static renderElement(currentElement, newElement) {
      if (document.body && newElement instanceof HTMLBodyElement) {
        document.body.replaceWith(newElement);
      } else {
        document.documentElement.appendChild(newElement);
      }
    }
    get shouldRender() {
      return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
    }
    get reloadReason() {
      if (!this.newSnapshot.isVisitable) {
        return {
          reason: "turbo_visit_control_is_reload"
        };
      }
      if (!this.trackedElementsAreIdentical) {
        return {
          reason: "tracked_element_mismatch"
        };
      }
    }
    async prepareToRender() {
      await this.mergeHead();
    }
    async render() {
      if (this.willRender) {
        await this.replaceBody();
      }
    }
    finishRendering() {
      super.finishRendering();
      if (!this.isPreview) {
        this.focusFirstAutofocusableElement();
      }
    }
    get currentHeadSnapshot() {
      return this.currentSnapshot.headSnapshot;
    }
    get newHeadSnapshot() {
      return this.newSnapshot.headSnapshot;
    }
    get newElement() {
      return this.newSnapshot.element;
    }
    async mergeHead() {
      const mergedHeadElements = this.mergeProvisionalElements();
      const newStylesheetElements = this.copyNewHeadStylesheetElements();
      this.copyNewHeadScriptElements();
      await mergedHeadElements;
      await newStylesheetElements;
    }
    async replaceBody() {
      await this.preservingPermanentElements(async () => {
        this.activateNewBody();
        await this.assignNewBody();
      });
    }
    get trackedElementsAreIdentical() {
      return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature;
    }
    async copyNewHeadStylesheetElements() {
      const loadingElements = [];
      for (const element of this.newHeadStylesheetElements) {
        loadingElements.push(waitForLoad(element));
        document.head.appendChild(element);
      }
      await Promise.all(loadingElements);
    }
    copyNewHeadScriptElements() {
      for (const element of this.newHeadScriptElements) {
        document.head.appendChild(activateScriptElement(element));
      }
    }
    async mergeProvisionalElements() {
      const newHeadElements = [...this.newHeadProvisionalElements];
      for (const element of this.currentHeadProvisionalElements) {
        if (!this.isCurrentElementInElementList(element, newHeadElements)) {
          document.head.removeChild(element);
        }
      }
      for (const element of newHeadElements) {
        document.head.appendChild(element);
      }
    }
    isCurrentElementInElementList(element, elementList) {
      for (const [index, newElement] of elementList.entries()) {
        if (element.tagName == "TITLE") {
          if (newElement.tagName != "TITLE") {
            continue;
          }
          if (element.innerHTML == newElement.innerHTML) {
            elementList.splice(index, 1);
            return true;
          }
        }
        if (newElement.isEqualNode(element)) {
          elementList.splice(index, 1);
          return true;
        }
      }
      return false;
    }
    removeCurrentHeadProvisionalElements() {
      for (const element of this.currentHeadProvisionalElements) {
        document.head.removeChild(element);
      }
    }
    copyNewHeadProvisionalElements() {
      for (const element of this.newHeadProvisionalElements) {
        document.head.appendChild(element);
      }
    }
    activateNewBody() {
      document.adoptNode(this.newElement);
      this.activateNewBodyScriptElements();
    }
    activateNewBodyScriptElements() {
      for (const inertScriptElement of this.newBodyScriptElements) {
        const activatedScriptElement = activateScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }
    async assignNewBody() {
      await this.renderElement(this.currentElement, this.newElement);
    }
    get newHeadStylesheetElements() {
      return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot);
    }
    get newHeadScriptElements() {
      return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot);
    }
    get currentHeadProvisionalElements() {
      return this.currentHeadSnapshot.provisionalElements;
    }
    get newHeadProvisionalElements() {
      return this.newHeadSnapshot.provisionalElements;
    }
    get newBodyScriptElements() {
      return this.newElement.querySelectorAll("script");
    }
  };
  var SnapshotCache = class {
    constructor(size) {
      this.keys = [];
      this.snapshots = {};
      this.size = size;
    }
    has(location2) {
      return toCacheKey(location2) in this.snapshots;
    }
    get(location2) {
      if (this.has(location2)) {
        const snapshot = this.read(location2);
        this.touch(location2);
        return snapshot;
      }
    }
    put(location2, snapshot) {
      this.write(location2, snapshot);
      this.touch(location2);
      return snapshot;
    }
    clear() {
      this.snapshots = {};
    }
    read(location2) {
      return this.snapshots[toCacheKey(location2)];
    }
    write(location2, snapshot) {
      this.snapshots[toCacheKey(location2)] = snapshot;
    }
    touch(location2) {
      const key = toCacheKey(location2);
      const index = this.keys.indexOf(key);
      if (index > -1)
        this.keys.splice(index, 1);
      this.keys.unshift(key);
      this.trim();
    }
    trim() {
      for (const key of this.keys.splice(this.size)) {
        delete this.snapshots[key];
      }
    }
  };
  var PageView = class extends View {
    constructor() {
      super(...arguments);
      this.snapshotCache = new SnapshotCache(10);
      this.lastRenderedLocation = new URL(location.href);
      this.forceReloaded = false;
    }
    renderPage(snapshot, isPreview = false, willRender = true, visit2) {
      const renderer = new PageRenderer(this.snapshot, snapshot, PageRenderer.renderElement, isPreview, willRender);
      if (!renderer.shouldRender) {
        this.forceReloaded = true;
      } else {
        visit2 === null || visit2 === void 0 ? void 0 : visit2.changeHistory();
      }
      return this.render(renderer);
    }
    renderError(snapshot, visit2) {
      visit2 === null || visit2 === void 0 ? void 0 : visit2.changeHistory();
      const renderer = new ErrorRenderer(this.snapshot, snapshot, ErrorRenderer.renderElement, false);
      return this.render(renderer);
    }
    clearSnapshotCache() {
      this.snapshotCache.clear();
    }
    async cacheSnapshot(snapshot = this.snapshot) {
      if (snapshot.isCacheable) {
        this.delegate.viewWillCacheSnapshot();
        const { lastRenderedLocation: location2 } = this;
        await nextEventLoopTick();
        const cachedSnapshot = snapshot.clone();
        this.snapshotCache.put(location2, cachedSnapshot);
        return cachedSnapshot;
      }
    }
    getCachedSnapshotForLocation(location2) {
      return this.snapshotCache.get(location2);
    }
    get snapshot() {
      return PageSnapshot.fromElement(this.element);
    }
  };
  var Preloader = class {
    constructor(delegate) {
      this.selector = "a[data-turbo-preload]";
      this.delegate = delegate;
    }
    get snapshotCache() {
      return this.delegate.navigator.view.snapshotCache;
    }
    start() {
      if (document.readyState === "loading") {
        return document.addEventListener("DOMContentLoaded", () => {
          this.preloadOnLoadLinksForView(document.body);
        });
      } else {
        this.preloadOnLoadLinksForView(document.body);
      }
    }
    preloadOnLoadLinksForView(element) {
      for (const link of element.querySelectorAll(this.selector)) {
        this.preloadURL(link);
      }
    }
    async preloadURL(link) {
      const location2 = new URL(link.href);
      if (this.snapshotCache.has(location2)) {
        return;
      }
      try {
        const response = await fetch(location2.toString(), { headers: { "VND.PREFETCH": "true", Accept: "text/html" } });
        const responseText = await response.text();
        const snapshot = PageSnapshot.fromHTMLString(responseText);
        this.snapshotCache.put(location2, snapshot);
      } catch (_) {
      }
    }
  };
  var Session = class {
    constructor() {
      this.navigator = new Navigator(this);
      this.history = new History(this);
      this.preloader = new Preloader(this);
      this.view = new PageView(this, document.documentElement);
      this.adapter = new BrowserAdapter(this);
      this.pageObserver = new PageObserver(this);
      this.cacheObserver = new CacheObserver();
      this.linkClickObserver = new LinkClickObserver(this, window);
      this.formSubmitObserver = new FormSubmitObserver(this, document);
      this.scrollObserver = new ScrollObserver(this);
      this.streamObserver = new StreamObserver(this);
      this.formLinkClickObserver = new FormLinkClickObserver(this, document.documentElement);
      this.frameRedirector = new FrameRedirector(this, document.documentElement);
      this.streamMessageRenderer = new StreamMessageRenderer();
      this.drive = true;
      this.enabled = true;
      this.progressBarDelay = 500;
      this.started = false;
      this.formMode = "on";
    }
    start() {
      if (!this.started) {
        this.pageObserver.start();
        this.cacheObserver.start();
        this.formLinkClickObserver.start();
        this.linkClickObserver.start();
        this.formSubmitObserver.start();
        this.scrollObserver.start();
        this.streamObserver.start();
        this.frameRedirector.start();
        this.history.start();
        this.preloader.start();
        this.started = true;
        this.enabled = true;
      }
    }
    disable() {
      this.enabled = false;
    }
    stop() {
      if (this.started) {
        this.pageObserver.stop();
        this.cacheObserver.stop();
        this.formLinkClickObserver.stop();
        this.linkClickObserver.stop();
        this.formSubmitObserver.stop();
        this.scrollObserver.stop();
        this.streamObserver.stop();
        this.frameRedirector.stop();
        this.history.stop();
        this.started = false;
      }
    }
    registerAdapter(adapter) {
      this.adapter = adapter;
    }
    visit(location2, options = {}) {
      const frameElement = options.frame ? document.getElementById(options.frame) : null;
      if (frameElement instanceof FrameElement) {
        frameElement.src = location2.toString();
        frameElement.loaded;
      } else {
        this.navigator.proposeVisit(expandURL(location2), options);
      }
    }
    connectStreamSource(source) {
      this.streamObserver.connectStreamSource(source);
    }
    disconnectStreamSource(source) {
      this.streamObserver.disconnectStreamSource(source);
    }
    renderStreamMessage(message) {
      this.streamMessageRenderer.render(StreamMessage.wrap(message));
    }
    clearCache() {
      this.view.clearSnapshotCache();
    }
    setProgressBarDelay(delay) {
      this.progressBarDelay = delay;
    }
    setFormMode(mode) {
      this.formMode = mode;
    }
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
    historyPoppedToLocationWithRestorationIdentifier(location2, restorationIdentifier) {
      if (this.enabled) {
        this.navigator.startVisit(location2, restorationIdentifier, {
          action: "restore",
          historyChanged: true
        });
      } else {
        this.adapter.pageInvalidated({
          reason: "turbo_disabled"
        });
      }
    }
    scrollPositionChanged(position) {
      this.history.updateRestorationData({ scrollPosition: position });
    }
    willSubmitFormLinkToLocation(link, location2) {
      return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation);
    }
    submittedFormLinkToLocation() {
    }
    willFollowLinkToLocation(link, location2, event) {
      return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(link, location2, event);
    }
    followedLinkToLocation(link, location2) {
      const action = this.getActionForLink(link);
      const acceptsStreamResponse = link.hasAttribute("data-turbo-stream");
      this.visit(location2.href, { action, acceptsStreamResponse });
    }
    allowsVisitingLocationWithAction(location2, action) {
      return this.locationWithActionIsSamePage(location2, action) || this.applicationAllowsVisitingLocation(location2);
    }
    visitProposedToLocation(location2, options) {
      extendURLWithDeprecatedProperties(location2);
      this.adapter.visitProposedToLocation(location2, options);
    }
    visitStarted(visit2) {
      if (!visit2.acceptsStreamResponse) {
        markAsBusy(document.documentElement);
      }
      extendURLWithDeprecatedProperties(visit2.location);
      if (!visit2.silent) {
        this.notifyApplicationAfterVisitingLocation(visit2.location, visit2.action);
      }
    }
    visitCompleted(visit2) {
      clearBusyState(document.documentElement);
      this.notifyApplicationAfterPageLoad(visit2.getTimingMetrics());
    }
    locationWithActionIsSamePage(location2, action) {
      return this.navigator.locationWithActionIsSamePage(location2, action);
    }
    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
    }
    willSubmitForm(form, submitter) {
      const action = getAction(form, submitter);
      return this.submissionIsNavigatable(form, submitter) && locationIsVisitable(expandURL(action), this.snapshot.rootLocation);
    }
    formSubmitted(form, submitter) {
      this.navigator.submitForm(form, submitter);
    }
    pageBecameInteractive() {
      this.view.lastRenderedLocation = this.location;
      this.notifyApplicationAfterPageLoad();
    }
    pageLoaded() {
      this.history.assumeControlOfScrollRestoration();
    }
    pageWillUnload() {
      this.history.relinquishControlOfScrollRestoration();
    }
    receivedMessageFromStream(message) {
      this.renderStreamMessage(message);
    }
    viewWillCacheSnapshot() {
      var _a;
      if (!((_a = this.navigator.currentVisit) === null || _a === void 0 ? void 0 : _a.silent)) {
        this.notifyApplicationBeforeCachingSnapshot();
      }
    }
    allowsImmediateRender({ element }, options) {
      const event = this.notifyApplicationBeforeRender(element, options);
      const { defaultPrevented, detail: { render } } = event;
      if (this.view.renderer && render) {
        this.view.renderer.renderElement = render;
      }
      return !defaultPrevented;
    }
    viewRenderedSnapshot(_snapshot, _isPreview) {
      this.view.lastRenderedLocation = this.history.location;
      this.notifyApplicationAfterRender();
    }
    preloadOnLoadLinksForView(element) {
      this.preloader.preloadOnLoadLinksForView(element);
    }
    viewInvalidated(reason) {
      this.adapter.pageInvalidated(reason);
    }
    frameLoaded(frame) {
      this.notifyApplicationAfterFrameLoad(frame);
    }
    frameRendered(fetchResponse, frame) {
      this.notifyApplicationAfterFrameRender(fetchResponse, frame);
    }
    applicationAllowsFollowingLinkToLocation(link, location2, ev) {
      const event = this.notifyApplicationAfterClickingLinkToLocation(link, location2, ev);
      return !event.defaultPrevented;
    }
    applicationAllowsVisitingLocation(location2) {
      const event = this.notifyApplicationBeforeVisitingLocation(location2);
      return !event.defaultPrevented;
    }
    notifyApplicationAfterClickingLinkToLocation(link, location2, event) {
      return dispatch("turbo:click", {
        target: link,
        detail: { url: location2.href, originalEvent: event },
        cancelable: true
      });
    }
    notifyApplicationBeforeVisitingLocation(location2) {
      return dispatch("turbo:before-visit", {
        detail: { url: location2.href },
        cancelable: true
      });
    }
    notifyApplicationAfterVisitingLocation(location2, action) {
      return dispatch("turbo:visit", { detail: { url: location2.href, action } });
    }
    notifyApplicationBeforeCachingSnapshot() {
      return dispatch("turbo:before-cache");
    }
    notifyApplicationBeforeRender(newBody, options) {
      return dispatch("turbo:before-render", {
        detail: Object.assign({ newBody }, options),
        cancelable: true
      });
    }
    notifyApplicationAfterRender() {
      return dispatch("turbo:render");
    }
    notifyApplicationAfterPageLoad(timing = {}) {
      return dispatch("turbo:load", {
        detail: { url: this.location.href, timing }
      });
    }
    notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
      dispatchEvent(new HashChangeEvent("hashchange", {
        oldURL: oldURL.toString(),
        newURL: newURL.toString()
      }));
    }
    notifyApplicationAfterFrameLoad(frame) {
      return dispatch("turbo:frame-load", { target: frame });
    }
    notifyApplicationAfterFrameRender(fetchResponse, frame) {
      return dispatch("turbo:frame-render", {
        detail: { fetchResponse },
        target: frame,
        cancelable: true
      });
    }
    submissionIsNavigatable(form, submitter) {
      if (this.formMode == "off") {
        return false;
      } else {
        const submitterIsNavigatable = submitter ? this.elementIsNavigatable(submitter) : true;
        if (this.formMode == "optin") {
          return submitterIsNavigatable && form.closest('[data-turbo="true"]') != null;
        } else {
          return submitterIsNavigatable && this.elementIsNavigatable(form);
        }
      }
    }
    elementIsNavigatable(element) {
      const container = findClosestRecursively(element, "[data-turbo]");
      const withinFrame = findClosestRecursively(element, "turbo-frame");
      if (this.drive || withinFrame) {
        if (container) {
          return container.getAttribute("data-turbo") != "false";
        } else {
          return true;
        }
      } else {
        if (container) {
          return container.getAttribute("data-turbo") == "true";
        } else {
          return false;
        }
      }
    }
    getActionForLink(link) {
      return getVisitAction(link) || "advance";
    }
    get snapshot() {
      return this.view.snapshot;
    }
  };
  function extendURLWithDeprecatedProperties(url) {
    Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
  }
  var deprecatedLocationPropertyDescriptors = {
    absoluteURL: {
      get() {
        return this.toString();
      }
    }
  };
  var Cache = class {
    constructor(session2) {
      this.session = session2;
    }
    clear() {
      this.session.clearCache();
    }
    resetCacheControl() {
      this.setCacheControl("");
    }
    exemptPageFromCache() {
      this.setCacheControl("no-cache");
    }
    exemptPageFromPreview() {
      this.setCacheControl("no-preview");
    }
    setCacheControl(value) {
      setMetaContent("turbo-cache-control", value);
    }
  };
  var StreamActions = {
    after() {
      this.targetElements.forEach((e) => {
        var _a;
        return (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(this.templateContent, e.nextSibling);
      });
    },
    append() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.append(this.templateContent));
    },
    before() {
      this.targetElements.forEach((e) => {
        var _a;
        return (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(this.templateContent, e);
      });
    },
    prepend() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.prepend(this.templateContent));
    },
    remove() {
      this.targetElements.forEach((e) => e.remove());
    },
    replace() {
      this.targetElements.forEach((e) => e.replaceWith(this.templateContent));
    },
    update() {
      this.targetElements.forEach((targetElement) => {
        targetElement.innerHTML = "";
        targetElement.append(this.templateContent);
      });
    }
  };
  var session = new Session();
  var cache = new Cache(session);
  var { navigator: navigator$1 } = session;
  function start() {
    session.start();
  }
  function registerAdapter(adapter) {
    session.registerAdapter(adapter);
  }
  function visit(location2, options) {
    session.visit(location2, options);
  }
  function connectStreamSource(source) {
    session.connectStreamSource(source);
  }
  function disconnectStreamSource(source) {
    session.disconnectStreamSource(source);
  }
  function renderStreamMessage(message) {
    session.renderStreamMessage(message);
  }
  function clearCache() {
    console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`");
    session.clearCache();
  }
  function setProgressBarDelay(delay) {
    session.setProgressBarDelay(delay);
  }
  function setConfirmMethod(confirmMethod) {
    FormSubmission.confirmMethod = confirmMethod;
  }
  function setFormMode(mode) {
    session.setFormMode(mode);
  }
  var Turbo = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    navigator: navigator$1,
    session,
    cache,
    PageRenderer,
    PageSnapshot,
    FrameRenderer,
    start,
    registerAdapter,
    visit,
    connectStreamSource,
    disconnectStreamSource,
    renderStreamMessage,
    clearCache,
    setProgressBarDelay,
    setConfirmMethod,
    setFormMode,
    StreamActions
  });
  var TurboFrameMissingError = class extends Error {
  };
  var FrameController = class {
    constructor(element) {
      this.fetchResponseLoaded = (_fetchResponse) => {
      };
      this.currentFetchRequest = null;
      this.resolveVisitPromise = () => {
      };
      this.connected = false;
      this.hasBeenLoaded = false;
      this.ignoredAttributes = /* @__PURE__ */ new Set();
      this.action = null;
      this.visitCachedSnapshot = ({ element: element2 }) => {
        const frame = element2.querySelector("#" + this.element.id);
        if (frame && this.previousFrameElement) {
          frame.replaceChildren(...this.previousFrameElement.children);
        }
        delete this.previousFrameElement;
      };
      this.element = element;
      this.view = new FrameView(this, this.element);
      this.appearanceObserver = new AppearanceObserver(this, this.element);
      this.formLinkClickObserver = new FormLinkClickObserver(this, this.element);
      this.linkInterceptor = new LinkInterceptor(this, this.element);
      this.restorationIdentifier = uuid();
      this.formSubmitObserver = new FormSubmitObserver(this, this.element);
    }
    connect() {
      if (!this.connected) {
        this.connected = true;
        if (this.loadingStyle == FrameLoadingStyle.lazy) {
          this.appearanceObserver.start();
        } else {
          this.loadSourceURL();
        }
        this.formLinkClickObserver.start();
        this.linkInterceptor.start();
        this.formSubmitObserver.start();
      }
    }
    disconnect() {
      if (this.connected) {
        this.connected = false;
        this.appearanceObserver.stop();
        this.formLinkClickObserver.stop();
        this.linkInterceptor.stop();
        this.formSubmitObserver.stop();
      }
    }
    disabledChanged() {
      if (this.loadingStyle == FrameLoadingStyle.eager) {
        this.loadSourceURL();
      }
    }
    sourceURLChanged() {
      if (this.isIgnoringChangesTo("src"))
        return;
      if (this.element.isConnected) {
        this.complete = false;
      }
      if (this.loadingStyle == FrameLoadingStyle.eager || this.hasBeenLoaded) {
        this.loadSourceURL();
      }
    }
    sourceURLReloaded() {
      const { src } = this.element;
      this.ignoringChangesToAttribute("complete", () => {
        this.element.removeAttribute("complete");
      });
      this.element.src = null;
      this.element.src = src;
      return this.element.loaded;
    }
    completeChanged() {
      if (this.isIgnoringChangesTo("complete"))
        return;
      this.loadSourceURL();
    }
    loadingStyleChanged() {
      if (this.loadingStyle == FrameLoadingStyle.lazy) {
        this.appearanceObserver.start();
      } else {
        this.appearanceObserver.stop();
        this.loadSourceURL();
      }
    }
    async loadSourceURL() {
      if (this.enabled && this.isActive && !this.complete && this.sourceURL) {
        this.element.loaded = this.visit(expandURL(this.sourceURL));
        this.appearanceObserver.stop();
        await this.element.loaded;
        this.hasBeenLoaded = true;
      }
    }
    async loadResponse(fetchResponse) {
      if (fetchResponse.redirected || fetchResponse.succeeded && fetchResponse.isHTML) {
        this.sourceURL = fetchResponse.response.url;
      }
      try {
        const html = await fetchResponse.responseHTML;
        if (html) {
          const document2 = parseHTMLDocument(html);
          const pageSnapshot = PageSnapshot.fromDocument(document2);
          if (pageSnapshot.isVisitable) {
            await this.loadFrameResponse(fetchResponse, document2);
          } else {
            await this.handleUnvisitableFrameResponse(fetchResponse);
          }
        }
      } finally {
        this.fetchResponseLoaded = () => {
        };
      }
    }
    elementAppearedInViewport(element) {
      this.proposeVisitIfNavigatedWithAction(element, element);
      this.loadSourceURL();
    }
    willSubmitFormLinkToLocation(link) {
      return this.shouldInterceptNavigation(link);
    }
    submittedFormLinkToLocation(link, _location, form) {
      const frame = this.findFrameElement(link);
      if (frame)
        form.setAttribute("data-turbo-frame", frame.id);
    }
    shouldInterceptLinkClick(element, _location, _event) {
      return this.shouldInterceptNavigation(element);
    }
    linkClickIntercepted(element, location2) {
      this.navigateFrame(element, location2);
    }
    willSubmitForm(element, submitter) {
      return element.closest("turbo-frame") == this.element && this.shouldInterceptNavigation(element, submitter);
    }
    formSubmitted(element, submitter) {
      if (this.formSubmission) {
        this.formSubmission.stop();
      }
      this.formSubmission = new FormSubmission(this, element, submitter);
      const { fetchRequest } = this.formSubmission;
      this.prepareRequest(fetchRequest);
      this.formSubmission.start();
    }
    prepareRequest(request) {
      var _a;
      request.headers["Turbo-Frame"] = this.id;
      if ((_a = this.currentNavigationElement) === null || _a === void 0 ? void 0 : _a.hasAttribute("data-turbo-stream")) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }
    requestStarted(_request) {
      markAsBusy(this.element);
    }
    requestPreventedHandlingResponse(_request, _response) {
      this.resolveVisitPromise();
    }
    async requestSucceededWithResponse(request, response) {
      await this.loadResponse(response);
      this.resolveVisitPromise();
    }
    async requestFailedWithResponse(request, response) {
      await this.loadResponse(response);
      this.resolveVisitPromise();
    }
    requestErrored(request, error2) {
      console.error(error2);
      this.resolveVisitPromise();
    }
    requestFinished(_request) {
      clearBusyState(this.element);
    }
    formSubmissionStarted({ formElement }) {
      markAsBusy(formElement, this.findFrameElement(formElement));
    }
    formSubmissionSucceededWithResponse(formSubmission, response) {
      const frame = this.findFrameElement(formSubmission.formElement, formSubmission.submitter);
      frame.delegate.proposeVisitIfNavigatedWithAction(frame, formSubmission.formElement, formSubmission.submitter);
      frame.delegate.loadResponse(response);
      if (!formSubmission.isSafe) {
        session.clearCache();
      }
    }
    formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      this.element.delegate.loadResponse(fetchResponse);
      session.clearCache();
    }
    formSubmissionErrored(formSubmission, error2) {
      console.error(error2);
    }
    formSubmissionFinished({ formElement }) {
      clearBusyState(formElement, this.findFrameElement(formElement));
    }
    allowsImmediateRender({ element: newFrame }, options) {
      const event = dispatch("turbo:before-frame-render", {
        target: this.element,
        detail: Object.assign({ newFrame }, options),
        cancelable: true
      });
      const { defaultPrevented, detail: { render } } = event;
      if (this.view.renderer && render) {
        this.view.renderer.renderElement = render;
      }
      return !defaultPrevented;
    }
    viewRenderedSnapshot(_snapshot, _isPreview) {
    }
    preloadOnLoadLinksForView(element) {
      session.preloadOnLoadLinksForView(element);
    }
    viewInvalidated() {
    }
    willRenderFrame(currentElement, _newElement) {
      this.previousFrameElement = currentElement.cloneNode(true);
    }
    async loadFrameResponse(fetchResponse, document2) {
      const newFrameElement = await this.extractForeignFrameElement(document2.body);
      if (newFrameElement) {
        const snapshot = new Snapshot(newFrameElement);
        const renderer = new FrameRenderer(this, this.view.snapshot, snapshot, FrameRenderer.renderElement, false, false);
        if (this.view.renderPromise)
          await this.view.renderPromise;
        this.changeHistory();
        await this.view.render(renderer);
        this.complete = true;
        session.frameRendered(fetchResponse, this.element);
        session.frameLoaded(this.element);
        this.fetchResponseLoaded(fetchResponse);
      } else if (this.willHandleFrameMissingFromResponse(fetchResponse)) {
        this.handleFrameMissingFromResponse(fetchResponse);
      }
    }
    async visit(url) {
      var _a;
      const request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams(), this.element);
      (_a = this.currentFetchRequest) === null || _a === void 0 ? void 0 : _a.cancel();
      this.currentFetchRequest = request;
      return new Promise((resolve) => {
        this.resolveVisitPromise = () => {
          this.resolveVisitPromise = () => {
          };
          this.currentFetchRequest = null;
          resolve();
        };
        request.perform();
      });
    }
    navigateFrame(element, url, submitter) {
      const frame = this.findFrameElement(element, submitter);
      frame.delegate.proposeVisitIfNavigatedWithAction(frame, element, submitter);
      this.withCurrentNavigationElement(element, () => {
        frame.src = url;
      });
    }
    proposeVisitIfNavigatedWithAction(frame, element, submitter) {
      this.action = getVisitAction(submitter, element, frame);
      if (this.action) {
        const pageSnapshot = PageSnapshot.fromElement(frame).clone();
        const { visitCachedSnapshot } = frame.delegate;
        frame.delegate.fetchResponseLoaded = (fetchResponse) => {
          if (frame.src) {
            const { statusCode, redirected } = fetchResponse;
            const responseHTML = frame.ownerDocument.documentElement.outerHTML;
            const response = { statusCode, redirected, responseHTML };
            const options = {
              response,
              visitCachedSnapshot,
              willRender: false,
              updateHistory: false,
              restorationIdentifier: this.restorationIdentifier,
              snapshot: pageSnapshot
            };
            if (this.action)
              options.action = this.action;
            session.visit(frame.src, options);
          }
        };
      }
    }
    changeHistory() {
      if (this.action) {
        const method = getHistoryMethodForAction(this.action);
        session.history.update(method, expandURL(this.element.src || ""), this.restorationIdentifier);
      }
    }
    async handleUnvisitableFrameResponse(fetchResponse) {
      console.warn(`The response (${fetchResponse.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`);
      await this.visitResponse(fetchResponse.response);
    }
    willHandleFrameMissingFromResponse(fetchResponse) {
      this.element.setAttribute("complete", "");
      const response = fetchResponse.response;
      const visit2 = async (url, options = {}) => {
        if (url instanceof Response) {
          this.visitResponse(url);
        } else {
          session.visit(url, options);
        }
      };
      const event = dispatch("turbo:frame-missing", {
        target: this.element,
        detail: { response, visit: visit2 },
        cancelable: true
      });
      return !event.defaultPrevented;
    }
    handleFrameMissingFromResponse(fetchResponse) {
      this.view.missing();
      this.throwFrameMissingError(fetchResponse);
    }
    throwFrameMissingError(fetchResponse) {
      const message = `The response (${fetchResponse.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
      throw new TurboFrameMissingError(message);
    }
    async visitResponse(response) {
      const wrapped = new FetchResponse(response);
      const responseHTML = await wrapped.responseHTML;
      const { location: location2, redirected, statusCode } = wrapped;
      return session.visit(location2, { response: { redirected, statusCode, responseHTML } });
    }
    findFrameElement(element, submitter) {
      var _a;
      const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
      return (_a = getFrameElementById(id)) !== null && _a !== void 0 ? _a : this.element;
    }
    async extractForeignFrameElement(container) {
      let element;
      const id = CSS.escape(this.id);
      try {
        element = activateElement(container.querySelector(`turbo-frame#${id}`), this.sourceURL);
        if (element) {
          return element;
        }
        element = activateElement(container.querySelector(`turbo-frame[src][recurse~=${id}]`), this.sourceURL);
        if (element) {
          await element.loaded;
          return await this.extractForeignFrameElement(element);
        }
      } catch (error2) {
        console.error(error2);
        return new FrameElement();
      }
      return null;
    }
    formActionIsVisitable(form, submitter) {
      const action = getAction(form, submitter);
      return locationIsVisitable(expandURL(action), this.rootLocation);
    }
    shouldInterceptNavigation(element, submitter) {
      const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
      if (element instanceof HTMLFormElement && !this.formActionIsVisitable(element, submitter)) {
        return false;
      }
      if (!this.enabled || id == "_top") {
        return false;
      }
      if (id) {
        const frameElement = getFrameElementById(id);
        if (frameElement) {
          return !frameElement.disabled;
        }
      }
      if (!session.elementIsNavigatable(element)) {
        return false;
      }
      if (submitter && !session.elementIsNavigatable(submitter)) {
        return false;
      }
      return true;
    }
    get id() {
      return this.element.id;
    }
    get enabled() {
      return !this.element.disabled;
    }
    get sourceURL() {
      if (this.element.src) {
        return this.element.src;
      }
    }
    set sourceURL(sourceURL) {
      this.ignoringChangesToAttribute("src", () => {
        this.element.src = sourceURL !== null && sourceURL !== void 0 ? sourceURL : null;
      });
    }
    get loadingStyle() {
      return this.element.loading;
    }
    get isLoading() {
      return this.formSubmission !== void 0 || this.resolveVisitPromise() !== void 0;
    }
    get complete() {
      return this.element.hasAttribute("complete");
    }
    set complete(value) {
      this.ignoringChangesToAttribute("complete", () => {
        if (value) {
          this.element.setAttribute("complete", "");
        } else {
          this.element.removeAttribute("complete");
        }
      });
    }
    get isActive() {
      return this.element.isActive && this.connected;
    }
    get rootLocation() {
      var _a;
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const root = (_a = meta === null || meta === void 0 ? void 0 : meta.content) !== null && _a !== void 0 ? _a : "/";
      return expandURL(root);
    }
    isIgnoringChangesTo(attributeName) {
      return this.ignoredAttributes.has(attributeName);
    }
    ignoringChangesToAttribute(attributeName, callback) {
      this.ignoredAttributes.add(attributeName);
      callback();
      this.ignoredAttributes.delete(attributeName);
    }
    withCurrentNavigationElement(element, callback) {
      this.currentNavigationElement = element;
      callback();
      delete this.currentNavigationElement;
    }
  };
  function getFrameElementById(id) {
    if (id != null) {
      const element = document.getElementById(id);
      if (element instanceof FrameElement) {
        return element;
      }
    }
  }
  function activateElement(element, currentURL) {
    if (element) {
      const src = element.getAttribute("src");
      if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
        throw new Error(`Matching <turbo-frame id="${element.id}"> element has a source URL which references itself`);
      }
      if (element.ownerDocument !== document) {
        element = document.importNode(element, true);
      }
      if (element instanceof FrameElement) {
        element.connectedCallback();
        element.disconnectedCallback();
        return element;
      }
    }
  }
  var StreamElement = class extends HTMLElement {
    static async renderElement(newElement) {
      await newElement.performAction();
    }
    async connectedCallback() {
      try {
        await this.render();
      } catch (error2) {
        console.error(error2);
      } finally {
        this.disconnect();
      }
    }
    async render() {
      var _a;
      return (_a = this.renderPromise) !== null && _a !== void 0 ? _a : this.renderPromise = (async () => {
        const event = this.beforeRenderEvent;
        if (this.dispatchEvent(event)) {
          await nextAnimationFrame();
          await event.detail.render(this);
        }
      })();
    }
    disconnect() {
      try {
        this.remove();
      } catch (_a) {
      }
    }
    removeDuplicateTargetChildren() {
      this.duplicateChildren.forEach((c) => c.remove());
    }
    get duplicateChildren() {
      var _a;
      const existingChildren = this.targetElements.flatMap((e) => [...e.children]).filter((c) => !!c.id);
      const newChildrenIds = [...((_a = this.templateContent) === null || _a === void 0 ? void 0 : _a.children) || []].filter((c) => !!c.id).map((c) => c.id);
      return existingChildren.filter((c) => newChildrenIds.includes(c.id));
    }
    get performAction() {
      if (this.action) {
        const actionFunction = StreamActions[this.action];
        if (actionFunction) {
          return actionFunction;
        }
        this.raise("unknown action");
      }
      this.raise("action attribute is missing");
    }
    get targetElements() {
      if (this.target) {
        return this.targetElementsById;
      } else if (this.targets) {
        return this.targetElementsByQuery;
      } else {
        this.raise("target or targets attribute is missing");
      }
    }
    get templateContent() {
      return this.templateElement.content.cloneNode(true);
    }
    get templateElement() {
      if (this.firstElementChild === null) {
        const template = this.ownerDocument.createElement("template");
        this.appendChild(template);
        return template;
      } else if (this.firstElementChild instanceof HTMLTemplateElement) {
        return this.firstElementChild;
      }
      this.raise("first child element must be a <template> element");
    }
    get action() {
      return this.getAttribute("action");
    }
    get target() {
      return this.getAttribute("target");
    }
    get targets() {
      return this.getAttribute("targets");
    }
    raise(message) {
      throw new Error(`${this.description}: ${message}`);
    }
    get description() {
      var _a, _b;
      return (_b = ((_a = this.outerHTML.match(/<[^>]+>/)) !== null && _a !== void 0 ? _a : [])[0]) !== null && _b !== void 0 ? _b : "<turbo-stream>";
    }
    get beforeRenderEvent() {
      return new CustomEvent("turbo:before-stream-render", {
        bubbles: true,
        cancelable: true,
        detail: { newStream: this, render: StreamElement.renderElement }
      });
    }
    get targetElementsById() {
      var _a;
      const element = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.getElementById(this.target);
      if (element !== null) {
        return [element];
      } else {
        return [];
      }
    }
    get targetElementsByQuery() {
      var _a;
      const elements = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.querySelectorAll(this.targets);
      if (elements.length !== 0) {
        return Array.prototype.slice.call(elements);
      } else {
        return [];
      }
    }
  };
  var StreamSourceElement = class extends HTMLElement {
    constructor() {
      super(...arguments);
      this.streamSource = null;
    }
    connectedCallback() {
      this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src);
      connectStreamSource(this.streamSource);
    }
    disconnectedCallback() {
      if (this.streamSource) {
        disconnectStreamSource(this.streamSource);
      }
    }
    get src() {
      return this.getAttribute("src") || "";
    }
  };
  FrameElement.delegateConstructor = FrameController;
  if (customElements.get("turbo-frame") === void 0) {
    customElements.define("turbo-frame", FrameElement);
  }
  if (customElements.get("turbo-stream") === void 0) {
    customElements.define("turbo-stream", StreamElement);
  }
  if (customElements.get("turbo-stream-source") === void 0) {
    customElements.define("turbo-stream-source", StreamSourceElement);
  }
  (() => {
    let element = document.currentScript;
    if (!element)
      return;
    if (element.hasAttribute("data-turbo-suppress-warning"))
      return;
    element = element.parentElement;
    while (element) {
      if (element == document.body) {
        return console.warn(unindent`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, element.outerHTML);
      }
      element = element.parentElement;
    }
  })();
  window.Turbo = Turbo;
  start();

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable.js
  var consumer;
  async function getConsumer() {
    return consumer || setConsumer(createConsumer2().then(setConsumer));
  }
  function setConsumer(newConsumer) {
    return consumer = newConsumer;
  }
  async function createConsumer2() {
    const { createConsumer: createConsumer3 } = await Promise.resolve().then(() => (init_src(), src_exports));
    return createConsumer3();
  }
  async function subscribeTo(channel, mixin) {
    const { subscriptions } = await getConsumer();
    return subscriptions.create(channel, mixin);
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/snakeize.js
  function walk(obj) {
    if (!obj || typeof obj !== "object")
      return obj;
    if (obj instanceof Date || obj instanceof RegExp)
      return obj;
    if (Array.isArray(obj))
      return obj.map(walk);
    return Object.keys(obj).reduce(function(acc, key) {
      var camel = key[0].toLowerCase() + key.slice(1).replace(/([A-Z]+)/g, function(m, x) {
        return "_" + x.toLowerCase();
      });
      acc[camel] = walk(obj[key]);
      return acc;
    }, {});
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable_stream_source_element.js
  var TurboCableStreamSourceElement = class extends HTMLElement {
    async connectedCallback() {
      connectStreamSource(this);
      this.subscription = await subscribeTo(this.channel, {
        received: this.dispatchMessageEvent.bind(this),
        connected: this.subscriptionConnected.bind(this),
        disconnected: this.subscriptionDisconnected.bind(this)
      });
    }
    disconnectedCallback() {
      disconnectStreamSource(this);
      if (this.subscription)
        this.subscription.unsubscribe();
    }
    dispatchMessageEvent(data2) {
      const event = new MessageEvent("message", { data: data2 });
      return this.dispatchEvent(event);
    }
    subscriptionConnected() {
      this.setAttribute("connected", "");
    }
    subscriptionDisconnected() {
      this.removeAttribute("connected");
    }
    get channel() {
      const channel = this.getAttribute("channel");
      const signed_stream_name = this.getAttribute("signed-stream-name");
      return { channel, signed_stream_name, ...walk({ ...this.dataset }) };
    }
  };
  if (customElements.get("turbo-cable-stream-source") === void 0) {
    customElements.define("turbo-cable-stream-source", TurboCableStreamSourceElement);
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/fetch_requests.js
  function encodeMethodIntoRequestBody(event) {
    if (event.target instanceof HTMLFormElement) {
      const { target: form, detail: { fetchOptions } } = event;
      form.addEventListener("turbo:submit-start", ({ detail: { formSubmission: { submitter } } }) => {
        const body = isBodyInit(fetchOptions.body) ? fetchOptions.body : new URLSearchParams();
        const method = determineFetchMethod(submitter, body, form);
        if (!/get/i.test(method)) {
          if (/post/i.test(method)) {
            body.delete("_method");
          } else {
            body.set("_method", method);
          }
          fetchOptions.method = "post";
        }
      }, { once: true });
    }
  }
  function determineFetchMethod(submitter, body, form) {
    const formMethod = determineFormMethod(submitter);
    const overrideMethod = body.get("_method");
    const method = form.getAttribute("method") || "get";
    if (typeof formMethod == "string") {
      return formMethod;
    } else if (typeof overrideMethod == "string") {
      return overrideMethod;
    } else {
      return method;
    }
  }
  function determineFormMethod(submitter) {
    if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
      if (submitter.hasAttribute("formmethod")) {
        return submitter.formMethod;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function isBodyInit(body) {
    return body instanceof FormData || body instanceof URLSearchParams;
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/index.js
  addEventListener("turbo:before-fetch-request", encodeMethodIntoRequestBody);

  // node_modules/@hotwired/stimulus/dist/stimulus.js
  var EventListener = class {
    constructor(eventTarget, eventName, eventOptions) {
      this.eventTarget = eventTarget;
      this.eventName = eventName;
      this.eventOptions = eventOptions;
      this.unorderedBindings = /* @__PURE__ */ new Set();
    }
    connect() {
      this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
    }
    disconnect() {
      this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
    }
    bindingConnected(binding) {
      this.unorderedBindings.add(binding);
    }
    bindingDisconnected(binding) {
      this.unorderedBindings.delete(binding);
    }
    handleEvent(event) {
      const extendedEvent = extendEvent(event);
      for (const binding of this.bindings) {
        if (extendedEvent.immediatePropagationStopped) {
          break;
        } else {
          binding.handleEvent(extendedEvent);
        }
      }
    }
    hasBindings() {
      return this.unorderedBindings.size > 0;
    }
    get bindings() {
      return Array.from(this.unorderedBindings).sort((left, right) => {
        const leftIndex = left.index, rightIndex = right.index;
        return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
      });
    }
  };
  function extendEvent(event) {
    if ("immediatePropagationStopped" in event) {
      return event;
    } else {
      const { stopImmediatePropagation } = event;
      return Object.assign(event, {
        immediatePropagationStopped: false,
        stopImmediatePropagation() {
          this.immediatePropagationStopped = true;
          stopImmediatePropagation.call(this);
        }
      });
    }
  }
  var Dispatcher = class {
    constructor(application2) {
      this.application = application2;
      this.eventListenerMaps = /* @__PURE__ */ new Map();
      this.started = false;
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.eventListeners.forEach((eventListener) => eventListener.connect());
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.eventListeners.forEach((eventListener) => eventListener.disconnect());
      }
    }
    get eventListeners() {
      return Array.from(this.eventListenerMaps.values()).reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
    }
    bindingConnected(binding) {
      this.fetchEventListenerForBinding(binding).bindingConnected(binding);
    }
    bindingDisconnected(binding, clearEventListeners = false) {
      this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
      if (clearEventListeners)
        this.clearEventListenersForBinding(binding);
    }
    handleError(error2, message, detail = {}) {
      this.application.handleError(error2, `Error ${message}`, detail);
    }
    clearEventListenersForBinding(binding) {
      const eventListener = this.fetchEventListenerForBinding(binding);
      if (!eventListener.hasBindings()) {
        eventListener.disconnect();
        this.removeMappedEventListenerFor(binding);
      }
    }
    removeMappedEventListenerFor(binding) {
      const { eventTarget, eventName, eventOptions } = binding;
      const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
      const cacheKey = this.cacheKey(eventName, eventOptions);
      eventListenerMap.delete(cacheKey);
      if (eventListenerMap.size == 0)
        this.eventListenerMaps.delete(eventTarget);
    }
    fetchEventListenerForBinding(binding) {
      const { eventTarget, eventName, eventOptions } = binding;
      return this.fetchEventListener(eventTarget, eventName, eventOptions);
    }
    fetchEventListener(eventTarget, eventName, eventOptions) {
      const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
      const cacheKey = this.cacheKey(eventName, eventOptions);
      let eventListener = eventListenerMap.get(cacheKey);
      if (!eventListener) {
        eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
        eventListenerMap.set(cacheKey, eventListener);
      }
      return eventListener;
    }
    createEventListener(eventTarget, eventName, eventOptions) {
      const eventListener = new EventListener(eventTarget, eventName, eventOptions);
      if (this.started) {
        eventListener.connect();
      }
      return eventListener;
    }
    fetchEventListenerMapForEventTarget(eventTarget) {
      let eventListenerMap = this.eventListenerMaps.get(eventTarget);
      if (!eventListenerMap) {
        eventListenerMap = /* @__PURE__ */ new Map();
        this.eventListenerMaps.set(eventTarget, eventListenerMap);
      }
      return eventListenerMap;
    }
    cacheKey(eventName, eventOptions) {
      const parts = [eventName];
      Object.keys(eventOptions).sort().forEach((key) => {
        parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
      });
      return parts.join(":");
    }
  };
  var defaultActionDescriptorFilters = {
    stop({ event, value }) {
      if (value)
        event.stopPropagation();
      return true;
    },
    prevent({ event, value }) {
      if (value)
        event.preventDefault();
      return true;
    },
    self({ event, value, element }) {
      if (value) {
        return element === event.target;
      } else {
        return true;
      }
    }
  };
  var descriptorPattern = /^(?:(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
  function parseActionDescriptorString(descriptorString) {
    const source = descriptorString.trim();
    const matches = source.match(descriptorPattern) || [];
    let eventName = matches[1];
    let keyFilter = matches[2];
    if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
      eventName += `.${keyFilter}`;
      keyFilter = "";
    }
    return {
      eventTarget: parseEventTarget(matches[3]),
      eventName,
      eventOptions: matches[6] ? parseEventOptions(matches[6]) : {},
      identifier: matches[4],
      methodName: matches[5],
      keyFilter
    };
  }
  function parseEventTarget(eventTargetName) {
    if (eventTargetName == "window") {
      return window;
    } else if (eventTargetName == "document") {
      return document;
    }
  }
  function parseEventOptions(eventOptions) {
    return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
  }
  function stringifyEventTarget(eventTarget) {
    if (eventTarget == window) {
      return "window";
    } else if (eventTarget == document) {
      return "document";
    }
  }
  function camelize(value) {
    return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
  }
  function namespaceCamelize(value) {
    return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
  }
  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  function dasherize(value) {
    return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
  }
  function tokenize(value) {
    return value.match(/[^\s]+/g) || [];
  }
  var Action = class {
    constructor(element, index, descriptor, schema) {
      this.element = element;
      this.index = index;
      this.eventTarget = descriptor.eventTarget || element;
      this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
      this.eventOptions = descriptor.eventOptions || {};
      this.identifier = descriptor.identifier || error("missing identifier");
      this.methodName = descriptor.methodName || error("missing method name");
      this.keyFilter = descriptor.keyFilter || "";
      this.schema = schema;
    }
    static forToken(token, schema) {
      return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
    }
    toString() {
      const eventFilter = this.keyFilter ? `.${this.keyFilter}` : "";
      const eventTarget = this.eventTargetName ? `@${this.eventTargetName}` : "";
      return `${this.eventName}${eventFilter}${eventTarget}->${this.identifier}#${this.methodName}`;
    }
    isFilterTarget(event) {
      if (!this.keyFilter) {
        return false;
      }
      const filteres = this.keyFilter.split("+");
      const modifiers = ["meta", "ctrl", "alt", "shift"];
      const [meta, ctrl, alt, shift] = modifiers.map((modifier) => filteres.includes(modifier));
      if (event.metaKey !== meta || event.ctrlKey !== ctrl || event.altKey !== alt || event.shiftKey !== shift) {
        return true;
      }
      const standardFilter = filteres.filter((key) => !modifiers.includes(key))[0];
      if (!standardFilter) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(this.keyMappings, standardFilter)) {
        error(`contains unknown key filter: ${this.keyFilter}`);
      }
      return this.keyMappings[standardFilter].toLowerCase() !== event.key.toLowerCase();
    }
    get params() {
      const params = {};
      const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
      for (const { name: name2, value } of Array.from(this.element.attributes)) {
        const match = name2.match(pattern);
        const key = match && match[1];
        if (key) {
          params[camelize(key)] = typecast(value);
        }
      }
      return params;
    }
    get eventTargetName() {
      return stringifyEventTarget(this.eventTarget);
    }
    get keyMappings() {
      return this.schema.keyMappings;
    }
  };
  var defaultEventNames = {
    a: () => "click",
    button: () => "click",
    form: () => "submit",
    details: () => "toggle",
    input: (e) => e.getAttribute("type") == "submit" ? "click" : "input",
    select: () => "change",
    textarea: () => "input"
  };
  function getDefaultEventNameForElement(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName in defaultEventNames) {
      return defaultEventNames[tagName](element);
    }
  }
  function error(message) {
    throw new Error(message);
  }
  function typecast(value) {
    try {
      return JSON.parse(value);
    } catch (o_O) {
      return value;
    }
  }
  var Binding = class {
    constructor(context, action) {
      this.context = context;
      this.action = action;
    }
    get index() {
      return this.action.index;
    }
    get eventTarget() {
      return this.action.eventTarget;
    }
    get eventOptions() {
      return this.action.eventOptions;
    }
    get identifier() {
      return this.context.identifier;
    }
    handleEvent(event) {
      if (this.willBeInvokedByEvent(event) && this.applyEventModifiers(event)) {
        this.invokeWithEvent(event);
      }
    }
    get eventName() {
      return this.action.eventName;
    }
    get method() {
      const method = this.controller[this.methodName];
      if (typeof method == "function") {
        return method;
      }
      throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
    }
    applyEventModifiers(event) {
      const { element } = this.action;
      const { actionDescriptorFilters } = this.context.application;
      let passes = true;
      for (const [name2, value] of Object.entries(this.eventOptions)) {
        if (name2 in actionDescriptorFilters) {
          const filter = actionDescriptorFilters[name2];
          passes = passes && filter({ name: name2, value, event, element });
        } else {
          continue;
        }
      }
      return passes;
    }
    invokeWithEvent(event) {
      const { target, currentTarget } = event;
      try {
        const { params } = this.action;
        const actionEvent = Object.assign(event, { params });
        this.method.call(this.controller, actionEvent);
        this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
      } catch (error2) {
        const { identifier, controller, element, index } = this;
        const detail = { identifier, controller, element, index, event };
        this.context.handleError(error2, `invoking action "${this.action}"`, detail);
      }
    }
    willBeInvokedByEvent(event) {
      const eventTarget = event.target;
      if (event instanceof KeyboardEvent && this.action.isFilterTarget(event)) {
        return false;
      }
      if (this.element === eventTarget) {
        return true;
      } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
        return this.scope.containsElement(eventTarget);
      } else {
        return this.scope.containsElement(this.action.element);
      }
    }
    get controller() {
      return this.context.controller;
    }
    get methodName() {
      return this.action.methodName;
    }
    get element() {
      return this.scope.element;
    }
    get scope() {
      return this.context.scope;
    }
  };
  var ElementObserver = class {
    constructor(element, delegate) {
      this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
      this.element = element;
      this.started = false;
      this.delegate = delegate;
      this.elements = /* @__PURE__ */ new Set();
      this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.mutationObserver.observe(this.element, this.mutationObserverInit);
        this.refresh();
      }
    }
    pause(callback) {
      if (this.started) {
        this.mutationObserver.disconnect();
        this.started = false;
      }
      callback();
      if (!this.started) {
        this.mutationObserver.observe(this.element, this.mutationObserverInit);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.started = false;
      }
    }
    refresh() {
      if (this.started) {
        const matches = new Set(this.matchElementsInTree());
        for (const element of Array.from(this.elements)) {
          if (!matches.has(element)) {
            this.removeElement(element);
          }
        }
        for (const element of Array.from(matches)) {
          this.addElement(element);
        }
      }
    }
    processMutations(mutations) {
      if (this.started) {
        for (const mutation of mutations) {
          this.processMutation(mutation);
        }
      }
    }
    processMutation(mutation) {
      if (mutation.type == "attributes") {
        this.processAttributeChange(mutation.target, mutation.attributeName);
      } else if (mutation.type == "childList") {
        this.processRemovedNodes(mutation.removedNodes);
        this.processAddedNodes(mutation.addedNodes);
      }
    }
    processAttributeChange(node, attributeName) {
      const element = node;
      if (this.elements.has(element)) {
        if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
          this.delegate.elementAttributeChanged(element, attributeName);
        } else {
          this.removeElement(element);
        }
      } else if (this.matchElement(element)) {
        this.addElement(element);
      }
    }
    processRemovedNodes(nodes) {
      for (const node of Array.from(nodes)) {
        const element = this.elementFromNode(node);
        if (element) {
          this.processTree(element, this.removeElement);
        }
      }
    }
    processAddedNodes(nodes) {
      for (const node of Array.from(nodes)) {
        const element = this.elementFromNode(node);
        if (element && this.elementIsActive(element)) {
          this.processTree(element, this.addElement);
        }
      }
    }
    matchElement(element) {
      return this.delegate.matchElement(element);
    }
    matchElementsInTree(tree = this.element) {
      return this.delegate.matchElementsInTree(tree);
    }
    processTree(tree, processor) {
      for (const element of this.matchElementsInTree(tree)) {
        processor.call(this, element);
      }
    }
    elementFromNode(node) {
      if (node.nodeType == Node.ELEMENT_NODE) {
        return node;
      }
    }
    elementIsActive(element) {
      if (element.isConnected != this.element.isConnected) {
        return false;
      } else {
        return this.element.contains(element);
      }
    }
    addElement(element) {
      if (!this.elements.has(element)) {
        if (this.elementIsActive(element)) {
          this.elements.add(element);
          if (this.delegate.elementMatched) {
            this.delegate.elementMatched(element);
          }
        }
      }
    }
    removeElement(element) {
      if (this.elements.has(element)) {
        this.elements.delete(element);
        if (this.delegate.elementUnmatched) {
          this.delegate.elementUnmatched(element);
        }
      }
    }
  };
  var AttributeObserver = class {
    constructor(element, attributeName, delegate) {
      this.attributeName = attributeName;
      this.delegate = delegate;
      this.elementObserver = new ElementObserver(element, this);
    }
    get element() {
      return this.elementObserver.element;
    }
    get selector() {
      return `[${this.attributeName}]`;
    }
    start() {
      this.elementObserver.start();
    }
    pause(callback) {
      this.elementObserver.pause(callback);
    }
    stop() {
      this.elementObserver.stop();
    }
    refresh() {
      this.elementObserver.refresh();
    }
    get started() {
      return this.elementObserver.started;
    }
    matchElement(element) {
      return element.hasAttribute(this.attributeName);
    }
    matchElementsInTree(tree) {
      const match = this.matchElement(tree) ? [tree] : [];
      const matches = Array.from(tree.querySelectorAll(this.selector));
      return match.concat(matches);
    }
    elementMatched(element) {
      if (this.delegate.elementMatchedAttribute) {
        this.delegate.elementMatchedAttribute(element, this.attributeName);
      }
    }
    elementUnmatched(element) {
      if (this.delegate.elementUnmatchedAttribute) {
        this.delegate.elementUnmatchedAttribute(element, this.attributeName);
      }
    }
    elementAttributeChanged(element, attributeName) {
      if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
        this.delegate.elementAttributeValueChanged(element, attributeName);
      }
    }
  };
  function add(map, key, value) {
    fetch2(map, key).add(value);
  }
  function del(map, key, value) {
    fetch2(map, key).delete(value);
    prune(map, key);
  }
  function fetch2(map, key) {
    let values = map.get(key);
    if (!values) {
      values = /* @__PURE__ */ new Set();
      map.set(key, values);
    }
    return values;
  }
  function prune(map, key) {
    const values = map.get(key);
    if (values != null && values.size == 0) {
      map.delete(key);
    }
  }
  var Multimap = class {
    constructor() {
      this.valuesByKey = /* @__PURE__ */ new Map();
    }
    get keys() {
      return Array.from(this.valuesByKey.keys());
    }
    get values() {
      const sets = Array.from(this.valuesByKey.values());
      return sets.reduce((values, set) => values.concat(Array.from(set)), []);
    }
    get size() {
      const sets = Array.from(this.valuesByKey.values());
      return sets.reduce((size, set) => size + set.size, 0);
    }
    add(key, value) {
      add(this.valuesByKey, key, value);
    }
    delete(key, value) {
      del(this.valuesByKey, key, value);
    }
    has(key, value) {
      const values = this.valuesByKey.get(key);
      return values != null && values.has(value);
    }
    hasKey(key) {
      return this.valuesByKey.has(key);
    }
    hasValue(value) {
      const sets = Array.from(this.valuesByKey.values());
      return sets.some((set) => set.has(value));
    }
    getValuesForKey(key) {
      const values = this.valuesByKey.get(key);
      return values ? Array.from(values) : [];
    }
    getKeysForValue(value) {
      return Array.from(this.valuesByKey).filter(([_key, values]) => values.has(value)).map(([key, _values]) => key);
    }
  };
  var SelectorObserver = class {
    constructor(element, selector, delegate, details = {}) {
      this.selector = selector;
      this.details = details;
      this.elementObserver = new ElementObserver(element, this);
      this.delegate = delegate;
      this.matchesByElement = new Multimap();
    }
    get started() {
      return this.elementObserver.started;
    }
    start() {
      this.elementObserver.start();
    }
    pause(callback) {
      this.elementObserver.pause(callback);
    }
    stop() {
      this.elementObserver.stop();
    }
    refresh() {
      this.elementObserver.refresh();
    }
    get element() {
      return this.elementObserver.element;
    }
    matchElement(element) {
      const matches = element.matches(this.selector);
      if (this.delegate.selectorMatchElement) {
        return matches && this.delegate.selectorMatchElement(element, this.details);
      }
      return matches;
    }
    matchElementsInTree(tree) {
      const match = this.matchElement(tree) ? [tree] : [];
      const matches = Array.from(tree.querySelectorAll(this.selector)).filter((match2) => this.matchElement(match2));
      return match.concat(matches);
    }
    elementMatched(element) {
      this.selectorMatched(element);
    }
    elementUnmatched(element) {
      this.selectorUnmatched(element);
    }
    elementAttributeChanged(element, _attributeName) {
      const matches = this.matchElement(element);
      const matchedBefore = this.matchesByElement.has(this.selector, element);
      if (!matches && matchedBefore) {
        this.selectorUnmatched(element);
      }
    }
    selectorMatched(element) {
      if (this.delegate.selectorMatched) {
        this.delegate.selectorMatched(element, this.selector, this.details);
        this.matchesByElement.add(this.selector, element);
      }
    }
    selectorUnmatched(element) {
      this.delegate.selectorUnmatched(element, this.selector, this.details);
      this.matchesByElement.delete(this.selector, element);
    }
  };
  var StringMapObserver = class {
    constructor(element, delegate) {
      this.element = element;
      this.delegate = delegate;
      this.started = false;
      this.stringMap = /* @__PURE__ */ new Map();
      this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
        this.refresh();
      }
    }
    stop() {
      if (this.started) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.started = false;
      }
    }
    refresh() {
      if (this.started) {
        for (const attributeName of this.knownAttributeNames) {
          this.refreshAttribute(attributeName, null);
        }
      }
    }
    processMutations(mutations) {
      if (this.started) {
        for (const mutation of mutations) {
          this.processMutation(mutation);
        }
      }
    }
    processMutation(mutation) {
      const attributeName = mutation.attributeName;
      if (attributeName) {
        this.refreshAttribute(attributeName, mutation.oldValue);
      }
    }
    refreshAttribute(attributeName, oldValue) {
      const key = this.delegate.getStringMapKeyForAttribute(attributeName);
      if (key != null) {
        if (!this.stringMap.has(attributeName)) {
          this.stringMapKeyAdded(key, attributeName);
        }
        const value = this.element.getAttribute(attributeName);
        if (this.stringMap.get(attributeName) != value) {
          this.stringMapValueChanged(value, key, oldValue);
        }
        if (value == null) {
          const oldValue2 = this.stringMap.get(attributeName);
          this.stringMap.delete(attributeName);
          if (oldValue2)
            this.stringMapKeyRemoved(key, attributeName, oldValue2);
        } else {
          this.stringMap.set(attributeName, value);
        }
      }
    }
    stringMapKeyAdded(key, attributeName) {
      if (this.delegate.stringMapKeyAdded) {
        this.delegate.stringMapKeyAdded(key, attributeName);
      }
    }
    stringMapValueChanged(value, key, oldValue) {
      if (this.delegate.stringMapValueChanged) {
        this.delegate.stringMapValueChanged(value, key, oldValue);
      }
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
      if (this.delegate.stringMapKeyRemoved) {
        this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
      }
    }
    get knownAttributeNames() {
      return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
    }
    get currentAttributeNames() {
      return Array.from(this.element.attributes).map((attribute) => attribute.name);
    }
    get recordedAttributeNames() {
      return Array.from(this.stringMap.keys());
    }
  };
  var TokenListObserver = class {
    constructor(element, attributeName, delegate) {
      this.attributeObserver = new AttributeObserver(element, attributeName, this);
      this.delegate = delegate;
      this.tokensByElement = new Multimap();
    }
    get started() {
      return this.attributeObserver.started;
    }
    start() {
      this.attributeObserver.start();
    }
    pause(callback) {
      this.attributeObserver.pause(callback);
    }
    stop() {
      this.attributeObserver.stop();
    }
    refresh() {
      this.attributeObserver.refresh();
    }
    get element() {
      return this.attributeObserver.element;
    }
    get attributeName() {
      return this.attributeObserver.attributeName;
    }
    elementMatchedAttribute(element) {
      this.tokensMatched(this.readTokensForElement(element));
    }
    elementAttributeValueChanged(element) {
      const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
      this.tokensUnmatched(unmatchedTokens);
      this.tokensMatched(matchedTokens);
    }
    elementUnmatchedAttribute(element) {
      this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
    }
    tokensMatched(tokens) {
      tokens.forEach((token) => this.tokenMatched(token));
    }
    tokensUnmatched(tokens) {
      tokens.forEach((token) => this.tokenUnmatched(token));
    }
    tokenMatched(token) {
      this.delegate.tokenMatched(token);
      this.tokensByElement.add(token.element, token);
    }
    tokenUnmatched(token) {
      this.delegate.tokenUnmatched(token);
      this.tokensByElement.delete(token.element, token);
    }
    refreshTokensForElement(element) {
      const previousTokens = this.tokensByElement.getValuesForKey(element);
      const currentTokens = this.readTokensForElement(element);
      const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
      if (firstDifferingIndex == -1) {
        return [[], []];
      } else {
        return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
      }
    }
    readTokensForElement(element) {
      const attributeName = this.attributeName;
      const tokenString = element.getAttribute(attributeName) || "";
      return parseTokenString(tokenString, element, attributeName);
    }
  };
  function parseTokenString(tokenString, element, attributeName) {
    return tokenString.trim().split(/\s+/).filter((content) => content.length).map((content, index) => ({ element, attributeName, content, index }));
  }
  function zip(left, right) {
    const length = Math.max(left.length, right.length);
    return Array.from({ length }, (_, index) => [left[index], right[index]]);
  }
  function tokensAreEqual(left, right) {
    return left && right && left.index == right.index && left.content == right.content;
  }
  var ValueListObserver = class {
    constructor(element, attributeName, delegate) {
      this.tokenListObserver = new TokenListObserver(element, attributeName, this);
      this.delegate = delegate;
      this.parseResultsByToken = /* @__PURE__ */ new WeakMap();
      this.valuesByTokenByElement = /* @__PURE__ */ new WeakMap();
    }
    get started() {
      return this.tokenListObserver.started;
    }
    start() {
      this.tokenListObserver.start();
    }
    stop() {
      this.tokenListObserver.stop();
    }
    refresh() {
      this.tokenListObserver.refresh();
    }
    get element() {
      return this.tokenListObserver.element;
    }
    get attributeName() {
      return this.tokenListObserver.attributeName;
    }
    tokenMatched(token) {
      const { element } = token;
      const { value } = this.fetchParseResultForToken(token);
      if (value) {
        this.fetchValuesByTokenForElement(element).set(token, value);
        this.delegate.elementMatchedValue(element, value);
      }
    }
    tokenUnmatched(token) {
      const { element } = token;
      const { value } = this.fetchParseResultForToken(token);
      if (value) {
        this.fetchValuesByTokenForElement(element).delete(token);
        this.delegate.elementUnmatchedValue(element, value);
      }
    }
    fetchParseResultForToken(token) {
      let parseResult = this.parseResultsByToken.get(token);
      if (!parseResult) {
        parseResult = this.parseToken(token);
        this.parseResultsByToken.set(token, parseResult);
      }
      return parseResult;
    }
    fetchValuesByTokenForElement(element) {
      let valuesByToken = this.valuesByTokenByElement.get(element);
      if (!valuesByToken) {
        valuesByToken = /* @__PURE__ */ new Map();
        this.valuesByTokenByElement.set(element, valuesByToken);
      }
      return valuesByToken;
    }
    parseToken(token) {
      try {
        const value = this.delegate.parseValueForToken(token);
        return { value };
      } catch (error2) {
        return { error: error2 };
      }
    }
  };
  var BindingObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.bindingsByAction = /* @__PURE__ */ new Map();
    }
    start() {
      if (!this.valueListObserver) {
        this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
        this.valueListObserver.start();
      }
    }
    stop() {
      if (this.valueListObserver) {
        this.valueListObserver.stop();
        delete this.valueListObserver;
        this.disconnectAllActions();
      }
    }
    get element() {
      return this.context.element;
    }
    get identifier() {
      return this.context.identifier;
    }
    get actionAttribute() {
      return this.schema.actionAttribute;
    }
    get schema() {
      return this.context.schema;
    }
    get bindings() {
      return Array.from(this.bindingsByAction.values());
    }
    connectAction(action) {
      const binding = new Binding(this.context, action);
      this.bindingsByAction.set(action, binding);
      this.delegate.bindingConnected(binding);
    }
    disconnectAction(action) {
      const binding = this.bindingsByAction.get(action);
      if (binding) {
        this.bindingsByAction.delete(action);
        this.delegate.bindingDisconnected(binding);
      }
    }
    disconnectAllActions() {
      this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding, true));
      this.bindingsByAction.clear();
    }
    parseValueForToken(token) {
      const action = Action.forToken(token, this.schema);
      if (action.identifier == this.identifier) {
        return action;
      }
    }
    elementMatchedValue(element, action) {
      this.connectAction(action);
    }
    elementUnmatchedValue(element, action) {
      this.disconnectAction(action);
    }
  };
  var ValueObserver = class {
    constructor(context, receiver) {
      this.context = context;
      this.receiver = receiver;
      this.stringMapObserver = new StringMapObserver(this.element, this);
      this.valueDescriptorMap = this.controller.valueDescriptorMap;
    }
    start() {
      this.stringMapObserver.start();
      this.invokeChangedCallbacksForDefaultValues();
    }
    stop() {
      this.stringMapObserver.stop();
    }
    get element() {
      return this.context.element;
    }
    get controller() {
      return this.context.controller;
    }
    getStringMapKeyForAttribute(attributeName) {
      if (attributeName in this.valueDescriptorMap) {
        return this.valueDescriptorMap[attributeName].name;
      }
    }
    stringMapKeyAdded(key, attributeName) {
      const descriptor = this.valueDescriptorMap[attributeName];
      if (!this.hasValue(key)) {
        this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
      }
    }
    stringMapValueChanged(value, name2, oldValue) {
      const descriptor = this.valueDescriptorNameMap[name2];
      if (value === null)
        return;
      if (oldValue === null) {
        oldValue = descriptor.writer(descriptor.defaultValue);
      }
      this.invokeChangedCallback(name2, value, oldValue);
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
      const descriptor = this.valueDescriptorNameMap[key];
      if (this.hasValue(key)) {
        this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
      } else {
        this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
      }
    }
    invokeChangedCallbacksForDefaultValues() {
      for (const { key, name: name2, defaultValue, writer } of this.valueDescriptors) {
        if (defaultValue != void 0 && !this.controller.data.has(key)) {
          this.invokeChangedCallback(name2, writer(defaultValue), void 0);
        }
      }
    }
    invokeChangedCallback(name2, rawValue, rawOldValue) {
      const changedMethodName = `${name2}Changed`;
      const changedMethod = this.receiver[changedMethodName];
      if (typeof changedMethod == "function") {
        const descriptor = this.valueDescriptorNameMap[name2];
        try {
          const value = descriptor.reader(rawValue);
          let oldValue = rawOldValue;
          if (rawOldValue) {
            oldValue = descriptor.reader(rawOldValue);
          }
          changedMethod.call(this.receiver, value, oldValue);
        } catch (error2) {
          if (error2 instanceof TypeError) {
            error2.message = `Stimulus Value "${this.context.identifier}.${descriptor.name}" - ${error2.message}`;
          }
          throw error2;
        }
      }
    }
    get valueDescriptors() {
      const { valueDescriptorMap } = this;
      return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
    }
    get valueDescriptorNameMap() {
      const descriptors = {};
      Object.keys(this.valueDescriptorMap).forEach((key) => {
        const descriptor = this.valueDescriptorMap[key];
        descriptors[descriptor.name] = descriptor;
      });
      return descriptors;
    }
    hasValue(attributeName) {
      const descriptor = this.valueDescriptorNameMap[attributeName];
      const hasMethodName = `has${capitalize(descriptor.name)}`;
      return this.receiver[hasMethodName];
    }
  };
  var TargetObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.targetsByName = new Multimap();
    }
    start() {
      if (!this.tokenListObserver) {
        this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
        this.tokenListObserver.start();
      }
    }
    stop() {
      if (this.tokenListObserver) {
        this.disconnectAllTargets();
        this.tokenListObserver.stop();
        delete this.tokenListObserver;
      }
    }
    tokenMatched({ element, content: name2 }) {
      if (this.scope.containsElement(element)) {
        this.connectTarget(element, name2);
      }
    }
    tokenUnmatched({ element, content: name2 }) {
      this.disconnectTarget(element, name2);
    }
    connectTarget(element, name2) {
      var _a;
      if (!this.targetsByName.has(name2, element)) {
        this.targetsByName.add(name2, element);
        (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name2));
      }
    }
    disconnectTarget(element, name2) {
      var _a;
      if (this.targetsByName.has(name2, element)) {
        this.targetsByName.delete(name2, element);
        (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name2));
      }
    }
    disconnectAllTargets() {
      for (const name2 of this.targetsByName.keys) {
        for (const element of this.targetsByName.getValuesForKey(name2)) {
          this.disconnectTarget(element, name2);
        }
      }
    }
    get attributeName() {
      return `data-${this.context.identifier}-target`;
    }
    get element() {
      return this.context.element;
    }
    get scope() {
      return this.context.scope;
    }
  };
  function readInheritableStaticArrayValues(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return Array.from(ancestors.reduce((values, constructor2) => {
      getOwnStaticArrayValues(constructor2, propertyName).forEach((name2) => values.add(name2));
      return values;
    }, /* @__PURE__ */ new Set()));
  }
  function readInheritableStaticObjectPairs(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return ancestors.reduce((pairs, constructor2) => {
      pairs.push(...getOwnStaticObjectPairs(constructor2, propertyName));
      return pairs;
    }, []);
  }
  function getAncestorsForConstructor(constructor) {
    const ancestors = [];
    while (constructor) {
      ancestors.push(constructor);
      constructor = Object.getPrototypeOf(constructor);
    }
    return ancestors.reverse();
  }
  function getOwnStaticArrayValues(constructor, propertyName) {
    const definition = constructor[propertyName];
    return Array.isArray(definition) ? definition : [];
  }
  function getOwnStaticObjectPairs(constructor, propertyName) {
    const definition = constructor[propertyName];
    return definition ? Object.keys(definition).map((key) => [key, definition[key]]) : [];
  }
  var OutletObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.outletsByName = new Multimap();
      this.outletElementsByName = new Multimap();
      this.selectorObserverMap = /* @__PURE__ */ new Map();
    }
    start() {
      if (this.selectorObserverMap.size === 0) {
        this.outletDefinitions.forEach((outletName) => {
          const selector = this.selector(outletName);
          const details = { outletName };
          if (selector) {
            this.selectorObserverMap.set(outletName, new SelectorObserver(document.body, selector, this, details));
          }
        });
        this.selectorObserverMap.forEach((observer) => observer.start());
      }
      this.dependentContexts.forEach((context) => context.refresh());
    }
    stop() {
      if (this.selectorObserverMap.size > 0) {
        this.disconnectAllOutlets();
        this.selectorObserverMap.forEach((observer) => observer.stop());
        this.selectorObserverMap.clear();
      }
    }
    refresh() {
      this.selectorObserverMap.forEach((observer) => observer.refresh());
    }
    selectorMatched(element, _selector, { outletName }) {
      const outlet = this.getOutlet(element, outletName);
      if (outlet) {
        this.connectOutlet(outlet, element, outletName);
      }
    }
    selectorUnmatched(element, _selector, { outletName }) {
      const outlet = this.getOutletFromMap(element, outletName);
      if (outlet) {
        this.disconnectOutlet(outlet, element, outletName);
      }
    }
    selectorMatchElement(element, { outletName }) {
      return this.hasOutlet(element, outletName) && element.matches(`[${this.context.application.schema.controllerAttribute}~=${outletName}]`);
    }
    connectOutlet(outlet, element, outletName) {
      var _a;
      if (!this.outletElementsByName.has(outletName, element)) {
        this.outletsByName.add(outletName, outlet);
        this.outletElementsByName.add(outletName, element);
        (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletConnected(outlet, element, outletName));
      }
    }
    disconnectOutlet(outlet, element, outletName) {
      var _a;
      if (this.outletElementsByName.has(outletName, element)) {
        this.outletsByName.delete(outletName, outlet);
        this.outletElementsByName.delete(outletName, element);
        (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletDisconnected(outlet, element, outletName));
      }
    }
    disconnectAllOutlets() {
      for (const outletName of this.outletElementsByName.keys) {
        for (const element of this.outletElementsByName.getValuesForKey(outletName)) {
          for (const outlet of this.outletsByName.getValuesForKey(outletName)) {
            this.disconnectOutlet(outlet, element, outletName);
          }
        }
      }
    }
    selector(outletName) {
      return this.scope.outlets.getSelectorForOutletName(outletName);
    }
    get outletDependencies() {
      const dependencies = new Multimap();
      this.router.modules.forEach((module2) => {
        const constructor = module2.definition.controllerConstructor;
        const outlets = readInheritableStaticArrayValues(constructor, "outlets");
        outlets.forEach((outlet) => dependencies.add(outlet, module2.identifier));
      });
      return dependencies;
    }
    get outletDefinitions() {
      return this.outletDependencies.getKeysForValue(this.identifier);
    }
    get dependentControllerIdentifiers() {
      return this.outletDependencies.getValuesForKey(this.identifier);
    }
    get dependentContexts() {
      const identifiers = this.dependentControllerIdentifiers;
      return this.router.contexts.filter((context) => identifiers.includes(context.identifier));
    }
    hasOutlet(element, outletName) {
      return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
    }
    getOutlet(element, outletName) {
      return this.application.getControllerForElementAndIdentifier(element, outletName);
    }
    getOutletFromMap(element, outletName) {
      return this.outletsByName.getValuesForKey(outletName).find((outlet) => outlet.element === element);
    }
    get scope() {
      return this.context.scope;
    }
    get identifier() {
      return this.context.identifier;
    }
    get application() {
      return this.context.application;
    }
    get router() {
      return this.application.router;
    }
  };
  var Context = class {
    constructor(module2, scope) {
      this.logDebugActivity = (functionName, detail = {}) => {
        const { identifier, controller, element } = this;
        detail = Object.assign({ identifier, controller, element }, detail);
        this.application.logDebugActivity(this.identifier, functionName, detail);
      };
      this.module = module2;
      this.scope = scope;
      this.controller = new module2.controllerConstructor(this);
      this.bindingObserver = new BindingObserver(this, this.dispatcher);
      this.valueObserver = new ValueObserver(this, this.controller);
      this.targetObserver = new TargetObserver(this, this);
      this.outletObserver = new OutletObserver(this, this);
      try {
        this.controller.initialize();
        this.logDebugActivity("initialize");
      } catch (error2) {
        this.handleError(error2, "initializing controller");
      }
    }
    connect() {
      this.bindingObserver.start();
      this.valueObserver.start();
      this.targetObserver.start();
      this.outletObserver.start();
      try {
        this.controller.connect();
        this.logDebugActivity("connect");
      } catch (error2) {
        this.handleError(error2, "connecting controller");
      }
    }
    refresh() {
      this.outletObserver.refresh();
    }
    disconnect() {
      try {
        this.controller.disconnect();
        this.logDebugActivity("disconnect");
      } catch (error2) {
        this.handleError(error2, "disconnecting controller");
      }
      this.outletObserver.stop();
      this.targetObserver.stop();
      this.valueObserver.stop();
      this.bindingObserver.stop();
    }
    get application() {
      return this.module.application;
    }
    get identifier() {
      return this.module.identifier;
    }
    get schema() {
      return this.application.schema;
    }
    get dispatcher() {
      return this.application.dispatcher;
    }
    get element() {
      return this.scope.element;
    }
    get parentElement() {
      return this.element.parentElement;
    }
    handleError(error2, message, detail = {}) {
      const { identifier, controller, element } = this;
      detail = Object.assign({ identifier, controller, element }, detail);
      this.application.handleError(error2, `Error ${message}`, detail);
    }
    targetConnected(element, name2) {
      this.invokeControllerMethod(`${name2}TargetConnected`, element);
    }
    targetDisconnected(element, name2) {
      this.invokeControllerMethod(`${name2}TargetDisconnected`, element);
    }
    outletConnected(outlet, element, name2) {
      this.invokeControllerMethod(`${namespaceCamelize(name2)}OutletConnected`, outlet, element);
    }
    outletDisconnected(outlet, element, name2) {
      this.invokeControllerMethod(`${namespaceCamelize(name2)}OutletDisconnected`, outlet, element);
    }
    invokeControllerMethod(methodName, ...args) {
      const controller = this.controller;
      if (typeof controller[methodName] == "function") {
        controller[methodName](...args);
      }
    }
  };
  function bless(constructor) {
    return shadow(constructor, getBlessedProperties(constructor));
  }
  function shadow(constructor, properties) {
    const shadowConstructor = extend2(constructor);
    const shadowProperties = getShadowProperties(constructor.prototype, properties);
    Object.defineProperties(shadowConstructor.prototype, shadowProperties);
    return shadowConstructor;
  }
  function getBlessedProperties(constructor) {
    const blessings = readInheritableStaticArrayValues(constructor, "blessings");
    return blessings.reduce((blessedProperties, blessing) => {
      const properties = blessing(constructor);
      for (const key in properties) {
        const descriptor = blessedProperties[key] || {};
        blessedProperties[key] = Object.assign(descriptor, properties[key]);
      }
      return blessedProperties;
    }, {});
  }
  function getShadowProperties(prototype, properties) {
    return getOwnKeys(properties).reduce((shadowProperties, key) => {
      const descriptor = getShadowedDescriptor(prototype, properties, key);
      if (descriptor) {
        Object.assign(shadowProperties, { [key]: descriptor });
      }
      return shadowProperties;
    }, {});
  }
  function getShadowedDescriptor(prototype, properties, key) {
    const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
    const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
    if (!shadowedByValue) {
      const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
      if (shadowingDescriptor) {
        descriptor.get = shadowingDescriptor.get || descriptor.get;
        descriptor.set = shadowingDescriptor.set || descriptor.set;
      }
      return descriptor;
    }
  }
  var getOwnKeys = (() => {
    if (typeof Object.getOwnPropertySymbols == "function") {
      return (object) => [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
    } else {
      return Object.getOwnPropertyNames;
    }
  })();
  var extend2 = (() => {
    function extendWithReflect(constructor) {
      function extended() {
        return Reflect.construct(constructor, arguments, new.target);
      }
      extended.prototype = Object.create(constructor.prototype, {
        constructor: { value: extended }
      });
      Reflect.setPrototypeOf(extended, constructor);
      return extended;
    }
    function testReflectExtension() {
      const a = function() {
        this.a.call(this);
      };
      const b = extendWithReflect(a);
      b.prototype.a = function() {
      };
      return new b();
    }
    try {
      testReflectExtension();
      return extendWithReflect;
    } catch (error2) {
      return (constructor) => class extended extends constructor {
      };
    }
  })();
  function blessDefinition(definition) {
    return {
      identifier: definition.identifier,
      controllerConstructor: bless(definition.controllerConstructor)
    };
  }
  var Module = class {
    constructor(application2, definition) {
      this.application = application2;
      this.definition = blessDefinition(definition);
      this.contextsByScope = /* @__PURE__ */ new WeakMap();
      this.connectedContexts = /* @__PURE__ */ new Set();
    }
    get identifier() {
      return this.definition.identifier;
    }
    get controllerConstructor() {
      return this.definition.controllerConstructor;
    }
    get contexts() {
      return Array.from(this.connectedContexts);
    }
    connectContextForScope(scope) {
      const context = this.fetchContextForScope(scope);
      this.connectedContexts.add(context);
      context.connect();
    }
    disconnectContextForScope(scope) {
      const context = this.contextsByScope.get(scope);
      if (context) {
        this.connectedContexts.delete(context);
        context.disconnect();
      }
    }
    fetchContextForScope(scope) {
      let context = this.contextsByScope.get(scope);
      if (!context) {
        context = new Context(this, scope);
        this.contextsByScope.set(scope, context);
      }
      return context;
    }
  };
  var ClassMap = class {
    constructor(scope) {
      this.scope = scope;
    }
    has(name2) {
      return this.data.has(this.getDataKey(name2));
    }
    get(name2) {
      return this.getAll(name2)[0];
    }
    getAll(name2) {
      const tokenString = this.data.get(this.getDataKey(name2)) || "";
      return tokenize(tokenString);
    }
    getAttributeName(name2) {
      return this.data.getAttributeNameForKey(this.getDataKey(name2));
    }
    getDataKey(name2) {
      return `${name2}-class`;
    }
    get data() {
      return this.scope.data;
    }
  };
  var DataMap = class {
    constructor(scope) {
      this.scope = scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get(key) {
      const name2 = this.getAttributeNameForKey(key);
      return this.element.getAttribute(name2);
    }
    set(key, value) {
      const name2 = this.getAttributeNameForKey(key);
      this.element.setAttribute(name2, value);
      return this.get(key);
    }
    has(key) {
      const name2 = this.getAttributeNameForKey(key);
      return this.element.hasAttribute(name2);
    }
    delete(key) {
      if (this.has(key)) {
        const name2 = this.getAttributeNameForKey(key);
        this.element.removeAttribute(name2);
        return true;
      } else {
        return false;
      }
    }
    getAttributeNameForKey(key) {
      return `data-${this.identifier}-${dasherize(key)}`;
    }
  };
  var Guide = class {
    constructor(logger) {
      this.warnedKeysByObject = /* @__PURE__ */ new WeakMap();
      this.logger = logger;
    }
    warn(object, key, message) {
      let warnedKeys = this.warnedKeysByObject.get(object);
      if (!warnedKeys) {
        warnedKeys = /* @__PURE__ */ new Set();
        this.warnedKeysByObject.set(object, warnedKeys);
      }
      if (!warnedKeys.has(key)) {
        warnedKeys.add(key);
        this.logger.warn(message, object);
      }
    }
  };
  function attributeValueContainsToken(attributeName, token) {
    return `[${attributeName}~="${token}"]`;
  }
  var TargetSet = class {
    constructor(scope) {
      this.scope = scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get schema() {
      return this.scope.schema;
    }
    has(targetName) {
      return this.find(targetName) != null;
    }
    find(...targetNames) {
      return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), void 0);
    }
    findAll(...targetNames) {
      return targetNames.reduce((targets, targetName) => [
        ...targets,
        ...this.findAllTargets(targetName),
        ...this.findAllLegacyTargets(targetName)
      ], []);
    }
    findTarget(targetName) {
      const selector = this.getSelectorForTargetName(targetName);
      return this.scope.findElement(selector);
    }
    findAllTargets(targetName) {
      const selector = this.getSelectorForTargetName(targetName);
      return this.scope.findAllElements(selector);
    }
    getSelectorForTargetName(targetName) {
      const attributeName = this.schema.targetAttributeForScope(this.identifier);
      return attributeValueContainsToken(attributeName, targetName);
    }
    findLegacyTarget(targetName) {
      const selector = this.getLegacySelectorForTargetName(targetName);
      return this.deprecate(this.scope.findElement(selector), targetName);
    }
    findAllLegacyTargets(targetName) {
      const selector = this.getLegacySelectorForTargetName(targetName);
      return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
    }
    getLegacySelectorForTargetName(targetName) {
      const targetDescriptor = `${this.identifier}.${targetName}`;
      return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
    }
    deprecate(element, targetName) {
      if (element) {
        const { identifier } = this;
        const attributeName = this.schema.targetAttribute;
        const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
        this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
      }
      return element;
    }
    get guide() {
      return this.scope.guide;
    }
  };
  var OutletSet = class {
    constructor(scope, controllerElement) {
      this.scope = scope;
      this.controllerElement = controllerElement;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get schema() {
      return this.scope.schema;
    }
    has(outletName) {
      return this.find(outletName) != null;
    }
    find(...outletNames) {
      return outletNames.reduce((outlet, outletName) => outlet || this.findOutlet(outletName), void 0);
    }
    findAll(...outletNames) {
      return outletNames.reduce((outlets, outletName) => [...outlets, ...this.findAllOutlets(outletName)], []);
    }
    getSelectorForOutletName(outletName) {
      const attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
      return this.controllerElement.getAttribute(attributeName);
    }
    findOutlet(outletName) {
      const selector = this.getSelectorForOutletName(outletName);
      if (selector)
        return this.findElement(selector, outletName);
    }
    findAllOutlets(outletName) {
      const selector = this.getSelectorForOutletName(outletName);
      return selector ? this.findAllElements(selector, outletName) : [];
    }
    findElement(selector, outletName) {
      const elements = this.scope.queryElements(selector);
      return elements.filter((element) => this.matchesElement(element, selector, outletName))[0];
    }
    findAllElements(selector, outletName) {
      const elements = this.scope.queryElements(selector);
      return elements.filter((element) => this.matchesElement(element, selector, outletName));
    }
    matchesElement(element, selector, outletName) {
      const controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
      return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
    }
  };
  var Scope = class {
    constructor(schema, element, identifier, logger) {
      this.targets = new TargetSet(this);
      this.classes = new ClassMap(this);
      this.data = new DataMap(this);
      this.containsElement = (element2) => {
        return element2.closest(this.controllerSelector) === this.element;
      };
      this.schema = schema;
      this.element = element;
      this.identifier = identifier;
      this.guide = new Guide(logger);
      this.outlets = new OutletSet(this.documentScope, element);
    }
    findElement(selector) {
      return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
    }
    findAllElements(selector) {
      return [
        ...this.element.matches(selector) ? [this.element] : [],
        ...this.queryElements(selector).filter(this.containsElement)
      ];
    }
    queryElements(selector) {
      return Array.from(this.element.querySelectorAll(selector));
    }
    get controllerSelector() {
      return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
    }
    get isDocumentScope() {
      return this.element === document.documentElement;
    }
    get documentScope() {
      return this.isDocumentScope ? this : new Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
    }
  };
  var ScopeObserver = class {
    constructor(element, schema, delegate) {
      this.element = element;
      this.schema = schema;
      this.delegate = delegate;
      this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
      this.scopesByIdentifierByElement = /* @__PURE__ */ new WeakMap();
      this.scopeReferenceCounts = /* @__PURE__ */ new WeakMap();
    }
    start() {
      this.valueListObserver.start();
    }
    stop() {
      this.valueListObserver.stop();
    }
    get controllerAttribute() {
      return this.schema.controllerAttribute;
    }
    parseValueForToken(token) {
      const { element, content: identifier } = token;
      const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
      let scope = scopesByIdentifier.get(identifier);
      if (!scope) {
        scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
        scopesByIdentifier.set(identifier, scope);
      }
      return scope;
    }
    elementMatchedValue(element, value) {
      const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
      this.scopeReferenceCounts.set(value, referenceCount);
      if (referenceCount == 1) {
        this.delegate.scopeConnected(value);
      }
    }
    elementUnmatchedValue(element, value) {
      const referenceCount = this.scopeReferenceCounts.get(value);
      if (referenceCount) {
        this.scopeReferenceCounts.set(value, referenceCount - 1);
        if (referenceCount == 1) {
          this.delegate.scopeDisconnected(value);
        }
      }
    }
    fetchScopesByIdentifierForElement(element) {
      let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
      if (!scopesByIdentifier) {
        scopesByIdentifier = /* @__PURE__ */ new Map();
        this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
      }
      return scopesByIdentifier;
    }
  };
  var Router = class {
    constructor(application2) {
      this.application = application2;
      this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
      this.scopesByIdentifier = new Multimap();
      this.modulesByIdentifier = /* @__PURE__ */ new Map();
    }
    get element() {
      return this.application.element;
    }
    get schema() {
      return this.application.schema;
    }
    get logger() {
      return this.application.logger;
    }
    get controllerAttribute() {
      return this.schema.controllerAttribute;
    }
    get modules() {
      return Array.from(this.modulesByIdentifier.values());
    }
    get contexts() {
      return this.modules.reduce((contexts, module2) => contexts.concat(module2.contexts), []);
    }
    start() {
      this.scopeObserver.start();
    }
    stop() {
      this.scopeObserver.stop();
    }
    loadDefinition(definition) {
      this.unloadIdentifier(definition.identifier);
      const module2 = new Module(this.application, definition);
      this.connectModule(module2);
      const afterLoad = definition.controllerConstructor.afterLoad;
      if (afterLoad) {
        afterLoad(definition.identifier, this.application);
      }
    }
    unloadIdentifier(identifier) {
      const module2 = this.modulesByIdentifier.get(identifier);
      if (module2) {
        this.disconnectModule(module2);
      }
    }
    getContextForElementAndIdentifier(element, identifier) {
      const module2 = this.modulesByIdentifier.get(identifier);
      if (module2) {
        return module2.contexts.find((context) => context.element == element);
      }
    }
    handleError(error2, message, detail) {
      this.application.handleError(error2, message, detail);
    }
    createScopeForElementAndIdentifier(element, identifier) {
      return new Scope(this.schema, element, identifier, this.logger);
    }
    scopeConnected(scope) {
      this.scopesByIdentifier.add(scope.identifier, scope);
      const module2 = this.modulesByIdentifier.get(scope.identifier);
      if (module2) {
        module2.connectContextForScope(scope);
      }
    }
    scopeDisconnected(scope) {
      this.scopesByIdentifier.delete(scope.identifier, scope);
      const module2 = this.modulesByIdentifier.get(scope.identifier);
      if (module2) {
        module2.disconnectContextForScope(scope);
      }
    }
    connectModule(module2) {
      this.modulesByIdentifier.set(module2.identifier, module2);
      const scopes = this.scopesByIdentifier.getValuesForKey(module2.identifier);
      scopes.forEach((scope) => module2.connectContextForScope(scope));
    }
    disconnectModule(module2) {
      this.modulesByIdentifier.delete(module2.identifier);
      const scopes = this.scopesByIdentifier.getValuesForKey(module2.identifier);
      scopes.forEach((scope) => module2.disconnectContextForScope(scope));
    }
  };
  var defaultSchema = {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-target",
    targetAttributeForScope: (identifier) => `data-${identifier}-target`,
    outletAttributeForScope: (identifier, outlet) => `data-${identifier}-${outlet}-outlet`,
    keyMappings: Object.assign(Object.assign({ enter: "Enter", tab: "Tab", esc: "Escape", space: " ", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", home: "Home", end: "End" }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((c) => [c, c]))), objectFromEntries("0123456789".split("").map((n) => [n, n])))
  };
  function objectFromEntries(array) {
    return array.reduce((memo, [k, v]) => Object.assign(Object.assign({}, memo), { [k]: v }), {});
  }
  var Application = class {
    constructor(element = document.documentElement, schema = defaultSchema) {
      this.logger = console;
      this.debug = false;
      this.logDebugActivity = (identifier, functionName, detail = {}) => {
        if (this.debug) {
          this.logFormattedMessage(identifier, functionName, detail);
        }
      };
      this.element = element;
      this.schema = schema;
      this.dispatcher = new Dispatcher(this);
      this.router = new Router(this);
      this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
    }
    static start(element, schema) {
      const application2 = new this(element, schema);
      application2.start();
      return application2;
    }
    async start() {
      await domReady();
      this.logDebugActivity("application", "starting");
      this.dispatcher.start();
      this.router.start();
      this.logDebugActivity("application", "start");
    }
    stop() {
      this.logDebugActivity("application", "stopping");
      this.dispatcher.stop();
      this.router.stop();
      this.logDebugActivity("application", "stop");
    }
    register(identifier, controllerConstructor) {
      this.load({ identifier, controllerConstructor });
    }
    registerActionOption(name2, filter) {
      this.actionDescriptorFilters[name2] = filter;
    }
    load(head, ...rest) {
      const definitions = Array.isArray(head) ? head : [head, ...rest];
      definitions.forEach((definition) => {
        if (definition.controllerConstructor.shouldLoad) {
          this.router.loadDefinition(definition);
        }
      });
    }
    unload(head, ...rest) {
      const identifiers = Array.isArray(head) ? head : [head, ...rest];
      identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
    }
    get controllers() {
      return this.router.contexts.map((context) => context.controller);
    }
    getControllerForElementAndIdentifier(element, identifier) {
      const context = this.router.getContextForElementAndIdentifier(element, identifier);
      return context ? context.controller : null;
    }
    handleError(error2, message, detail) {
      var _a;
      this.logger.error(`%s

%o

%o`, message, error2, detail);
      (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error2);
    }
    logFormattedMessage(identifier, functionName, detail = {}) {
      detail = Object.assign({ application: this }, detail);
      this.logger.groupCollapsed(`${identifier} #${functionName}`);
      this.logger.log("details:", Object.assign({}, detail));
      this.logger.groupEnd();
    }
  };
  function domReady() {
    return new Promise((resolve) => {
      if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", () => resolve());
      } else {
        resolve();
      }
    });
  }
  function ClassPropertiesBlessing(constructor) {
    const classes = readInheritableStaticArrayValues(constructor, "classes");
    return classes.reduce((properties, classDefinition) => {
      return Object.assign(properties, propertiesForClassDefinition(classDefinition));
    }, {});
  }
  function propertiesForClassDefinition(key) {
    return {
      [`${key}Class`]: {
        get() {
          const { classes } = this;
          if (classes.has(key)) {
            return classes.get(key);
          } else {
            const attribute = classes.getAttributeName(key);
            throw new Error(`Missing attribute "${attribute}"`);
          }
        }
      },
      [`${key}Classes`]: {
        get() {
          return this.classes.getAll(key);
        }
      },
      [`has${capitalize(key)}Class`]: {
        get() {
          return this.classes.has(key);
        }
      }
    };
  }
  function OutletPropertiesBlessing(constructor) {
    const outlets = readInheritableStaticArrayValues(constructor, "outlets");
    return outlets.reduce((properties, outletDefinition) => {
      return Object.assign(properties, propertiesForOutletDefinition(outletDefinition));
    }, {});
  }
  function propertiesForOutletDefinition(name2) {
    const camelizedName = namespaceCamelize(name2);
    return {
      [`${camelizedName}Outlet`]: {
        get() {
          const outlet = this.outlets.find(name2);
          if (outlet) {
            const outletController = this.application.getControllerForElementAndIdentifier(outlet, name2);
            if (outletController) {
              return outletController;
            } else {
              throw new Error(`Missing "data-controller=${name2}" attribute on outlet element for "${this.identifier}" controller`);
            }
          }
          throw new Error(`Missing outlet element "${name2}" for "${this.identifier}" controller`);
        }
      },
      [`${camelizedName}Outlets`]: {
        get() {
          const outlets = this.outlets.findAll(name2);
          if (outlets.length > 0) {
            return outlets.map((outlet) => {
              const controller = this.application.getControllerForElementAndIdentifier(outlet, name2);
              if (controller) {
                return controller;
              } else {
                console.warn(`The provided outlet element is missing the outlet controller "${name2}" for "${this.identifier}"`, outlet);
              }
            }).filter((controller) => controller);
          }
          return [];
        }
      },
      [`${camelizedName}OutletElement`]: {
        get() {
          const outlet = this.outlets.find(name2);
          if (outlet) {
            return outlet;
          } else {
            throw new Error(`Missing outlet element "${name2}" for "${this.identifier}" controller`);
          }
        }
      },
      [`${camelizedName}OutletElements`]: {
        get() {
          return this.outlets.findAll(name2);
        }
      },
      [`has${capitalize(camelizedName)}Outlet`]: {
        get() {
          return this.outlets.has(name2);
        }
      }
    };
  }
  function TargetPropertiesBlessing(constructor) {
    const targets = readInheritableStaticArrayValues(constructor, "targets");
    return targets.reduce((properties, targetDefinition) => {
      return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
    }, {});
  }
  function propertiesForTargetDefinition(name2) {
    return {
      [`${name2}Target`]: {
        get() {
          const target = this.targets.find(name2);
          if (target) {
            return target;
          } else {
            throw new Error(`Missing target element "${name2}" for "${this.identifier}" controller`);
          }
        }
      },
      [`${name2}Targets`]: {
        get() {
          return this.targets.findAll(name2);
        }
      },
      [`has${capitalize(name2)}Target`]: {
        get() {
          return this.targets.has(name2);
        }
      }
    };
  }
  function ValuePropertiesBlessing(constructor) {
    const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
    const propertyDescriptorMap = {
      valueDescriptorMap: {
        get() {
          return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
            const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair, this.identifier);
            const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
            return Object.assign(result, { [attributeName]: valueDescriptor });
          }, {});
        }
      }
    };
    return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
      return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
    }, propertyDescriptorMap);
  }
  function propertiesForValueDefinitionPair(valueDefinitionPair, controller) {
    const definition = parseValueDefinitionPair(valueDefinitionPair, controller);
    const { key, name: name2, reader: read, writer: write } = definition;
    return {
      [name2]: {
        get() {
          const value = this.data.get(key);
          if (value !== null) {
            return read(value);
          } else {
            return definition.defaultValue;
          }
        },
        set(value) {
          if (value === void 0) {
            this.data.delete(key);
          } else {
            this.data.set(key, write(value));
          }
        }
      },
      [`has${capitalize(name2)}`]: {
        get() {
          return this.data.has(key) || definition.hasCustomDefaultValue;
        }
      }
    };
  }
  function parseValueDefinitionPair([token, typeDefinition], controller) {
    return valueDescriptorForTokenAndTypeDefinition({
      controller,
      token,
      typeDefinition
    });
  }
  function parseValueTypeConstant(constant) {
    switch (constant) {
      case Array:
        return "array";
      case Boolean:
        return "boolean";
      case Number:
        return "number";
      case Object:
        return "object";
      case String:
        return "string";
    }
  }
  function parseValueTypeDefault(defaultValue) {
    switch (typeof defaultValue) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
    }
    if (Array.isArray(defaultValue))
      return "array";
    if (Object.prototype.toString.call(defaultValue) === "[object Object]")
      return "object";
  }
  function parseValueTypeObject(payload) {
    const typeFromObject = parseValueTypeConstant(payload.typeObject.type);
    if (!typeFromObject)
      return;
    const defaultValueType = parseValueTypeDefault(payload.typeObject.default);
    if (typeFromObject !== defaultValueType) {
      const propertyPath = payload.controller ? `${payload.controller}.${payload.token}` : payload.token;
      throw new Error(`The specified default value for the Stimulus Value "${propertyPath}" must match the defined type "${typeFromObject}". The provided default value of "${payload.typeObject.default}" is of type "${defaultValueType}".`);
    }
    return typeFromObject;
  }
  function parseValueTypeDefinition(payload) {
    const typeFromObject = parseValueTypeObject({
      controller: payload.controller,
      token: payload.token,
      typeObject: payload.typeDefinition
    });
    const typeFromDefaultValue = parseValueTypeDefault(payload.typeDefinition);
    const typeFromConstant = parseValueTypeConstant(payload.typeDefinition);
    const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
    if (type)
      return type;
    const propertyPath = payload.controller ? `${payload.controller}.${payload.typeDefinition}` : payload.token;
    throw new Error(`Unknown value type "${propertyPath}" for "${payload.token}" value`);
  }
  function defaultValueForDefinition(typeDefinition) {
    const constant = parseValueTypeConstant(typeDefinition);
    if (constant)
      return defaultValuesByType[constant];
    const defaultValue = typeDefinition.default;
    if (defaultValue !== void 0)
      return defaultValue;
    return typeDefinition;
  }
  function valueDescriptorForTokenAndTypeDefinition(payload) {
    const key = `${dasherize(payload.token)}-value`;
    const type = parseValueTypeDefinition(payload);
    return {
      type,
      key,
      name: camelize(key),
      get defaultValue() {
        return defaultValueForDefinition(payload.typeDefinition);
      },
      get hasCustomDefaultValue() {
        return parseValueTypeDefault(payload.typeDefinition) !== void 0;
      },
      reader: readers[type],
      writer: writers[type] || writers.default
    };
  }
  var defaultValuesByType = {
    get array() {
      return [];
    },
    boolean: false,
    number: 0,
    get object() {
      return {};
    },
    string: ""
  };
  var readers = {
    array(value) {
      const array = JSON.parse(value);
      if (!Array.isArray(array)) {
        throw new TypeError(`expected value of type "array" but instead got value "${value}" of type "${parseValueTypeDefault(array)}"`);
      }
      return array;
    },
    boolean(value) {
      return !(value == "0" || String(value).toLowerCase() == "false");
    },
    number(value) {
      return Number(value);
    },
    object(value) {
      const object = JSON.parse(value);
      if (object === null || typeof object != "object" || Array.isArray(object)) {
        throw new TypeError(`expected value of type "object" but instead got value "${value}" of type "${parseValueTypeDefault(object)}"`);
      }
      return object;
    },
    string(value) {
      return value;
    }
  };
  var writers = {
    default: writeString,
    array: writeJSON,
    object: writeJSON
  };
  function writeJSON(value) {
    return JSON.stringify(value);
  }
  function writeString(value) {
    return `${value}`;
  }
  var Controller = class {
    constructor(context) {
      this.context = context;
    }
    static get shouldLoad() {
      return true;
    }
    static afterLoad(_identifier, _application) {
      return;
    }
    get application() {
      return this.context.application;
    }
    get scope() {
      return this.context.scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get targets() {
      return this.scope.targets;
    }
    get outlets() {
      return this.scope.outlets;
    }
    get classes() {
      return this.scope.classes;
    }
    get data() {
      return this.scope.data;
    }
    initialize() {
    }
    connect() {
    }
    disconnect() {
    }
    dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
      const type = prefix ? `${prefix}:${eventName}` : eventName;
      const event = new CustomEvent(type, { detail, bubbles, cancelable });
      target.dispatchEvent(event);
      return event;
    }
  };
  Controller.blessings = [
    ClassPropertiesBlessing,
    TargetPropertiesBlessing,
    ValuePropertiesBlessing,
    OutletPropertiesBlessing
  ];
  Controller.targets = [];
  Controller.outlets = [];
  Controller.values = {};

  // app/javascript/controllers/application.js
  var application = Application.start();
  application.debug = false;
  window.Stimulus = application;

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
    function $2(e2, t2, n2, r2, i2) {
      return new $2.prototype.init(e2, t2, n2, r2, i2);
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
          var s3, u3, l3, c3 = $3 + " " + o3;
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
          var f3, p3, d3, h3 = [], m3 = 0, y3 = "0", v3 = i3 && [], b3 = null != c3, x3 = j2, T3 = i3 || o3 && C2.find.TAG("*", c3 && s4.parentNode || s4), w3 = $3 += null == x3 ? 1 : Math.E;
          for (b3 && (j2 = s4 !== L2 && s4, N2 = n3); null != (f3 = T3[y3]); y3++) {
            if (o3 && f3) {
              for (p3 = 0; d3 = e3[p3]; p3++)
                if (d3(f3, s4, u3)) {
                  l3.push(f3);
                  break;
                }
              b3 && ($3 = w3, N2 = ++n3);
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
          return b3 && ($3 = w3, j2 = x3), v3;
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
      var w2, N2, C2, k2, E2, S2, A2, j2, D2, L2, H2, M2, q2, _2, F2, O2, B2, P2 = "sizzle" + -/* @__PURE__ */ new Date(), R2 = e2.document, W2 = {}, $3 = 0, I2 = 0, z2 = r2(), X2 = r2(), U2 = r2(), V2 = typeof t2, Y2 = 1 << 31, J2 = [], G2 = J2.pop, Q2 = J2.push, K2 = J2.slice, Z2 = J2.indexOf || function(e3) {
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
              for (c3 = m3[P2] || (m3[P2] = {}), l3 = c3[e3] || [], d3 = l3[0] === $3 && l3[1], p3 = l3[0] === $3 && l3[2], f3 = d3 && m3.childNodes[d3]; f3 = ++d3 && f3 && f3[g3] || (p3 = d3 = 0) || h3.pop(); )
                if (1 === f3.nodeType && ++p3 && f3 === t4) {
                  c3[e3] = [$3, d3, p3];
                  break;
                }
            } else if (v3 && (l3 = (t4[P2] || (t4[P2] = {}))[e3]) && l3[0] === $3)
              p3 = l3[1];
            else
              for (; (f3 = ++d3 && f3 && f3[g3] || (p3 = d3 = 0) || h3.pop()) && ((s3 ? f3.nodeName.toLowerCase() !== y3 : 1 !== f3.nodeType) || !++p3 || (v3 && ((f3[P2] || (f3[P2] = {}))[e3] = [$3, p3]), f3 !== t4)); )
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
    } }), st.Tween = $2, $2.prototype = { constructor: $2, init: function(e2, t2, n2, r2, i2, o2) {
      this.elem = e2, this.prop = n2, this.easing = i2 || "swing", this.options = t2, this.start = this.now = this.cur(), this.end = r2, this.unit = o2 || (st.cssNumber[n2] ? "" : "px");
    }, cur: function() {
      var e2 = $2.propHooks[this.prop];
      return e2 && e2.get ? e2.get(this) : $2.propHooks._default.get(this);
    }, run: function(e2) {
      var t2, n2 = $2.propHooks[this.prop];
      return this.pos = t2 = this.options.duration ? st.easing[this.easing](e2, this.options.duration * e2, 0, 1, this.options.duration) : e2, this.now = (this.end - this.start) * t2 + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n2 && n2.set ? n2.set(this) : $2.propHooks._default.set(this), this;
    } }, $2.prototype.init.prototype = $2.prototype, $2.propHooks = { _default: { get: function(e2) {
      var t2;
      return null == e2.elem[e2.prop] || e2.elem.style && null != e2.elem.style[e2.prop] ? (t2 = st.css(e2.elem, e2.prop, "auto"), t2 && "auto" !== t2 ? t2 : 0) : e2.elem[e2.prop];
    }, set: function(e2) {
      st.fx.step[e2.prop] ? st.fx.step[e2.prop](e2) : e2.elem.style && (null != e2.elem.style[st.cssProps[e2.prop]] || st.cssHooks[e2.prop]) ? st.style(e2.elem, e2.prop, e2.now + e2.unit) : e2.elem[e2.prop] = e2.now;
    } } }, $2.propHooks.scrollTop = $2.propHooks.scrollLeft = { set: function(e2) {
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
    } }, st.timers = [], st.fx = $2.prototype.init, st.fx.tick = function() {
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
      var e2, i2, s2, n2, o2, a2, r2, h, l, c, u, d, p, f, g, m, v, _, b, y, w, k, x, D, C, I, P, T, M, S, z, A, H, N, E, W, O, F, R, j = /* @__PURE__ */ new Date(), L = this._daylightSavingAdjust(new Date(j.getFullYear(), j.getMonth(), j.getDate())), Y = this._get(t2, "isRTL"), B = this._get(t2, "showButtonPanel"), V = this._get(t2, "hideIfNoPrevNext"), K = this._get(t2, "navigationAsDateFormat"), U = this._getNumberOfMonths(t2), q = this._get(t2, "showCurrentAtPos"), Q = this._get(t2, "stepMonths"), X = 1 !== U[0] || 1 !== U[1], $2 = this._daylightSavingAdjust(t2.currentDay ? new Date(t2.currentYear, t2.currentMonth, t2.currentDay) : new Date(9999, 9, 9)), G = this._getMinMaxDate(t2, "min"), J = this._getMinMaxDate(t2, "max"), Z = t2.drawMonth - q, te = t2.drawYear;
      if (0 > Z && (Z += 12, te--), J)
        for (e2 = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e2 = G && G > e2 ? G : e2; this._daylightSavingAdjust(new Date(te, Z, 1)) > e2; )
          Z--, 0 > Z && (Z = 11, te--);
      for (t2.drawMonth = Z, t2.drawYear = te, i2 = this._get(t2, "prevText"), i2 = K ? this.formatDate(i2, this._daylightSavingAdjust(new Date(te, Z - Q, 1)), this._getFormatConfig(t2)) : i2, s2 = this._canAdjustMonth(t2, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i2 + "</span></a>" : V ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i2 + "</span></a>", n2 = this._get(t2, "nextText"), n2 = K ? this.formatDate(n2, this._daylightSavingAdjust(new Date(te, Z + Q, 1)), this._getFormatConfig(t2)) : n2, o2 = this._canAdjustMonth(t2, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n2 + "</span></a>" : V ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n2 + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n2 + "</span></a>", a2 = this._get(t2, "currentText"), r2 = this._get(t2, "gotoCurrent") && t2.currentDay ? $2 : L, a2 = K ? this.formatDate(a2, r2, this._getFormatConfig(t2)) : a2, h = t2.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t2, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t2, r2) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a2 + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t2, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t2, "showWeek"), d = this._get(t2, "dayNames"), p = this._get(t2, "dayNamesMin"), f = this._get(t2, "monthNames"), g = this._get(t2, "monthNamesShort"), m = this._get(t2, "beforeShowDay"), v = this._get(t2, "showOtherMonths"), _ = this._get(t2, "selectOtherMonths"), b = this._getDefaultDate(t2), y = "", k = 0; U[0] > k; k++) {
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
              O = m ? m.apply(t2.input ? t2.input[0] : null, [N]) : [true, ""], F = N.getMonth() !== Z, R = F && !_ || !O[0] || G && G > N || J && N > J, W += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (N.getTime() === C.getTime() && Z === t2.selectedMonth && t2._keyEvent || b.getTime() === N.getTime() && b.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !v ? "" : " " + O[1] + (N.getTime() === $2.getTime() ? " " + this._currentClass : "") + (N.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + N.getMonth() + "' data-year='" + N.getFullYear() + "'") + ">" + (F && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + N.getDate() + "</span>" : "<a class='ui-state-default" + (N.getTime() === L.getTime() ? " ui-state-highlight" : "") + (N.getTime() === $2.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + N.getDate() + "</a>") + "</td>", N.setDate(N.getDate() + 1), N = this._daylightSavingAdjust(N);
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

  // app/javascript/autocomplete-rails.js
  (function(jQuery2) {
    var self2 = null;
    jQuery2.fn.railsAutocomplete = function() {
      return this.live("focus", function() {
        if (!this.railsAutoCompleter) {
          this.railsAutoCompleter = new jQuery2.railsAutocomplete(this);
        }
      });
    };
    jQuery2.railsAutocomplete = function(e) {
      _e = e;
      this.init(_e);
    };
    jQuery2.railsAutocomplete.fn = jQuery2.railsAutocomplete.prototype = {
      railsAutocomplete: "0.0.1"
    };
    jQuery2.railsAutocomplete.fn.extend = jQuery2.railsAutocomplete.extend = jQuery2.extend;
    jQuery2.railsAutocomplete.fn.extend({
      init: function(e) {
        e.delimiter = jQuery2(e).attr("data-delimiter") || null;
        function split(val) {
          return val.split(e.delimiter);
        }
        function extractLast(term) {
          return split(term).pop().replace(/^\s+/, "");
        }
        jQuery2(e).autocomplete({
          source: function(request, response) {
            jQuery2.getJSON(jQuery2(e).attr("data-autocomplete"), {
              term: extractLast(request.term)
            }, function() {
              if (arguments[0].length == 0) {
                arguments[0] = [];
                arguments[0][0] = { id: "", label: "no existing match" };
              }
              jQuery2(arguments[0]).each(function(i, el) {
                var obj = {};
                obj[el.id] = el;
                jQuery2(e).data(obj);
              });
              response.apply(null, arguments);
            });
          },
          change: function(event, ui) {
            if (jQuery2(jQuery2(this).attr("data-id-element")).val() == "") {
              return;
            }
            jQuery2(jQuery2(this).attr("data-id-element")).val(ui.item ? ui.item.id : "");
            var update_elements = jQuery2.parseJSON(jQuery2(this).attr("data-update-elements"));
            var data2 = ui.item ? jQuery2(this).data(ui.item.id.toString()) : {};
            if (update_elements && jQuery2(update_elements["id"]).val() == "") {
              return;
            }
            for (var key in update_elements) {
              jQuery2(update_elements[key]).val(ui.item ? data2[key] : "");
            }
          },
          search: function() {
            var term = extractLast(this.value);
            if (term.length < 2) {
              return false;
            }
          },
          focus: function() {
            return false;
          },
          select: function(event, ui) {
            var terms = split(this.value);
            terms.pop();
            terms.push(ui.item.value);
            if (e.delimiter != null) {
              terms.push("");
              this.value = terms.join(e.delimiter);
            } else {
              this.value = terms.join("");
              if (jQuery2(this).attr("data-id-element")) {
                jQuery2(jQuery2(this).attr("data-id-element")).val(ui.item.id);
              }
              if (jQuery2(this).attr("data-update-elements")) {
                var data2 = jQuery2(this).data(ui.item.id.toString());
                var update_elements = jQuery2.parseJSON(jQuery2(this).attr("data-update-elements"));
                for (var key in update_elements) {
                  jQuery2(update_elements[key]).val(data2[key]);
                }
              }
            }
            var remember_string = this.value;
            jQuery2(this).bind("keyup.clearId", function() {
              if (jQuery2(this).val().trim() != remember_string.trim()) {
                jQuery2(jQuery2(this).attr("data-id-element")).val("");
                jQuery2(this).unbind("keyup.clearId");
              }
            });
            jQuery2(e).trigger("railsAutocomplete.select", ui);
            return false;
          }
        });
      }
    });
    jQuery2(document).ready(function() {
      jQuery2("input[data-autocomplete]").railsAutocomplete();
    });
  })(jQuery);

  // app/javascript/colorpicker.js
  (function($2) {
    var ColorPicker = function() {
      var ids = {}, inAction, charMin = 65, visible, tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>', defaults = {
        eventName: "click",
        onShow: function() {
        },
        onBeforeShow: function() {
        },
        onHide: function() {
        },
        onChange: function() {
        },
        onSubmit: function() {
        },
        color: "ff0000",
        livePreview: true,
        flat: false
      }, fillRGBFields = function(hsb, cal) {
        var rgb = HSBToRGB(hsb);
        $2(cal).data("colorpicker").fields.eq(1).val(rgb.r).end().eq(2).val(rgb.g).end().eq(3).val(rgb.b).end();
      }, fillHSBFields = function(hsb, cal) {
        $2(cal).data("colorpicker").fields.eq(4).val(hsb.h).end().eq(5).val(hsb.s).end().eq(6).val(hsb.b).end();
      }, fillHexFields = function(hsb, cal) {
        $2(cal).data("colorpicker").fields.eq(0).val(HSBToHex(hsb)).end();
      }, setSelector = function(hsb, cal) {
        $2(cal).data("colorpicker").selector.css("backgroundColor", "#" + HSBToHex({ h: hsb.h, s: 100, b: 100 }));
        $2(cal).data("colorpicker").selectorIndic.css({
          left: parseInt(150 * hsb.s / 100, 10),
          top: parseInt(150 * (100 - hsb.b) / 100, 10)
        });
      }, setHue = function(hsb, cal) {
        $2(cal).data("colorpicker").hue.css("top", parseInt(150 - 150 * hsb.h / 360, 10));
      }, setCurrentColor = function(hsb, cal) {
        $2(cal).data("colorpicker").currentColor.css("backgroundColor", "#" + HSBToHex(hsb));
      }, setNewColor = function(hsb, cal) {
        $2(cal).data("colorpicker").newColor.css("backgroundColor", "#" + HSBToHex(hsb));
      }, keyDown = function(ev) {
        var pressedKey = ev.charCode || ev.keyCode || -1;
        if (pressedKey > charMin && pressedKey <= 90 || pressedKey == 32) {
          return false;
        }
        var cal = $2(this).parent().parent();
        if (cal.data("colorpicker").livePreview === true) {
          change.apply(this);
        }
      }, change = function(ev) {
        var cal = $2(this).parent().parent(), col;
        if (this.parentNode.className.indexOf("_hex") > 0) {
          cal.data("colorpicker").color = col = HexToHSB(fixHex(this.value));
        } else if (this.parentNode.className.indexOf("_hsb") > 0) {
          cal.data("colorpicker").color = col = fixHSB({
            h: parseInt(cal.data("colorpicker").fields.eq(4).val(), 10),
            s: parseInt(cal.data("colorpicker").fields.eq(5).val(), 10),
            b: parseInt(cal.data("colorpicker").fields.eq(6).val(), 10)
          });
        } else {
          cal.data("colorpicker").color = col = RGBToHSB(fixRGB({
            r: parseInt(cal.data("colorpicker").fields.eq(1).val(), 10),
            g: parseInt(cal.data("colorpicker").fields.eq(2).val(), 10),
            b: parseInt(cal.data("colorpicker").fields.eq(3).val(), 10)
          }));
        }
        if (ev) {
          fillRGBFields(col, cal.get(0));
          fillHexFields(col, cal.get(0));
          fillHSBFields(col, cal.get(0));
        }
        setSelector(col, cal.get(0));
        setHue(col, cal.get(0));
        setNewColor(col, cal.get(0));
        cal.data("colorpicker").onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
      }, blur = function(ev) {
        var cal = $2(this).parent().parent();
        cal.data("colorpicker").fields.parent().removeClass("colorpicker_focus");
      }, focus = function() {
        charMin = this.parentNode.className.indexOf("_hex") > 0 ? 70 : 65;
        $2(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus");
        $2(this).parent().addClass("colorpicker_focus");
      }, downIncrement = function(ev) {
        var field = $2(this).parent().find("input").focus();
        var current = {
          el: $2(this).parent().addClass("colorpicker_slider"),
          max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
          y: ev.pageY,
          field,
          val: parseInt(field.val(), 10),
          preview: $2(this).parent().parent().data("colorpicker").livePreview
        };
        $2(document).bind("mouseup", current, upIncrement);
        $2(document).bind("mousemove", current, moveIncrement);
      }, moveIncrement = function(ev) {
        ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
        if (ev.data.preview) {
          change.apply(ev.data.field.get(0), [true]);
        }
        return false;
      }, upIncrement = function(ev) {
        change.apply(ev.data.field.get(0), [true]);
        ev.data.el.removeClass("colorpicker_slider").find("input").focus();
        $2(document).unbind("mouseup", upIncrement);
        $2(document).unbind("mousemove", moveIncrement);
        return false;
      }, downHue = function(ev) {
        var current = {
          cal: $2(this).parent(),
          y: $2(this).offset().top
        };
        current.preview = current.cal.data("colorpicker").livePreview;
        $2(document).bind("mouseup", current, upHue);
        $2(document).bind("mousemove", current, moveHue);
      }, moveHue = function(ev) {
        change.apply(
          ev.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, ev.pageY - ev.data.y))) / 150, 10)).get(0),
          [ev.data.preview]
        );
        return false;
      }, upHue = function(ev) {
        fillRGBFields(ev.data.cal.data("colorpicker").color, ev.data.cal.get(0));
        fillHexFields(ev.data.cal.data("colorpicker").color, ev.data.cal.get(0));
        $2(document).unbind("mouseup", upHue);
        $2(document).unbind("mousemove", moveHue);
        return false;
      }, downSelector = function(ev) {
        var current = {
          cal: $2(this).parent(),
          pos: $2(this).offset()
        };
        current.preview = current.cal.data("colorpicker").livePreview;
        $2(document).bind("mouseup", current, upSelector);
        $2(document).bind("mousemove", current, moveSelector);
      }, moveSelector = function(ev) {
        change.apply(
          ev.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, ev.pageY - ev.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, ev.pageX - ev.data.pos.left)) / 150, 10)).get(0),
          [ev.data.preview]
        );
        return false;
      }, upSelector = function(ev) {
        fillRGBFields(ev.data.cal.data("colorpicker").color, ev.data.cal.get(0));
        fillHexFields(ev.data.cal.data("colorpicker").color, ev.data.cal.get(0));
        $2(document).unbind("mouseup", upSelector);
        $2(document).unbind("mousemove", moveSelector);
        return false;
      }, enterSubmit = function(ev) {
        $2(this).addClass("colorpicker_focus");
      }, leaveSubmit = function(ev) {
        $2(this).removeClass("colorpicker_focus");
      }, clickSubmit = function(ev) {
        var cal = $2(this).parent();
        var col = cal.data("colorpicker").color;
        cal.data("colorpicker").origColor = col;
        setCurrentColor(col, cal.get(0));
        cal.data("colorpicker").onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data("colorpicker").el);
      }, show = function(ev) {
        var cal = $2("#" + $2(this).data("colorpickerId"));
        cal.data("colorpicker").onBeforeShow.apply(this, [cal.get(0)]);
        var pos = $2(this).offset();
        var viewPort = getViewport();
        var top = pos.top + this.offsetHeight;
        var left = pos.left;
        if (top + 176 > viewPort.t + viewPort.h) {
          top -= this.offsetHeight + 176;
        }
        if (left + 356 > viewPort.l + viewPort.w) {
          left -= 356;
        }
        cal.css({ left: left + "px", top: top + "px" });
        if (cal.data("colorpicker").onShow.apply(this, [cal.get(0)]) != false) {
          cal.show();
        }
        $2(document).bind("mousedown", { cal }, hide);
        return false;
      }, hide = function(ev) {
        if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
          if (ev.data.cal.data("colorpicker").onHide.apply(this, [ev.data.cal.get(0)]) != false) {
            ev.data.cal.hide();
          }
          $2(document).unbind("mousedown", hide);
        }
      }, isChildOf = function(parentEl, el, container) {
        if (parentEl == el) {
          return true;
        }
        if (parentEl.contains) {
          return parentEl.contains(el);
        }
        if (parentEl.compareDocumentPosition) {
          return !!(parentEl.compareDocumentPosition(el) & 16);
        }
        var prEl = el.parentNode;
        while (prEl && prEl != container) {
          if (prEl == parentEl)
            return true;
          prEl = prEl.parentNode;
        }
        return false;
      }, getViewport = function() {
        var m = document.compatMode == "CSS1Compat";
        return {
          l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
          t: window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
          w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
          h: window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
        };
      }, fixHSB = function(hsb) {
        return {
          h: Math.min(360, Math.max(0, hsb.h)),
          s: Math.min(100, Math.max(0, hsb.s)),
          b: Math.min(100, Math.max(0, hsb.b))
        };
      }, fixRGB = function(rgb) {
        return {
          r: Math.min(255, Math.max(0, rgb.r)),
          g: Math.min(255, Math.max(0, rgb.g)),
          b: Math.min(255, Math.max(0, rgb.b))
        };
      }, fixHex = function(hex) {
        var len = 6 - hex.length;
        if (len > 0) {
          var o = [];
          for (var i = 0; i < len; i++) {
            o.push("0");
          }
          o.push(hex);
          hex = o.join("");
        }
        return hex;
      }, HexToRGB = function(hex) {
        var hex = parseInt(hex.indexOf("#") > -1 ? hex.substring(1) : hex, 16);
        return { r: hex >> 16, g: (hex & 65280) >> 8, b: hex & 255 };
      }, HexToHSB = function(hex) {
        return RGBToHSB(HexToRGB(hex));
      }, RGBToHSB = function(rgb) {
        var hsb = {
          h: 0,
          s: 0,
          b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        if (max != 0) {
        }
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
          if (rgb.r == max) {
            hsb.h = (rgb.g - rgb.b) / delta;
          } else if (rgb.g == max) {
            hsb.h = 2 + (rgb.b - rgb.r) / delta;
          } else {
            hsb.h = 4 + (rgb.r - rgb.g) / delta;
          }
        } else {
          hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
          hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
      }, HSBToRGB = function(hsb) {
        var rgb = {};
        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s * 255 / 100);
        var v = Math.round(hsb.b * 255 / 100);
        if (s == 0) {
          rgb.r = rgb.g = rgb.b = v;
        } else {
          var t1 = v;
          var t2 = (255 - s) * v / 255;
          var t3 = (t1 - t2) * (h % 60) / 60;
          if (h == 360)
            h = 0;
          if (h < 60) {
            rgb.r = t1;
            rgb.b = t2;
            rgb.g = t2 + t3;
          } else if (h < 120) {
            rgb.g = t1;
            rgb.b = t2;
            rgb.r = t1 - t3;
          } else if (h < 180) {
            rgb.g = t1;
            rgb.r = t2;
            rgb.b = t2 + t3;
          } else if (h < 240) {
            rgb.b = t1;
            rgb.r = t2;
            rgb.g = t1 - t3;
          } else if (h < 300) {
            rgb.b = t1;
            rgb.g = t2;
            rgb.r = t2 + t3;
          } else if (h < 360) {
            rgb.r = t1;
            rgb.g = t2;
            rgb.b = t1 - t3;
          } else {
            rgb.r = 0;
            rgb.g = 0;
            rgb.b = 0;
          }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
      }, RGBToHex = function(rgb) {
        var hex = [
          rgb.r.toString(16),
          rgb.g.toString(16),
          rgb.b.toString(16)
        ];
        $2.each(hex, function(nr, val) {
          if (val.length == 1) {
            hex[nr] = "0" + val;
          }
        });
        return hex.join("");
      }, HSBToHex = function(hsb) {
        return RGBToHex(HSBToRGB(hsb));
      }, restoreOriginal = function() {
        var cal = $2(this).parent();
        var col = cal.data("colorpicker").origColor;
        cal.data("colorpicker").color = col;
        fillRGBFields(col, cal.get(0));
        fillHexFields(col, cal.get(0));
        fillHSBFields(col, cal.get(0));
        setSelector(col, cal.get(0));
        setHue(col, cal.get(0));
        setNewColor(col, cal.get(0));
      };
      return {
        init: function(opt) {
          opt = $2.extend({}, defaults, opt || {});
          if (typeof opt.color == "string") {
            opt.color = HexToHSB(opt.color);
          } else if (opt.color.r != void 0 && opt.color.g != void 0 && opt.color.b != void 0) {
            opt.color = RGBToHSB(opt.color);
          } else if (opt.color.h != void 0 && opt.color.s != void 0 && opt.color.b != void 0) {
            opt.color = fixHSB(opt.color);
          } else {
            return this;
          }
          return this.each(function() {
            if (!$2(this).data("colorpickerId")) {
              var options = $2.extend({}, opt);
              options.origColor = opt.color;
              var id = "collorpicker_" + parseInt(Math.random() * 1e3);
              $2(this).data("colorpickerId", id);
              var cal = $2(tpl).attr("id", id);
              if (options.flat) {
                cal.appendTo(this).show();
              } else {
                cal.appendTo(document.body);
              }
              options.fields = cal.find("input").bind("keyup", keyDown).bind("change", change).bind("blur", blur).bind("focus", focus);
              cal.find("span").bind("mousedown", downIncrement).end().find(">div.colorpicker_current_color").bind("click", restoreOriginal);
              options.selector = cal.find("div.colorpicker_color").bind("mousedown", downSelector);
              options.selectorIndic = options.selector.find("div div");
              options.el = this;
              options.hue = cal.find("div.colorpicker_hue div");
              cal.find("div.colorpicker_hue").bind("mousedown", downHue);
              options.newColor = cal.find("div.colorpicker_new_color");
              options.currentColor = cal.find("div.colorpicker_current_color");
              cal.data("colorpicker", options);
              cal.find("div.colorpicker_submit").bind("mouseenter", enterSubmit).bind("mouseleave", leaveSubmit).bind("click", clickSubmit);
              fillRGBFields(options.color, cal.get(0));
              fillHSBFields(options.color, cal.get(0));
              fillHexFields(options.color, cal.get(0));
              setHue(options.color, cal.get(0));
              setSelector(options.color, cal.get(0));
              setCurrentColor(options.color, cal.get(0));
              setNewColor(options.color, cal.get(0));
              if (options.flat) {
                cal.css({
                  position: "relative",
                  display: "block"
                });
              } else {
                $2(this).bind(options.eventName, show);
              }
            }
          });
        },
        showPicker: function() {
          return this.each(function() {
            if ($2(this).data("colorpickerId")) {
              show.apply(this);
            }
          });
        },
        hidePicker: function() {
          return this.each(function() {
            if ($2(this).data("colorpickerId")) {
              $2("#" + $2(this).data("colorpickerId")).hide();
            }
          });
        },
        setColor: function(col) {
          if (typeof col == "string") {
            col = HexToHSB(col);
          } else if (col.r != void 0 && col.g != void 0 && col.b != void 0) {
            col = RGBToHSB(col);
          } else if (col.h != void 0 && col.s != void 0 && col.b != void 0) {
            col = fixHSB(col);
          } else {
            return this;
          }
          return this.each(function() {
            if ($2(this).data("colorpickerId")) {
              var cal = $2("#" + $2(this).data("colorpickerId"));
              cal.data("colorpicker").color = col;
              cal.data("colorpicker").origColor = col;
              fillRGBFields(col, cal.get(0));
              fillHSBFields(col, cal.get(0));
              fillHexFields(col, cal.get(0));
              setHue(col, cal.get(0));
              setSelector(col, cal.get(0));
              setCurrentColor(col, cal.get(0));
              setNewColor(col, cal.get(0));
            }
          });
        }
      };
    }();
    $2.fn.extend({
      ColorPicker: ColorPicker.init,
      ColorPickerHide: ColorPicker.hidePicker,
      ColorPickerShow: ColorPicker.showPicker,
      ColorPickerSetColor: ColorPicker.setColor
    });
  })(jQuery);

  // app/javascript/door_lines.js
  var $j = jQuery;
  $j(document).ready(function() {
    var attach_door_panels_configuration_events = function() {
      $j("#door-panels-configuration .selected-door-panel").click(function(e) {
        e.stopPropagation();
        $j(this).parent().find(".door-panels-list").show();
      });
      $j("#door-panels-configuration .door-panel").click(function() {
        var selected_panel = $j(this);
        var section = selected_panel.closest(".door-line-section");
        var id = selected_panel.attr("id").replace("dp-", "");
        var door_glass_id = section.find("#door-glass-id").val();
        var door_panel_dimension_id = section.find("#door-panel-dimension-id").val();
        selected_panel.parent().find(".door-panel").removeClass("selected");
        selected_panel.addClass("selected");
        section.find("#door-panel-id").val(id);
        selected_panel.closest(".selection-door-panel").find(".selected-door-panel").html(selected_panel.html());
        $j.get("/doors/configure_glass_families", { door_panel_id: id, door_glass_id }, function(response) {
          section.find(".selection-door-glass-family").html(response);
          attach_door_glass_families_configuration_events(section);
          section.find("#door_glass_family").change();
        });
        $j.get("/doors/configure_panel_dimensions", { door_panel_id: id, door_panel_dimension_id }, function(response) {
          section.find(".selection-door-panel-dimensions").html(response);
          attach_door_panel_dimension_configuration_events(section);
          section.find("#door_panel_dimension").change();
        });
      });
    };
    var attach_door_panel_dimension_configuration_events = function(section) {
      section.find("#door_panel_dimension").change(function() {
        var id = $j(this).val();
        section.find("#door-panel-dimension-id").val(id);
      });
    };
    var attach_door_glass_families_configuration_events = function(section) {
      section.find("#door_glass_family").change(function() {
        var id = $j(this).val();
        var door_glass_id = section.find("#door-glass-id").val();
        var door_panel_id = section.find("#door-panel-id").val();
        if (id == "0") {
          section.find("#door-glass-id").val("");
          section.find(".selection-door-glass").html("");
        } else {
          $j.get("/doors/configure_glasses", { door_panel_id, door_glass_family_id: id, door_glass_id }, function(response) {
            section.find(".selection-door-glass").html(response);
            attach_door_glasses_configuration_events(section);
            section.find(".door-glass.selected").click();
          });
        }
      });
    };
    var attach_door_glasses_configuration_events = function(section) {
      section.find(".selected-door-glass").click(function(e) {
        e.stopPropagation();
        $j(this).parent().find(".door-glasses-list").show();
      });
      section.find(".door-glass").click(function() {
        var selected_glass = $j(this);
        var id = selected_glass.attr("id").replace("dg-", "");
        selected_glass.parent().find(".door-glass").removeClass("selected");
        selected_glass.addClass("selected");
        section.find("#door-glass-id").val(id);
        section.find(".selected-door-glass").html(selected_glass.html());
      });
    };
    var attach_door_openings_configuration_events = function() {
      $j("#door-openings-configuration .door-opening").click(function() {
        var id = $j(this).attr("id").replace("do-", "");
        $j("#door-openings-configuration .door-opening").removeClass("selected");
        $j(this).addClass("selected");
        $j("#door_line_door_opening_id").val(id);
      });
    };
    $j("#door-frame-selection .door-frame").click(function() {
      var id = $j(this).attr("id").replace("df-", "");
      $j("#door-frame-selection .door-frame").removeClass("selected");
      $j(this).addClass("selected");
      $j("#door_line_door_frame_id").val(id);
      $j("#door-combination-selection .door-combination-list").hide();
      $j("#door-combination-selection #dcl-" + id).show();
      var selected_door_combination_id = $j("#door_line_door_combination_id").val();
      if ($j("#door-combination-selection #dcl-" + id + " #dc-" + selected_door_combination_id).length == 1)
        $j("#door-combination-selection #dcl-" + id + " #dc-" + selected_door_combination_id).click();
      else
        $j("#door-combination-selection #dcl-" + id + " .door-combination:first").click();
    });
    $j("#door-combination-selection .door-combination").click(function() {
      var id = $j(this).attr("id").replace("dc-", "");
      $j("#door-combination-selection .door-combination").removeClass("selected");
      $j(this).addClass("selected");
      $j("#door_line_door_combination_id").val(id);
      $j("#door_line_slab_material_id").trigger("change");
      $j.get("/doors/configure_openings", "door_combination_id=" + id + "&door_opening_id=" + $j("#door_line_door_opening_id").val(), function(response) {
        $j("#door-openings-configuration").html(response);
        attach_door_openings_configuration_events();
        var selected_door_opening_id = $j("#door_line_door_opening_id").val();
        if ($j("#do-" + selected_door_opening_id).length == 1)
          $j("#do-" + selected_door_opening_id).click();
        else
          $j("#door-openings-configuration .door-opening:first").click();
      });
    });
    $j("#frame-profile-selection .frame-profile").click(function() {
      var id = $j(this).attr("id").replace("fp-", "");
      $j("#frame-profile-selection .frame-profile").removeClass("selected");
      $j(this).addClass("selected");
      $j("#door_line_frame_profile_id").val(id);
    });
    $j("#door_line_slab_material_id").change(function() {
      var door_combination_id = $j("#door_line_door_combination_id").val();
      var door_line_id = $j("#door_line_id").val();
      var slab_material_id = $j(this).val();
      $j.get("/doors/configure_panels", $j("#door-panels-configuration input,#door-panels-configuration select").serialize() + "&door_combination_id=" + door_combination_id + "&door_line_id=" + door_line_id + "&slab_material_id=" + slab_material_id, function(response) {
        $j("#door-panels-configuration").html(response);
        attach_door_panels_configuration_events();
        $j("#door-panels-configuration .door-panel.selected").click();
      });
    });
    $j("#door-boring-selection .door-boring").click(function() {
      var id = $j(this).attr("id").replace("db-", "");
      $j("#door-boring-selection .door-boring").removeClass("selected");
      $j(this).addClass("selected");
      $j("#door_line_door_boring_id").val(id);
    });
    $j("body").click(function() {
      $j(".door-popup").hide();
    });
    $j("#door-frame-selection .door-frame.selected").click();
  });

  // app/javascript/hover-popup.js
  (function($2) {
    $2.fn.thumbPopup = function(options) {
      settings = jQuery.extend({
        popupId: "thumbPopup",
        popupCSS: { "border": "1px solid #000000", "background": "#FFFFFF" },
        imgSmallFlag: "_t",
        imgLargeFlag: "_l",
        cursorTopOffset: 15,
        cursorLeftOffset: 15,
        loadingHtml: "<span style='padding: 5px;'>Loading</span>"
      }, options);
      popup = $2("<div />").css(settings.popupCSS).attr("id", settings.popupId).css("position", "absolute").appendTo("body").hide();
      $2(this).hover(setPopup).mousemove(updatePopupPosition).mouseout(hidePopup);
      function setPopup(event) {
        var fullImgURL = $2(this).attr("src").replace(settings.imgSmallFlag, settings.imgLargeFlag);
        $2(this).data("hovered", true);
        $2("<img />").bind("load", { thumbImage: this }, function(event2) {
          if ($2(event2.data.thumbImage).data("hovered") == true) {
            $2(popup).empty().append(this);
            updatePopupPosition(event2);
            $2(popup).show();
          }
          $2(event2.data.thumbImage).data("cached", true);
        }).attr("src", fullImgURL);
        if ($2(this).data("cached") != true) {
          $2(popup).append($2(settings.loadingHtml));
          $2(popup).show();
        }
        updatePopupPosition(event);
      }
      function updatePopupPosition(event) {
        var windowSize = getWindowSize();
        var popupSize = getPopupSize();
        if (windowSize.width + windowSize.scrollLeft < event.pageX + popupSize.width + settings.cursorLeftOffset) {
          $2(popup).css("left", event.pageX - popupSize.width - settings.cursorLeftOffset);
        } else {
          $2(popup).css("left", event.pageX + settings.cursorLeftOffset);
        }
        if (windowSize.height + windowSize.scrollTop < event.pageY + popupSize.height + settings.cursorTopOffset) {
          $2(popup).css("top", event.pageY - popupSize.height - settings.cursorTopOffset);
        } else {
          $2(popup).css("top", event.pageY + settings.cursorTopOffset);
        }
      }
      function hidePopup(event) {
        $2(this).data("hovered", false);
        $2(popup).empty().hide();
      }
      function getWindowSize() {
        return {
          scrollLeft: $2(window).scrollLeft(),
          scrollTop: $2(window).scrollTop(),
          width: $2(window).width(),
          height: $2(window).height()
        };
      }
      function getPopupSize() {
        return {
          width: $2(popup).width(),
          height: $2(popup).height()
        };
      }
      return this;
    };
  })(jQuery);

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

  // app/javascript/application.js
  var import_quotations = __toESM(require_quotations());
})();
/*! jQuery v1.9.0 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license */
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
/*! jQuery Migrate v1.1.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
