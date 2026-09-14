export const integral_simpson = (f, a, b, n=1000) => {
    if(n%2===1) n+=1;
    const h=(b-a)/n;
    let s=f(a)+f(b);
    for(let i=1;i<n;i++){
        s+=f(a+i*h)*(i%2===0?2:4);
    }
    return s*h/3;
};
export const integral_trapezoid = (f, a, b, n=1000) => {
    const h=(b-a)/n;
    let s=(f(a)+f(b))/2;
    for(let i=1;i<n;i++) s+=f(a+i*h);
    return s*h;
};
export const integral_midpoint = (f, a, b, n=1000)=>{
    const h=(b-a)/n;
    let s=0;
    for(let i=0;i<n;i++) s+=f(a+(i+0.5)*h);
    return s*h;
};