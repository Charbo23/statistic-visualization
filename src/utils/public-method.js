
export function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function GetPercent(num, total) {
  /// <summary>
  /// 求百分比
  /// </summary>
  /// <param name="num">当前数</param>
  /// <param name="total">总数</param>
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return 0
  }
  return total <= 0 ? 0 : Math.round(num / total * 10000) / 100.00;
}
