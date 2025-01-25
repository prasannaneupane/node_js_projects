

export const userFirstService = async (args) => {
    console.log("Reached Service layer")
    console.log("Doing some database work")
    const someDataFromDatabase = "MY DATA";
    return someDataFromDatabase;
}

export const loginUserService = async (loginData) => {
    const email = loginData.email;
    const password = loginData.password
    if(email =="neupaneprasanna85@gmail.com" && password=="1111"){
        return {"message": "Login successful"}
    }
    else{
        return {"message": "Login unsuccessful"}
    }
}

const usersDataList = [
    {   username:"Prasanna",  email: "neupaneprasanna85@gmail.com"},
    {   username: "sujal",      email: "ss@gmail.com"} ,
    {   username: 'aayushya',  email: "as@gmail.com"}
]
export const allUserService = async () => {
    return usersDataList;
}