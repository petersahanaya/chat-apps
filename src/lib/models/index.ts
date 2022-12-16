import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize(import.meta.env.VITE_DB_NAME!, import.meta.env.VITE_DB_USERNAME!,  import.meta.env.VITE_DB_PASSWORD!, {
    host : import.meta.env.VITE_DB_HOST!,
    dialect : "mysql"
})

export const User = sequelize.define('users', {
    username : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    userId : {
        type : DataTypes.STRING()
    },
    token : {
        type : DataTypes.TEXT('long')
    },
    image : {
        type : DataTypes.TEXT('long')
    }
})