export interface Iusers{
    data:[{
        id:number,
        password:string,
        email_id:string,
        last_name:string,
        first_name:string,
        gender:string,
        address:{
            country:string,
            region:string
        }
    }]
}

