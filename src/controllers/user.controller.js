import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation -not empty
    // check if user already exists:username,email
    // check for images check for avatar
    // upload them to cloudinary,avatar 
    // create user object - create entry in db
    // remove password and refresh token filed from response 
    // check for user creation 
    // return response

    const {fullName,email,username,password} = req.body

    // if(fullName === ""){
    //     throw new ApiError(400,"fullname is required")
    // }
    if([fullName,email,username,password].some((field)=>
        field?.trim() ===" "
    )){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"USer with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

   const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //here select is used for which filed i do not want to select so we write "-(negative sign and variable name)"

    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user ")
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registerd sucessfully") //make new api reponse object

    )
    
})


export {registerUser}


// first we have to make a post method then take useris and password from req.body then check user is valid or not 
// data comes from form we can access from req.body
// req.files?.avatar[0]?.path it comes from multer 0 access the first propety we should 
// if we have first property we can access the path varible with multer is aploded
// user.create is allowed to communicate data base because models is connected to mongoose