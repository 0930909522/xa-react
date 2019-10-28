export const clearLogin = (err) => {
    if( err.status === 401){
        console.log(err.status);
        //localStorage.clear();
    }
}