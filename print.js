/**
 * Created by rocky on 2018/1/25.
 * console.log('\x1B'+'[33;3m%s:', "path");  //yellow
 */
/**
 * 样式字典
 * @type {{bold: string, italic: string, underline: string, inverse: string, strikethrough: string}}
 */
var fontStyle = {
  'bold': '1',
  'italic': '3',
  'underline': '4',
  'inverse': '7',
  'strikethrough': '9'
}
/**
 * 颜色字典
 * @type {{white: string, grey: string, black: string, blue: string, cyan: string, green: string, magenta: string, red: string, yellow: string}}
 */
var fontColor = {
  'white': '37',
  'grey': '90',
  'black': '30',
  'blue': '34',
  'cyan': '36',
  'green': '32',
  'magenta': '35',
  'red': '31',
  'yellow': '33'
}
/**
 * 背景色字典
 * @type {{whiteBG: string, greyBG: string, blackBG: string, blueBG: string, cyanBG: string, greenBG: string, magentaBG: string, redBG: string, yellowBG: string}}
 */
var fontBG = {
  'whiteBG'       : '47',
  'greyBG'        : '49',
  'blackBG'       : '40',
  'blueBG'        : '44',
  'cyanBG'        : '46',
  'greenBG'       : '42',
  'magentaBG'     : '45',
  'redBG'         : '41',
  'yellowBG'      : '43',
};
//输出排列规则 '\x1B[${fontStyle};${fontColor};${fontBG}m'
function useStyle(style, color, bg) {
  var use = [];
  if(style && fontStyle[style]) {
    use.push(fontStyle[style]);
  }
  if(color && fontColor[color]) {
    use.push(fontColor[color]);
  }
  if(bg && fontBG[bg]) {
    use.push(fontBG[bg])
  }
  return '\x1B[' + (use.length == 0 ? "1" : use.join(";")) + "m";
}

var arrowStyle = useStyle("", "yellow");
var messageStyle = useStyle("", "blue");
var successStyle = useStyle("blod", "green");
var errorStyle = useStyle("blod", "red");
var msgStyle = useStyle("blod", "yellow");

function print(title, message, type, arrowStyle, messageStyle, msgStyle) {
  var log = `${arrowStyle}<<< ${messageStyle}%s ${messageStyle}`
  var log1 = `${messageStyle}${arrowStyle}>>>`
  var log2 = `\n${msgStyle}%s`;
  if(title) {
    log += "%s ";
  }
  log += log1;
  if(message) {
    log += log2;
  }
  console.log(log, type|| "Message", title || "", message || "")
}

module.exports = {
  useStyle : useStyle,
  message : function(title, message) {
    print(title, message, "Message", arrowStyle, messageStyle, msgStyle)
  },
  success : function (title, message) {
    print(title, message, "Success", arrowStyle, successStyle, successStyle)
  },
  error : function (title, message) {
    print(title, message, "Error", arrowStyle, errorStyle, errorStyle)
  },
  echo : print
}
// module.exports.message("aaa", "1231")
// module.exports.success("aaa", "1231")
// module.exports.error("aaa", "1231")
