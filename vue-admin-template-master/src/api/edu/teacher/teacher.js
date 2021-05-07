import request from '@/utils/request'

export default {
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            url: `/eduService/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // params: { token }
            data: teacherQuery
        })
    },
    deleteTeacherId(id){
        return request({
            url: `/eduService/teacher/${id}`,
            method: 'delete'
        })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/eduService/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    //根据ID值获取用户信息
    getTeacherInfo(id){
        return request({
            url: `/eduService/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    //修改讲师信息
    updateTeacherInfo(teacher){
        return request({
            url: `/eduService/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }
}