"use strict";

const execSync = require('child_process').execSync;

module.exports = {
    parse: (text, port, annotators, format) => {
      text = text.replace(/[^a-zA-Z0-9\s\p{P}]/g, ''); // Remove emojis and other untokenizable characters
      text = text.replace(/(^|[^@\w])@(\w{1,15})\b/g, ''); // Remove twitter usernames
      let output = execSync('output=$(wget --post-data '+"'"+text+"' "+"'localhost:"+port+'/?properties={"annotators": '+'"'+annotators+'", "outputFormat": "'+format+'"'+"}' -qO -) && echo $output",{ encoding: 'utf8' });
      output = output.replace(/(\r\n|\n|\r)/gm, ''); // Needed to fix response JSON
      return JSON.parse(output);
    },
};