<template>
    <div class="case">
        <div class="status-panel">
            <span class="status" v-for="(status, index) in data" :key="index">
                <el-tag @click="handleOpenDialog(index)">
                    {{ formatStatus(status) }}
                </el-tag>
                <i class="el-icon-caret-right" v-if="index != data.length - 1"></i>
            </span>
        </div>

        <el-dialog title="动画展示" :visible.sync="dialogVisible" width="800px">
            <div class="case-dialog">
                <div class="status-panel">
                    <span class="status" v-for="(status, index) in data" :key="index">
                        <el-tag :type="current_index==index?'warning':''" @click="setStatus(index)">
                            {{ formatStatus(status) }}
                        </el-tag>
                        <i class="el-icon-caret-right" v-if="index != data.length - 1"></i>
                    </span>
                </div>
                <div class="stage">
                    <div class="background"></div>
                    <div class="left">
                        <div class="people">
                            <div class="missionary-wrap">
                                <span class="missionary"></span>
                                <span>{{data[current_index]._ml}}</span>
                            </div>
                            <div class="cannibals-wrap">
                                <span class="cannibals"></span>
                                <span>{{data[current_index]._cl}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="people">
                            <div class="missionary-wrap">
                                <span class="missionary"></span>
                                <span>{{data[current_index]._n-data[current_index]._ml}}</span>
                            </div>
                            <div class="cannibals-wrap">
                                <span class="cannibals"></span>
                                <span>{{data[current_index]._n-data[current_index]._cl}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="boat" :class="data[current_index]._b==true?'boat-left':'boat-right'">
                        <div class="people">
                            <div class="missionary-wrap" :style="'visibility:'+(boat.m==0?'hidden':'')">
                                <span class="missionary"></span>
                                <span>{{boat.m}}</span>
                            </div>
                            <div class="cannibals-wrap" :style="'visibility:'+(boat.c==0?'hidden':'')">
                                <span class="cannibals"></span>
                                <span>{{boat.c}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-panel">
                    <el-button @click="changeStatus(current_index-1)">上一步</el-button>
                    <el-button @click="changeStatus(current_index+1)">下一步</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Case",
    props: ["data"],
    data() {
        return {
            dialogVisible: false,
            current_index:0, // 指向当前状态
            boat:{
                m:0,
                c:0
            },
            timer:0
        }
    },
    methods: {
        formatStatus(status) {
            return `(${status._ml},${status._cl},${status._b ? 1 : 0})`
        },
        handleOpenDialog(index) {
            this.current_index=index;
            console.log(this.data);
            this.dialogVisible = true;
        },
        setStatus(index){
            this.current_index=index;
        },
        changeStatus(i){
            if(i>=0 && i<this.data.length){
                this.boat.m=Math.abs(this.data[this.current_index]._ml-this.data[i]._ml);
                this.boat.c=Math.abs(this.data[this.current_index]._cl-this.data[i]._cl);
                this.current_index=i;

                clearTimeout(this.timer);
                this.timer=setTimeout(()=>{
                    this.boat.m=0;
                    this.boat.c=0;
                },1000)
            }
        }
    }
}
</script>