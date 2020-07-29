export class LoginObject{
    public email:string;
    public password:string;
    /* se declara lo que se va a pedir y se controla la informacion*/
    constructor(object:any){
        this.email=(object.email)?object.email:null;
        this.email=(object.password)?object.password:null;
    }
}