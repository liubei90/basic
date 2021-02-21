import http from './http';


// 获取讲师列表
export const getLecturerList = async function({ userId }) {
  try {
    const res = await http.post(
      'http://qd.fakabei.com/api/lecturer/lecturerList', 
      null,
      {
        params: {
          userId,
        }
      });

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}

// 获取课程表列表
export const getCourseList = async function({ userId }) {
  try {
    const res = await http.post(
      'http://qd.fakabei.com/api/lecturer/courseList', 
      null,
      {
        params: {
          userId,
        }
      });

    if (res && res['data']) {
      return res['data'];
    }
  } catch (error) {}
}
