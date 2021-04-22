<template>
    <div id="app">
        <div class="input-panel">
            <div class="input-wrapper">
                <el-input v-model="n" placeholder="n">
                    <template slot="prepend">请输入传道士和野人的数量n</template>
                </el-input>
            </div>
            <div class="input-wrapper">
                <el-input v-model="k" placeholder="k">
                    <template slot="prepend">请输入船的最多载人数k</template>
                </el-input>
            </div>
            
            <el-button type="primary" @click="handler">搜索</el-button>
        </div>
        <div class="tips" v-if="display_tips=='finish'">共有 <span>{{result.length}}</span> 种方案</div>
        <div class="tips" v-if="display_tips=='calculating'">计算中...</div>
        <div class="result-panel" v-for="(item, index) in result" :key="index">
            <el-card class="case-card">
                <p class="case-title">{{"方案"+(index+1)}}</p>
                <Case :data="item"></Case>
            </el-card>
        </div>
    </div>
</template>

<script>
import SearchController from "../SearchController";

export default {
    name: "App",
    data:function () {
        return {
            n:null,
            k:null,
            result:[],
            display_tips:""
        }
    },
    methods:{
        handler(){
            this.display_tips="calculating";

            setTimeout(()=>{
                this.result=new SearchController(this.n,this.k).result;
                this.display_tips="finish";
            },100)
        }
    }
}
</script>