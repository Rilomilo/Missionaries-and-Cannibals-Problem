export default class Status{
    private _n:number;
    private _ml:number; // 左侧传道士数量
    private _cl:number; // 左侧野人数量
    private _b:boolean;  // 1代表船在左边，0代表右边

    constructor(n:number,ml: number, cl: number, b: boolean) {
        this._n=n;
        this._ml = ml;
        this._cl = cl;
        this._b = b;
    }

    /**
     * 移动传道士和野人
     * @param m 传道士
     * @param l 野人
     * @return 移动后的新状态
     */
    public move(m:number,c:number):Status{
        if(this.b==true){
            return new Status(this._n,this.ml-m,this.cl-c,!this.b);
        }else {
            return new Status(this._n,this.ml+m,this.cl+c,!this.b);
        }
    }

    /**
     * 检查当前状态是否合法
     * @return true表示合法
     */
    public isLegal():boolean{
        if(
            (this.ml==0 || this.ml>=this.cl) &&
            (this.mr==0 || this.mr>=this.cr) &&
            (this.ml>=0 && this.mr>=0 && this.cl>=0 && this.cr>=0)
        ){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 判断两个Status是否相等
     * @param s
     */
    public equals(s:Status):boolean{
        if(this._cl==s._cl && this._ml==s._ml && this._b==s._b){
            return true;
        }else {
            return false;
        }
    }

    get ml(): number {
        return this._ml;
    }

    get cl(): number {
        return this._cl;
    }

    /**
     * 右侧传道士数量
     */
    get mr(): number {
        return this._n-this._ml;
    }

    /**
     * 右侧野人数量
     */
    get cr(): number {
        return this._n-this._cl;
    }

    get b(): boolean {
        return this._b;
    }
}