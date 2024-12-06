import db from "../db/database"
import { Request, Response } from "express"

export const getUsers = async ({ query }: Request, res: Response) => {
    try {
      const queryParams = query || {}; 
      const limit = queryParams.limit
        ? (Number(queryParams.limit) === -1 ? Number.MAX_SAFE_INTEGER : Number(queryParams.limit))
        : 10;
      const offset = queryParams.offset ? Number(queryParams.offset) : 0;
      const users = await db("users")
      .where((builder) => {
        if (query.search) {
          if (!isNaN(query.search)) {
            builder.where("id", query.search);
          }

          builder
            .orWhere("name", "like", `%${query.search}%`)
            .orWhere("email", "like", `%${query.search}%`);
        }
      })
      .orderBy('id','desc')
      .limit(limit)
      .offset(offset);

      const [{count}] = await db("users")
      .where((builder) => {
        if (query.search) {
          if (!isNaN(query.search)) {
            builder.where("id", query.search);
          }

          builder
            .orWhere("name", "like", `%${query.search}%`)
            .orWhere("email", "like", `%${query.search}%`);
        }
      })
      .count('*');
  
      return res.json({ users,total: count, message: "USERS_FETCHED", code: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", code: 500 });
    }
  };
  

export const findUser = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const user = await db("users").where('id',id).first();

	return res.json({user, message: "FIND_USER_SUCCESS", code: 200 })
}

export const createUser = async ({ body }: Request, res: Response) => {
    const { data } = body;
    console.log(data)
    if (!data || !data.name || !data.email || !data.date_of_birth) {
        return res.status(400).json({ message: "INVALID_USER_DATA", code: 400 });
    }
    try {
        const newUser = await db.transaction(async (trx) => {
            const [createdUser] = await trx("users").insert(data).returning("*"); // Insere o usuário e retorna o registro criado
            return createdUser;
        });
    
        return res.status(201).json({ user: newUser, message: "USER_CREATED", code: 201 });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", code: 500 });
      }
}
export const updateUser = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const data = body;

    try {
    const updatedUser = await db.transaction(async (trx) => {
      const [userUpdated] = await trx("users")
        .where("id", id)
        .update(data)
        .returning("*");

      if (!userUpdated) {
        throw new Error("USER_NOT_FOUND");
      }

      return userUpdated;
    });

    return res.status(200).json({ user: updatedUser, message: "USER_UPDATED", code: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "USER_NOT_FOUND", code: 404 });
    }

    return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", code: 500 });
  }
}

export const deleteUser = async ({ params }: Request, res: Response) => {
    const { id } = params;
    try {
        const deletedUser = await db.transaction(async (trx) => {
          
          const userExists = await trx("users").where("id", id).first();
          if (!userExists) {
            throw new Error("USER_NOT_FOUND");
          }
    
          await trx("users").where("id", id).del();
    
          return userExists;
        });
    
        return res.status(200).json({ user: deletedUser, message: "USER_DELETED", code: 200 });
      } catch (error: any) {
        console.error("Error deleting user:", error);
    
        if (error.message === "USER_NOT_FOUND") {
          return res.status(404).json({ message: "USER_NOT_FOUND", code: 404 });
        }
    
        return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", code: 500 });
      }
}