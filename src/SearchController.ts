import Status from "./Status"

export default class SearchController{
    public n:number; 
    public k:number; // 每次最多移动
    public visited_status_ls:Status[]=[]; // 存放当前方案中已经访问过的状态
    private _result: Status[][] =[]; // 存放所有可行的方案，每种方案由若干个状态组成

    constructor(n: number, k: number) {
        this.n = n;
        this.k = k;
        let s=new Status(n,n,n,true);
        this.visited_status_ls.push(s);
        this.dfs(s);
    }

    /**
     * 判断当前状态是否已经访问过
     * @param s 状态
     */
    public isVisited(s:Status):boolean{
        for(let i=0;i<this.visited_status_ls.length;i++){
            if(s.equals(this.visited_status_ls[i])) return true;
        }
        return false;
    }

    /**
     * 从当前状态开始搜索所有合法的走法
     * @param s 当前状态
     */
    public dfs(s:Status){
        if(s.cr==this.n && s.mr==this.n){
            let t=[];
            for(let i=0;i<this.visited_status_ls.length;i++){
                t.push(this.visited_status_ls[i]);
            }
            this._result.push(t);
        }

        let maxm,maxc;
        if(s.b==true){
            maxc=s.cl;
            maxm=s.ml;
        }else {
            maxc=s.cr;
            maxm=s.mr;
        }

        for(let m=0;m<=maxm;m++){
            for(let c=0;c<=maxc;c++){
                if(m+c>0 && m+c<=this.k && (m>=c || m==0)){
                    let s1:Status=s.move(m,c);

                    if(s1.isLegal() && !this.isVisited(s1)){
                        // 如果生成的新状态是一个合法的状态，并且没有访问过，则可以继续新状态继续搜索
                        this.visited_status_ls.push(s1);
                        this.dfs(s1);
                        this.visited_status_ls.pop();
                    }
                }
            }
        }
    }

    get result(): Status[][] {
        return this._result;
    }
}