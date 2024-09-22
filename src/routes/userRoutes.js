import express from 'express'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRoles from '../middlewares/roleMiddleware.js'

const UserRouter=express.Router()


//Only admin can access this router


UserRouter.get('/admin',verifyToken,authorizeRoles('admin'),(req,res)=>{
    res.json({message:'Welcome Admin'})
})


//Both admin and manager can access this route

UserRouter.get('/manager',verifyToken,authorizeRoles('admin','manager'),(req,res)=>{
    res.json({message:'Welcome Manager'})
})


//All can access the routes

UserRouter.get('/user',verifyToken,authorizeRoles('admin','manager','user'),(req,res)=>{
    res.json({message:'Welcome User'})
})


export default UserRouter;