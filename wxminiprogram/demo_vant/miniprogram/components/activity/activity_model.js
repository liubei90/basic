var mockData = [
  { id: 1, name: '春天里的第一场郊游', time: '2021-03-15 10:00:00', place: '郑州绿博园', peoplenum: 10 },
  { id: 2, name: '公司迟到的年会', time: '2021-03-15 10:00:00', place: '海底捞正弘城店', peoplenum: 217 },
  { id: 3, name: '第二节私教课', time: '2021-03-15 10:00:00', place: '正弘城2楼', peoplenum: 6 },
  { id: 4, name: '第三节私教课', time: '2021-03-15 14:00:00', place: '正弘城2楼', peoplenum: 8 },
  { id: 5, name: '鸿鑫公寓物业签到2021-01-01', time: '2021-01-01 08:00:00', place: '鸿鑫公寓', peoplenum: 3 },
  { id: 6, name: '鸿鑫公寓物业签到2021-01-02', time: '2021-01-02 08:00:00', place: '鸿鑫公寓', peoplenum: 3 }
];

function getActivityList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData);
      // reject();
    }, 2000);
  });
}

module.exports = {
  getActivityList,
}