const filterPhone = function(param) {
  const str = param.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/g, "$1****$3");
  return str;
};

module.exports = {
  filterPhone
};
