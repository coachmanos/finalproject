import express from "express";
import UsersTable from "../table";

const usersTable = new UsersTable("users");

function getUsers(){
    return usersTable.getAll();
}

function getUser(id){
    return usersTable.getOne(id);
}

function addUser(userParms){
    return usersTable.postProcedure("spInsertUser", userParms)
}

function deleteUser(userId){
    return usersTable.putOrDeleteProcedure("spDeleteUser", userId);
}

function getGamerTagAndPlatform(userId){
    return usersTable.putOrDeleteProcedure("spSelectGamerTagAndPlatform", userId);
}

export {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    getGamerTagAndPlatform
}