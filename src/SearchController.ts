import Status from "./Status"

export default class SearchController{
    public n:number; 
    public k:number; // 每次最多移动
    public visited_status_ls:Status[]=[];
    private _result: Status[][] =[];

    constructor(n: number, k: number) {
        this.n = n;
        this.k = k;
        let s=new Status(n,n,n,true);
        this.visited_status_ls.push(s);
        this.dfs(s);
    }

    public isVisited(s:Status):boolean{
        for(let i=0;i<this.visited_status_ls.length;i++){
            if(s.equals(this.visited_status_ls[i])) return true;
        }
        return false;
    }

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