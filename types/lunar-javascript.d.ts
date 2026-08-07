declare module 'lunar-javascript' {
  export class Solar {
    static fromYmdHms(
      year: number,
      month: number,
      day: number,
      hour: number,
      minute: number,
      second: number,
    ): Solar
    static fromYmd(year: number, month: number, day: number): Solar
    getLunar(): Lunar
    getYear(): number
    getMonth(): number
    getDay(): number
    getHour(): number
  }

  export class Lunar {
    static fromYmdHms(
      year: number,
      month: number,
      day: number,
      hour: number,
      minute: number,
      second: number,
    ): Lunar
    getSolar(): Solar
    getYearGan(): string
    getYearZhi(): string
    getMonthGan(): string
    getMonthZhi(): string
    getDayGan(): string
    getDayZhi(): string
    getTimeGan(): string
    getTimeZhi(): string
    getYearShengXiao(): string
    getMonthShengXiao(): string
    getDayShengXiao(): string
    getTimeShengXiao(): string
    getBaZi(): string[]
    getBaZiWuXing(): string[]
    getYear(): number
    getMonth(): number
    getDay(): number
    getYearInChinese(): string
    getMonthInChinese(): string
    getDayInChinese(): string
    getEightChar(): EightChar
  }

  export class EightChar {
    getYear(): string
    getYearGan(): string
    getYearZhi(): string
    getYearHideGan(): string[]
    getYearWuXing(): string
    getYearNaYin(): string
    getYearShiShenGan(): string
    getYearShiShenZhi(): string[]
    getYearDiShi(): string
    getYearXun(): string
    getYearXunKong(): string
    getMonth(): string
    getMonthGan(): string
    getMonthZhi(): string
    getMonthHideGan(): string[]
    getMonthWuXing(): string
    getMonthNaYin(): string
    getMonthShiShenGan(): string
    getMonthShiShenZhi(): string[]
    getMonthDiShi(): string
    getMonthXun(): string
    getMonthXunKong(): string
    getDay(): string
    getDayGan(): string
    getDayZhi(): string
    getDayHideGan(): string[]
    getDayWuXing(): string
    getDayNaYin(): string
    getDayShiShenGan(): string
    getDayShiShenZhi(): string[]
    getDayDiShi(): string
    getDayXun(): string
    getDayXunKong(): string
    getTime(): string
    getTimeGan(): string
    getTimeZhi(): string
    getTimeHideGan(): string[]
    getTimeWuXing(): string
    getTimeNaYin(): string
    getTimeShiShenGan(): string
    getTimeShiShenZhi(): string[]
    getTimeDiShi(): string
    getTimeXun(): string
    getTimeXunKong(): string
    getTaiYuan(): string
    getTaiYuanNaYin(): string
    getTaiXi(): string
    getTaiXiNaYin(): string
    getMingGong(): string
    getMingGongNaYin(): string
    getShenGong(): string
    getShenGongNaYin(): string
    getLunar(): Lunar
    getYun(gender: number): Yun
    toString(): string
  }

  export class Yun {
    getGender(): number
    getStartYear(): number
    getStartMonth(): number
    getStartDay(): number
    isForward(): boolean
    getLunar(): Lunar
    getDaYun(): DaYun[]
  }

  export class DaYun {
    getStartYear(): number
    getEndYear(): number
    getStartAge(): number
    getEndAge(): number
    getIndex(): number
    getLunar(): Lunar
    getGanZhi(): string
    getXun(): string
    getXunKong(): string
    getLiuNian(): LiuNian[]
    getXiaoYun(): XiaoYun[]
  }

  export class LiuNian {
    getYear(): number
    getAge(): number
    getIndex(): number
    getLunar(): Lunar
    getGanZhi(): string
    getXun(): string
    getXunKong(): string
    getLiuYue(): LiuYue[]
  }

  export class XiaoYun {
    getYear(): number
    getAge(): number
    getIndex(): number
    getGanZhi(): string
  }

  export class LiuYue {
    getIndex(): number
    getMonthInChinese(): string
    getGanZhi(): string
    getXun(): string
    getXunKong(): string
  }
}
