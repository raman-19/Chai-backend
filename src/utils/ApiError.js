class ApiError extends Error {
    constructor(
        statusCode,
        message="something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.sucess=false
        this.errors= errors

        if(stack){
            this.stck=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export {ApiError}