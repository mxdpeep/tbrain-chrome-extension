/**
 * T-Brain Google Chrome Extension
 * Coded using Rapid PHP 2011 11.2
 * (c) 2011-2012 Filip Oščádal <filip@mxd.cz>
 * Published under GNU GPL v3+ license
 */


function twister(node)
{

  // explode data by regular expression
  function expl(data, reg, padding)
  {
    var r = [];
    for (var j = 0, k = data.length; j < k; j++)
    {
      var d = data[j];
      if (reg.test(d))
      {
        var spl = d.split(reg);
        for (var i = 0, l = spl.length; i < l; i++)
        {
          r.push(spl[i]);
          r.push(padding);
        }
        // remove last element
        r.pop();
      }
      else
      {
        // no catch, just add it
        r.push(d);
      }
    }
    return r;
  }

  // array shuffle by Jonas Raoni Soares Silva
  function shuffle(o)
  {
  	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  	return o;
  }

  var data = [];
  data.push(node.textContent);

  // tokenize
  data = expl(data, / /, ' ');
  data = expl(data, /\./, '.');
  data = expl(data, /\//, '/');
  data = expl(data, /,/, ',');
  data = expl(data, /;/, ';');
  data = expl(data, /:/, ':');
  data = expl(data, /\[/, '[');
  data = expl(data, /\</, '<');
  data = expl(data, /\(/, '(');
  data = expl(data, /\]/, ']');
  data = expl(data, /\>/, '>');
  data = expl(data, /\)/, ')');
  data = expl(data, /\{/, '{');
  data = expl(data, /\}/, '}');
  data = expl(data, /\!/, '!');
  data = expl(data, /\?/, '?');
  data = expl(data, /\$/, '$');
  data = expl(data, /\*/, '*');
  data = expl(data, /\-/, '-');
  data = expl(data, /\&/, '&');
  data = expl(data, /@/, '@');
  data = expl(data, /=/, '=');
  data = expl(data, /\+/, '+');
  data = expl(data, /\|/, '|');
  data = expl(data, /"/, '"');
  data = expl(data, /'/, "'");

  // process tokenized array
  for (var j = 0, k = data.length; j < k; j++)
  {
    var a, t1, t2, t3;
    var x = data[j];
    // do not apply to short words and with uppercase or numbers
    if (x.length > 3 && !/([A-Z][0-9])/.test(x))
    {
      a = x.split('');
      // take out first and last character(s)
      t1 = a.shift();
      t2 = a.pop();
      if (x.length > 5) t3 = a.pop();
      // shuffle just the middle of the word
      a = shuffle(a);
      // put back removed characters
      if (x.length > 5) a.push(t3);
      a.push(t2);
      a.unshift(t1);
      // recreate the string
      data[j] = a.join('');
    }
  }
  node.textContent = data.join('');
  return true;
}

// search recursively for text nodes and apply twister
function TBrain()
{
  var node = document.body;
  var includeWhitespaceNodes = 1
  var textNodes = [], whitespace = /^\s*$/;

  function getTextNodes(node)
  {
    if (node.nodeType == 3)
    {
      if (includeWhitespaceNodes || !whitespace.test(node.nodeValue))
      {
        textNodes.push(node);
        twister(node);
      }
    }
    else
    {
      for (var i = 0, l = node.childNodes.length; i < l; ++i)
      {
        getTextNodes(node.childNodes[i]);
      }
    }
  }
  getTextNodes(node);
}

console.log('flipping...');
TBrain();
