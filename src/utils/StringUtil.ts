// 格式化手机号，分组并使用空格 " " 分割
export function formatPhone(phone: string): string {
  let trim: string = phone.replace(/\s+/g, '');
  // 进行 3 4 4 位数分组展示
  const result = [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7, 11)]
    .filter(item => !!item)
    .join(' ');
  return result;
}

// 去除空格
export function replaceBlank(phone: string): string {
  return phone ? phone.replace(/\s+/g, '') : '';
}
