<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teachers from '@/api/edu/teacher/teacher'
export default {
    data(){
        return{
            teacher:{
                //下面的属性不加的话会隐式的加上
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            //防止重复点击提交按钮
            saveBtnDisabled:false
        }
    },
    created(){
        this.init()
    },
    watch:{
        $route(to,from){
            //路由发生变化时，执行初始化方法
            this.init()
        }
    },
    methods:{
        init(){
            //判断是否有ID值，有的话说明是修改操作，需要回显
            if (this.$route.params && this.$route.params.id) {
                //从路径中获取ID值
                const id = this.$route.params.id
                //调用跟ID值查询的方法
                this.getInfo(id)
            }else{
                //路径中没有ID，为新增，需要清空表单
                this.teacher = {}
            }
        },
        //根据讲师ID查询讲师
        getInfo(id){
            teachers.getTeacherInfo(id)
                .then(response =>{
                    this.teacher = response.data.teacher
                })
        },
        saveOrUpdate(){
            if (this.teacher.id) {
                this.updateTeacher()
            }else{
                this.saveTeacher()
            }
        },
        updateTeacher(){
            //更新用户信息
            teachers.updateTeacherInfo(this.teacher)
                .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                    //回到列表页面
                    this.$router.push({path:'/teacher/table'})
                })
        },
        //添加讲师
        saveTeacher(){
            teachers.addTeacher(this.teacher)
                .then(response =>{
                    //提示添加成功
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    //回到列表页面
                    this.$router.push({path:'/teacher/table'})
                })
        }
    }
}
</script>