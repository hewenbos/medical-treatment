// 问诊类型枚举
export enum ConsultType {
  // 找医⽣
  Doctor = 1,
  // 快速问诊
  Fast = 2,
  // 开药问诊
  Medication = 3
}

//问诊时间枚举
export enum IllnessTime {
  // ⼀周内
  Week = 1,
  // ⼀⽉内
  Month,
  // 半年内
  HalfYear,
  // 半年以上
  More
}

//是否就诊过枚举
export enum ConsultFlag {
  NoInspect = 0,
  YesInspect = 1
}

//快速问诊类型
export enum IllnessType {
  Normal = 0,

  trimethylate = 1
}
