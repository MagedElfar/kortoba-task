interface User {
    id?:number,
    username:string,
    email:string,
    password: string
}

interface Login extends Partial<User>{}

export {User , Login}