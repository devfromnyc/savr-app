export const cookieCreate = (user_id) => {
    const cookieDate = new Date();
    const cookieId = user_id;
    cookieDate.setTime(cookieDate.getTime() + (1*24*60*100));
    let expires = "expires="+ cookieDate.toUTCString();
    document.cookie = `savrAuthCookie=${cookieId}"+ ${expires} + ";path=/`;
    console.log("Cookie Created for User");
}

export const cookieDelete = () => {
    const authCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("savrAuthCookie="))
        ?.split("=")[1];
    
    if(authCookie){
        document.cookie = "savrAuthCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        console.log("Cookie Has Been Deleted");
    } else{
        console.log("Cookie Not Found");
    }
}

export const cookieFind = () => {
    const authCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("savrAuthCookie="))
        ?.split("=")[1];
    
    if(authCookie){
        return true;
    } else{
        return false;
    }
}