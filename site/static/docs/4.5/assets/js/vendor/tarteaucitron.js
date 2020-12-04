/* jslint browser: true, evil: true */

// define correct path for files inclusion
var scripts = document.getElementsByTagName('script');
  var path = scripts[scripts.length - 1].src.split('?')[0];
  var tarteaucitronForceCDN = (tarteaucitronForceCDN === undefined) ? '' : tarteaucitronForceCDN;
  var cdn = (tarteaucitronForceCDN === '') ? path.split('/').slice(0, -1).join('/') + '/' : tarteaucitronForceCDN;
  var alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch;
  var tarteaucitronForceLanguage = (tarteaucitronForceLanguage === undefined) ? '' : tarteaucitronForceLanguage;
  var tarteaucitronForceExpire = (tarteaucitronForceExpire === undefined) ? '' : tarteaucitronForceExpire;
  var tarteaucitronCustomText = (tarteaucitronCustomText === undefined) ? '' : tarteaucitronCustomText;
  var timeExipre = 31536000000;
  var tarteaucitronProLoadServices;
  var tarteaucitronNoAdBlocker = false



var tarteaucitron = {
  version: 20181023,
  cdn: cdn,
  user: {},
  lang: {},
  services: {},
  added: [],
  idprocessed: [],
  state: [],
  launch: [],
  parameters: {},
  isAjax: false,
  reloadThePage: false,
  events: {
    init: function () {},
    load: function () {}
  },
  init: function (params) {
    'use strict';
    var origOpen

    tarteaucitron.parameters = params
    if (alreadyLaunch === 0) {
      alreadyLaunch = 1
      if (window.addEventListener) {
        window.addEventListener('load', function () {
          tarteaucitron.load()
          tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
            elem.addEventListener('click', function (event) {
              tarteaucitron.userInterface.openPanel()
              event.preventDefault()
            }, false)
          }, true)
        }, false)
        window.addEventListener('scroll', function () {
          var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            var heightPosition;
          if (document.getElementById('tarteaucitronAlertBig') !== null && !tarteaucitron.highPrivacy) {
            if (document.getElementById('tarteaucitronAlertBig').style.display === 'block') {
              heightPosition = document.getElementById('tarteaucitronAlertBig').offsetHeight + 'px'

              if (scrollPos > (screen.height * 2)) {
                tarteaucitron.userInterface.respondAll(true)
              } else if (scrollPos > (screen.height / 2)) {
                document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<strong>' + tarteaucitron.lang.alertBigScroll + '</strong> ' + tarteaucitron.lang.alertBig
              }

              if (tarteaucitron.orientation === 'top') {
                document.getElementById('tarteaucitronPercentage').style.top = heightPosition
              } else {
                document.getElementById('tarteaucitronPercentage').style.bottom = heightPosition
              }
              document.getElementById('tarteaucitronPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%'
            }
          }
        }, false)

        window.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            tarteaucitron.userInterface.closePanel()
          }
        }, false)
        window.addEventListener('hashchange', function () {
          if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
            tarteaucitron.userInterface.openPanel()
          }
        }, false)
        window.addEventListener('resize', function () {
          if (document.getElementById('tarteaucitron') !== null) {
            if (document.getElementById('tarteaucitron').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('main')
            }
          }

          if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
            if (document.getElementById('tarteaucitronCookiesListContainer').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('cookie')
            }
          }
        }, false)
      } else {
        window.attachEvent('onload', function () {
          tarteaucitron.load()
          tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
            elem.attachEvent('onclick', function (event) {
              tarteaucitron.userInterface.openPanel()
              event.preventDefault()
            });
          }, true)
        });
        window.attachEvent('onscroll', function () {
          var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            var heightPosition;
          if (document.getElementById('tarteaucitronAlertBig') !== null && !tarteaucitron.highPrivacy) {
            if (document.getElementById('tarteaucitronAlertBig').style.display === 'block') {
              heightPosition = document.getElementById('tarteaucitronAlertBig').offsetHeight + 'px'

              if (scrollPos > (screen.height * 2)) {
                tarteaucitron.userInterface.respondAll(true)
              } else if (scrollPos > (screen.height / 2)) {
                document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<strong>' + tarteaucitron.lang.alertBigScroll + '</strong> ' + tarteaucitron.lang.alertBig
              }
              if (tarteaucitron.orientation === 'top') {
                document.getElementById('tarteaucitronPercentage').style.top = heightPosition
              } else {
                document.getElementById('tarteaucitronPercentage').style.bottom = heightPosition
              }
              document.getElementById('tarteaucitronPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%'
            }
          }
        })
        window.attachEvent('onkeydown', function (evt) {
          if (evt.keyCode === 27) {
            tarteaucitron.userInterface.closePanel()
          }

          if (evt.keyCode === 9 && focusableEls.indexOf(evt.target) >= 0) {
            if (evt.shiftKey) /* shift + tab */ {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus()
                evt.preventDefault()
              }
            } else /* tab */ if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                evt.preventDefault();
              }
          }
        })
        window.attachEvent('onhashchange', function () {
          if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
            tarteaucitron.userInterface.openPanel()
          }
        })
        window.attachEvent('onresize', function () {
          if (document.getElementById('tarteaucitron') !== null) {
            if (document.getElementById('tarteaucitron').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('main')
            }
          }

          if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
            if (document.getElementById('tarteaucitronCookiesListContainer').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('cookie')
            }
          }
        })
      }

      if (typeof XMLHttpRequest !== 'undefined') {
        origOpen = XMLHttpRequest.prototype.open
        XMLHttpRequest.prototype.open = function () {
          if (window.addEventListener) {
            this.addEventListener('load', function () {
              if (typeof tarteaucitronProLoadServices === 'function') {
                tarteaucitronProLoadServices()
              }
            }, false)
          } else if (typeof this.attachEvent !== 'undefined') {
            this.attachEvent('onload', function () {
              if (typeof tarteaucitronProLoadServices === 'function') {
                tarteaucitronProLoadServices()
              }
            })
          } else if (typeof tarteaucitronProLoadServices === 'function') {
              setTimeout(tarteaucitronProLoadServices, 1000);
            }

          try {
            Reflect.apply(origOpen, this, arguments);
          } catch  {}
        }
      }
    }

    if (tarteaucitron.events.init) {
      tarteaucitron.events.init()
    }
  },
  load: function () {
    'use strict';
    var cdn = tarteaucitron.cdn;
      var language = tarteaucitron.getLanguage();
      var pathToLang = cdn + 'lang/tarteaucitron.' + language + '.js?v=' + tarteaucitron.version;
      var pathToServices = cdn + 'tarteaucitron.services.js?v=' + tarteaucitron.version;
      var linkElement = document.createElement('link');
      var defaults = {
        "adblocker": false,
        "hashtag": '#tarteaucitron',
        "cookieName": 'tarteaucitron',
        "highPrivacy": false,
        "orientation": "top",
        "removeCredit": false,
        "showAlertSmall": true,
        "cookieslist": true,
        "handleBrowserDNTRequest": false,
        "AcceptAllCta" : false,
        "moreInfoLink": true,
        "privacyUrl": "",
        "useExternalCss": false
      };
      var params = tarteaucitron.parameters

    // Step 0: get params
    if (params !== undefined) {
      for (var k in defaults) {
        if (!tarteaucitron.parameters.hasOwnProperty(k)) {
          tarteaucitron.parameters[k] = defaults[k]
        }
      }
    }

    // global
    tarteaucitron.orientation = tarteaucitron.parameters.orientation
    tarteaucitron.hashtag = tarteaucitron.parameters.hashtag
    tarteaucitron.highPrivacy = tarteaucitron.parameters.highPrivacy
    tarteaucitron.handleBrowserDNTRequest = tarteaucitron.parameters.handleBrowserDNTRequest


    // Step 1: load css
    if (!tarteaucitron.parameters.useExternalCss) {
      linkElement.rel = 'stylesheet'
      linkElement.type = 'text/css'
      linkElement.href = cdn + 'css/tarteaucitron.css?v=' + tarteaucitron.version
      document.getElementsByTagName('head')[0].appendChild(linkElement)
    }
    // Step 2: load language and services
    tarteaucitron.addScript(pathToLang, '', function () {
      if (tarteaucitronCustomText !== '') {
        tarteaucitron.lang = tarteaucitron.AddOrUpdate(tarteaucitron.lang, tarteaucitronCustomText)
      }
      tarteaucitron.addScript(pathToServices, '', function () {
        var body = document.body;
          var div = document.createElement('div');
          var html = '';
          var index;
          var orientation = 'Top';
          var cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'];
          var i;

        cat = cat.sort(function (a, b) {
          if (tarteaucitron.lang[a].title > tarteaucitron.lang[b].title) {
 return 1 }
          if (tarteaucitron.lang[a].title < tarteaucitron.lang[b].title) {
 return -1 }
          return 0
        });

        // Step 3: prepare the html
        // html += '<div id="tarteaucitronPremium"></div>';
        html += '<button id="tarteaucitronBack" onclick="tarteaucitron.userInterface.closePanel();"><span class="sr-only">' + tarteaucitron.lang.close + '</span>></button>'
        html += '<div id="tarteaucitron" role="dialog" aria-labelledby="dialogTitle">'
        html += '   <button id="tarteaucitronClosePanel" onclick="tarteaucitron.userInterface.closePanel();">'
        html += '       ' + tarteaucitron.lang.close
        html += '   </button>'
        html += '   <div id="tarteaucitronServices">'
        html += '      <div class="tarteaucitronLine tarteaucitronMainLine" id="tarteaucitronMainLineOffset">'
        html += '         <span class="tarteaucitronH1 h1" role="heading" aria-level="h1" id="dialogTitle">' + tarteaucitron.lang.title + '</span>'
        html += '         <div id="tarteaucitronInfo" class="tarteaucitronInfoBox">'
        html += '         ' + tarteaucitron.lang.disclaimer
        if (tarteaucitron.parameters.privacyUrl !== '') {
          html += '   <br/><br/>'
          html += '   <button id="tarteaucitronPrivacyUrl" onclick="document.location = tarteaucitron.parameters.privacyUrl">'
          html += '       ' + tarteaucitron.lang.privacyUrl
          html += '   </button>'
        }
        html += '         </div>'
        html += '         <div class="tarteaucitronName">'
        html += '            <span class="tarteaucitronH2" role="heading" aria-level="h2">' + tarteaucitron.lang.all + '</span>'
        html += '         </div>'
        html += '         <div class="tarteaucitronAsk" id="tarteaucitronScrollbarAdjust">'
        html += '            <button id="tarteaucitronAllAllowed" class="tarteaucitronAllow btn btn-inverse btn-primary" onclick="tarteaucitron.userInterface.respondAll(true);">'
        html += '               &#10003; ' + tarteaucitron.lang.allowAll
        html += '            </button> '
        html += '            <button id="tarteaucitronAllDenied" class="tarteaucitronDeny btn btn-inverse btn-info" onclick="tarteaucitron.userInterface.respondAll(false);">'
        html += '               &#10007; ' + tarteaucitron.lang.denyAll
        html += '            </button>'
        html += '         </div>'
        html += '      </div>'
        html += '      <div class="tarteaucitronBorder">'
        html += '         <div class="clear"></div><ul>'
        for (i = 0; i < cat.length; i += 1) {
          html += '         <li id="tarteaucitronServicesTitle_' + cat[i] + '" class="tarteaucitronHidden">'
          html += '            <div class="tarteaucitronTitle">'
          html += '               <button onclick="tarteaucitron.userInterface.toggle(\'tarteaucitronDetails' + cat[i] + '\', \'tarteaucitronInfoBox\');return false">&#10011; ' + tarteaucitron.lang[cat[i]].title + '</button>'
          html += '            </div>'
          html += '            <div id="tarteaucitronDetails' + cat[i] + '" class="tarteaucitronDetails tarteaucitronInfoBox">'
          html += '               ' + tarteaucitron.lang[cat[i]].details
          html += '            </div>'
          html += '         <ul id="tarteaucitronServices_' + cat[i] + '"></ul></li>'
        }
        html += '         </ul>'
        html += '         <div class="tarteaucitronHidden" id="tarteaucitronScrollbarChild" style="height:20px;display:block"></div>'
        if (tarteaucitron.parameters.removeCredit === false) {
          html += '     <a class="tarteaucitronSelfLink" href="https://opt-out.ferank.eu/" rel="nofollow" target="_blank" rel="noopener" title="tarteaucitron ' + tarteaucitron.lang.newWindow + '">🍋 ' + tarteaucitron.lang.credit + '</a>'
        }
        html += '       </div>'
        html += '   </div>'
        html += '</div>'

        if (tarteaucitron.parameters.orientation === 'bottom') {
          orientation = 'Bottom'
        }

        if (tarteaucitron.parameters.highPrivacy && !tarteaucitron.parameters.AcceptAllCta) {
          html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">'
          html += '   <span id="tarteaucitronDisclaimerAlert">'
          html += '       ' + tarteaucitron.lang.alertBigPrivacy
          html += '   </span>'
          html += '   <button id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.openPanel();">'
          html += '       ' + tarteaucitron.lang.personalize
          html += '   </button>'

          if (tarteaucitron.parameters.privacyUrl !== '') {
            html += '   <button id="tarteaucitronPrivacyUrl" onclick="document.location = tarteaucitron.parameters.privacyUrl">'
            html += '       ' + tarteaucitron.lang.privacyUrl
            html += '   </button>'
          }

          html += '</div>'
        } else {
          html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">'
          html += '   <span id="tarteaucitronDisclaimerAlert">'

          if (tarteaucitron.parameters.highPrivacy) {
            html += '       ' + tarteaucitron.lang.alertBigPrivacy
          } else {
            html += '       ' + tarteaucitron.lang.alertBigClick + ' ' + tarteaucitron.lang.alertBig
          }

          html += '   </span>'
          html += '   <button id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.respondAll(true);" class="btn btn-inverse btn-primary ml-2">'
          html += '       &#10003; ' + tarteaucitron.lang.acceptAll
          html += '   </button>'
          html += '   <button id="tarteaucitronCloseAlert" onclick="tarteaucitron.userInterface.openPanel();" class="btn btn-inverse btn-info ml-2">'
          html += '       ' + tarteaucitron.lang.personalize
          html += '   </button>'

          if (tarteaucitron.parameters.privacyUrl !== '') {
            html += '   <button id="tarteaucitronPrivacyUrl" onclick="document.location = tarteaucitron.parameters.privacyUrl">'
            html += '       ' + tarteaucitron.lang.privacyUrl
            html += '   </button>'
          }

          html += '</div>'
          html += '<div id="tarteaucitronPercentage"></div>'
        }

        if (tarteaucitron.parameters.showAlertSmall === true) {
          html += '<div id="tarteaucitronAlertSmall" class="tarteaucitronAlertSmall' + orientation + '">'
          html += '   <button id="tarteaucitronManager" onclick="tarteaucitron.userInterface.openPanel();">'
          html += '       ' + tarteaucitron.lang.alertSmall
          html += '       <span id="tarteaucitronDot">'
          html += '           <span id="tarteaucitronDotGreen"></span>'
          html += '           <span id="tarteaucitronDotYellow"></span>'
          html += '           <span id="tarteaucitronDotRed"></span>'
          html += '       </span>'
          if (tarteaucitron.parameters.cookieslist === true) {
            html += '   </button><!-- @whitespace'
            html += '   --><button id="tarteaucitronCookiesNumber" onclick="tarteaucitron.userInterface.toggleCookiesList();">0</button>'
            html += '   <div id="tarteaucitronCookiesListContainer">'
            html += '       <button id="tarteaucitronClosePanelCookie" onclick="tarteaucitron.userInterface.closePanel();">'
            html += '           ' + tarteaucitron.lang.close
            html += '       </button>'
            html += '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">'
            html += '            <span class="tarteaucitronH2 h2" role="heading" aria-level="h2" id="tarteaucitronCookiesNumberBis">0 cookie</span>'
            html += '       </div>'
            html += '       <div id="tarteaucitronCookiesList"></div>'
            html += '    </div>'
          } else {
            html += '   </div>'
          }
          html += '</div>'
        }

        tarteaucitron.addScript(tarteaucitron.cdn + 'advertising.js?v=' + tarteaucitron.version, '', function () {
          if (tarteaucitronNoAdBlocker === true || tarteaucitron.parameters.adblocker === false) {
            // create a wrapper container at the same level than tarteaucitron so we can add an aria-hidden when tarteaucitron is opened
            /* var wrapper = document.createElement('div');
            wrapper.id = "contentWrapper";

            while (document.body.firstChild)
            {
                wrapper.appendChild(document.body.firstChild);
            }

            // Append the wrapper to the body
            document.body.appendChild(wrapper); */

            div.id = 'tarteaucitronRoot'
            body.appendChild(div, body)
            div.innerHTML = html

            if (tarteaucitron.job !== undefined) {
              tarteaucitron.job = tarteaucitron.cleanArray(tarteaucitron.job)
              for (index = 0; index < tarteaucitron.job.length; index += 1) {
                tarteaucitron.addService(tarteaucitron.job[index])
              }
            } else {
              tarteaucitron.job = []
            }

            tarteaucitron.isAjax = true

            tarteaucitron.job.push = function (id) {
              // ie <9 hack
              if (typeof tarteaucitron.job.indexOf === 'undefined') {
                tarteaucitron.job.indexOf = function (obj, start) {
                  var i;
                    var j = this.length
                  for (i = (start || 0); i < j; i += 1) {
                    if (this[i] === obj) {
 return i }
                  }

                  return -1
                };
              }

              if (tarteaucitron.job.indexOf(id) === -1) {
                Array.prototype.push.call(this, id)
              }
              tarteaucitron.launch[id] = false
              tarteaucitron.addService(id)
            };

            if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
              tarteaucitron.userInterface.openPanel()
            }

            tarteaucitron.cookie.number()
            setInterval(tarteaucitron.cookie.number, 60000)
          }
        }, tarteaucitron.parameters.adblocker)

        if (tarteaucitron.parameters.adblocker === true) {
          setTimeout(function () {
            if (tarteaucitronNoAdBlocker === false) {
              html = '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '" style="display:block" role="alert" aria-live="polite">'
              html += '   <p id="tarteaucitronDisclaimerAlert">'
              html += '       ' + tarteaucitron.lang.adblock + '<br/>'
              html += '       <strong>' + tarteaucitron.lang.adblock_call + '</strong>'
              html += '   </p>'
              html += '   <button id="tarteaucitronPersonalize" onclick="location.reload();">'
              html += '       ' + tarteaucitron.lang.reload
              html += '   </button>'
              html += '</div>'
              html += '<div id="tarteaucitronPremium"></div>'

              // create wrapper container
              /*var wrapper = document.createElement('div');
              wrapper.id = "contentWrapper";

              while (document.body.firstChild)
              {
                  wrapper.appendChild(document.body.firstChild);
              }

              // Append the wrapper to the body
              document.body.appendChild(wrapper);*/

              div.id = 'tarteaucitronRoot'
              body.appendChild(div, body)
              div.innerHTML = html
              tarteaucitron.pro('!adblocker=true')
            } else {
              tarteaucitron.pro('!adblocker=false')
            }
          }, 1500)
        }
      })
    });

    if (tarteaucitron.events.load) {
      tarteaucitron.events.load()
    }
  },
  addService: function (serviceId) {
    'use strict';
    var html = '';
      var s = tarteaucitron.services;
      var service = s[serviceId];
      var cookie = tarteaucitron.cookie.read();
      var hostname = document.location.hostname;
      var hostRef = document.referrer.split('/')[2];
      var isNavigating = (hostRef === hostname && window.location.href !== tarteaucitron.parameters.privacyUrl) ? true : false;
      var isAutostart = (!service.needConsent) ? true : false;
      var isWaiting = (cookie.indexOf(service.key + '=wait') >= 0) ? true : false;
      var isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false;
      var isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false;
      var isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0) ? true : false;
      var isDNTRequested = !!((navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1"));

    if (tarteaucitron.added[service.key] !== true) {
      tarteaucitron.added[service.key] = true

      html += '<li id="' + service.key + 'Line" class="tarteaucitronLine">'
      html += '   <div class="custom-control custom-switch right mr-3">'
      html += '       <input type="checkbox" class="custom-control-input" id="' + service.key + 'Allowed" onchange="tarteaucitron.userInterface.respond(document.getElementById(\'' + service.key + 'Allowed\'), document.getElementById(\'' + service.key + 'Allowed\').checked);">'
      html += '       <label class="custom-control-label col-form-label" for="' + service.key + 'Allowed">'
      html += service.name
      html += '       </label>'
      html += '   </div>'
      html += '   <div class="tarteaucitronName">'
      html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>'
      if (tarteaucitron.parameters.moreInfoLink == true) {
        html += '       <a href="https://opt-out.ferank.eu/service/' + service.key + '/" target="_blank" rel="noopener" title="' + tarteaucitron.lang.cookieDetail + ' ' + service.name + ' ' + tarteaucitron.lang.ourSite + ' ' + tarteaucitron.lang.newWindow + '">';
        html += '           ' + tarteaucitron.lang.more
        html += '       </a>'
        html += '        - '
        html += '       <a href="' + service.uri + '" target="_blank" rel="noopener" title="' + service.name + ' ' + tarteaucitron.lang.newWindow + '">'
        html += '           ' + tarteaucitron.lang.source
        html += '       </a>'
      }
      html += '   </div>'

      /*
      html += '   <div class="tarteaucitronAsk">';
      html += '       <button id="' + service.key + 'Allowed" class="tarteaucitronAllow btn btn-inverse btn-primary" onclick="tarteaucitron.userInterface.respond(this, true);">';
      html += '           &#10003; ' + tarteaucitron.lang.allow;
      html += '       </button> ';
      html += '       <button id="' + service.key  + 'Denied" class="tarteaucitronDeny btn btn-inverse btn-secondary" onclick="tarteaucitron.userInterface.respond(this, false);">';
      html += '           &#10007; ' + tarteaucitron.lang.deny;
      html += '       </button>';
      html += '   </div>';
      */
      html += '</li>'

      tarteaucitron.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block')

      if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
        document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html
      }

      tarteaucitron.userInterface.order(service.type)
    }

    // allow by default for non EU
    if (isResponded === false && tarteaucitron.user.bypass === true) {
      isAllowed = true
      tarteaucitron.cookie.create(service.key, true)
    }

    if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !tarteaucitron.highPrivacy) || isAllowed) {
      if (!isAllowed) {
        tarteaucitron.cookie.create(service.key, true)
      }
      if (tarteaucitron.launch[service.key] !== true) {
        tarteaucitron.launch[service.key] = true
        service.js()
      }
      tarteaucitron.state[service.key] = true
      tarteaucitron.userInterface.color(service.key, true)
    } else if (isDenied) {
      if (typeof service.fallback === 'function') {
        service.fallback()
      }
      tarteaucitron.state[service.key] = false
      tarteaucitron.userInterface.color(service.key, false)
    } else if (!isResponded && isDNTRequested && tarteaucitron.handleBrowserDNTRequest) {
      tarteaucitron.cookie.create(service.key, 'false')
      if (typeof service.fallback === 'function') {
        service.fallback()
      }
      tarteaucitron.state[service.key] = false
      tarteaucitron.userInterface.color(service.key, false)
    } else if (!isResponded) {
      tarteaucitron.cookie.create(service.key, 'wait')
      if (typeof service.fallback === 'function') {
        service.fallback()
      }
      tarteaucitron.userInterface.color(service.key, 'wait')
      tarteaucitron.userInterface.openAlert()
    }

    tarteaucitron.cookie.checkCount(service.key)
  },
  cleanArray: function cleanArray(arr) {
    'use strict';
    var i;
      var len = arr.length;
      var out = [];
      var obj = {};
      var s = tarteaucitron.services

    for (i = 0; i < len; i += 1) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = {}
        if (tarteaucitron.services[arr[i]] !== undefined) {
          out.push(arr[i])
        }
      }
    }

    out = out.sort(function (a, b) {
      if (s[a].type + s[a].key > s[b].type + s[b].key) {
 return 1 }
      if (s[a].type + s[a].key < s[b].type + s[b].key) {
 return -1 }
      return 0
    });

    return out
  },
  userInterface: {
    css: function (id, property, value) {
      'use strict';
      if (document.getElementById(id) !== null) {
        document.getElementById(id).style[property] = value
      }
    },
    respondAll: function (status) {
      'use strict';
      var s = tarteaucitron.services;
        var service;
        var key;
        var index = 0

      for (index = 0; index < tarteaucitron.job.length; index += 1) {
        service = s[tarteaucitron.job[index]]
        key = service.key
        if (tarteaucitron.state[key] !== status) {
          if (status === false && tarteaucitron.launch[key] === true) {
            tarteaucitron.reloadThePage = true
          }
          if (tarteaucitron.launch[key] !== true && status === true) {
            tarteaucitron.launch[key] = true
            tarteaucitron.services[key].js()
          }
          tarteaucitron.state[key] = status
          tarteaucitron.cookie.create(key, status)
          tarteaucitron.userInterface.color(key, status)
        }
      }
    },
    respond: function (el, status) {
      'use strict';
      var key = el.id.replace(new RegExp('(Eng\\d+|Allow|Deni)ed', 'g'), '')
      // return if same state
      if (tarteaucitron.state[key] === status) {
        return
      }

      if (status === false && tarteaucitron.launch[key] === true) {
        tarteaucitron.reloadThePage = true
      }

      // if not already launched... launch the service
      if (status === true) {
        if (tarteaucitron.launch[key] !== true) {
          tarteaucitron.launch[key] = true
          tarteaucitron.services[key].js()
        }
      }

      tarteaucitron.state[key] = status
      tarteaucitron.cookie.create(key, status)
      tarteaucitron.userInterface.color(key, status)
    },
    color: function (key, status) {
      'use strict';
      var gray = '#808080';
        var greenDark = '#1B870B';
        var greenLight = '#E6FFE2';
        var redDark = '#9C1A1A';
        var redLight = '#FFE2E2';
        var yellowDark = '#FBDA26';
        var c = 'tarteaucitron';
        var nbDenied = 0;
        var nbPending = 0;
        var nbAllowed = 0;
        var sum = tarteaucitron.job.length;
        var index;

      if (status === true) {
        tarteaucitron.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + greenDark)
        //tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
        //tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', gray);
        if(!document.getElementById(key + 'Allowed').checked) {
          document.getElementById(key + 'Allowed').setAttribute('checked', 'checked')
          document.getElementById(key + 'Allowed').checked = true;
        }

        document.getElementById(key + 'Line').classList.add('tarteaucitronIsAllowed')
        document.getElementById(key + 'Line').classList.remove('tarteaucitronIsDenied')
      } else if (status === false) {
        tarteaucitron.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + redDark)
        //tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
        //tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', redDark);
        if(document.getElementById(key + 'Allowed').checked) {
          document.getElementById(key + 'Allowed').setAttribute('checked', ''); // For IE
          document.getElementById(key + 'Allowed').removeAttribute('checked'); // For other browsers
          document.getElementById(key + 'Allowed').checked = false
        }

        document.getElementById(key + 'Line').classList.remove('tarteaucitronIsAllowed')
        document.getElementById(key + 'Line').classList.add('tarteaucitronIsDenied')
      }

      // check if all services are allowed
      for (index = 0; index < sum; index += 1) {
        if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
          nbDenied += 1
        } else if (tarteaucitron.state[tarteaucitron.job[index]] === undefined) {
          nbPending += 1
        } else if (tarteaucitron.state[tarteaucitron.job[index]] === true) {
          nbAllowed += 1
        }
      }

      tarteaucitron.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%')
      tarteaucitron.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%')
      tarteaucitron.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%')
      /*
      if (nbDenied === 0 && nbPending === 0) {
          tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', greenDark);
          tarteaucitron.userInterface.css(c + 'AllDenied', 'opacity', '0.4');
          tarteaucitron.userInterface.css(c + 'AllAllowed', 'opacity', '1');
      } else if (nbAllowed === 0 && nbPending === 0) {
          tarteaucitron.userInterface.css(c + 'AllAllowed', 'opacity', '0.4');
          tarteaucitron.userInterface.css(c + 'AllDenied', 'opacity', '1');
          tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', redDark);
      } else {
          tarteaucitron.userInterface.css(c + 'AllAllowed', 'opacity', '0.4');
          tarteaucitron.userInterface.css(c + 'AllDenied', 'opacity', '0.4');
      }
      */
      // close the alert if all service have been reviewed
      if (nbPending === 0) {
        tarteaucitron.userInterface.closeAlert()
      }

      if (tarteaucitron.services[key].cookies.length > 0 && status === false) {
        tarteaucitron.cookie.purge(tarteaucitron.services[key].cookies)
      }

      if (status === true) {
        if (document.getElementById('tacCL' + key) !== null) {
          document.getElementById('tacCL' + key).innerHTML = '...'
        }
        setTimeout(function () {
          tarteaucitron.cookie.checkCount(key)
        }, 2500)
      } else {
        tarteaucitron.cookie.checkCount(key)
      }
    },
    openPanel: function () {
      'use strict';

      tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block')
      tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block')
      tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none')

      document.getElementById('tarteaucitronClosePanel').focus()
      //document.getElementById('contentWrapper').setAttribute("aria-hidden", "true");
      document.getElementsByTagName('body')[0].classList.add('modal-open')
      tarteaucitron.userInterface.focusTrap()
      tarteaucitron.userInterface.jsSizing('main')
    },
    closePanel: function () {
      'use strict';

      if (document.location.hash === tarteaucitron.hashtag) {
        document.location.hash = ''
      }
      tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none')
      tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none')

      tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
        elem.style.display = 'none'
      }, true)

      if (tarteaucitron.reloadThePage === true) {
        window.location.reload()
      } else {
        tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none')
      }
      if (document.getElementById('tarteaucitronCloseAlert') !== null) {
        document.getElementById('tarteaucitronCloseAlert').focus()
      }
      // document.getElementById('contentWrapper').setAttribute("aria-hidden", "false");
      document.getElementsByTagName('body')[0].classList.remove('modal-open')

    },
    focusTrap: function () {
      'use strict';

      var focusableEls;
        var firstFocusableEl;
        var lastFocusableEl;
        var filtered;

      focusableEls = document.getElementById('tarteaucitron').querySelectorAll('a[href], button')
      filtered = []

      // get only visible items
      for (var i = 0, max = focusableEls.length; i < max; i++) {
        if (focusableEls[i].offsetHeight > 0) {
          filtered.push(focusableEls[i])
        }
      }

      firstFocusableEl = filtered[0]
      lastFocusableEl = filtered[filtered.length - 1]

      //loop focus inside tarteaucitron
      document.getElementById('tarteaucitron').addEventListener('keydown', function (evt) {
        if (evt.key === 'Tab' || evt.keyCode === 9) {
          if (evt.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus()
              evt.preventDefault()
            }
          } else /* tab */ if (document.activeElement === lastFocusableEl) {
              firstFocusableEl.focus();
              evt.preventDefault();
            }
        }
      })
    },
    openAlert: function () {
      'use strict';
      var c = 'tarteaucitron'
      tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'block')
      tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'none')
      tarteaucitron.userInterface.css(c + 'AlertBig', 'display', 'block')
    },
    closeAlert: function () {
      'use strict';
      var c = 'tarteaucitron'
      tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'none')
      tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'block')
      tarteaucitron.userInterface.css(c + 'AlertBig', 'display', 'none')
      tarteaucitron.userInterface.jsSizing('box')
    },
    toggleCookiesList: function () {
      'use strict';
      var div = document.getElementById('tarteaucitronCookiesListContainer')

      if (div === null) {
        return
      }

      if (div.style.display !== 'block') {
        tarteaucitron.cookie.number()
        div.style.display = 'block'
        tarteaucitron.userInterface.jsSizing('cookie')
        tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none')
        tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block')
        tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
          elem.style.display = 'none'
        }, true)
      } else {
        div.style.display = 'none'
        tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none')
        tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none')
      }
    },
    toggle: function (id, closeClass) {
      'use strict';
      var div = document.getElementById(id)

      if (div === null) {
        return
      }

      if (closeClass !== undefined) {
        tarteaucitron.fallback([closeClass], function (elem) {
          if (elem.id !== id) {
            elem.style.display = 'none'
          }
        }, true)
      }

      if (div.style.display !== 'block') {
        div.style.display = 'block'
      } else {
        div.style.display = 'none'
      }
    },
    order: function (id) {
      'use strict';
      var main = document.getElementById('tarteaucitronServices_' + id);
        var allDivs;
        var store = [];
        var i;

      if (main === null) {
        return
      }

      allDivs = main.childNodes

      if (typeof Array.prototype.map === 'function') {
        Array.prototype.map.call(main.children, Object).sort(function (a, b) {
          // var mainChildren = Array.from(main.children);
          // mainChildren.sort(function (a, b) {
          if (tarteaucitron.services[a.id.replace(/Line/g, '')].name > tarteaucitron.services[b.id.replace(/Line/g, '')].name) {
 return 1 }
          if (tarteaucitron.services[a.id.replace(/Line/g, '')].name < tarteaucitron.services[b.id.replace(/Line/g, '')].name) {
 return -1 }
          return 0
        }).forEach(function (element) {
          main.appendChild(element)
        });
      }
    },
    jsSizing: function (type) {
      'use strict';
      var scrollbarMarginRight = 10;
        var scrollbarWidthParent;
        var scrollbarWidthChild;
        var servicesHeight;
        var e = window;
        var a = 'inner';
        var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var mainTop;
        var mainHeight;
        var closeButtonHeight;
        var headerHeight;
        var cookiesListHeight;
        var cookiesCloseHeight;
        var cookiesTitleHeight;
        var paddingBox;
        var alertSmallHeight;
        var cookiesNumberHeight;

      if (type === 'box') {
        if (document.getElementById('tarteaucitronAlertSmall') !== null && document.getElementById('tarteaucitronCookiesNumber') !== null) {
          // reset
          tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', '0px 10px')

          // calculate
          alertSmallHeight = document.getElementById('tarteaucitronAlertSmall').offsetHeight
          cookiesNumberHeight = document.getElementById('tarteaucitronCookiesNumber').offsetHeight
          paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2

          // apply
          tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', paddingBox + 'px 10px')
        }
      } else if (type === 'main') {
        // get the real window width for media query
        if (window.innerWidth === undefined) {
          a = 'client'
          e = document.documentElement || document.body
        }

        // height of the services list container
        if (document.getElementById('tarteaucitron') !== null && document.getElementById('tarteaucitronClosePanel') !== null && document.getElementById('tarteaucitronMainLineOffset') !== null) {
          // reset
          tarteaucitron.userInterface.css('tarteaucitronServices', 'height', 'auto')

          // calculate
          mainHeight = document.getElementById('tarteaucitron').offsetHeight
          closeButtonHeight = document.getElementById('tarteaucitronClosePanel').offsetHeight

          // apply
          servicesHeight = (mainHeight - closeButtonHeight + 2)
          tarteaucitron.userInterface.css('tarteaucitronServices', 'height', servicesHeight + 'px')
          tarteaucitron.userInterface.css('tarteaucitronServices', 'overflow-x', 'auto')
        }

        // align the main allow/deny button depending on scrollbar width
        if (document.getElementById('tarteaucitronServices') !== null && document.getElementById('tarteaucitronScrollbarChild') !== null) {
          // media query
          if (e[a + 'Width'] <= 479) {
            tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px')
          } else if (e[a + 'Width'] <= 767) {
            scrollbarMarginRight = 12
          }

          scrollbarWidthParent = document.getElementById('tarteaucitronServices').offsetWidth
          scrollbarWidthChild = document.getElementById('tarteaucitronScrollbarChild').offsetWidth
          tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px')
        }

        // center the main panel
        if (document.getElementById('tarteaucitron') !== null) {
          // media query
          mainTop = e[a + 'Width'] <= 767 ? 0 : ((windowInnerHeight - document.getElementById('tarteaucitron').offsetHeight) / 2) - 21;

          // correct
          if (mainTop < 0) {
            mainTop = 0
          }

          if (document.getElementById('tarteaucitronMainLineOffset') !== null) {
            if (document.getElementById('tarteaucitron').offsetHeight < (windowInnerHeight / 2)) {
              mainTop -= document.getElementById('tarteaucitronMainLineOffset').offsetHeight
            }
          }

          // apply
          tarteaucitron.userInterface.css('tarteaucitron', 'top', mainTop + 'px')
        }

      } else if (type === 'cookie') {
        // put cookies list at bottom
        if (document.getElementById('tarteaucitronAlertSmall') !== null) {
          tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'bottom', (document.getElementById('tarteaucitronAlertSmall').offsetHeight) + 'px')
        }

        // height of cookies list
        if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
          // reset
          tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', 'auto')

          // calculate
          cookiesListHeight = document.getElementById('tarteaucitronCookiesListContainer').offsetHeight
          cookiesCloseHeight = document.getElementById('tarteaucitronClosePanelCookie').offsetHeight
          cookiesTitleHeight = document.getElementById('tarteaucitronCookiesTitle').offsetHeight

          // apply
          tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px')
        }
      }
    }
  },
  cookie: {
    owner: {},
    create: function (key, status) {
      'use strict';

      if (tarteaucitronForceExpire !== '') {
        // The number of day cann't be higher than 1 year
        timeExipre = (tarteaucitronForceExpire > 365) ? 31536000000 : tarteaucitronForceExpire * 86400000 // Multiplication to tranform the number of days to milliseconds
      }

      var d = new Date();
        var time = d.getTime();
        var expireTime = time + timeExipre; // 365 days
        var regex = new RegExp("!" + key + "=(wait|true|false)", "g");
        var cookie = tarteaucitron.cookie.read().replace(regex, "");
        var value = tarteaucitron.parameters.cookieName + '=' + cookie + '!' + key + '=' + status;
        var domain = (tarteaucitron.parameters.cookieDomain !== undefined && tarteaucitron.parameters.cookieDomain !== '') ? 'domain=' + tarteaucitron.parameters.cookieDomain + ';' : ''

      if (tarteaucitron.cookie.read().indexOf(key + '=' + status) === -1) {
        tarteaucitron.pro('!' + key + '=' + status)
      }

      d.setTime(expireTime)
      document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;' + domain
    },
    read: function () {
      'use strict';
      var nameEQ = tarteaucitron.parameters.cookieName + '=',
        ca = document.cookie.split(';'),
        i,
        c

      for (i = 0; i < ca.length; i += 1) {
        c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length)
        }
      }

      return ''
    },
    purge: function (arr) {
      'use strict';
      var i

      for (i = 0; i < arr.length; i += 1) {
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;'
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';'
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';'
      }
    },
    checkCount: function (key) {
      'use strict';
      var arr = tarteaucitron.services[key].cookies;
        var nb = arr.length;
        var nbCurrent = 0;
        var html = '';
        var i;
        var status = document.cookie.indexOf(key + '=true')

      if (status >= 0 && nb === 0) {
        html += tarteaucitron.lang.useNoCookie
      } else if (status >= 0) {
        for (i = 0; i < nb; i += 1) {
          if (document.cookie.indexOf(arr[i] + '=') !== -1) {
            nbCurrent += 1
            if (tarteaucitron.cookie.owner[arr[i]] === undefined) {
              tarteaucitron.cookie.owner[arr[i]] = []
            }
            if (tarteaucitron.cookie.crossIndexOf(tarteaucitron.cookie.owner[arr[i]], tarteaucitron.services[key].name) === false) {
              tarteaucitron.cookie.owner[arr[i]].push(tarteaucitron.services[key].name)
            }
          }
        }

        if (nbCurrent > 0) {
          html += tarteaucitron.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie'
          if (nbCurrent > 1) {
            html += 's'
          }
          html += '.'
        } else {
          html += tarteaucitron.lang.useNoCookie
        }
      } else if (nb === 0) {
        html = tarteaucitron.lang.noCookie
      } else {
        html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie'
        if (nb > 1) {
          html += 's'
        }
        html += '.'
      }

      if (document.getElementById('tacCL' + key) !== null) {
        document.getElementById('tacCL' + key).innerHTML = html
      }
    },
    crossIndexOf: function (arr, match) {
      'use strict';
      var i
      for (i = 0; i < arr.length; i += 1) {
        if (arr[i] === match) {
          return true
        }
      }

      return false
    },
    number: function () {
      'use strict';
      var cookies = document.cookie.split(';');
        var nb = (document.cookie !== '') ? cookies.length : 0;
        var html = '';
        var i;
        var name;
        var namea;
        var nameb;
        var c;
        var d;
        var s = (nb > 1) ? 's' : '';
        var savedname;
        var regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;
        var regexedDomain = (tarteaucitron.cdn.match(regex) !== null) ? tarteaucitron.cdn.match(regex)[1] : tarteaucitron.cdn;
        var host = (tarteaucitron.domain !== undefined) ? tarteaucitron.domain : regexedDomain

      cookies = cookies.sort(function (a, b) {
        namea = a.split('=', 1).toString().replace(/ /g, '')
        nameb = b.split('=', 1).toString().replace(/ /g, '')
        c = (tarteaucitron.cookie.owner[namea] !== undefined) ? tarteaucitron.cookie.owner[namea] : '0'
        d = (tarteaucitron.cookie.owner[nameb] !== undefined) ? tarteaucitron.cookie.owner[nameb] : '0'
        if (c + a > d + b) {
 return 1 }
        if (c + a < d + b) {
 return -1 }
        return 0
      });

      if (document.cookie !== '') {
        for (i = 0; i < nb; i += 1) {
          name = cookies[i].split('=', 1).toString().replace(/ /g, '')
          if (tarteaucitron.cookie.owner[name] !== undefined && tarteaucitron.cookie.owner[name].join(' // ') !== savedname) {
            savedname = tarteaucitron.cookie.owner[name].join(' // ')
            html += '<div class="tarteaucitronHidden">'
            html += '     <span class="tarteaucitronTitle tarteaucitronH3 h3" role="heading" aria-level="h3">'
            html += '        ' + tarteaucitron.cookie.owner[name].join(' // ')
            html += '    </span>'
            html += '</div><ul class="cookie-list">'
          } else if (tarteaucitron.cookie.owner[name] === undefined && host !== savedname) {
            savedname = host
            html += '<div class="tarteaucitronHidden">'
            html += '     <span class="tarteaucitronTitle tarteaucitronH3 h3" role="heading" aria-level="h3">'
            html += '        ' + host
            html += '    </span>'
            html += '</div><ul class="cookie-list">'
          }
          html += '<li class="tarteaucitronCookiesListMain">'
          html += '    <div class="tarteaucitronCookiesListLeft"><button class="btn btn-sm btn-info" onclick="tarteaucitron.cookie.purge([\'' + cookies[i].split('=', 1) + '\']);tarteaucitron.cookie.number();tarteaucitron.userInterface.jsSizing(\'cookie\');return false">&times;</button> <strong class="text-dark">' + name + '</strong>'
          html += '    </div>'
          html += '    <div class="tarteaucitronCookiesListRight">' + cookies[i].split('=').slice(1).join('=') + '</div>'
          html += '</li>'
        }
        html += '</ul>'
      } else {
        html += '<div class="tarteaucitronCookiesListMain">'
        html += '    <div class="tarteaucitronCookiesListLeft"><strong>-</strong></div>'
        html += '    <div class="tarteaucitronCookiesListRight"></div>'
        html += '</div>'
      }

      html += '<div class="tarteaucitronHidden" style="height:20px;display:block"></div>'

      if (document.getElementById('tarteaucitronCookiesList') !== null) {
        document.getElementById('tarteaucitronCookiesList').innerHTML = html
      }

      if (document.getElementById('tarteaucitronCookiesNumber') !== null) {
        document.getElementById('tarteaucitronCookiesNumber').innerHTML = nb
      }

      if (document.getElementById('tarteaucitronCookiesNumberBis') !== null) {
        document.getElementById('tarteaucitronCookiesNumberBis').innerHTML = nb + ' cookie' + s
      }

      for (i = 0; i < tarteaucitron.job.length; i += 1) {
        tarteaucitron.cookie.checkCount(tarteaucitron.job[i])
      }
    }
  },
  getLanguage: function () {
    'use strict';
    if (!navigator) {
 return 'en' }

    var availableLanguages = 'cs,en,fr,es,it,de,nl,pt,pl,ru,el';
      var defaultLanguage = 'en';
      var lang = navigator.language || navigator.browserLanguage ||
        navigator.systemLanguage || navigator.userLang || null;
      var userLanguage = lang.slice(0, 2);

    if (tarteaucitronForceLanguage !== '') {
      if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
        return tarteaucitronForceLanguage
      }
    }

    if (availableLanguages.indexOf(userLanguage) === -1) {
      return defaultLanguage
    }
    return userLanguage
  },
  getLocale: function () {
    "use strict";
    if (!navigator) { return 'en_US'; }

    var lang = navigator.language || navigator.browserLanguage ||
      navigator.systemLanguage || navigator.userLang || null,
      userLanguage = lang.substr(0, 2);

    if (userLanguage === 'fr') {
      return 'fr_FR';
    } if (userLanguage === 'en') {
      return 'en_US';
    } else if (userLanguage === 'de') {
      return 'de_DE';
    } else if (userLanguage === 'es') {
      return 'es_ES';
    } else if (userLanguage === 'it') {
      return 'it_IT';
    } else if (userLanguage === 'pt') {
      return 'pt_PT';
    } else if (userLanguage === 'nl') {
      return 'nl_NL';
    } else if (userLanguage === 'el') {
      return 'el_EL';
    } else {
      return 'en_US';
    }
  },
  addScript: function (url, id, callback, execute, attrName, attrVal) {
    'use strict';
    var script;
      var done = false

    if (execute === false) {
      if (typeof callback === 'function') {
        callback()
      }
    } else {
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = (id !== undefined) ? id : ''
      script.async = true
      script.src = url

      if (attrName !== undefined && attrVal !== undefined) {
        script.setAttribute(attrName, attrVal)
      }

      if (typeof callback === 'function') {
        script.onreadystatechange = script.addEventListener('load', function () {
          var state = script.readyState;
          if (!done && (!state || /loaded|complete/.test(state))) {
            done = true;
            callback();
          }
        });
      }

      document.getElementsByTagName('head')[0].appendChild(script)
    }
  },
  makeAsync: {
    antiGhost: 0,
    buffer: '',
    init: function (url, id) {
      'use strict';
      var savedWrite = document.write;
        var savedWriteln = document.writeln

      document.write = function (content) {
        tarteaucitron.makeAsync.buffer += content
      };

      document.writeln = function (content) {
        tarteaucitron.makeAsync.buffer += content.concat('\n');
      }

      setTimeout(function () {
        document.write = savedWrite
        document.writeln = savedWriteln
      }, 20000)

      tarteaucitron.makeAsync.getAndParse(url, id)
    },
    getAndParse: function (url, id) {
      'use strict';
      if (tarteaucitron.makeAsync.antiGhost > 9) {
        tarteaucitron.makeAsync.antiGhost = 0
        return;
      }

      tarteaucitron.makeAsync.antiGhost += 1
      tarteaucitron.addScript(url, '', function () {
        if (document.getElementById(id) !== null) {
          document.getElementById(id).innerHTML += '<span style=\'display:none\'>&nbsp;</span>' + tarteaucitron.makeAsync.buffer
          tarteaucitron.makeAsync.buffer = ''
          tarteaucitron.makeAsync.execJS(id)
        }
      })
    },
    execJS: function (id) {
      /* not strict because third party scripts may have errors */
      var i;
        var scripts;
        var childId;
        var type;

      if (document.getElementById(id) === null) {
        return
      }

      scripts = document.getElementById(id).getElementsByTagName('script')
      for (i = 0; i < scripts.length; i += 1) {
        type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : ''
        if (type === '') {
          type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : ''
        }
        if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
          childId = id + Math.floor(Math.random() * 99999999999)
          document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>'
          tarteaucitron.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId)
        } else if (type.indexOf('javascript') !== -1 || type === '') {
          eval(scripts[i].innerHTML)
        }
      }
    }
  },
  fallback: function (matchClass, content, noInner) {
    'use strict';
    var elems = document.getElementsByTagName('*');
      var i;
      var index = 0

    for (i in elems) {
      if (elems[i] !== undefined) {
        for (index = 0; index < matchClass.length; index += 1) {
          if ((' ' + elems[i].className + ' ')
            .indexOf(' ' + matchClass[index] + ' ') > -1) {
            if (typeof content === 'function') {
              if (noInner === true) {
                content(elems[i])
              } else {
                elems[i].innerHTML = content(elems[i])
              }
            } else {
              elems[i].innerHTML = content
            }
          }
        }
      }
    }
  },
  engage: function (id) {
    'use strict';
    var html = '';
      var r = Math.floor(Math.random() * 100000);
      var engage = tarteaucitron.services[id].name + ' ' + tarteaucitron.lang.fallback

    if (tarteaucitron.lang['engage-' + id] !== undefined) {
      engage = tarteaucitron.lang['engage-' + id]
    }

    html += '<div class="tac_activate">'
    html += '   <div class="tac_float">'
    html += '      ' + engage
    html += '      <button class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '" onclick="tarteaucitron.userInterface.respond(this, true);">'
    html += '          &#10003; ' + tarteaucitron.lang.allow
    html += '       </button>'
    html += '   </div>'
    html += '</div>'

    return html
  },
  extend: function (a, b) {
    'use strict';
    var prop
    for (prop in b) {
      if (b.hasOwnProperty(prop)) {
        a[prop] = b[prop]
      }
    }
  },
  proTemp: '',
  proTimer: function () {
    'use strict';
    setTimeout(tarteaucitron.proPing, 1000)
  },
  pro: function (list) {
    'use strict';
    tarteaucitron.proTemp += list
    clearTimeout(tarteaucitron.proTimer)
    tarteaucitron.proTimer = setTimeout(tarteaucitron.proPing, 2500)
  },
  proPing: function () {
    'use strict';
    if (tarteaucitron.uuid !== '' && tarteaucitron.uuid !== undefined && tarteaucitron.proTemp !== '') {
      var div = document.getElementById('tarteaucitronPremium');
        var timestamp = new Date().getTime();
        var url = '//opt-out.ferank.eu/premium.php?'

      if (div === null) {
        return
      }

      url += 'domain=' + tarteaucitron.domain + '&'
      url += 'uuid=' + tarteaucitron.uuid + '&'
      url += 'c=' + encodeURIComponent(tarteaucitron.proTemp) + '&'
      url += '_' + timestamp

      div.innerHTML = '<img src="' + url + '" style="display:none" />'

      tarteaucitron.proTemp = ''
    }

    tarteaucitron.cookie.number()
  },
  AddOrUpdate : function (source, custom) {
    /**
     Utility function to Add or update the fields of obj1 with the ones in obj2
     */
    for (key in custom) {
      if (custom[key] instanceof Object) {
        source[key] = tarteaucitron.AddOrUpdate(source[key], custom[key])
      }else {
        source[key] = custom[key]
      }
    }

    return source
  },
  getElemWidth: function (elem) {
    return elem.getAttribute('width') || elem.clientWidth
  },
  getElemHeight: function (elem) {
    return elem.getAttribute('height') || elem.clientHeight
  }
}
