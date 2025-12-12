export * from './derivative/index.js'
export * from './integral/index.js'
import { factorial } from "../discret";
export const taylor_series = (f, x0, n=5, h=1e-5) => {
    let sum=0;
    for(let i=0;i<=n;i++){
        sum += derivative_n(f,x0,i,h) / factorial(i)*(x0**i);
    }
    return sum;
};

export const newton_raphson = (f, x0, tol=1e-8, maxIter=100) => {
    let x=x0;
    for(let i=0;i<maxIter;i++){
        const fx=f(x), dfx=derivative(f,x);
        if(Math.abs(dfx)<1e-12) break;
        const dx=fx/dfx;
        x-=dx;
        if(Math.abs(dx)<tol) break;
    }
    return x;
};
