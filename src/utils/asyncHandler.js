const asyncHandler =(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
    

}

export {asyncHandler}

// it is use to remove the need of try catch manually


// const asyncHandler = (fn)=> async() =>{
//     try{
//         await fn(req,res,next)

//     }catch(error){
//         res.status(error.code || 500).json({
//             sucess:false,
//             message:err.message
//         })
//     }
// }
