
<!--<template>-->
<!--    <div>-->
<!--        <input v-model="msg">-->
<!--        <p>msg: {{ msg }}</p>-->
<!--        <p>computed msg: {{ computedMsg }}</p>-->
<!--        <button @click="greet">Greet</button>-->
<!--    </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--    import Vue from 'vue'-->

<!--    export default class App extends Vue {-->
<!--        // 初始化数据-->
<!--        msg = 123-->

<!--        // 声明周期钩子-->
<!--        mounted () {-->
<!--            this.greet()-->
<!--        }-->

<!--        // 计算属性-->
<!--        get computedMsg () {-->
<!--            return 'computed ' + this.msg-->
<!--        }-->

<!--        // 方法-->
<!--        greet () {-->
<!--            alert('greeting: ' + this.msg)-->
<!--        }-->
<!--    }-->
<!--</script>-->

<template>
    <div id="app">
        <div class="input-panel">
            <el-input v-model="n" placeholder="请输入传道士和野人的数量n"></el-input>
            <el-input v-model="k" placeholder="请输入船每次最多运送人数"></el-input>
            <el-button type="primary" @click="handler">初始化</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Case",
        data:function () {
            return {
                n:null,
                k:null
            }
        },
        methods:{
            handler(){

            }
        }
    }
</script>

<style scoped>

</style>