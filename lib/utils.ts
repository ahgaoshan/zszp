import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const FAMILY_SURNAME = process.env.NEXT_PUBLIC_FAMILY_SURNAME || "张";

/**
 * 从传统纪年/农历日期字符串中提取近似公历年份
 * 支持格式：
 *   - 公历: "1890-03-15"
 *   - 年号纪年: "光绪十七年" → ~1891
 *   - 民国纪年: "民国三十三年" → 1944
 *   - 干支纪年: "甲午年" → 无法精确定位，返回 null
 *   - 纯数字年份: "1890" → 1890
 */
export function parseYearFromCalendar(dateStr: string | null): number | null {
  if (!dateStr) return null;

  const str = dateStr.trim();

  // 1. 标准公历日期 YYYY-MM-DD
  const gregorianMatch = str.match(/^(\d{4})-/);
  if (gregorianMatch) return parseInt(gregorianMatch[1], 10);

  // 2. 纯四位数字年份
  const plainYearMatch = str.match(/^(\d{4})/);
  if (plainYearMatch && plainYearMatch.index === 0) return parseInt(plainYearMatch[1], 10);

  // 3. 民国纪年：民国XX年 → 1911 + XX
  const minguoMatch = str.match(/民国\s*(\d+)[\s年]+/);
  if (minguoMatch) return 1911 + parseInt(minguoMatch[1], 10);

  // 4. 清朝年号纪年（常见）
  // 年号 → 起始年映射
  const qingEmperors: Record<string, number> = {
    '康熙': 1662, '雍正': 1723, '乾隆': 1736, '嘉庆': 1796,
    '道光': 1821, '咸丰': 1851, '同治': 1862, '光绪': 1875, '宣统': 1909,
  };
  for (const [era, startYear] of Object.entries(qingEmperors)) {
    const eraMatch = str.match(new RegExp(`${era}\\s*(\\d+)[\\s年]+`));
    if (eraMatch) return startYear + parseInt(eraMatch[1], 10) - 1;
  }

  // 5. 明朝年号（常见）
  const mingEmperors: Record<string, number> = {
    '洪武': 1368, '建文': 1399, '永乐': 1403, '洪熙': 1425,
    '宣德': 1426, '正统': 1436, '景泰': 1450, '天顺': 1457,
    '成化': 1465, '弘治': 1488, '正德': 1506, '嘉靖': 1522,
    '隆庆': 1567, '万历': 1573, '泰昌': 1620, '天启': 1621, '崇祯': 1628,
  };
  for (const [era, startYear] of Object.entries(mingEmperors)) {
    const eraMatch = str.match(new RegExp(`${era}\\s*(\\d+)[\\s年]+`));
    if (eraMatch) return startYear + parseInt(eraMatch[1], 10) - 1;
  }

  // 6. 其他年号（常见）
  const otherEras: Record<string, number> = {
    '洪武': 1368, '建文': 1399, '永乐': 1403, '洪熙': 1425,
    '宣德': 1426, '正统': 1436, '景泰': 1450, '天顺': 1457,
    '成化': 1465, '弘治': 1488, '正德': 1506, '嘉靖': 1522,
    '隆庆': 1567, '万历': 1573, '泰昌': 1620, '天启': 1621, '崇': 1628,
  };

  // 如果都无法解析，返回 null
  return null;
}
