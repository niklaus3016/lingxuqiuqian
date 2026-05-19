import { Solar, Lunar, HolidayUtil } from 'lunar-javascript';

export interface AlmanacData {
  solarDate: string;
  lunarDate: string;
  ganZhiYear: string;
  ganZhiMonth: string;
  ganZhiDay: string;
  zodiac: string;
  solarTerm: string | null;
  yi: string[];
  ji: string[];
  wealthDirection: string;
  hourLuck: { hour: string, luck: string }[];
}

export function getAlmanacData(date: Date): AlmanacData {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();

  // Basic lunar info
  const lunarDate = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  const ganZhiYear = `${lunar.getYearInGanZhi()}(${lunar.getYearShengXiao()})年`;
  const ganZhiMonth = `${lunar.getMonthInGanZhi()}月`;
  const ganZhiDay = `${lunar.getDayInGanZhi()}日`;
  
  // Yi and Ji
  const yi = lunar.getDayYi();
  const ji = lunar.getDayJi();

  // Wealth direction
  const wealthDirection = lunar.getDayPositionFu(); // 财神方位

  // Hour luck
  const hourLuck = [];
  for (let i = 0; i < 24; i += 2) {
    const hourLunar = Lunar.fromYmdHms(lunar.getYear(), lunar.getMonth(), lunar.getDay(), i, 0, 0);
    const hourLabel = `${i}:00-${i + 2}:00`;
    hourLuck.push({
      hour: hourLabel,
      luck: hourLunar.getTimeTianShen() // 天神
    });
  }

  return {
    solarDate: solar.toFullString(),
    lunarDate,
    ganZhiYear,
    ganZhiMonth,
    ganZhiDay,
    zodiac: lunar.getYearShengXiao(),
    solarTerm: lunar.getJieQi(),
    yi,
    ji,
    wealthDirection,
    hourLuck
  };
}
