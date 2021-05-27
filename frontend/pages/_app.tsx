import '../styles/globals.css'
import '../styles/colors.css'
import '../styles/nav.css'
import '../styles/msg.css'
import '../styles/chatbox.css'
import '../styles/loading.css'
import '../styles/landing.css'


import React from 'react';

interface config {
  API_URL: string,
  API_VERSION: number,
  GATEWAY_URL: string,
  GATEWAY_VERSION: number,
  GATEWAY_ENCODING: string,
  LOADING_IMAGE?: string,
  BASE_URL: string
}


declare global {
  interface Window { CONFIG: config; }
}

function Hangle({ Component, pageProps }) {

  /**
   * Setup window config
   */

  if (process.browser) {

    window.CONFIG = {
      API_URL: 'https://hangle.me/api',
      API_VERSION: 1,
      GATEWAY_URL: 'wss://gateway.hangle.me',
      GATEWAY_VERSION: 1,
      GATEWAY_ENCODING: 'json',
      BASE_URL: 'https://hangle.me',
    }

    window.CONFIG.LOADING_IMAGE = `${window.CONFIG.BASE_URL}/hangle.png`

    /**
     * mount the websocket
     */

    let wss = new wshost(window.CONFIG.GATEWAY_VERSION, window.CONFIG.GATEWAY_ENCODING, null);

    /**
     * render the page
     */


    /**
     * we do a little electron
     */

    return <Component {...pageProps} gateway={wss} />


  } else return null

}



function generate_token(length) {
  //edit the token allowed characters
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890._-!%[]()".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}



/* websocket start */



class wshost {

  version: number;
  encoding: "json";
  compression: null;
  ws: WebSocket;

  constructor(version, encoding, compression) {
    this.version = version;
    this.encoding = encoding;
    this.compression = compression;

    this.ws;

    this.mount();
  }


  logger(module, msg) {
    console.log(`%c [${module}]`, `color: #FF00FF;`, msg);
  }

  async mount() {
    this.ws = null;
    this.ws = new WebSocket(`${window.CONFIG.GATEWAY_URL}?encoding=${this.encoding}&v=${this.version}&nocompression`)

    // basic event logging

    this.ws.addEventListener('message', (msg) => {
      let data = JSON.parse(msg.data);

      if (data.t === 'READY') this.logger(`Gateway`, `READY via ${data.d.gatewayProd} with device: ${data.d.$device.connect_via.protocol}`)
    })

    let self = this;
    this.wsready((msg) => {
      self.authenticate()
      this.logger('Gateway', `Connection Established`)
    })
  }

  authenticate() {
    this.send(
      2,
      {
        token: 'z1pkyhqqg4u470d9rp1659oqh8zlij2xgqvu45m5sdkug7ts3fl1e1qs72auwfq724ut9dzhf73ltrc339lu8d5h59'
      },
      'AUTHENTICATE'
    )
  }

  async runQuery(t, d) {
    return await this.socketSend(0, t, d)
  }

  async runOp(op, d, t?) {
    return await this.socketSend(op, t ?? '', d)
  }

  wsready(callback) {
    let self = this;
    setTimeout(
      function () {
        if (self.ws?.readyState === 1) {
          self.logger('Gateway', 'Connection Established')
          if (callback != null) {
            callback();
          }
        } else if (self.ws?.readyState === 3) {
          self.mount(); // reestablish gateway connection
          self.logger(`Gateway`, `Gateway connection seems to have disconnected. retrying`)
        } else {
          console.log("[Gateway] connecting..")
          self.wsready(callback);
        }

      }, 40); // wait 40 miliseconds for the connection...
  }

  send(op, d, t) {
    this.ws.send(JSON.stringify({ op, d, t }))
  }

  async socketSend(op, t, d) {
    return new Promise((res, rej) => {
      this.wsready(() => {
        let nonce = generate_token(40); // callback
        this.ws.send(JSON.stringify(
          {
            op,
            t,
            d,
            s: Date.now(),
            nonce
          }
        ))


        let handle = (evt) => {
          let data = JSON.parse(evt.data);

          if (data.nonce !== nonce) return;

          res(data.d)

          this.ws.removeEventListener('message', handle)
        }

        this.ws.addEventListener('message', handle);

      })
    })
  }
}


export default Hangle;
