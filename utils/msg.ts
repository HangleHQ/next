const urlRegex = /(https?:\/\/[^\s]+)/g;




function isValidImageURL(str) {
    if (typeof str !== 'string') return false;
  
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|ico|tiff|bmp)\/?$/gi)
  }


  function stripTrailingSlash(str) {
    if (str.substr(-1) === '/') {
      return str.substr(0, str.length - 1);
    }
    return str;
  }

  function getURL(text) {

    if (!text.match(urlRegex)?.length) return null;

    return text.replace(urlRegex, function (url) {
      let urla = url.split('?');


      if (!urla[0].endsWith('/') && urla.length === 1) urla[0] += '/'

      urla[0] = urla[0].toLowerCase();

      url = urla.join('?');

      return stripTrailingSlash(url);
    });
  }

  export {
      isValidImageURL,
      getURL,
      stripTrailingSlash
  }